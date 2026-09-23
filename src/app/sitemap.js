import { posts } from '../data/posts';
import { publishedCaseStudies } from '../data/caseStudies';
import { publishedTopics } from '../data/netsuiteTopics';
import { SITE_URL } from '../lib/site';

// Every URL ends in a slash to match `trailingSlash: true`. Static routes carry
// no lastModified: a date that always says "today" teaches Google to ignore it.
const STATIC_ROUTES = [
  ['/', 1],
  ['/netsuite/', 0.9],
  ['/netsuite-audit/', 0.9],
  ['/netsuite/material-handling/', 0.8],
  ['/netsuite/integration-readiness-checklist/', 0.8],
  ['/tools/netsuite-integration-estimator/', 0.8],
  ['/work/', 0.8],
  ['/pricing/', 0.7],
  ['/call/', 0.7],
  ['/services/', 0.6],
  ['/about/', 0.6],
  ['/about/los-angeles/', 0.4],
  ['/about/portland/', 0.4],
  ['/about/irvine/', 0.4],
  ['/blog/', 0.6],
  ['/contact/', 0.5],
  ['/privacy-policy/', 0.1],
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, priority }));

  const caseStudies = publishedCaseStudies().map((cs) => ({
    url: `${SITE_URL}/work/${cs.slug}/`,
    lastModified: cs.updatedAt,
    priority: 0.8,
  }));

  const topics = publishedTopics().map((t) => ({
    url: `${SITE_URL}/netsuite/${t.slug}/`,
    lastModified: t.updatedAt,
    priority: 0.7,
  }));

  const blog = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.date,
    priority: 0.5,
  }));

  return [...staticEntries, ...caseStudies, ...topics, ...blog];
}
