import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Kensington-Cedar Cottage Vancouver Real Estate Guide 2026 | Homes & Market Data",
  description:
    "The definitive guide to Kensington-Cedar Cottage, Vancouver. Explore Trout Lake, Kingsway dining, real estate, schools, parks, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Kensington-Cedar Cottage Vancouver real estate",
    "Kensington-Cedar Cottage homes for sale",
    "Trout Lake Vancouver neighbourhood",
    "Kensington-Cedar Cottage neighborhood guide",
    "buy home Kensington-Cedar Cottage Vancouver",
    "Kingsway Vancouver restaurants",
    "Cedar Cottage real estate",
    "East Vancouver family homes",
  ],
};

const faqs = [
  {
    question: "Is Kensington-Cedar Cottage a good neighborhood to buy a home in?",
    answer:
      "Kensington-Cedar Cottage is one of Vancouver's largest and most diverse neighbourhoods, and it offers excellent value for families seeking a genuine community-oriented lifestyle. The presence of Trout Lake (John Hendry Park), the growing restaurant scene along Kingsway, and access to SkyTrain at Joyce-Collingwood make it a practical and livable choice. Property values have appreciated steadily as the neighbourhood has attracted investment and new residents, while retaining the multicultural, unpretentious character that defines east Vancouver living.",
  },
  {
    question: "How much does a home cost in Kensington-Cedar Cottage?",
    answer:
      "Kensington-Cedar Cottage offers good value relative to Vancouver's market. The composite benchmark across all property types is approximately $1.15M. Detached homes typically range from $1.2M to $1.6M, offering more space and lot size than comparable west-side properties. Condominiums range from $450K to $700K, and townhomes from $800K to $1.2M. Properties near Trout Lake and along the Kingsway corridor tend to command slightly higher prices due to amenity proximity.",
  },
  {
    question: "What is Trout Lake like?",
    answer:
      "Trout Lake, officially part of John Hendry Park, is the neighbourhood's crown jewel and one of east Vancouver's most beloved green spaces. The lake itself is a natural freshwater lake with a small sandy beach area that is extremely popular in summer. The surrounding park includes sports fields, a community centre, playgrounds, tennis courts, and walking paths. The Trout Lake Farmers Market, held on Saturday mornings from May through October, is one of the city's best-attended farmers markets and a major community gathering event.",
  },
  {
    question: "How is the transit in Kensington-Cedar Cottage?",
    answer:
      "Kensington-Cedar Cottage is served by Joyce-Collingwood SkyTrain Station on the Expo Line, located at the neighbourhood's eastern edge. This provides rapid transit access to downtown Vancouver (approximately 20 minutes), Burnaby, New Westminster, and Surrey. Major bus routes run along Kingsway and Knight Street, providing frequent north-south and east-west connections. The combination of SkyTrain and bus service makes most of the city accessible without a car, though many residents do drive given the neighbourhood's size.",
  },
  {
    question: "What makes Kingsway special in this neighbourhood?",
    answer:
      "Kingsway is one of Vancouver's longest and most diverse commercial streets, cutting diagonally through Kensington-Cedar Cottage. In this section, it has evolved into one of the city's most exciting dining corridors, with an incredible range of Vietnamese, Chinese, Filipino, Indian, Korean, and other international restaurants. The street's affordability relative to other Vancouver commercial areas has also attracted a wave of new independent eateries, cafes, and small businesses that are adding to its vibrancy. For food lovers, the Kingsway stretch through Kensington-Cedar Cottage is essential exploring.",
  },
];

const neighbourhoodData = NEIGHBOURHOODS["kensington-cedar-cottage"];

