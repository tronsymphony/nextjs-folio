import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { Accent } from '../../../components/ui/Cta';
import { Block, Callout, ClosingCta, DataTable, FaqList, LinkRows, PageHero, Prose, formatDay } from '../../../components/ui/Page';
import { ORG_ID, PERSON_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';
import { PERSON } from '../../../lib/site';

const UPDATED = '2026-10-05';

export const metadata = {
  title: 'What Is llms.txt? How to Add One to Next.js or WordPress',
  description:
    'What llms.txt is, what goes in it, whether it helps SEO or AI search today, and how to add one to a Next.js or WordPress site, with a working example.',
  alternates: { canonical: '/seo/llms-txt/' },
};

const EXAMPLE = `# Casa Dev

> Casa Dev is the practice of Nitya Hoyos, a Los Angeles software engineer.
> It builds Oracle NetSuite integrations, customer portals and storefronts.

## Services

- [NetSuite integration audit](https://www.casa-dev.com/netsuite-audit/): fixed-scope review of every system connected to NetSuite.
- [SEO & AI search](https://www.casa-dev.com/seo/): technical SEO and pages built from data.

## Guides

- [NetSuite Shopify integration](https://www.casa-dev.com/netsuite/netsuite-shopify-integration/): connector, Celigo or custom code.

## Optional

- [About](https://www.casa-dev.com/about/)`;

const NEXT_ROUTE = `// app/llms.txt/route.js
// Generated from the same data as the site, so it never drifts.
import { pages } from '../../data/pages';

export const dynamic = 'force-static';

export function GET() {
  const lines = [
    '# Your Site',
    '',
    '> One or two sentences on who you are and what the site offers.',
    '',
    '## Pages',
    '',
    ...pages.map((p) => \`- [\${p.title}](https://example.com\${p.path}): \${p.summary}\`),
    '',
  ];
  return new Response(lines.join('\\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}`;

const ROBOTS = `# robots.txt: allow AI crawlers explicitly
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`;

const comparison = [
  ['robots.txt', 'Which crawlers may fetch which URLs', 'Yes: crawlers that follow the standard obey it'],
  ['sitemap.xml', 'Every URL you want indexed, with dates', 'Yes: search engines read it'],
  ['llms.txt', 'A short, curated guide to the site, in Markdown, for language models', 'No: it is a proposal, and support is voluntary'],
];

const faqs = [
  {
    q: 'What is llms.txt?',
    a: 'A Markdown file at the root of a website (example.com/llms.txt) that gives language models a short summary of the site and a curated list of its most useful pages. It was proposed in September 2024 at llmstxt.org.',
  },
  {
    q: 'Does llms.txt help SEO?',
    a: 'Not directly. Google has said it does not use llms.txt for Search, and no major AI company has said its assistants rely on it. It is cheap to add and can help tools and agents that do read it, so treat it as low-cost insurance, not a ranking factor.',
  },
  {
    q: 'Where does the llms.txt file go?',
    a: 'At the root of the domain, next to robots.txt, served as plain text: https://example.com/llms.txt.',
  },
  {
    q: 'What is the difference between llms.txt and robots.txt?',
    a: 'robots.txt tells crawlers which URLs they may fetch. llms.txt does not grant or block anything; it summarizes the site and points to its best pages. Blocking or allowing AI crawlers is done in robots.txt.',
  },
  {
    q: 'What is llms-full.txt?',
    a: 'A convention some sites follow alongside llms.txt: a single file with the full text of the important pages, so a model can read everything in one request. It is optional and mostly used by documentation sites.',
  },
];

export default function LlmsTxtGuide() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Article',
            headline: 'What is llms.txt, and how to add one',
            description: metadata.description,
            url: url('/seo/llms-txt/'),
            dateModified: UPDATED,
            author: { '@id': PERSON_ID },
            publisher: { '@id': ORG_ID },
          },
          breadcrumbNode([
            ['Home', '/'],
            ['SEO & AI search', '/seo/'],
            ['llms.txt', '/seo/llms-txt/'],
          ]),
          faqNode(faqs)
        )}
      />
      <article className="bg-canvas">
        <PageHero
          back={['/seo/', 'SEO & AI search']}
          eyebrow="SEO guide"
          size="md"
          title={<>What is llms.txt, and <Accent>how to add one</Accent></>}
          lede="llms.txt is a short Markdown file at the root of a site that tells language models what the site is and which pages matter. Here is what goes in it, what it does and doesn’t do today, and how to add one to Next.js or WordPress."
          facts={[
            ['Updated', formatDay(UPDATED)],
            ['Written by', PERSON.name],
            ['Time to add', 'Under an hour'],
            ['Live example', 'casa-dev.com/llms.txt'],
          ]}
        />

        <Block index="01" label="What it is">
          <Prose
            paragraphs={[
              'llms.txt was proposed in September 2024 at llmstxt.org as a way for websites to offer language models a clean summary instead of making them parse navigation, scripts and ads. It lives at the root of the domain, like robots.txt, and is written in Markdown.',
              'The format is simple: a title, a one-paragraph summary in a blockquote, and sections of links, each with a short note on what the page contains. A section named “Optional” marks links a model can skip when it needs to keep things short.',
            ]}
          />
        </Block>

        <Block index="02" label="Example" title="What goes in the file" wide>
          <pre className="p-6 md:p-8 rounded-3xl bg-canvas-2 border border-line text-[13px] leading-relaxed text-ink/85 overflow-x-auto font-mono">
            <code>{EXAMPLE}</code>
          </pre>
        </Block>

        <Block index="03" label="Does it help?">
          <Callout label="The honest answer">
            Not for Google rankings: Google has said it doesn’t use llms.txt in Search, and no major AI company has said its assistants
            rely on it. It costs under an hour, though, and some tools and AI agents do read it, so it is cheap insurance. What
            matters more for AI search is that crawlers are allowed in robots.txt and your key facts are in the HTML, not only in
            JavaScript.
          </Callout>
        </Block>

        <Block index="04" label="robots.txt, sitemap, llms.txt">
          <DataTable columns={['File', 'What it tells machines', 'Enforced?']} rows={comparison} />
        </Block>

        <Block index="05" label="Next.js" title="Add it to a Next.js site" wide>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-8">
            In the App Router, a route handler at <code className="font-mono text-ink">app/llms.txt/route.js</code> serves the file.
            Build it from the same data as your pages so it updates itself; <code className="font-mono text-ink">force-static</code>{' '}
            makes it a static file at build time.
          </p>
          <pre className="p-6 md:p-8 rounded-3xl bg-canvas-2 border border-line text-[13px] leading-relaxed text-ink/85 overflow-x-auto font-mono">
            <code>{NEXT_ROUTE}</code>
          </pre>
        </Block>

        <Block index="06" label="WordPress">
          <Prose
            paragraphs={[
              'The simplest way is to write the file by hand and upload it to the site root through your host’s file manager or SFTP, the same folder that holds wp-config.php. Check that https://yoursite.com/llms.txt opens as plain text.',
              'Some SEO plugins, including Yoast SEO, can now generate one for you. A generated file lists many pages; a hand-written one can focus on the few that matter, which is the point of the format.',
            ]}
          />
        </Block>

        <Block index="07" label="Let AI crawlers in" title="The part that matters more: robots.txt" wide>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-8">
            If robots.txt blocks AI crawlers, llms.txt won’t help. Name the ones you want to allow:
          </p>
          <pre className="p-6 md:p-8 rounded-3xl bg-canvas-2 border border-line text-[13px] leading-relaxed text-ink/85 overflow-x-auto font-mono">
            <code>{ROBOTS}</code>
          </pre>
        </Block>

        <Block index="08" label="Questions">
          <FaqList faqs={faqs} />
        </Block>

        <Block index="09" label="Read next">
          <LinkRows
            items={[
              { href: '/seo/technical-seo-audit/', tag: 'Service', title: 'Technical SEO audit', body: 'AI crawler access is one of nine areas the audit checks.' },
              { href: '/seo/', tag: 'Service', title: 'SEO & AI search' },
            ]}
          />
        </Block>

        <ClosingCta
          title={<>Want your site ready for <Accent>AI search?</Accent></>}
          body="The technical SEO audit checks crawler access, structured data and what is readable without JavaScript."
          href="/seo/technical-seo-audit/"
          cta="See the audit"
          secondary={['/call/', 'Book a free 30-min review']}
        />
      </article>
      <Footer />
    </>
  );
}
