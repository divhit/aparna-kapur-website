import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "Arbutus Ridge Vancouver | Greenway Living & Real Estate Guide 2026",
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
            Arbutus Ridge sits between the prestige of Shaughnessy and the
            village charm of Kerrisdale, offering estate-sized lots, a
            9-kilometre car-free greenway, and Prince of Wales Secondary in its
            catchment. The lots here are among the largest on the west side, with
            deep setbacks, mature gardens, and towering maples and chestnuts
            lining the streets. The homes are a handsome mix of mid-century
            estates, heritage places with original millwork, and contemporary
            rebuilds. You hear birdsong more than traffic.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Arbutus Greenway runs right through the heart of the
            neighbourhood, nine kilometres of car-free pathway on a former rail
            corridor connecting Kitsilano to the Fraser River. Community gardens
            and public art line the route. It gave the area a central spine and
            lifted property values along the corridor. Long-time families,
            younger buyers drawn by Prince of Wales catchment, empty nesters in
            the newer townhomes near the village, and remote workers who love the
            Greenway for midday breaks make up the community. The common thread
            is people who prefer substance over show.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Shaughnessy-sized lots and Prince of Wales catchment at a
              price that actually makes sense.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            The composite benchmark is around <strong>$2.2M</strong>, more
            accessible than Shaughnessy next door while offering comparable lot
            sizes. Detached homes range from{" "}
            <strong>$2.5M to $4.5M+</strong> on generous lots, from original
            1950s ranchers with untouched potential to full custom rebuilds with
            coach houses. The sweet spot for most families is a well-updated
            heritage home in the $3M range. Townhomes near Arbutus Village run{" "}
            <strong>$1.2M to $1.8M</strong>. Condos are limited, mostly low-
            and mid-rise near the village, starting around{" "}
            <strong>$600K to $1.2M</strong>. Walk score: 93.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Greenway makes cycling and walking genuinely practical. You can
            ride to Kits, Granville Island, or the Fraser River without touching
            a road. Bus routes on Arbutus Street and along Broadway connect to
            the broader transit network, and the Broadway Subway will add rapid
            transit access nearby. Downtown is about 20 minutes by car. Arbutus
            Village covers groceries, pharmacy, dining, and daily needs, and both
            Kerrisdale Village and South Granville are walkable from most
            streets.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Arbutus Ridge gives you the best of
              the west side without overpaying for a name. Estate-sized lots, the
              Greenway at your doorstep, Prince of Wales catchment, and walkable
              access to three distinct village centres.
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
