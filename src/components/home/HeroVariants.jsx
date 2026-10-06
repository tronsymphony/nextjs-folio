import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Accent, PrimaryCta, SecondaryCta } from "../ui/Cta";
import { PERSON } from "../../lib/site";
import { HERO_INTRO, heroFacts, services } from "./heroCopy";

// Homepage hero designs being compared at /lab/home/. All of them are still
// (no canvas, no looping motion): at most a one-time fade on load.

const WRAP = "mx-auto max-w-[1440px] px-4 sm:px-8";
const LABEL = "font-mono text-[11px] uppercase tracking-[0.18em]";
const FADE = "opacity-0 animate-[fadeInUp_0.9s_ease-out_forwards]";

function Kicker({ children, className = "" }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${LABEL} text-muted ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

function Facts({ className = "", tone = "ink" }) {
  return (
    <dl className={`grid grid-cols-3 border-t ${tone === "ink" ? "border-line" : "border-canvas/15"} ${className}`}>
      {heroFacts.map(([value, label]) => (
        <div key={label} className="pt-4 pr-4">
          <dt className="sr-only">{label}</dt>
          <dd className="text-xl md:text-2xl font-medium tracking-[-0.03em]">{value}</dd>
          <dd className={`mt-1 text-[13px] leading-snug ${tone === "ink" ? "text-muted" : "text-canvas/60"}`}>{label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Ctas() {
  return (
    <div className="flex flex-wrap gap-3">
      <PrimaryCta />
      <SecondaryCta href="/work/">See the work</SecondaryCta>
    </div>
  );
}

/* A. Statement: type only. One very large headline across the page, the intro
   and facts in a row underneath. Nothing moves. */
function StatementHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col">
      <div className={`${WRAP} flex-1 flex flex-col w-full pt-[max(7rem,15vh)] pb-[clamp(1.5rem,4vh,2.5rem)]`}>
        <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
          <Kicker>Oracle NetSuite + custom front-end engineering</Kicker>
          <span className={`${LABEL} text-faint hidden sm:inline`}>{PERSON.location}</span>
        </div>

        <h1 className="mt-[clamp(2rem,7vh,5rem)] text-[clamp(2.8rem,min(9vw,14vh),10.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">
          NetSuite, connected
          <br className="hidden md:block" /> to the front ends
          <br className="hidden md:block" /> your customers <Accent>actually&nbsp;use.</Accent>
        </h1>

        <div className="mt-auto pt-[clamp(2rem,6vh,4rem)] grid lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-4 text-base md:text-lg text-muted leading-relaxed">{HERO_INTRO}</p>
          <div className="lg:col-span-3 lg:col-start-6">
            <Ctas />
          </div>
          <Facts className="lg:col-span-4 lg:col-start-9" />
        </div>
      </div>
    </section>
  );
}

/* B. Ledger: the headline beside a still table of one order as each system
   sees it, all matching. Shows the job (keeping systems in agreement) without
   animating it. */
const LEDGER = [
  ["Order SO-10482", "Pending billing", "Shipped", "Shipped"],
  ["On hand, SKU 2231", "48", "48", "48"],
  ["Dealer price", "$212.00", "$212.00", "$212.00"],
  ["Ship-to", "Dock 4, Ontario CA", "Dock 4, Ontario CA", "Dock 4, Ontario CA"],
  ["Tracking", "1Z 84F 2W1", "1Z 84F 2W1", "1Z 84F 2W1"],
];

function LedgerHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col">
      <div className={`${WRAP} flex-1 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full pt-[max(7rem,14vh)] pb-[clamp(1.5rem,4vh,2.5rem)]`}>
        <div className={`lg:col-span-5 ${FADE}`}>
          <Kicker className="mb-8">Oracle NetSuite + custom front-end engineering</Kicker>
          <h1 className="text-[clamp(2.5rem,min(5vw,9vh),5.75rem)] font-medium leading-[0.95] tracking-[-0.05em]">
            One order. <br />
            Every system <Accent>agrees.</Accent>
          </h1>
          <p className="mt-8 text-base md:text-lg text-muted leading-relaxed max-w-md">{HERO_INTRO}</p>
          <div className="mt-8">
            <Ctas />
          </div>
        </div>

        <figure className="lg:col-span-7 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          <div className="rounded-3xl border border-line bg-canvas-2/60 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[15px]">
              <thead>
                <tr className={`${LABEL} text-faint`}>
                  <th className="font-normal p-5 pb-4">Field</th>
                  <th className="font-normal p-5 pb-4 text-ink">NetSuite</th>
                  <th className="font-normal p-5 pb-4">Storefront</th>
                  <th className="font-normal p-5 pb-4">Customer portal</th>
                </tr>
              </thead>
              <tbody>
                {LEDGER.map(([field, ...values]) => (
                  <tr key={field} className="border-t border-line">
                    <td className="p-5 text-muted">{field}</td>
                    {values.map((v, i) => (
                      <td key={i} className={`p-5 tabular-nums tracking-[-0.01em] ${i === 0 ? "font-medium" : ""}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-accent text-canvas">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                In sync, read from NetSuite
              </span>
              <span className={`${LABEL} text-faint`}>Illustrative data</span>
            </div>
          </div>
          <Facts className="mt-8" />
        </figure>
      </div>
    </section>
  );
}

/* C. Hub: an ink panel inset in the page with a still diagram of NetSuite in
   the middle and the systems it feeds on either side. */
const LEFT = ["Shopify", "B2B storefront", "Customer portal"];
const RIGHT = ["EDI partners", "3PL / warehouse", "Salesforce / HubSpot"];

function HubDiagram() {
  // Node rows at y = 40, 120, 200 in a 600 x 240 box; NetSuite in the middle.
  const ys = [40, 120, 200];
  return (
    <div className="relative w-full aspect-[600/240]" aria-hidden="true">
      <svg viewBox="0 0 600 240" className="absolute inset-0 w-full h-full">
        {ys.map((y) => (
          <g key={y} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1">
            <path d={`M150 ${y} C 230 ${y}, 230 120, 255 120`} />
            <path d={`M450 ${y} C 370 ${y}, 370 120, 345 120`} />
          </g>
        ))}
        <circle cx="255" cy="120" r="3" fill="var(--color-accent)" />
        <circle cx="345" cy="120" r="3" fill="var(--color-accent)" />
      </svg>
      {ys.map((y, i) => (
        <span key={`l${i}`} className="absolute left-0 w-[25%] -translate-y-1/2 rounded-full border border-canvas/20 px-3 py-1.5 text-center text-[clamp(0.6rem,1.2vw,0.875rem)] whitespace-nowrap" style={{ top: `${(y / 240) * 100}%` }}>
          {LEFT[i]}
        </span>
      ))}
      {ys.map((y, i) => (
        <span key={`r${i}`} className="absolute right-0 w-[25%] -translate-y-1/2 rounded-full border border-canvas/20 px-3 py-1.5 text-center text-[clamp(0.6rem,1.2vw,0.875rem)] whitespace-nowrap" style={{ top: `${(y / 240) * 100}%` }}>
          {RIGHT[i]}
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] aspect-square grid place-items-center rounded-full bg-accent text-canvas font-medium text-[clamp(0.65rem,1.4vw,1rem)] tracking-[-0.02em]">
        NetSuite
      </span>
    </div>
  );
}

function HubHero() {
  return (
    <section className="relative px-2 sm:px-3 pt-[84px] pb-3">
      <div className="rounded-[2rem] bg-ink text-canvas min-h-[calc(100svh-96px)] flex flex-col overflow-hidden">
        <div className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 flex-1 flex flex-col pt-[clamp(2rem,7vh,5rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
          <p className={`flex items-center gap-3 ${LABEL} text-canvas/60`}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            Oracle NetSuite + custom front-end engineering
          </p>
          <div className="mt-[clamp(1.5rem,5vh,3.5rem)] grid lg:grid-cols-12 gap-10 items-center">
            <h1 className={`lg:col-span-6 text-[clamp(2.5rem,min(5.6vw,10vh),6.5rem)] font-medium leading-[0.93] tracking-[-0.055em] ${FADE}`}>
              NetSuite, connected to the front ends your customers <Accent>actually use.</Accent>
            </h1>
            <div className="lg:col-span-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <HubDiagram />
            </div>
          </div>
          <div className="mt-auto pt-[clamp(2rem,6vh,4rem)] grid lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-5 text-base md:text-lg text-canvas/70 leading-relaxed">{HERO_INTRO}</p>
            <div className="lg:col-span-3 lg:col-start-7 flex flex-wrap gap-3">
              <PrimaryCta className="!bg-canvas !text-ink hover:!bg-accent hover:!text-canvas" />
              <Link href="/work/" className="inline-flex items-center px-6 py-3.5 rounded-full border border-canvas/25 font-medium tracking-tight hover:border-canvas transition-colors">
                See the work
              </Link>
            </div>
            <Facts tone="canvas" className="lg:col-span-3 lg:col-start-10 [&_dd:first-of-type]:text-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* D. Letter: personal and quiet. A short note in large type, signed, with the
   offer underneath. Leans on "you work with me directly". */
function LetterHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col">
      <div className={`${WRAP} flex-1 grid lg:grid-cols-12 gap-10 w-full pt-[max(8rem,17vh)] pb-[clamp(1.5rem,4vh,2.5rem)]`}>
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <Kicker>Casa Dev / {PERSON.location}</Kicker>
          <p className="hidden lg:block text-sm text-muted leading-relaxed max-w-[16rem]">
            Oracle NetSuite integration and custom front-end engineering, by one senior engineer.
          </p>
        </aside>
        <div className="lg:col-span-8 lg:col-start-5 flex flex-col">
          <h1 className={`text-[clamp(2.5rem,min(6vw,10vh),6.5rem)] font-medium leading-[0.95] tracking-[-0.05em] ${FADE}`}>
            <Accent>Hi, I&rsquo;m Nitya.</Accent>
            <br />I make NetSuite talk to everything else.
          </h1>
          <div className="mt-[clamp(1.5rem,5vh,3.5rem)] grid md:grid-cols-2 gap-8 text-lg md:text-xl leading-relaxed tracking-[-0.01em] opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            <p>
              Your storefront, your customer portal, your EDI partners and your warehouse should all show what NetSuite
              already knows: the same stock, the same prices, the same order status.
            </p>
            <p className="text-muted">
              I&rsquo;ve built software for {PERSON.yearsExperience} years. The person on your first call is the person{" "}
              <Accent>writing your code</Accent>, and every job starts with a fixed-price audit you can judge first.
            </p>
          </div>
          <div className="mt-auto pt-[clamp(2rem,6vh,4rem)] flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Ctas />
            <p className={`${LABEL} text-faint`}>— {PERSON.name}, senior engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* E. Index: the services are the hero. A short headline, then each service as
   a large numbered row, like a studio's table of contents. */
function IndexHero() {
  return (
    <section className="relative">
      <div className={`${WRAP} pt-[max(7.5rem,15vh)] pb-16`}>
        <div className="grid lg:grid-cols-12 gap-8 items-end pb-[clamp(2rem,6vh,4rem)]">
          <h1 className={`lg:col-span-7 text-[clamp(2.5rem,min(5.6vw,10vh),6.25rem)] font-medium leading-[0.93] tracking-[-0.055em] ${FADE}`}>
            NetSuite, connected to the front ends your customers <Accent>actually use.</Accent>
          </h1>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
            <p className="text-base md:text-lg text-muted leading-relaxed">{HERO_INTRO}</p>
            <Ctas />
          </div>
        </div>
        <ul className="border-t border-ink">
          {services.map((s, i) => (
            <li key={s.title}>
              <Link
                href={s.href}
                className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-12 gap-4 md:gap-8 items-baseline py-6 md:py-7 border-b border-line"
              >
                <span className="font-mono text-xs text-faint">0{i + 1}</span>
                <h2 className="md:col-span-6 text-[clamp(1.6rem,3.4vw,3.25rem)] font-medium tracking-[-0.04em] leading-[1.02] transition-colors duration-300 group-hover:text-accent">
                  {s.title}
                </h2>
                <p className="hidden md:block md:col-span-4 text-[15px] text-muted leading-relaxed">{s.body}</p>
                <ArrowUpRight className="row-start-1 col-start-3 md:col-start-12 justify-self-end w-6 h-6 text-faint transition-all duration-300 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const HERO_VARIANTS = {
  statement: { Hero: StatementHero, name: "Statement", note: "Type only, one very large headline, nothing moves." },
  ledger: { Hero: LedgerHero, name: "Ledger", note: "Headline beside a still table: one order, every system matching." },
  hub: { Hero: HubHero, name: "Hub", note: "Ink panel with a still diagram of NetSuite feeding six systems." },
  letter: { Hero: LetterHero, name: "Letter", note: "Personal note in large type, signed. Leads with working with you directly." },
  index: { Hero: IndexHero, name: "Index", note: "The five services are the hero, as big numbered rows.", listsServices: true },
};
