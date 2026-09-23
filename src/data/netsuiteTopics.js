// NetSuite topic pages, rendered at /netsuite/[slug]/.
//
// These pages exist to answer one specific, high-intent question each, better
// than anything an AI summary can. The quality gate at the bottom of this file
// throws at build time if a *published* topic is thin, so a doorway page
// physically cannot ship. Drafts may be incomplete.
//
// Write one per week at most. Every topic needs something only a practitioner
// knows: real gotchas, a real decision, and an honest "when not to do this".

export const netsuiteTopics = [
  {
    slug: 'netsuite-shopify-integration',
    // TODO(owner): add your own project experience to `diagnosis` and `gotchas`,
    // then set status to 'published'.
    status: 'draft',
    updatedAt: '2026-09-22',
    title: 'NetSuite Shopify Integration: Connector, Middleware, or Custom?',
    description:
      'How to integrate Shopify with Oracle NetSuite: the three approaches, what each costs you over time, the field-mapping decisions that cause most failures, and when not to build custom.',
    h1: 'NetSuite + Shopify integration: choosing the approach that won’t break',
    lede:
      'There are three ways to connect Shopify to NetSuite: Oracle’s NetSuite Connector, an integration platform like Celigo, or custom code on the NetSuite and Shopify APIs. The right choice depends less on features than on how far your catalog, pricing, and fulfillment differ from the defaults each tool assumes.',
    diagnosis: [
      'Most Shopify–NetSuite integrations fail in the same place: not the initial order sync, which every approach handles, but the edges. A partially fulfilled order, a return processed in Shopify, a bundle sold as one SKU but stocked as three, a discount code that NetSuite has no matching item for. Each of these is rare on day one and routine by month six, and each forces a decision about which system is right.',
      'The first question is therefore not "which tool" but "which system owns what". Items and inventory usually belong to NetSuite, orders originate in Shopify, fulfillments and tracking flow back from NetSuite or the 3PL, and customers are created on first order. Every record type where that answer is unclear becomes a two-way sync, and two-way syncs of master data are where records start overwriting each other.',
      'The second question is how much your data model differs from the defaults. Shopify has products with up to three option dimensions; NetSuite has matrix items, kits, and assemblies. If your catalog maps cleanly, a connector will serve you well for years. If you sell kits, custom price levels for wholesale customers, or ship from several locations with different stock rules, you will spend your time fighting the connector’s assumptions, and that is the point at which middleware or custom code starts to pay for itself.',
    ],
    decisionTable: [
      { option: 'NetSuite Connector', bestFor: 'Standard catalogs, one storefront, orders in and fulfillments out.', tradeoff: 'Limited room for custom logic; behavior changes on the vendor’s schedule.' },
      { option: 'Middleware (e.g. Celigo)', bestFor: 'Several channels, mostly standard mappings, a team that wants dashboards and retries.', tradeoff: 'Ongoing license cost; complex logic ends up hidden in mapping screens.' },
      { option: 'Custom (SuiteTalk REST / RESTlets + Shopify Admin API)', bestFor: 'Kits, B2B pricing, multi-location allocation, or a custom storefront on top.', tradeoff: 'You own the code: it needs monitoring, tests, and an owner.' },
    ],
    fieldMapping: [
      ['Shopify variant SKU', 'Item: itemid / external ID', 'Match on one immutable key; never on display name.'],
      ['Order line discount', 'Discount item or line rate', 'Decide once whether discounts are separate lines.'],
      ['Shipping line', 'Shipping item + shipping cost', 'Map each Shopify rate to a NetSuite ship method.'],
      ['Order ID', 'Sales order: external ID', 'Makes re-sends idempotent instead of duplicates.'],
      ['Location inventory', 'Inventory item locations', 'Choose which NetSuite locations feed which Shopify location.'],
    ],
    gotchas: [
      'Matching items on anything other than an immutable key (SKU or external ID) guarantees duplicates the first time someone renames a product.',
      'Refunds and returns processed in Shopify need an explicit NetSuite equivalent (credit memo, return authorization), or finance reconciles them by hand forever.',
      'Selling inventory from several NetSuite locations through one Shopify location silently oversells unless a single system does allocation.',
      'Order imports without an external ID turn every retry after a timeout into a duplicate sales order.',
    ],
    whenNotToDoThis:
      'If you have one storefront, a catalog without kits or matrix complexity, and fewer than a few hundred orders a day, do not build a custom integration. Use the NetSuite Connector or a middleware template, and spend the difference on your storefront. Custom code is a long-term commitment that only pays off when your requirements genuinely differ from the defaults.',
    faqs: [
      {
        q: 'Does NetSuite integrate with Shopify natively?',
        a: 'Oracle offers the NetSuite Connector, which syncs orders, items, inventory, and fulfillments between Shopify and NetSuite. It covers standard flows well; businesses with kits, B2B pricing, or multi-location allocation often move to middleware or a custom integration.',
      },
      {
        q: 'Should Shopify or NetSuite be the source of truth for products?',
        a: 'Usually NetSuite owns items, pricing, and inventory, while Shopify owns merchandising content like descriptions and images. The important part is deciding per field, so a two-way sync never has both systems editing the same value.',
      },
      {
        q: 'How long does a NetSuite Shopify integration take?',
        a: 'A connector-based setup typically takes one to three weeks. A custom or heavily customized integration usually takes one to three months including testing, depending on catalog complexity, fulfillment rules, and how returns are handled.',
      },
    ],
    relatedCaseStudy: 'total-warehouse-netsuite-digital-showroom',
    relatedTopics: [],
  },
];

// ---------------------------------------------------------------------------
// Quality gate. Runs when this module is imported during the build.

const MIN_DIAGNOSIS_CHARS = 1200;

function problemsWith(topic) {
  const problems = [];
  const diagnosisLength = (topic.diagnosis || []).join(' ').length;
  if (!topic.lede || topic.lede.split(/\s+/).length > 70) problems.push('lede must exist and stay under ~60 words');
  if (diagnosisLength < MIN_DIAGNOSIS_CHARS) problems.push(`diagnosis is ${diagnosisLength} chars; needs ${MIN_DIAGNOSIS_CHARS}+`);
  if (!topic.decisionTable?.length) problems.push('decisionTable is empty');
  if (!topic.fieldMapping?.length && !topic.codeSnippet) problems.push('needs fieldMapping or codeSnippet');
  if ((topic.gotchas || []).length < 3) problems.push('needs at least 3 gotchas');
  if (!topic.whenNotToDoThis?.trim()) problems.push('whenNotToDoThis is required');
  if ((topic.faqs || []).length < 3) problems.push('needs at least 3 faqs');
  return problems;
}

for (const topic of netsuiteTopics) {
  if (topic.status !== 'published') continue;
  const problems = problemsWith(topic);
  if (problems.length) {
    throw new Error(`NetSuite topic "${topic.slug}" is too thin to publish:\n  - ${problems.join('\n  - ')}`);
  }
}

export const publishedTopics = () => netsuiteTopics.filter((t) => t.status === 'published');

export const getTopic = (slug) => publishedTopics().find((t) => t.slug === slug);
