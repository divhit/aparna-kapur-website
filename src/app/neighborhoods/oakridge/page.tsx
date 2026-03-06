import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Oakridge Vancouver Real Estate Guide 2026 | Homes, Condos & Market Data",
  description:
    "Guide to Oakridge, Vancouver. Explore real estate, the Oakridge Park redevelopment, schools, transit, parks, and lifestyle. By Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Oakridge Vancouver real estate",
    "Oakridge homes for sale",
    "Oakridge Park redevelopment",
    "Oakridge Vancouver condos",
    "Oakridge neighborhood guide",
    "buy home Oakridge Vancouver",
  ],
};

const faqs = [
  {
    question: "Is Oakridge a good neighborhood to invest in?",
    answer:
      "Oakridge is one of Vancouver's strongest investment areas. The $6 billion Oakridge Park redevelopment, two SkyTrain stations, Queen Elizabeth Park, and strong school catchments support long-term appreciation. Transit-oriented neighborhoods have historically outperformed the Vancouver average.",
  },
  {
    question: "How much does a home cost in Oakridge Vancouver?",
    answer:
      "GVR MLS\u00ae HPI benchmarks (January 2026): condos $998K, townhomes $1.64M, detached $3.36M. Composite benchmark: $1.49M. Prices vary by size, condition, and proximity to SkyTrain and Oakridge Park.",
  },
  {
    question: "What is the Oakridge Park redevelopment?",
    answer:
      "Oakridge Park (formerly Oakridge Centre) is one of Canada's largest mixed-use developments. The $6 billion project delivers 3,300+ homes, a 9-acre public park, 500,000+ sq ft of retail, office space, and community amenities. Portions are completing in 2026.",
  },
  {
    question: "What schools are in the Oakridge area?",
    answer:
      "Elementary: Van Horne and Jamieson. High school: Sir Winston Churchill Secondary. Private: King David High School and Vancouver College. Post-secondary: Langara College at 49th and Cambie.",
  },
  {
    question: "How do I get around from Oakridge?",
    answer:
      "Two Canada Line stations: Oakridge-41st Avenue and Langara-49th Avenue. Downtown in 15 minutes, YVR in 20. Multiple bus routes serve the area, and cycling infrastructure continues to improve.",
  },
];

const oakridgeData = NEIGHBOURHOODS["oakridge"];

