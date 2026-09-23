'use client';

// Posts any lead form to /api/lead. `renderedAt` is the ms timestamp captured
// when the form mounted; the server rejects implausibly fast submissions.
export async function submitLead({ source, renderedAt, honeypot = '', ...fields }) {
  const response = await fetch('/api/lead/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, ...fields, _hp: honeypot, _t: renderedAt }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  // Lazy import: resolves to the instance the layout already initialized,
  // without adding posthog-js to every page that renders a form.
  import('posthog-js').then(({ default: posthog }) => posthog.capture('lead_submitted', { source })).catch(() => {});
  return data;
}
