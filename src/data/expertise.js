// What Nitya works with, grouped by area, taken from the products Nitya has
// actually built (Safe Streets Map, the Total Warehouse showroom, client
// storefronts). Shown on /about/, /services/ and the homepage. `proof` links
// only to pages that show the skill; leave it empty rather than pointing at
// something unrelated.

const SAFE_STREETS = ['Safe Streets Map', '/work/safe-streets-map-crash-data-platform/'];

export const expertise = [
  {
    area: 'Product development',
    items: [
      'Taking a product from idea to launch, then running and growing it',
      'Roadmaps, prototypes, and shipping in small, testable steps',
      'Admin and moderation tools, so a small team can run the product',
      'Privacy by design: data people upload is processed in their browser, not stored',
    ],
    proof: [['Safe Streets Map (my own product)', SAFE_STREETS[1]]],
  },
  {
    area: 'ERP & commerce',
    items: [
      'Oracle NetSuite: SuiteScript, SuiteQL, RESTlets, SuiteTalk REST',
      'Showrooms and quote flows on live ERP inventory',
      'Shopify and Shopify Plus, including headless storefronts',
      'WordPress sites, themes and plugins',
    ],
    proof: [
      ['Total Warehouse NetSuite showroom', '/work/total-warehouse-netsuite-digital-showroom/'],
      ['Headless Shopify storefront', '/work/bulletproof-headless-shopify/'],
    ],
  },
  {
    area: 'Maps & geospatial',
    items: [
      'Interactive maps with Mapbox GL and custom vector tilesets',
      'OpenStreetMap data processing and route building',
      'Elevation, routing and ride-time planning',
      'GPX and FIT file analysis in the browser',
    ],
    proof: [SAFE_STREETS],
  },
  {
    area: 'Data engineering',
    items: [
      'Pipelines that turn public records into clean datasets (crash, Census and federal data)',
      'Live feeds from government APIs: weather, road closures, incidents, with caching',
      'PostgreSQL schemas and migrations',
      'Honest statistics: counts with their sources and limits stated',
    ],
    proof: [SAFE_STREETS],
  },
  {
    area: 'Front end & 3D',
    items: [
      'React and Next.js, including thousands of statically built pages',
      'Angular applications and migrations',
      'IndexedDB and offline-capable web apps',
      'Three.js, WebGL shaders and a physics-based riding simulator',
    ],
    proof: [SAFE_STREETS],
  },
  {
    area: 'Accessibility',
    items: [
      'ADA and WCAG 2.2 AA accessibility audits',
      'Fixes in code: keyboard access, screen readers, contrast, forms, reduced motion',
    ],
    proof: [],
  },
  {
    area: 'Search & growth',
    items: [
      'Pages built from data that answer what people search, with build-time quality checks',
      'Structured data, sitemaps and llms.txt for search engines and AI assistants',
      'Search Console and Semrush research; GA4 and PostHog analytics',
    ],
    proof: [['SEO & search marketing', '/seo/'], SAFE_STREETS],
  },
];
