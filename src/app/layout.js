import './globals.css';

import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PostHogProvider } from '../providers/providers';
import JsonLd from '../components/JsonLd';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { graph, organizationNode, personNode } from '../lib/schema';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Casa Dev: Oracle NetSuite Integration & Custom Front-End Engineering',
    template: '%s | Casa Dev',
  },
  description:
    'NetSuite integrations, customer portals, and ERP-connected storefronts, built by a senior engineer with 15 years of experience. Start with a fixed-price NetSuite integration audit.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JsonLd data={graph(organizationNode(), personNode())} />
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
