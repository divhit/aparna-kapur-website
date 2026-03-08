import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Hastings-Sunrise | Real Estate Guide",
  description:
    "The definitive guide to Hastings-Sunrise, Vancouver. Explore PNE/Playland, real estate, schools, parks, transit, and community life. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Hastings-Sunrise Vancouver real estate",
    "Hastings-Sunrise homes for sale",
    "PNE Vancouver neighbourhood",
    "Hastings-Sunrise neighborhood guide",
    "buy home Hastings-Sunrise Vancouver",
    "East Vancouver affordable homes",
    "Hastings-Sunrise condos",
    "Hastings Street Vancouver",
  ],
};

const faqs = [
  {
    question: "Is Hastings-Sunrise a good neighborhood to buy a home in?",
    answer:
      "Hastings-Sunrise offers strong value on Vancouver's east side: relatively affordable housing, genuine community character, proximity to the PNE grounds and waterfront parks, and improving transit. New restaurants, shops, and amenities have enhanced livability in recent years. For families and first-time buyers, it is one of the best entry points into the Vancouver market within easy reach of downtown.",
  },
  {
    question: "How much does a home cost in Hastings-Sunrise Vancouver?",
    answer:
      "The composite benchmark is approximately $1.2M. Detached homes (character homes and newer builds) range from $1.2M to $1.7M. Condos run $450K to $750K, townhomes $800K to $1.2M. Notably better value than comparable west-side areas, making it popular with young families and investors.",
  },
  {
    question: "What is there to do near Hastings-Sunrise?",
    answer:
      "Hastings Park includes the PNE fairgrounds, Playland, the Pacific Coliseum, and Hastings Racecourse. The annual PNE summer fair is one of Vancouver's largest events. New Brighton Park offers a waterfront pool and harbour views. A growing cafe and restaurant scene along East Hastings features excellent Italian, Vietnamese, and Chinese dining.",
  },
  {
    question: "How is the transit in Hastings-Sunrise?",
    answer:
      "Major bus routes along East Hastings provide frequent east-west service to downtown and the eastern suburbs. Renfrew and Rupert SkyTrain stations (Expo Line) sit on the southern boundary, reaching downtown in about 15 minutes. Bus and SkyTrain together make car-light living feasible.",
  },
  {
    question: "What are the schools like in Hastings-Sunrise?",
    answer:
      "Several well-regarded public schools serve the area. Hastings Elementary is known for its diverse community and strong parent involvement. Templeton Secondary offers comprehensive programs including athletics and arts. Additional elementary options include Graham, Franklin, and Tillicum. The diverse student populations reflect the multicultural character of the community.",
  },
];

const neighbourhoodData = NEIGHBOURHOODS["hastings-sunrise"];

