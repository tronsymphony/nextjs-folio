import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, Callout, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { PERSON } from '../../lib/site';

// The second line of work (homepage `LINES`, id "data"): public records and a client's own data turned into maps,
// searchable pages and studies, with Safe Streets Map as the proof. No Keyword Planner volumes checked yet for
// "interactive map development", "custom map development", "data visualization services" or "public records data";
// check them before retitling. No client results are claimed.
// 2026-11-03 keyword research: "data products" phrasings have almost no searches; "data visualization companies" and
// "data visualization as a service" have 500 a month each, so the title leads with data visualization.

export const metadata = {
  title: 'Data Visualization Services: Interactive Maps from Public Records',
  description:
    'Data visualization services: public records and your own data turned into interactive maps, searchable pages and data studies, by the Los Angeles engineer who built Safe Streets Map. Crash, permit, census and location data, with sources shown. Starts with a free 30-minute call.',
  alternates: { canonical: '/data-products/' },
};

// What gets built, each with a page on Safe Streets Map to look at.
const products = [
  [
    'Interactive map',
    'Your data on a map people can zoom, filter and tap for detail, fast on a phone.',
    ['https://www.safestreetsmap.com/walking', 'Walking crash map'],
  ],
  [
    'Searchable pages',
    'One page per city, location, product or record, each answering the question people type into Google.',
    ['https://www.safestreetsmap.com/walking/lawndale', '“Is Lawndale safe to walk?”'],
  ],
  [
    'Data study',
    'A question answered from the records, with the method and every source shown, as a page people can share and cite.',
    ['https://www.safestreetsmap.com/car-history', 'Redlining maps and freeways'],
  ],
  [
    'Live map',
    'Feeds that change by the minute, merged and kept honest about how fresh they are.',
    ['https://www.safestreetsmap.com/traffic', 'Live traffic'],
  ],
  [
    'Reference pages',
    'The practical answer people need next, such as which agency holds a report and how to request it.',
    ['https://www.safestreetsmap.com/crashes/los-angeles', 'Los Angeles crash reports'],
  ],
];

// Data that is already public and worth publishing well.
const sources = [
  ['Crash records', 'State crash databases, NHTSA’s fatal crash records', 'Maps and area reports: where, when and how crashes happen'],
  ['Permits, inspections and code cases', 'City and county open-data portals', 'Pages per address or neighborhood, maps of activity over time'],
  ['Population, income and housing', 'U.S. Census (American Community Survey)', 'Neighborhood and city profiles beside your own figures'],
  ['Weather, hazards and road conditions', 'National Weather Service, NOAA, state DOTs', 'Conditions pages and maps that update themselves'],
  ['Streets, places and land use', 'OpenStreetMap, county parcel and zoning layers', 'Location pages, service areas, what is near a site'],
  ['Your own data', 'Locations, inventory, service areas, prices, project history', 'Store and dealer maps, location pages, a searchable catalog'],
];

const audiences = [
  ['Law firms', 'The reported crash history near an intersection or along a road, as a map and a plain summary drawn from state records, to start a case review with facts. Police reports and expert analysis stay with your team.'],
  ['Consultants, nonprofits and advocates', 'A study from public data with the method shown, published as pages that people find, share and cite.'],
  ['Businesses with locations', 'Dealer, store or service-area maps and one page per location that answers what nearby customers search.'],
  ['Companies with data in spreadsheets', 'Records that only your team can read today, turned into a tool customers or staff can search.'],
];

// The rules Safe Streets Map runs on, applied to client work.
const rules = [
  'Facts with sources. Every number traces to a named dataset or document, and the page says where it came from.',
  'No invented numbers. Where the data is thin or missing, the page says so instead of guessing.',
  'Gaps stated. If records undercount an area or a year, the page flags it, so nobody reads a gap as a good result.',
  'People protected. Personal details are never published; points are rounded where an exact location would identify someone.',
  'Licenses respected. Only data you may publish, with the attribution its license asks for.',
  'Built to refresh. The pipeline reruns when the source updates, so the pages don’t go stale.',
];

const steps = [
  'A free 30-minute call: the question you want answered or the data you hold, and who should find it.',
  'A data check: is it public or yours, how complete it is, what it may be used for, and what it can’t say.',
  'A fixed quote for a first version: one map, or the first set of pages, with what it will and won’t show written down.',
  'Launch, then measure in Google Search Console: which pages people find, and what they search for next.',
  'Grow from what the data shows: more pages, more sources, or a map for your own team.',
];

