'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { ACTIVE, CARD, LABEL, pulse } from './demoUi';
import { OFFERS } from '../../lib/site';

// Hero demo for the AI-built app audit: run the audit on an example app, watch
// the five areas get checked, then fix what it found. The areas are the ones
// /ai-app-audit/ covers; the app and its findings are illustrative.

const AREAS = ['Who can see what', 'Secrets and keys', 'Payments', 'Data and APIs', 'Running it for real'];
const CHECK_MS = 550;

const FINDINGS = [
  { id: 'rls', area: 0, level: 'High', text: 'Row-level security is off on the orders table, so any signed-in user can read every order.' },
  { id: 'key', area: 1, level: 'High', text: 'A Stripe secret key is in the browser bundle.' },
  { id: 'hook', area: 2, level: 'Medium', text: 'The payment webhook doesn’t check Stripe’s signature.' },
  { id: 'backup', area: 4, level: 'Low', text: 'No database backups are scheduled.' },
];

export default function AuditDemo() {
  const [checked, setChecked] = useState(-1); // areas checked so far; -1 = not started
  const [fixed, setFixed] = useState({});
  const appRef = useRef(null);
  const rowRefs = useRef({});

  const running = checked >= 0 && checked < AREAS.length;
  const done = checked >= AREAS.length;
  const found = FINDINGS.filter((f) => f.area < checked);
  const open = found.filter((f) => !fixed[f.id]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      setChecked((c) => c + 1);
      if (FINDINGS.some((f) => f.area === checked)) pulse(appRef.current);
    }, CHECK_MS);
    return () => clearTimeout(t);
  }, [checked, running]);

  function fix(f) {
    setFixed((x) => ({ ...x, [f.id]: true }));
    pulse(rowRefs.current[f.id]);
  }

  return (
    <figure className="relative w-full" aria-label="Interactive illustration: audit an app built with AI and fix what the audit finds">
      <div ref={appRef} className={`${CARD} ${running ? ACTIVE : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className={LABEL}>App built with AI</span>
          <span className="font-mono text-[10px] text-faint">orders.example.app</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-lg font-medium tracking-[-0.02em] leading-tight">Wholesale ordering app</p>
            <p className="mt-1 text-sm text-muted">Supabase · Stripe · about to launch</p>
          </div>
          <button
            onClick={() => {
              setFixed({});
              setChecked(0);
            }}
            disabled={running}
            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 disabled:cursor-not-allowed ${
              running ? 'bg-accent text-canvas' : 'bg-ink text-canvas hover:bg-accent'
            } ${checked < 0 ? 'ring-4 ring-accent/25' : ''}`}
          >
            {running ? 'Checking…' : done ? 'Run again' : 'Run the audit'}
          </button>
        </div>

        <ol className="mt-5 grid grid-cols-5 gap-1.5" aria-label="Areas checked">
          {AREAS.map((a, i) => (
            <li key={a} title={a} className="flex flex-col gap-1.5">
              <span className={`h-1 rounded-full transition-colors duration-300 ${i < checked ? 'bg-ink' : i === checked ? 'bg-accent' : 'bg-line'}`} />
              <span className={`text-[10px] leading-tight ${i <= checked ? 'text-ink' : 'text-faint'}`}>{a}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 border-t border-line pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className={LABEL}>Findings</span>
          <span className={LABEL}>{checked < 0 ? 'Not run yet' : done && open.length === 0 ? 'All fixed' : `${open.length} open`}</span>
        </div>
        <ul aria-live="polite" className="min-h-[13rem] flex flex-col gap-2">
          {checked < 0 && <li className="text-sm text-faint">Run the audit to see what an app built with AI tools often ships with.</li>}
          {found.map((f) => (
            <li
              key={f.id}
              ref={(el) => (rowRefs.current[f.id] = el)}
              className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 text-[13px] leading-snug animate-[fadeInUp_0.4s_ease-out_both] transition-colors ${
                fixed[f.id] ? 'border-line bg-canvas-2/60' : 'border-line bg-canvas'
              }`}
            >
              <span
                className={`shrink-0 mt-0.5 w-16 font-mono text-[10px] uppercase tracking-[0.14em] ${
                  fixed[f.id] ? 'text-faint' : f.level === 'High' ? 'text-accent' : 'text-ink'
                }`}
              >
                {fixed[f.id] ? 'Fixed' : f.level}
              </span>
              <span className={`flex-1 ${fixed[f.id] ? 'text-faint line-through' : ''}`}>{f.text}</span>
              {fixed[f.id] ? (
                <span className="grid place-items-center w-5 h-5 rounded-full bg-accent text-canvas shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
              ) : (
                <button onClick={() => fix(f)} className="shrink-0 rounded-full border border-line px-2.5 py-0.5 text-[12px] hover:border-ink">
                  Fix
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <Link href="/ai-app-audit/" className="group inline-flex items-center gap-1.5 text-sm font-medium">
          <span className="link-draw">The {OFFERS.appAudit.durationDays}-day app audit</span>
          <ArrowUpRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <span className={LABEL}>Illustrative app</span>
      </div>
    </figure>
  );
}
