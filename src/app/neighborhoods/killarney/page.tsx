import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchNeighbourhoodPOIs } from "@/lib/places";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Killarney Vancouver Real Estate Guide 2026 | Homes & Market Data",
  description:
    "The definitive guide to Killarney, Vancouver. Explore family-friendly real estate, the award-winning Killarney Community Centre, Everett Crowley Park, schools, and multicultural living. Your complete neighborhood resource by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Killarney Vancouver real estate",
    "Killarney homes for sale",
    "Killarney community centre",
    "Killarney neighborhood guide",
    "buy home Killarney Vancouver",
    "Killarney schools Vancouver",
    "Killarney Park Vancouver",
    "southeast Vancouver real estate",
  ],
};

const faqs = [
  {
    question: "Is Killarney a good neighborhood to buy a home in?",
    answer:
      "Killarney is one of southeast Vancouver's most appealing residential neighborhoods for families and value-conscious buyers. It offers a strong sense of community, excellent recreational facilities anchored by the award-winning Killarney Community Centre, good schools, and real estate prices that remain more affordable than west-side neighborhoods. The area has seen steady investment in infrastructure and new housing, making it a solid choice for both first-time buyers and long-term homeowners.",
  },
  {
    question: "How much does a home cost in Killarney Vancouver?",
    answer:
      "Killarney offers some of Vancouver's best value. The composite benchmark price across all property types is approximately $1.1M. Detached homes typically range from $1.3M to $1.8M, while condominiums can be found from $450K to $750K. Townhomes generally fall in the $800K to $1.1M range. Compared to west-side neighborhoods, Killarney provides significantly more space and value per dollar.",
  },
  {
    question: "What makes Killarney Community Centre special?",
    answer:
      "Killarney Community Centre is widely regarded as one of the best community centres in all of Vancouver. The facility includes a swimming pool, ice rink, fitness centre, gymnasium, and a wide range of programming for all ages. It hosts everything from youth sports leagues and swimming lessons to senior fitness classes and cultural events. The centre is the social heart of the neighborhood and a major reason families choose to live in Killarney.",
  },
  {
    question: "What schools are in Killarney?",
    answer:
      "Killarney is well-served by public schools. Killarney Secondary is one of Vancouver's largest high schools and offers strong academic, arts, and athletic programs. Elementary schools in the area include Champlain Heights Elementary and several others within walking distance. The neighborhood's family-oriented character means schools are well-supported by active parent communities.",
  },
  {
    question: "How do I get around from Killarney?",
    answer:
      "Killarney is served by several major bus routes, including the 49 bus along 49th Avenue and routes along Knight Street. The 29th Avenue SkyTrain Station and Joyce-Collingwood Station on the Expo Line are both accessible from the neighborhood. Driving access is convenient via Knight Street, 49th Avenue, and Kingsway. The neighborhood is also well-connected to the Champlain Heights area and southeast Vancouver.",
  },
];

const killarneyData = NEIGHBOURHOODS["killarney"];

