import { NEIGHBOURHOODS } from "./neighborhoods";
import {
  AREA_BENCHMARKS,
  formatPrice,
  HPI_RELEASE,
  HPI_SOURCE,
  publishedCombinations,
  REGION_BENCHMARKS,
  type Benchmark,
  type PropertyType,
} from "./market-data";

/**
 * The model behind the per-property-type price pages.
 *
 * One page exists for each (neighbourhood, property type) pair GVR actually
 * publishes a benchmark for — 62 of a possible 72. Everything on the page is
 * derived here so the HTML and the markdown twin cannot drift, and so a page
 * can never be generated for a pair with no real figure behind it.
 *
 * Each page's reason to exist is the comparison: how this area's benchmark for
 * this property type sits against the region, and against the other 23 areas.
 * That is a number the site can publish and almost nobody else does.
 */

export type TypeMeta = {
  /** URL segment. Carries the query terms rather than the schema key. */
  slug: string;
  /** "Condos" */
  plural: string;
  /** "a condo" */
  singular: string;
  /** How GVR names it, for citing the source series. */
  gvrLabel: string;
  /** How the site says it in a sentence. "single family detached" reads wrong. */
  proseLabel: string;
};

export const PROPERTY_TYPES: Record<PropertyType, TypeMeta> = {
  detached: {
    slug: "house-prices",
    plural: "Houses",
    singular: "a detached house",
    gvrLabel: "Single Family Detached",
    proseLabel: "detached",
  },
  townhouse: {
    slug: "townhouse-prices",
    plural: "Townhouses",
    singular: "a townhouse",
    gvrLabel: "Townhouse",
    proseLabel: "townhouse",
  },
  apartment: {
    slug: "condo-prices",
    plural: "Condos",
    singular: "a condo",
    gvrLabel: "Apartment",
    proseLabel: "condo",
  },
};

const BY_SLUG = Object.fromEntries(
  Object.entries(PROPERTY_TYPES).map(([key, meta]) => [
    meta.slug,
    key as PropertyType,
  ]),
);

export function propertyTypeFromSlug(slug: string): PropertyType | null {
  return BY_SLUG[slug] ?? null;
}

/** Percentage difference between two benchmarks, e.g. +3.8. */
function relativeTo(price: number, reference: number): number {
  return Number(((price / reference - 1) * 100).toFixed(1));
}

/** "down 4.3%" / "up 2.1%" / "flat" — how a person says it. */
function move(value: number): string {
  if (Math.abs(value) < 0.05) return "flat";
  return `${value < 0 ? "down" : "up"} ${Math.abs(value).toFixed(1)}%`;
}

