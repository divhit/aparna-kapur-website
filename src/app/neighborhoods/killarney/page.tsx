import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

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
            I have a theory about Killarney: the community centre is the
            reason people move here, and then everything else about the
            neighbourhood is the reason they stay. Pool, ice rink, gym,
            fitness centre, wall-to-wall programming for toddlers through
            seniors. It is widely considered one of the best recreation
            facilities in the city, and it turns a quiet southeast corner of
            Vancouver into a place with a genuine pulse. I have shown homes
            in Killarney where the family&apos;s entire weekly schedule
            revolves around what&apos;s happening at the rec centre. Morning
            swim, after-school hockey, Saturday yoga. That kind of anchor
            changes a neighbourhood.
          </p>

          <p className="text-warm-700 leading-relaxed mb-4">
            Killarney is a neighbourhood that does not try to be anything
            other than what it is: a solid, multicultural, family-oriented
            community in southeast Vancouver. The streets are wide and
            residential. Mature trees line the blocks. The lots are generous
            by Vancouver standards, mostly 1960s and &apos;70s homes
            that have been maintained, renovated, or rebuilt over the decades.
            You will see Chinese, South Asian, Filipino, and Vietnamese
            families who have been here for generations, and the food along
            the Kingsway corridor reflects that beautifully. Pho,
            dim sum, curries, Filipino bakeries, all priced for regulars,
            not visitors.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Killarney Secondary is one of Vancouver&apos;s largest high
            schools with over 1,800 students from more than 60 cultural
            backgrounds. Its performing arts program is renowned, drawing
            talent from across the city. Kids audition to get in, and
            the productions are genuinely impressive. Everett Crowley Park,
            shared with neighbouring Victoria-Fraserview, adds 40 hectares of
            trails and meadows with panoramic views. And then there is the
            proximity to Metrotown in Burnaby, just minutes across the
            boundary, for the bigger shopping trips. T&T Supermarket and
            Champlain Square handle the day-to-day.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;The community centre, the school, the Kingsway food scene.
              Killarney has the bones of a neighbourhood that costs
              twice as much, and the benchmark says $1.1M.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-4">
            At a composite benchmark of around <strong>$1.1M</strong>,
            Killarney is one of Vancouver&apos;s strongest value propositions,
            and I do not say that lightly. Condos range from{" "}
            <strong>$450K to $750K</strong>, mostly newer builds along the
            main corridors, and they offer a genuine entry point into a
            neighbourhood with top-tier community amenities. Townhomes run{" "}
            <strong>$800K to $1.1M</strong> with a growing supply that is
            attracting young families who want more space than a condo but
            are not ready for a full house.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Detached homes sit in the <strong>$1.3M to $1.8M</strong> range,
            and what you get is substantial: 1960s and &apos;70s construction
            on proper lots with serious laneway house potential. I have walked
            buyers through homes here where the lot alone justifies the
            price, and the laneway income, or the option to build one
            for family, seals the deal. Compared to west-side
            alternatives at twice the price, the math here is hard to argue
            with. The neighbourhood is not standing still either: active
            densification along Kingsway means more amenities and more
            housing options are coming.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The walk score of 78 reflects a neighbourhood where you can
            handle daily errands on foot. Groceries, school drop-off,
            the community centre. But you will want a car for bigger
            trips. Joyce-Collingwood SkyTrain is the closest Expo Line
            station, reachable by bus or a short drive. Kingsway provides
            frequent bus service, and Metrotown&apos;s bus exchange and future
            SkyTrain connections are just across the Burnaby boundary.
            Champlain Square and the Kingsway commercial strip mean you
            rarely need to leave the neighbourhood for essentials.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Families. That is the short answer. Families who chose this
            neighbourhood for the community centre and Killarney Secondary
            and never looked back. Families from Chinese, South Asian,
            Filipino, and Vietnamese backgrounds who have been here long
            enough to see the neighbourhood evolve around them. Young couples
            who toured a dozen west-side condos, did the math, and realized
            they could have a townhome in Killarney with a pool and an ice
            rink down the street for less money. Retirees who walk to the
            community centre every morning and know everyone by name. It
            is quiet, diverse, affordable by Vancouver standards, and held
            together by a community infrastructure that most neighbourhoods
            would envy.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Killarney is the neighbourhood I
              point value-conscious families toward when they want community
              amenities, a great school, generous lots, and a benchmark price
              that still starts with a one. The community centre alone would
              be worth a premium. The fact that everything else, the
              food, the parks, the school, the space, comes at $1.1M
              is what makes this one of the smartest buys in the city.
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
