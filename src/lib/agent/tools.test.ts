import { describe, expect, it } from "vitest";
import { SITE_TOOLS, MCP_INSTRUCTIONS, getTool } from "./tools";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";

/**
 * The tool surface is the part of the site an agent reads before it reads
 * anything else. These tests guard the two things that break silently: a
 * malformed schema (the tool is dropped by the client, and nobody sees an
 * error), and a description that stops saying what the tool is for.
 */

describe("tool registry", () => {
  it("has unique, well-formed names", () => {
    const names = SITE_TOOLS.map((tool) => tool.name);
    expect(new Set(names).size).toBe(names.length);

    for (const name of names) {
      // MCP: letters, digits, underscore, hyphen, dot; 1–128 characters.
      expect(name).toMatch(/^[A-Za-z0-9_.-]{1,128}$/);
    }
  });

  it("gives every tool a description that says what it returns", () => {
    for (const tool of SITE_TOOLS) {
      expect(tool.title.length).toBeGreaterThan(0);
      // Short descriptions are the main cause of an agent picking the wrong
      // tool, so hold a floor on them.
      expect(tool.description.length).toBeGreaterThan(80);
      expect(tool.description).toMatch(/vancouver/i);
    }
  });

  it("exposes valid JSON Schema for every input", () => {
    for (const tool of SITE_TOOLS) {
      expect(tool.inputSchema.type).toBe("object");
      expect(tool.inputSchema.additionalProperties).toBe(false);
      expect(tool.inputSchema.properties).toBeTypeOf("object");

      // Every required key must actually be declared.
      for (const key of tool.inputSchema.required ?? []) {
        expect(Object.keys(tool.inputSchema.properties)).toContain(key);
      }

      // Every declared property needs a description — it is the only thing
      // the model sees when deciding what to pass.
      for (const [key, schema] of Object.entries(tool.inputSchema.properties)) {
        expect(
          (schema as { description?: string }).description,
          `${tool.name}.${key}`,
        ).toBeTruthy();
      }
    }
  });

  it("keeps neighbourhood enums in step with the neighbourhood data", () => {
    const slugs = Object.keys(NEIGHBOURHOODS).sort();

    for (const tool of SITE_TOOLS) {
      const property = tool.inputSchema.properties.neighbourhood as
        { enum?: string[] } | undefined;
      if (property?.enum) {
        expect(property.enum).toEqual(slugs);
      }
    }
  });

  it("does not advertise a tool that writes anything", () => {
    // The lead-draft tool is registered in the page only, never here, because
    // its safety model is a human pressing send. If one ever appears on the
    // remote surface it should be a deliberate, reviewed change.
    for (const tool of SITE_TOOLS) {
      expect(tool.name).not.toMatch(/submit|send|book|create|prepare/i);
    }
  });

  it("resolves tools by name and rejects unknown ones", () => {
    expect(getTool("list_vancouver_neighbourhoods")).toBeDefined();
    expect(getTool("drop_database")).toBeUndefined();
  });

  it("tells a client where the site's answers stop", () => {
    expect(MCP_INSTRUCTIONS).toMatch(/read-only/i);
    expect(MCP_INSTRUCTIONS).toMatch(/Do not use these for/i);
  });
});

describe("tools that need no network", () => {
  it("lists neighbourhoods with benchmark prices", async () => {
    const result = await getTool("list_vancouver_neighbourhoods")!.execute({});
    expect(result.text).toContain("Oakridge");
    expect(result.data?.count).toBe(Object.keys(NEIGHBOURHOODS).length);
  });

  it("profiles a neighbourhood by slug and by display name", async () => {
    const tool = getTool("get_vancouver_neighbourhood_profile")!;

    const bySlug = await tool.execute({ neighbourhood: "oakridge" });
    const byName = await tool.execute({ neighbourhood: "Oakridge" });

    expect(bySlug.data?.found).toBe(true);
    expect(byName.data?.found).toBe(true);
    expect(byName.data?.slug).toBe("oakridge");
  });

  it("says so, rather than throwing, for an unknown neighbourhood", async () => {
    const result = await getTool(
      "get_vancouver_neighbourhood_profile",
    )!.execute({
      neighbourhood: "burnaby",
    });
    expect(result.data?.found).toBe(false);
    expect(result.text).toMatch(/not covered/i);
  });

  it("returns the market snapshot with a source", async () => {
    const result = await getTool("get_vancouver_market_snapshot")!.execute({});
    expect(result.text).toMatch(/Greater Vancouver REALTORS/);
    expect(Array.isArray(result.data?.metrics)).toBe(true);
  });

  it("searches articles and reports an empty result plainly", async () => {
    const tool = getTool("search_vancouver_real_estate_articles")!;

    const hit = await tool.execute({ query: "market" });
    expect(hit.data?.count).toBeGreaterThan(0);

    const miss = await tool.execute({ query: "zzzzqqqq" });
    expect(miss.data?.count).toBe(0);
  });

  it("returns contact routes without offering to submit anything", async () => {
    const result = await getTool("get_realtor_contact_options")!.execute({
      topic: "home_valuation",
    });
    expect(result.text).toContain("604-612-7694");
    expect(result.text).toContain("/selling/home-valuation");
    expect(result.data?.submitsOnBehalf).toBe(false);
  });
});
