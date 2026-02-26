import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Kensington-Cedar Cottage Vancouver | Trout Lake & Real Estate Guide 2026",
  description:
    "Your quick guide to Kensington-Cedar Cottage, Vancouver. Trout Lake, Kingsway dining, real estate prices, schools, and what makes KCC one of east Vancouver's best family neighbourhoods.",
  keywords: [
    "Kensington-Cedar Cottage Vancouver",
    "Kensington-Cedar Cottage real estate",
    "Trout Lake Vancouver",
    "Kingsway Vancouver restaurants",
    "East Vancouver family homes",
  ],
};

const faqs = [
  {
    question: "How much does a home cost in Kensington-Cedar Cottage?",
    answer:
      "The composite benchmark is around $1.15M. Detached homes range from $1.2M to $1.6M with generous lot sizes, condos from $450K to $700K, and townhomes from $800K to $1.2M. KCC offers significantly more space per dollar than west-side neighbourhoods.",
  },
  {
    question: "What is Trout Lake like?",
    answer:
      "Trout Lake (John Hendry Park) is the neighbourhood's crown jewel. A natural freshwater lake with a small beach, surrounded by sports fields, playgrounds, a community centre, and walking paths. The Saturday Trout Lake Farmers Market from May to October is one of the city's most popular.",
  },
  {
    question: "What makes Kingsway special in this neighbourhood?",
    answer:
      "Kingsway through KCC has become one of Vancouver's most exciting food corridors. Vietnamese pho, Chinese dim sum, Korean barbecue, Indian curries, Filipino dishes, and modern fusion, often at prices well below trendier neighbourhoods. Food lovers consider it essential exploring.",
  },
];

const highlights = [
  { emoji: "\u{1F3DE}\uFE0F", title: "Trout Lake", desc: "A natural freshwater lake with a beach, surrounded by one of east Vancouver's best parks. The Saturday farmers market is legendary." },
  { emoji: "\u{1F35C}", title: "Kingsway Food Corridor", desc: "Vietnamese, Chinese, Korean, Indian, Filipino. One of the most diverse and delicious dining streets in the entire city." },
  { emoji: "\u{1F3E1}", title: "Family-Sized Lots", desc: "Generous lot sizes with room for laneway houses and garden suites. More space per dollar than almost anywhere in Vancouver." },
  { emoji: "\u{1F687}", title: "Joyce-Collingwood SkyTrain", desc: "Expo Line access at the eastern edge. Downtown in about 20 minutes. Significant transit-oriented development underway." },
  { emoji: "\u{1F30D}", title: "Multicultural Heart", desc: "Chinese, Vietnamese, Filipino, South Asian, and Latin American communities create one of the most genuinely diverse neighbourhoods in the city." },
  { emoji: "\u{1F331}", title: "Community Gardens", desc: "Block parties, garden plots, and multicultural festivals. KCC has a sense of belonging that is hard to find in more transient areas." },
];

const properties = [
  { type: "Detached", range: "$1.2M \u2013 $1.6M", note: "Generous lots. Laneway house potential." },
  { type: "Condos", range: "$450K \u2013 $700K", note: "Growing near Kingsway & Joyce Station." },
  { type: "Townhomes", range: "$800K \u2013 $1.2M", note: "Popular with young families." },
];

const data = NEIGHBOURHOODS["kensington-cedar-cottage"];

export default async function KensingtonCedarCottagePage() {
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
            <span className="text-teal-200">Kensington-Cedar Cottage</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Kensington-Cedar Cottage
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.15M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">80</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">Trout Lake</p>
              <p className="text-xs text-warm-500 mt-1">John Hendry Park</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            Locals call it KCC, and it is the neighbourhood where east Vancouver families put down roots. Trout Lake on a summer Saturday &mdash; kids on the beach, farmers&apos; market in full swing, softball games on the diamond &mdash; is one of those Vancouver scenes that reminds you why people love this city. Add in the Kingsway food corridor, where you can eat your way through a dozen cuisines without spending more than $15 per plate, and you start to understand the appeal.
          </p>
          <p className="text-warm-600 leading-relaxed">
            KCC is one of Vancouver&apos;s largest neighbourhoods, and it shows in the diversity. Chinese, Vietnamese, Filipino, South Asian, and Latin American communities have all shaped the area&apos;s character, cuisine, and commercial life. The lots are bigger than the west side, the gardens are well-tended, and the fruit trees are a signature. It is grounded, multicultural, and genuinely affordable by Vancouver standards &mdash; especially for families who want a real backyard and a strong sense of community.
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
            boundaryName="Kensington-Cedar Cottage"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes Kensington-Cedar Cottage Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes Kensington-Cedar Cottage Special
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
