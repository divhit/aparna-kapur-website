import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Sunset Vancouver Real Estate Guide 2026 | Homes & Market Data",
  description:
    "The definitive guide to Sunset, Vancouver. Explore multicultural real estate, the historic Punjabi Market, quiet residential streets, parks, schools, and diverse dining. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Sunset Vancouver real estate",
    "Sunset homes for sale",
    "Punjabi Market Vancouver",
    "Sunset neighborhood guide",
    "buy home Sunset Vancouver",
    "south Vancouver real estate",
    "Sunset schools Vancouver",
    "Main Street south Vancouver",
  ],
};

const faqs = [
  {
    question: "Is Sunset a good neighborhood to buy a home in?",
    answer:
      "Sunset is an excellent choice for buyers seeking detached homes at prices that are more accessible than most other Vancouver neighborhoods. The area offers quiet, tree-lined residential streets, a genuinely multicultural community, and the historic Punjabi Market on Main Street. For families who value space, cultural diversity, and a sense of established community, Sunset provides strong value with good long-term appreciation potential as south Vancouver continues to develop.",
  },
  {
    question: "How much does a home cost in Sunset Vancouver?",
    answer:
      "Sunset offers some of Vancouver's most accessible pricing for detached homes. The composite benchmark price across all property types is approximately $1.3M. Detached homes, which make up a significant portion of the housing stock, typically range from $1.4M to $1.9M. Condominiums are less common but can be found from $450K to $650K. Some homeowners have added laneway houses, which contribute to the neighborhood's evolving housing mix.",
  },
  {
    question: "What is the Punjabi Market?",
    answer:
      "The Punjabi Market is a historic South Asian commercial district located on Main Street between 48th and 51st Avenues. Established in the 1970s, it was one of the first South Asian shopping districts in North America. While it has evolved over the decades, it remains an important cultural landmark with South Asian clothing stores, jewelry shops, sweet shops, and restaurants. The community has been working on revitalization plans to strengthen the market's identity and draw.",
  },
  {
    question: "What schools are in Sunset?",
    answer:
      "Sunset is home to Sir Winston Churchill Secondary, one of Vancouver's well-regarded public high schools known for strong academics and athletics. Elementary schools include Moberly Elementary, Sexsmith Elementary, and others serving different parts of the neighborhood. The area's family-oriented character means schools benefit from active parent involvement and community support.",
  },
  {
    question: "How do I get around from Sunset?",
    answer:
      "Sunset is served by several major bus routes, including routes along Main Street, Fraser Street, and 49th Avenue. The Langara-49th Avenue Canada Line Station is accessible from the western edge of the neighborhood, providing rapid transit to downtown (approximately 20 minutes) and YVR airport. Driving access is convenient via Main Street, Fraser Street, Knight Street, and 49th Avenue. The neighborhood's central south Vancouver location makes it easy to reach other parts of the city.",
  },
];

const sunsetData = NEIGHBOURHOODS["sunset"];

