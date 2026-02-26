import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Renfrew-Collingwood Vancouver Real Estate Guide 2026 | Homes & Market Data",
  description:
    "The definitive guide to Renfrew-Collingwood, Vancouver. Explore diverse real estate, Kingsway dining, SkyTrain access, Collingwood Village, parks, and multicultural living. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Renfrew-Collingwood Vancouver real estate",
    "Renfrew-Collingwood homes for sale",
    "Collingwood Village Vancouver",
    "Renfrew-Collingwood neighborhood guide",
    "buy home Renfrew-Collingwood Vancouver",
    "Kingsway Vancouver restaurants",
    "Renfrew-Collingwood SkyTrain",
    "east Vancouver real estate",
  ],
};

const faqs = [
  {
    question: "Is Renfrew-Collingwood a good neighborhood to buy a home in?",
    answer:
      "Renfrew-Collingwood is one of Vancouver's best neighborhoods for value-conscious buyers who want strong transit access and diverse urban living. As Vancouver's most populous neighborhood, it offers a wide range of housing types at prices significantly below the city average. The presence of three SkyTrain stations on the Expo Line, a thriving multicultural food scene along Kingsway, and active community development make it increasingly attractive to both families and investors.",
  },
  {
    question: "How much does a home cost in Renfrew-Collingwood Vancouver?",
    answer:
      "Renfrew-Collingwood offers excellent value in the Vancouver market. The composite benchmark price across all property types is approximately $1.05M. Detached homes typically range from $1.2M to $1.7M, condominiums from $400K to $700K, and townhomes from $750K to $1.0M. The Collingwood Village area features newer condo developments, while the Renfrew side has more established single-family homes.",
  },
  {
    question: "What is Collingwood Village?",
    answer:
      "Collingwood Village is a master-planned residential community centered around Joyce-Collingwood Station. Developed over several decades, it transformed a former industrial area into a vibrant mixed-use neighborhood with residential towers, townhomes, parks, and local shops. It is one of Vancouver's most successful examples of transit-oriented development and continues to see new investment and growth.",
  },
  {
    question: "How many SkyTrain stations are in Renfrew-Collingwood?",
    answer:
      "Renfrew-Collingwood is served by three Expo Line SkyTrain stations: Renfrew Station, Rupert Station, and Joyce-Collingwood Station. This gives the neighborhood exceptional rapid transit coverage, with most residents living within a short walk or bus ride of a station. The Expo Line provides direct service to downtown Vancouver (approximately 20 minutes), Burnaby, New Westminster, and Surrey.",
  },
  {
    question: "What is the food scene like in Renfrew-Collingwood?",
    answer:
      "Renfrew-Collingwood has one of Vancouver's most diverse and exciting food scenes, centered along Kingsway. The corridor is packed with restaurants representing Chinese, Vietnamese, Korean, Filipino, South Asian, and many other cuisines. From late-night hot pot and authentic dim sum to banh mi shops and Korean BBQ, the variety is extraordinary. The area is increasingly recognized by food writers as one of Vancouver's best dining destinations for authentic, affordable multicultural cuisine.",
  },
];

const renfrewCollingwoodData = NEIGHBOURHOODS["renfrew-collingwood"];

