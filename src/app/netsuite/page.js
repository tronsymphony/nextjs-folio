import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import LeadMagnetCTA from '../../components/LeadMagnetCTA';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, DataTable, FaqList, LinkRows, PageHero } from '../../components/ui/Page';
import { featuredCaseStudies } from '../../data/caseStudies';
import { offers } from '../../data/netsuiteOffers';
import { publishedTopics } from '../../data/netsuiteTopics';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { PERSON } from '../../lib/site';

export const metadata = {
  title: 'Oracle NetSuite Integration & Front-End Development',
  description:
    'NetSuite integrations, customer and dealer portals, and ERP-connected storefronts. Custom Next.js, React and Angular front ends on live NetSuite data, from a senior engineer with 15 years of experience.',
  alternates: { canonical: '/netsuite/' },
};

const patterns = [
  {
    name: 'Native connector or app',
    when: 'Standard flows (orders in, fulfillments out) between NetSuite and a mainstream platform, with little custom logic.',
    watch: 'Customizations you can’t see or change, and behavior that breaks quietly when either side changes.',
  },
  {
    name: 'Middleware (Celigo, Boomi, etc.)',
    when: 'Several systems, mostly standard mappings, and a team that wants a dashboard to watch flows and retry errors.',
    watch: 'Licensing that scales with volume or flows, and complex logic squeezed into mapping screens.',
  },
  {
    name: 'Custom integration',
    when: 'Customer-facing experiences, unusual data models, real-time needs, or logic that belongs in code with tests.',
    watch: 'It needs an owner. Without monitoring and documentation, custom code becomes the next legacy system.',
  },
];

const faqs = [
  {
    q: 'What does a NetSuite front-end developer do?',
    a: 'A NetSuite front-end developer builds the customer- and staff-facing applications that sit on top of NetSuite data: storefronts, customer portals, quote tools, and dashboards. The work combines NetSuite APIs such as SuiteTalk REST, RESTlets and SuiteQL with modern web frameworks like Next.js, React, or Angular.',
  },
  {
    q: 'Should we use SuiteCommerce or a custom front end?',
    a: 'SuiteCommerce is a good fit when your storefront is close to standard and you want everything inside NetSuite. A custom front end makes sense when you need a specific buying experience, better performance, content from other systems, or B2B workflows SuiteCommerce handles poorly. The deciding factor is usually how much you would have to customize SuiteCommerce anyway.',
  },
  {
    q: 'How do you keep a custom front end in sync with NetSuite?',
    a: 'By deciding per data type how fresh it must be. Catalog and content can be cached and refreshed on a schedule or on change events; inventory and pricing are read closer to real time; orders are written back through the API with idempotency and retries. Governance limits and account concurrency set the budget, so the design has to respect them from day one.',
  },
  {
    q: 'Do you work alongside our NetSuite partner?',
    a: 'Yes. Implementation partners typically own configuration, accounting, and workflows inside NetSuite. I focus on integrations and the applications outside it, and coordinate with your partner on scripts, roles, and custom records.',
  },
];

export default function NetSuiteHubPage() {
  const topics = publishedTopics();
  const proof = featuredCaseStudies().find((c) => c.integrations.includes('Oracle NetSuite'));
  const integrationGuides = topics.filter((t) => t.estimate);
  const technicalGuides = topics.filter((t) => !t.estimate);

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/netsuite/#service'),
            name: 'Oracle NetSuite integration and front-end development',
            serviceType: 'NetSuite integration',
            provider: { '@id': ORG_ID },
            url: url('/netsuite/'),
            areaServed: 'United States',
          },
          breadcrumbNode([['Home', '/'], ['NetSuite', '/netsuite/']]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow="Oracle NetSuite · Integrations · Front ends"
          title={<>NetSuite is your system of record. It shouldn&rsquo;t be a <Accent>dead end.</Accent></>}
          lede={`I connect Oracle NetSuite to the storefronts, EDI trading partners, 3PLs, portals, and tools your customers and staff actually use, and build those front ends in Next.js, React, or Angular. ${PERSON.yearsExperience} years of software engineering, working directly with you, not through an account manager.`}
        >
          <PrimaryCta />
          <SecondaryCta />
        </PageHero>

        <Block index="01" label="What I build">
          <ol className="border-t border-line">
            {offers.map(({ title, body }, i) => (
              <li key={title} className="grid md:grid-cols-8 gap-4 md:gap-8 py-8 border-b border-line">
                <h3 className="md:col-span-3 flex gap-4 text-2xl md:text-3xl font-medium tracking-[-0.03em] leading-[1.08]">
                  <span className="font-mono text-xs text-faint pt-2">0{i + 1}</span>
                  {title}
                </h3>
                <p className="md:col-span-5 text-muted leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block index="02" label="Choosing an approach" title="Connector, middleware, or custom?">
          <p className="text-lg text-muted leading-relaxed max-w-2xl mb-10">
            Most NetSuite integration problems start with the wrong choice here. Each option is right somewhere.
          </p>
          <DataTable columns={['Approach', 'Choose it when', 'Watch out for']} rows={patterns.map((p) => [p.name, p.when, p.watch])} />
        </Block>

        {integrationGuides.length > 0 && (
          <Block index="03" label="Integration guides" title="Cost, timeline and approach, by system">
            <LinkRows items={integrationGuides.map((t) => ({ href: `/netsuite/${t.slug}/`, title: t.h1, body: t.lede }))} />
          </Block>
        )}

        {technicalGuides.length > 0 && (
          <Block index="04" label="Technical guides" title="APIs, queries and portals">
            <LinkRows items={technicalGuides.map((t) => ({ href: `/netsuite/${t.slug}/`, title: t.h1, body: t.lede }))} />
          </Block>
        )}

        <Block index="05" label="Industry & proof">
          <LinkRows
            items={[
              {
                href: '/netsuite/material-handling/',
                tag: 'Industry',
                title: 'Material handling, logistics & industrial distribution',
                body: 'Equipment catalogs, rental and RFQ engines, and multi-branch portals on NetSuite.',
              },
              ...(proof ? [{ href: `/work/${proof.slug}/`, tag: `Case study · ${proof.client}`, title: proof.title, body: proof.summary }] : []),
              {
                href: '/tools/netsuite-integration-estimator/',
                tag: 'Tool',
                title: 'NetSuite integration cost estimator',
                body: 'Scope outline, risks, and a cost range for your integration. No email required.',
              },
            ]}
          />
        </Block>

        <Block index="06" label="Free checklist">
          <LeadMagnetCTA />
        </Block>

        <Block index="07" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
