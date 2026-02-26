import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Shaughnessy Vancouver Real Estate Guide 2026 | Heritage Mansions & Market Data",
  description:
    "The definitive guide to Shaughnessy, Vancouver. Explore heritage mansions, prestigious estates, VanDusen Botanical Garden, top schools, tree-lined boulevards, and lifestyle. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Shaughnessy Vancouver real estate",
    "Shaughnessy homes for sale",
    "Shaughnessy mansions",
    "Shaughnessy heritage homes",
    "Shaughnessy neighborhood guide",
    "buy home Shaughnessy Vancouver",
    "First Shaughnessy heritage district",
    "VanDusen Botanical Garden",
  ],
};

const faqs = [
  {
    question: "Why is Shaughnessy considered Vancouver's most prestigious neighbourhood?",
    answer:
      "Shaughnessy has been Vancouver's most prestigious residential address for over a century. Originally developed in the early 1900s by the Canadian Pacific Railway as an exclusive residential enclave for the city's elite, it was designed with curving boulevards, generous lot sizes, and strict building covenants that ensured architectural grandeur. The neighbourhood is home to two designated heritage conservation areas, First Shaughnessy and Second Shaughnessy, which protect its historic character. The combination of grand mansions, mature tree canopies, expansive lots, and a deeply rooted sense of exclusivity give Shaughnessy an atmosphere that is unmatched anywhere else in Vancouver.",
  },
  {
    question: "How much does a home cost in Shaughnessy Vancouver?",
    answer:
      "Shaughnessy is the most expensive neighbourhood in Vancouver. The composite benchmark price across all property types is approximately $3.5M or more, but this figure understates the true cost of entry, as detached homes frequently sell for $5M to $15M and above. First Shaughnessy heritage mansions on The Crescent and surrounding streets can exceed $20M. There is virtually no condominium or townhome inventory within Shaughnessy proper, making it an almost exclusively single-family neighbourhood at the highest price tier in the city.",
  },
  {
    question: "What are the heritage districts in Shaughnessy?",
    answer:
      "Shaughnessy contains two formally designated heritage conservation areas. First Shaughnessy, roughly bounded by King Edward Avenue, Oak Street, 25th Avenue, and Granville Street, is the original CPR-planned enclave with the neighbourhood's grandest estates, including properties along The Crescent. Second Shaughnessy extends south and east, with somewhat smaller but still substantial heritage homes. Properties within these districts are subject to heritage guidelines that regulate demolition, renovation, and new construction to preserve the neighbourhood's historic character.",
  },
  {
    question: "What schools are near Shaughnessy?",
    answer:
      "Shaughnessy is served by Shaughnessy Elementary, a well-regarded public school at the heart of the neighbourhood. Nearby secondary options include Eric Hamber Secondary and Prince of Wales Secondary. The neighbourhood is also within close proximity to some of Vancouver's most prestigious private schools, including York House School (all-girls, K-12), Little Flower Academy (all-girls, 8-12), and Vancouver College (K-12). St. George's School and Crofton House School are also easily accessible from Shaughnessy.",
  },
  {
    question: "Is Shaughnessy walkable?",
    answer:
      "Shaughnessy is primarily a quiet residential neighbourhood designed for gracious living rather than walkability to commercial amenities. There are no commercial streets within Shaughnessy itself. However, the neighbourhood borders several excellent shopping districts: South Granville's gallery row and boutique shopping is along the eastern edge, Kerrisdale Village is to the southwest, and the Cambie Corridor is to the east. VanDusen Botanical Garden and Shaughnessy Park provide beautiful walking destinations within the neighbourhood. Many residents appreciate the peaceful, pedestrian-friendly streets with wide sidewalks and towering tree canopies, even if daily errands typically require a short drive or transit trip.",
  },
];

const shaughnessyData = NEIGHBOURHOODS["shaughnessy"];

