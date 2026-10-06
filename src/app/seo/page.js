import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, ClosingCta, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../components/ui/Page';
import { getCaseStudy } from '../../data/caseStudies';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { PERSON } from '../../lib/site';

export const metadata = {
  title: 'SEO & AI Search Optimization Services, Built by an Engineer',
  description:
    'SEO and AI search optimization: technical SEO, visibility in ChatGPT, Perplexity and Google’s AI Overviews, pages built from your own data, content planned from Search Console and Semrush, and lead capture that turns visits into inquiries. An engineer who fixes the site and builds the pages, not just a report.',
  alternates: { canonical: '/seo/' },
};

const services = [
  {
    title: 'Technical SEO audit and fixes',
    body: 'Crawling and indexing, canonical URLs, redirects, sitemaps, structured data, page speed and Core Web Vitals. I fix what I find in the code instead of handing you a list for someone else.',
  },
  {
    title: 'Pages built from your data',
    body: 'Location, product, comparison and guide pages generated from data you already have, each answering one search with real facts. Every page passes a quality check at build time, so thin pages never ship.',
  },
  {
    title: 'Search Console and Semrush planning',
    body: 'Find the queries you already show up for, the ones on page two, and the ones competitors rank for that you don’t. Then decide which pages to write, retitle or merge.',
  },
  {
    title: 'Content marketing from search data',
    body: 'Guides, comparisons and answer pages planned from the questions your customers type into Google, written to be the most useful page for that search, and linked so each one leads to your services.',
  },
  {
    title: 'Turning visits into leads',
    body: 'Calls to action, lead forms, free tools and downloadable checklists that give visitors a reason to get in touch, with tracking so you can see which pages bring inquiries.',
  },
  {
    title: 'Visibility in AI search',
    body: 'Structured data, an llms.txt guide, and crawler access for AI assistants, so ChatGPT, Claude, Perplexity and Google’s AI answers can read and cite your pages.',
  },
  {
    title: 'Monthly reviews',
    body: 'A Search Console and Semrush review each month: what moved, what to build next, and the fixes, shipped.',
  },
];

const steps = [
  ['01', 'Audit', 'A review of the site’s technical health and what it already ranks for, from Search Console and Semrush. You get a written plan in order of impact.'],
  ['02', 'Build', 'I fix the technical problems and build the pages the plan calls for, in your codebase or CMS.'],
  ['03', 'Measure', 'Once Google has had time to crawl the changes, a review of the queries and pages that moved, and the next round of pages.'],
];

const notDone = [
  'No bought links, link networks or guest-post schemes.',
  'No AI-spun articles published in bulk.',
  'No ranking guarantees. Nobody controls Google’s results, and anyone promising a position is guessing.',
  'No invented numbers on your pages. Facts come from your data or a cited source.',
];

const fit = [
  ['Sites on Next.js, React or a headless CMS', 'Code-level fixes and generated pages, directly in the repo.'],
  ['WordPress, Shopify or Webflow sites', 'Technical audit, structured data and content plan; theme or plugin changes where the platform allows.'],
  ['Businesses with data worth publishing', 'Locations, inventory, prices or public records turned into pages people search for.'],
];

const faqs = [
  {
    q: 'How long does SEO take to show results?',
    a: 'Technical fixes can show up within weeks of Google recrawling the site. New pages usually take one to three months to settle in the results, longer in competitive markets. Search Console shows impressions before clicks arrive, which is the first sign a page is working.',
  },
  {
    q: 'Do you do paid ads or social media marketing?',
    a: 'No. I focus on search: getting found on Google and in AI answers, and turning those visits into inquiries. For paid ads or social media, I can work alongside the agency or person who runs them, for example by building the landing pages they send traffic to.',
  },
  {
    q: 'Do you guarantee rankings?',
    a: 'No. Nobody controls Google’s results. What I can promise is a technically sound site, pages that answer real searches with facts, and a monthly review of what the data shows.',
  },
  {
    q: 'Which tools do you use?',
    a: 'Google Search Console for what the site already ranks for, Semrush for keyword research and competitors, and the site’s own analytics. I also read the code, since many SEO problems are in templates, routing and rendering.',
  },
  {
    q: 'Do you only work on Next.js sites?',
    a: 'No, but that is where I can do the most, because I change the code directly. On WordPress, Shopify or Webflow I do the audit, structured data and content plan, and make the changes the platform allows.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Access to Google Search Console (a read-only user is enough), your analytics, and the codebase or CMS. If you have data you would like to publish, such as locations or products, that too.',
  },
];

