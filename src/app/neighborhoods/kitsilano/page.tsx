import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

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

const faqs = [
  {
    question: "How much does a home cost in Kitsilano?",
    answer:
      "The composite benchmark is around $1.25M. Condos range from $550K to $1.2M, townhomes $1.2M to $1.8M, and detached homes start at $2M and can exceed $4M for beachside properties.",
  },
  {
    question: "What's the lifestyle like in Kits?",
    answer:
      "Beach volleyball at sunset, yoga before work, brunch on West 4th, cycling to downtown over the Burrard Bridge. Kitsilano is Vancouver's most active, outdoor-oriented neighbourhood with a laid-back, health-conscious vibe.",
  },
  {
    question: "Is Kitsilano good for families?",
    answer:
      "Yes. Good public schools (Kitsilano Secondary, Henry Hudson Elementary), safe walkable streets, multiple parks and playgrounds, and Vanier Park's museums make it family-friendly despite its reputation as a young-professional hub.",
  },
];

const highlights = [
  { emoji: "🏖️", title: "Three Beaches", desc: "Kitsilano Beach, Jericho Beach, and access to Spanish Banks — plus Canada's longest outdoor saltwater pool." },
  { emoji: "🍽️", title: "West 4th Avenue", desc: "200+ shops and restaurants from sushi to farm-to-table, surf shops to indie bookstores. Still feels genuinely local." },
  { emoji: "🚲", title: "Cyclist's Paradise", desc: "Dedicated bike lanes everywhere. Cycle to downtown in 15 minutes via the Burrard Bridge or ride to UBC along the seaside." },
  { emoji: "🚇", title: "Broadway Subway Coming", desc: "The new subway extension along Broadway opens 2026, adding rapid transit to an already well-connected neighbourhood." },
  { emoji: "🌳", title: "Vanier Park", desc: "Home to the Museum of Vancouver, Space Centre, and Maritime Museum — plus kite flying with skyline views." },
  { emoji: "🎓", title: "10 Min to UBC", desc: "Close to the University of British Columbia via the 99 B-Line. Great for academic families and students." },
];

const properties = [
  { type: "Condos", range: "$550K – $1.2M", note: "Most common. Low-rise near beach & Broadway." },
  { type: "Townhomes", range: "$1.2M – $1.8M", note: "Growing supply. Heritage conversions popular." },
  { type: "Detached", range: "$2M – $4.5M+", note: "Rare. Craftsman bungalows & character homes." },
];

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
            backgroundImage: "url('https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Kitsilano</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Kitsilano
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
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

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Locals call it &ldquo;Kits&rdquo; and it is the neighbourhood where Vancouver&apos;s beach culture, cafe culture, and cycling culture all collide. Morning coffee on West 4th, a bike ride to the office downtown, sunset volleyball at Kits Beach — that is a real Tuesday here.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The streets are a mix of character homes, low-rise condos, and heritage conversions — no cookie-cutter feel. It skews younger than most of the west side, with tech workers, creatives, and young families drawn by the laid-back energy and the fact that you can walk to the beach in flip-flops. The upcoming Broadway Subway will make it even better connected.
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
            boundaryName="Kitsilano"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Kitsilano Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Kitsilano Special
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
