import Link from "next/link";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import {
  AREA_BENCHMARKS,
  formatPrice,
  HPI_RELEASE,
  HPI_SOURCE,
  REGION_BENCHMARKS,
} from "@/lib/market-data";
import { marketPagePath } from "@/lib/market-pages";
import { MARKET_SNAPSHOT } from "@/lib/agent/site";

/**
 * Server-rendered market summary.
 *
 * The interactive chart below it is a client component, so a crawler with no
 * JavaScript used to see 171 words on the site's most data-rich page — six
 * neighbourhoods, no month, no region-wide context. This renders the whole
 * picture in the HTML: the region-wide benchmarks and all 24 neighbourhoods,
 * ranked, from the same data the rest of the site uses.
 */

function Change({ value }: { value: number }) {
  return (
    <span className={value >= 0 ? "text-teal-700" : "text-warm-600"}>
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export default function MarketSummary() {
  const areas = Object.entries(AREA_BENCHMARKS)
    .map(([slug, area]) => ({
      slug,
      name: NEIGHBOURHOODS[slug]?.name ?? slug,
      ...area.composite,
    }))
    .sort((a, b) => b.price - a.price);

  const regionRows = [
    { label: "Composite", ...REGION_BENCHMARKS.composite },
    { label: "Detached", ...REGION_BENCHMARKS.detached },
    { label: "Townhouse", ...REGION_BENCHMARKS.townhouse },
    { label: "Condo", ...REGION_BENCHMARKS.apartment },
  ];

  return (
    <>
      <section aria-labelledby="metro-vancouver" className="mb-14">
        <h2
          id="metro-vancouver"
          className="font-serif text-2xl text-teal-950 mb-3"
        >
          Metro Vancouver, {HPI_RELEASE}
        </h2>
        <p className="text-warm-600 leading-relaxed mb-6">
          The MLS® HPI composite benchmark for Metro Vancouver is{" "}
          <strong className="text-teal-900">
            {formatPrice(REGION_BENCHMARKS.composite.price)}
          </strong>
          , {REGION_BENCHMARKS.composite.yoy.toFixed(1)}% over the past year and{" "}
          {REGION_BENCHMARKS.composite.mom.toFixed(1)}% over the past month.
          There were {MARKET_SNAPSHOT.metrics[2].value} active listings, and the
          sales-to-active ratio sat at {MARKET_SNAPSHOT.metrics[5].value} —
          balanced territory, where prices tend to hold rather than move sharply
          in either direction.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Metro Vancouver MLS HPI benchmark prices for {HPI_RELEASE}
            </caption>
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-warm-500">
                <th className="py-2 pr-4 font-medium">Property type</th>
                <th className="py-2 pr-4 font-medium">Benchmark</th>
                <th className="py-2 pr-4 font-medium">1 year</th>
                <th className="py-2 font-medium">1 month</th>
              </tr>
            </thead>
            <tbody>
              {regionRows.map((row) => (
                <tr key={row.label} className="border-t border-warm-200">
                  <td className="py-2.5 pr-4 text-warm-700">{row.label}</td>
                  <td className="py-2.5 pr-4 font-serif text-teal-800">
                    {formatPrice(row.price)}
                  </td>
                  <td className="py-2.5 pr-4">
                    <Change value={row.yoy} />
                  </td>
                  <td className="py-2.5">
                    <Change value={row.mom} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="every-neighbourhood" className="mb-14">
        <h2
          id="every-neighbourhood"
          className="font-serif text-2xl text-teal-950 mb-3"
        >
          Every neighbourhood, most expensive first
        </h2>
        <p className="text-warm-600 leading-relaxed mb-6">
          Composite benchmark for each of the {areas.length} Vancouver
          neighbourhoods covered on this site, from the same {HPI_RELEASE}{" "}
          release. The composite blends detached, townhouse, and condo, so an
          area with mostly detached stock reads higher than one with mostly
          apartments.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Composite MLS HPI benchmark by Vancouver neighbourhood,{" "}
              {HPI_RELEASE}
            </caption>
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-warm-500">
                <th className="py-2 pr-4 font-medium">Neighbourhood</th>
                <th className="py-2 pr-4 font-medium">Composite</th>
                <th className="py-2 pr-4 font-medium">1 year</th>
                <th className="py-2 font-medium">By property type</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => {
                const entry = AREA_BENCHMARKS[area.slug];
                const links = (["detached", "townhouse", "apartment"] as const)
                  .filter((type) => entry[type])
                  .map((type) => ({
                    type,
                    href: marketPagePath(area.slug, type),
                    label:
                      type === "detached"
                        ? "houses"
                        : type === "townhouse"
                          ? "townhouses"
                          : "condos",
                  }));
                return (
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
                      {formatPrice(area.price)}
                    </td>
                    <td className="py-2.5 pr-4">
                      <Change value={area.yoy} />
                    </td>
                    <td className="py-2.5 text-xs">
                      {links.map((link, index) => (
                        <span key={link.type}>
                          {index > 0 && (
                            <span className="text-warm-300"> · </span>
                          )}
                          <Link
                            href={link.href}
                            className="text-teal-700 hover:text-teal-900"
                          >
                            {link.label}
                          </Link>
                        </span>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] uppercase tracking-wider text-warm-400 mt-4">
          Source: {HPI_SOURCE}
        </p>
      </section>
    </>
  );
}
