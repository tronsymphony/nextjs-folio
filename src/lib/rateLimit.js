// In-memory sliding-window rate limiter.
// On Vercel each warm serverless instance keeps its own Map, so this is a
// best-effort brake rather than a hard guarantee; the honeypot and dwell-time
// checks in the lead route do most of the spam filtering.

const MAX_KEYS = 5000;

const prune = (timestamps, windowMs, now) => timestamps.filter((t) => now - t < windowMs);

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

// A limiter with its own counters, so one tool's traffic can't use up another's budget.
export function createRateLimiter({ windowMs, perKey, global }) {
  const hits = new Map();
  let globalHits = [];
  return function limit(key, now = Date.now()) {
    globalHits = prune(globalHits, windowMs, now);
    if (globalHits.length >= global) return false;

    const recent = prune(hits.get(key) || [], windowMs, now);
    if (recent.length >= perKey) return false;

    if (!hits.has(key) && hits.size >= MAX_KEYS) {
      hits.delete(hits.keys().next().value);
    }
    recent.push(now);
    hits.set(key, recent);
    globalHits.push(now);
    return true;
  };
}

// The lead forms' limiter: 5 per IP and 40 in total per hour.
export const rateLimit = createRateLimiter({ windowMs: 60 * 60 * 1000, perKey: 5, global: 40 });
