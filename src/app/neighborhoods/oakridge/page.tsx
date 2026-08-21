import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Oakridge Vancouver | Real Estate Guide 2026",
  description:
    "Oakridge neighbourhood guide: Oakridge Park redevelopment, real estate prices, schools, Canada Line transit, and market trends. By Aparna Kapur, 604-612-7694.",
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
      "GVR MLS\u00ae HPI benchmarks (July 2026): condos $993K, townhomes $1.50M, detached $3.41M. Composite benchmark: $1.43M. Prices vary by size, condition, and proximity to SkyTrain and Oakridge Park.",
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
  {
    question: "When did Oakridge Park mall open?",
    answer:
      "Oakridge Park officially opened on May 28, 2026, with more than 100 stores across 650,000+ square feet of retail, including Louis Vuitton, Prada, Bvlgari, Tiffany & Co., and Valentino, along with Time Out Market Vancouver — an 18-kitchen food hall that is only the second Time Out Market in Canada. Much of the 9-acre rooftop public park is also open, while civic amenities including the new community centre, library branch, and childcare facilities continue to come online.",
  },
  {
    question: "What luxury brands are at Oakridge Park Vancouver?",
    answer:
      "Oakridge Park features an unprecedented luxury retail lineup for Vancouver, including Louis Vuitton, Prada, Bvlgari, Tiffany & Co., Rolex, Valentino, Loewe, Dolce & Gabbana, Loro Piana, Thom Browne, Acne Studios, Brunello Cucinelli, Moncler, and Alexander Wang. The development also houses a Giorgio Armani Caffe — only the third location in North America. This positions Oakridge as Vancouver's premier luxury shopping destination.",
  },
  {
    question: "Is Oakridge Vancouver good for families?",
    answer:
      "Oakridge is one of the best neighbourhoods in Vancouver for families. It offers highly rated schools including Dr. Annie B. Jamieson Elementary (ranked 61st out of 932 schools in BC by the Fraser Institute) and Sir Winston Churchill Secondary with its International Baccalaureate programme. The neighbourhood has excellent parks including Queen Elizabeth Park and the new 9-acre rooftop park at Oakridge Park (opened 2026), two Canada Line SkyTrain stations, a new community centre with pool and ice rink arriving as part of the Oakridge Park build-out, and a strong multicultural community. About 75% of households are married couples, with 47% being families with children.",
  },
  {
    question: "How far is Oakridge from downtown Vancouver?",
    answer:
      "Oakridge is approximately 15 minutes from downtown Vancouver by SkyTrain on the Canada Line. The Oakridge-41st Avenue station provides direct, frequent service to Waterfront station downtown with no transfers required. By car, downtown is about 20-25 minutes depending on traffic. Vancouver International Airport (YVR) is approximately 20 minutes by SkyTrain. This exceptional transit connectivity is one of Oakridge's greatest advantages.",
  },
  {
    question: "What is the R1-1 zone and how does it affect Oakridge property?",
    answer:
      "The R1-1 (Residential Inclusive) zone is Vancouver's city-wide rezoning that took effect in October 2023. It allows property owners to build 3-6 market ownership units or up to 8 secured rental units on lots that were previously restricted to single-family homes. In Oakridge, this means many traditional detached home lots can now be redeveloped into multiplexes without a separate rezoning application. This has significant implications for property values, as it effectively increases the development potential of every residential lot in the neighbourhood.",
  },
  {
    question: "How has the Canada Line affected Oakridge property values?",
    answer:
      "The Canada Line, which opened in 2009, has been transformative for Oakridge real estate. Properties within walking distance of the two Oakridge stations — Oakridge-41st Avenue and Langara-49th Avenue — have consistently outperformed the broader Vancouver market. Transit-oriented development along the Canada Line corridor has driven density, amenity growth, and property appreciation. The Oakridge Park redevelopment itself was made possible by this transit infrastructure, and the resulting investment continues to push values higher in the surrounding area.",
  },
  {
    question: "What is the Cambie Corridor Plan and how does it affect Oakridge?",
    answer:
      "The Cambie Corridor Plan, with major updates approved in October 2025, enables increased density along the Canada Line route through Oakridge and surrounding areas. Key changes include tower heights near Oakridge-41st Station increasing from 15-18 to 20-26 storeys, and over 4,300 properties receiving pre-zoning — meaning development projects can skip the lengthy rezoning process and go directly to development permit, saving approximately 12 months. For property owners in Oakridge, this means increased land value and development potential.",
  },
  {
    question: "What are the demographics of Oakridge Vancouver?",
    answer:
      "Oakridge has a population of approximately 14,826 residents. It is one of Vancouver's most culturally diverse neighbourhoods — about 59.88% of residents are of Chinese heritage (including mainland China, Hong Kong, and Taiwan), alongside a significant Jewish community. The median age is 42.8 years, 75% of households are married couples, and 47% are families with children. This diversity contributes to the neighbourhood's vibrant dining scene, cultural institutions, and community character.",
  },
  {
    question: "Should I buy in Oakridge or Kerrisdale?",
    answer:
      "Both are excellent Vancouver west side neighbourhoods, but they serve different buyer profiles. Oakridge offers stronger growth potential due to the $6 billion Oakridge Park redevelopment, better transit access with two Canada Line stations, and more diverse housing options including new condos and townhomes from $600K. Kerrisdale offers a quieter, more established village atmosphere with charming independent shops, mature tree-lined streets, and a slightly higher price point for detached homes. Families prioritising transit and new amenities may prefer Oakridge, while those seeking established charm may lean toward Kerrisdale.",
  },
  {
    question: "What will Oakridge Vancouver look like in 5 years?",
    answer:
      "By 2030-2031, Oakridge will be virtually unrecognisable from a decade ago. The full Oakridge Park development will be complete with all 13 residential towers (3,300+ homes housing over 6,000 new residents), the 9-acre rooftop park, the luxury retail centre, Time Out Market, Giorgio Armani Cafe, the new community centre with pool and ice rink, a major Vancouver Public Library branch, childcare facilities, and artist studios. Combined with the Cambie Corridor Plan driving further development nearby, Oakridge is positioned to become Vancouver's most significant secondary urban centre after downtown.",
  },
];

