import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, Callout, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { PERSON } from '../../lib/site';

// Keyword Planner (US, Sep 2025-Aug 2026): "ai document processing" 5K a month, up sharply, low competition,
// bids $16-68; "ai for document processing" 500, bids $23-65. Software vendors chase the same searches, so
// this page sells building it into the client's own systems, not a tool. The proof is Safe Streets Map's
// own screenshot-to-draft workflow; no client results are claimed.

export const metadata = {
  title: 'AI Document Processing: Emailed Orders & Invoices into Your System',
  description:
    'AI document processing built into your own systems: purchase orders, invoices and forms that arrive by email are read by AI, checked against NetSuite, QuickBooks, Shopify or your CRM, and saved as drafts for approval. Los Angeles engineer, free 30-minute call.',
  alternates: { canonical: '/ai-document-processing/' },
};

const documents = [
  ['Customer purchase orders (PDF, spreadsheet, email body)', 'Sales orders or draft orders in NetSuite, QuickBooks or Shopify'],
  ['Supplier invoices and bills', 'Vendor bills matched to the purchase order and receipt'],
  ['Order changes and cancellations', 'Updates to the existing order, flagged when they conflict'],
  ['Applications, intake and request forms', 'Records in your CRM or database, with the original attached'],
  ['Screenshots and flyers', 'Listings or events drafted from an image, waiting for review'],
];

const pipeline = [
  'The document arrives: a shared inbox, an upload, a folder or a form.',
  'A model reads it and pulls out the fields: who sent it, reference numbers, line items, quantities, prices, dates, addresses.',
  'Code, not the model, checks each value against your system: is this a known customer, which of your items does their code mean, does the price match, is this a resend of one already entered?',
  'A draft record is created with the original document attached and every mismatch listed.',
  'A person approves in seconds instead of typing for minutes. Their corrections show which checks or prompts to improve.',
];

// The checks that catch what the model gets wrong (the same list as the NetSuite AI guide).
const checks = [
  ['Duplicates', 'Customer plus their reference number, so a resent or “revised” email doesn’t become a second order.'],
  ['Customer and sender', 'Matched on known sender addresses and accounts, not a name read off the page.'],
  ['Item codes', 'Each customer’s own codes mapped to your items through a cross-reference you control.'],
  ['Prices', 'Compared with the customer’s price level or contract; differences go to review, never overwrite.'],
  ['Units', 'Cases versus eaches checked against the item’s units, the most common misread.'],
  ['Addresses', 'A ship-to that isn’t on file goes to review instead of being created silently.'],
];

const options = [
  ['A built-in feature of your software', 'One standard document type, such as NetSuite’s Bill Capture for supplier invoices.', 'Configurable, not changeable; it does one job.'],
  ['Off-the-shelf document AI software', 'High volumes of fairly standard documents.', 'Per-document or license cost; your own checks and odd formats are harder.'],
  ['A pipeline built for your systems', 'Mixed formats, customer-specific codes, your own rules, approval in the system you already use.', 'A small service to host and look after, which I can do for you.'],
];

