import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Fairview Vancouver | Broadway Corridor & Real Estate Guide 2026",
  description:
    "Your quick guide to Fairview, Vancouver. Broadway Plan development, South Granville shopping, Granville Island, transit, and what makes Fairview one of Vancouver's best-connected neighbourhoods.",
  keywords: [
    "Fairview Vancouver",
    "Fairview real estate",
    "Fairview condos for sale",
    "Broadway Plan Vancouver",
    "South Granville Vancouver",
  ],
};

const data = NEIGHBOURHOODS["fairview"];

export default async function FairviewPage() {
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
            <span className="text-teal-200">Fairview</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Fairview
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Vancouver&apos;s quiet achiever &mdash; best location, least ego.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            I have a theory about Fairview: it is the most under-appreciated
            neighbourhood in Vancouver. Nobody writes breathless articles about
            it. It never trends. But when I ask clients who&apos;ve lived all
            over the city where they&apos;d actually settle long-term, Fairview
            comes up more often than you&apos;d expect. Morning walk along the
            False Creek seawall, pastries from Granville Island, eight minutes
            to downtown on the Canada Line &mdash; that&apos;s just a regular
            Tuesday here. No fanfare required.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            Fairview sits in the geographic sweet spot of the city. South
            Granville&apos;s gallery row gives it polish &mdash; art dealers,
            boutique fashion, upscale restaurants that have been around for
            decades. Cambie Village keeps it grounded with neighbourhood
            grocers, bakeries, and the kind of coffee shops where the barista
            knows your order. And then there&apos;s Granville Island, literally
            at your doorstep, which needs no introduction.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            The Broadway Plan is the big story right now. Thousands of new
            homes along the corridor, the subway extension opening, a whole new
            generation of mixed-use buildings rising. But step one block south
            of Broadway and it&apos;s a different world &mdash; tree-lined
            residential streets, well-kept heritage homes, quiet evenings. That
            duality is what makes Fairview work. You get the energy and
            connectivity of a major urban corridor with the calm of an
            established residential neighbourhood just behind it.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Fairview is the neighbourhood where people stop looking.
              Two SkyTrain lines, Granville Island, the seawall, VGH walking
              distance &mdash; once you&apos;re here, why would you
              leave?&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Fairview"
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
            The composite benchmark in Fairview hovers around{" "}
            <strong>$900K</strong>, which is remarkably reasonable given that
            you are essentially in the centre of the city with two SkyTrain
            lines at your feet. Condos dominate the market here, ranging from{" "}
            <strong>$550K to $1.2M</strong> depending on age, size, and how
            close you are to the water or the new subway stations. The Broadway
            Plan is bringing significant new supply &mdash; purpose-built
            rentals and strata condos alike &mdash; which is changing the
            skyline along the corridor.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Townhomes are a growing segment, particularly transit-oriented new
            builds in the <strong>$1.1M to $1.8M</strong> range. For buyers
            who want something with more character, the heritage homes south
            of Broadway start around <strong>$1.5M</strong> and can push past{" "}
            <strong>$3M</strong> for the well-preserved ones with views. These
            are increasingly rare as the neighbourhood densifies. Healthcare
            professionals at VGH and the Broadway medical corridor make up a
            significant chunk of buyers &mdash; they want to walk to work, and
            Fairview is the only neighbourhood that lets them do it in style.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            This is where Fairview truly excels. Two SkyTrain lines &mdash;
            the Canada Line at Broadway-City Hall and Olympic Village, plus the
            new Broadway Subway extension &mdash; make it one of the
            best-connected neighbourhoods in the entire Metro Vancouver region.
            The False Creek seawall is your cycling and jogging route. Walk
            Score sits at a near-perfect 95. I regularly tell clients that if
            they want to own one car instead of two, or ditch the car
            altogether, Fairview is where that becomes genuinely practical.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Professionals who work downtown or in the Broadway corridor and
            value a short, pleasant commute. Doctors and nurses at VGH who
            want to walk to work. Couples who have outgrown Yaletown but
            aren&apos;t ready for the suburbs. Downsizers from the west side
            who want to stay central. Families drawn to Emily Carr Elementary
            and L&apos;Ecole Bilingue. It&apos;s a neighbourhood of people
            who have done their homework and decided that location,
            convenience, and quality of life matter more than trendy
            postcodes.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Fairview is Vancouver&apos;s best
              kept secret for people who prioritize access over flash. Two
              SkyTrain lines, Granville Island, the seawall, VGH, South
              Granville shopping &mdash; all within walking distance. The
              Broadway Plan is transforming the corridor, but the bones of
              this neighbourhood are solid. If you want the most connected
              address in the city without paying downtown prices, start here.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$900K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">95</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">2</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Lines</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Fairview" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Fairview Vancouver — Broadway Corridor & Real Estate Guide",
            description:
              "An insider guide to living in Fairview, Vancouver. Broadway Plan development, South Granville shopping, Granville Island, and what makes Fairview one of Vancouver's best-connected neighbourhoods.",
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
