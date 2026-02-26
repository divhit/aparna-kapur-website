import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Renfrew-Collingwood Vancouver | Diverse Living & Real Estate Guide 2026",
  description:
    "Your quick guide to Renfrew-Collingwood, Vancouver. Multicultural food on Kingsway, three SkyTrain stations, Collingwood Village, real estate prices, and what makes this Vancouver's most dynamic east-side neighbourhood.",
  keywords: [
    "Renfrew-Collingwood Vancouver",
    "Renfrew-Collingwood real estate",
    "Renfrew-Collingwood homes for sale",
    "Kingsway Vancouver restaurants",
    "Collingwood Village Vancouver",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Renfrew-Collingwood?",
    answer:
      "The composite benchmark is around $1.05M. Condos range from $400K to $700K, townhomes $750K to $1M, and detached homes $1.2M to $1.7M. Collingwood Village near Joyce Station has the newest condo stock.",
  },
  {
    question: "What is Collingwood Village?",
    answer:
      "A master-planned community around Joyce-Collingwood Station that turned a former industrial area into one of Vancouver's best examples of transit-oriented living. Residential towers, townhomes, parks, and local shops all within steps of the SkyTrain.",
  },
  {
    question: "Is Renfrew-Collingwood good for families?",
    answer:
      "Very much so. Windermere Secondary and multiple elementary schools serve the area. Renfrew Community Centre has a pool, and Collingwood Neighbourhood House runs family programs, newcomer support, and youth services that help knit this diverse community together.",
  },
];

const highlights = [
  { emoji: "🍜", title: "Kingsway Food Corridor", desc: "Hot pot, dim sum, pho, Korean BBQ, Filipino adobo — blocks of authentic, affordable multicultural dining that food writers rave about." },
  { emoji: "🚇", title: "3 SkyTrain Stations", desc: "Renfrew, Rupert, and Joyce-Collingwood on the Expo Line. Downtown in 20 minutes, no transfer needed." },
  { emoji: "🏘️", title: "Collingwood Village", desc: "One of Vancouver's most successful transit-oriented communities. Towers, townhomes, parks, and shops all around Joyce Station." },
  { emoji: "🌿", title: "Renfrew Ravine", desc: "A hidden urban ravine with salmon-bearing streams and forest trails. The annual Moon Festival fills it with lanterns and art." },
  { emoji: "🌍", title: "50+ Cultures", desc: "Vancouver's most populous and most diverse neighbourhood. Chinese, Vietnamese, Filipino, South Asian, Korean — a genuine mosaic." },
  { emoji: "📈", title: "Strong Value Play", desc: "Prices well below the city average with three SkyTrain stations and active densification plans. Compelling long-term investment." },
];

const properties = [
  { type: "Condos", range: "$400K – $700K", note: "Concentrated near Joyce Station. Strong rental demand." },
  { type: "Townhomes", range: "$750K – $1.0M", note: "Newer builds. Popular with young families." },
  { type: "Detached", range: "$1.2M – $1.7M", note: "Post-war homes, generous lots. Laneway potential." },
];

const data = NEIGHBOURHOODS["renfrew-collingwood"];

export default async function RenfrewCollingwoodPage() {
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
            <span className="text-teal-200">Renfrew-Collingwood</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Renfrew-Collingwood
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.05M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">3</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Stations</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">82</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            If you want to eat your way around the world without leaving Vancouver, start on Kingsway in Renfrew-Collingwood. Hot pot for dinner, banh mi for lunch, Korean fried chicken at midnight — this is the city&apos;s most deliciously diverse neighbourhood, home to over 50,000 people and more cultures than you can count.
          </p>
          <p className="text-warm-600 leading-relaxed">
            The north end (Renfrew) has a quieter, tree-lined suburban feel with older character homes and the magical Renfrew Ravine. The south end (Collingwood) is buzzing with condo towers and transit-oriented energy around Joyce Station. Three Expo Line stops make downtown a 20-minute ride, and prices are well below the Vancouver average — which is exactly why smart buyers keep showing up here.
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
            boundaryName="Renfrew-Collingwood"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Renfrew-Collingwood Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Renfrew-Collingwood Special
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
