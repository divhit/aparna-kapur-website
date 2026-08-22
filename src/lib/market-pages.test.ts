import { describe, expect, it } from "vitest";
import { NEIGHBOURHOODS } from "./neighborhoods";
import {
  AREA_BENCHMARKS,
  REGION_BENCHMARKS,
  formatPrice,
  publishedCombinations,
} from "./market-data";
import {
  getAllMarketPages,
  getMarketPage,
  marketPagePath,
  propertyTypeFromSlug,
  PROPERTY_TYPES,
} from "./market-pages";

describe("market data", () => {
  it("covers every neighbourhood the site publishes a guide for", () => {
    for (const slug of Object.keys(NEIGHBOURHOODS)) {
      expect(AREA_BENCHMARKS[slug]).toBeDefined();
    }
  });

  it("carries a composite benchmark for every area", () => {
    for (const [slug, area] of Object.entries(AREA_BENCHMARKS)) {
      expect(area.composite.price, slug).toBeGreaterThan(100_000);
      expect(area.subArea.length, slug).toBeGreaterThan(0);
    }
  });

  // The gaps are the point: GVR publishes no benchmark where the sample is
  // too thin, and a page must never be generated for one.
  it("leaves the unpublished property types absent rather than interpolated", () => {
    expect(AREA_BENCHMARKS["downtown"].detached).toBeUndefined();
    expect(AREA_BENCHMARKS["west-end"].detached).toBeUndefined();
    expect(AREA_BENCHMARKS["fairview"].detached).toBeUndefined();
    expect(AREA_BENCHMARKS["arbutus-ridge"].townhouse).toBeUndefined();
  });

  it("formats prices the way the rest of the site writes them", () => {
    expect(formatPrice(1_433_200)).toBe("$1.43M");
    expect(formatPrice(714_000)).toBe("$714K");
    expect(formatPrice(992_900)).toBe("$993K");
  });
});

describe("getMarketPage", () => {
  it("builds a page for every published combination and only those", () => {
    const combos = publishedCombinations();
    expect(getAllMarketPages()).toHaveLength(combos.length);
    expect(combos.length).toBe(62);
  });

  it("returns null where GVR publishes no benchmark", () => {
    expect(getMarketPage("downtown", "detached")).toBeNull();
    expect(getMarketPage("arbutus-ridge", "townhouse")).toBeNull();
  });

  it("returns null for an area that does not exist", () => {
    expect(getMarketPage("not-a-neighbourhood", "condo" as never)).toBeNull();
  });

  it("states the benchmark, the direction, and the comparison in the summary", () => {
    const page = getMarketPage("kitsilano", "apartment")!;
    expect(page.summary).toContain("$714K");
    expect(page.summary).toContain("Kitsilano");
    // The comparison is the reason the page exists.
    expect(page.summary).toContain("Metro Vancouver");
    expect(page.summary.split(". ").length).toBeGreaterThanOrEqual(3);
  });

  it("computes the comparison against the region from the real figures", () => {
    const page = getMarketPage("kitsilano", "apartment")!;
    const expected = Number(
      (
        (page.benchmark.price / REGION_BENCHMARKS.apartment.price - 1) *
        100
      ).toFixed(1),
    );
    expect(page.vsRegion).toBe(expected);
    expect(page.resilience).toBeCloseTo(
      Math.abs(REGION_BENCHMARKS.apartment.yoy) - Math.abs(page.benchmark.yoy),
      1,
    );
  });

  it("ranks the area against its peers for that property type", () => {
    const page = getMarketPage("shaughnessy", "detached")!;
    expect(page.rank).toBe(1); // the most expensive detached benchmark
    expect(page.rank).toBeLessThanOrEqual(page.rankOf);
    expect(page.cheaper).toBe(page.rankOf - page.rank);
  });

  it("links only to sibling types that actually have a benchmark", () => {
    const downtown = getMarketPage("downtown", "apartment")!;
    expect(downtown.siblings.map((s) => s.type)).not.toContain("detached");
    for (const page of getAllMarketPages()) {
      for (const sibling of page.siblings) {
        expect(getMarketPage(page.areaSlug, sibling.type)).not.toBeNull();
      }
    }
  });

  it("suggests comparables that exist and are not the page itself", () => {
    for (const page of getAllMarketPages()) {
      for (const comparable of page.comparables) {
        expect(comparable.slug).not.toBe(page.areaSlug);
        expect(getMarketPage(comparable.slug, page.type)).not.toBeNull();
      }
    }
  });

  it("gives every page four answerable questions", () => {
    for (const page of getAllMarketPages()) {
      expect(page.faqs).toHaveLength(4);
      for (const faq of page.faqs) {
        expect(faq.q.endsWith("?"), faq.q).toBe(true);
        expect(faq.a.length).toBeGreaterThan(60);
      }
    }
  });

  it("says plainly that a benchmark is not an appraisal", () => {
    const page = getMarketPage("oakridge", "detached")!;
    expect(page.faqs.some((faq) => /appraisal/i.test(faq.a))).toBe(true);
  });

  it("never emits a placeholder or NaN in rendered copy", () => {
    for (const page of getAllMarketPages()) {
      const text = [
        page.title,
        page.description,
        page.summary,
        ...page.faqs.map((f) => f.a),
      ].join(" ");
      expect(text, page.path).not.toMatch(/NaN|undefined|null|\$0\b/);
    }
  });
});

