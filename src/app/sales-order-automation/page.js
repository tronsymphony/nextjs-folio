import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, Callout, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { PERSON } from '../../lib/site';

// Keyword research 2026-11-03 (Keyword Planner, US): "sales order management system" 500 a month, bids $12-86;
// "purchase order automation software" 500, $12-52; "automated order entry systems" 50, $15-95; "automate order
// management" 50, $27-113; "sales order automation" 50, $15-68. The highest-bid cluster that matches the work, so it
// gets its own page; /ai-document-processing/ keeps the general "read any document" story and the two link each other.
// "Conexiom sales order automation" and "Esker sales order automation" were searched too, so the build-or-buy table
// names that kind of vendor. No client results are claimed.

export const metadata = {
  title: 'Sales Order Automation: Customer POs Straight into Your ERP',
  description:
    'Sales order automation for distributors and manufacturers: customer purchase orders from email, EDI, your store or portal turned into checked sales orders in NetSuite, QuickBooks or Shopify, with exceptions sent to a person. Los Angeles engineer, free 30-minute call.',
  alternates: { canonical: '/sales-order-automation/' },
};

// Every way orders arrive, and the right way to automate each one.
const channels = [
  ['EDI (850 purchase orders)', 'Already structured data: mapped straight to a sales order, acknowledged with an 855.', ['/edi/edi-850/', 'EDI 850 explained']],
  ['Your online store or marketplace', 'An API integration creates the order with the customer, items, tax and shipping already known.', ['/netsuite/netsuite-shopify-integration/', 'Shopify guide']],
  ['Emailed PDFs and spreadsheets', 'AI reads the purchase order, code checks it against your system, and a draft order waits for approval.', ['/ai-document-processing/', 'AI document processing']],
  ['A customer or dealer portal', 'Customers order against their own prices and stock levels, so the order is right when it is placed.', ['/netsuite/netsuite-customer-portal/', 'Portal guide']],
  ['Phone and sales reps', 'A quick order form with the customer’s price list and last orders, instead of a full screen in the ERP.', null],
];

const flow = [
  'The order arrives: an EDI file, a store webhook, an email in a shared inbox, or a portal checkout.',
  'It is read into one shape: customer, their PO number, ship-to, lines with item, quantity, unit and price, requested date.',
  'Code checks every field against your ERP (below). Clean orders go straight through; anything off goes to a short exceptions list.',
  'The sales order is created, as pending approval or a draft wherever your system has one, with the original PO attached.',
  'The customer gets an acknowledgment (an EDI 855 or an email) with what was accepted, changed or backordered.',
  'Every order is logged: where it came from, what was checked, what a person changed, so mistakes can be traced and the checks improved.',
];

const checks = [
  ['Duplicate', 'Customer plus their PO number, so a resent or “revised” email doesn’t ship twice.'],
  ['Customer', 'Matched on the sender’s address and account, not a name read off the page.'],
  ['Items', 'Their part numbers mapped to yours through a cross-reference your team can edit.'],
  ['Price', 'Compared with their price level or contract; a difference goes to review and is never overwritten.'],
  ['Unit', 'Cases versus eaches against the item’s units, the most common mistake on emailed orders.'],
  ['Ship-to', 'An address not on file goes to review instead of being created silently.'],
  ['Credit and stock', 'An account on hold or a line you can’t fill is flagged before the order is confirmed to the customer.'],
];

const options = [
  ['Features already in your ERP or store', 'Orders that already arrive structured: EDI through your EDI provider, web orders through a connector.', 'Covers one channel each; emailed POs stay manual.'],
  ['Sales order automation software (vendors such as Conexiom or Esker)', 'High volumes of emailed and faxed orders, with a team to run another platform.', 'Per-order or license pricing; your rules have to fit theirs.'],
  ['Built for your systems', 'Mixed channels, customer-specific part numbers, your own checks, approval inside the ERP you use.', 'A small service to host and look after, which I can do for you; you own the code.'],
];

