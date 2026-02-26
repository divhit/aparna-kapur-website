import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Killarney Vancouver | Community Centre & Real Estate Guide 2026",
  description:
    "Your quick guide to Killarney, Vancouver. Award-winning community centre, Everett Crowley Park, family-friendly real estate, multicultural dining, and southeast Vancouver's best neighbourhood for value-conscious buyers.",
  keywords: [
    "Killarney Vancouver",
    "Killarney real estate",
    "Killarney homes for sale",
    "Killarney Community Centre",
    "Killarney Secondary Vancouver",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Killarney?",
    answer:
      "The composite benchmark is around $1.1M — one of Vancouver's best values. Detached homes range from $1.3M to $1.8M, condos $450K to $750K, and townhomes $800K to $1.1M. You get significantly more space per dollar than west-side alternatives.",
  },
  {
    question: "What makes the Killarney Community Centre so good?",
    answer:
      "Pool, ice rink, fitness centre, gymnasium, and wall-to-wall programming for all ages. It is widely considered one of the best community centres in Vancouver and the social heart of the entire neighbourhood. Families build their routines around it.",
  },
  {
    question: "Is Killarney good for families?",
    answer:
      "One of the best in the city for the price. Killarney Secondary has a renowned performing arts program and 1,800+ students from 60+ cultural backgrounds. The community centre, Everett Crowley Park, and quiet residential streets round it out perfectly.",
  },
];

const highlights = [
  { emoji: "🏊", title: "Best-in-Class Rec Centre", desc: "Pool, ice rink, gym, fitness centre, and year-round programming. Widely considered one of Vancouver's finest community facilities." },
  { emoji: "🎭", title: "Killarney Secondary", desc: "1,800+ students, 60+ cultural backgrounds, and a performing arts program that draws talent from across the city." },
  { emoji: "🌲", title: "Everett Crowley Park", desc: "40 hectares of trails and meadows with panoramic city, river, and mountain views. A hidden gem of southeast Vancouver." },
  { emoji: "🍜", title: "Kingsway Food Scene", desc: "Vietnamese pho, Chinese dim sum, South Asian curries, Filipino bakeries — some of the city's best authentic cooking at local prices." },
  { emoji: "💰", title: "Serious Value", desc: "Benchmark at $1.1M — well below the Vancouver average. Generous lots, good transit, and top community amenities at an accessible price point." },
  { emoji: "🛒", title: "T&T & Champlain Square", desc: "Asian supermarkets, Champlain Square shops, and Metrotown in neighbouring Burnaby just minutes away for bigger trips." },
];

const properties = [
  { type: "Condos", range: "$450K – $750K", note: "Newer builds along major corridors." },
  { type: "Townhomes", range: "$800K – $1.1M", note: "Growing supply. Great for young families." },
  { type: "Detached", range: "$1.3M – $1.8M", note: "1960s–70s homes. Laneway house potential." },
];

const data = NEIGHBOURHOODS["killarney"];

export default async function KillarneyPage() {
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
            <span className="text-teal-200">Killarney</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Killarney
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.1M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">78</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">Top</p>
              <p className="text-xs text-warm-500 mt-1">Community Centre</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Ask any Killarney resident what they love most and they will almost certainly mention the community centre. Pool, rink, gym, wall-to-wall programming — it is genuinely one of Vancouver&apos;s best, and it turns a quiet southeast neighbourhood into a place where everyone knows someone. Morning swim, after-school hockey, weekend fitness class — daily life revolves around it.
          </p>
          <p className="text-warm-600 leading-relaxed">
            Beyond the rec centre, Killarney is a neighbourhood of wide streets, mature trees, and generous lots where families from Chinese, South Asian, Filipino, and Vietnamese backgrounds have built deep roots. Killarney Secondary is one of the city&apos;s largest high schools with a performing arts program that pulls talent citywide. The food along Kingsway is outstanding. And the benchmark price sits at $1.1M — making this one of Vancouver&apos;s strongest value propositions.
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
            boundaryName="Killarney"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Killarney Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Killarney Special
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
