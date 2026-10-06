// The NetSuite Integration Readiness Checklist (the site's lead magnet),
// rendered at /netsuite/integration-readiness-checklist/.
// TODO(owner): this is a starting draft. Replace or sharpen items with the
// checks you actually run at the start of an engagement.

export const checklist = [
  {
    section: 'Scope and ownership',
    items: [
      'Every system that will read from or write to NetSuite is listed, including spreadsheets and manual imports.',
      'Each record type (items, customers, sales orders, fulfillments, invoices) has one system named as its source of truth.',
      'Sync direction is decided per record type: one-way, two-way, or write-once.',
      'A named person owns the integration after launch, and knows they do.',
      'Your NetSuite partner and your integration developer know who changes scripts, roles, and custom records.',
    ],
  },
  {
    section: 'Data model',
    items: [
      'Item structure is settled: matrix items, kits, assemblies, and how variants map to the other system.',
      'Custom fields and custom records the integration depends on are documented with their internal IDs.',
      'Units of measure, currencies, and subsidiaries are mapped explicitly, not assumed.',
      'Customer and address matching rules are defined, so duplicates are not created on every sync.',
      'Pricing logic (price levels, customer-specific pricing, quantity breaks) is written down in one place.',
      'External IDs are set on synced records so both sides can find each other without guessing.',
    ],
  },
  {
    section: 'Freshness and volume',
    items: [
      'You know how fresh each data type must be: seconds, minutes, or daily.',
      'Peak volumes are estimated, including seasonal spikes and bulk catalog updates.',
      'The design fits within your account’s API concurrency limit for your service tier.',
      'Long-running work runs in scheduled or map/reduce scripts, not in user-event scripts that slow down saves.',
      'Saved searches or SuiteQL queries used by the integration have been tested at production data volume.',
    ],
  },
  {
    section: 'Failure handling',
    items: [
      'Every failed sync lands somewhere visible: an error queue, a report, or an alert, not just a log file.',
      'Writes are idempotent, so a retry cannot create a duplicate order or payment.',
      'There is a documented way to replay a failed record after fixing the cause.',
      'Someone is notified when the integration stops running entirely, not only when a record fails.',
      'You have decided what customers see when NetSuite is slow or unavailable.',
    ],
  },
  {
    section: 'Security and access',
    items: [
      'The integration uses a dedicated role and token-based authentication, not a person’s login.',
      'That role has only the permissions the integration needs.',
      'Credentials live in a secrets manager or environment configuration, never in code or shared documents.',
      'Access can be revoked for a vendor without breaking anything else.',
    ],
  },
  {
    section: 'Testing and launch',
    items: [
      'A sandbox account is available and reasonably close to production.',
      'Test cases cover edge cases: partial shipments, returns, backorders, and price changes mid-order.',
      'Initial data load and ongoing sync are planned as separate jobs.',
      'There is a rollback plan and a cutover checklist with named owners.',
      'Success is defined in numbers before launch, such as sync lag, error rate, and orders needing manual touch.',
    ],
  },
];

export const checklistCount = checklist.reduce((n, s) => n + s.items.length, 0);
