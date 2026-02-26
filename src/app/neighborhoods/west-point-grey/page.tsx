import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "West Point Grey Vancouver Real Estate Guide 2026 | Luxury Homes & Market Data",
  description:
    "The definitive guide to West Point Grey, Vancouver. Explore luxury homes, Spanish Banks, Jericho Beach, proximity to UBC, top schools, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "West Point Grey Vancouver real estate",
    "West Point Grey homes for sale",
    "West Point Grey luxury homes",
    "Spanish Banks Vancouver",
    "Jericho Beach homes",
    "West Point Grey neighborhood guide",
    "buy home West Point Grey Vancouver",
    "West Point Grey Academy",
  ],
};

const faqs = [
  {
    question: "Is West Point Grey a good neighbourhood to buy a home in?",
    answer:
      "West Point Grey is one of Vancouver's most desirable residential neighbourhoods. Its combination of spectacular beaches (Spanish Banks, Jericho Beach, Locarno Beach), proximity to UBC, excellent schools, and an affluent, established residential character makes it a top choice for families and professionals. Properties here offer a lifestyle that is difficult to replicate elsewhere in Vancouver: ocean views, mountain panoramas, forest access, and a quiet, leafy residential setting, all within minutes of UBC and a short commute to downtown.",
  },
  {
    question: "How much does a home cost in West Point Grey?",
    answer:
      "West Point Grey is a premium west-side neighbourhood. The composite benchmark price across all property types is approximately $2.3M. Detached homes, which make up the majority of the housing stock, typically range from $2.5M to $5M or more, with properties offering ocean views or proximity to the beaches commanding the highest prices. A smaller number of condominiums and townhomes near 10th Avenue or along the neighbourhood's edges provide more accessible entry points, generally ranging from $700K to $1.5M.",
  },
  {
    question: "What beaches are in West Point Grey?",
    answer:
      "West Point Grey is home to three of Vancouver's most beloved beaches. Spanish Banks, the largest, offers expansive sandy flats at low tide, stunning views of the North Shore mountains, and excellent conditions for kiteboarding and beach volleyball. Locarno Beach, between Spanish Banks and Jericho, is a quieter stretch popular with families. Jericho Beach, on the neighbourhood's eastern edge, features a sailing centre, kayak rentals, a concession stand, and is a popular launch point for paddleboarding. Together, these beaches give West Point Grey one of the finest stretches of urban waterfront in Canada.",
  },
  {
    question: "What schools are near West Point Grey?",
    answer:
      "West Point Grey is served by excellent public and private schools. Queen Mary Elementary is a well-regarded neighbourhood public school, and Lord Byng Secondary is one of Vancouver's top-performing public high schools. West Point Grey Academy, a co-educational independent school (JK-12), is located within the neighbourhood and is known for its balanced approach to academics, arts, and athletics. The proximity to UBC provides additional educational resources, including university libraries, cultural programming, and academic events.",
  },
  {
    question: "How far is West Point Grey from UBC and downtown?",
    answer:
      "West Point Grey is exceptionally close to UBC, approximately 5 minutes by car or bus from most parts of the neighbourhood. Pacific Spirit Regional Park forms the western boundary, and the UBC campus is immediately beyond. Downtown Vancouver is approximately 20-25 minutes by car or 30-35 minutes by bus, with direct routes running along 4th Avenue and 10th Avenue. The neighbourhood's position between UBC and downtown makes it ideal for families with one partner working at the university and another commuting to the city centre.",
  },
];

const westPointGreyData = NEIGHBOURHOODS["west-point-grey"];