export default async function OakridgePage() {
  const pois = await fetchNeighbourhoodPOIs(oakridgeData.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/19358760/pexels-photo-19358760.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Oakridge</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Oakridge, Vancouver
          </h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="hidden lg:block" />
            <div className="lg:col-span-3">
              <div className="grid grid-cols-3 gap-6 max-w-2xl">
                <div>
                  <p className="font-serif text-2xl text-teal-700">$1.49M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">3,300+</p>
                  <p className="text-xs text-warm-500 mt-1">New Homes Coming</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">2</p>
                  <p className="text-xs text-warm-500 mt-1">SkyTrain Stations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents Sidebar */}
            <aside className="hidden lg:block">
              <nav className="sticky top-28 space-y-1">
                <p className="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-3 px-3">
                  On This Page
                </p>
                {[
                  ["map", "Map", "1"],
                  ["redevelopment", "The Transformation", "2"],
                  ["living", "Living in Oakridge", "3"],
                  ["real-estate", "Real Estate Market", "4"],
                  ["transit", "Getting Around", "5"],
                  ["parks", "Parks", "6"],
                  ["schools", "Education", "7"],
                  ["shopping", "Shopping & Dining", "8"],
                  ["faq", "FAQ", "9"],
                ].map(([id, label, step]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-warm-600 hover:bg-warm-50 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-serif text-sm font-semibold shrink-0">
                      {step}
                    </span>
                    {label}
                  </a>
                ))}
                <div className="mt-8 pt-6 border-t border-warm-100">
                  <p className="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-3">
                    Nearby Areas
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      ["South Cambie", "south-cambie"],
                      ["Marpole", "marpole"],
                      ["Riley Park", "riley-park"],
                      ["Cambie Corridor", "cambie-corridor"],
                      ["Kerrisdale", "kerrisdale"],
                    ].map(([name, slug]) => (
                      <li key={slug}>
                        <Link
                          href={`/neighborhoods/${slug}`}
                          className="text-warm-500 hover:text-teal-700 transition-colors"
                        >
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 max-w-3xl">
              {/* Overview */}
              <section className="mb-16">
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge spans roughly 401 hectares in south-central Vancouver, bounded by 41st Avenue, 49th Avenue, Ontario Street, and Oak Street. It sits at the geographical heart of the city.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The $6 billion Oakridge Park redevelopment is turning the former suburban mall into one of Canada&apos;s largest mixed-use communities, with thousands of new homes, a 9-acre public park, and world-class amenities.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Oakridge is one of Vancouver&apos;s most culturally diverse neighborhoods, home to significant Jewish and Chinese communities. This shapes its dining scene, specialty shops, synagogues, and schools.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={oakridgeData.center}
                  zoom={oakridgeData.zoom}
                  pois={pois.length > 0 ? pois : oakridgeData.fallbackPOIs}
                  boundaryName="Oakridge"
                  height="450px"
                  showLegend
                />
              </section>

              {/* The Transformation */}
              <section id="redevelopment" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  The Oakridge Transformation
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Oakridge Park Redevelopment</p>
                  <p className="text-sm text-gold-700">
                      The $6 billion Oakridge Park redevelopment is transforming 28 acres at 41st &amp; Cambie into a major mixed-use community. Portions completing in 2026.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge Park (formerly Oakridge Centre) is Vancouver&apos;s most significant development outside downtown. Construction began in 2019, spanning 5 million square feet across 28 acres.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">What&apos;s Coming</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { stat: "3,300+", label: "New Homes", desc: "Including 420 affordable units across condos, townhomes, and rentals" },
                    { stat: "9 Acres", label: "Public Park", desc: "Playgrounds, playing fields, woodland, community garden, concert stages" },
                    { stat: "13", label: "Residential Towers", desc: "Including the tallest towers outside of downtown Vancouver" },
                    { stat: "500K+ sqft", label: "Retail & Dining", desc: "Including Time Out Market and premium shopping destinations" },
                  ].map((item) => (
                    <div key={item.label} className="bg-warm-50 rounded-xl p-5">
                      <p className="font-serif text-2xl text-teal-700">{item.stat}</p>
                      <p className="text-sm font-medium text-warm-800 mt-1">{item.label}</p>
                      <p className="text-xs text-warm-500 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  First phases completing in 2026: Time Out Market, the shopping centre, and the 9-acre public park. Residential towers and office space follow through 2026 and beyond.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For buyers and investors, this is a generational opportunity. Surrounding properties stand to benefit from the increased amenities, foot traffic, and desirability.
                </p>
              </section>

              {/* Living in Oakridge */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Oakridge
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge pairs residential calm with urban convenience. Its tree-lined streets hold a mix of mid-century homes, newer builds, and growing condo developments.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Residents value the walkability, proximity to Queen Elizabeth Park (one block away), and two Canada Line stations. Downtown is 15 minutes by SkyTrain, YVR 20 minutes.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in Oakridge</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Morning coffee on Cambie Street. A jog around Langara Golf Course. Drop the kids at Van Horne Elementary, then SkyTrain to downtown. After-school activities at the community center. Dinner along 41st Avenue or a home-cooked meal with ingredients from the neighborhood&apos;s Asian grocery stores. Weekends at the Bloedel Conservatory or VanDusen Botanical Garden.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Suburban peace, urban convenience, cultural richness, and a community being revitalized without losing its soul.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Oakridge Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge offers a diverse range of housing options across multiple price points:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$600K - $1.2M", desc: "Modern units near SkyTrain and Oakridge Park. GVR benchmark: $998K. Popular with first-time buyers and investors." },
                    { type: "Townhomes", range: "$1.3M - $1.9M", desc: "Multi-level homes with more space. GVR benchmark: $1.64M. Popular with young families." },
                    { type: "Detached Homes", range: "$2.5M - $4.5M+", desc: "Established streets. GVR benchmark: $3.36M. Many mid-century homes with renovation potential or newer builds." },
                  ].map((item) => (
                    <div key={item.type} className="bg-warm-50 rounded-xl p-5 border-l-4 border-teal-500">
                      <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                        <h4 className="font-medium text-teal-950">{item.type}</h4>
                        <span className="font-serif text-teal-700">{item.range}</span>
                      </div>
                      <p className="text-sm text-warm-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  GVR MLS® HPI composite benchmark: $1.49M (January 2026, -2.8% YoY). Long-term appreciation driven by transit investment, the Oakridge Park project, and central location.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Oakridge Park completion will drive foot traffic, retail, and amenities. Transit-oriented properties along the Canada Line have historically outperformed the broader Vancouver market.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Oakridge has some of the best transit access among Vancouver&apos;s residential neighborhoods:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Two Canada Line stations: Oakridge-41st Avenue and Langara-49th Avenue. Downtown in 15 min, YVR in 20 min." },
                    { mode: "Bus", detail: "Major routes along 41st Ave (43), Cambie St (15), and Oak St (17) connect to UBC, downtown, and surrounding neighborhoods." },
                    { mode: "Cycling", detail: "Improved cycling infrastructure along Ontario Street and Heather Street greenways. The Arbutus Greenway is accessible nearby." },
                    { mode: "Driving", detail: "Easy access to major arteries: Cambie, Oak, and Granville streets. Highway 99 access via the Oak Street Bridge for trips south." },
                  ].map((item) => (
                    <div key={item.mode} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-teal-950">{item.mode}</p>
                        <p className="text-sm text-warm-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Parks */}
              <section id="parks" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Parks &amp; Recreation
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge residents enjoy exceptional access to green space:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Queen Elizabeth Park", desc: "Vancouver's second-most visited park, one block away. City views, the Bloedel Conservatory, rose gardens, and seasonal gardens." },
                    { name: "Langara Golf Course", desc: "18-hole public course with perimeter walking, jogging, and dog-walking trails." },
                    { name: "Columbia Park & Tisdall Park", desc: "Neighbourhood parks with playgrounds, sports fields, and gathering spaces." },
                    { name: "Oakridge Park (Coming 2026)", desc: "A 9-acre public park with playgrounds, playing fields, woodland, community garden, concert stages, yoga platforms, and a running loop." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Schools &amp; Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Oakridge is home to well-regarded schools at every level:
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Van Horne Elementary", type: "K-7 Public", detail: "Walking distance from most Oakridge homes. Strong academic programs." },
                      { name: "Jamieson Elementary", type: "K-7 Public", detail: "Another excellent option serving the Oakridge catchment." },
                      { name: "Sir Winston Churchill Secondary", type: "8-12 Public", detail: "The local high school, known for strong academics and extracurriculars." },
                    ].map((school, i, arr) => (
                      <div key={school.name} className={`flex items-start gap-3 ${i < arr.length - 1 ? "pb-3 border-b border-warm-200" : ""}`}>
                        <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-teal-950">{school.name} <span className="font-normal text-warm-500">({school.type})</span></p>
                          <p className="text-sm text-warm-600">{school.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Private &amp; Post-Secondary</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "King David High School", type: "Private", detail: "Part of Oakridge's Jewish community, offering faith-based education." },
                      { name: "Vancouver College", type: "Private", detail: "A well-established private school in the area." },
                      { name: "Langara College", type: "Post-Secondary", detail: "Located at 49th and Cambie, serving over 23,000 students with diverse programs." },
                    ].map((school, i, arr) => (
                      <div key={school.name} className={`flex items-start gap-3 ${i < arr.length - 1 ? "pb-3 border-b border-warm-200" : ""}`}>
                        <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-teal-950">{school.name} <span className="font-normal text-warm-500">({school.type})</span></p>
                          <p className="text-sm text-warm-600">{school.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Along 41st Avenue and Cambie Street: Asian restaurants, Jewish delis, cafes, and international cuisine. One of Vancouver&apos;s best-kept food secrets.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge Park adds 500,000+ square feet of retail, including the Time Out Market food hall featuring top Vancouver chefs.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Cambie Village is nearby for everyday needs, and Main Street&apos;s boutiques and restaurants are a short trip east.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={faqs} />
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch CTA */}
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
