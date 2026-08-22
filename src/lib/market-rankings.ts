import { NEIGHBOURHOODS } from "./neighborhoods";
import {
  AREA_BENCHMARKS,
  formatPrice,
  HPI_RELEASE,
  REGION_BENCHMARKS,
  type PropertyType,
} from "./market-data";
import { marketPagePath, PROPERTY_TYPES } from "./market-pages";

/**
 * City-wide rankings of the neighbourhood benchmarks.
 *
 * These answer questions the per-area pages cannot, because the answer is an
 * ordering rather than a figure: which areas are holding value, which are the
 * cheapest way into the city. Searching those questions today returns
 * qualitative guesses — "will maintain value but appreciation may be modest" —
 * because the ranked answer is not published anywhere. It is derivable from
 * the GVR sub-area data in one line, so it is published here.
 *
 * Deliberately few. Each ordering has to tell a genuinely different story or it
 * is the same page twice.
 */

export type RankedArea = {
  slug: string;
  name: string;
  price: number;
  yoy: number;
  mom: number;
  /** Difference from the regional composite, in percent. */
  vsRegion: number;
  types: { type: PropertyType; href: string; label: string; price: number }[];
};

function rankedAreas(): RankedArea[] {
  return Object.entries(AREA_BENCHMARKS).map(([slug, area]) => ({
    slug,
    name: NEIGHBOURHOODS[slug]?.name ?? slug,
    price: area.composite.price,
    yoy: area.composite.yoy,
    mom: area.composite.mom,
    vsRegion: Number(
      (
        (area.composite.price / REGION_BENCHMARKS.composite.price - 1) *
        100
      ).toFixed(1),
    ),
    types: (["detached", "townhouse", "apartment"] as PropertyType[])
      .filter((type) => area[type])
      .map((type) => ({
        type,
        href: marketPagePath(slug, type),
        label: PROPERTY_TYPES[type].plural.toLowerCase(),
        price: area[type]!.price,
      })),
  }));
}

export type Ranking = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  /** Quotable block: the answer before any setup. */
  summary: string;
  /** Column heading for whatever the ranking is sorted on. */
  measure: string;
  areas: RankedArea[];
  faqs: { q: string; a: string }[];
};

function holdingValue(): Ranking {
  const areas = rankedAreas().sort((a, b) => b.yoy - a.yoy);
  const best = areas.slice(0, 3);
  const worst = areas[areas.length - 1];
  const region = REGION_BENCHMARKS.composite;

  return {
    slug: "holding-value",
    path: "/market/holding-value",
    title: `Vancouver neighbourhoods holding value best, ${HPI_RELEASE}`,
    description: `Every Vancouver neighbourhood ranked by year-over-year change in its MLS® HPI composite benchmark, ${HPI_RELEASE}. ${best[0].name} leads at ${best[0].yoy > 0 ? "+" : ""}${best[0].yoy}%.`,
    h1: `Which Vancouver neighbourhoods are holding their value?`,
    summary: `Ranked by year-over-year change in the MLS® HPI composite benchmark, ${best[0].name} is holding value best of the ${areas.length} Vancouver neighbourhoods on this site at ${best[0].yoy > 0 ? "+" : ""}${best[0].yoy}%, followed by ${best[1].name} at ${best[1].yoy}% and ${best[2].name} at ${best[2].yoy}%. Metro Vancouver as a whole moved ${region.yoy}% over the same year, so those three are outperforming the region by ${(best[0].yoy - region.yoy).toFixed(1)}, ${(best[1].yoy - region.yoy).toFixed(1)} and ${(best[2].yoy - region.yoy).toFixed(1)} points. ${worst.name} has softened most, at ${worst.yoy}%. These are benchmark movements for an area and property mix, not a forecast.`,
    measure: "1 year",
    areas,
    faqs: [
      {
        q: "Which Vancouver neighbourhood is holding its value best right now?",
        a: `${best[0].name}, on the ${HPI_RELEASE} MLS® HPI release, with its composite benchmark ${best[0].yoy > 0 ? "up" : "down"} ${Math.abs(best[0].yoy)}% year over year against ${region.yoy}% for Metro Vancouver. ${best[1].name} (${best[1].yoy}%) and ${best[2].name} (${best[2].yoy}%) follow.`,
      },
      {
        q: "Does holding value mean it is a good buy?",
        a: "Not on its own. A benchmark that has fallen less than the market can mean tight supply, a property mix weighted to types that held up, or genuine demand — and those have very different implications for what you should pay. The ranking tells you where prices moved, not why, and the why is the part worth a conversation.",
      },
      {
        q: "Why do neighbourhoods with similar homes move differently?",
        a: "The composite blends detached, townhouse, and condo, so an area's mix drives much of the difference. Condos and detached homes have moved apart considerably this year, which means two areas with similar housing can diverge simply because one has more apartments. The per-property-type pages separate that out.",
      },
    ],
  };
}

