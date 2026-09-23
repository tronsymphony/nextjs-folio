import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// The site-wide CTA hierarchy: primary = paid audit, secondary = fit call.
export function PrimaryCta({ href = '/netsuite-audit/', children = 'Book a NetSuite audit', className = '' }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white !text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors ${className}`}
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}

export function SecondaryCta({ href = '/call/', children = 'Book a 20-min fit call', className = '' }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-neutral-700 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

export function CtaPair({ className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <PrimaryCta />
      <SecondaryCta />
    </div>
  );
}

export function Eyebrow({ children, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </div>
  );
}
