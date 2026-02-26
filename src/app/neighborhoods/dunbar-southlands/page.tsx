import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Dunbar-Southlands Vancouver Real Estate Guide 2026 | Family Homes & Market Data",
  description:
    "The definitive guide to Dunbar-Southlands, Vancouver. Explore luxury family homes, Pacific Spirit Park, Dunbar Village shopping, top schools, and lifestyle near UBC. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Dunbar-Southlands Vancouver real estate",
    "Dunbar homes for sale",
    "Dunbar-Southlands luxury homes",
    "Dunbar Village Vancouver",
    "Dunbar-Southlands neighborhood guide",
    "buy home Dunbar Vancouver",
    "Pacific Spirit Park homes",
    "Dunbar-Southlands family homes",
  ],
};

const faqs = [
  {
    question: "Is Dunbar-Southlands a good neighborhood for families?",
    answer:
      "Dunbar-Southlands is widely considered one of the best family neighbourhoods in Vancouver. It offers an exceptional combination of top-rated public and private schools, proximity to Pacific Spirit Regional Park's 763 hectares of trails, a charming village shopping district on Dunbar Street, and quiet, tree-lined streets with spacious family homes. The neighbourhood has a strong community feel, with active parent networks and numerous family-oriented programs at the Dunbar Community Centre. Its proximity to UBC adds further educational and cultural value.",
  },
  {
    question: "How much does a home cost in Dunbar-Southlands?",
    answer:
      "Dunbar-Southlands is one of Vancouver's most expensive residential neighbourhoods. The composite benchmark price across all property types is approximately $2.5M. Detached homes, which dominate the housing stock, typically range from $2.5M to $5M or more, depending on lot size, proximity to Pacific Spirit Park, and property condition. The Southlands area, with its larger estate-style properties and equestrian lots, can command even higher prices. Condominiums and townhomes near Dunbar Village offer more accessible options, generally ranging from $700K to $1.6M.",
  },
  {
    question: "What is Dunbar Village like?",
    answer:
      "Dunbar Village is the neighbourhood's charming commercial heart, centered along Dunbar Street roughly between 27th and 42nd Avenues. It offers a walkable mix of independent shops, cafes, restaurants, bookstores, a grocery store, and professional services. Unlike larger commercial districts, Dunbar Village retains a genuine small-town feel with locally owned businesses, friendly service, and a community-oriented atmosphere. It is the kind of village where you will run into neighbours on a Saturday morning and linger over coffee.",
  },
  {
    question: "How close is Dunbar-Southlands to UBC?",
    answer:
      "Dunbar-Southlands is one of the closest established residential neighbourhoods to UBC. The university campus is approximately 10 minutes by car or bus from most parts of the neighbourhood, and Pacific Spirit Regional Park, which borders the neighbourhood's western edge, connects directly to the UBC Endowment Lands via extensive trail networks. Multiple bus routes provide direct service to the UBC bus exchange, making it an ideal location for university faculty, staff, and families who value proximity to the campus.",
  },
  {
    question: "What makes Southlands different from Dunbar?",
    answer:
      "Southlands is the southern portion of the Dunbar-Southlands neighbourhood, distinguished by its rural, estate-like character. Located between SW Marine Drive and the Fraser River, Southlands features large acreage properties, horse stables, and equestrian facilities that are unique in urban Vancouver. It is one of the few areas in the city where horseback riding is part of daily life. Properties in Southlands tend to be significantly larger and more expensive than those in the Dunbar portion, and the area has a distinctly pastoral atmosphere that feels worlds apart from the rest of the city.",
  },
];

const dunbarSouthlandsData = NEIGHBOURHOODS["dunbar-southlands"];

