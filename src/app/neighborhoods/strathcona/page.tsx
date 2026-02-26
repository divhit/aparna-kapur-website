import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Strathcona Vancouver Real Estate Guide 2026 | Heritage Homes & Market Data",
  description:
    "The definitive guide to Strathcona, Vancouver. Explore heritage homes, Chinatown, artist studios, parks, transit, and community life. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Strathcona Vancouver real estate",
    "Strathcona homes for sale",
    "Strathcona heritage homes",
    "Strathcona neighborhood guide",
    "buy home Strathcona Vancouver",
    "Chinatown Vancouver real estate",
    "Strathcona artist lofts",
    "Vancouver oldest neighbourhood",
  ],
};

const faqs = [
  {
    question: "Is Strathcona a good neighborhood to buy a home in?",
    answer:
      "Strathcona is a unique and historically significant neighbourhood that appeals to buyers who value heritage character, urban walkability, and creative community culture. As Vancouver's oldest residential neighbourhood, it offers a distinctive sense of place that newer areas cannot replicate. The proximity to downtown, Chinatown, the waterfront, and two SkyTrain stations makes it exceptionally well-connected. While the neighbourhood faces some urban challenges common to inner-city areas, ongoing community investment and its irreplaceable heritage character make Strathcona a compelling choice for those seeking an authentic urban lifestyle.",
  },
  {
    question: "How much does a home cost in Strathcona Vancouver?",
    answer:
      "Strathcona offers some of the most affordable housing close to downtown Vancouver. The composite benchmark across all property types is approximately $950K. Heritage homes, which are the neighbourhood's signature, range from $1.0M to $1.5M depending on condition and lot size. Condominiums and loft-style units, including converted warehouse spaces popular with artists and creatives, range from $400K to $750K. The neighbourhood's proximity to downtown means these prices represent significant value compared to adjacent areas.",
  },
  {
    question: "What is special about Strathcona's heritage?",
    answer:
      "Strathcona is Vancouver's oldest residential neighbourhood, with homes dating back to the 1890s. The neighbourhood was one of the first areas settled outside of Gastown and has been home to successive waves of immigrants, including Chinese, Japanese, Italian, and Black communities, each of which has left its mark on the area's character. Many original Victorian and Edwardian-era homes survive, making Strathcona one of the most architecturally significant residential areas in the city. The neighbourhood's heritage designation protects many of these structures, ensuring that its historic character is preserved for future generations.",
  },
  {
    question: "How is the transit in Strathcona?",
    answer:
      "Strathcona has excellent transit access with two SkyTrain stations within or immediately adjacent to the neighbourhood. Main Street-Science World Station serves the Expo and Millennium Lines, while Stadium-Chinatown Station provides Expo Line access on the western edge. Both stations connect directly to downtown Vancouver in under 5 minutes. Major bus routes along Hastings Street and Main Street provide additional connections throughout the city. The neighbourhood's proximity to downtown also makes walking and cycling highly practical for daily commuting.",
  },
  {
    question: "What is the arts and culture scene like in Strathcona?",
    answer:
      "Strathcona has a thriving arts community rooted in the neighbourhood's warehouse and industrial spaces. Former manufacturing buildings have been converted into artist studios, gallery spaces, and creative workshops. The Strathcona Artisan Market and various studio open-house events showcase local creators throughout the year. The neighbourhood's adjacency to Chinatown adds a rich cultural dimension, with the Dr. Sun Yat-Sen Classical Chinese Garden, the Chinese Cultural Centre, and numerous heritage sites contributing to a unique cultural landscape. This combination of contemporary arts and deep historical heritage makes Strathcona one of the most culturally layered neighbourhoods in Vancouver.",
  },
];

const neighbourhoodData = NEIGHBOURHOODS["strathcona"];

