'use client'
import Link from "next/link";
import { useState } from "react";

export default function HomeFollow() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <section className="Home_followme__eTWWW" data-scroll-section>
        <div className="Home_phone__DAGCv"></div>
        <div>
          <div className="Home_followlabel__I422i">Follow Me</div>
          <div className="Home_soc__jkbmt">
            {/* Social Links */}
            <Link
              target="_blank"
              aria-label="Linkedin"
              rel="noreferrer"
              href="https://www.linkedin.com/in/nityananda-h-b5a65080/"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <span className="page_title" data-scroll-section>
        <div className="logo">
          <Link href="/">
            Casa Dev.
            <div className="sub">Developer, Artist, Cyclist</div>
          </Link>
        </div>

        <nav className="links">
          {/* About Link with Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <Link href="/about">
              <span>About</span>
            </Link>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/about/los-angeles">
                  <span>Los Angles</span>
                </Link>
                <Link href="/about/portland">
                  <span>Portland</span>
                </Link>
                <Link href="/about/irvine">
                  <span>Irvine</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/portfolio">
            <span>Portfolio</span>
          </Link>
          <Link href="/services">
            <span>Services</span>
          </Link>
        
          <Link href="/blog">
            <span>Blog</span>
          </Link>
          <Link href="/contact">
            <span>Contact</span>
          </Link>
        </nav>
      </span>

      <Link href="/contact" className="marquee" data-scroll-section>
        <div>
          <span>Get in Touch</span>
          <span>Get in Touch</span>
        </div>
      </Link>
    </>
  );
}
