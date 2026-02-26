import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Dunbar-Southlands Vancouver | Family Homes & Village Living Guide 2026",
  description:
    "Your quick guide to Dunbar-Southlands, Vancouver. Family homes, Pacific Spirit Park, Dunbar Village shopping, top schools, equestrian Southlands, and what makes this neighbourhood Vancouver's best-kept family secret.",
  keywords: [
    "Dunbar-Southlands Vancouver",
    "Dunbar real estate",
    "Dunbar homes for sale",
    "Dunbar Village",
    "Pacific Spirit Park homes",
  ],
};

const faqs = [
  {
    question: "Is Dunbar-Southlands good for families?",
    answer:
      "It's one of the best family neighbourhoods in Vancouver. Top-rated schools (Lord Byng Secondary, Dunbar Elementary), 763 hectares of Pacific Spirit Park trails, a charming village on Dunbar Street, and quiet tree-lined streets with spacious homes. Strong parent networks and a genuine community feel.",
  },
  {
    question: "How much does a home cost in Dunbar-Southlands?",
    answer:
      "The composite benchmark is around $2.5M. Detached homes dominate at $2.5M to $5M+, with Southlands equestrian properties even higher. Condos near Dunbar Village start around $700K, and townhomes run $1.3M to $2M.",
  },
  {
    question: "What makes Southlands different from Dunbar?",
    answer:
      "Southlands is the southern portion between SW Marine Drive and the Fraser River — think large acreage properties, horse stables, and a genuinely pastoral atmosphere. It's one of the only places in urban Vancouver where horseback riding is part of daily life. Very different from the village-oriented Dunbar to the north.",
  },
];

const highlights = [
  { emoji: "\u{1F332}", title: "Pacific Spirit Park", desc: "763 hectares of old-growth forest with 73 km of trails — hiking, running, cycling, and horseback riding right next door." },
  { emoji: "\u{1F6CD}\uFE0F", title: "Dunbar Village", desc: "Indie bookstores, beloved cafes, Saturday farmers' market, and a Safeway. A genuine small-town high street in the city." },
  { emoji: "\u{1F40E}", title: "Southlands Equestrian", desc: "Horse paddocks, stables, and riding trails in an urban neighbourhood. One of the only places in Vancouver where this exists." },
  { emoji: "\u{1F3EB}", title: "Lord Byng Secondary", desc: "Consistently ranked among BC's best public high schools. The mini school program is a major draw for families." },
  { emoji: "\u{1F3E1}", title: "Spacious Character Homes", desc: "Generous lots, deep setbacks, mature gardens. The kind of space that's increasingly rare in Vancouver." },
  { emoji: "\u{1F393}", title: "10 Min to UBC", desc: "Faculty families love the proximity. Bus routes run direct to campus, and Pacific Spirit trails connect you on foot." },
];

const properties = [
  { type: "Detached", range: "$2.5M – $5M+", note: "Large lots. Character homes & modern rebuilds." },
  { type: "Townhomes", range: "$1.3M – $2.0M", note: "Near Dunbar Village. Sought after by families." },
  { type: "Condos", range: "$700K – $1.2M", note: "Limited. Low-rise near the village strip." },
];

const data = NEIGHBOURHOODS["dunbar-southlands"];

export default async function DunbarSouthlandsPage() {
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
            <span className="text-teal-200">Dunbar-Southlands</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Dunbar-Southlands
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$2.5M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">10 min</p>
              <p className="text-xs text-warm-500 mt-1">To UBC</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">763 ha</p>
              <p className="text-xs text-warm-500 mt-1">Pacific Spirit Park</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Dunbar-Southlands is where Vancouver families go when they want space, nature, and community without giving up the west side. The northern half centres around Dunbar Village — a charming high street of indie shops, cafes, and a Saturday farmers&apos; market where you&apos;ll bump into every neighbour you know. The southern half, Southlands, is something else entirely: acreage properties, horse paddocks, and a pastoral calm that feels like a different province.
          </p>
          <p className="text-warm-600 leading-relaxed">
            Pacific Spirit Park&apos;s 763 hectares of rainforest wraps around the western edge, and UBC is a 10-minute drive or bus ride away. Lord Byng Secondary is one of the best public high schools in BC. The streets are wide, the lots are generous, and kids still ride bikes to the village after school. If that sounds like a clich&eacute;, spend a Saturday morning here — it really is like that.
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
            boundaryName="Dunbar-Southlands"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Dunbar-Southlands Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Dunbar-Southlands Special
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
