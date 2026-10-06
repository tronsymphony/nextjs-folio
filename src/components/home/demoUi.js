// Shared look and behaviour for the hero demos (SyncDemo, AuditDemo, SeoDemo).

export const CARD =
  'relative rounded-2xl bg-canvas border border-line p-5 shadow-[0_1px_0_rgba(20,20,19,0.04),0_24px_48px_-28px_rgba(20,20,19,0.28)] transition-[border-color,box-shadow] duration-500';
export const ACTIVE = 'border-accent/60 shadow-[0_1px_0_rgba(20,20,19,0.04),0_24px_48px_-24px_rgba(232,80,26,0.35)]';
export const LABEL = 'font-mono text-[10px] uppercase tracking-[0.18em] text-faint';

// Tell the hero background (HeroBlinds, HeroGrid) that something just landed
// on this element, so it can ripple from there.
export function pulse(el) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  window.dispatchEvent(new CustomEvent('casa:sync', { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
