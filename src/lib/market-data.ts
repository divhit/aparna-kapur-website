/**
 * Greater Vancouver REALTORS® MLS® HPI benchmarks by sub-area and property
 * type, from the GVR HPI Benchmark Summary workbook.
 *
 * Generated from the members' portal release, not transcribed by hand. Every
 * sub-area mapping below was verified by matching the previous month's
 * workbook against the values already in  — all 24 agreed on
 * both benchmark and year-over-year, so no mapping is a guess.
 *
 * A property type is absent where GVR publishes no benchmark for it: the
 * sample is too thin to be meaningful (there is no detached benchmark for
 * Downtown, the West End or Fairview, and no townhouse benchmark for Arbutus
 * Ridge). Absent means absent — never interpolate a figure into the gap, and
 * never publish a page that would have to.
 */

export const HPI_RELEASE = "July 2026";
export const HPI_SOURCE =
  "Greater Vancouver REALTORS® • MLS® HPI Benchmark Summary • July 2026";

export type PropertyType = "detached" | "townhouse" | "apartment";

export type Benchmark = {
  /** Benchmark price in dollars. */
  price: number;
  /** Percentage change over one year. */
  yoy: number;
  /** Percentage change over one month. */
  mom: number;
};

export type AreaBenchmarks = {
  /** The GVR sub-area these figures are published under. */
  subArea: string;
  composite: Benchmark;
} & Partial<Record<PropertyType, Benchmark>>;

