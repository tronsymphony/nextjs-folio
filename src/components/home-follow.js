'use client'
import Link from "next/link";
import Image from 'next/image';
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="relative z-50">
          <Link href="/" className="block">
            <Image
              src="/images/logo2.webp"
              alt="Casa Dev"
              width={100}
              height={50}
              priority
              className="w-auto h-8 md:h-10 object-contain" // Responsive logo sizing
            />
          </Link>
        </div>

        {/* Navigation */}
        <Navigation />
        
      </div>
    </header>
  );
}