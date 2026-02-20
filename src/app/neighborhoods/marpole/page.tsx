import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/forms/ContactForm";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";

export const metadata: Metadata = {
  title: "Marpole Vancouver Real Estate Guide 2026 | Homes, Condos & Market Data",
  description:
    "Your complete guide to Marpole, Vancouver. Explore real estate, schools, parks, transit, and lifestyle in one of Vancouver's oldest and most affordable south-side neighborhoods. By Aparna Kapur, Oakwyn Realty.",
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
    question: "Is Marpole a good neighborhood to buy in?",
    answer:
      "Marpole is one of the best value propositions on Vancouver's west side. With a median home price around $1.4M — well below neighboring Oakridge or Kerrisdale — it offers strong fundamentals including Canada Line SkyTrain access at Marine Drive, proximity to YVR, and a major community plan bringing new density and amenities. For buyers looking for long-term appreciation in a family-friendly setting, Marpole is a compelling choice.",
  },
  {
    question: "How much does a home cost in Marpole?",
    answer:
      "Marpole offers a range of housing options. Condos typically start in the low $400Ks to $700K range, townhomes from $900K to $1.4M, and detached homes from $1.5M to $3M+. The median list price across all property types is approximately $1.4M, making it one of Vancouver's more accessible west-side neighborhoods.",
  },
  {
    question: "What is the Marpole Community Plan?",
    answer:
      "The Marpole Community Plan, adopted by Vancouver City Council, guides growth and development in the neighborhood through 2040. It allows for increased density along Cambie Street, Granville Street, and SW Marine Drive while preserving the character of interior residential streets. The plan envisions new housing, improved parks, better pedestrian and cycling connections, and enhanced commercial areas — all while respecting Marpole's historic identity.",
  },
  {
    question: "What schools are in the Marpole area?",
    answer:
      "Marpole has several well-regarded schools. Elementary options include David Lloyd George Elementary and Sir Wilfrid Laurier Elementary. Sir Winston Churchill Secondary serves as the local high school and is known for strong academics and extracurricular programs. Langara College, a respected post-secondary institution, is also located just north of the neighborhood.",
  },
  {
    question: "How do I get around from Marpole?",
    answer:
      "Marpole has excellent transit access via the Marine Drive SkyTrain station on the Canada Line. Downtown Vancouver is about 20 minutes by SkyTrain, and Vancouver International Airport (YVR) is just two stops away — roughly 7 minutes. Major bus routes run along Granville Street, Marine Drive, and Cambie Street. Drivers benefit from direct access to the Arthur Laing Bridge (to YVR), the Oak Street Bridge (to Richmond), and Granville Street heading north.",
  },
];

const marpoleData = NEIGHBOURHOODS["marpole"];

