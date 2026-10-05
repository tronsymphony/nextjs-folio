import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Eyebrow, SecondaryCta } from '../../components/ui/Cta';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { publishedGuides } from '../../data/appAuditGuides';
import { OFFERS, formatUSD } from '../../lib/site';
import { appAuditServiceNode, breadcrumbNode, faqNode, graph } from '../../lib/schema';

const audit = OFFERS.appAudit;

export const metadata = {
  title: 'AI-Built App Audit: Security and Production Readiness',
  description: `A ${audit.durationDays}-business-day security and production-readiness review of an app built with Lovable, Bolt, Cursor, Replit, v0 or Claude Code. Written findings, a prioritized fix plan, and effort estimates.`,
  alternates: { canonical: '/ai-app-audit/' },
};

const reviewed = [
  {
    title: 'Who can see what',
    body: 'Login, sessions, and the checks that decide which user can read or change which record. Supabase row-level security, Firebase rules, and API routes that trust whatever the browser sends. This is where AI-written code breaks most often.',
  },
  {
    title: 'Secrets and keys',
    body: 'API keys, database credentials, and service tokens that ended up in the browser bundle, the repo history, or a public environment file.',
  },
  {
    title: 'Payments',
    body: 'Stripe or other checkout flows: webhook signature checks, prices the client can change, and subscriptions that stay active after a failed payment.',
  },
  {
    title: 'Data and APIs',
    body: 'Endpoints that return more than they should, missing rate limits, unvalidated input, file uploads, and what an outsider can reach without logging in.',
  },
  {
    title: 'Running it for real',
    body: 'Backups, error monitoring, environment setup, dependency risk, and whether a developer other than the AI could safely change this code next month.',
  },
];

const deliverables = [
  'A written findings report in plain language, with severity for every issue',
  'A prioritized fix plan: fix before launch, fix this month, fix later',
  'Effort estimates for each fix, usable with any developer or AI tool',
  'The exact file and line for each code issue',
  'A 45-minute walkthrough call',
];

const steps = [
  ['Day 1', 'Kickoff call. You add me as a read-only collaborator on the repo and share a staging URL and test accounts.'],
  [`Days 2–${audit.durationDays - 1}`, 'Review. I read the code, trace how data and permissions flow, and test the staging app the way an attacker would.'],
  [`Day ${audit.durationDays}`, 'Report delivered, followed by the walkthrough call.'],
];

const faqs = [
  {
    q: 'What does the AI-built app audit include?',
    a: `A ${audit.durationDays}-business-day review of an app built with AI coding tools: login and permissions, exposed secrets, payment flows, data and API exposure, and how ready it is to run in production. You receive a written findings report, a prioritized fix plan, and effort estimates.`,
  },
  {
    q: 'Which tools and stacks do you review?',
    a: 'Apps built with Lovable, Bolt, Cursor, Replit, v0, Claude Code and similar tools, usually React or Next.js with Supabase, Firebase, or a Node backend. If your stack is different, ask first and I will tell you honestly whether I am the right reviewer.',
  },
  {
    q: 'Is this a penetration test or a security guarantee?',
    a: 'No. It is a hands-on code and configuration review by a senior engineer, which finds the problems that matter most in AI-built apps. No review can promise an app has zero vulnerabilities. Testing is done only on a staging copy you provide, never on production without written permission.',
  },
  {
    q: 'I am buying a small software business. Can you review it before I close?',
    a: 'Yes. The same review tells a buyer what they are inheriting: security risk, what it will cost to maintain, and what breaks when the seller leaves. The seller usually grants repo access after a letter of intent.',
  },
  {
    q: 'What happens after the audit?',
    a: audit.creditedOnProceed
      ? 'Nothing, unless you want it to. If you hire me to make the fixes, the audit fee is credited toward that work. Many founders make the fixes themselves using the report, which is fine.'
      : 'Nothing, unless you want it to. You can make the fixes yourself, with another developer, or with me.',
  },
];

export default function AiAppAuditPage() {
  const buyHref = audit.stripePaymentLink || '/contact/';
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          appAuditServiceNode(),
          breadcrumbNode([['Home', '/'], ['AI-Built App Audit', '/ai-app-audit/']]),
          faqNode(faqs)
        )}
      />
      <div className="bg-ink text-white min-h-screen">
        <section className="relative pt-36 pb-20 px-4 sm:px-6 border-b border-line overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-accent/[0.04] blur-[130px] -z-10 rounded-full pointer-events-none" />
          <div className="container mx-auto max-w-4xl">
            <Eyebrow>Fixed scope · Fixed price · {audit.durationDays} business days</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.04em] mt-6 mb-6">Built it with AI? Check it before users find the holes.</h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-3xl">
              AI coding tools get an app working fast, but they often leave gaps in logins, permissions, payments, and
              exposed keys. In {audit.durationDays} business days, a senior engineer with 15 years of experience reviews
              your code and staging app and gives you a written report of what to fix first, with the file and line for
              each issue.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <a
                href={buyHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white !text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                {audit.stripePaymentLink ? 'Book the audit' : 'Request the audit'} <ArrowRight className="w-4 h-4" />
              </a>
              <SecondaryCta href="/contact/">Ask a question first</SecondaryCta>
            </div>
            <p className="mt-6 text-neutral-400">
              {audit.price ? (
                <>
                  <span className="text-2xl font-bold text-white">{formatUSD(audit.price)}</span> flat.
                </>
              ) : (
                'Flat fee, quoted on a 20-minute call.'
              )}{' '}
              {audit.creditedOnProceed && 'Credited in full if you hire me to make the fixes.'}
            </p>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-line">
          <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Who it&rsquo;s for</h2>
              <ul className="space-y-3 text-neutral-300">
                {[
                  'You built your app with an AI tool and are about to launch or take payments.',
                  'You have real users now and aren’t sure who can see whose data.',
                  'The AI keeps “fixing” one bug by creating another, and you need a clear list of what’s actually wrong.',
                  'You’re buying a small software business and want to know what you’re inheriting.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">What you get in writing</h2>
              <ul className="space-y-3 text-neutral-300">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-2">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight mb-10">What gets reviewed</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviewed.map(({ title, body }, i) => (
                <div key={title} className="p-6 rounded-xl border border-line bg-ink-2">
                  <p className="text-xs font-mono text-accent mb-2">0{i + 1}</p>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-line">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight mb-10">How it runs</h2>
            <ol className="space-y-6">
              {steps.map(([when, what]) => (
                <li key={when} className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6">
                  <span className="font-mono text-sm text-accent">{when}</span>
                  <span className="text-neutral-300">{what}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 border-b border-line">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Check it yourself first</h2>
            <p className="text-neutral-400 mb-10 max-w-3xl">Free guides to the checks the audit starts with.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {publishedGuides().map((g) => (
                <Link
                  key={g.slug}
                  href={`/ai-app-audit/${g.slug}/`}
                  className="group p-6 rounded-xl border border-line hover:border-neutral-700 transition-colors"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-accent">{g.h1}</h3>
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-400">
                    {g.checks.length} checks <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
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
