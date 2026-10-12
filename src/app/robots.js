import { SITE_URL } from '../lib/site';

// Answer engines are a discovery channel, so their crawlers are named and
// allowed explicitly rather than left to the wildcard.
const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended'];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
