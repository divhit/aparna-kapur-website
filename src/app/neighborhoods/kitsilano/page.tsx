import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "Kitsilano Vancouver | Beach Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Kitsilano, Vancouver. Beach lifestyle, real estate prices, West 4th Avenue dining, schools, transit, and what makes Kits one of Vancouver's most loved neighbourhoods.",
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
              <p className="font-serif text-2xl text-teal-700">$1.25M</p>
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

      <NeighbourhoodReportSignup neighbourhood="Kitsilano" />

      {/* JSON-LD */}
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
    </>
  );
}
