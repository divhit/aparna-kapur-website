import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Sunset Vancouver | Real Estate Guide",
  description:
    "Your quick guide to Sunset, Vancouver. Home of the Punjabi Market, spacious detached lots, Churchill Secondary, multicultural dining, and south Vancouver's best-kept residential streets.",
  keywords: [
    "Sunset Vancouver",
    "Sunset real estate",
    "Sunset homes for sale",
    "Punjabi Market Vancouver",
    "Churchill Secondary Vancouver",
  ],
};

export default function SunsetPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Sunset", href: "/neighborhoods/sunset" },
        ]}
      />
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
            <span className="text-teal-200">Sunset</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Sunset
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Big lots, the Punjabi Market, and the kind of backyard space
            Vancouver forgot it had.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Families come for space and stay for community. Real lots with
            mature cherry trees, vegetable gardens, and backyards where kids
            run around. Sikh families tend their vegetable patches, Chinese
            grandparents do tai chi in the park, and the smell of fresh naan
            drifts from one house while com tam comes from the next. No one
            performs multiculturalism here. They have lived it for decades.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The Punjabi Market on Main Street (48th to 51st) is one of North
            America&apos;s first South Asian commercial districts, established
            in the 1970s. Sweet shops, sari stores, jewellers, and restaurants
            still anchor the strip, with revitalization underway. Sunset
            Community Centre anchors daily life. Churchill Secondary draws
            families citywide for its IB program and strong athletics. Kids
            walk to school. People use their front porches. Unpretentious in
            the best way.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Sunset is where you find the backyard, the mature tree,
              and the neighbourhood that actually feels like one.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: around <strong>$1.3M</strong>, overwhelmingly
            detached homes on generous lots. Detached homes run{" "}
            <strong>$1.4M to $1.9M</strong> with 33-foot frontages as
            standard, many wider. Condos are less common, starting around{" "}
            <strong>$450K to $650K</strong> along major corridors. The real
            story is laneway houses: Sunset is one of Vancouver&apos;s most
            active areas for laneway construction, with suites renting for{" "}
            <strong>$1,800 to $2,500/month</strong>, making multigenerational
            living practical and financially smart.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            A car helps, though Langara-49th Station on the Canada Line is a
            quick bus ride away (20 minutes to downtown, 15 to YVR). Knight
            Street Bridge connects to Richmond and Highway 99. Bus routes
            along Main, Fraser, and 49th are reliable. Walk score: 75. The
            community skews toward families who want space: Sikh and South
            Asian families with Punjabi Market roots, Chinese families who
            came for the lots and stayed for the schools, and young families
            done with renting.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> If your priority is space, a real
              lot, and deep cultural roots, Sunset delivers in a way that few
              Vancouver neighbourhoods can at this price. It will never be
              Kitsilano. It does not want to be.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.3M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">Punjabi</p>
              <p className="text-xs text-warm-500 mt-1">Market on Main</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">75</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Sunset" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Sunset Vancouver: Punjabi Market & Real Estate Guide",
            description:
              "An insider guide to living in Sunset, Vancouver. Punjabi Market, spacious lots, Churchill Secondary, and why this south Vancouver neighbourhood is one of the city's best-kept secrets.",
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
