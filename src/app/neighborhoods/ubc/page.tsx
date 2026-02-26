import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "UBC Vancouver Real Estate Guide 2026 | Homes, Condos & Market Data",
  description:
    "The definitive guide to UBC (University Endowment Lands), Vancouver. Explore real estate, campus life, Pacific Spirit Park, schools, transit, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "UBC Vancouver real estate",
    "UBC homes for sale",
    "UBC condos Vancouver",
    "University Endowment Lands real estate",
    "Wesbrook Village homes",
    "UBC neighborhood guide",
    "buy home UBC Vancouver",
    "UBC leasehold homes",
  ],
};

const faqs = [
  {
    question: "Can anyone buy a home at UBC?",
    answer:
      "Yes. While UBC sits on leasehold land administered by the University, homes in Wesbrook Village, Hawthorn Place, and Chancellor Place are available to anyone — you do not need to be affiliated with UBC. Properties are sold on 99-year prepaid leases, which function similarly to freehold ownership for financing and resale purposes. The UBC Properties Trust manages the community and reinvests lease revenue into university housing and campus amenities.",
  },
  {
    question: "How much does a home cost at UBC?",
    answer:
      "UBC offers a range of housing. Condos typically range from $550K to $1.2M, townhomes from $1.3M to $2.0M, and detached homes (limited supply) from $2.5M to $4.5M+. The composite benchmark across all property types is approximately $1.35M. Prices reflect the premium location, proximity to Pacific Spirit Park, and access to UBC's world-class amenities.",
  },
  {
    question: "What is the difference between UBC and the University Endowment Lands?",
    answer:
      "UBC (University of British Columbia) refers to the campus and the residential neighbourhoods developed on university land, such as Wesbrook Village and Hawthorn Place. The University Endowment Lands (UEL) is the adjacent residential area between UBC and the City of Vancouver, governed by Metro Vancouver rather than any municipality. Both areas share Pacific Spirit Regional Park and have a similar west-side lifestyle, but they have different governance structures and property ownership models.",
  },
  {
    question: "What schools are available at UBC?",
    answer:
      "UBC has excellent schooling options. University Hill Elementary (K-7) and University Hill Secondary (8-12) are the public schools, both highly regarded. Norma Rose Point School (K-7) opened in Wesbrook Village to serve the growing community. For post-secondary, UBC itself is one of Canada's top universities, and Langara College is accessible via transit.",
  },
  {
    question: "How do I get to downtown Vancouver from UBC?",
    answer:
      "The most common route is the 99 B-Line express bus, which runs frequently along Broadway and reaches Commercial-Broadway SkyTrain station in about 30 minutes. From there, the Expo Line connects to downtown in 10 minutes. By car, downtown is approximately 20-30 minutes via West 4th Avenue or SW Marine Drive, depending on traffic. The future Broadway Subway extension (under construction) will significantly improve transit times once completed.",
  },
];

const ubcData = NEIGHBOURHOODS["ubc"];

