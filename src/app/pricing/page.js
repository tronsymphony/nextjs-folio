'use client'
import React, { useEffect, useRef } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import Pricing from "../../components/pricing"
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
        <Pricing></Pricing>
        <Footer></Footer>
      </main>

    </LocomotiveScrollProvider>
  );
}
