"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PERSON } from "../lib/site";

// Pages that already end in a booking or contact form don't need the CTA band.
const HIDE_CTA_ON = ["/contact/", "/call/", "/netsuite-audit/", "/seo/"];
// The app-audit guides end in their own audit CTA; the NetSuite band would be off-topic there.
const hideCta = (pathname) =>
  HIDE_CTA_ON.includes(pathname) || pathname?.startsWith("/ai-app-audit/") || pathname?.startsWith("/seo/");

// Hubs that list every guide, so each page links to all of them in two clicks.
const COLUMNS = [
  {
    title: "Services",
    links: [
      ["/netsuite-audit/", "NetSuite integration audit"],
      ["/ai-app-audit/", "AI-built app audit"],
      ["/netsuite/", "NetSuite integrations"],
      ["/seo/", "SEO & AI search"],
      ["/seo/technical-seo-audit/", "Technical SEO audit"],
      ["/pricing/", "Pricing"],
    ],
  },
  {
    title: "Guides",
    links: [
      ["/netsuite/", "NetSuite integration guides"],
      ["/tools/netsuite-integration-estimator/", "Integration cost estimator"],
      ["/edi/", "EDI documents explained"],
      ["/netsuite/integration-readiness-checklist/", "Readiness checklist"],
      ["/ai-app-audit/", "AI-built app security"],
    ],
  },
  {
    title: "Studio",
    links: [
      ["/work/", "Case studies"],
      ["/about/", "About"],
      ["/contact/", "Contact"],
      ["/privacy-policy/", "Privacy policy"],
    ],
  },
];

const SOCIAL = [
  ["LinkedIn", PERSON.linkedin],
  ["GitHub", PERSON.github],
];

// Los Angeles time, ticking once a minute. Rendered only in the browser so the
// static HTML never carries a stale time.
function LocalTime() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time ?? "—"}</span>;
}

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      {!hideCta(pathname) && (
        <section className="relative bg-canvas border-t border-line overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-24 md:py-36">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-10" data-reveal>
              (Next step)
            </p>
            <h2
              className="max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.045em]"
              data-reveal
            >
              Is NetSuite holding you back? <em className="font-serif italic font-normal text-muted">Let&rsquo;s fix it.</em>
            </h2>
            <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10" data-reveal>
              <p className="max-w-md text-lg text-muted leading-relaxed">
                Start with a fixed-price integration audit: a written plan showing what&rsquo;s broken, what will break next,
                and what to fix first.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/netsuite-audit/"
                  className="group inline-flex items-center justify-center gap-2 pl-7 pr-6 py-4 rounded-full bg-ink !text-canvas font-medium hover:bg-accent transition-colors duration-300"
                >
                  Book a NetSuite audit
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/call/"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-line font-medium hover:border-ink transition-colors duration-300"
                >
                  Free 30-min review
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-canvas-2 border-t border-line overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 pt-20 md:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 pb-20">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-6">Get in touch</p>
              <Link
                href="/call/"
                className="group inline-flex items-center gap-3 text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.03em]"
              >
                <span className="link-draw">Book a free 30-min review</span>
                <ArrowUpRight className="w-6 h-6 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <p className="mt-3 text-muted">
                Or <Link href="/contact/" className="link-draw text-ink">send a message</Link>.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-6 max-w-sm text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-2">Based in</dt>
                  <dd className="text-muted">
                    <Link href="/about/los-angeles/" className="link-draw hover:text-ink">Los Angeles, California</Link>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-2">Local time</dt>
                  <dd className="text-muted">
                    <LocalTime />
                  </dd>
                </div>
              </dl>
            </div>

            <nav aria-label="Footer" className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-5">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.links.map(([href, label]) => (
                      <li key={href + label}>
                        <Link href={href} className="text-[15px] text-muted hover:text-ink transition-colors">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-line text-[13px] text-faint">
            <span>
              © {new Date().getFullYear()} {PERSON.name}. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              {SOCIAL.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  {label}
                </a>
              ))}
              <a href="#" className="hover:text-ink transition-colors">
                Back to top ↑
              </a>
            </div>
          </div>
        </div>

        {/* Oversized wordmark, cropped by the page edge. */}
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-semibold leading-[0.78] tracking-[-0.07em] text-ink/[0.06] text-[27vw] -mb-[4vw]"
        >
          Casa <span className="font-serif italic font-normal tracking-[-0.03em]">Dev</span>
        </p>
      </footer>
    </>
  );
}
