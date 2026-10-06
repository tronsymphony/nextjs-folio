// Words and facts shared by the homepage heroes and the homepage's lines of
// work, so every hero variant says the same thing.
import { offers } from "../../data/netsuiteOffers";
import { OFFERS, PERSON, formatUSD } from "../../lib/site";

export const HERO_INTRO =
  "I connect NetSuite to the rest of your business, audit apps built with AI tools before they take real users, and fix the technical SEO that keeps sites out of search. You work with me directly, from the first call to launch.";

export const heroFacts = [
  [`${PERSON.yearsExperience} yrs`, "Software engineering"],
  ["3", "Fixed-price audits to start with"],
  ["1 engineer", "From first call to launch"],
];

const auditDetail = (o, fallback) =>
  [o.durationDays && `${o.durationDays} business days`, o.price ? `${formatUSD(o.price)} flat` : fallback].filter(Boolean).join(" · ");

// The three lines of work, given equal weight on the homepage.
export const LINES = [
  {
    id: "netsuite",
    title: "NetSuite integrations",
    body: "NetSuite connected to Shopify, EDI trading partners, 3PLs and CRMs, plus customer portals and storefronts that read live ERP data.",
    symptoms: [
      "Customers email to ask about stock, pricing and order status that NetSuite already knows.",
      "Your storefront or portal shows inventory that doesn't match the ERP.",
      "An integration someone built years ago breaks, and nobody wants to touch it.",
    ],
    start: OFFERS.audit.name,
    startDetail: auditDetail(OFFERS.audit, "Fixed fee"),
    links: [
      ["/netsuite/", "NetSuite work"],
      ["/netsuite-audit/", "The audit"],
    ],
  },
  {
    id: "app-audit",
    title: "Audits for apps built with AI",
    body: "A security and production-readiness review of apps built with Lovable, Bolt, Cursor or Claude Code, with a fix plan in order of what matters.",
    symptoms: [
      "Your app is about to take real users or payments.",
      "You're not sure which users can see whose data.",
      "Keys, webhooks and database rules were set up by the AI and never checked.",
    ],
    start: OFFERS.appAudit.name,
    startDetail: auditDetail(OFFERS.appAudit, "Fixed fee"),
    links: [["/ai-app-audit/", "The app audit"]],
  },
  {
    id: "seo",
    title: "SEO and AI search",
    body: "Technical fixes and pages planned from Search Console and Semrush, so customers find you on Google and in ChatGPT, Perplexity and Google's AI answers. Built into the site, not handed over as a report.",
    symptoms: [
      "Pages you need aren't indexed, or compete with each other.",
      "Search Console shows impressions but few clicks.",
      "You don't know what ChatGPT or Google's AI says about your business.",
    ],
    start: OFFERS.seoAudit.name,
    startDetail: auditDetail(OFFERS.seoAudit, "Quoted on a call"),
    links: [
      ["/seo/", "SEO work"],
      ["/seo/ai-search-optimization/", "AI search"],
    ],
  },
];

// Where each NetSuite offer is explained in depth, by position in `offers`.
const OFFER_LINKS = ["/netsuite/", "/netsuite/netsuite-customer-portal/", "/netsuite/material-handling/"];

// Every service as a row (used by the lab's "Index" hero).
export const services = [
  ...offers.map((o, i) => ({ title: o.title, body: o.body, href: OFFER_LINKS[i] || "/netsuite/" })),
  { title: LINES[1].title, body: LINES[1].body, href: "/ai-app-audit/" },
  { title: "SEO and search marketing", body: LINES[2].body, href: "/seo/" },
];
