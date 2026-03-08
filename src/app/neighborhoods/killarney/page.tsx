import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Killarney Vancouver | Community Centre & Real Estate Guide 2026",
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
            Killarney Community Centre is the anchor of this neighbourhood.
            Pool, ice rink, gym, fitness centre, and wall-to-wall programming
            for toddlers through seniors. It is widely considered one of the
            best recreation facilities in the city, and it turns a quiet
            southeast corner of Vancouver into a place with a genuine pulse.
            Morning swim, after-school hockey, Saturday yoga. That kind of
            anchor changes a neighbourhood.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The streets are wide and residential with mature trees and generous
            lots, mostly 1960s and &apos;70s homes that have been maintained,
            renovated, or rebuilt over the decades. Chinese, South Asian,
            Filipino, and Vietnamese families have been here for generations,
            and the food along the Kingsway corridor reflects it: pho, dim sum,
            curries, Filipino bakeries, all priced for regulars. Killarney
            Secondary is one of Vancouver&apos;s largest high schools with over
            1,800 students from more than 60 cultural backgrounds and a
            renowned performing arts program. Everett Crowley Park, shared with
            neighbouring Victoria-Fraserview, adds 40 hectares of trails and
            panoramic views. T&T Supermarket, Champlain Square, and Metrotown
            just across the Burnaby boundary handle everything else.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;The community centre, the school, the Kingsway food scene,
              and the benchmark says $1.1M.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            At a composite benchmark of around <strong>$1.1M</strong>,
            Killarney is one of Vancouver&apos;s strongest value propositions.
            Condos range from <strong>$450K to $750K</strong>, mostly newer
            builds along the main corridors offering a genuine entry point into
            a neighbourhood with top-tier amenities. Townhomes run{" "}
            <strong>$800K to $1.1M</strong>, attracting young families who want
            more space than a condo but are not ready for a full house.
            Detached homes sit in the <strong>$1.3M to $1.8M</strong> range on
            proper lots with serious laneway house potential. Active
            densification along Kingsway means more amenities and housing
            options are coming.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The walk score of 78 reflects a neighbourhood where daily errands,
            groceries, school drop-off, and the community centre are all doable
            on foot. Joyce-Collingwood SkyTrain is the closest Expo Line
            station, reachable by bus or a short drive. Kingsway provides
            frequent bus service, and Metrotown&apos;s transit connections are
            just across the Burnaby boundary. The community is families:
            Chinese, South Asian, Filipino, and Vietnamese households who have
            been here long enough to see the neighbourhood evolve, young
            couples who did the math and chose a Killarney townhome over a
            west-side condo, and retirees who walk to the community centre
            every morning and know everyone by name.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Killarney is the neighbourhood for
              value-conscious families who want community amenities, a great
              school, generous lots, and a benchmark price that still starts
              with a one. The community centre alone would be worth a premium,
              and the fact that everything else comes at $1.1M makes this one
              of the smartest buys in the city.
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
