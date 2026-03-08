import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Arbutus Ridge Homes for Sale | Vancouver",
  description:
    "Your quick guide to Arbutus Ridge, Vancouver. The Arbutus Greenway, heritage homes, Quilchena Park, top schools, and what makes this quiet west-side neighbourhood a hidden gem between Kerrisdale and Shaughnessy.",
  keywords: [
    "Arbutus Ridge Vancouver",
    "Arbutus Ridge real estate",
    "Arbutus Ridge homes for sale",
    "Arbutus Greenway",
    "Arbutus Village shopping",
  ],
};

export default function ArbutusRidgePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Arbutus Ridge", href: "/neighborhoods/arbutus-ridge" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/arbutus-ridge.png')",
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
            <span className="text-teal-200">Arbutus Ridge</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Arbutus Ridge
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            The quiet achiever of Vancouver&apos;s west side. Big lots, the Greenway at your door, and none of the fuss.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Between the prestige of Shaughnessy and the village charm of
            Kerrisdale, Arbutus Ridge offers estate-sized lots, a 9 km
            car-free greenway, and Prince of Wales Secondary in its catchment.
            Lots are among the west side&apos;s largest, with deep setbacks,
            mature gardens, and towering maples and chestnuts. The homes mix
            mid-century estates, heritage places with original millwork, and
            contemporary rebuilds. You hear birdsong more than traffic.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Arbutus Greenway runs through the heart of the neighbourhood:
            nine kilometres of car-free pathway on a former rail corridor
            connecting Kitsilano to the Fraser River, lined with community
            gardens and public art. It gave the area a central spine and
            lifted property values. The community: long-time families, younger
            buyers drawn by Prince of Wales catchment, empty nesters in
            townhomes near the village, and remote workers who use the Greenway
            for midday breaks.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Shaughnessy-sized lots and Prince of Wales catchment at a
              price that actually makes sense.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: around <strong>$2.2M</strong>, more
            accessible than Shaughnessy while offering comparable lot sizes.
            Detached homes range from <strong>$2.5M to $4.5M+</strong>,
            from original 1950s ranchers to full custom rebuilds with coach
            houses. The sweet spot: a well-updated heritage home around $3M.
            Townhomes near Arbutus Village run{" "}
            <strong>$1.2M to $1.8M</strong>. Condos (limited, mostly low-
            and mid-rise near the village) start around{" "}
            <strong>$600K to $1.2M</strong>. Walk score: 93.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Greenway makes cycling and walking genuinely practical. Ride
            to Kits, Granville Island, or the Fraser River without touching a
            road. Bus routes on Arbutus and Broadway connect to the broader
            transit network, and the Broadway Subway will add rapid transit
            nearby. Downtown is 20 minutes by car. Arbutus Village covers
            groceries, pharmacy, and dining; Kerrisdale Village and South
            Granville are walkable from most streets.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> The best of the west side without
              overpaying for a name. Estate-sized lots, the Greenway at your
              doorstep, Prince of Wales catchment, and walkable access to three
              village centres.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$2.2M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">93</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">9 km</p>
              <p className="text-xs text-warm-500 mt-1">Arbutus Greenway</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Arbutus Ridge" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Arbutus Ridge Vancouver: Greenway Living & Real Estate Guide",
            description:
              "An insider guide to living in Arbutus Ridge, Vancouver. The Arbutus Greenway, heritage homes, top schools, and what makes this quiet west-side neighbourhood a hidden gem.",
            author: {
              "@type": "Person",
              name: "Aparna Kapur",
            },
          }),
        }}
      />
    </>
  );
}
