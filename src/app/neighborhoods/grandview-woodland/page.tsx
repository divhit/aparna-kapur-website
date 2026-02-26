import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Grandview-Woodland Vancouver Real Estate Guide 2026 | Homes & Market Data",
  description:
    "The definitive guide to Grandview-Woodland, Vancouver. Explore Commercial Drive culture, real estate, schools, parks, transit, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Grandview-Woodland Vancouver real estate",
    "Grandview-Woodland homes for sale",
    "Commercial Drive Vancouver",
    "Grandview-Woodland neighborhood guide",
    "buy home Grandview-Woodland Vancouver",
    "Commercial Drive restaurants",
    "Grandview-Woodland condos",
    "East Vancouver real estate",
  ],
};

const faqs = [
  {
    question: "Is Grandview-Woodland a good neighborhood to buy a home in?",
    answer:
      "Grandview-Woodland is one of Vancouver's most vibrant and culturally rich neighbourhoods. Its walkability, direct SkyTrain access at Commercial-Broadway Station, and the eclectic character of Commercial Drive make it highly desirable for young professionals, families, and creatives. Property values have appreciated steadily as the neighbourhood has matured, and ongoing city planning initiatives continue to enhance livability while preserving the area's distinctive character.",
  },
  {
    question: "How much does a home cost in Grandview-Woodland Vancouver?",
    answer:
      "Grandview-Woodland offers a range of housing options at various price points. The composite benchmark across all property types is approximately $1.1M. Detached character homes typically range from $1.3M to $1.8M, condominiums from $500K to $850K, and townhomes from $900K to $1.3M. Properties closer to Commercial Drive and the SkyTrain station tend to command premium prices due to the exceptional walkability and transit access.",
  },
  {
    question: "What is Commercial Drive like?",
    answer:
      "Commercial Drive, affectionately known as 'The Drive,' is one of Vancouver's most beloved streets. It stretches from Venables Street north to East Hastings and is lined with independent coffee shops, Italian delis, multicultural restaurants, vintage clothing stores, bookshops, and community gathering spots. The street has a strong Italian heritage dating back to the early 20th century, and today it reflects one of the most diverse and inclusive communities in the city. Farmers markets, street festivals like Italian Day, and live music venues keep the neighbourhood lively year-round.",
  },
  {
    question: "How is the transit in Grandview-Woodland?",
    answer:
      "Grandview-Woodland has some of the best transit access in all of Metro Vancouver. Commercial-Broadway Station is the busiest station in the SkyTrain system, serving both the Expo Line and the Millennium Line. This gives residents direct rapid transit access to downtown Vancouver, Burnaby, New Westminster, Surrey, and the entire northeast sector of the region. Numerous bus routes along Commercial Drive, Broadway, and Hastings Street supplement the SkyTrain service, making car-free living highly practical.",
  },
  {
    question: "What are the best parks in Grandview-Woodland?",
    answer:
      "Grandview Park on Commercial Drive is the neighbourhood's social hub, hosting community events and offering a playground and open green space. Woodland Park provides sports fields and a wading pool popular with families. Pandora Park, tucked into the eastern edge of the neighbourhood, offers a quieter retreat with mature trees and a playground. The Commercial-Broadway greenway and nearby urban trails also provide pleasant walking and cycling routes throughout the area.",
  },
];

const neighbourhoodData = NEIGHBOURHOODS["grandview-woodland"];

