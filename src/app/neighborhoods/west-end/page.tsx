import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "West End Vancouver Real Estate Guide 2026 | Beach Living & Market Data",
  description:
    "The definitive guide to the West End, Vancouver. Explore condos, English Bay beach living, Davie Village, Denman Street dining, Stanley Park access, and urban lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "West End Vancouver real estate",
    "West End Vancouver condos for sale",
    "English Bay Vancouver",
    "Davie Village Vancouver",
    "West End neighborhood guide",
    "buy condo West End Vancouver",
    "Denman Street Vancouver",
    "Stanley Park neighbourhood",
  ],
};

const faqs = [
  {
    question: "Is the West End a good place to buy a condo?",
    answer:
      "The West End is one of Vancouver's most desirable neighbourhoods for condo buyers, particularly those who value walkability, beach access, and vibrant community life. Its location between Stanley Park and Downtown, combined with a Walk Score of 97 and three beaches within walking distance, creates a lifestyle that is genuinely unique in Canada. The West End offers some of the most affordable entry points in the Downtown peninsula, making it accessible to first-time buyers and investors. The strong rental demand, driven by the neighbourhood's popularity with professionals and students, also makes it a solid investment choice.",
  },
  {
    question: "How much does a condo cost in the West End?",
    answer:
      "The West End is one of the more accessible neighbourhoods on the Downtown peninsula in terms of pricing. The composite benchmark price is approximately $680K. Studio apartments range from $350K to $450K, one-bedroom units from $500K to $650K, and two-bedroom condos from $700K to $1M. Larger or renovated units with ocean or park views can command $1M to $1.5M. Heritage building conversions, while less common, offer unique character at varying price points. The lower price per unit compared to Coal Harbour or Yaletown reflects the older building stock, but many buyers view this as excellent value given the location.",
  },
  {
    question: "What is Davie Village?",
    answer:
      "Davie Village, centred along Davie Street between Burrard and Jervis Streets, is the heart of Vancouver's LGBTQ+ community and one of Canada's most prominent queer neighbourhoods. It is marked by rainbow crosswalks, vibrant nightlife, eclectic restaurants, and community-focused businesses. The neighbourhood hosts the annual Vancouver Pride Parade and Festival, one of the largest Pride events in the country. Beyond its identity as an LGBTQ+ hub, Davie Village is a welcoming, diverse, and lively commercial strip that adds significant character and energy to the West End.",
  },
  {
    question: "How close is Stanley Park to the West End?",
    answer:
      "Stanley Park is essentially the West End's backyard. The park's entrance at the foot of Georgia Street is a five-to-ten-minute walk from most West End residences. Many West End residents use Stanley Park daily for running, cycling, walking, or simply enjoying the seawall. The proximity to a 405-hectare urban forest with old-growth trees, beaches, the Vancouver Aquarium, and some of the most scenic views in the city is one of the West End's defining advantages. No other neighbourhood in Vancouver provides this level of access to such a significant green space.",
  },
  {
    question: "What is the community vibe like in the West End?",
    answer:
      "The West End has one of the strongest senses of community of any Vancouver neighbourhood, despite being one of the most densely populated areas in Canada. This is largely due to its walkable, pedestrian-oriented streets, the concentration of local businesses, and active community organizations. Neighbours greet each other on the street, regulars are known at local cafes, and community events from beach volleyball tournaments to the English Bay fireworks create shared experiences. The neighbourhood is exceptionally diverse, welcoming people of all ages, backgrounds, orientations, and lifestyles. It is the kind of place where you feel part of a genuine urban village.",
  },
];

const westEndData = NEIGHBOURHOODS["west-end"];

