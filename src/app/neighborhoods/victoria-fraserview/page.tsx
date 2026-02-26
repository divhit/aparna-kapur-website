import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Victoria-Fraserview Vancouver Real Estate Guide 2026 | Homes & Market Data",
  description:
    "The definitive guide to Victoria-Fraserview, Vancouver. Explore established real estate, Fraserview Golf Course, river views, Victoria Drive dining, parks, and multicultural living. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Victoria-Fraserview Vancouver real estate",
    "Victoria-Fraserview homes for sale",
    "Fraserview Golf Course",
    "Victoria-Fraserview neighborhood guide",
    "buy home Victoria-Fraserview Vancouver",
    "Victoria Drive Vancouver",
    "south Vancouver real estate",
    "Fraser River views Vancouver",
  ],
};

const faqs = [
  {
    question: "Is Victoria-Fraserview a good neighborhood to buy a home in?",
    answer:
      "Victoria-Fraserview is an excellent choice for buyers seeking established detached homes with space, river views, and good value relative to the Vancouver market. The neighborhood offers a quiet, family-friendly environment with mature streets, the renowned Fraserview Golf Course, and proximity to Everett Crowley Park. Its multicultural community, improving amenities, and location in a part of the city poised for long-term growth make it attractive for both families and investors.",
  },
  {
    question: "How much does a home cost in Victoria-Fraserview Vancouver?",
    answer:
      "Victoria-Fraserview offers solid value in the Vancouver detached home market. The composite benchmark price across all property types is approximately $1.2M. Detached homes typically range from $1.3M to $1.8M, with some properties offering river views commanding a premium. Condominiums, found mainly in newer developments, range from $450K to $700K. The neighborhood provides significantly more space per dollar than west-side alternatives.",
  },
  {
    question: "What is the Fraserview Golf Course?",
    answer:
      "Fraserview Golf Course is a beautiful public 18-hole championship golf course operated by the City of Vancouver. It offers stunning views of the Fraser River and the North Shore mountains and is considered one of the best public courses in the Lower Mainland. The course draws golfers from across the region and is a major amenity for the neighborhood. The adjacent driving range and clubhouse add to the recreational value.",
  },
  {
    question: "Are there river views in Victoria-Fraserview?",
    answer:
      "Yes, Victoria-Fraserview is one of the few Vancouver neighborhoods where some residential properties enjoy views of the Fraser River. Homes on the higher ground in the southern part of the neighborhood can have river and mountain views that are quite spectacular. The Fraserview Golf Course and Riverfront Park provide public access to river views and waterfront green space for all residents.",
  },
  {
    question: "How do I get around from Victoria-Fraserview?",
    answer:
      "Victoria-Fraserview is served by bus routes along Victoria Drive, 49th Avenue, Knight Street, and other arterials. The Joyce-Collingwood SkyTrain Station on the Expo Line is accessible from the northern part of the neighborhood, providing rapid transit to downtown in approximately 20-25 minutes. Driving access is convenient via Knight Street (connecting to the Knight Street Bridge and Richmond), 49th Avenue, and Victoria Drive. The neighborhood's central south Vancouver location provides good access in all directions.",
  },
];

const victoriaFraserviewData = NEIGHBOURHOODS["victoria-fraserview"];

