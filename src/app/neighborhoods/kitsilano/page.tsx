import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Kitsilano Vancouver Real Estate Guide 2026 | Beach Living & Market Data",
  description:
    "The definitive guide to Kitsilano, Vancouver. Explore beach lifestyle, real estate market data, West 4th Avenue dining, top schools, parks, and transit. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Kitsilano Vancouver real estate",
    "Kitsilano homes for sale",
    "Kitsilano condos",
    "Kitsilano Beach Vancouver",
    "Kitsilano neighborhood guide",
    "buy home Kitsilano Vancouver",
    "West 4th Avenue Vancouver",
    "Kitsilano rentals",
  ],
};

const faqs = [
  {
    question: "Is Kitsilano a good neighborhood to buy a home in?",
    answer:
      "Kitsilano is one of Vancouver's most sought-after neighborhoods, consistently ranking among the city's top areas for livability. Its combination of beach access, vibrant dining and shopping on West 4th Avenue and Broadway, strong transit connections, and proximity to both downtown and UBC make it appealing to a wide range of buyers. Property values in Kitsilano have shown strong long-term appreciation, supported by limited land supply and enduring demand from young professionals, families, and investors.",
  },
  {
    question: "How much does a home cost in Kitsilano Vancouver?",
    answer:
      "Kitsilano offers a broad range of housing options. The GVR MLS® HPI composite benchmark price is approximately $1.25M. Condos typically range from $550K to $1.2M depending on size and proximity to the beach. Detached homes, which are increasingly rare, typically start around $2.0M and can exceed $4M for larger lots or heritage properties. Townhomes generally fall in the $1.2M to $1.8M range.",
  },
  {
    question: "What is the lifestyle like in Kitsilano?",
    answer:
      "Kitsilano is known for its active, outdoor-oriented lifestyle. Residents enjoy easy access to Kitsilano Beach, Jericho Beach, and Vanier Park for swimming, volleyball, cycling, and kayaking. The neighbourhood has a strong cafe culture, with West 4th Avenue and Broadway offering an eclectic mix of restaurants, yoga studios, boutique shops, and craft breweries. It attracts a younger demographic compared to other west-side neighbourhoods, with a laid-back, health-conscious vibe.",
  },
  {
    question: "How do I get around from Kitsilano?",
    answer:
      "Kitsilano is one of Vancouver's best-connected neighbourhoods. The 99 B-Line express bus runs along Broadway, providing fast service to Commercial-Broadway SkyTrain station and UBC. The future Broadway Subway extension (opening 2026) will add rapid transit along the Broadway corridor. Multiple bus routes connect to downtown, and the Burrard Bridge provides direct cycling and driving access. Kitsilano is also one of Vancouver's most bikeable neighbourhoods, with dedicated cycling infrastructure throughout.",
  },
  {
    question: "What schools are near Kitsilano?",
    answer:
      "Kitsilano is well-served by public schools including Kitsilano Secondary (8-12), Henry Hudson Elementary, General Gordon Elementary, and Bayview Community School. St. Augustine's School offers a private Catholic option. The neighbourhood's proximity to UBC also provides access to university events, libraries, and cultural programs. Several well-regarded Montessori and private preschools operate in the area as well.",
  },
];

const kitsilanoData = NEIGHBOURHOODS["kitsilano"];

