import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Downtown Vancouver Condos for Sale | 2026",
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
      "Downtown Vancouver is one of Canada's most sought-after urban cores. Unmatched walkability, world-class transit, waterfront access, and Stanley Park make it a strong choice for professionals, investors, and downsizers. Prices per square foot are among Vancouver's highest, but convenience and rental demand provide solid long-term value. The area draws international buyers and locals who want a car-free, amenity-rich lifestyle.",
  },
  {
    question: "How much does a condo cost in Downtown Vancouver?",
    answer:
      "The composite benchmark price is approximately $750K. One-bedrooms typically range from $500K to $700K, two-bedrooms from $750K to $1.2M. Luxury penthouses in Coal Harbour, Yaletown, and along the waterfront command $2M to $10M+ depending on views, floor area, and building prestige. Options span from compact studio investments to full-floor penthouse residences.",
  },
  {
    question: "What is transit like in Downtown Vancouver?",
    answer:
      "Downtown has the best transit connectivity in BC. Five SkyTrain stations serve the area: Waterfront (Expo, Canada, Millennium Lines plus SeaBus), Burrard, Granville, Vancouver City Centre, and Stadium-Chinatown. The SeaBus connects to North Vancouver from Waterfront Station. Extensive bus routes cover every major corridor. Most residents find a car unnecessary.",
  },
  {
    question: "What are the best areas within Downtown Vancouver?",
    answer:
      "Downtown has several distinct sub-neighbourhoods. Coal Harbour offers luxury waterfront living with mountain and harbour views. Yaletown is known for converted warehouse lofts, trendy restaurants, and the seawall. Gastown features heritage brick buildings, independent boutiques, and a creative scene. The core around Robson and Georgia Streets has the densest concentration of shopping, dining, and culture. The best choice depends on your lifestyle priorities.",
  },
  {
    question: "Is Downtown Vancouver safe and livable?",
    answer:
      "Downtown Vancouver is highly livable with excellent amenities, green spaces, and infrastructure. Coal Harbour, Yaletown, and the West End are particularly well-regarded for safety and quality of life. Some blocks near Hastings Street and Chinatown face challenges related to homelessness and the opioid crisis, but the vast majority of Downtown is safe, clean, and well-patrolled. A 98 Walk Score, Stanley Park access, and exceptional dining make it one of North America's most desirable urban environments.",
  },
];

const downtownData = NEIGHBOURHOODS["downtown"];

