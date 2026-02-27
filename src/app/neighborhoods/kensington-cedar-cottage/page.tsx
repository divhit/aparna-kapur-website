import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "Kensington-Cedar Cottage Vancouver | Trout Lake & Real Estate Guide 2026",
  description:
    "Your quick guide to Kensington-Cedar Cottage, Vancouver. Trout Lake, Kingsway dining, real estate prices, schools, and what makes KCC one of east Vancouver's best family neighbourhoods.",
  keywords: [
    "Kensington-Cedar Cottage Vancouver",
    "Kensington-Cedar Cottage real estate",
    "Trout Lake Vancouver",
    "Kingsway Vancouver restaurants",
    "East Vancouver family homes",
  ],
};

export default function KensingtonCedarCottagePage() {
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
            <span className="text-teal-200">Kensington-Cedar Cottage</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Kensington-Cedar Cottage
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Trout Lake, Kingsway eats, and real backyards. East Van
            family life done right.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            KCC is one of Vancouver&apos;s largest and most diverse
            neighbourhoods, and Trout Lake is its anchor. Summer Saturdays
            bring kids splashing at the beach, the farmers&apos; market in
            full swing, and pickup softball on the diamond. Chinese,
            Vietnamese, Filipino, South Asian, and Latin American communities
            have all shaped the area&apos;s character, cuisine, and
            commercial life over decades. The Kingsway food corridor is the
            result: Vietnamese pho houses next to dim sum parlours next to
            Korean barbecue, all authentic, all packed.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The lots here are genuinely big, with room for garden suites,
            laneway houses, and the kind of backyard gardens where neighbours
            trade zucchini over the fence. Fruit trees are a neighbourhood
            signature: plum, cherry, apple, fig. The Trout Lake
            Farmers&apos; Market runs May through October and has become one
            of the city&apos;s most beloved weekend rituals. Joyce-Collingwood
            Station on the Expo Line anchors the eastern edge, getting you
            downtown in about 20 minutes. The Kingsway corridor has frequent
            bus service, and cycling connections to the central valley
            greenway continue to improve. Walk Score: 80.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;A real backyard, a natural lake, the best cheap eats in
              the city, and neighbours who bring you fruit from their trees.
              Try getting that on the west side.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            The composite benchmark is around <strong>$1.15M</strong>,
            and what you get for that is significantly more space per dollar
            than almost anywhere else in the city. Detached homes are the
            backbone, ranging from <strong>$1.2M to $1.6M</strong> with
            generous lot sizes that often include laneway house potential.
            That laneway income can meaningfully offset a mortgage. Condos
            are a growing segment near Kingsway and Joyce-Collingwood
            Station at <strong>$450K to $700K</strong>. Townhomes in the{" "}
            <strong>$800K to $1.2M</strong> range are popular with young
            families who want more space than a condo but are not quite
            ready for a detached home.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Families are the core. Multi-generational households with
            grandparents, parents, and kids under one roof, the lot sizes
            actually allow for that. Young couples buying their first home
            who want a backyard and a garden. Food lovers who consider
            Kingsway dining a non-negotiable lifestyle amenity. Long-time
            residents from the Chinese, Vietnamese, and Filipino communities
            who have built their lives here for decades. KCC delivers
            substance, space, and a sense of belonging.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> KCC delivers a real house with a
              real yard in a real community, all within city limits. For
              families and anyone who values space and authenticity over
              proximity to downtown, it offers more per dollar than anywhere
              else in Vancouver.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.15M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">80</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">Trout Lake</p>
              <p className="text-xs text-warm-500 mt-1">John Hendry Park</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Kensington-Cedar Cottage" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Kensington-Cedar Cottage Vancouver: Trout Lake & Real Estate Guide",
            description:
              "An insider guide to living in Kensington-Cedar Cottage, Vancouver. Trout Lake, Kingsway dining, and what makes KCC one of east Vancouver's best family neighbourhoods.",
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