export default async function KitsilanoPage() {
  const pois = await fetchNeighbourhoodPOIs(kitsilanoData.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Kitsilano</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Kitsilano, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.25M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">88</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">3</p>
                  <p className="text-xs text-warm-500 mt-1">Beaches</p>
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
                  ["living", "Living in Kitsilano", "2"],
                  ["real-estate", "Real Estate Market", "3"],
                  ["transit", "Getting Around", "4"],
                  ["parks", "Parks & Beaches", "5"],
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
                      ["Kerrisdale", "kerrisdale"],
                      ["UBC", "ubc"],
                      ["South Cambie", "south-cambie"],
                      ["Cambie Corridor", "cambie-corridor"],
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
                  Kitsilano is one of Vancouver&apos;s most iconic and beloved neighbourhoods, stretching along the south shore of English Bay from Burrard Street to Alma Street. Known simply as &ldquo;Kits&rdquo; to locals, the neighbourhood has evolved from its 1960s counterculture roots into one of the city&apos;s most desirable residential areas, attracting young professionals, active families, and anyone drawn to a beach-oriented, health-conscious lifestyle.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What makes Kitsilano special is the rare combination of urban convenience and natural beauty. You can grab a morning coffee on West 4th Avenue, cycle to work downtown across the Burrard Bridge, and be back on the beach for a sunset volleyball game, all in the same day. The neighbourhood&apos;s tree-lined streets are a mix of character homes, low-rise condos, and heritage conversions, giving Kits a varied streetscape that feels distinctly different from the high-rise density of downtown or the uniform residential character of other west-side neighbourhoods.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Kitsilano also benefits from exceptional connectivity. Broadway, one of Vancouver&apos;s most important commercial corridors, runs along its southern edge, and the upcoming Broadway Subway extension will further enhance transit access. Whether you are looking for a lively urban lifestyle with beach access or a well-connected base close to both UBC and downtown, Kitsilano delivers on all fronts.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={kitsilanoData.center}
                  zoom={kitsilanoData.zoom}
                  pois={pois.length > 0 ? pois : kitsilanoData.fallbackPOIs}
                  boundaryName="Kitsilano"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Kitsilano */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Kitsilano
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Life in Kitsilano revolves around the outdoors. On any given evening, the seawall is filled with joggers, cyclists, and dog walkers. Kitsilano Beach Park draws crowds for beach volleyball, swimming in the outdoor saltwater pool, and watching the sun set behind the North Shore mountains. On weekends, Jericho Beach and Spanish Banks offer quieter stretches of sand with views across to the mountains and the islands beyond.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood has a strong cafe and wellness culture. Yoga studios, organic grocers, and independent coffee shops are woven into the streetscape alongside boutique fitness studios and health food restaurants. West 4th Avenue is the main commercial strip, offering everything from sushi to farm-to-table dining, vintage clothing to artisanal home goods.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kitsilano attracts a younger demographic than many west-side neighbourhoods. You will find a mix of tech workers, creatives, graduate students, and young families. The energy is laid-back but engaged, with a strong sense of community that shows up at farmers markets, beach cleanups, and neighbourhood events.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For families, Kitsilano offers good public schools, numerous parks and playgrounds, and a safe, walkable environment. The neighbourhood is also home to Vanier Park, which houses the Museum of Vancouver, the H.R. MacMillan Space Centre, and the Vancouver Maritime Museum, providing world-class cultural attractions just steps from home.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Kitsilano Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kitsilano&apos;s real estate market is diverse, offering everything from compact condos to heritage character homes on tree-lined streets:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$550K - $1.2M", desc: "The dominant housing type in Kitsilano. Low-rise and mid-rise buildings are concentrated along Broadway, West 4th Avenue, and the side streets between. Benchmark price is approximately $780K. One-bedroom units near the beach are especially popular with young professionals." },
                    { type: "Detached Homes", range: "$2.0M - $4.5M+", desc: "Increasingly rare and highly valued. A mix of original craftsman bungalows, character conversions, and newer custom builds. Larger lots south of West 4th command premium prices, while homes closer to the beach can exceed $4M." },
                    { type: "Townhomes & Duplexes", range: "$1.2M - $1.8M", desc: "Growing in supply as older homes are converted or replaced. Popular with families seeking more space than a condo without the price tag of a detached home. Heritage conversions are a distinctive Kitsilano housing type." },
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
                  Kitsilano&apos;s market is driven by consistently high demand from buyers who prioritize lifestyle and location. The neighbourhood&apos;s walkability, beach access, and transit connectivity make it particularly attractive to a younger buyer demographic compared to other west-side areas.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    The Broadway Subway extension, set to open in 2026, will significantly enhance Kitsilano&apos;s transit connectivity, potentially increasing property values along the Broadway corridor. Combined with limited land for new development, strong rental demand from UBC students and young professionals, and the enduring appeal of beach-side living, Kitsilano is well-positioned for long-term appreciation.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Kitsilano is one of the best-connected neighbourhoods in Vancouver, with excellent transit, cycling infrastructure, and walkability:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus & SkyTrain", detail: "The 99 B-Line express runs along Broadway, connecting Kitsilano to Commercial-Broadway SkyTrain station (20 minutes) and UBC (15 minutes). The Broadway Subway extension will bring rapid transit directly to the corridor. Additional bus routes run along 4th Avenue, Macdonald, Alma, and Arbutus streets." },
                    { mode: "Cycling", detail: "Kitsilano is Vancouver's cycling heartland. Dedicated bike lanes run along the Seaside Greenway (seawall), Point Grey Road, and several north-south routes. Cycling downtown via the Burrard Bridge takes about 15 minutes. The neighbourhood consistently ranks as one of the most bikeable in Canada." },
                    { mode: "Driving", detail: "Direct access to downtown via Burrard or Granville bridges (10-15 minutes). UBC is approximately 10 minutes west along West 4th or Broadway. The airport is reachable in about 25 minutes via Granville Street." },
                    { mode: "Walking", detail: "With a walk score of 88, almost all daily needs are within walking distance. The seawall provides a continuous waterfront path from Vanier Park to downtown and beyond. West 4th Avenue and Broadway offer two parallel commercial corridors for errands and dining." },
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

              {/* Parks & Beaches */}
              <section id="parks" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Parks &amp; Beaches
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Beaches and green space are central to the Kitsilano lifestyle:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Kitsilano Beach Park", desc: "The neighbourhood's crown jewel. A wide sandy beach with beach volleyball courts, a massive outdoor saltwater swimming pool (137m long, the longest in Canada), tennis courts, a basketball court, and a playground. The views across English Bay to the North Shore mountains are spectacular." },
                    { name: "Jericho Beach", desc: "A quieter, more laid-back beach on Kitsilano's western edge. Popular for kayaking, sailing (home to the Jericho Sailing Centre), and picnics. The grassy areas behind the beach are perfect for frisbee and kite flying. Hosts the annual Vancouver Folk Music Festival." },
                    { name: "Vanier Park", desc: "A large waterfront park that is home to the Museum of Vancouver, H.R. MacMillan Space Centre, and Vancouver Maritime Museum. Great for kite flying, with stunning views of the city skyline, Burrard Bridge, and the mountains." },
                    { name: "Hadden Park", desc: "A smaller waterfront park between Kitsilano Beach and Vanier Park, with a boat launch, picnic areas, and beautiful views of False Creek. A quieter alternative to the main beach." },
                    { name: "Tatlow Park", desc: "A neighbourhood park with a creek running through it, playground equipment, and walking paths beneath a canopy of mature trees. A local favourite for families with young children." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Kitsilano Community Centre on West 12th Avenue offers a swimming pool, ice rink, fitness centre, and a wide range of programs for all ages. The adjacent Connaught Park provides sports fields, tennis courts, and open green space.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Kitsilano offers solid educational options at all levels, with proximity to UBC adding further academic resources:
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Henry Hudson Elementary", type: "K-7 Public", detail: "A well-regarded neighbourhood school in the heart of Kitsilano with strong academics and an active parent community. Known for its arts and music programs." },
                      { name: "General Gordon Elementary", type: "K-7 Public", detail: "Located on the western edge of Kitsilano, serving families in the Jericho area. Offers both regular and French Immersion programs." },
                      { name: "Bayview Community School", type: "K-7 Public", detail: "A community-oriented school near the waterfront with strong community engagement and after-school programs." },
                      { name: "Kitsilano Secondary", type: "8-12 Public", detail: "The neighbourhood's main high school, known for strong academics, athletics, and a diverse student body. Offers AP courses, French Immersion, and a range of extracurricular activities." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Private Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "St. Augustine's School", type: "K-7 Private (Catholic)", detail: "A well-established Catholic school in Kitsilano offering small class sizes and a strong values-based education." },
                      { name: "West Point Grey Academy", type: "JK-12 Private (Nearby)", detail: "A top-ranked co-ed independent school located just west of Kitsilano, known for academic excellence and a strong arts program." },
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
                <p className="text-warm-600 leading-relaxed">
                  UBC is just a 10-15 minute bus ride from Kitsilano, giving families access to university libraries, cultural events, athletic facilities, and educational programs. Several well-regarded Montessori and preschool programs also operate in the neighbourhood.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">West 4th Avenue</p>
                  <p className="text-sm text-gold-700">
                    Kitsilano&apos;s main commercial strip, running from Burrard to Alma, is one of Vancouver&apos;s most diverse and vibrant shopping corridors. Over 200 shops, restaurants, and cafes make it a destination for both locals and visitors.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  West 4th Avenue is the heartbeat of Kitsilano&apos;s commercial life. The strip offers an eclectic mix that reflects the neighbourhood&apos;s personality: independent bookstores sit alongside surf shops, organic juice bars next to craft beer taprooms, and artisan bakeries beside vintage clothing stores. It is one of the few Vancouver shopping streets that still feels genuinely local and unchain-like.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The dining scene in Kitsilano is among the best in Vancouver. You will find everything from casual beachside patio dining and award-winning sushi to farm-to-table restaurants and trendy brunch spots. The neighbourhood is particularly well-known for its Japanese restaurants, Thai cuisine, and modern West Coast fare.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Broadway, along Kitsilano&apos;s southern boundary, adds another layer of commercial convenience with grocery stores, banks, medical offices, and larger retail. Between these two corridors, Kitsilano residents have virtually everything they need within walking or cycling distance.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The Kitsilano Farmers Market, held at the Kitsilano Community Centre on Sundays from May to October, is a beloved neighbourhood institution offering local produce, baked goods, artisan crafts, and prepared foods.
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
