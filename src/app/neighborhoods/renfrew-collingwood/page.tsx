import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

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

export default function RenfrewCollingwoodPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/renfrew-collingwood.png')",
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
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
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
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Over 50,000 people live in Renfrew-Collingwood, making it
            Vancouver&apos;s most populous neighbourhood, yet it still flies
            under the radar. More than 50 cultures are represented here
            according to census data. Chinese, Vietnamese, Filipino, South
            Asian, and Korean families have deep roots, some going back decades.
            Collingwood Neighbourhood House runs newcomer support, family
            programs, and youth services that genuinely knit the community
            together.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The north end, Renfrew, has a quieter, tree-lined suburban feel
            with older character homes on deep lots and the hidden Renfrew
            Ravine, a salmon-bearing urban corridor where the annual Moon
            Festival fills the trails with lanterns and art. The south end,
            Collingwood, is a different energy. Collingwood Village around Joyce
            Station is transit-oriented development done right: condo towers,
            townhomes, parks, and shops woven into a walkable community. The
            food along Kingsway is staggering. Dim sum, pho, Korean BBQ,
            Filipino adobo, fresh naan, block after block, all authentic
            and affordable.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Three SkyTrain stations, the Kingsway food corridor, and
              prices well below the city average.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            The composite benchmark sits around <strong>$1.05M</strong>,
            meaningfully below the Vancouver average. Condos run{" "}
            <strong>$400K to $700K</strong>, concentrated near Joyce Station
            where rental demand is consistently strong. Townhomes go for{" "}
            <strong>$750K to $1M</strong>, mostly newer builds that young
            families favour for their space-to-dollar ratio. Detached homes
            range from <strong>$1.2M to $1.7M</strong>, typically post-war
            construction on generous lots with serious laneway house potential.
            With the City of Vancouver actively planning densification around
            all three SkyTrain stations (Renfrew, Rupert, and
            Joyce-Collingwood), the long-term investment case is compelling.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Three Expo Line stations give you a direct 20-minute ride downtown
            with no transfer, which sets this neighbourhood apart from most of
            south Vancouver. The walk score is 82, Kingsway provides frequent
            bus service, and Knight Street Bridge gets you to Richmond and YVR
            quickly by car. The community is broad: young couples priced out of
            East Van discovering they can afford a two-bedroom near SkyTrain,
            families near Windermere Secondary, and long-time residents who have
            watched three generations grow up on the same block.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Renfrew-Collingwood is where value,
              transit access, and genuine multicultural community converge. If
              you want three SkyTrain stations, some of the best food in the
              city, and a benchmark well below the Vancouver average, this is
              the neighbourhood.
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
              "Renfrew-Collingwood Vancouver: Diverse Living & Real Estate Guide",
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
