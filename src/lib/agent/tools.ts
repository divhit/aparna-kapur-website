/**
 * The site's tool surface — the callable half of the machine-readable site.
 *
 * `llms.txt`, `agents.md`, and the markdown representations tell an agent what
 * this site *knows*. These tools let it *ask*. One definition per capability,
 * consumed by three callers that must never drift apart:
 *
 *   1. `src/components/agent/WebMcpTools.tsx` — registers them on
 *      `document.modelContext` for an agent operating inside the visitor's
 *      browser (WebMCP).
 *   2. `src/app/mcp/route.ts` — serves them over JSON-RPC so a remote MCP
 *      client (a Claude or ChatGPT connector) can call them directly.
 *   3. Cloudflare's WebMCP bridge, if the dashboard toggle is ever enabled —
 *      it discovers a site's own MCP server and proxies to `/mcp`.
 *
 * Every tool here is read-only. Nothing writes to the CRM, sends mail, or
 * books anything. A WebMCP tool runs inside the visitor's authenticated
 * same-origin session, so a write tool would be reachable by any agent a
 * visitor happens to be running — including one steered by text on a page we
 * do not control. `request_contact` therefore returns the route a human can
 * take rather than taking it for them; a lead Aparna receives should always be
 * one an actual person chose to send.
 *
 * Descriptions are the ranking surface. An agent picks a tool from its name
 * and description alone, before it sees any output, so each one states what it
 * returns, what it covers, and where its coverage stops.
 */

import { blogPosts, type BlogPost } from "@/lib/blog";
import { fetchListingByKey, fetchListings, type DDFProperty } from "@/lib/ddf";
import { NEIGHBOURHOODS, getNeighbourhood } from "@/lib/neighborhoods";
import {
  BRAND,
  MARKET_SNAPSHOT,
  NAP,
  NAP_ONE_LINE,
  SITE_URL,
  SPECIALTY_SENTENCE,
  WHEN_NOT_TO_USE,
} from "@/lib/agent/site";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type JsonSchema = {
  type: "object";
  properties: Record<string, unknown>;
  required?: string[];
  additionalProperties: false;
};

/**
 * What a tool hands back. `text` is what a model reads; `data` is the same
 * answer structured, surfaced as MCP `structuredContent` for callers that
 * would rather parse than re-read prose.
 */
export type ToolResult = {
  text: string;
  data?: Record<string, unknown>;
};

export type SiteTool = {
  name: string;
  title: string;
  description: string;
  inputSchema: JsonSchema;
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
};

// ---------------------------------------------------------------------------
// Argument coercion
//
// Arguments arrive from a model, so they arrive loosely typed: "750000" for a
// number, "Oakridge" for a slug, an absent optional that the schema said was
// optional. Coerce rather than reject — a tool call that fails on a string
// that obviously meant a number is a tool the agent stops choosing.
// ---------------------------------------------------------------------------

function asString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  return undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[$,\s]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function asLimit(value: unknown, fallback: number, max: number): number {
  const parsed = asNumber(value);
  if (parsed === undefined) return fallback;
  return Math.min(Math.max(Math.round(parsed), 1), max);
}

const NEIGHBOURHOOD_SLUGS = Object.keys(NEIGHBOURHOODS).sort();

/** Accept a slug, a display name, or something close to either. */
function resolveNeighbourhoodSlug(value: unknown): string | undefined {
  const raw = asString(value);
  if (!raw) return undefined;
  const normalized = raw.toLowerCase().replace(/[\s_]+/g, "-");
  if (NEIGHBOURHOODS[normalized]) return normalized;
  const byName = NEIGHBOURHOOD_SLUGS.find(
    (slug) => NEIGHBOURHOODS[slug].name.toLowerCase() === raw.toLowerCase(),
  );
  return byName;
}

/**
 * Friendly property types in, DDF `StructureType` values out. The site's own
 * search filters use the same mapping (`components/listings/SearchFilters.tsx`);
 * agents should not have to know CREA's vocabulary to ask for a condo.
 */
const STRUCTURE_TYPES: Record<string, string> = {
  house: "House",
  condo: "Apartment",
  apartment: "Apartment",
  townhouse: "Row / Townhouse",
  duplex: "Duplex",
};

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

function formatPrice(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "Price on request";
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  return `$${Math.round(value / 1000)}K`;
}

