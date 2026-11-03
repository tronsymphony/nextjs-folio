import { Boxes, Plug, Store } from 'lucide-react';

// The three core NetSuite offers, shown on the homepage and the /netsuite/ hub.
export const offers = [
  {
    icon: Plug,
    title: 'Integrations that stay in sync',
    body: 'Connecting NetSuite to Shopify, BigCommerce, 3PLs, EDI partners, CRMs, and internal tools through SuiteTalk REST, RESTlets, SuiteQL, or middleware like Celigo, with error handling and retry logic that tells you when something fails instead of failing silently.',
  },
  {
    icon: Boxes,
    title: 'Customer and dealer portals',
    body: 'Self-service portals where customers check order status, reorder, see their own pricing, download invoices, and request quotes against real ERP data, so your team stops answering the same email all day.',
  },
  {
    icon: Store,
    title: 'ERP-connected storefronts and showrooms',
    body: 'Fast, custom Next.js front ends that read catalog, inventory, and pricing from NetSuite. For when SuiteCommerce can’t do what you need, or your catalog deserves better than a theme.',
  },
];
