import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "South Cambie Vancouver | Real Estate Guide",
  description:
    "South Cambie neighbourhood guide: real estate prices, Queen Elizabeth Park, Canada Line, schools, and market trends. By Aparna Kapur. 604-612-7694.",
  keywords: [
    "South Cambie Vancouver real estate",
    "South Cambie homes for sale",
    "Cambie Corridor Vancouver",
    "South Cambie neighborhood guide",
    "buy home South Cambie Vancouver",
    "Queen Elizabeth Park neighborhood",
    "South Cambie condos townhomes",
  ],
};

const faqs = [
  {
    question: "Is South Cambie a good area to buy a home in Vancouver?",
    answer:
      "South Cambie combines Queen Elizabeth Park, two Canada Line stations, the Cambie Corridor Plan, strong school catchments, and hospital proximity. A strong choice for families and investors with long-term value driven by transit-oriented development.",
  },
  {
    question: "How much do homes cost in South Cambie?",
    answer:
      "GVR MLS® HPI benchmarks (January 2026): condos $1.02M, townhomes $1.56M, detached $4.16M. Composite: $1.44M. Prices vary by property type, lot size, and proximity to SkyTrain.",
  },
  {
    question: "What is the Cambie Corridor plan and how does it affect South Cambie?",
    answer:
      "The City of Vancouver's long-term vision for housing, amenities, and mixed-use development along the Canada Line from Marine Drive to King Edward. In South Cambie, it has introduced townhome and condo projects near King Edward and Oakridge-41st stations, increasing housing choice while maintaining residential character.",
  },
  {
    question: "What schools serve the South Cambie neighborhood?",
    answer:
      "Elementary: Van Horne and Jamieson. High school: Eric Hamber Secondary, one of Vancouver's most sought-after. Post-secondary: Langara College at 49th and Cambie. Private options nearby.",
  },
  {
    question: "How is transit access in South Cambie?",
    answer:
      "Two Canada Line stations: King Edward and Oakridge-41st Avenue. Downtown in 12-15 minutes, YVR in 20. Bus routes along Cambie, King Edward, and 41st connect to UBC and the rest of the city.",
  },
];

const southCambieData = NEIGHBOURHOODS["south-cambie"];

