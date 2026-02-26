import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Cambie Corridor Vancouver Real Estate Guide 2026 | Condos, Townhomes & Market Insights",
  description:
    "The definitive guide to Cambie Corridor, Vancouver. Explore real estate, the Cambie Corridor Plan, transit-oriented development, schools, parks, and lifestyle along the Canada Line. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Cambie Corridor Vancouver real estate",
    "Cambie Corridor condos for sale",
    "Cambie Corridor townhomes",
    "Cambie Corridor Plan Vancouver",
    "buy home Cambie Corridor",
    "Canada Line real estate Vancouver",
    "transit-oriented development Vancouver",
    "Cambie Corridor new construction",
  ],
};

const faqs = [
  {
    question: "Is the Cambie Corridor a good area to invest in?",
    answer:
      "The Cambie Corridor is one of Vancouver's strongest investment corridors. The City of Vancouver's Cambie Corridor Plan has designated this area for significant densification along the Canada Line, creating a steady pipeline of new construction and pre-sale opportunities. Transit-oriented properties along the Canada Line have historically appreciated faster than the Vancouver average, and ongoing density increases continue to drive demand for both rental and ownership housing.",
  },
  {
    question: "How much does a home cost along the Cambie Corridor?",
    answer:
      "The GVR MLS\u00AE HPI composite benchmark for the Cambie sub-area is $1.46M as of January 2026, with condos benchmarked at $1.01M, townhomes at $1.75M, and detached homes at $2.43M. Prices vary by location along the corridor; properties closer to SkyTrain stations and new development nodes tend to command higher prices per square foot.",
  },
  {
    question: "What is the Cambie Corridor Plan?",
    answer:
      "The Cambie Corridor Plan is the City of Vancouver's comprehensive master plan for transit-oriented development along the Canada Line from downtown to Marine Drive. Adopted in phases between 2011 and 2018, the plan allows for increased density around each SkyTrain station, transforming formerly single-family blocks into mixed-use communities with condos, townhomes, rental housing, retail, and community amenities. It is one of the most ambitious urban planning initiatives in Vancouver's history.",
  },
  {
    question: "What SkyTrain stations are on the Cambie Corridor?",
    answer:
      "The Cambie Corridor is served by five Canada Line SkyTrain stations: Broadway-City Hall, King Edward, Oakridge-41st Avenue, Langara-49th Avenue, and Marine Drive. Each station area has its own distinct character and development plan. The upcoming Broadway Subway extension will also enhance connectivity at Broadway-City Hall station, making it a major transit interchange.",
  },
  {
    question: "Is the Cambie Corridor good for first-time buyers?",
    answer:
      "The Cambie Corridor is excellent for first-time buyers, particularly those looking at condos and townhomes. The high volume of new construction means a strong supply of modern, move-in-ready units, many with competitive pre-sale pricing. The excellent transit access reduces the need for a car, lowering overall living costs. Buyers can find well-priced entry points at the southern end near Marine Drive and Langara-49th stations.",
  },
];

const cambieData = NEIGHBOURHOODS["cambie-corridor"];