export default async function DowntownPage() {
  const pois = await fetchNeighbourhoodPOIs(downtownData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Downtown", href: "/neighborhoods/downtown" },
        ]}
      />
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
                  Downtown Vancouver is a dense peninsula bordered by Burrard Inlet, False Creek, and Stanley Park. It is Metro Vancouver&apos;s commercial, cultural, and entertainment centre, home to the city&apos;s tallest towers, busiest transit hubs, and most iconic landmarks. From Gastown&apos;s heritage cobblestones to Coal Harbour&apos;s glass towers, it packs a full spectrum of urban experiences into a compact, walkable footprint.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What sets Downtown apart from other North American city cores is nature. The seawall wraps the entire waterfront, connecting residents to Stanley Park, Coal Harbour, and False Creek. Mountain views frame every north-facing window, and the ocean is never more than a ten-minute walk away. That combination of density and immediate nature access is why Downtown consistently ranks among the world&apos;s most livable city centres.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Several distinct sub-neighbourhoods give the core its variety. Gastown brings heritage character and creative energy. Yaletown offers converted loft living and waterfront dining. Coal Harbour provides luxury high-rises with harbour views. The central core around Robson and Granville is the shopping and entertainment nexus.
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
                  Living here means the entire city is at your doorstep. Morning seawall runs with North Shore mountain views. Specialty coffee before walking to work. Lunch in Gastown, drinks in Yaletown, an evening concert at the Orpheum, all without a car.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Housing is predominantly high-rise condos, from sleek glass towers to converted heritage buildings. Coal Harbour attracts luxury buyers seeking waterfront views and concierge living. Yaletown draws young professionals with its warehouse-loft aesthetic. The central core around Robson and Burrard suits those who want to be in the middle of everything.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The density creates genuine urban energy, with festivals, markets, and cultural events year-round. The Celebration of Light fireworks, the Vancouver International Film Festival, and seasonal markets at Robson Square are highlights. Restaurants, theatres, galleries, and nightlife are all walkable.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The trade-off is space. Units are more compact than suburban alternatives, but the lifestyle compensates for the square footage.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Downtown Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Downtown&apos;s market is dominated by condos, from compact studios to luxury penthouses:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$500K - $1.5M", desc: "One-bedrooms range from $500K to $700K, two-bedrooms from $750K to $1.2M, three-bedrooms from $1.2M to $1.5M. Popular buildings line Coal Harbour, Yaletown, and the Burrard corridor." },
                    { type: "Luxury Penthouses", range: "$2M - $10M+", desc: "Coal Harbour and Yaletown hold some of Vancouver's most prestigious penthouses. Full-floor units with harbour, mountain, and city views command top prices. The Shangri-La, Fairmont Pacific Rim Estates, and One Wall Centre define this segment." },
                    { type: "Townhomes & Lofts", range: "$900K - $2M", desc: "Yaletown's converted warehouse lofts and ground-level townhome-style condos are in limited supply and hold value well due to scarcity and character." },
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
                  Strong rental demand from office workers, students, and tourists keeps vacancy rates among the city&apos;s lowest, making condos here a reliable income investment.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Long-term fundamentals remain strong: constrained peninsula land supply, international demand, world-class transit, and Vancouver&apos;s growing tech and film sectors. The Broadway Subway completion and continued waterfront densification will further support core property values.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Downtown is Metro Vancouver&apos;s transit hub:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Five stations: Waterfront (Expo, Canada, Millennium Lines), Burrard, Granville, Vancouver City Centre, and Stadium-Chinatown. The Canada Line reaches YVR Airport in about 25 minutes." },
                    { mode: "SeaBus", detail: "Runs from Waterfront Station to Lonsdale Quay in North Vancouver. A scenic 12-minute crossing every 10-15 minutes at peak." },
                    { mode: "Bus", detail: "The nexus of TransLink's network. Major routes radiate along Hastings, Broadway, Granville, and Cambie corridors. Night bus service (N-routes) runs late on weekends." },
                    { mode: "Walking & Cycling", detail: "Walk Score of 98. The seawall provides a continuous cycling and walking path around the waterfront. Mobi bike-share stations on nearly every block, plus protected lanes on Dunsmuir and Hornby." },
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
                  Despite its density, Downtown offers remarkable green space and waterfront access:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Stanley Park", desc: "At 405 hectares (larger than Central Park), Canada's most famous urban park sits at the western tip of the peninsula. Old-growth forest, the seawall, Beaver Lake, the Vancouver Aquarium, and some of the most photographed views in the country." },
                    { name: "David Lam Park", desc: "In Yaletown along the False Creek seawall. Open lawns, playgrounds, waterfront views, and community events. A favourite for picnics, tai chi, and casual sports." },
                    { name: "Emery Barnes Park", desc: "A newer urban park in Yaletown named after the former MLA and social justice advocate. Open green space, a playground, and seating areas surrounded by residential towers." },
                    { name: "Coal Harbour Seawall", desc: "Stretches from Canada Place to Stanley Park past the float plane terminal, marinas, and waterfront restaurants. Unobstructed North Shore mountain views." },
                    { name: "Harbour Green Park", desc: "Waterfront green space in Coal Harbour with manicured lawns, public art, and harbour views. A tranquil counterpoint to the surrounding high-rises." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The seawall encircles the entire peninsula, making waterfront access a daily reality. Community centres at Coal Harbour and the Roundhouse in Yaletown provide fitness, recreation, and cultural programming year-round.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Not traditionally a family neighbourhood, Downtown still offers educational options for the growing number of urban families. Schools are easily accessible on foot or by transit.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Lord Roberts Elementary", type: "K-7 Public", detail: "Serves Downtown and the West End. A diverse urban school with strong community engagement." },
                      { name: "Lord Roberts Annex", type: "K-3 Public", detail: "Smaller primary annex with an intimate learning environment for younger students." },
                      { name: "King George Secondary", type: "8-12 Public", detail: "Near the West End border. Diverse student population with academic and vocational programs." },
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
                      { name: "Simon Fraser University (Downtown Campus)", type: "Post-Secondary", detail: "SFU's Harbour Centre campus offers graduate and continuing education programs." },
                      { name: "Vancouver Community College (Downtown)", type: "Post-Secondary", detail: "VCC's downtown campus provides vocational, trades, and academic upgrading near Main Street-Science World." },
                      { name: "Various Private Schools", type: "Private", detail: "St. Paul's, Vancouver College, and other independent schools are a short transit ride away." },
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
                  Excellent transit also gives families easy access to schools across the city. Many Downtown families send children to schools in the West End, Fairview, or Kitsilano.
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
                    Vancouver&apos;s most famous shopping street stretches from BC Place to Stanley Park with international brands, local boutiques, restaurants, and cafes. Busy from morning until late at night.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Beyond Robson, Pacific Centre offers major retail, while Gastown&apos;s Water Street is home to independent designers, vintage shops, and artisan studios.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Gastown has emerged as Vancouver&apos;s culinary hotspot. Chambar, L&apos;Abattoir, and Ask for Luigi draw foodies from across the region. Yaletown offers waterfront patios, Robson has everything from ramen to trattorias, and Coal Harbour provides upscale hotel dining with harbour views.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Entertainment includes BC Place (Whitecaps, BC Lions), Rogers Arena (Canucks), the Orpheum Theatre, the Queen Elizabeth Theatre, and numerous live music venues and comedy clubs.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Groceries include Urban Fare in Coal Harbour and Yaletown, IGA on Robson, and specialty food shops. Granville Island&apos;s public market is also close by.
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
