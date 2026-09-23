'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Honeypot from './Honeypot';
import PrintButton from './PrintButton';
import { DEFAULT_ANSWERS, RECORDS, SYSTEMS, estimate } from '../lib/estimator/netsuite';
import { submitLead } from '../lib/submitLead';

const usd = (n) => `$${n.toLocaleString('en-US')}`;

function Choice({ name, options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([id, label]) => (
        <label
          key={id}
          className={`cursor-pointer px-4 py-2 rounded-lg border text-sm transition-colors ${
            value === id ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
          }`}
        >
          <input type="radio" name={name} value={id} checked={value === id} onChange={() => onChange(id)} className="sr-only" />
          {label}
        </label>
      ))}
    </div>
  );
}

function Checks({ options, values, onToggle }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {options.map(({ id, label }) => (
        <label
          key={id}
          className={`cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-colors ${
            values.includes(id) ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
          }`}
        >
          <input type="checkbox" checked={values.includes(id)} onChange={() => onToggle(id)} className="accent-blue-500" />
          {label}
        </label>
      ))}
    </div>
  );
}

function Question({ title, hint, children }) {
  return (
    <fieldset className="mb-8">
      <legend className="font-semibold text-white mb-1">{title}</legend>
      {hint && <p className="text-sm text-neutral-500 mb-3">{hint}</p>}
      {!hint && <div className="mb-3" />}
      {children}
    </fieldset>
  );
}

export default function EstimatorTool() {
  const [answers, setAnswers] = useState(DEFAULT_ANSWERS);
  const result = useMemo(() => estimate(answers), [answers]);

  const set = (key) => (value) => setAnswers((a) => ({ ...a, [key]: value }));
  const toggle = (key) => (id) =>
    setAnswers((a) => ({ ...a, [key]: a[key].includes(id) ? a[key].filter((x) => x !== id) : [...a[key], id] }));

  return (
    <div className="grid lg:grid-cols-5 gap-10 items-start">
      <form className="lg:col-span-3 print:hidden" onSubmit={(e) => e.preventDefault()}>
        <Question title="Which systems need to connect to NetSuite?">
          <Checks options={SYSTEMS} values={answers.systems} onToggle={toggle('systems')} />
        </Question>
        <Question title="Which records move between them?">
          <Checks options={RECORDS} values={answers.records} onToggle={toggle('records')} />
        </Question>
        <Question title="Sync direction" hint="Two-way means both systems can change the same records.">
          <Choice name="direction" value={answers.direction} onChange={set('direction')} options={[['one-way', 'Mostly one-way'], ['two-way', 'Two-way']]} />
        </Question>
        <Question title="How fresh must the data be?">
          <Choice name="freshness" value={answers.freshness} onChange={set('freshness')} options={[['daily', 'Daily is fine'], ['hourly', 'Within the hour'], ['realtime', 'Near real-time']]} />
        </Question>
        <Question title="Order volume">
          <Choice name="volume" value={answers.volume} onChange={set('volume')} options={[['low', 'Under 100/day'], ['medium', '100–1,000/day'], ['high', 'Over 1,000/day']]} />
        </Question>
        <Question title="Preferred approach">
          <Choice
            name="approach"
            value={answers.approach}
            onChange={set('approach')}
            options={[['connector', 'Native connector'], ['middleware', 'Middleware (Celigo, Boomi)'], ['custom', 'Custom code'], ['unsure', 'Not sure']]}
          />
        </Question>
        <Question title="Existing NetSuite customization" hint="Custom records, SuiteScripts, and workflows already in the account.">
          <Choice name="customizations" value={answers.customizations} onChange={set('customizations')} options={[['none', 'Little or none'], ['some', 'Some'], ['heavy', 'A lot']]} />
        </Question>
        <Question title="Do you also need a customer portal or storefront on NetSuite data?">
          <Choice name="frontEnd" value={answers.frontEnd ? 'yes' : 'no'} onChange={(v) => set('frontEnd')(v === 'yes')} options={[['no', 'No'], ['yes', 'Yes']]} />
        </Question>
      </form>

      <div id="scope-outline" className="lg:col-span-2 lg:sticky lg:top-28 scroll-mt-24">
        <ScopeBrief result={result} answers={answers} />
      </div>

      {/* On small screens the outline sits below the questions; keep the range in view. */}
      {!result.empty && (
        <a
          href="#scope-outline"
          className="lg:hidden print:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-4 px-4 py-3 bg-neutral-950/95 backdrop-blur border-t border-neutral-800"
        >
          <span className="font-bold text-white">
            {usd(result.cost[0])} – {usd(result.cost[1])}
          </span>
          <span className="text-sm text-emerald-400">See full outline ↓</span>
        </a>
      )}
    </div>
  );
}

