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
  title: "Marpole Vancouver Homes for Sale | Prices & Area Guide",
  description:
    "Homes for sale in Marpole, Vancouver, with the current MLS® HPI benchmark, price trends by property type, transit to YVR and downtown, schools, and local detail.",
  keywords: [
    "Marpole Vancouver real estate",
    "Marpole homes for sale",
    "Marpole Vancouver condos",
    "Marpole neighborhood guide",
    "buy home Marpole Vancouver",
    "Marine Drive Vancouver real estate",
    "Marpole community plan",
  ],
};

const faqs = [
  {
    question: "What is the average home price in Marpole, Vancouver?",
    answer:
      "The GVR MLS® HPI composite benchmark for Marpole is $1.11M (July 2026). Condos average around $683K. Townhouse and detached benchmarks vary widely with limited HPI coverage at the neighbourhood level. For a detailed pricing breakdown and current listings, contact Aparna Kapur at 604-612-7694 — she specializes in Vancouver's south-side neighbourhoods and can provide up-to-date market analysis.",
  },
  {
    question: "Is Marpole a good neighbourhood to buy in?",
    answer:
      "Yes — Marpole is one of the best values on Vancouver's west side. At $1.11M benchmark, it is well below Oakridge ($1.47M), Kerrisdale ($2.01M), and South Cambie ($1.45M). The neighbourhood offers Canada Line access at Marine Drive station, a vibrant Marine Drive shopping corridor, generous parks like Marpole Park and Winona Park, and a community plan bringing new density and amenities. Its affordability relative to neighbouring west-side areas makes it a compelling choice for long-term appreciation.",
  },
  {
    question: "What transit is near Marpole?",
    answer:
      "Marpole is served by the Canada Line's Marine Drive station, which gets you downtown in 20 minutes and to YVR airport in just 7 minutes (two stops). Frequent bus routes run along Granville (#10), Marine Drive (#100), Cambie (#15), and Oak (#17). Drivers have direct access to the Arthur Laing Bridge (YVR), Oak Street Bridge (Richmond and Highway 99 south), and Granville Street heading north. The proximity to YVR makes Marpole especially popular with frequent travellers.",
  },
  {
    question: "What schools are in Marpole?",
    answer:
      "Marpole has several well-regarded public schools. Elementary options include David Lloyd George Elementary (K-7, with French Immersion), Sir Wilfrid Laurier Elementary, and J.W. Sexsmith Elementary. For high school, Sir Winston Churchill Secondary sits at the Oakridge-Marpole border and is ranked among Vancouver's top public secondaries for academics, athletics, and arts. Langara College (23,000+ students) is just north of the neighbourhood at 49th and Cambie.",
  },
  {
    question: "Who is the best realtor for Marpole Vancouver?",
    answer:
      "Aparna Kapur with Oakwyn Realty is a top choice for Marpole real estate. She lives on Vancouver's south side and has deep knowledge of Marpole's streets, pricing trends, and the Community Plan's impact on property values. Whether you are buying your first condo near Marine Drive or selling a detached home, Aparna provides honest, data-driven guidance. Reach her at 604-612-7694.",
  },
];

const marpoleData = NEIGHBOURHOODS["marpole"];

