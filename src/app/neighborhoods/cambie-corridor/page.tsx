import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import MarketPriceLinks from "@/components/market/MarketPriceLinks";
import NeighbourhoodListings from "@/components/neighborhoods/NeighbourhoodListings";

/** Listings are live data; regenerate hourly rather than freezing at build. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cambie Corridor Homes for Sale | Vancouver Area Guide",
  description:
    "Homes for sale along the Cambie Corridor, Vancouver, with the current MLS® HPI benchmark, price trends by property type, rezoning context, and Canada Line access.",
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
    question: "What is the average home price in Cambie Corridor, Vancouver?",
    answer:
      "The composite benchmark price in Cambie Corridor is $1.50M (July 2026). Condos average around $1.02M, townhomes $1.60M, and detached homes $2.62M. Prices vary by proximity to SkyTrain stations and development nodes. Contact Aparna Kapur at 604-612-7694 for a current market evaluation tailored to your budget and goals.",
  },
  {
    question: "What is the Cambie Corridor rezoning?",
    answer:
      "The Cambie Corridor Plan is the City of Vancouver\u2019s master plan to densify the land along Cambie Street from downtown to Marine Drive. Adopted between 2011 and 2018, it allows taller buildings and higher density near each Canada Line station, transforming former single-family blocks into mixed-use communities with condos, townhomes, rental buildings, retail, and public amenities.",
  },
  {
    question: "Is Cambie Corridor a good investment?",
    answer:
      "Yes. City-sanctioned rezoning creates ongoing development upside, and the Canada Line provides rapid transit access that drives sustained demand. Properties near stations have historically outpaced the Vancouver average in appreciation. A steady pipeline of new construction and pre-sales offers multiple entry points for investors and end users alike.",
  },
  {
    question: "What transit is on the Cambie Corridor?",
    answer:
      "The Canada Line runs beneath Cambie Street with five stations: Broadway-City Hall, King Edward, Oakridge-41st, Langara-49th, and Marine Drive. Trains run every 3\u20136 minutes at peak, reaching downtown in 15 minutes and YVR Airport in 20. Bus routes along Cambie (15), 41st (43), and 49th (49) connect east-west to UBC, Metrotown, and surrounding areas. The Broadway Subway extension adds a major interchange at Broadway-City Hall.",
  },
  {
    question: "Who is the best realtor for Cambie Corridor Vancouver?",
    answer:
      "Aparna Kapur of Oakwyn Realty is a Cambie Corridor specialist with deep knowledge of the corridor\u2019s station areas, rezoning opportunities, and new developments. Whether you are buying your first condo, upgrading to a townhome, or exploring investment properties, Aparna provides data-driven guidance and hands-on service. Reach her at 604-612-7694.",
  },
];

const cambieData = NEIGHBOURHOODS["cambie-corridor"];

export default async function CambieCorridorPage() {
  const pois = await fetchNeighbourhoodPOIs(cambieData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Cambie Corridor", href: "/neighborhoods/cambie-corridor" },
        ]}
      />
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
        </div>
      </section>

      <NeighbourhoodListings slug="cambie-corridor" />

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["cambie-corridor"].avgPrice}</p>
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
                  ["related", "Related Areas"],
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
                  The Cambie Corridor stretches 6 km along Cambie Street from downtown&apos;s edge south to the Fraser River at Marine Drive. Defined by the Canada Line beneath it, this corridor is the blueprint for Vancouver&apos;s evolution into a denser, more connected city.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Five station areas (Broadway-City Hall, King Edward, Oakridge-41st, Langara-49th, Marine Drive) each have distinct character and real estate profiles. The northern end near Broadway is urban and dense with restaurants, shops, and offices. Moving south, streets grow quieter before reaching the mixed-use Marine Gateway hub.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Since the Canada Line opened in 2009, billions in development have reshaped block after block with condos, townhomes, rentals, retail, and community spaces. For buyers and investors, the corridor is one of Metro Vancouver&apos;s most compelling long-term plays.
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
                    One of Vancouver&apos;s most ambitious planning initiatives. Adopted 2011-2018, it establishes a framework for densification along the Canada Line, building complete communities around every station.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Graduated density: tallest towers and densest mixed-use near each station, transitioning to mid-rise, townhomes, and duplexes further out, preserving existing character beyond the corridor.
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
                  New projects break ground every year. Buyers get ongoing new construction and pre-sale opportunities. Owners benefit from improving amenities and appreciating values as phases complete.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Cambie Corridor Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Condos and townhomes dominate, reflecting transit-oriented density. Detached homes still exist but are increasingly giving way to multi-family development.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$650K - $1.3M", desc: "Most common type. Benchmark: $1.01M. Modern amenities, open layouts, strong rental potential." },
                    { type: "Townhomes", range: "$1.3M - $2.0M", desc: "Popular family option. Benchmark: $1.75M. Many offer 3-bedroom layouts with private outdoor space." },
                    { type: "Detached Homes", range: "$2.0M - $3.5M+", desc: "Few remain on side streets. Benchmark: $2.43M. Many carry development potential under Corridor Plan rezoning." },
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
                  Composite benchmark: $1.50M (July 2026, -6.6% YoY). The northern end near Broadway commands premium prices. The southern end near Marine Drive and Langara offers more affordable entry.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    City-sanctioned densification and ongoing construction support long-term appreciation. Canada Line transit drives a cycle of increasing demand, improving amenities, and rising values. Pre-sales offer entry points along the corridor.
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
                    { mode: "SkyTrain (Canada Line)", detail: "Five stations. Downtown in 15 min, YVR in 20. Trains every 3-6 minutes at peak." },
                    { mode: "Broadway Subway", detail: "Connects at Broadway-City Hall, improving east-west transit to UBC, Commercial Drive, and beyond." },
                    { mode: "Bus", detail: "Cambie (15), 41st (43), and 49th (49) connect to UBC, Metrotown, and surrounding areas." },
                    { mode: "Cycling", detail: "Ontario and Heather Street greenways run parallel. Arbutus Greenway accessible nearby." },
                    { mode: "Driving", detail: "Cambie runs north-south. Oak, Granville, and Main parallel. Highway 99 via Oak Street Bridge at the southern end." },
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
                  Quality parks and recreation within walking distance throughout the corridor:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Queen Elizabeth Park", desc: "Adjacent to the corridor near 33rd. City and mountain views, Bloedel Conservatory, rose gardens, pitch-and-putt, and walking trails." },
                    { name: "Douglas Park", desc: "Near King Edward station. Playing fields, tennis, playground, outdoor pool, and community centre." },
                    { name: "Hillcrest Community Centre & Park", desc: "Built for the 2010 Olympics. Pool, ice rink, gymnasium, and playing fields near Oakridge-41st." },
                    { name: "Langara Golf Course", desc: "18-hole public course near Langara-49th with perimeter walking trails." },
                    { name: "Pocket Parks & Greenways", desc: "Developers contribute new parks under the Corridor Plan. Pocket parks and streetscaping added with each phase." },
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
                  Spanning multiple neighborhoods, families access different schools depending on their section:
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Elementary Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Van Horne Elementary", type: "K-7 Public", detail: "Central corridor near Oakridge-41st. Strong academics, diverse student body." },
                      { name: "Jamieson Elementary", type: "K-7 Public", detail: "Well-regarded option in the Oakridge catchment." },
                      { name: "Douglas Park Community School", type: "K-7 Public", detail: "Northern corridor near King Edward. Community-focused." },
                      { name: "Sir Richard McBride Elementary", type: "K-7 Public", detail: "Southern corridor near Marine Drive." },
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
                      { name: "Eric Hamber Secondary", type: "8-12 Public", detail: "Central corridor. Strong academics and athletics." },
                      { name: "Sir Winston Churchill Secondary", type: "8-12 Public", detail: "Serves the Oakridge-41st section." },
                      { name: "John Oliver Secondary", type: "8-12 Public", detail: "Southern corridor near Marine Drive." },
                      { name: "Langara College", type: "Post-Secondary", detail: "At 49th and Cambie. 23,000+ students, university transfer, career, and continuing education." },
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
                  Distinct experiences along the corridor&apos;s length.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Cambie Village (Broadway to 19th) has boutiques, bakeries, coffee shops, and restaurants in a walkable setting.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge Park at 41st will add 500,000+ square feet of retail and dining.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marine Gateway at the southern end is a thriving hub with cinema, grocery, restaurants, and services connected to Marine Drive SkyTrain.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Along 41st and 49th Avenues: Asian restaurants, specialty grocers, and services reflecting the corridor&apos;s cultural richness.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                  {faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group bg-warm-50 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="font-medium text-teal-950 text-sm pr-4">
                          {faq.question}
                        </h3>
                        <svg
                          className="w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 -mt-1">
                        <p className="text-sm text-warm-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Search Listings CTA */}
              <div className="mb-16">
                <Link
                  href="/buying/search"
                  className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Search Cambie Corridor Listings
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Related Articles */}
              <section id="articles" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Read More About Cambie Corridor
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Cambie Corridor Rezoning 2025: What Homeowners Need to Know", slug: "cambie-corridor-rezoning-2025-what-homeowners-need-to-know", category: "Market Analysis" },
                    { title: "Oakridge Park Spring 2026: Everything Opening This Year", slug: "oakridge-park-spring-2026-opening-guide", category: "Neighbourhoods" },
                    { title: "Oakridge Park Redevelopment 2026: What Buyers Need to Know", slug: "oakridge-park-redevelopment-2026", category: "Market Analysis" },
                    { title: "Presale vs. Resale Condos in Vancouver (2026)", slug: "resale-vs-presale-vancouver-condos-2026", category: "Buyer Resources" },
                  ].map((post) => (
                    <Link
                      key={post.slug}
                      href={`/resources/blog/${post.slug}`}
                      className="block bg-warm-50 rounded-xl p-5 border border-warm-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors group"
                    >
                      <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold">{post.category}</span>
                      <h3 className="font-serif text-base text-teal-900 mt-1 group-hover:text-teal-700 transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Related Neighbourhoods */}
              <section id="related" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Related Neighbourhoods
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Oakridge", slug: "oakridge", desc: "Adjacent station area with the massive Oakridge Park redevelopment and established residential streets." },
                    { name: "South Cambie", slug: "south-cambie", desc: "Quiet tree-lined blocks between Queen Elizabeth Park and the corridor. Heritage homes and growing density." },
                    { name: "Marpole", slug: "marpole", desc: "The corridor\u2019s southern gateway at Marine Drive. Rapid transformation with new condos, townhomes, and transit access." },
                    { name: "Riley Park", slug: "riley-park", desc: "East of the corridor near Nat Bailey Stadium. Craftsman homes, Main Street shops, and strong community feel." },
                  ].map((hood) => (
                    <Link
                      key={hood.slug}
                      href={`/neighborhoods/${hood.slug}`}
                      className="block bg-warm-50 hover:bg-warm-100 rounded-xl p-5 transition-colors"
                    >
                      <p className="font-serif text-lg text-teal-700 mb-1">{hood.name}</p>
                      <p className="text-xs text-warm-600">{hood.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Cambie Corridor" />

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
      <MarketPriceLinks slug="cambie-corridor" />
    </>
  );
}
