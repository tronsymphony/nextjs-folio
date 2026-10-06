'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { ACTIVE, CARD, LABEL, pulse, reducedMotion } from './demoUi';

// Hero illustration the visitor can drive: pick where an order comes from
// (storefront, EDI trading partner, sales rep), place it, and watch it become
// a NetSuite sales order, take stock from the one shared inventory, and go
// back out to the system it came from. Plays one order by itself on load,
// then waits for the visitor. The data is illustrative and labelled as such.
// Each landing sends a `casa:sync` window event so the background grid
// (HeroGrid) ripples from that card.

const START_STOCK = 12;
const SEND_MS = 900; // order travelling to NetSuite
const RECORD_MS = 1300; // in NetSuite, before going back out

const CHANNELS = {
  store: {
    tab: 'Storefront',
    label: 'Shopify storefront',
    host: 'shop.example.com',
    title: 'Electric pallet jack',
    action: 'Order',
    source: 'Web order',
    out: { label: 'Customer portal', host: 'My orders', line: 'Shipped · tracking added', tag: 'Shipped' },
    guide: { href: '/netsuite/netsuite-shopify-integration/', text: 'How NetSuite and Shopify stay in sync' },
  },
  edi: {
    tab: 'EDI partner',
    label: 'EDI 850 purchase order',
    host: 'Retail partner',
    title: 'PO 4471 · pallet jacks',
    action: 'Send PO',
    source: 'EDI 850',
    out: { label: 'Trading partner', host: 'EDI out', line: '855 acknowledged · 856 ASN sent', tag: 'ASN sent' },
    guide: { href: '/edi/edi-850/', text: 'What an EDI 850 is' },
  },
  rep: {
    tab: 'Sales rep',
    label: 'Salesforce quote',
    host: 'Opportunity',
    title: 'Quote Q-2210 · pallet jacks',
    action: 'Accept quote',
    source: 'Salesforce',
    out: { label: 'Salesforce', host: 'Opportunity', line: 'Closed won · order number synced', tag: 'Won' },
    guide: { href: '/netsuite/netsuite-salesforce-integration/', text: 'NetSuite and Salesforce integration' },
  },
};

function Connector({ active }) {
  return (
    <div className="relative h-9 w-px mx-auto bg-line" aria-hidden="true">
      {active && (
        <span className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(232,80,26,0.15)] animate-[travel_0.9s_cubic-bezier(0.4,0,0.2,1)_both]" />
      )}
    </div>
  );
}

function Value({ children, flash }) {
  return (
    <span className={`tabular-nums transition-colors duration-500 ${flash ? 'text-accent' : 'text-ink'}`}>{children}</span>
  );
}

