// NetSuite integration scope estimator: a pure function from answers to a
// scope brief. Everything tunable lives in CONFIG so the methodology is
// visible and adjustable in one place.
//
// TODO(owner): calibrate HOURS and RATE against your own past projects.

export const CONFIG = {
  RATE: { low: 150, high: 200 }, // USD per hour
  DISCOVERY: { base: [16, 24], perSystem: [4, 8] },
  // Build hours per connected system, by approach.
  PER_SYSTEM: {
    connector: [8, 20],
    middleware: [24, 48],
    custom: [60, 120],
  },
  // Extra build hours per record type per system, by approach.
  PER_RECORD: {
    connector: [1, 2],
    middleware: [2, 5],
    custom: [4, 10],
  },
  FRONT_END: [120, 240], // a customer portal or storefront on NetSuite data
  MULTIPLIERS: {
    twoWay: 1.4,
    freshness: { daily: 1, hourly: 1.05, realtime: 1.2 },
    volume: { low: 1, medium: 1.1, high: 1.25 },
    customizations: { none: 1, some: 1.1, heavy: 1.25 },
  },
  TESTING_SHARE: 0.2, // testing, cutover, and documentation as a share of build
  HOURS_PER_WEEK: 30,
};

export const SYSTEMS = [
  { id: 'shopify', label: 'Shopify' },
  { id: 'bigcommerce', label: 'BigCommerce / other storefront' },
  { id: '3pl', label: '3PL / warehouse system' },
  { id: 'edi', label: 'EDI trading partners' },
  { id: 'crm', label: 'CRM (Salesforce, HubSpot)' },
  { id: 'internal', label: 'Internal tool or database' },
];

export const RECORDS = [
  { id: 'items', label: 'Items & catalog' },
  { id: 'inventory', label: 'Inventory levels' },
  { id: 'pricing', label: 'Pricing & price levels' },
  { id: 'customers', label: 'Customers' },
  { id: 'orders', label: 'Sales orders' },
  { id: 'fulfillments', label: 'Fulfillments & tracking' },
  { id: 'invoices', label: 'Invoices & payments' },
];

export const DEFAULT_ANSWERS = {
  systems: ['shopify'],
  records: ['items', 'inventory', 'orders', 'fulfillments'],
  direction: 'two-way',
  volume: 'medium',
  freshness: 'hourly',
  approach: 'unsure',
  customizations: 'some',
  frontEnd: false,
};

const range = ([lo, hi], n = 1) => [lo * n, hi * n];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const scale = (r, m) => [r[0] * m, r[1] * m];

function approachRange(table, approach) {
  // "Not sure" spans the cheapest sensible option to the most involved one.
  return approach === 'unsure' ? [table.middleware[0], table.custom[1]] : table[approach];
}

const roundTo = (n, step) => Math.round(n / step) * step;

export function estimate(answers) {
  const a = { ...DEFAULT_ANSWERS, ...answers };
  const systemCount = a.systems.length;
  const recordCount = a.records.length;
  const { MULTIPLIERS: M } = CONFIG;

  if (systemCount === 0 && !a.frontEnd) {
    return { empty: true };
  }

  const discovery = add(CONFIG.DISCOVERY.base, range(CONFIG.DISCOVERY.perSystem, systemCount));

  let integration = add(
    range(approachRange(CONFIG.PER_SYSTEM, a.approach), systemCount),
    range(approachRange(CONFIG.PER_RECORD, a.approach), systemCount * recordCount)
  );
  if (a.direction === 'two-way') integration = scale(integration, M.twoWay);
  integration = scale(integration, M.freshness[a.freshness] * M.volume[a.volume] * M.customizations[a.customizations]);

  const frontEnd = a.frontEnd ? scale(CONFIG.FRONT_END, M.customizations[a.customizations]) : [0, 0];
  const build = add(integration, frontEnd);
  const testing = scale(build, CONFIG.TESTING_SHARE);
  const hours = add(add(discovery, build), testing).map(Math.round);

  const cost = [roundTo(hours[0] * CONFIG.RATE.low, 500), roundTo(hours[1] * CONFIG.RATE.high, 500)];
  const weeks = [Math.max(1, Math.ceil(hours[0] / CONFIG.HOURS_PER_WEEK)), Math.max(1, Math.ceil(hours[1] / CONFIG.HOURS_PER_WEEK))];

  const phases = [
    { name: 'Discovery & integration design', hours: discovery.map(Math.round) },
    systemCount > 0 && { name: `Integration build (${systemCount} system${systemCount > 1 ? 's' : ''})`, hours: integration.map(Math.round) },
    a.frontEnd && { name: 'Customer portal / storefront', hours: frontEnd.map(Math.round) },
    { name: 'Testing, cutover & documentation', hours: testing.map(Math.round) },
  ].filter(Boolean);

  const systemLabels = SYSTEMS.filter((s) => a.systems.includes(s.id)).map((s) => s.label);
  const recordLabels = RECORDS.filter((r) => a.records.includes(r.id)).map((r) => r.label.toLowerCase());
  const surface = systemLabels.map(
    (label) => `NetSuite ${a.direction === 'two-way' ? '⇄' : '→'} ${label}: ${recordLabels.join(', ') || 'records to be defined'}`
  );
  if (a.frontEnd) surface.push('Customer-facing application reading NetSuite data');

  return { empty: false, hours, cost, weeks, phases, surface, risks: risks(a), recommendation: recommendation(a) };
}

function risks(a) {
  const out = [];
  const has = (id) => a.records.includes(id);
  if (a.direction === 'two-way' && (has('customers') || has('items') || has('pricing'))) {
    out.push('Two-way sync of master data needs a single owner per field, or the systems will overwrite each other.');
  }
  if (has('inventory') && a.systems.length > 1) {
    out.push('Inventory shared across several channels risks overselling unless one system allocates stock.');
  }
  if (a.freshness === 'realtime' && a.volume !== 'low') {
    out.push('Real-time sync at this volume will press against your account’s API concurrency limit; plan for queuing.');
  }
  if (a.customizations === 'heavy') {
    out.push('Existing user-event and workflow scripts may fire on integration writes. Review them before building.');
  }
  if (a.systems.includes('edi')) {
    out.push('EDI trading partners run their own certification testing, which often sets the real timeline.');
  }
  if (a.approach === 'connector' && (a.frontEnd || a.customizations === 'heavy')) {
    out.push('An off-the-shelf connector rarely survives heavy customization or a custom front end.');
  }
  if (has('orders') || has('invoices')) {
    out.push('Order and payment writes must be idempotent so a retry can never create a duplicate.');
  }
  return out;
}

function recommendation(a) {
  if (a.approach === 'unsure') {
    return 'The wide range comes from not knowing the approach yet. Choosing between a connector, middleware, and custom code is the single biggest cost decision, and exactly what the audit settles.';
  }
  if (a.customizations === 'heavy' || a.systems.length >= 3) {
    return 'With this many moving parts, an audit before building will likely save more than it costs: it surfaces the scripts and data conflicts that cause overruns.';
  }
  return 'This looks like a well-bounded project. A short audit will confirm the scope and turn this range into a fixed price.';
}
