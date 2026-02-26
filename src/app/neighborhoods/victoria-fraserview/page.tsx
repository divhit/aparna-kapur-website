import type { Metadata } from "next";
import Link from "next/link";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Victoria-Fraserview Vancouver | River Views & Real Estate Guide 2026",
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

const data = NEIGHBOURHOODS["victoria-fraserview"];

export default async function VictoriaFraserviewPage() {
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
            <span className="text-teal-200">Victoria-Fraserview</span>
          </div>
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
          {/* Opening Hook */}
          <p className="text-lg text-warm-700 leading-relaxed mb-6">
            I was showing a property on one of the south-facing streets last
            spring when the seller casually mentioned he&apos;d been watching
            sunsets over the Fraser River from his kitchen window for 22 years.
            Not from a penthouse. Not from a waterfront estate. From a regular
            family home on a regular residential street in south Vancouver. That
            is Victoria-Fraserview in a nutshell &mdash; a neighbourhood that
            quietly punches well above its weight and asks surprisingly little
            for the privilege.
          </p>

          {/* The Vibe */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            The Vibe
          </h2>
          <p className="text-warm-700 leading-relaxed mb-4">
            This is not a neighbourhood that shows up in lifestyle magazines,
            and most of its residents prefer it that way. The streets are wide
            and quiet. The lots are generous &mdash; proper front yards, proper
            backyards, mature trees that have been here longer than most of
            their owners. Families from Chinese, South Asian, Filipino, and
            Vietnamese backgrounds have planted deep roots, and the result is a
            community that is genuinely multicultural without anyone making a
            fuss about it. The food along Victoria Drive is outstanding &mdash;
            dim sum, pho, curry, Filipino bakeries &mdash; and it&apos;s
            priced for locals, not tourists.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Then there are the green spaces, which are frankly remarkable for
            a city neighbourhood. Fraserview Golf Course is an 18-hole public
            championship course with river views that would cost a fortune
            anywhere else &mdash; here, it doubles as a massive green lung
            for the whole area. Everett Crowley Park covers 40 hectares of
            trails, meadows, and reclaimed urban forest with panoramic views
            of the city, the river, and the North Shore mountains. I have
            taken clients to the viewpoint at Crowley Park and watched them
            recalibrate everything they thought they knew about south
            Vancouver.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-10 border-l-4 border-teal-600 pl-6 py-2">
            <p className="text-xl font-serif text-teal-900 italic leading-relaxed">
              &ldquo;River views, 40 hectares of urban wilderness, and a
              public golf course &mdash; all inside city limits, all at prices
              that make the west side look absurd.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Map — embedded mid-article, slightly wider */}
        <div className="max-w-4xl mx-auto px-6 my-12">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Victoria-Fraserview"
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
            The composite benchmark is around <strong>$1.2M</strong>, which
            buys you significantly more space per dollar than anything on the
            west side. This is predominantly a detached-home neighbourhood,
            and houses run from <strong>$1.3M to $1.8M</strong> depending on
            lot size and whether you&apos;ve got one of those coveted
            river-view positions. Properties on higher ground in the southern
            part of the neighbourhood command a premium, and rightly so &mdash;
            the sunset views over the Fraser are genuinely spectacular and
            they do not get old.
          </p>
          <p className="text-warm-600 leading-relaxed mb-6">
            Townhomes have been arriving in newer developments, running{" "}
            <strong>$800K to $1.1M</strong>, and they&apos;re popular with
            young families who want the neighbourhood but don&apos;t need a
            full house yet. Condos along Victoria Drive start at{" "}
            <strong>$450K to $700K</strong> in select newer developments.
            I often tell buyers that Victoria-Fraserview is one of the last
            places in Vancouver where you can buy a detached home with a view
            and not feel like you&apos;re making a financial sacrifice to do
            it. David Thompson Secondary and multiple elementary schools serve
            the area well, and Killarney Community Centre with its pool and
            ice rink is right next door.
          </p>

          {/* Getting Around */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Getting Around
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            I will be honest: this is a neighbourhood where a car helps.
            Joyce-Collingwood SkyTrain is a short bus ride north, giving you
            Expo Line access downtown. Knight Street Bridge is the fast route
            to Richmond, YVR, and Highway 99. Bus service runs along Victoria
            Drive and 49th Avenue. The trade-off for the space and the quiet
            is that you&apos;re not steps from a SkyTrain station &mdash; but
            for families who spend their weekends at the golf course, hiking
            Crowley Park, or grilling in their actual backyard, that
            trade-off tends to feel more than fair.
          </p>

          {/* Who Lives Here */}
          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            Who Lives Here
          </h2>
          <p className="text-warm-700 leading-relaxed mb-6">
            Long-time residents who bought here 20 or 30 years ago and
            cannot imagine living anywhere else. Families with school-age
            kids who chose space over a short commute and have never
            regretted it. Golfers who can walk to one of the Lower
            Mainland&apos;s best public courses. Newcomers from South and
            East Asia who find a familiar cultural landscape and affordable
            entry into homeownership. The neighbours know each other.
            People wave. It&apos;s the kind of place where you borrow a
            ladder and return it with a plate of food. Vancouver at its
            most genuine.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 pt-8 border-t border-warm-200">
            <p className="text-warm-800 leading-relaxed font-medium">
              <strong>Bottom line:</strong> Victoria-Fraserview is the
              neighbourhood that makes out-of-towners do a double take. River
              views, a championship golf course, 40 hectares of urban
              wilderness, generous lots &mdash; and you are still inside the
              City of Vancouver. If you value space, nature, and a community
              that feels like it actually works, this is one of the smartest
              buys in the city.
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
              "Victoria-Fraserview Vancouver — River Views & Real Estate Guide",
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