function formatListing(listing: DDFProperty): string {
  const parts = [
    listing.bedrooms ? `${listing.bedrooms} bed` : null,
    listing.bathrooms ? `${listing.bathrooms} bath` : null,
    listing.sqft ? `${listing.sqft.toLocaleString()} sqft` : null,
    listing.structureType ?? listing.propertySubType ?? null,
  ].filter(Boolean);

  const location = listing.neighbourhood
    ? `${listing.address}, ${listing.neighbourhood}`
    : listing.address;

  return [
    `- **${formatPrice(listing.listPrice)}** — ${location}`,
    parts.length ? `  ${parts.join(" · ")}` : null,
    `  ${SITE_URL}/property/${listing.listingKey}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * DDF credentials live only on the server and the feed can be down. Neither is
 * the agent's problem to debug: say what happened, then hand back the page a
 * human can use instead.
 */
function listingsUnavailable(error: unknown): ToolResult {
  console.error("MCP listing tool failed:", error);
  return {
    text: `Live MLS® search is unavailable right now. The full search is at ${SITE_URL}/buying/search, or reach ${BRAND.name} at ${NAP.telephone}.`,
    data: { available: false },
  };
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

const searchListings: SiteTool = {
  name: "search_vancouver_listings",
  title: "Search Vancouver MLS listings",
  description:
    "Search active MLS® residential listings in the City of Vancouver, British Columbia by neighbourhood, price range, bedrooms, bathrooms, and property type. Returns live listing data from CREA's Data Distribution Facility — address, asking price, bed/bath count, size, and a link to the full listing. Covers Vancouver proper only: not Burnaby, Richmond, Surrey, or the North Shore. Use this for what is on the market right now; use get_vancouver_neighbourhood_profile for what an area is like and what it typically costs.",
  inputSchema: {
    type: "object",
    properties: {
      neighbourhood: {
        type: "string",
        description:
          "Restrict to one Vancouver neighbourhood, by slug (for example 'oakridge' or 'kerrisdale'). Omit to search the whole city.",
        enum: NEIGHBOURHOOD_SLUGS,
      },
      minPrice: {
        type: "number",
        description: "Minimum asking price in Canadian dollars, e.g. 800000.",
      },
      maxPrice: {
        type: "number",
        description: "Maximum asking price in Canadian dollars, e.g. 1500000.",
      },
      minBedrooms: {
        type: "number",
        description: "Minimum number of bedrooms.",
      },
      minBathrooms: {
        type: "number",
        description: "Minimum number of bathrooms.",
      },
      propertyType: {
        type: "string",
        description: "Restrict to one kind of home.",
        enum: ["house", "condo", "townhouse", "duplex"],
      },
      limit: {
        type: "number",
        description: "How many listings to return, 1 to 25. Defaults to 10.",
      },
    },
    required: [],
    additionalProperties: false,
  },
  async execute(args) {
    const neighbourhood = resolveNeighbourhoodSlug(args.neighbourhood);
    const propertyType = asString(args.propertyType)?.toLowerCase();
    const limit = asLimit(args.limit, 10, 25);

    try {
      const { listings } = await fetchListings({
        neighbourhood,
        minPrice: asNumber(args.minPrice),
        maxPrice: asNumber(args.maxPrice),
        minBedrooms: asNumber(args.minBedrooms),
        minBathrooms: asNumber(args.minBathrooms),
        structureType: propertyType ? STRUCTURE_TYPES[propertyType] : undefined,
        top: limit,
      });

      const area = neighbourhood
        ? NEIGHBOURHOODS[neighbourhood].name
        : "Vancouver";

      if (!listings.length) {
        return {
          text: `No active listings in ${area} match those filters. Widening the price range or dropping the property-type filter usually helps. Full search: ${SITE_URL}/buying/search`,
          data: {
            count: 0,
            neighbourhood: neighbourhood ?? null,
            listings: [],
          },
        };
      }

      const shown = listings.slice(0, limit);
      return {
        text: [
          `${shown.length} active listing${shown.length === 1 ? "" : "s"} in ${area}:`,
          "",
          shown.map(formatListing).join("\n"),
          "",
          `Source: MLS® via CREA DDF®, live. Listed by various brokerages. Full search: ${SITE_URL}/buying/search`,
        ].join("\n"),
        data: {
          count: shown.length,
          neighbourhood: neighbourhood ?? null,
          listings: shown.map((listing) => ({
            listingKey: listing.listingKey,
            address: listing.address,
            neighbourhood: listing.neighbourhood ?? null,
            listPrice: listing.listPrice,
            bedrooms: listing.bedrooms ?? null,
            bathrooms: listing.bathrooms ?? null,
            sqft: listing.sqft ?? null,
            propertyType:
              listing.structureType ?? listing.propertySubType ?? null,
            url: `${SITE_URL}/property/${listing.listingKey}`,
          })),
        },
      };
    } catch (error) {
      return listingsUnavailable(error);
    }
  },
};

const getListing: SiteTool = {
  name: "get_vancouver_listing",
  title: "Get one Vancouver listing",
  description:
    "Fetch the full detail of a single active Vancouver MLS® listing by its listing key — price, address, bed/bath count, size, year built, parking, days on market, and the brokerage's public description. Get listing keys from search_vancouver_listings.",
  inputSchema: {
    type: "object",
    properties: {
      listingKey: {
        type: "string",
        description:
          "The MLS® listing key returned by search_vancouver_listings.",
      },
    },
    required: ["listingKey"],
    additionalProperties: false,
  },
  async execute(args) {
    const listingKey = asString(args.listingKey);
    if (!listingKey) {
      return {
        text: "A listingKey is required. Use search_vancouver_listings to find one.",
      };
    }

    try {
      const listing = await fetchListingByKey(listingKey);
      if (!listing) {
        return {
          text: `No active listing found for key ${listingKey}. It may have sold or been withdrawn. Current listings: ${SITE_URL}/buying/search`,
          data: { found: false },
        };
      }

      const facts = [
        ["Price", formatPrice(listing.listPrice)],
        ["Address", listing.address],
        ["Neighbourhood", listing.neighbourhood],
        ["Type", listing.structureType ?? listing.propertySubType],
        ["Bedrooms", listing.bedrooms],
        ["Bathrooms", listing.bathrooms],
        [
          "Size",
          listing.sqft ? `${listing.sqft.toLocaleString()} sqft` : undefined,
        ],
        ["Year built", listing.yearBuilt],
        ["Parking", listing.parking],
        ["Days on market", listing.daysOnMarket],
      ].filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      );

      return {
        text: [
          `# ${listing.address}`,
          "",
          facts.map(([label, value]) => `- **${label}:** ${value}`).join("\n"),
          listing.description ? `\n${listing.description}` : "",
          `\nFull listing: ${SITE_URL}/property/${listing.listingKey}`,
        ].join("\n"),
        data: { found: true, listing },
      };
    } catch (error) {
      return listingsUnavailable(error);
    }
  },
};