export default async function RenfrewCollingwoodPage() {
  const pois = await fetchNeighbourhoodPOIs(renfrewCollingwoodData.center);

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
            <span className="text-teal-200">Renfrew-Collingwood</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Renfrew-Collingwood, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.05M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">3</p>
                  <p className="text-xs text-warm-500 mt-1">SkyTrain Stations</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">82</p>
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
                  ["living", "Living in Renfrew-Collingwood", "2"],
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
                      ["Hastings-Sunrise", "hastings-sunrise"],
                      ["Kensington-Cedar Cottage", "kensington-cedar-cottage"],
                      ["Killarney", "killarney"],
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
                  Renfrew-Collingwood is Vancouver&apos;s most populous neighborhood, stretching across a large swath of the city&apos;s east side. Bounded roughly by Grandview Highway to the north, the Burnaby border (Boundary Road) to the east, 41st Avenue to the south, and Nanaimo Street to the west, this expansive community is home to more than 50,000 residents and stands as one of the most culturally diverse neighborhoods in all of Canada.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What makes Renfrew-Collingwood remarkable is the way it brings together so many different communities under one roof. The neighborhood is a true mosaic of cultures: Chinese, Vietnamese, Filipino, South Asian, Korean, and dozens of other communities live side by side, creating a vibrant daily life that is reflected in the extraordinary range of restaurants, shops, and cultural institutions along Kingsway and the surrounding streets.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The neighborhood is also one of Vancouver&apos;s most dynamic in terms of development and change. Collingwood Village, centered around Joyce-Collingwood Station, pioneered transit-oriented development in the city, and new projects continue to transform the area. Three Expo Line SkyTrain stations give residents excellent rapid transit access, making Renfrew-Collingwood one of the best-connected neighborhoods in Vancouver.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={renfrewCollingwoodData.center}
                  zoom={renfrewCollingwoodData.zoom}
                  pois={pois.length > 0 ? pois : renfrewCollingwoodData.fallbackPOIs}
                  boundaryName="Renfrew-Collingwood"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Renfrew-Collingwood */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Renfrew-Collingwood
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Renfrew-Collingwood is a neighborhood of contrasts and variety. The northern Renfrew section has a more established, suburban feel with older single-family homes on quiet streets, while the southern Collingwood area around Joyce Station is more urban, with high-rise towers, newer developments, and a busier commercial character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing ranges from well-maintained character homes built in the 1940s through 1960s to brand-new concrete condominiums and townhome complexes. This variety means the neighborhood attracts a remarkably broad demographic: young professionals in compact condos near the SkyTrain, growing families in detached homes with yards, and longtime residents who have watched the community evolve over decades.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Daily life here is animated by the incredible food options. A morning might begin with congee or dim sum at one of the Chinese restaurants along Kingsway, followed by a walk through the Renfrew Ravine. Lunch might be pho or banh mi from one of the many Vietnamese spots. After school, kids play in Slocan Park or attend programs at the Renfrew or Collingwood community centres. Dinner could be Korean BBQ, Filipino adobo, or Indian curry, all within a short walk.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The sense of community here is strong and tangible. Collingwood Neighbourhood House is one of Vancouver&apos;s most active community organizations, offering newcomer support, family programs, youth services, and community development initiatives that help knit this diverse population together.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Renfrew-Collingwood Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Renfrew-Collingwood offers one of Vancouver&apos;s most diverse housing markets, with options across every price point and property type:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.2M - $1.7M", desc: "Found primarily in the Renfrew area and quieter residential streets. Mostly post-war homes from the 1940s-1960s, many renovated or rebuilt. Lot sizes are generous by Vancouver standards and some properties include laneway houses." },
                    { type: "Condominiums", range: "$400K - $700K", desc: "Concentrated around Joyce-Collingwood Station and along Kingsway. Collingwood Village offers established towers, while newer developments continue to add supply. Strong rental demand makes condos here attractive to investors." },
                    { type: "Townhomes", range: "$750K - $1.0M", desc: "Newer townhome developments are appearing throughout the neighborhood, particularly popular with families who want more space than a condo. These offer modern layouts and are often within walking distance of SkyTrain." },
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
                  The Joyce-Collingwood Station Area Plan has guided significant investment and development around the transit hub, and further growth is expected as the city continues to prioritize transit-oriented housing.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Renfrew-Collingwood is one of Vancouver&apos;s most compelling areas for real estate investment. Three SkyTrain stations, active city planning for densification, a growing population, and prices that remain well below the city average create strong conditions for long-term appreciation. The neighborhood&apos;s diversity and evolving commercial character are also attracting new businesses and investment that further strengthen the area&apos;s appeal.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Renfrew-Collingwood is one of Vancouver&apos;s best-connected neighborhoods for transit, with three SkyTrain stations and extensive bus coverage:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Three Expo Line stations serve the neighborhood: Renfrew, Rupert, and Joyce-Collingwood. All three provide direct rapid transit to downtown Vancouver (approximately 20 minutes), Metrotown, New Westminster, and Surrey. Joyce-Collingwood is a major hub with significant bus connections." },
                    { mode: "Bus", detail: "Extensive bus service throughout the neighborhood. Kingsway is served by the 19 bus, one of Vancouver's busiest routes. The 49 bus on 49th Avenue provides crosstown east-west service. Additional routes on Renfrew Street, Rupert Street, and Nanaimo Street provide comprehensive coverage." },
                    { mode: "Driving", detail: "Major arterials including Kingsway, Grandview Highway, and Boundary Road provide efficient connections in all directions. The Trans-Canada Highway (Highway 1) is accessible from Boundary Road for trips to the eastern suburbs and beyond." },
                    { mode: "Cycling", detail: "The neighborhood benefits from the BC Parkway, a designated cycling route that follows the SkyTrain corridor. Additional cycling infrastructure connects through to Central Park in Burnaby and other east Vancouver neighborhoods." },
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
                  Renfrew-Collingwood offers a variety of parks and green spaces that serve its large and active population:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Renfrew Ravine Park", desc: "A remarkable urban ravine that follows Still Creek through the heart of the neighborhood. The forested ravine offers walking trails, salmon-bearing waterways, and a surprising sense of wilderness in the middle of the city. The annual Renfrew Ravine Moon Festival is a beloved community event that illuminates the park with lanterns and art installations." },
                    { name: "Slocan Park", desc: "A popular community park with a playground, water park, sports courts, and open green space. The park is home to the Renfrew Community Centre (adjacent) and serves as a central gathering place for the northern part of the neighborhood." },
                    { name: "Renfrew Community Park", desc: "Located alongside Renfrew Community Centre, this park features sports fields, a running track, and playground facilities. It hosts community sports leagues and is a hub for outdoor recreation." },
                    { name: "Still Creek", desc: "Still Creek runs through the neighborhood and has been the focus of restoration efforts. The creek supports salmon runs and connects several green spaces, creating an ecological corridor through the urban landscape." },
                    { name: "Collingwood Park", desc: "A neighborhood park near Joyce-Collingwood Station with playgrounds, sports facilities, and green space. It provides a welcome outdoor retreat for the denser residential areas of Collingwood Village." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  Both the Renfrew Community Centre and Collingwood Neighbourhood House provide extensive programming and recreational services. The Renfrew Community Centre offers a pool, fitness facilities, and a wide range of programs, while Collingwood Neighbourhood House focuses on community development, newcomer services, and family programs.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Renfrew-Collingwood is served by multiple public schools reflecting the neighborhood&apos;s large population and diverse community. Schools here benefit from the multicultural environment, with students gaining exposure to a wide range of cultures and perspectives.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Windermere Secondary", type: "8-12 Public", detail: "A large, diverse secondary school offering strong academic programs, athletics, and extracurricular activities. Known for its inclusive community and support for English Language Learners." },
                      { name: "Renfrew Elementary", type: "K-7 Public", detail: "A well-established elementary school in the northern part of the neighborhood with a strong sense of community and active parent involvement." },
                      { name: "Collingwood Annex", type: "K-3 Public", detail: "A smaller primary school serving the Collingwood area, offering an intimate learning environment for younger students." },
                      { name: "Graham Bruce Elementary", type: "K-7 Public", detail: "Located in the heart of the neighborhood, Graham Bruce serves a diverse student population with strong multilingual support programs." },
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
                  Collingwood Neighbourhood House plays an important supplementary educational role, offering after-school programs, homework clubs, literacy support, and youth development programs. For families new to Canada, the neighborhood&apos;s schools and community organizations provide strong settlement and integration support.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Kingsway Dining Corridor</p>
                  <p className="text-sm text-gold-700">
                    Kingsway through Renfrew-Collingwood is one of Vancouver&apos;s most exciting and diverse food corridors. Stretching for blocks, it features an ever-changing lineup of Chinese, Vietnamese, Korean, Filipino, South Asian, and fusion restaurants that draw food lovers from across the Lower Mainland.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The dining scene in Renfrew-Collingwood is, quite simply, one of the best in Vancouver for authentic multicultural cuisine at accessible prices. Kingsway is the main artery, lined with restaurants, bakeries, bubble tea shops, and specialty food stores that reflect the neighborhood&apos;s extraordinary diversity.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  You will find some of the city&apos;s best Chinese hot pot restaurants here, alongside acclaimed Vietnamese pho houses, Korean fried chicken spots, Filipino bakeries, and South Asian sweet shops. The quality is high and the prices are refreshingly reasonable compared to trendier dining neighborhoods.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For grocery shopping, the neighborhood is exceptionally well-served. Multiple Asian supermarkets stock ingredients from across the Pacific Rim, while conventional grocery stores and specialty shops round out the options. The Real Canadian Superstore at Grandview Highway and Rupert is a major anchor.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Around Joyce-Collingwood Station, Collingwood Village has developed its own commercial character with cafes, restaurants, and everyday services. The ongoing development in this area continues to bring new retail and dining options to the neighborhood.
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
