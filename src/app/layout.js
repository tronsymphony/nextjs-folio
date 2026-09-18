import './globals.css';

import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PostHogProvider } from '../providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://casa-dev.com'),
  title: {
    default: 'Casa Dev: Strategic Digital Partner | Dev, Design & Marketing',
    template: '%s | Casa Dev',
  },
  description:
    'Casa Dev is a strategic digital partner specializing in custom, high-performance web development and design. We build scalable platforms that drive business growth.',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Casa Dev',
  description:
    'Casa Dev is a strategic digital partner specializing in custom, high-performance web development and design. We build scalable platforms that drive business growth, avoiding the technical debt of AI-generated code.',
  url: 'https://casa-dev.com',
  telephone: '+1-424-384-9528',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Marina Del Rey Blvd',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90292',
    addressCountry: 'US',
  },
  image: 'https://casa-dev.com/images/logo2.webp',
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$$',
  sameAs: [
    'https://www.facebook.com/casadev',
    'https://twitter.com/casadev',
    'https://www.linkedin.com/company/casadev',
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Los Angeles',
    },
    {
      '@type': 'Country',
      name: 'US',
    },
  ],
  knowsAbout: [
    'NetSuite ERP Development',
    'Oracle NetSuite Integration',
    'Next.js & React Architecture',
    'Angular Development',
    'WordPress Development',
    'PostHog & Mixpanel Analytics',
    'Technical SEO',
    'UI/UX Design Systems',
    'Enterprise Resource Planning',
    'SaaS Product Strategy',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-424-384-9528',
    contactType: 'Customer Service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <PostHogProvider>
          <main data-scroll-container>{children}</main>
        </PostHogProvider>
      </body>
    </html>
  );
}