const getNeighbourhoodProfile: SiteTool = {
  name: "get_vancouver_neighbourhood_profile",
  title: "Get a Vancouver neighbourhood profile",
  description:
    "Get the benchmark price, year-over-year price change, walk and transit scores, defining characteristics, and notable transit stops, schools, and parks for one Vancouver neighbourhood. Benchmark prices come from the Greater Vancouver REALTORS® MLS® Home Price Index for the sub-area. Use this to answer what an area is like and what it costs; use search_vancouver_listings for individual homes currently for sale.",
  inputSchema: {
    type: "object",
    properties: {
      neighbourhood: {
        type: "string",
        description:
          "The neighbourhood slug, for example 'oakridge' or 'mount-pleasant'.",
        enum: NEIGHBOURHOOD_SLUGS,
      },
    },
    required: ["neighbourhood"],
    additionalProperties: false,
  },
  async execute(args) {
    const slug = resolveNeighbourhoodSlug(args.neighbourhood);
    const hood = slug ? getNeighbourhood(slug) : undefined;

    if (!hood || !slug) {
      return {
        text: `That neighbourhood is not covered. This site covers ${NEIGHBOURHOOD_SLUGS.length} Vancouver neighbourhoods: ${NEIGHBOURHOOD_SLUGS.join(", ")}.`,
        data: { found: false, available: NEIGHBOURHOOD_SLUGS },
      };
    }

    const pois = hood.fallbackPOIs
      .map(
        (poi) =>
          `- ${poi.name} (${poi.type})${poi.description ? ` — ${poi.description}` : ""}`,
      )
      .join("\n");

    return {
      text: [
        `# ${hood.name}, Vancouver`,
        "",
        hood.tagline,
        "",
        `- **Benchmark price:** ${hood.avgPrice} (${hood.priceChange})`,
        `- **Walk Score:** ${hood.walkScore} · **Transit Score:** ${hood.transitScore}`,
        "",
        "## What defines it",
        hood.highlights.map((h) => `- ${h}`).join("\n"),
        "",
        "## Nearby",
        pois,
        "",
        `Benchmark from the ${MARKET_SNAPSHOT.source}. Full guide: ${SITE_URL}/neighborhoods/${hood.slug}`,
      ].join("\n"),
      data: {
        found: true,
        slug: hood.slug,
        name: hood.name,
        tagline: hood.tagline,
        benchmarkPrice: hood.avgPrice,
        priceChange: hood.priceChange,
        walkScore: hood.walkScore,
        transitScore: hood.transitScore,
        highlights: hood.highlights,
        url: `${SITE_URL}/neighborhoods/${hood.slug}`,
      },
    };
  },
};

