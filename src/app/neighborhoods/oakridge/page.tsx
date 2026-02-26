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
    "The definitive guide to Oakridge, Vancouver. Explore real estate, the Oakridge Park redevelopment, schools, transit, parks, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
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
      "Oakridge is one of Vancouver's strongest investment areas. The $6 billion Oakridge Park redevelopment, two SkyTrain stations, proximity to Queen Elizabeth Park, and strong school catchments make it a compelling long-term investment. Property values in transit-oriented neighborhoods have historically appreciated faster than the Vancouver average.",
  },
  {
    question: "How much does a home cost in Oakridge Vancouver?",
    answer:
      "Oakridge offers a range of housing options. The GVR MLS\u00ae HPI benchmark prices as of January 2026 are: condos at $998K, townhomes at $1.64M, and detached homes at $3.36M. The composite benchmark across all property types is $1.49M. Prices vary by unit size, condition, and proximity to SkyTrain stations and the Oakridge Park development.",
  },
  {
    question: "What is the Oakridge Park redevelopment?",
    answer:
      "Oakridge Park (formerly Oakridge Centre) is one of the largest mixed-use developments in Canadian history. The $6 billion project is transforming the old Oakridge mall into a vibrant community with over 3,300 new homes, a 9-acre public park, 500,000+ sq ft of retail, office space, and community amenities. Portions are completing in 2026.",
  },
  {
    question: "What schools are in the Oakridge area?",
    answer:
      "Oakridge has excellent schools at every level. Elementary schools include Van Horne Elementary and Jamieson Elementary. Sir Winston Churchill Secondary is the local high school. Private options include King David High School and Vancouver College. Langara College provides post-secondary education at 49th and Cambie.",
  },
  {
    question: "How do I get around from Oakridge?",
    answer:
      "Oakridge has excellent transit access with two Canada Line SkyTrain stations: Oakridge-41st Avenue and Langara-49th Avenue. Downtown Vancouver is just 15 minutes by SkyTrain, and Vancouver International Airport (YVR) is about 20 minutes. Multiple bus routes serve the neighborhood, and cycling infrastructure continues to improve.",
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
                  Oakridge is a south-central Vancouver neighborhood bordered by West 41st Avenue to the north, West 49th Avenue to the south, Ontario Street to the east, and Oak Street to the west. Encompassing approximately 401 hectares, it sits at the geographical heart of the city.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What makes Oakridge truly special right now is its transformation. The massive Oakridge Park redevelopment is turning the former suburban mall into one of Canada&apos;s largest mixed-use communities, bringing thousands of new homes, a spectacular public park, and world-class amenities to an already well-established neighborhood.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Oakridge is also one of Vancouver&apos;s most culturally diverse neighborhoods. It is home to a significant Jewish community with specialty shops, synagogues, and schools, as well as a substantial Chinese community. This cultural richness contributes to the neighborhood&apos;s vibrant character, diverse dining scene, and strong sense of community.
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
                    One of the largest mixed-use projects in Canadian history, the $6 billion Oakridge Park redevelopment is transforming 28 acres at 41st &amp; Cambie into a vibrant new community. Portions are completing in 2026.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The Oakridge Park redevelopment (formerly Oakridge Centre) is the single most significant development happening in Vancouver outside of downtown. Construction began in 2019, and the project encompasses over 5 million square feet of development across 28 acres.
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
                  The first phases completing in 2026 include the Time Out Market dining hall, the shopping centre, and the 9-acre public park. Residential towers and office space will follow throughout 2026 and beyond.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For real estate investors and homebuyers, the Oakridge Park redevelopment represents a generational opportunity. Properties in the surrounding area are expected to benefit significantly from the increased amenities, foot traffic, and neighborhood desirability that this development brings.
                </p>
              </section>

              {/* Living in Oakridge */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Oakridge
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge offers a rare combination in Vancouver: the tranquility of a residential neighborhood with the convenience of urban amenities. Most of the neighborhood&apos;s residential streets are quiet and tree-lined, with a mix of mid-century homes, newer builds, and an increasing number of condominium developments.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Residents love Oakridge for its walkability, its proximity to some of Vancouver&apos;s best parks (Queen Elizabeth Park is just a block away), and its excellent transit access. The two Canada Line stations make commuting effortless; you can be downtown in 15 minutes or at YVR airport in 20.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in Oakridge</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Morning coffee at a local cafe on Cambie Street. A walk or jog around the Langara Golf Course trails. Drop the kids at Van Horne Elementary, then hop on the SkyTrain to downtown for work. After school activities at the community center. Dinner at one of the many restaurants along 41st Avenue, or a home-cooked meal with ingredients from the Asian grocery stores that reflect the neighborhood&apos;s diversity. Weekend visits to Queen Elizabeth Park&apos;s Bloedel Conservatory or the VanDusen Botanical Garden nearby.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  This is the Oakridge lifestyle: suburban peace with urban convenience, cultural richness, and a community that&apos;s being revitalized without losing its soul.
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
                    { type: "Condominiums", range: "$600K - $1.2M", desc: "Modern units near SkyTrain stations and the Oakridge Park development. GVR benchmark: $998K. Popular with first-time buyers and investors." },
                    { type: "Townhomes", range: "$1.3M - $1.9M", desc: "Multi-level homes offering more space than condos. GVR benchmark: $1.64M. Increasingly popular with young families." },
                    { type: "Detached Homes", range: "$2.5M - $4.5M+", desc: "Single-family homes on established streets. GVR benchmark: $3.36M. Many mid-century homes with renovation potential or newer builds." },
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
                  The GVR MLS® HPI composite benchmark for Oakridge is $1.49M as of January 2026 (-2.8% year-over-year). The neighborhood has seen steady long-term appreciation driven by transit investment, the Oakridge Park redevelopment, and its central location.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    With the Oakridge Park completion driving increased foot traffic, retail, and amenities, surrounding properties are well-positioned for appreciation. Transit-oriented developments along the Canada Line corridor have historically outperformed the broader Vancouver market.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Oakridge has some of the best transit access in all of Vancouver&apos;s residential neighborhoods:
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
                    { name: "Queen Elizabeth Park", desc: "Vancouver's second-most visited park, just one block from Oakridge. Stunning city views, the Bloedel Conservatory, rose gardens, and seasonal gardens. A true gem for daily walks or weekend picnics." },
                    { name: "Langara Golf Course", desc: "An 18-hole public golf course with perimeter walking, jogging, and dog-walking trails that loop the entire course. Perfect for morning runs or evening strolls." },
                    { name: "Columbia Park & Tisdall Park", desc: "Neighborhood parks with playgrounds, sports fields, and community gathering spaces within easy walking distance." },
                    { name: "Oakridge Park (Coming 2026)", desc: "The crown jewel: a 9-acre public park as part of the Oakridge Park redevelopment. Will include playgrounds, playing fields, a woodland area, community garden, concert stages, yoga platforms, and a running loop." },
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
                  Oakridge&apos;s dining and shopping scene reflects its cultural diversity. Along 41st Avenue and Cambie Street, you&apos;ll find a mix of Asian restaurants, Jewish delis, trendy cafes, and international cuisine. The neighborhood&apos;s food scene is one of Vancouver&apos;s best-kept secrets.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The Oakridge Park redevelopment will dramatically expand shopping and dining options with over 500,000 square feet of retail space, including the highly anticipated Time Out Market, a curated food hall featuring Vancouver&apos;s best chefs and restaurants.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For everyday needs, the Cambie Village shopping district is nearby, and Main Street&apos;s eclectic boutiques and restaurants are just a short drive or bus ride east.
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
