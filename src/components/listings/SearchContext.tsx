import Link from "next/link";
import {
  AREA_BENCHMARKS,
  formatPrice,
  HPI_RELEASE,
  REGION_BENCHMARKS,
} from "@/lib/market-data";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { marketPagePath } from "@/lib/market-pages";

/**
 * Context for the MLS listing pages.
 *
 * A listing grid is a live feed: whatever it shows changes hourly and is gone
 * when the property sells, which is why these pages carried 51 to 140 words of
 * their own and could not earn a snippet. This gives them something durable to
 * say — what the current benchmarks are, and what the asking prices above
 * should be read against — from the same GVR data the rest of the site uses.
 *
 * `variant` changes the framing, not just the wording: someone filtering the
 * whole city needs different orientation from someone looking at a curated
 * shortlist.
 */
export default function SearchContext({
  variant,
}: {
  variant: "search" | "featured" | "opportunities";
}) {
  const region = REGION_BENCHMARKS;

  const cheapestCondo = Object.entries(AREA_BENCHMARKS)
    .filter(([, area]) => area.apartment)
    .sort((a, b) => a[1].apartment!.price - b[1].apartment!.price)
    .slice(0, 4)
    .map(([slug, area]) => ({
      slug,
      name: NEIGHBOURHOODS[slug]?.name ?? slug,
      price: area.apartment!.price,
    }));

  const intro = {
    search: `Every listing above is live from the MLS® and changes through the day. What does not change hour to hour is the benchmark — the price a typical property of that type commands in that area — and that is the number worth reading an asking price against.`,
    featured: `These are listings with room to negotiate: on market longer than the area average, priced above comparable sales, or coming from a seller with a reason to move. Judging whether an asking price is actually high means knowing the benchmark for that area and property type.`,
    opportunities: `Court-ordered sales, estate sales, and motivated sellers turn up below-market pricing — but "below market" only means something measured against a real figure. These are the current benchmarks that pricing should be read against.`,
  }[variant];

  return (
    <section
      aria-labelledby="listing-context"
      className="py-16 bg-warm-50 border-t border-warm-100"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id="listing-context"
          className="font-serif text-2xl md:text-3xl text-teal-950 mb-4"
        >
          What these prices should be measured against
        </h2>
        <p className="text-warm-600 leading-relaxed mb-6">{intro}</p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Metro Vancouver MLS HPI benchmark prices, {HPI_RELEASE}
            </caption>
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-warm-500">
                <th className="py-2 pr-4 font-medium">Metro Vancouver</th>
                <th className="py-2 pr-4 font-medium">Benchmark</th>
                <th className="py-2 font-medium">1 year</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Detached", region.detached],
                ["Townhouse", region.townhouse],
                ["Condo", region.apartment],
              ].map(([label, row]) => (
                <tr key={label as string} className="border-t border-warm-200">
                  <td className="py-2.5 pr-4 text-warm-700">
                    {label as string}
                  </td>
                  <td className="py-2.5 pr-4 font-serif text-teal-800">
                    {formatPrice((row as typeof region.detached).price)}
                  </td>
                  <td className="py-2.5 text-warm-600">
                    {(row as typeof region.detached).yoy.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-warm-600 leading-relaxed mb-6">
          A listing well above the benchmark for its area is not necessarily
          overpriced — a renovated home on a corner lot should sit above it. The
          benchmark tells you when to ask why, which is a more useful thing than
          a verdict. The lowest condo benchmarks in the city right now are{" "}
          {cheapestCondo.map((area, index) => (
            <span key={area.slug}>
              {index > 0 &&
                (index === cheapestCondo.length - 1 ? ", and " : ", ")}
              <Link
                href={marketPagePath(area.slug, "apartment")}
                className="text-teal-700 hover:text-teal-900"
              >
                {area.name}
              </Link>{" "}
              at {formatPrice(area.price)}
            </span>
          ))}
          .
        </p>

        <p className="text-sm text-warm-600">
          <Link href="/market" className="text-teal-700 hover:text-teal-900">
            Benchmark prices for every Vancouver neighbourhood
          </Link>
          {" · "}
          <Link
            href="/market/most-affordable"
            className="text-teal-700 hover:text-teal-900"
          >
            Most affordable neighbourhoods
          </Link>
          {" · "}
          <Link
            href="/selling/home-valuation"
            className="text-teal-700 hover:text-teal-900"
          >
            What a specific property is worth
          </Link>
        </p>
      </div>
    </section>
  );
}
