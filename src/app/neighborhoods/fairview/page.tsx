import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Fairview Vancouver Real Estate Guide 2026 | Broadway Corridor & Market Data",
  description:
    "The definitive guide to Fairview, Vancouver. Explore real estate, the Broadway Plan corridor, South Granville shopping, Granville Island, transit, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Fairview Vancouver real estate",
    "Fairview Vancouver condos for sale",
    "Broadway Plan Vancouver",
    "South Granville Vancouver",
    "Fairview neighborhood guide",
    "buy condo Fairview Vancouver",
    "Cambie Village Fairview",
    "Granville Island Vancouver",
  ],
};

const faqs = [
  {
    question: "Is Fairview a good neighbourhood to buy in?",
    answer:
      "Fairview is one of Vancouver's most strategically positioned neighbourhoods for both lifestyle and investment. Its central location between Downtown, Kitsilano, and Mount Pleasant, combined with the transformative Broadway Plan and the upcoming Broadway Subway extension, make it a compelling choice for buyers. The neighbourhood offers excellent walkability, top-tier transit, proximity to Vancouver General Hospital and the Broadway tech corridor, and the cultural richness of nearby Granville Island. Property values are supported by strong fundamentals: limited land supply, growing employment density, and significant infrastructure investment.",
  },
  {
    question: "How much does a home cost in Fairview Vancouver?",
    answer:
      "Fairview offers a range of housing options, though condominiums dominate the market. The composite benchmark price across all property types is approximately $900K. One-bedroom condos typically range from $550K to $750K, while two-bedroom units range from $800K to $1.2M. Townhomes, which are increasingly available through new Broadway Plan developments, range from $1.1M to $1.8M. Heritage conversions and larger units in established buildings can command higher prices depending on location and finishing.",
  },
  {
    question: "What is the Broadway Plan and how does it affect Fairview?",
    answer:
      "The Broadway Plan is the City of Vancouver's comprehensive development framework for the Broadway corridor from Clark Drive to Vine Street. Approved in 2022, it allows for significant densification including new residential towers, commercial space, and community amenities along the Broadway Subway alignment. For Fairview, this means thousands of new homes, improved public spaces, and enhanced community infrastructure over the next 20-30 years. The plan is expected to transform the neighbourhood while creating new housing supply, and it presents both opportunities for buyers seeking new construction and considerations regarding construction activity during the build-out period.",
  },
  {
    question: "What is transit like in Fairview?",
    answer:
      "Fairview has excellent transit connectivity that is set to improve dramatically. The Broadway-City Hall Canada Line station provides rapid transit access to Downtown (8 minutes), YVR Airport (20 minutes), and Richmond. The Broadway Subway (Millennium Line extension) will add new stations along Broadway, further connecting Fairview to Commercial-Broadway, the VCC-Clark area, and points east. Bus routes along Broadway, Cambie, Granville, and Oak Streets provide comprehensive local coverage. The neighbourhood's central location and flat terrain also make cycling and walking practical for most errands.",
  },
  {
    question: "What makes Fairview different from nearby neighbourhoods?",
    answer:
      "Fairview occupies a unique middle ground among Vancouver's central neighbourhoods. It is more residential and quieter than Downtown, more urban and transit-connected than Kitsilano, and more established than the rapidly changing Mount Pleasant. The South Granville shopping district adds an upscale retail character, while proximity to Granville Island and False Creek provides waterfront access. City Hall and the Cambie Village area give it a civic centre feel. Fairview is the neighbourhood for buyers who want to be centrally located without the full intensity of Downtown living.",
  },
];

const fairviewData = NEIGHBOURHOODS["fairview"];

