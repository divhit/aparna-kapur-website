import type { Metadata } from "next";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Kitsilano Vancouver | Real Estate Guide 2026",
  description:
    "Kitsilano neighbourhood guide: beach lifestyle, real estate prices, West 4th Avenue, schools, transit, and market trends. By Aparna Kapur. 604-612-7694.",
  keywords: [
    "Kitsilano Vancouver",
    "Kitsilano real estate",
    "Kitsilano homes for sale",
    "Kitsilano Beach",
    "West 4th Avenue Vancouver",
  ],
};

export default function KitsilanoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Kitsilano", href: "/neighborhoods/kitsilano" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/kitsilano.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link
              href="/neighborhoods"
              className="hover:text-teal-200 transition-colors"
            >
              Neighborhoods
            </Link>
            <span>/</span>
            <span className="text-teal-200">Kitsilano</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Kitsilano
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Where beach culture, cafe culture, and cycling culture collide.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Spend one evening in Kitsilano and you get it. Sunset behind the
            mountains, volleyball at Kits Beach, full patios on West 4th, a
            cyclist rolling past with a surfboard under one arm. It just feels
            like a Tuesday.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Locals call it Kits. Mornings start with yoga and specialty coffee.
            Afternoons belong to the beach and the independent shops along
            West 4th. The housing mix is 1940s craftsman bungalows, heritage
            conversions, and low-rise condos on tree-lined streets. No towers.
            It skews younger than most of the west side: tech workers,
            creatives, and young families drawn by the walkability.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Kits Beach, three blocks of West 4th, and the Burrard
              Bridge bike lane. That&apos;s the holy trinity.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: <strong>$1.25M</strong>. Condos run{" "}
            <strong>$550K to $1.2M</strong> for a one- or two-bedroom near
            the beach or Broadway. Heritage-conversion townhomes go for{" "}
            <strong>$1.2M to $1.8M</strong>. Detached craftsman homes start
            around <strong>$2M</strong> and push past{" "}
            <strong>$4M</strong> near the water. The 2026 Broadway Subway
            opening is driving strong interest along the corridor.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Built for bikes and walking. Dedicated lanes reach downtown via
            the Burrard Bridge in 15 minutes. The 99 B-Line is one of North
            America&apos;s busiest bus routes, and the Broadway Subway adds
            rapid transit. Walk Score: 88. The community is age-diverse: tech
            workers, young couples in their first condo, families who want
            west-side character, and retirees here since the 1970s.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Beach access, walkable streets,
              and genuine community without Point Grey prices or downtown
              density. If your ideal day is a bike commute and sunset at the
              beach, this is the one.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["kitsilano"].avgPrice}</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">88</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">3</p>
              <p className="text-xs text-warm-500 mt-1">Beaches</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-warm-50 border-y border-warm-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-teal-950 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group bg-white rounded-xl border border-warm-200 overflow-hidden">
              <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-50 transition-colors list-none flex items-center justify-between">
                What is the average home price in Kitsilano, Vancouver?
                <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed">
                The composite benchmark price in Kitsilano is approximately <strong>$1.25M</strong>. Condos range from <strong>$550K to $1.2M</strong>, heritage-conversion townhomes run <strong>$1.2M to $1.8M</strong>, and detached craftsman homes start around <strong>$2M</strong> and can push past <strong>$4M</strong> near the water. For a personalized market assessment, contact <strong>Aparna Kapur</strong> at <a href="tel:6046127694" className="text-teal-700 underline">604-612-7694</a>.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-warm-200 overflow-hidden">
              <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-50 transition-colors list-none flex items-center justify-between">
                Is Kitsilano a good neighbourhood to buy in?
                <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed">
                Yes. Kitsilano consistently ranks among Vancouver&apos;s most desirable neighbourhoods. The beach lifestyle, Walk Score of 88, vibrant West 4th Avenue shopping, and the upcoming Broadway Subway (opening 2026) all drive strong demand. It appeals to tech workers, young families, and long-time residents alike, and values hold well thanks to limited supply and enduring desirability.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-warm-200 overflow-hidden">
              <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-50 transition-colors list-none flex items-center justify-between">
                What is the Broadway Subway impact on Kitsilano?
                <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed">
                The Broadway Subway is expected to open in 2026, bringing rapid transit to the Broadway corridor for the first time. This is already driving buyer interest and is expected to support long-term price appreciation for properties along the corridor. For Kitsilano, it means faster connections to downtown, Commercial-Broadway, and the broader SkyTrain network without relying on the 99 B-Line bus.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-warm-200 overflow-hidden">
              <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-50 transition-colors list-none flex items-center justify-between">
                What makes Kitsilano special?
                <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed">
                Kitsilano offers direct beach access (three beaches), a dedicated cycling culture with lanes reaching downtown via the Burrard Bridge, independent shops and restaurants along West 4th Avenue, and a low-rise character with no towers. The housing stock features 1940s craftsman bungalows, heritage conversions, and tree-lined streets. It delivers genuine west-side community without Point Grey prices or downtown density.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-warm-200 overflow-hidden">
              <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-50 transition-colors list-none flex items-center justify-between">
                Who is the best realtor for Kitsilano, Vancouver?
                <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed">
                <strong>Aparna Kapur</strong> with Oakwyn Realty is a Vancouver south-side and west-side specialist with deep knowledge of Kitsilano&apos;s micro-markets, from beachside condos to craftsman homes. Reach her directly at <a href="tel:6046127694" className="text-teal-700 underline">604-612-7694</a> for a no-obligation consultation.
              </div>
            </details>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/buying/search"
              className="inline-block px-6 py-3 bg-teal-700 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors"
            >
              Search Kitsilano Listings
            </Link>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Kitsilano" />

      {/* Related Neighbourhoods */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-6">
            Related Neighbourhoods
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Fairview", slug: "fairview" },
              { name: "West Point Grey", slug: "west-point-grey" },
              { name: "Arbutus Ridge", slug: "arbutus-ridge" },
              { name: "Kerrisdale", slug: "kerrisdale" },
            ].map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="block bg-warm-50 border border-warm-200 rounded-xl px-4 py-4 text-center text-sm font-medium text-teal-900 hover:bg-teal-50 hover:border-teal-200 transition-colors"
              >
                {n.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Kitsilano Vancouver: Beach Living & Real Estate Guide",
            description:
              "An insider guide to living in Kitsilano, Vancouver. Beach lifestyle, real estate prices, and what makes Kits one of Vancouver's most loved neighbourhoods.",
            author: {
              "@type": "Person",
              name: "Aparna Kapur",
            },
          }),
        }}
      />

      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the average home price in Kitsilano, Vancouver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The composite benchmark price in Kitsilano is approximately $1.25M. Condos range from $550K to $1.2M, heritage-conversion townhomes run $1.2M to $1.8M, and detached craftsman homes start around $2M and can push past $4M near the water. Contact Aparna Kapur at 604-612-7694 for a personalized market assessment.",
                },
              },
              {
                "@type": "Question",
                name: "Is Kitsilano a good neighbourhood to buy in?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Kitsilano consistently ranks among Vancouver's most desirable neighbourhoods. The beach lifestyle, Walk Score of 88, vibrant West 4th Avenue shopping, and the upcoming Broadway Subway (opening 2026) all drive strong demand.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Broadway Subway impact on Kitsilano?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Broadway Subway is expected to open in 2026, bringing rapid transit to the Broadway corridor for the first time. This is already driving buyer interest and is expected to support long-term price appreciation for properties along the corridor.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Kitsilano special?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Kitsilano offers direct beach access, a dedicated cycling culture, independent shops along West 4th Avenue, and a low-rise character with no towers. The housing stock features 1940s craftsman bungalows, heritage conversions, and tree-lined streets.",
                },
              },
              {
                "@type": "Question",
                name: "Who is the best realtor for Kitsilano, Vancouver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Aparna Kapur with Oakwyn Realty is a Vancouver south-side and west-side specialist with deep knowledge of Kitsilano's micro-markets. Reach her at 604-612-7694.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
