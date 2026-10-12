import './globals.css';

import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PostHogProvider } from '../providers/providers';
import JsonLd from '../components/JsonLd';
import RevealObserver from '../components/ui/RevealObserver';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { graph, organizationNode, personNode } from '../lib/schema';

const display = Inter_Tight({ subsets: ['latin'], variable: '--font-display' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif-accent' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-label' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Casa Dev: NetSuite Integrations, AI App Audits & Technical SEO',
    template: '%s | Casa Dev',
  },
  description:
    'NetSuite integrations, security audits for apps built with AI tools, and technical SEO, from a senior engineer with 15 years of experience. Each starts with a fixed-price audit.',
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
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-sans bg-canvas text-ink">
        <RevealObserver />
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
