import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

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

const faqs = [
  {
    question: "How much does a home cost in Victoria-Fraserview?",
    answer:
      "The composite benchmark is around $1.2M. Detached homes range from $1.3M to $1.8M, with river-view properties commanding a premium. Condos start at $450K and townhomes run $800K to $1.1M. Significantly more space per dollar than the west side.",
  },
  {
    question: "Are there actual river views?",
    answer:
      "Yes. Homes on higher ground in the southern part of the neighbourhood can have striking Fraser River and mountain views — especially at sunset. The golf course and Riverfront Park also give everyone public access to the waterfront.",
  },
  {
    question: "Is Victoria-Fraserview good for families?",
    answer:
      "It is a natural family neighbourhood. David Thompson Secondary, multiple elementary schools, Everett Crowley Park with its hiking trails, and the nearby Killarney Community Centre with pool and ice rink. Quiet streets, big lots, and a pace of life that suits families perfectly.",
  },
];

const highlights = [
  { emoji: "🌊", title: "Fraser River Views", desc: "One of the few Vancouver neighbourhoods where homes can have river and mountain views. Spectacular sunsets from the south-facing slopes." },
  { emoji: "⛳", title: "Fraserview Golf Course", desc: "Public 18-hole championship course with river views. One of the Lower Mainland's finest — and it doubles as a massive green space for the neighbourhood." },
  { emoji: "🌲", title: "Everett Crowley Park", desc: "40 hectares of trails, meadows, and forest. Panoramic views of the city, river, and North Shore mountains from a reclaimed urban wilderness." },
  { emoji: "🏡", title: "Space to Breathe", desc: "Generous lot sizes, wide streets, mature trees. The kind of elbow room that is increasingly rare in Vancouver's housing market." },
  { emoji: "🍜", title: "Victoria Drive Eats", desc: "Dim sum, pho, curry, Filipino bakeries — the food along Victoria Drive is authentic, affordable, and worth the trip from anywhere in the city." },
  { emoji: "🌉", title: "Knight Street Bridge", desc: "Quick access to Richmond, YVR, and Highway 99. Joyce-Collingwood SkyTrain is a short bus ride north for rapid transit downtown." },
];

const properties = [
  { type: "Detached", range: "$1.3M – $1.8M", note: "Dominant type. River-view lots at a premium." },
  { type: "Townhomes", range: "$800K – $1.1M", note: "Newer builds. Popular with young families." },
  { type: "Condos", range: "$450K – $700K", note: "Select newer developments on Victoria Dr." },
];

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
            backgroundImage: "url('https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Victoria-Fraserview</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Victoria-Fraserview
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.2M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">River</p>
              <p className="text-xs text-warm-500 mt-1">Views Available</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">18-Hole</p>
              <p className="text-xs text-warm-500 mt-1">Fraserview Golf</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Victoria-Fraserview is the neighbourhood that makes out-of-towners do a double take: Fraser River views, a championship golf course, 40 hectares of urban wilderness at Everett Crowley Park — and you are still inside the City of Vancouver. It is one of the most underrated residential pockets in the entire Lower Mainland.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The streets are wide and quiet, the lots are generous, and the pace of life is gentler than the city&apos;s denser neighbourhoods. Families from Chinese, South Asian, Filipino, and Vietnamese backgrounds have put down deep roots here, creating an authentic multicultural community where the food along Victoria Drive is worth a detour and the neighbours actually know each other&apos;s names.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <NeighbourhoodMap
            center={data.center}
            zoom={data.zoom}
            pois={pois.length > 0 ? pois : data.fallbackPOIs}
            boundaryName="Victoria-Fraserview"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Victoria-Fraserview Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Victoria-Fraserview Special
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div key={h.title} className="bg-white rounded-xl p-5 border border-warm-100">
                <p className="text-2xl mb-2">{h.emoji}</p>
                <h3 className="font-medium text-teal-950 text-sm mb-1">{h.title}</h3>
                <p className="text-sm text-warm-600">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Estate at a Glance */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-6 text-center">
            Real Estate at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {properties.map((p) => (
              <div key={p.type} className="bg-warm-50 rounded-xl p-5 text-center">
                <p className="font-serif text-xl text-teal-700 mb-1">{p.range}</p>
                <p className="text-sm font-medium text-teal-950">{p.type}</p>
                <p className="text-xs text-warm-500 mt-2">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-6 text-center">
            Common Questions
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <GetInTouch />

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
