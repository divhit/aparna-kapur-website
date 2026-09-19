import { beforeEach, describe, expect, it, vi } from "vitest";

const { pushLeadToCrm, fetchListings } = vi.hoisted(() => ({
  pushLeadToCrm: vi.fn(async () => true),
  fetchListings: vi.fn(),
}));

vi.mock("@/lib/crm", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/crm")>();
  return { ...actual, pushLeadToCrm };
});
vi.mock("@/lib/ddf", () => ({ fetchListings }));

import { callTool, CONNECTOR_TOOLS, matchPlace, toolInputSchema } from "./connector";
import { NAP, SERVICE_AREA, SITE_URL } from "./site";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";

describe("tool catalogue", () => {
  it("names every tool in snake_case with a description an agent can act on", () => {
    for (const tool of CONNECTOR_TOOLS) {
      expect(tool.name).toMatch(/^[a-z_]+$/);
      expect(tool.description.length).toBeGreaterThan(60);
      expect(tool.title.length).toBeGreaterThan(3);
    }
    expect(new Set(CONNECTOR_TOOLS.map((tool) => tool.name)).size).toBe(CONNECTOR_TOOLS.length);
  });

  it("marks only the booking tool as mutating", () => {
    expect(CONNECTOR_TOOLS.filter((tool) => tool.mutates).map((tool) => tool.name)).toEqual([
      "book_consultation",
    ]);
  });

  it("publishes a JSON Schema object for every tool input", () => {
    for (const tool of CONNECTOR_TOOLS) {
      const schema = toolInputSchema(tool);
      expect(schema.type).toBe("object");
      expect(schema.$schema).toBeUndefined();
      expect(schema.properties).toBeDefined();
    }
    const booking = toolInputSchema(CONNECTOR_TOOLS.find((t) => t.name === "book_consultation")!);
    expect(booking.required).toEqual(["name", "intent"]);
  });
});

describe("matchPlace", () => {
  it("resolves every published neighbourhood by name and by slug", () => {
    for (const hood of Object.values(NEIGHBOURHOODS)) {
      expect(matchPlace(hood.name).neighbourhood?.slug).toBe(hood.slug);
      expect(matchPlace(hood.slug).neighbourhood?.slug).toBe(hood.slug);
    }
  });

  it("resolves the North Shore municipalities and their aliases", () => {
    expect(matchPlace("North Van").area?.name).toBe("North Vancouver");
    expect(matchPlace("north vancouver, bc").area?.name).toBe("North Vancouver");
    expect(matchPlace("West Van").area?.name).toBe("West Vancouver");
    expect(matchPlace("Ambleside").area?.name).toBe("West Vancouver");
    expect(matchPlace("Lynn Valley").area?.name).toBe("North Vancouver");
  });

  it("does not claim places outside the practice", () => {
    expect(matchPlace("Burnaby")).toEqual({});
    expect(matchPlace("Surrey")).toEqual({});
    expect(matchPlace("Toronto")).toEqual({});
  });

  it("names every service-area municipality once, with a starting page", () => {
    for (const area of SERVICE_AREA) {
      expect(area.start.startsWith("/")).toBe(true);
      expect(matchPlace(area.name).area?.name).toBe(area.name);
    }
  });
});

