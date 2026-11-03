// Fetches a page from a site a visitor named (the llms.txt tool), without letting that visitor reach anything private.
// Server only. Every address a host name resolves to is checked when the connection is made (the `lookup` hook), so a
// name that points at a public address during one check and a private one at connect time is still refused. Redirects
// are followed by hand, each one checked again; time and size are capped.

import dns from 'node:dns';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';

export class FetchRefused extends Error {}

// Loopback, private, link-local, carrier-grade NAT, benchmarking, multicast and reserved ranges, IPv4 and IPv6.
const BLOCKED_V4 = [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12],
  ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24],
  ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
];
const v4ToInt = (ip) => ip.split('.').reduce((n, part) => n * 256 + Number(part), 0);
const inV4 = (ip, [base, bits]) => Math.floor(v4ToInt(ip) / 2 ** (32 - bits)) === Math.floor(v4ToInt(base) / 2 ** (32 - bits));

export function isPublicAddress(ip) {
  if (net.isIPv4(ip)) return !BLOCKED_V4.some((range) => inV4(ip, range));
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPublicAddress(mapped[1]);
    if (lower === '::' || lower === '::1') return false;
    // Unique local (fc00::/7), link-local (fe80::/10), multicast (ff00::/8), documentation (2001:db8::/32), NAT64 (64:ff9b::/96)
    return !/^(f[cd]|fe[89ab]|ff|2001:db8:|64:ff9b:)/.test(lower);
  }
  return false;
}

function safeLookup(hostname, options, callback) {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err);
    const list = Array.isArray(addresses) ? addresses : [{ address: addresses, family: options.family || 4 }];
    const bad = list.find((a) => !isPublicAddress(a.address));
    if (bad || !list.length) return callback(new FetchRefused(`${hostname} points at a private address`));
    if (options.all) return callback(null, list);
    callback(null, list[0].address, list[0].family);
  });
}

// Turns what a visitor typed ("example.com", "https://example.com/blog") into a checked https or http URL.
export function siteUrl(input) {
  const raw = String(input || '').trim();
  if (!raw || raw.length > 300) throw new FetchRefused('Enter a website address, like example.com');
  let u;
  try {
    u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new FetchRefused('That doesn’t look like a website address');
  }
  if (!['http:', 'https:'].includes(u.protocol)) throw new FetchRefused('Only http and https addresses can be checked');
  if (u.username || u.password) throw new FetchRefused('Addresses with a username or password can’t be checked');
  if (u.port && !['80', '443'].includes(u.port)) throw new FetchRefused('Only the standard web ports can be checked');
  const host = u.hostname.replace(/^\[|\]$/g, '');
  if (net.isIP(host) ? !isPublicAddress(host) : !host.includes('.') || /\.(local|internal|localhost)$/i.test(host)) {
    throw new FetchRefused('That address isn’t on the public web');
  }
  return u;
}

function requestOnce(url, { timeoutMs, maxBytes, method }) {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === 'https:' ? https : http;
    const req = lib.request(
      url,
      {
        method,
        lookup: safeLookup,
        timeout: timeoutMs,
        headers: { 'user-agent': 'CasaDev-llms-txt-checker/1.0 (+https://www.casa-dev.com/tools/llms-txt-checker/)', accept: 'text/plain, text/markdown, text/html;q=0.8, */*;q=0.5' },
      },
      (res) => {
        const chunks = [];
        let size = 0;
        let truncated = false;
        res.on('data', (chunk) => {
          if (truncated) return;
          size += chunk.length;
          if (size > maxBytes) {
            truncated = true;
            chunks.push(chunk.subarray(0, chunk.length - (size - maxBytes)));
            res.destroy();
            return;
          }
          chunks.push(chunk);
        });
        const done = () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8'), truncated });
        res.on('end', done);
        res.on('close', done);
        res.on('error', (e) => (truncated ? done() : reject(e)));
      }
    );
    req.on('timeout', () => req.destroy(new FetchRefused('The site took too long to answer')));
    req.on('error', reject);
    req.end();
  });
}

// GET (or HEAD) a public URL, following up to `maxRedirects` redirects. Resolves with the final URL, status, headers
// and up to `maxBytes` of the body as text.
export async function safeFetch(input, { timeoutMs = 8000, maxBytes = 512 * 1024, maxRedirects = 4, method = 'GET' } = {}) {
  let url = input instanceof URL ? input : siteUrl(input);
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const res = await requestOnce(url, { timeoutMs, maxBytes, method });
    const location = res.headers.location;
    if (res.status >= 300 && res.status < 400 && location) {
      url = siteUrl(new URL(location, url).href);
      continue;
    }
    return { ...res, url: url.href };
  }
  throw new FetchRefused('Too many redirects');
}
