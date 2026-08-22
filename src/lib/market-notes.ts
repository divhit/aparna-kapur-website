import type { PropertyType } from "./market-data";

/**
 * Aparna's own notes on specific markets.
 *
 * Everything else on the benchmark pages is composed from published figures.
 * This file is the opposite: it is for the things only she knows — which
 * buildings have levies coming, which block is quieter than it looks, what she
 * actually saw at the last three showings. One paragraph here is worth more
 * than any amount of generated prose, both to a reader and to a search engine
 * deciding whether this page adds anything the portals do not.
 *
 * When a note exists it leads the commentary, above the generated reading.
 *
 * Writing one:
 * - Say something a portal could not. "The benchmark is $714K" is already on
 *   the page; "the buildings on the north side of 4th trade at a premium
 *   because of the water view, and the ones a block south do not" is not.
 * - First person, the way you would say it to someone across a table.
 * - No forecasts. Describing what you have seen is fine; predicting prices in
 *   writing is not.
 * - If a note stops being true, delete it. A stale note is worse than none.
 *
 * Keyed by `${areaSlug}:${propertyType}` — so a note can be specific to
 * Kitsilano condos without applying to Kitsilano houses.
 */
export const MARKET_NOTES: Partial<
  Record<`${string}:${PropertyType}`, string>
> = {
  // "kitsilano:apartment":
  //   "Ask me about the difference between the pre-2000 low-rises south of 4th
  //   and the newer buildings closer to the water — the benchmark blends them,
  //   and the maintenance picture is not remotely the same.",
};

export function getMarketNote(
  areaSlug: string,
  type: PropertyType,
): string | null {
  return MARKET_NOTES[`${areaSlug}:${type}`] ?? null;
}
