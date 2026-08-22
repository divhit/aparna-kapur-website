import { describe, expect, it } from "vitest";
import { AREA_BENCHMARKS, REGION_BENCHMARKS } from "./market-data";
import { getMarketPage, propertyTypeFromSlug } from "./market-pages";
import { getRanking, getRankings } from "./market-rankings";

const rankings = getRankings();

describe("rankings", () => {
  it("covers every neighbourhood in each ordering", () => {
    const expected = Object.keys(AREA_BENCHMARKS).length;
    for (const ranking of rankings) {
      expect(ranking.areas, ranking.slug).toHaveLength(expected);
    }
  });

  it("sorts holding-value by year-over-year, best first", () => {
    const areas = getRanking("holding-value")!.areas;
    const sorted = [...areas].sort((a, b) => b.yoy - a.yoy);
    expect(areas.map((a) => a.slug)).toEqual(sorted.map((a) => a.slug));
  });

  it("sorts most-affordable by composite price, cheapest first", () => {
    const areas = getRanking("most-affordable")!.areas;
    const sorted = [...areas].sort((a, b) => a.price - b.price);
    expect(areas.map((a) => a.slug)).toEqual(sorted.map((a) => a.slug));
  });

  it("computes vs-region from the real regional composite", () => {
    for (const area of rankings[0].areas) {
      const expected = Number(
        ((area.price / REGION_BENCHMARKS.composite.price - 1) * 100).toFixed(1),
      );
      expect(area.vsRegion, area.slug).toBe(expected);
    }
  });

  it("links only to property-type pages that exist", () => {
    for (const ranking of rankings) {
      for (const area of ranking.areas) {
        for (const type of area.types) {
          const slug = type.href.split("/").pop()!;
          const parsed = propertyTypeFromSlug(slug);
          expect(parsed, type.href).not.toBeNull();
          expect(getMarketPage(area.slug, parsed!), type.href).not.toBeNull();
        }
      }
    }
  });

  it("names the actual leaders in the quotable summary", () => {
    const ranking = getRanking("holding-value")!;
    expect(ranking.summary).toContain(ranking.areas[0].name);
    expect(ranking.summary).toContain(
      ranking.areas[ranking.areas.length - 1].name,
    );
    // Still legible quoted on its own, per the GEO guidance.
    expect(ranking.summary.split(". ").length).toBeGreaterThanOrEqual(3);
  });

  it("gives every ranking a unique path and slug", () => {
    expect(new Set(rankings.map((r) => r.path)).size).toBe(rankings.length);
    expect(new Set(rankings.map((r) => r.slug)).size).toBe(rankings.length);
  });

  it("does not collide with the per-area price page routes", () => {
    // /market/holding-value must not be mistaken for /market/<area>.
    for (const ranking of rankings) {
      expect(AREA_BENCHMARKS[ranking.slug]).toBeUndefined();
    }
  });

  it("returns null for an unknown ranking", () => {
    expect(getRanking("nope")).toBeNull();
  });

  it("never emits a placeholder or NaN in rendered copy", () => {
    for (const ranking of rankings) {
      const text = [
        ranking.title,
        ranking.description,
        ranking.summary,
        ...ranking.faqs.flatMap((f) => [f.q, f.a]),
      ].join(" ");
      expect(text, ranking.slug).not.toMatch(/NaN|undefined|null|\$0\b/);
    }
  });

  it("answers each question in the FAQ rather than deflecting", () => {
    for (const ranking of rankings) {
      expect(ranking.faqs.length).toBeGreaterThanOrEqual(3);
      for (const faq of ranking.faqs) {
        expect(faq.q.endsWith("?"), faq.q).toBe(true);
        expect(faq.a.length, faq.q).toBeGreaterThan(80);
      }
    }
  });
});