const faqs = [
  {
    q: 'What is AI document processing?',
    a: 'Using an AI model to read documents such as purchase orders, invoices and forms, and turn them into structured records in your software. Older tools (OCR and templates) needed a layout set up for each sender; current models read most layouts without one, which is why it now works for businesses whose documents all look different.',
  },
  {
    q: 'How accurate is it?',
    a: 'Good on clear PDFs and emails, weaker on poor scans, handwriting and unusual layouts. That is why the checks against your system matter more than the model: they catch the misreads before anything is saved. Before going live, it runs on a few weeks of your past documents and its results are compared with what your team entered.',
  },
  {
    q: 'Which systems can it write to?',
    a: 'Anything with an API: NetSuite, QuickBooks, Shopify, HubSpot, Salesforce, a 3PL portal or your own database. Records are created as drafts or pending approval wherever the system supports it.',
  },
  {
    q: 'What if my customers already send orders by EDI?',
    a: 'Then those orders don’t need AI. An EDI 850 is already structured data and maps straight to a sales order through an EDI integration. AI is for the orders that arrive as PDFs, spreadsheets and emails.',
  },
  {
    q: 'Where do our documents go?',
    a: 'To the model provider you choose, under the terms of the plan or API used, and to your own systems. We pick a provider whose data terms fit your documents, and nothing is kept longer than the job needs.',
  },
  {
    q: 'Is it worth it for a small business?',
    a: 'Only with real volume. If someone types in a handful of documents a day, that is usually cheaper than building and maintaining a pipeline. It pays off when typing takes hours a week or mistakes are costly.',
  },
  {
    q: 'What does it cost?',
    a: `A free 30-minute call first, then a fixed quote for one document type and one system. I’m based in ${PERSON.location} and work with businesses across the U.S.`,
  },
];

export default function AiDocumentProcessingPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/ai-document-processing/#service'),
            name: 'AI document processing',
            serviceType: 'AI document processing',
            provider: { '@id': ORG_ID },
            url: url('/ai-document-processing/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'Country', name: 'United States' },
            ],
          },
          breadcrumbNode([
            ['Home', '/'],
            ['AI integration', '/ai-integration/'],
            ['AI document processing', '/ai-document-processing/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/ai-integration/', 'AI integration']}
          eyebrow="Purchase orders · Invoices · Forms"
          title={<>AI document processing: stop <Accent>retyping emailed orders.</Accent></>}
          lede="Purchase orders, invoices and forms that arrive by email are read by AI, checked against your own system by code, and saved as drafts with the original attached. Your team approves instead of typing."
          facts={[
            ['Starts with', 'Free 30-minute call'],
            ['Writes to', 'NetSuite, QuickBooks, Shopify, CRMs'],
            ['Records', 'Drafts for approval'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min call</PrimaryCta>
          <SecondaryCta href="/netsuite/netsuite-ai/">The NetSuite guide</SecondaryCta>
        </PageHero>

        <Block index="01" label="What it handles">
          <DataTable columns={['Arrives as', 'Becomes']} rows={documents} />
        </Block>

        <Block index="02" label="How it works" title={<>A pipeline, <Accent>not a chatbot.</Accent></>}>
          <NumberedList items={pipeline} tone="accent" />
        </Block>

        <Block index="03" label="The checks that matter" title="Reading is the easy part">
          <DataTable columns={['Check', 'Why']} rows={checks} />
        </Block>

        <Block index="04" label="Build or buy">
          <DataTable columns={['Option', 'Best for', 'Trade-off']} rows={options} />
        </Block>

        <Block index="05" label="Built this way" title={<>On my own product: <Accent>Safe Streets Map.</Accent></>}>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-10">
            Bike clubs announce rides as Instagram posts and flyers. On Safe Streets Map, a screenshot of a post is read by Claude
            into a draft listing: the title, date and time, whether it repeats weekly, the meeting spot (placed on the map) and the
            pace. Each draft waits for a person to check and approve, and only the facts and a link are published, never the
            post’s text.
          </p>
          <LinkRows
            items={[
              { href: '/work/safe-streets-map-crash-data-platform/', tag: 'Case study', title: 'Safe Streets Map' },
              { href: '/ai-integration/', tag: 'Service', title: 'AI integration', body: 'Assistants and automations connected to your tools.' },
              { href: '/netsuite/netsuite-edi-integration/', tag: 'Guide', title: 'When EDI is the better fix' },
            ]}
          />
        </Block>

        <Block index="06" label="When not to">
          <Callout label="Honest scope">
            If your big customers already send EDI, if a built-in feature covers the document, or if someone types a handful a day,
            don’t build this. It pays off when typing takes hours every week or a misread order is expensive.
          </Callout>
        </Block>

        <Block index="07" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
