import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import LlmsTxtTool from '../../../components/LlmsTxtTool';
import { Accent, PrimaryCta, SecondaryCta } from '../../../components/ui/Cta';
import { Block, DataTable, FaqList, LinkRows, PageHero } from '../../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';

// Keyword research 2026-11-03 (Keyword Planner, US): "llms txt checker", "llms txt check", "llms txt generator" and
// "llms txt example" 500 a month each, checker searches up 900% in a year; "llms txt test/tester/validator" 50 each.
// A free tool also earns links, which a young domain needs. Rules in src/lib/llmsTxt.js; fetching in /api/llms-txt.

export const metadata = {
  title: 'llms.txt Checker & Generator: Test or Create Your llms.txt',
  description:
    'Free llms.txt checker and generator. Test any site’s llms.txt against the format at llmstxt.org, check its links and whether robots.txt blocks AI crawlers, or draft one from your sitemap in seconds.',
  alternates: { canonical: '/tools/llms-txt-checker/' },
};

const checks = [
  ['The file', 'Answers at /llms.txt with a 200 and plain text, not an HTML “not found” page.'],
  ['The title', 'Starts with one H1 naming the site, the only part the format requires.'],
  ['The summary', 'A short blockquote right after the title.'],
  ['The sections', '“## Section” headings, each with a list of links written “[name](url): notes”.'],
  ['The links', 'Up to 20 of them opened to see that they still answer.'],
  ['robots.txt', 'Whether GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot or Google-Extended is shut out of the whole site.'],
  ['llms-full.txt', 'Whether the optional full-text companion file exists.'],
];

const faqs = [
  {
    q: 'What is an llms.txt file?',
    a: 'A Markdown file at the root of a website (example.com/llms.txt) that gives language models a short summary of the site and a list of its most useful pages, each with a note. It was proposed in September 2024 at llmstxt.org.',
  },
  {
    q: 'What does a valid llms.txt need?',
    a: 'Only an H1 with the site’s name is required. Then, in order: an optional blockquote summary, optional text without headings, and sections that start with “##”, each a list of links written as [name](url) with optional notes after a colon. A section named “Optional” marks links a model can skip.',
  },
  {
    q: 'Does llms.txt help SEO?',
    a: 'Not directly. Google has said it doesn’t use llms.txt for Search, and no major AI company has said its assistants rely on it. It is cheap to add and helps the tools and agents that do read it. What matters more for AI search is that crawlers can reach your pages and that the pages answer questions clearly.',
  },
  {
    q: 'Is the generated file ready to publish?',
    a: 'It’s a draft. The generator reads your sitemap and the titles and descriptions of up to 25 pages, so it is only as good as those. Rewrite the summary, keep the pages that matter most, and make each note say what the page covers.',
  },
  {
    q: 'Do you store the sites I check?',
    a: 'No. The tool reads the site’s public files to answer, and nothing about the check is kept.',
  },
];

export default function LlmsTxtCheckerPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'WebApplication',
            '@id': url('/tools/llms-txt-checker/#app'),
            name: 'llms.txt Checker & Generator',
            url: url('/tools/llms-txt-checker/'),
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            provider: { '@id': ORG_ID },
          },
          breadcrumbNode([
            ['Home', '/'],
            ['SEO & AI search', '/seo/'],
            ['llms.txt checker', '/tools/llms-txt-checker/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/seo/llms-txt/', 'What is llms.txt?']}
          eyebrow="Free tool · No sign-up"
          title={<>llms.txt checker and <Accent>generator.</Accent></>}
          lede="Check any site’s llms.txt against the format, its links and its robots.txt, or draft one from your sitemap in seconds."
        />

        <Block index="01" label="Check or generate" wide>
          <LlmsTxtTool />
        </Block>

        <Block index="02" label="What the checker looks at">
          <DataTable columns={['Check', 'What passes']} rows={checks} />
        </Block>

        <Block index="03" label="Beyond the file" title={<>Getting found by AI assistants <Accent>takes more than one file.</Accent></>}>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-10">
            llms.txt is the easy part. What decides whether ChatGPT, Claude and Perplexity cite you is whether their crawlers can reach your pages, whether
            those pages answer the questions your customers ask, and whether the facts are easy to read. That’s the work behind AI search optimization.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <PrimaryCta href="/seo/ai-search-optimization/">AI search optimization services</PrimaryCta>
            <SecondaryCta href="/seo/llms-txt/">How to add llms.txt to Next.js or WordPress</SecondaryCta>
          </div>
          <LinkRows
            items={[
              { href: '/seo/llms-txt/', tag: 'Guide', title: 'What is llms.txt?', body: 'The format, a working example, and the code for Next.js and WordPress.' },
              { href: '/seo/technical-seo-audit/', tag: 'Service', title: 'Technical SEO audit', body: 'Crawling, indexing, structured data and AI crawler access, traced to the code.' },
            ]}
          />
        </Block>

        <Block index="04" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
