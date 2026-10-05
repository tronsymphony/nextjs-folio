'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

const NETSUITE_LINKS = [
  ['/netsuite/', 'NetSuite overview'],
  ['/netsuite/material-handling/', 'Material handling & logistics'],
  ['/netsuite-audit/', 'Integration audit'],
  ['/tools/netsuite-integration-estimator/', 'Integration cost estimator'],
  ['/services/', 'All capabilities'],
];

const LINKS = [
  ['/netsuite/', 'NetSuite', NETSUITE_LINKS],
  ['/ai-app-audit/', 'App audit'],
  ['/seo/', 'SEO'],
  ['/work/', 'Work'],
  ['/pricing/', 'Pricing'],
  ['/about/', 'About'],
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => pathname?.startsWith(href);

  return (
    <nav aria-label="Main">
      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-1">
        {LINKS.map(([href, label, sub], i) => (
          <li key={href} className="group relative">
            <Link
              href={href}
              className={`flex items-baseline gap-1.5 px-3 py-2 text-[14px] tracking-tight transition-colors ${
                isActive(href) ? 'text-paper' : 'text-muted hover:text-paper'
              }`}
            >
              <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
              {label}
            </Link>
            {sub && (
              <div className="absolute top-full left-0 pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300">
                <div className="min-w-[260px] rounded-2xl border border-line bg-ink-2/95 backdrop-blur-xl p-2">
                  {sub.map(([subHref, subLabel]) => (
                    <Link
                      key={subHref}
                      href={subHref}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] text-muted hover:text-paper hover:bg-white/5 transition-colors"
                    >
                      {subLabel}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
        <li className="ml-3">
          <Link
            href="/call/"
            className="group inline-flex items-center gap-1.5 pl-4 pr-3.5 py-2 rounded-full bg-paper !text-ink text-[14px] font-medium tracking-tight hover:bg-accent transition-colors duration-300"
          >
            Book a call
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </li>
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden relative z-[60] flex items-center gap-2 px-4 py-2 rounded-full border border-line text-[13px] font-medium"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-50 bg-ink flex flex-col justify-between px-4 sm:px-8 pt-28 pb-10 transition-[opacity,visibility] duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ height: '100dvh' }}
      >
        <ul className="border-t border-line">
          {LINKS.map(([href, label], i) => (
            <li key={href} className="border-b border-line">
              <Link href={href} className="flex items-baseline gap-4 py-4 text-4xl font-medium tracking-[-0.04em]">
                <span className="font-mono text-xs text-faint">0{i + 1}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <Link href="/call/" className="flex items-center justify-between rounded-full bg-paper !text-ink px-6 py-4 font-medium">
            Book a 20-min call <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link href="/contact/" className="flex items-center justify-between rounded-full border border-line px-6 py-4 font-medium">
            Contact <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
