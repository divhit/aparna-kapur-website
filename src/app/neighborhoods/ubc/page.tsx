import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "UBC Vancouver | Real Estate Guide",
  description:
    "Your quick guide to UBC, Vancouver. Campus lifestyle, leasehold real estate, Pacific Spirit Park, Wesbrook Village, schools, transit, and what makes living at UBC unlike anywhere else in Metro Vancouver.",
  keywords: [
    "UBC Vancouver",
    "UBC real estate",
    "UBC homes for sale",
    "Wesbrook Village",
    "Pacific Spirit Park",
  ],
};

export default function UBCPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "UBC", href: "/neighborhoods/ubc" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/ubc.png')",
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
            <span className="text-teal-200">UBC</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            UBC
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            A world-class university, old-growth forest, and ocean on three sides. This isn&apos;t a campus, it&apos;s a lifestyle.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            UBC sits on the western tip of Point Grey, surrounded by ocean on
            three sides and wrapped in 763 hectares of Pacific Spirit Park.
            Morning runs on old-growth forest trails. Evening walks end at
            Spanish Banks watching the sun drop behind Vancouver Island. The
            campus brings 70,000 people daily: world-class lectures, Belkin
            Gallery exhibitions, Thunderbirds athletics, and a cultural
            calendar that rivals downtown&apos;s.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Wesbrook Village is the residential heart: modern, walkable, with a
            Save-On-Foods, restaurants, community centre, and Norma Rose Point
            Elementary. The vibe is young, international, and quietly ambitious.
            No UBC affiliation required to buy. Anyone can purchase in Wesbrook
            Village, Hawthorn Place, or Chancellor Place.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;The 99-year leasehold keeps prices a touch below comparable
              west-side freehold, and savvy buyers know it.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Every property sits on a 99-year prepaid lease from UBC. For
            financing and resale it functions almost identically to freehold.
            Composite benchmark: around <strong>$1.35M</strong>. Condos at{" "}
            <strong>$550K to $1.2M</strong> in Wesbrook Village and Hawthorn
            Place with mountain or forest views. Townhomes at{" "}
            <strong>$1.3M to $2M</strong>, the sweet spot for families.
            Detached homes in the University Endowment Lands are extremely
            limited at <strong>$2.5M to $4.5M+</strong>.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Rush hour can feel like the end of a peninsula. The 99 B-Line runs
            every 3 to 5 minutes at peak and reaches Commercial-Broadway
            SkyTrain in about 30 minutes. Downtown is 20 to 30 minutes by car,
            and the Broadway Subway extension will improve connections further.
            The community: UBC faculty, international families drawn by schools
            and safety, retirees who traded Kerrisdale houses for forest-view
            condos, and remote workers who prioritize nature over nightlife.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Nature-immersed west-side living
              at a slight discount to freehold, with world-class amenities on
              your doorstep. If your ideal evening is a trail run through
              old-growth forest followed by a campus lecture, this is the one.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.35M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">30 min</p>
              <p className="text-xs text-warm-500 mt-1">To Downtown</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">763 ha</p>
              <p className="text-xs text-warm-500 mt-1">Pacific Spirit Park</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="UBC" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "UBC Vancouver: Campus Living & Real Estate Guide",
            description:
              "An insider guide to living at UBC, Vancouver. Leasehold real estate, Pacific Spirit Park, Wesbrook Village, and what makes campus living unlike anywhere else in Metro Vancouver.",
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
