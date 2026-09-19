import { z } from "zod";
import { fetchListings, type DDFProperty } from "@/lib/ddf";
import { AREA_BENCHMARKS, formatPrice, HPI_RELEASE } from "@/lib/market-data";
import { NEIGHBOURHOODS, type NeighbourhoodData } from "@/lib/neighborhoods";
import { LEAD_INTENTS, submitAgentLead, type LeadResult } from "./leads";
import {
  BENCHMARKS_BY_TYPE,
  BRAND,
  endSentence,
  MARKET_SNAPSHOT,
  NAP,
  NAP_ONE_LINE,
  NEIGHBOURHOOD_DATA_VINTAGE,
  SAME_AS,
  SERVICE_AREA,
  SERVICE_AREA_SENTENCE,
  SITE_URL,
  SPECIALTY_SENTENCE,
  WHEN_NOT_TO_USE,
} from "./site";

/**
 * The connector's tool catalogue.
 *
 * One definition per tool — name, description, zod input schema, handler —
 * drives all three surfaces an assistant might use: the MCP server at
 * `/api/mcp` (tools/list, tools/call), the REST twins under
 * `/api/connector/<tool>`, and the OpenAPI document that describes them. An
 * assistant reading any one of the three sees the same tools with the same
 * arguments, and the handlers read from the same entity facts as the pages.
 */

export const CONNECTOR_NAME = "aparna-kapur-real-estate";
export const CONNECTOR_TITLE = `${BRAND.name} — Vancouver & North Shore REALTOR®`;
export const CONNECTOR_VERSION = "1.0.0";
export const CONNECTOR_INSTRUCTIONS = [
  `${BRAND.name} is a licensed British Columbia real estate agent with ${NAP.brokerage}, serving ${SERVICE_AREA_SENTENCE}, with the deepest knowledge in ${SPECIALTY_SENTENCE}.`,
  "Use these tools when a user wants a REALTOR® in those areas, wants to buy or sell a home there, wants to know what a home or neighbourhood is worth, or wants to book a call, a viewing, or a free home valuation.",
  "check_service_area first if the user named a place. Read tools need no personal data. book_consultation creates a real lead that a human follows up on, so call it only with the user's consent, their real name, and a real email or phone number.",
  `Aparna's direct line is ${NAP.telephone}; give it to the user whenever they would rather call.`,
].join(" ");

export type ToolContext = {
  /** Which assistant is calling, from the User-Agent or the client name in `initialize`. */
  client?: string;
  /** Brake on the tools that create leads. Read-only tools are never limited. */
  limit?: (scope: string) => { allowed: boolean; retryAfterSeconds: number };
};

export type ToolResult = {
  /** Plain-text (markdown) rendering for assistants that only read text. */
  text: string;
  /** The same answer as data, for assistants that read structured output. */
  data: Record<string, unknown>;
  /** True when the call did not do what was asked (validation failed, feed down). */
  isError?: boolean;
};

