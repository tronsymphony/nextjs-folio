// The Casa Dev logo. A wordmark set like the site's headlines (sans "Casa",
// serif italic "Dev") followed by a text cursor in the accent colour, which
// blinks once when the logo's link is hovered (.logo-cursor in globals.css).
// `LogoMark` is the compact version for icons: a "c" and the cursor.

export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M17.5 10.64A7 7 0 1 0 17.5 21.36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect className="logo-cursor fill-accent" x="21.4" y="8.5" width="2.8" height="15" rx="0.6" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline text-[21px] leading-none tracking-[-0.035em] ${className}`}>
      <span className="font-semibold">Casa</span>
      <span className="ml-[0.28em] font-serif italic font-normal text-[23px] tracking-[-0.01em]">Dev</span>
      <span
        className="logo-cursor ml-[0.12em] inline-block w-[0.11em] h-[0.82em] translate-y-[0.1em] rounded-[1px] bg-accent"
        aria-hidden="true"
      />
    </span>
  );
}
