import { OFFERS, PERSON, SITE_NAME, SITE_URL } from './site';

// Builders for JSON-LD nodes. Keep every entity fact here so there is exactly
// one place to correct it. Only real, verifiable facts belong in these nodes.

export const PERSON_ID = `${SITE_URL}/#person`;
export const ORG_ID = `${SITE_URL}/#organization`;

export const url = (path = '/') => `${SITE_URL}${path}`;

export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: url('/about/'),
    worksFor: { '@id': ORG_ID },
    knowsAbout: PERSON.knowsAbout,
    sameAs: [PERSON.linkedin, PERSON.github],
  };
}

export function organizationNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: url('/images/logo.png'),
    description:
      'Oracle NetSuite integration and custom front-end engineering: customer portals, ERP-connected storefronts, and integration audits.',
    founder: { '@id': PERSON_ID },
    telephone: PERSON.telephone,
    email: PERSON.email,
    areaServed: ['United States'],
    address: { '@type': 'PostalAddress', addressLocality: 'Los Angeles', addressRegion: 'CA', addressCountry: 'US' },
    sameAs: [PERSON.linkedin, PERSON.github],
  };
}

export function auditServiceNode() {
  const { audit } = OFFERS;
  const node = {
    '@type': 'Service',
    '@id': url('/netsuite-audit/#service'),
    name: audit.name,
    serviceType: 'NetSuite integration assessment',
    provider: { '@id': ORG_ID },
    url: url('/netsuite-audit/'),
    description: `A fixed-scope, ${audit.durationDays}-business-day review of how Oracle NetSuite connects to your storefront, portals, and third-party systems, delivered as a written findings report with a prioritized remediation plan.`,
  };
  if (audit.price) {
    node.offers = {
      '@type': 'Offer',
      price: audit.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: url('/netsuite-audit/'),
    };
  }
  return node;
}

export function breadcrumbNode(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url(path),
    })),
  };
}

export function faqNode(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}

export function caseStudyNode(cs) {
  return {
    '@type': 'Article',
    '@id': url(`/work/${cs.slug}/#article`),
    headline: cs.title,
    description: cs.summary,
    url: url(`/work/${cs.slug}/`),
    image: url(cs.heroImage),
    datePublished: cs.publishedAt,
    dateModified: cs.updatedAt,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    about: { '@type': 'Organization', name: cs.client },
    mentions: cs.integrations.map((name) => ({ '@type': 'SoftwareApplication', name })),
  };
}
