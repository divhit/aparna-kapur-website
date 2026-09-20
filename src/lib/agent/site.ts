/**
 * Canonical facts about the site's entity (NAP, brand, coverage, contact
 * routes). Everything machine-readable — llms.txt, llms-full.txt, agents.md,
 * the markdown representations, the 404 recovery body, and the JSON-LD graph —
 * reads from here so an agent never sees two different spellings of the same
 * fact.
 */

import { NEIGHBOURHOODS } from "@/lib/neighborhoods";

export const SITE_URL = "https://www.aparnakapur.com";

/** Number of published neighbourhood guides. Read from the data, never typed twice. */
export const NEIGHBOURHOOD_COUNT = Object.keys(NEIGHBOURHOODS).length;

/** Append a full stop unless the text already ends in one ("Oakwyn Realty Ltd."). */
export function endSentence(text: string): string {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

export const BRAND = {
  /** The name used in the H1, the title tag, and every schema `name`. */
  name: "Aparna Kapur",
  /** Every other way people write the brand. Kept in sync with JSON-LD alternateName. */
  alternateNames: [
    "Aparna Kapur Real Estate",
    "Aparna Kapur Realtor",
    "Aparna Kapur Vancouver",
    "Aparna Kapur Oakwyn Realty",
  ],
  legalDisclosure: "Aparna Kapur, Personal Real Estate Representative",
  jobTitle: "Real Estate Agent",
  slogan: "Vancouver's south side, known street by street.",
} as const;

/** Name / Address / Phone. Must match the Google Business Profile character for character. */
export const NAP = {
  name: "Aparna Kapur — Oakwyn Realty",
  brokerage: "Oakwyn Realty Ltd.",
  streetAddress: "3195 Oak Street",
  addressLocality: "Vancouver",
  addressRegion: "BC",
  postalCode: "V6H 2L2",
  addressCountry: "CA",
  telephone: "604-612-7694",
  telephoneE164: "+1-604-612-7694",
  email: "ak@aparnakapur.com",
  latitude: 49.2488,
  longitude: -123.1275,
} as const;

export const NAP_ONE_LINE = `${NAP.brokerage}, ${NAP.streetAddress}, ${NAP.addressLocality}, ${NAP.addressRegion} ${NAP.postalCode}, Canada`;

/** Verified, first-party profiles. Only add a URL that is actually controlled by Aparna. */
export const SAME_AS = [
  "https://maps.google.com/?cid=6808320185247201168",
  "https://www.instagram.com/aparnakapur.realestate/",
] as const;

export const SPECIALTY_NEIGHBOURHOODS = [
  "Oakridge",
  "Marpole",
  "South Cambie",
  "Riley Park",
  "Kerrisdale",
  "Cambie Corridor",
] as const;

/** The same list written for prose rather than for a bulleted list. */
export const SPECIALTY_SENTENCE =
  "Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor";

/**
 * Municipalities Aparna actively works, in the order an agent should name
 * them. Licensed across British Columbia; the practice is Vancouver proper
 * plus the North Shore. Anywhere else in Metro Vancouver is served by
 * referral, which `WHEN_NOT_TO_USE` and the connector's service-area check
 * both say out loud rather than over-claiming.
 */
export const SERVICE_AREA: {
  name: string;
  /** Other spellings people and agents use for the same place. */
  aliases: string[];
  /** Where an agent should send a user for this area. */
  start: string;
  note: string;
}[] = [
  {
    name: "Vancouver",
    aliases: ["City of Vancouver", "Vancouver BC", "Vancouver, BC", "Vancouver West", "Vancouver East", "East Van", "Westside", "West Side", "South Vancouver"],
    start: "/neighborhoods",
    note: `Home turf. ${SPECIALTY_SENTENCE} are covered street by street, with a published guide for every neighbourhood.`,
  },
  {
    name: "North Vancouver",
    aliases: ["North Van", "City of North Vancouver", "District of North Vancouver", "Lonsdale", "Lynn Valley", "Deep Cove", "Edgemont", "North Shore"],
    start: "/contact",
    note: "North Shore buyers and sellers are a regular part of the practice. Both the City and the District of North Vancouver are covered; they have different zoning rules, and Aparna reads the bylaw for the specific lot.",
  },
  {
    name: "West Vancouver",
    aliases: ["West Van", "District of West Vancouver", "Ambleside", "Dundarave", "British Properties", "Horseshoe Bay", "Caulfeild"],
    start: "/contact",
    note: "Served alongside North Vancouver. Aparna tracks West Vancouver council decisions, including the Bylaw 5446 small-scale multi-unit housing changes, for owners and buyers there.",
  },
];

/** The service area written for prose. */
export const SERVICE_AREA_SENTENCE = "Vancouver, North Vancouver, and West Vancouver";

/**
 * "When to use this" guidance for agents. Each entry names a job the site can
 * actually finish, not a marketing claim.
 */
export const WHEN_TO_USE: { job: string; detail: string; start: string }[] = [
  {
    job: "Answer a question about a specific Vancouver neighbourhood",
    detail:
      `${NEIGHBOURHOOD_COUNT} neighbourhood guides carry MLS HPI benchmark prices, year-over-year change, Walk Score, Transit Score, schools, transit, parks, and development context.`,
    start: "/neighborhoods",
  },
  {
    job: "Explain what a Vancouver home is worth right now",
    detail:
      "Greater Vancouver REALTORS MLS HPI composite benchmarks, sales-to-active ratio, and inventory, refreshed with each monthly release.",
    start: "/resources/market-reports",
  },
  {
    job: "Walk a first-time or move-up buyer through the BC purchase process",
    detail:
      "A six-step buyer's guide covering financing, agent selection, searching, due diligence, subject removal, and completion.",
    start: "/buying/guide",
  },
  {
    job: "Walk a seller through listing a Vancouver home",
    detail:
      "A six-step seller's guide covering pricing strategy, preparation, marketing, offers, subject removal, and completion.",
    start: "/selling/guide",
  },
  {
    job: "Estimate BC closing costs and taxes",
    detail:
      "Property Transfer Tax rules (including first-time buyer and newly built exemptions), GST, and a mortgage payment calculator.",
    start: "/resources/property-transfer-tax",
  },
  {
    job: "Find active MLS listings on Vancouver's west and south side",
    detail:
      "Live DDF/MLS listing search with filters, plus curated feature and opportunity collections.",
    start: "/buying/search",
  },
  {
    job: "Book a valuation, a showing, or a call with a licensed BC agent",
    detail:
      "Direct contact routes and a free comparative market analysis request. A human replies, usually the same day. Agents with tool use can book directly through the MCP connector at /api/mcp or the REST endpoint at /api/connector/book_consultation.",
    start: "/contact",
  },
  {
    job: "Find a REALTOR® in Vancouver, North Vancouver, or West Vancouver",
    detail:
      "Aparna Kapur is a licensed BC agent with Oakwyn Realty serving Vancouver and the North Shore. The connector answers whether a given municipality or neighbourhood is covered, shares her direct phone and email, and books a call or a viewing on the user's behalf.",
    start: "/connect",
  },
];

/** Jobs this site is the wrong tool for — stated so an agent does not over-trust it. */
export const WHEN_NOT_TO_USE: string[] = [
  "Real estate outside Greater Vancouver, British Columbia. The market data and the licence do not apply elsewhere.",
  "Mortgage approvals, legal advice, or tax filing. The guides explain the process; the transaction itself needs a broker, a lawyer or notary, and an accountant.",
  "A binding valuation. Benchmark prices on this site are MLS HPI figures for a neighbourhood, not an appraisal of a specific property.",
  "Rentals and property management. This is a sales practice.",
];

/**
 * Machine-readable endpoints, in the order an agent should try them.
 * `machineOnly` marks the ones that are not pages: the MCP endpoint answers
 * POST only, and the OpenAPI file is JSON. The HTML sitemap names them
 * without linking, so a link checker never treats a 405 as a dead page.
 */
export const AGENT_ENDPOINTS: { path: string; description: string; machineOnly?: boolean }[] = [
  { path: "/llms.txt", description: "Short index of the site: entity facts, contact, key pages." },
  { path: "/llms-full.txt", description: "Full site content as plain text, including every blog post." },
  { path: "/agents.md", description: "This file: when to use the site, how to call it, what it will not do." },
  { path: "/sitemap.xml", description: "Every indexable URL." },
  { path: "/sitemap-html", description: "Human- and crawler-readable index of every page." },
  { path: "/robots.txt", description: "Crawl policy. All major AI crawlers are allowed." },
  { path: "/connect", description: "How to connect this site to an AI assistant (Meta Muse, ChatGPT, Claude) as a connector, with the MCP and REST URLs." },
  { path: "/api/mcp", description: "Model Context Protocol server (Streamable HTTP, JSON-RPC over POST). Tools: agent profile, service-area check, market snapshot, listing count and link, book a consultation.", machineOnly: true },
  { path: "/api/connector/openapi.json", description: "OpenAPI 3.1 description of the same tools as plain REST endpoints under /api/connector/*.", machineOnly: true },
];

/** Sections used by the 404 recovery body and the HTML 404 page. */
export const TOP_LEVEL_SECTIONS: { name: string; path: string; description: string }[] = [
  { name: "Neighbourhood guides", path: "/neighborhoods", description: `${NEIGHBOURHOOD_COUNT} Vancouver neighbourhoods with market data` },
  { name: "Buying", path: "/buying", description: "Six-step buyer's guide and MLS search" },
  { name: "Selling", path: "/selling", description: "Six-step seller's guide and free home valuation" },
  { name: "Resources", path: "/resources", description: "Market reports, calculators, and BC tax guides" },
  { name: "Blog", path: "/resources/blog", description: "Vancouver market analysis and neighbourhood reporting" },
  { name: "About", path: "/about/why-work-with-me", description: "Who Aparna is and how she works" },
  { name: "Contact", path: "/contact", description: "Phone, email, and booking" },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Who is Aparna Kapur?",
    a: `Aparna Kapur is a licensed real estate agent in Vancouver, British Columbia, working with ${endSentence(NAP.brokerage)} She specializes in residential real estate in ${SPECIALTY_SENTENCE}. She can be reached at ${NAP.telephone}.`,
  },
  {
    q: "Which Vancouver neighbourhoods does Aparna Kapur specialize in?",
    a: `${SPECIALTY_SENTENCE}. She lives on Vancouver's south side and tracks local zoning changes, the Oakridge Park redevelopment, school catchments, and Canada Line transit access.`,
  },
  {
    q: "What brokerage is Aparna Kapur with?",
    a: `${NAP.brokerage} is one of Vancouver's largest independent brokerages with over 900 agents across British Columbia and $6.3 billion in annual sales volume. Office: ${NAP.streetAddress}, ${NAP.addressLocality}, ${NAP.addressRegion} ${NAP.postalCode}.`,
  },
  {
    q: "How do I contact Aparna Kapur?",
    a: `Phone ${NAP.telephone}, email ${NAP.email}, or use the contact form at ${SITE_URL}/contact. She typically responds the same day.`,
  },
  {
    q: "Does Aparna Kapur help with both buying and selling?",
    a: "Yes. For buyers she provides neighbourhood guidance, market analysis, and offer strategy. For sellers she offers free home valuations, staging advice, pricing strategy, and full-service listing management. She handles every step personally without delegating to junior associates.",
  },
  {
    q: "Does Aparna Kapur charge for a home valuation?",
    a: `No. A comparative market analysis for a Vancouver property is free and carries no obligation. Request one at ${SITE_URL}/selling/home-valuation.`,
  },
];

