import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Downtown Vancouver Real Estate Guide 2026 | Condos, Penthouses & Market Data",
  description:
    "The definitive guide to Downtown Vancouver. Explore condos, luxury penthouses, Robson Street shopping, Gastown, transit options, and urban lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Downtown Vancouver real estate",
    "Downtown Vancouver condos for sale",
    "Downtown Vancouver penthouses",
    "Robson Street Vancouver",
    "Downtown Vancouver neighborhood guide",
    "buy condo Downtown Vancouver",
    "Coal Harbour condos",
    "Gastown Vancouver",
  ],
};

const faqs = [
  {
    question: "Is Downtown Vancouver a good place to buy a condo?",
    answer:
      "Downtown Vancouver is one of the most sought-after urban cores in Canada for condo buyers. Its unmatched walkability, world-class transit connections, proximity to the waterfront and Stanley Park, and vibrant cultural scene make it a strong choice for professionals, investors, and downsizers. While prices per square foot are among the highest in Vancouver, the convenience factor and rental demand provide solid long-term value. The neighbourhood consistently attracts international buyers and local professionals who value a car-free, amenity-rich lifestyle.",
  },
  {
    question: "How much does a condo cost in Downtown Vancouver?",
    answer:
      "Downtown Vancouver is predominantly a condominium market. The composite benchmark price across all property types is approximately $750K. One-bedroom condos typically range from $500K to $700K, while two-bedroom units range from $750K to $1.2M. Luxury penthouses in Coal Harbour, Yaletown, and along the waterfront can command $2M to $10M or more depending on views, floor area, and building prestige. The market offers options at various price points, from compact studio investments to full-floor penthouse residences.",
  },
  {
    question: "What is transit like in Downtown Vancouver?",
    answer:
      "Downtown Vancouver has the best transit connectivity in British Columbia. Five SkyTrain stations serve the area: Waterfront (Expo, Canada, and Millennium Lines plus SeaBus), Burrard (Expo Line), Granville (Expo Line), Vancouver City Centre (Canada Line), and Stadium-Chinatown (Expo and Millennium Lines). The SeaBus provides a direct connection to North Vancouver from Waterfront Station. Extensive bus routes cover every major corridor including Robson, Hastings, Georgia, and Granville Streets. Most residents find a car unnecessary for daily life.",
  },
  {
    question: "What are the best areas within Downtown Vancouver?",
    answer:
      "Downtown Vancouver encompasses several distinct sub-neighbourhoods. Coal Harbour offers luxury waterfront living with stunning mountain and harbour views. Yaletown is known for its converted warehouse lofts, trendy restaurants, and the seawall. Gastown, the city's oldest neighbourhood, features heritage brick buildings, independent boutiques, and a creative scene. The Central Business District around Robson and Georgia Streets provides the densest concentration of shopping, dining, and cultural attractions. Each area has its own character, and the best choice depends on your lifestyle priorities.",
  },
  {
    question: "Is Downtown Vancouver safe and livable?",
    answer:
      "Downtown Vancouver is a vibrant, highly livable urban centre with excellent amenities, green spaces, and community infrastructure. The areas around Coal Harbour, Yaletown, and the West End are particularly well-regarded for safety and quality of life. Like any major city core, certain blocks near Hastings Street and Chinatown face challenges related to homelessness and the opioid crisis. However, the vast majority of Downtown is safe, clean, and well-patrolled. The neighbourhood's 98 Walk Score, proximity to Stanley Park, and exceptional dining and cultural offerings make it one of the most desirable urban living environments in North America.",
  },
];

const downtownData = NEIGHBOURHOODS["downtown"];

