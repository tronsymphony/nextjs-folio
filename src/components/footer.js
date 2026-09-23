"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Linkedin, Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import BackToTopButton from '../components/BackToTopButton';

// Pages that already end in a booking or contact form don't need the CTA band.
const HIDE_CTA_ON = ['/contact/', '/call/', '/netsuite-audit/'];

export default function Footer() {
  const pathname = usePathname();

  return (
    <>


      {!HIDE_CTA_ON.includes(pathname) && (
        <section className="relative py-16 bg-[#0a0a0a] overflow-hidden border-t border-white/5" data-scroll-section>
          <div className="absolute inset-0 flex items-center justify-around opacity-[0.02] pointer-events-none select-none">
            <span className="text-[20vw] font-black uppercase tracking-tighter">nitya</span>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                Is NetSuite <span className="text-blue-500">holding you back?</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Start with a fixed-price integration audit: a written plan showing what&rsquo;s broken, what will break next, and what to fix first.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/netsuite-audit/"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-white !text-black font-black text-lg rounded-lg hover:bg-neutral-200 transition-all hover:scale-105"
                >
                  Book a NetSuite Audit
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/call/"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-700 text-white font-bold text-lg rounded-lg hover:bg-white/5 transition-colors"
                >
                  20-min fit call
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}


      <footer className="bg-[#050505] border-t border-neutral-900 pt-16 pb-8" data-scroll-section>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Find Me On</h2>

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <SocialLink href="https://www.linkedin.com/in/nityananda-h-b5a65080/" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://github.com/tronsymphony" icon={Github} label="Github" />
              <SocialLink href="https://www.instagram.com/la_rider21/" icon={Instagram} label="Instagram" />
              <SocialLink href="mailto:nityahoyos@gmail.com?subject=Inquiry from Website" icon={Mail} label="Email" />
            </div>

            <address className="mt-8 text-neutral-500 not-italic">
              Los Angeles, California 90066
            </address>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <div>
              © {new Date().getFullYear()} Nitya Hoyos. All Rights Reserved.
            </div>
            <nav className="flex gap-6">
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </nav>
          </div>

        </div>

        {/* Back To Top Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <BackToTopButton />
        </div>
      </footer>

    </>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-900 text-neutral-400 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300"
    >
      <Icon size={20} />
    </Link>
  );
}