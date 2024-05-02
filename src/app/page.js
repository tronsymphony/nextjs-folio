'use client'
import React, { useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import styles from "./page.module.css";
import HomeFollow from "../components/home-follow";
import HomeMain from "../components/home-main";
import Footer from "../components/footer";

import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

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
        <HomeMain></HomeMain>
        <Footer></Footer>
      </main>

    </LocomotiveScrollProvider>
  );
}
