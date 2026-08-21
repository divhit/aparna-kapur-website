import { NextResponse, type NextRequest } from "next/server";
import {
  isNegotiablePath,
  markdownRouteFor,
  markdownUrlFor,
  pathnameFromMarkdownUrl,
  prefersMarkdown,
} from "@/lib/agent/negotiation";

/**
 * Content negotiation between the HTML page and its markdown twin.
 *
 * Next.js 16 renamed the middleware file convention to `proxy`; the filename and
 * the exported function follow it.
 *
 * HTML stays the default: markdown is served only when a client names
 * `text/markdown` in its Accept header, or asks for the `.md` alias of a page
 * URL. Every negotiable HTML response gains a `Link: rel="alternate"` header
 * pointing at its markdown twin, so an agent can find it without guessing.
 *
 * `Vary: Accept` is set on the markdown responses themselves, in the route
 * handler. Next.js 16 overwrites `Vary` on rendered page responses, so it
 * cannot be added to the HTML variant from here; the rewrite below is what
 * actually keeps the two apart in a CDN, because it runs before any cache
 * lookup and changes the cache key.
 */

function withMarkdownAlternate(
  response: NextResponse,
  request: NextRequest,
  pathname: string,
): NextResponse {
  const alternate = new URL(markdownUrlFor(pathname), request.nextUrl.origin);
  response.headers.append(
    "Link",
    `<${alternate.href}>; rel="alternate"; type="text/markdown"`,
  );
  return response;
}

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  // React Server Component payloads and prefetches are not page representations.
  if (
    request.headers.get("rsc") ||
    request.headers.get("next-router-prefetch") ||
    request.headers.get("next-router-state-tree")
  ) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const aliasTarget = pathnameFromMarkdownUrl(pathname);
  if (aliasTarget !== null) {
    if (!isNegotiablePath(aliasTarget)) return NextResponse.next();
    return NextResponse.rewrite(
      new URL(markdownRouteFor(aliasTarget), request.nextUrl.origin),
    );
  }

  if (!isNegotiablePath(pathname)) return NextResponse.next();

  if (prefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.rewrite(
      new URL(markdownRouteFor(pathname), request.nextUrl.origin),
    );
  }

  return withMarkdownAlternate(NextResponse.next(), request, pathname);
}

export const config = {
  matcher: ["/((?!api/|_next/|md$|md/).*)"],
};
