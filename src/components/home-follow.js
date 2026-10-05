'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import Navigation from "./Navigation";

// Site header: transparent over the top of the page, a blurred ink bar once
// the page scrolls.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
        scrolled ? 'bg-ink/75 backdrop-blur-xl border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 h-[72px] flex items-center justify-between">
        <Link href="/" className="relative z-[60] flex items-center gap-2 text-[17px] font-semibold tracking-[-0.03em]" aria-label="Casa Dev home">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          Casa Dev
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