export default async function DowntownPage() {
  const pois = await fetchNeighbourhoodPOIs(downtownData.center);

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
            <span className="text-teal-200">Downtown</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Downtown, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$750K</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">98</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">5</p>
                  <p className="text-xs text-warm-500 mt-1">SkyTrain Stations</p>
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
                  ["living", "Living in Downtown", "2"],
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
                      ["West End", "west-end"],
                      ["Fairview", "fairview"],
                      ["Strathcona", "strathcona"],
                      ["Mount Pleasant", "mount-pleasant"],
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
                  Downtown Vancouver is the vibrant urban heart of the city, a dense peninsula bordered by Burrard Inlet to the north, False Creek to the south, and Stanley Park to the west. It is the commercial, cultural, and entertainment centre of Metro Vancouver, home to the city&apos;s tallest towers, busiest transit hubs, and most iconic landmarks. From the heritage cobblestones of Gastown to the gleaming glass towers of Coal Harbour, Downtown offers a kaleidoscope of urban experiences within a remarkably compact, walkable footprint.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What makes Downtown Vancouver exceptional compared to other North American city cores is its relationship with nature. The seawall wraps around the entire waterfront, connecting residents directly to Stanley Park, Coal Harbour, and the False Creek shoreline. Mountain views frame nearly every north-facing window, and the ocean is never more than a ten-minute walk away. This combination of high-density urban living with immediate access to nature is rare and is the primary reason Downtown Vancouver consistently ranks among the world&apos;s most livable city centres.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Downtown encompasses several distinct sub-neighbourhoods, each with its own personality. Gastown brings heritage character and creative energy. Yaletown offers converted loft living and waterfront dining. Coal Harbour provides luxury high-rise residences with harbour views. The central core around Robson Street and Granville Street is the shopping and entertainment nexus. Together, they create a city centre that is genuinely diverse and never dull.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={downtownData.center}
                  zoom={downtownData.zoom}
                  pois={pois.length > 0 ? pois : downtownData.fallbackPOIs}
                  boundaryName="Downtown"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Downtown */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Downtown
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Living in Downtown Vancouver means having the entire city at your doorstep. Morning runs along the seawall with views of the North Shore mountains. A coffee from a specialty roaster before walking to work. Lunch at a Gastown bistro, after-work drinks in Yaletown, and an evening concert at the Orpheum Theatre, all without getting in a car.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The residential landscape is predominantly high-rise condominiums, ranging from sleek modern glass towers to converted heritage buildings. Coal Harbour attracts luxury buyers seeking waterfront views and concierge living. Yaletown draws young professionals and couples with its warehouse-loft aesthetic and vibrant social scene. The central core around Robson and Burrard appeals to those who want to be in the middle of everything.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Downtown living is inherently social. The density creates a genuine urban energy, with festivals, markets, and cultural events throughout the year. The Celebration of Light fireworks, the Vancouver International Film Festival, and seasonal markets at Robson Square are just a few examples of the rich community calendar. Restaurants, theatres, galleries, and nightlife are all within walking distance.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For those who thrive on convenience and urban excitement, Downtown Vancouver offers a lifestyle that is difficult to match anywhere else in Canada. The trade-off is space. Units tend to be more compact than suburban alternatives, but the lifestyle more than compensates for the square footage.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Downtown Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Downtown Vancouver&apos;s real estate market is dominated by condominiums, with a wide range from compact studios to expansive luxury penthouses:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$500K - $1.5M", desc: "The backbone of Downtown real estate. One-bedroom units range from $500K to $700K, two-bedrooms from $750K to $1.2M, and larger three-bedroom units from $1.2M to $1.5M. Popular buildings include those along Coal Harbour, Yaletown, and the Burrard corridor." },
                    { type: "Luxury Penthouses", range: "$2M - $10M+", desc: "Coal Harbour and Yaletown are home to some of Vancouver's most prestigious penthouse residences. Full-floor units with harbour, mountain, and city views command premium prices. Buildings like the Shangri-La, Fairmont Pacific Rim Estates, and One Wall Centre define this segment." },
                    { type: "Townhomes & Lofts", range: "$900K - $2M", desc: "Yaletown's converted warehouse lofts and ground-level townhome-style condos offer a more unique living experience. These are in limited supply and tend to hold their value well due to scarcity and character." },
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
                  Downtown&apos;s real estate market benefits from strong rental demand driven by the concentration of office workers, students, and tourists. Vacancy rates remain among the lowest in the city, making condos here a reliable investment for owners seeking rental income.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Downtown Vancouver continues to benefit from long-term fundamentals: constrained land supply on a peninsula, strong international demand, world-class transit infrastructure, and Vancouver&apos;s growing status as a global tech and film industry hub. The upcoming completion of the Broadway Subway and continued densification along the waterfront will further support property values in the core.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Downtown Vancouver is the transit hub of the entire Metro Vancouver region, offering unmatched connectivity:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Five stations serve Downtown: Waterfront (Expo, Canada, and Millennium Lines), Burrard (Expo Line), Granville (Expo Line), Vancouver City Centre (Canada Line), and Stadium-Chinatown (Expo and Millennium Lines). The Canada Line provides direct service to YVR Airport in approximately 25 minutes." },
                    { mode: "SeaBus", detail: "The SeaBus ferry operates from Waterfront Station to Lonsdale Quay in North Vancouver, providing a scenic 12-minute crossing of Burrard Inlet. It runs every 10-15 minutes during peak hours." },
                    { mode: "Bus", detail: "Downtown is the nexus of TransLink's bus network. Major routes radiate outward along Hastings, Broadway, Granville, and Cambie corridors. Night bus service (N-routes) provides late-night connections on weekends." },
                    { mode: "Walking & Cycling", detail: "With a Walk Score of 98, Downtown is one of the most walkable neighbourhoods in Canada. The seawall provides a continuous cycling and walking path around the entire waterfront. Mobi bike-share stations are located on nearly every block, and protected bike lanes run along Dunsmuir and Hornby Streets." },
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
                  Despite its urban density, Downtown Vancouver offers remarkable access to green space and waterfront:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Stanley Park", desc: "Canada's most famous urban park sits at the western tip of the Downtown peninsula. At 405 hectares, it is larger than New York's Central Park, offering old-growth forest, the seawall, Beaver Lake, the Vancouver Aquarium, and some of the most photographed views in the country. It is the defining green space of Downtown living." },
                    { name: "David Lam Park", desc: "Located in Yaletown along the False Creek seawall, David Lam Park is a popular gathering space with open lawns, playgrounds, and waterfront views. It hosts community events and is a favourite for picnics, tai chi, and casual sports." },
                    { name: "Emery Barnes Park", desc: "A newer urban park in the heart of Yaletown, named after the former MLA and social justice advocate. It features open green space, a playground, and seating areas surrounded by residential towers." },
                    { name: "Coal Harbour Seawall", desc: "The Coal Harbour section of the seawall stretches from Canada Place to Stanley Park, passing the float plane terminal, marinas, and waterfront restaurants. It is one of Vancouver's most scenic walking and cycling routes, with unobstructed views of the North Shore mountains." },
                    { name: "Harbour Green Park", desc: "A waterfront green space in Coal Harbour with manicured lawns, public art, and stunning harbour views. Popular with office workers at lunch and residents in the evening, it provides a tranquil counterpoint to the surrounding high-rises." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The entire Downtown peninsula is encircled by the seawall, making waterfront access a daily reality for residents. Community centres at Coal Harbour and the West End Round House in Yaletown provide fitness, recreation, and cultural programming year-round.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  While Downtown Vancouver is not traditionally known as a family neighbourhood, it does offer educational options for the growing number of families choosing urban living. The compact nature of the area means schools are easily accessible on foot or by transit.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Lord Roberts Elementary", type: "K-7 Public", detail: "Located in the West End, Lord Roberts serves the Downtown and West End communities. It is a diverse, urban school with strong community engagement and a central location." },
                      { name: "Lord Roberts Annex", type: "K-3 Public", detail: "A smaller primary annex providing an intimate learning environment for younger students in the Downtown/West End area." },
                      { name: "King George Secondary", type: "8-12 Public", detail: "The closest public secondary school to Downtown, located near the border with the West End. It serves a diverse student population and offers a range of academic and vocational programs." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Post-Secondary & Other</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Simon Fraser University (Downtown Campus)", type: "Post-Secondary", detail: "SFU's downtown campus in Harbour Centre offers graduate and continuing education programs in the heart of the city." },
                      { name: "Vancouver Community College (Downtown)", type: "Post-Secondary", detail: "VCC's downtown campus provides vocational, trades, and academic upgrading programs near the Main Street-Science World area." },
                      { name: "Various Private Schools", type: "Private", detail: "Several private and independent schools are accessible within a short transit ride, including St. Paul's and Vancouver College." },
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
                  Downtown&apos;s excellent transit connections also mean that families have easy access to top-rated schools across the city. Many Downtown families send their children to schools in the West End, Fairview, or Kitsilano, all within a short commute.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Robson Street</p>
                  <p className="text-sm text-gold-700">
                    Vancouver&apos;s most famous shopping street stretches from BC Place to Stanley Park, offering an eclectic mix of international brands, local boutiques, restaurants, and cafes. It is the retail and social spine of Downtown, busy from morning until late at night.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Downtown Vancouver is the city&apos;s undisputed shopping and dining capital. Robson Street is the flagship strip, but the shopping extends well beyond it. Pacific Centre and CF Richmond Centre offer major retail anchors, while Gastown&apos;s Water Street and the surrounding blocks are home to independent designers, vintage shops, and artisan studios.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The dining scene is extraordinary in its breadth. Gastown has emerged as Vancouver&apos;s culinary hotspot, with acclaimed restaurants like Chambar, L&apos;Abattoir, and Ask for Luigi drawing foodies from across the region. Yaletown offers waterfront patios and trendy bistros. Robson Street features everything from Japanese ramen to Italian trattorias. Coal Harbour provides upscale hotel dining with harbour views.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For entertainment, Downtown is home to BC Place (Vancouver Whitecaps and BC Lions), Rogers Arena (Vancouver Canucks), the Orpheum Theatre, the Queen Elizabeth Theatre, and numerous live music venues, comedy clubs, and nightlife establishments.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Grocery options include Urban Fare in Coal Harbour and Yaletown, IGA on Robson, and numerous specialty food shops. The proximity to Granville Island&apos;s public market adds another dimension to the food shopping experience.
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
