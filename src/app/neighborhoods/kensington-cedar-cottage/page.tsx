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
            Locals call it KCC, and once you have spent a summer Saturday at
            Trout Lake, with kids splashing at the beach, the farmers&apos;
            market in full swing, a pickup softball game on the diamond, fruit
            trees heavy in every other backyard, you understand why
            families put down roots here and never leave. Then there is
            Kingsway, where you can eat your way through a dozen cuisines
            without spending more than fifteen dollars a plate. This is the
            neighbourhood that reminds you Vancouver is not all glass towers
            and ocean views. Sometimes the best parts of a city are the places
            where people simply live well.
          </p>

          <p className="text-warm-700 leading-relaxed mb-4">
            KCC is one of Vancouver&apos;s largest neighbourhoods, and it
            shows in the diversity. Chinese, Vietnamese, Filipino, South
            Asian, and Latin American communities have all shaped the
            area&apos;s character, cuisine, and commercial life over decades.
            The Kingsway food corridor is the result: Vietnamese pho
            houses next to Chinese dim sum parlours next to Korean barbecue
            spots, all of them authentic, all of them packed, none of them
            pretending to be something they are not.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            The lots here are bigger than the west side, genuinely big,
            with room for garden suites, laneway houses, and the kind of
            backyard gardens where neighbours trade zucchini over the fence.
            The fruit trees are a neighbourhood signature: plum, cherry, apple,
            fig. Block parties happen because people actually want to spend
            time together, not because a developer organized it. The Trout Lake
            Farmers&apos; Market, running May through October, has become one
            of the city&apos;s most beloved weekend rituals, and the community
            centre hosts multicultural festivals that reflect who actually
            lives here.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;KCC is where you get a real backyard, a natural lake, the
              best cheap eats in the city, and neighbours who bring you fruit
              from their trees. Try getting that on the west side.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-4">
            The composite benchmark in KCC is around{" "}
            <strong>$1.15M</strong>, which sounds like a lot until you
            realize what you get: significantly more space per dollar than
            almost anywhere else in the city. Detached homes are the
            neighbourhood&apos;s backbone, ranging from{" "}
            <strong>$1.2M to $1.6M</strong> with generous lot sizes that
            often include laneway house potential. That laneway income can
            meaningfully offset your mortgage, and I have helped multiple
            families structure their purchase around exactly that math.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Condos are a growing segment, particularly near Kingsway and
            Joyce-Collingwood Station, running from{" "}
            <strong>$450K to $700K</strong>. Transit-oriented development is
            changing the eastern edge of the neighbourhood, with new builds
            offering modern finishes and SkyTrain access. Townhomes in the{" "}
            <strong>$800K to $1.2M</strong> range are popular with young
            families who want more space than a condo but are not quite ready
            for a detached home. Compared to west-side neighbourhoods with
            similar lot sizes, KCC remains one of the most compelling value
            propositions in Vancouver, and the community you get in the
            bargain is something money cannot buy elsewhere.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Joyce-Collingwood Station on the Expo Line anchors the eastern
            edge, getting you downtown in about 20 minutes. The neighbourhood
            is larger than most, so your exact commute depends on where you
            land. The Kingsway corridor has frequent bus service, and the
            cycling network continues to improve with connections to the
            central valley greenway. Walk Score: 80. KCC is more of a
            &ldquo;walk to the lake and the market on weekends, transit to work
            on weekdays&rdquo; kind of place. If you have kids, the
            walkability to Trout Lake, the community centre, and local schools
            makes daily life very manageable without a second car.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Families. Full stop, this is one of the best family neighbourhoods
            in east Vancouver. Multi-generational households with grandparents,
            parents, and kids under one roof. The lot sizes actually
            allow for that. Young couples buying their first home who want a
            backyard and a garden, not just a parking stall. Food lovers who
            consider Kingsway dining a non-negotiable lifestyle amenity.
            Long-time residents from the Chinese, Vietnamese, and Filipino
            communities who have built their lives around this neighbourhood
            for decades. People who value substance, space, and a sense of
            belonging over trendiness.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Kensington-Cedar Cottage is where
              you go when you want a real house with a real yard in a real
              community, all within city limits. Trout Lake is the
              anchor, Kingsway is the kitchen, and the diversity of this
              neighbourhood makes it one of the most interesting places to
              live in Vancouver. For families and anyone who values space and
              authenticity over proximity to downtown, KCC delivers more per
              dollar than anywhere else I know.
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
