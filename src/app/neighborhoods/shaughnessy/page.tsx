import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";

export const metadata: Metadata = {
  title: "Shaughnessy Vancouver | Heritage Mansions & Estate Living Guide 2026",
  description:
    "Your quick guide to Shaughnessy, Vancouver. Heritage mansions, VanDusen Botanical Garden, tree-lined boulevards, top private schools, and what makes this Vancouver's most prestigious residential address.",
  keywords: [
    "Shaughnessy Vancouver",
    "Shaughnessy real estate",
    "Shaughnessy mansions",
    "Shaughnessy heritage homes",
    "VanDusen Botanical Garden",
  ],
};

export default function ShaughnessyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/shaughnessy.png')",
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
            <span className="text-teal-200">Shaughnessy</span>
          </div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-teal-500/20 text-teal-300 rounded-full mb-3">
            Neighbourhood Snapshot
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Shaughnessy
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Heritage mansions, cathedral tree canopies, and deliberate serenity since 1907.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            Shaughnessy is the neighbourhood the Canadian Pacific Railway built
            in 1907 for Vancouver&apos;s elite, and it has never relinquished
            that title. The curving, tree-canopied boulevards were deliberately
            designed to discourage through traffic. Lots are absurdly generous by
            Vancouver standards, some exceeding 33,000 square feet. The homes are
            genuine architectural masterpieces: Tudor manors, Georgian estates,
            Arts &amp; Crafts mansions with formal gardens and original carriage
            houses. Over 120 properties carry heritage designation across two
            conservation areas.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            There are no shops, no restaurants, no commercial streets inside
            Shaughnessy, and that is entirely the point. This is a neighbourhood
            designed for privacy and beauty. VanDusen Botanical Garden sits on
            the southern boundary with 22 hectares of curated plantings. South
            Granville&apos;s gallery row and boutiques line the eastern edge.
            York House, Little Flower Academy, Vancouver College, and a cluster
            of the city&apos;s best private schools are all minutes away. The
            community is multi-generational Vancouver families, international
            buyers who recognize estate-quality architecture, business leaders,
            and diplomats who want privacy and permanence.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Nothing compares to walking a buyer through a First
              Shaughnessy estate for the first time.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            This is Vancouver&apos;s most expensive residential neighbourhood.
            The benchmark is listed at <strong>$3.5M+</strong>, but that figure
            understates reality because there is virtually no condo or townhome
            inventory. First Shaughnessy, the original CPR enclave around The
            Crescent, is where the grandest estates sell for{" "}
            <strong>$8M to $25M+</strong> on lots of 15,000 to 33,000 square
            feet. Second Shaughnessy offers substantial heritage homes at{" "}
            <strong>$4M to $10M</strong>. Contemporary rebuilds on
            Shaughnessy-sized lots range from <strong>$5M to $12M+</strong>. The
            market moves slowly and quietly. Many of the finest homes sell
            privately, never hitting MLS. Working with an agent who has
            relationships in this neighbourhood is essential.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Shaughnessy is not a transit neighbourhood. Most residents drive, and
            the curving streets are part of what keeps it peaceful. Downtown is
            15 to 20 minutes by car. South Granville&apos;s shops and
            restaurants are along the eastern edge, walkable from most of Second
            Shaughnessy. Kerrisdale Village is to the southwest. The
            tree-canopied streets themselves are among the best walking in
            Vancouver. VanDusen Garden, with its 22 hectares, is right on the
            southern boundary.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Shaughnessy is Vancouver&apos;s most
              prestigious address, with irreplaceable heritage architecture,
              cathedral tree canopies, and lots measured in fractions of acres.
              It is not for everyone, and it is not meant to be.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$3.5M+</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">120+</p>
              <p className="text-xs text-warm-500 mt-1">Heritage Homes</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">22 ha</p>
              <p className="text-xs text-warm-500 mt-1">VanDusen Garden</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Shaughnessy" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Shaughnessy Vancouver: Heritage Mansions & Estate Living Guide",
            description:
              "An insider guide to living in Shaughnessy, Vancouver. Heritage mansions, VanDusen Botanical Garden, tree-lined boulevards, and what makes this Vancouver's most prestigious residential address.",
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
