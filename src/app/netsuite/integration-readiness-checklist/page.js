import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import LeadMagnetCTA from '../../../components/LeadMagnetCTA';
import PrintButton from '../../../components/PrintButton';
import { Eyebrow } from '../../../components/ui/Cta';
import { checklist, checklistCount } from '../../../data/readinessChecklist';
import { ORG_ID, PERSON_ID, breadcrumbNode, graph, url } from '../../../lib/schema';

export const metadata = {
  title: 'NetSuite Integration Readiness Checklist',
  description: `${checklistCount} checks to run before connecting a storefront, portal, 3PL, or any other system to Oracle NetSuite: data ownership, sync design, failure handling, security, and launch.`,
  alternates: { canonical: '/netsuite/integration-readiness-checklist/' },
};

export default function ChecklistPage() {
  return (
    <>
      <div className="print:hidden">
        <HomeFollow />
      </div>
      <JsonLd
        data={graph(
          {
            '@type': 'Article',
            headline: 'NetSuite Integration Readiness Checklist',
            description: metadata.description,
            url: url('/netsuite/integration-readiness-checklist/'),
            author: { '@id': PERSON_ID },
            publisher: { '@id': ORG_ID },
          },
          breadcrumbNode([
            ['Home', '/'],
            ['NetSuite', '/netsuite/'],
            ['Integration Readiness Checklist', '/netsuite/integration-readiness-checklist/'],
          ])
        )}
      />
      <article className="bg-[#0a0a0a] text-white print:bg-white print:text-black">
        <header className="pt-36 pb-12 px-4 sm:px-6 print:pt-0">
          <div className="container mx-auto max-w-3xl">
            <div className="print:hidden">
              <Eyebrow>Free checklist · {checklistCount} checks</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 mb-6">The NetSuite Integration Readiness Checklist</h1>
            <p className="text-lg text-neutral-300 print:text-black leading-relaxed">
              Most NetSuite integrations that fail were never going to work: two systems both believed they owned the
              same data, nobody planned for errors, or the design ignored the account&rsquo;s API limits. Run these
              checks before you connect anything to NetSuite. Every &ldquo;no&rdquo; is a risk worth resolving first.
            </p>
            <div className="mt-8 print:hidden">
              <PrintButton />
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 pb-16">
          <div className="container mx-auto max-w-3xl space-y-12">
            {checklist.map(({ section, items }) => (
              <section key={section} className="break-inside-avoid">
                <h2 className="text-2xl font-bold mb-5">{section}</h2>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 text-neutral-300 print:text-black leading-relaxed">
                      <span aria-hidden="true" className="mt-1 w-4 h-4 shrink-0 rounded border border-neutral-600 print:border-black" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <div className="print:hidden">
              <LeadMagnetCTA />
            </div>
          </div>
        </div>
      </article>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
