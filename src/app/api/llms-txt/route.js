import { NextResponse } from 'next/server';
import { AI_CRAWLERS, blockedCrawlers, checkLlmsTxt, draftLlmsTxt, locsIn, pageInfo, pageName, pickPages, sitemapsIn } from '../../../lib/llmsTxt';
import { clientIp, createRateLimiter } from '../../../lib/rateLimit';
import { FetchRefused, safeFetch, siteUrl } from '../../../lib/safeFetch';

// /tools/llms-txt-checker/: checks a site's llms.txt (format, links, robots.txt) or drafts one from its sitemap.
// Every outside request goes through safeFetch, which refuses private addresses. Node runtime: safeFetch uses
// node:http and node:dns, and the limiter keeps module-scope state. Nothing a visitor checks is stored.

export const runtime = 'nodejs';
export const maxDuration = 30;

const limit = createRateLimiter({ windowMs: 60 * 60 * 1000, perKey: 20, global: 400 });
const LINKS_CHECKED = 20;
const PAGES_DRAFTED = 25;

const looksLikeHtml = (res) => /text\/html/i.test(res.headers['content-type'] || '') || /^\s*<(!doctype|html)/i.test(res.body);

async function mapLimit(items, n, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    })
  );
  return out;
}

const tryFetch = (url, opts) => safeFetch(url, opts).catch((e) => ({ status: null, error: e instanceof FetchRefused ? e.message : 'Couldn’t connect', headers: {}, body: '' }));

async function check(origin) {
  const res = await tryFetch(`${origin}/llms.txt`, { maxBytes: 512 * 1024 });
  if (res.error && /private address/.test(res.error)) throw new FetchRefused('That address isn’t on the public web');
  const robots = await tryFetch(`${origin}/robots.txt`, { maxBytes: 128 * 1024, timeoutMs: 5000 });
  const blocked = robots.status === 200 && !looksLikeHtml(robots) ? blockedCrawlers(robots.body) : [];
  const llmsFull = await tryFetch(`${origin}/llms-full.txt`, { maxBytes: 1024, timeoutMs: 5000 });
  const file = { url: res.url || `${origin}/llms.txt`, status: res.status, contentType: res.headers['content-type'] || null, bytes: Buffer.byteLength(res.body || ''), truncated: !!res.truncated, error: res.error || null };
  const base = { site: origin, file, crawlers: AI_CRAWLERS, blocked, llmsFull: llmsFull.status === 200 && !looksLikeHtml(llmsFull) };

  if (res.status !== 200) return { ...base, found: false };
  if (looksLikeHtml(res)) {
    return { ...base, found: false, issues: [{ level: 'error', message: 'The address answers with a web page (HTML), not a text file. That is usually the site’s “page not found” page served with a 200 status.' }] };
  }
  const parsed = checkLlmsTxt(res.body);
  if (res.truncated) parsed.issues.unshift({ level: 'warning', message: 'The file is over 512 KB; only the first 512 KB was checked. A summary file this large is hard for a model to use.' });
  if (file.contentType && !/text\/(plain|markdown)/i.test(file.contentType)) {
    parsed.issues.push({ level: 'tip', message: `It’s served as “${file.contentType}”. text/plain or text/markdown is what readers expect.` });
  }
  const targets = [...new Set(parsed.links.map((l) => l.url).filter((u) => /^https?:\/\//i.test(u)))].slice(0, LINKS_CHECKED);
  const results = await mapLimit(targets, 5, async (u) => {
    const r = await tryFetch(u, { maxBytes: 2048, timeoutMs: 6000 });
    return { url: u, status: r.status, error: r.error };
  });
  return {
    ...base,
    found: true,
    title: parsed.title,
    summary: parsed.summary,
    sections: parsed.sections.map((s) => ({ name: s.name, links: s.links.length })),
    linkCount: parsed.links.length,
    linksChecked: results.length,
    brokenLinks: results.filter((r) => !r.status || r.status >= 400),
    issues: parsed.issues,
  };
}

async function generate(origin) {
  const home = await safeFetch(origin, { maxBytes: 768 * 1024 });
  if (home.status >= 400) throw new FetchRefused(`The home page answered with status ${home.status}`);
  const finalOrigin = new URL(home.url).origin;
  const info = pageInfo(home.body);

  let urls = [];
  let source = 'sitemap';
  const robots = await tryFetch(`${finalOrigin}/robots.txt`, { maxBytes: 128 * 1024, timeoutMs: 5000 });
  const maps = robots.status === 200 ? sitemapsIn(robots.body) : [];
  for (const map of (maps.length ? maps : [`${finalOrigin}/sitemap.xml`]).slice(0, 3)) {
    const sm = await tryFetch(map, { maxBytes: 2 * 1024 * 1024, timeoutMs: 8000 });
    if (sm.status !== 200) continue;
    if (/<sitemapindex/i.test(sm.body)) {
      for (const child of locsIn(sm.body).slice(0, 3)) {
        const c = await tryFetch(child, { maxBytes: 2 * 1024 * 1024, timeoutMs: 8000 });
        if (c.status === 200) urls.push(...locsIn(c.body));
      }
    } else urls.push(...locsIn(sm.body));
    if (urls.length) break;
  }
  if (!urls.length) {
    source = 'home page links';
    urls = [...home.body.matchAll(/<a[^>]+href=["']([^"'#]+)["']/gi)].map((m) => new URL(m[1], finalOrigin).href);
  }

  const picked = pickPages(urls, finalOrigin, PAGES_DRAFTED);
  const siteName = info.siteName || pageName(info.title) || new URL(finalOrigin).hostname;
  const pages = (
    await mapLimit(picked, 5, async (u) => {
      const r = await tryFetch(u, { maxBytes: 384 * 1024, timeoutMs: 6000 });
      if (r.status !== 200 || !looksLikeHtml(r)) return null;
      const p = pageInfo(r.body);
      return { url: u, title: pageName(p.title, siteName), description: p.description };
    })
  ).filter(Boolean);

  return { site: finalOrigin, source, pagesFound: urls.length, pagesUsed: pages.length, draft: draftLlmsTxt({ site: siteName, summary: info.description, pages }) };
}

export async function POST(request) {
  if (!limit(clientIp(request))) {
    return NextResponse.json({ error: 'That’s a lot of checks in an hour. Try again a little later.' }, { status: 429 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  try {
    const origin = siteUrl(body?.site).origin;
    const result = body?.mode === 'generate' ? await generate(origin) : await check(origin);
    return NextResponse.json(result, { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    const message = e instanceof FetchRefused ? e.message : 'Couldn’t reach that site. Check the address and try again.';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
