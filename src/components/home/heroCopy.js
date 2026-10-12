// Words and facts shared by the homepage heroes and the homepage's lines of
// work, so every hero variant says the same thing.
import { offers } from "../../data/netsuiteOffers";
import { OFFERS, PERSON, formatUSD } from "../../lib/site";

export const HERO_INTRO =
  "I connect AI assistants like Claude and ChatGPT to the tools your business runs on, turn public and private data into maps and pages people search for, and build the integrations that keep your systems in sync. You work with me directly, from the first call to launch.";

export const heroFacts = [
  [`${PERSON.yearsExperience} yrs`, "Software engineering"],
  ["Free", "30-minute call to start"],
  ["1 engineer", "From first call to launch"],
];

const auditDetail = (o, fallback) =>
  [o.durationDays && `${o.durationDays} business days`, o.price ? `${formatUSD(o.price)} flat` : fallback].filter(Boolean).join(" · ");

// The three lines of work on the homepage, AI integrations first (NetSuite is one system among several, not the lead).
export const LINES = [
  {
    id: "ai",
    title: "AI connected to your tools",
    body: "Claude, ChatGPT and agents connected to Shopify, HubSpot, QuickBooks, NetSuite or your own database through MCP, with each one limited to the data and actions you allow. Apps already built with Lovable, Bolt or Cursor get a security review before real users arrive.",
    symptoms: [
      "Your team copies answers out of five systems that an assistant could look up.",
      "You want AI on your business data, but not with full access to everything.",
      "An app built with AI tools is about to take real users or payments.",
    ],
    start: "Free 30-minute call",
    startDetail: "Then a fixed quote for one workflow",
    links: [
      ["/call/", "Book the call"],
      ["/ai-app-audit/", "The app audit"],
    ],
  },
  {
    id: "data",
    title: "Data products and maps",
    body: "Public records and your own data turned into interactive maps and pages that answer what people search for, on Google and in AI answers. Safe Streets Map is one: California crash records as maps and a thousand city pages.",
    symptoms: [
      "You hold data people would search for, but it sits in spreadsheets or PDFs.",
      "You want a map people can explore, not a static chart.",
      "Search Console shows impressions but few clicks.",
    ],
    start: OFFERS.seoAudit.name,
    startDetail: auditDetail(OFFERS.seoAudit, "Quoted on a call"),
    links: [
      ["/work/safe-streets-map-crash-data-platform/", "Safe Streets Map"],
      ["/seo/", "SEO and AI search"],
    ],
  },
  {
    id: "integrations",
    title: "Systems that talk to each other",
    body: "ERP, storefront, CRM, EDI trading partners and 3PLs kept in sync: NetSuite, Shopify, Salesforce, HubSpot and BigCommerce, plus portals that read live data.",
    symptoms: [
      "Customers email to ask about stock, pricing and order status your systems already know.",
      "Your storefront shows inventory that doesn't match the ERP.",
      "An integration someone built years ago breaks, and nobody wants to touch it.",
    ],
    start: OFFERS.audit.name,
    startDetail: auditDetail(OFFERS.audit, "Fixed fee"),
    links: [
      ["/netsuite/", "NetSuite work"],
      ["/edi/", "EDI"],
    ],
  },
];

// Where each NetSuite offer is explained in depth, by position in `offers`.
const OFFER_LINKS = ["/netsuite/", "/netsuite/netsuite-customer-portal/", "/netsuite/material-handling/"];

// Every service as a row (used by the lab's "Index" hero).
export const services = [
  ...offers.map((o, i) => ({ title: o.title, body: o.body, href: OFFER_LINKS[i] || "/netsuite/" })),
  { title: LINES[0].title, body: LINES[0].body, href: "/call/" },
  { title: LINES[1].title, body: LINES[1].body, href: "/seo/" },
];
