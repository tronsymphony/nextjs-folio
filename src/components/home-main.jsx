import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FeaturedProjects from "./section/FeaturedProjects";
import HeroField from "./home/HeroField";
import SyncDemo from "./home/SyncDemo";
import LeadMagnetCTA from "./LeadMagnetCTA";
import { Accent, ArrowLink, PrimaryCta, SecondaryCta, SectionHead } from "./ui/Cta";
import { offers } from "../data/netsuiteOffers";
import { publishedTopics } from "../data/netsuiteTopics";
import { publishedGuides } from "../data/appAuditGuides";
import { OFFERS, PERSON, formatUSD } from "../lib/site";
import { expertise } from "../data/expertise";

const symptoms = [
  "Customers email or call to ask about stock, pricing, and order status that NetSuite already knows.",
  "Your storefront or portal shows inventory that doesn't match the ERP.",
  "An integration someone built years ago breaks, and nobody wants to touch it.",
  "Sales reps rebuild quotes by hand from saved searches and spreadsheets.",
];

// Where each NetSuite offer is explained in depth, by position in `offers`.
const OFFER_LINKS = ["/netsuite/", "/netsuite/netsuite-customer-portal/", "/netsuite/material-handling/"];

const services = [
  ...offers.map((o, i) => ({ title: o.title, body: o.body, href: OFFER_LINKS[i] || "/netsuite/" })),
  {
    title: "Audits for apps built with AI",
    body: `A ${OFFERS.appAudit.durationDays}-day security and production-readiness review of apps built with Lovable, Bolt, Cursor or Claude Code: permissions, exposed keys, payments, and what to fix first.`,
    href: "/ai-app-audit/",
  },
  {
    title: "SEO and search marketing",
    body: "Technical SEO, content and pages planned from Search Console and Semrush, and lead capture that turns visits into inquiries. I fix the site and build the pages, not just write a report.",
    href: "/seo/",
  },
];

const ladder = [
  {
    step: "01",
    title: "Audit",
    body: `A fixed-price, ${OFFERS.audit.durationDays}-day review of everything connected to NetSuite. You get a written plan you own.`,
    detail: OFFERS.audit.price ? `${formatUSD(OFFERS.audit.price)} flat` : "Fixed fee",
  },
  {
    step: "02",
    title: "Build",
    body: "Fixed-scope implementation of what the audit found: integrations, portals, storefronts.",
    detail: OFFERS.implementationFrom ? `From ${formatUSD(OFFERS.implementationFrom)}` : "Fixed scope",
  },
  {
    step: "03",
    title: "Retain",
    body: "An engineer who already knows your account, on call for fixes and the next integration.",
    detail: OFFERS.retainerFrom ? `From ${formatUSD(OFFERS.retainerFrom)}/mo` : "Monthly",
  },
];

const heroFacts = [
  [`${PERSON.yearsExperience} yrs`, "Software engineering"],
  [`${OFFERS.audit.durationDays} days`, "Fixed-price NetSuite audit"],
  ["1 engineer", "From first call to launch"],
];

const SYSTEMS = ["Shopify", "Salesforce", "HubSpot", "BigCommerce", "EDI", "3PL", "SuiteQL", "RESTlets", "Next.js", "React", "Angular", "Supabase"];

// "Area: first item" for each expertise group, as a compact list.
const capabilities = expertise.map(({ area, items }) => [area, items[0]]);

const WRAP = "mx-auto max-w-[1440px] px-4 sm:px-8";

// Headline words slide up from behind a mask, one after another. Pure CSS, so
// the text is in the HTML and fully visible if animations are off.
function RevealWords({ segments, delay = 150, step = 55 }) {
  let i = 0;
  return segments.map(([text, accent], s) =>
    text.split(" ").map((word) => {
      const n = i++;
      const inner = (
        <span
          className="inline-block animate-[wordUp_1.1s_cubic-bezier(0.2,0.7,0.2,1)_both]"
          style={{ animationDelay: `${delay + n * step}ms` }}
        >
          {accent ? <Accent>{word}</Accent> : word}
        </span>
      );
      return (
        <span key={`${s}-${n}`}>
          {n > 0 && " "}
          <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] pr-[0.04em]">{inner}</span>
        </span>
      );
    })
  );
}

