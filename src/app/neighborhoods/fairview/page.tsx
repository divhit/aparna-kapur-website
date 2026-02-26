import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Fairview Vancouver | Broadway Corridor & Real Estate Guide 2026",
  description:
    "Your quick guide to Fairview, Vancouver. Broadway Plan development, South Granville shopping, Granville Island, transit, and what makes Fairview one of Vancouver's best-connected neighbourhoods.",
  keywords: [
    "Fairview Vancouver",
    "Fairview real estate",
    "Fairview condos for sale",
    "Broadway Plan Vancouver",
    "South Granville Vancouver",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Fairview?",
    answer:
      "The composite benchmark is around $900K. Condos range from $550K to $1.2M, townhomes from $1.1M to $1.8M, and heritage homes south of Broadway start around $1.5M. The Broadway Plan is bringing significant new supply to the area.",
  },
  {
    question: "What is the Broadway Plan and how does it affect Fairview?",
    answer:
      "The Broadway Plan is Vancouver's comprehensive development framework for the Broadway corridor, approved in 2022. It allows for new residential towers, commercial space, and community amenities along the Broadway Subway alignment. For Fairview, this means thousands of new homes and improved infrastructure over the next 20-30 years.",
  },
  {
    question: "Is Fairview good for families?",
    answer:
      "Yes. Emily Carr Elementary, L'Ecole Bilingue (French immersion), and False Creek Elementary serve the area well. The False Creek seawall, Granville Island, Jonathan Rogers Park, and Charleson Park provide plenty of outdoor space. The Walk Score of 95 means kids can walk to almost everything.",
  },
];

const highlights = [
  { emoji: "\u{1F3DB}\uFE0F", title: "City Hall District", desc: "Vancouver City Hall and the Cambie Village area give Fairview a civic-centre energy with great local cafes and grocers." },
  { emoji: "\u{1F3A8}", title: "South Granville", desc: "One of Vancouver's premier shopping streets. Art galleries, boutique fashion, home design stores, and upscale dining." },
  { emoji: "\u{1F3DD}\uFE0F", title: "Granville Island", desc: "The world-famous public market, artist studios, theatres, and waterfront parks sit right at Fairview's doorstep." },
  { emoji: "\u{1F687}", title: "Broadway Subway", desc: "The new Millennium Line extension plus the existing Canada Line make Fairview one of the best-connected neighbourhoods in the city." },
  { emoji: "\u{1F6B6}", title: "Walk Score 95", desc: "One of Vancouver's most walkable neighbourhoods. False Creek seawall, flat terrain, and everything within a comfortable stroll." },
  { emoji: "\u{1F3E5}", title: "Healthcare Hub", desc: "VGH and the Broadway medical corridor are major employers. Great for healthcare professionals who want to walk to work." },
];

const properties = [
  { type: "Condos", range: "$550K \u2013 $1.2M", note: "Dominant type. Broadway Plan bringing new supply." },
  { type: "Townhomes", range: "$1.1M \u2013 $1.8M", note: "Growing. Transit-oriented new builds." },
  { type: "Heritage Homes", range: "$1.5M \u2013 $3M+", note: "South of Broadway. Increasingly rare." },
];

const data = NEIGHBOURHOODS["fairview"];

export default async function FairviewPage() {
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
            <span className="text-teal-200">Fairview</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Fairview
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$900K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">95</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">2</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Lines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Fairview is the quiet achiever of Vancouver neighbourhoods. It doesn&apos;t have the flashy reputation of Kitsilano or the Instagram appeal of Yaletown, but it might be the best-located neighbourhood in the entire city. Morning walk along the False Creek seawall, pastries from Granville Island, eight minutes to downtown on the Canada Line &mdash; that&apos;s just a regular morning here.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The Broadway Plan is reshaping the corridor with thousands of new homes and the upcoming subway extension, but south of Broadway the tree-lined streets still feel residential and calm. South Granville&apos;s galleries and boutiques add polish, Cambie Village keeps it grounded, and Granville Island is literally at your doorstep. Professionals, couples, and downsizers love this neighbourhood for a reason.
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
            boundaryName="Fairview"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Fairview Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Fairview Special
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
