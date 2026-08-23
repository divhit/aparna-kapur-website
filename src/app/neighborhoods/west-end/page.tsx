import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import MarketPriceLinks from "@/components/market/MarketPriceLinks";
import NeighbourhoodListings from "@/components/neighborhoods/NeighbourhoodListings";

/** Listings are live data; regenerate hourly rather than freezing at build. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "West End Vancouver | Real Estate Guide",
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
      "The West End is one of Vancouver's most desirable condo neighbourhoods for buyers who value walkability, beach access, and vibrant community life. Its location between Stanley Park and Downtown, a Walk Score of 97, and three beaches create a lifestyle unique in Canada. It also offers some of the most affordable entry points on the Downtown peninsula, making it accessible to first-time buyers and investors. Strong rental demand adds solid investment appeal.",
  },
  {
    question: "How much does a condo cost in the West End?",
    answer:
      "The composite benchmark is approximately $680K. Studios range from $350K to $450K, one-bedrooms from $500K to $650K, and two-bedrooms from $700K to $1M. Larger or renovated units with ocean or park views can reach $1M to $1.5M. Prices run lower than Coal Harbour or Yaletown due to older building stock, but many buyers see this as excellent value for the location.",
  },
  {
    question: "What is Davie Village?",
    answer:
      "Davie Village, along Davie Street between Burrard and Jervis, is the heart of Vancouver's LGBTQ+ community and one of Canada's most prominent queer neighbourhoods. Rainbow crosswalks, vibrant nightlife, eclectic restaurants, and community-focused businesses define the strip. It hosts the annual Vancouver Pride Parade and Festival, one of the country's largest Pride events. It is also a welcoming, lively commercial area that adds character to the broader West End.",
  },
  {
    question: "How close is Stanley Park to the West End?",
    answer:
      "Stanley Park is the West End's backyard. The entrance at the foot of Georgia Street is a five-to-ten-minute walk from most residences. Many locals use it daily for running, cycling, or walking the seawall. Access to a 405-hectare urban forest with old-growth trees, beaches, the Vancouver Aquarium, and some of the city's best views is the West End's defining advantage.",
  },
  {
    question: "What is the community vibe like in the West End?",
    answer:
      "Despite being one of Canada's most densely populated areas, the West End has a strong sense of community. Walkable streets, local businesses, and active community organizations bring people together. Neighbours greet each other, regulars are known at cafes, and events from beach volleyball to the English Bay fireworks create shared experiences. The neighbourhood is exceptionally diverse, welcoming people of all ages, backgrounds, and lifestyles. It feels like a genuine urban village.",
  },
];

const westEndData = NEIGHBOURHOODS["west-end"];

export default async function WestEndPage() {
  const pois = await fetchNeighbourhoodPOIs(westEndData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "West End", href: "/neighborhoods/west-end" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/neighborhoods/west-end.webp')",
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

      <NeighbourhoodListings slug="west-end" />

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="hidden lg:block" />
            <div className="lg:col-span-3">
              <div className="grid grid-cols-3 gap-6 max-w-2xl">
                <div>
                  <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["west-end"].avgPrice}</p>
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
                  The West End occupies the western portion of Vancouver&apos;s Downtown peninsula, bounded by Stanley Park, Coal Harbour, the business core, and English Bay. One of Canada&apos;s most densely populated neighbourhoods, it maintains an intimate, village-like character. Three beaches, Stanley Park at its doorstep, and a Walk Score of 97 make for a lifestyle that is uniquely Vancouver.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Diversity and inclusivity define the West End. It is home to one of Canada&apos;s most prominent LGBTQ+ communities, centred around Davie Village, and its residents span every age group and cultural background. That openness is reflected in the eclectic dining scene, independent shops, and community events.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  English Bay Beach, Sunset Beach, and Second Beach are all walkable from virtually every address. Stanley Park&apos;s 405 hectares of forest, trails, and seawall are steps away. The combination of urban density and immediate access to beaches, forest, and ocean is what draws people here and keeps them for decades.
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
                  Life here revolves around the outdoors. Morning seawall jogs to Stanley Park. Coffee on Denman Street. An afternoon at English Bay watching freighters on the inlet. Dinner at one of dozens of walkable restaurants. The car is truly optional and the sidewalk is your living room.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Housing is primarily mid-rise and high-rise apartments, many from the 1960s and 1970s, plus some newer towers and heritage conversions. Older buildings offer character and generous floor plans by modern standards. Newer developments bring modern finishes while maintaining the neighbourhood&apos;s residential scale.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Community events anchor West End life. The Celebration of Light fireworks at English Bay draw hundreds of thousands each summer. The Pride Parade through Davie Village is one of Canada&apos;s largest. Farmers&apos; markets, street festivals, and seasonal events fill the year-round social calendar.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The area appeals to young professionals, retirees who love walkability and beach access, LGBTQ+ community members in Davie Village, and everyone in between. Few neighbourhoods in Vancouver offer truly car-free, beach-adjacent, nature-immersed urban life.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  West End Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The market is predominantly condos and rental apartments, with some of the most accessible pricing on the Downtown peninsula:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$350K - $1M", desc: "Compact studios start around $350K, spacious two-bedrooms reach $1M. Benchmark is approximately $680K. Older buildings (1960s-1980s) offer lower entry points; newer or renovated units command premiums." },
                    { type: "Ocean View Units", range: "$700K - $1.5M", desc: "Views of English Bay, the North Shore mountains, or Stanley Park carry significant premiums. South and west-facing higher floors along Beach Avenue and Pacific Street are most sought after." },
                    { type: "Heritage Conversions", range: "$500K - $900K", desc: "A small number of heritage homes converted into multi-unit residences. Character and charm that new construction cannot replicate. Limited supply attracts buyers seeking something distinctive." },
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
                  Vacancy rates sit consistently below the city average, making condos attractive to investors. Rental demand from professionals, students, and newcomers stays robust year-round.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Irreplaceable location: Stanley Park, three beaches, Downtown employment, Walk Score of 97. The City&apos;s West End Community Plan encourages sensitive densification and improved public spaces. Lower average prices than Coal Harbour and Yaletown, combined with exceptional lifestyle amenities, make this an increasingly attractive value proposition for long-term appreciation.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Most daily trips happen on foot, but transit options are strong for longer journeys:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Burrard Station (Expo Line) sits at the eastern edge, with direct connections to Commercial-Broadway, New Westminster, and Surrey. Granville and Vancouver City Centre stations are also walkable." },
                    { mode: "Bus", detail: "The 5 and 6 run along Robson and Davie Streets. C21 and C23 community shuttles circulate the neighbourhood. Routes along Denman and Burrard connect to Kitsilano, UBC, and south Vancouver." },
                    { mode: "Cycling", detail: "The seawall provides a scenic, car-free waterfront route. The Comox-Helmcken Greenway offers protected east-west cycling. Mobi bike-share stations are plentiful." },
                    { mode: "Walking", detail: "Walk Score of 97. Groceries, dining, beaches, Stanley Park, and transit are all accessible on foot. Flat terrain and pedestrian-friendly streets make walking the default for most residents." },
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
                  One of Vancouver&apos;s most park-rich neighbourhoods, with beaches, green spaces, and Stanley Park all walkable:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Stanley Park", desc: "A 405-hectare urban forest (larger than Central Park) with old-growth trees, the seawall, Beaver Lake, Lost Lagoon, the Vancouver Aquarium, totem poles, and countless trails. The West End's backyard." },
                    { name: "English Bay Beach", desc: "Vancouver's most popular urban beach, at the foot of Denman Street. The epicentre of West End summer life: Celebration of Light fireworks, polar bear swims, and year-round sunsets. The adjacent bathhouse adds historical character." },
                    { name: "Sunset Beach", desc: "A quieter alternative stretching along the seawall toward the Burrard Bridge. Relaxed atmosphere, off-leash dog area, and False Creek views. A gathering point for Vancouver Pride celebrations." },
                    { name: "Alexandra Park", desc: "A neighbourhood green space with a bandshell for concerts, a playground, and open lawns. An intimate community park in the residential heart of the West End." },
                    { name: "Nelson Park", desc: "Community garden, playground, and sports courts in the central West End. Green space and gathering opportunities in the neighbourhood's densest section." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The West End Community Centre on Denman offers fitness, recreation, swimming, and programming year-round, positioned between English Bay and Stanley Park.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Not traditionally family-focused, but growing urban families have increased demand for local schools. The neighbourhood shares catchments with Downtown.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Lord Roberts Annex", type: "K-3 Public", detail: "A small primary school with an intimate, community-oriented environment. The most accessible option for West End families with young children." },
                      { name: "Lord Roberts Elementary", type: "K-7 Public", detail: "The primary elementary serving the West End and Downtown. Diverse urban school with strong community engagement." },
                      { name: "King George Secondary", type: "8-12 Public", detail: "Near the West End/Downtown border. Serves peninsula students with a range of academic programs in a central, transit-accessible location." },
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
                      { name: "Elsie Roy Elementary", type: "K-7 Public", detail: "A modern school in nearby Olympic Village/False Creek that draws families from the broader peninsula." },
                      { name: "Various Private Schools", type: "Private", detail: "Central location gives convenient transit access to St. Paul's, York House, Little Flower Academy, and others." },
                      { name: "West End Community Centre Programs", type: "Community", detail: "Extensive after-school and youth programs that fill a vital role for neighbourhood families." },
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
                  Excellent transit gives families easy access to schools across the city. Many send children to schools in Fairview, Kitsilano, or other nearby areas.
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
                    The West End&apos;s main commercial artery, stretching from Coal Harbour to English Bay Beach. Lined with restaurants from around the world, independent shops, cafes, and services. Proximity to English Bay makes it especially vibrant in warmer months.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Denman Street alone offers Japanese ramen, Korean barbecue, Italian trattorias, Indian curry houses, Thai, and more. The concentration of excellent, affordable dining in a walkable area is one of the West End&apos;s greatest draws.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Davie Street adds vibrant restaurants, cafes, and nightlife from brunch to late-night. Robson Street along the northern edge brings major retail and international dining.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Groceries include IGA, Safeway, and Asian grocery shops on Denman and Robson. Most residents reach multiple options on foot within minutes.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Independent bookstores, vintage clothing stores, and specialty food shops give the West End a character larger commercial districts lack. Hidden gems hide on side streets and in heritage buildings throughout.
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
      <MarketPriceLinks slug="west-end" />
    </>
  );
}
