import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/forms/ContactForm";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

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
      "Kerrisdale is among Vancouver's most expensive neighborhoods. Detached homes typically range from $2.8M to $5M+, with exceptional heritage estates and larger lots commanding higher prices. Condominiums and apartments, primarily along 41st Avenue and Boulevard, range from $500K to $1.2M. Townhomes, which are less common, generally fall between $1.2M and $2M. The average detached home price is approximately $3.2M.",
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
      <section className="relative py-24">
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
          <p className="text-xl text-teal-200 font-medium mb-2">
            The Complete Neighborhood Guide
          </p>
          <p className="text-white/70 max-w-2xl text-lg">
            Discover Vancouver&apos;s most charming village neighborhood &mdash; where heritage
            elegance, tree-lined streets, and boutique shopping meet world-class schools
            and an unmatched quality of life.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$3.2M</p>
              <p className="text-xs text-warm-500 mt-1">Avg. Home Price</p>
            </div>
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
            <div>
              <p className="font-serif text-2xl text-teal-700">100+</p>
              <p className="text-xs text-warm-500 mt-1">Village Shops</p>
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
              <nav className="sticky top-28">
                <p className="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-4">
                  On This Page
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["overview", "Overview"],
                    ["map", "Explore Map"],
                    ["living", "Living in Kerrisdale"],
                    ["real-estate", "Real Estate Market"],
                    ["transit", "Getting Around"],
                    ["parks", "Parks & Recreation"],
                    ["schools", "Schools & Education"],
                    ["shopping", "Shopping & Dining"],
                    ["faq", "FAQ"],
                  ].map(([id, label]) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="text-warm-500 hover:text-teal-700 transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
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
              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Explore Kerrisdale
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Discover transit stations, schools, parks, and key landmarks in and around Kerrisdale.
                </p>
                <NeighbourhoodMap
                  center={kerrisdaleData.center}
                  zoom={kerrisdaleData.zoom}
                  pois={pois.length > 0 ? pois : kerrisdaleData.fallbackPOIs}
                  boundaryName="Kerrisdale"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Overview */}
              <section id="overview" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Overview
                </h2>
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

              {/* Living in Kerrisdale */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Kerrisdale
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Living in Kerrisdale means enjoying the best of Vancouver&apos;s west side without the frenetic energy of more urban neighborhoods. The streets are wide, tree-lined, and remarkably quiet &mdash; the kind of neighborhood where you know your neighbors by name and children walk to school through canopied sidewalks.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The architectural character of Kerrisdale is one of its most striking features. You will find beautifully maintained Tudor-style homes, stately Georgian residences, classic craftsman bungalows, and distinguished mid-century estates. Many of these homes sit on some of Vancouver&apos;s largest residential lots, with mature gardens, established landscaping, and the kind of curb appeal that newer developments simply cannot replicate.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in Kerrisdale</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Morning starts with an espresso at one of the cozy cafes along 41st Avenue. A stroll through Kerrisdale Park with the dog before dropping the children at Crofton House or Kerrisdale Elementary. Afternoon errands in the village &mdash; picking up fresh pastries from Thomas Haas, browsing the shelves at the local bookstore, stopping in at a boutique clothing shop. An after-school activity at Kerrisdale Community Centre, followed by dinner at one of the neighborhood&apos;s excellent restaurants. Weekend mornings might include a family hike through Pacific Spirit Park, just minutes away, or a bike ride along the Arbutus Greenway.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  This is the Kerrisdale lifestyle &mdash; unhurried and gracious, with everything you need within walking distance, and the natural beauty of Vancouver&apos;s west side at your doorstep.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Kerrisdale Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kerrisdale is one of Vancouver&apos;s most coveted and expensive residential neighborhoods. The real estate market here is defined by limited supply, strong demand, and a housing stock that ranges from luxury heritage estates to modern condominiums:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$2.8M - $5M+", desc: "The heart of Kerrisdale real estate. Primarily heritage and character homes on generous lots. Tudor, Georgian, and craftsman styles predominate. Larger estates and newer luxury builds can exceed $6M." },
                    { type: "Condominiums", range: "$500K - $1.2M", desc: "Concentrated along 41st Avenue and West Boulevard. Popular with downsizers, retirees, and professionals who want the Kerrisdale lifestyle at a more accessible price point." },
                    { type: "Townhomes", range: "$1.2M - $2M", desc: "Less common but increasingly sought after. Multi-level homes offering a middle ground between condos and detached properties, appealing to young families and professionals." },
                  ].map((item) => (
                    <div key={item.type} className="bg-warm-50 rounded-xl p-5 border-l-4 border-teal-500">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="font-medium text-teal-950">{item.type}</h4>
                        <span className="font-serif text-teal-700">{item.range}</span>
                      </div>
                      <p className="text-sm text-warm-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The average detached home price in Kerrisdale is approximately $3.2M, making it one of Vancouver&apos;s top five most expensive neighborhoods for single-family homes. Despite the premium, Kerrisdale properties have historically demonstrated strong value retention due to the neighborhood&apos;s established reputation, excellent schools, and the scarcity of available lots.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Kerrisdale&apos;s real estate market benefits from a combination of factors that support long-term appreciation: proximity to UBC, top-ranked private schools, the Arbutus Greenway development, and limited new detached-home supply. For buyers seeking a stable, prestige west-side address with strong fundamentals, Kerrisdale remains one of Vancouver&apos;s most reliable neighborhoods.
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
                  Parks &amp; Recreation
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kerrisdale residents enjoy an abundance of green space, from neighborhood parks to one of Vancouver&apos;s largest urban forests:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Kerrisdale Park", desc: "The neighborhood's central green space, featuring playgrounds, tennis courts, sports fields, and a seasonal outdoor pool. Located adjacent to the Kerrisdale Community Centre, it serves as the recreational hub for families throughout the year." },
                    { name: "Elm Park", desc: "A quiet, leafy neighborhood park with a playground, open green space, and towering elm trees. A favorite for families with young children and morning dog walkers." },
                    { name: "Quilchena Park", desc: "A larger park on the northern edge of Kerrisdale with expansive playing fields, a running track, and a playground. Home to local soccer and field hockey leagues, it offers open space that is increasingly rare on the west side." },
                    { name: "Pacific Spirit Regional Park", desc: "Just minutes from Kerrisdale, this 763-hectare urban forest offers over 73 kilometers of trails for hiking, running, cycling, and horseback riding. It is one of the largest urban parks in North America and a defining feature of west-side living." },
                    { name: "Arbutus Greenway", desc: "A linear park and active transportation corridor running along the former Arbutus rail line. Perfect for walking, jogging, and cycling, it connects Kerrisdale to other neighborhoods and provides a scenic urban trail experience." },
                  ].map((park) => (
                    <div key={park.name} className="bg-warm-50 rounded-xl p-5">
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Kerrisdale Community Centre is a hub for activities across all ages, offering fitness classes, arts programs, swimming lessons, seniors&apos; activities, and seasonal events. It is one of the most active community centres on Vancouver&apos;s west side and plays a central role in neighborhood life.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Schools &amp; Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Education is one of Kerrisdale&apos;s strongest draws. The neighborhood and its immediate surroundings are home to some of Vancouver&apos;s best public and private schools:
                </p>
                <div className="space-y-3 mb-6">
                  <h3 className="font-serif text-lg text-teal-900">Public Schools</h3>
                  {[
                    { name: "Kerrisdale Elementary", type: "K-7 Public", detail: "The neighborhood's beloved elementary school with strong academics, an active parent community, and a welcoming environment that families consistently rate highly." },
                    { name: "Kerrisdale Annex", type: "K-3 Public", detail: "A smaller primary annex offering an intimate learning environment for younger students within the Kerrisdale catchment." },
                    { name: "Point Grey Secondary", type: "8-12 Public", detail: "One of Vancouver's top-performing public high schools, known for strong academics, athletics, and arts programs. The French Immersion program is particularly well-regarded." },
                  ].map((school) => (
                    <div key={school.name} className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
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
                <div className="space-y-3 mb-6">
                  <h3 className="font-serif text-lg text-teal-900">Private Schools</h3>
                  {[
                    { name: "Crofton House School", type: "JK-12 Private (Girls)", detail: "One of Vancouver's most prestigious all-girls schools, located in Kerrisdale. Crofton House is consistently ranked among the top independent schools in British Columbia with a strong emphasis on academics, leadership, and community service." },
                    { name: "St. George's School", type: "1-12 Private (Boys)", detail: "A premier all-boys school located nearby in the Dunbar area. Known for academic excellence, competitive athletics, and a strong alumni network. Proximity to Kerrisdale makes it a top choice for neighborhood families." },
                    { name: "Vancouver College", type: "K-12 Private", detail: "A well-established Catholic school offering a faith-based education within easy reach of Kerrisdale families." },
                  ].map((school) => (
                    <div key={school.name} className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
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
                <p className="text-warm-600 leading-relaxed">
                  The proximity to the University of British Columbia (UBC) also adds educational value to the neighborhood, with families benefiting from university events, libraries, cultural programs, and the general academic atmosphere that permeates the west side of Vancouver.
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
                    The heart of Kerrisdale&apos;s commercial life, stretching along 41st Avenue between Larch and Yew Streets. Over 100 shops, restaurants, and services create one of Vancouver&apos;s most walkable and charming village shopping experiences.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kerrisdale Village is what makes this neighborhood truly special for day-to-day living. The shopping district has resisted the homogenization that has affected many Vancouver commercial areas, retaining a mix of independent boutiques, specialty stores, and locally owned businesses that give it genuine character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For dining, Kerrisdale offers everything from cozy neighbourhood cafes and upscale Japanese restaurants to classic European bakeries and modern West Coast cuisine. The neighborhood&apos;s East Asian and European cultural influences are beautifully reflected in its food scene &mdash; you can enjoy authentic dim sum, artisan French pastries, and farm-to-table Pacific Northwest fare all within a few blocks.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Notable destinations include Thomas Haas (world-renowned chocolates and pastries), Beaucoup Bakery, a range of excellent sushi restaurants, and several well-loved cafes that serve as neighborhood gathering spots. Along West Boulevard, additional shops and eateries extend the village atmosphere south.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For everyday grocery needs, Kerrisdale is home to quality supermarkets, specialty food shops, and organic grocers. The neighborhood&apos;s self-contained nature means most residents rarely need to leave for shopping or dining &mdash; everything is within a pleasant walk.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="bg-warm-50 rounded-xl p-6">
                      <h3 className="font-medium text-teal-950 mb-2">{faq.question}</h3>
                      <p className="text-sm text-warm-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="bg-teal-950 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-serif text-2xl text-white mb-4">
                      Thinking About Kerrisdale?
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Whether you&apos;re looking to buy a heritage home, sell your current
                      property, or simply explore what Kerrisdale has to offer &mdash;
                      I&apos;d love to help. Let&apos;s start with a no-pressure conversation
                      about your goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button href="/contact" variant="primary">
                        Get in Touch
                      </Button>
                      <Button href="/buying/guide" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        Read the Buyer&apos;s Guide
                      </Button>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <ContactForm compact light />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

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