export default async function DunbarSouthlandsPage() {
  const pois = await fetchNeighbourhoodPOIs(dunbarSouthlandsData.center);

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
            <span className="text-teal-200">Dunbar-Southlands</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Dunbar-Southlands, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$2.5M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">10 min</p>
                  <p className="text-xs text-warm-500 mt-1">To UBC</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">763 ha</p>
                  <p className="text-xs text-warm-500 mt-1">Pacific Spirit Park</p>
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
                  ["living", "Living in Dunbar-Southlands", "2"],
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
                      ["UBC", "ubc"],
                      ["West Point Grey", "west-point-grey"],
                      ["Kerrisdale", "kerrisdale"],
                      ["Arbutus Ridge", "arbutus-ridge"],
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
                  Dunbar-Southlands is a large, family-oriented neighbourhood on Vancouver&apos;s far west side, stretching from West 16th Avenue in the north to the Fraser River in the south, and from Alma Street on the east to Pacific Spirit Regional Park on the west. It is one of the most spacious and green neighbourhoods in the city, combining the walkable village charm of the Dunbar commercial district with the almost rural character of the Southlands equestrian area.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood&apos;s greatest natural asset is its direct adjacency to Pacific Spirit Regional Park, a 763-hectare urban forest with over 73 kilometres of trails. This vast green space gives Dunbar-Southlands a sense of being on the edge of wilderness while remaining firmly within the city. The proximity to UBC, just minutes to the west, adds academic and cultural depth to an already rich community.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Dunbar-Southlands attracts families who want space, nature, and community without sacrificing access to top schools and urban amenities. The streets are wide, the lots are generous, the trees are tall, and the pace of life is decidedly more relaxed than in Vancouver&apos;s denser neighbourhoods. It is the kind of place where children grow up climbing trees, riding bikes to the village, and exploring forest trails after school.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={dunbarSouthlandsData.center}
                  zoom={dunbarSouthlandsData.zoom}
                  pois={pois.length > 0 ? pois : dunbarSouthlandsData.fallbackPOIs}
                  boundaryName="Dunbar-Southlands"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Dunbar-Southlands */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Dunbar-Southlands
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Daily life in Dunbar-Southlands revolves around family, nature, and community. Mornings might begin with a trail run through Pacific Spirit Park before dropping the children at Dunbar Elementary or Southlands Elementary. A stop at the Dunbar Village shops on the way home, a coffee at one of the neighbourhood&apos;s beloved cafes, and the day unfolds at a pace that feels distinctly un-urban.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock consists predominantly of detached homes on large lots, ranging from classic character homes built in the 1920s through 1950s to modern custom builds. Many homes feature deep setbacks, mature gardens, and generous backyards that are becoming increasingly rare in Vancouver. The Southlands area, south of SW Marine Drive, takes this further with acreage properties, horse paddocks, and a genuinely pastoral atmosphere.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The community is tight-knit and engaged. The Dunbar Community Centre hosts programs for all ages, from toddler music classes to seniors&apos; fitness. School events, sports leagues, and neighbourhood gatherings are well-attended. The annual Dunbar Village Day brings the community together each summer, and the local farmers&apos; market is a Saturday morning institution.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For families who value space, access to nature, excellent schools, and a strong sense of community, Dunbar-Southlands is one of Vancouver&apos;s finest neighbourhoods. It combines the advantages of west-side living with a quality of life that is genuinely difficult to find elsewhere in the city.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Dunbar-Southlands Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Dunbar-Southlands is among the most expensive residential neighbourhoods in Vancouver, with property values reflecting the area&apos;s exceptional schools, proximity to UBC, and access to Pacific Spirit Park. The composite benchmark price is approximately $2.5M:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$2.5M - $5M+", desc: "The dominant property type, with homes on large lots that often exceed 6,000 square feet. You will find character homes from the 1930s-1950s alongside modern rebuilds. Properties backing onto Pacific Spirit Park or in the Southlands equestrian area command the highest premiums." },
                    { type: "Condominiums", range: "$600K - $1.2M", desc: "A limited inventory of low-rise condominiums near Dunbar Village provides a more accessible entry point. These are popular with downsizers who want to remain in the neighbourhood and young professionals drawn to the area's lifestyle." },
                    { type: "Townhomes", range: "$1.3M - $2.0M", desc: "A small number of townhome developments exist near the commercial corridors. These are highly sought after by growing families who want the Dunbar lifestyle without the carrying costs of a large detached home." },
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
                  Dunbar-Southlands properties have historically demonstrated strong value retention. The neighbourhood&apos;s proximity to UBC, excellent school catchments, and adjacency to Pacific Spirit Park create demand that consistently outstrips supply.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Dunbar-Southlands benefits from proximity to UBC, one of the world&apos;s top universities, and the irreplaceable asset of Pacific Spirit Park. As Vancouver&apos;s population grows and density increases elsewhere, the spacious, nature-adjacent character of Dunbar-Southlands becomes increasingly rare and valuable. For buyers seeking long-term stability in a family-oriented west-side neighbourhood, Dunbar-Southlands is among the strongest options in the city.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  While Dunbar-Southlands is more car-dependent than central Vancouver neighbourhoods, it is well-served by bus transit and benefits from excellent road connections:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus", detail: "Multiple bus routes serve the neighbourhood, including the 7 and 25 along Dunbar Street, the 41 and 43 along 41st Avenue to UBC and Oakridge-41st SkyTrain station, and the 33 along 33rd Avenue. Direct bus service to the UBC bus exchange provides connections to the broader transit network." },
                    { mode: "Cycling", detail: "The neighbourhood's quiet residential streets and proximity to Pacific Spirit Park's trails make cycling a popular choice. Designated bike routes connect to the broader city cycling network, and the relatively flat terrain makes commuting by bike practical for many residents." },
                    { mode: "Driving", detail: "41st Avenue, Dunbar Street, and SW Marine Drive provide direct routes throughout the city. UBC is approximately 10 minutes by car, downtown about 20 minutes. The airport is accessible via SW Marine Drive and the Arthur Laing Bridge in approximately 20-25 minutes." },
                    { mode: "Walking", detail: "Dunbar Village is walkable for most residents in the northern part of the neighbourhood. The extensive trail network in Pacific Spirit Park provides scenic walking routes. The Southlands area, being more spread out, is better suited to driving or cycling." },
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
                  Dunbar-Southlands is one of Vancouver&apos;s greenest neighbourhoods, anchored by direct access to Pacific Spirit Regional Park:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Pacific Spirit Regional Park", desc: "The crown jewel of west-side green space, this 763-hectare urban forest borders the entire western edge of Dunbar-Southlands. With over 73 kilometres of trails through old-growth and second-growth forest, bogs, and foreshore, it offers hiking, running, cycling, horseback riding, and nature observation. It is one of the largest urban parks in North America and a defining feature of life in this neighbourhood." },
                    { name: "Musqueam Park", desc: "A community park in the southern part of the neighbourhood near the Musqueam First Nation lands. It features playing fields, a playground, and open green space, serving as an important recreational hub for families in the southern portion of Dunbar-Southlands." },
                    { name: "Dunbar Memorial Park", desc: "A neighbourhood park along Dunbar Street with a playground, open lawn, and mature trees. Its central location near Dunbar Village makes it a popular gathering spot for families after shopping or dining trips." },
                    { name: "Trimble Park", desc: "A well-maintained community park with tennis courts, a playground, and open green space. Located in the northern part of the neighbourhood, it serves as a focal point for community recreation and children's activities." },
                    { name: "Southlands Equestrian Area", desc: "A unique feature of this neighbourhood, the Southlands area includes horse paddocks, stables, and riding trails. The Southlands Riding Club operates here, making it one of the only urban neighbourhoods in Vancouver where equestrian activities are part of the community fabric." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Dunbar Community Centre serves as the neighbourhood&apos;s recreational hub, offering programs for all ages, fitness facilities, and community events. Its programming is particularly strong for families, with an extensive range of children&apos;s activities, sports leagues, and seasonal camps.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Education is a primary draw for families choosing Dunbar-Southlands. The neighbourhood is home to some of Vancouver&apos;s most respected public schools and is within easy reach of top private institutions. The proximity to UBC further enriches the educational landscape.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Dunbar Elementary", type: "K-7 Public", detail: "A well-regarded neighbourhood school with strong academics, an engaged parent community, and a variety of enrichment programs. Its location in the heart of the Dunbar area makes it a focal point of community life." },
                      { name: "Southlands Elementary", type: "K-7 Public", detail: "Serving the southern portion of the neighbourhood, this smaller school offers an intimate, community-focused learning environment. Known for its outdoor education programs that take advantage of the surrounding natural areas." },
                      { name: "Lord Byng Secondary", type: "8-12 Public", detail: "One of Vancouver's top public high schools, renowned for its strong academics, its acclaimed mini school program, and excellent arts and athletics programs. Lord Byng consistently ranks among the best public secondary schools in British Columbia." },
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
                      { name: "Crofton House School", type: "JK-12 Private (Girls)", detail: "One of Vancouver's most prestigious all-girls schools, located in nearby Kerrisdale. Known for academic excellence, strong arts and STEM programs, and a nurturing community environment." },
                      { name: "St. George's School", type: "1-12 Private (Boys)", detail: "A premier all-boys school located within the Dunbar area. Consistently ranked among the top independent schools in Canada for academics, athletics, and character development." },
                      { name: "West Point Grey Academy", type: "JK-12 Private (Co-ed)", detail: "A well-regarded co-educational independent school in nearby West Point Grey, known for its balanced approach to academics, arts, and athletics." },
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
                  The proximity to UBC is a significant educational asset. Families benefit from access to the university&apos;s libraries, museums (including the Museum of Anthropology and the Beaty Biodiversity Museum), cultural events, and public lectures. Many UBC faculty and staff choose to live in Dunbar-Southlands for the short commute and the family-friendly environment.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Dunbar Village</p>
                  <p className="text-sm text-gold-700">
                    The neighbourhood&apos;s beloved commercial strip along Dunbar Street, stretching from approximately 27th to 42nd Avenue. It features an eclectic mix of independent shops, cafes, restaurants, a bookstore, and a grocery store, all with a genuine village atmosphere that makes it one of the most charming shopping districts on the west side.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Dunbar Village is the commercial and social heart of the neighbourhood. It has maintained its independent, locally owned character in a way that many Vancouver shopping districts have not. You will find a well-stocked Safeway for groceries, an independent bookstore, a hardware store, several excellent cafes, and a range of restaurants that reflect the neighbourhood&apos;s diverse community.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Dining options along Dunbar Street range from beloved neighbourhood sushi restaurants and Thai cuisine to cozy brunch spots, pizza parlours, and cafes with excellent baked goods. The atmosphere is relaxed and family-friendly, with many restaurants offering casual, welcoming environments that suit the neighbourhood&apos;s character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For more extensive shopping, Kerrisdale Village is a short drive or bus ride south, and the shops along West 4th Avenue in Kitsilano are easily accessible to the northeast. Oakridge Centre, currently undergoing its massive redevelopment, is about 10 minutes east along 41st Avenue.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The UBC campus also offers shopping and dining options, including the University Village and the various cafes and restaurants within the campus itself. For specialty groceries, the neighbourhood is well-served by local shops and the larger stores in nearby commercial areas.
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