export default async function HastingsSunrisePage() {
  const pois = await fetchNeighbourhoodPOIs(neighbourhoodData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Hastings-Sunrise", href: "/neighborhoods/hastings-sunrise" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/neighborhoods/hastings-sunrise.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Hastings-Sunrise</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Hastings-Sunrise, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.2M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">PNE</p>
                  <p className="text-xs text-warm-500 mt-1">Playland</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">85</p>
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
                  ["living", "Living in Hastings-Sunrise", "2"],
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
                      ["Grandview-Woodland", "grandview-woodland"],
                      ["Strathcona", "strathcona"],
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
                  Hastings-Sunrise stretches from Clark Drive to Boundary Road, Burrard Inlet to Broadway. Generations of Italian, Chinese, Vietnamese, and South Asian families have built a rich, multicultural community with deep roots and genuine character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Best known as the home of Hastings Park (PNE, Playland, Pacific Coliseum), it is also a neighbourhood of quiet streets, well-maintained gardens, and a growing East Hastings corridor that has attracted new cafes, bakeries, and restaurants in recent years.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For buyers, Hastings-Sunrise is one of Vancouver&apos;s best value propositions: genuine community character, improving amenities, and proximity to downtown at price points well below the west side. On the rise, yet still grounded and unpretentious.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={neighbourhoodData.center}
                  zoom={neighbourhoodData.zoom}
                  pois={pois.length > 0 ? pois : neighbourhoodData.fallbackPOIs}
                  boundaryName="Hastings-Sunrise"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Hastings-Sunrise */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Hastings-Sunrise
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  People have put down roots here for generations. Residential streets are lined with well-kept character homes, front porches, and mature fruit trees. Neighbours wave to each other, community gardens flourish, and local businesses know their regulars by name.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Housing mixes character homes (1920s-1960s), Vancouver Specials (1970s-1980s), and newer laneway houses and infill projects. Many homes sit on generous lots with established gardens, offering outdoor space that newer developments cannot match.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A typical weekend: morning coffee at a specialty cafe on East Hastings, a family outing to Playland, or a walk through New Brighton Park along the waterfront. In summer, the PNE fair brings carnival rides, agricultural exhibits, and live entertainment. Year-round, Hastings Park serves as a large urban green space.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Family-friendly with plenty of elementary schools, community centres, and parks. The evolving East Hastings restaurant and cafe scene also draws younger professionals who appreciate the authenticity and affordability.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Hastings-Sunrise Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Some of the most accessible pricing in Vancouver proper, popular with families and first-time buyers:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.2M - $1.7M", desc: "Character homes, Vancouver Specials, and newer builds. Standard 33-foot lots with strong renovation potential. Laneway house construction is common." },
                    { type: "Condominiums", range: "$450K - $750K", desc: "Growing supply in mid-rise developments along Hastings Street and near SkyTrain. An accessible entry point into Vancouver homeownership." },
                    { type: "Townhomes", range: "$800K - $1.2M", desc: "New developments along major corridors with modern, family-friendly layouts." },
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
                  The eastward migration of Vancouver buyers seeking value has driven steady appreciation over the past decade as amenities and transit have improved.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Strong long-term value: improving East Hastings amenities, SkyTrain at Renfrew and Rupert, and ongoing Hastings Park redevelopment. Well-positioned for sustained growth while maintaining the affordability advantage that draws buyers.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Solid transit infrastructure supports multiple travel modes:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Renfrew and Rupert stations (Expo Line) on the southern edge. Downtown in about 15 minutes, with Millennium Line transfers at Commercial-Broadway." },
                    { mode: "Bus", detail: "East Hastings is a major bus corridor with frequent service to downtown and eastern suburbs. Renfrew and Nanaimo Streets provide north-south connections." },
                    { mode: "Cycling", detail: "Flat terrain makes cycling practical. The Adanac Bikeway provides an east-west corridor through the neighbourhood." },
                    { mode: "Driving", detail: "Easy access to Hastings Street, Renfrew Street, and Highway 1 via the Cassiar Connector. Downtown is 15-20 minutes by car." },
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
                  A strong park network anchored by Hastings Park:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Hastings Park (PNE Grounds)", desc: "PNE fairgrounds, Playland, Pacific Coliseum, Hastings Racecourse. Outside fair season: extensive walking paths, Empire Fields sports complex, the Italian Garden, and Momiji Garden." },
                    { name: "New Brighton Park", desc: "Waterfront gem on Burrard Inlet with a saltwater outdoor pool, playground, sports courts, and harbour views. A rare ocean connection on the east side." },
                    { name: "Sunrise Park", desc: "Playground, wading pool, and sports fields. A neighbourhood gathering point with summer community events." },
                    { name: "McGill Park", desc: "Quiet park with a playground, open green space, and mature trees." },
                    { name: "E-Comm Park & Greenways", desc: "Several greenway connections and pocket parks link residential areas to larger parks and commercial streets." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  Hastings Community Centre provides fitness facilities and programs for all ages. The PNE Forum hosts events, trade shows, and concerts year-round.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Well-served by public schools reflecting the neighbourhood&apos;s diverse, family-oriented character:
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Hastings Elementary", type: "K-7 Public", detail: "Well-established with a diverse student body, active parent advisory council, and strong extracurriculars." },
                      { name: "Templeton Secondary", type: "8-12 Public", detail: "Comprehensive academic, athletic, and arts programming. Known for its inclusive, diverse environment." },
                      { name: "Graham Elementary", type: "K-7 Public", detail: "Smaller school with a warm community feel. Strong literacy and numeracy programs." },
                      { name: "Franklin Elementary", type: "K-7 Public", detail: "Community school emphasizing social-emotional learning alongside strong academics." },
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
                  Diverse student populations provide children with a broad worldview. Many schools offer strong English Language Learning (ELL) programs supporting immigrant families.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">East Hastings Street</p>
                  <p className="text-sm text-gold-700">
                    A quiet renaissance in recent years. New specialty cafes, bakeries, and restaurants have joined long-established Italian delis, Vietnamese pho shops, and Chinese bakeries, creating one of east Vancouver&apos;s most interesting food corridors.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The dining scene reflects its Italian and East Asian communities: some of the city&apos;s best pho restaurants, authentic Chinese bakeries, classic Italian trattorias, and an emerging wave of modern brunch spots.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Grocery options include large Asian supermarkets, Italian specialty stores, and conventional chains along East Hastings and Nanaimo Street.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Affordable commercial rents have attracted specialty food producers, craft breweries, and artisan businesses.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Big-box retail is nearby in the Renfrew and Rupert areas, and Commercial Drive is a short trip west.
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