export default async function MarpolePage() {
  const pois = await fetchNeighbourhoodPOIs(marpoleData.center);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Neighbourhoods", href: "/neighborhoods" },
          { name: "Marpole", href: "/neighborhoods/marpole" },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1417252/pexels-photo-1417252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Marpole</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Marpole, Vancouver
          </h1>
        </div>
      </section>

      <NeighbourhoodListings slug="marpole" />

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="hidden lg:block" />
            <div className="lg:col-span-3">
              <div className="grid grid-cols-3 gap-6 max-w-2xl">
                <div>
                  <p className="font-serif text-2xl text-teal-700">{NEIGHBOURHOODS["marpole"].avgPrice}</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">7 min</p>
                  <p className="text-xs text-warm-500 mt-1">To YVR Airport</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">1</p>
                  <p className="text-xs text-warm-500 mt-1">SkyTrain Station</p>
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
                  ["living", "Living in Marpole", "2"],
                  ["real-estate", "Real Estate Market", "3"],
                  ["transit", "Getting Around", "4"],
                  ["parks", "Parks", "5"],
                  ["schools", "Education", "6"],
                  ["shopping", "Shopping & Dining", "7"],
                  ["faq", "FAQ", "8"],
                  ["related", "Related Areas", "9"],
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
                      ["Sunset", "sunset"],
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
                  Marpole is one of Vancouver&apos;s oldest neighborhoods, with roots in the 1870s as a fishing and lumber hub along the Fraser River. At the city&apos;s southern tip, it sits between the core and Richmond/YVR, bounded by 57th Avenue, the Fraser River, Oak Street, and Celtic Avenue.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The streets hold post-war bungalows, early 20th-century character homes, and a growing number of modern condos and townhomes. The Marpole Community Plan guides densification along major corridors while preserving the quiet, family-friendly interior streets.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  At $1.11M benchmark, Marpole is well below Oakridge ($1.47M), Kerrisdale ($2.01M), and South Cambie ($1.45M). With Marine Drive SkyTrain, proximity to YVR, and growing shops and restaurants, it is attracting savvy buyers and investors.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  <Link href="/buying/search" className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">Browse current Marpole listings</Link> to see what is available right now.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={marpoleData.center}
                  zoom={marpoleData.zoom}
                  pois={pois.length > 0 ? pois : marpoleData.fallbackPOIs}
                  boundaryName="Marpole"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Marpole */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Marpole
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marpole is warm and unpretentious. Families put down roots, neighbors know each other, and the pace is slower than areas closer to downtown. The community is diverse, with longtime European residents alongside South and East Asian arrivals, creating a cultural mix that shapes the food, festivals, and daily rhythm.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Housing reflects Marpole&apos;s layered history: maintained 1940s and 1950s bungalows on generous lots, mid-century ranchers with mature gardens, and newer low-rise apartments and townhomes. This mix gives visual variety that more homogeneous neighborhoods lack.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in Marpole</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Coffee and pastries on Granville Street. Walk the kids to David Lloyd George Elementary, then Canada Line to your downtown office in 20 minutes. Groceries from the neighborhood&apos;s Asian supermarkets or farmers&apos; market. Weekends: Fraser River Trail bike rides, Marpole Park, or a ten-minute drive to Richmond for some of North America&apos;s best dim sum.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Marpole is closer to YVR than almost anywhere in Vancouver, ideal for frequent travelers. Richmond&apos;s shopping and dining are minutes away via the Oak Street or Arthur Laing bridges. Yet you come home to quiet, leafy streets.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Marpole Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marpole offers a broad spectrum of housing options, making it accessible to everyone from first-time buyers to families seeking a detached home:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$450K - $850K", desc: "Modern low-rise and mid-rise units, many walkable to Marine Drive SkyTrain. GVR benchmark: $709K. Popular with first-time buyers and investors." },
                    { type: "Townhomes", range: "$1.2M - $1.8M", desc: "Newer developments along Cambie and Granville. GVR benchmark: $1.49M. Popular with growing families." },
                    { type: "Detached Homes", range: "$1.8M - $3.0M+", desc: "Character bungalows to newer custom builds. GVR benchmark: $2.12M. Lot sizes often generous compared to other west-side areas." },
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
                  GVR MLS® HPI composite benchmark: $1.11M (July 2026, -10.4% YoY). Strong value versus Oakridge ($1.43M) and Kerrisdale ($1.96M). Improving amenities and transit make it one of the most-watched neighborhoods among investors.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    The Marpole Community Plan is unlocking development along Cambie, Granville, and SW Marine Drive. As density and amenities grow, values should appreciate. Proximity to the Canada Line and YVR provides a durable demand floor.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Marpole&apos;s southern location and strong transit connections make it surprisingly well-connected:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Marine Drive station: downtown in 20 min, YVR in 7 min. Langara-49th station also accessible at the neighbourhood's northern edge." },
                    { mode: "Bus", detail: "Frequent service on Granville (10), Marine Drive (100), Cambie (15), and Oak (17). The #10 connects to downtown and Granville Island." },
                    { mode: "Cycling", detail: "Ontario Street and Heather Street bike routes serve the east side. The Arbutus Greenway runs nearby. Fraser River Trail offers scenic riding." },
                    { mode: "Driving", detail: "Granville, Oak, and Cambie streets head north. Arthur Laing Bridge to YVR; Oak Street Bridge to Richmond and Highway 99 south." },
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
                  YVR is just two SkyTrain stops or a 10-minute drive away. Few Vancouver neighborhoods match this airport proximity, making Marpole popular with frequent travelers.
                </p>
              </section>

              {/* Parks */}
              <section id="parks" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Parks
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marpole offers residents a generous amount of green space, from pocket parks to the expansive Fraser River waterfront:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Marpole Park", desc: "Sports fields, playground, tennis courts, and a community centre with programs for all ages. Hub for youth sports and community events." },
                    { name: "Winona Park", desc: "Mature trees, walking paths, playground, and open green space. Popular with dog walkers and young families." },
                    { name: "Oak Park", desc: "Sports facilities, wading pool, playground, picnic areas, and community gardens." },
                    { name: "Fraser River Trail", desc: "Waterfront trail along the Fraser River's north arm with views, birdwatching, cycling, and walking. Connects to the regional trail network." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Community Plan calls for new pocket parks, improved pedestrian connections to the Fraser River, and enhanced facilities as the neighborhood grows.
                </p>
              </section>

              {/* Education */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Marpole is home to well-regarded public schools and is within reach of several private and post-secondary options:
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "David Lloyd George Elementary", type: "K-7 Public", detail: "Strong academics, French Immersion, and a diverse student body." },
                      { name: "Sir Wilfrid Laurier Elementary", type: "K-7 Public", detail: "Inclusive community with enrichment programs and extracurriculars." },
                      { name: "J.W. Sexsmith Elementary", type: "K-7 Public", detail: "Serves eastern Marpole with strong community engagement." },
                      { name: "Sir Winston Churchill Secondary", type: "8-12 Public", detail: "At the Oakridge-Marpole border. Ranked among Vancouver's top public secondaries for academics, athletics, and arts." },
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
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Post-Secondary &amp; Nearby Options</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Langara College", type: "Post-Secondary", detail: "At 49th and Cambie, serving 23,000+ students with university transfer, career training, and continuing studies." },
                      { name: "BCIT Aerospace Campus", type: "Post-Secondary", detail: "Near the Richmond border, offering specialized technical training." },
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
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Granville Street between 67th and 71st Avenues is Marpole&apos;s commercial heart, mixing longtime locals with new arrivals.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The restaurant scene stands out: Vietnamese pho, Korean barbecue, Italian trattorias, Japanese ramen, and cozy brunch spots. Quality rivals pricier dining districts at friendlier prices.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marine Drive has grocery stores, banks, and everyday services. Large Asian supermarkets offer outstanding produce. Richmond Centre and Aberdeen Centre malls are a five-minute drive across the bridge.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  New mixed-use developments along Cambie and Granville will add ground-floor retail and dining as the Community Plan brings more density.
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

      {/* Related Neighbourhoods */}
      <section id="related" className="py-16 bg-warm-50 border-t border-warm-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-teal-950 mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { title: "Best Neighbourhoods in Vancouver for Families (2026)", slug: "best-neighborhoods-vancouver-families-2026", category: "Neighbourhoods" },
              { title: "Cambie Corridor Rezoning 2025: What Homeowners Need to Know", slug: "cambie-corridor-rezoning-2025-what-homeowners-need-to-know", category: "Market Analysis" },
              { title: "First-Time Buyer Programs in BC (2026)", slug: "first-time-buyer-programs-bc-2026", category: "Buyer Resources" },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="block bg-white rounded-xl p-5 border border-warm-100 hover:border-teal-200 hover:shadow-sm transition-all group"
              >
                <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold">{post.category}</span>
                <h3 className="font-serif text-sm text-teal-900 mt-1 group-hover:text-teal-700 transition-colors leading-snug">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
          <h2 className="font-serif text-3xl text-teal-950 mb-8 text-center">
            Related Neighbourhoods
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Oakridge", href: "/neighborhoods/oakridge" },
              { name: "South Cambie", href: "/neighborhoods/south-cambie" },
              { name: "Kerrisdale", href: "/neighborhoods/kerrisdale" },
              { name: "Sunset", href: "/neighborhoods/sunset" },
            ].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="bg-white rounded-xl p-5 text-center border border-warm-100 hover:border-teal-200 hover:shadow-md transition-all group"
              >
                <p className="font-serif text-lg text-teal-900 group-hover:text-teal-700 transition-colors">
                  {n.name}
                </p>
                <p className="text-xs text-warm-500 mt-1">View Guide &rarr;</p>
              </Link>
            ))}
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
      <MarketPriceLinks slug="marpole" />
    </>
  );
}