export default async function MarpolePage() {
  const pois = await fetchNeighbourhoodPOIs(marpoleData.center);

  return (
    <>
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
          <p className="text-xl text-teal-200 font-medium mb-2">
            Historic Charm Meets Modern Living
          </p>
          <p className="text-white/70 max-w-2xl text-lg">
            One of Vancouver&apos;s oldest neighborhoods offering family-friendly living,
            excellent value, and a community on the rise.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.4M</p>
              <p className="text-xs text-warm-500 mt-1">Median Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">1870s</p>
              <p className="text-xs text-warm-500 mt-1">Established</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">20 min</p>
              <p className="text-xs text-warm-500 mt-1">To Downtown</p>
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
                    ["living", "Living in Marpole"],
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
                      ["South Cambie", "south-cambie"],
                      ["Kerrisdale", "kerrisdale"],
                      ["Cambie Corridor", "cambie-corridor"],
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
                  Explore Marpole
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Discover transit stations, schools, parks, and key landmarks in and around Marpole.
                </p>
                <NeighbourhoodMap
                  center={marpoleData.center}
                  zoom={marpoleData.zoom}
                  pois={pois.length > 0 ? pois : marpoleData.fallbackPOIs}
                  boundaryName="Marpole"
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
                  Marpole is one of Vancouver&apos;s oldest and most storied neighborhoods, with roots stretching back to the 1870s when it served as a hub for fishing and lumber operations along the Fraser River. Located at the southern tip of Vancouver &mdash; bordered by West 57th Avenue to the north, the Fraser River to the south, Oak Street to the east, and the western edge near Celtic Avenue &mdash; Marpole occupies a strategic position between the city core and the communities of Richmond and the Vancouver International Airport.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Today, Marpole is a neighborhood in transition. Its tree-lined residential streets are filled with a mix of charming post-war bungalows, character homes from the early 20th century, and an increasing number of modern condominiums and townhome developments. The Marpole Community Plan is guiding thoughtful densification along major corridors while preserving the quiet, family-oriented character of interior streets that residents love.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  What draws many buyers to Marpole is its remarkable value relative to surrounding areas. With a median home price of approximately $1.4M &mdash; well below Oakridge, Kerrisdale, or South Cambie &mdash; Marpole offers an entry point into Vancouver&apos;s west side that is increasingly rare. Add in the Marine Drive SkyTrain station, proximity to YVR, and a growing community of shops and restaurants, and it&apos;s easy to see why Marpole is gaining attention from savvy buyers and investors alike.
                </p>
              </section>

              {/* Living in Marpole */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Marpole
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marpole has a warm, unpretentious character that sets it apart from many of Vancouver&apos;s more polished neighborhoods. This is a place where families put down roots, where neighbors know each other by name, and where the pace of life feels just a little slower than the urban buzz of areas closer to downtown. The community is remarkably diverse, with longtime residents of European heritage living alongside newer arrivals from South and East Asia, creating a rich cultural tapestry that shows up in the food, the festivals, and the everyday rhythm of the neighborhood.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock reflects Marpole&apos;s layered history. You&apos;ll find lovingly maintained 1940s and 1950s bungalows on generous lots, mid-century ranchers with mature gardens, and newer low-rise apartment buildings and townhome complexes that have sprung up as the community plan takes effect. This mix gives Marpole a visual variety that newer, more homogeneous neighborhoods sometimes lack.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in Marpole</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Start your morning with a coffee and fresh pastry from one of the bakeries on Granville Street. Walk the kids to David Lloyd George Elementary, then hop on the Canada Line at Marine Drive &mdash; you&apos;ll be at your downtown office in 20 minutes flat. After work, pick up groceries at one of the neighborhood&apos;s excellent Asian supermarkets or the local farmers&apos; market. On weekends, take the family to the Fraser River Trail for a bike ride, explore the playgrounds at Marpole Park, or drive ten minutes to Richmond for dim sum at some of the best Chinese restaurants in North America.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Marpole is also a gateway neighborhood. Its southern location means you&apos;re closer to YVR than almost anywhere else in Vancouver, making it ideal for frequent travelers. Richmond&apos;s world-class shopping and dining are minutes away via the Oak Street Bridge or Arthur Laing Bridge. And yet, when you come home, you return to quiet, leafy streets that feel worlds away from the bustle.
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
                    { type: "Condominiums", range: "$400K - $750K", desc: "Modern units in newer low-rise and mid-rise buildings, many within walking distance of the Marine Drive SkyTrain station. Popular with first-time buyers, young professionals, and investors." },
                    { type: "Townhomes", range: "$900K - $1.4M", desc: "Multi-level homes in newer developments along Cambie and Granville corridors. Increasingly popular with growing families seeking more space than a condo without the price tag of a detached home." },
                    { type: "Detached Homes", range: "$1.5M - $3.0M+", desc: "Single-family homes ranging from original character bungalows with renovation potential to newer custom builds. Lot sizes are often generous compared to other west-side neighborhoods." },
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
                  The overall median list price in Marpole is approximately $1.4M, which represents strong value compared to adjacent neighborhoods like Oakridge ($1.6M) or Kerrisdale ($3.2M). This price differential, combined with Marpole&apos;s improving amenities and transit access, has made it one of the more watched neighborhoods among real estate investors.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    The Marpole Community Plan is unlocking significant new development along Cambie Street, Granville Street, and SW Marine Drive. As density increases and new amenities arrive, property values in Marpole are expected to appreciate. The neighborhood&apos;s proximity to the Canada Line and YVR provides a durable demand floor that protects against downside risk.
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
                    { mode: "SkyTrain", detail: "Marine Drive station on the Canada Line provides rapid transit to downtown Vancouver (20 min) and YVR Airport (7 min). The Langara-49th Avenue station is also accessible at the neighborhood's northern edge." },
                    { mode: "Bus", detail: "Frequent bus service along Granville Street (10), Marine Drive (100), Cambie Street (15), and Oak Street (17). The #10 Granville bus connects directly to downtown and Granville Island." },
                    { mode: "Cycling", detail: "The Ontario Street and Heather Street bike routes serve the eastern side of Marpole. The Arbutus Greenway, a dedicated cycling and pedestrian corridor, runs nearby. The Fraser River Trail offers scenic recreational riding." },
                    { mode: "Driving", detail: "Excellent road access via Granville Street, Oak Street, and Cambie Street heading north. The Arthur Laing Bridge connects directly to YVR, and the Oak Street Bridge provides fast access to Richmond and Highway 99 south to the US border." },
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
                  For frequent flyers, Marpole is hard to beat. YVR is just two SkyTrain stops &mdash; or a 10-minute drive &mdash; from the heart of the neighborhood. This proximity to the airport is a genuine lifestyle advantage that few other Vancouver neighborhoods can match, making Marpole particularly popular with professionals who travel regularly for work.
                </p>
              </section>

              {/* Parks & Recreation */}
              <section id="parks" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Parks &amp; Recreation
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marpole offers residents a generous amount of green space, from pocket parks to the expansive Fraser River waterfront:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Marpole Park", desc: "The neighborhood's central gathering place, featuring sports fields, a playground, tennis courts, and a community centre that hosts programs for all ages. The park is a hub for youth sports leagues, summer camps, and community events throughout the year." },
                    { name: "Winona Park", desc: "A beautifully maintained neighborhood park with mature trees, walking paths, a children's playground, and open green space. A favorite spot for dog walkers and families with young children." },
                    { name: "Oak Park", desc: "A well-used community park with sports facilities, a wading pool, a playground, and picnic areas. Home to community gardens where residents grow vegetables and flowers." },
                    { name: "Fraser River Trail", desc: "One of Marpole's greatest natural assets. This waterfront trail stretches along the Fraser River's north arm, offering stunning views of the river, opportunities for birdwatching, cycling, and walking. It connects to the broader regional trail network and provides a peaceful escape from the city." },
                  ].map((park) => (
                    <div key={park.name} className="bg-warm-50 rounded-xl p-5">
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Marpole Community Plan also calls for expanded and improved park spaces as the neighborhood grows. New pocket parks, improved pedestrian connections to the Fraser River, and enhanced community facilities are all part of the long-term vision for the area.
                </p>
              </section>

              {/* Schools & Education */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Schools &amp; Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Marpole is home to well-regarded public schools and is within reach of several private and post-secondary options:
                </p>
                <div className="space-y-3 mb-6">
                  <h3 className="font-serif text-lg text-teal-900">Public Schools</h3>
                  {[
                    { name: "David Lloyd George Elementary", type: "K-7 Public", detail: "A cornerstone of the Marpole community, offering strong academic programs, French Immersion, and a welcoming, diverse student body." },
                    { name: "Sir Wilfrid Laurier Elementary", type: "K-7 Public", detail: "Known for its inclusive community and solid academic foundation. Offers a range of enrichment programs and extracurricular activities." },
                    { name: "J.W. Sexsmith Elementary", type: "K-7 Public", detail: "Serves the eastern portion of Marpole with strong community engagement and a focus on individual student growth." },
                    { name: "Sir Winston Churchill Secondary", type: "8-12 Public", detail: "The local high school, located at the Oakridge-Marpole border. Consistently ranked among Vancouver's top public secondaries, with strong academics, athletics, and arts programs." },
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
                  <h3 className="font-serif text-lg text-teal-900">Post-Secondary &amp; Nearby Options</h3>
                  {[
                    { name: "Langara College", type: "Post-Secondary", detail: "Located just north of Marpole at 49th and Cambie, Langara serves over 23,000 students and offers university transfer programs, career training, and continuing studies." },
                    { name: "BCIT Aerospace Campus", type: "Post-Secondary", detail: "Located near the Richmond border, BCIT's aerospace campus is easily accessible from Marpole and offers specialized technical training programs." },
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
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marpole&apos;s dining and shopping scene has been quietly blossoming in recent years, driven by the neighborhood&apos;s growing diversity and the arrival of new residents. The Granville Street corridor between 67th and 71st Avenues serves as Marpole&apos;s commercial heart, with a mix of longtime local businesses and exciting new additions.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The restaurant scene along Granville Street is particularly noteworthy. You&apos;ll find excellent Vietnamese pho houses, authentic Korean barbecue, neighborhood Italian trattorias, Japanese ramen shops, and cozy brunch spots that have become local institutions. The diversity of the food mirrors the diversity of the community, and many Marpole restaurants offer quality that rivals more well-known dining districts at friendlier prices.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Marine Drive also offers a commercial strip with grocery stores, banks, pharmacies, and everyday services. Several large Asian supermarkets in the area provide outstanding produce and specialty ingredients. For larger shopping excursions, the Richmond Centre and Aberdeen Centre malls are just across the bridge &mdash; a five-minute drive from most parts of Marpole.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  As the Marpole Community Plan brings more density and foot traffic to the neighborhood, expect the commercial landscape to continue improving. New mixed-use developments along Cambie and Granville will add ground-floor retail and dining, further enhancing the neighborhood&apos;s walkability and convenience.
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
                      Thinking About Marpole?
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Whether you&apos;re looking to buy your first home, upgrade to a detached
                      property, or invest in one of Vancouver&apos;s most promising neighborhoods
                      &mdash; I&apos;d love to help. Let&apos;s start with a no-pressure
                      conversation about your goals.
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
