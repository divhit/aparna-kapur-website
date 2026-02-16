import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/forms/ContactForm";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";

export const metadata: Metadata = {
  title: "Riley Park Vancouver Real Estate Guide 2026 | Homes, Market Data & Lifestyle",
  description:
    "Your complete guide to Riley Park, Vancouver. Explore real estate, Main Street culture, craft breweries, schools, parks, and lifestyle. Neighborhood insights by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "Riley Park Vancouver real estate",
    "Riley Park homes for sale",
    "Main Street Vancouver",
    "Riley Park neighborhood guide",
    "buy home Riley Park Vancouver",
    "Riley Park craft breweries",
    "Riley Park character homes",
  ],
};

const faqs = [
  {
    question: "Is Riley Park a good neighborhood to buy in?",
    answer:
      "Riley Park is one of Vancouver's most desirable neighborhoods for buyers who value character, community, and walkability. The Main Street corridor provides vibrant urban amenities, while the residential streets maintain a quieter, tree-lined charm. Strong demand for character homes, excellent transit access, and a thriving local economy make Riley Park a solid long-term investment. Average home prices sit around $1.5M, with strong appreciation driven by limited supply and high buyer interest.",
  },
  {
    question: "How much does a home cost in Riley Park?",
    answer:
      "Riley Park offers a range of housing options. Condos and apartments typically range from $450K to $850K, duplexes and townhomes from $1.0M to $1.6M, and detached character homes from $1.5M to $2.8M+. The average home price across all property types is approximately $1.5M, though heritage character homes in prime locations can command a premium.",
  },
  {
    question: "What is Main Street like in Riley Park?",
    answer:
      "Main Street is the cultural heart of Riley Park and one of Vancouver's most celebrated independent shopping corridors. Stretching from Broadway south to 33rd Avenue, it is lined with craft breweries (33 Acres, Brassneck, Main Street Brewing), independent boutiques, vintage shops, acclaimed restaurants, and locally owned cafes. The street has a distinctly creative, community-driven atmosphere that sets it apart from more commercial shopping districts.",
  },
  {
    question: "What schools serve the Riley Park area?",
    answer:
      "Riley Park has strong public school options at every level. Elementary schools include General Wolfe Elementary and Emily Carr Elementary, both well-regarded within the Vancouver School Board. Sir Charles Tupper Secondary serves the area for grades 8 through 12 and offers diverse programs including French Immersion. Several private and alternative schools are also accessible nearby.",
  },
  {
    question: "How is transit in Riley Park?",
    answer:
      "Riley Park has excellent transit connectivity. Multiple bus routes serve the neighborhood, including routes along Main Street, King Edward Avenue, and Broadway. The King Edward SkyTrain station (Canada Line) is within walking or short cycling distance for many residents, and the Broadway-City Hall station provides Expo Line access. The upcoming Broadway Subway extension further improves connectivity to the west side and UBC.",
  },
];

const rileyParkData = NEIGHBOURHOODS["riley-park"];

