import { describe, expect, it } from "vitest";
import { blogPosts } from "@/lib/blog";
import { AREA_BENCHMARKS } from "@/lib/market-data";
import { neighbourhoodsMentioned } from "./RelatedMarketData";

describe("neighbourhoodsMentioned", () => {
  it("picks the neighbourhood a post is actually about", () => {
    const post = blogPosts.find((p) => p.slug === "oakridge-park-redevelopment-2026")!;
    expect(neighbourhoodsMentioned(post.content)[0]).toBe("oakridge");
  });

  it("ranks by how often the post names each one", () => {
    const post = blogPosts.find(
      (p) => p.slug === "cambie-corridor-rezoning-2025-what-homeowners-need-to-know",
    )!;
    expect(neighbourhoodsMentioned(post.content)[0]).toBe("cambie-corridor");
  });

  it("only returns slugs that have a published benchmark", () => {
    for (const post of blogPosts) {
      for (const slug of neighbourhoodsMentioned(post.content)) {
        expect(AREA_BENCHMARKS[slug], `${post.slug} -> ${slug}`).toBeDefined();
      }
    }
  });

  it("returns nothing rather than guessing when no neighbourhood is named", () => {
    expect(neighbourhoodsMentioned("A post about mortgage rates.")).toEqual([]);
  });

  it("respects the limit", () => {
    for (const post of blogPosts) {
      expect(neighbourhoodsMentioned(post.content).length).toBeLessThanOrEqual(3);
      expect(neighbourhoodsMentioned(post.content, 1).length).toBeLessThanOrEqual(1);
    }
  });

  it("does not match a name inside a longer word", () => {
    expect(neighbourhoodsMentioned("Oakridges is not Oakridge.")).toContain("oakridge");
    expect(neighbourhoodsMentioned("Downtowner")).toEqual([]);
  });
});
