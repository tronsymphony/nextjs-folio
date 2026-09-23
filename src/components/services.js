import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaPair, Eyebrow } from './ui/Cta';
import { offers } from '../data/netsuiteOffers';

// Work I still take on, mostly for existing clients. Deliberately a compact
// list rather than equal-weight cards: NetSuite is the headline offer.
const alsoAvailable = [
  ['Custom web applications', 'React, Next.js, and Angular applications, including migrations off legacy front ends.'],
  ['Headless commerce', 'Shopify and other commerce back ends behind a custom, fast front end.'],
  ['Production hardening for AI-built apps', 'Taking a prototype built with AI tools to secure, maintainable production code.'],
  ['Performance', 'Core Web Vitals, bundle size, caching, and image pipelines.'],
  ['Accessibility (WCAG)', 'Audits and remediation to WCAG 2.2 AA.'],
  ['Analytics implementation', 'PostHog, Mixpanel, and GA4 event design that answers real product questions.'],
  ['Technical SEO', 'Crawlability, structured data, rendering strategy, and site architecture.'],
  ['Maintenance', 'Dependency upgrades, security patches, and monitoring for sites I built or inherit.'],
];

export default function Services() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <section className="relative pt-36 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
        <div className="container mx-auto max-w-4xl">
          <Eyebrow>Capabilities</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-6 mb-6">What I work on.</h1>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl">
            My focus is Oracle NetSuite: integrations, portals, and the front ends that sit on top of it. Fifteen years
            of broader engineering work sits behind that, and I still take on the projects below.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl p-8 rounded-2xl border border-blue-500/30 bg-blue-500/5">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Primary focus</p>
          <h2 className="text-3xl font-bold mb-8">Oracle NetSuite integration &amp; front-end engineering</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {offers.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="w-6 h-6 text-blue-400 mb-3" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold">
            <Link href="/netsuite/" className="inline-flex items-center gap-2 hover:text-blue-400">
              NetSuite overview <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/netsuite/material-handling/" className="inline-flex items-center gap-2 hover:text-blue-400">
              Material handling &amp; logistics <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/netsuite-audit/" className="inline-flex items-center gap-2 hover:text-blue-400">
              The integration audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-2">Also available</h2>
          <p className="text-neutral-500 mb-8">Usually for existing clients, or alongside NetSuite work.</p>
          <dl className="grid md:grid-cols-2 border-t border-neutral-800">
            {alsoAvailable.map(([title, body]) => (
              <div key={title} className="py-5 pr-8 border-b border-neutral-800">
                <dt className="font-semibold mb-1">{title}</dt>
                <dd className="text-sm text-neutral-400">{body}</dd>
              </div>
            ))}
          </dl>
          <CtaPair className="mt-12" />
        </div>
      </section>
    </div>
  );
}
