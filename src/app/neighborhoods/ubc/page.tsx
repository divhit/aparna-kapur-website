import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "UBC Vancouver | Campus Living & Real Estate Guide 2026",
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
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
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
            I remember the first time I drove a client out to UBC for a showing
            in Wesbrook Village. She stepped out of the car, looked around at the
            towering cedars, the mountains across the water, and the students
            cycling past with coffee cups in hand, and said: &ldquo;Wait, people
            actually get to live here?&rdquo; Yes. They do. And once they move in,
            they almost never leave.
          </p>

          <p className="text-warm-700 leading-relaxed mb-4">
            UBC sits on the western tip of the Point Grey peninsula, surrounded
            by ocean on three sides and wrapped in 763 hectares of Pacific Spirit
            Park, old-growth rainforest with 73 kilometres of trails. Morning
            runs happen on soft forest paths. Evening walks end at Spanish Banks
            watching the sun drop behind Vancouver Island. The campus itself
            brings 70,000 people daily, which means world-class lectures, art
            exhibitions at the Belkin Gallery, Thunderbirds athletics, and a
            cultural calendar that rivals downtown&apos;s.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Wesbrook Village is the residential heart, modern, thoughtfully
            planned, and genuinely walkable. There&apos;s a Save-On-Foods, a
            handful of solid restaurants, a community centre, and Norma Rose
            Point Elementary right in the village. You&apos;ll hear a dozen
            languages on a Saturday morning stroll. The vibe is young,
            international, and quietly ambitious, but not pretentious. People
            here chose nature and academia over downtown flash, and they&apos;re
            happy with the trade.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;The 99-year leasehold structure scares off some buyers, and
              honestly, that&apos;s fine. It means less competition for those who
              understand the value.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-4">
            Here&apos;s the thing about buying at UBC: every property sits on a
            99-year prepaid lease from the university. That sounds unusual, but
            for financing and resale it functions almost identically to freehold.
            And the upside? Prices run slightly below comparable west-side
            neighbourhoods, which savvy buyers appreciate. The composite
            benchmark sits around <strong>$1.35M</strong>. Condos are the most
            common entry point, ranging from <strong>$550K to $1.2M</strong> for
            modern builds in Wesbrook Village and Hawthorn Place, clean lines,
            good layouts, and mountain or forest views depending on your floor.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Townhomes are the sweet spot for families, running{" "}
            <strong>$1.3M to $2M</strong> with private outdoor space and enough
            room for kids. Detached homes are extremely limited. We&apos;re
            talking estate-like properties in the University Endowment Lands at{" "}
            <strong>$2.5M to $4.5M+</strong>, and they barely come to market.
            No UBC affiliation is required to buy. Anyone can purchase in
            Wesbrook Village, Hawthorn Place, or Chancellor Place. That
            surprises most people.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            The honest answer: you are at the end of a peninsula, and it can
            feel that way during rush hour. The 99 B-Line express bus runs every
            3 to 5 minutes at peak and reaches Commercial-Broadway SkyTrain in
            about 30 minutes. By car, downtown is 20 to 30 minutes via West 4th
            or SW Marine Drive. The Broadway Subway extension will improve
            transit connections further. Within the campus itself, everything is
            bike-friendly and walkable. Most residents rarely touch their car
            during the week.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            UBC faculty and researchers, obviously, but they&apos;re not the
            majority. International families drawn by the schools and the safety.
            Retirees who traded their Kerrisdale house for a low-maintenance
            condo with forest views. Young professionals who work remotely and
            prioritize nature over nightlife. Graduate students who never quite
            left. The common thread is people who value quality of life over
            convenience. They&apos;ll accept the commute because what they come
            home to is extraordinary.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> UBC is for buyers who want
              nature-immersed west-side living at a slight discount to freehold,
              with world-class amenities on their doorstep. The leasehold
              structure is a feature, not a bug. It keeps the community
              intentional and the prices a touch more accessible. If your ideal
              evening is a trail run through old-growth forest followed by a
              lecture on campus, this is the one.
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
