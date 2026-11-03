import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Eyebrow } from './ui/Cta';
import { OFFERS, formatUSD } from '../lib/site';

const { audit, appAudit, seoAudit, implementationFrom, retainerFrom } = OFFERS;

const priceOf = (o) => (o.price ? formatUSD(o.price) : 'quoted');
const auditPrices = [audit, appAudit, seoAudit].map((o) => o.price).filter(Boolean);

const tiers = [
  {
    step: '00',
    name: 'Free review',
    price: '$0',
    cadence: '30 minutes, video call',
    summary: 'Send a link to your NetSuite setup, your app or your site. I look at it first, then we go through what I’d fix and in what order.',
    includes: [
      'Looked at before the call, not during it',
      'What to fix first, whether or not you hire me',
      'A straight answer on fit',
    ],
    cta: { href: '/call/', label: 'Book the review' },
    featured: true,
  },
  {
    step: '01',
    name: 'Fixed-price audit',
    price: auditPrices.length ? `From ${formatUSD(Math.min(...auditPrices))}` : 'Fixed fee',
    cadence: 'flat, agreed up front',
    summary: 'A written review and a prioritized plan you own, for one of the three lines of work.',
    includes: [
      `${audit.name}: ${priceOf(audit)}, ${audit.durationDays} business days`,
      `${appAudit.name}: ${priceOf(appAudit)}, ${appAudit.durationDays} business days`,
      `${seoAudit.name}: ${priceOf(seoAudit)}${seoAudit.durationDays ? `, ${seoAudit.durationDays} business days` : ''}`,
      'NetSuite and app audit fees credited toward the work if you go ahead',
    ],
    cta: { href: '/netsuite-audit/', label: 'See the NetSuite audit' },
  },
  {
    step: '02',
    name: 'Build',
    price: implementationFrom ? `From ${formatUSD(implementationFrom)}` : 'Fixed-scope project',
    cadence: 'per project',
    summary: 'Building what the audit found: integrations and portals, security fixes, or the pages and fixes search needs.',
    includes: [
      'Fixed scope and price agreed before work starts',
      'NetSuite integrations, Next.js, React and Angular front ends',
      'Documentation and handover to your team',
    ],
    cta: { href: '/call/', label: 'Discuss a project' },
  },
  {
    step: '03',
    name: 'Retainer',
    price: retainerFrom ? `From ${formatUSD(retainerFrom)}` : 'Monthly',
    cadence: retainerFrom ? 'per month' : 'reserved capacity',
    summary: 'An engineer who already knows your systems, on call for fixes, changes, the next integration and monthly search reviews.',
    includes: [
      'Reserved hours each month',
      'Monitoring of integrations and error queues',
      'Priority response when something breaks',
    ],
    cta: { href: '/call/', label: 'Ask about availability' },
  },
];

export default function Pricing() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <section className="pt-36 pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Eyebrow>How engagements work</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.04em] mt-6 mb-6">Start small. Stay if it works.</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Start with a free 30-minute review. If there&rsquo;s more to do, a fixed-price audit comes next, so you see
            how I work before committing to a build.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col p-8 rounded-2xl border ${
                tier.featured ? 'border-accent/50 bg-accent/5' : 'border-line bg-canvas-2'
              }`}
            >
              <p className="font-mono text-xs text-accent mb-3">STEP {tier.step}</p>
              <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
              <p className="mb-1">
                <span className="text-3xl font-medium">{tier.price}</span>
              </p>
              <p className="text-sm text-muted mb-6">{tier.cadence}</p>
              <p className="text-ink/80 mb-6 leading-relaxed">{tier.summary}</p>
              <ul className="space-y-3 mb-8 text-sm text-ink/80">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.cta.href}
                className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
                  tier.featured ? 'bg-ink !text-canvas hover:bg-accent' : 'border border-line hover:bg-ink/5'
                }`}
              >
                {tier.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted mt-10">
          Not sure which applies?{' '}
          <Link href="/call/" className="text-accent underline">
            Book a free 30-minute review
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