const faqs = [
  {
    q: 'What is sales order automation?',
    a: 'Turning the orders customers send (purchase orders by email, EDI, web store or portal) into sales orders in your ERP without someone retyping them, with every order checked against your customers, items and prices before it is created.',
  },
  {
    q: 'Is this the same as purchase order automation?',
    a: 'It is the other side of the same document. Your customer’s purchase order becomes your sales order; this page is about getting those into your system. Purchase order automation usually means your own buying from suppliers, which is a different workflow, though the same checks apply to supplier invoices.',
  },
  {
    q: 'Do I need a new order management system?',
    a: 'Usually not. If you run NetSuite, QuickBooks or Shopify, the orders already have a home; the work is getting them in accurately. A separate order management system makes sense when orders are split across many warehouses or channels your ERP doesn’t handle.',
  },
  {
    q: 'Which systems can the orders go into?',
    a: 'NetSuite (sales orders, pending approval), QuickBooks (a sales order or estimate, depending on your edition), Shopify (draft orders) or any ERP with an API. The order lands where your team already works.',
  },
  {
    q: 'What happens with orders it can’t read?',
    a: 'They go to a person with the reason: an unknown item, a price that doesn’t match, a scan too poor to read. Nothing is guessed. Over time the exceptions show which customers’ formats or cross-references need fixing.',
  },
  {
    q: 'What about order changes and cancellations?',
    a: 'A change that references an existing PO number is matched to that order and shown as a change for approval, never as a new order. Cancellations after picking or shipping are flagged rather than applied.',
  },
  {
    q: 'What does it cost?',
    a: `A free 30-minute call first, then a fixed quote for one channel into one system, usually the emailed POs that take the most typing. I’m based in ${PERSON.location} and work with businesses across the U.S.`,
  },
];

export default function SalesOrderAutomationPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/sales-order-automation/#service'),
            name: 'Sales order automation',
            serviceType: 'Sales order automation',
            provider: { '@id': ORG_ID },
            url: url('/sales-order-automation/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'Country', name: 'United States' },
            ],
          },
          breadcrumbNode([
            ['Home', '/'],
            ['Sales order automation', '/sales-order-automation/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow="Email · EDI · Store · Portal"
          title={<>Sales order automation: customer POs <Accent>straight into your ERP.</Accent></>}
          lede="Purchase orders arrive by email, EDI, your store and your portal. Each one becomes a checked sales order in NetSuite, QuickBooks or Shopify, and only the ones with a problem reach a person."
          facts={[
            ['Starts with', 'Free 30-minute call'],
            ['Writes to', 'NetSuite, QuickBooks, Shopify'],
            ['Orders', 'Checked, then created'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min call</PrimaryCta>
          <SecondaryCta href="/ai-document-processing/">How emailed POs are read</SecondaryCta>
        </PageHero>

        <Block index="01" label="Where orders come in" title={<>One order flow, <Accent>every channel.</Accent></>}>
          <DataTable
            columns={['Channel', 'How it’s automated', 'Guide']}
            rows={channels.map(([channel, how, link]) => [
              channel,
              how,
              link ? (
                <a key={link[0]} href={link[0]} className="text-accent underline">
                  {link[1]}
                </a>
              ) : (
                '—'
              ),
            ])}
          />
        </Block>

        <Block index="02" label="What happens to each order">
          <NumberedList items={flow} tone="accent" />
        </Block>

        <Block index="03" label="Checked before it’s created" title="Speed is easy. Accuracy is the job.">
          <DataTable columns={['Check', 'Why']} rows={checks} />
        </Block>

        <Block index="04" label="Buy or build">
          <DataTable columns={['Option', 'Best for', 'Trade-off']} rows={options} />
        </Block>

        <Block index="05" label="Who it’s for">
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-6">
            Distributors, wholesalers and manufacturers whose customers still send purchase orders the way they like: a PDF from
            one, a spreadsheet from another, an EDI file from the big accounts and web orders from the rest. If someone on your
            team spends hours a week typing those into the ERP, and a wrong unit or a duplicate order costs real money, this is
            the work.
          </p>
          <p className="text-lg text-ink leading-relaxed max-w-3xl mb-10">
            The goal isn’t to remove the person. It’s to have them approve a clean order in seconds instead of typing it for
            minutes, and spend the rest of the day on the customers who need them.
          </p>
          <LinkRows
            items={[
              { href: '/work/total-warehouse-netsuite-digital-showroom/', tag: 'Case study', title: 'A NetSuite-connected showroom for an equipment distributor', body: 'Customers browse and request quotes against live NetSuite inventory.' },
            ]}
          />
        </Block>

        <Block index="06" label="When not to">
          <Callout label="Honest scope">
            If your big customers already send EDI and the rest are a handful of emails a day, keep typing those; it’s cheaper.
            Automating order entry pays off when the volume is real, the formats are mixed, or mistakes reach the customer.
          </Callout>
        </Block>

        <Block index="07" label="Related">
          <LinkRows
            items={[
              { href: '/ai-document-processing/', tag: 'Service', title: 'AI document processing', body: 'How emailed POs, invoices and forms are read and checked.' },
              { href: '/edi/', tag: 'Guide', title: 'EDI documents explained', body: 'The 850, 855, 856 and 810 that structured orders run on.' },
              { href: '/api-integration-services/', tag: 'Service', title: 'Custom API integration', body: 'Store, CRM and ERP kept in sync.' },
              { href: '/netsuite/netsuite-edi-integration/', tag: 'Guide', title: 'NetSuite EDI integration' },
            ]}
          />
        </Block>

        <Block index="08" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
