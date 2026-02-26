import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "Grandview-Woodland Vancouver | Commercial Drive & Real Estate Guide 2026",
  description:
    "Your quick guide to Grandview-Woodland, Vancouver. Commercial Drive culture, Italian heritage, real estate prices, transit, and what makes The Drive one of Vancouver's most beloved streets.",
  keywords: [
    "Grandview-Woodland Vancouver",
    "Grandview-Woodland real estate",
    "Commercial Drive Vancouver",
    "Grandview-Woodland homes for sale",
    "East Vancouver real estate",
  ],
};

export default function GrandviewWoodlandPage() {
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
            <span className="text-teal-200">Grandview-Woodland</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Grandview-Woodland
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            The Drive, the soul of east Van. Fiercely independent since
            forever.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            If you want to understand what makes east Vancouver tick, I will
            save you the research: go to Commercial Drive on a Saturday. Grab
            an espresso at one of the Italian cafes that have been here since
            the 1950s, watch the nonnas share the sidewalk with artists and
            young families, browse a bookstore that has somehow survived the
            internet age, and eat Ethiopian food for lunch at a place with no
            sign out front but a line down the block. There are no chain
            stores on The Drive. Not one. That is not an accident,
            it is a statement.
          </p>

          <p className="text-warm-700 leading-relaxed mb-4">
            Grandview-Woodland is the neighbourhood that gave east Vancouver
            its identity. The Italian roots run deep. Italian Day on
            The Drive draws 300,000 people and is one of the biggest street
            festivals in the country. But the neighbourhood has always been a
            landing pad for waves of newcomers: Italian, Portuguese, Central
            American, Ethiopian, Vietnamese. That layered cultural history is
            what makes the food scene so extraordinary and the community so
            genuinely multicultural.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Behind The Drive, the residential streets tell a different story.
            Craftsman bungalows with deep front porches. Vancouver Specials
            with their angular rooflines. Edwardian homes with mature gardens
            and fruit trees. Grandview Park is the social hub where everyone
            congregates, and Britannia Community Centre, with its pool,
            ice rink, library, and secondary school all in one complex,
            is the beating heart of the neighbourhood. The arts scene is real,
            not marketed: The Cultch and Rio Theatre host live performance and
            indie film, and the live music venues along The Drive keep the
            evenings interesting.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;The Drive is the street that proves you do not need
              chains, franchises, or polish to build something people love.
              Two hundred independent businesses and counting.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-4">
            Grandview-Woodland has a composite benchmark of around{" "}
            <strong>$1.1M</strong>, reflecting a market that skews more toward
            detached homes than many inner-city neighbourhoods. The character
            homes are the draw: craftsman bungalows, Vancouver Specials,
            and Edwardian houses typically range from{" "}
            <strong>$1.3M to $1.8M</strong>. Properties on the quieter streets
            near The Drive command premiums for walkability, while those
            farther east toward Woodland offer slightly more space for the
            money.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Condos near the SkyTrain station are popular with first-time
            buyers, running from <strong>$500K to $850K</strong>.
            Commercial-Broadway is the busiest station in the entire SkyTrain
            system, and that transit access is a genuine selling point.
            Townhomes along the Broadway corridor go for{" "}
            <strong>$900K to $1.3M</strong>, with newer builds incorporating
            transit-oriented design. I find that buyers here are less driven by
            investment calculus and more by the fact that they genuinely love
            The Drive and want to live within walking distance of it. That
            kind of emotional attachment to a neighbourhood keeps values
            stable.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Commercial-Broadway is the busiest SkyTrain interchange in the
            region, connecting the Expo and Millennium Lines. Downtown is about
            ten minutes by train. The Drive itself is supremely walkable,
            and everything you need for daily life is within a comfortable stroll.
            Walk Score: 90. Cycling infrastructure is solid, with routes
            connecting to the central valley greenway and the downtown
            peninsula. Most residents I work with use transit as their primary
            mode and keep a car mainly for weekend trips out of the city.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Italian families who built the neighbourhood and never left.
            Artists and musicians who need affordable space and a community
            that values what they do. Young families drawn to Grandview
            Elementary, Britannia, and the kind of free-range childhood where
            kids can walk to the park and the library on their own. Newcomers
            from around the world who find in The Drive&apos;s diversity a
            reflection of their own experience. People who would rather buy
            from independent shops than corporations, who care about community
            gardens and live music and knowing the person behind the counter.
            Grandview-Woodland self-selects for people with a certain set of
            values, and that is precisely why it works.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Grandview-Woodland is the
              neighbourhood for people who want community over convenience,
              character over polish, and a street like Commercial Drive that
              you will never get tired of. Two SkyTrain lines keep you
              connected, the character homes are some of the best in east
              Vancouver, and the cultural richness, from Italian heritage to
              global cuisine to grassroots arts, is impossible to
              replicate. If you want a neighbourhood with a soul, this is it.
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
              <p className="font-serif text-2xl text-teal-700">90</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">2</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Lines</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Grandview-Woodland" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Grandview-Woodland Vancouver: Commercial Drive & Real Estate Guide",
            description:
              "An insider guide to living in Grandview-Woodland, Vancouver. Commercial Drive culture, Italian heritage, and what makes The Drive one of Vancouver's most beloved streets.",
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
