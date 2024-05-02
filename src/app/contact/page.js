'use client'
import React, { useEffect, useRef } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import About from "../../components/about"
export default function Home() {
  const containerRef = useRef(null)
 
  return (
    <LocomotiveScrollProvider
      options={
        {
          smooth: true,
        }
      }
      containerRef={containerRef}
    >
      <main data-scroll-container ref={containerRef}>
        <HomeFollow></HomeFollow>
        <About></About>
        <Footer></Footer>
      </main>

    </LocomotiveScrollProvider>
  );
}
