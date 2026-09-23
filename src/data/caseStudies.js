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
    role: null, // TODO(owner): e.g. 'Lead engineer, design through launch'
    title: 'A NetSuite-connected digital showroom for forklifts and warehouse equipment',
    seoTitle: 'Total Warehouse: NetSuite Digital Showroom Case Study',
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
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    integrations: ['Oracle NetSuite'],
    metrics: [], // TODO(owner): e.g. { label: 'Catalog sync', value: 'Real-time', note: 'how it was measured' }
    quote: null, // TODO(owner): { text, author, title }
    heroImage: '/images/totalwarehouse.jpg',
    liveUrl: 'https://showroom.totalwarehouse.com',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    featured: true,
    order: 1,
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
      'An interactive map of California collision data built from public CHP/SWITRS and CCRS records, with filtering, 3D views, and a data importer.',
    problem:
      'California publishes detailed collision records, but as bulk datasets that are practically unusable for a rider or driver who just wants to know which roads are dangerous. The data needed to be cleaned, joined, and put on a map someone could actually read.',
    approach: [
      {
        heading: 'Data pipeline from public records',
        body: 'Collision records from the CHP SWITRS and CCRS datasets are imported, normalized, and served through purpose-built API routes.',
      },
      {
        heading: 'A map people can use',
        body: 'A Mapbox front end with filters, city views, and a 3D mode turns large public collision datasets into patterns a person can see at a glance.',
      },
    ],
    stack: ['Next.js', 'React', 'Mapbox GL', 'Tailwind CSS'],
    integrations: ['CHP SWITRS', 'CCRS'],
    metrics: [],
    quote: null,
    heroImage: '/images/map.webp',
    liveUrl: null,
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    featured: true,
    order: 2,
    relatedTopics: [],
    status: 'published',
  },
  {
    slug: 'godaddy-venture-forward',
    client: 'GoDaddy',
    industry: 'Economic research',
    role: null, // TODO(owner): state the engagement plainly, e.g. 'Front-end engineer, contract via <agency>'
    title: 'Venture Forward: visualizing the economic impact of microbusinesses',
    summary:
      'A data-heavy research platform that processes millions of microbusiness data points to visualize their economic impact.',
    problem:
      'GoDaddy’s Venture Forward research program studies the economic impact of online microbusinesses. The findings live in large datasets that need to be explorable by policymakers, researchers, and the press.',
    approach: [
      {
        heading: 'Data visualization at scale',
        body: 'A React front end that turns millions of microbusiness data points into maps and charts that non-specialists can explore.',
      },
    ],
    stack: ['React', 'Next.js', 'Data visualization'],
    integrations: [],
    metrics: [],
    quote: null,
    heroImage: '/images/god.jpg',
    liveUrl: 'https://godaddy.com/ventureforward',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    featured: true,
    order: 3,
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
