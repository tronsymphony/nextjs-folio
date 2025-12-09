'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  // FIX 1: Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav>
      {/* ------------------- DESKTOP MENU ------------------- */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <Link href="/services" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Services
          </Link>
        </li>
        <li>
          <Link href="/portfolio" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Portfolio
          </Link>
        </li>

        {/* Dropdown Group */}
        <li className="group relative py-4"> 
          <Link href="/about" className="flex items-center gap-1 text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
            About
            <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
          </Link>

          <div className="absolute top-full -left-4 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-2 min-w-[160px] shadow-2xl">
              <DropdownLink href="/about/los-angeles">Los Angeles</DropdownLink>
              <DropdownLink href="/about/portland">Portland</DropdownLink>
              <DropdownLink href="/about/irvine">Irvine</DropdownLink>
            </div>
          </div>
        </li>

        <li>
          <Link href="/contact" className="px-5 py-2.5 bg-white !text-black text-sm font-bold rounded-full hover:bg-neutral-200 transition-colors">
            Start Project
          </Link>
        </li>
      </ul>

      {/* ------------------- MOBILE CONTROLS ------------------- */}
      
      {/* FIX 2: High Z-Index (z-[60]) ensures button is ALWAYS on top of the overlay */}
      <button 
        className="md:hidden relative z-[60] text-white p-2 focus:outline-none"
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* ------------------- MOBILE OVERLAY ------------------- */}
      {/* FIX 3: h-[100dvh] handles mobile browser address bars better */}
      <div 
        className={`fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center px-8 transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'
        }`}
        style={{ height: '100dvh' }}
      >
        <ul className="space-y-6">
          <MobileLink href="/services" onClick={toggleMobileMenu}>Services</MobileLink>
          <MobileLink href="/portfolio" onClick={toggleMobileMenu}>Portfolio</MobileLink>
          
          {/* Mobile Accordion */}
          <li>
            <button 
              onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
              className="flex items-center justify-between w-full text-2xl font-bold text-white focus:outline-none"
            >
              About
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col gap-4 pl-4 border-l-2 border-neutral-800 ml-1">
                <Link href="/about/los-angeles" onClick={toggleMobileMenu} className="text-lg text-neutral-400 hover:text-white">Los Angeles</Link>
                <Link href="/about/portland" onClick={toggleMobileMenu} className="text-lg text-neutral-400 hover:text-white">Portland</Link>
                <Link href="/about/irvine" onClick={toggleMobileMenu} className="text-lg text-neutral-400 hover:text-white">Irvine</Link>
              </div>
            </div>
          </li>

          <MobileLink href="/contact" onClick={toggleMobileMenu}>Contact</MobileLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

// Helper Components
const DropdownLink = ({ href, children }) => (
  <Link 
    href={href} 
    className="block px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

const MobileLink = ({ href, onClick, children }) => (
  <li>
    <Link 
      href={href} 
      onClick={onClick} 
      className="text-3xl font-bold text-white block hover:text-blue-400 transition-colors"
    >
      {children}
    </Link>
  </li>
);