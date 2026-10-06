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
    `> ${SITE_NAME} is the practice of ${PERSON.name}, a ${PERSON.location}-based software engineer with ${PERSON.yearsExperience} years of experience. It builds Oracle NetSuite integrations, customer and dealer portals, and ERP-connected storefronts using Next.js, React, and Angular.`,
    '',
    '## Services',
    '',
    `- [${audit.name}](${SITE_URL}/netsuite-audit/): fixed-scope, ${audit.durationDays}-business-day review of every system connected to NetSuite, delivered as a written findings report and prioritized remediation plan. Price: ${price(audit.price)}.`,
    `- [${appAudit.name}](${SITE_URL}/ai-app-audit/): fixed-scope, ${appAudit.durationDays}-business-day security and production-readiness review of an app built with AI coding tools (Lovable, Bolt, Cursor, Replit, v0, Claude Code). Price: ${price(appAudit.price)}.`,
    `- [SEO & search marketing](${SITE_URL}/seo/): technical SEO, pages built from a client's own data, content marketing planned from Google Search Console and Semrush, and lead capture, implemented in the site's code. No paid ads or social media. Price: quoted on request.`,
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
    `- Email: ${PERSON.email}`,
    `- [LinkedIn](${PERSON.linkedin})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
