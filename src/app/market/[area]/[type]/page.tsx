import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import JsonLd, {
  BreadcrumbSchema,
  FAQSchema,
  ORGANIZATION_ID,
} from "@/components/seo/JsonLd";
import { formatPrice, publishedCombinations } from "@/lib/market-data";
import {
  getMarketPage,
  marketPagePath,
  propertyTypeFromSlug,
  PROPERTY_TYPES,
} from "@/lib/market-pages";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { BRAND, NAP, NAP_ONE_LINE, SITE_URL } from "@/lib/agent/site";

/**
 * Benchmark price by neighbourhood and property type.
 *
 * One page per (area, type) pair GVR publishes a benchmark for. Every figure
 * comes from `lib/market-pages.ts`, which the markdown twin also renders from,
 * and no page is generated for a pair with no published figure.
 */

type Params = { area: string; type: string };

export function generateStaticParams(): Params[] {
  return publishedCombinations().map(({ slug, type }) => ({
    area: slug,
    type: PROPERTY_TYPES[type].slug,
  }));
}

export const dynamicParams = false;

function load(params: Params) {
  const type = propertyTypeFromSlug(params.type);
  return type ? getMarketPage(params.area, type) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const page = load(await params);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { title: page.title, description: page.description, type: "article" },
  };
}

