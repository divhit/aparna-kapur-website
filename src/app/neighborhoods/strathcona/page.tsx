import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Strathcona Vancouver | Heritage Homes & Real Estate Guide 2026",
  description:
    "Your quick guide to Strathcona, Vancouver. Heritage Victorian homes, artist lofts, Chinatown adjacency, transit, and what makes Strathcona Vancouver's most historically layered neighbourhood.",
  keywords: [
    "Strathcona Vancouver",
    "Strathcona real estate",
    "Strathcona heritage homes",
    "Strathcona artist lofts",
    "Vancouver oldest neighbourhood",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Strathcona?",
    answer:
      "The composite benchmark is around $950K. Heritage homes range from $1.0M to $1.5M, warehouse lofts and condos from $400K to $750K, and townhomes from $700K to $1.1M. For an inner-city neighbourhood this close to downtown, that represents genuine value.",
  },
  {
    question: "What makes Strathcona's heritage special?",
    answer:
      "Strathcona is Vancouver's oldest residential neighbourhood, with homes dating to the 1890s. Victorian and Edwardian-era houses with gingerbread trim sit beside workers' cottages on tree-lined streets. Many are heritage-designated, protecting a level of architectural character that simply does not exist in newer parts of the city.",
  },
  {
    question: "Is Strathcona safe for families?",
    answer:
      "Strathcona is a real inner-city neighbourhood with both charm and urban challenges. Families do live here and love it, drawn by the tight-knit community, Strathcona Elementary, Cottonwood Community Garden, and the walkability. It is honest and authentic rather than manicured, and that is part of its appeal.",
  },
];

const highlights = [
  { emoji: "\u{1F3DB}\uFE0F", title: "1890s Heritage", desc: "Vancouver's oldest residential neighbourhood. Victorian, Edwardian, and craftsman homes you will not find anywhere else in the city." },
  { emoji: "\u{1F3A8}", title: "Artist Studios", desc: "Converted warehouses house working artists, designers, and creative entrepreneurs. Studio tours and artisan markets throughout the year." },
  { emoji: "\u{1F962}", title: "Chinatown Next Door", desc: "One of North America's oldest Chinatowns. Dim sum, the Dr. Sun Yat-Sen Garden, herbal shops, and deep cultural history within walking distance." },
  { emoji: "\u{1F687}", title: "5 Min to Downtown", desc: "Main Street-Science World and Stadium-Chinatown SkyTrain stations. Downtown is a bike ride or a short walk away." },
  { emoji: "\u{1F331}", title: "Cottonwood Gardens", desc: "One of Vancouver's largest community gardens. 200+ plots where neighbours grow food, share harvests, and build real relationships." },
  { emoji: "\u{1F30A}", title: "CRAB Park Waterfront", desc: "Burrard Inlet beach, harbour views, North Shore mountain backdrop. One of the few east-side waterfront parks." },
];

const properties = [
  { type: "Heritage Homes", range: "$1.0M \u2013 $1.5M", note: "Victorian & Edwardian. The neighbourhood's signature." },
  { type: "Condos & Lofts", range: "$400K \u2013 $750K", note: "Warehouse conversions popular with creatives." },
  { type: "Townhomes", range: "$700K \u2013 $1.1M", note: "Modern builds. Ground-level near downtown." },
];

const data = NEIGHBOURHOODS["strathcona"];

export default async function StrathconaPage() {
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
            <span className="text-teal-200">Strathcona</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Strathcona
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$950K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">1890s</p>
              <p className="text-xs text-warm-500 mt-1">Heritage Homes</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">91</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Strathcona is the neighbourhood where Vancouver&apos;s history lives in the houses themselves. Walk down any residential block and you will see beautifully restored Victorians with gingerbread trim, simple workers&apos; cottages from the 1890s, and converted warehouses where artists now have studios. This is the oldest residential neighbourhood in the city, and every street has stories that go back to before Vancouver was even incorporated.
          </p>
          <p className="text-warm-600 leading-relaxed">
            It is raw and real in a way that polished west-side neighbourhoods are not. Chinatown is a five-minute walk, downtown is a short bike ride, and two SkyTrain stations keep you connected to everything. The community is tight-knit &mdash; people tend their plots at Cottonwood Gardens, fight for heritage preservation, and actually know their neighbours. For buyers who value substance over surface, Strathcona offers something rare: genuine character at an accessible price, steps from the city centre.
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
            boundaryName="Strathcona"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Strathcona Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Strathcona Special
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
