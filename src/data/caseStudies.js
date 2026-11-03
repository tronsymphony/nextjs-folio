// Single source of truth for case studies: /work/, /work/[slug]/, the homepage
// featured grid, the sitemap, and llms.txt all read from here.
//
// Rules for this file:
// - Only claims you can substantiate. Empty `metrics`, a null `quote` or a null
//   `role` simply hide that section; never fill them with estimates.
// - `role` should say plainly how you were involved, e.g. 'Lead engineer' or
//   'Senior front-end engineer, contract via <agency>'.
// - `status: 'draft'` keeps an entry out of every listing and the sitemap.

export const caseStudies = [
  {
    slug: 'total-warehouse-netsuite-digital-showroom',
    client: 'Total Warehouse',
    industry: 'Material handling & industrial equipment',
    role: 'Engineer, working mostly autonomously', // TODO(owner): add your title if you want it shown
    title: 'A NetSuite-connected digital showroom for forklifts and warehouse equipment',
    seoTitle: 'NetSuite Case Study: Total Warehouse Equipment Showroom',
    summary:
      'A custom Next.js showroom that reads product and inventory data directly from Oracle NetSuite, so customers can browse equipment and request quotes against live ERP data.',
    problem:
      'Total Warehouse sells new and used forklifts, warehouse equipment, and automation to customers across the U.S. The product catalog and inventory lived in Oracle NetSuite, but NetSuite’s built-in customer-facing tools didn’t fit how equipment buyers shop. Browsing inventory and getting a quote meant going through a sales rep, and any website copy of the catalog risked drifting out of sync with what was actually in stock.',
    approach: [
      {
        heading: 'NetSuite as the single source of truth',
        body: 'Rather than maintain a second product database, the showroom syncs product data directly from NetSuite. What customers see reflects what the ERP says is available.',
      },
      {
        heading: 'A fast, browsable front end',
        body: 'A custom Next.js application gives customers a real browsing experience over the ERP catalog: equipment categories, product detail pages, and search, served quickly enough to work for buyers on job sites and warehouse floors.',
      },
      {
        heading: 'Quote generation built into the flow',
        body: 'Quote requests start from the product a customer is looking at, which shortens the back-and-forth between a buyer and the sales team.',
      },
      {
        heading: 'Search that understands equipment',
        body: 'Inventory search ranks results by relevance and handles synonyms, typos and capacities: a search for "5000 lb" finds every unit rated at least that much.',
      },
      {
        heading: 'A technical SEO overhaul',
        body: 'Fixed the structured-data errors, mapped legacy URLs to their new pages with 301 redirects, added image sitemaps, and built page titles from live unit counts, so each page says what is actually in stock.',
      },
      {
        heading: 'Lead tracking that can be trusted',
        body: 'Rebuilt lead tracking across PostHog and GA4. The analysis showed most paid search-partner clicks were foreign junk traffic, which changed how leads are measured. Lead funnels are tracked without sending personal data to analytics.',
      },
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Fuse.js', 'schema.org structured data', 'PostHog', 'GA4'],
    integrations: ['Oracle NetSuite'],
    metrics: [{ label: 'Units in the catalog', value: 'About 1,700', note: 'Read from NetSuite' }],
    quote: null, // TODO(owner): { text, author, title }
    heroImage: '/images/totalwarehouse-showroom.webp',
    liveUrl: 'https://showroom.totalwarehouse.com',
    publishedAt: '2026-09-22',
    updatedAt: '2026-10-05',
    featured: true,
    order: 3,
    relatedTopics: [],
    status: 'published',
  },
  {
    slug: 'safe-streets-map-crash-data-platform',
    client: 'Safe Streets Map (own product)',
    industry: 'Public safety data',
    role: 'Founder and sole engineer',
    title: 'Turning California crash records into an interactive safety map',
    summary:
      'Free maps and more than 1,500 statically built pages of California crash data for people walking, cycling and riding motorcycles, built from the state’s CCRS records, federal FARS data and OpenStreetMap.',
    problem:
      'California publishes detailed collision records, but as bulk datasets that are practically unusable for a rider or driver who just wants to know which roads are dangerous. The data needed to be cleaned, joined, and put on a map someone could actually read.',
    approach: [
      {
        heading: 'Data pipeline from public records',
        body: 'Node build scripts turn CCRS crash records and FARS fatal-crash data into compact JSON files, and flag cities whose police reports mostly lack map locations, so undercounted places are labelled rather than shown as quiet.',
      },
      {
        heading: 'A map people can use',
        body: 'Mapbox GL maps for walking, cycling and motorcycling, with crash hotspots, filters, custom vector tilesets, and live weather and road-closure layers from NWS and Caltrans.',
      },
      {
        heading: 'A product, built and run end to end',
        body: 'Designed, built and run as my own product: walking, cycling and motorcycling maps, a ride planner with weather and road conditions, a tool that checks a GPX or FIT ride against crash records entirely in the browser, admin tools for reviewing community rides, and a physics-based 3D riding simulator.',
      },
      {
        heading: 'Pages that answer searches',
        body: 'Every city, busy street and car-crash statistic gets its own static page, built at build time from the same data, so the numbers are in the HTML that search engines and AI assistants read. Sitemap, structured data and llms.txt are generated from those files too.',
      },
    ],
    stack: ['Next.js', 'React', 'Mapbox GL', 'Three.js', 'Postgres', 'Tailwind CSS'],
    integrations: ['CCRS (data.ca.gov)', 'NHTSA FARS', 'OpenStreetMap', 'National Weather Service', 'Caltrans'],
    metrics: [],
    quote: null,
    heroImage: '/images/safestreets-map-la.webp',
    liveUrl: 'https://www.safestreetsmap.com/',
    publishedAt: '2026-09-22',
    updatedAt: '2026-10-05',
    featured: true,
    order: 1,
    relatedTopics: [],
    status: 'published',
  },
  {
    // Facts from ../streetsweeping/CLAUDE.md (2026-11-03). Its search traffic dipped while Google re-indexed LA in
    // late October 2026, so no traffic figures here until that settles.
    slug: 'curb-reader-street-sweeping',
    client: 'Curb Reader (own product)',
    industry: 'City open data',
    role: 'Founder and sole engineer',
    title: 'Street sweeping schedules for 25 cities, built from their own open data',
    seoTitle: 'Case Study: Curb Reader, Street Sweeping Schedules from City Open Data',
    summary:
      'When street sweeping is on every street in Los Angeles, San Francisco, San Diego, New York, Chicago, Boston and 19 more cities and counties, with the tickets written there, read from each city’s own data and rebuilt every month.',
    problem:
      'Every city publishes its street sweeping schedule differently: map layers, spreadsheets, a database of street signs, or hand-written text like “NS 2nd Fri, SS 2nd Thu”. None of it answers what a resident wants to know: when is my side of my street swept next, and how often does the city write tickets there? The answers sat in city map viewers that few people find.',
    approach: [
      {
        heading: 'Every city’s format, read into one schedule',
        body: 'Build scripts read each city’s source, from ArcGIS layers and open-data portals to zipped shapefiles in state plane coordinates and New York’s database of 194,870 broom signs, into one model of days, weeks, hours, sides and seasons. Rows the scripts can’t read are left out and logged, never guessed.',
      },
      {
        heading: 'Tickets placed on the block',
        body: 'A year of each city’s street-cleaning citations is matched to the route, block and side it was written on, so every street page shows when tickets actually get written. Plates and vehicle details are never downloaded.',
      },
      {
        heading: 'A page for every street',
        body: 'About 10,800 pages, one per street in the largest cities and one per city, ward or neighborhood elsewhere, each titled with the search people type and showing the next sweep dates worked out in the browser.',
      },
      {
        heading: 'Next dates people can rely on',
        body: 'Seasons where a city stops sweeping in winter, New York’s holiday suspensions read from the city’s own calendar, calendar feeds, and a push reminder the evening before, all from the same schedule logic.',
      },
      {
        heading: 'Kept current without calling the cities',
        body: 'A monthly job re-downloads every source and rebuilds the site; if one source fails, last month’s files stay. Visitors only ever load the site’s own files, and an address typed into the search goes only to the map provider, never stored.',
      },
    ],
    stack: ['Next.js', 'React', 'Mapbox GL', 'Tailwind CSS', 'Postgres', 'Web Push', 'GitHub Actions'],
    integrations: ['City ArcGIS layers', 'data.lacity.org', 'DataSF', 'NYC Open Data', 'Chicago Data Portal', 'Mapbox'],
    metrics: [
      { label: 'Cities and counties', value: '25', note: 'Each from its own published data' },
      { label: 'Pages', value: 'About 10,800', note: 'Streets, cities, wards and neighborhoods' },
    ],
    quote: null,
    heroImage: '/images/curbreader-street-sweeping.webp',
    liveUrl: 'https://www.curbreader.com/',
    publishedAt: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: true,
    order: 2,
    relatedTopics: [],
    status: 'published',
  },
  {
    slug: 'bulletproof-headless-shopify',
    client: 'Bulletproof',
    industry: 'Consumer e-commerce',
    role: null, // TODO(owner)
    title: 'A headless Shopify storefront built for speed',
    summary: 'A headless Shopify implementation designed for speed, search visibility, and high-conversion purchase flows.',
    problem:
      'A high-traffic direct-to-consumer brand needed a storefront faster and more flexible than a standard Shopify theme allows, without giving up Shopify as the commerce engine.',
    approach: [
      {
        heading: 'Headless architecture',
        body: 'Shopify stays the commerce back end while a custom front end controls rendering, performance, and the purchase flow.',
      },
    ],
    stack: ['Headless Shopify', 'Vue.js'],
    integrations: ['Shopify'],
    metrics: [],
    quote: null,
    heroImage: '/images/bulletproof.jpg',
    liveUrl: 'https://bulletproof.com',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    featured: false,
    order: 4,
    relatedTopics: [],
    status: 'published',
  },
];

export const publishedCaseStudies = () =>
  caseStudies.filter((c) => c.status === 'published').sort((a, b) => a.order - b.order);

export const featuredCaseStudies = () => publishedCaseStudies().filter((c) => c.featured);

export const getCaseStudy = (slug) => publishedCaseStudies().find((c) => c.slug === slug);
