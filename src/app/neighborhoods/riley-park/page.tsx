import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodReportSignup from "@/components/neighborhoods/NeighbourhoodReportSignup";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import MarketPriceLinks from "@/components/market/MarketPriceLinks";
import NeighbourhoodListings from "@/components/neighborhoods/NeighbourhoodListings";

/** Listings are live data; regenerate hourly rather than freezing at build. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Riley Park Vancouver Homes for Sale | Prices & Area Guide",
  description:
    "Homes for sale in Riley Park, Vancouver, with the current MLS® HPI benchmark, price trends by property type, schools, transit, and what it is like to live here.",
  keywords: [
    "Riley Park Vancouver real estate",
    "Riley Park homes for sale",
    "Main Street Vancouver",
    "Riley Park neighborhood guide",
    "buy home Riley Park Vancouver",
    "Riley Park craft breweries",
    "Riley Park character homes",
  ],
};

const faqs = [
  {
    question: "What is the average home price in Riley Park, Vancouver?",
    answer:
      "As of July 2026, the GVR MLS\u00ae HPI Main sub-area (which covers Riley Park) composite benchmark is $1.58M. The Vancouver East detached benchmark is $1.64M, condos start around $629K, and townhomes around $1.01M. Heritage character homes near Main Street can exceed $2.5M. For a personalized Riley Park market analysis, contact Aparna Kapur at 604-612-7694.",
  },
  {
    question: "Is Riley Park a good neighbourhood to buy in?",
    answer:
      "Yes \u2014 Riley Park is one of Vancouver\u2019s most desirable neighbourhoods. Character homes line quiet, tree-lined streets just steps from Main Street\u2019s independent shops, craft breweries (33 Acres, Brassneck), and acclaimed restaurants. Nat Bailey Stadium hosts summer baseball, and families love the proximity to parks and strong schools. Walkable, community-driven, and family-friendly, it\u2019s a strong long-term investment.",
  },
  {
    question: "What is Riley Park known for?",
    answer:
      "Riley Park is known for Main Street\u2019s vibrant independent shops, Vancouver\u2019s craft brewery district (10+ breweries), heritage and character homes, and Nat Bailey Stadium. Queen Elizabeth Park with its Bloedel Conservatory and rose gardens sits just to the west. The neighbourhood is creative, walkable, and fiercely independent \u2014 no chain stores.",
  },
  {
    question: "What schools are in Riley Park?",
    answer:
      "Riley Park is served by General Wolfe Elementary, Emily Carr Elementary, and Sir William Van Horne Elementary (K\u20137). Sir Charles Tupper Secondary offers French Immersion and strong arts programs. Eric Hamber Secondary is an alternative catchment nearby. Langara College at 49th and Cambie provides post-secondary options.",
  },
  {
    question: "Who is the best realtor for Riley Park Vancouver?",
    answer:
      "Aparna Kapur with Oakwyn Realty is a south Vancouver specialist with deep knowledge of Riley Park\u2019s character homes, market trends, and neighbourhood culture. Whether you\u2019re buying your first home or selling a heritage property, Aparna provides expert guidance. Reach her at 604-612-7694.",
  },
];

const rileyParkData = NEIGHBOURHOODS["riley-park"];

export default async function RileyParkPage() {
  const pois = await fetchNeighbourhoodPOIs(rileyParkData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Riley Park", href: "/neighborhoods/riley-park" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/neighborhoods/riley-park.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Riley Park</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Riley Park, Vancouver
          </h1>
        </div>
      </section>

      <NeighbourhoodListings slug="riley-park" />

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="hidden lg:block" />
            <div className="lg:col-span-3">
              <div className="grid grid-cols-3 gap-6 max-w-2xl">
                <div>
                  <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["riley-park"].avgPrice}</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">10+</p>
                  <p className="text-xs text-warm-500 mt-1">Craft Breweries</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">94</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
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
                  ["living", "Living in Riley Park", "2"],
                  ["real-estate", "Real Estate Market", "3"],
                  ["transit", "Getting Around", "4"],
                  ["parks", "Parks & Recreation", "5"],
                  ["schools", "Schools & Education", "6"],
                  ["shopping", "Shopping & Dining", "7"],
                  ["faq", "FAQ", "8"],
                  ["related", "Related Areas", "9"],
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
                      ["Cambie Corridor", "cambie-corridor"],
                      ["South Cambie", "south-cambie"],
                      ["Kitsilano", "kitsilano"],
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
                  Riley Park sits in central Vancouver between King Edward, 41st Avenue, Main Street, and Cambie Street. A trend-setting neighborhood where creative energy and community spirit meet.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Home to Vancouver&apos;s craft brewery district, this is a neighborhood built on independents: boutiques, acclaimed restaurants, and local cafes. No chain stores.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Nat Bailey Stadium, a heritage ballpark hosting Vancouver Canadians summer baseball, anchors the community. Local character, walkability, and connection define life here.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={rileyParkData.center}
                  zoom={rileyParkData.zoom}
                  pois={pois.length > 0 ? pois : rileyParkData.fallbackPOIs}
                  boundaryName="Riley Park"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Riley Park */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Riley Park
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Step off Main Street and you are on quiet, tree-lined blocks with character homes and the occasional newer infill. Mature canopies, tended gardens, and neighbors who know each other.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Popular with young professionals and growing families. Residents support local businesses and show up for community events.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Flat white from a specialty roaster on Main. Walk the kids to Emily Carr Elementary. Cycle to work via the Ontario Street Greenway. After school: swimming at Hillcrest. Evening: pints at Brassneck, farm-to-table dinner, or Vancouver Canadians baseball at Nat Bailey with mountains glowing behind the outfield.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Weekends: farmers&apos; market, vintage shops on Main, Queen Elizabeth Park. Creative, connected, and grounded in community.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Riley Park Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Strong demand and a housing stock that rewards buyers who appreciate character and charm.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Character Homes", range: "$1.4M - $2.5M+", desc: "Original Craftsman bungalows, Vancouver Specials, and heritage homes on established lots. Van East detached benchmark: $1.64M." },
                    { type: "Duplexes & Townhomes", range: "$850K - $1.4M", desc: "Side-by-side and stacked duplexes, plus newer townhome developments. Van East townhome benchmark: $1.00M." },
                    { type: "Condos & Apartments", range: "$450K - $800K", desc: "Low-rise and mid-rise buildings, many along or near Main Street. Van East condo benchmark: $625K." },
                  ].map((item) => (
                    <div key={item.type} className="bg-warm-50 rounded-xl p-5 border-l-4 border-teal-500">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-serif text-teal-700">{item.range}</span>
                        <h4 className="font-medium text-teal-950">{item.type}</h4>
                      </div>
                      <p className="text-sm text-warm-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Main sub-area composite benchmark: $1.62M (July 2026, -3.6% YoY). Vancouver East detached benchmark: $1.64M. Character homes in prime locations can exceed $2.5M. Demand outpaces supply, especially for well-maintained heritage homes. Main Street proximity commands a premium.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Long-term value drivers: Cambie Corridor densification, the Broadway Subway extension, limited detached supply, and growing demand for walkable, character-rich neighborhoods. Properties with laneway suite or duplex zoning potential offer strong returns.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Riley Park offers strong transit connectivity and is highly walkable.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "King Edward (Canada Line) to the west; Broadway-City Hall (Expo/Millennium) to the north. Downtown in 15 min." },
                    { mode: "Bus", detail: "The 3 runs the length of Main Street. King Edward (25), Broadway (9/99 B-Line), and 41st (43) provide east-west connections." },
                    { mode: "Cycling", detail: "Ontario Street Greenway provides a dedicated north-south route. Flat terrain makes cycling a popular commute option." },
                    { mode: "Walking", detail: "Walk score in the 90s. Most errands, dining, and shopping within walking distance of Main Street." },
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

              {/* Parks & Recreation */}
              <section id="parks" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Parks
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Riley Park residents have access to excellent parks, recreation facilities, and green spaces:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 mb-6 space-y-5">
                  {[
                    { name: "Riley Park", desc: "Sports fields, playground, and Nat Bailey Stadium (Vancouver Canadians baseball). Summer evening games with the North Shore mountains as backdrop are a quintessential Vancouver experience." },
                    { name: "Hillcrest Community Centre & Park", desc: "Built for the 2010 Olympics. 50-metre pool, ice rink, gymnasium, fitness centre, library branch, playgrounds, and playing fields." },
                    { name: "Queen Elizabeth Park", desc: "Just west of Riley Park. Bloedel Conservatory, rose gardens, arboretum, pitch-and-putt, and panoramic city and mountain views." },
                    { name: "Douglas Park", desc: "Northern edge of the neighborhood. Community centre, outdoor pool, tennis courts, playgrounds, and off-leash dog area." },
                  ].map((park) => (
                    <div key={park.name}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schools & Education */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Riley Park serves families well with strong public schools at every level:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 mb-6 space-y-4">
                  {[
                    { name: "General Wolfe Elementary", type: "K-7 Public", detail: "Serves the heart of Riley Park. Strong community engagement." },
                    { name: "Emily Carr Elementary", type: "K-7 Public", detail: "Excellent catchment school with a welcoming community." },
                    { name: "Sir William Van Horne Elementary", type: "K-7 Public", detail: "Near the western edge, serving the Cambie-Riley Park border." },
                    { name: "Sir Charles Tupper Secondary", type: "8-12 Public", detail: "French Immersion, strong arts, and diverse extracurriculars." },
                    { name: "Eric Hamber Secondary", type: "8-12 Public", detail: "Alternative catchment just west. Strong academics and athletics." },
                    { name: "Langara College", type: "Post-Secondary", detail: "At 49th and Cambie. University transfer, diplomas, and continuing education for 23,000+ students." },
                  ].map((school) => (
                    <div key={school.name} className="flex items-start gap-3">
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
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Independent ownership defines Riley Park, from bookshops and record stores to farm-to-table restaurants and coffee roasters. No big box retailers. That is the point.
                </p>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">The Craft Brewery District</p>
                  <p className="text-sm text-gold-700">
                    Main Street is the epicentre of Vancouver&apos;s craft beer scene. 33 Acres, Brassneck, Main Street Brewing, Faculty Brewing, and others form a walkable brewery district. Tasting rooms double as gathering spots, hosting events, art shows, and food pop-ups.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The dining scene spans cuisines and price points: acclaimed restaurants, wine bars, family pizzerias, and international kitchens. The vintage and thrift scene is among Vancouver&apos;s best, with mid-century furniture, rare vinyl, and vintage clothing.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For everyday needs, the neighborhood has independent grocers, pharmacies, and services along Main Street and King Edward Avenue. Larger shopping options at Oakridge just minutes away.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={faqs} />
              </section>

              {/* Related Neighbourhoods */}
              <section id="related" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Related Neighbourhoods
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["South Cambie", "south-cambie"],
                    ["Mount Pleasant", "mount-pleasant"],
                    ["Kensington-Cedar Cottage", "kensington-cedar-cottage"],
                    ["Oakridge", "oakridge"],
                  ].map(([name, slug]) => (
                    <Link
                      key={slug}
                      href={`/neighborhoods/${slug}`}
                      className="group bg-warm-50 rounded-xl p-5 border border-warm-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors"
                    >
                      <p className="font-serif text-teal-950 group-hover:text-teal-700 transition-colors">
                        {name}
                      </p>
                      <p className="text-xs text-warm-500 mt-1">View neighbourhood guide</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href="/buying/search"
                    className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    Search all homes for sale in Vancouver
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodReportSignup neighbourhood="Riley Park" />

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
      <MarketPriceLinks slug="riley-park" />
    </>
  );
}
