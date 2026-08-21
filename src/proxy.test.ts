import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { config, proxy } from "./proxy";

const ORIGIN = "https://www.aparnakapur.com";

function request(
  path: string,
  init: { accept?: string; method?: string; headers?: Record<string, string> } = {},
) {
  const headers = new Headers(init.headers);
  if (init.accept) headers.set("accept", init.accept);
  return new NextRequest(new URL(path, ORIGIN), {
    method: init.method ?? "GET",
    headers,
  });
}

/** The internal path a rewrite points at, or null when nothing was rewritten. */
function rewriteTarget(response: Response): string | null {
  const destination = response.headers.get("x-middleware-rewrite");
  return destination ? new URL(destination).pathname : null;
}

describe("proxy", () => {
  it("leaves an ordinary browser request on the HTML page", () => {
    const response = proxy(
      request("/neighborhoods/oakridge", {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      }),
    );
    expect(rewriteTarget(response)).toBeNull();
  });

  it("advertises the markdown twin on HTML responses", () => {
    const response = proxy(request("/buying", { accept: "text/html" }));
    expect(response.headers.get("Link")).toBe(
      `<${ORIGIN}/buying.md>; rel="alternate"; type="text/markdown"`,
    );
  });

  it("advertises /index.md as the homepage alternate", () => {
    const response = proxy(request("/", { accept: "text/html" }));
    expect(response.headers.get("Link")).toContain(`<${ORIGIN}/index.md>`);
  });

  it("rewrites to the markdown route when the client asks for markdown", () => {
    const response = proxy(
      request("/neighborhoods/oakridge", { accept: "text/markdown" }),
    );
    expect(rewriteTarget(response)).toBe("/md/neighborhoods/oakridge");
  });

  it("rewrites the homepage to the markdown route root", () => {
    const response = proxy(request("/", { accept: "text/markdown" }));
    expect(rewriteTarget(response)).toBe("/md");
  });

  it("rewrites the .md alias of a page", () => {
    const response = proxy(request("/neighborhoods/oakridge.md"));
    expect(rewriteTarget(response)).toBe("/md/neighborhoods/oakridge");
  });

  it("rewrites /index.md to the homepage markdown", () => {
    expect(rewriteTarget(proxy(request("/index.md")))).toBe("/md");
  });

  it("leaves the standalone agent instruction file alone", () => {
    expect(rewriteTarget(proxy(request("/agents.md")))).toBeNull();
  });

  it("leaves llms.txt and robots.txt alone", () => {
    expect(
      rewriteTarget(proxy(request("/llms.txt", { accept: "text/markdown" }))),
    ).toBeNull();
    expect(
      rewriteTarget(proxy(request("/robots.txt", { accept: "text/markdown" }))),
    ).toBeNull();
  });

  it("leaves HTML-only paths on HTML even when markdown is requested", () => {
    expect(
      rewriteTarget(proxy(request("/lp/home-value", { accept: "text/markdown" }))),
    ).toBeNull();
    expect(
      rewriteTarget(
        proxy(request("/property/R1234567", { accept: "text/markdown" })),
      ),
    ).toBeNull();
  });

  // A client-side navigation asks for the RSC payload of the same URL; handing
  // it markdown would break in-app routing.
  it("never rewrites an RSC or prefetch request", () => {
    const rsc = proxy(
      request("/buying", { accept: "text/markdown", headers: { rsc: "1" } }),
    );
    expect(rewriteTarget(rsc)).toBeNull();

    const prefetch = proxy(
      request("/buying", {
        accept: "text/markdown",
        headers: { "next-router-prefetch": "1" },
      }),
    );
    expect(rewriteTarget(prefetch)).toBeNull();
  });

  it("never rewrites a non-GET request", () => {
    const response = proxy(
      request("/contact", { accept: "text/markdown", method: "POST" }),
    );
    expect(rewriteTarget(response)).toBeNull();
  });

  it("leaves static assets untouched", () => {
    const response = proxy(request("/og-image.png", { accept: "*/*" }));
    expect(rewriteTarget(response)).toBeNull();
    expect(response.headers.get("Link")).toBeNull();
  });

  it("does not run on the API, Next internals, or the markdown route itself", () => {
    const [pattern] = config.matcher;
    const matches = (path: string) => new RegExp(`^${pattern}$`).test(path);
    expect(matches("/")).toBe(true);
    expect(matches("/neighborhoods/oakridge")).toBe(true);
    expect(matches("/api/chat")).toBe(false);
    expect(matches("/_next/static/chunk.js")).toBe(false);
    expect(matches("/md")).toBe(false);
    expect(matches("/md/buying")).toBe(false);
  });
});
