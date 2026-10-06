import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// The site-wide CTA hierarchy: primary = paid audit, secondary = fit call.
// Pills with an arrow that nudges up-right on hover.
export function PrimaryCta({ href = '/netsuite-audit/', children = 'Book a NetSuite audit', className = '' }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 pl-6 pr-5 py-3.5 rounded-full bg-ink !text-canvas font-medium tracking-tight hover:bg-accent transition-colors duration-300 ${className}`}
    >
      {children}
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SecondaryCta({ href = '/call/', children = 'Book a 20-min fit call', className = '' }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-line text-ink font-medium tracking-tight hover:border-ink transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}

export function CtaPair({ className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <PrimaryCta />
      <SecondaryCta />
    </div>
  );
}

// Small mono label above headings. `tone` is kept for old call sites; every
// tone now uses the accent dot.
// eslint-disable-next-line no-unused-vars
export function Eyebrow({ children, tone }) {
  return (
    <div className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </div>
  );
}

// Numbered section heading: "(01) — Services" on a hairline, then the title.
/** @param {{ index: string, label: string, title?: import('react').ReactNode, children?: import('react').ReactNode, className?: string }} props */
export function SectionHead({ index, label, title, children, className = "" }) {
  return (
    <header className={`border-t border-line pt-6 mb-14 md:mb-20 ${className}`} data-reveal>
      <div className="flex items-baseline justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-10 md:mb-14">
        <span>({index})</span>
        <span>{label}</span>
      </div>
      {title && (
        <h2 className="max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">{title}</h2>
      )}
      {children && <div className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">{children}</div>}
    </header>
  );
}

// Inline text link with the arrow and a drawn underline.
export function ArrowLink({ href, children, className = '' }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1.5 font-medium text-ink ${className}`}>
      <span className="link-draw">{children}</span>
      <ArrowUpRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

// Serif italic accent for a word or two inside a headline.
export function Accent({ children }) {
  return <em className="font-serif italic font-normal tracking-[-0.01em]">{children}</em>;
}