export default async function WestEndPage() {
  const pois = await fetchNeighbourhoodPOIs(westEndData.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/neighborhoods/west-end.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">West End</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            West End, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$680K</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">97</p>
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
                  ["living", "Living in West End", "2"],
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
                      ["Downtown", "downtown"],
                      ["Kitsilano", "kitsilano"],
                      ["Fairview", "fairview"],
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
                  The West End is a vibrant residential neighbourhood occupying the western portion of Vancouver&apos;s Downtown peninsula, bounded by Stanley Park to the west, Coal Harbour to the north, the Downtown business core to the east, and English Bay to the south. It is one of the most densely populated neighbourhoods in Canada, yet it maintains an intimate, village-like character that defies its urban density. With three beaches, Stanley Park at its doorstep, and a Walk Score of 97, the West End offers a lifestyle that is uniquely Vancouver.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The West End is defined by its remarkable diversity and inclusivity. It is home to one of Canada&apos;s most prominent LGBTQ+ communities, centred around Davie Village, and its residents span every age group, cultural background, and lifestyle. This diversity is reflected in the neighbourhood&apos;s eclectic dining scene, independent shops, and community events. The West End is a place where everyone is welcome, and that spirit of openness is palpable on its streets.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  What makes the West End truly special is its relationship with the natural environment. English Bay Beach, Sunset Beach, and Second Beach are all within walking distance of virtually every address in the neighbourhood. Stanley Park&apos;s 405 hectares of forest, trails, and seawall are steps away. The combination of intense urban density and immediate access to beaches, forest, and ocean is what draws people to the West End and keeps them there for decades.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={westEndData.center}
                  zoom={westEndData.zoom}
                  pois={pois.length > 0 ? pois : westEndData.fallbackPOIs}
                  boundaryName="West End"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in the West End */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in the West End
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Life in the West End revolves around the outdoors and the street. Morning jogs along the seawall to Stanley Park. Coffee at a neighbourhood cafe on Denman Street. An afternoon at English Bay Beach watching the freighters on the inlet. Dinner at one of the dozens of restaurants within walking distance. The West End is a neighbourhood where the car is truly optional and the sidewalk is your living room.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The residential landscape is primarily mid-rise and high-rise apartment buildings, many dating from the 1960s and 1970s, interspersed with some newer towers and a scattering of heritage homes and conversions. The older buildings offer character, generous floor plans by modern standards, and the patina of a well-loved neighbourhood. Newer developments bring modern finishes and amenities while maintaining the neighbourhood&apos;s residential scale.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Community events are a cornerstone of West End life. The Celebration of Light fireworks at English Bay draw hundreds of thousands of spectators each summer. The Pride Parade through Davie Village is one of Canada&apos;s largest. The West End farmers&apos; market, street festivals, and seasonal events create a year-round social calendar that brings residents together.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The West End appeals to a wide range of residents: young professionals drawn to the vibrant social scene, retirees who love the walkability and beach access, LGBTQ+ community members who find a welcoming home in Davie Village, and everyone in between. It is one of the few neighbourhoods in Vancouver where you can live a truly car-free, beach-adjacent, nature-immersed urban life.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  West End Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The West End&apos;s real estate market is predominantly condominiums and rental apartments, with some of the most accessible pricing on the Downtown peninsula:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$350K - $1M", desc: "The West End offers a wide range of condos, from compact studios starting around $350K to spacious two-bedroom units up to $1M. The benchmark price is approximately $680K. Older buildings from the 1960s-1980s offer lower entry points, while newer or renovated units command premiums." },
                    { type: "Ocean View Units", range: "$700K - $1.5M", desc: "Units with views of English Bay, the North Shore mountains, or Stanley Park carry significant premiums. South and west-facing units on higher floors are the most sought after, particularly in buildings along Beach Avenue and Pacific Street." },
                    { type: "Heritage Conversions", range: "$500K - $900K", desc: "A small number of heritage homes have been converted into unique multi-unit residences. These offer character and charm that cannot be replicated in new construction. They are in limited supply and tend to attract buyers seeking something distinctive." },
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
                  The West End&apos;s rental market is exceptionally strong, with vacancy rates consistently below the city average. This makes West End condos attractive to investor-buyers, as rental demand from professionals, students, and newcomers remains robust year-round.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    The West End benefits from irreplaceable locational advantages: Stanley Park, three beaches, Downtown employment, and a Walk Score of 97. The City of Vancouver&apos;s West End Community Plan encourages sensitive densification and improved public spaces. The neighbourhood&apos;s lower average prices compared to Coal Harbour and Yaletown, combined with its exceptional lifestyle amenities, make it an increasingly attractive value proposition for buyers seeking long-term appreciation on the Downtown peninsula.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  The West End&apos;s compact layout and exceptional walkability mean that most daily trips can be made on foot, but transit options are strong for longer journeys:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Burrard Station on the Expo Line is the closest SkyTrain stop, located at the eastern edge of the West End. It provides direct connections to Downtown, Commercial-Broadway, New Westminster, and Surrey. The Granville and Vancouver City Centre stations are also within walking distance." },
                    { mode: "Bus", detail: "Multiple bus routes serve the West End. The 5 and 6 run along Robson and Davie Streets, the C21 and C23 community shuttles circulate through the neighbourhood, and routes along Denman and Burrard Streets provide connections to Kitsilano, UBC, and south Vancouver." },
                    { mode: "Cycling", detail: "The West End is well-served by cycling infrastructure. The seawall provides a scenic, car-free route around the entire waterfront. The Comox-Helmcken Greenway offers a protected east-west cycling route through the neighbourhood. Mobi bike-share stations are plentiful throughout the area." },
                    { mode: "Walking", detail: "With a Walk Score of 97, virtually everything is within walking distance in the West End. Groceries, dining, shopping, beaches, Stanley Park, and transit are all accessible on foot. The flat terrain and pedestrian-friendly streets make walking the primary mode of transportation for most residents." },
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
                  The West End is one of the most park-rich neighbourhoods in Vancouver, with beaches, urban green spaces, and Stanley Park all within walking distance:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Stanley Park", desc: "The crown jewel of Vancouver's park system and the West End's greatest asset. This 405-hectare urban forest offers old-growth trees, the seawall, Beaver Lake, Lost Lagoon, the Vancouver Aquarium, totem poles, and countless trails. It is larger than New York's Central Park and serves as the West End's backyard." },
                    { name: "English Bay Beach", desc: "Vancouver's most popular urban beach, located at the foot of Denman Street. English Bay is the epicentre of West End social life in summer, hosting the Celebration of Light fireworks, polar bear swims, and spectacular sunsets year-round. The adjacent bathhouse building adds historical character." },
                    { name: "Sunset Beach", desc: "A quieter alternative to English Bay, Sunset Beach stretches along the seawall toward the Burrard Bridge. It offers a more relaxed atmosphere, an off-leash dog area, and views across False Creek. The annual Vancouver Pride celebrations use Sunset Beach as a gathering point." },
                    { name: "Alexandra Park", desc: "A neighbourhood green space in the heart of the residential West End, featuring a bandshell that hosts concerts, a playground, and open lawns. It serves as an intimate community park for nearby residents." },
                    { name: "Nelson Park", desc: "A well-used neighbourhood park with a community garden, playground, and sports courts. Located in the central West End, it provides green space and community gathering opportunities in the densest part of the neighbourhood." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The West End Community Centre on Denman Street offers fitness, recreation, swimming, and community programming. Its location near English Bay and Stanley Park makes it a hub for active residents throughout the year.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  The West End is not traditionally a family-focused neighbourhood, but the growing number of families choosing urban living has increased demand for local schools. The neighbourhood shares school catchments with Downtown and offers access to schools across the peninsula.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Lord Roberts Annex", type: "K-3 Public", detail: "A small primary school located in the West End, serving young children with an intimate, community-oriented learning environment. It is the most accessible public school option for West End families with young children." },
                      { name: "Lord Roberts Elementary", type: "K-7 Public", detail: "The primary elementary school serving the West End and Downtown area. It offers a diverse, urban school experience with strong community engagement." },
                      { name: "King George Secondary", type: "8-12 Public", detail: "Located near the border of the West End and Downtown, King George Secondary serves secondary students from the peninsula. It offers a range of academic programs and benefits from its central, transit-accessible location." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Nearby Options</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Elsie Roy Elementary", type: "K-7 Public", detail: "Located in the nearby Olympic Village/False Creek area, Elsie Roy is a modern school that draws families from the broader Downtown peninsula." },
                      { name: "Various Private Schools", type: "Private", detail: "The West End's central location provides convenient transit access to private schools across Vancouver, including St. Paul's, York House, and Little Flower Academy." },
                      { name: "West End Community Centre Programs", type: "Community", detail: "The West End Community Centre offers extensive after-school and youth programs, filling a vital role for families in the neighbourhood." },
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
                  The West End&apos;s excellent transit connections mean families have easy access to schools throughout the city. Many families in the neighbourhood send their children to schools in Fairview, Kitsilano, or other nearby areas, all within a short commute.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Denman Street</p>
                  <p className="text-sm text-gold-700">
                    Denman Street is the West End&apos;s main commercial artery, stretching from Coal Harbour to English Bay Beach. It is lined with an eclectic mix of restaurants representing cuisines from around the world, independent shops, cafes, and services. Denman Street is where the West End community gathers, and its proximity to English Bay makes it especially vibrant in the warmer months.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The West End&apos;s dining scene is one of the most diverse and exciting in Vancouver. Denman Street alone offers Japanese ramen, Korean barbecue, Italian trattorias, Indian curry houses, Thai restaurants, and much more. The concentration of excellent, affordable dining in a walkable area is one of the West End&apos;s greatest draws.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Davie Street adds another dimension with its vibrant restaurants, cafes, and nightlife. From brunch spots to late-night eateries, Davie Village caters to all hours and tastes. Robson Street, running along the northern edge of the West End, adds major retail and international dining options.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For daily shopping, the West End is well-served by grocery stores including IGA, Safeway, and various Asian grocery shops on Denman and Robson Streets. The neighbourhood&apos;s walkability means that most residents can access multiple shopping options on foot within minutes.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Independent shops, bookstores, vintage clothing stores, and specialty food shops give the West End a character that larger commercial districts often lack. The neighbourhood rewards exploration, with hidden gems tucked away on side streets and in heritage buildings throughout the area.
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