describe("callTool", () => {
  beforeEach(() => {
    pushLeadToCrm.mockClear();
    fetchListings.mockReset();
    delete process.env.RESEND_API_KEY;
  });

  it("rejects an unknown tool with 404", async () => {
    const outcome = await callTool("nope", {}, {});
    expect(outcome).toMatchObject({ ok: false, status: 404 });
  });

  it("rejects bad arguments with 400 and names the field", async () => {
    const outcome = await callTool("check_service_area", {}, {});
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.status).toBe(400);
      expect(outcome.error).toContain("place");
    }
  });

  it("get_agent_profile states the canonical contact details and service area", async () => {
    const outcome = await callTool("get_agent_profile", {}, {});
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.text).toContain(NAP.telephone);
      expect(outcome.result.text).toContain(NAP.email);
      expect(outcome.result.data.serviceArea).toEqual(["Vancouver", "North Vancouver", "West Vancouver"]);
    }
  });

  it("check_service_area says yes to West Vancouver and points at contact", async () => {
    const outcome = await callTool("check_service_area", { place: "West Vancouver" }, {});
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.data.served).toBe(true);
      expect(outcome.result.data.municipality).toBe("West Vancouver");
      expect(outcome.result.text).toContain(`${SITE_URL}/contact`);
    }
  });

  it("check_service_area returns the guide and benchmark for a Vancouver neighbourhood", async () => {
    const outcome = await callTool("check_service_area", { place: "Oakridge" }, {});
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      const hood = outcome.result.data.neighbourhood as Record<string, unknown>;
      expect(hood.guideUrl).toBe(`${SITE_URL}/neighborhoods/oakridge`);
      expect(hood.benchmarkPrice).toBe(NEIGHBOURHOODS.oakridge.avgPrice);
    }
  });

  it("check_service_area says no, honestly, for Burnaby", async () => {
    const outcome = await callTool("check_service_area", { place: "Burnaby" }, {});
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.data.served).toBe(false);
      expect(outcome.result.text).toContain("outside");
      expect(outcome.result.text).toContain(NAP.telephone);
    }
  });

  it("get_market_snapshot carries the region table and a local benchmark when asked", async () => {
    const region = await callTool("get_market_snapshot", {}, {});
    expect(region.ok).toBe(true);
    if (region.ok) {
      expect(region.result.text).toContain("Composite");
      expect(region.result.data.neighbourhood).toBeUndefined();
    }
    const local = await callTool("get_market_snapshot", { area: "Kerrisdale" }, {});
    expect(local.ok).toBe(true);
    if (local.ok) {
      expect((local.result.data.neighbourhood as Record<string, unknown>).name).toBe("Kerrisdale");
      expect(local.result.text).toContain("## Kerrisdale");
    }
  });

  it("search_listings maps arguments onto the DDF query and links each result", async () => {
    fetchListings.mockResolvedValue({
      totalCount: 1,
      listings: [
        {
          listingKey: "abc123",
          listingId: "R1",
          listPrice: 1250000,
          address: "123 W 41st Ave",
          city: "Vancouver",
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1400,
          structureType: "Row / Townhouse",
          status: "Active",
          latitude: 0,
          longitude: 0,
          photos: ["https://example.test/p.jpg"],
          realtorUrl: "https://www.realtor.ca/x",
          modifiedAt: "2026-09-01",
        },
      ],
    });
    const outcome = await callTool(
      "search_listings",
      { area: "Oakridge", propertyType: "townhouse", maxPrice: 1500000, minBedrooms: 3, limit: 5 },
      {},
    );
    expect(fetchListings).toHaveBeenCalledWith(
      expect.objectContaining({
        neighbourhood: "oakridge",
        structureType: "Row / Townhouse",
        maxPrice: 1500000,
        minBedrooms: 3,
        top: 5,
      }),
    );
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.text).toContain("123 W 41st Ave");
      expect(outcome.result.text).toContain(`${SITE_URL}/property/abc123`);
      expect(outcome.result.data.count).toBe(1);
    }
  });

  it("search_listings degrades to the search page when the feed is down", async () => {
    fetchListings.mockRejectedValue(new Error("DDF down"));
    const outcome = await callTool("search_listings", {}, {});
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.isError).toBe(true);
      expect(outcome.result.text).toContain(`${SITE_URL}/buying/search`);
    }
  });

  it("book_consultation creates a lead tagged with the calling assistant", async () => {
    const outcome = await callTool(
      "book_consultation",
      { name: "Sam Lee", phone: "604-555-0123", intent: "valuation", address: "123 Main St, West Vancouver", area: "West Vancouver" },
      { client: "Meta Muse" },
    );
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.data.submitted).toBe(true);
      expect(outcome.result.data.reference).toMatch(/^AK-[A-Z0-9]+$/);
      expect(outcome.result.text).toContain("123 Main St");
    }
    expect(pushLeadToCrm).toHaveBeenCalledTimes(1);
    const lead = (pushLeadToCrm.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(lead).toMatchObject({
      first_name: "Sam",
      last_name: "Lee",
      phone: "604-555-0123",
      contact_type: "seller",
      lead_source: "website",
      buyer_areas: ["West Vancouver"],
    });
    expect(lead.tags).toContain("Connector: Meta Muse");
  });

  it("book_consultation refuses a lead with no way to reply and creates nothing", async () => {
    const outcome = await callTool("book_consultation", { name: "Sam Lee", intent: "call" }, {});
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.isError).toBe(true);
      expect(outcome.result.text).toMatch(/email address or a phone number/);
    }
    expect(pushLeadToCrm).not.toHaveBeenCalled();
  });

  it("book_consultation honours the rate limiter and read tools ignore it", async () => {
    const limit = vi.fn(() => ({ allowed: false, retryAfterSeconds: 60 }));
    const blocked = await callTool(
      "book_consultation",
      { name: "Sam Lee", email: "sam@example.com", intent: "call" },
      { limit },
    );
    expect(blocked).toMatchObject({ ok: false, status: 429 });
    expect(pushLeadToCrm).not.toHaveBeenCalled();

    const read = await callTool("get_agent_profile", {}, { limit });
    expect(read.ok).toBe(true);
    expect(limit).toHaveBeenCalledTimes(1);
  });
});