export default async function ShaughnessyPage() {
  const pois = await fetchNeighbourhoodPOIs(shaughnessyData.center);

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
            <span className="text-teal-200">Shaughnessy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Shaughnessy, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$3.5M+</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">120+</p>
                  <p className="text-xs text-warm-500 mt-1">Heritage Homes</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">22 ha</p>
                  <p className="text-xs text-warm-500 mt-1">VanDusen Garden</p>
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
                  ["living", "Living in Shaughnessy", "2"],
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
                      ["South Cambie", "south-cambie"],
                      ["Kerrisdale", "kerrisdale"],
                      ["Arbutus Ridge", "arbutus-ridge"],
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
                  Shaughnessy is Vancouver&apos;s most prestigious and historically significant residential neighbourhood. Developed in the early 1900s by the Canadian Pacific Railway as an exclusive enclave for the city&apos;s business elite, the neighbourhood was named after Thomas Shaughnessy, then president of the CPR. From its inception, Shaughnessy was planned to be exceptional: curving tree-lined boulevards, generous lot sizes, strict building covenants, and a deliberate absence of commercial development ensured that this would be a neighbourhood defined by grandeur, privacy, and permanence.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Today, Shaughnessy remains the pinnacle of Vancouver residential real estate. The neighbourhood is home to two heritage conservation areas, First Shaughnessy and Second Shaughnessy, which together contain over 120 heritage-designated properties. These include grand Tudor, Georgian, Arts and Crafts, and Colonial Revival mansions that represent some of the finest residential architecture in Western Canada. The lots are among the largest in the city, many exceeding 15,000 square feet, and the towering tree canopies create cathedral-like streetscapes that are unmatched anywhere else in Vancouver.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Shaughnessy appeals to buyers who seek the highest caliber of residential living: privacy, architectural distinction, mature landscaping, and an address that carries weight. It is not a neighbourhood of trendy restaurants or bustling shops; it is a neighbourhood of gated driveways, formal gardens, and the kind of quiet prestige that speaks for itself. VanDusen Botanical Garden, located on its southern boundary, adds 22 hectares of curated beauty to a neighbourhood that already feels like a private park.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={shaughnessyData.center}
                  zoom={shaughnessyData.zoom}
                  pois={pois.length > 0 ? pois : shaughnessyData.fallbackPOIs}
                  boundaryName="Shaughnessy"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Shaughnessy */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Shaughnessy
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Life in Shaughnessy unfolds at its own pace, insulated from the bustle of the city by towering hedges, mature tree canopies, and the neighbourhood&apos;s deliberately quiet, residential character. There are no commercial streets within Shaughnessy proper, and the curving boulevards were designed to discourage through traffic, creating an atmosphere of remarkable serenity for an urban neighbourhood.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The homes are extraordinary. First Shaughnessy, centered around The Crescent, features grand mansions that rival the finest residential architecture anywhere in Canada. Many of these estates sit on lots of 20,000 to 33,000 square feet or more, with formal gardens, carriage houses, and mature landscaping that has been cultivated over generations. Second Shaughnessy, while slightly more modest in scale, still features substantial heritage homes on generous lots with the same tree-lined character.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A day in Shaughnessy might begin with a walk through the neighbourhood&apos;s magnificent streets, where each block reveals a different architectural masterpiece. Morning coffee might be enjoyed in a sun-drenched garden, followed by a visit to VanDusen Botanical Garden. Errands take residents to nearby South Granville for boutique shopping or to Kerrisdale Village for everyday needs. Children attend some of Vancouver&apos;s finest schools, many within walking or short driving distance.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  What residents value above all is the sense of established permanence. Shaughnessy is not a neighbourhood that chases trends; it is a neighbourhood that has been Vancouver&apos;s finest address for over a century and intends to remain so. For those who can afford it, living in Shaughnessy offers a quality of residential life that is simply unavailable elsewhere in the city.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shaughnessy Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Shaughnessy is the most expensive residential neighbourhood in Vancouver and among the most expensive in Canada. The market here operates at a level that is distinct from the broader Vancouver real estate market:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "First Shaughnessy Estates", range: "$8M - $25M+", desc: "The grandest properties in Vancouver. Heritage mansions on The Crescent and surrounding streets, with lots often exceeding 20,000 square feet. These estates feature formal gardens, heritage architectural details, and a level of prestige that is unmatched in the city. Transactions are rare and often private." },
                    { type: "Second Shaughnessy Homes", range: "$4M - $10M", desc: "Substantial heritage and character homes on generous lots. While somewhat smaller than First Shaughnessy estates, these properties still offer exceptional quality, mature landscaping, and the Shaughnessy address. Many have been carefully renovated to blend heritage character with modern amenities." },
                    { type: "Contemporary Rebuilds", range: "$5M - $12M+", desc: "Some lots in Shaughnessy have seen heritage homes replaced or substantially renovated into modern luxury residences. These properties combine Shaughnessy's exceptional lot sizes with contemporary design and finishes, though heritage guidelines in conservation areas regulate what is permissible." },
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
                  Shaughnessy properties represent Vancouver&apos;s ultimate trophy real estate. The combination of heritage designation, irreplaceable lot sizes, mature landscaping, and a century of prestige creates a market with extremely limited supply and a global buyer pool.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Shaughnessy is a trophy market that operates on different dynamics than the broader Vancouver market. Heritage conservation protections ensure that the neighbourhood&apos;s character will be preserved, while the finite supply of large lots in a city that is running out of land supports long-term value. For ultra-high-net-worth buyers seeking a legacy property in one of Canada&apos;s most desirable cities, Shaughnessy is the definitive choice.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Shaughnessy is a residential neighbourhood where most residents rely on personal vehicles, though public transit is accessible along the neighbourhood&apos;s edges:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "Bus", detail: "Bus routes run along Oak Street, Granville Street, and 41st Avenue on the neighbourhood's perimeter. The Oakridge-41st SkyTrain station on the Canada Line is a short drive or bus ride to the southeast, providing rapid transit access to downtown, the airport, and Richmond." },
                    { mode: "Cycling", detail: "The neighbourhood's quiet, low-traffic streets are pleasant for cycling, and the Arbutus Greenway is accessible to the west. However, Shaughnessy's hilly terrain and the distances to commercial areas make cycling more recreational than practical for most residents." },
                    { mode: "Driving", detail: "Granville Street, Oak Street, and 41st Avenue provide direct routes throughout the city. Downtown is approximately 15 minutes, UBC about 15 minutes, and the airport is accessible via Granville Street or Oak Street to the Arthur Laing Bridge in approximately 20 minutes." },
                    { mode: "Walking", detail: "Shaughnessy's wide sidewalks and magnificent tree-lined streets make for exceptional walking within the neighbourhood. VanDusen Botanical Garden and the South Granville shopping district are within walking distance of many properties. The neighbourhood's curving streets and heritage homes make every walk an architectural tour." },
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
                  While Shaughnessy itself feels like a private park with its lush landscaping and towering trees, the neighbourhood is also home to some of Vancouver&apos;s finest formal green spaces:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "VanDusen Botanical Garden", desc: "A 22-hectare botanical garden on Shaughnessy's southern boundary, featuring over 7,500 plant species from around the world. It includes a hedge maze, seasonal light festivals, educational programs, and some of the most beautiful cultivated landscapes in Western Canada. A membership to VanDusen is a cherished benefit of living in the area." },
                    { name: "Shaughnessy Park", desc: "A quiet, beautifully maintained neighbourhood park in the heart of the residential area. It offers a playground, open green space, and a peaceful setting surrounded by heritage homes. It is a favourite among families with young children and those seeking a tranquil outdoor space." },
                    { name: "Crescent Park", desc: "A small but charming green space along The Crescent, Shaughnessy's most prestigious street. This heritage park features mature trees, walking paths, and views of some of the neighbourhood's grandest mansions. It embodies the genteel character of First Shaughnessy." },
                    { name: "Montgomery Park", desc: "Located on the neighbourhood's edge, this park provides playing fields and recreational space. It serves as a venue for local sports activities and offers an open green counterpoint to the more manicured gardens of Shaughnessy's interior." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  Beyond these formal parks, the streets of Shaughnessy themselves function as green corridors. The towering plane trees, copper beeches, and native conifers that line the boulevards create a canopy that transforms every walk into a nature experience. Many private gardens in the neighbourhood are horticultural masterpieces in their own right, and several are opened to the public during annual garden tours.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Shaughnessy is surrounded by some of Vancouver&apos;s most prestigious educational institutions. The neighbourhood&apos;s central location provides access to an exceptional range of both public and private schools, making it one of the strongest education catchments in the city.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Shaughnessy Elementary", type: "K-7 Public", detail: "The neighbourhood's own elementary school, located in the heart of Shaughnessy. It offers strong academics, a supportive community, and the unique advantage of being surrounded by one of Vancouver's most beautiful residential settings." },
                      { name: "Eric Hamber Secondary", type: "8-12 Public", detail: "A well-regarded public high school serving the Shaughnessy area, known for its strong academics, diverse student body, and comprehensive athletics and arts programs." },
                      { name: "Prince of Wales Secondary", type: "8-12 Public", detail: "One of Vancouver's highest-performing public secondary schools, accessible from Shaughnessy's western edge. Known for its mini school program, strong academics, and competitive athletics." },
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
                      { name: "York House School", type: "K-12 Private (Girls)", detail: "One of Vancouver's most prestigious all-girls schools, located on the edge of Shaughnessy. Known for academic excellence, strong arts programs, and leadership development in a nurturing environment." },
                      { name: "Little Flower Academy", type: "8-12 Private (Girls)", detail: "A respected Catholic all-girls secondary school in the Shaughnessy area, known for its strong academics, values-based education, and a supportive community environment." },
                      { name: "Vancouver College", type: "K-12 Private", detail: "A well-established Catholic school for boys located near Shaughnessy, offering excellent academic and athletic programs with a strong tradition of character development." },
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
                  Shaughnessy&apos;s central location also provides convenient access to Crofton House School, St. George&apos;s School, and numerous other private institutions that are concentrated on Vancouver&apos;s west side. The neighbourhood has long been a preferred address for families who prioritize education, and the density of excellent schools nearby reflects this.
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
                    The South Granville shopping district, running along Granville Street on Shaughnessy&apos;s eastern boundary, is one of Vancouver&apos;s most upscale commercial strips. It features art galleries, designer boutiques, fine dining restaurants, and specialty shops that cater to discerning tastes.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Shaughnessy itself has no commercial streets, which is by deliberate design. The neighbourhood was planned as a purely residential enclave, and this commercial absence is part of what gives it such a tranquil, estate-like character. However, some of Vancouver&apos;s best shopping and dining is just steps beyond the neighbourhood&apos;s borders.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  South Granville, along the neighbourhood&apos;s eastern edge, is a premier destination for art galleries, designer clothing, home furnishings, and fine dining. Galleries like the Equinox and Bau-Xi have made this stretch Vancouver&apos;s unofficial gallery row, and restaurants here range from acclaimed West Coast fine dining to sophisticated European-inspired bistros.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Kerrisdale Village, to the southwest, offers a more complete range of everyday shopping, including bookstores, cafes, bakeries, and grocery stores. The Cambie Corridor, to the east, provides additional shopping options, and the expanding Oakridge Centre is set to become one of the city&apos;s most significant retail destinations upon completion.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For groceries and everyday needs, residents typically make short trips to the surrounding commercial areas. The trade-off of not having shops within the neighbourhood is the extraordinary quietness and residential purity that makes Shaughnessy the distinctive place it is.
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
