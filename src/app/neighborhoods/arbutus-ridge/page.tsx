import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Arbutus Ridge Vancouver Real Estate Guide 2026 | Luxury Homes & Market Data",
  description:
    "The definitive guide to Arbutus Ridge, Vancouver. Explore luxury real estate, heritage homes, the Arbutus Greenway, top schools, parks, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Arbutus Ridge Vancouver real estate",
    "Arbutus Ridge homes for sale",
    "Arbutus Ridge luxury homes",
    "Arbutus Greenway Vancouver",
    "Arbutus Ridge neighborhood guide",
    "buy home Arbutus Ridge Vancouver",
    "Arbutus Village shopping",
    "Arbutus Ridge heritage homes",
  ],
};

const faqs = [
  {
    question: "Is Arbutus Ridge a good neighborhood to buy a home in?",
    answer:
      "Arbutus Ridge is one of Vancouver's most sought-after west-side residential neighborhoods. Nestled between Kerrisdale and Shaughnessy, it offers the best of both worlds: quiet, tree-lined streets with generous lot sizes and easy access to shopping, parks, and transit. The Arbutus Greenway has further elevated the neighborhood's appeal as a connected, walkable community. Property values here have remained consistently strong, supported by limited supply, high demand, and excellent school catchments.",
  },
  {
    question: "How much does a home cost in Arbutus Ridge Vancouver?",
    answer:
      "Arbutus Ridge is a premium west-side neighborhood. The composite benchmark price across all property types is approximately $2.2M. Detached homes, which make up the majority of the housing stock, typically range from $2.5M to $4M or more depending on lot size and condition. Condominiums and townhomes near Arbutus Village offer more accessible entry points, generally ranging from $700K to $1.5M.",
  },
  {
    question: "What is the Arbutus Greenway?",
    answer:
      "The Arbutus Greenway is a 9-kilometre multi-use pathway built on the former Arbutus rail corridor, stretching from the Fraser River in the south to Kitsilano in the north. It passes directly through Arbutus Ridge, providing residents with a car-free walking, jogging, and cycling route that connects to multiple neighborhoods. The Greenway has become one of Vancouver's most beloved urban trails and is a major lifestyle asset for Arbutus Ridge residents.",
  },
  {
    question: "What schools are near Arbutus Ridge?",
    answer:
      "Arbutus Ridge is served by excellent public and private schools. Prince of Wales Secondary is one of Vancouver's top-performing public high schools, and Quilchena Elementary is a well-regarded neighbourhood elementary school. Nearby private options include Crofton House School and St. George's School, both within easy driving distance. The neighbourhood's proximity to UBC also provides families with access to university programs, libraries, and cultural events.",
  },
  {
    question: "What amenities are available in Arbutus Ridge?",
    answer:
      "Arbutus Village, a modern shopping centre at the heart of the neighbourhood, offers a grocery store, pharmacy, restaurants, cafes, and specialty retail. The Arbutus Greenway provides recreation and active transportation directly through the neighbourhood. Quilchena Park offers playing fields, playgrounds, and green space. The neighbourhood's central west-side location means Kerrisdale Village, Oakridge Centre, and the shops along West 4th Avenue in Kitsilano are all just minutes away.",
  },
];

const arbutusRidgeData = NEIGHBOURHOODS["arbutus-ridge"];

