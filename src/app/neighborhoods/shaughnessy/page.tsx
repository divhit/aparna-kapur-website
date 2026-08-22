import type { Metadata } from "next";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import Link from "next/link";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import MarketPriceLinks from "@/components/market/MarketPriceLinks";

export const metadata: Metadata = {
  title: "Shaughnessy Vancouver | Real Estate Guide",
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
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Shaughnessy", href: "/neighborhoods/shaughnessy" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/neighborhoods/shaughnessy.webp')",
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
            The Canadian Pacific Railway built Shaughnessy in 1907 for
            Vancouver&apos;s elite, and it has never relinquished that status.
            Curving, tree-canopied boulevards were designed to discourage
            through traffic. Lots exceed 33,000 square feet. The homes are
            Tudor manors, Georgian estates, and Arts &amp; Crafts mansions
            with formal gardens and original carriage houses. Over 120
            properties carry heritage designation across two conservation areas.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            No shops, no restaurants, no commercial streets. That is entirely
            the point. VanDusen Botanical Garden (22 hectares) sits on the
            southern boundary. South Granville&apos;s gallery row lines the
            eastern edge. York House, Little Flower Academy, and Vancouver
            College are all minutes away. Residents include multi-generational
            Vancouver families, international buyers, business leaders, and
            diplomats.
          </p>

          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Nothing compares to walking a buyer through a First
              Shaughnessy estate for the first time.&rdquo;
            </p>
          </blockquote>

          <p className="text-warm-700 leading-relaxed mb-6">
            Vancouver&apos;s most expensive residential neighbourhood. The
            benchmark reads <strong>$3.5M+</strong>, but that understates
            reality with virtually no condo or townhome inventory. First
            Shaughnessy (the original CPR enclave around The Crescent) sees
            estates sell for <strong>$8M to $25M+</strong> on 15,000- to
            33,000-square-foot lots. Second Shaughnessy heritage homes
            run <strong>$4M to $10M</strong>. Contemporary rebuilds range
            from <strong>$5M to $12M+</strong>. The market moves slowly.
            Many top homes sell privately, never hitting MLS. An agent with
            relationships here is essential.
          </p>

          <p className="text-warm-700 leading-relaxed mb-6">
            Not a transit neighbourhood. Most residents drive; the curving
            streets are part of what keeps it peaceful. Downtown is 15 to 20
            minutes by car. South Granville is walkable from Second
            Shaughnessy. Kerrisdale Village lies to the southwest. The
            tree-canopied streets themselves are among Vancouver&apos;s best
            for walking.
          </p>

          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Vancouver&apos;s most prestigious
              address. Irreplaceable heritage architecture, cathedral tree
              canopies, and lots measured in fractions of acres. Not for
              everyone. Not meant to be.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">
                {NEIGHBOURHOODS["shaughnessy"].avgPrice}
              </p>
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
      <MarketPriceLinks slug="shaughnessy" />
    </>
  );
}