export default async function WestPointGreyPage() {
  const pois = await fetchNeighbourhoodPOIs(westPointGreyData.center);

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
            <span className="text-teal-200">West Point Grey</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            West Point Grey, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$2.3M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">3</p>
                  <p className="text-xs text-warm-500 mt-1">Beaches</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">5 min</p>
                  <p className="text-xs text-warm-500 mt-1">To UBC</p>
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
                  ["living", "Living in West Point Grey", "2"],
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
                      ["Kitsilano", "kitsilano"],
                      ["Dunbar-Southlands", "dunbar-southlands"],
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
                  West Point Grey is an affluent residential neighbourhood on Vancouver&apos;s northwestern edge, bounded roughly by West 10th Avenue to the south, Alma Street to the east, English Bay to the north, and Pacific Spirit Regional Park to the west. Its position between the beaches to the north and UBC to the west gives it a unique character: this is a neighbourhood where the natural beauty of Vancouver&apos;s coastline, mountains, and forests is woven directly into daily life.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood is defined by three spectacular beaches, Spanish Banks, Locarno Beach, and Jericho Beach, which together form one of the longest continuous stretches of accessible urban waterfront in Vancouver. On a clear day, the views from these beaches encompass the North Shore mountains, Bowen Island, and the distant peaks of Vancouver Island. This natural setting, combined with quiet residential streets, mature trees, and proximity to UBC, creates a lifestyle that balances beach-town ease with the substance of one of Vancouver&apos;s most established residential communities.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  West Point Grey draws families, university faculty, and professionals who value outdoor living, excellent schools, and a strong sense of community. The neighbourhood has maintained its low-density, residential character while benefiting from the cultural and intellectual vibrancy of having one of the world&apos;s top universities as its neighbour. It is a place where Saturday mornings mean a walk along the beach, where children grow up sailing at the Jericho Sailing Centre, and where the rhythm of life is set as much by the tides as by the city.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={westPointGreyData.center}
                  zoom={westPointGreyData.zoom}
                  pois={pois.length > 0 ? pois : westPointGreyData.fallbackPOIs}
                  boundaryName="West Point Grey"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in West Point Grey */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in West Point Grey
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  West Point Grey is a neighbourhood where the outdoors is not an afterthought but a central part of daily life. Residents wake to the sound of seabirds and the sight of mountains across the water. The morning routine might include a beach walk or a jog along the waterfront trail before heading to work or school. The air smells of salt water and cedar, and the light, filtered through towering trees and reflected off the ocean, gives the neighbourhood a quality that is uniquely West Coast.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock consists primarily of detached homes, many of them character properties from the 1920s through 1960s that have been lovingly maintained or thoughtfully renovated. You will find craftsman bungalows, Tudor-influenced homes, mid-century ranchers, and contemporary custom builds, often on generous lots with mature gardens. Properties with ocean views or proximity to the beach command significant premiums, and some of the finest homes in the neighbourhood offer panoramic vistas of the water, mountains, and sunsets that are simply breathtaking.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  After school, children head to the beach for sailing lessons at the Jericho Sailing Centre, play in Trimble Park, or explore the trails of Pacific Spirit Park. Weekend activities might include kiteboarding at Spanish Banks, a family bike ride along the waterfront, or a visit to one of UBC&apos;s museums or cultural events. Dinner could be a casual affair at one of the neighbourhood&apos;s restaurants on West 10th Avenue, or a summer barbecue in a backyard that catches the evening light.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The community is engaged and active, with strong parent networks, active community associations, and a shared appreciation for the neighbourhood&apos;s natural setting. It is a place where people know their neighbours, where children walk to school, and where the quality of life is shaped as much by nature as by any urban amenity.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  West Point Grey Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  West Point Grey is a high-end residential neighbourhood where the combination of beach proximity, ocean views, UBC adjacency, and established character creates strong and sustained demand. The composite benchmark price is approximately $2.3M:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$2.5M - $6M+", desc: "The dominant property type. Character homes on generous lots, many with views of the water and mountains. Properties closest to the beaches or with unobstructed ocean views are the most valuable. Contemporary custom builds and heritage renovations both command premium prices." },
                    { type: "Condominiums", range: "$600K - $1.3M", desc: "A limited number of low-rise condominiums exist near 10th Avenue and Alma Street. These offer a more accessible entry point to the neighbourhood and appeal to downsizers, young professionals, and investors who want the West Point Grey lifestyle at a lower price." },
                    { type: "Townhomes", range: "$1.2M - $2.0M", desc: "A small inventory of townhomes, primarily near the eastern edge of the neighbourhood. These are in high demand among families seeking the area's exceptional schools and beach access without the commitment of a detached home." },
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
                  West Point Grey properties benefit from factors that are impossible to replicate: a finite supply of land between the ocean and the university, irreplaceable beach access, and views that cannot be built in front of. These fundamentals support consistently strong values regardless of broader market conditions.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    West Point Grey occupies a geographic position that is inherently scarce: waterfront land adjacent to a world-class university in one of Canada&apos;s most desirable cities. The neighbourhood&apos;s beaches, views, and proximity to UBC are permanent assets that cannot be replicated elsewhere. For buyers seeking a long-term hold in a location with exceptional lifestyle appeal and strong fundamentals, West Point Grey is one of the most compelling options on Vancouver&apos;s west side.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  West Point Grey is well-connected to both UBC and downtown, with bus routes providing frequent service and the neighbourhood&apos;s position making cycling and driving practical options:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus", detail: "The 4 and 84 buses run along West 4th Avenue, providing direct service to UBC and downtown. The 14 bus along West 10th Avenue offers an additional east-west route. The 7 bus on Dunbar Street connects to Dunbar Village and south to the 41st Avenue corridor. These routes provide frequent, reliable service throughout the day." },
                    { mode: "Cycling", detail: "West Point Grey is one of Vancouver's best neighbourhoods for cycling. The waterfront path along the beaches connects to the Seaside Greenway, providing a scenic, car-free route to Kitsilano, downtown, and Stanley Park. The relatively flat terrain near the water and dedicated bike lanes make cycling a practical transportation choice." },
                    { mode: "Driving", detail: "West 4th Avenue and West 10th Avenue provide direct routes to UBC (approximately 5 minutes) and downtown (approximately 20 minutes). NW Marine Drive offers a scenic coastal route to UBC. The airport is approximately 25-30 minutes via Granville Street or Oak Street." },
                    { mode: "Walking", detail: "The beaches, parks, and waterfront trails make West Point Grey exceptionally walkable for recreation. The 10th Avenue shopping area provides daily necessities within walking distance for most residents. The neighbourhood's quiet residential streets, with wide sidewalks and mature tree canopies, are pleasant for walking year-round." },
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
                  West Point Grey offers some of the finest outdoor spaces in all of Vancouver, from sandy beaches to urban forest to neighbourhood parks:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Spanish Banks", desc: "Vancouver's largest beach by area, offering vast sandy flats at low tide that extend hundreds of metres into English Bay. Popular for kiteboarding, beach volleyball, swimming, and sunset watching. The views of the North Shore mountains from Spanish Banks are among the most photographed in the city. Concession stands, picnic areas, and ample parking make it accessible for extended visits." },
                    { name: "Jericho Beach", desc: "A popular family beach on the neighbourhood's eastern edge, home to the Jericho Sailing Centre which offers sailing, windsurfing, and kayaking. The beach features a concession stand, a large grassy area for picnics and sports, and a connected waterfront trail. The annual Vancouver Folk Music Festival is held here, drawing thousands to the waterfront each summer." },
                    { name: "Locarno Beach", desc: "Situated between Spanish Banks and Jericho, Locarno is the quietest of the three beaches and a favourite among locals who prefer a more peaceful waterfront experience. It offers excellent swimming, beautiful views, and a naturalized setting with less development than the neighbouring beaches." },
                    { name: "Trimble Park", desc: "A well-maintained neighbourhood park with a playground, tennis courts, sports fields, and open green space. Located in the residential heart of West Point Grey, it serves as a community gathering place for families, dog walkers, and local sports leagues." },
                    { name: "Pacific Spirit Regional Park", desc: "While technically bordering the neighbourhood to the west, Pacific Spirit's 763 hectares of forest trails are an integral part of the West Point Grey lifestyle. Residents access the park's extensive trail network for hiking, running, cycling, and horseback riding, enjoying a wilderness experience minutes from home." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The combination of oceanfront beaches, forest trails, and neighbourhood parks gives West Point Grey one of the richest outdoor recreation offerings of any neighbourhood in Vancouver. From water sports to forest hiking, from beach picnics to competitive sports, the outdoor opportunities here are exceptional and are a primary reason families choose to live in this area.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  West Point Grey is served by highly regarded public and private schools, and the proximity to UBC adds an exceptional educational dimension. The neighbourhood is one of Vancouver&apos;s strongest catchment areas for families who prioritize education.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Queen Mary Elementary", type: "K-7 Public", detail: "A well-regarded neighbourhood elementary school known for strong academics, an active parent community, and excellent extracurricular programs. Its location in the heart of West Point Grey makes it a walking-distance school for many families." },
                      { name: "Lord Byng Secondary", type: "8-12 Public", detail: "One of Vancouver's top-performing public high schools, shared with the neighbouring Dunbar area. Lord Byng is renowned for its mini school program, strong academics, outstanding arts programs, and competitive athletics. It consistently ranks among the best public secondary schools in British Columbia." },
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
                      { name: "West Point Grey Academy", type: "JK-12 Private (Co-ed)", detail: "A well-regarded co-educational independent school located within the neighbourhood. Known for its balanced approach to academics, arts, athletics, and community service. The school's philosophy emphasizes developing well-rounded students in a supportive, inclusive environment." },
                      { name: "St. George's School", type: "1-12 Private (Boys)", detail: "A premier all-boys school in the broader west-side area, easily accessible from West Point Grey. Known for academic rigour, competitive athletics, and strong character development." },
                      { name: "Crofton House School", type: "JK-12 Private (Girls)", detail: "One of Vancouver's most prestigious all-girls schools, located in nearby Kerrisdale. Known for academic excellence and a strong community culture." },
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
                  The University of British Columbia, one of the world&apos;s top 40 universities, is just minutes away. Families in West Point Grey benefit from access to UBC&apos;s world-class libraries, the Museum of Anthropology, the Beaty Biodiversity Museum, the Chan Centre for the Performing Arts, and a rich calendar of public lectures, cultural events, and educational programs. Many UBC faculty and staff choose to live in West Point Grey for the proximity and the quality of life.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">West 10th Avenue</p>
                  <p className="text-sm text-gold-700">
                    The neighbourhood&apos;s primary commercial strip along West 10th Avenue near Alma Street and Sasamat Street. A small but charming collection of cafes, restaurants, shops, and services that cater to the local community with a relaxed, neighbourhood feel.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  West Point Grey&apos;s commercial offerings are modest but characterful. The shopping area along West 10th Avenue, particularly near Sasamat Street, provides a handful of excellent cafes, restaurants, a grocery store, and local services. This is not a destination shopping district; it is a neighbourhood commercial area where you pick up essentials and enjoy a leisurely coffee while chatting with neighbours.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For dining, the neighbourhood offers several well-loved restaurants and cafes that reflect the community&apos;s character. You will find excellent coffee shops, a beloved fish and chips spot, sushi restaurants, and casual bistros. The beach concession stands at Spanish Banks and Jericho add seasonal dining options with ocean views.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For more extensive shopping and dining, West 4th Avenue in adjacent Kitsilano is minutes away and offers a wide range of restaurants, boutiques, yoga studios, and specialty shops. Dunbar Village, to the south, provides additional neighbourhood shopping. The UBC campus offers its own dining and retail options, including the University Village shopping area.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  West Point Grey residents appreciate that the neighbourhood&apos;s commercial offerings are intentionally modest. The focus here is on residential quality, natural beauty, and outdoor living, with the understanding that more extensive shopping and dining is just a short trip away in surrounding neighbourhoods.
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
