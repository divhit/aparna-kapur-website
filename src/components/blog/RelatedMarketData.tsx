import Link from "next/link";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import {
  AREA_BENCHMARKS,
  formatPrice,
  HPI_RELEASE,
  type PropertyType,
} from "@/lib/market-data";
import { marketPagePath, PROPERTY_TYPES } from "@/lib/market-pages";

/**
 * Current prices for the neighbourhoods an article talks about.
 *
 * The Oakridge Park posts carry two thirds of the site's clicks and most of
 * its earned authority. They already link to the neighbourhood guides, but not
 * to the price pages — so a reader who has just read about a $6bn
 * redevelopment has no route to what a condo there actually costs, and the
 * pages that answer that get none of the article's weight.
 *
 * Which neighbourhoods a post is about is derived from the post itself, so it
 * stays accurate when one is edited rather than needing a hand-kept list.
 */

const TYPE_ORDER: PropertyType[] = ["detached", "townhouse", "apartment"];

/**
 * The neighbourhoods an article is actually about, by how often it names them.
 *
 * Body links would be the tidier signal, but most posts do not link to the
 * guides at all — matching the name is what works on the content that exists,
 * and it keeps working when a post is rewritten.
 */
export function neighbourhoodsMentioned(markdown: string, limit = 3): string[] {
  const counted = Object.keys(AREA_BENCHMARKS)
    .map((slug) => {
      const name = NEIGHBOURHOODS[slug]?.name;
      if (!name) return { slug, count: 0 };
      const pattern = new RegExp(
        `\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi",
      );
      return { slug, count: (markdown.match(pattern) ?? []).length };
    })
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  return counted.slice(0, limit).map((entry) => entry.slug);
}

export default function RelatedMarketData({ slugs }: { slugs: string[] }) {
  const areas = slugs
    .map((slug) => ({
      slug,
      hood: NEIGHBOURHOODS[slug],
      area: AREA_BENCHMARKS[slug],
    }))
    .filter((entry) => entry.hood && entry.area);

  if (areas.length === 0) return null;

  return (
    <aside
      aria-labelledby="related-prices"
      className="mt-14 rounded-2xl bg-warm-50 border border-warm-200 p-6 md:p-7"
    >
      <h2 id="related-prices" className="font-serif text-xl text-teal-950 mb-2">
        What these neighbourhoods cost right now
      </h2>
      <p className="text-sm text-warm-600 leading-relaxed mb-6">
        MLS® HPI benchmarks as of {HPI_RELEASE} — the price a typical property
        commands, which is a steadier read than any single asking price.
      </p>

      <div className="space-y-5">
        {areas.map(({ slug, hood, area }) => (
          <div key={slug}>
            <p className="text-sm">
              <Link
                href={`/neighborhoods/${slug}`}
                className="font-medium text-teal-800 hover:text-teal-900"
              >
                {hood!.name}
              </Link>
              <span className="text-warm-500">
                {" "}
                — composite {formatPrice(area!.composite.price)},{" "}
                {area!.composite.yoy.toFixed(1)}% year over year
              </span>
            </p>
            <p className="text-xs mt-1">
              {TYPE_ORDER.filter((type) => area![type]).map((type, index) => (
                <span key={type}>
                  {index > 0 && <span className="text-warm-300"> · </span>}
                  <Link
                    href={marketPagePath(slug, type)}
                    className="text-teal-700 hover:text-teal-900"
                  >
                    {hood!.name} {PROPERTY_TYPES[type].plural.toLowerCase()}{" "}
                    {formatPrice(area![type]!.price)}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-warm-600 mt-6">
        <Link href="/market" className="text-teal-700 hover:text-teal-900">
          Benchmark prices for every Vancouver neighbourhood
        </Link>
        {" · "}
        <Link
          href="/selling/home-valuation"
          className="text-teal-700 hover:text-teal-900"
        >
          What a specific property is worth
        </Link>
      </p>
    </aside>
  );
}
