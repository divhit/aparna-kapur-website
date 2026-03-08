import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Killarney Homes for Sale | Vancouver 2026",
  description:
    "Your quick guide to Killarney, Vancouver. Award-winning community centre, Everett Crowley Park, family-friendly real estate, multicultural dining, and southeast Vancouver's best neighbourhood for value-conscious buyers.",
  keywords: [
    "Killarney Vancouver",
    "Killarney real estate",
    "Killarney homes for sale",
    "Killarney Community Centre",
    "Killarney Secondary Vancouver",
  ],
};

export default function KillarneyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Killarney", href: "/neighborhoods/killarney" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/killarney.png')",
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
            <span className="text-teal-200">Killarney</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Killarney
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Vancouver&apos;s best community centre, a performing arts school,
            and genuine value in a city that doesn&apos;t have much left.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Killarney Community Centre anchors this neighbourhood: pool, ice
            rink, gym, and wall-to-wall programming for toddlers through
            seniors. Widely considered one of the city&apos;s best recreation
            facilities. Morning swim, after-school hockey, Saturday yoga.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Wide streets, mature trees, generous lots, mostly 1960s and
            &apos;70s homes maintained, renovated, or rebuilt over the decades.
            Chinese, South Asian, Filipino, and Vietnamese families have been
            here for generations, and the Kingsway food corridor reflects it:
            pho, dim sum, curries, Filipino bakeries, all priced for regulars.
            Killarney Secondary has 1,800+ students from 60+ cultural
            backgrounds and a renowned performing arts program. Everett Crowley
            Park adds 40 hectares of trails and panoramic views. T&T
            Supermarket, Champlain Square, and Metrotown (just across the
            Burnaby boundary) handle everything else.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;The community centre, the school, the Kingsway food scene,
              and the benchmark says $1.1M.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: around <strong>$1.1M</strong>, one of
            Vancouver&apos;s strongest value plays. Condos at{" "}
            <strong>$450K to $750K</strong> (mostly newer builds) offer a real
            entry point into top-tier amenities. Townhomes run{" "}
            <strong>$800K to $1.1M</strong> for families wanting more space.
            Detached homes sit at <strong>$1.3M to $1.8M</strong> on proper
            lots with laneway house potential. Densification along Kingsway is
            bringing more amenities and housing options.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Walk score: 78. Daily errands, groceries, school, and the
            community centre are all doable on foot. Joyce-Collingwood
            SkyTrain is reachable by bus or a short drive. Kingsway has
            frequent bus service, and Metrotown&apos;s transit hub is just
            across the Burnaby boundary. The community: long-time Chinese,
            South Asian, Filipino, and Vietnamese families, young couples
            who chose a Killarney townhome over a west-side condo, and
            retirees who walk to the community centre every morning.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Community amenities, a great school,
              generous lots, and a benchmark that still starts with a one. The
              community centre alone would justify a premium. At $1.1M, this is
              one of the smartest buys in the city.
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
              <p className="font-serif text-2xl text-teal-700">78</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">1,800+</p>
              <p className="text-xs text-warm-500 mt-1">Students at Killarney</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Killarney" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Killarney Vancouver: Community Centre & Real Estate Guide",
            description:
              "An insider guide to living in Killarney, Vancouver. Award-winning community centre, Killarney Secondary, multicultural dining, and southeast Vancouver's best neighbourhood for value-conscious buyers.",
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
