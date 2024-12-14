'use client'
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
import Head from 'next/head'
import Script from 'next/script';
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Casa Dev",
              "description":
                "Casa Dev is a Los Angeles-based web development and design agency specializing in custom, hand-coded websites.",
              "url": "https://casa-dev.com",
              "telephone": "+1-424-384-9528",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Marina Del Rey Blvd",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "postalCode": "90292",
                "addressCountry": "US",
              },
              "image": "https://casa-dev.com/images/logo.png",
              "openingHours": "Mo-Fr 09:00-17:00",
              "sameAs": [
                "https://www.facebook.com/casadev",
                "https://twitter.com/casadev",
                "https://www.linkedin.com/company/casadev",
              ],
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 34.052235,
                  "longitude": -118.243683,
                },
                "geoRadius": 50,
              },
              "offers": {
                "@type": "Offer",
                "url": "https://casa-dev.com/pricing",
                "priceCurrency": "USD",
                "price": "150",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01",
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-424-384-9528",
                "contactType": "Customer Service",
                "areaServed": "US",
              },
            }),
          }}
        />
      </Head>
      <body className={inter.className}>
        <GoogleAnalytics trackPageViews />
       
          <main data-scroll-container ref={containerRef}>
            {children}
          </main>
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/675531cc2480f5b4f5aa4c89/1ieicl1p5';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
      </body>
    </html>
  );
}
