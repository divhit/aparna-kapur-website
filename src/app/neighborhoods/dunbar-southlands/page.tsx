import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "Dunbar-Southlands Vancouver | Family Homes & Village Living Guide 2026",
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
            Dunbar-Southlands is really two neighbourhoods in one. The northern
            half centres on Dunbar Village, a charming high street of independent
            shops, bakeries, and 32 Books. Streets are wide, lots are generous,
            mature trees form canopies over the sidewalks, and kids still ride
            bikes to the village after school. The southern half, Southlands, is
            something else entirely: cross SW Marine Drive and you enter a world
            of acreage properties, horse stables, and a pastoral calm that feels
            genuinely rural. Paddock fences line the roads, riders use the
            trails, and the Fraser River is right there.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Lord Byng Secondary is one of the top public high schools in BC and a
            genuine price driver in this catchment. Pacific Spirit Park&apos;s 73
            kilometres of trails are accessible on foot from most streets.
            Families dominate the community: couples who outgrew their Kits condo
            and want a yard, UBC faculty who want a 10-minute commute through the
            forest, and parents who grew up in Dunbar and came back to raise
            their own kids here. In Southlands, equestrian families have quietly
            held onto their land for decades.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Top schools, a real village high street, and space to
              breathe, without the Shaughnessy price tag.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            The composite benchmark sits around <strong>$2.5M</strong>. The
            typical Dunbar house is a character home or modern rebuild on a
            standard 33-by-122-foot lot, priced from{" "}
            <strong>$2.5M to $5M+</strong> depending on condition, size, and
            proximity to the village. Southlands equestrian properties on larger
            acreage push well beyond that. Townhomes near Dunbar Village run{" "}
            <strong>$1.3M to $2M</strong> and are sought after by young families
            who want the catchment without stretching for a detached home. A
            handful of low-rise condos near the village start around{" "}
            <strong>$700K to $1.2M</strong>. The homes that sell fastest are
            updated heritage places with modern kitchens and original charm
            intact.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            UBC is a 10-minute drive or bus ride through Pacific Spirit Park.
            Downtown is 25 to 30 minutes depending on traffic. Bus routes run
            direct to campus and connect to Broadway for SkyTrain access. The
            neighbourhood itself is extremely walkable around the village: you
            can handle groceries, coffee, the library, and kids&apos; activities
            without touching your car. Serious cyclists use the park network to
            connect to the waterfront path and beyond.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Dunbar-Southlands is Vancouver&apos;s
              best family neighbourhood. The village is genuine, the schools are
              excellent, Pacific Spirit Park is at your door, and the community
              is the kind that actually looks out for each other.
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
