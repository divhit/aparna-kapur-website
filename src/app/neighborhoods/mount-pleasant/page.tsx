import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Mount Pleasant Vancouver | Creative Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Mount Pleasant, Vancouver. Craft breweries, Main Street shopping, murals, tech hubs, and what makes Mount Pleasant one of Vancouver's most creative neighbourhoods.",
  keywords: [
    "Mount Pleasant Vancouver",
    "Mount Pleasant real estate",
    "Mount Pleasant condos for sale",
    "Main Street Vancouver",
    "Mount Pleasant breweries",
  ],
};

export default function MountPleasantPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Mount Pleasant", href: "/neighborhoods/mount-pleasant" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/mount-pleasant.jpeg')",
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
            <span className="text-teal-200">Mount Pleasant</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Mount Pleasant
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Breweries, murals, and Main Street. Vancouver&apos;s creative engine.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Mount Pleasant turned abandoned warehouses into Western
            Canada&apos;s best brewery district, covered its buildings in
            world-class street art, and filled Main Street with independents
            that make you forget chains exist. Eight minutes from downtown on
            SkyTrain. Walk Score: 92. Mornings mean serious coffee (49th
            Parallel, Matchstick, JJ Bean&apos;s flagship). By mid-afternoon
            the brewery patios are full.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            South of Broadway: heritage character homes under mature trees.
            North: newer condos, tech offices, and 10-plus taprooms in old
            industrial buildings east of Main. The Vancouver Mural Festival
            has turned entire facades into open-air galleries. The community
            skews toward creatives, tech workers, young professionals, and
            families at Mount Pleasant Elementary.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;If a restaurant, roaster, or brewery opens here first,
              pay attention. Mount Pleasant sets the trends Vancouver
              follows.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: <strong>$850K</strong>, undercutting Kits and
            Fairview with similar walkability and better transit. Condos
            run <strong>$550K to $1M</strong> along the Main and Broadway
            corridors. Townhomes sit at <strong>$1M to $1.5M</strong>. The
            real gems are heritage character homes south of Broadway,
            Edwardian and craftsman houses at{" "}
            <strong>$1.2M to $2.5M+</strong>. Two SkyTrain stations plus the
            Broadway Subway expansion should keep appreciation ahead of the
            broader east side.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Broadway-City Hall (Canada Line) and Main Street-Science World
            (Expo/Millennium Lines) bracket the neighbourhood. Downtown: eight
            minutes. Cycling lanes run on Ontario Street and the off-Broadway
            route. Walk Score: 92. A car is genuinely optional.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Mount Pleasant delivers creative
              energy, walkability, and community at east-side prices. If you
              care about culture as much as square footage, this is your
              neighbourhood.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$850K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">92</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">10+</p>
              <p className="text-xs text-warm-500 mt-1">Breweries</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Mount Pleasant" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Mount Pleasant Vancouver: Creative Living & Real Estate Guide",
            description:
              "An insider guide to living in Mount Pleasant, Vancouver. Craft breweries, Main Street shopping, murals, and what makes Mount Pleasant one of Vancouver's most creative neighbourhoods.",
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
