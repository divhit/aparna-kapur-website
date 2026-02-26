import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Sunset Vancouver | Punjabi Market & Real Estate Guide 2026",
  description:
    "Your quick guide to Sunset, Vancouver. Home of the Punjabi Market, spacious detached lots, Churchill Secondary, multicultural dining, and south Vancouver's best-kept residential streets.",
  keywords: [
    "Sunset Vancouver",
    "Sunset real estate",
    "Sunset homes for sale",
    "Punjabi Market Vancouver",
    "Churchill Secondary Vancouver",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Sunset?",
    answer:
      "The composite benchmark is around $1.3M. Detached homes range from $1.4M to $1.9M on generous lots, and condos (less common) start around $450K. Many homeowners have added laneway houses for rental income or multigenerational living.",
  },
  {
    question: "What is the Punjabi Market?",
    answer:
      "A historic South Asian commercial district on Main Street between 48th and 51st. One of the first of its kind in North America, established in the 1970s. Sari shops, sweet shops, jewellers, and restaurants still anchor the strip, and revitalization plans are underway.",
  },
  {
    question: "Is Sunset good for families?",
    answer:
      "Absolutely. Sir Winston Churchill Secondary has an IB program and strong athletics. Multiple elementary schools serve the area. Wide lots, quiet streets, and the Sunset Community Centre make it a natural fit for families who want space without leaving the city.",
  },
];

const highlights = [
  { emoji: "🕌", title: "Punjabi Market", desc: "North America's first South Asian shopping district. Sweet shops, sari stores, and jewellers on Main Street near 49th." },
  { emoji: "🏡", title: "Big Lots, Big Value", desc: "Some of Vancouver's most spacious residential lots. Detached homes with actual backyards — increasingly rare in this city." },
  { emoji: "🎓", title: "Churchill Secondary", desc: "One of Vancouver's top public high schools with an International Baccalaureate program. Families move here for the catchment." },
  { emoji: "🍛", title: "Hidden Food Gems", desc: "Thali, com tam, fresh naan, Chinese noodles — authentic home-style cooking from a dozen cultures at refreshingly honest prices." },
  { emoji: "🏠", title: "Laneway House Hub", desc: "One of Vancouver's most active areas for laneway construction. Add rental income or house extended family on the same lot." },
  { emoji: "🚇", title: "Canada Line Access", desc: "Langara-49th Station is a short bus ride away. 20 minutes to downtown, 15 to YVR. Knight Street Bridge connects to Richmond." },
];

const properties = [
  { type: "Detached", range: "$1.4M – $1.9M", note: "Dominant type. Post-war homes, generous lots." },
  { type: "Condos", range: "$450K – $650K", note: "Less common. Found along major corridors." },
  { type: "Laneway", range: "$1,800 – $2,500/mo", note: "Rental income. Very popular in this area." },
];

const data = NEIGHBOURHOODS["sunset"];

export default async function SunsetPage() {
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
            <span className="text-teal-200">Sunset</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Sunset
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.3M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">Punjabi</p>
              <p className="text-xs text-warm-500 mt-1">Market on Main</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">75</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Sunset is the neighbourhood where you can pick up fresh jalebis from the Punjabi Market, walk past a Sikh gurdwara, grab Vietnamese com tam for lunch, and still be home in time to enjoy your actual backyard. This is south Vancouver at its most authentic — no trendy boutiques, no craft cocktail bars, just real families on tree-lined streets who&apos;ve been here for generations.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The lots are big by Vancouver standards, the gardens are immaculate, and Churchill Secondary draws families from across the city for its IB program. More and more homeowners are building laneway houses, adding a modern twist to one of the city&apos;s most established residential pockets. It is unpretentious, multicultural, and quietly one of the best values on the west side of Boundary Road.
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
            boundaryName="Sunset"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Sunset Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Sunset Special
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
