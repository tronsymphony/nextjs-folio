import Footer from '../../../components/footer';
import HomeFollow from '../../../components/home-follow';
import JsonLd from '../../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../../components/ui/Cta';
import { Block, ClosingCta, DataTable, FaqList, LinkRows, PageHero } from '../../../components/ui/Page';
import { getCaseStudy } from '../../../data/caseStudies';
import { OFFERS, PERSON, formatUSD } from '../../../lib/site';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';

// Casa Dev's home-market page: Los Angeles and California. Facts only; no
// claims about clients or rankings that we can't show.

const TITLE = 'NetSuite, AI Integration & SEO Engineer in Los Angeles';
const DESCRIPTION = `A senior engineer based in Los Angeles: NetSuite integrations, AI features in the tools you already run, audits for apps built with AI, and technical SEO, for businesses across California. Free 30-minute review; audits from ${formatUSD(
  Math.min(OFFERS.audit.price, OFFERS.appAudit.price, OFFERS.seoAudit.price)
)}.`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/about/los-angeles/' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/about/los-angeles/' },
};

const services = [
  {
    href: '/netsuite/',
    tag: `Audit ${formatUSD(OFFERS.audit.price)}`,
    title: 'NetSuite integrations and portals',
    body: 'NetSuite connected to Shopify, EDI trading partners, 3PLs and CRMs, plus customer portals and storefronts on live ERP data. For distributors, manufacturers and wholesalers that run on NetSuite.',
  },
  {
    href: '/call/',
    tag: 'Free review first',
    title: 'AI integration',
    body: 'AI added to the systems you already run: pulling order and invoice details out of emails and PDFs into NetSuite, search over your own catalog or documents, drafts of quotes and replies for staff to check, and image work like the ML photo tool I built for an inventory team.',
  },
  {
    href: '/ai-app-audit/',
    tag: `Audit ${formatUSD(OFFERS.appAudit.price)}`,
    title: 'Audits for apps built with AI',
    body: 'A security and production-readiness review of apps built with Lovable, Bolt, Cursor or Claude Code, before they take real users or payments.',
  },
  {
    href: '/seo/',
    tag: `Audit ${formatUSD(OFFERS.seoAudit.price)}`,
    title: 'Technical SEO and search',
    body: 'Technical fixes and pages planned from Search Console and Semrush, built into the site rather than handed over as a report.',
  },
];

const fit = [
  ['Distributors, manufacturers and wholesalers on NetSuite', 'Orders, stock and pricing kept in step between NetSuite, your storefront, EDI partners and the 3PL.'],
  ['Warehouses and field teams', 'Offline-first apps for technicians and sales reps that sync to NetSuite when signal comes back.'],
  ['Teams that built an app with AI tools', 'A fixed-price check of who can see what, keys, payments and data before launch.'],
  ['Businesses that want more from search', 'Technical SEO, structured data and pages that answer what customers search for.'],
];

const faqs = [
  {
    q: 'Do you only work with Los Angeles companies?',
    a: `No. I'm based in ${PERSON.location} and work with businesses across California and the rest of the U.S. Most of the work happens over video calls and shared screens, on Pacific time.`,
  },
  {
    q: 'What does the free 30-minute review cover?',
    a: 'Pick one: your NetSuite integrations, an app built with AI tools, your site and its search results, or a process you would like to add AI to. Send a link or a short description first; I look at it before the call and tell you what I would do first, whether or not you hire me.',
  },
  {
    q: 'What kind of AI integration do you do?',
    a: 'Practical features inside the tools you already use: reading documents and emails into structured records, search over your own data, drafts that a person reviews before anything is sent, and image processing. I use hosted models such as Claude where they fit and run models locally when the data should not leave your systems.',
  },
  {
    q: 'Does the app audit look at California privacy rules?',
    a: 'The audit covers what personal data your app collects, where it is stored and who can read it, which is the groundwork for California’s privacy law (the CCPA). It is a technical review, not legal advice; the California Attorney General’s CCPA page explains the law itself.',
  },
  {
    q: 'Who will I work with?',
    a: `Me, ${PERSON.name}. ${PERSON.yearsExperience} years of software engineering, and the person on your first call is the person writing your code.`,
  },
];

export default function LosAngelesPage() {
  const proofMap = getCaseStudy('safe-streets-map-crash-data-platform');
  const proofShowroom = getCaseStudy('total-warehouse-netsuite-digital-showroom');
  const proof = [proofMap, proofShowroom].filter(Boolean);

  return (
    <>
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/about/los-angeles/#service'),
            name: 'NetSuite integration, AI integration, app audits and technical SEO in Los Angeles',
            provider: { '@id': ORG_ID },
            url: url('/about/los-angeles/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'State', name: 'California' },
            ],
          },
          breadcrumbNode([['Home', '/'], ['About', '/about/'], ['Los Angeles', '/about/los-angeles/']]),
          faqNode(faqs)
        )}
      />
      <HomeFollow />
      <div className="bg-canvas">
        <PageHero
          back={['/about/', 'About']}
          eyebrow="Los Angeles · California"
          title={<>NetSuite, AI and search engineering for <Accent>Los Angeles businesses.</Accent></>}
          lede={`I'm ${PERSON.name}, a senior engineer based in Los Angeles. I connect NetSuite to the rest of your business, add AI to the tools you already run, audit apps built with AI before launch, and fix the technical SEO that keeps sites out of search. You work with me directly, from the first call to launch.`}
          facts={[
            ['Based in', PERSON.location],
            ['Experience', `${PERSON.yearsExperience} years of software engineering`],
            ['First step', 'Free 30-minute review'],
            ['Audits from', formatUSD(Math.min(OFFERS.audit.price, OFFERS.appAudit.price, OFFERS.seoAudit.price))],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min review</PrimaryCta>
          <SecondaryCta href="/work/">See the work</SecondaryCta>
        </PageHero>

        <Block index="01" label="What I do">
          <LinkRows items={services} />
        </Block>

        <Block index="02" label="Who it fits" title={<>Built for how California businesses <Accent>actually run.</Accent></>}>
          <DataTable columns={['You are', 'What I do']} rows={fit} />
        </Block>

        {proof.length > 0 && (
          <Block index="03" label="Built in California" title={<>Work you can <Accent>look at.</Accent></>}>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-10">
              Safe Streets Map is my own product: maps and more than 1,500 pages built from California crash records, one for each
              city and the streets with the most crashes, found through search. The Total Warehouse showroom reads forklift and
              warehouse-equipment inventory straight from NetSuite.
            </p>
            <LinkRows items={proof.map((p) => ({ href: `/work/${p.slug}/`, title: p.title, tag: `Case study · ${p.client}`, body: p.summary }))} />
          </Block>
        )}

        <Block index="04" label="Questions">
          <FaqList faqs={faqs} />
          <p className="mt-8 text-sm text-muted">
            California privacy law:{' '}
            <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="text-accent underline">
              the Attorney General&rsquo;s CCPA page
            </a>
            .
          </p>
        </Block>

        <ClosingCta
          title={<>Start with a free review, <Accent>here in LA.</Accent></>}
          body="Thirty minutes on your NetSuite setup, your app, your site or the process you want to add AI to. You leave knowing what to fix first."
          href="/call/"
          cta="Book a free 30-min review"
          secondary={['/contact/', 'Send a message']}
        />
      </div>
      <Footer />
    </>
  );
}
