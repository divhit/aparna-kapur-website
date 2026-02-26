import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Mount Pleasant Vancouver Real Estate Guide 2026 | Creative Living & Market Data",
  description:
    "The definitive guide to Mount Pleasant, Vancouver. Explore real estate, Main Street shopping, craft breweries, public art, tech hubs, and creative lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Mount Pleasant Vancouver real estate",
    "Mount Pleasant Vancouver condos for sale",
    "Main Street Vancouver",
    "Mount Pleasant neighborhood guide",
    "buy home Mount Pleasant Vancouver",
    "Mount Pleasant breweries",
    "Mount Pleasant Vancouver lifestyle",
    "Mount Pleasant tech hub Vancouver",
  ],
};

const faqs = [
  {
    question: "Is Mount Pleasant a good neighbourhood to buy in?",
    answer:
      "Mount Pleasant is one of Vancouver's most dynamic and sought-after neighbourhoods, particularly for buyers who value walkability, culture, and creative energy. Its central location between Downtown and the east side, combined with excellent transit (two SkyTrain stations), a vibrant Main Street corridor, and a growing tech and creative economy, make it a strong choice for both lifestyle and investment. Property values have appreciated steadily over the past decade as the neighbourhood has evolved from an under-the-radar area to one of Vancouver's most desirable addresses for young professionals and families.",
  },
  {
    question: "How much does a home cost in Mount Pleasant?",
    answer:
      "Mount Pleasant offers a range of housing options with a composite benchmark price of approximately $850K. One-bedroom condos typically range from $550K to $700K, two-bedroom units from $750K to $1M, and townhomes from $1M to $1.5M. Heritage conversions and character homes, which are a distinctive feature of the neighbourhood, can range from $1.2M to $2.5M+ depending on size, lot, and condition. The neighbourhood offers relatively good value compared to nearby Fairview and Kitsilano, while providing similar or better walkability and transit access.",
  },
  {
    question: "What is Main Street like in Mount Pleasant?",
    answer:
      "Main Street is the cultural and commercial spine of Mount Pleasant, stretching from roughly 2nd Avenue to 30th Avenue. It is one of Vancouver's most eclectic and characterful shopping streets, lined with independent boutiques, vintage shops, specialty food stores, locally owned restaurants, coffee roasters, and craft breweries. Unlike Robson Street or South Granville, Main Street has a distinctly local, community-driven character that rewards exploration. The street also features numerous public art installations and murals that reflect the neighbourhood's creative identity. Saturday mornings on Main Street, with the farmers' market and brunch crowds, are quintessentially Mount Pleasant.",
  },
  {
    question: "What is the brewery scene like in Mount Pleasant?",
    answer:
      "Mount Pleasant is the undisputed centre of Vancouver's craft brewery scene, with over 10 breweries concentrated in the industrial-zoned area east of Main Street. Notable establishments include 33 Acres Brewing, Brassneck Brewery, Main Street Brewing, Faculty Brewing, and Electric Bicycle Brewing, among others. The area has been dubbed 'Brewery Creek,' a nod to both the historic creek that once ran through the area and the modern concentration of craft beer producers. Many breweries have taprooms with patios, creating a social, walkable beer-tasting circuit. This brewery culture has become a defining feature of Mount Pleasant's identity and a significant draw for residents and visitors alike.",
  },
  {
    question: "How is transit in Mount Pleasant?",
    answer:
      "Mount Pleasant has excellent transit connectivity with two SkyTrain stations: Broadway-City Hall (Canada Line) at the western edge and Main Street-Science World (Expo and Millennium Lines) at the northern edge. The Broadway-City Hall station provides rapid transit to Downtown (8 minutes), YVR Airport (20 minutes), and Richmond. The upcoming Broadway Subway extension will further enhance connectivity along the Broadway corridor. Bus routes along Broadway, Main Street, Cambie, and Fraser Street provide comprehensive local coverage. The neighbourhood's flat terrain and excellent cycling infrastructure also make biking a popular commute option.",
  },
];