export default async function MarketPricePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const page = load(await params);
  if (!page) notFound();

  const hood = NEIGHBOURHOODS[page.areaSlug];
  const rows = [
    {
      label: `${page.areaName} ${page.typeMeta.plural.toLowerCase()}`,
      price: formatPrice(page.benchmark.price),
      yoy: page.benchmark.yoy,
      mom: page.benchmark.mom,
      highlight: true,
    },
    {
      label: `Metro Vancouver ${page.typeMeta.proseLabel}`,
      price: formatPrice(page.region.price),
      yoy: page.region.yoy,
      mom: page.region.mom,
      highlight: false,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: page.areaName, href: `/neighborhoods/${page.areaSlug}` },
          { name: `${page.typeMeta.proseLabel} prices`, href: page.path },
        ]}
      />
      <FAQSchema faqs={page.faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: page.title,
          description: page.description,
          url: `${SITE_URL}${page.path}`,
          isAccessibleForFree: true,
          creator: { "@id": ORGANIZATION_ID },
          temporalCoverage: page.release,
          spatialCoverage: {
            "@type": "Place",
            name: `${page.areaName}, Vancouver, BC`,
            geo: {
              "@type": "GeoCoordinates",
              latitude: hood.center.lat,
              longitude: hood.center.lng,
            },
          },
          variableMeasured: {
            "@type": "PropertyValue",
            name: `MLS HPI benchmark price, ${page.typeMeta.gvrLabel}`,
            value: page.benchmark.price,
            unitText: "CAD",
          },
          includedInDataCatalog: {
            "@type": "DataCatalog",
            name: "Greater Vancouver REALTORS MLS® Home Price Index",
          },
        }}
      />

      <section className="pt-28 pb-16 md:pt-32">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="text-xs text-warm-500 mb-6" aria-label="Breadcrumb">
            <Link href="/neighborhoods" className="hover:text-teal-700">
              Neighbourhoods
            </Link>{" "}
            /{" "}
            <Link
              href={`/neighborhoods/${page.areaSlug}`}
              className="hover:text-teal-700"
            >
              {page.areaName}
            </Link>{" "}
            / {page.typeMeta.proseLabel} prices
          </nav>

          <h1
            id="benchmark"
            className="font-serif text-3xl md:text-4xl text-teal-950 mb-3"
          >
            {page.areaName} {page.typeMeta.plural.toLowerCase()}: what they cost
            in {page.release}
          </h1>

          {/* The quotable block: answers the query before any setup. */}
          <div className="rounded-2xl bg-warm-50 border border-warm-200 p-6 md:p-7 mb-10">
            <p className="font-serif text-2xl text-teal-800 mb-3">
              {formatPrice(page.benchmark.price)}
            </p>
            <p className="text-warm-700 leading-relaxed">{page.summary}</p>
            <p className="text-[11px] uppercase tracking-wider text-warm-400 mt-4">
              Source: {page.source} · GVR sub-area &ldquo;{page.subArea}&rdquo;
            </p>
          </div>

          <section aria-labelledby="how-it-compares" className="mb-12">
            <h2
              id="how-it-compares"
              className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2"
            >
              How it compares with the rest of the region
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-warm-500">
                    <th className="py-2 pr-4 font-medium">Benchmark</th>
                    <th className="py-2 pr-4 font-medium">Price</th>
                    <th className="py-2 pr-4 font-medium">1 year</th>
                    <th className="py-2 font-medium">1 month</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-t border-warm-200">
                      <td
                        className={`py-3 pr-4 ${row.highlight ? "text-teal-900 font-medium" : "text-warm-600"}`}
                      >
                        {row.label}
                      </td>
                      <td className="py-3 pr-4 font-serif text-teal-800">
                        {row.price}
                      </td>
                      <td className="py-3 pr-4 text-warm-600">
                        {row.yoy > 0 ? "+" : ""}
                        {row.yoy.toFixed(1)}%
                      </td>
                      <td className="py-3 text-warm-600">
                        {row.mom > 0 ? "+" : ""}
                        {row.mom.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-warm-600 leading-relaxed mt-5">
              {page.areaName} ranks{" "}
              <strong className="text-teal-900">
                {page.rank} of {page.rankOf}
              </strong>{" "}
              Vancouver neighbourhoods with a published{" "}
              {page.typeMeta.proseLabel} benchmark
              {page.cheaper > 0
                ? `, with ${page.cheaper} ${page.cheaper === 1 ? "area" : "areas"} priced below it`
                : ""}
              .
            </p>
          </section>

          {page.comparables.length > 0 && (
            <section aria-labelledby="comparable-areas" className="mb-12">
              <h2
                id="comparable-areas"
                className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2"
              >
                Neighbourhoods at a similar price
              </h2>
              <ul className="space-y-2">
                {page.comparables.map((comparable) => (
                  <li key={comparable.slug} className="text-sm">
                    <Link
                      href={marketPagePath(comparable.slug, page.type)}
                      className="text-teal-700 hover:text-teal-900 font-medium"
                    >
                      {comparable.name} {page.typeMeta.plural.toLowerCase()}
                    </Link>
                    <span className="text-warm-600">
                      {" "}
                      — {formatPrice(comparable.price)} (
                      {comparable.vs > 0 ? "+" : ""}
                      {comparable.vs.toFixed(1)}% vs {page.areaName})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {page.siblings.length > 0 && (
            <section aria-labelledby="other-types" className="mb-12">
              <h2
                id="other-types"
                className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2"
              >
                Other property types in {page.areaName}
              </h2>
              <ul className="space-y-2">
                {page.siblings.map((sibling) => (
                  <li key={sibling.slug} className="text-sm">
                    <Link
                      href={sibling.slug}
                      className="text-teal-700 hover:text-teal-900 font-medium"
                    >
                      {page.areaName} {sibling.plural.toLowerCase()}
                    </Link>
                    <span className="text-warm-600">
                      {" "}
                      — {formatPrice(sibling.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="about-the-area" className="mb-12">
            <h2
              id="about-the-area"
              className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2"
            >
              What you get in {page.areaName}
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              {hood.tagline}. Walk Score {hood.walkScore}, Transit Score{" "}
              {hood.transitScore}.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-600 leading-relaxed mb-4">
              {hood.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link
              href={`/neighborhoods/${page.areaSlug}`}
              className="text-teal-700 hover:text-teal-900 text-sm font-medium"
            >
              Full {page.areaName} neighbourhood guide →
            </Link>
          </section>

          <section aria-labelledby="questions" className="mb-12">
            <h2
              id="questions"
              className="font-serif text-xl md:text-2xl text-teal-900 mb-6 border-b border-warm-200 pb-2"
            >
              Questions people ask
            </h2>
            <div className="space-y-6">
              {page.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-serif text-lg text-teal-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-warm-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="get-a-real-number"
            className="rounded-2xl bg-teal-950 p-7 md:p-8"
          >
            <h2
              id="get-a-real-number"
              className="font-serif text-xl md:text-2xl text-white/90 mb-3"
            >
              Want the number for an actual property?
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              A benchmark tracks a market; it does not value a home. A
              comparative market analysis looks at the specific property — its
              size, condition, outlook, and what comparable homes actually sold
              for. {BRAND.name} prepares one at no cost and no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/selling/home-valuation" variant="secondary">
                Request a valuation
              </Button>
              <Button href="/contact" variant="outline">
                Ask a question
              </Button>
            </div>
          </section>

          <p className="text-[11px] leading-relaxed text-warm-400 mt-8">
            {BRAND.name}, {BRAND.jobTitle} licensed in British Columbia,{" "}
            {NAP_ONE_LINE}. {NAP.telephone}. Benchmark figures are Greater
            Vancouver REALTORS® MLS® Home Price Index values for the{" "}
            {page.subArea} sub-area, {page.release}, and are not an appraisal of
            any specific property. MLS® and REALTOR® are trademarks owned by the
            Canadian Real Estate Association.
          </p>
        </div>
      </section>
    </>
  );
}