function mostAffordable(): Ranking {
  const areas = rankedAreas().sort((a, b) => a.price - b.price);
  const cheapest = areas.slice(0, 3);
  const region = REGION_BENCHMARKS.composite;

  return {
    slug: "most-affordable",
    path: "/market/most-affordable",
    title: `Most affordable Vancouver neighbourhoods, ${HPI_RELEASE}`,
    description: `Every Vancouver neighbourhood ranked by MLS® HPI composite benchmark, cheapest first, ${HPI_RELEASE}. ${cheapest[0].name} is lowest at ${formatPrice(cheapest[0].price)}.`,
    h1: `The most affordable neighbourhoods in Vancouver`,
    summary: `On the ${HPI_RELEASE} MLS® HPI release, ${cheapest[0].name} has the lowest composite benchmark of the ${areas.length} Vancouver neighbourhoods on this site at ${formatPrice(cheapest[0].price)}, followed by ${cheapest[1].name} at ${formatPrice(cheapest[1].price)} and ${cheapest[2].name} at ${formatPrice(cheapest[2].price)}. Metro Vancouver's composite benchmark is ${formatPrice(region.price)}, so ${cheapest[0].name} sits ${Math.abs(cheapest[0].vsRegion)}% below it. The composite blends detached, townhouse, and condo, so areas with mostly apartments rank lower than areas with mostly houses — the per-property-type figures on each row are the fairer comparison.`,
    measure: "Composite",
    areas,
    faqs: [
      {
        q: "What is the cheapest neighbourhood in Vancouver?",
        a: `By MLS® HPI composite benchmark on the ${HPI_RELEASE} release, ${cheapest[0].name} at ${formatPrice(cheapest[0].price)}, then ${cheapest[1].name} at ${formatPrice(cheapest[1].price)}. That figure blends property types, so an area full of condos will always look cheaper than one full of detached homes — compare like with like using the per-type links.`,
      },
      {
        q: "Where can I buy a condo in Vancouver for the least money?",
        a: (() => {
          const byCondo = rankedAreas()
            .filter((area) => area.types.some((t) => t.type === "apartment"))
            .sort(
              (a, b) =>
                a.types.find((t) => t.type === "apartment")!.price -
                b.types.find((t) => t.type === "apartment")!.price,
            )
            .slice(0, 3);
          return `On benchmark, ${byCondo
            .map(
              (area) =>
                `${area.name} (${formatPrice(area.types.find((t) => t.type === "apartment")!.price)})`,
            )
            .join(
              ", ",
            )}. Benchmarks describe a typical unit, so an older or smaller apartment can sit well below these.`;
        })(),
      },
      {
        q: "Is a lower benchmark the same as better value?",
        a: "No. A benchmark is a price, not a judgement. Value depends on what you get for it — lot size, condition, transit, school catchment, and what the area is likely to do next. A cheaper benchmark with a worse commute and no transit plan is not better value than a dearer one with both.",
      },
    ],
  };
}

export function getRankings(): Ranking[] {
  return [holdingValue(), mostAffordable()];
}

export function getRanking(slug: string): Ranking | null {
  return getRankings().find((ranking) => ranking.slug === slug) ?? null;
}
