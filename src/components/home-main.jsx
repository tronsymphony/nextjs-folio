import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FeaturedProjects from "./section/FeaturedProjects";
import HeroDemo from "./home/HeroDemo";
import HeroGrid from "./home/HeroGrid";
import HeroBlinds from "./home/HeroBlinds";
import LeadMagnetCTA from "./LeadMagnetCTA";
import { Accent, ArrowLink, PrimaryCta, SecondaryCta, SectionHead } from "./ui/Cta";
import { HERO_INTRO, heroFacts, LINES } from "./home/heroCopy";
import { HERO_VARIANTS } from "./home/HeroVariants";
import { publishedTopics } from "../data/netsuiteTopics";
import { publishedGuides } from "../data/appAuditGuides";
import { OFFERS, PERSON, formatUSD } from "../lib/site";
import { expertise } from "../data/expertise";

const ladder = [
  {
    step: "01",
    title: "Audit",
    body: "A fixed-price review of your NetSuite integrations, your AI-built app, or your site's search setup. You get a written plan you own.",
    detail: "Fixed fee",
  },
  {
    step: "02",
    title: "Build",
    body: "Fixed-scope work on what the audit found: integrations and portals, security fixes, or the pages and fixes search needs.",
    detail: OFFERS.implementationFrom ? `From ${formatUSD(OFFERS.implementationFrom)}` : "Fixed scope",
  },
  {
    step: "03",
    title: "Retain",
    body: "An engineer who already knows your systems, on call for fixes, the next integration, and monthly search reviews.",
    detail: OFFERS.retainerFrom ? `From ${formatUSD(OFFERS.retainerFrom)}/mo` : "Monthly",
  },
];

const SYSTEMS = ["NetSuite", "Shopify", "EDI", "Salesforce", "Lovable", "Supabase", "Stripe", "Cursor", "Search Console", "Semrush", "Next.js", "React"];

// "Area: first item" for each expertise group, as a compact list.
const capabilities = expertise.map(({ area, items }) => [area, items[0]]);

const WRAP = "mx-auto max-w-[1440px] px-4 sm:px-8";
const GUIDES_PER_LINE = 5;

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

