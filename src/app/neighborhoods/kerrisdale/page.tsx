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
      "Kerrisdale is one of Vancouver's most desirable and established residential neighborhoods. Its combination of heritage charm, top-tier schools (both public and private), village-style shopping, and proximity to Pacific Spirit Park and UBC make it a perennial favorite among affluent families and long-term investors. Property values in Kerrisdale have historically held strong, even during broader market corrections, due to limited land supply and consistently high demand.",
  },
  {
    question: "How much does a home cost in Kerrisdale Vancouver?",
    answer:
      "Kerrisdale is among Vancouver's most prestigious neighborhoods. The GVR MLS® HPI benchmark prices as of January 2026 are: detached homes at $2.98M, condos at $974K, and townhomes at $1.66M. The composite benchmark across all property types is $1.90M. Exceptional heritage estates and larger lots can command significantly higher prices.",
  },
  {
    question: "What schools are near Kerrisdale?",
    answer:
      "Kerrisdale is one of Vancouver's strongest neighborhoods for education. Public options include Kerrisdale Elementary (K-7), Kerrisdale Annex, and Point Grey Secondary (8-12). Top private schools include Crofton House School (all-girls, JK-12) and St. George's School (all-boys, 1-12) nearby. The proximity to UBC also adds post-secondary convenience for older students and academic families.",
  },
  {
    question: "What is Kerrisdale Village?",
    answer:
      "Kerrisdale Village is the charming commercial heart of the neighborhood, centered along 41st Avenue between Larch Street and Yew Street. It features an eclectic mix of boutique shops, independent bookstores, specialty food stores, cafes, and restaurants. Unlike larger commercial districts, Kerrisdale Village retains a walkable, small-town atmosphere with tree-lined sidewalks and locally owned businesses that give it a unique character.",
  },
  {
    question: "How do I get around from Kerrisdale?",
    answer:
      "Kerrisdale is well-connected by bus transit, with major routes running along 41st Avenue and Dunbar/Boulevard connecting to downtown, UBC, and the Oakridge-41st SkyTrain station. The Arbutus Greenway provides an excellent cycling and walking corridor. Driving access is convenient via West Boulevard, Arbutus Street, and 41st Avenue. UBC is approximately 10 minutes by car, and downtown Vancouver is about 20 minutes.",
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
            backgroundImage: "url('https://images.pexels.com/photos/33310374/pexels-photo-33310374.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
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
                  Kerrisdale is an upscale, established residential neighborhood in southwest Vancouver, bounded roughly by West 33rd Avenue to the north, West 49th Avenue to the south, Granville Street to the east, and Blenheim Street to the west. One of the city&apos;s oldest and most prestigious neighborhoods, Kerrisdale has maintained its refined character for over a century while evolving into a vibrant community that appeals to families, professionals, and retirees alike.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What sets Kerrisdale apart from other Vancouver neighborhoods is its genuine village atmosphere. Unlike the high-rise density of downtown or the busy commercial corridors of other neighborhoods, Kerrisdale offers a quieter, more refined pace of life. Grand heritage homes sit on generous lots beneath mature tree canopies, and the local shopping district feels more like a charming small town than a city neighborhood.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The neighborhood is also home to a rich cultural mix, with strong East Asian and European communities that have shaped Kerrisdale&apos;s dining scene, specialty shops, and community character. This blend of old-world elegance and multicultural vibrancy gives Kerrisdale a distinctive identity that is difficult to replicate elsewhere in Vancouver.
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
                  One finds beautifully maintained Tudor-style homes, stately Georgian residences, some classic craftsman bungalows as well as distinguished mid-century estates. Many homes sit on some of Vancouver&apos;s largest residential lots, with mature gardens, established landscaping and the kind of curb appeal that newer developments simply cannot replicate.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A day in Kerrisdale can start with a morning espresso at one of the cozy cafes along 41st Avenue. A stroll through Kerrisdale Park with the dog before dropping the children at Crofton House or Kerrisdale Elementary. Afternoon errands can look like picking up fresh pastries from Thomas Haas, browsing the shelves at the local bookstore or stopping in at a boutique clothing shop. An after-school activity at Kerrisdale Community Centre, followed by dinner at one of the neighborhood&apos;s excellent restaurants. Weekend mornings might include a family hike through Pacific Spirit Park, just minutes away, or a bike ride along the Arbutus Greenway.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Kerrisdale is unhurried and gracious, with everything you need within walking distance, and the natural beauty of Vancouver&apos;s west side at your doorstep.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Kerrisdale Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kerrisdale is one of Vancouver&apos;s most coveted and expensive residential neighborhoods, defined by limited supply, strong demand, and a range from luxury heritage estates to modern condominiums:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$2.5M - $4.5M+", desc: "Primarily heritage and character homes on generous lots. Benchmark price is $2.98M. Tudor, Georgian, and craftsman styles predominate." },
                    { type: "Condominiums", range: "$600K - $1.3M", desc: "You will find these concentrated along 41st Avenue and West Boulevard. Benchmark price is $974K. Popular with retirees, and professionals who want a Kerrisdale life at a more accessible price point." },
                    { type: "Townhomes", range: "$1.3M - $2.0M", desc: "Less common here but increasingly sought after. Benchmark price is $1.66M." },
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
                  Despite the premium, Kerrisdale properties have historically demonstrated strong value retention due to the neighborhood&apos;s established reputation, excellent schools, and the scarcity of available lots.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Kerrisdale benefits from a combination of factors that support long-term appreciation: proximity to UBC, top-ranked private schools, the Arbutus Greenway development, and limited new detached-home supply. For buyers seeking a stable, prestige west-side address with strong fundamentals, Kerrisdale is one of Vancouver&apos;s most reliable neighborhoods.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  While Kerrisdale does not have its own SkyTrain station, the neighborhood is well-served by transit and benefits from its central west-side location:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus", detail: "Major bus routes run along 41st Avenue (43 and 41), connecting Kerrisdale to the Oakridge-41st SkyTrain station and UBC. Additional routes on Dunbar Street, Arbutus Street, and West Boulevard provide north-south connections to downtown and south Vancouver." },
                    { mode: "Cycling", detail: "The Arbutus Greenway, a dedicated cycling and walking corridor built on the former Arbutus rail line, runs along the eastern edge of Kerrisdale. It provides a scenic, car-free route connecting Kerrisdale to Marpole, Kitsilano, and beyond." },
                    { mode: "Driving", detail: "Easy access to 41st Avenue, Granville Street, and West Boulevard. UBC is approximately 10 minutes, downtown Vancouver about 20 minutes. The airport is accessible via Granville Street to the Arthur Laing Bridge." },
                    { mode: "Walking", detail: "Kerrisdale Village is one of Vancouver's most walkable shopping districts. Most daily errands, schools, and parks are within comfortable walking distance for residents, making a car-light lifestyle entirely feasible." },
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
                    { name: "Kerrisdale Park", desc: "The neighborhood's central green space, featuring playgrounds, tennis courts, sports fields, and a seasonal outdoor pool. Located adjacent to the Kerrisdale Community Centre, it serves as the recreational hub for families throughout the year." },
                    { name: "Elm Park", desc: "A quiet, leafy neighborhood park with a playground, open green space, and towering elm trees. A favorite for families with young children and morning dog walkers." },
                    { name: "Quilchena Park", desc: "A larger park on the northern edge of Kerrisdale with expansive playing fields, a running track, and a playground. Home to local soccer and field hockey leagues, it offers open space that is increasingly rare on the west side." },
                    { name: "Pacific Spirit Regional Park", desc: "Just minutes from Kerrisdale, this 763-hectare urban forest offers over 73 kilometers of trails for hiking, running, cycling, and horseback riding. It is one of the largest urban parks in North America and a defining feature of west-side living." },
                    { name: "Arbutus Greenway", desc: "A linear park and active transportation corridor running along the former Arbutus rail line. Perfect for walking, jogging, and cycling, it connects Kerrisdale to other neighborhoods and provides a scenic urban trail experience." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Kerrisdale Community Centre is a hub for activities across all ages. It is equipped with a swimming pool which is a big plus point for kids and seniors since not all community centres have pools. It also is one of the most active community centres on Vancouver&apos;s west side and plays a central role in neighborhood life.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Education is one of Kerrisdale&apos;s strongest draws. The neighborhood and its immediate surroundings are home to some of Vancouver&apos;s best public and private schools. Moreover there are many great after school activities that are concentrated here which makes it very easy to hop from one to another with multiple kids in tow!
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
                      { name: "Crofton House School", type: "JK-12 Private (Girls)", detail: "One of Vancouver's most prestigious all-girls schools, located in Kerrisdale. Consistently ranked among the top independent schools in British Columbia." },
                      { name: "St. George's School", type: "1-12 Private (Boys)", detail: "A premier all-boys school located nearby in the Dunbar area. Known for academic excellence, competitive athletics, and a strong alumni network." },
                      { name: "Vancouver College", type: "K-12 Private", detail: "A well-established Catholic school offering excellent academic and athletic development within easy reach of Kerrisdale." },
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
                  The proximity to the University of British Columbia (UBC) also adds educational value to the neighborhood, with families benefiting from university events, libraries, cultural programs, and the general academic atmosphere that influences this west side neighbourhood.
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
                  Kerrisdale Village is what makes this neighborhood truly special for day-to-day living. The shopping district has resisted the homogenization that has affected many Vancouver commercial areas, retaining a mix of independent boutiques, specialty stores, and locally owned businesses that give it genuine character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For dining, Kerrisdale offers everything from cozy neighbourhood cafes and upscale Japanese restaurants to classic European bakeries and modern West Coast cuisine. The neighborhood&apos;s East Asian and European cultural influences are beautifully reflected in its food scene.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Notable destinations include Thomas Haas, Beaucoup Bakery, a range of excellent sushi restaurants, and several well-loved cafes. Along West Boulevard, additional shops and eateries extend the village atmosphere south.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For grocery needs, Kerrisdale is home to quality supermarkets, specialty food shops, and organic grocers. The neighborhood&apos;s self-contained nature means most residents rarely need to leave for shopping or dining.
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
