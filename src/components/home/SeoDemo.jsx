'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Search } from 'lucide-react';
import { ACTIVE, CARD, LABEL, pulse } from './demoUi';

// Hero demo for technical SEO: a page's search result before and after the
// fixes a technical audit usually finds. "Fix the page" works through the
// checks one at a time and the result updates with each. No rankings or
// traffic numbers: we'd have to invent them. The business is illustrative.

const QUERY = 'forklift parts ontario ca';
const STEP_MS = 650;

const CHECKS = [
  'Title says what the page offers',
  'One clean URL, set as canonical',
  'Description answers the search',
  'In the sitemap and indexed',
  'FAQ marked up as structured data',
];

export default function SeoDemo() {
  const [step, setStep] = useState(-1); // checks fixed so far; -1 = not started
  const resultRef = useRef(null);
  const rowRefs = useRef([]);

  const running = step >= 0 && step < CHECKS.length;
  const done = step >= CHECKS.length;
  const ok = (i) => step > i;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      pulse(rowRefs.current[step]);
      setStep((s) => s + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [step, running]);

  useEffect(() => {
    if (done) pulse(resultRef.current);
  }, [done]);

  return (
    <figure className="relative w-full" aria-label="Interactive illustration: a page's search result before and after technical SEO fixes">
      <div className="flex items-center gap-2 rounded-full border border-line bg-canvas px-4 py-2.5 text-sm">
        <Search className="w-4 h-4 text-faint" aria-hidden="true" />
        <span>{QUERY}</span>
      </div>

      <div ref={resultRef} className={`${CARD} mt-3 ${done ? ACTIVE : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={LABEL}>Search result preview</span>
          <span
            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] border transition-colors duration-500 ${
              ok(3) ? 'border-accent text-accent' : 'border-line text-faint'
            }`}
          >
            {ok(3) ? 'Indexed' : 'Not indexed'}
          </span>
        </div>
        <p className="font-mono text-[11px] text-muted truncate">
          {ok(1) ? 'acme-equipment.com › forklift-parts › ontario' : 'acme-equipment.com/index.php?page=12&ref=nav'}
        </p>
        <p className={`mt-1 text-lg leading-snug tracking-[-0.015em] transition-colors ${ok(0) ? 'text-ink' : 'text-muted'}`}>
          {ok(0) ? 'Forklift Parts in Ontario, CA: In Stock, Same-Day Pickup' : 'Home | Acme'}
        </p>
        <p className="mt-1 text-sm text-muted leading-relaxed">
          {ok(2)
            ? 'Mast, brake and hydraulic parts for Toyota, Hyster and Crown forklifts. Check stock online, pick up today in Ontario.'
            : 'Welcome to our website. We are a family business committed to quality and service since…'}
        </p>
        {ok(4) && (
          <ul className="mt-3 border-t border-line text-[13px] animate-[fadeInUp_0.4s_ease-out_both]">
            {['Do you ship forklift parts?', 'Which brands do you carry?'].map((q) => (
              <li key={q} className="py-2 border-b border-line last:border-b-0 text-muted">
                {q}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 border-t border-line pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className={LABEL}>Technical checks</span>
          <button
            onClick={() => setStep(done ? -1 : 0)}
            disabled={running}
            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 disabled:cursor-not-allowed ${
              running ? 'bg-accent text-canvas' : 'bg-ink text-canvas hover:bg-accent'
            } ${step < 0 ? 'ring-4 ring-accent/25' : ''}`}
          >
            {running ? 'Fixing…' : done ? 'Reset' : 'Fix the page'}
          </button>
        </div>
        <ul aria-live="polite" className="flex flex-col">
          {CHECKS.map((c, i) => (
            <li key={c} ref={(el) => (rowRefs.current[i] = el)} className="flex items-center gap-3 py-2 border-b border-line text-[13px]">
              <span
                className={`grid place-items-center w-5 h-5 rounded-full border shrink-0 transition-colors duration-300 ${
                  ok(i) ? 'bg-accent border-accent text-canvas' : i === step ? 'border-accent' : 'border-line'
                }`}
              >
                {ok(i) && <Check className="w-3 h-3" strokeWidth={3} />}
              </span>
              <span className={ok(i) ? 'text-ink' : 'text-muted'}>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <Link href="/seo/technical-seo-audit/" className="group inline-flex items-center gap-1.5 text-sm font-medium">
          <span className="link-draw">What a technical SEO audit covers</span>
          <ArrowUpRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <span className={LABEL}>Illustrative page</span>
      </div>
    </figure>
  );
}
