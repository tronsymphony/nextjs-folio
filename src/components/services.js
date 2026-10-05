import Expertise from './Expertise';
import { Accent, PrimaryCta, SecondaryCta } from './ui/Cta';
import { Block, DataTable, LinkRows, PageHero } from './ui/Page';
import { offers } from '../data/netsuiteOffers';

// The services people hire me for, with links to each page that sells them.
const services = [
  { href: '/netsuite/', tag: 'Primary focus', title: 'Oracle NetSuite integrations, portals and storefronts', body: offers.map((o) => o.title).join(' · ') },
  { href: '/netsuite-audit/', tag: 'Fixed price', title: 'NetSuite integration audit', body: 'A written review of everything connected to NetSuite, with a prioritized plan.' },
  { href: '/ai-app-audit/', tag: 'Fixed price', title: 'AI-built app audit', body: 'Security and production-readiness review of apps built with Lovable, Bolt, Cursor or Claude Code.' },
  { href: '/seo/', tag: 'Ongoing', title: 'SEO & search marketing', body: 'Technical SEO, pages built from your data, and content planned from Search Console and Semrush.' },
];

// Work I still take on, mostly for existing clients or alongside the services above.
const alsoAvailable = [
  ['Product development', 'Taking a new product from idea to launch: scoping, prototype, build, analytics, and the admin tools to run it.'],
  ['Custom web applications', 'React, Next.js and Angular applications, including migrations off legacy front ends.'],
  ['Shopify & headless commerce', 'Shopify and Shopify Plus stores, or Shopify behind a custom, fast front end.'],
  ['WordPress', 'Sites, custom themes and plugins, performance and security fixes.'],
  ['Accessibility (ADA / WCAG)', 'Audits and fixes to WCAG 2.2 AA, the standard ADA website claims are usually measured against.'],
  ['Maps & data products', 'Interactive maps, custom tilesets and pipelines that turn public or internal data into something people can use.'],
  ['Offline-capable apps', 'IndexedDB storage and sync for apps used on job sites, warehouses and other places with poor signal.'],
  ['Performance', 'Core Web Vitals, bundle size, caching and image pipelines.'],
  ['Analytics implementation', 'PostHog and GA4 event design that answers real product questions.'],
  ['Maintenance', 'Dependency upgrades, security patches and monitoring for sites I built or inherit.'],
];

export default function Services() {
  return (
    <div className="bg-ink">
      <PageHero
        back={['/', 'Home']}
        eyebrow="Capabilities"
        title={<>What I work on, and <Accent>what I&rsquo;ve built.</Accent></>}
        lede="My focus is Oracle NetSuite: integrations, portals and the front ends that sit on top of it. Behind that sit fifteen years of engineering and a product I build and run myself, and I still take on the work below."
      >
        <PrimaryCta />
        <SecondaryCta />
      </PageHero>

      <Block index="01" label="Services">
        <LinkRows items={services} />
      </Block>

      <Block index="02" label="Skills" title="From the products I've built" wide>
        <Expertise />
      </Block>

      <Block index="03" label="Also available" title="Usually for existing clients, or alongside the services above">
        <DataTable columns={['Work', 'What it covers']} rows={alsoAvailable} />
      </Block>
    </div>
  );
}
