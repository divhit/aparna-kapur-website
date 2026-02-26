import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Mount Pleasant Vancouver | Creative Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Mount Pleasant, Vancouver. Craft breweries, Main Street shopping, murals, tech hubs, and what makes Mount Pleasant one of Vancouver's most creative neighbourhoods.",
  keywords: [
    "Mount Pleasant Vancouver",
    "Mount Pleasant real estate",
    "Mount Pleasant condos for sale",
    "Main Street Vancouver",
    "Mount Pleasant breweries",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Mount Pleasant?",
    answer:
      "The composite benchmark is around $850K. Condos range from $550K to $1M, townhomes from $1M to $1.5M, and heritage character homes from $1.2M to $2.5M+. Mount Pleasant offers good value compared to Kitsilano and Fairview with similar walkability and transit access.",
  },
  {
    question: "What's the brewery scene like?",
    answer:
      "Mount Pleasant is the undisputed capital of Vancouver's craft beer scene, with 10+ breweries clustered east of Main Street in former warehouses. 33 Acres, Brassneck, Main Street Brewing, and Faculty are local favourites. Most have taprooms with patios, creating a walkable tasting circuit.",
  },
  {
    question: "Is Mount Pleasant good for families?",
    answer:
      "Yes. Mount Pleasant Elementary, Florence Nightingale Elementary, and Sir Charles Tupper Secondary serve the area. Dude Chilling Park, Clark Park, and Jonathan Rogers Park provide green space, and the walkability makes daily life with kids very manageable.",
  },
];

const highlights = [
  { emoji: "\u{1F37A}", title: "Brewery District", desc: "10+ craft breweries in converted warehouses east of Main. Vancouver's best taproom crawl, no contest." },
  { emoji: "\u{1F3A8}", title: "Mural Festival", desc: "Building-sized murals everywhere. The annual Vancouver Mural Festival has made this one of Canada's most colourful neighbourhoods." },
  { emoji: "\u2615", title: "Coffee Capital", desc: "49th Parallel, Matchstick, JJ Bean flagship locations. More specialty roasters per block than anywhere in the city." },
  { emoji: "\u{1F6CD}\uFE0F", title: "Main Street", desc: "Indie boutiques, vintage shops, bookstores, and restaurants for days. No chains, just local character." },
  { emoji: "\u{1F4BB}", title: "Tech Hub", desc: "Growing concentration of tech companies and startups drawn by the neighbourhood's character and transit access." },
  { emoji: "\u{1F687}", title: "Two SkyTrain Stations", desc: "Broadway-City Hall (Canada Line) and Main Street-Science World (Expo/Millennium). Downtown in 8 minutes." },
];

const properties = [
  { type: "Condos", range: "$550K \u2013 $1M", note: "Modern builds along Main & Broadway corridors." },
  { type: "Townhomes", range: "$1M \u2013 $1.5M", note: "Popular with young families. Growing supply." },
  { type: "Heritage Homes", range: "$1.2M \u2013 $2.5M+", note: "Character homes south of Broadway. Unique." },
];

const data = NEIGHBOURHOODS["mount-pleasant"];

export default async function MountPleasantPage() {
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
            <span className="text-teal-200">Mount Pleasant</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Mount Pleasant
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$850K</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">92</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">10+</p>
              <p className="text-xs text-warm-500 mt-1">Breweries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Mount Pleasant is where Vancouver gets interesting. It is the neighbourhood that turned old warehouses into taprooms, blank walls into giant murals, and Main Street into the city&apos;s best stretch for independent shops and restaurants. Saturday morning farmers&apos; market, a flat white from one of six specialty roasters within walking distance, an afternoon browsing vintage shops &mdash; that&apos;s the rhythm here.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The streets south of Broadway are lined with heritage homes and mature trees, while the corridors along Main and Broadway buzz with new condos, tech offices, and a food scene that punches way above its weight. Two SkyTrain stations, dedicated bike lanes, and a Walk Score of 92 mean you genuinely don&apos;t need a car. The creative energy is real, the community pride is palpable, and the brewery district alone is worth moving for.
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
            boundaryName="Mount Pleasant"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Mount Pleasant Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Mount Pleasant Special
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
