import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { ArrowUpRight } from 'lucide-react';
import { Accent, SecondaryCta } from '../../components/ui/Cta';
import { Block, ClosingCta, FaqList, LinkRows, NumberedList, PageHero } from '../../components/ui/Page';
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
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow={`Fixed scope · Fixed price · ${audit.durationDays} business days`}
          title={<>Built it with AI? Check it before <Accent>users find the holes.</Accent></>}
          lede={`AI coding tools get an app working fast, but they often leave gaps in logins, permissions, payments, and exposed keys. In ${audit.durationDays} business days, a senior engineer with 15 years of experience reviews your code and staging app and gives you a written report of what to fix first, with the file and line for each issue.`}
          facts={[
            ['Price', audit.price ? `${formatUSD(audit.price)} flat` : 'Flat fee, quoted on a call'],
            ['Turnaround', `${audit.durationDays} business days`],
            ['Stacks', 'React, Next.js, Supabase, Firebase, Node'],
            ['If you proceed', audit.creditedOnProceed ? 'Fee credited toward the fixes' : 'Fix it yourself or with me'],
          ]}
        >
          <a
            href={buyHref}
            className="group inline-flex items-center justify-center gap-2 pl-6 pr-5 py-3.5 rounded-full bg-ink !text-canvas font-medium tracking-tight hover:bg-accent transition-colors duration-300"
          >
            {audit.stripePaymentLink ? 'Book the audit' : 'Request the audit'}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <SecondaryCta href="/contact/">Ask a question first</SecondaryCta>
        </PageHero>

        <Block index="01" label="Who it's for">
          <NumberedList
            items={[
              'You built your app with an AI tool and are about to launch or take payments.',
              'You have real users now and aren’t sure who can see whose data.',
              'The AI keeps “fixing” one bug by creating another, and you need a clear list of what’s actually wrong.',
              'You’re buying a small software business and want to know what you’re inheriting.',
            ]}
          />
        </Block>

        <Block index="02" label="What gets reviewed" title="Five places AI-built apps break">
          <ol className="grid sm:grid-cols-2 gap-x-10 border-t border-line">
            {reviewed.map(({ title, body }, i) => (
              <li key={title} className="py-8 border-b border-line">
                <p className="font-mono text-xs text-accent mb-4">0{i + 1}</p>
                <h3 className="text-2xl font-medium tracking-[-0.03em] mb-3">{title}</h3>
                <p className="text-muted leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block index="03" label="What you get in writing">
          <NumberedList items={deliverables} tone="accent" />
        </Block>

        <Block index="04" label="How it runs">
          <ol className="border-t border-line">
            {steps.map(([when, what]) => (
              <li key={when} className="grid md:grid-cols-8 gap-3 md:gap-8 py-7 border-b border-line">
                <span className="md:col-span-2 text-2xl font-medium tracking-[-0.03em]">{when}</span>
                <span className="md:col-span-6 text-lg text-muted leading-relaxed">{what}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block index="05" label="Check it yourself first" title="Free guides to the checks the audit starts with">
          <LinkRows
            items={publishedGuides().map((g) => ({
              href: `/ai-app-audit/${g.slug}/`,
              title: g.h1,
              tag: `${g.checks.length} checks`,
            }))}
          />
        </Block>

        <Block index="06" label="Questions">
          <FaqList faqs={faqs} />
        </Block>

        <ClosingCta
          title={<>Launch knowing <Accent>what&rsquo;s exposed.</Accent></>}
          body={`A written report in ${audit.durationDays} business days, with the file and line for every issue.`}
          href={buyHref}
          cta={audit.stripePaymentLink ? 'Book the audit' : 'Request the audit'}
          secondary={['/contact/', 'Ask a question first']}
        />
      </div>
      <Footer />
    </>
  );
}
