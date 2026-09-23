import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Eyebrow } from './ui/Cta';
import { OFFERS, formatUSD } from '../lib/site';

const { audit, implementationFrom, retainerFrom } = OFFERS;

const tiers = [
  {
    step: '01',
    name: audit.name,
    price: audit.price ? formatUSD(audit.price) : 'Fixed fee',
    cadence: audit.price ? 'flat' : 'quoted on a 20-min call',
    summary: `Start here. A ${audit.durationDays}-business-day review of everything connected to NetSuite, delivered as a written plan you own.`,
    includes: [
      'Integration map and data-flow review',
      'Governance, performance, and security findings',
      'Prioritized remediation plan with effort estimates',
      audit.creditedOnProceed ? 'Fee credited toward implementation' : '60-minute walkthrough call',
    ],
    cta: { href: '/netsuite-audit/', label: 'See the audit' },
    featured: true,
  },
  {
    step: '02',
    name: 'Implementation',
    price: implementationFrom ? `From ${formatUSD(implementationFrom)}` : 'Fixed-scope project',
    cadence: 'per project',
    summary: 'Building what the audit found: integrations, customer and dealer portals, and ERP-connected storefronts.',
    includes: [
      'NetSuite REST, SuiteTalk, RESTlet and SuiteQL integrations',
      'Next.js / React / Angular front ends on live ERP data',
      'Fixed scope and price agreed before work starts',
      'Documentation and handover to your team',
    ],
    cta: { href: '/call/', label: 'Discuss a project' },
  },
  {
    step: '03',
    name: 'Retainer',
    price: retainerFrom ? `From ${formatUSD(retainerFrom)}` : 'Monthly',
    cadence: retainerFrom ? 'per month' : 'reserved capacity',
    summary: 'An engineer who already knows your NetSuite account, on call for fixes, changes, and the next integration.',
    includes: [
      'Reserved hours each month',
      'Monitoring of integration health and error queues',
      'Priority response when something breaks',
      'Quarterly roadmap review',
    ],
    cta: { href: '/call/', label: 'Ask about availability' },
  },
];

export default function Pricing() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <section className="pt-36 pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Eyebrow>How engagements work</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-6 mb-6">Start small. Stay if it works.</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Every engagement starts with a fixed-price audit, so you see how I work and what your systems need
            before committing to a build. Most clients go on to a project, then a retainer.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col p-8 rounded-2xl border ${
                tier.featured ? 'border-blue-500/50 bg-blue-500/5' : 'border-neutral-800 bg-neutral-900/40'
              }`}
            >
              <p className="font-mono text-xs text-blue-400 mb-3">STEP {tier.step}</p>
              <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
              <p className="mb-1">
                <span className="text-3xl font-extrabold">{tier.price}</span>
              </p>
              <p className="text-sm text-neutral-500 mb-6">{tier.cadence}</p>
              <p className="text-neutral-300 mb-6 leading-relaxed">{tier.summary}</p>
              <ul className="space-y-3 mb-8 text-sm text-neutral-300">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.cta.href}
                className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
                  tier.featured ? 'bg-white !text-black hover:bg-neutral-200' : 'border border-neutral-700 hover:bg-white/5'
                }`}
              >
                {tier.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-neutral-500 mt-10">
          Not sure which applies?{' '}
          <Link href="/call/" className="text-blue-400 underline">
            Book a free 20-minute fit call
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
