'use client';

import { useEffect, useState } from 'react';

// Hero illustration: an order placed on a storefront becomes a NetSuite sales
// order, stock drops, and the customer portal shows it shipped. Loops through
// four steps. The data is illustrative and labelled as such. With reduced
// motion it shows the finished state and stays still.

const STEPS = 4; // 0 order placed, 1 travelling to NetSuite, 2 in NetSuite, 3 shipped (portal + storefront updated)
const STEP_MS = 1900;

const CARD =
  'relative rounded-2xl bg-canvas border border-line p-5 shadow-[0_1px_0_rgba(20,20,19,0.04),0_24px_48px_-28px_rgba(20,20,19,0.28)] transition-[border-color,box-shadow] duration-500';
const ACTIVE = 'border-accent/60 shadow-[0_1px_0_rgba(20,20,19,0.04),0_24px_48px_-24px_rgba(232,80,26,0.35)]';
const LABEL = 'font-mono text-[10px] uppercase tracking-[0.18em] text-faint';

function Connector({ active, direction = 'down' }) {
  return (
    <div className="relative h-9 w-px mx-auto bg-line" aria-hidden="true">
      {active && (
        <span
          className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(232,80,26,0.15)] animate-[travel_0.9s_cubic-bezier(0.4,0,0.2,1)_both] ${
            direction === 'up' ? '[animation-direction:reverse]' : ''
          }`}
        />
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
  // One counter drives everything: which step, and which pass through the loop.
  const [tick, setTick] = useState(STEPS - 1);
  const step = tick % STEPS;
  const cycle = Math.floor(tick / STEPS);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTick(0);
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const order = `SO-${10482 + cycle}`;
  const stockBefore = 12 - (cycle % 9);
  const inNetSuite = step >= 2;
  const shipped = step === 3;
  const stock = inNetSuite ? stockBefore - 1 : stockBefore;

  return (
    <figure className="relative w-full max-w-[460px] mx-auto lg:mr-0" aria-label="Illustration: an order flowing from a storefront into NetSuite and out to a customer portal">
      <div aria-hidden="true">
        {/* Storefront */}
        <div className={`${CARD} w-[88%] ${step === 0 ? ACTIVE : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={LABEL}>Storefront</span>
            <span className="font-mono text-[10px] text-faint">shop.example.com</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-lg font-medium tracking-[-0.02em] leading-tight">Electric pallet jack</p>
              <p className="mt-1 text-sm text-muted">
                <Value flash={shipped}>{shipped ? stock : stockBefore}</Value> in stock
              </p>
            </div>
            <span
              className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-500 ${
                step === 0 ? 'bg-accent text-canvas' : 'bg-ink text-canvas'
              }`}
            >
              {step === 0 ? 'Ordering…' : 'Order'}
            </span>
          </div>
        </div>

        <div className="w-[88%]">
          <Connector active={step === 1} />
        </div>

        {/* NetSuite */}
        <div className={`${CARD} w-[88%] ml-auto ${step === 2 ? ACTIVE : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={LABEL}>Oracle NetSuite</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
              <span className={`w-1.5 h-1.5 rounded-full ${inNetSuite ? 'bg-accent' : 'bg-faint/50'}`} /> {inNetSuite ? 'synced' : 'waiting'}
            </span>
          </div>
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-[11px] text-faint mb-1">Sales order</dt>
              <dd className="font-mono text-[13px]">
                <Value flash={step === 2}>{inNetSuite ? order : '—'}</Value>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-faint mb-1">Available</dt>
              <dd className="text-[15px] font-medium">
                <Value flash={step === 2}>{stock}</Value>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-faint mb-1">Status</dt>
              <dd className="text-[13px]">{shipped ? 'Fulfilled' : inNetSuite ? 'Pending' : '—'}</dd>
            </div>
          </dl>
        </div>

        <div className="w-[88%] ml-auto">
          <Connector active={step === 3} />
        </div>

        {/* Customer portal */}
        <div className={`${CARD} w-[88%] ${shipped ? ACTIVE : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={LABEL}>Customer portal</span>
            <span className="font-mono text-[10px] text-faint">My orders</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[13px]">{shipped ? order : `SO-${10481 + cycle}`}</p>
              <p className="mt-1 text-sm text-muted">{shipped ? 'Shipped · tracking added' : 'Delivered'}</p>
            </div>
            <span
              className={`shrink-0 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] border transition-colors duration-500 ${
                shipped ? 'border-accent text-accent' : 'border-line text-faint'
              }`}
            >
              {shipped ? 'Shipped' : 'Closed'}
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint text-right">
        Illustration · one order, three systems, no retyping
      </figcaption>
    </figure>
  );
}
