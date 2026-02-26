import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Kitsilano Vancouver | Beach Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Kitsilano, Vancouver. Beach lifestyle, real estate prices, West 4th Avenue dining, schools, transit, and what makes Kits one of Vancouver's most loved neighbourhoods.",
  keywords: [
    "Kitsilano Vancouver",
    "Kitsilano real estate",
    "Kitsilano homes for sale",
    "Kitsilano Beach",
    "West 4th Avenue Vancouver",
  ],
};

const data = NEIGHBOURHOODS["kitsilano"];

export default async function KitsilanoPage() {
  const pois = await fetchNeighbourhoodPOIs(data.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
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
            <span className="text-teal-200">Kitsilano</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Kitsilano
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Where beach culture, cafe culture, and cycling culture collide.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            I tell people: if you want to understand why everyone moves to
            Vancouver, spend one Tuesday evening in Kitsilano. The sun drops
            behind the mountains, someone is still playing beach volleyball at
            Kits Beach, the patios on West 4th are humming, and a cyclist rolls
            past with a surfboard under one arm. It doesn&apos;t feel like
            showing off. It just feels like a regular night.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            Locals call it &ldquo;Kits&rdquo; and it&apos;s the neighbourhood
            that somehow balances being one of Vancouver&apos;s most popular
            areas without losing its soul. The mornings start with yoga and
            strong coffee. By afternoon, people are on the beach or in one of the
            dozens of independent shops along West 4th and Broadway. In the
            evening, it&apos;s farm-to-table dinners and sunset walks along the
            seawall.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            The architecture is part of the charm — a genuine mix of 1940s
            craftsman bungalows, heritage conversions, and newer low-rise condos.
            No towers. No cookie-cutter developments. The tree-lined streets feel
            established and lived-in, not manufactured. It skews younger than
            most of the west side, with tech workers, creatives, and young
            families drawn by the energy and the fact that you can walk to the
            beach in flip-flops.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Kits Beach, three blocks of West 4th, and the Burrard
              Bridge bike lane — that&apos;s the holy trinity for anyone moving
              here.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Kitsilano"
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
            Kitsilano is not cheap — but it&apos;s not Shaughnessy either. The
            composite benchmark sits around <strong>$1.25M</strong>, which in
            Vancouver terms means you actually have options depending on what
            you&apos;re after. Condos are the most common entry point, running{" "}
            <strong>$550K to $1.2M</strong> for a well-located one- or
            two-bedroom in a low-rise near the beach or Broadway. Townhomes in
            heritage conversions go for <strong>$1.2M to $1.8M</strong> and
            they&apos;re increasingly popular with young families who want more
            space without leaving the neighbourhood.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Detached homes are rare and coveted — craftsman bungalows and
            character homes start around <strong>$2M</strong> and can push past{" "}
            <strong>$4M</strong> if you&apos;re close to the water. The ones
            near Kits Beach almost never hit the open market. With the Broadway
            Subway extension opening in 2026, properties along the corridor are
            seeing extra attention from investors and end-users alike.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            This is a neighbourhood built for bikes and walking. Dedicated lanes
            get you downtown via the Burrard Bridge in about 15 minutes, and the
            seaside route to UBC is one of the best urban rides in the country.
            The 99 B-Line on Broadway is one of the busiest bus routes in North
            America — and the new Broadway Subway will transform that corridor
            with rapid transit access. Walk score: 88. You won&apos;t need your
            car most days.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Tech workers from the Broadway corridor offices. Yoga instructors.
            Young couples saving for their first condo. Families who don&apos;t
            want to leave the west side but want something with more personality
            than Dunbar. Retirees who&apos;ve lived here since the &apos;70s and
            aren&apos;t going anywhere. It&apos;s one of the more
            age-diverse neighbourhoods in Vancouver — the only thing everyone
            has in common is they like being outdoors and they like good coffee.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Kitsilano is Vancouver&apos;s most
              liveable neighbourhood for people who want beach access, walkable
              streets, and a genuine community — without the price tag of Point
              Grey or the density of downtown. If your ideal day involves morning
              coffee, a bike commute, and sunset at the beach, this is the one.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.25M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">88</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">3</p>
              <p className="text-xs text-warm-500 mt-1">Beaches</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Kitsilano" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Kitsilano Vancouver — Beach Living & Real Estate Guide",
            description:
              "An insider guide to living in Kitsilano, Vancouver. Beach lifestyle, real estate prices, and what makes Kits one of Vancouver's most loved neighbourhoods.",
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
