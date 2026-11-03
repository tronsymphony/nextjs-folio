import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, Callout, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { OFFERS, PERSON, formatUSD } from '../../lib/site';

// Keyword Planner (US, Sep 2025-Aug 2026): "api integration services" 500 a month, low competition, bids
// $23-119; "custom api integration" 500, bids $20-92; "crm integration services" and "erp integration
// service" 500 each. The systems line of work, with NetSuite as one system among several.

const audit = OFFERS.audit;

export const metadata = {
  title: 'API Integration Services: Connect Your Store, CRM & ERP',
  description:
    'Custom API integration services from a Los Angeles engineer: Shopify, BigCommerce, HubSpot, Salesforce, NetSuite, QuickBooks, 3PLs and EDI partners kept in sync, with retries, logs and alerts, so nobody retypes data between systems.',
  alternates: { canonical: '/api-integration-services/' },
};

const pairs = [
  ['Store and ERP', 'Orders, stock, prices and fulfillment between Shopify or BigCommerce and NetSuite or QuickBooks.', ['/netsuite/netsuite-shopify-integration/', 'Shopify guide']],
  ['CRM and ERP', 'Customers, quotes and orders between HubSpot or Salesforce and the ERP, without two versions of each customer.', ['/netsuite/netsuite-hubspot-integration/', 'HubSpot guide']],
  ['Warehouse and 3PL', 'Orders out, shipments and tracking back, inventory counts reconciled.', ['/netsuite/netsuite-3pl-integration/', '3PL guide']],
  ['Trading partners (EDI)', 'Purchase orders, acknowledgments, ship notices and invoices with retailers and distributors.', ['/edi/', 'EDI explained']],
  ['Portals and apps', 'Customer or dealer portals and internal tools reading live data from the systems above.', ['/netsuite/netsuite-customer-portal/', 'Portal guide']],
];

const options = [
  ['Off-the-shelf connector', 'Standard flows between two popular systems, such as a store and an ERP.', 'Fast to start; limited when your rules differ from the connector’s.'],
  ['Integration platform (Zapier, Make, Workato, Celigo, Boomi)', 'Many simple flows, or a team that wants to edit flows without code.', 'Per-task or license cost; complex logic gets hard to follow and test.'],
  ['Custom API integration', 'Your own rules, high volume, unusual systems, or flows the others can’t do reliably.', 'Code to host and maintain; you own it outright.'],
];

const reliability = [
  'Safe to run twice. Every sync can be repeated without creating duplicates, because things fail halfway.',
  'Retries with limits. Temporary errors and API rate limits are retried; permanent errors stop and alert someone.',
  'A log you can read. Every record moved, changed or skipped, and why, searchable when someone asks “where did this order go?”',
  'Alerts that reach a person. Email or Slack when something has failed, not a dashboard nobody opens.',
  'Mappings you own. Field and code mappings in a table your team can read and change, not buried in code.',
  'Tested on a sandbox. Built and run against test accounts with copies of real data before anything touches production.',
];

// What Safe Streets Map (../safestreets) runs in production; keep in step with its CLAUDE.md.
const streetsIntegrations = [
  ['California Highway Patrol live incidents', 'Read every few minutes; each new collision is logged with when it first and last appeared. When the CHP’s list is over 20 minutes old, the site says so instead of showing it as current.'],
  ['Caltrans traffic feeds', 'Message signs, highway cameras, lane closures and chain controls, matched to the collisions and roads near them.'],
  ['National Weather Service and NOAA', 'Forecasts, alerts, station readings and rain radar for the maps, ride plans and road pages, cached so a slow response can’t stall a page.'],
  ['California crash records (data.ca.gov)', 'This year’s reports read daily for each city’s page; past years rebuilt into the site’s data by scripts.'],
  ['Mapbox', 'Routes, drive times at a chosen hour, how far you can get in a set time, and address search.'],
  ['Sign-in and email', 'Google, Apple and emailed sign-in links, with mail sent through Resend.'],
];