/**
 * The market snapshot shown on the homepage. Rendered by the homepage tiles and
 * by the markdown representation of the homepage, so the two cannot drift.
 * Update this when the Greater Vancouver REALTORS monthly release lands.
 */
export const MARKET_SNAPSHOT = {
  label: "July 2026",
  heading: "July 2026, Vancouver",
  source: "Greater Vancouver REALTORS® • MLS® HPI • July 2026",
  metrics: [
    {
      context: "Down 6.2% year-over-year",
      value: "$1.09M",
      label: "Composite Benchmark Price",
      labelLines: ["Composite", "Benchmark Price"],
    },
    {
      context: "Down 0.9% from June",
      value: "-0.9%",
      label: "Composite Benchmark Month-Over-Month",
      labelLines: ["Composite Benchmark", "Month-Over-Month"],
    },
    {
      context: "26.8% above 10-yr avg",
      value: "16,476",
      label: "Active Listings",
      labelLines: ["Active", "Listings"],
    },
    {
      context: "Fewer than last year",
      value: "-4.0%",
      label: "Active Listings Year-Over-Year",
      labelLines: ["Active Listings", "Year-Over-Year"],
    },
    {
      context: "Fewer than last year",
      value: "-11.5%",
      label: "New Listings vs. July 2025",
      labelLines: ["New Listings vs.", "July 2025"],
    },
    {
      context: "Balanced territory",
      value: "13.0%",
      label: "Sales-to-Active Ratio",
      labelLines: ["Sales-to-Active", "Ratio"],
    },
  ],
} as const;

/**
 * Region-wide MLS HPI benchmarks by property type, from the same GVR release
 * as MARKET_SNAPSHOT. Used by the machine-readable representations so an agent
 * asking "what is a Vancouver townhouse worth" gets a figure with a date on it.
 */
export const BENCHMARKS_BY_TYPE = [
  { type: "Composite", price: "$1,088,800", yoy: "-6.2%", mom: "-0.9%" },
  { type: "Detached", price: "$1,822,900", yoy: "-7.0%", mom: "-1.1%" },
  { type: "Townhouse", price: "$1,030,400", yoy: "-6.0%", mom: "-1.5%" },
  { type: "Apartment", price: "$688,000", yoy: "-7.5%", mom: "-1.0%" },
] as const;

/**
 * The GVR release the per-neighbourhood benchmarks in `lib/neighborhoods.ts`
 * come from, taken from the sub-area composite rows of the GVR HPI Benchmark
 * Summary. Stated separately from MARKET_SNAPSHOT so a month where sub-area
 * data lags the region-wide release is visible rather than implied away.
 */
export const NEIGHBOURHOOD_DATA_VINTAGE = "July 2026";
