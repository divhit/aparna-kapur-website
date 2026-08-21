import { describe, expect, it } from "vitest";
import {
  acceptsHtml,
  explicitQuality,
  isNegotiablePath,
  markdownRouteFor,
  markdownUrlFor,
  normalizePathname,
  parseAcceptHeader,
  pathnameFromMarkdownUrl,
  prefersMarkdown,
} from "./negotiation";

describe("parseAcceptHeader", () => {
  it("returns nothing for a missing or empty header", () => {
    expect(parseAcceptHeader(null)).toEqual([]);
    expect(parseAcceptHeader(undefined)).toEqual([]);
    expect(parseAcceptHeader("")).toEqual([]);
  });

  it("parses media ranges and quality values", () => {
    expect(parseAcceptHeader("text/markdown;q=0.9, text/html")).toEqual([
      { type: "text", subtype: "markdown", q: 0.9 },
      { type: "text", subtype: "html", q: 1 },
    ]);
  });

  it("lowercases the media type and ignores other parameters", () => {
    expect(parseAcceptHeader("TEXT/Markdown;charset=utf-8;q=0.5")).toEqual([
      { type: "text", subtype: "markdown", q: 0.5 },
    ]);
  });

  it("drops malformed entries instead of throwing", () => {
    expect(parseAcceptHeader("garbage, /html, text/, text/html")).toEqual([
      { type: "text", subtype: "html", q: 1 },
    ]);
  });

  it("clamps out-of-range and unparseable q values", () => {
    expect(parseAcceptHeader("text/html;q=5")[0].q).toBe(1);
    expect(parseAcceptHeader("text/html;q=-2")[0].q).toBe(0);
    expect(parseAcceptHeader("text/html;q=nope")[0].q).toBe(1);
  });
});

describe("explicitQuality", () => {
  it("ignores wildcard ranges", () => {
    const ranges = parseAcceptHeader("*/*, text/*");
    expect(explicitQuality(ranges, "text/markdown")).toBe(0);
  });

  it("takes the highest matching quality", () => {
    const ranges = parseAcceptHeader("text/markdown;q=0.2, text/markdown;q=0.8");
    expect(explicitQuality(ranges, "text/markdown")).toBe(0.8);
  });
});

describe("prefersMarkdown", () => {
  it("serves markdown when it is named on its own", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/x-markdown")).toBe(true);
  });

  it("serves markdown when it is named alongside HTML at equal quality", () => {
    expect(prefersMarkdown("text/markdown, text/html")).toBe(true);
  });

  it("keeps HTML when the client ranks HTML higher", () => {
    expect(prefersMarkdown("text/markdown;q=0.5, text/html;q=0.9")).toBe(false);
  });

  // The important negative cases: browsers, link scrapers, and bare curl must
  // never be handed markdown.
  it("keeps HTML for a browser Accept header", () => {
    expect(
      prefersMarkdown(
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      ),
    ).toBe(false);
  });

  it("keeps HTML for a wildcard or missing Accept header", () => {
    expect(prefersMarkdown("*/*")).toBe(false);
    expect(prefersMarkdown("text/*")).toBe(false);
    expect(prefersMarkdown(null)).toBe(false);
  });

  it("keeps HTML when markdown is explicitly refused", () => {
    expect(prefersMarkdown("text/markdown;q=0, text/html")).toBe(false);
  });
});

describe("acceptsHtml", () => {
  it("is true only when text/html is named explicitly", () => {
    expect(acceptsHtml("text/html,application/xhtml+xml")).toBe(true);
    expect(acceptsHtml("*/*")).toBe(false);
    expect(acceptsHtml(null)).toBe(false);
  });
});

describe("path helpers", () => {
  it("normalizes trailing slashes and keeps the root", () => {
    expect(normalizePathname("/")).toBe("/");
    expect(normalizePathname("/buying/")).toBe("/buying");
    expect(normalizePathname("buying")).toBe("/buying");
  });

  it("maps a page path to its markdown alias and back", () => {
    expect(markdownUrlFor("/")).toBe("/index.md");
    expect(markdownUrlFor("/neighborhoods/oakridge")).toBe(
      "/neighborhoods/oakridge.md",
    );
    expect(pathnameFromMarkdownUrl("/index.md")).toBe("/");
    expect(pathnameFromMarkdownUrl("/neighborhoods/oakridge.md")).toBe(
      "/neighborhoods/oakridge",
    );
    expect(pathnameFromMarkdownUrl("/neighborhoods/oakridge")).toBeNull();
  });

  it("never treats the standalone agent instruction file as an alias", () => {
    expect(pathnameFromMarkdownUrl("/agents.md")).toBeNull();
  });

  it("maps a page path to the internal markdown route", () => {
    expect(markdownRouteFor("/")).toBe("/md");
    expect(markdownRouteFor("/buying/guide")).toBe("/md/buying/guide");
  });
});

describe("isNegotiablePath", () => {
  it("accepts ordinary page paths", () => {
    expect(isNegotiablePath("/")).toBe(true);
    expect(isNegotiablePath("/neighborhoods/oakridge")).toBe(true);
    expect(isNegotiablePath("/neighborhoods/oakridge.md")).toBe(true);
  });

  it("rejects assets, API routes, and Next internals", () => {
    expect(isNegotiablePath("/og-image.png")).toBe(false);
    expect(isNegotiablePath("/favicon.ico")).toBe(false);
    expect(isNegotiablePath("/api/chat")).toBe(false);
    expect(isNegotiablePath("/_next/static/chunk.js")).toBe(false);
  });

  it("rejects files that already publish their own machine-readable form", () => {
    expect(isNegotiablePath("/llms.txt")).toBe(false);
    expect(isNegotiablePath("/llms-full.txt")).toBe(false);
    expect(isNegotiablePath("/agents.md")).toBe(false);
    expect(isNegotiablePath("/robots.txt")).toBe(false);
    expect(isNegotiablePath("/sitemap.xml")).toBe(false);
  });

  it("rejects the markdown route itself, so a rewrite cannot loop", () => {
    expect(isNegotiablePath("/md")).toBe(false);
    expect(isNegotiablePath("/md/buying")).toBe(false);
  });

  it("rejects noindex landing pages and licensed listing pages", () => {
    expect(isNegotiablePath("/lp/home-value")).toBe(false);
    expect(isNegotiablePath("/open-house")).toBe(false);
    expect(isNegotiablePath("/property/R1234567")).toBe(false);
  });
});
