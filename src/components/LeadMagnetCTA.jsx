'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Honeypot from './Honeypot';
import { submitLead } from '../lib/submitLead';

// Soft-gated lead magnet: the checklist itself is public; this offers to email
// a copy (and adds the address to the list).
export default function LeadMagnetCTA({ className = '' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [renderedAt, setRenderedAt] = useState(0);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => setRenderedAt(Date.now()), []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      await submitLead({ source: 'magnet', renderedAt, honeypot, email, name });
      setState('sent');
    } catch (err) {
      setError(err.message);
      setState('idle');
    }
  };

  return (
    <aside className={`relative p-8 rounded-3xl border border-line bg-canvas-2 ${className}`}>
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">Free checklist</p>
        <div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.03em] leading-[1.1] text-ink mb-3">The NetSuite Integration Readiness Checklist</h2>
          <p className="text-muted leading-relaxed">
            The checks worth running before you connect anything to NetSuite: data ownership, sync design, failure
            handling, and security.{' '}
            <Link href="/netsuite/integration-readiness-checklist/" className="text-ink underline decoration-accent underline-offset-4">
              Read it now
            </Link>
            , or get a copy by email.
          </p>
        </div>
      </div>
      {state === 'sent' ? (
        <p className="text-accent font-medium" role="status">
          Sent. Check your inbox for the checklist.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col xl:flex-row gap-3">
          <Honeypot value={honeypot} onChange={setHoneypot} />
          <label className="sr-only" htmlFor="magnet-name">First name</label>
          <input
            id="magnet-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name"
            className="sm:w-36 px-5 py-3 bg-transparent border border-line rounded-full text-ink placeholder:text-faint focus:border-ink outline-none transition-colors"
          />
          <label className="sr-only" htmlFor="magnet-email">Work email</label>
          <input
            id="magnet-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className="flex-1 min-w-0 px-5 py-3 bg-transparent border border-line rounded-full text-ink placeholder:text-faint focus:border-ink outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="px-6 py-3 bg-ink text-canvas font-medium rounded-full hover:bg-accent disabled:opacity-60 transition-colors"
          >
            {state === 'sending' ? 'Sending…' : 'Email me a copy'}
          </button>
        </form>
      )}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </aside>
  );
}
