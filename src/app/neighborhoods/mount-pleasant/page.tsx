import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Mount Pleasant Vancouver | Creative Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Mount Pleasant, Vancouver. Craft breweries, Main Street shopping, murals, tech hubs, and what makes Mount Pleasant one of Vancouver's most creative neighbourhoods.",
  keywords: [
    "Mount Pleasant Vancouver",
    "Mount Pleasant real estate",
    "Mount Pleasant condos for sale",
    "Main Street Vancouver",
    "Mount Pleasant breweries",
  ],
};

const data = NEIGHBOURHOODS["mount-pleasant"];

export default async function MountPleasantPage() {
  const pois = await fetchNeighbourhoodPOIs(data.center);

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
            <span className="text-teal-200">Mount Pleasant</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Mount Pleasant
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Breweries, murals, and Main Street &mdash; Vancouver&apos;s creative engine.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Here is how I describe Mount Pleasant to out-of-town buyers: imagine
            a neighbourhood that turned abandoned warehouses into the best
            brewery district in Western Canada, covered its buildings in
            world-class street art, and filled Main Street with independent
            shops and restaurants that make you forget chain stores exist. Now
            imagine it is also eight minutes from downtown on the SkyTrain and
            has a Walk Score of 92. That is Mount Pleasant. It is where
            Vancouver gets interesting.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            The rhythm here starts with coffee &mdash; and I mean serious
            coffee. 49th Parallel, Matchstick, JJ Bean&apos;s flagship &mdash;
            more specialty roasters per block than anywhere else in the city.
            Saturday mornings it is the farmers&apos; market, then browsing
            vintage shops on Main, then settling into a brewery patio by
            mid-afternoon. The Vancouver Mural Festival has turned entire
            building facades into open-air galleries, and it is not a
            corporate installation &mdash; it is community-driven art that
            actually reflects who lives here.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            South of Broadway, the streets shift to heritage character homes
            under mature trees. North of Broadway, it is newer condos, tech
            offices that chose this neighbourhood for its energy, and the
            brewery district where 10-plus taprooms have colonized the old
            industrial buildings east of Main. The blend of old and new is
            genuine, not manufactured. You can hear it in the live music
            spilling out of the Fox Cabaret on a Wednesday, see it in the
            independent bookstores that somehow keep thriving, taste it in the
            restaurants that open here first before anywhere else in the city.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Mount Pleasant is the neighbourhood that sets the trends
              Vancouver follows. If a restaurant, roaster, or brewery opens
              here first, pay attention.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Mount Pleasant"
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
            Mount Pleasant offers genuinely good value for how central it is.
            The composite benchmark sits around <strong>$850K</strong>, which
            undercuts both Kitsilano and Fairview while delivering similar
            walkability and better transit. Condos are the primary entry point,
            ranging from <strong>$550K to $1M</strong> for modern builds along
            the Main and Broadway corridors. The newer developments near the
            brewery district and along the transit line tend to go quickly
            &mdash; the lifestyle sells itself during showings.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Townhomes in the <strong>$1M to $1.5M</strong> range are
            increasingly popular with young families who want more space but
            refuse to leave the neighbourhood. The real gems, though, are the
            heritage character homes south of Broadway &mdash; Edwardian and
            craftsman houses with real history, running from{" "}
            <strong>$1.2M to $2.5M+</strong>. These streets are some of the
            prettiest in the city, and when one comes up for sale, it does not
            last. With two SkyTrain stations already here and the Broadway
            Subway adding even more connectivity, I expect Mount Pleasant to
            continue appreciating ahead of the broader east side market.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Two SkyTrain stations bracket the neighbourhood:
            Broadway-City Hall on the Canada Line and Main Street-Science World
            on the Expo and Millennium Lines. Downtown is eight minutes away.
            The cycling infrastructure is excellent, with dedicated lanes on
            Ontario Street and the off-Broadway route. Walk Score: 92. I have
            clients in Mount Pleasant who sold their car within six months of
            moving here and have not looked back. Between transit, cycling, and
            the sheer density of everything you need on Main Street, a vehicle
            is genuinely optional.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Creatives, tech workers, young professionals, and small-business
            owners who care about what their neighbourhood feels like. Couples
            who met at a Brassneck tasting and bought their first condo three
            blocks away. Families with kids at Mount Pleasant Elementary who
            walk to Clark Park after school. Graphic designers who chose their
            apartment specifically so they could walk to their studio. People
            who would rather spend Saturday at an independent bookstore than a
            mall. It is a neighbourhood that attracts people with taste and
            opinions &mdash; and the coffee shops, restaurants, and breweries
            reflect that.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Mount Pleasant is where you go when
              you want the creative energy, the walkability, and the
              community feeling without west-side prices. The brewery district
              alone is worth the move, Main Street is the best independent
              shopping strip in the city, and two SkyTrain stations keep you
              connected to everything. If you care about culture as much as
              square footage, this is your neighbourhood.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$850K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">92</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">10+</p>
              <p className="text-xs text-warm-500 mt-1">Breweries</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Mount Pleasant" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Mount Pleasant Vancouver — Creative Living & Real Estate Guide",
            description:
              "An insider guide to living in Mount Pleasant, Vancouver. Craft breweries, Main Street shopping, murals, and what makes Mount Pleasant one of Vancouver's most creative neighbourhoods.",
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
