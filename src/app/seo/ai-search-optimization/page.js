import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../../components/ui/Cta';
import { Block, ClosingCta, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';
import { OFFERS, PERSON, formatUSD } from '../../../lib/site';

// Sells AI search optimization (Keyword Planner, Sep 2025-Aug 2026: "ai search
// optimization" 1K-10K a month, up 900% year on year). Every claim about a
// crawler or platform links to that company's own documentation.

const audit = OFFERS.seoAudit;
const priceText = audit.price ? `${formatUSD(audit.price)} flat` : 'Fixed fee, quoted on a call';

export const metadata = {
  title: 'AI Search Optimization: Get Found in ChatGPT, Perplexity & AI Overviews',
  description: `AI search optimization by an engineer in Los Angeles: crawler access for ChatGPT, Claude and Perplexity, structured data, pages that answer what people ask, and a check of what AI assistants say about you now. Part of the ${priceText} technical SEO audit.`,
  alternates: { canonical: '/seo/ai-search-optimization/' },
};

// Who reads your site for which assistant, from each company's docs.
const crawlers = [
  ['ChatGPT search', 'OAI-SearchBot', 'Finds pages to show and cite in ChatGPT search. Separate from GPTBot, which collects training data.', 'https://developers.openai.com/docs/bots'],
  ['Claude', 'Claude-SearchBot', 'Builds the index Claude searches. Separate from ClaudeBot (training) and Claude-User (pages a person asks for).', 'https://support.claude.com/en/articles/8896518'],
  ['Perplexity', 'PerplexityBot', 'Finds and links pages in Perplexity answers. Perplexity says it doesn’t crawl for training.', 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md'],
  ['Google AI Overviews and AI Mode', 'Googlebot', 'They’re part of Google Search, so ordinary Googlebot indexing is what counts. Blocking Google-Extended affects Gemini, not AI Overviews.', 'https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers'],
];

const checks = [
  ['Crawler access', 'robots.txt, firewall and CDN rules for each assistant’s search crawler. Cloudflare has blocked AI crawlers by default for new domains since July 2025, so sites can be invisible to ChatGPT without anyone choosing that.'],
  ['Readable without JavaScript', 'Whether your services, prices, locations and hours are in the HTML or only appear after scripts run. Many crawlers read the HTML and move on.'],
  ['Structured data', 'Organization, LocalBusiness, Service, Product and FAQ markup that states who you are, where you work and what you sell, matching what the page says.'],
  ['Pages that answer the question', 'Assistants quote pages that answer what people ask them: what something costs, who does it in Los Angeles, how two options compare. I find the questions you should answer and build those pages.'],
  ['The same facts everywhere', 'Name, services, area and contact details consistent across your site, Google Business Profile and directories, so assistants don’t repeat an old address or a service you dropped.'],
  ['What assistants say now', 'The prompts your customers would use, run in ChatGPT, Claude, Perplexity and Google, with what each says about you and who it recommends instead.'],
  ['Measuring it', 'Visits from chatgpt.com, perplexity.ai and other assistants set up as their own channel in GA4 or PostHog, so you can see whether the work brings people in.'],
];

const deliverables = [
  'What each AI assistant says about your business today, for the questions your customers ask',
  'Every crawler, firewall or rendering problem that hides you, with the exact fix',
  'A list of pages to write or rework, ranked by the questions they answer',
  'Tracking for visits from AI assistants, so results are measured, not guessed',
];

const faqs = [
  {
    q: 'What is AI search optimization?',
    a: 'Making sure AI assistants such as ChatGPT, Claude, Perplexity and Google’s AI Overviews can read your site, understand what you offer, and cite you when someone asks a question you answer. Some people call it GEO, generative engine optimization. Most of it is technical: crawler access, readable HTML, structured data and pages that answer real questions.',
  },
  {
    q: 'Is it different from SEO?',
    a: 'It builds on it. Google’s AI Overviews come from Google’s normal index, and the other assistants search the web too, so a site that is technically sound for search is most of the way there. The extra work is crawler access for each assistant, facts that are easy to quote, and pages written around the questions people ask assistants.',
  },
  {
    q: 'Can you guarantee ChatGPT will recommend my business?',
    a: 'No, and nobody honestly can. Each assistant decides what to cite. What the work does is remove the reasons you are left out and give assistants clear, consistent facts to use, then measure what changes.',
  },
  {
    q: 'Does llms.txt matter?',
    a: 'It is cheap to add and harmless, but no major assistant has said it uses the file to rank or cite sites. Crawler access and good pages matter far more. My llms.txt guide explains what it does and doesn’t do.',
  },
  {
    q: 'Do you work with Los Angeles businesses?',
    a: `Yes. I’m based in ${PERSON.location}, and local questions like “who does this near me” are where assistants lean hardest on your site, your Google Business Profile and directories. I work with businesses across California and the U.S. too.`,
  },
  {
    q: 'What does it cost?',
    a: `The AI search check is part of the technical SEO audit (${priceText}). Building the pages and fixes afterwards is a fixed-scope project, or monthly work if you want the measuring and new pages to continue. It starts with a free 30-minute review.`,
  },
];

export default function AiSearchOptimizationPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/seo/ai-search-optimization/#service'),
            name: 'AI search optimization',
            serviceType: 'AI search optimization',
            provider: { '@id': ORG_ID },
            url: url('/seo/ai-search-optimization/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'Country', name: 'United States' },
            ],
          },
          breadcrumbNode([
            ['Home', '/'],
            ['SEO & AI search', '/seo/'],
            ['AI search optimization', '/seo/ai-search-optimization/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/seo/', 'SEO & AI search']}
          eyebrow="ChatGPT · Claude · Perplexity · Google AI Overviews"
          title={<>AI search optimization: be the business assistants <Accent>can find and cite.</Accent></>}
          lede="More people ask ChatGPT, Perplexity and Google’s AI who to hire. I check what those assistants can read on your site and what they say about you, fix what hides you, and build the pages that answer the questions your customers ask."
          facts={[
            ['Starts with', 'Free 30-minute review'],
            ['Audit', priceText],
            ['Covers', 'ChatGPT, Claude, Perplexity, Google'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min review</PrimaryCta>
          <SecondaryCta href="/seo/technical-seo-audit/">See the audit</SecondaryCta>
        </PageHero>

        <Block index="01" label="Who reads your site" title="Each assistant has its own crawler">
          <DataTable
            columns={['Assistant', 'Crawler', 'What it does']}
            mono={[1]}
            rows={crawlers.map(([who, bot, what, href]) => [
              who,
              bot,
              <>
                {what}{' '}
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  Docs
                </a>
              </>,
            ])}
          />
        </Block>

        <Block index="02" label="What I check and fix">
          <DataTable columns={['Area', 'What it means']} rows={checks} />
        </Block>

        <Block index="03" label="What you get">
          <NumberedList items={deliverables} tone="accent" />
        </Block>

        <Block index="04" label="Proof" title={<>Built this way: <Accent>Safe Streets Map.</Accent></>}>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-10">
            My own product welcomes AI crawlers in robots.txt, publishes an llms.txt guide to its data, marks up every page with
            structured data, and answers the questions people search about California streets across more than 1,500 pages.
          </p>
          <LinkRows
            items={[
              { href: '/work/safe-streets-map-crash-data-platform/', tag: 'Case study', title: 'Safe Streets Map: pages built for search and AI assistants' },
              { href: '/seo/technical-seo-audit/', tag: 'Fixed scope', title: 'Technical SEO & AI search audit', body: 'Where the AI search check lives, alongside indexing, rendering and speed.' },
              { href: '/seo/llms-txt/', tag: 'Guide', title: 'What is llms.txt, and how to add one' },
            ]}
          />
        </Block>

        <Block index="05" label="Questions">
          <FaqList faqs={faqs} />
        </Block>

        <ClosingCta
          title={<>Find out what AI assistants <Accent>say about you.</Accent></>}
          body="A free 30-minute review: we ask ChatGPT and Google the questions your customers ask, and look at what your site lets them read."
          href="/call/"
          cta="Book a free 30-min review"
          secondary={['/contact/', 'Send a message']}
        />
      </div>
      <Footer />
    </>
  );
}