const faqs = [
  {
    q: 'What are API integration services?',
    a: 'Building the connections that move data between your software through each system’s API: orders from your store into your ERP, customers between your CRM and accounting, shipments back from your warehouse. The goal is that nobody retypes data and every system agrees.',
  },
  {
    q: 'Should I use Zapier or a custom integration?',
    a: 'If Zapier or a ready-made connector does what you need reliably, use it; it is cheaper. Custom integration is worth it when the flow has your own rules, real volume, or failures that cost money and need proper logs and retries.',
  },
  {
    q: 'Which systems do you work with?',
    a: 'Shopify, BigCommerce, HubSpot, Salesforce, NetSuite, QuickBooks, 3PL and shipping platforms, EDI trading partners and custom databases. Anything with a documented API can be connected.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. The code, the mappings and the documentation are handed over, and it runs in your accounts. Monthly support is available but not required.',
  },
  {
    q: 'What does it cost?',
    a: `It starts with a free 30-minute call, then a fixed quote. For NetSuite integrations that already exist, the ${audit.name}${audit.price ? ` (${formatUSD(audit.price)})` : ''} reviews what you have before anything new is built.`,
  },
  {
    q: 'Do you work with businesses in Los Angeles?',
    a: `Yes. I’m based in ${PERSON.location} and work with businesses across California and the U.S.`,
  },
];

export default function ApiIntegrationServicesPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/api-integration-services/#service'),
            name: 'API integration services',
            serviceType: 'API integration',
            provider: { '@id': ORG_ID },
            url: url('/api-integration-services/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'Country', name: 'United States' },
            ],
          },
          breadcrumbNode([
            ['Home', '/'],
            ['API integration services', '/api-integration-services/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow="Store · CRM · ERP · 3PL · EDI"
          title={<>API integration services: systems that <Accent>agree with each other.</Accent></>}
          lede="Your store, CRM, ERP, warehouse and trading partners connected through their APIs, with retries, logs and alerts, so orders, stock and customers stay in sync and nobody retypes data."
          facts={[
            ['Starts with', 'Free 30-minute call'],
            ['Pricing', 'Fixed quote per integration'],
            ['You own', 'Code, mappings, docs'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min call</PrimaryCta>
          <SecondaryCta href="/netsuite-audit/">NetSuite audit</SecondaryCta>
        </PageHero>

        <Block index="01" label="What I connect">
          <DataTable
            columns={['Between', 'What moves', 'Guide']}
            rows={pairs.map(([between, what, [href, label]]) => [
              between,
              what,
              <a key={href} href={href} className="text-accent underline">
                {label}
              </a>,
            ])}
          />
        </Block>

        <Block index="02" label="Connector, platform or custom">
          <DataTable columns={['Option', 'Best for', 'Trade-off']} rows={options} />
        </Block>

        <Block index="03" label="What makes it reliable" title={<>Built to fail <Accent>loudly and safely.</Accent></>}>
          <NumberedList items={reliability} tone="accent" />
        </Block>

        <Block index="04" label="Built this way" title={<>On my own product: <Accent>Safe Streets Map.</Accent></>}>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-10">
            Safe Streets Map runs on other people’s APIs, most of them government feeds that change without notice and go quiet
            for hours. It keeps them reliable with the same rules as above: logged, retried, and honest about stale data. If a
            dozen public feeds can be kept in step, so can your store, CRM and ERP.
          </p>
          <DataTable columns={['System', 'What the integration does']} rows={streetsIntegrations} />
          <div className="mt-10">
            <LinkRows
              items={[
                { href: 'https://www.safestreetsmap.com/traffic', tag: 'Live site', title: 'Live traffic on safestreetsmap.com', body: 'CHP collisions, Caltrans signs and cameras, and weather on one map.' },
                { href: '/work/safe-streets-map-crash-data-platform/', tag: 'Case study', title: 'How Safe Streets Map is built' },
              ]}
            />
          </div>
        </Block>

        <Block index="05" label="When not to">
          <Callout label="Honest scope">
            If a ready-made connector or a Zapier flow already does what you need without errors, keep it. Custom work is for the
            flows those tools get wrong, and for the volume where a failed sync costs real money.
          </Callout>
        </Block>

        <Block index="06" label="Related">
          <LinkRows
            items={[
              { href: '/ai-integration/', tag: 'Service', title: 'AI integration', body: 'Once systems are connected, AI can answer questions and do work across them.' },
              { href: '/netsuite/', tag: 'Guides', title: 'NetSuite integration guides' },
              { href: '/tools/netsuite-integration-estimator/', tag: 'Tool', title: 'Integration cost estimator' },
              { href: '/work/total-warehouse-netsuite-digital-showroom/', tag: 'Case study', title: 'A NetSuite-connected digital showroom' },
            ]}
          />
        </Block>

        <Block index="07" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
