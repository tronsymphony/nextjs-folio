import { publishedCaseStudies } from '../../data/caseStudies';
import { publishedTopics } from '../../data/netsuiteTopics';
import { publishedGuides } from '../../data/appAuditGuides';
import { ediDocuments, ediSlug } from '../../data/ediDocuments';
import { OFFERS, PERSON, SITE_NAME, SITE_URL, formatUSD } from '../../lib/site';

// A plain-text summary for LLM crawlers (llmstxt.org), generated from the same
// data as the site so it never drifts. Cheap insurance, not a traffic channel.
export const dynamic = 'force-static';

export function GET() {
  const { audit, appAudit, implementationFrom, retainerFrom } = OFFERS;
  const price = (n, suffix = '') => (n ? `${formatUSD(n)}${suffix}` : 'quoted on request');

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_NAME} is the practice of ${PERSON.name}, a ${PERSON.location}-based software engineer with ${PERSON.yearsExperience} years of experience. It connects AI assistants to business tools, builds data products and maps, and integrates stores, CRMs and ERPs such as Oracle NetSuite.`,
    '',
    '## Services',
    '',
    `- [AI integration](${SITE_URL}/ai-integration/): ChatGPT, Claude and AI agents connected to a business's own tools (Shopify, HubSpot, QuickBooks, NetSuite, databases) through MCP or APIs, limited to the data and actions the business allows. Starts with a free 30-minute call; fixed quote per workflow.`,
    `- [AI document processing](${SITE_URL}/ai-document-processing/): purchase orders, invoices and forms that arrive by email, read by AI, checked against the business's system by code, and saved as drafts for approval.`,
    `- [Sales order automation](${SITE_URL}/sales-order-automation/): customer purchase orders arriving by email, EDI, web store or portal turned into checked sales orders in NetSuite, QuickBooks or Shopify (duplicates, customer, items, price, unit, ship-to, credit and stock checked by code), with exceptions sent to a person.`,
    `- [API integration services](${SITE_URL}/api-integration-services/): custom integrations between stores, CRMs, ERPs, 3PLs and EDI partners, with retries, logs and alerts. The code and mappings belong to the client.`,
    `- [Data products and maps](${SITE_URL}/data-products/): public records (crash, permit, census, weather) and a business's own data turned into interactive maps, searchable pages and data studies, with sources shown and gaps stated. Proof: Safe Streets Map (safestreetsmap.com). Starts with a free 30-minute call; fixed quote for a first version.`,
    `- [${audit.name}](${SITE_URL}/netsuite-audit/): fixed-scope, ${audit.durationDays}-business-day review of every system connected to NetSuite, delivered as a written findings report and prioritized remediation plan. Price: ${price(audit.price)}.`,
    `- [${appAudit.name}](${SITE_URL}/ai-app-audit/): fixed-scope, ${appAudit.durationDays}-business-day security and production-readiness review of an app built with AI coding tools (Lovable, Bolt, Cursor, Replit, v0, Claude Code). Price: ${price(appAudit.price)}.`,
    `- [SEO & AI search](${SITE_URL}/seo/): technical SEO, AI search optimization, pages built from a client's own data, content marketing planned from Google Search Console and Semrush, and lead capture, implemented in the site's code. No paid ads or social media. Price: quoted on request.`,
    `- [AI search optimization](${SITE_URL}/seo/ai-search-optimization/): getting found and cited in ChatGPT, Claude, Perplexity and Google AI Overviews: crawler access, readable HTML, structured data, pages that answer questions, and measuring visits from assistants.`,
    `- [Technical SEO audit](${SITE_URL}/seo/technical-seo-audit/): fixed-scope review of crawling, indexing, rendering, structured data, sitemaps, speed and AI crawler access, traced to the code, with a ranked fix list.`,
    `- [Implementation](${SITE_URL}/pricing/): fixed-scope NetSuite integration and front-end projects. From: ${price(implementationFrom)}.`,
    `- [Retainer](${SITE_URL}/pricing/): ongoing monthly engineering for NetSuite integrations and applications. From: ${price(retainerFrom, ' per month')}.`,
    `- [NetSuite overview](${SITE_URL}/netsuite/): integrations, portals, storefronts, and how to choose between connectors, middleware, and custom code.`,
    `- [Material handling & logistics](${SITE_URL}/netsuite/material-handling/): NetSuite platforms for equipment dealers, warehousing, and industrial distribution.`,
    '',
    '## Case studies',
    '',
    ...publishedCaseStudies().map((cs) => `- [${cs.client}: ${cs.title}](${SITE_URL}/work/${cs.slug}/): ${cs.summary}`),
    '',
    '## Free resources',
    '',
    `- [llms.txt Checker & Generator](${SITE_URL}/tools/llms-txt-checker/): free tool that checks a site's llms.txt against the llmstxt.org format, tests its links and robots.txt for AI crawlers, or drafts one from the sitemap.`,
    `- [NetSuite Integration Cost Estimator](${SITE_URL}/tools/netsuite-integration-estimator/): scope outline, risks, and cost range for a NetSuite integration.`,
    `- [NetSuite Integration Readiness Checklist](${SITE_URL}/netsuite/integration-readiness-checklist/): checks to run before connecting any system to NetSuite.`,
    ...publishedTopics().map((t) => `- [${t.h1}](${SITE_URL}/netsuite/${t.slug}/): ${t.lede}`),
    ...publishedGuides().map((g) => `- [${g.h1}](${SITE_URL}/ai-app-audit/${g.slug}/): ${g.lede}`),
    `- [What is llms.txt, and how to add one](${SITE_URL}/seo/llms-txt/): what the file is, what it does and doesn't do for AI search, and how to add it to Next.js or WordPress.`,
    '',
    '## EDI reference',
    '',
    `- [EDI transaction sets explained](${SITE_URL}/edi/): plain-language reference to the X12 documents suppliers, distributors and 3PLs exchange, and how each maps to NetSuite.`,
    ...ediDocuments.map((d) => `- [EDI ${d.code} ${d.name}](${SITE_URL}/edi/${ediSlug(d.code)}/): ${d.summary}`),
    '',
    '## Contact',
    '',
    `- [Book a free 30-minute review](${SITE_URL}/call/)`,
    `- [Contact form](${SITE_URL}/contact/)`,
    `- [LinkedIn](${PERSON.linkedin})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
