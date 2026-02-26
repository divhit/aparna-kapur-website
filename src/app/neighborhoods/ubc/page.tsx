import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "UBC Vancouver | Campus Living & Real Estate Guide 2026",
  description:
    "Your quick guide to UBC, Vancouver. Campus lifestyle, leasehold real estate, Pacific Spirit Park, Wesbrook Village, schools, transit, and what makes living at UBC unlike anywhere else in Metro Vancouver.",
  keywords: [
    "UBC Vancouver",
    "UBC real estate",
    "UBC homes for sale",
    "Wesbrook Village",
    "Pacific Spirit Park",
  ],
};

const faqs = [
  {
    question: "Can anyone buy a home at UBC?",
    answer:
      "Yes. Homes in Wesbrook Village, Hawthorn Place, and Chancellor Place are available to anyone — no UBC affiliation required. Properties are sold on 99-year prepaid leases that function similarly to freehold for financing and resale.",
  },
  {
    question: "How much does a home cost at UBC?",
    answer:
      "The composite benchmark is around $1.35M. Condos range from $550K to $1.2M, townhomes $1.3M to $2M, and the limited detached homes from $2.5M to $4.5M+. The leasehold structure keeps prices slightly below comparable freehold west-side properties.",
  },
  {
    question: "How do you get to downtown from UBC?",
    answer:
      "The 99 B-Line express bus runs every 3-5 minutes during peak hours and reaches Commercial-Broadway SkyTrain in about 30 minutes. By car, downtown is 20-30 minutes via West 4th or SW Marine Drive. The Broadway Subway extension will improve connections further.",
  },
];

const highlights = [
  { emoji: "\u{1F332}", title: "Pacific Spirit Park", desc: "763 hectares of temperate rainforest with 73 km of trails — one of North America's largest urban forests, right at your doorstep." },
  { emoji: "\u{1F3D6}\uFE0F", title: "Three Beaches", desc: "Spanish Banks, Locarno, and Wreck Beach. Sandy shorelines with mountain views and some of the best sunsets in the city." },
  { emoji: "\u{1F3EB}", title: "World-Class University", desc: "Top-40 globally. 70,000+ daily campus population means concerts, lectures, museums, and athletics year-round." },
  { emoji: "\u{1F6CD}\uFE0F", title: "Wesbrook Village", desc: "A walkable village centre with groceries, restaurants, cafes, and services — designed so you rarely need to leave campus." },
  { emoji: "\u{1F33A}", title: "Botanical Garden", desc: "30 hectares, 8,000+ plant species, and the Greenheart TreeWalk canopy walkway suspended 20 metres above the forest floor." },
  { emoji: "\u{1F4DA}", title: "Top Schools On-Site", desc: "University Hill Elementary & Secondary, plus Norma Rose Point in Wesbrook Village. Some of the best public schools in BC." },
];

const properties = [
  { type: "Condos", range: "$550K – $1.2M", note: "Most common. Modern builds in Wesbrook & Hawthorn." },
  { type: "Townhomes", range: "$1.3M – $2.0M", note: "Family-sized. Private outdoor space in Wesbrook." },
  { type: "Detached", range: "$2.5M – $4.5M+", note: "Very limited. Estate-like UEL properties." },
];

const data = NEIGHBOURHOODS["ubc"];

export default async function UBCPage() {
  const pois = await fetchNeighbourhoodPOIs(data.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">UBC</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            UBC
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.35M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">30 min</p>
              <p className="text-xs text-warm-500 mt-1">To Downtown</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">763 ha</p>
              <p className="text-xs text-warm-500 mt-1">Pacific Spirit Park</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-warm-700 leading-relaxed mb-4">
            UBC is not just a university — it&apos;s a fully self-contained community on the western tip of the Point Grey peninsula, surrounded by ocean on three sides and wrapped in 763 hectares of old-growth forest. Morning runs through Pacific Spirit Park, sunset walks on Spanish Banks, and a world-class campus at your doorstep. That&apos;s the daily reality here.
          </p>
          <p className="text-warm-600 leading-relaxed">
            Wesbrook Village is the residential heart: modern condos and townhomes arranged around a walkable village centre with groceries, cafes, and an elementary school. The vibe is young, international, and quietly ambitious. You&apos;ll hear a dozen languages on a Saturday stroll. And because everything runs on 99-year leases, you get west-side living at a slight discount to freehold neighbours — a detail savvy buyers appreciate.
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
            boundaryName="UBC"
            height="380px"
            showLegend
          />
        </div>
      </section>

      {/* What Makes UBC Special */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 mb-8 text-center">
            What Makes UBC Special
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