export default async function ArbutusRidgePage() {
  const pois = await fetchNeighbourhoodPOIs(arbutusRidgeData.center);

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
            <span className="text-teal-200">Arbutus Ridge</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Arbutus Ridge, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$2.2M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">93</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">9 km</p>
                  <p className="text-xs text-warm-500 mt-1">Arbutus Greenway</p>
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
                  ["living", "Living in Arbutus Ridge", "2"],
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
                      ["Kerrisdale", "kerrisdale"],
                      ["Shaughnessy", "shaughnessy"],
                      ["Dunbar-Southlands", "dunbar-southlands"],
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
                  Arbutus Ridge is a quiet, upscale residential neighbourhood in Vancouver&apos;s west side, situated between Kerrisdale to the south, Shaughnessy to the east, and Kitsilano to the north. Bounded roughly by West 16th Avenue to the north, West 33rd Avenue to the south, East Boulevard to the east, and Arbutus Street to the west, this neighbourhood is defined by generous lots, mature tree canopies, and a distinctly residential character that sets it apart from more commercially active areas.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood&apos;s defining feature is the Arbutus Greenway, a 9-kilometre multi-use pathway that runs directly through the area along the former Arbutus rail corridor. This linear park connects Arbutus Ridge to Kitsilano, Marpole, and beyond, giving residents a car-free corridor for walking, cycling, and jogging that has become one of Vancouver&apos;s most popular urban trails. Combined with Quilchena Park and the neighbourhood&apos;s wide, tree-lined streets, Arbutus Ridge feels remarkably green and spacious for an urban setting.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Arbutus Ridge draws families, professionals, and long-term residents who appreciate its peaceful atmosphere, proximity to excellent schools, and easy access to west-side amenities. Arbutus Village, a modern shopping centre at the neighbourhood&apos;s core, provides everyday conveniences, while the broader west-side location puts residents within minutes of Kerrisdale Village, the shops on West 4th Avenue, and the beaches and parks that define Vancouver&apos;s most desirable residential areas.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={arbutusRidgeData.center}
                  zoom={arbutusRidgeData.zoom}
                  pois={pois.length > 0 ? pois : arbutusRidgeData.fallbackPOIs}
                  boundaryName="Arbutus Ridge"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Arbutus Ridge */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Arbutus Ridge
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Arbutus Ridge is the kind of neighbourhood where mornings begin quietly. The streets are wide and lined with towering maples and chestnuts, and the pace of life feels unhurried compared to busier parts of the city. It is a place where families put down deep roots and stay for decades.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock is dominated by handsome detached homes on generous lots, many dating from the mid-twentieth century with substantial renovations or complete rebuilds. You will find a mix of stately Tudor and Georgian-influenced homes alongside contemporary custom builds, all set back from the street with mature gardens and established landscaping. The lots here are among the largest on the west side, giving the neighbourhood an estate-like quality.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A typical day might start with a jog or bike ride along the Arbutus Greenway, followed by a coffee at one of the cafes near Arbutus Village. Children walk or cycle to Quilchena Elementary or catch the bus to Prince of Wales Secondary. Afternoon errands might include picking up groceries at the Arbutus Village IGA, and the evening could mean a stroll through Quilchena Park or dinner at a nearby Kerrisdale restaurant.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  What residents value most is the balance: a serene, leafy residential environment that is nevertheless well-connected to everything Vancouver&apos;s west side has to offer. You are never far from excellent schools, shopping, parks, and transit, yet the neighbourhood itself remains remarkably peaceful.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Arbutus Ridge Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Arbutus Ridge is a premium residential neighbourhood where detached homes dominate the landscape. The composite benchmark price is approximately $2.2M, though individual properties vary significantly depending on lot size, age, and condition:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$2.5M - $4.5M+", desc: "The dominant property type in Arbutus Ridge. Homes sit on generous lots, many exceeding 6,000 square feet of land. Heritage-style homes, mid-century estates, and contemporary custom builds are all represented. Larger lots and newer builds command premium prices." },
                    { type: "Condominiums", range: "$600K - $1.2M", desc: "A limited number of low-rise and mid-rise condominiums exist near Arbutus Village and along the neighbourhood's edges. These offer a more accessible entry point to the area and are popular with downsizers and young professionals." },
                    { type: "Townhomes", range: "$1.2M - $1.8M", desc: "A small but growing inventory of townhomes, often part of newer developments near Arbutus Village. These are in high demand among families who want Arbutus Ridge's lifestyle at a more moderate price point." },
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
                  Arbutus Ridge properties tend to hold their value exceptionally well. The neighbourhood&apos;s combination of large lots, limited new supply, excellent school catchments, and proximity to the Arbutus Greenway creates sustained demand that supports long-term appreciation.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Arbutus Ridge benefits from its position between two of Vancouver&apos;s most prestigious neighbourhoods, Kerrisdale and Shaughnessy, while the Arbutus Greenway has added significant lifestyle value. The neighbourhood&apos;s large lots also offer long-term development potential under evolving city planning policies. For buyers seeking a quiet, established west-side address with strong fundamentals, Arbutus Ridge is an excellent choice.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Arbutus Ridge is well-positioned for both active transportation and vehicle access, with the Arbutus Greenway providing a significant cycling and pedestrian corridor:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus", detail: "Bus routes run along Arbutus Street and 41st Avenue, connecting residents to the Oakridge-41st SkyTrain station, UBC, and downtown. The 33 bus on 33rd Avenue and the 16 bus on Arbutus provide additional north-south and east-west connections." },
                    { mode: "Cycling", detail: "The Arbutus Greenway is the neighbourhood's greatest transportation asset. This dedicated 9-kilometre multi-use path runs directly through Arbutus Ridge, providing a car-free corridor for cycling to Kitsilano, downtown, and south toward Marpole and the Fraser River." },
                    { mode: "Driving", detail: "Arbutus Street, 33rd Avenue, and 41st Avenue provide direct routes to all parts of the city. UBC is about 10 minutes by car, downtown approximately 15-20 minutes, and the airport is accessible via Granville Street to the Arthur Laing Bridge." },
                    { mode: "Walking", detail: "Arbutus Village provides most daily necessities within walking distance, and the Arbutus Greenway makes walking a practical option for reaching neighbouring areas. Kerrisdale Village is a pleasant 10-15 minute walk to the south." },
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
                  Arbutus Ridge offers excellent green space, anchored by the Arbutus Greenway and several well-maintained neighbourhood parks:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Arbutus Greenway", desc: "The defining green corridor of the neighbourhood, this 9-kilometre multi-use pathway runs along the former rail line through the heart of Arbutus Ridge. It features community gardens, public art installations, rest areas, and native plantings. It is both a recreational trail and a vital transportation link connecting multiple neighbourhoods." },
                    { name: "Quilchena Park", desc: "A large, well-maintained park on the northern edge of the neighbourhood with expansive playing fields, a running track, playgrounds, and tennis courts. Home to local soccer and field hockey leagues, it serves as the primary recreational hub for Arbutus Ridge families." },
                    { name: "Arbutus Village Park", desc: "A smaller neighbourhood park adjacent to the Arbutus Village shopping centre, providing a convenient green space for families and residents. Features a playground and open lawn area." },
                    { name: "Delamont Park", desc: "A quiet, tree-shaded neighbourhood park with a playground and open green space. Popular with young families and dog walkers, it offers a peaceful retreat within the residential area." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Arbutus Greenway has transformed how residents interact with outdoor space in this neighbourhood. Beyond its transportation function, it serves as a linear park where neighbours meet, children play, and community events are held throughout the year. Combined with Quilchena Park&apos;s athletic facilities, Arbutus Ridge is one of the best-served neighbourhoods for green space on the west side.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Arbutus Ridge is served by some of Vancouver&apos;s most respected public schools and is within easy reach of the city&apos;s top private institutions. The combination of strong catchment schools and proximity to private school options makes this neighbourhood particularly attractive to families.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Quilchena Elementary", type: "K-7 Public", detail: "A well-regarded neighbourhood elementary school with strong academics, an active parent community, and a focus on arts and outdoor education. Consistently rated among the top public elementary schools on the west side." },
                      { name: "Prince of Wales Secondary", type: "8-12 Public", detail: "One of Vancouver's highest-performing public secondary schools, known for strong academics, its mini school program, competitive athletics, and a supportive learning environment. The school's reputation is a significant draw for families moving to the area." },
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
                      { name: "Crofton House School", type: "JK-12 Private (Girls)", detail: "One of Vancouver's most prestigious all-girls schools, located in nearby Kerrisdale. Known for academic excellence, strong arts programs, and a supportive community environment." },
                      { name: "St. George's School", type: "1-12 Private (Boys)", detail: "A premier all-boys school in the Dunbar area, easily accessible from Arbutus Ridge. Renowned for academics, athletics, and leadership development." },
                      { name: "Vancouver College", type: "K-12 Private", detail: "A respected Catholic school with strong academics and athletics, located a short drive east on 33rd Avenue." },
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
                  The proximity to the University of British Columbia adds further educational depth to the neighbourhood. UBC&apos;s campus is approximately 10 minutes away, and families benefit from access to university libraries, cultural programming, and the academic atmosphere that characterizes Vancouver&apos;s west side.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Arbutus Village</p>
                  <p className="text-sm text-gold-700">
                    The neighbourhood&apos;s primary commercial hub, Arbutus Village is a modern shopping centre anchored by a grocery store, pharmacy, and a mix of restaurants, cafes, and specialty retail. It serves as the convenient one-stop destination for daily needs.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  While Arbutus Ridge itself is primarily residential, the neighbourhood is exceptionally well-positioned between several of Vancouver&apos;s best shopping districts. Arbutus Village provides the essentials, including an IGA grocery store, cafes, a liquor store, and several restaurants, all within walking distance for most residents.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For a more extensive shopping and dining experience, Kerrisdale Village is just south along the Greenway, offering over a hundred boutiques, restaurants, bakeries, and specialty stores. To the north, the shops and restaurants along West 4th Avenue in Kitsilano provide another layer of variety, from trendy brunch spots to independent clothing stores.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Dining in and around Arbutus Ridge reflects the neighbourhood&apos;s multicultural character. You will find excellent Japanese restaurants, European-style bakeries, contemporary West Coast cuisine, and cozy neighbourhood cafes. Thomas Haas, the celebrated chocolatier and patissier, is just a short distance away, as are several well-regarded sushi restaurants.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The neighbourhood&apos;s location also means easy access to larger retail destinations. Oakridge Centre, currently undergoing a massive redevelopment, is nearby, and the growing Cambie Corridor shopping district offers additional options.
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
