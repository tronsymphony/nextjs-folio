import Link from 'next/link';
import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, ArrowLink, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, FaqList, LinkRows, PageHero } from '../../components/ui/Page';
import { STAGES, ediDocuments, ediSlug, getEdiByCode } from '../../data/ediDocuments';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';

export const metadata = {
  title: 'EDI Transaction Sets Explained: 850, 855, 856, 810 and More',
  description:
    'A plain-language reference to the EDI documents suppliers, distributors and 3PLs exchange: purchase orders, acknowledgments, ASNs, invoices, warehouse and carrier documents, with how each maps to NetSuite.',
  alternates: { canonical: '/edi/' },
};

// The main order-to-cash sequence between a buyer and a supplier.
const ORDER_TO_CASH = [
  ['850', 'Buyer orders'],
  ['855', 'Supplier confirms'],
  ['856', 'Supplier ships'],
  ['810', 'Supplier bills'],
  ['820', 'Buyer pays'],
];

const faqs = [
  {
    q: 'What is an EDI transaction set?',
    a: 'A standard electronic business document, such as a purchase order or invoice, identified by a three-digit number in the X12 standard used in North America. Trading partners exchange them instead of paper, email or portals.',
  },
  {
    q: 'Which EDI documents does a supplier need?',
    a: 'Most retail suppliers need at least the 850 purchase order, 856 advance ship notice and 810 invoice, plus 997 acknowledgments. Many partners also require the 855 acknowledgment, 860 changes and 846 inventory. Each trading partner’s requirements say which.',
  },
  {
    q: 'What is the difference between X12 and EDIFACT?',
    a: 'Both are EDI standards. X12 is used mainly in North America and numbers its documents (850, 856); EDIFACT is the United Nations standard used more internationally and names them (ORDERS, DESADV, INVOIC).',
  },
  {
    q: 'Does NetSuite support EDI?',
    a: 'NetSuite does not include an EDI translator. Most companies use an EDI provider with a NetSuite integration, which turns these documents into sales orders, fulfillments and invoices and back.',
  },
];

export default function EdiHubPage() {
  const groups = Object.entries(STAGES)
    .map(([stage, label]) => [label, ediDocuments.filter((d) => d.stage === stage)])
    .filter(([, docs]) => docs.length > 0);

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'CollectionPage',
            name: 'EDI transaction sets explained',
            url: url('/edi/'),
            publisher: { '@id': ORG_ID },
            hasPart: ediDocuments.map((d) => ({ '@type': 'Article', headline: d.title, url: url(`/edi/${ediSlug(d.code)}/`) })),
          },
          breadcrumbNode([
            ['Home', '/'],
            ['EDI reference', '/edi/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow={`${ediDocuments.length} documents · plain language`}
          title={<>EDI documents, <Accent>explained.</Accent></>}
          lede="What each EDI document is, who sends it, what it carries, where it fits between a buyer, a supplier, a warehouse and a carrier, and how it maps to NetSuite. Written for the people who have to make it work."
        >
          <PrimaryCta href="/netsuite/netsuite-edi-integration/">NetSuite EDI guide</PrimaryCta>
          <SecondaryCta href="/netsuite-audit/">Get your EDI reviewed</SecondaryCta>
        </PageHero>

        <Block index="01" label="Order to cash" title="The five documents behind most retail orders" wide>
          <ol className="grid sm:grid-cols-5 border-t border-line">
            {ORDER_TO_CASH.map(([code, step], i) => {
              const d = getEdiByCode(code);
              return (
                <li key={code} className={`border-b border-line sm:border-b-0 ${i > 0 ? 'sm:border-l' : ''} border-line`}>
                  <Link href={`/edi/${ediSlug(code)}/`} className="group flex flex-col h-full pt-6 pb-8 sm:px-5 sm:first:pl-0 hover:bg-ink/[0.03] transition-colors">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                      {String(i + 1).padStart(2, '0')} · {step}
                    </span>
                    <span className="mt-6 text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-[-0.05em] group-hover:text-accent transition-colors">
                      {code}
                    </span>
                    <span className="mt-3 text-muted leading-snug">{d.name}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-muted max-w-3xl">
            Changes arrive as an <Link href="/edi/edi-860/" className="underline decoration-line underline-offset-4 hover:decoration-ink">860</Link>,
            and every document is answered with a <Link href="/edi/edi-997/" className="underline decoration-line underline-offset-4 hover:decoration-ink">997</Link>{' '}
            receipt. Suppliers using a 3PL add the 940 and 945 between the order and the ASN.
          </p>
        </Block>

        {groups.map(([label, docs], i) => (
          <Block key={label} index={String(i + 2).padStart(2, '0')} label={label}>
            <LinkRows items={docs.map((d) => ({ href: `/edi/${ediSlug(d.code)}/`, tag: `EDI ${d.code}`, title: d.name, body: d.summary }))} />
          </Block>
        ))}

        <Block index={String(groups.length + 2).padStart(2, '0')} label="Questions">
          <FaqList faqs={faqs} />
          <div className="mt-10">
            <ArrowLink href="/netsuite/netsuite-edi-integration/">How to connect EDI to NetSuite</ArrowLink>
          </div>
        </Block>
      </div>
      <Footer />
    </>
  );
}