export default function SeoPage() {
  const proof = getCaseStudy('safe-streets-map-crash-data-platform');

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/seo/#service'),
            name: 'SEO and search marketing',
            serviceType: 'Search engine optimization and search marketing',
            provider: { '@id': ORG_ID },
            url: url('/seo/'),
            areaServed: 'United States',
          },
          breadcrumbNode([['Home', '/'], ['SEO & AI search', '/seo/']]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow="SEO · Search marketing · Content"
          title={<>Search marketing built by an engineer: pages that answer <Accent>what people search.</Accent></>}
          lede={`Most SEO and marketing work ends in a report someone else has to implement. I find what your customers search for in Search Console and Semrush, then fix the site, build the pages, and set them up to bring in inquiries myself. ${PERSON.yearsExperience} years of software engineering, working with you directly.`}
          facts={[
            ['Tools', 'Search Console, Semrush, your analytics'],
            ['Works on', 'Next.js, React, WordPress, Shopify'],
            ['Delivers', 'Fixes and pages, not just a report'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min review</PrimaryCta>
          {proof && <SecondaryCta href={`/work/${proof.slug}/`}>See the case study</SecondaryCta>}
        </PageHero>

        <Block index="01" label="Start here">
          <LinkRows
            items={[
              {
                href: '/seo/ai-search-optimization/',
                tag: 'New',
                title: 'AI search optimization',
                body: 'Get found and cited in ChatGPT, Claude, Perplexity and Google’s AI Overviews: crawler access, readable facts, and pages that answer what people ask.',
              },
              {
                href: '/seo/technical-seo-audit/',
                tag: 'Fixed scope',
                title: 'Technical SEO audit',
                body: 'The problems that actually cost you traffic, traced to the template or setting behind each one, with fixes ranked by impact.',
              },
              {
                href: '/seo/llms-txt/',
                tag: 'Free guide',
                title: 'What is llms.txt, and how to add one',
                body: 'What it does and doesn’t do for AI search, with Next.js and WordPress steps.',
              },
            ]}
          />
        </Block>

        <Block index="02" label="What I do">
          <ol className="border-t border-line">
            {services.map(({ title, body }, i) => (
              <li key={title} className="grid md:grid-cols-8 gap-4 md:gap-8 py-8 border-b border-line">
                <h2 className="md:col-span-3 flex gap-4 text-2xl md:text-3xl font-medium tracking-[-0.03em] leading-[1.08]">
                  <span className="font-mono text-xs text-faint pt-2">0{i + 1}</span>
                  {title}
                </h2>
                <p className="md:col-span-5 text-muted leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </Block>

        {proof && (
          <Block index="03" label="Proof" title={<>Safe Streets Map: <Accent>pages that answer searches.</Accent></>}>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-10">
              My own product, built the same way: more than 1,500 static pages generated from California crash records, each
              answering a question people search, such as whether a city is safe to walk or where to get a police report.
              Titles and new pages are shaped by what Search Console shows people looking for, with structured data, a
              generated sitemap and an llms.txt guide for AI assistants.
            </p>
            <LinkRows items={[{ href: `/work/${proof.slug}/`, title: proof.title, tag: `Case study · ${proof.client}`, body: proof.summary }]} />
          </Block>
        )}

        <Block index="04" label="How it works">
          <ol className="grid md:grid-cols-3 border-t border-line">
            {steps.map(([step, title, body], i) => (
              <li
                key={step}
                className={`flex flex-col pt-8 pb-10 md:px-8 md:first:pl-0 ${i > 0 ? 'md:border-l' : ''} border-line border-b md:border-b-0`}
              >
                <span className="text-[clamp(3.5rem,7vw,6rem)] font-medium leading-none tracking-[-0.06em] text-ink/15">{step}</span>
                <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block index="05" label="Who it fits">
          <DataTable columns={['Your site', 'What I do']} rows={fit} />
        </Block>

        <Block index="06" label="What I won't do">
          <NumberedList items={notDone} tone="accent" />
        </Block>

        <Block index="07" label="Questions">
          <FaqList faqs={faqs} />
        </Block>

        <ClosingCta
          title={<>Find out what your customers <Accent>are searching for.</Accent></>}
          body="A free 30-minute review: we look at your site and Search Console together, and I tell you what I’d fix first."
          href="/call/"
          cta="Book a free 30-min review"
          secondary={['/contact/', 'Send a message']}
        />
      </div>
      <Footer />
    </>
  );
}