export default function SyncDemo() {
  const [channel, setChannel] = useState('store');
  const [qty, setQty] = useState(1);
  const [stock, setStock] = useState(START_STOCK);
  const [nextId, setNextId] = useState(10482);
  const [phase, setPhase] = useState('idle'); // idle | sending | recorded | done
  const [order, setOrder] = useState(null); // { id, channel, qty, before, after }
  const [log, setLog] = useState([]);
  const [touched, setTouched] = useState(false);
  const netsuiteRef = useRef(null);
  const outRef = useRef(null);

  const busy = phase === 'sending' || phase === 'recorded';
  const c = CHANNELS[channel];
  const shown = order ? CHANNELS[order.channel] : c;

  function place(ch = channel, n = qty) {
    if (busy || stock < n) return;
    setOrder({ id: `SO-${nextId}`, channel: ch, qty: n, before: stock, after: stock - n });
    setNextId((i) => i + 1);
    setPhase('sending');
  }

  // Step the order through NetSuite and back out.
  useEffect(() => {
    if (phase === 'sending') {
      const t = setTimeout(() => {
        setStock(order.after);
        setLog((l) => [{ key: `${order.id}-in`, text: `${order.id} · ${CHANNELS[order.channel].source} · ${order.qty} unit${order.qty > 1 ? 's' : ''} · available ${order.before} → ${order.after}` }, ...l].slice(0, 4));
        setPhase('recorded');
        pulse(netsuiteRef.current);
      }, SEND_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'recorded') {
      const t = setTimeout(() => {
        const out = CHANNELS[order.channel].out;
        setLog((l) => [{ key: `${order.id}-out`, text: `${order.id} · ${out.label}: ${out.line}` }, ...l].slice(0, 4));
        setPhase('done');
        pulse(outRef.current);
      }, RECORD_MS);
      return () => clearTimeout(t);
    }
  }, [phase, order]);

  // Play one storefront order by itself, unless the visitor prefers less motion.
  useEffect(() => {
    if (reducedMotion()) return;
    const t = setTimeout(() => place('store', 1), 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const act = (fn) => (...args) => {
    setTouched(true);
    fn(...args);
  };

  const inNetSuite = order && phase !== 'sending';
  const shipped = order && phase === 'done';
  const out = shown.out;
  const soldOut = stock < qty;

  return (
    <figure className="relative w-full max-w-[480px] mx-auto lg:mr-0" aria-label="Interactive illustration: place an order and follow it into NetSuite and back out">
      {/* Where the order comes from */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div role="tablist" aria-label="Where the order comes from" className="inline-flex p-1 rounded-full border border-line bg-canvas-2/60">
          {Object.entries(CHANNELS).map(([id, ch]) => (
            <button
              key={id}
              role="tab"
              aria-selected={channel === id}
              disabled={busy}
              onClick={act(() => setChannel(id))}
              className={`px-3.5 py-1.5 rounded-full text-[13px] transition-colors disabled:cursor-not-allowed ${
                channel === id ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'
              }`}
            >
              {ch.tab}
            </button>
          ))}
        </div>
        {!touched && (
          <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            Try it
          </span>
        )}
      </div>

      {/* Source */}
      <div className={`${CARD} w-[88%] ${phase === 'sending' ? ACTIVE : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className={LABEL}>{c.label}</span>
          <span className="font-mono text-[10px] text-faint">{c.host}</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-lg font-medium tracking-[-0.02em] leading-tight">{c.title}</p>
            <p className="mt-1 text-sm text-muted">
              <Value flash={phase === 'recorded'}>{stock}</Value> available
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-full border border-line">
              <button aria-label="One fewer" disabled={busy || qty <= 1} onClick={act(() => setQty((q) => q - 1))} className="p-2 text-muted hover:text-ink disabled:opacity-30">
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-4 text-center text-sm tabular-nums" aria-label={`Quantity ${qty}`}>{qty}</span>
              <button aria-label="One more" disabled={busy || qty >= 3} onClick={act(() => setQty((q) => q + 1))} className="p-2 text-muted hover:text-ink disabled:opacity-30">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={act(() => place())}
              disabled={busy || soldOut}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 disabled:cursor-not-allowed ${
                phase === 'sending' ? 'bg-accent text-canvas' : soldOut ? 'bg-canvas-3 text-faint' : 'bg-ink text-canvas hover:bg-accent'
              } ${!touched && phase === 'done' ? 'ring-4 ring-accent/25' : ''}`}
            >
              {phase === 'sending' ? 'Sending…' : soldOut ? 'Out of stock' : c.action}
            </button>
          </div>
        </div>
      </div>

      <div className="w-[88%]">
        <Connector active={phase === 'sending'} />
      </div>

      {/* NetSuite */}
      <div ref={netsuiteRef} className={`${CARD} w-[88%] ml-auto ${phase === 'recorded' ? ACTIVE : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className={LABEL}>Oracle NetSuite</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
            <span className={`w-1.5 h-1.5 rounded-full ${inNetSuite ? 'bg-accent' : 'bg-faint/50'}`} /> {busy && !inNetSuite ? 'receiving' : 'synced'}
          </span>
        </div>
        <dl className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-[11px] text-faint mb-1">Sales order</dt>
            <dd className="font-mono text-[13px]">
              <Value flash={phase === 'recorded'}>{inNetSuite ? order.id : '—'}</Value>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] text-faint mb-1">Available</dt>
            <dd className="text-[15px] font-medium">
              <Value flash={phase === 'recorded'}>{stock}</Value>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] text-faint mb-1">Source</dt>
            <dd className="text-[13px]">{inNetSuite ? CHANNELS[order.channel].source : '—'}</dd>
          </div>
        </dl>
        {soldOut && !busy && (
          <button
            onClick={act(() => setStock((s) => s + START_STOCK))}
            className="mt-4 w-full rounded-full border border-dashed border-accent/60 py-2 text-[13px] text-accent hover:bg-accent hover:text-canvas transition-colors"
          >
            Receive a purchase order · +{START_STOCK} units
          </button>
        )}
      </div>

      <div className="w-[88%] ml-auto">
        <Connector active={phase === 'recorded'} />
      </div>

      {/* Back out to the system the order came from */}
      <div ref={outRef} className={`${CARD} w-[88%] ${shipped ? ACTIVE : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className={LABEL}>{out.label}</span>
          <span className="font-mono text-[10px] text-faint">{out.host}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[13px]">{order ? order.id : 'No orders yet'}</p>
            <p className="mt-1 text-sm text-muted">{shipped ? out.line : order ? 'Waiting on NetSuite…' : 'Place one above'}</p>
          </div>
          <span
            className={`shrink-0 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] border transition-colors duration-500 ${
              shipped ? 'border-accent text-accent' : 'border-line text-faint'
            }`}
          >
            {shipped ? out.tag : 'Open'}
          </span>
        </div>
      </div>

      {/* What happened, newest first */}
      <div className="mt-5 border-t border-line pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className={LABEL}>Event log</span>
          <span className={LABEL}>Illustrative data</span>
        </div>
        <ol aria-live="polite" className="min-h-[5.5rem] font-mono text-[11px] leading-relaxed text-muted">
          {log.length === 0 && <li className="text-faint">Nothing yet. Orders from every channel share one stock count.</li>}
          {log.map((entry, i) => (
            <li key={entry.key} className={i === 0 ? 'text-ink' : ''}>
              {entry.text}
            </li>
          ))}
        </ol>
        <Link href={c.guide.href} className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
          <span className="link-draw">{c.guide.text}</span>
          <ArrowUpRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </figure>
  );
}
