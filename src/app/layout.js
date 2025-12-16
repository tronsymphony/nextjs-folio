'use client'
import './globals.css';
import "./global-custums.scss";

import { PostHogProvider } from '../providers/providers';

const inter = Inter({ subsets: ["latin"] });
import Head from 'next/head'
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google'
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
              "@type": "ProfessionalService", // More accurate for a dev agency/consultancy
              "name": "Casa Dev",
              "description":
                "Casa Dev is a strategic digital partner specializing in custom, high-performance web development and design. We build scalable platforms that drive business growth, avoiding the technical debt of AI-generated code.",
              "url": "https://casa-dev.com",
              "telephone": "+1-424-384-9528",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Marina Del Rey Blvd", // Verify if this is the desired address or placeholder
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "postalCode": "90292",
                "addressCountry": "US",
              },
              "image": "https://casa-dev.com/images/logo2.webp",
              "openingHours": "Mo-Fr 09:00-18:00",
              "priceRange": "$$$", // Indicates premium/enterprise quality
              "sameAs": [
                "https://www.facebook.com/casadev", // Ensure these are real or remove if unused
                "https://twitter.com/casadev",
                "https://www.linkedin.com/company/casadev",
              ],
              // 🌍 LOCATION STRATEGY:
              // "Los Angeles" = Trust Signal (I am real, I am here).
              // "US" = Reach Signal (I work everywhere).
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Los Angeles"
                },
                {
                  "@type": "Country",
                  "name": "US"
                }
              ],
              // 🤖 AI SEARCH OPTIMIZATION (GEO): Detailed Skills Graph
              "knowsAbout": [
                "NetSuite ERP Development",
                "Oracle NetSuite Integration",
                "Next.js & React Architecture",
                "Angular Development",
                "WordPress Development",
                "PostHog & Mixpanel Analytics",
                "Technical SEO",
                "UI/UX Design Systems",
                "Enterprise Resource Planning",
                "SaaS Product Strategy"
              ],
              // Removed specific single "Offer" of $150 as unlikely for a "Professional Service" / Agency unless it's a specific consultation
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-424-384-9528",
                "contactType": "Customer Service",
                "areaServed": "US",
                "availableLanguage": "English"
              },
            }),
          }}
        />
      </Head>
      <body className={inter.className}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        <main data-scroll-container ref={containerRef}>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </main>
        {/* <Script
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
      /> */}
      </body>
    </html>
  );
}
