import type { Metadata } from "next";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import MarketPriceLinks from "@/components/market/MarketPriceLinks";
import NeighbourhoodListings from "@/components/neighborhoods/NeighbourhoodListings";

/** Listings are live data; regenerate hourly rather than freezing at build. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Strathcona Vancouver | Real Estate Guide",
  description:
    "Strathcona homes for sale in Vancouver. MLS\u00ae HPI benchmark $795K, -10.4% year over year, plus schools, transit, and local detail.",
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
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Strathcona", href: "/neighborhoods/strathcona" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/strathcona.webp')",
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
            1890s, converted warehouses where artists stretch canvases under
            skylights. Every block predates the modern city. Residents tend
            over 200 plots at Cottonwood Community Gardens, fight for
            heritage preservation at council, and know their neighbours by
            name. Annual studio tours open the warehouse conversions where
            painters, ceramicists, and furniture makers work.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Chinatown is a five-minute walk. Dim sum mornings, the Dr. Sun
            Yat-Sen Classical Chinese Garden, herbal shops in the same
            family for generations. CRAB Park offers Burrard Inlet
            waterfront with North Shore mountain views. Downtown is a short
            bike ride or 20-minute walk. Main Street-Science World and
            Stadium-Chinatown SkyTrain stations connect to the Expo and
            Millennium Lines. The Adanac Bikeway runs through the
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
            Composite benchmark: around <strong>{NEIGHBOURHOODS["strathcona"].avgPrice}</strong>. Restored
            Victorians and Edwardians run from{" "}
            <strong>$1.0M to $1.5M</strong>, many heritage-designated
            (character protected, renovation rules apply). Warehouse lofts
            and condos range from <strong>$400K to $750K</strong>: high
            ceilings, exposed brick, oversized windows for creatives and
            professionals who want character without old-house maintenance.
            Townhomes at <strong>$700K to $1.1M</strong> offer a middle
            ground, popular with couples making a first purchase.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Artists who need affordable studio space. Heritage lovers who
            would rather restore an 1890s house than buy new. Downtown
            professionals who want genuine grit. Long-time Chinese-Canadian
            families whose roots go back generations anchor the community.
            Not for everyone, but those who connect with its energy develop
            a loyalty rarely seen elsewhere in the city.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> 130 years of genuine character,
              heritage homes, artist lofts, and an inner-city location
              minutes from everything. For buyers who value authenticity
              over polish, one of the most compelling east-side addresses.
            </p>
          </div>
        </div>
      </article>

      <NeighbourhoodListings slug="strathcona" />

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["strathcona"].avgPrice}</p>
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
      <MarketPriceLinks slug="strathcona" />
    </>
  );
}
