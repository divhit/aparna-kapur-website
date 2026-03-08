import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Grandview-Woodland Homes for Sale | 2026",
  description:
    "Your quick guide to Grandview-Woodland, Vancouver. Commercial Drive culture, Italian heritage, real estate prices, transit, and what makes The Drive one of Vancouver's most beloved streets.",
  keywords: [
    "Grandview-Woodland Vancouver",
    "Grandview-Woodland real estate",
    "Commercial Drive Vancouver",
    "Grandview-Woodland homes for sale",
    "East Vancouver real estate",
  ],
};

export default function GrandviewWoodlandPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Grandview-Woodland", href: "/neighborhoods/grandview-woodland" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/grandview-woodland.png')",
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
            <span className="text-teal-200">Grandview-Woodland</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Grandview-Woodland
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            The Drive, the soul of east Van. Fiercely independent since
            forever.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Commercial Drive has zero chain stores. Italian cafes from the
            1950s share the sidewalk with independent bookstores and
            Ethiopian restaurants with no sign but a line down the block.
            Italian Day on The Drive draws 300,000 people. Waves of
            newcomers (Italian, Portuguese, Central American, Ethiopian,
            Vietnamese) have layered a cultural history that makes the food
            scene extraordinary.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Behind The Drive, residential streets are lined with craftsman
            bungalows, Vancouver Specials, and Edwardian homes with mature
            gardens. Britannia Community Centre (pool, ice rink, library,
            secondary school) is the neighbourhood&apos;s beating heart. The
            Cultch and Rio Theatre host live performance and indie film.
            Commercial-Broadway, the region&apos;s busiest SkyTrain interchange,
            connects the Expo and Millennium Lines. Downtown is ten minutes
            by train. Walk Score: 90.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Two hundred independent businesses and counting. The
              Drive proves you do not need chains or polish to build
              something people love.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: around <strong>$1.1M</strong>, skewing
            toward detached homes. Character homes and Edwardians range
            from <strong>$1.3M to $1.8M</strong>. Properties near The Drive
            command premiums; those farther east toward Woodland offer more
            space for the money. Condos near SkyTrain run{" "}
            <strong>$500K to $850K</strong>, popular with first-time buyers.
            Townhomes along Broadway go for{" "}
            <strong>$900K to $1.3M</strong>.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Italian families who built the neighbourhood and never left.
            Artists and musicians who need affordable space. Young families
            drawn to Grandview Elementary and Britannia. Newcomers who find
            The Drive&apos;s diversity a reflection of their own experience.
            Cycling infrastructure connects to the Central Valley Greenway
            and downtown, and most residents use transit as their primary
            mode.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Character over polish. Two
              SkyTrain lines, some of the best heritage homes in east
              Vancouver, and a cultural richness that is impossible to
              replicate.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.1M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">90</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">2</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Lines</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Grandview-Woodland" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Grandview-Woodland Vancouver: Commercial Drive & Real Estate Guide",
            description:
              "An insider guide to living in Grandview-Woodland, Vancouver. Commercial Drive culture, Italian heritage, and what makes The Drive one of Vancouver's most beloved streets.",
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