export default async function KensingtonCedarCottagePage() {
  const pois = await fetchNeighbourhoodPOIs(neighbourhoodData.center);

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
            <span className="text-teal-200">Kensington-Cedar Cottage</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Kensington-Cedar Cottage, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.15M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">Trout Lake</p>
                  <p className="text-xs text-warm-500 mt-1">John Hendry Park</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">80</p>
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
                  ["living", "Living in KCC", "2"],
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
                      ["Mount Pleasant", "mount-pleasant"],
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
                  Kensington-Cedar Cottage, often referred to as KCC, is one of Vancouver&apos;s largest residential neighbourhoods by area and population. Located in the city&apos;s east-central core, it stretches from Clark Drive to Knight Street and from East 16th Avenue south to East 41st Avenue. The neighbourhood is defined by its remarkable cultural diversity, the beloved Trout Lake, and the vibrant Kingsway corridor that cuts diagonally through its heart.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  KCC is really two historic communities that have grown together: the Kensington area to the north, centered around Kensington Park, and Cedar Cottage to the south, which takes its name from a 19th-century cedar lodge that once stood in the area. Today, the combined neighbourhood is home to one of Vancouver&apos;s most diverse populations, with strong Chinese, Vietnamese, Filipino, South Asian, and Latin American communities that have shaped the area&apos;s character, cuisine, and commercial life.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For homebuyers, KCC offers a compelling blend of affordability, green space, cultural richness, and increasingly sophisticated dining and retail options. It is a neighbourhood that rewards those who look beyond the surface, with hidden-gem restaurants, welcoming community parks, and a genuine sense of belonging that is difficult to find in more transient parts of the city.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={neighbourhoodData.center}
                  zoom={neighbourhoodData.zoom}
                  pois={pois.length > 0 ? pois : neighbourhoodData.fallbackPOIs}
                  boundaryName="Kensington-Cedar Cottage"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in KCC */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Kensington-Cedar Cottage
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Life in Kensington-Cedar Cottage is grounded, multicultural, and community-oriented. The residential streets are lined with a mix of character homes, Vancouver Specials, and newer infill housing, many with the well-tended gardens and fruit trees that are a signature of east Vancouver living. The neighbourhood has a comfortable, lived-in feel that appeals to families seeking a genuine community rather than a curated lifestyle.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Trout Lake is the heart of the neighbourhood. On warm days, the lake&apos;s small beach is packed with families, and the surrounding park buzzes with softball games, yoga classes, and picnicking groups. The Saturday Trout Lake Farmers Market, running from May through October, is one of the city&apos;s most popular, drawing visitors from across Vancouver with its local produce, artisan goods, and community atmosphere.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A typical day in KCC might start with dim sum at one of the excellent Chinese restaurants on Kingsway, followed by a morning at Trout Lake watching the kids play at the playground. An afternoon might include browsing the small independent shops along Kingsway or visiting the Kensington Community Centre for a swim. In the evening, the Kingsway restaurant corridor offers an extraordinary range of dining options, from Vietnamese pho and Indian curries to Korean barbecue and modern fusion, often at prices far below what you would pay in trendier neighbourhoods.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The neighbourhood&apos;s diversity is its greatest asset. Block parties, community garden plots, multicultural festivals, and the daily interactions of families from dozens of different backgrounds create a rich social fabric that makes KCC one of the most genuinely inclusive places to live in Vancouver.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Kensington-Cedar Cottage Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kensington-Cedar Cottage offers solid value in Vancouver&apos;s real estate market, with a range of housing types that accommodate different budgets and lifestyles:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.2M - $1.6M", desc: "A mix of character homes, Vancouver Specials, and newer builds across the neighbourhood's large footprint. Many properties offer generous lot sizes with room for laneway houses or garden suites, which have become increasingly popular for rental income or multigenerational living." },
                    { type: "Condominiums", range: "$450K - $700K", desc: "Condo inventory is growing, particularly along Kingsway and near the Joyce-Collingwood SkyTrain station. Newer developments offer modern finishes and layouts, while older buildings provide more affordable entry points for first-time buyers." },
                    { type: "Townhomes", range: "$800K - $1.2M", desc: "Townhome developments along Kingsway and in pockets throughout the neighbourhood offer family-sized layouts at more accessible prices than detached homes. These have become popular with young families seeking their first ground-level home." },
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
                  The neighbourhood&apos;s large geographic area means there is meaningful variation in pricing and character from block to block. Properties near Trout Lake and in the northern Kensington area tend to command premiums, while the southern Cedar Cottage sections offer slightly more affordability.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Kensington-Cedar Cottage benefits from several growth drivers: the ongoing revitalization of Kingsway as a dining and commercial destination, proximity to the Joyce-Collingwood SkyTrain station, and the City of Vancouver&apos;s densification plans for the Kingsway corridor. The neighbourhood&apos;s affordability relative to central Vancouver, combined with its strong community character and improving amenities, positions it well for long-term appreciation.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Kensington-Cedar Cottage is a large neighbourhood with practical transit connections and good access to major roads:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Joyce-Collingwood Station on the Expo Line serves the neighbourhood's eastern edge, providing rapid transit access to downtown Vancouver (approximately 20 minutes), Metrotown, New Westminster, and Surrey. The station area is seeing significant transit-oriented development." },
                    { mode: "Bus", detail: "Kingsway is a major bus corridor with frequent service connecting Kensington-Cedar Cottage to downtown, Metrotown, and the eastern suburbs. Knight Street buses provide north-south connections, while routes along King Edward Avenue offer east-west access across the city." },
                    { mode: "Cycling", detail: "The neighbourhood has designated cycling routes, and the Ontario Street Bikeway provides a pleasant north-south cycling corridor. The relatively flat terrain in the northern sections makes cycling practical, though the southern areas have more hills." },
                    { mode: "Driving", detail: "Knight Street is a major north-south arterial providing access to the Knight Street Bridge and Richmond/airport. Kingsway connects diagonally to downtown and Burnaby. The neighbourhood's central location provides good access to most parts of the city by car." },
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
                  Kensington-Cedar Cottage is blessed with excellent green space, anchored by the iconic Trout Lake:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Trout Lake / John Hendry Park", desc: "The neighbourhood's crown jewel. This large park centers around a natural freshwater lake with a small beach, surrounded by sports fields, playgrounds, tennis courts, a community centre, and walking paths. The Trout Lake Farmers Market on Saturday mornings is one of the city's most popular. It is the social heart of east-central Vancouver." },
                    { name: "Kensington Park", desc: "A well-equipped community park featuring a community centre, arena, outdoor pool, sports fields, and playgrounds. The Kensington Community Centre hosts programs for all ages and serves as a major gathering point for the northern half of the neighbourhood." },
                    { name: "Cedar Cottage Park", desc: "A neighbourhood park in the southern section with a playground, open green space, and a wading pool. A quiet retreat that serves the immediate Cedar Cottage community." },
                    { name: "Slocan Park", desc: "A linear park running along Slocan Street, providing a green corridor with playgrounds, a wading pool, and community gardens. Popular with families for after-school play and weekend outings." },
                    { name: "Clark Park", desc: "Located on the neighbourhood's western edge, this park features sports fields, a playground, and a vibrant community garden. It hosts the Clark Park Farmers Market and community events throughout the year." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Trout Lake Community Centre is a hub for the neighbourhood, offering swimming, fitness programs, arts classes, and community events. The adjacent ice rink at Kensington is popular with families, and the summer outdoor pools at Kensington Park provide welcome relief on warm days.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Given its size, Kensington-Cedar Cottage is served by numerous public schools. The schools reflect the neighbourhood&apos;s multicultural character and offer diverse, inclusive learning environments for families.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Kensington Community School", type: "K-7 Public", detail: "A community-based elementary school located adjacent to Kensington Park. Known for its strong community connections and diverse student body, with active after-school programs and parent engagement." },
                      { name: "Windermere Secondary", type: "8-12 Public", detail: "The neighbourhood's main secondary school, offering comprehensive academic, athletic, and arts programming. Windermere has a diverse student population and is known for its welcoming, inclusive environment." },
                      { name: "Sir Sandford Fleming Elementary", type: "K-7 Public", detail: "A well-regarded neighbourhood elementary school in the Cedar Cottage area, offering strong academics and a warm community atmosphere. The school benefits from a diverse student body and active parent involvement." },
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
                  The neighbourhood&apos;s schools are notable for their multicultural student populations, which provide children with a naturally diverse social environment. Many schools in the area offer strong ELL (English Language Learning) and multilingual support programs, reflecting the community&apos;s international character.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Kingsway Dining Corridor</p>
                  <p className="text-sm text-gold-700">
                    The Kingsway stretch through Kensington-Cedar Cottage has become one of Vancouver&apos;s most exciting and diverse dining corridors. From Vietnamese pho to Korean barbecue, Indian curries to Chinese dim sum, the variety and quality of food here rivals any food district in the city, often at significantly lower prices.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kingsway is the culinary backbone of Kensington-Cedar Cottage. The diagonal street brings together cuisines from across Asia, Latin America, and beyond in a concentration that is unmatched in Vancouver. Longtime favourites sit alongside newer openings, creating a constantly evolving food scene that rewards exploration.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Vietnamese restaurants are particularly well-represented, with pho shops and banh mi bakeries that attract diners from across the city. Chinese restaurants range from Cantonese dim sum palaces to Sichuan hot pot establishments. Indian, Filipino, Korean, and Japanese options round out a dining corridor that could keep food enthusiasts exploring for months.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For groceries, the neighbourhood is exceptionally well-served by large Asian supermarkets, produce markets, and specialty stores. These provide access to ingredients from around the world at competitive prices, making KCC a paradise for home cooks who enjoy international cuisine.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The Trout Lake Farmers Market, held on Saturdays from May through October, is one of Vancouver&apos;s premier farmers markets, featuring local organic produce, artisan bread, preserves, flowers, and prepared foods. It has become a weekly ritual for many KCC residents and a major draw for visitors from across the city.
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
