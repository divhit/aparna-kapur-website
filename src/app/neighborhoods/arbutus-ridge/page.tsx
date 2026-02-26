import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Arbutus Ridge Vancouver | Greenway Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Arbutus Ridge, Vancouver. The Arbutus Greenway, heritage homes, Quilchena Park, top schools, and what makes this quiet west-side neighbourhood a hidden gem between Kerrisdale and Shaughnessy.",
  keywords: [
    "Arbutus Ridge Vancouver",
    "Arbutus Ridge real estate",
    "Arbutus Ridge homes for sale",
    "Arbutus Greenway",
    "Arbutus Village shopping",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Arbutus Ridge?",
    answer:
      "The composite benchmark is around $2.2M. Detached homes range from $2.5M to $4.5M+ on generous lots. Condos near Arbutus Village start around $600K, and a small but growing number of townhomes run $1.2M to $1.8M.",
  },
  {
    question: "What is the Arbutus Greenway?",
    answer:
      "A 9-kilometre car-free pathway built on a former rail corridor, running directly through the neighbourhood. It connects Kitsilano in the north to the Fraser River in the south — perfect for walking, jogging, and cycling. It has community gardens, public art, and native plantings along the way.",
  },
  {
    question: "What schools are near Arbutus Ridge?",
    answer:
      "Quilchena Elementary is the well-regarded neighbourhood school. Prince of Wales Secondary is one of Vancouver's highest-performing public high schools, with a popular mini school program. Nearby private options include Crofton House, St. George's, and Vancouver College.",
  },
];

const highlights = [
  { emoji: "\u{1F6B6}", title: "Arbutus Greenway", desc: "9 km of car-free pathway through the neighbourhood. Walk to Kits, cycle to Marpole, jog to the river — all off-road." },
  { emoji: "\u{1F333}", title: "Quilchena Park", desc: "Playing fields, running track, tennis courts, and playgrounds. The neighbourhood's outdoor living room for families and athletes." },
  { emoji: "\u{1F3EB}", title: "Prince of Wales Secondary", desc: "One of Vancouver's top public high schools. The mini school program alone draws families to this catchment." },
  { emoji: "\u{1F6CD}\uFE0F", title: "Arbutus Village", desc: "Groceries, pharmacy, cafes, and restaurants in a modern centre. Everything you need without leaving the neighbourhood." },
  { emoji: "\u{1F3E0}", title: "Estate-Sized Lots", desc: "Some of the largest residential lots on the west side. Mature gardens, deep setbacks, and a genuine sense of space." },
  { emoji: "\u{1F4CD}", title: "Between Kerrisdale & Shaughnessy", desc: "Borrow the best of both neighbours: Kerrisdale Village to the south, South Granville galleries to the east." },
];

const properties = [
  { type: "Detached", range: "$2.5M – $4.5M+", note: "Large lots. Heritage, mid-century & custom builds." },
  { type: "Townhomes", range: "$1.2M – $1.8M", note: "Growing supply near Arbutus Village." },
  { type: "Condos", range: "$600K – $1.2M", note: "Limited. Low & mid-rise near the village." },
];

const data = NEIGHBOURHOODS["arbutus-ridge"];

export default async function ArbutusRidgePage() {
  const pois = await fetchNeighbourhoodPOIs(data.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Arbutus Ridge</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Arbutus Ridge
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$2.2M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">93</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">9 km</p>
              <p className="text-xs text-warm-500 mt-1">Arbutus Greenway</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Arbutus Ridge is the quiet achiever of Vancouver&apos;s west side. Tucked between the prestige of Shaughnessy and the village charm of Kerrisdale, it flies under the radar while offering some of the largest residential lots and highest walk scores in the area. The 9-kilometre Arbutus Greenway cuts right through the heart of it — a car-free corridor of joggers, cyclists, and neighbours walking their dogs that has become one of the city&apos;s most loved urban trails.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The streets are lined with towering maples and chestnuts, the homes are a handsome mix of mid-century estates and contemporary rebuilds, and the pace of life is decidedly unhurried. Arbutus Village covers the daily essentials, Prince of Wales Secondary is one of the best public high schools in BC, and you can walk to Kerrisdale Village or South Granville in minutes. It&apos;s the kind of neighbourhood where families put down roots and stay for generations.
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
            boundaryName="Arbutus Ridge"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Arbutus Ridge Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Arbutus Ridge Special
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
