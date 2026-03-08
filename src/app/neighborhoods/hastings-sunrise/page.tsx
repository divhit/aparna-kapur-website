import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Hastings-Sunrise Vancouver Real Estate Guide 2026 | Homes & Market Data",
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
      "Hastings-Sunrise is an excellent neighbourhood for buyers seeking value in Vancouver's east side. It offers a compelling combination of relatively affordable housing, strong community character, proximity to the PNE grounds and waterfront parks, and improving transit access. The neighbourhood has seen significant investment in recent years, with new restaurants, shops, and community amenities enhancing livability. For families and first-time buyers, Hastings-Sunrise represents one of the best opportunities for entry into the Vancouver market while still being within easy reach of downtown.",
  },
  {
    question: "How much does a home cost in Hastings-Sunrise Vancouver?",
    answer:
      "Hastings-Sunrise offers some of the more accessible pricing on Vancouver's east side. The composite benchmark across all property types is approximately $1.2M. Detached homes, which include a mix of character homes and newer builds, typically range from $1.2M to $1.7M. Condominiums range from $450K to $750K, and townhomes from $800K to $1.2M. The neighbourhood offers notably better value than comparable west-side areas, making it popular with young families and investors.",
  },
  {
    question: "What is there to do near Hastings-Sunrise?",
    answer:
      "Hastings-Sunrise is home to Hastings Park, which includes the Pacific National Exhibition (PNE) fairgrounds, Playland amusement park, the Pacific Coliseum, and the Hastings Racecourse. The annual PNE summer fair is one of Vancouver's largest community events. New Brighton Park offers a waterfront pool and harbour views. The neighbourhood also has a growing restaurant and cafe scene along East Hastings Street, with excellent Italian, Vietnamese, and Chinese dining options reflecting the area's diverse communities.",
  },
  {
    question: "How is the transit in Hastings-Sunrise?",
    answer:
      "Hastings-Sunrise is served by several major bus routes running along East Hastings Street, which provide frequent east-west service connecting to downtown Vancouver and the eastern suburbs. The Renfrew and Rupert SkyTrain stations on the Expo Line are located along the neighbourhood's southern boundary, providing rapid transit access to downtown (approximately 15 minutes), Burnaby, and points east. The combination of bus and SkyTrain service makes car-light living feasible for many residents.",
  },
  {
    question: "What are the schools like in Hastings-Sunrise?",
    answer:
      "Hastings-Sunrise is served by several well-regarded public schools. Hastings Elementary is a long-established neighbourhood school known for its diverse community and strong parent involvement. Templeton Secondary offers comprehensive programs including athletics and arts. The neighbourhood also has access to various elementary options including Graham, Franklin, and Tillicum schools. The diverse student populations at these schools reflect the multicultural character of the broader community.",
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
                  Hastings-Sunrise is a large, diverse residential neighbourhood in Vancouver&apos;s east side, stretching from Clark Drive to Boundary Road and from the Burrard Inlet waterfront south to Broadway. It is one of the city&apos;s most established working-class neighbourhoods, shaped by generations of Italian, Chinese, Vietnamese, and South Asian families who have built a rich, multicultural community with deep roots and genuine character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood is perhaps best known as the home of Hastings Park, which houses the Pacific National Exhibition (PNE), Playland amusement park, and the Pacific Coliseum. But beyond these well-known attractions, Hastings-Sunrise is a residential neighbourhood of quiet streets, lovingly maintained gardens, and a growing commercial corridor along East Hastings that has attracted an influx of new cafes, bakeries, and restaurants in recent years.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For homebuyers, Hastings-Sunrise represents one of Vancouver&apos;s best value propositions. The neighbourhood offers genuine community character, improving amenities, and reasonable proximity to downtown at price points significantly lower than the west side. It is a neighbourhood on the rise, yet one that retains the unpretentious, grounded feeling that has defined east Vancouver for generations.
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
                  Hastings-Sunrise has the feel of a neighbourhood where people have put down roots for generations. The residential streets are lined with well-kept character homes, many with the distinctive front porches and mature fruit trees that are hallmarks of east Vancouver living. Neighbours wave to each other, community gardens flourish, and local businesses know their regulars by name.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock is a comfortable mix of older character homes from the 1920s through the 1960s, Vancouver Specials from the 1970s and 1980s, and an increasing number of newer laneway houses and infill projects. Many homes sit on generous lots with established gardens and fruit trees, offering a level of outdoor living space that newer developments simply cannot match.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A typical weekend in Hastings-Sunrise might include a morning coffee at one of the new specialty cafes on East Hastings, followed by a family outing to Playland or a walk through New Brighton Park along the waterfront. In summer, the PNE fair transforms the neighbourhood with carnival rides, agricultural exhibits, and live entertainment. The rest of the year, the Hastings Park grounds serve as a large urban green space for jogging, walking, and community sports.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The neighbourhood has a distinctly family-friendly feel, with plenty of elementary schools, community centres, and parks that make it practical for raising children. At the same time, the evolving restaurant and cafe scene along East Hastings is attracting younger professionals who appreciate the neighbourhood&apos;s authenticity and relative affordability.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Hastings-Sunrise Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Hastings-Sunrise offers some of the most accessible pricing in the City of Vancouver proper, making it a popular choice for families and first-time buyers:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.2M - $1.7M", desc: "A mix of character homes, Vancouver Specials, and newer builds. Many lots are standard 33-foot widths, though larger parcels exist. Renovation potential is strong, and laneway house construction has become common." },
                    { type: "Condominiums", range: "$450K - $750K", desc: "A growing supply of condos, particularly in newer mid-rise developments along Hastings Street and near the SkyTrain stations. These offer an accessible entry point into Vancouver homeownership." },
                    { type: "Townhomes", range: "$800K - $1.2M", desc: "New townhome developments have appeared along major corridors, offering modern layouts with family-friendly configurations that appeal to growing households." },
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
                  Hastings-Sunrise has benefited from the general eastward migration of Vancouver buyers seeking value, and the neighbourhood has seen steady appreciation over the past decade as amenities and transit access have improved.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Hastings-Sunrise offers strong long-term value driven by improving commercial amenities along East Hastings, proximity to SkyTrain stations at Renfrew and Rupert, and the ongoing redevelopment of Hastings Park. As east Vancouver continues to attract investment and new residents, this neighbourhood is well-positioned for sustained growth while maintaining the affordability advantage that draws buyers in the first place.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Hastings-Sunrise benefits from solid transit infrastructure and a practical layout that supports multiple modes of transportation:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Renfrew Station and Rupert Station on the Expo Line are located along the neighbourhood's southern edge. These provide rapid transit access to downtown Vancouver (approximately 15 minutes), Commercial-Broadway for Millennium Line transfers, and points east to Burnaby, New Westminster, and Surrey." },
                    { mode: "Bus", detail: "East Hastings Street is a major bus corridor with frequent service connecting to downtown and the eastern suburbs. Additional routes along Renfrew Street and Nanaimo Street provide north-south connections. The number 160 bus connects to the PNE grounds and surrounding areas." },
                    { mode: "Cycling", detail: "The neighbourhood has several designated cycling routes, and the relatively flat terrain makes cycling practical for daily commuting. The Adanac Bikeway provides an east-west cycling corridor through the neighbourhood." },
                    { mode: "Driving", detail: "Easy access to Hastings Street, Renfrew Street, and the Trans-Canada Highway via the Cassiar Connector. Downtown Vancouver is approximately 15-20 minutes by car. Highway 1 access makes it convenient for trips to the North Shore, Burnaby, and the eastern suburbs." },
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
                  Hastings-Sunrise has a strong network of parks, anchored by the expansive Hastings Park grounds:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Hastings Park (PNE Grounds)", desc: "The neighbourhood's defining green space, encompassing the PNE fairgrounds, Playland, Pacific Coliseum, and the Hastings Racecourse. Outside of fair season, the grounds offer extensive walking paths, the Empire Fields sports complex, and the beautiful Italian Garden and Momiji Garden. A major sanctuary garden was also added in recent years." },
                    { name: "New Brighton Park", desc: "A waterfront gem on the Burrard Inlet, featuring a saltwater outdoor pool, playground, sports courts, and spectacular harbour views. The park's location on the waterfront provides a rare connection to the ocean within an east-side neighbourhood." },
                    { name: "Sunrise Park", desc: "A well-used community park with a playground, wading pool, and sports fields. It serves as a neighbourhood gathering point for families and hosts community events throughout the summer months." },
                    { name: "McGill Park", desc: "A quiet neighbourhood park with a playground, open green space, and mature trees. A pleasant spot for a morning walk or an afternoon with young children." },
                    { name: "E-Comm Park & Greenways", desc: "The neighbourhood benefits from several greenway connections and smaller pocket parks that provide green corridors linking residential areas to larger parks and commercial streets." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Hastings Community Centre, located within the neighbourhood, provides fitness facilities, programs for all ages, and community gathering space. The PNE Forum also hosts events, trade shows, and concerts throughout the year, adding entertainment value for local residents.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Hastings-Sunrise is well-served by public schools that reflect the neighbourhood&apos;s diverse and family-oriented character. The schools here are known for their welcoming communities and multicultural student bodies.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Hastings Elementary", type: "K-7 Public", detail: "A well-established neighbourhood elementary school with a diverse student body and strong community engagement. The school benefits from an active parent advisory council and a range of extracurricular activities." },
                      { name: "Templeton Secondary", type: "8-12 Public", detail: "The neighbourhood's main secondary school, offering comprehensive academic, athletic, and arts programming. Templeton is known for its inclusive environment and diverse student population." },
                      { name: "Graham Elementary", type: "K-7 Public", detail: "A smaller neighbourhood elementary school with a warm community feel. Known for its dedicated teaching staff and strong programs in literacy and numeracy." },
                      { name: "Franklin Elementary", type: "K-7 Public", detail: "A community school offering a range of programs and known for its emphasis on social-emotional learning alongside strong academics." },
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
                  The neighbourhood&apos;s schools benefit from the multicultural richness of the community, with diverse student populations that provide children with a broad worldview. Many schools in the area also offer strong English Language Learning (ELL) programs to support immigrant families.
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
                    The commercial spine of the neighbourhood, East Hastings Street has undergone a quiet renaissance in recent years. New specialty cafes, bakeries, and restaurants have joined long-established Italian delis, Vietnamese pho shops, and Chinese bakeries, creating one of east Vancouver&apos;s most interesting and evolving food corridors.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Hastings-Sunrise&apos;s dining scene is deeply influenced by its Italian and East Asian communities. Along East Hastings, you will find some of the city&apos;s best pho restaurants, authentic Chinese bakeries, classic Italian trattorias, and an emerging wave of modern cafes and brunch spots that reflect the neighbourhood&apos;s evolving demographics.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For everyday shopping, residents benefit from a range of grocery options including large Asian supermarkets, Italian specialty stores, and conventional grocery chains. The commercial areas along East Hastings and Nanaimo Street provide most daily necessities within easy reach.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood is also home to a growing number of specialty food producers, craft breweries, and artisan businesses that have been attracted by the area&apos;s more affordable commercial rents and authentic character.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For larger shopping needs, the nearby Renfrew and Rupert areas provide access to big-box retail, and Commercial Drive is just a short trip to the west for those seeking the eclectic shops and restaurants of The Drive.
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
