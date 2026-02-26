import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Renfrew-Collingwood Vancouver | Diverse Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Renfrew-Collingwood, Vancouver. Multicultural food on Kingsway, three SkyTrain stations, Collingwood Village, real estate prices, and what makes this Vancouver's most dynamic east-side neighbourhood.",
  keywords: [
    "Renfrew-Collingwood Vancouver",
    "Renfrew-Collingwood real estate",
    "Renfrew-Collingwood homes for sale",
    "Kingsway Vancouver restaurants",
    "Collingwood Village Vancouver",
  ],
};

const data = NEIGHBOURHOODS["renfrew-collingwood"];

export default async function RenfrewCollingwoodPage() {
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
            <span className="text-teal-200">Renfrew-Collingwood</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Renfrew-Collingwood
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Vancouver&apos;s most diverse neighbourhood, three SkyTrain stops,
            and the best food corridor you&apos;ve never heard of.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            I brought a client here on a Tuesday afternoon last fall. We parked
            near Joyce Station, walked half a block, and within ten minutes
            she&apos;d pointed at a hot pot place, a Vietnamese bakery, a Korean
            fried chicken spot, and a Filipino grocery. She turned to me and
            said, &ldquo;How is this neighbourhood not more famous?&rdquo;
            Honestly, that&apos;s the thing about Renfrew-Collingwood. Over
            50,000 people live here, making it Vancouver&apos;s most populous
            neighbourhood, and it still flies under the radar.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            There are really two neighbourhoods here, stitched together by
            Kingsway. The north end &mdash; Renfrew &mdash; has a quieter,
            tree-lined suburban feel. Older character homes with deep lots,
            garden sheds, the kind of streets where people leave things on the
            curb with a &ldquo;free&rdquo; sign. Then there&apos;s the magical
            Renfrew Ravine, a hidden urban corridor with salmon-bearing
            streams and forest trails that locals fiercely protect. Every
            autumn the Moon Festival fills it with lanterns and art
            installations, and it&apos;s one of those Vancouver moments that
            makes you stop and think, &ldquo;How did I not know about this?&rdquo;
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            The south end &mdash; Collingwood &mdash; is a different energy
            entirely. Collingwood Village around Joyce Station is one of
            Vancouver&apos;s best examples of transit-oriented development done
            right: condo towers, townhomes, parks, shops, and a SkyTrain
            station all woven into a walkable community that actually works.
            The food along Kingsway is staggering in its variety &mdash; dim
            sum, pho, Korean BBQ, Filipino adobo, fresh naan &mdash; block
            after block, all authentic, all affordable. Food writers from
            across the city make pilgrimages here, and they should.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Three SkyTrain stations, the Kingsway food corridor, and
              prices well below the city average &mdash; Renfrew-Collingwood is
              the neighbourhood that smart buyers keep discovering.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Renfrew-Collingwood"
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
            The composite benchmark here sits around{" "}
            <strong>$1.05M</strong>, which is meaningfully below the Vancouver
            average &mdash; and that gap is exactly why I keep bringing buyers
            to this neighbourhood. Condos are the entry point, running{" "}
            <strong>$400K to $700K</strong> and concentrated near Joyce
            Station where rental demand is consistently strong. If you&apos;re
            an investor, these numbers work. Townhomes go for{" "}
            <strong>$750K to $1M</strong>, mostly newer builds that young
            families are snapping up because the space-to-dollar ratio is hard
            to beat anywhere else in the city.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Detached homes range from <strong>$1.2M to $1.7M</strong>, and
            what you get for that money is remarkable &mdash; post-war homes on
            generous lots with serious laneway house potential. I&apos;ve had
            clients add a laneway suite and essentially create a mortgage
            helper that covers a significant chunk of their monthly payment.
            With the City of Vancouver actively planning densification around
            all three SkyTrain stations (Renfrew, Rupert, and
            Joyce-Collingwood), the long-term investment thesis here is as
            compelling as anywhere on the east side.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Three Expo Line stations &mdash; Renfrew, Rupert, and
            Joyce-Collingwood &mdash; give you a direct 20-minute ride
            downtown with no transfer. That alone sets this neighbourhood apart
            from most of south Vancouver. The walk score sits at 82, and
            Kingsway provides a major bus corridor with frequent service.
            Knight Street Bridge gets you to Richmond and YVR quickly by car.
            It&apos;s not the cycling paradise that Kitsilano is, but for
            transit-dependent commuters this is one of the most connected
            neighbourhoods in the city.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            More than 50 cultures, and that is not a marketing line &mdash;
            it&apos;s the census data. Chinese, Vietnamese, Filipino, South
            Asian, Korean families have deep roots here, some going back
            decades. New immigrants arrive and find a landing spot that feels
            familiar. Young couples priced out of East Van discover they can
            actually afford a two-bedroom near a SkyTrain station. Families
            plant themselves near Windermere Secondary or one of the many
            elementary schools. Collingwood Neighbourhood House runs newcomer
            support, family programs, and youth services that genuinely knit
            this community together. It&apos;s one of the few Vancouver
            neighbourhoods where diversity is not a buzzword &mdash; it&apos;s
            just Tuesday.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Renfrew-Collingwood is where value,
              transit access, and genuine multicultural community converge. If
              you want three SkyTrain stations, some of the best food in the
              city, and a benchmark price well below the Vancouver average, this
              is the neighbourhood I keep steering people toward. It&apos;s not
              flashy. It doesn&apos;t need to be.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.05M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">3</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Stations</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">82</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Renfrew-Collingwood" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Renfrew-Collingwood Vancouver — Diverse Living & Real Estate Guide",
            description:
              "An insider guide to living in Renfrew-Collingwood, Vancouver. Multicultural food, three SkyTrain stations, real estate prices, and what makes this the city's most dynamic east-side neighbourhood.",
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