export default async function KillarneyPage() {
  const pois = await fetchNeighbourhoodPOIs(killarneyData.center);

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
            <span className="text-teal-200">Killarney</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Killarney, Vancouver
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
                  <p className="font-serif text-2xl text-teal-700">78</p>
                  <p className="text-xs text-warm-500 mt-1">Walk Score</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">Top</p>
                  <p className="text-xs text-warm-500 mt-1">Killarney Centre</p>
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
                  ["living", "Living in Killarney", "2"],
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
                      ["Renfrew-Collingwood", "renfrew-collingwood"],
                      ["Victoria-Fraserview", "victoria-fraserview"],
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
                  Killarney is a family-friendly residential neighborhood in southeast Vancouver, bounded roughly by 41st Avenue to the north, the Fraser River to the south, Boundary Road to the east, and Knight Street to the west. One of the city&apos;s most culturally diverse communities, Killarney has evolved from a quiet suburban enclave into a vibrant neighborhood that attracts families seeking excellent amenities, strong community connections, and good value in one of Canada&apos;s most expensive housing markets.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  What distinguishes Killarney from other Vancouver neighborhoods is the remarkable quality of its community infrastructure. The Killarney Community Centre is widely considered one of the finest in the entire city, offering a swimming pool, ice rink, gymnasium, fitness facilities, and an extraordinary range of programs for all ages. This single facility anchors the neighborhood&apos;s social life and gives Killarney a sense of community cohesion that is increasingly rare in a city of Vancouver&apos;s size.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  The neighborhood is also defined by its multicultural character. Families from Chinese, South Asian, Filipino, Vietnamese, and many other backgrounds have made Killarney home, creating a rich tapestry of cultures that is reflected in the local food scene, community events, and the welcoming atmosphere that residents consistently cite as one of the area&apos;s greatest strengths.
                </p>
              </section>

              {/* Interactive Map */}
              <section id="map" className="mb-16">
                <NeighbourhoodMap
                  center={killarneyData.center}
                  zoom={killarneyData.zoom}
                  pois={pois.length > 0 ? pois : killarneyData.fallbackPOIs}
                  boundaryName="Killarney"
                  height="450px"
                  showLegend
                />
              </section>

              {/* Living in Killarney */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Killarney
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Killarney offers a quieter, more suburban pace of life compared to Vancouver&apos;s denser urban neighborhoods. Streets are wide and generally calm, with mature trees and well-maintained front gardens giving the area a settled, established feel.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock is a mix of older detached homes from the 1960s and 1970s, many of which sit on generous lots, alongside newer builds and laneway houses that have brought fresh energy to the streetscape. You will also find pockets of newer condominium and townhome developments, particularly closer to the major arterials, offering more affordable entry points into the neighborhood.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  A typical day in Killarney might start with a morning swim at the community centre pool, followed by dropping the kids at Killarney Secondary or one of the local elementary schools. Lunch could be a bowl of pho at one of the many Vietnamese restaurants along Kingsway or a quick dim sum stop. Afternoons often revolve around the community centre, where children attend after-school programs while parents catch a fitness class. Weekends might include a family hike through the trails of Everett Crowley Park, with its surprising views of the city and the North Shore mountains.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Killarney is unpretentious and genuinely welcoming, with a community spirit that is hard to find in many Vancouver neighborhoods. It is a place where neighbors look out for one another and where families can put down roots without the financial strain of the west side.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Killarney Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Killarney offers some of the best value in Vancouver, with a diverse housing stock that appeals to a wide range of buyers:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Detached Homes", range: "$1.3M - $1.8M", desc: "Primarily 1960s-1970s era homes on standard lots. Many have been renovated or rebuilt. Generous lot sizes make these attractive for families who want space and the option to add a laneway house for rental income." },
                    { type: "Condominiums", range: "$450K - $750K", desc: "Found in newer developments along major corridors. An accessible entry point for first-time buyers and investors looking for strong rental demand from the neighborhood's proximity to transit." },
                    { type: "Townhomes", range: "$800K - $1.1M", desc: "Newer townhome complexes are increasingly popular with young families who want more space than a condo without the maintenance of a detached home." },
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
                  Killarney&apos;s real estate market benefits from consistent demand driven by affordability relative to other Vancouver neighborhoods, good transit access, and the exceptional quality of community amenities.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Killarney represents one of Vancouver&apos;s strongest value propositions. The neighborhood benefits from ongoing development, improving transit connections, the exceptional Killarney Community Centre, and steady population growth in southeast Vancouver. For buyers seeking an affordable entry into the Vancouver market with solid long-term fundamentals, Killarney deserves serious consideration.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Killarney offers reasonable transit connectivity and convenient driving access to the rest of Vancouver:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "The 29th Avenue Station and Joyce-Collingwood Station on the Expo Line are both accessible from Killarney, providing direct rapid transit to downtown Vancouver, Burnaby, and the rest of the SkyTrain network. The ride to downtown takes approximately 20-25 minutes." },
                    { mode: "Bus", detail: "The 49 bus along 49th Avenue is a major crosstown route connecting Killarney to UBC and the west side. Additional routes run along Knight Street, Kingsway, and Boundary Road, providing north-south and diagonal connections across the city." },
                    { mode: "Driving", detail: "Knight Street provides a direct north-south corridor to the Knight Street Bridge and Richmond/YVR. 49th Avenue and Kingsway offer east-west connections. The neighborhood's proximity to Boundary Road also provides easy access to Burnaby and points east." },
                    { mode: "Cycling", detail: "The area features several designated cycling routes, and the relatively flat terrain of southeast Vancouver makes cycling a practical option for daily commuting. The BC Parkway cycling trail connects through to the SkyTrain corridor." },
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
                  Killarney offers a variety of green spaces that serve the neighborhood&apos;s active, family-oriented community:
                </p>
                <div className="bg-warm-50 rounded-xl p-5 space-y-4 mb-6">
                  {[
                    { name: "Killarney Park", desc: "The neighborhood's central park, located adjacent to the Killarney Community Centre. Features playgrounds, sports fields, tennis courts, and open green space. It is the primary gathering spot for families and community events throughout the year." },
                    { name: "Everett Crowley Park", desc: "A 40-hectare naturalized park built on a former landfill site, Everett Crowley has been transformed into a remarkable green space with walking and cycling trails, meadows, and forested areas. The park offers surprising panoramic views of the city, the North Shore mountains, and on clear days, Mount Baker. A hidden gem of southeast Vancouver." },
                    { name: "Fraserview Golf Course", desc: "A beautiful public 18-hole golf course located nearby, offering affordable golf with stunning views of the Fraser River and the mountains. One of three public courses operated by the City of Vancouver, it draws golfers from across the Lower Mainland." },
                    { name: "Champlain Heights Park", desc: "A large green space on the southern edge of the neighborhood with playgrounds, sports courts, and open fields. The park is surrounded by the Champlain Heights residential area and provides a quiet retreat for families." },
                  ].map((park, i, arr) => (
                    <div key={park.name} className={i < arr.length - 1 ? "pb-4 border-b border-warm-200" : ""}>
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed">
                  The Killarney Community Centre is the recreational anchor of the neighborhood. Its swimming pool, ice rink, and extensive programming make it one of the most complete community facilities in Vancouver. The centre hosts youth sports leagues, fitness classes, cultural events, and community gatherings that bring the neighborhood together year-round.
                </p>
              </section>

              {/* Schools */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Killarney is well-served by Vancouver&apos;s public school system, with several options for families at all grade levels. The neighborhood&apos;s strong family orientation means schools here benefit from engaged parent communities and active extracurricular programs.
                </p>
                <div className="mb-6">
                  <h3 className="font-serif text-lg text-teal-900 mb-3">Public Schools</h3>
                  <div className="bg-warm-50 rounded-xl p-4 space-y-3">
                    {[
                      { name: "Killarney Secondary", type: "8-12 Public", detail: "One of Vancouver's largest secondary schools with over 1,800 students. Killarney offers strong academic programs, a renowned performing arts program, competitive athletics, and extensive extracurricular activities. The school's diversity is one of its defining strengths." },
                      { name: "Champlain Heights Elementary", type: "K-7 Public", detail: "A well-regarded elementary school serving the southern portion of the neighborhood. Known for its supportive learning environment and active parent advisory council." },
                      { name: "Waverley Elementary", type: "K-7 Public", detail: "Located in the northern part of Killarney, Waverley offers a welcoming community atmosphere with strong literacy and numeracy programs." },
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
                  Killarney Secondary deserves special mention for its performing arts program, which is one of the most respected in the Vancouver School District. Students from across the city apply for its specialized programs in dance, music, theatre, and visual arts. The school&apos;s diversity, with students from over 60 cultural backgrounds, is considered one of its greatest educational assets.
                </p>
              </section>

              {/* Shopping & Dining */}
              <section id="shopping" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Shopping &amp; Dining
                </h2>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">Multicultural Food Scene</p>
                  <p className="text-sm text-gold-700">
                    Killarney&apos;s dining landscape reflects the rich cultural diversity of its residents. From authentic Vietnamese pho houses and Chinese dim sum restaurants to South Asian curry spots and Filipino eateries, the neighborhood offers an extraordinary culinary range at accessible prices.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  While Killarney does not have a single concentrated shopping village like some west-side neighborhoods, it offers practical and diverse shopping options spread along its major corridors. Kingsway, which runs diagonally through the area, is lined with restaurants, bakeries, and small shops representing the cultures that call Killarney home.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For everyday shopping, residents have convenient access to several supermarkets including large Asian grocery stores that stock specialty ingredients from across the Pacific Rim. T&T Supermarket and other Asian grocers are popular destinations that draw shoppers from well beyond the neighborhood.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The Champlain Square shopping area at 49th and Elliott Street provides additional retail convenience with a grocery store, pharmacy, and everyday services. Nearby Metrotown in Burnaby is also easily accessible for larger shopping trips.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For dining, the neighborhood truly shines. The concentration of authentic, affordable restaurants from a dozen different cuisines makes Killarney one of Vancouver&apos;s best kept secrets for food lovers. Locals know that some of the city&apos;s finest Vietnamese, Chinese, and South Asian cooking can be found right here, often at a fraction of what comparable quality costs in trendier neighborhoods.
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
