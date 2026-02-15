import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "South Cambie Vancouver Real Estate Guide 2026 | Homes, Townhomes & Market Insights",
  description:
    "Your complete guide to South Cambie, Vancouver. Discover real estate opportunities, Queen Elizabeth Park, the Cambie Corridor plan, schools, transit, and lifestyle. Neighborhood insights by Aparna Kapur, Oakwyn Realty.",
  keywords: [
    "South Cambie Vancouver real estate",
    "South Cambie homes for sale",
    "Cambie Corridor Vancouver",
    "South Cambie neighborhood guide",
    "buy home South Cambie Vancouver",
    "Queen Elizabeth Park neighborhood",
    "South Cambie condos townhomes",
  ],
};

const faqs = [
  {
    question: "Is South Cambie a good area to buy a home in Vancouver?",
    answer:
      "South Cambie is one of Vancouver's most desirable residential neighborhoods. Its combination of Queen Elizabeth Park, two Canada Line SkyTrain stations, the Cambie Corridor development plan, excellent school catchments, and proximity to hospitals makes it a strong choice for both families and investors. The neighborhood offers long-term value thanks to ongoing transit-oriented development and its central westside location.",
  },
  {
    question: "How much do homes cost in South Cambie?",
    answer:
      "South Cambie offers a range of housing options. Condominiums typically range from $550K to $1.1M, townhomes from $1.1M to $1.8M, and detached heritage or newer homes from $2.0M to $4.0M+. The average home price across all property types sits around $1.8M, though this varies significantly depending on property type, lot size, and proximity to SkyTrain stations.",
  },
  {
    question: "What is the Cambie Corridor plan and how does it affect South Cambie?",
    answer:
      "The Cambie Corridor Plan is the City of Vancouver's long-term vision to add housing, amenities, and mixed-use development along the Canada Line SkyTrain route from Marine Drive to King Edward. In South Cambie, this has introduced new townhome and condominium projects near the King Edward and Oakridge-41st stations, increasing housing choice while maintaining the area's residential character. The plan has been a key driver of property values along the corridor.",
  },
  {
    question: "What schools serve the South Cambie neighborhood?",
    answer:
      "South Cambie has excellent schools at every level. Sir William Van Horne Elementary and Jamieson Elementary serve the elementary catchment, while Eric Hamber Secondary is the local high school and is one of Vancouver's most sought-after public secondaries. Langara College at 49th and Cambie provides post-secondary education, and several private school options are accessible nearby.",
  },
  {
    question: "How is transit access in South Cambie?",
    answer:
      "South Cambie has outstanding transit access. Two Canada Line SkyTrain stations serve the neighborhood: King Edward Station and Oakridge-41st Avenue Station. Downtown Vancouver is just 12 to 15 minutes by SkyTrain, and Vancouver International Airport (YVR) is about 20 minutes. Major bus routes run along Cambie Street, King Edward Avenue, and 41st Avenue, connecting to UBC and the rest of the city.",
  },
];