export default async function StrathconaPage() {
  const pois = await fetchNeighbourhoodPOIs(neighbourhoodData.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Strathcona</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Strathcona, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$950K</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">1890s</p>
                  <p className="text-xs text-warm-500 mt-1">Heritage</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">91</p>
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
                  ["living", "Living in Strathcona", "2"],
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
                      ["Mount Pleasant", "mount-pleasant"],
                      ["Grandview-Woodland", "grandview-woodland"],
                      ["Downtown", "downtown"],
                      ["Hastings-Sunrise", "hastings-sunrise"],
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
                  Strathcona is Vancouver&apos;s oldest residential neighbourhood, a place where the city&apos;s history is written into the very fabric of its streets. Located just east of Chinatown and south of the port lands, the neighbourhood stretches roughly from Gore Avenue to Clark Drive and from the waterfront to Prior Street. Its Victorian and Edwardian-era homes, many dating to the 1890s and early 1900s, give Strathcona an architectural character that is unique in Vancouver.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Strathcona has been shaped by successive waves of immigration. Chinese, Japanese, Italian, and Black communities all called this neighbourhood home during different periods of the city&apos;s history, and their collective influence is still felt in the area&apos;s cultural landscape, community organizations, and built environment. Today, Strathcona is a diverse neighbourhood that has also become a magnet for artists, designers, and creative entrepreneurs drawn to its converted warehouse spaces and gritty urban character.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For homebuyers, Strathcona offers something rare in Vancouver: genuine heritage character at an accessible price point, with unparalleled proximity to downtown. The neighbourhood is not without its urban challenges, but for those who appreciate history, culture, and authenticity over polish, Strathcona is a neighbourhood with extraordinary depth and potential.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={neighbourhoodData.center}
                  zoom={neighbourhoodData.zoom}
                  pois={pois.length > 0 ? pois : neighbourhoodData.fallbackPOIs}
                  boundaryName="Strathcona"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Strathcona */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Strathcona
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Living in Strathcona is unlike living anywhere else in Vancouver. The neighbourhood has a raw, honest character that appeals to people who value substance over surface. Walking through the residential blocks, you will see beautifully restored Victorian homes with intricate gingerbread trim sitting alongside simpler workers&apos; cottages, all beneath a canopy of mature street trees. It is a neighbourhood where every house has a story.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The community is tight-knit and actively engaged. The Strathcona Residents&apos; Association is one of the oldest and most active in Vancouver, and residents take a hands-on approach to neighbourhood stewardship. The Cottonwood Community Garden, one of the city&apos;s largest, is a beloved gathering place where neighbours tend plots, share harvests, and build relationships across cultural lines.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A day in Strathcona might start with coffee at a neighbourhood cafe, followed by a walk through Strathcona Park where children play on the playground and community sports leagues use the fields. A stroll west takes you into Chinatown for dim sum, grocery shopping at one of the area&apos;s specialty markets, or a visit to the Dr. Sun Yat-Sen Classical Chinese Garden. In the afternoon, you might explore one of the neighbourhood&apos;s artist studios or catch a performance at a local venue. The waterfront at CRAB Park offers sunset views of the harbour and North Shore mountains.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Strathcona is also remarkably well-positioned geographically. Downtown is a short walk or bike ride away, and two SkyTrain stations provide rapid transit connections across the region. The neighbourhood&apos;s central location means that virtually all of Vancouver is easily accessible, making it a practical base for those who want urban convenience without suburban blandness.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Strathcona Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Strathcona&apos;s real estate market is defined by its heritage character and proximity to downtown, offering exceptional value for an inner-city neighbourhood:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Heritage Homes", range: "$1.0M - $1.5M", desc: "Strathcona's signature property type. Victorian, Edwardian, and early craftsman homes from the 1890s to 1920s, many with heritage designation. These homes offer architectural character that simply does not exist in newer neighbourhoods. Restoration projects can be significant but rewarding." },
                    { type: "Condominiums & Lofts", range: "$400K - $750K", desc: "A mix of converted warehouse lofts and newer condo developments. The loft-style units in former industrial buildings are particularly popular with artists and creatives, offering open-concept layouts with high ceilings and industrial character." },
                    { type: "Townhomes", range: "$700K - $1.1M", desc: "Newer townhome developments have appeared in the neighbourhood, offering modern layouts for families and professionals who want ground-level living near downtown at a more accessible price point." },
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
                  Strathcona&apos;s real estate market is relatively small in volume compared to larger neighbourhoods, which means properties can move quickly when they are well-priced. Heritage buyers in particular should be prepared to act when the right property appears.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Strathcona benefits from several long-term value drivers: its irreplaceable heritage housing stock, proximity to downtown, excellent transit access, and the ongoing revitalization of adjacent Chinatown and the False Creek Flats area to the south. As Vancouver&apos;s creative economy continues to grow, the neighbourhood&apos;s artist lofts and studio spaces are likely to appreciate. Investors should consider the neighbourhood&apos;s trajectory as the broader east-side gentrification trend continues.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Strathcona&apos;s central location and transit access make it one of the most connected neighbourhoods in Vancouver:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Main Street-Science World Station (Expo and Millennium Lines) is located at the neighbourhood's southwestern corner, providing rapid transit to downtown in under 5 minutes. Stadium-Chinatown Station on the Expo Line serves the western edge. Both stations provide connections across the entire SkyTrain network." },
                    { mode: "Bus", detail: "East Hastings Street and Main Street are major bus corridors with frequent service. Routes along these streets connect Strathcona to every part of the city. The proximity to downtown means many downtown bus routes are also within walking distance." },
                    { mode: "Cycling", detail: "Strathcona is highly cycleable, with flat terrain and designated bike routes. The Adanac Bikeway runs through the neighbourhood, and the proximity to the Seawall means cyclists can easily connect to the False Creek and waterfront cycling network. Many residents commute to downtown by bicycle in under 10 minutes." },
                    { mode: "Walking", detail: "With a Walk Score of 91, Strathcona is one of the most walkable neighbourhoods in Vancouver. Downtown, Chinatown, Main Street, and the waterfront are all within comfortable walking distance. The compact urban fabric makes a car-free lifestyle entirely practical for most residents." },
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
                  Strathcona has meaningful green space for an inner-city neighbourhood, with parks that serve as important community gathering points:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Strathcona Park", desc: "The neighbourhood's central green space, featuring a large playground, sports fields, basketball courts, and a community garden. The park serves as the primary outdoor gathering point for the neighbourhood and hosts community events, sports leagues, and informal socializing throughout the year." },
                    { name: "CRAB Park at Portside", desc: "A waterfront park on the Burrard Inlet that was created through community activism in the 1980s. CRAB Park offers spectacular views of the harbour, North Shore mountains, and port activity. It includes a small beach, picnic areas, and public art installations. It is one of the few waterfront parks accessible from the east side of downtown." },
                    { name: "Heatley Avenue Park", desc: "A smaller neighbourhood park that serves the residential community with a playground and open green space. Its modest scale reflects the intimate, neighbourhood-focused character of Strathcona's green spaces." },
                    { name: "Cottonwood Community Garden", desc: "One of Vancouver's largest and most established community gardens, located on formerly vacant land. Over 200 garden plots are tended by neighbourhood residents, making it a vibrant social space as much as a horticultural one. The garden embodies Strathcona's hands-on community spirit." },
                    { name: "MacLean Park", desc: "A small but well-used park with a playground and open space, providing a neighbourhood gathering spot for families with young children in the heart of the residential area." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Strathcona Community Centre offers programs for all ages, from preschool activities to seniors&apos; programs. The centre plays a vital role in community building and provides fitness facilities, meeting spaces, and cultural programming that reflect the neighbourhood&apos;s diverse population.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Strathcona&apos;s schools carry deep historical significance and serve one of Vancouver&apos;s most diverse student populations. The neighbourhood&apos;s educational institutions reflect its layered history and multicultural character.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Strathcona Elementary", type: "K-7 Public", detail: "One of the oldest elementary schools in Vancouver, Strathcona Elementary has served the neighbourhood since the late 1800s. The school has a remarkably diverse student body and offers strong multilingual support programs. Its deep community roots and historic significance make it a cherished institution." },
                      { name: "Britannia Secondary", type: "8-12 Public (Nearby)", detail: "Located in adjacent Grandview-Woodland, Britannia Secondary serves many Strathcona families. Integrated with the Britannia Community Centre, students benefit from access to a pool, ice rink, library, and extensive community programs." },
                      { name: "Lord Strathcona Elementary", type: "K-7 Public", detail: "Another long-established school in the area, offering comprehensive elementary education with a focus on inclusivity and community engagement. The school benefits from its diverse student population and strong parent involvement." },
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
                  Strathcona&apos;s schools are notable for their strong multilingual and multicultural programs, reflecting the neighbourhood&apos;s long history as a landing place for immigrant communities. English Language Learning support is robust, and the schools provide a naturally diverse social environment that prepares children for life in a multicultural city.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Chinatown &amp; Strathcona Markets</p>
                  <p className="text-sm text-gold-700">
                    Strathcona&apos;s western edge borders Vancouver&apos;s historic Chinatown, one of the oldest and most significant Chinatowns in North America. Combined with the neighbourhood&apos;s own emerging food and artisan scene, residents have access to an extraordinary range of dining, shopping, and cultural experiences within walking distance.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Strathcona&apos;s dining and shopping landscape is shaped by its adjacency to Chinatown and its own emerging artisan economy. Chinatown offers some of the city&apos;s best Chinese restaurants, from traditional dim sum houses and barbecue shops to modern Cantonese and Sichuan restaurants. The neighbourhood&apos;s grocery options include specialty Asian markets, produce vendors, and herbal medicine shops that have served the community for generations.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Within Strathcona itself, a growing number of independent cafes, bakeries, and small-batch food producers have set up in converted warehouse and industrial spaces. The Strathcona neighbourhood has attracted craft breweries, artisan chocolatiers, and specialty food businesses that benefit from the area&apos;s more affordable commercial rents and creative atmosphere.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The Strathcona Farmers Market, held on select dates throughout the year, brings together local growers, artisan food producers, and craftspeople. It is a more intimate affair than larger city markets, reflecting the neighbourhood&apos;s close-knit community character.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For everyday needs, residents benefit from proximity to the Main Street shopping corridor to the south and the commercial stretches of East Hastings Street. The neighbourhood&apos;s central location means that virtually any shopping need is within a short walk, bike ride, or transit trip.
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