export default async function CambieCorridorPage() {
  const pois = await fetchNeighbourhoodPOIs(cambieData.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/neighborhoods/cambie-corridor.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Cambie Corridor</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Cambie Corridor, Vancouver
          </h1>
          <p className="text-xl text-teal-200 font-medium mb-2">
            The Complete Neighborhood Guide
          </p>
          <p className="text-white/70 max-w-2xl text-lg">
            Vancouver&apos;s most dynamic transit-oriented development corridor,
            stretching along the Canada Line from downtown to Marine Drive.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.46M</p>
              <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">5</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Stations</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">15 min</p>
              <p className="text-xs text-warm-500 mt-1">To Downtown</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">20 min</p>
              <p className="text-xs text-warm-500 mt-1">To YVR Airport</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">High</p>
              <p className="text-xs text-warm-500 mt-1">Growth Potential</p>
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
                  ["overview", "Overview"],
                  ["map", "Explore Map"],
                  ["corridor-plan", "The Cambie Corridor Plan"],
                  ["real-estate", "Real Estate Market"],
                  ["transit", "Getting Around"],
                  ["parks", "Parks & Recreation"],
                  ["schools", "Schools & Education"],
                  ["shopping", "Shopping & Dining"],
                  ["faq", "FAQ"],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-warm-600 hover:bg-warm-50 hover:text-teal-700 transition-colors"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-8 pt-6 border-t border-warm-100 space-y-1">
                  <p className="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-3 px-3">
                    Nearby Areas
                  </p>
                  {[
                    ["Oakridge", "oakridge"],
                    ["South Cambie", "south-cambie"],
                    ["Riley Park", "riley-park"],
                    ["Marpole", "marpole"],
                    ["Kerrisdale", "kerrisdale"],
                  ].map(([name, slug]) => (
                    <Link
                      key={slug}
                      href={`/neighborhoods/${slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-warm-600 hover:bg-warm-50 hover:text-teal-700 transition-colors"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 max-w-3xl">
              {/* Overview */}
              <section id="overview" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Overview
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The Cambie Corridor is Vancouver&apos;s most significant transit-oriented development corridor, stretching roughly 6 kilometres along Cambie Street from the edge of downtown south to the Fraser River at Marine Drive. Defined by the Canada Line SkyTrain route that runs beneath it, this corridor has become the blueprint for how Vancouver is evolving from a city of single-family homes into a more complete, connected, and livable urban environment.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Unlike a traditional neighborhood with fixed boundaries, the Cambie Corridor is better understood as a series of distinct communities connected by rapid transit. Each station area (Broadway-City Hall, King Edward, Oakridge-41st, Langara-49th, and Marine Drive) has its own character, amenities, and real estate profile. The northern sections near Broadway are more urban and dense, with a vibrant mix of restaurants, shops, and offices. As you move south, the corridor transitions into quieter, more residential streets before arriving at the bustling mixed-use hub of Marine Gateway.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  What unites the entire corridor is transformation. Since the Canada Line opened in 2009, billions of dollars of development have reshaped block after block, bringing new condominiums, townhome complexes, rental buildings, retail, and community spaces to streets that were formerly lined with single-family houses. For homebuyers and investors, the Cambie Corridor represents one of the most compelling long-term value propositions in Metro Vancouver.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6 italic font-bold">
                  Explore Cambie Corridor
                </h2>
                <NeighbourhoodMap
                  center={cambieData.center}
                  zoom={cambieData.zoom}
                  pois={pois.length > 0 ? pois : cambieData.fallbackPOIs}
                  boundaryName="Cambie Corridor"
                  height="450px"
                  showLegend
                />
              </section>

              {/* The Cambie Corridor Plan */}
              <section id="corridor-plan" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  The Cambie Corridor Plan
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">City of Vancouver Master Plan</p>
                  <p className="text-sm text-gold-700">
                    The Cambie Corridor Plan is one of the most ambitious urban planning initiatives in Vancouver&apos;s history. Adopted in phases from 2011 to 2018, it establishes a framework for thoughtful densification along the entire Canada Line route. The idea is to create complete communities around every SkyTrain station.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The City envisioned a graduated density approach: the highest towers and most intense mixed-use development within a short walk of each station, transitioning to mid-rise buildings, townhomes, and duplexes further out, and preserving existing character in areas beyond the corridor&apos;s influence.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">Key Station Areas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { station: "Broadway-City Hall", desc: "The corridor's northern anchor. A major transit interchange connecting to the new Broadway Subway. High-density mixed-use with offices, retail, and condos." },
                    { station: "King Edward", desc: "Quieter mid-corridor node with mid-rise condos and townhomes. Walkable to Douglas Park and established residential streets." },
                    { station: "Oakridge-41st", desc: "Home to the massive Oakridge Park redevelopment. Emerging as a major urban centre with towers, retail, and a 9-acre public park." },
                    { station: "Langara-49th", desc: "Close to Langara College and Langara Golf Course. A mix of new condos, townhomes, and established single-family homes." },
                    { station: "Marine Drive", desc: "The southern anchor, anchored by Marine Gateway's mixed-use towers with retail, cinemas, and direct SkyTrain access." },
                  ].map((item) => (
                    <div key={item.station} className="bg-warm-50 rounded-xl p-5">
                      <p className="font-serif text-lg text-teal-700">{item.station}</p>
                      <p className="text-xs text-warm-600 mt-2">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The plan continues to roll out, with new projects breaking ground every year. For buyers, this means an ongoing supply of new construction and pre-sale opportunities. For owners, it means neighborhood improvement and amenity growth along with property value appreciation as different phases get completed.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Cambie Corridor Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The Cambie Corridor real estate market is dominated by condominiums and townhomes. It reflects transit-oriented density. Though detached homes still exist, they are increasingly being replaced by multi-family developments.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$650K - $1.3M", desc: "The most common property type along the corridor. Benchmark price is $1.01M. These new constructions offer modern amenities, open layouts, and strong rental potential." },
                    { type: "Townhomes", range: "$1.3M - $2.0M", desc: "Increasingly popular family-friendly option. Benchmark price is $1.75M. Many new townhome projects offer 3-bedroom layouts with private outdoor space." },
                    { type: "Detached Homes", range: "$2.0M - $3.5M+", desc: "Few but still present on side streets away from the main corridor. Benchmark price is $2.43M. Many carry development potential as the Corridor Plan allows for rezoning." },
                  ].map((item) => (
                    <div key={item.type} className="bg-warm-50 rounded-xl p-5 border-l-4 border-teal-500">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="font-medium text-teal-950">{item.type}</h4>
                        <span className="font-serif text-teal-700">{item.range}</span>
                      </div>
                      <p className="text-sm text-warm-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The composite benchmark for the Cambie sub-area is $1.46M as of January 2026 (-6.1% year-over-year). Properties at the northern end near Broadway command premium prices due to proximity to downtown and the new Broadway Subway. The southern end near Marine Drive and Langara offers more affordable options.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    A very strong contender for long-term appreciation with city-sanctioned densification and ongoing construction. The backbone of Canada Line transit creates a cycle of increasing demand, improving amenities, and rising property values. Pre-sale opportunities along the corridor offer entry points for investors to ride this trajectory.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Transit is the Cambie Corridor&apos;s defining advantage.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain (Canada Line)", detail: "Five stations along the corridor: Broadway-City Hall, King Edward, Oakridge-41st, Langara-49th, and Marine Drive. Downtown Vancouver in approximately 15 minutes, YVR airport in about 20 minutes. Trains run every 3-6 minutes during peak hours." },
                    { mode: "Broadway Subway", detail: "The new Broadway Subway extension connects at Broadway-City Hall station, dramatically improving east-west transit to UBC, Commercial Drive, and beyond. A major upgrade for the corridor's northern end." },
                    { mode: "Bus", detail: "Frequent bus routes along Cambie Street (Route 15), 41st Avenue (Route 43), and 49th Avenue (Route 49) connect to UBC, Metrotown, and surrounding neighborhoods." },
                    { mode: "Cycling", detail: "The Ontario Street and Heather Street cycling greenways run parallel to the corridor. The Arbutus Greenway, a dedicated cycling and walking path, is accessible nearby." },
                    { mode: "Driving", detail: "Cambie Street provides a direct north-south route. Oak Street, Granville Street, and Main Street run parallel. Highway 99 is accessible via the Oak Street Bridge at the southern end." },
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
                  The Cambie Corridor stretches past some of Vancouver&apos;s finest parks and green spaces. No matter which section you live in, quality recreation is within walking distance:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Queen Elizabeth Park", desc: "Vancouver's second-most visited park sits adjacent to the corridor near 33rd Avenue. Stunning city and mountain views from the hilltop, the Bloedel Conservatory, rose gardens, pitch-and-putt golf, and walking trails through beautifully landscaped grounds." },
                    { name: "Douglas Park", desc: "A well-loved community park near King Edward station with playing fields, tennis courts, a playground, outdoor pool, and a community centre offering programs for all ages. A true neighborhood gathering place." },
                    { name: "Hillcrest Community Centre & Park", desc: "One of Vancouver's premier recreation facilities, built for the 2010 Olympics. Indoor pool, ice rink, gymnasium, and extensive playing fields. Located near the Oakridge-41st section of the corridor." },
                    { name: "Langara Golf Course", desc: "An 18-hole public golf course near Langara-49th station with perimeter walking trails. A remarkable green space asset for residents of the southern corridor." },
                    { name: "Pocket Parks & Greenways", desc: "The Cambie Corridor Plan requires developers to contribute to new parks and green spaces. New pocket parks and improved streetscaping are being added with each development phase, steadily increasing the corridor's green space." },
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
                  Because the Cambie Corridor spans multiple neighborhoods, families have access to a wide range of schools depending on their section of the corridor:
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Elementary Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Van Horne Elementary", type: "K-7 Public", detail: "Serving the central corridor near Oakridge-41st. Strong academic programs and a diverse student body." },
                      { name: "Jamieson Elementary", type: "K-7 Public", detail: "Another well-regarded option in the Oakridge catchment area." },
                      { name: "Douglas Park Community School", type: "K-7 Public", detail: "Serving the northern corridor near King Edward station. Community-focused with strong parent involvement." },
                      { name: "Sir Richard McBride Elementary", type: "K-7 Public", detail: "Serving the southern corridor near Marine Drive." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Secondary &amp; Post-Secondary</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Eric Hamber Secondary", type: "8-12 Public", detail: "A large, well-respected secondary school serving the central corridor with strong academics and athletics." },
                      { name: "Sir Winston Churchill Secondary", type: "8-12 Public", detail: "Another excellent option for families in the Oakridge-41st section of the corridor." },
                      { name: "John Oliver Secondary", type: "8-12 Public", detail: "Serving the southern corridor near the Marine Drive end." },
                      { name: "Langara College", type: "Post-Secondary", detail: "Located directly on the corridor at 49th and Cambie, serving over 23,000 students with university transfer, career, and continuing education programs." },
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
                  Cambie Corridor offers distinct shopping and dining experiences depending on where you are along its length.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The northern section around Cambie Village (between Broadway and 19th Avenue) has locally owned boutiques, bakeries, coffee shops, restaurants, and specialty stores lining Cambie Street in a charming, walkable setting.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Further south, the Oakridge Park redevelopment is set to transform the 41st Avenue node into a premier retail and dining destination with over 500,000 square feet of retail.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  At its southern end, Marine Gateway is already a thriving mixed-use hub with a cinema, grocery stores, restaurants, and everyday services that are connected directly to the Marine Drive SkyTrain station.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Along the way, 41st Avenue and 49th Avenue provide additional retail strips with a diverse mix of Asian restaurants, specialty grocers and services that reflect the cultural richness of this neighborhood.
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
