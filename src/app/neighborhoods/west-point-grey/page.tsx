import type { Metadata } from "next";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import MarketPriceLinks from "@/components/market/MarketPriceLinks";
import NeighbourhoodListings from "@/components/neighborhoods/NeighbourhoodListings";

/** Listings are live data; regenerate hourly rather than freezing at build. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "West Point Grey | Real Estate Guide",
  description:
    "West Point Grey homes for sale in Vancouver. MLS\u00ae HPI benchmark $2.26M, -7.9% year over year, plus schools, transit, and local detail.",
  keywords: [
    "West Point Grey Vancouver",
    "West Point Grey real estate",
    "West Point Grey homes for sale",
    "Spanish Banks Vancouver",
    "Jericho Beach",
  ],
};

export default function WestPointGreyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "West Point Grey", href: "/neighborhoods/west-point-grey" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
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
            <span className="text-teal-200">West Point Grey</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            West Point Grey
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Three beaches, character homes on deep lots, and the kind of quiet that only old money can buy.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Old Vancouver in the best sense. Quiet streets, generous lots,
            homes ranging from 1930s craftsman bungalows to ambitious
            contemporary builds. No towers, no chains, no rush. Kids sail at
            the Jericho Sailing Centre and cycle the waterfront to Kits. Three
            spectacular beaches line the northern edge: Spanish Banks, Locarno,
            and Jericho.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The 10th Avenue corridor has a small cluster of shops and cafes,
            but people choose this neighbourhood for the land, the light, and
            UBC/Pacific Spirit Park proximity. Lord Byng Secondary is one of
            BC&apos;s top public high schools. The Folk Music Festival at
            Jericho Beach Park every July draws a crowd half composed of
            neighbourhood locals. UBC professors, established families, and
            executives who could live anywhere make up the community.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;When clients ask where Vancouver&apos;s best families settle
              for good, West Point Grey is always in my first three.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Primarily detached homes. Composite benchmark:{" "}
            <strong>$2.3M</strong> (a few condos and townhomes pull the figure
            down). Single-family homes run <strong>$2.5M to $6M+</strong>
            depending on lot size, condition, and ocean views. A character Tudor
            on a 50-foot lot off West 8th might come in around $3M; a
            contemporary rebuild on a double lot with water views reaches $5M
            to $6M. Limited condos near 10th and Alma run{" "}
            <strong>$600K to $1.3M</strong>. Townhomes are scarce at{" "}
            <strong>$1.2M to $2M</strong> and extremely sought after. Turnover
            is low, and well-priced homes sell fast.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            UBC is five minutes west through Pacific Spirit Park. Downtown is
            20 to 25 minutes by car, with buses along West 4th, West 10th, and
            West Broadway. The waterfront cycling path links to Kits, the
            Burrard Bridge, and Stanley Park.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Space, beauty, and permanence.
              Three of Vancouver&apos;s best beaches, UBC and Pacific Spirit
              Park as your backyard, top schools. If you want a home your
              family keeps for 30 years, start here.
            </p>
          </div>
        </div>
      </article>

      <NeighbourhoodListings slug="west-point-grey" />

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["west-point-grey"].avgPrice}</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">3</p>
              <p className="text-xs text-warm-500 mt-1">Beaches</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">5 min</p>
              <p className="text-xs text-warm-500 mt-1">To UBC</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="West Point Grey" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "West Point Grey Vancouver: Beach & Luxury Homes Guide",
            description:
              "An insider guide to living in West Point Grey, Vancouver. Spanish Banks, character homes, top schools, and what makes this one of Vancouver's most coveted residential addresses.",
            author: {
              "@type": "Person",
              name: "Aparna Kapur",
            },
          }),
        }}
      />
      <MarketPriceLinks slug="west-point-grey" />
    </>
  );
}
