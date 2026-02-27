import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

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

export default function StrathconaPage() {
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
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Strathcona
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Vancouver&apos;s oldest neighbourhood. Raw, real, and
            irreplaceable.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Strathcona is where Vancouver&apos;s history lives. Victorian
            houses with gingerbread trim, workers&apos; cottages from the
            1890s, converted warehouses where artists now stretch canvases
            under skylights. Every block predates the modern city. The
            community is tight-knit and fiercely protective: residents tend
            over 200 plots at Cottonwood Community Gardens, fight for
            heritage preservation at council meetings, and actually know
            their neighbours by name. Annual studio tours open the warehouse
            conversions where painters, ceramicists, and furniture makers
            work.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Chinatown is a five-minute walk, and the two neighbourhoods
            have always been intertwined. Dim sum mornings, the Dr. Sun
            Yat-Sen Classical Chinese Garden, herbal shops that have been
            in the same family for generations. CRAB Park gives you Burrard
            Inlet waterfront with harbour views and the North Shore
            mountains as a backdrop. Downtown is a short bike ride or a
            brisk 20-minute walk. Main Street-Science World and
            Stadium-Chinatown SkyTrain stations connect you to the Expo
            and Millennium Lines. The Adanac Bikeway runs right through the
            neighbourhood. Walk Score: 91.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;The only neighbourhood in Vancouver where you can live
              in an 1890s Victorian, walk to Chinatown for dim sum, and bike
              downtown in five minutes.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            The composite benchmark is around <strong>$950K</strong>. The
            signature properties are beautifully restored Victorians and
            Edwardians running from <strong>$1.0M to $1.5M</strong>, many
            heritage-designated, which protects their character but means
            renovation rules apply. Warehouse lofts and condos range from{" "}
            <strong>$400K to $750K</strong>, converted industrial spaces
            with high ceilings, exposed brick, and oversized windows that
            attract creatives and professionals who want character without
            the maintenance of an old house. Townhomes in the{" "}
            <strong>$700K to $1.1M</strong> range offer a middle ground,
            modern builds popular with couples making their first purchase.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Artists who need affordable studio space, heritage lovers who
            would rather restore an 1890s house than buy a new condo, young
            professionals who work downtown and want genuine grit and
            character. Long-time Chinese-Canadian families whose roots go
            back generations anchor the community. Strathcona is not for
            everyone, but for those who connect with its energy, it creates
            a loyalty rarely seen in other parts of the city.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Strathcona offers something no
              new development can replicate: 130 years of genuine character,
              heritage homes, artist lofts, and an inner-city location
              minutes from everything. For buyers who value authenticity over
              polish, it is one of the most compelling addresses on the east
              side.
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
              "Strathcona Vancouver: Heritage Homes & Real Estate Guide",
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
