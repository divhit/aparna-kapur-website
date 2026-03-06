import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Kerrisdale Vancouver Real Estate Guide 2026 | Luxury Homes & Market Data",
  description:
    "The definitive guide to Kerrisdale, Vancouver. Explore luxury real estate, heritage homes, top private schools, Kerrisdale Village shopping, parks, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Kerrisdale Vancouver real estate",
    "Kerrisdale homes for sale",
    "Kerrisdale luxury homes",
    "Kerrisdale Village Vancouver",
    "Kerrisdale neighborhood guide",
    "buy home Kerrisdale Vancouver",
    "Kerrisdale private schools",
    "Kerrisdale heritage homes",
  ],
};

const faqs = [
  {
    question: "Is Kerrisdale a good neighborhood to buy a home in?",
    answer:
      "Kerrisdale combines heritage charm, top schools (public and private), village shopping, and proximity to Pacific Spirit Park and UBC. A perennial favorite among affluent families and investors. Values hold strong even during corrections due to limited supply and high demand.",
  },
  {
    question: "How much does a home cost in Kerrisdale Vancouver?",
    answer:
      "GVR MLS® HPI benchmarks (January 2026): detached $2.98M, condos $974K, townhomes $1.66M. Composite: $1.90M. Heritage estates and larger lots command significantly more.",
  },
  {
    question: "What schools are near Kerrisdale?",
    answer:
      "Public: Kerrisdale Elementary (K-7), Kerrisdale Annex, and Point Grey Secondary (8-12). Private: Crofton House (all-girls, JK-12) and St. George's (all-boys, 1-12) nearby. UBC adds post-secondary convenience.",
  },
  {
    question: "What is Kerrisdale Village?",
    answer:
      "The commercial heart of the neighborhood along 41st Avenue between Larch and Yew. Boutique shops, bookstores, specialty food stores, cafes, and restaurants. Walkable, small-town atmosphere with locally owned businesses.",
  },
  {
    question: "How do I get around from Kerrisdale?",
    answer:
      "Bus routes along 41st Avenue and Dunbar/Boulevard connect to downtown, UBC, and Oakridge-41st SkyTrain. The Arbutus Greenway provides cycling and walking. UBC is 10 minutes by car, downtown about 20.",
  },
];

const kerrisdaleData = NEIGHBOURHOODS["kerrisdale"];

