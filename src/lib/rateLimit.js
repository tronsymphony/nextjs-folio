// In-memory sliding-window rate limiter.
// On Vercel each warm serverless instance keeps its own Map, so this is a
// best-effort brake rather than a hard guarantee; the honeypot and dwell-time
// checks in the lead route do most of the spam filtering.

const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_LIMIT = 5;
const GLOBAL_LIMIT = 40;
const MAX_KEYS = 5000;

const hits = new Map();
let globalHits = [];

const prune = (timestamps, now) => timestamps.filter((t) => now - t < WINDOW_MS);

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(key, now = Date.now()) {
  globalHits = prune(globalHits, now);
  if (globalHits.length >= GLOBAL_LIMIT) return false;

  const recent = prune(hits.get(key) || [], now);
  if (recent.length >= PER_IP_LIMIT) return false;

  if (!hits.has(key) && hits.size >= MAX_KEYS) {
    hits.delete(hits.keys().next().value);
  }
  recent.push(now);
  hits.set(key, recent);
  globalHits.push(now);
  return true;
}