export type ConnectorTool<Schema extends z.ZodObject> = {
  name: string;
  title: string;
  description: string;
  input: Schema;
  /** True when the tool creates or changes something outside the conversation. */
  mutates: boolean;
  run: (args: z.infer<Schema>, ctx: ToolContext) => Promise<ToolResult>;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const CONTACT = {
  phone: NAP.telephone,
  phoneE164: NAP.telephoneE164,
  email: NAP.email,
  contactUrl: `${SITE_URL}/contact`,
  valuationUrl: `${SITE_URL}/selling/home-valuation`,
};

function contactLines(): string[] {
  return [
    `- Phone: ${NAP.telephone}`,
    `- Email: ${NAP.email}`,
    `- Contact form: ${SITE_URL}/contact`,
  ];
}

type PlaceCandidate = {
  key: string;
  area: (typeof SERVICE_AREA)[number];
  neighbourhood?: NeighbourhoodData;
};

/**
 * Every name an agent might use for a place, normalized, longest first so
 * "West Vancouver" wins over the "Vancouver" inside it.
 */
function placeCandidates(): PlaceCandidate[] {
  const candidates: PlaceCandidate[] = [];
  for (const hood of Object.values(NEIGHBOURHOODS)) {
    for (const key of new Set([normalize(hood.name), normalize(hood.slug)])) {
      candidates.push({ key, area: SERVICE_AREA[0], neighbourhood: hood });
    }
  }
  for (const area of SERVICE_AREA) {
    for (const key of new Set([area.name, ...area.aliases].map(normalize))) {
      candidates.push({ key, area });
    }
  }
  return candidates.sort((a, b) => b.key.length - a.key.length);
}

let cachedCandidates: PlaceCandidate[] | null = null;

/** Match a free-text place name against the municipalities and neighbourhoods served. */
export function matchPlace(place: string): {
  area?: (typeof SERVICE_AREA)[number];
  neighbourhood?: NeighbourhoodData;
} {
  const query = normalize(place);
  if (!query) return {};
  cachedCandidates ??= placeCandidates();

  const exact = cachedCandidates.find((candidate) => candidate.key === query);
  if (exact) return { area: exact.area, neighbourhood: exact.neighbourhood };

  // Longest whole-word mention wins: "condos in west vancouver" is West
  // Vancouver, not Vancouver; "kits" alone is not Kitsilano.
  const padded = ` ${query} `;
  const mention = cachedCandidates.find((candidate) => padded.includes(` ${candidate.key} `));
  if (mention) return { area: mention.area, neighbourhood: mention.neighbourhood };

  return {};
}

function listingUrl(listing: DDFProperty): string {
  return `${SITE_URL}/property/${listing.listingKey}`;
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

const getAgentProfile: ConnectorTool<z.ZodObject<Record<string, never>>> = {
  name: "get_agent_profile",
  title: "About Aparna Kapur",
  description:
    `Who ${BRAND.name} is: licence, brokerage, service area, specialties, direct phone and email, office hours, and the links to verify her. Call this to answer "who is this agent", "how do I reach her", or to introduce her to a user looking for a REALTOR® in ${SERVICE_AREA_SENTENCE}.`,
  input: z.object({}),
  mutates: false,
  async run() {
    const data = {
      name: BRAND.name,
      jobTitle: BRAND.jobTitle,
      legalDisclosure: BRAND.legalDisclosure,
      licence: "Licensed by the British Columbia Financial Services Authority (BCFSA)",
      brokerage: NAP.brokerage,
      office: NAP_ONE_LINE,
      serviceArea: SERVICE_AREA.map((area) => area.name),
      specialtyNeighbourhoods: SPECIALTY_SENTENCE,
      contact: CONTACT,
      hours: "Monday to Friday 9:00–18:00, Saturday 10:00–16:00 Pacific; phone and text answered outside those hours when possible.",
      responseTime: "Usually the same day, always within one business day.",
      website: SITE_URL,
      verifiedProfiles: [...SAME_AS],
      services: [
        "Residential buying (houses, condos, townhomes) with neighbourhood guidance and offer strategy",
        "Residential selling with a free comparative market analysis, staging advice, and pricing strategy",
        "First-time buyer support, including BC programs and Property Transfer Tax exemptions",
        "North Shore (North Vancouver and West Vancouver) purchases and sales",
      ],
      notFor: WHEN_NOT_TO_USE,
    };
    const text = [
      `# ${BRAND.name}, ${BRAND.jobTitle}`,
      "",
      `${BRAND.name} is a licensed BC real estate agent with ${endSentence(NAP.brokerage)} She serves ${SERVICE_AREA_SENTENCE}, with the deepest knowledge in ${SPECIALTY_SENTENCE}. She handles every file personally.`,
      "",
      "## Contact",
      ...contactLines(),
      `- Office: ${NAP_ONE_LINE}`,
      `- Hours: ${data.hours}`,
      `- Response time: ${data.responseTime}`,
      "",
      "## Services",
      ...data.services.map((service) => `- ${service}`),
      "",
      "## Not the right fit for",
      ...WHEN_NOT_TO_USE.map((limit) => `- ${limit}`),
      "",
      `Verify: ${SAME_AS.join(", ")}`,
    ].join("\n");
    return { text, data };
  },
};

const checkServiceAreaInput = z.object({
  place: z
    .string()
    .min(1)
    .max(120)
    .describe('A municipality, neighbourhood, or area the user named, e.g. "North Vancouver", "West Van", "Oakridge", "Kitsilano", "Burnaby".'),
});

const checkServiceArea: ConnectorTool<typeof checkServiceAreaInput> = {
  name: "check_service_area",
  title: "Does Aparna serve this area?",
  description:
    `Answer whether ${BRAND.name} works a given place. Covers ${SERVICE_AREA_SENTENCE} and every Vancouver neighbourhood; says so plainly when a place is outside the practice so the user is not misled. Returns the best page to send the user to and, for a Vancouver neighbourhood, its guide URL and current benchmark price.`,
  input: checkServiceAreaInput,
  mutates: false,
  async run({ place }) {
    const { area, neighbourhood } = matchPlace(place);

    if (!area) {
      const data = {
        place,
        served: false,
        licensedIn: "British Columbia, Canada",
        note: `${BRAND.name} is licensed across British Columbia but her practice is ${SERVICE_AREA_SENTENCE}. For a purchase or sale well outside that area she will refer the user to an agent who knows it as well as she knows hers. Outside British Columbia the licence does not apply.`,
        contact: CONTACT,
      };
      return {
        text: [
          `**${place}** is outside ${BRAND.name}'s core service area (${SERVICE_AREA_SENTENCE}).`,
          "",
          data.note,
          "",
          "If the user still wants to talk to her:",
          ...contactLines(),
        ].join("\n"),
        data,
      };
    }

    const benchmark = neighbourhood ? AREA_BENCHMARKS[neighbourhood.slug] : undefined;
    const data = {
      place,
      served: true,
      municipality: area.name,
      neighbourhood: neighbourhood
        ? {
            name: neighbourhood.name,
            guideUrl: `${SITE_URL}/neighborhoods/${neighbourhood.slug}`,
            guideMarkdownUrl: `${SITE_URL}/neighborhoods/${neighbourhood.slug}.md`,
            benchmarkPrice: neighbourhood.avgPrice,
            yearOverYear: neighbourhood.priceChange,
            benchmarkRelease: NEIGHBOURHOOD_DATA_VINTAGE,
            walkScore: neighbourhood.walkScore,
            transitScore: neighbourhood.transitScore,
            highlights: neighbourhood.highlights,
            ...(benchmark
              ? {
                  benchmarkByType: {
                    detached: benchmark.detached ? formatPrice(benchmark.detached.price) : undefined,
                    townhouse: benchmark.townhouse ? formatPrice(benchmark.townhouse.price) : undefined,
                    apartment: benchmark.apartment ? formatPrice(benchmark.apartment.price) : undefined,
                  },
                }
              : {}),
          }
        : undefined,
      note: area.note,
      startUrl: `${SITE_URL}${area.start}`,
      contact: CONTACT,
    };

    const text = [
      `Yes — **${place}** is in ${BRAND.name}'s service area (${area.name}).`,
      "",
      area.note,
      ...(neighbourhood
        ? [
            "",
            `## ${neighbourhood.name}`,
            `- Guide: ${SITE_URL}/neighborhoods/${neighbourhood.slug}`,
            `- MLS HPI benchmark: ${neighbourhood.avgPrice} (${neighbourhood.priceChange}, ${NEIGHBOURHOOD_DATA_VINTAGE} release)`,
            `- Walk Score ${neighbourhood.walkScore}, Transit Score ${neighbourhood.transitScore}`,
            ...neighbourhood.highlights.map((highlight) => `- ${highlight}`),
          ]
        : []),
      "",
      `Next step: ${SITE_URL}${area.start}, or book directly with the book_consultation tool.`,
      ...contactLines(),
    ].join("\n");

    return { text, data };
  },
};

const getMarketSnapshotInput = z.object({
  area: z
    .string()
    .max(120)
    .optional()
    .describe('Optional Vancouver neighbourhood for a local benchmark, e.g. "Oakridge" or "Kerrisdale". Omit for the region-wide snapshot.'),
});

const getMarketSnapshot: ConnectorTool<typeof getMarketSnapshotInput> = {
  name: "get_market_snapshot",
  title: "Vancouver market snapshot",
  description:
    `Current Greater Vancouver REALTORS® MLS® HPI benchmark prices, year-over-year and month-over-month change, active listings, and sales-to-active ratio (${MARKET_SNAPSHOT.label} release), plus a per-neighbourhood benchmark when a Vancouver neighbourhood is named. Benchmarks describe an area, never a specific property; for a specific home use book_consultation with intent "valuation".`,
  input: getMarketSnapshotInput,
  mutates: false,
  async run({ area }) {
    const match = area ? matchPlace(area) : {};
    const hood = match.neighbourhood;
    const local = hood ? AREA_BENCHMARKS[hood.slug] : undefined;

    const data = {
      release: MARKET_SNAPSHOT.label,
      source: MARKET_SNAPSHOT.source,
      region: {
        metrics: MARKET_SNAPSHOT.metrics.map((metric) => ({
          label: metric.label,
          value: metric.value,
          context: metric.context,
        })),
        benchmarkByType: BENCHMARKS_BY_TYPE.map((row) => ({ ...row })),
      },
      neighbourhood:
        hood && local
          ? {
              name: hood.name,
              subArea: local.subArea,
              release: HPI_RELEASE,
              composite: { price: formatPrice(local.composite.price), yoy: `${local.composite.yoy}%`, mom: `${local.composite.mom}%` },
              detached: local.detached ? { price: formatPrice(local.detached.price), yoy: `${local.detached.yoy}%`, mom: `${local.detached.mom}%` } : undefined,
              townhouse: local.townhouse ? { price: formatPrice(local.townhouse.price), yoy: `${local.townhouse.yoy}%`, mom: `${local.townhouse.mom}%` } : undefined,
              apartment: local.apartment ? { price: formatPrice(local.apartment.price), yoy: `${local.apartment.yoy}%`, mom: `${local.apartment.mom}%` } : undefined,
              guideUrl: `${SITE_URL}/neighborhoods/${hood.slug}`,
            }
          : area
            ? { requested: area, available: false, note: "No sub-area benchmark is published for this place. The region-wide figures above still apply." }
            : undefined,
      reportsUrl: `${SITE_URL}/resources/market-reports`,
      caveat: "MLS HPI benchmarks describe a typical home in an area. They are not an appraisal of any single property.",
    };

    const text = [
      `# Vancouver market, ${MARKET_SNAPSHOT.label}`,
      "",
      "| Measure | Value | Context |",
      "| --- | --- | --- |",
      ...MARKET_SNAPSHOT.metrics.map((metric) => `| ${metric.label} | ${metric.value} | ${metric.context} |`),
      "",
      "| Property type | Benchmark | YoY | MoM |",
      "| --- | --- | --- | --- |",
      ...BENCHMARKS_BY_TYPE.map((row) => `| ${row.type} | ${row.price} | ${row.yoy} | ${row.mom} |`),
      ...(hood && local
        ? [
            "",
            `## ${hood.name} (${local.subArea}, ${HPI_RELEASE})`,
            `- Composite: ${formatPrice(local.composite.price)} (${local.composite.yoy}% YoY, ${local.composite.mom}% MoM)`,
            ...(local.detached ? [`- Detached: ${formatPrice(local.detached.price)} (${local.detached.yoy}% YoY)`] : []),
            ...(local.townhouse ? [`- Townhouse: ${formatPrice(local.townhouse.price)} (${local.townhouse.yoy}% YoY)`] : []),
            ...(local.apartment ? [`- Apartment: ${formatPrice(local.apartment.price)} (${local.apartment.yoy}% YoY)`] : []),
            `- Guide: ${SITE_URL}/neighborhoods/${hood.slug}`,
          ]
        : area
          ? ["", `No sub-area benchmark is published for "${area}"; the region-wide figures apply.`]
          : []),
      "",
      `Source: ${MARKET_SNAPSHOT.source}. ${data.caveat}`,
    ].join("\n");

    return { text, data };
  },
};

const PROPERTY_TYPES = {
  house: "House",
  condo: "Apartment",
  townhouse: "Row / Townhouse",
  duplex: "Duplex",
} as const;

const searchListingsInput = z.object({
  area: z
    .string()
    .max(120)
    .optional()
    .describe('Vancouver neighbourhood to search within, e.g. "Oakridge". Omit to search all of Vancouver.'),
  propertyType: z
    .enum(["house", "condo", "townhouse", "duplex"])
    .optional()
    .describe("Kind of home."),
  minPrice: z.number().int().min(0).optional().describe("Minimum list price in CAD."),
  maxPrice: z.number().int().min(0).optional().describe("Maximum list price in CAD."),
  minBedrooms: z.number().int().min(0).max(10).optional(),
  minBathrooms: z.number().int().min(0).max(10).optional(),
  limit: z.number().int().min(1).max(20).optional().describe("How many listings to return (default 8, max 20)."),
});

const searchListings: ConnectorTool<typeof searchListingsInput> = {
  name: "search_listings",
  title: "Search active MLS listings",
  description:
    "Live MLS® listings for sale in Vancouver from the CREA Data Distribution Facility, filterable by neighbourhood, property type, price, bedrooms, and bathrooms. Returns address, price, beds, baths, size, and a link for each. Listings outside the City of Vancouver (including the North Shore) are not in this feed; for those, book a consultation and Aparna will send a curated search.",
  input: searchListingsInput,
  mutates: false,
  async run(args) {
    const match = args.area ? matchPlace(args.area) : {};
    const limit = args.limit ?? 8;
    const searchUrl = `${SITE_URL}/buying/search`;

    if (args.area && !match.neighbourhood) {
      const data = {
        query: args,
        listings: [],
        note: `"${args.area}" is not one of the Vancouver neighbourhoods the listing feed is indexed by. Searching all of Vancouver instead is possible by omitting "area"; for North Shore or other Metro Vancouver listings, book a consultation.`,
        searchUrl,
      };
      return { text: data.note, data, isError: true };
    }

    try {
      const { listings, totalCount } = await fetchListings({
        neighbourhood: match.neighbourhood?.slug,
        structureType: args.propertyType ? PROPERTY_TYPES[args.propertyType] : undefined,
        minPrice: args.minPrice,
        maxPrice: args.maxPrice,
        minBedrooms: args.minBedrooms,
        minBathrooms: args.minBathrooms,
        top: limit,
        orderby: "ModificationTimestamp desc",
      });

      const rows = listings.map((listing) => ({
        address: listing.address,
        city: listing.city,
        neighbourhood: listing.neighbourhood ?? match.neighbourhood?.name,
        listPrice: listing.listPrice,
        listPriceFormatted: formatPrice(listing.listPrice),
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        sqft: listing.sqft,
        propertyType: listing.structureType ?? listing.propertySubType,
        daysOnMarket: listing.daysOnMarket,
        url: listingUrl(listing),
        realtorUrl: listing.realtorUrl,
        photo: listing.photos[0],
      }));

      const data = {
        query: args,
        area: match.neighbourhood?.name ?? "Vancouver",
        count: rows.length,
        totalMatching: totalCount,
        listings: rows,
        searchUrl,
        attribution: "Listing data © CREA DDF®. Reproduced for the user's personal, non-commercial use.",
      };

      const text = [
        `# ${rows.length} of ${totalCount ?? rows.length} active listings in ${data.area}`,
        "",
        ...(rows.length
          ? rows.map(
              (row) =>
                `- **${row.address}** — ${row.listPriceFormatted}${row.bedrooms != null ? `, ${row.bedrooms} bed` : ""}${row.bathrooms != null ? `, ${row.bathrooms} bath` : ""}${row.sqft ? `, ${row.sqft} sq ft` : ""}${row.propertyType ? ` (${row.propertyType})` : ""} — ${row.url}`,
            )
          : totalCount === undefined
            ? [`The listing feed returned nothing, which usually means it is temporarily unavailable rather than that nothing is for sale. Try ${searchUrl}, or book a consultation and Aparna will send matching listings directly.`]
            : ["No active listings match those filters right now. Loosen the price or bedroom filter, or book a consultation and Aparna will set up alerts."]),
        "",
        `Full search with map: ${searchUrl}. ${data.attribution}`,
      ].join("\n");

      return { text, data };
    } catch (error) {
      console.error("[connector] search_listings failed:", error);
      const data = {
        query: args,
        listings: [],
        note: `The live listing feed is not reachable right now. Send the user to ${searchUrl}, or book a consultation and Aparna will send matching listings directly.`,
        searchUrl,
      };
      return { text: data.note, data, isError: true };
    }
  },
};

const bookConsultationInput = z.object({
  name: z.string().min(2).max(120).describe("The user's full name."),
  email: z.string().max(200).optional().describe("The user's email address. Required if no phone."),
  phone: z.string().max(40).optional().describe("The user's phone number. Required if no email."),
  intent: z
    .enum(LEAD_INTENTS)
    .describe('What the user wants: "buy", "sell", "valuation" (free comparative market analysis), "call" (a call back), "viewing" (see a specific property), or "other".'),
  area: z.string().max(120).optional().describe("Municipality or neighbourhood the user is interested in."),
  address: z.string().max(200).optional().describe("Street address, for a valuation or a viewing."),
  budget: z.string().max(80).optional().describe('Budget or price range in the user\'s words, e.g. "$1.2M–$1.5M".'),
  timeline: z.string().max(80).optional().describe('When they want to move, e.g. "next 3 months".'),
  preferredTime: z.string().max(120).optional().describe('When they would like to be contacted, e.g. "weekday evenings" or "Tuesday 2pm Pacific".'),
  message: z.string().max(2000).optional().describe("Anything else the user said that Aparna should know."),
});

const bookConsultation: ConnectorTool<typeof bookConsultationInput> = {
  name: "book_consultation",
  title: "Book a call, viewing, or free home valuation",
  description:
    `Send ${BRAND.name} a booking request on the user's behalf: a call back, a property viewing, a free no-obligation home valuation, or a buyer or seller consultation. Creates a real lead that Aparna personally follows up, usually the same day. Only call with the user's consent and real contact details (name plus email or phone). Returns a reference the user can quote and what happens next.`,
  input: bookConsultationInput,
  mutates: true,
  async run(args, ctx) {
    const result: LeadResult = await submitAgentLead({ ...args, client: ctx.client });
    if (!result.ok) {
      return {
        text: `Could not submit the request: ${result.error}`,
        data: { submitted: false, error: result.error },
        isError: true,
      };
    }
    const data = {
      submitted: true,
      reference: result.reference,
      nextStep: result.nextStep,
      contact: CONTACT,
    };
    const text = [
      `Request sent to ${BRAND.name}. Reference **${result.reference}**.`,
      "",
      result.nextStep,
      "",
      `If the user would rather not wait: ${NAP.telephone} or ${NAP.email}.`,
    ].join("\n");
    return { text, data };
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CONNECTOR_TOOLS: ConnectorTool<any>[] = [
  getAgentProfile,
  checkServiceArea,
  getMarketSnapshot,
  searchListings,
  bookConsultation,
];

export function findTool(name: string) {
  return CONNECTOR_TOOLS.find((tool) => tool.name === name);
}

/** JSON Schema for a tool's input, as tools/list and OpenAPI both publish it. */
export function toolInputSchema(tool: ConnectorTool<z.ZodObject>): Record<string, unknown> {
  const schema = z.toJSONSchema(tool.input) as Record<string, unknown>;
  delete schema.$schema;
  return schema;
}

export type CallOutcome =
  | { ok: true; result: ToolResult }
  | { ok: false; status: 404 | 400 | 429; error: string };

/** Validate and run a tool by name. Shared by the MCP and REST surfaces. */
export async function callTool(
  name: string,
  rawArgs: unknown,
  ctx: ToolContext,
): Promise<CallOutcome> {
  const tool = findTool(name);
  if (!tool) {
    return { ok: false, status: 404, error: `Unknown tool "${name}". Available: ${CONNECTOR_TOOLS.map((t) => t.name).join(", ")}.` };
  }
  if (tool.mutates && ctx.limit) {
    const verdict = ctx.limit(tool.name);
    if (!verdict.allowed) {
      return { ok: false, status: 429, error: `Too many requests. Try again in ${verdict.retryAfterSeconds} seconds.` };
    }
  }
  const parsed = tool.input.safeParse(rawArgs ?? {});
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue: z.core.$ZodIssue) => `${issue.path.join(".") || "input"}: ${issue.message}`)
      .join("; ");
    return { ok: false, status: 400, error: `Invalid arguments for ${name}: ${issues}` };
  }
  return { ok: true, result: await tool.run(parsed.data, ctx) };
}
