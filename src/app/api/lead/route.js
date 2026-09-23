import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { appendFile } from 'node:fs/promises';
import { escapeHtml, escapeMultiline } from '../../../lib/escapeHtml';
import { clientIp, rateLimit } from '../../../lib/rateLimit';
import { PERSON, SITE_NAME, SITE_URL } from '../../../lib/site';

// Single handler for every lead form on the site. /api/contact re-exports it.
// Do not switch this route to the edge runtime: it relies on node:fs and on
// module-scope state for rate limiting.

const SOURCES = {
  contact: 'Contact form',
  estimator: 'Integration estimator',
  audit: 'Audit inquiry',
  magnet: 'Checklist download',
  calculator: 'Project calculator',
};
const MIN_DWELL_MS = 2500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO = process.env.LEADS_TO_EMAIL || 'tronsymphony@gmail.com';
const FROM = process.env.LEADS_FROM_EMAIL || `${SITE_NAME} <leads@casa-dev.com>`;

const clip = (v, max) => String(v ?? '').trim().slice(0, max);

// Flatten form-specific details to a short list of printable label/value rows.
function detailRows(payload) {
  if (!payload || typeof payload !== 'object') return [];
  return Object.entries(payload)
    .slice(0, 30)
    .map(([key, value]) => {
      const printable = Array.isArray(value) ? value.join(', ') : typeof value === 'object' ? JSON.stringify(value) : value;
      return [clip(key, 60), clip(printable, 500)];
    })
    .filter(([, value]) => value !== '');
}

async function recordLead(lead) {
  // Always leave a structured line in the runtime logs as a last-resort record.
  console.info('[lead]', JSON.stringify(lead));
  if (!process.env.LEADS_LOG_PATH) return;
  try {
    await appendFile(process.env.LEADS_LOG_PATH, JSON.stringify(lead) + '\n');
  } catch (err) {
    console.error('[lead] could not append to LEADS_LOG_PATH:', err.message);
  }
}

function ownerEmailHtml(lead) {
  const rows = detailRows(lead.payload)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join('');
  return `
    <h2>${escapeHtml(SOURCES[lead.source])}: ${escapeHtml(lead.name || lead.email)}</h2>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    ${lead.company ? `<p><strong>Company:</strong> ${escapeHtml(lead.company)}</p>` : ''}
    ${rows ? `<table>${rows}</table>` : ''}
    ${lead.message ? `<h3>Message</h3><p>${escapeMultiline(lead.message)}</p>` : ''}
    <p style="color:#999;font-size:12px">Received ${escapeHtml(lead.receivedAt)} via ${escapeHtml(lead.page || 'unknown page')}</p>
  `;
}

function autoReplyHtml(lead) {
  const greeting = lead.name ? `Thanks, ${escapeHtml(lead.name.split(' ')[0])}.` : 'Thanks for reaching out.';
  const body =
    lead.source === 'magnet'
      ? `<p>Here is the NetSuite Integration Readiness Checklist: <a href="${SITE_URL}/netsuite/integration-readiness-checklist/">open the checklist</a>. Use your browser's print button to save it as a PDF.</p>`
      : `<p>I've received your message and will reply personally within one business day.</p>`;
  return `
    <p>${greeting}</p>
    ${body}
    <p>If it's easier to talk it through, just reply to this email.</p>
    <p>${escapeHtml(PERSON.name)}<br>${escapeHtml(SITE_NAME)} · <a href="${SITE_URL}">casa-dev.com</a></p>
  `;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bots: pretend success so they don't adapt.
  const dwell = Number(body._t) ? Date.now() - Number(body._t) : Infinity;
  if (body._hp || dwell < MIN_DWELL_MS) {
    return NextResponse.json({ success: true });
  }

  if (!rateLimit(clientIp(request))) {
    return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
  }

  const lead = {
    source: SOURCES[body.source] ? body.source : 'contact',
    name: clip(body.name, 200),
    email: clip(body.email, 254).toLowerCase(),
    company: clip(body.company, 200),
    message: clip(body.message, 5000),
    payload: body.payload && typeof body.payload === 'object' ? body.payload : null,
    page: clip(request.headers.get('referer'), 300),
    receivedAt: new Date().toISOString(),
  };

  if (!EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if ((lead.source === 'contact' || lead.source === 'audit') && (!lead.name || !lead.message)) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  await recordLead(lead);

  const fallback = { error: `Something went wrong sending your message. Please email ${PERSON.email} directly.` };
  if (!process.env.RESEND_API_KEY) {
    console.error('[lead] RESEND_API_KEY is not set');
    return NextResponse.json(fallback, { status: 502 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error: notifyError } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: lead.email,
    subject: `[${SOURCES[lead.source]}] ${lead.name || lead.email}${lead.company ? ` (${lead.company})` : ''}`,
    html: ownerEmailHtml(lead),
  });
  if (notifyError) {
    console.error('[lead] owner notification failed:', notifyError);
    return NextResponse.json(fallback, { status: 502 });
  }

  // Best effort from here on: the lead is already safely delivered.
  if (lead.source === 'magnet' && process.env.RESEND_AUDIENCE_ID) {
    const { error } = await resend.contacts.create({
      email: lead.email,
      firstName: lead.name.split(' ')[0] || undefined,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    if (error) console.error('[lead] audience add failed:', error);
  }

  const { error: replyError } = await resend.emails.send({
    from: FROM,
    to: lead.email,
    replyTo: TO,
    subject: lead.source === 'magnet' ? 'Your NetSuite Integration Readiness Checklist' : `Thanks for reaching out to ${SITE_NAME}`,
    html: autoReplyHtml(lead),
  });
  if (replyError) console.error('[lead] auto-reply failed:', replyError);

  return NextResponse.json({ success: true });
}
