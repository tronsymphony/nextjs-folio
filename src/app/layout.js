'use client'
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Inter } from "next/font/google";
import React, { useEffect, useRef } from "react";
import "./globals.scss";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children, title, description }) {
  const containerRef = useRef(null)
  const { route } = useRouter()

  return (
    <html lang="en">
      <body className={inter.className}>
      <GoogleAnalytics trackPageViews />
        <LocomotiveScrollProvider
          options={{ smooth: true, }}
          watch={[route]}
          containerRef={containerRef}
        >
          <main data-scroll-container ref={containerRef}>
            {children}
          </main>
        </LocomotiveScrollProvider>
      </body>
    </html>
  );
}
