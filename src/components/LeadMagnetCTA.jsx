'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck } from 'lucide-react';
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
    <aside className={`relative p-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 ${className}`}>
      <div className="flex items-start gap-4 mb-6">
        <ClipboardCheck className="w-8 h-8 text-blue-400 shrink-0" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">The NetSuite Integration Readiness Checklist</h2>
          <p className="text-neutral-400">
            The checks worth running before you connect anything to NetSuite: data ownership, sync design, failure
            handling, and security.{' '}
            <Link href="/netsuite/integration-readiness-checklist/" className="text-blue-400 underline">
              Read it now
            </Link>
            , or get a copy by email.
          </p>
        </div>
      </div>
      {state === 'sent' ? (
        <p className="text-emerald-400 font-medium" role="status">
          Sent. Check your inbox for the checklist.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <Honeypot value={honeypot} onChange={setHoneypot} />
          <label className="sr-only" htmlFor="magnet-name">First name</label>
          <input
            id="magnet-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name"
            className="sm:w-40 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
          />
          <label className="sr-only" htmlFor="magnet-email">Work email</label>
          <input
            id="magnet-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 disabled:opacity-60 transition-colors"
          >
            {state === 'sending' ? 'Sending…' : 'Email me a copy'}
          </button>
        </form>
      )}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </aside>
  );
}
