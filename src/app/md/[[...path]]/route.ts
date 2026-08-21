import { NextResponse } from "next/server";
import {
  getMarkdownDocument,
  renderMarkdownDocument,
  renderNotFoundMarkdown,
} from "@/lib/agent/markdown";
import {
  MARKDOWN_MEDIA_TYPE,
  markdownUrlFor,
  normalizePathname,
} from "@/lib/agent/negotiation";
import { SITE_URL } from "@/lib/agent/site";
import { getRedirect } from "@/lib/agent/site-map";

/**
 * Markdown representation of any page, per the acceptmarkdown.com convention.
 *
 * Reached three ways: `Accept: text/markdown` on the page URL (rewritten here
 * by the middleware), the `.md` alias of the page URL, or this route directly.
 * Unknown paths answer 404 with a short markdown recovery body rather than an
 * empty response, so an agent that guessed a URL can find its way in one hop.
 */

export const dynamic = "force-dynamic";

const CACHE_CONTROL = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await params;
  const pathname = normalizePathname(`/${(path ?? []).join("/")}`);

  // Mirror the HTML redirects so both representations of a URL land on the
  // same content.
  const redirectTo = getRedirect(pathname);
  if (redirectTo) {
    // Relative to the request, so preview deployments and local runs stay on
    // their own origin.
    return NextResponse.redirect(
      new URL(markdownUrlFor(redirectTo), request.url),
      308,
    );
  }

  const doc = getMarkdownDocument(pathname);

  const headers = new Headers({
    "Content-Type": MARKDOWN_MEDIA_TYPE,
    // Without this a CDN can hand the cached HTML variant to an agent that
    // asked for markdown, or the markdown variant to a browser.
    Vary: "Accept, Accept-Encoding",
    "Cache-Control": CACHE_CONTROL,
    // The HTML page is the indexable representation; this is an alternate.
    "X-Robots-Tag": "noindex, follow",
  });

  if (!doc) {
    return new NextResponse(renderNotFoundMarkdown(pathname), {
      status: 404,
      headers,
    });
  }

  headers.set(
    "Link",
    `<${SITE_URL}${doc.path}>; rel="canonical", <${SITE_URL}${markdownUrlFor(doc.path)}>; rel="alternate"; type="text/markdown"`,
  );

  return new NextResponse(renderMarkdownDocument(doc), { status: 200, headers });
}
