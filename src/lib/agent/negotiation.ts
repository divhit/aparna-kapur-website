/**
 * Accept-header content negotiation for the markdown representation of a page,
 * per the acceptmarkdown.com convention: HTML stays the default, markdown is
 * served only when a client explicitly asks for it, and every negotiated
 * response carries `Vary: Accept` so a shared cache never hands the HTML
 * variant to an agent (or the markdown variant to a browser).
 */

export const MARKDOWN_MEDIA_TYPE = "text/markdown; charset=utf-8";

/** Subtypes treated as "markdown" when they appear in an Accept header. */
export const MARKDOWN_MEDIA_TYPES = ["text/markdown", "text/x-markdown"];

/** Route segment that renders the markdown representation of a page. */
export const MARKDOWN_ROUTE_PREFIX = "/md";

/**
 * Paths that already serve their own machine-readable representation, or that
 * are not pages at all. Negotiation must leave them alone.
 */
export const RESERVED_PATHS = new Set([
  "/agents.md",
  "/llms.txt",
  "/llms-full.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/sitemap-0.xml",
  "/sellers-guide.html",
]);

/**
 * Paths served as HTML only. Ad landing pages are `noindex` and individual MLS
 * listings carry licensed board data, so neither gets a markdown twin.
 */
export const NON_NEGOTIABLE_PREFIXES = ["/lp/", "/property/"];
export const NON_NEGOTIABLE_PATHS = new Set(["/lp", "/open-house"]);

export type MediaRange = { type: string; subtype: string; q: number };

/** Parse an Accept header into media ranges. Malformed entries are dropped. */
export function parseAcceptHeader(value: string | null | undefined): MediaRange[] {
  if (!value) return [];
  const ranges: MediaRange[] = [];

  for (const raw of value.split(",")) {
    const parts = raw.trim().split(";");
    const mediaType = parts.shift()?.trim().toLowerCase();
    if (!mediaType) continue;

    const slash = mediaType.indexOf("/");
    if (slash <= 0 || slash === mediaType.length - 1) continue;

    const type = mediaType.slice(0, slash);
    const subtype = mediaType.slice(slash + 1);
    if (!/^[a-z0-9!#$%&'*+.^_`|~-]+$/.test(type)) continue;
    if (!/^[a-z0-9!#$%&'*+.^_`|~-]+$/.test(subtype)) continue;

    let q = 1;
    for (const param of parts) {
      const [key, ...rest] = param.split("=");
      if (key.trim().toLowerCase() !== "q") continue;
      const parsed = Number.parseFloat(rest.join("=").trim().replace(/^"|"$/g, ""));
      q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 1;
    }

    ranges.push({ type, subtype, q });
  }

  return ranges;
}

/**
 * Highest q for an *exact* media type. Wildcard ranges deliberately do not
 * match: a bare star range — what curl and most link scrapers send — means
 * "anything", not "markdown please", so it must keep getting HTML.
 */
export function explicitQuality(ranges: MediaRange[], mediaType: string): number {
  const slash = mediaType.indexOf("/");
  const type = mediaType.slice(0, slash);
  const subtype = mediaType.slice(slash + 1);

  let best = 0;
  for (const range of ranges) {
    if (range.type === type && range.subtype === subtype) {
      best = Math.max(best, range.q);
    }
  }
  return best;
}

/**
 * True when the client named markdown explicitly and did not rank HTML above
 * it. Ties go to markdown, because naming `text/markdown` at all is a
 * deliberate act; a client that has no opinion never names it.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  const ranges = parseAcceptHeader(accept);
  const markdownQ = Math.max(
    ...MARKDOWN_MEDIA_TYPES.map((type) => explicitQuality(ranges, type)),
    0,
  );
  if (markdownQ === 0) return false;
  return markdownQ >= explicitQuality(ranges, "text/html");
}

/** True when the client explicitly asked for HTML (a browser always does). */
export function acceptsHtml(accept: string | null | undefined): boolean {
  return explicitQuality(parseAcceptHeader(accept), "text/html") > 0;
}

/** Normalize a pathname: strip the trailing slash, keep the root as "/". */
export function normalizePathname(pathname: string): string {
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  const stripped = pathname.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

/** `/buying` -> `/buying.md`; `/` -> `/index.md`. The public markdown alias. */
export function markdownUrlFor(pathname: string): string {
  const path = normalizePathname(pathname);
  return path === "/" ? "/index.md" : `${path}.md`;
}

/** `/buying` -> `/md/buying`; `/` -> `/md`. The internal rewrite target. */
export function markdownRouteFor(pathname: string): string {
  const path = normalizePathname(pathname);
  return path === "/" ? MARKDOWN_ROUTE_PREFIX : `${MARKDOWN_ROUTE_PREFIX}${path}`;
}

/** Inverse of {@link markdownUrlFor}. Returns null when the path is not a `.md` alias. */
export function pathnameFromMarkdownUrl(pathname: string): string | null {
  const path = normalizePathname(pathname);
  if (!path.endsWith(".md") || RESERVED_PATHS.has(path)) return null;
  if (path === "/index.md") return "/";
  return path.slice(0, -".md".length);
}

/**
 * True when a pathname addresses a page whose markdown twin we can serve.
 * Assets, API routes, Next internals, and the reserved machine-readable files
 * are all excluded.
 */
export function isNegotiablePath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (RESERVED_PATHS.has(path)) return false;
  if (path === MARKDOWN_ROUTE_PREFIX || path.startsWith(`${MARKDOWN_ROUTE_PREFIX}/`)) return false;
  if (path.startsWith("/_next/") || path.startsWith("/api/")) return false;
  if (NON_NEGOTIABLE_PATHS.has(path)) return false;
  if (NON_NEGOTIABLE_PREFIXES.some((prefix) => path.startsWith(prefix))) return false;

  const lastSegment = path.slice(path.lastIndexOf("/") + 1);
  // A dot means an asset (favicon.ico, og-image.png) — except our own `.md` alias.
  if (lastSegment.includes(".") && !lastSegment.endsWith(".md")) return false;

  return true;
}
