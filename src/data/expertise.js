// What Nitya works with, grouped by area, taken from the products Nitya has
// actually built (Safe Streets Map; Total Warehouse's showroom, field-service
// app and website; client storefronts). Shown on /about/, /services/ and the
// homepage. `proof` links only to pages that show the skill; leave it empty
// rather than pointing at something unrelated.

const SAFE_STREETS = ['Safe Streets Map', '/work/safe-streets-map-crash-data-platform/'];
const SHOWROOM = ['Total Warehouse showroom', '/work/total-warehouse-netsuite-digital-showroom/'];

export const expertise = [
  {
    area: 'Product development',
    items: [
      'Owning work end to end: priorities set with the business, then scoping, building, testing, deploying and measuring the result',
      'Taking a product from idea to launch, then running and growing it',
      'Designing for field workers: technicians and sales reps on weak or no signal',
      'Product decisions from analytics data, release notes and changelogs',
      'Admin and internal tools, so a small team can run the product',
      'Privacy by design: data people upload is processed in their browser, not stored',
    ],
    proof: [['Safe Streets Map (my own product)', SAFE_STREETS[1]], SHOWROOM],
  },
  {
    area: 'ERP & commerce',
    items: [
      'Oracle NetSuite: SuiteScript, SuiteQL, RESTlets, SuiteTalk REST',
      'NetSuite records from the field: work orders, assets, site visits, custom fields and records',
      'Node.js middleware (Fastify, Sequelize) between web apps and the ERP',
      'Showrooms and quote flows on live ERP inventory',
      'Shopify and Shopify Plus, including headless storefronts',
    ],
    proof: [SHOWROOM, ['Headless Shopify storefront', '/work/bulletproof-headless-shopify/']],
  },
  {
    area: 'Offline-first field apps',
    items: [
      'Progressive web apps that keep working with no signal: IndexedDB (Dexie) storage',
      'Background sync with retry, backoff and safeguards, so work that hasn’t uploaded isn’t lost',
      'Photos uploaded straight from the browser to S3',
      'Service-worker updates and iOS install flows',
      'Barcode scanning in the browser (WebAssembly), calendars and charts',
    ],
    proof: [],
  },
  {
    area: 'Front end & 3D',
    items: [
      'Angular with TypeScript, RxJS and PrimeNG, including migrations',
      'React and Next.js (SSR, ISR, API routes), including thousands of statically built pages',
      'Tailwind CSS and SCSS, mobile-first layouts',
      'Site search with relevance ranking, synonyms, typo tolerance and capacity matching ("5000 lb" finds units rated at least that much)',
      'Three.js, WebGL shaders and a physics-based riding simulator',
    ],
    proof: [SHOWROOM, SAFE_STREETS],
  },
  {
    area: 'WordPress',
    items: [
      'Custom PHP themes: Advanced Custom Fields, custom post types and taxonomies, WooCommerce',
      'Custom Gutenberg blocks rendered on the server, so search engines and visitors without JavaScript see the content',
      'Interactive tools as blocks, such as fuel-cost and cost-of-ownership calculators, with unit tests',
      'Webpack and @wordpress/scripts builds; WP Engine hosting with Bitbucket Pipelines deploys to production, staging and dev',
    ],
    proof: [],
  },
  {
    area: 'Back end & cloud',
    items: [
      'REST APIs in Node.js (Fastify, Sequelize)',
      'Sign-in: OIDC single sign-on (OneLogin), AWS Cognito',
      'AWS Amplify, S3 and Route 53; hosting cost reviews, such as moving a media library to S3 to drop to a smaller plan',
      'PostgreSQL schemas and migrations',
      'Image pipelines with sharp and local ML models: photo scoring (CLIP), cropping, background removal',
    ],
    proof: [SAFE_STREETS],
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
      'Honest statistics: counts with their sources and limits stated',
    ],
    proof: [SAFE_STREETS],
  },
  {
    area: 'Search & growth',
    items: [
      'Technical SEO: schema.org structured data (Product, ItemList, BreadcrumbList, FAQPage, Service), canonicals, XML and image sitemaps, noindex rules',
      'URL migrations with 301 redirect maps',
      'Titles and headings built from live inventory data',
      'Pages built from data that answer what people search, with build-time quality checks',
      'llms.txt and crawler access for AI assistants',
      'Search Console and Semrush: site audits and keyword research',
    ],
    proof: [['SEO & search marketing', '/seo/'], SHOWROOM, SAFE_STREETS],
  },
  {
    area: 'Analytics & lead tracking',
    items: [
      'PostHog: custom events, feature flags, HogQL queries, session recordings, and a same-origin proxy so ad blockers don’t hide visits',
      'GA4 key events, Google Tag Manager and Microsoft Clarity',
      'Cleaning the data: filtering bot, foreign and internal traffic, and finding gaps in tracking history',
      'Lead capture: short forms, sticky call and quote bars, and funnel tracking that sends no personal data to analytics',
    ],
    proof: [SHOWROOM],
  },
  {
    area: 'Quality & accessibility',
    items: [
      'Tests: Jasmine/Karma, Vitest with Testing Library, PHPUnit with Brain Monkey, Playwright layout checks',
      'ESLint and PHPCS',
      'ADA and WCAG 2.2 AA audits, and fixes in code: keyboard access, ARIA, headings, contrast, forms, reduced motion',
      'Performance: lazy loading, responsive images, smaller bundles, Lighthouse audits',
    ],
    proof: [],
  },
];