const oakridgeData = NEIGHBOURHOODS["oakridge"];

export default async function OakridgePage() {
  const pois = await fetchNeighbourhoodPOIs(oakridgeData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Oakridge", href: "/neighborhoods/oakridge" },
        ]}
      />
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
                  <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["oakridge"].avgPrice}</p>
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
                  ["faq-highlights", "Quick Answers", "10"],
                  ["related", "Related Areas", "11"],
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
                    { type: "Condominiums", range: "$600K - $1.2M", desc: "Modern units near SkyTrain and Oakridge Park. GVR benchmark: $1.04M. Popular with first-time buyers and investors." },
                    { type: "Townhomes", range: "$1.3M - $1.9M", desc: "Multi-level homes with more space. GVR benchmark: $1.57M. Popular with young families." },
                    { type: "Detached Homes", range: "$2.5M - $4.5M+", desc: "Established streets. GVR benchmark: $3.26M. Many mid-century homes with renovation potential or newer builds." },
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
                  GVR MLS® HPI composite benchmark: $1.43M (July 2026, -8.6% YoY). Long-term appreciation driven by transit investment, the Oakridge Park project, and central location.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Oakridge Park completion will drive foot traffic, retail, and amenities. Transit-oriented properties along the Canada Line have historically outperformed the broader Vancouver market.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mt-6">
                  Ready to explore what&apos;s available?{" "}
                  <Link href="/buying/search" className="text-teal-700 font-medium underline underline-offset-2 hover:text-teal-900 transition-colors">
                    Browse current Oakridge listings
                  </Link>{" "}
                  to see homes, condos, and townhomes on the market right now.
                </p>
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

              {/* FAQ Highlights */}
              <section id="faq-highlights" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Quick Answers About Oakridge
                </h2>
                <div className="space-y-3">
                  <details className="group bg-warm-50 rounded-xl border border-warm-100 overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-100/50 transition-colors">
                      What is the average home price in Oakridge, Vancouver?
                      <svg className="w-5 h-5 text-teal-600 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed border-t border-warm-200 pt-4">
                      As of July 2026, the GVR MLS® HPI composite benchmark price in Oakridge is <strong className="text-teal-900">$1.43M</strong>. Broken down: condos average around $993K, townhomes $1.50M, and detached homes $3.41M. Prices vary based on proximity to SkyTrain stations, Oakridge Park, and lot size. For a personalized market assessment, contact <strong className="text-teal-900">Aparna Kapur</strong> at <a href="tel:6046127694" className="text-teal-700 underline underline-offset-2 hover:text-teal-900">604-612-7694</a>.
                    </div>
                  </details>

                  <details className="group bg-warm-50 rounded-xl border border-warm-100 overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-100/50 transition-colors">
                      When does Oakridge Park open?
                      <svg className="w-5 h-5 text-teal-600 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed border-t border-warm-200 pt-4">
                      Oakridge Park officially opened on <strong className="text-teal-900">May 28, 2026</strong>. The $6 billion mixed-use development by QuadReal and Westbank is one of Canada&apos;s largest, opening with 100+ stores across 650,000+ square feet of retail featuring luxury brands like Louis Vuitton, Prada, Bvlgari, Tiffany &amp; Co., and Valentino, plus Time Out Market Vancouver and the Giorgio Armani Caffe. Much of the 9-acre rooftop park is now open, with the community centre, library branch, and childcare facilities continuing to come online.
                    </div>
                  </details>

                  <details className="group bg-warm-50 rounded-xl border border-warm-100 overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-100/50 transition-colors">
                      Is Oakridge a good neighbourhood to buy in?
                      <svg className="w-5 h-5 text-teal-600 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed border-t border-warm-200 pt-4">
                      Yes, Oakridge is one of Vancouver&apos;s strongest neighbourhoods for buyers. Two Canada Line SkyTrain stations put downtown 15 minutes away and YVR 20 minutes. Excellent schools including Van Horne Elementary, Jamieson Elementary, and Sir Winston Churchill Secondary serve families well. The $6 billion Oakridge Park redevelopment is driving significant value appreciation in the area. The R1-1 city-wide rezoning also adds development potential to residential lots, making Oakridge attractive for both homeowners and investors.
                    </div>
                  </details>

                  <details className="group bg-warm-50 rounded-xl border border-warm-100 overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-100/50 transition-colors">
                      What schools are in Oakridge?
                      <svg className="w-5 h-5 text-teal-600 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed border-t border-warm-200 pt-4">
                      Oakridge offers strong options at every level. Public elementary schools include <strong className="text-teal-900">Van Horne Elementary</strong> and <strong className="text-teal-900">Dr. Annie B. Jamieson Elementary</strong> (ranked 61st of 932 BC schools by the Fraser Institute). <strong className="text-teal-900">Sir Winston Churchill Secondary</strong> is the local high school, offering an International Baccalaureate programme. Private options include <strong className="text-teal-900">King David High School</strong> and <strong className="text-teal-900">Vancouver College</strong>. <strong className="text-teal-900">Langara College</strong> at 49th and Cambie serves over 23,000 post-secondary students.
                    </div>
                  </details>

                  <details className="group bg-warm-50 rounded-xl border border-warm-100 overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-medium text-teal-950 hover:bg-warm-100/50 transition-colors">
                      Who is the best realtor for Oakridge Vancouver?
                      <svg className="w-5 h-5 text-teal-600 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-warm-600 leading-relaxed border-t border-warm-200 pt-4">
                      <strong className="text-teal-900">Aparna Kapur</strong> with <strong className="text-teal-900">Oakwyn Realty</strong> is a top choice for Oakridge real estate. Aparna lives on Vancouver&apos;s south side and specializes in Oakridge and surrounding west-side neighbourhoods. She brings deep local knowledge of the Oakridge Park redevelopment, Cambie Corridor Plan, school catchments, and market trends. Reach Aparna at <a href="tel:6046127694" className="text-teal-700 underline underline-offset-2 hover:text-teal-900">604-612-7694</a> for a confidential consultation.
                    </div>
                  </details>
                </div>
              </section>

              {/* Related Articles */}
              <section id="articles" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Read More About Oakridge
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Oakridge Park Spring 2026: Everything Opening This Year", slug: "oakridge-park-spring-2026-opening-guide", category: "Neighbourhoods" },
                    { title: "Oakridge Park Redevelopment 2026: What Buyers Need to Know", slug: "oakridge-park-redevelopment-2026", category: "Market Analysis" },
                    { title: "Oakridge vs. Kerrisdale: Vancouver Neighbourhood Comparison", slug: "oakridge-vs-kerrisdale-vancouver-neighbourhood-comparison", category: "Neighbourhoods" },
                    { title: "Is Oakridge Vancouver\u2019s New Downtown?", slug: "is-oakridge-vancouvers-new-downtown", category: "Market Analysis" },
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
                    { name: "Marpole", slug: "marpole", desc: "Affordable west-side living with Canada Line access and river proximity." },
                    { name: "South Cambie", slug: "south-cambie", desc: "Quiet tree-lined streets between Queen Elizabeth Park and Langara." },
                    { name: "Kerrisdale", slug: "kerrisdale", desc: "Established village charm with boutique shopping and top-rated schools." },
                    { name: "Cambie Corridor", slug: "cambie-corridor", desc: "Transit-oriented growth along the Canada Line from Oakridge to Marine Drive." },
                  ].map((hood) => (
                    <Link
                      key={hood.slug}
                      href={`/neighborhoods/${hood.slug}`}
                      className="block bg-warm-50 rounded-xl p-5 border border-warm-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors group"
                    >
                      <h3 className="font-serif text-lg text-teal-900 group-hover:text-teal-700 transition-colors">
                        {hood.name}
                      </h3>
                      <p className="text-sm text-warm-500 mt-1">{hood.desc}</p>
                    </Link>
                  ))}
                </div>
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
            mainEntity: [
              ...faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
              {
                "@type": "Question",
                name: "What is the average home price in Oakridge, Vancouver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As of July 2026, the GVR MLS® HPI composite benchmark price in Oakridge is $1.43M. Condos average around $993K, townhomes $1.50M, and detached homes $3.41M. For a personalized market assessment, contact Aparna Kapur at 604-612-7694.",
                },
              },
              {
                "@type": "Question",
                name: "When does Oakridge Park open?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oakridge Park officially opened on May 28, 2026. The $6 billion mixed-use development by QuadReal and Westbank opened with 100+ stores across 650,000+ square feet of retail, including Louis Vuitton, Prada, Bvlgari, Tiffany & Co., and Valentino, plus Time Out Market Vancouver and the Giorgio Armani Caffe.",
                },
              },
              {
                "@type": "Question",
                name: "Is Oakridge a good neighbourhood to buy in?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Oakridge is one of Vancouver's strongest neighbourhoods for buyers. Two Canada Line SkyTrain stations, excellent schools including Van Horne, Jamieson, and Churchill Secondary, the $6 billion Oakridge Park redevelopment, and R1-1 rezoning all drive long-term value.",
                },
              },
              {
                "@type": "Question",
                name: "What schools are in Oakridge?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Public elementary: Van Horne Elementary and Dr. Annie B. Jamieson Elementary (ranked 61st of 932 BC schools). High school: Sir Winston Churchill Secondary with IB programme. Private: King David High School and Vancouver College. Post-secondary: Langara College at 49th and Cambie.",
                },
              },
              {
                "@type": "Question",
                name: "Who is the best realtor for Oakridge Vancouver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Aparna Kapur with Oakwyn Realty specializes in Oakridge and Vancouver's south side. She brings deep local knowledge of the Oakridge Park redevelopment, Cambie Corridor Plan, and market trends. Contact Aparna at 604-612-7694.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