export default function HomeMain({ hero = "sync-blinds" }) {
  // Guides grouped by line of work, each list ending in a link to the rest.
  const guideGroups = [
    {
      label: "NetSuite & EDI",
      more: ["/netsuite/", "All NetSuite guides"],
      items: [
        { href: "/edi/", title: "EDI documents explained: 850, 855, 856, 810 and more" },
        ...publishedTopics().map((t) => ({ href: `/netsuite/${t.slug}/`, title: t.h1 })),
      ],
    },
    {
      label: "Apps built with AI",
      more: ["/ai-app-audit/", "The app audit"],
      items: publishedGuides().map((g) => ({ href: `/ai-app-audit/${g.slug}/`, title: g.h1 })),
    },
    {
      label: "Search",
      more: ["/seo/", "SEO & search marketing"],
      items: [
        { href: "/seo/technical-seo-audit/", title: "Technical SEO audit: fixed scope, done by an engineer" },
        { href: "/seo/llms-txt/", title: "What is llms.txt? How to add one to Next.js or WordPress" },
      ],
    },
  ];

  const variant = HERO_VARIANTS[hero];
  const Hero = variant?.Hero ?? (hero === "sync" ? SyncHero : SyncBlindsHero);

  return (
    <div className="bg-canvas">
      <Hero />

      {/* Systems marquee (decorative; the sections below carry the real links) */}
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

      {/* 01 Three lines of work */}
      <section className={`${WRAP} pt-28 md:pt-40`}>
        <SectionHead index="01" label="What I do" title={<>Three lines of work, <Accent>one engineer.</Accent></>}>
          Each starts with a fixed-price audit, so you can judge the work before committing to more.
        </SectionHead>
        <ol className="grid lg:grid-cols-3 border-t border-line">
          {LINES.map((line, i) => (
            <li
              key={line.id}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` }}
              className="flex flex-col pt-8 pb-12 lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:border-l lg:first:border-l-0 border-line border-b lg:border-b-0"
            >
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
              <h3 className="mt-6 text-3xl md:text-4xl font-medium tracking-[-0.035em] leading-[1.05]">{line.title}</h3>
              <p className="mt-4 text-muted leading-relaxed">{line.body}</p>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">For when</p>
              <ul className="mt-3 border-t border-line">
                {line.symptoms.map((s) => (
                  <li key={s} className="py-3 border-b border-line text-[15px] leading-snug">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Start with</p>
                <p className="mt-2 text-lg font-medium tracking-[-0.02em]">{line.start}</p>
                <p className="mt-1 text-sm text-muted">{line.startDetail}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {line.links.map(([href, label]) => (
                    <ArrowLink key={href} href={href}>
                      {label}
                    </ArrowLink>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 02 Work */}
      <FeaturedProjects index="02" />

      {/* 03 How engagements work */}
      <section className={`${WRAP} pt-28 md:pt-40`}>
        <SectionHead index="03" label="How we'd work together" title={<>Start small and <Accent>fixed-price.</Accent></>}>
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

      {/* 04 Guides and tools */}
      <section className={`${WRAP} pt-28 md:pt-40`}>
        <SectionHead index="04" label="Free guides & tools" title={<>Answers before <Accent>the first call.</Accent></>} />
        <div className="grid lg:grid-cols-3 gap-10" data-reveal>
          {guideGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-3">{group.label}</p>
              <ul className="border-t border-line">
                {group.items.slice(0, GUIDES_PER_LINE).map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="group flex items-center justify-between gap-6 py-4 border-b border-line">
                      <span className="text-[17px] leading-snug tracking-[-0.015em] text-muted group-hover:text-ink transition-colors">{g.title}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-faint transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
              <ArrowLink href={group.more[0]} className="mt-5">
                {group.more[1]}
              </ArrowLink>
            </div>
          ))}
        </div>
        <div className="mt-16 grid lg:grid-cols-2 gap-6">
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
            <LeadMagnetCTA className="h-full" />
          </div>
        </div>
      </section>

      {/* 05 Who you'll work with */}
      <section className={`${WRAP} pt-28 md:pt-40 pb-28 md:pb-40`}>
        <SectionHead index="05" label="Who you'll work with" />
        <div className="grid lg:grid-cols-12 gap-10">
          <p
            className="lg:col-span-8 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em]"
            data-reveal
          >
            {PERSON.name}, senior engineer. {PERSON.yearsExperience} years building software, from enterprise front ends and
            NetSuite integrations to my own product, a crash-data map that grew through search.{" "}
            <span className="text-muted">The person on your first call is the person <Accent>writing your code.</Accent></span>
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

function SyncBlindsHero() {
  return <SyncHero background="blinds" />;
}

// Hero with the try-it demos on the right, over vertical blinds with the sun
// behind them or, with background="grid", the dot grid.
function SyncHero({ background = "grid" }) {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {background === "blinds" ? (
        <>
          <HeroBlinds />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-canvas/80 via-canvas/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/5 pointer-events-none bg-gradient-to-t from-canvas to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_85%_85%_at_70%_50%,black,transparent)]">
          <HeroGrid />
        </div>
      )}
      <div className={`${WRAP} relative z-10 flex-1 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full pt-[max(6.5rem,13vh)] pb-[clamp(1.5rem,4vh,2.5rem)]`}>
        <div className="lg:col-span-6">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-[clamp(1rem,3vh,2rem)] animate-[fadeInUp_0.9s_ease-out_forwards]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            NetSuite integrations · AI app audits · Technical SEO
          </p>
          <h1 className="max-w-[14ch] text-[clamp(2.5rem,min(5.4vw,9.5vh),6.25rem)] font-medium leading-[0.94] tracking-[-0.05em]">
            <RevealWords segments={[["Systems that agree, apps that hold up, sites that"], ["get found.", true]]} />
          </h1>
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.35s_forwards]">
            <p className="mt-[clamp(1.25rem,4vh,2.5rem)] text-base md:text-lg text-muted leading-relaxed max-w-md">{HERO_INTRO}</p>
            <div className="mt-[clamp(1rem,3vh,2rem)] flex flex-wrap gap-3">
              <PrimaryCta href="/call/">Book a free 30-min review</PrimaryCta>
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
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
