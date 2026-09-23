import Link from 'next/link';
import { ArrowRight, Truck } from 'lucide-react';
import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import LeadMagnetCTA from '../../components/LeadMagnetCTA';
import { CtaPair, Eyebrow } from '../../components/ui/Cta';
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
      <div className="bg-[#0a0a0a] text-white">
        <section className="relative pt-36 pb-20 px-4 sm:px-6 border-b border-neutral-900 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 blur-[130px] -z-10 rounded-full pointer-events-none" />
          <div className="container mx-auto max-w-4xl">
            <Eyebrow>Oracle NetSuite · Integrations · Front ends</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-6 mb-6">
              NetSuite is your system of record. It shouldn&rsquo;t be a dead end.
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              I connect Oracle NetSuite to the storefronts, portals, and tools your customers and staff actually use,
              and build those front ends in Next.js, React, or Angular. {PERSON.yearsExperience} years of software
              engineering, working directly with you, not through an account manager.
            </p>
            <CtaPair className="mt-10" />
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight mb-10">What I build</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {offers.map(({ icon: Icon, title, body }) => (
                <div key={title} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <Icon className="w-6 h-6 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-neutral-900 bg-[#0f0f10]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Connector, middleware, or custom?</h2>
            <p className="text-neutral-400 mb-10 max-w-3xl">
              Most NetSuite integration problems start with the wrong choice here. Each option is right somewhere.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500">
                    <th className="py-3 pr-6 font-medium">Approach</th>
                    <th className="py-3 pr-6 font-medium">Choose it when</th>
                    <th className="py-3 font-medium">Watch out for</th>
                  </tr>
                </thead>
                <tbody>
                  {patterns.map((p) => (
                    <tr key={p.name} className="border-b border-neutral-900 align-top">
                      <td className="py-4 pr-6 font-semibold text-white">{p.name}</td>
                      <td className="py-4 pr-6 text-neutral-300">{p.when}</td>
                      <td className="py-4 text-neutral-400">{p.watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
            <Link
              href="/netsuite/material-handling/"
              className="group p-8 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 transition-colors"
            >
              <Truck className="w-6 h-6 text-blue-400 mb-4" />
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Industry</p>
              <h3 className="text-2xl font-bold mb-3">Material handling, logistics &amp; industrial distribution</h3>
              <p className="text-neutral-400 mb-4">Equipment catalogs, rental and RFQ engines, and multi-branch portals on NetSuite.</p>
              <span className="inline-flex items-center gap-2 font-semibold group-hover:text-blue-400">
                See the details <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            {proof && (
              <Link
                href={`/work/${proof.slug}/`}
                className="group p-8 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Case study · {proof.client}</p>
                <h3 className="text-2xl font-bold mb-3">{proof.title}</h3>
                <p className="text-neutral-400 mb-4">{proof.summary}</p>
                <span className="inline-flex items-center gap-2 font-semibold group-hover:text-blue-400">
                  Read the case study <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            )}
          </div>
        </section>

        {topics.length > 0 && (
          <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold tracking-tight mb-10">NetSuite integration guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/netsuite/${t.slug}/`}
                    className="group p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors"
                  >
                    <h3 className="font-semibold mb-2 group-hover:text-blue-400">{t.h1}</h3>
                    <p className="text-sm text-neutral-400">{t.lede}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <LeadMagnetCTA className="mb-20" />
            <h2 className="text-3xl font-bold tracking-tight mb-10">Questions</h2>
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
      <Footer />
    </>
  );
}