export default async function KerrisdalePage() {
  const pois = await fetchNeighbourhoodPOIs(kerrisdaleData.center);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/neighborhoods/kerrisdale.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Kerrisdale</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Kerrisdale, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">Top 5</p>
                  <p className="text-xs text-warm-500 mt-1">Private Schools</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">10 min</p>
                  <p className="text-xs text-warm-500 mt-1">To UBC</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">4+</p>
                  <p className="text-xs text-warm-500 mt-1">Major Parks</p>
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
                  ["living", "Living in Kerrisdale", "2"],
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
                      ["Oakridge", "oakridge"],
                      ["Dunbar", "dunbar"],
                      ["Arbutus Ridge", "arbutus-ridge"],
                      ["Shaughnessy", "shaughnessy"],
                      ["Point Grey", "point-grey"],
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
                  Kerrisdale is an upscale neighborhood in southwest Vancouver, bounded by 33rd Avenue, 49th Avenue, Granville Street, and Blenheim Street. One of the city&apos;s oldest and most prestigious areas, it has maintained its refined character for over a century while appealing to families, professionals, and retirees.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A genuine village atmosphere sets Kerrisdale apart. Grand heritage homes on generous lots beneath mature canopies, and a shopping district that feels more small town than big city.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Strong East Asian and European communities shape the dining scene, specialty shops, and community character. Old-world elegance meets multicultural vibrancy.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={kerrisdaleData.center}
                  zoom={kerrisdaleData.zoom}
                  pois={pois.length > 0 ? pois : kerrisdaleData.fallbackPOIs}
                  boundaryName="Kerrisdale"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Kerrisdale */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Kerrisdale
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The streets are wide, tree-lined, and remarkably quiet. You will know your neighbors by name and children will walk to school through canopied sidewalks.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Tudor homes, Georgian residences, craftsman bungalows, and mid-century estates. Many sit on some of Vancouver&apos;s largest residential lots, with mature gardens and curb appeal that newer developments cannot replicate.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Morning espresso on 41st Avenue. Walk the dog through Kerrisdale Park, drop the kids at Crofton House or Kerrisdale Elementary. Afternoon: pastries from Thomas Haas, browsing the local bookstore, a boutique clothing shop. After school at Kerrisdale Community Centre, then dinner at a neighborhood restaurant. Weekends: family hike through Pacific Spirit Park or bike ride along the Arbutus Greenway.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Unhurried and gracious, with everything within walking distance and Vancouver&apos;s west-side natural beauty at the doorstep.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Kerrisdale Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Limited supply, strong demand, and a range from heritage estates to modern condos:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$2.5M - $4.5M+", desc: "Heritage and character homes on generous lots. Benchmark: $2.98M. Tudor, Georgian, and craftsman styles." },
                    { type: "Condominiums", range: "$600K - $1.3M", desc: "Concentrated along 41st Avenue and West Boulevard. Benchmark: $974K. Popular with retirees and professionals." },
                    { type: "Townhomes", range: "$1.3M - $2.0M", desc: "Less common but increasingly sought after. Benchmark: $1.66M." },
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
                  Kerrisdale properties show strong value retention thanks to established reputation, excellent schools, and lot scarcity.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Proximity to UBC, top private schools, the Arbutus Greenway, and limited detached supply support long-term appreciation. For a stable, prestige west-side address, Kerrisdale is one of Vancouver&apos;s most reliable picks.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  No SkyTrain station, but well-served by bus transit and centrally located on the west side:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus", detail: "41st Avenue (43/41) connects to Oakridge-41st SkyTrain and UBC. Dunbar, Arbutus, and West Boulevard routes provide north-south connections." },
                    { mode: "Cycling", detail: "The Arbutus Greenway runs along the eastern edge, a scenic car-free corridor connecting to Marpole, Kitsilano, and beyond." },
                    { mode: "Driving", detail: "41st Avenue, Granville, and West Boulevard. UBC in 10 minutes, downtown in 20. Airport via Granville to the Arthur Laing Bridge." },
                    { mode: "Walking", detail: "Kerrisdale Village is one of Vancouver's most walkable districts. Daily errands, schools, and parks within comfortable distance." },
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
                  Kerrisdale residents enjoy an abundance of green space:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Kerrisdale Park", desc: "Playgrounds, tennis courts, sports fields, and seasonal outdoor pool. Adjacent to the Community Centre." },
                    { name: "Elm Park", desc: "Quiet park with playground, green space, and towering elms. Popular with young families and dog walkers." },
                    { name: "Quilchena Park", desc: "Northern edge of Kerrisdale. Expansive playing fields, running track, and playground. Home to local soccer and field hockey leagues." },
                    { name: "Pacific Spirit Regional Park", desc: "763 hectares of urban forest with 73+ km of trails for hiking, running, cycling, and horseback riding. One of North America's largest urban parks, minutes away." },
                    { name: "Arbutus Greenway", desc: "Linear park on the former rail line. Walking, jogging, and cycling corridor connecting Kerrisdale to surrounding neighbourhoods." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  Kerrisdale Community Centre is one of the west side&apos;s most active, with a swimming pool (not all centres have one), programs for all ages, and a central role in neighbourhood life.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Education is one of Kerrisdale&apos;s strongest draws, with some of Vancouver&apos;s best public and private schools. Concentrated after-school activities make it easy to manage schedules with multiple kids.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Kerrisdale Elementary", type: "K-7 Public", detail: "The neighborhood's beloved elementary school with strong academics and an active parent community." },
                      { name: "Kerrisdale Annex", type: "K-3 Public", detail: "A smaller primary annex offering an intimate learning environment for younger students." },
                      { name: "Point Grey Secondary", type: "8-12 Public", detail: "One of Vancouver's top-performing public high schools, known for strong academics, athletics, and arts programs. The French Immersion program is particularly well-regarded." },
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
                      { name: "Crofton House School", type: "JK-12 Private (Girls)", detail: "One of Vancouver's most prestigious all-girls schools. Consistently top-ranked in B.C." },
                      { name: "St. George's School", type: "1-12 Private (Boys)", detail: "Premier all-boys school in nearby Dunbar. Academic excellence, competitive athletics, strong alumni network." },
                      { name: "Vancouver College", type: "K-12 Private", detail: "Established Catholic school with strong academics and athletics, within easy reach." },
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
                  Proximity to UBC adds further value through university events, libraries, and cultural programs.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Kerrisdale Village</p>
                  <p className="text-sm text-gold-700">
                    The heart of Kerrisdale&apos;s commercial life, stretching along 41st Avenue between Larch and Yew Streets. Over 100 shops and restaurants create one of Vancouver&apos;s most walkable and charming village shopping experiences.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kerrisdale Village has resisted the homogenization of other commercial areas, retaining independent boutiques, specialty stores, and locally owned businesses.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Dining spans cozy cafes, upscale Japanese, European bakeries, and West Coast cuisine. East Asian and European influences shape the food scene.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Notable spots: Thomas Haas, Beaucoup Bakery, excellent sushi restaurants, and well-loved cafes. West Boulevard extends the village atmosphere south.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Quality supermarkets, specialty food shops, and organic grocers mean residents rarely need to leave the neighbourhood for shopping or dining.
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