export default async function SouthCambiePage() {
  const pois = await fetchNeighbourhoodPOIs(southCambieData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "South Cambie", href: "/neighborhoods/south-cambie" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/5109341/pexels-photo-5109341.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">South Cambie</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            South Cambie, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.44M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">12 min</p>
                  <p className="text-xs text-warm-500 mt-1">To Downtown</p>
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
                  ["living", "Living in South Cambie", "2"],
                  ["real-estate", "Real Estate Market", "3"],
                  ["transit", "Getting Around", "4"],
                  ["parks", "Parks", "5"],
                  ["schools", "Education", "6"],
                  ["shopping", "Shopping & Dining", "7"],
                  ["faq", "FAQ", "8"],
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
                      ["Oakridge", "oakridge"],
                      ["Riley Park", "riley-park"],
                      ["Cambie Corridor", "cambie-corridor"],
                      ["Marpole", "marpole"],
                      ["Shaughnessy", "shaughnessy"],
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
                  South Cambie is a quiet, established westside neighborhood bounded by 16th Avenue, 41st Avenue, Cambie Street, and Oak Street. Close enough to downtown for an easy commute, yet calm enough to feel removed from the city.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Its crown jewel is Queen Elizabeth Park, Vancouver&apos;s highest point at 152 metres. Sweeping views of the skyline and North Shore Mountains are among B.C.&apos;s most photographed vistas. For residents, these views are part of daily life through morning jogs, evening walks, and Saturday pitch and putt.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Tree-lined streets and heritage homes define the area. The Cambie Corridor Plan has added modern townhomes and condos near SkyTrain stations while preserving residential character.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={southCambieData.center}
                  zoom={southCambieData.zoom}
                  pois={pois.length > 0 ? pois : southCambieData.fallbackPOIs}
                  boundaryName="South Cambie"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in South Cambie */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in South Cambie
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Wide streets, mature canopy trees, and neighbours who wave from their porches. Families put down roots here for decades.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Craftsman and Tudor heritage homes sit alongside newer duplexes, townhome complexes, and boutique condos. The blend of old and new feels organic.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in South Cambie</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Morning coffee on Cambie Street. Walk the kids to Jamieson or Van Horne, then twelve minutes on the Canada Line to downtown. After school: swimming at Hillcrest or soccer at Douglas Park. Groceries at Cambie Village. Weekends: Bloedel Conservatory, pitch and putt at QE Park, or a Vancouver Canadians game at Nat Bailey Stadium.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Proximity to Vancouver General Hospital also makes it practical for healthcare professionals and anyone who values nearby medical care.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  South Cambie Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  South Cambie offers diverse housing types across a range of price points:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$650K - $1.3M", desc: "Modern units near SkyTrain along the Cambie Corridor. GVR benchmark: $1.02M. Attractive to first-time buyers and investors." },
                    { type: "Townhomes", range: "$1.2M - $1.8M", desc: "Well-designed complexes, many from the Cambie Corridor Plan. GVR benchmark: $1.56M. Popular with young families." },
                    { type: "Detached Homes", range: "$2.5M - $5.0M+", desc: "Heritage homes and newer builds on generous lots. GVR benchmark: $4.16M. Many offer renovation or laneway suite potential." },
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
                  GVR MLS® HPI composite benchmark: $1.44M (January 2026, -9.5% YoY). Detached benchmark: $4.16M. Long-term appreciation driven by the Canada Line, controlled densification, and Queen Elizabeth Park.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    The Cambie Corridor Plan adds housing while improving walkability and amenities. Canada Line neighborhoods have historically outperformed the broader market. The nearby Oakridge Park redevelopment, completing in phases through 2026+, will bring retail, dining, and amenities to the doorstep.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Central location and strong transit make South Cambie one of Vancouver&apos;s most connected residential areas:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "King Edward and Oakridge-41st stations. Downtown in 12 minutes, YVR in 20." },
                    { mode: "Bus", detail: "Cambie (15), King Edward (25), and 41st (43) connect to UBC, Commercial-Broadway, and surrounding neighborhoods." },
                    { mode: "Cycling", detail: "Ontario and Heather Street bike routes pass through the area. Arbutus Greenway accessible to the west." },
                    { mode: "Driving", detail: "Cambie and Oak streets run north-south to downtown and the airport. King Edward and 41st provide east-west connections." },
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
                  Parks
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  South Cambie&apos;s parks are defining features of the neighborhood:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Queen Elizabeth Park", desc: "Vancouver's highest point and second-most visited park. 130 acres with the Bloedel Conservatory, pitch and putt, tennis courts, rose gardens, arboretum, and panoramic city and mountain views." },
                    { name: "Hillcrest Community Centre & Park", desc: "Built for the 2010 Olympics. Aquatic centre, ice rink, gymnasium, fitness facilities, and outdoor fields. One of the city's premier recreation complexes." },
                    { name: "Douglas Park", desc: "Playground, sports fields, tennis courts, community centre, and wading pool. A family gathering spot with year-round programs." },
                    { name: "Nat Bailey Stadium Area", desc: "Home to the Vancouver Canadians baseball team. Summer evening games are a South Cambie tradition." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  South Cambie&apos;s school catchments are among Vancouver&apos;s most desirable:
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Sir William Van Horne Elementary", type: "K-7 Public", detail: "Walking distance for most families. Strong academics and engaged parent community." },
                      { name: "Jamieson Elementary", type: "K-7 Public", detail: "Diverse programs and a welcoming environment." },
                      { name: "Eric Hamber Secondary", type: "8-12 Public", detail: "One of Vancouver's most sought-after public high schools. Strong academics, arts, athletics, and an IB pathway." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Post-Secondary &amp; Nearby Options</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Langara College", type: "Post-Secondary", detail: "At 49th and Cambie. Serves 23,000+ students with university transfer, career training, and continuing education." },
                      { name: "King David High School", type: "Private", detail: "Independent Jewish high school with strong academics." },
                      { name: "Vancouver College", type: "Private", detail: "Established Catholic boys' school with a tradition of academic and athletic excellence." },
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
                  Cambie Village around King Edward anchors the scene: independent cafes, bakeries, restaurants, and everyday shops in a walkable setting where the barista knows your order.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Oakridge Park at 41st and Cambie will deliver 500,000+ square feet of retail, including Time Out Market. World-class shopping a short walk or one SkyTrain stop away.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Main Street&apos;s boutiques, breweries, and restaurants are a short trip east. Granville Street to the west adds more retail.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Supermarkets along Cambie and 41st handle daily needs. Seasons in the Park at Queen Elizabeth Park offers fine dining with panoramic mountain and city views.
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
