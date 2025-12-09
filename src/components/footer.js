"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Linkedin, Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import BackToTopButton from '../components/BackToTopButton';

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalShown = sessionStorage.getItem("modalShown");
    if (!modalShown) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem('modalShown', 'true');
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);
  const pathname = usePathname()

  console.log(pathname);
  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      

      {pathname !== '/contact/' && (
        <section className="in-touch" data-scroll-section>
        <div className="bg-text">
          <span>nitya</span>
          <span>nitya</span>
          <span>nitya</span>
          <span>nitya</span>
          <span>nitya</span>
        </div>

        <div className="container">
          <div className="Footer_content__8dWV_">
            <h2 className="h2">
              <b>Reach Out</b>
            </h2>
            <p>
              Im always on the lookout for <span>great clients</span> who are{" "}
              <span>passionate</span>
              about their <span>business and customers</span>. Get in touch
            </p>
            <Link href="/contact" className="btn_link btn_link--light">
              Reach Out
              <span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </Link>
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
      className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 text-neutral-400 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300"
    >
      <Icon size={20} />
    </Link>
  );
}