export default function HomeMain({ hero = "field" }) {
  const guides = [
    { href: "/edi/", title: "EDI documents explained: 850, 855, 856, 810 and more", tag: "EDI" },
    ...publishedTopics().map((t) => ({ href: `/netsuite/${t.slug}/`, title: t.h1, tag: "NetSuite" })),
    ...publishedGuides().map((g) => ({ href: `/ai-app-audit/${g.slug}/`, title: g.h1, tag: "App security" })),
  ];

  return (
    <div className="bg-canvas">
      {hero === "sync" ? <SyncHero /> : <FieldHero />}

      {/* Systems marquee (decorative; the guides below carry the real links) */}
      <div className="border-y border-line py-6 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-[marquee_45s_linear_infinite]">
          {[...SYSTEMS, ...SYSTEMS].map((s, i) => (
            <span key={i} className="flex items-center gap-10 pr-10 text-3xl md:text-5xl font-medium tracking-[-0.04em] text-ink/25">
              {s}
              <span className="w-2 h-2 rounded-full bg-accent/70" />
            </span>
          ))}
        </div>
      </div>

      {/* 01 The problem */}
      <section className={`${WRAP} pt-28 md:pt-40`}>
        <SectionHead index="01" label="The problem" title={<>NetSuite is your system of record. For your customers, it&rsquo;s a <Accent>dead end.</Accent></>}>
          NetSuite knows your inventory, pricing, and order history better than anything else in the business. But the
          customer-facing tools it ships with rarely fit how your customers buy, so that knowledge gets retyped,
          emailed, and copied into systems that drift out of sync.
        </SectionHead>
        <ol className="border-t border-line">
          {symptoms.map((s, i) => (
            <li
              key={s}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` }}
              className="grid grid-cols-[3rem_1fr] md:grid-cols-12 gap-4 py-7 border-b border-line"
            >
              <span className="md:col-span-1 font-mono text-xs text-faint pt-1.5">0{i + 1}</span>
              <p className="md:col-span-9 md:col-start-4 text-xl md:text-2xl tracking-[-0.02em] leading-snug">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 02 Services */}
      <section className={`${WRAP} pt-28 md:pt-40`}>
        <SectionHead index="02" label="What I build" title={<>Five things, <Accent>done properly.</Accent></>} />
        <ul className="border-t border-line">
          {services.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` }}>
              <Link
                href={s.href}
                className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-line transition-colors hover:bg-ink/5"
              >
                <span className="md:col-span-1 font-mono text-xs text-faint pt-3">0{i + 1}</span>
                <h3 className="md:col-span-4 text-3xl md:text-4xl font-medium tracking-[-0.035em] leading-[1.05] transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="col-start-2 col-span-2 md:col-span-6 md:col-start-6 text-muted leading-relaxed">{s.body}</p>
                <ArrowUpRight className="row-start-1 col-start-3 md:col-start-12 justify-self-end w-6 h-6 text-faint transition-all duration-500 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 03 Work */}
      <FeaturedProjects index="03" />

      {/* 04 How engagements work */}
      <section className={`${WRAP} pt-28 md:pt-40`}>
        <SectionHead index="04" label="How we'd work together" title={<>Start small and <Accent>fixed-price.</Accent></>}>
          Every engagement starts with something you can judge before committing to more.
        </SectionHead>
        <ol className="grid md:grid-cols-3 border-t border-line">
          {ladder.map((s, i) => (
            <li
              key={s.step}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` }}
              className="flex flex-col pt-8 pb-12 md:px-8 md:first:pl-0 md:border-l md:first:border-l-0 border-line border-b md:border-b-0"
            >
              <span className="text-[clamp(4rem,9vw,8rem)] font-medium leading-none tracking-[-0.06em] text-ink/15">{s.step}</span>
              <h3 className="mt-8 text-3xl font-medium tracking-[-0.03em]">{s.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{s.body}</p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{s.detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10" data-reveal>
          <ArrowLink href="/pricing/">See pricing</ArrowLink>
        </div>
      </section>

      {/* 05 Guides and tools */}
      <section className={`${WRAP} pt-28 md:pt-40`}>
        <SectionHead index="05" label="Free guides & tools" title={<>Answers before <Accent>the first call.</Accent></>} />
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link
              href="/tools/netsuite-integration-estimator/"
              data-reveal
              className="group relative flex flex-col justify-between min-h-[260px] p-8 rounded-3xl bg-ink !text-canvas overflow-hidden"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-canvas/60">Tool</span>
              <div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-[-0.035em] leading-[1.02]">NetSuite integration cost estimator</h3>
                <p className="mt-3 text-canvas/70 max-w-sm">Scope outline, risks, and a cost range. No email required.</p>
              </div>
              <ArrowUpRight className="absolute top-7 right-7 w-7 h-7 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
            <div data-reveal>
              <LeadMagnetCTA />
            </div>
          </div>
          <ul className="lg:col-span-7 border-t border-line" data-reveal>
            {guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="group flex items-center justify-between gap-6 py-5 border-b border-line">
                  <span className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint sm:w-28 shrink-0">{g.tag}</span>
                    <span className="text-lg tracking-[-0.015em] text-muted group-hover:text-ink transition-colors">{g.title}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-faint transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 Who you'll work with */}
      <section className={`${WRAP} pt-28 md:pt-40 pb-28 md:pb-40`}>
        <SectionHead index="06" label="Who you'll work with" />
        <div className="grid lg:grid-cols-12 gap-10">
          <p
            className="lg:col-span-8 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em]"
            data-reveal
          >
            {PERSON.name}, senior engineer. {PERSON.yearsExperience} years building software, from enterprise front ends
            to Next.js apps on live NetSuite data. <span className="text-muted">The person on your first call is the person <Accent>writing your code.</Accent></span>
          </p>
          <div className="lg:col-span-4 lg:pt-3" data-reveal>
            <ul className="border-t border-line">
              {capabilities.map(([area, first]) => (
                <li key={area} className="py-4 border-b border-line text-[15px] text-muted">
                  <span className="text-ink">{area}</span> · {first}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/about/">More about me</ArrowLink>
              <ArrowLink href="/services/">All skills</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Hero with the contour-line background.
function FieldHero() {
  return (
  <section className="grain relative min-h-[100svh] flex flex-col overflow-hidden">
    {/* Everything in the hero is sized by viewport height as well as width, so the fold fits on short laptop screens. */}
    {/* Contour field across the whole hero; faded behind the headline and into the page below. */}
    <div className="absolute inset-0">
      <HeroField />
    </div>
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-canvas/70 via-canvas/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none bg-gradient-to-t from-canvas to-transparent" />

    <div className={`${WRAP} relative z-10 flex-1 flex flex-col justify-end w-full pt-[max(6rem,13vh)] pb-[clamp(1.25rem,4vh,2.5rem)]`}>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-[clamp(1rem,3vh,2rem)] animate-[fadeInUp_0.9s_ease-out_forwards]">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        Oracle NetSuite + custom front-end engineering
        <span className="text-faint">/</span>
        {PERSON.location}
      </p>

      <h1 className="max-w-[17ch] text-[clamp(2.6rem,min(7.4vw,11.5vh),8.25rem)] font-medium leading-[0.92] tracking-[-0.055em]">
        <RevealWords segments={[["NetSuite, connected to the front ends your customers"], ["actually use.", true]]} />
      </h1>

      <div className="mt-[clamp(1.5rem,6vh,4.5rem)] grid lg:grid-cols-12 gap-6 lg:gap-10 items-end opacity-0 animate-[fadeInUp_1s_ease-out_0.35s_forwards]">
        <div className="lg:col-span-5">
          <p className="text-base md:text-lg text-muted leading-relaxed mb-[clamp(1rem,3vh,2rem)] max-w-md">
            I connect NetSuite to Shopify, EDI trading partners, 3PLs and CRMs, and build customer portals and storefronts in Next.js, React, and
            Angular. You work with me directly, from the first call to launch.
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryCta />
            <SecondaryCta href="/work/">See the work</SecondaryCta>
          </div>
        </div>
        <dl className="lg:col-span-6 lg:col-start-7 grid grid-cols-3 border-t border-line">
          {heroFacts.map(([value, label]) => (
            <div key={label} className="pt-4 pr-4">
              <dt className="sr-only">{label}</dt>
              <dd className="text-xl md:text-[clamp(1.5rem,3.4vh,1.875rem)] font-medium tracking-[-0.03em]">{value}</dd>
              <dd className="mt-1 text-[13px] text-muted leading-snug">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
  );
}

// Hero with the order-sync illustration on the right.
function SyncHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(20,20,19,0.09)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_70%_70%_at_75%_50%,black,transparent)]" />
      <div className={`${WRAP} relative z-10 flex-1 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full pt-[max(6.5rem,13vh)] pb-[clamp(1.5rem,4vh,2.5rem)]`}>
        <div className="lg:col-span-6">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-[clamp(1rem,3vh,2rem)] animate-[fadeInUp_0.9s_ease-out_forwards]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            Oracle NetSuite + custom front-end engineering
          </p>
          <h1 className="max-w-[13ch] text-[clamp(2.5rem,min(5.4vw,9.5vh),6.25rem)] font-medium leading-[0.94] tracking-[-0.05em]">
            <RevealWords segments={[["NetSuite, connected to the front ends your customers"], ["actually use.", true]]} />
          </h1>
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.35s_forwards]">
            <p className="mt-[clamp(1.25rem,4vh,2.5rem)] text-base md:text-lg text-muted leading-relaxed max-w-md">
              I connect NetSuite to Shopify, EDI trading partners, 3PLs and CRMs, and build customer portals and storefronts in Next.js, React, and Angular. You
              work with me directly, from the first call to launch.
            </p>
            <div className="mt-[clamp(1rem,3vh,2rem)] flex flex-wrap gap-3">
              <PrimaryCta />
              <SecondaryCta href="/work/">See the work</SecondaryCta>
            </div>
            <dl className="mt-[clamp(1.5rem,5vh,3.5rem)] grid grid-cols-3 max-w-lg border-t border-line">
              {heroFacts.map(([value, label]) => (
                <div key={label} className="pt-4 pr-4">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-xl md:text-2xl font-medium tracking-[-0.03em]">{value}</dd>
                  <dd className="mt-1 text-[13px] text-muted leading-snug">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="lg:col-span-6 opacity-0 animate-[fadeInUp_1.1s_ease-out_0.5s_forwards]">
          <SyncDemo />
        </div>
      </div>
    </section>
  );
}
