import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Strathcona Vancouver | Heritage Homes & Real Estate Guide 2026",
  description:
    "Your quick guide to Strathcona, Vancouver. Heritage Victorian homes, artist lofts, Chinatown adjacency, transit, and what makes Strathcona Vancouver's most historically layered neighbourhood.",
  keywords: [
    "Strathcona Vancouver",
    "Strathcona real estate",
    "Strathcona heritage homes",
    "Strathcona artist lofts",
    "Vancouver oldest neighbourhood",
  ],
};

const data = NEIGHBOURHOODS["strathcona"];

export default async function StrathconaPage() {
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
            <span className="text-teal-200">Strathcona</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Strathcona
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Vancouver&apos;s oldest neighbourhood &mdash; raw, real, and
            irreplaceable.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            I always tell people: if you want to feel Vancouver&apos;s history
            in your bones, walk through Strathcona on a quiet afternoon. The
            Victorian houses with their gingerbread trim, the workers&apos;
            cottages from the 1890s, the converted warehouses where artists
            now stretch canvases under skylights &mdash; every block has a
            story that predates the city itself. This is not a neighbourhood
            that was designed by a developer. It grew, it survived, it fought
            for itself. And that is exactly what makes it magnetic.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            Strathcona is honest in a way that polished west-side
            neighbourhoods are not. The community here is tight-knit and
            fiercely protective of its character. People tend their plots at
            Cottonwood Community Gardens &mdash; over 200 of them &mdash;
            fight for heritage preservation at council meetings, and actually
            know their neighbours by name. The annual studio tours let you
            peek inside the warehouse conversions where painters, ceramicists,
            and furniture makers do their work.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Chinatown is a five-minute walk, and the two neighbourhoods have
            always been intertwined. Dim sum mornings, the Dr. Sun Yat-Sen
            Classical Chinese Garden, herbal shops that have been in the same
            family for generations &mdash; that cultural depth is part of
            Strathcona&apos;s DNA. CRAB Park gives you Burrard Inlet
            waterfront with harbour views and the North Shore mountains as a
            backdrop. It is inner-city living at its most authentic &mdash;
            with all the beauty and all the complexity that entails.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Strathcona is the only neighbourhood in Vancouver where
              you can live in an 1890s Victorian, walk to Chinatown for dim
              sum, and bike downtown in five minutes. Nothing else comes
              close.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Strathcona"
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
            For an inner-city neighbourhood this close to downtown, Strathcona
            offers genuine value. The composite benchmark is around{" "}
            <strong>$950K</strong>. The signature properties are the heritage
            homes &mdash; beautifully restored Victorians and Edwardians
            running from <strong>$1.0M to $1.5M</strong>. Many are
            heritage-designated, which protects their character but also means
            renovation rules apply. Buyers who appreciate that kind of
            architectural detail tend to be passionate about these homes, and
            bidding can be competitive when a good one comes up.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Warehouse lofts and condos are the other major category, ranging
            from <strong>$400K to $750K</strong>. These converted industrial
            spaces with high ceilings, exposed brick, and oversized windows
            attract creatives and professionals who want character without the
            maintenance of an old house. Townhomes in the{" "}
            <strong>$700K to $1.1M</strong> range offer a middle ground &mdash;
            modern builds with ground-level access, popular with couples
            making their first purchase who want proximity to downtown without
            the condo tower lifestyle.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Downtown is a short bike ride or a brisk 20-minute walk. Main
            Street-Science World and Stadium-Chinatown SkyTrain stations are
            both within reach, connecting you to the Expo and Millennium
            Lines. The Walk Score is 91, reflecting the flat terrain and the
            density of services in adjacent Chinatown and along Main Street.
            Serious cyclists love Strathcona &mdash; the Adanac Bikeway runs
            right through the neighbourhood, and you can be at your desk
            downtown in under ten minutes without breaking a sweat.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Artists who need affordable studio space and do not want to
            commute from the suburbs. Heritage lovers who would rather restore
            an 1890s house than buy a new condo. Young professionals who work
            downtown and want a neighbourhood with genuine grit and character.
            Long-time residents &mdash; including Chinese-Canadian families
            whose roots here go back generations &mdash; who anchor the
            community. It is not for everyone, and the people who live here
            know that. But for those who connect with its energy, Strathcona
            creates a loyalty I rarely see in other parts of the city.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Strathcona is Vancouver&apos;s most
              historically rich neighbourhood, and it offers something no
              amount of new development can replicate &mdash; genuine
              character, 130 years of stories, and an inner-city location that
              is minutes from everything. Heritage homes, artist lofts, and
              accessible price points make it one of the most compelling buys
              on the east side for people who value authenticity over polish.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$950K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">1890s</p>
              <p className="text-xs text-warm-500 mt-1">Heritage Homes</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">91</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Strathcona" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Strathcona Vancouver — Heritage Homes & Real Estate Guide",
            description:
              "An insider guide to living in Strathcona, Vancouver. Heritage Victorian homes, artist lofts, Chinatown adjacency, and what makes Strathcona Vancouver's most historically layered neighbourhood.",
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
