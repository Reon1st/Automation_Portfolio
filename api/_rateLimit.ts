// ponytail: in-memory, per-instance only — resets on cold start and isn't
// shared across concurrent Vercel instances. Good enough to blunt casual
// brute-forcing on a low-traffic solo admin panel; upgrade to Vercel KV /
// Upstash if this ever needs to hold under real distributed load.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function getIp(req: any): string {
  const fwd = req.headers['x-forwarded-for'];
  return (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0]?.trim() || 'unknown';
}

export function isRateLimited(req: any): boolean {
  const entry = attempts.get(getIp(req));
  if (!entry || Date.now() > entry.resetAt) return false;
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(req: any): void {
  const ip = getIp(req);
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count++;
  }
}

export function clearAttempts(req: any): void {
  attempts.delete(getIp(req));
}