export default async function VictoriaFraserviewPage() {
  const pois = await fetchNeighbourhoodPOIs(victoriaFraserviewData.center);

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
            <span className="text-teal-200">Victoria-Fraserview</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Victoria-Fraserview, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">$1.2M</p>
                  <p className="text-xs text-warm-500 mt-1">Benchmark Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">River</p>
                  <p className="text-xs text-warm-500 mt-1">Views Available</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">18-Hole</p>
                  <p className="text-xs text-warm-500 mt-1">Fraserview Golf</p>
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
                  ["living", "Living in Victoria-Fraserview", "2"],
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
                      ["Sunset", "sunset"],
                      ["Killarney", "killarney"],
                      ["Renfrew-Collingwood", "renfrew-collingwood"],
                      ["Marpole", "marpole"],
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
                  Victoria-Fraserview is an established residential neighborhood in south Vancouver, bounded roughly by 41st Avenue to the north, the Fraser River to the south, Knight Street to the west, and Boundary Road to the east. Named after two of its defining features, Victoria Drive and the Fraser River viewpoints, the neighborhood offers something increasingly rare in Vancouver: spacious detached homes on generous lots in a quiet, family-oriented setting with river and mountain views.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighborhood&apos;s most prominent landmark is the Fraserview Golf Course, a beautiful 18-hole public course that occupies a large swath of the southern part of the area. The course, with its sweeping views of the Fraser River and the mountains beyond, is one of the best public golf facilities in the Lower Mainland and a major amenity for residents. Adjacent to the golf course, Everett Crowley Park adds further green space and trail networks.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Like its neighboring communities, Victoria-Fraserview is culturally diverse, with significant Chinese, South Asian, Filipino, and Vietnamese populations that have shaped the neighborhood&apos;s character over decades. The result is a community that is authentic, welcoming, and grounded, with a food scene and local businesses that reflect the genuine cultures of the people who live here.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={victoriaFraserviewData.center}
                  zoom={victoriaFraserviewData.zoom}
                  pois={pois.length > 0 ? pois : victoriaFraserviewData.fallbackPOIs}
                  boundaryName="Victoria-Fraserview"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Victoria-Fraserview */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Victoria-Fraserview
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Victoria-Fraserview is a neighborhood that rewards those who discover it. The residential streets are wide and quiet, with mature trees and well-maintained homes that give the area a settled, established character. Unlike the busier, denser parts of Vancouver, life here moves at a gentler pace.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing is predominantly detached homes, many from the 1960s and 1970s, sitting on generous lots that provide the kind of yard space that is a luxury in most of Vancouver. A growing number of homes have been renovated or rebuilt, and laneway houses are increasingly common. Some properties in the southern part of the neighborhood enjoy views of the Fraser River that can be quite spectacular, particularly at sunset when the water reflects the sky and the mountains glow in the distance.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A typical day might start with a round of golf at Fraserview or a walk through Everett Crowley Park, where the trails offer surprising views of the city skyline and the North Shore mountains. Children walk to David Thompson Secondary or one of the local elementary schools. The afternoon might include a stop at one of the Vietnamese, Chinese, or South Asian restaurants along Victoria Drive. Weekends could mean a family outing to the riverfront, a community event at the Fraserview library, or simply enjoying the generous backyard space that most homes in the neighborhood offer.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Victoria-Fraserview is a neighborhood for those who value space, quiet, and a connection to nature, all within the city limits of Vancouver. It is an honest, unpretentious community where families build real lives.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Victoria-Fraserview Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Victoria-Fraserview offers good value for detached homes in Vancouver, with the added bonus of potential river views and proximity to major green spaces:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.3M - $1.8M", desc: "The primary housing type in the neighborhood. Most homes date from the 1960s-1970s on generous lots, with many renovated or rebuilt. Properties with river views or proximity to the golf course can command a premium. Lot sizes are attractive for families and for adding laneway houses." },
                    { type: "Condominiums", range: "$450K - $700K", desc: "Found in select newer developments, particularly along Victoria Drive. These provide an affordable entry point for buyers who want to be in the neighborhood without the commitment of a detached home." },
                    { type: "Townhomes", range: "$800K - $1.1M", desc: "Newer townhome developments are starting to appear in the neighborhood, offering modern layouts and finishes for families who want more space than a condo. These are particularly popular with young families." },
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
                  Victoria-Fraserview&apos;s real estate market appeals to buyers who prioritize space and value, and who appreciate the neighborhood&apos;s natural amenities and quiet residential character.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Victoria-Fraserview offers strong long-term investment potential. The neighborhood benefits from large lot sizes, river proximity, the Fraserview Golf Course amenity, and prices that remain below the city average for detached homes. As southeast Vancouver continues to develop and transit connections improve, Victoria-Fraserview is well-positioned for steady appreciation. The unique combination of river views and urban green space adds a dimension that most Vancouver neighborhoods cannot offer.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Victoria-Fraserview is served by bus transit and benefits from good road access to other parts of Vancouver:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "The Joyce-Collingwood Station on the Expo Line is accessible from the northern part of the neighborhood, providing rapid transit to downtown Vancouver (approximately 20-25 minutes), Burnaby, and the rest of the SkyTrain network. A short bus ride connects most parts of Victoria-Fraserview to the station." },
                    { mode: "Bus", detail: "Bus routes serve the neighborhood along Victoria Drive, 49th Avenue, Knight Street, and 41st Avenue. The Victoria Drive bus provides north-south connections to Commercial Drive and the Commercial-Broadway SkyTrain hub. The 49 bus on 49th Avenue is a major crosstown route." },
                    { mode: "Driving", detail: "Knight Street is the primary north-south arterial, connecting directly to the Knight Street Bridge for access to Richmond, YVR airport, and Highway 99. Victoria Drive, 49th Avenue, and 41st Avenue provide additional connections. The neighborhood's location makes it convenient for commuting to Burnaby and the eastern suburbs." },
                    { mode: "Cycling", detail: "The neighborhood's relatively flat terrain makes cycling practical. Designated cycling routes connect through to other southeast Vancouver neighborhoods and the broader city cycling network. The BC Parkway along the SkyTrain corridor is accessible for longer rides." },
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
                  Victoria-Fraserview is exceptionally well-served by parks and green space, with two major amenities that define the neighborhood:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Fraserview Golf Course", desc: "A stunning public 18-hole championship golf course operated by the City of Vancouver. Set along the Fraser River with views of the mountains, it is one of the Lower Mainland's finest public courses. The facility includes a driving range, putting green, and clubhouse restaurant. For residents, it functions as a vast green space that defines the neighborhood's southern character." },
                    { name: "Everett Crowley Park", desc: "A 40-hectare naturalized park built on a former landfill, Everett Crowley has been transformed into a remarkable urban green space. Hiking and cycling trails wind through meadows and forested areas, and viewpoints offer panoramic views of the city, the Fraser River, and the North Shore mountains. It is one of southeast Vancouver's most treasured outdoor spaces." },
                    { name: "Riverfront Park", desc: "Located along the Fraser River, this park provides direct access to the waterfront with walking paths, seating areas, and views across the river to Richmond. It offers a unique riverside experience that is uncommon in Vancouver's neighborhoods." },
                    { name: "Victoria-Fraserview Park", desc: "A neighborhood park with playgrounds, sports fields, and community gathering space. It serves as a local recreation hub for families in the central part of the neighborhood." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The combination of the Fraserview Golf Course and Everett Crowley Park gives Victoria-Fraserview an unusually large amount of green space for a Vancouver neighborhood. For residents who value outdoor recreation and access to nature, this is one of the neighborhood&apos;s strongest selling points. The Killarney Community Centre is also nearby for those seeking pool, rink, and fitness facilities.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Victoria-Fraserview is served by well-established public schools that reflect the neighborhood&apos;s family-oriented character and cultural diversity.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "David Thompson Secondary", type: "8-12 Public", detail: "A well-established secondary school serving the neighborhood with strong academic programs, athletics, and a diverse student body. Known for its supportive learning environment and community involvement." },
                      { name: "Sir Wilfrid Laurier Elementary", type: "K-7 Public", detail: "A popular elementary school in the heart of Victoria-Fraserview with a strong sense of community and active parent participation. The school reflects the neighborhood's multicultural character." },
                      { name: "Captain James Cook Elementary", type: "K-7 Public", detail: "Serving the eastern part of the neighborhood, Cook Elementary provides quality education in a diverse, supportive environment." },
                      { name: "George T. Cunningham Elementary", type: "K-7 Public", detail: "Located near the southern part of the neighborhood, Cunningham offers a welcoming learning environment with strong community connections." },
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
                  David Thompson Secondary is the neighborhood&apos;s main high school, offering a comprehensive education in a diverse and inclusive environment. The school serves students from Victoria-Fraserview and surrounding communities, and its multicultural student body is widely regarded as a strength that prepares graduates for life in a diverse world.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Victoria Drive Dining</p>
                  <p className="text-sm text-gold-700">
                    Victoria Drive through the neighborhood features an eclectic mix of restaurants and shops reflecting the area&apos;s multicultural character. From Chinese dim sum and Vietnamese pho to South Asian curry houses and Filipino eateries, the street offers authentic, affordable dining that draws food lovers from beyond the neighborhood.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Victoria-Fraserview&apos;s dining scene is modest in scale but rich in authenticity. Victoria Drive is the main commercial corridor, with a mix of restaurants, grocery stores, and local services that serve the neighborhood&apos;s diverse population. The food here is genuine and affordable, reflecting the home cooking traditions of the Chinese, Vietnamese, South Asian, and Filipino communities that call the area home.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For Chinese cuisine, you will find dim sum houses, noodle shops, and Cantonese-style restaurants that cater to the neighborhood&apos;s significant Chinese population. Vietnamese restaurants offer excellent pho and banh mi. South Asian eateries serve curries, tandoori, and fresh naan. Filipino restaurants and bakeries add another dimension to the culinary landscape.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Grocery shopping is well-served by both conventional supermarkets and Asian grocery stores. The neighborhood&apos;s proximity to the Marine Drive and Knight Street commercial areas also provides additional shopping options within a short drive.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The Fraserview Golf Course clubhouse restaurant offers a more upscale dining option with river views, making it a popular spot for special occasions and weekend brunches. For everyday needs, Victoria-Fraserview provides the practical services and diverse food options that make daily life convenient and flavorful.
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
