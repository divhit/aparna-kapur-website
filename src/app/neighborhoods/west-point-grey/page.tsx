import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "West Point Grey Vancouver | Beach & Luxury Homes Guide 2026",
  description:
    "Your quick guide to West Point Grey, Vancouver. Spanish Banks, Jericho Beach, luxury homes, proximity to UBC, top schools, and what makes this neighbourhood one of Vancouver's most coveted residential addresses.",
  keywords: [
    "West Point Grey Vancouver",
    "West Point Grey real estate",
    "West Point Grey homes for sale",
    "Spanish Banks Vancouver",
    "Jericho Beach",
  ],
};

const data = NEIGHBOURHOODS["west-point-grey"];

export default async function WestPointGreyPage() {
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
            <span className="text-teal-200">West Point Grey</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            West Point Grey
          </h1>
          <p className="mt-3 text-lg text-teal-200/70 max-w-xl">
            Three beaches, character homes on deep lots, and the kind of quiet that only old money can buy.
          </p>
        </div>
      </section>

      {/* Blog Body */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            There&apos;s a stretch of Spanish Banks where the tide goes out so
            far you can walk a quarter-mile on wet sand, the North Shore
            mountains filling the entire horizon. I&apos;ve shown homes in West
            Point Grey where the buyers barely looked at the kitchen — they
            were too busy staring out the back window at that view. And honestly,
            I understood. This is the neighbourhood where Vancouver&apos;s
            coastline and its most established residential character meet, and
            it&apos;s as good as it sounds.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            West Point Grey is old Vancouver in the best possible sense. The
            streets are quiet, the lots are generous, and the homes range from
            lovingly maintained 1930s craftsman bungalows to ambitious
            contemporary builds that took two years and a brave architect. There
            are no towers, no chain restaurants, no rush. Saturday mornings mean
            a beach walk before the rest of the city wakes up. Kids grow up
            sailing at the Jericho Sailing Centre and cycling the waterfront
            path to Kits.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            The 10th Avenue corridor has a small cluster of shops and cafes, but
            this is not a village-centric neighbourhood. People here chose it
            for the land, the light, the proximity to UBC and Pacific Spirit
            Park, and the three spectacular beaches along the northern edge —
            Spanish Banks, Locarno, and Jericho. Lord Byng Secondary is one of
            the top public high schools in BC, and the Folk Music Festival at
            Jericho Beach Park every July is one of those events where you
            realize half the crowd lives within walking distance.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;When clients ask me where Vancouver&apos;s best families
              settle down for good, West Point Grey is always in my first
              three.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="West Point Grey"
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
            This is a detached-home neighbourhood through and through. The
            composite benchmark is around <strong>$2.3M</strong>, but that
            figure is misleading because the few condos and townhomes in the
            area pull it down. What you&apos;re really looking at for a
            single-family home is <strong>$2.5M to $6M+</strong>, depending on
            lot size, condition, and whether you can see the ocean. A character
            Tudor on a 50-foot lot off West 8th might come in around $3M. A
            contemporary rebuild on a double lot with water views? That&apos;s
            $5M to $6M territory, and I&apos;ve seen them go higher.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            There is a limited supply of condos near 10th and Alma, running{" "}
            <strong>$600K to $1.3M</strong> — these are older low-rise buildings
            that appeal to downsizers and UBC faculty who want to stay close to
            campus. Townhomes are scarce at <strong>$1.2M to $2M</strong> and
            extremely sought after when they appear. The market here is patient:
            families buy, renovate, and stay for decades. Turnover is low, which
            means inventory is always tight and well-priced homes sell quickly.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            UBC is five minutes west through Pacific Spirit Park. Downtown is 20
            to 25 minutes by car — faster outside rush hour, slower during it.
            Several bus routes run along West 4th, West 10th, and West Broadway
            connecting to the broader transit network. The waterfront cycling
            path is one of the best in the city, connecting seamlessly to Kits,
            the Burrard Bridge, and Stanley Park. Most families here have two
            cars but use them less than they expected — once you settle into the
            beach-and-park rhythm, the need to go anywhere else fades.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            UBC professors and deans who want to walk to work through the
            forest. Established families who want Lord Byng catchment without
            the Shaughnessy price tag. Couples who sailed at Jericho as kids
            and came back to raise their own children here. Executives who could
            live anywhere and chose the quietest, most beautiful corner of
            the west side. This is a neighbourhood of lifers — people who found
            exactly what they were looking for and stopped searching.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> West Point Grey is for buyers who
              want space, beauty, and permanence. Three of Vancouver&apos;s best
              beaches at your feet, UBC and Pacific Spirit Park as your
              backyard, top schools, and a community that values quiet living
              over showing off. If you want a home your family will keep for 30
              years, start here.
            </p>
          </div>
        </div>
      </article>

      {/* Quick Stats */}
      <section className="bg-warm-50 border-y border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$2.3M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">3</p>
              <p className="text-xs text-warm-500 mt-1">Beaches</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">5 min</p>
              <p className="text-xs text-warm-500 mt-1">To UBC</p>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="West Point Grey" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "West Point Grey Vancouver — Beach & Luxury Homes Guide",
            description:
              "An insider guide to living in West Point Grey, Vancouver. Spanish Banks, character homes, top schools, and what makes this one of Vancouver's most coveted residential addresses.",
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