export default async function UBCPage() {
  const pois = await fetchNeighbourhoodPOIs(ubcData.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">UBC</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            UBC, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.35M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">30 min</p>
                  <p className="text-xs text-warm-500 mt-1">To Downtown</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">70,000+</p>
                  <p className="text-xs text-warm-500 mt-1">Daily Campus Population</p>
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
                  ["living", "Living at UBC", "2"],
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
                      ["Oakridge", "oakridge"],
                      ["Marpole", "marpole"],
                      ["South Cambie", "south-cambie"],
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
                  The University of British Columbia sits on the western tip of the Point Grey peninsula, surrounded by ocean on three sides and bordered by the 763-hectare Pacific Spirit Regional Park to the east. It is one of Canada&apos;s top research universities, home to over 70,000 students, faculty, and staff on any given day. But UBC is much more than a campus — it is a fully planned, self-contained community with its own residential neighbourhoods, shops, restaurants, schools, and recreation facilities.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The residential areas at UBC have grown significantly over the past two decades. Wesbrook Village, the largest neighbourhood, is a master-planned community with condominiums, townhomes, a village centre, parks, and an elementary school. Hawthorn Place and Chancellor Place offer additional housing options closer to the academic core. The adjacent University Endowment Lands (UEL) provide a quieter, more established residential setting with single-family homes nestled among the trees.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  What makes UBC truly special is the combination of natural beauty and urban amenity. Residents have the Pacific Ocean at their doorstep, world-class forest trails steps from home, and access to the cultural and athletic facilities of a major university — all while being just 30 minutes from downtown Vancouver. It is a lifestyle that is genuinely hard to replicate anywhere else in the region.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={ubcData.center}
                  zoom={ubcData.zoom}
                  pois={pois.length > 0 ? pois : ubcData.fallbackPOIs}
                  boundaryName="UBC"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living at UBC */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living at UBC
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Life at UBC has a rhythm that is distinct from anywhere else in Metro Vancouver. The community is young, international, and highly educated. You&apos;ll hear a dozen languages on a walk through Wesbrook Village. The energy of a university campus — the lectures, the sporting events, the cultural performances — creates a vibrancy that purely residential neighbourhoods often lack.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  At the same time, the residential pockets of UBC feel remarkably peaceful. Wesbrook Village is designed around green courtyards, pedestrian pathways, and a central village square. The surrounding forest acts as a natural buffer, creating a sense of seclusion that belies the community&apos;s proximity to the city. Families with young children particularly appreciate the safe, walkable streets, the proximity to nature, and the strong sense of community.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Start your morning with a run through Pacific Spirit Park — 73 kilometres of trails winding through old-growth forest, just steps from your front door. Grab a coffee at the Wesbrook Village cafe, then walk the kids to Norma Rose Point School. Hop on the 99 B-Line for a 30-minute ride to your downtown office. After work, catch a Thunderbirds basketball game at the War Memorial Gym, browse the exhibits at the Museum of Anthropology, or take the family to Spanish Banks for a sunset beach walk.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Weekends bring farmers&apos; markets, campus festivals, and lazy afternoons at Wreck Beach or the UBC Botanical Garden. For dining, the village offers a growing selection of restaurants, and the broader campus has cafes and eateries scattered throughout. When you want a bigger night out, Kitsilano and West Broadway are a short drive away.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  UBC Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  UBC&apos;s real estate market is unique in Vancouver. All residential land is held on 99-year prepaid leases from the University, which means buyers are purchasing a leasehold interest rather than freehold. In practice, this has minimal impact on day-to-day ownership, financing, or resale — major banks provide standard mortgages on UBC properties.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$550K - $1.2M", desc: "The most common property type at UBC, concentrated in Wesbrook Village and Hawthorn Place. Modern buildings with excellent amenities, many with views of the mountains or forest. Popular with UBC faculty, students' families, and investors." },
                    { type: "Townhomes", range: "$1.3M - $2.0M", desc: "Multi-level homes in newer developments throughout Wesbrook Village. Well-designed layouts with private outdoor space, typically 1,200-1,800 sq ft. Highly sought after by families and professionals." },
                    { type: "Detached Homes", range: "$2.5M - $4.5M+", desc: "Limited supply in the UEL and select UBC areas. Generous lots surrounded by mature trees with a private, estate-like feel. These properties command a significant premium due to scarcity and the natural setting." },
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
                  The composite benchmark for UBC is approximately $1.35M (-4.2% year-over-year). Demand remains strong from UBC-affiliated buyers and from families attracted to the lifestyle and schools. The leasehold structure keeps prices somewhat lower than comparable freehold properties in neighbouring Kerrisdale or Point Grey, creating value for buyers who understand the model.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    UBC Properties Trust continues to develop new phases in Wesbrook Village, adding both market and rental housing. The upcoming Broadway Subway extension, while not reaching UBC in its current phase, will improve transit connections to the campus and is expected to support long-term property values. The captive demand from the university community provides a reliable floor for prices.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  UBC&apos;s western location means transit and road connections are important considerations for residents:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus (99 B-Line)", detail: "UBC's lifeline to the city, running every 3-5 minutes during peak hours along Broadway to Commercial-Broadway SkyTrain station (30 min). The R4 rapid bus connects along 41st Avenue, and the 44 serves UBC via West 4th Avenue." },
                    { mode: "Future Broadway Subway", detail: "The Millennium Line Broadway Extension is under construction and will bring SkyTrain to Arbutus Street by 2026-2027. While it won't reach UBC immediately, a future extension to the campus is planned and would dramatically improve transit access." },
                    { mode: "Cycling", detail: "UBC is very bike-friendly with dedicated cycling infrastructure on campus and connections to the city via the Seaside Greenway, Point Grey Road bike route, and the Spirit Trail through Pacific Spirit Park. Many residents commute by e-bike." },
                    { mode: "Driving", detail: "Primary routes to downtown are via West 4th Avenue, SW Marine Drive, or NW Marine Drive. Travel time is 20-30 minutes depending on traffic. Most Wesbrook Village homes include parking." },
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
                <p className="text-warm-600 leading-relaxed">
                  Within UBC itself, getting around is easy. The campus is compact and walkable, with frequent shuttle buses connecting residential areas to the academic core. Most daily needs — groceries, restaurants, schools, parks — are within walking distance in Wesbrook Village.
                </p>
              </section>

              {/* Parks */}
              <section id="parks" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Parks
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  UBC&apos;s natural setting is arguably its greatest asset. Few communities in any major city can rival the outdoor amenities available here:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Pacific Spirit Regional Park", desc: "A 763-hectare temperate rainforest with 73 km of trails for hiking, running, cycling, and horseback riding. The park wraps around UBC's eastern boundary and is home to towering Douglas firs, western red cedars, and abundant wildlife. One of the largest urban forests in North America." },
                    { name: "Spanish Banks & Locarno Beach", desc: "Wide, sandy beaches along UBC's northern shore with stunning views of the North Shore mountains. Popular for swimming, beach volleyball, kiteboarding, and picnics. At low tide, the sandy flats extend hundreds of metres — perfect for families." },
                    { name: "Wreck Beach", desc: "Vancouver's famous clothing-optional beach, accessible via a long staircase from Marine Drive. A unique and beloved part of UBC culture with a loyal community of regulars." },
                    { name: "UBC Botanical Garden", desc: "A 30-hectare garden featuring over 8,000 plant species from around the world. The Greenheart TreeWalk, a canopy walkway suspended 20 metres above the forest floor, is a highlight. Open year-round." },
                    { name: "Nitobe Memorial Garden", desc: "One of the most authentic Japanese gardens outside Japan. A serene space for contemplation, featuring a tea garden, koi pond, and meticulously maintained plantings." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  UBC also has extensive athletic facilities open to the community, including the UBC Aquatic Centre, Doug Mitchell Thunderbird Sports Centre, tennis courts, a golf driving range, and numerous playing fields. The university&apos;s recreation programs offer classes and leagues for residents of all ages.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Education is, unsurprisingly, one of UBC&apos;s greatest strengths. Families have access to excellent public schools and one of the world&apos;s top universities right at their doorstep.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Norma Rose Point School", type: "K-7 Public", detail: "Opened in 2016 in the heart of Wesbrook Village. Named after a Musqueam elder and UBC alumna, it features modern facilities and a diverse, internationally-minded student body." },
                      { name: "University Hill Elementary", type: "K-7 Public", detail: "A long-established school serving the UEL and UBC campus community. Known for strong academics and a close-knit community feel. French Immersion program available." },
                      { name: "University Hill Secondary", type: "8-12 Public", detail: "One of the smallest public secondaries in Vancouver, offering a personalized learning environment. Consistently strong academic results and proximity to UBC's resources." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Post-Secondary</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "University of British Columbia", type: "Post-Secondary", detail: "Ranked consistently among the top 40 universities globally, UBC is a comprehensive research university with over 60,000 students. Programs in virtually every discipline, world-class research facilities, and a vibrant campus life." },
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
                  The proximity to a world-class university adds immeasurable value to the community. Families benefit from university events, libraries, cultural programs, and the general academic atmosphere that permeates this west-side neighbourhood.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Wesbrook Village</p>
                  <p className="text-sm text-gold-700">
                    The heart of UBC&apos;s residential community, featuring a Save-On-Foods grocery store, pharmacy, banks, cafes, and a growing roster of restaurants. Designed as a walkable village centre that covers daily needs without leaving the community.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The campus itself adds another layer of options. University Boulevard has cafes, bookstores, and eateries near the Nest (student union building). Seasonal farmers&apos; markets bring local produce, baked goods, and artisanal products to the campus.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For dining, Wesbrook Village offers sushi, Indian, Chinese, and casual Western options. The campus adds Korean, Japanese, Middle Eastern, and more. For a broader selection, Kerrisdale Village (10 min drive), West 10th Avenue in Point Grey, and the Kitsilano strip on West 4th Avenue are all easily accessible.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For major shopping, Oakridge Centre (under redevelopment), Kerrisdale Village, and downtown are all a short drive or bus ride away. The UBC community tends to be self-sufficient for everyday needs, with occasional trips off-campus for specialty items or bigger outings.
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
