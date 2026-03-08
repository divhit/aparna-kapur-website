import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dunbar-Southlands Homes for Sale | 2026",
  description:
    "Your quick guide to Dunbar-Southlands, Vancouver. Family homes, Pacific Spirit Park, Dunbar Village shopping, top schools, equestrian Southlands, and what makes this neighbourhood Vancouver's best-kept family secret.",
  keywords: [
    "Dunbar-Southlands Vancouver",
    "Dunbar real estate",
    "Dunbar homes for sale",
    "Dunbar Village",
    "Pacific Spirit Park homes",
  ],
};

export default function DunbarSouthlandsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Dunbar-Southlands", href: "/neighborhoods/dunbar-southlands" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/dunbar-southlands.png')",
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
            <span className="text-teal-200">Dunbar-Southlands</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Dunbar-Southlands
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Village charm, forest trails, and horse paddocks. Vancouver&apos;s best-kept family neighbourhood.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Two neighbourhoods in one. The northern half centres on Dunbar
            Village: independent shops, bakeries, and 32 Books on a charming
            high street. Wide streets, generous lots, tree canopies, and kids
            biking to the village after school. South of SW Marine Drive,
            Southlands turns rural: acreage properties, horse stables, paddock
            fences, and the Fraser River.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Lord Byng Secondary is one of BC&apos;s top public high schools
            and a genuine price driver in this catchment. Pacific Spirit
            Park&apos;s 73 kilometres of trails are accessible on foot from
            most streets. Families dominate: couples outgrowing their Kits
            condo, UBC faculty wanting a 10-minute forest commute, and parents
            who grew up here and came back. In Southlands, equestrian families
            have held their land for decades.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Top schools, a real village high street, and space to
              breathe, without the Shaughnessy price tag.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: <strong>$2.5M</strong>. Typical Dunbar homes
            are character houses or modern rebuilds on 33-by-122-foot lots,
            priced from <strong>$2.5M to $5M+</strong>. Southlands equestrian
            properties push well beyond that. Townhomes near the village
            run <strong>$1.3M to $2M</strong>, popular with families wanting
            the catchment without a detached price tag. A handful of condos
            start around <strong>$700K to $1.2M</strong>. Updated heritage
            homes with modern kitchens and original charm sell fastest.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            UBC is 10 minutes through Pacific Spirit Park. Downtown is 25 to
            30 minutes. Buses run direct to campus and connect to Broadway for
            SkyTrain. The village itself is extremely walkable: groceries,
            coffee, the library, and kids&apos; activities without touching
            your car.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Vancouver&apos;s best family
              neighbourhood. Genuine village, excellent schools, Pacific Spirit
              Park at your door, and a community that actually looks out for
              each other.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$2.5M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">10 min</p>
              <p className="text-xs text-warm-500 mt-1">To UBC</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">763 ha</p>
              <p className="text-xs text-warm-500 mt-1">Pacific Spirit Park</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Dunbar-Southlands" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Dunbar-Southlands Vancouver: Family Homes & Village Living Guide",
            description:
              "An insider guide to living in Dunbar-Southlands, Vancouver. Family homes, Dunbar Village, Pacific Spirit Park, equestrian Southlands, and what makes this Vancouver's best-kept family secret.",
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
