import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../../components/ui/Cta';
import { Block, ClosingCta, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';
import { OFFERS, formatUSD } from '../../../lib/site';

const audit = OFFERS.seoAudit;
const priceText = audit.price ? `${formatUSD(audit.price)} flat` : 'Fixed fee, quoted on a call';

export const metadata = {
  title: 'Technical SEO Audit: Fixed Scope, Done by an Engineer',
  description:
    'A technical SEO audit that reads your templates and code, not just a crawler report: indexing, canonicals, rendering, structured data, sitemaps, speed and AI crawler access, with a prioritized fix list and the option to have the fixes made.',
  alternates: { canonical: '/seo/technical-seo-audit/' },
};

// What gets checked, as [area, what I look at].
const checks = [
  ['Crawling and indexing', 'Pages Google can’t reach or chooses not to index, noindex and robots.txt mistakes, redirect chains, soft 404s, and what Search Console’s page indexing report says.'],
  ['Canonicals and duplicates', 'Canonical tags, trailing-slash and www variants, parameter URLs, and near-duplicate pages competing for the same search.'],
  ['Rendering', 'Whether content and links are in the HTML or only appear after JavaScript runs, and how the framework (Next.js, React, WordPress, Shopify) is set up to render them.'],
  ['Site structure and internal links', 'How pages link to each other, orphaned pages, and whether the pages that should rank get the links.'],
  ['Structured data', 'Organization, product, article, FAQ and breadcrumb markup: valid, accurate, and matching what’s on the page.'],
  ['Sitemaps', 'Whether the sitemap lists the right URLs, with honest last-modified dates, and matches what’s indexed.'],
  ['Speed and Core Web Vitals', 'Field data from Search Console and PageSpeed Insights, and the templates, images and scripts behind slow pages.'],
  ['AI search access', 'Crawler access for AI assistants in robots.txt, an llms.txt guide, and whether key facts are readable without JavaScript.'],
  ['Titles and search demand', 'Titles and headings compared with the queries Search Console shows you appear for, and pages on page two that a better title could lift.'],
];

const deliverables = [
  'A written report in plain language, every finding ranked by impact and effort',
  'The exact template, file or setting behind each issue, not just the URL it shows up on',
  'A fix list your developer can work from, or I make the fixes',
  'A walkthrough call to go through the findings',
];

const differences = [
  ['Crawler tools (Screaming Frog, Semrush Site Audit)', 'List symptoms per URL: thousands of rows, many harmless.', 'I use them too, then trace each real problem to the template or code that causes it.'],
  ['Agency SEO audits', 'Often a long PDF someone else has to implement.', 'Written for your developer, or I implement it myself.'],
];

const faqs = [
  {
    q: 'What is a technical SEO audit?',
    a: 'A review of how search engines crawl, render and index a site: the parts of SEO that live in the code and configuration rather than in the writing. It finds problems such as pages Google can’t index, duplicate URLs, slow templates and broken structured data, and says how to fix them.',
  },
  {
    q: 'How is this different from running Semrush or Screaming Frog myself?',
    a: 'Those tools are a good start and I use them. They report symptoms URL by URL, many of which don’t matter. The audit decides which problems actually cost you traffic, finds the template or setting that causes each one, and orders the fixes by impact.',
  },
  {
    q: 'What do you need from me?',
    a: 'Read access to Google Search Console and your analytics, and access to the codebase or CMS. Read-only access is enough for the audit.',
  },
  {
    q: 'Which platforms do you audit?',
    a: 'Next.js and React sites, WordPress, Shopify and Webflow. On Next.js and React I can make the fixes directly in the code; on hosted platforms I make the changes the platform allows.',
  },
  {
    q: 'Will the audit improve my rankings?',
    a: 'The audit itself changes nothing; the fixes do. Technical fixes remove what holds pages back, and results show up as Google recrawls the site, usually over weeks. Nobody can guarantee positions in Google.',
  },
];

export default function TechnicalSeoAuditPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/seo/technical-seo-audit/#service'),
            name: audit.name,
            serviceType: 'Technical SEO audit',
            provider: { '@id': ORG_ID },
            url: url('/seo/technical-seo-audit/'),
            areaServed: 'United States',
            ...(audit.price && {
              offers: { '@type': 'Offer', price: audit.price, priceCurrency: 'USD', url: url('/seo/technical-seo-audit/') },
            }),
          },
          breadcrumbNode([
            ['Home', '/'],
            ['SEO & search marketing', '/seo/'],
            ['Technical SEO audit', '/seo/technical-seo-audit/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/seo/', 'SEO & search marketing']}
          eyebrow="Fixed scope · Written report"
          title={<>A technical SEO audit that reads <Accent>the code.</Accent></>}
          lede="Crawler reports list thousands of symptoms. I find the few problems that actually cost you traffic, trace each one to the template or setting behind it, and rank the fixes by impact. Then your developer makes them, or I do."
          facts={[
            ['Price', priceText],
            ...(audit.durationDays ? [['Turnaround', `${audit.durationDays} business days`]] : []),
            ['Platforms', 'Next.js, React, WordPress, Shopify'],
            ['Data', 'Search Console, Semrush, your analytics'],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min review</PrimaryCta>
          <SecondaryCta href="/contact/">Ask a question</SecondaryCta>
        </PageHero>

        <Block index="01" label="What gets checked">
          <DataTable columns={['Area', 'What I look at']} rows={checks} />
        </Block>

        <Block index="02" label="What you get">
          <NumberedList items={deliverables} tone="accent" />
        </Block>

        <Block index="03" label="Why not just a tool" title="Different from a crawler report">
          <DataTable columns={['Usual approach', 'What you get', 'This audit']} rows={differences} />
        </Block>

        <Block index="04" label="Related">
          <LinkRows
            items={[
              { href: '/seo/', tag: 'Service', title: 'SEO & search marketing', body: 'Ongoing work after the audit: pages built from your data, content planned from search, monthly reviews.' },
              { href: '/seo/llms-txt/', tag: 'Guide', title: 'What is llms.txt, and how to add one', body: 'One of the AI-search checks in the audit, explained.' },
              { href: '/work/safe-streets-map-crash-data-platform/', tag: 'Case study', title: 'Safe Streets Map: more than 1,500 pages built for search' },
            ]}
          />
        </Block>

        <Block index="05" label="Questions">
          <FaqList faqs={faqs} />
        </Block>

        <ClosingCta
          title={<>Find out what&rsquo;s <Accent>holding the site back.</Accent></>}
          body="A free 30-minute review of your Search Console together, to decide whether an audit is worth it."
          href="/call/"
          cta="Book a free 30-min review"
          secondary={['/seo/', 'See all SEO services']}
        />
      </div>
      <Footer />
    </>
  );
}