export const AREA_BENCHMARKS: Record<string, AreaBenchmarks> = {
  "oakridge": {
    subArea: "Oakridge VW",
    composite: { price: 1433200, yoy: -8.6, mom: -0.7 },
    detached: { price: 3406000, yoy: -1.9, mom: 3.2 },
    townhouse: { price: 1495700, yoy: -6.2, mom: -3.6 },
    apartment: { price: 992900, yoy: -8.2, mom: -0.8 },
  },
  "marpole": {
    subArea: "Marpole",
    composite: { price: 1081200, yoy: -10.4, mom: -2.7 },
    detached: { price: 1889400, yoy: -17.1, mom: -2.9 },
    townhouse: { price: 1439700, yoy: -6.3, mom: -2.8 },
    apartment: { price: 682700, yoy: -10.3, mom: -2.2 },
  },
  "south-cambie": {
    subArea: "South Cambie",
    composite: { price: 1409000, yoy: -7.6, mom: -0.1 },
    detached: { price: 4047800, yoy: -10.0, mom: 0.6 },
    townhouse: { price: 1412100, yoy: -4.7, mom: -4.2 },
    apartment: { price: 1030900, yoy: -6.9, mom: -1.2 },
  },
  "riley-park": {
    subArea: "Main",
    composite: { price: 1583500, yoy: -3.6, mom: -0.9 },
    detached: { price: 1985700, yoy: -4.6, mom: 0.2 },
    townhouse: { price: 1091100, yoy: -8.2, mom: -5.1 },
    apartment: { price: 947800, yoy: -4.6, mom: -0.6 },
  },
  "kerrisdale": {
    subArea: "Kerrisdale",
    composite: { price: 1959800, yoy: -6.2, mom: -1.9 },
    detached: { price: 2961000, yoy: -10.0, mom: -2.3 },
    townhouse: { price: 1516800, yoy: -6.0, mom: -4.5 },
    apartment: { price: 978600, yoy: -7.4, mom: -1.4 },
  },
  "cambie-corridor": {
    subArea: "Cambie",
    composite: { price: 1508300, yoy: -6.6, mom: -1.8 },
    detached: { price: 2616700, yoy: -10.8, mom: -3.4 },
    townhouse: { price: 1597200, yoy: -6.6, mom: -3.3 },
    apartment: { price: 1023200, yoy: -7.5, mom: -1.3 },
  },
  "kitsilano": {
    subArea: "Kitsilano",
    composite: { price: 1297200, yoy: -3.3, mom: -2.3 },
    detached: { price: 2614700, yoy: -3.5, mom: -0.5 },
    townhouse: { price: 1180200, yoy: -6.5, mom: -5.9 },
    apartment: { price: 714000, yoy: -4.3, mom: -1.5 },
  },
  "ubc": {
    subArea: "University VW",
    composite: { price: 1133400, yoy: -4.9, mom: -1.3 },
    detached: { price: 2115400, yoy: -4.2, mom: 2.5 },
    townhouse: { price: 1559500, yoy: -7.7, mom: -5.1 },
    apartment: { price: 996400, yoy: -6.8, mom: -0.7 },
  },
  "arbutus-ridge": {
    subArea: "Arbutus",
    composite: { price: 3047100, yoy: -10.4, mom: -1.2 },
    detached: { price: 3108200, yoy: -10.8, mom: -1.2 },
  },
  "dunbar-southlands": {
    subArea: "Dunbar",
    composite: { price: 2641300, yoy: -5.7, mom: -1.0 },
    detached: { price: 2855600, yoy: -4.3, mom: -0.8 },
    apartment: { price: 965400, yoy: -3.9, mom: -1.7 },
  },
  "shaughnessy": {
    subArea: "Shaughnessy",
    composite: { price: 3931100, yoy: -7.0, mom: 1.5 },
    detached: { price: 4817000, yoy: -5.2, mom: 2.1 },
    townhouse: { price: 1684900, yoy: -10.6, mom: -4.1 },
    apartment: { price: 991000, yoy: -20.0, mom: -1.1 },
  },
  "west-point-grey": {
    subArea: "Point Grey",
    composite: { price: 2255600, yoy: -7.9, mom: -3.2 },
    detached: { price: 2689900, yoy: -6.2, mom: -3.1 },
    townhouse: { price: 1235300, yoy: -3.2, mom: -3.3 },
    apartment: { price: 736400, yoy: -6.9, mom: -3.3 },
  },
  "grandview-woodland": {
    subArea: "Grandview Woodland",
    composite: { price: 1312400, yoy: -6.7, mom: -2.6 },
    detached: { price: 1642000, yoy: -9.3, mom: -0.4 },
    townhouse: { price: 1221400, yoy: -9.7, mom: -4.8 },
    apartment: { price: 588700, yoy: -8.0, mom: -2.8 },
  },
  "hastings-sunrise": {
    subArea: "Hastings Sunrise",
    composite: { price: 1349500, yoy: -10.3, mom: -0.0 },
    detached: { price: 1558900, yoy: -11.6, mom: 0.1 },
    apartment: { price: 493000, yoy: -7.1, mom: -2.6 },
  },
  "kensington-cedar-cottage": {
    subArea: "Knight",
    composite: { price: 1406900, yoy: -1.2, mom: -1.2 },
    detached: { price: 1581500, yoy: -6.7, mom: -3.4 },
    townhouse: { price: 1253400, yoy: -2.2, mom: -3.8 },
    apartment: { price: 659300, yoy: -2.8, mom: -0.3 },
  },
  "downtown": {
    subArea: "Downtown VW",
    composite: { price: 612800, yoy: -7.6, mom: -2.6 },
    townhouse: { price: 1077600, yoy: -12.7, mom: 1.8 },
    apartment: { price: 604600, yoy: -7.7, mom: -2.8 },
  },
  "fairview": {
    subArea: "Fairview VW",
    composite: { price: 892500, yoy: 0.1, mom: 1.2 },
    townhouse: { price: 1107900, yoy: 7.1, mom: 6.1 },
    apartment: { price: 796900, yoy: -4.2, mom: -0.9 },
  },
  "west-end": {
    subArea: "West End VW",
    composite: { price: 609500, yoy: -9.4, mom: -0.8 },
    townhouse: { price: 1130300, yoy: -9.3, mom: 1.1 },
    apartment: { price: 600600, yoy: -9.7, mom: -0.9 },
  },
  "mount-pleasant": {
    subArea: "Mount Pleasant VE",
    composite: { price: 808300, yoy: -10.7, mom: -1.7 },
    detached: { price: 1671800, yoy: -12.3, mom: -6.5 },
    townhouse: { price: 1062600, yoy: -12.5, mom: -1.2 },
    apartment: { price: 647500, yoy: -10.9, mom: -1.3 },
  },
  "killarney": {
    subArea: "Killarney VE",
    composite: { price: 1505400, yoy: -8.2, mom: 0.9 },
    detached: { price: 1693200, yoy: -9.8, mom: 1.6 },
    townhouse: { price: 825800, yoy: -9.6, mom: -4.3 },
    apartment: { price: 526000, yoy: -7.7, mom: 0.7 },
  },
  "renfrew-collingwood": {
    subArea: "Collingwood VE",
    composite: { price: 833600, yoy: -7.1, mom: -1.4 },
    detached: { price: 1494500, yoy: -10.8, mom: 2.6 },
    townhouse: { price: 856400, yoy: -11.1, mom: -4.5 },
    apartment: { price: 501000, yoy: -8.2, mom: -4.4 },
  },
  "sunset": {
    subArea: "South Vancouver",
    composite: { price: 1476800, yoy: -10.6, mom: 2.0 },
    detached: { price: 1583900, yoy: -10.7, mom: 1.2 },
    apartment: { price: 530400, yoy: -6.3, mom: 1.6 },
  },
  "victoria-fraserview": {
    subArea: "Fraserview VE",
    composite: { price: 1998200, yoy: -9.6, mom: 3.0 },
    detached: { price: 1990400, yoy: -8.9, mom: 2.9 },
  },
  "strathcona": {
    subArea: "Strathcona",
    composite: { price: 794900, yoy: -10.4, mom: -3.1 },
    detached: { price: 1471300, yoy: -9.0, mom: -5.5 },
    townhouse: { price: 899900, yoy: -12.9, mom: -1.4 },
    apartment: { price: 643900, yoy: -10.8, mom: -1.7 },
  },
};

/** Region-wide benchmarks for the same release, for "versus the city" context. */
export const REGION_BENCHMARKS: Record<"composite" | PropertyType, Benchmark> = {
  composite: { price: 1088800, yoy: -6.2, mom: -0.9 },
  detached: { price: 1822900, yoy: -7.0, mom: -1.1 },
  townhouse: { price: 1030400, yoy: -6.0, mom: -1.5 },
  apartment: { price: 688000, yoy: -7.5, mom: -1.1 },
};

/** Format a benchmark the way the site writes prices. */
export function formatPrice(price: number): string {
  return price >= 1_000_000
    ? `$${(price / 1_000_000).toFixed(2)}M`
    : `$${Math.round(price / 1000)}K`;
}

/** Every (area, property type) pair GVR actually publishes a benchmark for. */
export function publishedCombinations(): { slug: string; type: PropertyType }[] {
  const types: PropertyType[] = ["detached", "townhouse", "apartment"];
  return Object.entries(AREA_BENCHMARKS).flatMap(([slug, area]) =>
    types.filter((type) => area[type]).map((type) => ({ slug, type })),
  );
}
