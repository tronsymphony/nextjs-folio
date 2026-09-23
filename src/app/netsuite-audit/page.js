import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Eyebrow, SecondaryCta } from '../../components/ui/Cta';
import { ArrowRight, Check } from 'lucide-react';
import { OFFERS, formatUSD } from '../../lib/site';
import { auditServiceNode, breadcrumbNode, faqNode, graph } from '../../lib/schema';

const audit = OFFERS.audit;

export const metadata = {
  title: 'NetSuite Integration Audit: Fixed Scope, Fixed Price',
  description: `A ${audit.durationDays}-business-day review of how Oracle NetSuite connects to your storefront, portals, and third-party systems. Written findings, a prioritized remediation plan, and effort estimates.`,
  alternates: { canonical: '/netsuite-audit/' },
};

const reviewed = [
  {
    title: 'Integration map',
    body: 'Every system that reads from or writes to NetSuite: storefront, 3PL, EDI, CRM, middleware, spreadsheets. Direction, method (SuiteTalk REST/SOAP, RESTlets, Celigo/Boomi flows, CSV imports) and frequency, drawn as one diagram.',
  },
  {
    title: 'Data flow and failure points',
    body: 'Where records drop, duplicate, or go stale. Script execution logs, integration error queues, and the orders, items, and customers that quietly fall out of sync.',
  },
  {
    title: 'Governance and performance',
    body: 'SuiteScript usage units, concurrency limits, scheduled and map/reduce script timing, and saved searches or SuiteQL queries that will not survive your next growth spurt.',
  },
  {
    title: 'The customer-facing surface',
    body: 'How your storefront or portal reads NetSuite: pricing and inventory accuracy, cache freshness, quote and order flows, and the page speed your customers actually experience.',
  },
  {
    title: 'Access and security',
    body: 'Integration roles, token-based authentication, least-privilege permissions, and where credentials live. The things nobody checks until something leaks.',
  },
];

const deliverables = [
  'A written findings report in plain language, with severity for every issue',
  'A prioritized remediation plan: quick wins, next 30 days, next 90 days',
  'Effort and cost estimates for each fix, usable with any developer or partner',
  'A current-state integration diagram you keep',
  'A 60-minute walkthrough call to go through it with your team',
];

const steps = [
  ['Day 1', 'Kickoff call. You grant a read-only NetSuite role (sandbox preferred) and access to the connected systems.'],
  [`Days 2–${audit.durationDays - 2}`, 'Review. I trace the data flows, read the scripts and logs, and test the customer-facing surface.'],
  [`Day ${audit.durationDays}`, 'Report delivered, followed by the walkthrough call.'],
];

const faqs = [
  {
    q: 'What does a NetSuite integration audit include?',
    a: `A ${audit.durationDays}-business-day review of every system connected to NetSuite: the integration methods, data-flow failures, SuiteScript governance and performance, the customer-facing storefront or portal, and access security. You receive a written findings report, a prioritized remediation plan, and effort estimates.`,
  },
  {
    q: 'Do you need admin access to our NetSuite account?',
    a: 'No. A read-only role is enough, and a sandbox account is preferred. Nothing in production is changed during the audit, and access can be revoked the day the report is delivered.',
  },
  {
    q: 'We already have a NetSuite partner. Does this still make sense?',
    a: 'Yes. The audit is an independent second opinion focused on integrations and front ends, which many implementation partners do not specialize in. The report is yours to act on with your partner, your team, or me.',
  },
  {
    q: 'What happens after the audit?',
    a: audit.creditedOnProceed
      ? 'Nothing, unless you want it to. If you hire me to implement the fixes, the audit fee is credited toward that work. Many teams take the plan in-house instead, which is fine.'
      : 'Nothing, unless you want it to. You can implement the plan yourself, with your partner, or with me.',
  },
];

export default function NetSuiteAuditPage() {
  const buyHref = audit.stripePaymentLink || '/call/';
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          auditServiceNode(),
          breadcrumbNode([['Home', '/'], ['NetSuite', '/netsuite/'], ['Integration Audit', '/netsuite-audit/']]),
          faqNode(faqs)
        )}
      />
      <div className="bg-[#0a0a0a] text-white min-h-screen">
        <section className="relative pt-36 pb-20 px-4 sm:px-6 border-b border-neutral-900 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 blur-[130px] -z-10 rounded-full pointer-events-none" />
          <div className="container mx-auto max-w-4xl">
            <Eyebrow>Fixed scope · Fixed price · {audit.durationDays} business days</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-6 mb-6">The NetSuite Integration Audit.</h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-3xl">
              A NetSuite integration audit is a fixed-scope review of every system that reads from or writes to your
              ERP. In {audit.durationDays} business days you get a written report showing where data is leaking, what
              will break as you grow, and exactly what to fix first, with effort estimates you can hand to anyone.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <a
                href={buyHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white !text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                {audit.stripePaymentLink ? 'Book the audit' : 'Book the audit: start with a call'} <ArrowRight className="w-4 h-4" />
              </a>
              <SecondaryCta>Ask a question first</SecondaryCta>
            </div>
            <p className="mt-6 text-neutral-400">
              {audit.price ? (
                <>
                  <span className="text-2xl font-bold text-white">{formatUSD(audit.price)}</span> flat.
                </>
              ) : (
                'Flat fee, quoted on a 20-minute call.'
              )}{' '}
              {audit.creditedOnProceed && 'Credited in full if you hire me to implement the fixes.'}
            </p>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
          <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Who it&rsquo;s for</h2>
              <ul className="space-y-3 text-neutral-300">
                {[
                  'Your storefront, portal, or 3PL shows inventory or pricing that doesn’t match NetSuite.',
                  'An integration someone built years ago breaks and nobody wants to touch it.',
                  'You’re about to launch a portal or new channel and want to know what the ERP can handle.',
                  'You’re choosing between the native connector, middleware, and custom work.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">What you get in writing</h2>
              <ul className="space-y-3 text-neutral-300">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-neutral-900 bg-[#0f0f10]">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight mb-10">What gets reviewed</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviewed.map(({ title, body }, i) => (
                <div key={title} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <p className="text-xs font-mono text-blue-400 mb-2">0{i + 1}</p>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight mb-10">How it runs</h2>
            <ol className="space-y-6">
              {steps.map(([when, what]) => (
                <li key={when} className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6">
                  <span className="font-mono text-sm text-blue-400">{when}</span>
                  <span className="text-neutral-300">{what}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
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