function signed(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export type MarketPage = {
  path: string;
  areaSlug: string;
  areaName: string;
  type: PropertyType;
  typeMeta: TypeMeta;
  subArea: string;
  release: string;
  source: string;
  benchmark: Benchmark;
  region: Benchmark;
  /** How this area's benchmark compares with the region's, in percent. */
  vsRegion: number;
  /** Points of year-over-year decline avoided versus the region. Negative means worse. */
  resilience: number;
  /** 1 = most expensive of the areas that publish this type. */
  rank: number;
  rankOf: number;
  cheaper: number;
  /** Other property types published for the same area. */
  siblings: {
    type: PropertyType;
    slug: string;
    plural: string;
    price: number;
  }[];
  /** The closest areas by price for the same property type. */
  comparables: { slug: string; name: string; price: number; vs: number }[];
  title: string;
  description: string;
  /** Three to five sentences that still make sense quoted on their own. */
  summary: string;
  faqs: { q: string; a: string }[];
};

export function marketPagePath(areaSlug: string, type: PropertyType): string {
  return `/market/${areaSlug}/${PROPERTY_TYPES[type].slug}`;
}

export function getMarketPage(
  areaSlug: string,
  type: PropertyType,
): MarketPage | null {
  const area = AREA_BENCHMARKS[areaSlug];
  const hood = NEIGHBOURHOODS[areaSlug];
  const benchmark = area?.[type];
  if (!area || !hood || !benchmark) return null;

  const region = REGION_BENCHMARKS[type];
  const meta = PROPERTY_TYPES[type];
  const vsRegion = relativeTo(benchmark.price, region.price);
  const resilience = Number(
    (Math.abs(region.yoy) - Math.abs(benchmark.yoy)).toFixed(1),
  );

  const peers = Object.entries(AREA_BENCHMARKS)
    .filter(([, entry]) => entry[type])
    .map(([slug, entry]) => ({
      slug,
      name: NEIGHBOURHOODS[slug]?.name ?? slug,
      price: entry[type]!.price,
    }))
    .sort((a, b) => b.price - a.price);

  const rank = peers.findIndex((peer) => peer.slug === areaSlug) + 1;

  const comparables = peers
    .filter((peer) => peer.slug !== areaSlug)
    .map((peer) => ({ ...peer, vs: relativeTo(peer.price, benchmark.price) }))
    .sort(
      (a, b) =>
        Math.abs(a.price - benchmark.price) -
        Math.abs(b.price - benchmark.price),
    )
    .slice(0, 4);

  const siblings = (Object.keys(PROPERTY_TYPES) as PropertyType[])
    .filter((other) => other !== type && area[other])
    .map((other) => ({
      type: other,
      slug: marketPagePath(areaSlug, other),
      plural: PROPERTY_TYPES[other].plural,
      price: area[other]!.price,
    }));

  const price = formatPrice(benchmark.price);
  const regionPrice = formatPrice(region.price);
  const direction = vsRegion >= 0 ? "above" : "below";

  const summary = [
    `${meta.plural} in ${hood.name} benchmark at ${price} as of ${HPI_RELEASE}, ${Math.abs(vsRegion).toFixed(1)}% ${direction} the Metro Vancouver ${meta.proseLabel} benchmark of ${regionPrice}.`,
    `The benchmark is ${move(benchmark.yoy)} over the past year and ${move(benchmark.mom)} over the past month.`,
    resilience > 0
      ? `That is ${resilience.toFixed(1)} points better than the region's ${signed(region.yoy)}, so ${hood.name} ${meta.plural.toLowerCase()} are holding value better than the market as a whole.`
      : `The region as a whole moved ${signed(region.yoy)} over the same year, so ${hood.name} ${meta.plural.toLowerCase()} have softened ${Math.abs(resilience).toFixed(1)} points faster than the market.`,
    `Of the ${peers.length} Vancouver neighbourhoods with a published ${meta.proseLabel} benchmark, ${hood.name} ranks ${rank}${rank === 1 ? " — the most expensive" : ` of ${peers.length}`}.`,
  ].join(" ");

  const faqs = [
    {
      q: `How much ${meta.plural.toLowerCase() === "houses" ? "does a house cost" : `does ${meta.singular} cost`} in ${hood.name}?`,
      a: `The MLS® HPI benchmark for ${meta.plural.toLowerCase()} in ${hood.name} is ${price} as of ${HPI_RELEASE}. The benchmark describes a typical property of that type in the area, so an individual home can sit well above or below it depending on size, condition, outlook, and lot.`,
    },
    {
      q: `Are ${hood.name} ${meta.plural.toLowerCase()} going up or down in price?`,
      a: `Down ${Math.abs(benchmark.yoy).toFixed(1)}% over the past year and ${benchmark.mom >= 0 ? "up" : "down"} ${Math.abs(benchmark.mom).toFixed(1)}% over the past month, on the ${HPI_RELEASE} release. Metro Vancouver ${meta.proseLabel} moved ${signed(region.yoy)} over the same year.`,
    },
    {
      q: `Is ${hood.name} expensive for ${meta.plural.toLowerCase()} compared with the rest of Vancouver?`,
      a: `${hood.name} sits ${signed(vsRegion)} against the Metro Vancouver ${meta.proseLabel} benchmark, and ranks ${rank} of ${peers.length} neighbourhoods with a published benchmark for this type. ${
        comparables.length
          ? `The closest on price are ${comparables
              .slice(0, 3)
              .map((c) => c.name)
              .join(", ")}.`
          : ""
      }`.trim(),
    },
    {
      q: `What is a benchmark price, and is it the same as an appraisal?`,
      a: `No — a benchmark is not an appraisal. The MLS® Home Price Index models a typical property for an area and property type, which makes it a good way to track a market over time, but it values no particular home. For that you need a comparative market analysis on the actual property, which Aparna provides at no cost.`,
    },
  ];

  return {
    path: marketPagePath(areaSlug, type),
    areaSlug,
    areaName: hood.name,
    type,
    typeMeta: meta,
    subArea: area.subArea,
    release: HPI_RELEASE,
    source: HPI_SOURCE,
    benchmark,
    region,
    vsRegion,
    resilience,
    rank,
    rankOf: peers.length,
    cheaper: peers.length - rank,
    siblings,
    comparables,
    title: `${hood.name} ${meta.plural} — Prices & Benchmarks (${HPI_RELEASE})`,
    description: `${meta.plural} in ${hood.name}, Vancouver benchmark at ${price} as of ${HPI_RELEASE} — ${signed(benchmark.yoy)} year over year. How that compares with Metro Vancouver and neighbouring areas.`,
    summary,
    faqs,
  };
}

/** Every price page the data supports, most expensive area first. */
export function getAllMarketPages(): MarketPage[] {
  return publishedCombinations()
    .map(({ slug, type }) => getMarketPage(slug, type))
    .filter((page): page is MarketPage => page !== null);
}
