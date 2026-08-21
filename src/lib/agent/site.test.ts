import { describe, expect, it } from "vitest";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import {
  AGENT_ENDPOINTS,
  BRAND,
  endSentence,
  FAQS,
  MARKET_SNAPSHOT,
  NAP,
  NAP_ONE_LINE,
  NEIGHBOURHOOD_COUNT,
  SAME_AS,
  SITE_URL,
  SPECIALTY_NEIGHBOURHOODS,
  SPECIALTY_SENTENCE,
  TOP_LEVEL_SECTIONS,
  WHEN_NOT_TO_USE,
  WHEN_TO_USE,
} from "./site";

describe("NAP consistency", () => {
  // Brand-name discoverability depends on one spelling of the name, address,
  // and phone number everywhere. These are the values every representation and
  // every schema reads from.
  it("keeps the phone number in one format, plus its E.164 twin", () => {
    expect(NAP.telephone).toMatch(/^\d{3}-\d{3}-\d{4}$/);
    expect(NAP.telephoneE164).toBe(`+1-${NAP.telephone}`);
  });

  it("builds the one-line address from the address parts", () => {
    expect(NAP_ONE_LINE).toContain(NAP.brokerage);
    expect(NAP_ONE_LINE).toContain(NAP.streetAddress);
    expect(NAP_ONE_LINE).toContain(NAP.postalCode);
  });

  it("uses an apex-consistent canonical URL with no trailing slash", () => {
    expect(SITE_URL).toBe("https://www.aparnakapur.com");
    expect(SITE_URL.endsWith("/")).toBe(false);
  });

  it("lists only absolute, first-party profile URLs in sameAs", () => {
    for (const url of SAME_AS) {
      expect(url.startsWith("https://")).toBe(true);
    }
  });

  it("gives the brand alternate names that do not repeat the primary name", () => {
    expect(BRAND.alternateNames.length).toBeGreaterThan(0);
    expect(BRAND.alternateNames).not.toContain(BRAND.name);
    for (const name of BRAND.alternateNames) {
      expect(name).toContain("Aparna Kapur");
    }
  });
});

describe("endSentence", () => {
  it("does not double the full stop after an abbreviation", () => {
    expect(endSentence("Oakwyn Realty Ltd.")).toBe("Oakwyn Realty Ltd.");
    expect(endSentence("Vancouver")).toBe("Vancouver.");
  });
});

describe("derived counts", () => {
  it("reads the neighbourhood count from the neighbourhood data", () => {
    expect(NEIGHBOURHOOD_COUNT).toBe(Object.keys(NEIGHBOURHOODS).length);
  });

  it("names every specialty neighbourhood in the prose sentence", () => {
    for (const name of SPECIALTY_NEIGHBOURHOODS) {
      expect(SPECIALTY_SENTENCE).toContain(name);
    }
  });

  it("has a published guide for every specialty neighbourhood", () => {
    const names = Object.values(NEIGHBOURHOODS).map((hood) => hood.name);
    for (const name of SPECIALTY_NEIGHBOURHOODS) {
      expect(names).toContain(name);
    }
  });
});

describe("when-to-use guidance", () => {
  it("points every entry at a real starting path", () => {
    for (const use of WHEN_TO_USE) {
      expect(use.start.startsWith("/")).toBe(true);
      expect(use.job.length).toBeGreaterThan(10);
      expect(use.detail.length).toBeGreaterThan(30);
    }
  });

  it("states the limits as well as the strengths", () => {
    expect(WHEN_TO_USE.length).toBeGreaterThanOrEqual(5);
    expect(WHEN_NOT_TO_USE.length).toBeGreaterThanOrEqual(3);
  });
});

describe("indexes used for recovery", () => {
  it("lists the machine-readable endpoints as absolute site paths", () => {
    const paths = AGENT_ENDPOINTS.map((endpoint) => endpoint.path);
    expect(paths).toContain("/llms.txt");
    expect(paths).toContain("/agents.md");
    expect(paths).toContain("/sitemap.xml");
    for (const path of paths) expect(path.startsWith("/")).toBe(true);
  });

  it("covers every top-level section a 404 should offer", () => {
    const paths = TOP_LEVEL_SECTIONS.map((section) => section.path);
    expect(paths).toContain("/neighborhoods");
    expect(paths).toContain("/buying");
    expect(paths).toContain("/selling");
    expect(paths).toContain("/contact");
  });
});

describe("FAQs", () => {
  it("answers with the canonical contact details", () => {
    const contact = FAQS.find((faq) => faq.q.includes("contact"));
    expect(contact?.a).toContain(NAP.telephone);
    expect(contact?.a).toContain(NAP.email);
  });

  it("never doubles a full stop after the brokerage name", () => {
    for (const faq of FAQS) {
      expect(faq.a).not.toContain("Ltd..");
    }
  });
});

describe("market snapshot", () => {
  it("gives each metric a value, a context line, and two label lines", () => {
    expect(MARKET_SNAPSHOT.metrics).toHaveLength(6);
    for (const metric of MARKET_SNAPSHOT.metrics) {
      expect(metric.value.length).toBeGreaterThan(0);
      expect(metric.context.length).toBeGreaterThan(0);
      expect(metric.labelLines).toHaveLength(2);
      expect(metric.labelLines.join(" ")).toBe(metric.label);
    }
  });

  it("cites the source and the period in one place", () => {
    expect(MARKET_SNAPSHOT.source).toContain(MARKET_SNAPSHOT.label);
    expect(MARKET_SNAPSHOT.heading).toContain(MARKET_SNAPSHOT.label);
  });
});
