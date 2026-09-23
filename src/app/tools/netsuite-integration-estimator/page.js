import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import EstimatorTool from '../../../components/EstimatorTool';
import { Eyebrow } from '../../../components/ui/Cta';
import { CONFIG } from '../../../lib/estimator/netsuite';
import { PERSON_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';

export const metadata = {
  title: 'NetSuite Integration Cost Estimator',
  description:
    'How much does a NetSuite integration cost? Describe the systems, records, and sync you need and get a scope outline, the risks to plan for, and a realistic cost and timeline range. Free, no email required.',
  alternates: { canonical: '/tools/netsuite-integration-estimator/' },
};

const faqs = [
  {
    q: 'How much does a NetSuite integration cost?',
    a: 'A simple one-way connection using a native connector can cost a few thousand dollars. A two-way integration through middleware usually lands in the tens of thousands, and custom multi-system integrations with a customer portal can reach six figures. The biggest drivers are the number of systems, sync direction, how fresh data must be, and existing NetSuite customization.',
  },
  {
    q: 'How long does a NetSuite integration take?',
    a: 'Simple connector setups take one to three weeks. Middleware or custom integrations between NetSuite and one or two systems typically take one to three months including testing. EDI projects often take longer because trading partners run their own certification.',
  },
  {
    q: 'How is this estimate calculated?',
    a: `It adds hours for discovery, each connected system, each record type, and any customer-facing front end, adjusts for sync direction, data freshness, volume, and existing customization, then adds ${Math.round(
      CONFIG.TESTING_SHARE * 100
    )}% for testing and cutover. Hours are priced at a senior-engineer rate range.`,
  },
];

export default function EstimatorPage() {
  return (
    <>
      <div className="print:hidden">
        <HomeFollow />
      </div>
      <JsonLd
        data={graph(
          {
            '@type': 'WebApplication',
            name: 'NetSuite Integration Cost Estimator',
            url: url('/tools/netsuite-integration-estimator/'),
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web browser)',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
            creator: { '@id': PERSON_ID },
          },
          breadcrumbNode([['Home', '/'], ['NetSuite Integration Cost Estimator', '/tools/netsuite-integration-estimator/']]),
          faqNode(faqs)
        )}
      />
      <div className="bg-[#0a0a0a] text-white print:bg-white print:text-black">
        <section className="pt-36 pb-12 px-4 sm:px-6 print:pt-0">
          <div className="container mx-auto max-w-6xl">
            <div className="print:hidden">
              <Eyebrow tone="emerald">Free tool · No email required</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 mb-6">NetSuite integration cost estimator</h1>
            <p className="text-lg text-neutral-300 print:text-black leading-relaxed max-w-3xl">
              &ldquo;What will this cost?&rdquo; is the first question in every NetSuite integration project, and the
              hardest to get a straight answer to. Describe what you need connected and you&rsquo;ll get a scope
              outline: the phases, the integration surface, the risks worth planning for, and a realistic range.
            </p>
          </div>
        </section>

        <section className="pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <EstimatorTool />
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-t border-neutral-900 print:hidden">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight mb-10">About the estimate</h2>
            <dl className="space-y-8">
              {faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-lg font-semibold mb-2">{q}</dt>
                  <dd className="text-neutral-400 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