const mountPleasantData = NEIGHBOURHOODS["mount-pleasant"];

export default async function MountPleasantPage() {
  const pois = await fetchNeighbourhoodPOIs(mountPleasantData.center);

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
            <span className="text-teal-200">Mount Pleasant</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Mount Pleasant, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$850K</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">92</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">10+</p>
                  <p className="text-xs text-warm-500 mt-1">Breweries</p>
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
                  ["living", "Living in Mount Pleasant", "2"],
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
                      ["Riley Park", "riley-park"],
                      ["Fairview", "fairview"],
                      ["Strathcona", "strathcona"],
                      ["Grandview-Woodland", "grandview-woodland"],
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
                  Mount Pleasant is a creative, trendy neighbourhood in central Vancouver, bounded roughly by Great Northern Way and 2nd Avenue to the north, 16th Avenue to the south, Cambie Street to the west, and Clark Drive to the east. Once a working-class district with industrial roots, Mount Pleasant has transformed over the past two decades into one of the city&apos;s most vibrant and culturally rich neighbourhoods, drawing artists, tech workers, entrepreneurs, and young families with its unique blend of grit, creativity, and community spirit.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Main Street is the neighbourhood&apos;s beating heart, a long commercial corridor lined with independent shops, locally owned restaurants, specialty coffee roasters, vintage stores, and galleries. East of Main, the industrial zone has been reimagined as Vancouver&apos;s craft brewery district, with over ten breweries clustered in former warehouses. This creative reuse of industrial space is central to Mount Pleasant&apos;s identity and has made it a destination for visitors from across the region.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Mount Pleasant is also one of Vancouver&apos;s most prominent public art neighbourhoods. Large-scale murals cover building facades throughout the area, many created during the annual Vancouver Mural Festival. This visible commitment to art and culture, combined with the neighbourhood&apos;s walkability, independent business culture, and growing tech presence, gives Mount Pleasant a creative energy that is distinctly its own.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={mountPleasantData.center}
                  zoom={mountPleasantData.zoom}
                  pois={pois.length > 0 ? pois : mountPleasantData.fallbackPOIs}
                  boundaryName="Mount Pleasant"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Mount Pleasant */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Mount Pleasant
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Life in Mount Pleasant has a creative, neighbourhood-first rhythm that sets it apart from Vancouver&apos;s more polished urban areas. Saturday mornings at the Main Street farmers&apos; market. A flat white from a specialty roaster. An afternoon browsing vintage shops and independent bookstores along Main Street. Tasting flights at Brassneck or 33 Acres before dinner at one of the neighbourhood&apos;s acclaimed restaurants.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The residential landscape is eclectic, reflecting the neighbourhood&apos;s evolution. You will find heritage character homes on tree-lined streets south of Broadway, modern condo developments along the Cambie and Main Street corridors, converted warehouse lofts in the industrial area, and newer townhome projects filling in throughout. This mix of housing types creates a diverse community that is one of the neighbourhood&apos;s greatest strengths.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Mount Pleasant has become a significant tech and creative industry hub. Companies including Hootsuite, MEC (now part of the Kingswood Capital group), and numerous startups and studios have established their headquarters here, drawn by the neighbourhood&apos;s character, transit access, and proximity to the talent pool. This has brought a weekday energy that supports the local business community and adds to the area&apos;s vitality.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The community spirit in Mount Pleasant is strong and genuine. Neighbourhood events, from the Mural Festival to block parties and local fundraisers, bring residents together regularly. There is a palpable pride in the neighbourhood&apos;s independent character, its support for local businesses, and its creative identity. Mount Pleasant is for people who want to be part of something with personality and purpose.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Mount Pleasant Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Mount Pleasant&apos;s real estate market reflects its eclectic character, offering everything from modern condominiums to heritage conversions:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$550K - $1M", desc: "New and recently built condo developments along Main Street, Broadway, and the Cambie corridor offer modern living in a transit-oriented setting. One-bedroom units range from $550K to $700K, while two-bedroom units range from $750K to $1M. The benchmark composite price is approximately $850K." },
                    { type: "Townhomes", range: "$1M - $1.5M", desc: "Townhome developments have become increasingly popular in Mount Pleasant, offering family-sized living at a more accessible price point than detached homes. New projects along the western and southern edges of the neighbourhood offer modern designs with private outdoor space." },
                    { type: "Heritage & Character Homes", range: "$1.2M - $2.5M+", desc: "Mount Pleasant's tree-lined residential streets south of Broadway feature early 20th-century heritage homes and character houses. Many have been lovingly maintained or tastefully renovated. Duplexes and heritage conversions offer unique living experiences with the patina of history that new builds cannot replicate." },
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
                  Mount Pleasant has seen strong appreciation over the past decade as its cultural and commercial profile has risen. The neighbourhood&apos;s transformation from an under-the-radar area to one of Vancouver&apos;s most desirable addresses has created significant equity for early buyers, and ongoing development continues to bring new supply to the market.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Mount Pleasant benefits from multiple growth drivers: the Broadway Subway extension, the neighbourhood&apos;s growing status as a tech and creative industry hub, ongoing densification under the Broadway Plan, and strong demand from young professionals and families. Its central location, excellent transit, and unique cultural identity create a strong foundation for continued appreciation. The industrial lands east of Main Street represent one of the most significant development opportunities in central Vancouver.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Mount Pleasant is one of Vancouver&apos;s best-connected neighbourhoods, with two SkyTrain stations and extensive bus service:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Two stations serve Mount Pleasant: Broadway-City Hall (Canada Line) at the western edge provides rapid transit to Downtown (8 minutes), YVR Airport (20 minutes), and Richmond. Main Street-Science World (Expo and Millennium Lines) at the northern edge connects to Commercial-Broadway, Burnaby, New Westminster, and Surrey. The upcoming Broadway Subway will add further connectivity along the Broadway corridor." },
                    { mode: "Bus", detail: "Broadway is served by the heavily used 99 B-Line and local routes providing frequent east-west service. Main Street has the 3 bus running north-south, connecting to Downtown and south Vancouver. Fraser Street, Kingsway, and Cambie Street also have frequent bus routes that serve the neighbourhood." },
                    { mode: "Cycling", detail: "Mount Pleasant has excellent cycling infrastructure. The Ontario Street bike route provides a dedicated north-south corridor, while the 10th Avenue and Adanac routes offer east-west connections. The neighbourhood's flat terrain makes cycling a practical option for daily commuting. Mobi bike-share stations are available throughout the area." },
                    { mode: "Walking", detail: "With a Walk Score of 92, Mount Pleasant is highly walkable. Main Street, Broadway, and the brewery district are all accessible on foot for most residents. The relatively flat terrain and grid street pattern make navigation easy and pleasant for pedestrians." },
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
                  Mount Pleasant offers a collection of neighbourhood parks that serve as vital community gathering spaces:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Jonathan Rogers Park", desc: "A beautifully maintained heritage park with a distinctive formal layout, playground, wading pool, and sports courts. It is one of the most attractive parks in the area and serves as a community gathering point, hosting events and casual recreation throughout the year." },
                    { name: "Guelph Park (Dude Chilling Park)", desc: "Officially named Guelph Park but affectionately known as 'Dude Chilling Park' after a beloved public art installation, this green space has become one of Mount Pleasant's most iconic locations. The reclining figure sculpture, community gatherings, and relaxed atmosphere perfectly capture the neighbourhood's personality." },
                    { name: "Clark Park", desc: "A large, well-used park at the eastern edge of Mount Pleasant featuring sports fields, a playground, and community gardens. Clark Park is home to a regular farmers' market and community events. Its size and amenities make it a key recreational hub for the neighbourhood." },
                    { name: "Robson Park", desc: "A quieter neighbourhood park offering a playground, open green space, and a community garden. Located in the heart of the residential area south of Broadway, it provides a peaceful green retreat for nearby families." },
                    { name: "Mount Pleasant Park", desc: "The neighbourhood's namesake park sits on a gentle rise, offering open sports fields, a playground, and views of the surrounding area. It is a popular spot for casual sports, dog walking, and community events." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  Mount Pleasant Community Centre, located at the intersection of Main Street and Kingsway, offers a wide range of recreation and community programs. The centre is a vital hub for the neighbourhood, providing fitness facilities, programming for all ages, and a gathering space for community organizations.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Mount Pleasant offers solid educational options, with a growing number of families choosing the neighbourhood for its central location, walkability, and community character. The neighbourhood&apos;s schools reflect its diverse, community-oriented identity.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Mount Pleasant Elementary", type: "K-7 Public", detail: "The neighbourhood's primary elementary school, serving families in the heart of Mount Pleasant. Known for its diverse student body and strong community engagement." },
                      { name: "Sir Charles Tupper Secondary", type: "8-12 Public", detail: "A comprehensive secondary school located in the southern part of Mount Pleasant. It offers a range of academic programs and serves a diverse student population from Mount Pleasant and surrounding neighbourhoods." },
                      { name: "Florence Nightingale Elementary", type: "K-7 Public", detail: "Located near the eastern edge of Mount Pleasant, Florence Nightingale serves the community with a focus on inclusive education and strong parent involvement." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Nearby Post-Secondary</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Emily Carr University of Art + Design", type: "Post-Secondary", detail: "Emily Carr's main campus on Great Northern Way is located at the northern edge of Mount Pleasant. It is one of Canada's leading art, design, and media universities, contributing significantly to the neighbourhood's creative culture." },
                      { name: "Great Northern Way Campus", type: "Post-Secondary", detail: "A shared campus that includes facilities for Emily Carr, SFU, BCIT, and UBC, creating an educational and innovation hub at Mount Pleasant's northern boundary." },
                      { name: "Vancouver Community College", type: "Post-Secondary", detail: "VCC's Broadway campus is accessible from Mount Pleasant, offering vocational and academic programs within easy transit reach." },
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
                  The presence of Emily Carr University and the Great Northern Way campus adds an educational and creative dimension to the neighbourhood that is unique in Vancouver. These institutions contribute to the innovation ecosystem and cultural vibrancy that define Mount Pleasant.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Main Street</p>
                  <p className="text-sm text-gold-700">
                    Main Street is Mount Pleasant&apos;s iconic commercial corridor, stretching from 2nd Avenue to 30th Avenue. It is one of Vancouver&apos;s most characterful shopping streets, defined by independent businesses, locally owned restaurants, and a strong community identity. From vintage clothing and handmade goods to specialty coffee and craft beer, Main Street is a destination in its own right.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Mount Pleasant&apos;s dining scene punches well above its weight. Main Street is home to some of Vancouver&apos;s most acclaimed restaurants, from fine dining to casual neighbourhood gems. The neighbourhood&apos;s culinary identity leans toward locally sourced, creative, and unpretentious. Notable establishments include Toshi Sushi, The Acorn (vegetarian fine dining), Anh and Chi (Vietnamese), and dozens more that make Main Street one of the best dining corridors in the city.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The craft brewery district east of Main Street is a defining feature of the neighbourhood. With over ten breweries within walking distance of each other, it has created a social, walkable beer culture that draws visitors from across the region. Many breweries have taprooms with food trucks, patios, and community events.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Coffee culture is deeply embedded in Mount Pleasant. Specialty roasters including 49th Parallel, Matchstick, and JJ Bean have flagship locations here, and the neighbourhood is dotted with independent cafes that serve as living rooms and co-working spaces for the local creative community.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For groceries, residents have access to several options including Whole Foods on Cambie, smaller specialty shops on Main Street, and the Main Street farmers&apos; market on Saturday mornings. The neighbourhood&apos;s independent retail character extends to food shopping, with butchers, bakers, and specialty food stores complementing the larger grocery options.
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