function ScopeBrief({ result, answers }) {
  if (result.empty) {
    return (
      <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 text-neutral-400">
        Choose at least one system, or a customer portal, to see a scope outline.
      </div>
    );
  }
  return (
    <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 print:border-black print:bg-white print:text-black">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Your scope outline</p>
      <p className="text-3xl font-extrabold text-white print:text-black">
        {usd(result.cost[0])} – {usd(result.cost[1])}
      </p>
      <p className="text-sm text-neutral-400 mt-1 mb-6">
        About {result.hours[0]}–{result.hours[1]} hours · {result.weeks[0]}–{result.weeks[1]} weeks
      </p>

      <h3 className="font-semibold text-white print:text-black mb-2">Phases</h3>
      <ul className="text-sm text-neutral-300 print:text-black space-y-1 mb-6">
        {result.phases.map((p) => (
          <li key={p.name} className="flex justify-between gap-4">
            <span>{p.name}</span>
            <span className="text-neutral-500 whitespace-nowrap">
              {p.hours[0]}–{p.hours[1]}h
            </span>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold text-white print:text-black mb-2">Integration surface</h3>
      <ul className="text-sm text-neutral-300 print:text-black space-y-1 mb-6">
        {result.surface.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      {result.risks.length > 0 && (
        <>
          <h3 className="font-semibold text-white print:text-black mb-2">Risks to plan for</h3>
          <ul className="text-sm text-neutral-300 print:text-black space-y-2 mb-6">
            {result.risks.map((r) => (
              <li key={r} className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> {r}
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="text-sm text-neutral-400 print:text-black border-t border-neutral-800 pt-4 mb-6">{result.recommendation}</p>

      <div className="flex flex-col gap-3 print:hidden">
        <Link
          href="/netsuite-audit/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white !text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors"
        >
          Turn this into a fixed price <ArrowRight className="w-4 h-4" />
        </Link>
        <PrintButton label="Print or save this outline" />
        <EmailBrief result={result} answers={answers} />
      </div>
      <p className="text-xs text-neutral-500 mt-6">
        A planning range, not a quote. It assumes typical NetSuite integration effort at senior-engineer rates; your
        actual scope depends on details only an audit can see.
      </p>
    </div>
  );
}

function EmailBrief({ result, answers }) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [renderedAt, setRenderedAt] = useState(0);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => setRenderedAt(Date.now()), []);

  const send = async (e) => {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      await submitLead({
        source: 'estimator',
        renderedAt,
        honeypot,
        email,
        payload: {
          Range: `${usd(result.cost[0])} – ${usd(result.cost[1])}`,
          Hours: `${result.hours[0]}–${result.hours[1]}`,
          Systems: answers.systems,
          Records: answers.records,
          Direction: answers.direction,
          Freshness: answers.freshness,
          Volume: answers.volume,
          Approach: answers.approach,
          Customizations: answers.customizations,
          'Needs front end': answers.frontEnd ? 'Yes' : 'No',
        },
      });
      setState('sent');
    } catch (err) {
      setError(err.message);
      setState('idle');
    }
  };

  if (state === 'sent') {
    return <p className="text-sm text-emerald-400" role="status">Sent. I&rsquo;ll follow up personally with a few thoughts on your setup.</p>;
  }
  return (
    <form onSubmit={send} className="relative flex gap-2">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <label htmlFor="estimator-email" className="sr-only">Email</label>
      <input
        id="estimator-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email me a review of this"
        className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-white"
      />
      <button type="submit" disabled={state === 'sending'} className="px-4 py-2.5 text-sm font-semibold border border-neutral-700 rounded-lg hover:bg-white/5 disabled:opacity-60">
        {state === 'sending' ? '…' : 'Send'}
      </button>
      {error && <p className="absolute top-full mt-1 text-xs text-red-400">{error}</p>}
    </form>
  );
}
