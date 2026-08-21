import type { Metadata } from "next";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fairview Vancouver | Real Estate Guide",
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
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Fairview", href: "/neighborhoods/fairview" },
        ]}
      />
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
            Fairview never trends, but experienced Vancouverites keep choosing
            it. South Granville delivers gallery row, boutique fashion, and
            long-standing restaurants. Cambie Village adds neighbourhood
            grocers, bakeries, and real coffee shops. Granville Island is at
            your doorstep.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Broadway Plan is the big story: thousands of new homes, the
            subway extension, mixed-use buildings rising. One block south of
            Broadway, it is a different world of tree-lined streets, heritage
            homes, and quiet evenings. VGH professionals, couples outgrowing
            Yaletown, west-side downsizers, and families drawn to Emily Carr
            Elementary and L&apos;Ecole Bilingue all end up here.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Two SkyTrain lines, Granville Island, the seawall, VGH
              walking distance. Once you&apos;re here, why would you
              leave?&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: <strong>$900K</strong>, remarkably reasonable
            for city-centre living with two SkyTrain lines. Condos dominate
            at <strong>$550K to $1.2M</strong> depending on age, size, and
            proximity to the water. Transit-oriented townhomes run{" "}
            <strong>$1.1M to $1.8M</strong>. Heritage homes south of
            Broadway start around <strong>$1.5M</strong> and push past{" "}
            <strong>$3M</strong> for well-preserved ones with views.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Canada Line (Broadway-City Hall, Olympic Village) plus the
            new Broadway Subway make Fairview one of Metro Vancouver&apos;s
            best-connected neighbourhoods. The False Creek seawall handles
            cycling and jogging. Walk Score: 95. If you want to go from two
            cars to one, or ditch the car entirely, this is where that works.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Vancouver&apos;s most connected
              address without downtown prices. The Broadway Plan is
              transforming the corridor, but the foundations (two SkyTrain
              lines, Granville Island, the seawall, South Granville) are
              already solid.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["fairview"].avgPrice}</p>
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
