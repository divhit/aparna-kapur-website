import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Shaughnessy Vancouver | Heritage Mansions & Estate Living Guide 2026",
  description:
    "Your quick guide to Shaughnessy, Vancouver. Heritage mansions, VanDusen Botanical Garden, tree-lined boulevards, top private schools, and what makes this Vancouver's most prestigious residential address.",
  keywords: [
    "Shaughnessy Vancouver",
    "Shaughnessy real estate",
    "Shaughnessy mansions",
    "Shaughnessy heritage homes",
    "VanDusen Botanical Garden",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Shaughnessy?",
    answer:
      "The benchmark is $3.5M+, but that understates it. First Shaughnessy heritage mansions on The Crescent sell for $8M to $25M+. Second Shaughnessy homes range $4M to $10M. There is virtually no condo or townhome inventory — this is almost exclusively a single-family neighbourhood at Vancouver's highest price tier.",
  },
  {
    question: "What are the heritage districts?",
    answer:
      "First Shaughnessy (around The Crescent) is the original CPR-planned enclave with the grandest estates. Second Shaughnessy extends south with substantial heritage homes on generous lots. Both are formally designated conservation areas with guidelines that protect the neighbourhood's historic character.",
  },
  {
    question: "Is Shaughnessy walkable?",
    answer:
      "There are no commercial streets within Shaughnessy itself — that's by design. But South Granville's gallery row and boutiques are along the eastern edge, Kerrisdale Village is to the southwest, and VanDusen Garden is right on the southern boundary. The tree-canopied streets themselves are among the best walking in the city.",
  },
];

const highlights = [
  { emoji: "\u{1F3F0}", title: "Heritage Mansions", desc: "Tudor, Georgian, Arts & Crafts estates on lots up to 33,000 sq ft. Over 120 heritage-designated properties across two conservation areas." },
  { emoji: "\u{1F33A}", title: "VanDusen Botanical Garden", desc: "22 hectares of curated beauty with 7,500+ plant species, a hedge maze, and seasonal light festivals. Right on the southern boundary." },
  { emoji: "\u{1F333}", title: "Cathedral Tree Canopy", desc: "Towering plane trees, copper beeches, and native conifers create streetscapes that feel like walking through a private park." },
  { emoji: "\u{1F3EB}", title: "Elite Schools Nearby", desc: "York House, Little Flower Academy, Vancouver College, Shaughnessy Elementary, and Prince of Wales Secondary all within minutes." },
  { emoji: "\u{1F5BC}\uFE0F", title: "South Granville Galleries", desc: "Vancouver's unofficial gallery row is right on the eastern edge. Art, designer boutiques, and fine dining steps from home." },
  { emoji: "\u{1F510}", title: "Quiet by Design", desc: "No commercial streets inside the neighbourhood. Curving boulevards discourage through traffic. Deliberate serenity since 1907." },
];

const properties = [
  { type: "First Shaughnessy", range: "$8M – $25M+", note: "Grand estates on The Crescent. Rare & private." },
  { type: "Second Shaughnessy", range: "$4M – $10M", note: "Substantial heritage homes on generous lots." },
  { type: "Contemporary", range: "$5M – $12M+", note: "Modern rebuilds on Shaughnessy-sized lots." },
];

const data = NEIGHBOURHOODS["shaughnessy"];

export default async function ShaughnessyPage() {
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
            <span className="text-teal-200">Shaughnessy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Shaughnessy
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$3.5M+</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">120+</p>
              <p className="text-xs text-warm-500 mt-1">Heritage Homes</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">22 ha</p>
              <p className="text-xs text-warm-500 mt-1">VanDusen Garden</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Shaughnessy is Vancouver&apos;s old money — the neighbourhood the Canadian Pacific Railway built in 1907 for the city&apos;s elite, and it has never really relinquished that title. The curving, tree-canopied boulevards were designed to discourage through traffic, the lots are absurdly generous by Vancouver standards (some exceed 33,000 square feet), and the homes are genuine architectural masterpieces: Tudor manors, Georgian estates, Arts &amp; Crafts mansions with formal gardens and carriage houses.
          </p>
          <p className="text-warm-600 leading-relaxed">
            There are no shops, no restaurants, no commercial streets inside Shaughnessy — and that is entirely the point. VanDusen Botanical Garden sits on the southern boundary, South Granville&apos;s gallery row lines the eastern edge, and some of Vancouver&apos;s best private schools are minutes away. It is a neighbourhood that doesn&apos;t need to prove anything to anyone, and that quiet confidence is exactly what draws buyers to it.
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
            boundaryName="Shaughnessy"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Shaughnessy Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Shaughnessy Special
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
