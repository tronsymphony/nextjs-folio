// llms.txt checks and drafts for /tools/llms-txt-checker/. No Node APIs, so it can be tested on its own.
// The rules follow the format at llmstxt.org: an H1 with the site's name (the only required part), then optionally a
// blockquote summary, then text without headings, then H2 sections of "file lists" whose items are
// "[name](url)", optionally followed by ": notes". "Optional" is the conventional section for links an agent can skip.

// The AI crawlers named in our llms.txt guide (/seo/llms-txt/), checked against robots.txt.
export const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

// A list item that starts with a link; `rest` is whatever follows it (": notes" in the format).
const LINK_ITEM = /^[-*+]\s+\[([^\]]+)\]\(([^)\s]+)\)\s*(.*)$/;

// Reads an llms.txt into its parts and lists what doesn't follow the format. Issues are
// { level: 'error' | 'warning' | 'tip', message, line?, lines? } (1-based). A finding that repeats is one issue with
// the lines it was found on, so a long file doesn't bury the important ones.
export function checkLlmsTxt(text) {
  const issues = [];
  const add = (level, message, line) => issues.push(line ? { level, message, line } : { level, message });
  const repeated = { subheadings: [], plainItems: [], relative: [], otherSeparator: [] };
  const lines = String(text).replace(/^﻿/, '').split(/\r?\n/);
  const out = { title: null, summary: null, sections: [], links: [] };

  const firstIdx = lines.findIndex((l) => l.trim() !== '');
  if (firstIdx === -1) {
    add('error', 'The file is empty.');
    return { ...out, issues };
  }
  if (!/^#\s+\S/.test(lines[firstIdx])) {
    add('error', 'The file must start with an H1 (a line like “# Your Site”) naming the site. It’s the only required part.', firstIdx + 1);
  } else {
    out.title = lines[firstIdx].replace(/^#\s+/, '').trim();
  }

  let section = null; // null = before the first H2
  let sawSummary = false;
  let afterTitle = true; // still in the part between the H1 and the first H2
  lines.forEach((raw, i) => {
    const n = i + 1;
    const line = raw.trimEnd();
    if (i <= firstIdx || line.trim() === '') return;
    if (/^#\s/.test(line)) {
      add('error', 'Only one H1 is allowed; use “## Section” for sections.', n);
      return;
    }
    if (/^##\s+\S/.test(line)) {
      afterTitle = false;
      section = { name: line.replace(/^##\s+/, '').trim(), links: [], line: n };
      out.sections.push(section);
      return;
    }
    if (/^#{3,}\s/.test(line)) {
      repeated.subheadings.push(n);
      return;
    }
    if (afterTitle) {
      if (/^>/.test(line)) {
        if (!sawSummary) out.summary = line.replace(/^>\s?/, '').trim();
        else out.summary += ` ${line.replace(/^>\s?/, '').trim()}`;
        sawSummary = true;
      }
      return; // paragraphs and lists are allowed before the first section
    }
    const item = line.match(LINK_ITEM);
    if (item) {
      const rest = item[3].trim();
      const link = { name: item[1].trim(), url: item[2], notes: rest.replace(/^[:\-–—]\s*/, ''), section: section.name, line: n };
      section.links.push(link);
      out.links.push(link);
      if (!/^https?:\/\//i.test(link.url)) repeated.relative.push(n);
      if (rest && !rest.startsWith(':')) repeated.otherSeparator.push(n);
      return;
    }
    if (/^[-*+]\s/.test(line)) repeated.plainItems.push(n);
  });

  const where = (ns) => `line${ns.length > 1 ? 's' : ''} ${ns.slice(0, 8).join(', ')}${ns.length > 8 ? ` and ${ns.length - 8} more` : ''}`;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  if (repeated.plainItems.length) {
    issues.push({ level: 'warning', lines: repeated.plainItems, message: `${plural(repeated.plainItems.length, 'list item inside a section isn’t a link', 'list items inside sections aren’t links')} (${where(repeated.plainItems)}). Sections are lists of links in the format; put facts in the text above the first “##”.` });
  }
  if (repeated.subheadings.length) {
    issues.push({ level: 'warning', lines: repeated.subheadings, message: `${plural(repeated.subheadings.length, 'heading below H2', 'headings below H2')} (${where(repeated.subheadings)}). They aren’t part of the format; make each one its own “## Section” or drop it.` });
  }
  if (repeated.relative.length) {
    issues.push({ level: 'tip', lines: repeated.relative, message: `${plural(repeated.relative.length, 'link is relative', 'links are relative')} (${where(repeated.relative)}). Full URLs (https://…) work for any reader.` });
  }
  if (repeated.otherSeparator.length) {
    issues.push({ level: 'tip', lines: repeated.otherSeparator, message: `${plural(repeated.otherSeparator.length, 'link has', 'links have')} notes after something other than a colon (${where(repeated.otherSeparator)}). The format is “[name](url): notes”.` });
  }

  if (out.title && !sawSummary) add('warning', 'No summary. Add a one- or two-sentence blockquote (a line starting with “>”) right after the H1.');
  if (out.title && !out.sections.length) add('warning', 'No “## Section” with links yet. The links to your most useful pages are what makes the file useful.');
  for (const s of out.sections) if (!s.links.length) add('warning', `The “${s.name}” section has no links in the “[name](url)” form.`, s.line);
  const noNotes = out.links.filter((l) => !l.notes).length;
  if (out.links.length && noNotes > out.links.length / 2) add('tip', `${noNotes} of ${out.links.length} links have no notes. A short “: what this page covers” after each link helps a model pick the right one.`);
  if (out.links.length > 200) add('tip', `${out.links.length} links is a lot for a summary file; keep the most useful pages and move the rest under “## Optional” or into llms-full.txt.`);
  return { ...out, issues };
}

// Which of the AI crawlers robots.txt shuts out of the whole site ("Disallow: /" in the group that applies to it).
export function blockedCrawlers(robotsText, crawlers = AI_CRAWLERS) {
  const groups = [];
  let current = null;
  let lastWasAgent = false;
  for (const raw of String(robotsText || '').split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const [, field, value] = m;
    const key = field.toLowerCase();
    if (key === 'user-agent') {
      if (!lastWasAgent) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(value.trim().toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (current && (key === 'allow' || key === 'disallow')) current.rules.push({ allow: key === 'allow', path: value.trim() });
    }
  }
  const blocksAll = (rules) => {
    const root = rules.filter((r) => r.path === '/' || r.path === '/*');
    return root.some((r) => !r.allow) && !root.some((r) => r.allow);
  };
  return crawlers.filter((bot) => {
    const own = groups.filter((g) => g.agents.includes(bot.toLowerCase()));
    const applies = own.length ? own : groups.filter((g) => g.agents.includes('*'));
    return applies.some((g) => blocksAll(g.rules));
  });
}

// The Sitemap: lines in robots.txt.
export const sitemapsIn = (robotsText) =>
  String(robotsText || '')
    .split(/\r?\n/)
    .map((l) => l.match(/^\s*sitemap\s*:\s*(\S+)/i)?.[1])
    .filter(Boolean);

// <loc> entries of a sitemap or sitemap index.
export const locsIn = (xml) => [...String(xml || '').matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].replace(/&amp;/g, '&'));

const decode = (s) =>
  String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/\s+/g, ' ')
    .trim();

const metaContent = (html, attr, value) => {
  const tag = String(html).match(new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]*>`, 'i'))?.[0];
  return decode(tag?.match(/content=["']([^"']*)["']/i)?.[1]);
};

// A page's title, description and site name, from its HTML head.
export function pageInfo(html) {
  return {
    title: decode(String(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]),
    description: metaContent(html, 'name', 'description') || metaContent(html, 'property', 'og:description'),
    siteName: metaContent(html, 'property', 'og:site_name'),
  };
}

// "Pricing | Acme" → "Pricing", keeping the title whole when the site name isn't a suffix.
export function pageName(title, siteName) {
  const parts = String(title || '').split(/\s+[|·–—-]\s+/);
  if (parts.length > 1 && (!siteName || parts.at(-1).toLowerCase() === siteName.toLowerCase() || parts.at(-1).length < 30)) parts.pop();
  return parts.join(' - ').trim();
}

const sectionName = (path) => {
  const first = path.split('/').filter(Boolean)[0];
  if (!first) return 'Pages';
  return first.replace(/[-_]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
};

// Picks the pages a draft should list: the home page's own URL and files (images, video, PDFs) left out, shallow paths
// first (they're usually the main pages), at most `max`.
export function pickPages(urls, origin, max = 30) {
  const seen = new Set();
  return urls
    .map((u) => {
      try {
        return new URL(u);
      } catch {
        return null;
      }
    })
    .filter((u) => u && u.origin === origin && u.pathname !== '/' && !/\.(jpe?g|png|gif|webp|svg|mp4|mov|webm|mp3|pdf|zip|xml|txt|json|css|js)$/i.test(u.pathname) && !seen.has(u.pathname) && seen.add(u.pathname))
    .sort((a, b) => a.pathname.split('/').filter(Boolean).length - b.pathname.split('/').filter(Boolean).length || a.pathname.localeCompare(b.pathname))
    .slice(0, max)
    .map((u) => u.href);
}

// Writes a draft llms.txt from the home page and a list of pages ({ url, title, description }), grouped by the first
// part of their path; groups of one page go together under "Pages". It's a starting point: the page says to edit the
// summary and notes.
export function draftLlmsTxt({ site, summary, pages }) {
  const sections = new Map();
  for (const p of pages) {
    const name = sectionName(new URL(p.url).pathname);
    if (!sections.has(name)) sections.set(name, []);
    sections.get(name).push(p);
  }
  for (const [name, list] of [...sections]) {
    if (list.length > 1 || name === 'Pages') continue;
    sections.delete(name);
    if (!sections.has('Pages')) sections.set('Pages', []);
    sections.get('Pages').push(...list);
  }
  const lines = [`# ${site || 'Your site'}`, '', `> ${summary || 'One or two sentences on who you are and what this site offers.'}`, ''];
  for (const [name, list] of sections) {
    lines.push(`## ${name}`, '');
    for (const p of list) lines.push(`- [${p.title || new URL(p.url).pathname}](${p.url})${p.description ? `: ${p.description}` : ''}`);
    lines.push('');
  }
  return lines.join('\n');
}