describe("routing", () => {
  it("uses URL segments that carry the query terms", () => {
    expect(marketPagePath("kitsilano", "apartment")).toBe(
      "/market/kitsilano/condo-prices",
    );
    expect(marketPagePath("kerrisdale", "detached")).toBe(
      "/market/kerrisdale/house-prices",
    );
  });

  it("round-trips a type through its slug", () => {
    for (const [type, meta] of Object.entries(PROPERTY_TYPES)) {
      expect(propertyTypeFromSlug(meta.slug)).toBe(type);
    }
    expect(propertyTypeFromSlug("nope")).toBeNull();
  });

  it("gives every page a unique path", () => {
    const paths = getAllMarketPages().map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe("per-page character", () => {
  const pages = getAllMarketPages();

  it("says something on every page", () => {
    for (const page of pages) {
      expect(page.character.length, page.path).toBeGreaterThan(120);
    }
  });

  // The point of this paragraph is that it differs. If pages share it, it is
  // template filler and the scaled-content risk is back.
  it("is not the same text across pages", () => {
    const unique = new Set(pages.map((page) => page.character));
    expect(unique.size / pages.length).toBeGreaterThan(0.9);
  });

  it("describes the real position within the area's own range", () => {
    // Downtown publishes condos but no detached, so its condo page cannot
    // claim to be the cheapest of three.
    const downtown = getMarketPage("downtown", "apartment")!;
    expect(downtown.character).not.toContain("detached");
  });

  it("never emits a placeholder", () => {
    for (const page of pages) {
      expect(page.character, page.path).not.toMatch(/NaN|undefined|\$0\b/);
    }
  });
});

describe("Aparna's commentary", () => {
  const pages = getAllMarketPages();

  it("gives every page four paragraphs of substance", () => {
    for (const page of pages) {
      // Four generated paragraphs, five where Aparna has added her own note.
      expect(page.commentary.length, page.path).toBeGreaterThanOrEqual(4);
      for (const paragraph of page.commentary) {
        expect(paragraph.length, page.path).toBeGreaterThan(150);
      }
    }
  });

  it("reads as one voice across pages but not one text", () => {
    const first = new Set(pages.map((page) => page.commentary[0]));
    // The opening paragraph turns on where the type sits in its own area, so
    // it must vary; if it collapses to a handful of strings it is boilerplate.
    expect(first.size).toBeGreaterThan(pages.length * 0.55);
  });

  // Nothing here may claim a first-hand event that did not happen. Aparna can
  // add real ones; generated copy must not invent them.
  it("never fabricates a specific first-hand anecdote", () => {
    // First-person claims about specific events. A bare "in the last month" is
    // fine — that describes the index, not something Aparna did.
    const invented =
      /\b(a client of mine|one of my (buyers|clients|sellers)|I (sold|showed|listed|toured|visited|walked through)\b|I was (there|in) |recently helped|just last (week|month))/i;
    for (const page of pages) {
      for (const paragraph of page.commentary) {
        expect(paragraph, page.path).not.toMatch(invented);
      }
    }
  });

  // A licensed agent putting a price forecast in writing is a regulatory
  // problem as well as bad practice.
  it("never forecasts prices", () => {
    const forecast =
      /\b(will (rise|fall|increase|drop|go up|go down)|guaranteed to|is going to (rise|fall)|expect prices to)\b/i;
    for (const page of pages) {
      for (const paragraph of page.commentary) {
        expect(paragraph, page.path).not.toMatch(forecast);
      }
    }
  });

  it("states no impossible percentage", () => {
    for (const page of pages) {
      for (const paragraph of page.commentary) {
        // Nothing can cost more than 100% less than something else.
        expect(paragraph, page.path).not.toMatch(/\b(?:1\d\d|[2-9]\d\d)% less\b/);
      }
    }
  });

  it("closes by inviting a question rather than pressing for a sale", () => {
    for (const page of pages) {
      expect(page.commentary.at(-1), page.path).toMatch(/no obligation/i);
    }
  });
});
