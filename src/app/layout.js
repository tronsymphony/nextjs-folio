'use client'
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
import Head from 'next/head'

import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Inter } from "next/font/google";
import React, { useRef } from "react";
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const containerRef = useRef(null)
  const { route } = useRouter()

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5" />
      </Head>
      <body className={inter.className}>
        <GoogleAnalytics trackPageViews />
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            reloadOnContextChange: true,
          }}
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