const listNeighbourhoods: SiteTool = {
  name: "list_vancouver_neighbourhoods",
  title: "List covered Vancouver neighbourhoods",
  description:
    "List every Vancouver neighbourhood this site covers, with each one's benchmark price and year-over-year change. Call this first when you need to know which neighbourhoods are available, or to compare prices across the city at a glance.",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false,
  },
  async execute() {
    const rows = NEIGHBOURHOOD_SLUGS.map((slug) => {
      const hood = NEIGHBOURHOODS[slug];
      return `- **${hood.name}** (\`${slug}\`) — ${hood.avgPrice}, ${hood.priceChange}`;
    });

    return {
      text: [
        `${NEIGHBOURHOOD_SLUGS.length} Vancouver neighbourhoods, with MLS® HPI benchmark prices from ${MARKET_SNAPSHOT.label}:`,
        "",
        rows.join("\n"),
        "",
        `Deepest coverage: ${SPECIALTY_SENTENCE}.`,
      ].join("\n"),
      data: {
        count: NEIGHBOURHOOD_SLUGS.length,
        neighbourhoods: NEIGHBOURHOOD_SLUGS.map((slug) => ({
          slug,
          name: NEIGHBOURHOODS[slug].name,
          benchmarkPrice: NEIGHBOURHOODS[slug].avgPrice,
          priceChange: NEIGHBOURHOODS[slug].priceChange,
          url: `${SITE_URL}/neighborhoods/${slug}`,
        })),
      },
    };
  },
};

const getMarketSnapshot: SiteTool = {
  name: "get_vancouver_market_snapshot",
  title: "Get the Vancouver market snapshot",
  description:
    "Get the current city-wide Vancouver real estate market statistics: composite benchmark price, month-over-month and year-over-year change, active listing count, and the sales-to-active-listings ratio that indicates whether the market favours buyers or sellers. Sourced from the most recent Greater Vancouver REALTORS® monthly MLS® Home Price Index release.",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false,
  },
  async execute() {
    return {
      text: [
        `# ${MARKET_SNAPSHOT.heading}`,
        "",
        MARKET_SNAPSHOT.metrics
          .map(
            (metric) =>
              `- **${metric.label}:** ${metric.value} — ${metric.context}`,
          )
          .join("\n"),
        "",
        `Source: ${MARKET_SNAPSHOT.source}`,
      ].join("\n"),
      data: {
        period: MARKET_SNAPSHOT.label,
        source: MARKET_SNAPSHOT.source,
        metrics: MARKET_SNAPSHOT.metrics.map((metric) => ({
          label: metric.label,
          value: metric.value,
          context: metric.context,
        })),
      },
    };
  },
};

const searchArticles: SiteTool = {
  name: "search_vancouver_real_estate_articles",
  title: "Search Vancouver market articles",
  description:
    "Search this site's Vancouver real estate writing — monthly market updates, neighbourhood reporting, BC property tax and foreign-buyer rules, and buyer and seller process guides. Returns matching articles with their publication date and a link. Use this for explanation and context; use get_vancouver_market_snapshot for current numbers.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "What to search for, e.g. 'property transfer tax', 'Oakridge Park', 'first-time buyer'.",
      },
      limit: {
        type: "number",
        description: "How many articles to return, 1 to 10. Defaults to 5.",
      },
    },
    required: ["query"],
    additionalProperties: false,
  },
  async execute(args) {
    const query = asString(args.query);
    const limit = asLimit(args.limit, 5, 10);

    if (!query) {
      return {
        text: "A search query is required, e.g. 'property transfer tax'.",
      };
    }

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = blogPosts
      .map((post) => ({ post, score: scorePost(post, terms) }))
      .filter((entry) => entry.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.post.datePublished.localeCompare(a.post.datePublished),
      )
      .slice(0, limit);

    if (!scored.length) {
      return {
        text: `No articles match "${query}". The full index is at ${SITE_URL}/resources/blog, and every page is available as markdown — see ${SITE_URL}/agents.md.`,
        data: { count: 0, articles: [] },
      };
    }

    return {
      text: [
        `${scored.length} article${scored.length === 1 ? "" : "s"} matching "${query}":`,
        "",
        scored
          .map(
            ({ post }) =>
              `- **${post.title}** (${post.date}, ${post.category})\n  ${post.excerpt}\n  ${SITE_URL}/resources/blog/${post.slug}`,
          )
          .join("\n"),
      ].join("\n"),
      data: {
        count: scored.length,
        articles: scored.map(({ post }) => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          url: `${SITE_URL}/resources/blog/${post.slug}`,
        })),
      },
    };
  },
};

