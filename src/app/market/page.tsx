import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import {
  AREA_BENCHMARKS,
  formatPrice,
  HPI_RELEASE,
  HPI_SOURCE,
  REGION_BENCHMARKS,
  publishedCombinations,
  type PropertyType,
} from "@/lib/market-data";
import { marketPagePath, PROPERTY_TYPES } from "@/lib/market-pages";
import { getRankings } from "@/lib/market-rankings";

/**
 * Hub for the benchmark price pages. Without it the 62 per-area pages had no
 * parent: /market itself returned 404 and nothing linked them together except
 * the sitemap.
 */

export const metadata: Metadata = {
  title: `Vancouver benchmark prices by neighbourhood, ${HPI_RELEASE}`,
  description: `MLS® HPI benchmark prices for every Vancouver neighbourhood and property type, ${HPI_RELEASE}. Composite ${formatPrice(REGION_BENCHMARKS.composite.price)} region-wide, ${REGION_BENCHMARKS.composite.yoy}% year over year.`,
  alternates: { canonical: "/market" },
};

export default function MarketHubPage() {
  const areas = Object.entries(AREA_BENCHMARKS)
    .map(([slug, area]) => ({
      slug,
      name: NEIGHBOURHOODS[slug]?.name ?? slug,
      composite: area.composite,
      types: (["detached", "townhouse", "apartment"] as PropertyType[])
        .filter((type) => area[type])
        .map((type) => ({
          type,
          href: marketPagePath(slug, type),
          label: PROPERTY_TYPES[type].plural.toLowerCase(),
          price: area[type]!.price,
        })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Benchmark prices", href: "/market" },
        ]}
      />

      <section className="pt-28 pb-16 md:pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <h1 id="benchmarks" className="font-serif text-3xl md:text-4xl text-teal-950 mb-6">
            Vancouver benchmark prices, {HPI_RELEASE}
          </h1>

          <div className="rounded-2xl bg-warm-50 border border-warm-200 p-6 md:p-7 mb-10">
            <p className="text-warm-700 leading-relaxed">
              The MLS® HPI composite benchmark for Metro Vancouver is{" "}
              <strong className="text-teal-900">
                {formatPrice(REGION_BENCHMARKS.composite.price)}
              </strong>
              , {REGION_BENCHMARKS.composite.yoy.toFixed(1)}% over the past year.
              Below, that figure broken out for {areas.length} Vancouver
              neighbourhoods and {publishedCombinations().length} neighbourhood
              and property-type combinations — every pair Greater Vancouver
              REALTORS® publishes a benchmark for. Where a type is missing, GVR
              publishes no figure for it because the sample is too small, and
              nothing has been estimated to fill the gap.
            </p>
            <p className="text-[11px] uppercase tracking-wider text-warm-400 mt-4">
              Source: {HPI_SOURCE}
            </p>
          </div>

          <section aria-labelledby="rankings" className="mb-12">
            <h2
              id="rankings"
              className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2"
            >
              Ranked across the city
            </h2>
            <ul className="space-y-3">
              {getRankings().map((ranking) => (
                <li key={ranking.slug}>
                  <Link
                    href={ranking.path}
                    className="text-teal-700 hover:text-teal-900 font-medium"
                  >
                    {ranking.h1}
                  </Link>
                  <span className="block text-sm text-warm-600">
                    {ranking.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="by-neighbourhood">
            <h2
              id="by-neighbourhood"
              className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2"
            >
              By neighbourhood
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-warm-500">
                    <th className="py-2 pr-4 font-medium">Neighbourhood</th>
                    <th className="py-2 pr-4 font-medium">Composite</th>
                    <th className="py-2 pr-4 font-medium">1 year</th>
                    <th className="py-2 font-medium">Benchmark by property type</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area) => (
                    <tr key={area.slug} className="border-t border-warm-200">
                      <td className="py-2.5 pr-4">
                        <Link
                          href={`/neighborhoods/${area.slug}`}
                          className="text-teal-700 hover:text-teal-900"
                        >
                          {area.name}
                        </Link>
                      </td>
                      <td className="py-2.5 pr-4 font-serif text-teal-800">
                        {formatPrice(area.composite.price)}
                      </td>
                      <td className="py-2.5 pr-4 text-warm-600">
                        {area.composite.yoy > 0 ? "+" : ""}
                        {area.composite.yoy.toFixed(1)}%
                      </td>
                      <td className="py-2.5 text-xs">
                        {area.types.map((type, index) => (
                          <span key={type.type}>
                            {index > 0 && <span className="text-warm-300"> · </span>}
                            <Link
                              href={type.href}
                              className="text-teal-700 hover:text-teal-900"
                            >
                              {type.label} {formatPrice(type.price)}
                            </Link>
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
