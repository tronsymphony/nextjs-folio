import Link from "next/link";
import { ArrowRight, Calculator, Check, ClipboardCheck, X } from "lucide-react";
import FeaturedProjects from "./section/FeaturedProjects";
import HeroScene from "./home/HeroScene";
import LeadMagnetCTA from "./LeadMagnetCTA";
import { Eyebrow, PrimaryCta, SecondaryCta } from "./ui/Cta";
import { offers } from "../data/netsuiteOffers";
import { OFFERS, PERSON, formatUSD } from "../lib/site";

const symptoms = [
  "Customers email or call to ask about stock, pricing, and order status that NetSuite already knows.",
  "Your storefront or portal shows inventory that doesn't match the ERP.",
  "An integration someone built years ago breaks, and nobody wants to touch it.",
  "Sales reps rebuild quotes by hand from saved searches and spreadsheets.",
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

export default function HomeMain() {
  return (
    <section className="pt-20">
      {/* Hero */}
      <section className="relative w-full min-h-[75vh] flex items-center bg-[#050505] overflow-hidden px-4 sm:px-6 py-12 lg:py-8">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)]"></div>

        {/* Live integration graph (three.js), loaded after hydration */}
        <div className="absolute inset-0 opacity-70 lg:opacity-100">
          <HeroScene className="absolute inset-0" />
        </div>
        {/* Keeps the headline legible over the scene */}
        <div className="absolute inset-0 pointer-events-none bg-[#050505]/45 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#050505] lg:via-[#050505]/40 lg:to-transparent lg:w-3/5"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="flex flex-col text-left">
              <div className="inline-flex items-center gap-2 mb-6 animate-[fadeInUp_0.8s_ease-out_forwards]">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 font-mono text-sm uppercase tracking-[0.2em] font-bold">
                  Oracle NetSuite + Custom Front-End Engineering
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1] tracking-tighter mb-6 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
                NetSuite, connected to the front ends your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                  customers actually use.
                </span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed max-w-xl mb-8 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0">
                I build NetSuite integrations, customer portals, and ERP-connected storefronts in Next.js, React, and
                Angular. {PERSON.yearsExperience} years of engineering; you work with me directly, from the first
                call to launch.
              </p>

              <div className="flex flex-wrap gap-3 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] opacity-0">
                <PrimaryCta />
                <SecondaryCta href="/work/">See the work</SecondaryCta>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-20 px-4 sm:px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-6 mb-4">
              NetSuite is your system of record. For your customers, it&rsquo;s a dead end.
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              NetSuite knows your inventory, pricing, and order history better than anything else in the business.
              But the customer-facing tools it ships with rarely fit how your customers actually buy, so that
              knowledge gets retyped, emailed, and copied into systems that drift out of sync.
            </p>
          </div>
          <ul className="space-y-4">
            {symptoms.map((s) => (
              <li key={s} className="flex gap-3 p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 text-neutral-300">
                <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What I build */}
      <section className="py-20 px-4 sm:px-6 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">What I build</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
                <Icon className="w-6 h-6 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <Link href="/netsuite/" className="inline-flex items-center gap-2 mt-8 font-semibold text-white hover:text-blue-400">
            More on NetSuite work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Proof */}
      <FeaturedProjects />

      {/* How engagements work */}
      <section className="py-20 px-4 sm:px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">How we&rsquo;d work together</h2>
          <p className="text-neutral-400 mb-10 max-w-2xl">
            Every engagement starts small and fixed-price, so you can judge the work before committing to more.
          </p>
          <ol className="grid md:grid-cols-3 gap-6">
            {ladder.map((s) => (
              <li key={s.step} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
                <p className="font-mono text-xs text-blue-400 mb-3">STEP {s.step}</p>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">{s.body}</p>
                <p className="text-sm font-semibold text-neutral-200">{s.detail}</p>
              </li>
            ))}
          </ol>
          <Link href="/pricing/" className="inline-flex items-center gap-2 mt-8 font-semibold text-white hover:text-blue-400">
            See pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Free resources */}
      <section className="py-20 px-4 sm:px-6 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <LeadMagnetCTA className="h-full" />
          </div>
          <Link
            href="/tools/netsuite-integration-estimator/"
            className="lg:col-span-2 group p-8 rounded-2xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 transition-colors flex flex-col"
          >
            <Calculator className="w-8 h-8 text-emerald-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">NetSuite integration estimator</h2>
            <p className="text-neutral-400 mb-6">
              Describe the systems you need connected and get a scope outline, the risks to watch, and a realistic cost
              range. No email required.
            </p>
            <span className="mt-auto inline-flex items-center gap-2 font-semibold text-white group-hover:text-emerald-400">
              Estimate your integration <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Who you'll work with */}
      <section className="py-20 px-4 sm:px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <Eyebrow tone="emerald">Who you&rsquo;ll work with</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-6 mb-4">
            {PERSON.name}, senior engineer. No account managers, no handoffs.
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-8">
            {PERSON.yearsExperience} years building software, from enterprise front ends in Angular and React to
            Next.js applications running on live NetSuite data. The person on your first call is the person writing
            your code.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-neutral-300">
            {[
              "Oracle NetSuite: SuiteTalk REST, RESTlets, SuiteQL, SuiteScript",
              "Next.js, React, and Angular front ends",
              "Integrations with commerce platforms, 3PLs, and CRMs",
              "Written plans and documentation you keep",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/about/" className="inline-flex items-center gap-2 mt-8 font-semibold text-white hover:text-blue-400">
            <ClipboardCheck className="w-4 h-4" /> More about me
          </Link>
        </div>
      </section>
    </section>
  );
}
