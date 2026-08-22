import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";
import { formatPrice, HPI_SOURCE, REGION_BENCHMARKS } from "@/lib/market-data";
import { getRanking, getRankings } from "@/lib/market-rankings";
import { BRAND, NAP, NAP_ONE_LINE } from "@/lib/agent/site";

/**
 * City-wide rankings of the neighbourhood benchmarks. Answers the questions
 * whose answer is an ordering rather than a single figure.
 *
 * The segment is named `[area]` to match `[area]/[type]` below it — Next.js
 * requires one slug name per path position, so this cannot be `[ranking]` even
 * though that is what it holds. A ranking slug can never collide with a
 * neighbourhood slug; `market-rankings.test.ts` asserts that.
 */

export function generateStaticParams() {
  return getRankings().map((ranking) => ({ area: ranking.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const ranking = getRanking((await params).area);
  if (!ranking) return {};
  return {
    title: ranking.title,
    description: ranking.description,
    alternates: { canonical: ranking.path },
    openGraph: { title: ranking.title, description: ranking.description, type: "article" },
  };
}

export default async function MarketRankingPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const ranking = getRanking((await params).area);
  if (!ranking) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Benchmark prices", href: "/market" },
          { name: ranking.h1, href: ranking.path },
        ]}
      />
      <FAQSchema faqs={ranking.faqs} />

      <section className="pt-28 pb-16 md:pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-xs text-warm-500 mb-6" aria-label="Breadcrumb">
            <Link href="/market" className="hover:text-teal-700">
              Benchmark prices
            </Link>{" "}
            / {ranking.h1}
          </nav>

          <h1 id="ranking" className="font-serif text-3xl md:text-4xl text-teal-950 mb-6">
            {ranking.h1}
          </h1>

          <div className="rounded-2xl bg-warm-50 border border-warm-200 p-6 md:p-7 mb-10">
            <p className="text-warm-700 leading-relaxed">{ranking.summary}</p>
            <p className="text-[11px] uppercase tracking-wider text-warm-400 mt-4">
              Source: {HPI_SOURCE}
            </p>
          </div>

          <section aria-labelledby="table" className="mb-12">
            <h2
              id="table"
              className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2"
            >
              All {ranking.areas.length} neighbourhoods
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-warm-500">
                    <th className="py-2 pr-3 font-medium">#</th>
                    <th className="py-2 pr-4 font-medium">Neighbourhood</th>
                    <th className="py-2 pr-4 font-medium">Composite</th>
                    <th className="py-2 pr-4 font-medium">1 year</th>
                    <th className="py-2 pr-4 font-medium">vs region</th>
                    <th className="py-2 font-medium">By type</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.areas.map((area, index) => (
                    <tr key={area.slug} className="border-t border-warm-200">
                      <td className="py-2.5 pr-3 text-warm-400">{index + 1}</td>
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
                        <span className={area.yoy >= 0 ? "text-teal-700" : "text-warm-600"}>
                          {area.yoy > 0 ? "+" : ""}
                          {area.yoy.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-warm-600">
                        {area.vsRegion > 0 ? "+" : ""}
                        {area.vsRegion.toFixed(1)}%
                      </td>
                      <td className="py-2.5 text-xs">
                        {area.types.map((type, i) => (
                          <span key={type.type}>
                            {i > 0 && <span className="text-warm-300"> · </span>}
                            <Link href={type.href} className="text-teal-700 hover:text-teal-900">
                              {type.label}
                            </Link>
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-warm-600 leading-relaxed mt-5 text-sm">
              Metro Vancouver&apos;s composite benchmark is{" "}
              {formatPrice(REGION_BENCHMARKS.composite.price)},{" "}
              {REGION_BENCHMARKS.composite.yoy.toFixed(1)}% year over year.
            </p>
          </section>

          <section aria-labelledby="ranking-questions" className="mb-12">
            <h2
              id="ranking-questions"
              className="font-serif text-xl md:text-2xl text-teal-900 mb-6 border-b border-warm-200 pb-2"
            >
              Questions people ask
            </h2>
            <div className="space-y-6">
              {ranking.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-serif text-lg text-teal-900 mb-2">{faq.q}</h3>
                  <p className="text-warm-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="ranking-cta"
            className="rounded-2xl bg-teal-950 p-7 md:p-8"
          >
            <h2 id="ranking-cta" className="font-serif text-xl md:text-2xl text-white/90 mb-3">
              Which of these is right for you?
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              A ranking tells you where prices moved. It cannot tell you which
              area suits how you live, what you can borrow, or which street
              within it to buy on. That part is a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact" variant="secondary">
                Talk it through
              </Button>
              <Button href="/neighborhoods" variant="outline">
                Browse the guides
              </Button>
            </div>
          </section>

          <p className="text-[11px] leading-relaxed text-warm-400 mt-8">
            {BRAND.name}, {BRAND.jobTitle} licensed in British Columbia,{" "}
            {NAP_ONE_LINE}. {NAP.telephone}. Benchmark figures are Greater
            Vancouver REALTORS® MLS® Home Price Index values and are not an
            appraisal of any specific property. MLS® and REALTOR® are trademarks
            owned by the Canadian Real Estate Association.
          </p>
        </div>
      </section>
    </>
  );
}
