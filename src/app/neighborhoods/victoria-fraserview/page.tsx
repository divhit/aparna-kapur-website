import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Victoria-Fraserview Homes for Sale | 2026",
  description:
    "Your quick guide to Victoria-Fraserview, Vancouver. Fraser River views, Fraserview Golf Course, Everett Crowley Park, spacious homes, and one of south Vancouver's most underrated residential neighbourhoods.",
  keywords: [
    "Victoria-Fraserview Vancouver",
    "Victoria-Fraserview real estate",
    "Victoria-Fraserview homes for sale",
    "Fraserview Golf Course",
    "Fraser River views Vancouver",
  ],
};

export default function VictoriaFraserviewPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Victoria-Fraserview", href: "/neighborhoods/victoria-fraserview" },
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
            <span className="text-teal-200">Victoria-Fraserview</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Victoria-Fraserview
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Fraser River views, a championship golf course, and the space that
            the rest of Vancouver only dreams about.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Regular family homes on quiet streets with sunset views over the
            Fraser River that most Vancouver neighbourhoods cannot match at
            any price. Wide streets, generous lots, proper front and back
            yards, and mature trees older than most of their owners. Chinese,
            South Asian, Filipino, and Vietnamese families have deep roots
            here, and the food along Victoria Drive reflects it: dim sum, pho,
            curry, Filipino bakeries, all priced for locals.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Green space is remarkable. Fraserview Golf Course is an 18-hole
            public championship course with river views. Everett Crowley Park
            covers 40 hectares of trails, meadows, and reclaimed urban forest
            with panoramic views of the city, river, and North Shore
            mountains. David Thompson Secondary and multiple elementary
            schools serve the area well. Killarney Community Centre (pool, ice
            rink) is right next door. The neighbours know each other. People
            wave.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;River views, 40 hectares of urban wilderness, and a public
              golf course, all at prices that make the west side look
              absurd.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Composite benchmark: around <strong>$1.2M</strong>, with far
            more space per dollar than the west side. Detached homes run{" "}
            <strong>$1.3M to $1.8M</strong> depending on lot size and
            river-view positioning; south-facing higher-ground properties
            command a premium for Fraser River sunsets. Townhomes in newer
            developments run <strong>$800K to $1.1M</strong>. Condos along
            Victoria Drive start at <strong>$450K to $700K</strong>. One of
            the last places in Vancouver where a detached home with a view
            does not require a financial sacrifice.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            A car helps. Joyce-Collingwood SkyTrain is a short bus ride
            north. Knight Street Bridge is the fast route to Richmond, YVR,
            and Highway 99. Bus service runs along Victoria Drive and 49th
            Avenue. The trade-off is distance from rapid transit, but families
            who spend weekends at the golf course, hiking Crowley Park, or
            grilling in their backyard find it more than fair. The community:
            long-time residents, families who chose space over a short
            commute, golfers, and newcomers from South and East Asia finding
            affordable entry into homeownership.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> River views, a championship golf
              course, 40 hectares of urban wilderness, and generous lots, all
              inside the City of Vancouver. For buyers who value space and
              nature, this is one of the smartest buys in the city.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.2M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">18-Hole</p>
              <p className="text-xs text-warm-500 mt-1">Fraserview Golf</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">40 ha</p>
              <p className="text-xs text-warm-500 mt-1">Crowley Park</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Victoria-Fraserview" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Victoria-Fraserview Vancouver: River Views & Real Estate Guide",
            description:
              "An insider guide to living in Victoria-Fraserview, Vancouver. Fraser River views, Fraserview Golf Course, Everett Crowley Park, and one of south Vancouver's most underrated residential neighbourhoods.",
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
