import { describe, expect, it } from "vitest";
import { blogPosts } from "@/lib/blog";
import { buyingGuideSteps, sellingGuideSteps } from "@/lib/guide-data";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { findSitePage, getSitePages, getSiteSections } from "./site-map";
import { isNegotiablePath } from "./negotiation";

const paths = getSitePages().map((page) => page.path);

describe("site catalogue", () => {
  it("uses canonical paths: leading slash, no trailing slash, no host", () => {
    for (const path of paths) {
      expect(path.startsWith("/")).toBe(true);
      expect(path === "/" || !path.endsWith("/")).toBe(true);
      expect(path).not.toContain("http");
    }
  });

  it("has no duplicate entries", () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("gives every page a title and a summary", () => {
    for (const page of getSitePages()) {
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.summary.length).toBeGreaterThan(0);
    }
  });

  it("only lists pages that take part in markdown negotiation", () => {
    for (const path of paths) {
      expect(isNegotiablePath(path)).toBe(true);
    }
  });

  // The catalogue is generated from the page data precisely so that a renamed
  // slug cannot leave a dead link on the HTML sitemap, which is how the old
  // hand-maintained list drifted.
  it("derives guide steps from the guide data", () => {
    for (const step of buyingGuideSteps) {
      expect(paths).toContain(`/buying/guide/${step.slug}`);
    }
    for (const step of sellingGuideSteps) {
      expect(paths).toContain(`/selling/guide/${step.slug}`);
    }
  });

  it("derives neighbourhood guides from the neighbourhood data", () => {
    for (const hood of Object.values(NEIGHBOURHOODS)) {
      expect(paths).toContain(`/neighborhoods/${hood.slug}`);
    }
  });

  it("derives blog entries from the post data, newest first", () => {
    const blogSection = getSiteSections().find(
      (section) => section.title === "Blog",
    );
    expect(blogSection?.pages).toHaveLength(blogPosts.length);
    const dates = blogSection!.pages.map(
      (page) =>
        blogPosts.find((post) => page.path.endsWith(post.slug))!.datePublished,
    );
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("does not list noindex landing pages or listing detail pages", () => {
    for (const path of paths) {
      expect(path.startsWith("/lp/")).toBe(false);
      expect(path.startsWith("/property/")).toBe(false);
      expect(path).not.toBe("/open-house");
    }
  });

  it("looks a page up by path", () => {
    expect(findSitePage("/contact")?.title).toBe("Contact Aparna Kapur");
    expect(findSitePage("/nope")).toBeUndefined();
  });
});