export default function SouthCambiePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-950/75 to-teal-950/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-teal-300/70 mb-4">
            <Link href="/neighborhoods" className="hover:text-teal-200 transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-teal-200">South Cambie</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            South Cambie, Vancouver
          </h1>
          <p className="text-xl text-teal-200 font-medium mb-2">
            The Complete Neighborhood Guide
          </p>
          <p className="text-white/70 max-w-2xl text-lg">
            Heritage charm meets modern transit. Discover Vancouver&apos;s
            best-kept residential secret at the foot of Queen Elizabeth Park.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-teal-700">$1.8M</p>
              <p className="text-xs text-warm-500 mt-1">Average Home Price</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">130 acres</p>
              <p className="text-xs text-warm-500 mt-1">Queen Elizabeth Park</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">12 min</p>
              <p className="text-xs text-warm-500 mt-1">To Downtown</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">2</p>
              <p className="text-xs text-warm-500 mt-1">SkyTrain Stations</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-teal-700">A+</p>
              <p className="text-xs text-warm-500 mt-1">School Catchments</p>
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
                    ["living", "Living in South Cambie"],
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
                      ["Riley Park", "riley-park"],
                      ["Cambie Corridor", "cambie-corridor"],
                      ["Marpole", "marpole"],
                      ["Shaughnessy", "shaughnessy"],
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
              <section id="overview" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Overview
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  South Cambie is a quiet, established neighborhood in the heart of Vancouver&apos;s westside, roughly bounded by West 16th Avenue to the north, West 41st Avenue to the south, Cambie Street to the east, and Oak Street to the west. It sits at a geographic crossroads &mdash; close enough to downtown for an easy commute, yet far enough to feel like a world apart.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The neighborhood&apos;s crown jewel is Queen Elizabeth Park, Vancouver&apos;s highest point at 152 metres above sea level. The park&apos;s sweeping views of the downtown skyline, the North Shore Mountains, and the surrounding city are among the most photographed vistas in British Columbia. For many South Cambie residents, these views are part of daily life &mdash; a morning jog, an after-dinner walk, or a Saturday at the pitch and putt.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  South Cambie has long been treasured for its tree-lined streets, heritage homes, and strong sense of community. In recent years, the Cambie Corridor development plan has brought thoughtful densification to the area, adding modern townhomes and condominiums near SkyTrain stations while preserving the residential calm that defines the neighborhood&apos;s character.
                </p>
              </section>

              {/* Living in South Cambie */}
              <section id="living" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Living in South Cambie
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  South Cambie offers something increasingly rare in Vancouver: a genuine neighborhood feel within minutes of the city centre. The streets are wide, mature trees form a canopy overhead in summer, and neighbours still wave from their porches. It is the kind of place where families put down roots for decades.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  The housing stock tells the story of the neighborhood&apos;s evolution. You will find beautifully maintained Craftsman and Tudor-style heritage homes sitting alongside newer duplexes, thoughtfully designed townhome complexes, and boutique condo developments. This mix gives South Cambie its visual character &mdash; a blend of old and new that feels organic rather than forced.
                </p>
                <h3 className="font-serif text-xl text-teal-900 mt-8 mb-3">A Day in South Cambie</h3>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Start with a morning coffee from one of the cafes along Cambie Street. Walk the kids to Jamieson Elementary or Van Horne, then hop on the Canada Line at King Edward Station for a twelve-minute ride to the office downtown. After school, the kids have swimming lessons at Hillcrest Community Centre or soccer practice at Douglas Park. Pick up groceries at Cambie Village on the way home. On weekends, there is the Bloedel Conservatory to explore, a round of pitch and putt at Queen Elizabeth Park, or a family outing to catch a Vancouver Canadians baseball game at nearby Nat Bailey Stadium.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  South Cambie&apos;s proximity to Vancouver General Hospital and other medical facilities along the Cambie Corridor also makes it a practical choice for healthcare professionals and anyone who values having top-tier medical care close at hand.
                </p>
              </section>

              {/* Real Estate Market */}
              <section id="real-estate" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  South Cambie Real Estate Market
                </h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  South Cambie&apos;s real estate market reflects its status as one of Vancouver&apos;s most balanced neighborhoods &mdash; offering diverse housing types at a range of price points:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { type: "Condominiums", range: "$550K - $1.1M", desc: "Modern units in newer developments near SkyTrain stations along the Cambie Corridor. Attractive to first-time buyers and investors seeking transit-oriented properties." },
                    { type: "Townhomes", range: "$1.1M - $1.8M", desc: "Multi-level homes in well-designed complexes, many built as part of the Cambie Corridor Plan. Increasingly popular with young families who want more space without a detached-home price tag." },
                    { type: "Detached Homes", range: "$2.0M - $4.0M+", desc: "Heritage character homes and newer builds on generous lots. Many original homes offer renovation potential or laneway house opportunities on the larger parcels." },
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
                  The average home price in South Cambie is approximately $1.8M across all property types. The neighborhood has seen consistent appreciation driven by the Canada Line, the Cambie Corridor Plan&apos;s controlled densification, and the enduring appeal of Queen Elizabeth Park. Properties near the King Edward and Oakridge-41st stations tend to command a premium due to the convenience of rapid transit access.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Investment Outlook</p>
                  <p className="text-sm text-teal-800/80">
                    The Cambie Corridor Plan continues to guide development in South Cambie, adding housing supply while improving walkability and amenities. Transit-oriented neighborhoods along the Canada Line have historically outperformed the broader Vancouver market. With the nearby Oakridge Park redevelopment completing in phases through 2026 and beyond, South Cambie stands to benefit from increased retail, dining, and community amenities at its doorstep.
                  </p>
                </div>
              </section>

              {/* Getting Around */}
              <section id="transit" className="mb-16">
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Getting Around
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  South Cambie&apos;s central location and excellent transit infrastructure make it one of the most connected residential neighborhoods in Vancouver:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { mode: "SkyTrain", detail: "Two Canada Line stations serve the neighborhood: King Edward Station and Oakridge-41st Avenue Station. Downtown in 12 minutes, YVR airport in 20 minutes. The convenience is hard to overstate." },
                    { mode: "Bus", detail: "Major routes along Cambie Street (15), King Edward Avenue (25), and 41st Avenue (43) connect to UBC, Commercial-Broadway, and surrounding neighborhoods with frequent service." },
                    { mode: "Cycling", detail: "The Ontario Street and Heather Street bike routes pass through or alongside South Cambie. The Arbutus Greenway, a dedicated cycling and walking path, is easily accessible to the west." },
                    { mode: "Driving", detail: "Cambie Street and Oak Street provide direct north-south routes to downtown and the airport. King Edward and 41st Avenue offer efficient east-west connections across the city." },
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
                  South Cambie residents enjoy some of the finest green space in Vancouver. The parks here are not just amenities &mdash; they are defining features of the neighborhood:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Queen Elizabeth Park", desc: "Vancouver's highest point and second-most visited park. The 130-acre grounds include the Bloedel Conservatory (a tropical dome housing exotic birds and plants), a pitch and putt golf course, tennis courts, rose gardens, arboretum, and panoramic viewpoints of the city skyline and North Shore Mountains. For South Cambie residents, this is essentially the backyard." },
                    { name: "Hillcrest Community Centre & Park", desc: "A modern recreation hub adjacent to Queen Elizabeth Park offering an aquatic centre, ice rink, gymnasium, fitness facilities, and outdoor playing fields. The complex was built for the 2010 Winter Olympics and remains one of the city's premier community recreation facilities." },
                    { name: "Douglas Park", desc: "A beloved community park with a playground, sports fields, tennis courts, a community centre, and a wading pool. Douglas Park is a gathering spot for families and hosts seasonal programs and events throughout the year." },
                    { name: "Nat Bailey Stadium Area", desc: "Home to the Vancouver Canadians baseball team, the stadium and surrounding green space at Hillcrest Park offer a unique recreational asset. Summer evenings at a Canadians game are a South Cambie tradition." },
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
                  South Cambie&apos;s school catchments are among the most desirable in Vancouver, making it a top choice for families prioritizing education:
                </p>
                <div className="space-y-3 mb-6">
                  <h3 className="font-serif text-lg text-teal-900">Public Schools</h3>
                  {[
                    { name: "Sir William Van Horne Elementary", type: "K-7 Public", detail: "A well-regarded school within walking distance for most South Cambie families. Known for strong academics and an engaged parent community." },
                    { name: "Jamieson Elementary", type: "K-7 Public", detail: "Another excellent option in the catchment, offering diverse programs and a welcoming environment for students and families." },
                    { name: "Eric Hamber Secondary", type: "8-12 Public", detail: "One of Vancouver's most sought-after public high schools, located right in the neighborhood. Strong academics, arts programs, athletics, and a dedicated IB pathway make it a draw for families across the city." },
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
                    { name: "Langara College", type: "Post-Secondary", detail: "Located at 49th and Cambie, just south of the neighborhood. Serves over 23,000 students with university transfer programs, career training, and continuing education." },
                    { name: "King David High School", type: "Private", detail: "An independent Jewish high school located nearby, offering faith-based education with strong academic standards." },
                    { name: "Vancouver College", type: "Private", detail: "A well-established Catholic boys' school accessible from South Cambie, with a long tradition of academic and athletic excellence." },
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
                  South Cambie&apos;s shopping and dining scene is anchored by Cambie Village, the stretch of Cambie Street around the King Edward intersection. Here you will find a curated mix of independent cafes, bakeries, restaurants, and everyday shops. The village atmosphere is walkable and welcoming &mdash; the kind of main street where the barista knows your order.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  For more extensive shopping, the upcoming Oakridge Park development at 41st and Cambie will deliver over 500,000 square feet of retail and dining, including the highly anticipated Time Out Market food hall. This will put world-class shopping and cuisine within a short walk or single SkyTrain stop for South Cambie residents.
                </p>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Main Street&apos;s vibrant collection of independent boutiques, breweries, and restaurants is just a short trip east and offers a more eclectic, hip dining and shopping experience. Granville Street to the west provides additional retail options and services.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  For groceries and daily errands, residents are well served by supermarkets along Cambie and 41st Avenue, as well as specialty food stores reflecting the area&apos;s diverse community. The Seasons in the Park restaurant at Queen Elizabeth Park is a local fine-dining institution with panoramic mountain and city views &mdash; perfect for special occasions without leaving the neighborhood.
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
                      Thinking About South Cambie?
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Whether you&apos;re looking to buy, sell, or simply want to learn
                      more about South Cambie real estate &mdash; I&apos;d love to help.
                      Let&apos;s start with a no-pressure conversation about your goals.
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