export default async function GrandviewWoodlandPage() {
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
            <span className="text-teal-200">Grandview-Woodland</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Grandview-Woodland, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.1M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">90</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">2</p>
                  <p className="text-xs text-warm-500 mt-1">SkyTrain Lines</p>
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
                  ["living", "Living in Grandview-Woodland", "2"],
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
                      ["Mount Pleasant", "mount-pleasant"],
                      ["Hastings-Sunrise", "hastings-sunrise"],
                      ["Strathcona", "strathcona"],
                      ["Kensington-Cedar Cottage", "kensington-cedar-cottage"],
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
                  Grandview-Woodland is one of Vancouver&apos;s most eclectic and culturally diverse neighbourhoods, anchored by the legendary Commercial Drive. Located in the city&apos;s east-central core, the neighbourhood stretches from Clark Drive on the west to Nanaimo Street on the east, and from the waterfront south to Broadway. It is a place where Italian nonnas share the sidewalk with artists, young families, and newcomers from every corner of the world.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What makes Grandview-Woodland unique is its grassroots, community-driven character. Unlike Vancouver&apos;s more polished west-side neighbourhoods, this area thrives on its independent spirit. The Drive is lined with locally owned coffee shops, bakeries, vintage stores, and restaurants that reflect the area&apos;s multicultural roots. There are no chain stores dominating the streetscape here, and that is precisely the point.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The neighbourhood also benefits from exceptional transit connectivity, with Commercial-Broadway Station serving as the busiest hub in the entire SkyTrain system. This combination of cultural vibrancy, walkability, and rapid transit access has made Grandview-Woodland increasingly attractive to buyers seeking an authentic urban lifestyle at a more accessible price point than the west side.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={neighbourhoodData.center}
                  zoom={neighbourhoodData.zoom}
                  pois={pois.length > 0 ? pois : neighbourhoodData.fallbackPOIs}
                  boundaryName="Grandview-Woodland"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Grandview-Woodland */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Grandview-Woodland
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Life in Grandview-Woodland revolves around community and connection. The neighbourhood has an unmistakable warmth, the kind of place where baristas know your name, neighbours chat over garden fences, and impromptu sidewalk conversations are a daily occurrence.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock is a mix of early 20th-century character homes on tree-lined residential streets, low-rise walk-up apartments along the main corridors, and newer condominiums that have begun appearing as the neighbourhood evolves. Many of the heritage homes feature classic Vancouver Specials, craftsman bungalows, and Edwardian-era houses, often with generous porches and mature gardens that give the streets a lived-in, welcoming feel.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A typical day might start with a cortado at a favourite Italian cafe on The Drive, followed by a walk through Grandview Park where families, dog walkers, and tai chi practitioners share the green space. Afternoons can be spent browsing the independent bookstores and vintage shops, picking up produce at the farmers market, or catching a live show at the Cultch theatre. In the evenings, the neighbourhood comes alive with diners filling the patios of Ethiopian, Vietnamese, Mexican, and Italian restaurants that line the street.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Italian Day on The Drive, held each June, is one of Vancouver&apos;s largest and most beloved street festivals, drawing tens of thousands of visitors to celebrate the neighbourhood&apos;s deep Italian heritage with food, music, and community spirit.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Grandview-Woodland Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Grandview-Woodland offers a diverse real estate market that balances character and affordability relative to Vancouver&apos;s west side:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.3M - $1.8M", desc: "Primarily early 1900s character homes, Vancouver Specials, and craftsman bungalows. Many sit on standard 33-foot lots along quiet residential streets. Renovation potential is strong for those seeking to update heritage properties." },
                    { type: "Condominiums", range: "$500K - $850K", desc: "A growing inventory of condos in both older walk-up buildings and newer developments near Commercial-Broadway Station. Popular with young professionals and first-time buyers drawn to the lifestyle and transit access." },
                    { type: "Townhomes", range: "$900K - $1.3M", desc: "Newer townhome projects have appeared in the neighbourhood, particularly along the Broadway corridor. These offer a middle ground between detached living and condo convenience." },
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
                  The Broadway Subway extension, currently under construction, will further enhance transit connectivity along the southern edge of the neighbourhood and is expected to positively impact property values in the years ahead.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Grandview-Woodland is positioned for continued appreciation driven by the Broadway Subway project, the neighbourhood&apos;s exceptional walkability, and growing demand from buyers priced out of the west side. The area&apos;s cultural cachet, combined with Commercial-Broadway&apos;s status as the region&apos;s busiest transit hub, makes it one of east Vancouver&apos;s strongest long-term investment prospects.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Grandview-Woodland is one of the best-connected neighbourhoods in Metro Vancouver, with unparalleled rapid transit access and high walkability:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Commercial-Broadway Station is the busiest in the entire SkyTrain system, serving both the Expo Line and the Millennium Line. This provides direct rapid transit access to downtown (10 minutes), Burnaby, New Westminster, Surrey, and the Tri-Cities. The upcoming Broadway Subway extension will add further connectivity." },
                    { mode: "Bus", detail: "Numerous bus routes serve the neighbourhood. The 99 B-Line (soon to be replaced by the Broadway Subway) runs along Broadway, while routes along Commercial Drive, Hastings Street, and Venables provide north-south and east-west connections throughout the city." },
                    { mode: "Cycling", detail: "The neighbourhood is well-suited for cycling with designated bike routes and the Commercial-Broadway greenway. The relatively flat terrain along The Drive makes cycling a practical daily commuting option for many residents." },
                    { mode: "Walking", detail: "With a Walk Score of 90, Grandview-Woodland is one of the most walkable neighbourhoods in Vancouver. Commercial Drive provides virtually all daily needs within a comfortable walking distance, from groceries and dining to services and entertainment." },
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
                  Grandview-Woodland offers a variety of green spaces that serve as gathering points for the community:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Grandview Park", desc: "The social heart of the neighbourhood, located right on Commercial Drive. This well-loved park features a playground, basketball court, open green space, and picnic areas. It hosts community events throughout the year and is a favourite gathering spot for residents of all ages." },
                    { name: "Woodland Park", desc: "A family-friendly park offering sports fields, a wading pool, a playground, and open grassy areas. The adjacent Woodland Park Community Garden provides plots for local gardeners and adds to the neighbourhood's green character." },
                    { name: "Pandora Park", desc: "A quieter neighbourhood park on the eastern edge of Grandview-Woodland, featuring mature trees, a playground, sports courts, and a fieldhouse. It offers a more peaceful retreat from the bustle of Commercial Drive." },
                    { name: "Commercial-Broadway Greenway", desc: "A linear green corridor connecting the neighbourhood to surrounding areas. Ideal for walking and cycling, it provides a pleasant car-free route through the urban landscape." },
                    { name: "Britannia Community Centre Grounds", desc: "The grounds surrounding Britannia include outdoor sports courts, a swimming pool, an ice rink, and open green space. It functions as a community hub with programs for children, seniors, and everyone in between." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  Britannia Community Centre is the neighbourhood&apos;s major recreational facility, offering a swimming pool, ice rink, fitness centre, library branch, and a wide range of programs for all ages. It is truly the community&apos;s living room and plays a central role in daily life in Grandview-Woodland.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Grandview-Woodland serves families with a range of public school options that reflect the neighbourhood&apos;s diverse, community-oriented character. The area&apos;s schools are known for their inclusive environments and strong community engagement.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Britannia Secondary", type: "8-12 Public", detail: "Integrated into the Britannia Community Centre complex, this secondary school offers a unique learning environment with access to community centre facilities including a pool, rink, and library. Known for its diverse student body and strong community programs." },
                      { name: "Grandview Elementary", type: "K-7 Public", detail: "A neighbourhood elementary school with a welcoming, multicultural community. The school emphasizes inclusive education and benefits from strong parent involvement." },
                      { name: "L'Ecole Bilingue", type: "K-7 Public (French Immersion)", detail: "Located nearby, this popular French immersion elementary school draws families from across the east side who value bilingual education in a diverse community setting." },
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
                  The integration of Britannia Secondary with the Britannia Community Centre is a distinctive feature of education in Grandview-Woodland. Students have access to resources including a public library, swimming pool, and ice rink as part of their school experience, creating a truly community-embedded educational environment.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Commercial Drive - &quot;The Drive&quot;</p>
                  <p className="text-sm text-gold-700">
                    Vancouver&apos;s most eclectic commercial street, stretching from Venables to East Hastings. Over 200 independent shops, restaurants, and cafes create one of the city&apos;s most vibrant and culturally diverse streetscapes. No chain stores, just authentic local character.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Commercial Drive is the undisputed soul of Grandview-Woodland. The street&apos;s deep Italian roots are still evident in the espresso bars, gelaterias, and delis that have served the community for generations. But The Drive has evolved into something far more diverse, with Ethiopian, Vietnamese, Mexican, Salvadoran, and Indian restaurants sitting alongside the Italian classics.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For coffee culture, The Drive is arguably unmatched in Vancouver. Independent roasters and cafes line the street, each with its own devoted following. Bump N Grind, JJ Bean, Prado, and Turks are just a few of the neighbourhood institutions that keep the caffeine flowing.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Shopping on The Drive is distinctly independent. Vintage clothing stores, record shops, bookstores, art supply shops, and quirky gift boutiques give the street its signature personality. You will not find big-box retail here, and that is exactly what residents love about it.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For groceries, residents have access to several options including a large supermarket at Commercial-Broadway, specialty Italian and Asian grocery stores along The Drive, and the popular Trout Lake Farmers Market nearby during the summer and fall months.
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