/** Title hits count for more than body hits; a match anywhere still counts. */
function scorePost(post: BlogPost, terms: string[]): number {
  const title = post.title.toLowerCase();
  const excerpt = post.excerpt.toLowerCase();
  const body = post.content.toLowerCase();
  const category = post.category.toLowerCase();

  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 5;
    if (category.includes(term)) score += 3;
    if (excerpt.includes(term)) score += 2;
    if (body.includes(term)) score += 1;
  }
  return score;
}

const requestContact: SiteTool = {
  name: "get_realtor_contact_options",
  title: "Get contact options for Aparna Kapur",
  description:
    "Get the ways to reach Aparna Kapur, a licensed Vancouver real estate agent — phone, email, brokerage address, and the right page for a specific request such as a free home valuation or a buyer consultation. Use this when someone wants to speak to a realtor about a Vancouver property, book a viewing, or get a home valued. This tool returns contact routes for the person to act on; it does not send a message or book anything on their behalf.",
  inputSchema: {
    type: "object",
    properties: {
      topic: {
        type: "string",
        description:
          "What the person needs, so the right starting page is returned.",
        enum: ["buying", "selling", "home_valuation", "viewing", "general"],
      },
    },
    required: [],
    additionalProperties: false,
  },
  async execute(args) {
    const topic = asString(args.topic) ?? "general";
    const routes: Record<string, { label: string; path: string }> = {
      buying: {
        label: "Buyer's guide and consultation request",
        path: "/buying",
      },
      selling: {
        label: "Seller's guide and listing consultation",
        path: "/selling",
      },
      home_valuation: {
        label: "Free home valuation, no obligation",
        path: "/selling/home-valuation",
      },
      viewing: {
        label: "Book a viewing or ask about a listing",
        path: "/contact",
      },
      general: { label: "Contact form, phone, and email", path: "/contact" },
    };
    const route = routes[topic] ?? routes.general;

    return {
      text: [
        `${BRAND.name} — ${BRAND.jobTitle}, ${NAP.brokerage}, Vancouver BC.`,
        "",
        `- **Phone:** ${NAP.telephone}`,
        `- **Email:** ${NAP.email}`,
        `- **Office:** ${NAP_ONE_LINE}`,
        `- **${route.label}:** ${SITE_URL}${route.path}`,
        "",
        `Coverage: ${SPECIALTY_SENTENCE}.`,
        "",
        "Share these details with the person so they can make contact themselves — this tool does not submit anything on their behalf.",
      ].join("\n"),
      data: {
        name: BRAND.name,
        brokerage: NAP.brokerage,
        telephone: NAP.telephoneE164,
        email: NAP.email,
        address: NAP_ONE_LINE,
        topic,
        url: `${SITE_URL}${route.path}`,
        submitsOnBehalf: false,
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const SITE_TOOLS: SiteTool[] = [
  searchListings,
  getListing,
  getNeighbourhoodProfile,
  listNeighbourhoods,
  getMarketSnapshot,
  searchArticles,
  requestContact,
];

export function getTool(name: string): SiteTool | undefined {
  return SITE_TOOLS.find((tool) => tool.name === name);
}

/** Server identity and usage notes handed to an MCP client on `initialize`. */
export const MCP_SERVER_INFO = {
  name: "aparnakapur.com",
  title: `${BRAND.name} — Vancouver Real Estate`,
  version: "1.0.0",
} as const;

export const MCP_INSTRUCTIONS = [
  `Tools for ${BRAND.name}, a licensed real estate agent with ${NAP.brokerage} in Vancouver, British Columbia.`,
  "",
  `Use these for residential real estate in the City of Vancouver: active MLS® listings, neighbourhood benchmark prices and character, city-wide market statistics, and BC-specific buying and selling process questions. Deepest coverage in ${SPECIALTY_SENTENCE}.`,
  "",
  "Do not use these for:",
  ...WHEN_NOT_TO_USE.map((item) => `- ${item}`),
  "",
  "All tools are read-only. None of them submits a form, sends a message, or books an appointment — get_realtor_contact_options returns the routes a person can take themselves.",
].join("\n");