export default async function SunsetPage() {
  const pois = await fetchNeighbourhoodPOIs(sunsetData.center);

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
            <span className="text-teal-200">Sunset</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Sunset, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.3M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">Punjabi</p>
                  <p className="text-xs text-warm-500 mt-1">Market on Main</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">75</p>
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
                  ["living", "Living in Sunset", "2"],
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
                      ["Marpole", "marpole"],
                      ["Victoria-Fraserview", "victoria-fraserview"],
                      ["Riley Park", "riley-park"],
                      ["Oakridge", "oakridge"],
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
                  Sunset is a large, predominantly residential neighborhood in south Vancouver, bounded roughly by 41st Avenue to the north, the Fraser River to the south, Knight Street to the east, and Main Street to the west. It is one of Vancouver&apos;s most quietly multicultural communities, where South Asian, Chinese, Vietnamese, and Filipino families have established deep roots over multiple generations, creating a neighborhood character that is warm, diverse, and unpretentious.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighborhood is perhaps best known as the home of the Punjabi Market, the historic South Asian commercial district on Main Street near 49th Avenue. While smaller than in its heyday, the Punjabi Market remains an important cultural landmark and a symbol of the South Asian community&apos;s enduring presence in Vancouver. The surrounding blocks reflect this heritage, with Sikh gurdwaras, Hindu temples, and South Asian businesses woven into the fabric of the community.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Sunset&apos;s appeal lies in its authenticity. This is not a neighborhood of trendy boutiques or craft cocktail bars. It is a place where families have lived for decades, where children play on wide residential streets, where the local restaurants serve honest, home-style food from a dozen different cultures, and where the cost of living, while not inexpensive by national standards, remains more manageable than most of Vancouver.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={sunsetData.center}
                  zoom={sunsetData.zoom}
                  pois={pois.length > 0 ? pois : sunsetData.fallbackPOIs}
                  boundaryName="Sunset"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Sunset */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Sunset
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Sunset is defined by its quiet, residential character. The streets are wide, the lots are generous, and the pace of life is slower than in Vancouver&apos;s denser urban neighborhoods. Mature trees line many of the residential blocks, and well-tended gardens give the area a settled, established feel.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock is predominantly detached homes, many dating from the 1950s through 1970s. A growing number have been renovated or rebuilt, and laneway houses are becoming increasingly common as homeowners take advantage of the city&apos;s laneway housing program. This evolution is bringing new families and fresh investment to the neighborhood while maintaining its residential character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A day in Sunset might begin with a walk through the quiet tree-lined streets to the local bakery for fresh naan or Chinese pastries. Children head to Churchill Secondary or one of the local elementary schools. Lunch might be a quick stop at one of the family-run restaurants along Main or Fraser Street for South Asian thali, Vietnamese com tam, or Chinese noodles. Afternoons are spent at Sunset Community Centre or one of the local parks. Weekends might include shopping along the Punjabi Market, visiting one of the neighborhood&apos;s places of worship, or a family barbecue in the generous backyard.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Sunset is a neighborhood where community bonds run deep, where neighbors share food across fences and look after each other&apos;s children. It is a place where cultural traditions are alive and where families can find the space and stability to build a life.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Sunset Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Sunset is one of the best neighborhoods in Vancouver for buyers seeking detached homes with space and character at relatively accessible prices:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.4M - $1.9M", desc: "The dominant housing type in Sunset. Most are post-war homes from the 1950s-1970s on standard 33-foot or wider lots. Many have been updated or rebuilt. The generous lot sizes make Sunset attractive for families and for adding laneway houses for rental income or multigenerational living." },
                    { type: "Condominiums", range: "$450K - $650K", desc: "Less common in Sunset than in denser neighborhoods, but some newer low-rise and mid-rise developments can be found along the major corridors. These offer an affordable entry point for first-time buyers." },
                    { type: "Laneway Houses", range: "Rental Income: $1,800 - $2,500/mo", desc: "Sunset has been one of Vancouver's most active neighborhoods for laneway house construction. Many homeowners have built laneway homes to supplement mortgage costs or house extended family, adding a modern dimension to the neighborhood's housing stock." },
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
                  Sunset&apos;s real estate market is driven by families seeking space and value, as well as investors who recognize the long-term potential of south Vancouver&apos;s ongoing development and improving infrastructure.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Sunset offers strong long-term value in the Vancouver market. The neighborhood benefits from large lot sizes suitable for laneway houses, proximity to the Langara-49th Canada Line station, ongoing investment in south Vancouver infrastructure, and prices that remain below the city average for detached homes. As Vancouver continues to densify and south Vancouver&apos;s amenities improve, Sunset is well-positioned for steady appreciation.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Sunset is served by several major transit routes and benefits from its central south Vancouver location:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "The Langara-49th Avenue Canada Line station is accessible from the western edge of the neighborhood, providing rapid transit to downtown Vancouver (approximately 20 minutes) and YVR airport (approximately 15 minutes). The station is a short bus ride or cycle from most parts of Sunset." },
                    { mode: "Bus", detail: "Major bus routes serve the neighborhood on Main Street (3 bus), Fraser Street (8 bus), Knight Street (22 bus), and 49th Avenue (49 bus). These routes provide connections to SkyTrain stations, downtown, UBC, and surrounding neighborhoods." },
                    { mode: "Driving", detail: "Main Street, Fraser Street, and Knight Street provide efficient north-south routes, while 41st Avenue and 49th Avenue serve east-west travel. The Knight Street Bridge connects directly to Richmond and Highway 99 for access to YVR airport and the US border." },
                    { mode: "Cycling", detail: "The Ontario Street and Windsor Street cycling corridors pass through or near the neighborhood. The relatively flat terrain of south Vancouver makes cycling practical for daily commuting, and the Midtown Way greenway project continues to improve cycling infrastructure in the area." },
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
                  Sunset offers several parks and green spaces that serve the neighborhood&apos;s family-oriented community:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Sunset Park", desc: "The neighborhood's namesake park, located near the Sunset Community Centre. Features playgrounds, sports fields, tennis courts, and open green space. It serves as the primary recreational hub for the community, hosting programs and events throughout the year." },
                    { name: "Memorial South Park", desc: "A well-maintained park offering sports fields, a playground, and open space. Popular with families for picnics and informal recreation, it provides a peaceful green retreat in the heart of the residential area." },
                    { name: "Moberly Park", desc: "Home to the Moberly Arts and Cultural Centre, this park combines green space with cultural programming. The arts centre offers exhibitions, workshops, and performances that add a creative dimension to the neighborhood's community life." },
                    { name: "Ross Park", desc: "A smaller neighborhood park with a playground, sports courts, and open green space. Located in the eastern part of Sunset, it serves nearby families with a convenient local recreation option." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Sunset Community Centre is the neighborhood&apos;s recreational anchor, offering fitness facilities, a gymnasium, programming for all ages, and community gathering space. The Moberly Arts and Cultural Centre adds a unique creative dimension, with art exhibitions, workshops, and performances that enrich the neighborhood&apos;s cultural life beyond the typical community centre model.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Sunset is served by established public schools that reflect the neighborhood&apos;s strong family orientation and cultural diversity. Schools here provide supportive learning environments with active community involvement.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Sir Winston Churchill Secondary", type: "8-12 Public", detail: "One of Vancouver's most well-known secondary schools, Churchill offers strong academic programs, competitive athletics (particularly its basketball program), and a diverse student body. The school's IB (International Baccalaureate) pathway attracts academically ambitious students from across the city." },
                      { name: "Moberly Elementary", type: "K-7 Public", detail: "A welcoming elementary school near Moberly Park with a strong sense of community. Known for its arts integration and multicultural student body." },
                      { name: "Sexsmith Elementary", type: "K-7 Public", detail: "Located in the northern part of Sunset, Sexsmith offers a supportive learning environment with strong programs in literacy and numeracy." },
                      { name: "Sir Sandford Fleming Elementary", type: "K-7 Public", detail: "Serving the southern part of the neighborhood, Fleming provides quality elementary education with an active parent advisory council." },
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
                  Sir Winston Churchill Secondary is a notable draw for the neighborhood, with its International Baccalaureate program, strong athletics, and diverse student body making it one of Vancouver&apos;s most sought-after public secondary schools. Families specifically choose to live in Sunset to be within Churchill&apos;s catchment area.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Punjabi Market</p>
                  <p className="text-sm text-gold-700">
                    The historic Punjabi Market on Main Street (48th to 51st Avenue) is one of North America&apos;s first South Asian commercial districts. It remains a cultural anchor for the community, with South Asian clothing stores, sweet shops, jewelers, and restaurants that draw visitors from across the Lower Mainland.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Sunset&apos;s food scene reflects the extraordinary cultural diversity of its residents. Along Main Street and Fraser Street, you will find an impressive concentration of South Asian restaurants serving everything from Punjabi dhabas-style cooking to refined North Indian cuisine. South Asian sweet shops offer fresh jalebis, gulab jamun, and mithai that rival anything you would find in Delhi or Amritsar.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Beyond the South Asian offerings, Sunset&apos;s dining landscape extends to excellent Chinese restaurants, Vietnamese pho houses, Filipino eateries, and other international cuisines. The common thread is authenticity and value. Restaurants here cater to local families who know their food, and the result is cooking of remarkable quality at accessible prices.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For grocery shopping, the neighborhood is well-served by both mainstream supermarkets and specialty stores. South Asian grocery stores stock fresh spices, lentils, and ingredients for home cooking, while Asian supermarkets provide a wide range of Pacific Rim products.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  While Sunset is not a destination shopping neighborhood, it provides everything residents need for daily life, and its food scene is genuinely one of Vancouver&apos;s hidden treasures for those willing to explore beyond the better-known dining districts.
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
