import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "West Point Grey Vancouver | Beach & Luxury Homes Guide 2026",
  description:
    "Your quick guide to West Point Grey, Vancouver. Spanish Banks, Jericho Beach, luxury homes, proximity to UBC, top schools, transit, and what makes this neighbourhood one of Vancouver's most coveted residential addresses.",
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
            West Point Grey is old Vancouver in the best possible sense. The
            streets are quiet, the lots are generous, and the homes range from
            lovingly maintained 1930s craftsman bungalows to ambitious
            contemporary builds. There are no towers, no chain restaurants, no
            rush. Kids grow up sailing at the Jericho Sailing Centre and cycling
            the waterfront path to Kits. Three spectacular beaches line the
            northern edge: Spanish Banks, Locarno, and Jericho.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The 10th Avenue corridor has a small cluster of shops and cafes, but
            people chose this neighbourhood for the land, the light, and the
            proximity to UBC and Pacific Spirit Park. Lord Byng Secondary is one
            of the top public high schools in BC. The Folk Music Festival at
            Jericho Beach Park every July draws a crowd that is half
            neighbourhood locals. UBC professors, established families, and
            executives who could live anywhere make up the community. This is a
            neighbourhood of lifers who found exactly what they wanted and
            stopped searching.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;When clients ask where Vancouver&apos;s best families settle
              for good, West Point Grey is always in my first three.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            This is a detached-home neighbourhood. The composite benchmark is
            around <strong>$2.3M</strong>, though the few condos and townhomes
            pull that figure down. Single-family homes run{" "}
            <strong>$2.5M to $6M+</strong> depending on lot size, condition, and
            ocean views. A character Tudor on a 50-foot lot off West 8th might
            come in around $3M. A contemporary rebuild on a double lot with water
            views reaches $5M to $6M. Limited condos near 10th and Alma run{" "}
            <strong>$600K to $1.3M</strong>, appealing to downsizers and UBC
            faculty. Townhomes are scarce at <strong>$1.2M to $2M</strong> and
            extremely sought after. Turnover is low, inventory is always tight,
            and well-priced homes sell quickly.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            UBC is five minutes west through Pacific Spirit Park. Downtown is 20
            to 25 minutes by car, with bus routes along West 4th, West 10th, and
            West Broadway connecting to the broader transit network. The
            waterfront cycling path links seamlessly to Kits, the Burrard
            Bridge, and Stanley Park. Most families have two cars but use them
            less than they expected. Once you settle into the beach-and-park
            rhythm, the need to go anywhere else fades.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> West Point Grey delivers space,
              beauty, and permanence, with three of Vancouver&apos;s best
              beaches, UBC and Pacific Spirit Park as your backyard, and top
              schools. If you want a home your family will keep for 30 years,
              start here.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$2.3M</p>
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
    </>
  );
}
