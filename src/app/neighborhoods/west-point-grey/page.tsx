import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

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

const faqs = [
  {
    question: "How much does a home cost in West Point Grey?",
    answer:
      "The composite benchmark is around $2.3M. Detached homes dominate and typically range from $2.5M to $6M+, with beachside and ocean-view properties at the top. A limited number of condos ($600K-$1.3M) and townhomes ($1.2M-$2M) offer more accessible entry points.",
  },
  {
    question: "What beaches are in West Point Grey?",
    answer:
      "Three of Vancouver's best: Spanish Banks (massive sandy flats, kiteboarding, volleyball), Locarno Beach (quieter, great for families), and Jericho Beach (sailing centre, kayaking, home of the Folk Music Festival). Together they form one of Canada's finest stretches of urban waterfront.",
  },
  {
    question: "How far is West Point Grey from UBC and downtown?",
    answer:
      "About 5 minutes to UBC by car or bus, and 20-25 minutes to downtown. Pacific Spirit Park is your western boundary, and the UBC campus is just beyond. Ideal for families splitting commutes between the university and the city centre.",
  },
];

const highlights = [
  { emoji: "\u{1F3D6}\uFE0F", title: "Three Stunning Beaches", desc: "Spanish Banks, Locarno, and Jericho — sandy shorelines, mountain panoramas, and sunset views that never get old." },
  { emoji: "\u26F5", title: "Jericho Sailing Centre", desc: "Sailing, windsurfing, kayaking, and paddleboarding right in the neighbourhood. Kids grow up on the water here." },
  { emoji: "\u{1F3E1}", title: "Character Homes", desc: "Craftsman bungalows, Tudor revivals, and contemporary customs on generous lots — no cookie-cutter subdivisions." },
  { emoji: "\u{1F393}", title: "5 Min to UBC", desc: "Pacific Spirit Park is your backyard, and one of the world's top universities is right next door. Faculty families love it." },
  { emoji: "\u{1F3EB}", title: "Lord Byng Secondary", desc: "One of BC's top-performing public high schools, plus Queen Mary Elementary and West Point Grey Academy nearby." },
  { emoji: "\u{1F6B4}", title: "Waterfront Cycling", desc: "The seaside path connects to Kits, downtown, and Stanley Park. A scenic, car-free commute that feels like a holiday." },
];

const properties = [
  { type: "Detached", range: "$2.5M – $6M+", note: "Dominant type. Character homes & ocean views." },
  { type: "Condos", range: "$600K – $1.3M", note: "Limited. Low-rise near 10th Ave & Alma." },
  { type: "Townhomes", range: "$1.2M – $2.0M", note: "Small inventory. High demand from families." },
];

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
            backgroundImage: "url('https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">West Point Grey</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            West Point Grey
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
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

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            West Point Grey is where Vancouver&apos;s coastline meets its most established residential character. Three spectacular beaches line the northern edge — Spanish Banks, Locarno, Jericho — and on a clear day the views stretch across English Bay to the North Shore mountains and beyond. Saturday mornings here mean a beach walk before the rest of the city wakes up.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The streets are quiet, the lots are generous, and the homes range from lovingly kept craftsman bungalows to ambitious contemporary builds. UBC is five minutes west through Pacific Spirit Park, Lord Byng Secondary is one of the best public high schools in BC, and the Jericho Sailing Centre means kids literally grow up on the water. It&apos;s the kind of neighbourhood where people put down roots and stay for decades — and it&apos;s easy to see why.
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
            boundaryName="West Point Grey"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes West Point Grey Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes West Point Grey Special
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
