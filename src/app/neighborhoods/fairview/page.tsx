import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "Fairview Vancouver | Broadway Corridor & Real Estate Guide 2026",
  description:
    "Your quick guide to Fairview, Vancouver. Broadway Plan development, South Granville shopping, Granville Island, transit, and what makes Fairview one of Vancouver's best-connected neighbourhoods.",
  keywords: [
    "Fairview Vancouver",
    "Fairview real estate",
    "Fairview condos for sale",
    "Broadway Plan Vancouver",
    "South Granville Vancouver",
  ],
};

export default function FairviewPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
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
            <span className="text-teal-200">Fairview</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Fairview
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Vancouver&apos;s quiet achiever. Best location, least ego.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Fairview is the most under-appreciated neighbourhood in Vancouver.
            It never trends, but when clients who have lived all over the city
            name where they would actually settle, Fairview comes up more
            than you would expect. South Granville gives it polish with
            gallery row, boutique fashion, and restaurants that have been
            around for decades. Cambie Village keeps it grounded with
            neighbourhood grocers, bakeries, and real coffee shops. Granville
            Island is at your doorstep.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Broadway Plan is the big story. Thousands of new homes along
            the corridor, the subway extension opening, a new generation of
            mixed-use buildings rising. But step one block south of Broadway
            and it is a different world: tree-lined residential streets,
            well-kept heritage homes, quiet evenings. That duality is what
            makes Fairview work. Professionals at VGH and the Broadway
            medical corridor, couples who have outgrown Yaletown, downsizers
            from the west side, and families drawn to Emily Carr Elementary
            and L&apos;Ecole Bilingue all end up here.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Two SkyTrain lines, Granville Island, the seawall, VGH
              walking distance. Once you&apos;re here, why would you
              leave?&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            The composite benchmark hovers around <strong>$900K</strong>,
            remarkably reasonable for the centre of the city with two
            SkyTrain lines at your feet. Condos dominate, ranging from{" "}
            <strong>$550K to $1.2M</strong> depending on age, size, and
            proximity to the water or new subway stations. Townhomes are a
            growing segment, particularly transit-oriented new builds in
            the <strong>$1.1M to $1.8M</strong> range. Heritage homes south
            of Broadway start around <strong>$1.5M</strong> and can push
            past <strong>$3M</strong> for the well-preserved ones with
            views.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Two SkyTrain lines, the Canada Line at Broadway-City Hall and
            Olympic Village plus the new Broadway Subway extension, make
            Fairview one of the best-connected neighbourhoods in Metro
            Vancouver. The False Creek seawall is your cycling and jogging
            route. Walk Score: 95. If you want to own one car instead of
            two, or ditch the car altogether, this is where that becomes
            genuinely practical.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Fairview delivers the most
              connected address in Vancouver without paying downtown prices.
              The Broadway Plan is transforming the corridor, but the bones
              of this neighbourhood, two SkyTrain lines, Granville Island,
              the seawall, South Granville shopping, are already solid.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$900K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">95</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">2</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Lines</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Fairview" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Fairview Vancouver: Broadway Corridor & Real Estate Guide",
            description:
              "An insider guide to living in Fairview, Vancouver. Broadway Plan development, South Granville shopping, Granville Island, and what makes Fairview one of Vancouver's best-connected neighbourhoods.",
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