export default async function FairviewPage() {
  const pois = await fetchNeighbourhoodPOIs(fairviewData.center);

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
            <span className="text-teal-200">Fairview</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Fairview, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$900K</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">95</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">Broadway</p>
                  <p className="text-xs text-warm-500 mt-1">Subway Coming</p>
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
                  ["living", "Living in Fairview", "2"],
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
                      ["Kitsilano", "kitsilano"],
                      ["South Cambie", "south-cambie"],
                      ["Downtown", "downtown"],
                      ["Riley Park", "riley-park"],
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
                  Fairview is a central Vancouver neighbourhood that stretches from Cambie Street in the east to Burrard Street in the west, bounded by False Creek to the north and roughly 16th Avenue to the south. It is home to Vancouver City Hall, the South Granville shopping district, and sits adjacent to Granville Island, one of the city&apos;s most beloved cultural destinations. Fairview is defined by its central location, strong transit connections, and a distinctive mix of residential calm and urban convenience.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood is at the centre of Vancouver&apos;s most ambitious urban transformation. The Broadway Plan, approved in 2022, is reshaping the Broadway corridor with new housing, commercial space, and community amenities. The Broadway Subway extension of the Millennium Line will bring rapid transit directly through the heart of Fairview, further enhancing its connectivity and desirability. This combination of established livability and forward-looking infrastructure investment makes Fairview one of the most compelling neighbourhoods in the city for buyers and investors alike.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Fairview&apos;s character is shaped by its diversity of experiences. The South Granville Rise offers art galleries, boutique shopping, and upscale dining. The Cambie Village area around City Hall has a more neighbourhood-focused feel with local cafes, grocers, and community spaces. The northern edge along False Creek provides waterfront living with seawall access and views across to Downtown. This variety within a compact area is what makes Fairview special.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={fairviewData.center}
                  zoom={fairviewData.zoom}
                  pois={pois.length > 0 ? pois : fairviewData.fallbackPOIs}
                  boundaryName="Fairview"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Fairview */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Fairview
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Fairview offers a lifestyle that balances urban convenience with residential comfort. Mornings might begin with a walk along the False Creek seawall, past the houseboats and into Granville Island for fresh pastries from the public market. A quick hop on the Canada Line gets you to Downtown in eight minutes, or you can cycle along the seawall in fifteen.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighbourhood has a mature, established feel with tree-lined residential streets south of Broadway contrasting with the more urban character along the corridor itself. Vancouver General Hospital and the Broadway tech corridor are major employers in the area, giving Fairview a strong weekday energy that complements its residential character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Weekends in Fairview revolve around the neighbourhood&apos;s exceptional amenities. Browse the galleries on South Granville, explore Granville Island&apos;s artisan shops and theatre scene, or walk the seawall to Science World. The Cambie Village area offers farmers&apos; markets, local cafes, and a genuine community feel. For outdoor recreation, the False Creek waterfront, Vanier Park, and Kitsilano Beach are all within easy reach.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Fairview is ideal for professionals, couples, and small families who want a central location with excellent transit without the full intensity of Downtown living. It is also increasingly popular with investors who recognize the transformative impact of the Broadway Plan and Subway extension.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Fairview Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Fairview&apos;s real estate market is evolving rapidly under the Broadway Plan, with a growing mix of established condominiums and new development:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$550K - $1.2M", desc: "The dominant property type in Fairview. Established buildings along Cambie, Oak, and Granville Streets offer solid value, while new pre-sale developments along the Broadway corridor command premium prices. Benchmark price is approximately $900K for a two-bedroom unit." },
                    { type: "Townhomes", range: "$1.1M - $1.8M", desc: "New townhome developments are emerging through the Broadway Plan, offering family-sized living in a transit-oriented setting. These are in high demand given the neighbourhood's walkability and transit access." },
                    { type: "Heritage & Character Homes", range: "$1.5M - $3M+", desc: "South of Broadway, some heritage homes and duplexes remain on quieter residential streets. These properties are increasingly rare as densification progresses, and they command strong prices for their character, lot size, and location." },
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
                  The Broadway Plan is expected to add thousands of new homes to Fairview over the next two to three decades, creating both opportunity and change. Buyers should consider both the long-term appreciation potential and the near-term construction activity associated with this level of development.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Fairview is one of Vancouver&apos;s strongest investment stories. The convergence of the Broadway Subway, the Broadway Plan, proximity to the growing tech and healthcare employment corridor, and the neighbourhood&apos;s inherent central location create a compelling case for long-term appreciation. Properties near the new subway stations are particularly well-positioned.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Fairview&apos;s central location and transit infrastructure make it one of Vancouver&apos;s best-connected neighbourhoods:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "The Broadway-City Hall Canada Line station provides rapid transit to Downtown (8 minutes), YVR Airport (20 minutes), and Richmond. The Broadway Subway (Millennium Line extension) will add new stations along Broadway, creating an interchange at Broadway-City Hall that will be one of the busiest transit hubs in the region." },
                    { mode: "Bus", detail: "Broadway is one of the busiest bus corridors in North America. The 99 B-Line and local routes 9 and 14 provide frequent east-west service. North-south routes along Cambie, Oak, and Granville Streets connect Fairview to Downtown, the west side, and south Vancouver." },
                    { mode: "Cycling", detail: "Fairview benefits from Vancouver's growing cycling infrastructure. The 10th Avenue bike route provides a dedicated east-west corridor. The seawall connects to the Cambie Bridge and Downtown, and bike-share stations are available throughout the neighbourhood." },
                    { mode: "Walking", detail: "With a Walk Score of 95, Fairview is one of Vancouver's most walkable neighbourhoods. Daily errands, dining, shopping, and transit are all within comfortable walking distance for most residents. The flat terrain along Broadway and gentle slope to False Creek make walking easy and pleasant." },
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
                  Fairview offers a mix of neighbourhood parks and exceptional waterfront access:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Jonathan Rogers Park", desc: "A beautifully maintained heritage park with a playground, wading pool, sports courts, and mature trees. It serves as a central gathering place for the Fairview community, hosting summer movie nights and neighbourhood events." },
                    { name: "Charleson Park", desc: "A waterfront park along False Creek near the Cambie Bridge. It features walking paths, a playground, open green space, and lovely views across the water to Science World. A favourite for evening walks and family outings." },
                    { name: "Granville Island", desc: "While technically its own entity, Granville Island sits at Fairview's northern doorstep. Beyond the famous public market, it offers waterfront parks, the Granville Island water park for children, and extensive walking paths along the False Creek seawall." },
                    { name: "False Creek Seawall", desc: "The seawall stretching along Fairview's northern edge provides a continuous waterfront walking and cycling path connecting to Downtown, Kitsilano, and Science World. It is one of Vancouver's most treasured urban amenities." },
                    { name: "Douglas Park", desc: "Located on the border with South Cambie, Douglas Park offers a community centre, outdoor pool, sports fields, and playground. It is one of the more complete parks on the east side of Fairview." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Broadway Plan includes provisions for new and expanded public green spaces as the neighbourhood densifies, ensuring that outdoor amenities keep pace with population growth.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Fairview offers a solid selection of public schools and benefits from its proximity to major educational institutions including Vancouver General Hospital&apos;s teaching facilities and several post-secondary campuses.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Emily Carr Elementary", type: "K-7 Public", detail: "A well-regarded neighbourhood school named after the famous Canadian artist. Known for strong academics and an active parent advisory council." },
                      { name: "L'Ecole Bilingue", type: "K-7 Public (French)", detail: "A French immersion elementary school offering bilingual education. It is one of the most popular French immersion options on the west side, drawing families from across the city." },
                      { name: "False Creek Elementary", type: "K-7 Public", detail: "Located near the False Creek waterfront, this school serves the growing number of families in the Olympic Village and south False Creek area. It offers a modern facility and diverse student body." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Nearby Secondary & Post-Secondary</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Hamber Secondary", type: "8-12 Public", detail: "Eric Hamber Secondary, located nearby in Riley Park, is the catchment secondary school for much of Fairview. Known for strong academics and a comprehensive IB programme." },
                      { name: "Vancouver Community College", type: "Post-Secondary", detail: "VCC's Broadway campus is located within Fairview, offering a wide range of vocational, academic, and continuing education programs." },
                      { name: "Emily Carr University of Art + Design", type: "Post-Secondary", detail: "Located on nearby Granville Island (and its new Great Northern Way campus), Emily Carr is one of Canada's leading art and design universities." },
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
                  Fairview&apos;s central location means that families also have convenient access to top-rated schools in adjacent neighbourhoods including Kitsilano, South Cambie, and Mount Pleasant.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">South Granville</p>
                  <p className="text-sm text-gold-700">
                    The South Granville shopping district, stretching along Granville Street from the Granville Bridge to roughly 16th Avenue, is one of Vancouver&apos;s premier shopping destinations. Known for its art galleries, home design stores, fashion boutiques, and upscale dining, it gives Fairview a distinctive retail character.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Fairview&apos;s shopping and dining scene is anchored by two distinct commercial areas. South Granville offers an upscale, gallery-rich experience with boutique fashion, home furnishings, and fine dining. The Cambie Village area around City Hall is more neighbourhood-focused, with local cafes, bakeries, grocery stores, and casual restaurants that serve the daily needs of residents.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Granville Island, while technically its own jurisdiction, is an essential part of the Fairview lifestyle. The public market is a world-class destination for fresh produce, artisan foods, and specialty ingredients. The island also hosts theatres, artist studios, galleries, and seasonal events that enrich the cultural life of the surrounding neighbourhoods.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For dining, Fairview offers everything from acclaimed restaurants on South Granville to beloved neighbourhood spots along Broadway and Cambie. The proximity to the Broadway tech corridor has brought a wave of quality lunch spots and coffee shops catering to the growing daytime population.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Grocery shopping is well-served by several options including Whole Foods on Cambie, Choices Markets, and specialty shops along Granville and Broadway. The Granville Island public market fills any remaining gaps with exceptional fresh food options.
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
