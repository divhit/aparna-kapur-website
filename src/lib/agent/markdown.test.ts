import { describe, expect, it } from "vitest";
import { blogPosts } from "@/lib/blog";
import { buyingGuideSteps } from "@/lib/guide-data";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import {
  getMarkdownDocument,
  isMarkdownExcluded,
  renderMarkdownDocument,
  renderNotFoundMarkdown,
} from "./markdown";
import { getSitePages } from "./site-map";
import { NAP, SITE_URL } from "./site";

describe("getMarkdownDocument", () => {
  it("covers every page in the site catalogue that renders its own content", () => {
    const missing = getSitePages()
      .filter((page) => !page.redirectsTo)
      .map((page) => page.path)
      .filter((path) => getMarkdownDocument(path) === null);
    expect(missing).toEqual([]);
  });

  it("has no document for a path whose HTML redirects", () => {
    // The markdown route answers these with the matching redirect instead.
    expect(getMarkdownDocument("/about")).toBeNull();
    expect(getMarkdownDocument("/buying/guide")).toBeNull();
    expect(getMarkdownDocument("/selling/guide")).toBeNull();
  });

  it("tolerates a trailing slash", () => {
    expect(getMarkdownDocument("/buying/")?.path).toBe("/buying");
  });

  it("returns null for a path that does not exist", () => {
    expect(getMarkdownDocument("/nope-does-not-exist")).toBeNull();
  });

  it("returns null for HTML-only paths", () => {
    expect(getMarkdownDocument("/lp/home-value")).toBeNull();
    expect(getMarkdownDocument("/property/R1234567")).toBeNull();
    expect(getMarkdownDocument("/open-house")).toBeNull();
  });

  it("builds the homepage from the shared entity facts", () => {
    const doc = getMarkdownDocument("/");
    expect(doc?.path).toBe("/");
    expect(doc?.body).toContain("## What this site can answer");
    expect(doc?.body).toContain("## What this site will not do");
    expect(doc?.body).toContain(NAP.telephone);
    expect(doc?.body).toContain(NAP.email);
  });

  it("builds a neighbourhood guide from the neighbourhood data", () => {
    const hood = NEIGHBOURHOODS.oakridge;
    const doc = getMarkdownDocument("/neighborhoods/oakridge");
    expect(doc?.title).toContain(hood.name);
    expect(doc?.body).toContain(hood.avgPrice);
    expect(doc?.body).toContain(hood.priceChange);
    expect(doc?.body).toContain(String(hood.walkScore));
    for (const highlight of hood.highlights) {
      expect(doc?.body).toContain(highlight);
    }
  });

  it("carries the full text of a blog post", () => {
    const post = blogPosts[0];
    const doc = getMarkdownDocument(`/resources/blog/${post.slug}`);
    expect(doc?.title).toBe(post.title);
    expect(doc?.body).toContain(post.content.trim().slice(0, 120));
    expect(doc?.body).toContain(post.datePublished);
  });

  it("carries the full text of a guide step and links its neighbours", () => {
    const step = buyingGuideSteps[1];
    const doc = getMarkdownDocument(`/buying/guide/${step.slug}`);
    expect(doc?.body).toContain(step.insight);
    expect(doc?.body).toContain(buyingGuideSteps[0].slug);
    expect(doc?.body).toContain(buyingGuideSteps[2].slug);
  });

  it("falls back to a summary document for pages without richer content", () => {
    const doc = getMarkdownDocument("/selling/staging-tips");
    expect(doc?.title).toBe("Home Staging Tips");
    expect(doc?.body).toContain(`${SITE_URL}/selling/staging-tips`);
  });
});

describe("isMarkdownExcluded", () => {
  it("matches the HTML-only paths and nothing else", () => {
    expect(isMarkdownExcluded("/lp/investment")).toBe(true);
    expect(isMarkdownExcluded("/property/R1")).toBe(true);
    expect(isMarkdownExcluded("/open-house")).toBe(true);
    expect(isMarkdownExcluded("/neighborhoods/oakridge")).toBe(false);
  });
});

describe("renderMarkdownDocument", () => {
  const rendered = renderMarkdownDocument(getMarkdownDocument("/contact")!);

  it("opens with a single H1", () => {
    expect(rendered.split("\n")[0]).toBe("# Contact Aparna Kapur");
    expect(rendered.match(/^# /gm)).toHaveLength(1);
  });

  it("names the canonical HTML page and the markdown alias", () => {
    expect(rendered).toContain(`Canonical HTML: ${SITE_URL}/contact`);
    expect(rendered).toContain(`Markdown: ${SITE_URL}/contact.md`);
  });

  it("ends with the machine-readable index", () => {
    expect(rendered).toContain(`${SITE_URL}/llms.txt`);
    expect(rendered).toContain(`${SITE_URL}/agents.md`);
    expect(rendered).toContain(`${SITE_URL}/sitemap.xml`);
  });
});

describe("renderNotFoundMarkdown", () => {
  const body = renderNotFoundMarkdown("/does/not/exist");

  it("is markdown with a heading, not an empty body", () => {
    expect(body.startsWith("# 404")).toBe(true);
    expect(body.length).toBeGreaterThan(400);
  });

  it("names the path that was requested", () => {
    expect(body).toContain("/does/not/exist");
  });

  it("points at the sitemap, llms.txt, and the agent instructions", () => {
    expect(body).toContain(`${SITE_URL}/sitemap.xml`);
    expect(body).toContain(`${SITE_URL}/sitemap-html`);
    expect(body).toContain(`${SITE_URL}/llms.txt`);
    expect(body).toContain(`${SITE_URL}/agents.md`);
  });

  it("offers a route to a human", () => {
    expect(body).toContain(NAP.telephone);
    expect(body).toContain(`${SITE_URL}/contact`);
  });
});
