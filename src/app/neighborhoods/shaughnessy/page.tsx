import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

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

const data = NEIGHBOURHOODS["shaughnessy"];

export default async function ShaughnessyPage() {
  const pois = await fetchNeighbourhoodPOIs(data.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
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
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            The first time I drove a client through First Shaughnessy, they
            asked me to slow down. Not because of the speed limit — because they
            couldn&apos;t believe what they were seeing. A Tudor manor with a
            slate roof and a formal rose garden. A Georgian estate with a
            circular drive and copper beech trees older than the city itself. A
            street so quiet and canopied it felt like driving through a private
            park in the English countryside. Shaughnessy does that to people. It
            stops you mid-sentence.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            Shaughnessy is Vancouver&apos;s old money — the neighbourhood the
            Canadian Pacific Railway built in 1907 for the city&apos;s elite,
            and it has never really relinquished that title. The curving,
            tree-canopied boulevards were deliberately designed to discourage
            through traffic. The lots are absurdly generous by Vancouver
            standards — some exceed 33,000 square feet. The homes are genuine
            architectural masterpieces: Tudor manors, Georgian estates, Arts
            &amp; Crafts mansions with formal gardens and original carriage
            houses. Over 120 properties carry heritage designation across two
            conservation areas.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            There are no shops, no restaurants, no commercial streets inside
            Shaughnessy — and that is entirely the point. This is a
            neighbourhood that was designed for privacy and beauty, and it has
            maintained both for over a century. VanDusen Botanical Garden sits
            on the southern boundary with its 22 hectares of curated plantings
            and seasonal light festivals. South Granville&apos;s gallery row
            and boutiques line the eastern edge. York House, Little Flower
            Academy, Vancouver College, and a cluster of the city&apos;s best
            private schools are all minutes away. Shaughnessy doesn&apos;t need
            to prove anything to anyone.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;I&apos;ve sold homes all over the west side, but nothing
              compares to walking a buyer through a First Shaughnessy estate
              for the first time. The architecture alone takes your
              breath away.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Shaughnessy"
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
            Let me be direct: this is Vancouver&apos;s most expensive
            residential neighbourhood. The benchmark is listed at{" "}
            <strong>$3.5M+</strong>, but that figure dramatically understates
            reality because there is virtually no condo or townhome inventory to
            bring the average down. First Shaughnessy — the original CPR enclave
            around The Crescent — is where the grandest estates sit, and they
            sell for <strong>$8M to $25M+</strong>. These are the properties
            that make international headlines. Lots can run 15,000 to 33,000
            square feet, and the homes sitting on them are irreplaceable pieces
            of architectural history.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Second Shaughnessy, extending south, offers substantial heritage
            homes on generous lots at <strong>$4M to $10M</strong>. Still
            Shaughnessy, still beautiful, but slightly more accessible.
            Contemporary rebuilds on Shaughnessy-sized lots — where buyers tear
            down a lesser home and build modern — range from{" "}
            <strong>$5M to $12M+</strong>. The market moves slowly and quietly
            here. Many of the finest homes sell privately, never hitting MLS.
            Working with an agent who has relationships in this neighbourhood
            isn&apos;t a nice-to-have — it&apos;s essential.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Shaughnessy is not a transit neighbourhood — most residents drive,
            and the curving streets are part of what keeps it peaceful. Downtown
            is 15 to 20 minutes by car. South Granville&apos;s shops and
            restaurants are along the eastern edge, walkable from most of Second
            Shaughnessy. Kerrisdale Village is to the southwest. The tree-canopied
            streets themselves are genuinely among the best walking in Vancouver,
            even if you&apos;re just walking for the beauty of it. VanDusen
            Garden, with its 22 hectares, is right on the southern boundary for
            anyone who wants a green escape without leaving the neighbourhood.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Multi-generational Vancouver families who have called Shaughnessy
            home for decades. International buyers who recognize estate-quality
            architecture and are willing to pay for it. Business leaders and
            diplomats who want privacy and permanence. Families who prioritize
            the best private schools in the city and want a stately home to
            match. This is a small, close-knit community — neighbours know each
            other, heritage preservation is taken seriously, and the quiet
            confidence of the neighbourhood attracts people who have nothing
            left to prove.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Shaughnessy is Vancouver&apos;s
              most prestigious address, and it earns that distinction honestly.
              If you want irreplaceable heritage architecture, cathedral tree
              canopies, lots measured in fractions of acres, and a level of
              privacy and beauty that simply doesn&apos;t exist elsewhere in
              the city — this is it. It&apos;s not for everyone. It&apos;s not
              meant to be.
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
              "Shaughnessy Vancouver — Heritage Mansions & Estate Living Guide",
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
