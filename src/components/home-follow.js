'use client'
import Link from "next/link";
import { useState } from "react";
import Navigation from "./Navigation";
import Image from 'next/image';

 
export default function HomeFollow() {
  const [dropdownOpen, setDropdownOpen] = useState(false);



  return (
    <>
      

      <span className="page_title" data-scroll-section>
        <div className="logo">
          <Link href="/">
          <Image
        src="/images/casa-dev.webp" // Path relative to the public folder
        alt="Casa Dev"
        width={100}
        height={50}
        priority // Optional: loads image with higher priority
      />
          </Link>
        </div>

        <Navigation />
        
      </span>


      {/* <Link href="/contact" className="marquee" data-scroll-section>
        <div>
          <span>Get in Touch</span>
          <span>Get in Touch</span>
        </div>
      </Link> */}
    </>
  );
}