const faqs = [
  {
    q: 'What is a data product?',
    a: 'Data turned into something people use without opening a spreadsheet: an interactive map, a set of pages that answer searches, a study, or a tool your customers or staff can search. The data stays the source; the product makes it readable.',
  },
  {
    q: 'Is public data free to use?',
    a: 'Most government open data can be republished, but terms differ: some datasets ask for attribution, some limit commercial use, and a few can’t be republished at all. Checking the terms is part of the first step, before anything is built.',
  },
  {
    q: 'Can you work with our own private data?',
    a: 'Yes. It can power a public map or pages with only what you choose to show, or an internal tool behind a login. The data stays in your accounts.',
  },
  {
    q: 'Do you build interactive maps with Mapbox or Google Maps?',
    a: 'Mostly Mapbox, with OpenStreetMap and public map layers, because it handles large datasets and custom styling well and works smoothly on phones. Google Maps works too when your team already uses it.',
  },
  {
    q: 'Can crash data be used in a legal case?',
    a: 'State crash records show what was reported to police: where, when, the vehicles involved and the injuries. They are a starting point for a case review, not a substitute for the police report or an expert’s analysis, and I don’t give legal advice.',
  },
  {
    q: 'What does it cost?',
    a: 'It starts with a free 30-minute call. After the data check, the first version is quoted at a fixed price, so you know the cost before committing.',
  },
  {
    q: 'Do you work with businesses in Los Angeles?',
    a: `Yes. I’m based in ${PERSON.location} and work with clients across California and the U.S., remotely or in person in LA.`,
  },
];

export default function DataProductsPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/data-products/#service'),
            name: 'Data products and interactive maps',
            serviceType: 'Data products and interactive maps',
            provider: { '@id': ORG_ID },
            url: url('/data-products/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'Country', name: 'United States' },
            ],
          },
          breadcrumbNode([
            ['Home', '/'],
            ['Data products and maps', '/data-products/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow="Public records · Your data · Maps · Pages"
          title={<>Data visualization and data products: records people can <Accent>find and use.</Accent></>}
          lede="I turn public records and your own data into interactive maps, searchable pages and studies, so the facts you hold reach the people searching for them, on Google and in AI answers."
          facts={[
            ['Starts with', 'Free 30-minute call'],
            ['Pricing', 'Fixed quote per first version'],
            ['You own', 'Code, data pipeline, pages'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min call</PrimaryCta>
          <SecondaryCta href="https://www.safestreetsmap.com/">See Safe Streets Map</SecondaryCta>
        </PageHero>

        <Block index="01" label="What gets built">
          <DataTable
            columns={['Product', 'What it is', 'Look at one']}
            rows={products.map(([name, what, [href, label]]) => [
              name,
              what,
              <a key={href} href={href} className="text-accent underline">
                {label}
              </a>,
            ])}
          />
        </Block>

        <Block index="02" label="Data worth publishing" title={<>The raw material is often <Accent>already public.</Accent></>}>
          <DataTable columns={['Data', 'Where it comes from', 'What it becomes']} rows={sources} />
        </Block>

        <Block index="03" label="Who it’s for">
          <DataTable columns={['Who', 'What they get']} rows={audiences} />
        </Block>

        <Block index="04" label="Built this way" title={<>On my own product: <Accent>Safe Streets Map.</Accent></>}>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-6">
            Safe Streets Map started as California’s crash records: millions of rows in a state database that almost nobody could
            read. I joined them with federal fatal-crash records, the Census, OpenStreetMap, the National Weather Service and live
            Highway Patrol and Caltrans feeds, and turned the result into maps for walking, cycling, riding and driving, thousands
            of city and street pages, a live traffic map and long-form studies.
          </p>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-6">
            The maps are built so anyone can check a street before they walk, ride or drive it, and Google now shows the pages
            about 400 times a day. None of that traffic is paid for: it comes from pages that answer what people search.
          </p>
          <p className="text-lg text-ink leading-relaxed max-w-3xl mb-10">
            Your records can work the same way. If the facts people need are sitting in a database, a portal or a stack of PDFs,
            they can become the page or map that people find first.
          </p>
          <LinkRows
            items={[
              { href: 'https://www.safestreetsmap.com/', tag: 'Live site', title: 'safestreetsmap.com', body: 'Crash maps, city pages, live traffic and studies, all from public data.' },
              { href: '/work/safe-streets-map-crash-data-platform/', tag: 'Case study', title: 'How Safe Streets Map is built' },
            ]}
          />
        </Block>

        <Block index="05" label="Rules the data keeps" title={<>Pages people can <Accent>trust and cite.</Accent></>}>
          <NumberedList items={rules} tone="accent" />
        </Block>

        <Block index="06" label="A first project">
          <NumberedList items={steps} />
        </Block>

        <Block index="07" label="When not to">
          <Callout label="Honest scope">
            If a chart in a spreadsheet answers the question for the five people who need it, keep the spreadsheet. A data product
            is worth building when many people need the answer, the data keeps updating, or you want to be found by people searching
            for it.
          </Callout>
        </Block>

        <Block index="08" label="Related">
          <LinkRows
            items={[
              { href: '/seo/', tag: 'Service', title: 'SEO and AI search', body: 'Getting those pages found on Google and cited in AI answers.' },
              { href: '/ai-integration/', tag: 'Service', title: 'AI integration', body: 'Let an assistant answer questions over the same data.' },
              { href: '/api-integration-services/', tag: 'Service', title: 'API integration services', body: 'Feeds and systems kept in sync behind a live map.' },
            ]}
          />
        </Block>

        <Block index="09" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
