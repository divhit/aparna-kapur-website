import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Arbutus Ridge Vancouver | Greenway Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Arbutus Ridge, Vancouver. The Arbutus Greenway, heritage homes, Quilchena Park, top schools, and what makes this quiet west-side neighbourhood a hidden gem between Kerrisdale and Shaughnessy.",
  keywords: [
    "Arbutus Ridge Vancouver",
    "Arbutus Ridge real estate",
    "Arbutus Ridge homes for sale",
    "Arbutus Greenway",
    "Arbutus Village shopping",
  ],
};

const data = NEIGHBOURHOODS["arbutus-ridge"];

export default async function ArbutusRidgePage() {
  const pois = await fetchNeighbourhoodPOIs(data.center);

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
            <span className="text-teal-200">Arbutus Ridge</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Arbutus Ridge
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            The quiet achiever of Vancouver&apos;s west side — big lots, the Greenway at your door, and none of the fuss.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            I have a theory about Arbutus Ridge: the people who live here
            don&apos;t talk about it much, and that&apos;s on purpose. They
            found one of the best-positioned neighbourhoods on the west side —
            tucked between the prestige of Shaughnessy and the village charm of
            Kerrisdale — and they&apos;d rather keep it to themselves. I get it.
            When you have estate-sized lots, a 9-kilometre car-free greenway
            through your front yard, and one of BC&apos;s best high schools in
            your catchment, why advertise?
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            Arbutus Ridge is defined by two things: space and the Greenway. The
            lots here are among the largest on the west side — deep setbacks,
            mature gardens, towering maples and chestnuts lining the streets. The
            homes are a handsome mix of mid-century estates that have been
            lovingly maintained, heritage places with original millwork, and
            ambitious contemporary rebuilds by owners who understood the value of
            the land beneath them. The pace is unhurried. You hear birdsong more
            than traffic.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            The Arbutus Greenway changed everything when it opened. Nine
            kilometres of car-free pathway built on a former rail corridor,
            running right through the heart of the neighbourhood — connecting
            Kitsilano to the north with the Fraser River to the south. Joggers,
            cyclists, dog walkers, parents with strollers. Community gardens and
            public art along the route. It gave Arbutus Ridge a central spine
            and a sense of connection it didn&apos;t quite have before, and
            property values along the corridor noticed.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Arbutus Ridge gives you Shaughnessy-sized lots and Prince
              of Wales catchment at a price that actually makes sense. That
              combination is genuinely rare.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Arbutus Ridge"
            height="380px"
            showLegend
          />
        </div>

        <div className="max-w-3xl mx-auto px-6">
          {/* The Real Estate Picture */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Real Estate Picture
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            The composite benchmark is around <strong>$2.2M</strong>, which
            positions Arbutus Ridge as more accessible than Shaughnessy next
            door while still offering comparable lot sizes. Detached homes are
            the dominant property type, ranging from{" "}
            <strong>$2.5M to $4.5M+</strong> on generous lots. You&apos;ll find
            everything from original 1950s ranchers with untouched potential to
            full custom rebuilds with landscaped gardens and coach houses. The
            sweet spot for most families is a well-updated heritage home in the
            $3M range — enough character to feel special, enough renovation to
            live in comfortably.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            A growing number of townhomes near Arbutus Village run{" "}
            <strong>$1.2M to $1.8M</strong> and appeal to young families and
            downsizers who want to stay in the catchment. Condos are limited,
            mostly low- and mid-rise buildings near the village, starting around{" "}
            <strong>$600K to $1.2M</strong>. The neighbourhood scores a 93 walk
            score, which is remarkable for an area this quiet — Arbutus Village
            covers groceries, pharmacy, dining, and daily needs, and both
            Kerrisdale Village and South Granville are walkable from most
            streets.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            The Arbutus Greenway makes cycling and walking genuinely practical
            here — you can ride to Kits, Granville Island, or the Fraser River
            without touching a road. Bus routes on Arbutus Street and along
            Broadway connect to the broader transit network, and the Broadway
            Subway will add rapid transit access nearby. Downtown is about 20
            minutes by car. The 93 walk score means most errands happen on foot:
            Arbutus Village, Kerrisdale, and South Granville are all within easy
            reach.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Long-time families who bought in the &apos;80s and &apos;90s and
            have watched the neighbourhood quietly appreciate. Younger families
            who specifically wanted Prince of Wales Secondary catchment and
            found better value here than in Shaughnessy. Empty nesters who moved
            from a detached home to one of the newer townhomes near the village.
            A sprinkling of professionals who work from home and love the
            Greenway for midday breaks. The common denominator is people who
            prefer substance over show — Arbutus Ridge doesn&apos;t need a
            reputation because the quality of life speaks for itself.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Arbutus Ridge is the neighbourhood
              I recommend to families who want the best of the west side
              without overpaying for a name. Estate-sized lots, the Greenway at
              your doorstep, Prince of Wales catchment, and walkable access to
              three distinct village centres. It&apos;s the quiet one on the
              block that outperforms every year.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$2.2M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">93</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">9 km</p>
              <p className="text-xs text-warm-500 mt-1">Arbutus Greenway</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Arbutus Ridge" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Arbutus Ridge Vancouver — Greenway Living & Real Estate Guide",
            description:
              "An insider guide to living in Arbutus Ridge, Vancouver. The Arbutus Greenway, heritage homes, top schools, and what makes this quiet west-side neighbourhood a hidden gem.",
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
