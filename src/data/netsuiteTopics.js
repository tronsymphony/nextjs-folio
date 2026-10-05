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
    // TODO(owner): add your own project experience to `diagnosis` and `gotchas`.
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite Shopify Integration: Connector, Middleware, or Custom?',
    description:
      'How to integrate Shopify with Oracle NetSuite: the three approaches, what each costs you over time, the field-mapping decisions that cause most failures, and when not to build custom.',
    h1: 'NetSuite + Shopify integration: choosing the approach that won’t break',
    lede:
      'There are three ways to connect Shopify to NetSuite: Oracle’s NetSuite Connector, an integration platform like Celigo, or custom code on the NetSuite and Shopify APIs. The right choice depends less on features than on how far your catalog, pricing, and fulfillment differ from the defaults each tool assumes.',
    estimate: { system: 'shopify', records: ['items', 'inventory', 'orders', 'fulfillments'], direction: 'two-way' },
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
    relatedTopics: ['netsuite-bigcommerce-integration', 'netsuite-3pl-integration', 'netsuite-restlet-vs-rest-api'],
  },
  {
    slug: 'netsuite-salesforce-integration',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite Salesforce Integration: Cost, Timeline and Approach',
    description:
      'How to integrate Salesforce with Oracle NetSuite: which system owns accounts, quotes and orders, what a connector, middleware or custom build costs, and the sync mistakes that create duplicate customers.',
    h1: 'NetSuite + Salesforce integration: quote in one, invoice in the other',
    lede:
      'Salesforce runs the sales process and NetSuite runs the money. The integration is the handoff between them: a closed deal becomes a NetSuite customer and sales order, and invoices, payments and order status flow back so sales can see them without a NetSuite login.',
    estimate: { system: 'crm', records: ['customers', 'items', 'orders', 'invoices'], direction: 'two-way' },
    diagnosis: [
      'The usual design is a one-time handoff, not a mirror. Sales works the account and opportunity in Salesforce; at closed-won, the integration creates or matches the NetSuite customer and creates a sales order from the opportunity products. From then on NetSuite owns the order, fulfillment, invoice and payment, and sends read-only summaries back to Salesforce. Teams that try to keep orders editable in both systems end up with two versions of every order and no way to tell which one shipped.',
      'Accounts are where the trouble starts. Salesforce accounts are created freely by reps, often with slightly different names for the same company; NetSuite customers are created by finance with tax, terms and subsidiary set. Matching on name produces duplicates, so the integration needs a stable key: store the NetSuite internal ID on the Salesforce account once matched, and the Salesforce account ID on the NetSuite customer as an external ID. In NetSuite OneWorld accounts, every customer also needs a subsidiary, which Salesforce usually has no field for, so a rule has to choose it.',
      'Products and prices are the second decision. If Salesforce price books are kept by hand, they drift from NetSuite price levels within months. Most teams make NetSuite the owner of items and list prices and push them one way into Salesforce products and price book entries, and let reps discount on the opportunity line. Whether that discount reaches NetSuite as a line rate or a separate discount item has to be decided before the first order syncs.',
    ],
    decisionTable: [
      { option: 'Integration app (e.g. Celigo’s Salesforce–NetSuite app)', bestFor: 'Standard account, opportunity-to-order and invoice flows with modest customization.', tradeoff: 'Annual license; custom objects and approval rules push against its templates.' },
      { option: 'General middleware', bestFor: 'Several systems besides Salesforce, with a team that wants one place to watch every flow.', tradeoff: 'Mappings and business rules live in a vendor tool rather than in code.' },
      { option: 'Custom (Salesforce Apex/Flows + NetSuite RESTlets or REST API)', bestFor: 'CPQ or custom objects, multi-subsidiary rules, or a portal reading both systems.', tradeoff: 'You own the code, its monitoring and its tests.' },
    ],
    fieldMapping: [
      ['Account.Id', 'Customer: external ID', 'Set once on match; every later sync uses it, never the name.'],
      ['Opportunity (Closed Won)', 'Sales order', 'Create once, with the opportunity ID as external ID so retries can’t duplicate it.'],
      ['OpportunityLineItem', 'Sales order item line', 'Map Product2 to the NetSuite item by SKU or internal ID.'],
      ['(no field)', 'Customer: subsidiary', 'OneWorld needs one; define the rule (by country, by owner, by default).'],
      ['Custom invoice object', 'Invoice: number, status, amount remaining', 'One-way from NetSuite, read-only in Salesforce.'],
    ],
    gotchas: [
      'Creating NetSuite customers for every Salesforce account, including prospects, fills NetSuite with records finance has to clean up. Create them at the first won deal.',
      'Two-way sync on account addresses and contacts lets an old value in one system overwrite a correction in the other. Pick one owner per field.',
      'Closed-won is not always final: a deal reopened after the order exists needs a defined path, or someone edits the opportunity and expects the order to change.',
      'Multi-currency opportunities must land in a NetSuite currency the customer record allows, or the sales order save fails.',
    ],
    whenNotToDoThis:
      'If a handful of deals close each month, a rep or bookkeeper entering the order in NetSuite takes minutes and costs nothing to maintain. Integrate when volume or errors make that handoff the bottleneck, not because both systems have APIs.',
    faqs: [
      {
        q: 'Does NetSuite have a native Salesforce integration?',
        a: 'Oracle does not ship a built-in Salesforce sync in NetSuite. Teams use an integration app or middleware (Celigo is common), or build a custom integration on the Salesforce APIs and NetSuite RESTlets or REST web services.',
      },
      {
        q: 'Should Salesforce or NetSuite own customer records?',
        a: 'Usually Salesforce owns prospects and the sales relationship, and NetSuite owns the customer once there is something to bill: terms, tax, subsidiary and credit. Each system stores the other’s ID so records match on IDs, never on names.',
      },
      {
        q: 'Can sales see invoices and payments in Salesforce?',
        a: 'Yes. A one-way sync from NetSuite can write invoice numbers, status, amount due and payment dates to a custom object or related list in Salesforce, so reps see whether a customer has paid without a NetSuite license.',
      },
    ],
    relatedCaseStudy: null,
    relatedTopics: ['netsuite-hubspot-integration', 'netsuite-restlet-vs-rest-api'],
  },
  {
    slug: 'netsuite-hubspot-integration',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite HubSpot Integration: Cost, Timeline and Approach',
    description:
      'How to connect HubSpot to Oracle NetSuite: matching companies and contacts to customers, turning deals into sales orders, sending order history back for marketing, and what each approach costs.',
    h1: 'NetSuite + HubSpot integration: getting order data into marketing',
    lede:
      'Most companies connect HubSpot to NetSuite for one of two reasons: sales wants won deals to become NetSuite orders without retyping, or marketing wants purchase history in HubSpot to segment and email customers. The two goals need different data flowing in different directions.',
    estimate: { system: 'crm', records: ['customers', 'orders', 'invoices'], direction: 'two-way' },
    diagnosis: [
      'HubSpot is built around contacts, the people; NetSuite is built around customers, which are usually companies. A NetSuite customer can be a company with several contacts, or an individual. Before syncing anything, decide whether a NetSuite customer matches a HubSpot company or a HubSpot contact, and how a HubSpot contact with no company is handled. Getting this wrong is the most common reason HubSpot fills up with duplicate companies or NetSuite fills up with one customer per email address.',
      'For marketing, the valuable data is what customers bought: last order date, lifetime revenue, product categories, open invoices. This flows one way, from NetSuite to HubSpot company or contact properties, and is easy to keep correct because HubSpot never writes it back. It can run nightly. Most of the value of the integration often sits here, and it is the cheapest part to build.',
      'For sales, deals become sales orders. That needs HubSpot products and line items to match NetSuite items, which in practice means NetSuite owns the item list and pushes it to the HubSpot product library. A deal moved to closed-won then creates the NetSuite sales order with the deal ID as external ID. As with Salesforce, the order belongs to NetSuite after that; HubSpot gets status updates, not edits.',
    ],
    decisionTable: [
      { option: 'Marketplace app or integration app', bestFor: 'Standard company, contact and deal syncs with properties HubSpot already has.', tradeoff: 'Subscription cost; limited control over matching rules.' },
      { option: 'Middleware', bestFor: 'HubSpot is one of several systems connected to NetSuite.', tradeoff: 'Rules live in the middleware’s mapping screens.' },
      { option: 'Custom (HubSpot API + NetSuite SuiteQL/RESTlets)', bestFor: 'Custom purchase-history properties, unusual matching rules, or a nightly rollup of order data.', tradeoff: 'You own monitoring and HubSpot API rate limits.' },
    ],
    fieldMapping: [
      ['Company (or contact) record ID', 'Customer: external ID', 'Decide company vs contact once; store the ID on both sides.'],
      ['Deal (closed won)', 'Sales order', 'Deal ID as external ID makes a retried sync safe.'],
      ['Deal line item → product', 'Item', 'NetSuite owns items; HubSpot’s product library is a copy.'],
      ['Custom property: last order date', 'Max(trandate) of sales orders', 'One-way, nightly, from a SuiteQL query.'],
      ['Custom property: lifetime revenue', 'Sum of invoice amounts', 'One currency, stated in the property label.'],
    ],
    gotchas: [
      'HubSpot merges duplicate contacts and companies; the merged-away record ID disappears, so the integration must look up the surviving record instead of failing.',
      'Syncing every HubSpot contact into NetSuite turns newsletter sign-ups into customers. Only create NetSuite customers from won deals or real orders.',
      'Pushing order data to contact properties when NetSuite customers are companies gives every contact at a company the same revenue, which inflates reports that sum contacts.',
      'HubSpot API rate limits differ by subscription tier, so a large first backfill should be batched and resumable.',
    ],
    whenNotToDoThis:
      'If marketing only needs a list of customers and their last order date, a scheduled export from a NetSuite saved search imported into HubSpot may be enough for months. Build the integration when the import becomes a weekly chore or when deals must become orders automatically.',
    faqs: [
      {
        q: 'Can HubSpot connect to NetSuite?',
        a: 'Yes, through apps in HubSpot’s marketplace, through middleware such as Celigo, or with a custom integration on the HubSpot API and NetSuite’s RESTlets, REST web services and SuiteQL.',
      },
      {
        q: 'Should a NetSuite customer map to a HubSpot company or contact?',
        a: 'For B2B businesses, usually a company, with NetSuite contacts mapped to HubSpot contacts. For businesses that sell to individuals, a contact. Pick one rule and apply it everywhere, including to records created in the past.',
      },
      {
        q: 'How do I get NetSuite purchase history into HubSpot?',
        a: 'Run a SuiteQL query or saved search in NetSuite that rolls up order and invoice data per customer, and write the results to custom properties on the matching HubSpot records on a schedule. It is one-way, so it cannot corrupt NetSuite data.',
      },
    ],
    relatedCaseStudy: null,
    relatedTopics: ['netsuite-salesforce-integration', 'suiteql-vs-saved-search'],
  },
  {
    slug: 'netsuite-bigcommerce-integration',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite BigCommerce Integration: Cost, Timeline and Approach',
    description:
      'How to integrate BigCommerce with Oracle NetSuite: catalog and variants, B2B price lists, orders and fulfillments, and when a connector stops being enough.',
    h1: 'NetSuite + BigCommerce integration: catalog, prices and orders',
    lede:
      'BigCommerce stores often connect to NetSuite through Oracle’s NetSuite Connector or an integration app, and that works for standard catalogs. The cost and risk rise with B2B pricing, customer-specific catalogs and products that NetSuite stores as kits or matrix items.',
    estimate: { system: 'bigcommerce', records: ['items', 'inventory', 'pricing', 'orders', 'fulfillments'], direction: 'two-way' },
    diagnosis: [
      'As with any storefront, the core flows are items and inventory from NetSuite to BigCommerce, orders from BigCommerce to NetSuite, and fulfillments with tracking back. The order flow is rarely the problem. The catalog is: BigCommerce products have variants built from option values, NetSuite has matrix items with parent and child records, and the two have to agree on which record is the sellable SKU and which system owns names, descriptions and images.',
      'B2B stores add pricing. BigCommerce uses price lists and customer groups; NetSuite uses price levels, customer-specific item pricing and quantity pricing. If wholesale customers get prices from NetSuite in one place and BigCommerce in another, they will see one price online and another on the invoice. The fix is to choose NetSuite as the source and generate BigCommerce price lists from it, or to read prices from NetSuite at checkout. The second is more accurate and harder to make fast.',
      'Customers are the third decision. A retail store can create a NetSuite customer per order or post every order to a single cash-sale customer; a B2B store needs every company to be a real NetSuite customer with terms, linked to the BigCommerce customer or company account so orders land on the right record.',
    ],
    decisionTable: [
      { option: 'NetSuite Connector or integration app', bestFor: 'Retail catalogs, one store, standard order and fulfillment flows.', tradeoff: 'Price lists, kits and customer-specific catalogs strain its mappings.' },
      { option: 'Middleware', bestFor: 'Several stores or channels with mostly standard data.', tradeoff: 'License cost, and logic split across mapping screens.' },
      { option: 'Custom (BigCommerce APIs + NetSuite RESTlets/REST)', bestFor: 'B2B price lists from NetSuite, kits and assemblies, headless storefronts.', tradeoff: 'You own the code and its monitoring.' },
    ],
    fieldMapping: [
      ['Variant SKU', 'Matrix child item: itemid', 'Match on SKU or external ID, never on the option labels.'],
      ['Price list record', 'Price level / customer item pricing', 'Generated from NetSuite; never edited in BigCommerce.'],
      ['Order ID', 'Sales order: external ID', 'Retries become updates instead of duplicates.'],
      ['Customer group', 'Customer: price level or category', 'Decide which system assigns a customer to a group.'],
      ['Shipment', 'Item fulfillment: tracking numbers', 'One shipment per fulfillment; partial shipments included.'],
    ],
    gotchas: [
      'Kits sold as one BigCommerce product but stocked as several NetSuite items need the available quantity computed from the components, or the store sells kits it can’t build.',
      'Price lists built by hand in BigCommerce drift from NetSuite price levels; customers then dispute invoices.',
      'Tax calculated by BigCommerce and tax calculated by NetSuite can differ by cents; decide which one the sales order keeps.',
      'Renaming a product in NetSuite can overwrite merchandising copy written in BigCommerce unless descriptions are excluded from the item sync.',
    ],
    whenNotToDoThis:
      'For a retail store with a simple catalog and one warehouse, do not build custom. Use the NetSuite Connector or an integration app, and spend the money on the storefront instead.',
    faqs: [
      {
        q: 'Does NetSuite integrate with BigCommerce?',
        a: 'Yes. Oracle’s NetSuite Connector supports BigCommerce, integration apps and middleware offer prebuilt flows, and both platforms have APIs for a custom integration.',
      },
      {
        q: 'Can BigCommerce show NetSuite customer-specific prices?',
        a: 'Yes, either by generating BigCommerce price lists from NetSuite pricing on a schedule, or by looking up NetSuite prices at runtime. The first is simpler; the second is always current but must be cached carefully to stay fast.',
      },
      {
        q: 'How are BigCommerce variants mapped to NetSuite?',
        a: 'Usually each BigCommerce variant maps to a NetSuite matrix child item by SKU, and the BigCommerce product maps to the matrix parent. Items that are not matrix items in NetSuite need a mapping table.',
      },
    ],
    relatedCaseStudy: null,
    relatedTopics: ['netsuite-shopify-integration', 'netsuite-3pl-integration'],
  },
  {
    slug: 'netsuite-3pl-integration',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite 3PL Integration: Orders, Shipments and Inventory',
    description:
      'How to connect Oracle NetSuite to a third-party logistics warehouse: sending orders, receiving shipment confirmations and tracking, keeping inventory in step, and what it costs by approach.',
    h1: 'NetSuite + 3PL integration: keeping orders and stock in step',
    lede:
      'When a 3PL ships your orders, NetSuite stops seeing the warehouse directly. The integration has to send each order to the 3PL, record what actually shipped, and keep NetSuite’s inventory close enough to the 3PL’s count that sales and purchasing can trust it.',
    estimate: { system: '3pl', records: ['items', 'inventory', 'orders', 'fulfillments'], direction: 'two-way' },
    diagnosis: [
      'A 3PL integration has three loops. Outbound: approved sales orders go to the 3PL as shipping orders, and the 3PL’s shipment confirmations come back as NetSuite item fulfillments with tracking numbers. Inbound: purchase orders or transfer orders are sent as expected receipts, and the 3PL’s receipt confirmations become NetSuite item receipts. Inventory: the 3PL reports what it has on hand, and NetSuite is adjusted or at least compared. Each loop can be built with the 3PL’s API, a file drop, or EDI, depending on what the 3PL supports.',
      'Most 3PL integration problems are about quantities that disagree. The 3PL ships less than ordered, substitutes, splits an order across boxes and days, or counts stock differently after a cycle count. If the integration assumes every order ships complete, NetSuite shows orders as fulfilled that weren’t. Partial fulfillments, backorders and cancellations need defined handling from the start, and the inventory loop should report differences rather than silently overwrite NetSuite.',
      'Units of measure, lot and serial numbers, and which NetSuite location represents the 3PL are the details that decide whether the first month goes well. A 3PL that counts in eaches while NetSuite sells in cases, or that tracks lots NetSuite does not, will produce adjustments every day until the mapping is fixed.',
    ],
    decisionTable: [
      { option: 'The 3PL’s own NetSuite connector', bestFor: 'A 3PL with a maintained NetSuite integration and standard order flows.', tradeoff: 'You depend on the 3PL’s roadmap and support for fixes.' },
      { option: 'EDI (940/945, 943/944, 846) through an EDI provider', bestFor: 'Larger 3PLs that work in EDI already.', tradeoff: 'Per-document fees and partner-specific maps.' },
      { option: 'Custom (3PL API or SFTP files + NetSuite RESTlets)', bestFor: 'API-first 3PLs, several warehouses, or rules about splitting orders across locations.', tradeoff: 'You own retries, alerts and reconciliation.' },
    ],
    fieldMapping: [
      ['Shipping order (EDI 940)', 'Sales order (approved, pending fulfillment)', 'Send once per order, keyed by the sales order number.'],
      ['Shipment confirmation (EDI 945)', 'Item fulfillment + tracking', 'Create one fulfillment per shipment; allow partials.'],
      ['Receipt advice (EDI 944)', 'Item receipt on the PO or transfer order', 'Record received quantities, not expected ones.'],
      ['Inventory snapshot (EDI 846)', 'Inventory at the 3PL location', 'Compare and report differences before adjusting.'],
      ['3PL unit of measure', 'Item: units type', 'Convert explicitly; never assume eaches.'],
    ],
    gotchas: [
      'Sending orders to the 3PL before they are approved or paid means the 3PL ships orders that finance later cancels.',
      'Overwriting NetSuite inventory with the 3PL’s count every night hides shrinkage and receiving errors instead of surfacing them.',
      'Shipment confirmations that arrive twice (a resend after a timeout) create duplicate fulfillments unless each one carries an ID the integration checks.',
      'Cutoff times matter: orders sent after the 3PL’s daily cutoff ship tomorrow, which customers notice before the integration does.',
    ],
    whenNotToDoThis:
      'If the 3PL already offers a supported NetSuite integration that handles partial shipments and returns, use it. Build custom only for the gaps, such as a second warehouse, a marketplace’s rules or reporting the connector lacks.',
    faqs: [
      {
        q: 'How do 3PLs integrate with NetSuite?',
        a: 'Through the 3PL’s own NetSuite connector, through EDI documents (940 shipping orders, 945 shipment advice, 944 receipts, 846 inventory) sent via an EDI provider, or through a custom integration between the 3PL’s API or SFTP files and NetSuite.',
      },
      {
        q: 'Should NetSuite inventory be overwritten by the 3PL’s count?',
        a: 'Usually not automatically. Compare the 3PL’s on-hand quantities with NetSuite, post adjustments for differences after review, and investigate repeat differences. Silent overwrites hide receiving and picking errors.',
      },
      {
        q: 'How is a 3PL represented in NetSuite?',
        a: 'As a location. Orders fulfilled from that location are sent to the 3PL, and inventory at that location should match what the 3PL reports.',
      },
    ],
    relatedCaseStudy: null,
    relatedTopics: ['netsuite-edi-integration', 'netsuite-shopify-integration'],
  },
  {
    slug: 'netsuite-edi-integration',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite EDI Integration: Retailer Orders, ASNs and Invoices',
    description:
      'How EDI works with Oracle NetSuite: the 850, 855, 856 and 810 documents, full-service EDI providers versus building your own, retailer certification, and the mistakes that cause chargebacks.',
    h1: 'NetSuite EDI integration: trading with retailers without retyping',
    lede:
      'Large retailers and distributors send purchase orders and expect advance ship notices and invoices back as EDI documents, on their schedule and in their format. A NetSuite EDI integration turns those documents into sales orders and sends the replies from NetSuite’s fulfillments and invoices.',
    estimate: { system: 'edi', records: ['items', 'orders', 'fulfillments', 'invoices'], direction: 'two-way' },
    diagnosis: [
      'The core cycle for a supplier is short: the retailer sends an 850 purchase order, you may reply with an 855 acknowledgment, you ship and send an 856 advance ship notice, and you bill with an 810 invoice. Every document gets a 997 functional acknowledgment. Many retailers also want 846 inventory updates. In NetSuite terms, the 850 becomes a sales order, the 856 is built from the item fulfillment, and the 810 from the invoice.',
      'The hard part is that every trading partner has its own implementation guide. Two retailers both sending an 850 will use different segments, different item identifiers (UPC, their own item number, your SKU) and different rules about what the ASN must contain. The 856 is the strictest: it often has to describe every carton and its contents, with GS1-128 carton labels that match. Late or wrong ASNs lead to chargebacks, which can cost more than the integration.',
      'For that reason most NetSuite users work with a full-service EDI provider that keeps the partner maps, runs the connection to each retailer and handles certification testing. The integration work on the NetSuite side is mapping the provider’s documents to sales orders, fulfillments and invoices, and making sure the data the ASN needs, such as carton contents, exists in NetSuite before shipping.',
    ],
    decisionTable: [
      { option: 'Full-service EDI provider with a NetSuite integration (e.g. SPS Commerce, TrueCommerce)', bestFor: 'Most suppliers: the provider maintains each retailer’s map and certification.', tradeoff: 'Per-partner and per-document fees for as long as you trade.' },
      { option: 'EDI translator or VAN + your own mapping', bestFor: 'Teams with EDI knowledge and many partners.', tradeoff: 'You maintain every partner map and run certification yourselves.' },
      { option: 'Custom NetSuite side on top of a provider', bestFor: 'Carton-level ASNs, kits, or rules the provider’s NetSuite app does not cover.', tradeoff: 'Two systems to monitor: the provider and your code.' },
    ],
    fieldMapping: [
      ['850 purchase order', 'Sales order', 'Retailer PO number as external ID; reject duplicates.'],
      ['850 item identifier (UPC / buyer part no.)', 'Item: UPC or cross-reference', 'Keep a per-partner cross-reference for buyer item numbers.'],
      ['856 advance ship notice', 'Item fulfillment + package/carton data', 'Carton contents must be recorded before the ASN is sent.'],
      ['810 invoice', 'Invoice', 'Prices must match the PO, or the retailer short-pays.'],
      ['997 functional acknowledgment', '(provider log)', 'Alert on missing 997s; a silent failure means a missed chargeback window.'],
    ],
    gotchas: [
      'Each retailer certifies your documents before going live, and testing often takes weeks on their schedule, not yours. Plan the timeline around it.',
      'ASNs built from what was ordered instead of what was packed cause receiving errors at the retailer and chargebacks.',
      'Price differences between the PO and your NetSuite price levels must be resolved before invoicing; invoicing your price instead of theirs leads to deductions.',
      'Item cross-references kept in a spreadsheet instead of NetSuite break the first time someone adds a new product for one retailer.',
    ],
    whenNotToDoThis:
      'If you have one EDI partner and low volume, a web EDI portal from a provider, where someone keys documents by hand, can be cheaper than integrating. Integrate when the order count or the chargebacks make manual entry the larger cost.',
    faqs: [
      {
        q: 'Does NetSuite support EDI?',
        a: 'NetSuite does not include an EDI translator, so most companies use an EDI provider with a NetSuite integration, which turns EDI documents into NetSuite transactions and back.',
      },
      {
        q: 'Which EDI documents do suppliers need?',
        a: 'Most retailers require the 850 purchase order, 856 advance ship notice and 810 invoice, plus 997 acknowledgments. Some also require the 855 order acknowledgment, 846 inventory and 860 PO changes.',
      },
      {
        q: 'How long does a NetSuite EDI integration take?',
        a: 'The NetSuite mapping is often a few weeks. The total depends on each trading partner’s certification testing, which runs on the retailer’s schedule and is usually the longest step.',
      },
    ],
    relatedCaseStudy: null,
    relatedTopics: ['netsuite-3pl-integration', 'netsuite-restlet-vs-rest-api'],
  },
  {
    slug: 'suiteql-vs-saved-search',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'SuiteQL vs Saved Search: Which to Use in NetSuite',
    description:
      'When to use SuiteQL and when a NetSuite saved search is the better tool: joins, performance, permissions, the N/query module and REST endpoint, and the field-name traps that slow teams down.',
    h1: 'SuiteQL vs saved search: picking the right NetSuite query tool',
    lede:
      'Saved searches are NetSuite’s point-and-click reports that anyone with the right role can build, share and schedule. SuiteQL is SQL over the same data, for developers and integrations. Most accounts need both: saved searches for people, SuiteQL for code.',
    diagnosis: [
      'Saved searches are built in the UI and live inside NetSuite: they power dashboards, reminders, scheduled emails, workflow conditions and lists that users filter themselves. Their limits show up in code. Joins are limited to the relationships the search type exposes, aggregating across several record types usually means several searches, and the result columns are defined by the search rather than by the code calling it, so someone editing a saved search in the UI can break an integration that reads it.',
      'SuiteQL is a SQL dialect over NetSuite’s analytics data source. It can join any tables the records catalog exposes, group and aggregate in one query, and lives in the code that uses it, so it is versioned and reviewed with the integration. It runs in SuiteScript through the N/query module, from outside NetSuite through the REST web services SuiteQL endpoint, and through SuiteAnalytics Connect if your account has it. It respects the permissions of the role that runs it.',
      'The learning curve is the schema. SuiteQL uses the analytics table and field names, which are not the labels in the UI and are not always the same as saved search field IDs. Transactions live in one transaction table with lines in transactionline, and many list fields return internal IDs unless you ask for display values with BUILTIN.DF. Teams that start with the Records Catalog (Setup > Records Catalog) and test queries in a small tool or script save a lot of trial and error.',
    ],
    decisionTable: [
      { option: 'Saved search', bestFor: 'Reports users read, filter and schedule; dashboard portlets; workflow conditions.', tradeoff: 'Editable in the UI, so code depending on it can break; limited joins.' },
      { option: 'SuiteQL in SuiteScript (N/query)', bestFor: 'Server-side logic, RESTlets and scheduled scripts that need joins or aggregates.', tradeoff: 'Requires knowing the analytics schema.' },
      { option: 'SuiteQL via REST web services', bestFor: 'Integrations and portals reading data from outside NetSuite.', tradeoff: 'Paged results and account concurrency limits shape how much you can pull at once.' },
    ],
    codeSnippet: `/**
 * @NApiVersion 2.1
 */
define(['N/query'], (query) => {
  // Last 30 days of sales orders with the customer's name.
  const sql = \`
    SELECT t.tranid, t.trandate, BUILTIN.DF(t.entity) AS customer, t.foreigntotal
    FROM transaction t
    WHERE t.type = 'SalesOrd'
      AND t.trandate >= SYSDATE - 30
    ORDER BY t.trandate DESC\`;

  const recentOrders = () => {
    const paged = query.runSuiteQLPaged({ query: sql, pageSize: 1000 });
    const rows = [];
    paged.pageRanges.forEach((range) => {
      rows.push(...paged.fetch({ index: range.index }).data.asMappedResults());
    });
    return rows;
  };

  return { recentOrders };
});`,
    gotchas: [
      'Integrations that read a saved search by ID break when someone adds a filter or renames a column in the UI. Use SuiteQL in code, or lock the search down.',
      'SuiteQL returns internal IDs for list and record fields; use BUILTIN.DF(field) when you need the display value.',
      'Line-level queries need the main line excluded or included deliberately (transactionline.mainline), or totals are counted twice.',
      'Pulling large result sets in one go hits governance or time limits; use the paged APIs and narrow by date.',
    ],
    whenNotToDoThis:
      'Do not rewrite working saved searches into SuiteQL for their own sake. If people use a report in the UI, a saved search is the right tool; reach for SuiteQL when code needs the data.',
    faqs: [
      {
        q: 'What is SuiteQL?',
        a: 'SuiteQL is a SQL query language for NetSuite data, based on SQL-92 with some Oracle SQL syntax. It can be run in SuiteScript with the N/query module, through the REST web services SuiteQL endpoint, or through SuiteAnalytics Connect.',
      },
      {
        q: 'Is SuiteQL faster than a saved search?',
        a: 'Often for queries that would otherwise need several saved searches, because one SuiteQL query can join and aggregate across tables. For simple lists, the difference is small; the bigger benefit is that the query lives in versioned code.',
      },
      {
        q: 'Where do I find SuiteQL table and field names?',
        a: 'In the Records Catalog (Setup > Records Catalog), which lists each record’s fields and joins for the analytics data source that SuiteQL reads.',
      },
    ],
    relatedCaseStudy: null,
    relatedTopics: ['netsuite-restlet-vs-rest-api', 'netsuite-customer-portal'],
  },
  {
    slug: 'netsuite-restlet-vs-rest-api',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite RESTlet vs REST API (SuiteTalk REST): Which to Use',
    description:
      'When to build a NetSuite RESTlet and when to use SuiteTalk REST web services: control over the contract, governance, authentication, idempotency, and a RESTlet example that cannot create duplicate orders.',
    h1: 'NetSuite RESTlet vs SuiteTalk REST: choosing an integration API',
    lede:
      'SuiteTalk REST web services give you standard create, read, update and delete on NetSuite records plus a SuiteQL endpoint. A RESTlet is your own SuiteScript endpoint with whatever contract you design. Use REST for plain record access; use a RESTlet when one call must do several things in NetSuite.',
    diagnosis: [
      'SuiteTalk REST web services expose NetSuite records at standard URLs, with metadata describing each record and its fields, including custom ones. For an integration that reads and writes ordinary records, this means no NetSuite-side code to deploy and maintain. It also offers the SuiteQL endpoint, which is often the simplest way for an outside system to read data. Its limits are that each call does one thing, the record shape is NetSuite’s rather than yours, and business rules have to live in the caller.',
      'A RESTlet is a SuiteScript server script with get, post, put and delete entry points. The caller sends whatever payload you define, and the script can look up, validate, create several records and return a shaped response in one call. That makes RESTlets a good fit for idempotent order creation, for hiding NetSuite’s record structure from a portal or partner, and for logic that must run inside NetSuite. The cost is code you own: it needs deployment, tests and someone who knows SuiteScript.',
      'Both count against your account’s concurrency limit, both support token-based authentication and OAuth 2.0, and both run as a NetSuite role whose permissions decide what they can do. A RESTlet also has a governance budget per call, so a script that loops over many records has to be written with that in mind. Many integrations end up using both: REST for simple reads and lookups, a RESTlet for the writes that need rules.',
    ],
    decisionTable: [
      { option: 'SuiteTalk REST web services', bestFor: 'Reading and writing standard and custom records; SuiteQL queries from outside NetSuite.', tradeoff: 'One record per call; your rules live in the caller.' },
      { option: 'RESTlet', bestFor: 'Multi-step writes, idempotent order creation, a stable contract for a portal or partner.', tradeoff: 'SuiteScript to deploy, test and maintain; per-call governance.' },
      { option: 'SOAP web services', bestFor: 'Existing integrations already built on it.', tradeoff: 'Oracle directs new integrations to REST; avoid it for new work.' },
    ],
    codeSnippet: `/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/search'], (record, search) => {
  // Creates a sales order once per external ID. A retry after a timeout
  // returns the existing order instead of creating a duplicate.
  const post = (body) => {
    const existing = search.create({
      type: search.Type.SALES_ORDER,
      filters: [['externalid', 'anyof', body.externalId], 'AND', ['mainline', 'is', 'T']],
    }).run().getRange({ start: 0, end: 1 });
    if (existing.length) return { id: existing[0].id, created: false };

    const order = record.create({ type: record.Type.SALES_ORDER, isDynamic: true });
    order.setValue({ fieldId: 'entity', value: body.customerId });
    order.setValue({ fieldId: 'externalid', value: body.externalId });
    body.lines.forEach((line) => {
      order.selectNewLine({ sublistId: 'item' });
      order.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: line.itemId });
      order.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: line.quantity });
      order.commitLine({ sublistId: 'item' });
    });
    return { id: order.save(), created: true };
  };

  return { post };
});`,
    gotchas: [
      'Writes without an external ID or another idempotency key turn every client retry after a timeout into a duplicate record.',
      'User event scripts and workflows on the target record run on integration writes too; a slow one makes every API call slow.',
      'Integration roles with Administrator access work in testing and become a security problem in production. Give the integration its own role with only the permissions it needs.',
      'Concurrency is shared by every integration in the account, so a bulk sync can starve the storefront’s order calls unless it is throttled.',
    ],
    whenNotToDoThis:
      'Don’t write a RESTlet to wrap a single record read or update that REST web services already do; it adds code to maintain without adding anything the caller needs.',
    faqs: [
      {
        q: 'What is a NetSuite RESTlet?',
        a: 'A RESTlet is a SuiteScript server script exposed as an HTTP endpoint. You define the request and response, and the script can read and write any records its role allows.',
      },
      {
        q: 'What is SuiteTalk REST?',
        a: 'SuiteTalk REST web services are NetSuite’s standard REST API for records, with metadata for each record type and a SuiteQL query endpoint. The REST Web Services feature must be enabled in the account.',
      },
      {
        q: 'Should new NetSuite integrations use SOAP?',
        a: 'No. Oracle directs new integrations to REST web services and RESTlets. Existing SOAP integrations keep working on the endpoint versions they use but should be planned for migration.',
      },
    ],
    relatedCaseStudy: null,
    relatedTopics: ['suiteql-vs-saved-search', 'netsuite-customer-portal'],
  },
  {
    slug: 'netsuite-customer-portal',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'NetSuite Customer Portal: Customer Center, SuiteCommerce or Custom',
    description:
      'The ways to give customers a NetSuite portal for orders, invoices and payments: the built-in Customer Center, SuiteCommerce My Account, portal apps, and a custom portal, with what each costs and where each falls short.',
    h1: 'NetSuite customer portal: four ways to let customers serve themselves',
    lede:
      'Customers want to see their orders, download invoices, pay balances and reorder without emailing your team. NetSuite can offer that through its built-in Customer Center, through SuiteCommerce My Account, through third-party portal apps, or through a custom portal that reads NetSuite data.',
    diagnosis: [
      'The built-in Customer Center role lets customers log in to NetSuite itself and see their transactions. It costs little to turn on, but customers see NetSuite’s interface, branding options are limited, and anything beyond viewing records and paying invoices takes customization. It suits a small number of customers who mainly need statements and invoice copies.',
      'SuiteCommerce My Account comes with SuiteCommerce and gives customers a branded account area for orders, invoices, returns and payments, extendable through SuiteCommerce extensions. It is the natural choice if you already run your storefront on SuiteCommerce. Portal apps from third parties sit in between: faster to launch than custom, with the vendor’s feature set and licensing.',
      'A custom portal is a web application, for example in Next.js, that authenticates customers itself and reads and writes NetSuite data through RESTlets, REST web services and SuiteQL. It is the most work and the most freedom: it can combine NetSuite data with other systems, match your brand and workflows exactly, and serve dealers or branches with their own rules. The design work is in caching, so the portal is fast without spending NetSuite concurrency on every page view, and in security, so a customer can only ever see their own records.',
    ],
    decisionTable: [
      { option: 'Customer Center (built in)', bestFor: 'A few customers who need invoices, statements and payments.', tradeoff: 'NetSuite’s own interface; little room for custom workflows.' },
      { option: 'SuiteCommerce My Account', bestFor: 'Stores already on SuiteCommerce.', tradeoff: 'Requires SuiteCommerce; customization through its extension framework.' },
      { option: 'Portal app', bestFor: 'Standard portal features quickly, without a storefront.', tradeoff: 'Vendor licensing and feature set.' },
      { option: 'Custom portal (Next.js + RESTlets/SuiteQL)', bestFor: 'Dealer and B2B portals, data from several systems, custom quoting or reordering.', tradeoff: 'The largest build, and it needs an owner.' },
    ],
    fieldMapping: [
      ['Portal login', 'Customer or contact internal ID', 'Resolved on the server from the session, never sent by the browser.'],
      ['Open orders', 'Sales orders + item fulfillments', 'Status and tracking from fulfillments, not the order.'],
      ['Invoices', 'Invoices: amount remaining, due date', 'PDFs rendered in NetSuite (N/render) and cached.'],
      ['Pay a balance', 'Customer payment applied to invoices', 'Take the card with your payment processor; record the payment once.'],
      ['Reorder', 'New sales order from past lines', 'Re-price at today’s price level, not the old order’s.'],
    ],
    gotchas: [
      'Passing the customer ID from the browser to the API lets anyone change it and read another customer’s invoices. Resolve it on the server from the session.',
      'Reading NetSuite live on every page view runs into concurrency limits as soon as customers log in at the same time; cache what can be stale for minutes.',
      'Contacts who leave a customer company must lose portal access; tie portal accounts to NetSuite contacts and check them on login.',
      'Invoice PDFs rendered on demand are slow; render on creation or cache the first render.',
    ],
    whenNotToDoThis:
      'If customers mainly ask for invoice copies and statements, turn on Customer Center or email statements automatically before building a portal. Build custom when the portal is part of how customers buy from you.',
    faqs: [
      {
        q: 'Does NetSuite have a customer portal?',
        a: 'Yes. The Customer Center role gives customers access to their own records inside NetSuite, and SuiteCommerce includes My Account. Third-party portal apps and custom portals are the other options.',
      },
      {
        q: 'Can customers pay invoices in a NetSuite portal?',
        a: 'Yes. Customer Center and SuiteCommerce My Account support invoice payment with a configured payment processor, and a custom portal can take payment through your processor and record a customer payment in NetSuite.',
      },
      {
        q: 'How does a custom portal stay in sync with NetSuite?',
        a: 'It reads NetSuite through RESTlets, REST web services or SuiteQL, caches data that can be minutes old, reads balances and inventory closer to real time, and writes orders and payments back through idempotent API calls.',
      },
    ],
    relatedCaseStudy: 'total-warehouse-netsuite-digital-showroom',
    relatedTopics: ['netsuite-restlet-vs-rest-api', 'suiteql-vs-saved-search'],
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
