/**
 * A small in-memory limiter for the tools that create leads. Serverless
 * instances each keep their own window, so this is a brake on a runaway
 * client rather than a guarantee; the CRM and the inbox are the real record.
 */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;

const buckets = new Map<string, number[]>();

export function clientKey(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function checkRateLimit(
  headers: Headers,
  scope: string,
  now = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  const key = `${scope}:${clientKey(headers)}`;
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    buckets.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((recent[0] + WINDOW_MS - now) / 1000) };
  }
  recent.push(now);
  buckets.set(key, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test hook. */
export function resetRateLimits() {
  buckets.clear();
}
