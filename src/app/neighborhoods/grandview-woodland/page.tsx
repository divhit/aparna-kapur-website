import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Grandview-Woodland Vancouver | Commercial Drive & Real Estate Guide 2026",
  description:
    "Your quick guide to Grandview-Woodland, Vancouver. Commercial Drive culture, Italian heritage, real estate prices, transit, and what makes The Drive one of Vancouver's most beloved streets.",
  keywords: [
    "Grandview-Woodland Vancouver",
    "Grandview-Woodland real estate",
    "Commercial Drive Vancouver",
    "Grandview-Woodland homes for sale",
    "East Vancouver real estate",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Grandview-Woodland?",
    answer:
      "The composite benchmark is around $1.1M. Detached character homes range from $1.3M to $1.8M, condos from $500K to $850K, and townhomes from $900K to $1.3M. Properties near Commercial Drive and the SkyTrain station command premiums for their walkability and transit access.",
  },
  {
    question: "What's Commercial Drive like?",
    answer:
      "The Drive is one of Vancouver's most beloved streets. Italian delis and espresso bars from the old days sit next to Ethiopian restaurants, vintage shops, and indie bookstores. No chain stores. The farmers market, Italian Day festival, and live music venues keep it lively year-round. It has a grassroots energy that feels genuinely community-driven.",
  },
  {
    question: "Is Grandview-Woodland good for families?",
    answer:
      "Very much so. Grandview Elementary, Britannia Secondary (integrated with the community centre's pool, rink, and library), and the Britannia grounds make it excellent for kids. Grandview Park is the social hub, and the walkability means older kids can get around independently.",
  },
];

const highlights = [
  { emoji: "\u2615", title: "The Drive", desc: "200+ independent shops, cafes, and restaurants. Italian delis, Ethiopian kitchens, vintage stores, and zero chain retailers." },
  { emoji: "\u{1F1EE}\u{1F1F9}", title: "Italian Heritage", desc: "Deep Italian roots dating back a century. Italian Day on The Drive is one of Vancouver's biggest street festivals, drawing 300K+ visitors." },
  { emoji: "\u{1F687}", title: "Transit Hub", desc: "Commercial-Broadway is the busiest SkyTrain station in the system. Expo + Millennium Lines. Downtown in 10 minutes." },
  { emoji: "\u{1F3B5}", title: "Live Music & Arts", desc: "The Cultch, Rio Theatre, and dozens of live venues. A genuine arts neighbourhood, not a marketed one." },
  { emoji: "\u{1F333}", title: "Grandview Park", desc: "The neighbourhood's social heart on Commercial Drive. Community events, playgrounds, and the spot where everyone hangs out." },
  { emoji: "\u{1F30E}", title: "Multicultural Soul", desc: "Italian, Ethiopian, Vietnamese, Mexican, Salvadoran. One of the most genuinely diverse and inclusive communities in Vancouver." },
];

const properties = [
  { type: "Detached", range: "$1.3M \u2013 $1.8M", note: "Character homes & Vancouver Specials." },
  { type: "Condos", range: "$500K \u2013 $850K", note: "Near SkyTrain. Popular with first-timers." },
  { type: "Townhomes", range: "$900K \u2013 $1.3M", note: "Newer builds along Broadway corridor." },
];

const data = NEIGHBOURHOODS["grandview-woodland"];

export default async function GrandviewWoodlandPage() {
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
            <span className="text-teal-200">Grandview-Woodland</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Grandview-Woodland
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
              <p className="font-serif text-2xl text-teal-700">90</p>
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
            If you want to understand what makes east Vancouver tick, start on Commercial Drive. &ldquo;The Drive&rdquo; is where Italian nonnas share the sidewalk with artists, young families, and newcomers from every corner of the world. There are no chain stores. The coffee is strong. The community spirit is real. Italian Day draws 300,000 people for a reason.
          </p>
          <p className="text-warm-600 leading-relaxed">
            Behind The Drive, the residential streets are lined with craftsman bungalows, Vancouver Specials, and Edwardian homes with generous porches and mature gardens. Commercial-Broadway &mdash; the busiest SkyTrain station in the whole system &mdash; connects you to literally everywhere. The vibe is grassroots, multicultural, and fiercely independent. People move here for the personality and stay because it feels like an actual community, not just a postal code.
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
            boundaryName="Grandview-Woodland"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Grandview-Woodland Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Grandview-Woodland Special
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
