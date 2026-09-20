/**
 * A small in-memory limiter for the tools that create leads. Serverless
 * instances each keep their own window, so this is a brake on a runaway
 * client rather than a guarantee; the CRM and the inbox are the real record.
 */

const WINDOW_MS = 60 * 60 * 1000;
/**
 * Assistants such as Meta Muse run in the provider's cloud, so many different
 * people arrive from the same handful of addresses. A per-address ceiling low
 * enough to stop one abuser would also lock out every legitimate user behind
 * that address, so this is set as a flood brake and the real per-person guard
 * is `isDuplicateLead` below.
 */
const MAX_PER_WINDOW = 60;

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
  recentContacts.clear();
}

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const recentContacts = new Map<string, number>();

/**
 * True when the same person (by email or phone) already sent a request in the
 * last ten minutes. Agents retry, and a retry must not become a second lead.
 */
export function isDuplicateLead(contact: string, now = Date.now()): boolean {
  const key = contact.trim().toLowerCase().replace(/[^a-z0-9@.+]/g, "");
  if (!key) return false;
  for (const [seen, stamp] of recentContacts) {
    if (now - stamp >= DUPLICATE_WINDOW_MS) recentContacts.delete(seen);
  }
  if (recentContacts.has(key)) return true;
  recentContacts.set(key, now);
  return false;
}
