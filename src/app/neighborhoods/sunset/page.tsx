import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Sunset Vancouver | Punjabi Market & Real Estate Guide 2026",
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

const data = NEIGHBOURHOODS["sunset"];

export default async function SunsetPage() {
  const pois = await fetchNeighbourhoodPOIs(data.center);

  return (
    <>
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
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            The first time I showed a home in Sunset, my client stood in the
            backyard for a full minute without speaking. Then she said,
            &ldquo;Wait, this is still Vancouver?&rdquo; I get it. After months
            of touring 600-square-foot condos and postage-stamp patios, walking
            onto a proper lot with a mature cherry tree, a vegetable garden, and
            room for kids to actually run around &mdash; it feels like
            cheating. But that&apos;s Sunset. Real houses, real yards, real
            neighbourhood. No gimmick.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            Sunset is unpretentious in the best possible way. The streets are
            quiet, the gardens are immaculate &mdash; you&apos;ll see everything
            from Sikh families tending their vegetable patches to Chinese
            grandparents doing tai chi in the park. The Punjabi Market on Main
            Street between 48th and 51st is one of North America&apos;s first
            South Asian commercial districts, established in the 1970s. Sweet
            shops, sari stores, jewellers, and restaurants still anchor the
            strip. It&apos;s a little quieter than it was in its heyday, but
            revitalization plans are underway, and the cultural significance
            of this place cannot be overstated.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Beyond the market, Sunset is the kind of neighbourhood where
            people actually use their front porches. Kids walk to school.
            The Sunset Community Centre anchors daily routines. On weekends
            you might catch the smell of fresh naan from one house, com tam
            from the next, and Chinese noodles from across the lane. No one
            is performing multiculturalism here &mdash; they&apos;re just
            living it, and they&apos;ve been doing it for decades. Churchill
            Secondary draws families from across the city for its IB program
            and strong athletics, and that school alone has kept many a family
            rooted in this neighbourhood long after they could have
            &ldquo;moved up.&rdquo;
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;Sunset is where you find the backyard, the mature tree,
              and the neighbourhood that actually feels like a neighbourhood
              &mdash; all within city limits.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Sunset"
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
            The composite benchmark sits around <strong>$1.3M</strong>, and
            here is what that actually means: you are buying into a
            neighbourhood that is overwhelmingly detached homes on generous
            lots. This is not condo territory. Detached homes run{" "}
            <strong>$1.4M to $1.9M</strong> for solid post-war construction on
            lots that give you real elbow room &mdash; 33-foot frontages are
            standard, and many push wider. The gardens, the garages, the
            laneways &mdash; it is the kind of space that barely exists
            elsewhere in the city at this price.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Condos are less common here, but where they exist along major
            corridors they start around <strong>$450K to $650K</strong>.
            The real story, though, is laneway houses. Sunset is one of
            Vancouver&apos;s most active areas for laneway construction, and
            the numbers make sense: add a laneway suite, rent it for{" "}
            <strong>$1,800 to $2,500 per month</strong>, and suddenly your
            carrying costs look very different. I&apos;ve worked with families
            who use the laneway for aging parents or adult children &mdash;
            multigenerational living on one lot, which is how much of this
            neighbourhood has always operated. Langara-49th Station on the
            Canada Line is a short bus ride away, putting you 20 minutes from
            downtown and 15 from YVR.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Sunset is honest about what it is: a residential neighbourhood that
            works best if you have a car, though it is far from isolated.
            Langara-49th Station on the Canada Line is the nearest rapid
            transit, reachable by a quick bus ride or a 10-minute drive. Knight
            Street Bridge connects you directly to Richmond and Highway 99.
            Bus routes along Main, Fraser, and 49th provide reliable east-west
            and north-south service. The walk score of 75 reflects a
            neighbourhood built for living in, not rushing through &mdash;
            most errands are doable on foot, but you will drive for bigger
            trips.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Families who want space. Full stop. Sikh and South Asian families
            with roots in the Punjabi Market going back to the &apos;70s.
            Chinese families who moved here for the lots and stayed for the
            schools. Vietnamese, Filipino, and Korean households drawn by
            affordable home prices and the community feel. Young families
            who are done with renting a one-bedroom and want their kids to
            have a backyard. This is also increasingly a neighbourhood for
            multigenerational living &mdash; grandparents in the main house,
            the next generation in the laneway, everyone sharing the garden.
            It is not trendy. It is deeply, functionally real.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> If your priority is space &mdash;
              a real lot, a real backyard, a real neighbourhood with deep
              cultural roots &mdash; Sunset delivers in a way that very few
              Vancouver neighbourhoods can at this price point. It will never
              be Kitsilano or Yaletown. It does not want to be. That&apos;s
              the whole point.
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
              "Sunset Vancouver — Punjabi Market & Real Estate Guide",
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
