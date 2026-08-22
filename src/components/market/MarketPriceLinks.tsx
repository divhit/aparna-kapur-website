import Link from "next/link";
import {
  AREA_BENCHMARKS,
  formatPrice,
  HPI_RELEASE,
  type PropertyType,
} from "@/lib/market-data";
import { marketPagePath, PROPERTY_TYPES } from "@/lib/market-pages";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";

/**
 * Links a neighbourhood guide to its benchmark price pages.
 *
 * The guides are the strongest pages on the site — they already rank — so this
 * is the link that carries authority to the newer price pages, and gives a
 * reader on a guide the specific figure the guide only summarises. Renders
 * nothing for an area with no published benchmark.
 */
export default function MarketPriceLinks({ slug }: { slug: string }) {
  const area = AREA_BENCHMARKS[slug];
  const hood = NEIGHBOURHOODS[slug];
  if (!area || !hood) return null;

  const types = (["detached", "townhouse", "apartment"] as PropertyType[])
    .filter((type) => area[type])
    .map((type) => ({
      type,
      href: marketPagePath(slug, type),
      label: PROPERTY_TYPES[type].plural,
      price: area[type]!.price,
      yoy: area[type]!.yoy,
    }));

  if (types.length === 0) return null;

  return (
    <section
      aria-labelledby={`benchmarks-${slug}`}
      className="py-16 bg-warm-50 border-t border-warm-100"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id={`benchmarks-${slug}`}
          className="font-serif text-2xl md:text-3xl text-teal-950 mb-3"
        >
          {hood.name} prices in detail
        </h2>
        <p className="text-warm-600 leading-relaxed mb-8">
          The {hood.name} composite benchmark is{" "}
          <strong className="text-teal-900">
            {formatPrice(area.composite.price)}
          </strong>{" "}
          as of {HPI_RELEASE}, {area.composite.yoy.toFixed(1)}% year over year.
          Broken out by property type, with how each compares to the rest of
          Vancouver:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {types.map((type) => (
            <Link
              key={type.type}
              href={type.href}
              className="block rounded-xl bg-white border border-warm-200 p-5 hover:border-teal-300 hover:shadow-sm transition-all"
            >
              <p className="text-xs uppercase tracking-wider text-warm-500 mb-1">
                {type.label}
              </p>
              <p className="font-serif text-2xl text-teal-800 mb-1">
                {formatPrice(type.price)}
              </p>
              <p className="text-xs text-warm-500">
                {type.yoy > 0 ? "+" : ""}
                {type.yoy.toFixed(1)}% year over year
              </p>
            </Link>
          ))}
        </div>

        <p className="text-sm text-warm-600 mt-6">
          See also:{" "}
          <Link href="/market" className="text-teal-700 hover:text-teal-900">
            benchmark prices for every Vancouver neighbourhood
          </Link>
          {" · "}
          <Link
            href="/market/holding-value"
            className="text-teal-700 hover:text-teal-900"
          >
            which neighbourhoods are holding value
          </Link>
        </p>
      </div>
    </section>
  );
}