export default function RileyParkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">Riley Park</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Riley Park, Vancouver
          </h1>
          <p className="text-xl text-teal-200 font-medium mb-2">
            The Complete Neighborhood Guide
          </p>
          <p className="text-white/70 max-w-2xl text-lg">
            Where craft breweries meet character homes. Discover Vancouver&apos;s
            most creative, community-driven neighborhood along the iconic Main
            Street corridor.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.5M</p>
              <p className="text-xs text-warm-500 mt-1">Average Home Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">10+</p>
              <p className="text-xs text-warm-500 mt-1">Craft Breweries</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">15 min</p>
              <p className="text-xs text-warm-500 mt-1">To Downtown</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">94</p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">1920s+</p>
              <p className="text-xs text-warm-500 mt-1">Heritage Character</p>
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
                    ["map", "Explore Map"],
                    ["overview", "Overview"],
                    ["living", "Living in Riley Park"],
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
                      ["Mount Pleasant", "mount-pleasant"],
                      ["Kensington-Cedar Cottage", "kensington-cedar-cottage"],
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
                  Explore Riley Park
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Discover transit stations, schools, parks, and key landmarks in and around Riley Park.
                </p>
                <NeighbourhoodMap
                  center={rileyParkData.center}
                  zoom={rileyParkData.zoom}
                  pois={rileyParkData.pointsOfInterest}
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
                  Riley Park is a vibrant residential neighborhood in central Vancouver, bounded roughly by King Edward Avenue to the north, 41st Avenue to the south, Main Street to the east, and Cambie Street to the west. Named after the park at its centre, this community has evolved from a working-class enclave into one of the city&apos;s most sought-after neighborhoods &mdash; a place where heritage architecture, creative energy, and genuine community spirit come together.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The Main Street corridor, stretching from Broadway south to 33rd Avenue, is the cultural backbone of the neighborhood. It is home to Vancouver&apos;s celebrated craft brewery district, dozens of independent boutiques and vintage shops, and some of the city&apos;s most acclaimed restaurants and cafes. This is not a neighborhood built on chain stores &mdash; Riley Park&apos;s identity comes from the small business owners, artists, and creatives who have made it their home.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Riley Park is also home to Nat Bailey Stadium, a beloved heritage ballpark where the Vancouver Canadians play summer baseball under the mountains &mdash; an experience that feels uniquely Vancouver. That combination of local character, walkable urbanism, and connection to nature defines what living here is all about.
                </p>
              </section>

              {/* Living in Riley Park */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in Riley Park
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Riley Park offers a lifestyle that balances urban vibrancy with residential calm. Step off Main Street onto any of the neighborhood&apos;s side streets and you&apos;ll find yourself on quiet, tree-lined blocks with beautifully maintained character homes, heritage Craftsman bungalows, and the occasional newer infill. Mature street trees form canopies overhead, front gardens are lovingly tended, and neighbors actually know each other.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The community is popular with young professionals, artists, and growing families who are drawn to the neighborhood&apos;s creative energy and independent spirit. There is a strong sense of neighborhood pride here &mdash; residents support local businesses, attend community events, and participate in the kinds of grassroots initiatives that make a neighborhood feel like home rather than just a place to live.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in Riley Park</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Start with a flat white from a specialty coffee roaster on Main Street. Walk the kids to Emily Carr Elementary through streets lined with heritage homes. Cycle to work via the Ontario Street Greenway, or hop on the bus down Main. After school, let the children run at Hillcrest Community Centre while you sneak in a swim at the aquatic centre. Evening plans might mean pints at Brassneck Brewery, dinner at a farm-to-table restaurant, or a summer evening watching the Vancouver Canadians play at Nat Bailey Stadium with the mountains glowing pink behind the outfield.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Weekends bring the farmers&apos; market, browsing vintage shops on Main, or exploring Queen Elizabeth Park just a short walk to the west. This is the Riley Park rhythm &mdash; creative, connected, and grounded in community.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Riley Park Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Riley Park&apos;s real estate market is defined by strong demand, limited supply, and a housing stock that rewards buyers who appreciate character and charm. The neighborhood offers a diverse mix of property types:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Character Homes", range: "$1.5M - $2.8M+", desc: "Original Craftsman bungalows, Vancouver Specials, and heritage homes on established lots. Many offer renovation potential or laneway suite opportunities. These are the properties that define Riley Park's streetscape." },
                    { type: "Duplexes & Townhomes", range: "$1.0M - $1.6M", desc: "Side-by-side and stacked duplexes, plus newer townhome developments. An increasingly popular option for families who want more space than a condo without the price of a full detached home." },
                    { type: "Condos & Apartments", range: "$450K - $850K", desc: "Low-rise and mid-rise buildings, many along or near Main Street. Popular with first-time buyers and young professionals attracted to the walkable lifestyle." },
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
                  The average home price in Riley Park sits around $1.5M across all property types, though character detached homes can exceed $2.5M in premium locations. Demand consistently outpaces supply, particularly for well-maintained heritage homes with original details intact. Properties close to Main Street command a premium for their walkability and proximity to amenities.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    Riley Park benefits from several long-term value drivers: the ongoing densification along the Cambie Corridor, the Broadway Subway extension improving westside connectivity, limited new detached home supply, and Vancouver&apos;s growing appetite for walkable, character-rich neighborhoods. Properties with laneway suite potential or duplex zoning offer particularly strong investment returns.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Riley Park offers strong transit connectivity and is highly walkable, earning one of the best walk scores among Vancouver&apos;s residential neighborhoods:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "King Edward station (Canada Line) is accessible to the west, and Broadway-City Hall station (Expo and Millennium Lines) connects to the north. Both stations provide quick access to downtown (15 min), Richmond, and YVR airport." },
                    { mode: "Bus", detail: "The 3 Main Street bus runs the length of the neighborhood corridor. Routes along King Edward Avenue (25), Broadway (9/99 B-Line), and 41st Avenue (43) provide excellent east-west connectivity." },
                    { mode: "Cycling", detail: "The Ontario Street Greenway runs through Riley Park, providing a dedicated north-south cycling route. The neighborhood's flat terrain and bike-friendly streets make cycling a popular daily commute option." },
                    { mode: "Walking", detail: "With a walk score in the 90s, most errands, dining, and shopping are comfortably within walking distance for residents near Main Street. The grid street pattern and short blocks make the neighborhood highly pedestrian-friendly." },
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

              {/* Parks & Recreation */}
              <section id="parks" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Parks &amp; Recreation
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Riley Park residents have access to excellent parks, recreation facilities, and green spaces:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Riley Park", desc: "The neighborhood's namesake park features sports fields, a playground, and open green space. It is a community gathering point and the site of Nat Bailey Stadium, home to the Vancouver Canadians minor league baseball team. Summer evening games here, with the North Shore mountains as a backdrop, are a quintessential Vancouver experience." },
                    { name: "Hillcrest Community Centre & Park", desc: "A world-class recreation facility built for the 2010 Olympics. Features include a full aquatic centre with a 50-metre pool, ice rink, gymnasium, fitness centre, library branch, and extensive outdoor park space with playgrounds and playing fields. This is one of the finest community centres in the city." },
                    { name: "Queen Elizabeth Park", desc: "Vancouver's highest point and second-most visited park lies just west of Riley Park. The Bloedel Conservatory, rose gardens, arboretum, pitch-and-putt golf, and panoramic city and mountain views make this a year-round destination for residents." },
                    { name: "Douglas Park", desc: "Located at the neighborhood's northern edge, Douglas Park offers a community centre, outdoor pool, tennis courts, playgrounds, and a popular off-leash dog area. A great option for families and pet owners." },
                  ].map((park) => (
                    <div key={park.name} className="bg-warm-50 rounded-xl p-5">
                      <h4 className="font-medium text-teal-950 mb-1">{park.name}</h4>
                      <p className="text-sm text-warm-600">{park.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schools & Education */}
              <section id="schools" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Schools &amp; Education
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Riley Park serves families well with strong public schools at every level:
                </p>
                <div className="space-y-3 mb-6">
                  <h3 className="font-serif text-lg text-teal-900">Elementary Schools</h3>
                  {[
                    { name: "General Wolfe Elementary", type: "K-7 Public", detail: "A well-established school serving the heart of Riley Park. Known for strong community engagement and diverse programs." },
                    { name: "Emily Carr Elementary", type: "K-7 Public", detail: "Another excellent catchment school with a welcoming community and solid academic programs." },
                    { name: "Sir William Van Horne Elementary", type: "K-7 Public", detail: "Located near the western edge of the neighborhood, serving families in the Cambie-Riley Park border area." },
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
                  <h3 className="font-serif text-lg text-teal-900">Secondary &amp; Post-Secondary</h3>
                  {[
                    { name: "Sir Charles Tupper Secondary", type: "8-12 Public", detail: "The local high school for Riley Park residents. Offers French Immersion, strong arts programs, and diverse extracurricular activities." },
                    { name: "Eric Hamber Secondary", type: "8-12 Public", detail: "An alternative catchment option just west of the neighborhood, known for strong academics and athletics." },
                    { name: "Langara College", type: "Post-Secondary", detail: "Located nearby at 49th and Cambie, offering university transfer programs, diplomas, and continuing education for over 23,000 students." },
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
                  Main Street is the lifeblood of Riley Park&apos;s shopping and dining scene, and it is unlike any other commercial corridor in Vancouver. This is a street defined by independent ownership &mdash; from the bookshops and record stores to the farm-to-table restaurants and specialty coffee roasters. If you&apos;re looking for a big box retailer, you won&apos;t find one here. That is precisely the point.
                </p>
                <div className="bg-gold-50 rounded-2xl p-6 mb-6 border border-gold-200">
                  <p className="text-sm font-semibold text-gold-800 mb-2">The Craft Brewery District</p>
                  <p className="text-sm text-gold-700">
                    Riley Park&apos;s stretch of Main Street is the epicentre of Vancouver&apos;s craft beer scene. 33 Acres Brewing, Brassneck Brewery, Main Street Brewing, Faculty Brewing, and others have established a walkable brewery district that draws visitors from across the city. Tasting rooms double as community gathering spots, and many host events, art shows, and food pop-ups.
                  </p>
                </div>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Beyond breweries, the dining scene spans cuisines and price points &mdash; from acclaimed restaurants and intimate wine bars to family-friendly pizzerias and authentic international kitchens. The vintage and thrift shop scene is among Vancouver&apos;s best, with curated shops offering everything from mid-century furniture to rare vinyl records and vintage clothing.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For everyday needs, the neighborhood has independent grocers, pharmacies, and services along Main Street and King Edward Avenue. Larger shopping options at Oakridge and along Cambie Street are just minutes away.
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
                      Thinking About Riley Park?
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Whether you&apos;re looking to buy a character home on a tree-lined
                      street, sell your Riley Park property, or simply want to learn
                      more about the market &mdash; I&apos;d love to help. Let&apos;s start with
                      a no-pressure conversation about your goals.
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
