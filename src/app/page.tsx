import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import HeroChat from "@/components/chat/HeroChat";
import HeroSlideshow from "@/components/hero/HeroSlideshow";

const neighborhoods = [
  {
    name: "Oakridge",
    slug: "oakridge",
    description: "Vancouver's most exciting transformation - 3,300+ new homes, world-class amenities",
    image: "https://images.pexels.com/photos/19358760/pexels-photo-19358760.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Marpole",
    slug: "marpole",
    description: "A family-friendly community with historic charm and easy airport access",
    image: "https://images.pexels.com/photos/1417252/pexels-photo-1417252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "South Cambie",
    slug: "south-cambie",
    description: "Tree-lined streets, top schools, and Queen Elizabeth Park at your doorstep",
    image: "https://images.pexels.com/photos/5109341/pexels-photo-5109341.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Riley Park",
    slug: "riley-park",
    description: "Vibrant arts scene, craft breweries, and strong community spirit",
    image: "https://images.pexels.com/photos/18058418/pexels-photo-18058418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Kerrisdale",
    slug: "kerrisdale",
    description: "Upscale village living with boutique shopping and elegant heritage homes",
    image: "https://images.pexels.com/photos/33310374/pexels-photo-33310374.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    description: "Transit-oriented living along Vancouver's most dynamic growth corridor",
    image: "https://images.pexels.com/photos/11424605/pexels-photo-11424605.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
];

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: Full-screen Hero with Slideshow */}
      <HeroSlideshow height="full">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Aparna Kapur
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto">
            I know Oakridge and Vancouver&apos;s south side inside out. If you&apos;re buying or selling here, let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buying"
              className="px-8 py-4 bg-white text-teal-900 rounded-xl text-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg"
            >
              Buy
            </Link>
            <Link
              href="/selling"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Sell
            </Link>
            <Link
              href="/selling/home-valuation"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Value Your Home
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </HeroSlideshow>

      {/* SECTION 2: AI Chat Assistant */}
      <section className="py-16 bg-teal-950">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-1 italic">
              My Comprehensive Guide.
            </h2>
            <p className="font-serif text-2xl md:text-3xl text-white/80 italic">
              Ask Me Anything, Vancouver!
            </p>
          </div>
          <HeroChat />
        </div>
      </section>

      {/* SECTION 3: About Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-warm-100">
                <img
                  src="/images/about/aparna-kapur.jpg"
                  alt="Aparna Kapur and Cooper - Vancouver Realtor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-teal-700 text-white rounded-2xl p-6 shadow-xl hidden md:block">
                <p className="font-serif text-lg">Oakwyn Realty</p>
                <p className="text-sm text-teal-200">Vancouver&apos;s Top Brokerage</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
                About Me
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 leading-tight mb-6">
                Hi, I&apos;m Aparna
              </h2>
              <p className="text-warm-600 leading-relaxed mb-4">
                I live and work on Vancouver&apos;s south side. Oakridge, Marpole, South Cambie, Kerrisdale &mdash;
                I walk these neighbourhoods every week. I know which streets flood with traffic at 5pm,
                which blocks are getting rezoned, and which buildings have the best strata management.
                That kind of knowledge only comes from being here.
              </p>
              <p className="text-warm-600 leading-relaxed mb-6">
                When you work with me, you get one person &mdash; not a team, not a junior associate.
                I pick up the phone, I show up to every inspection, and I will tell you straight if a
                property is not worth your money. I am with Oakwyn Realty because they are the best
                brokerage in Vancouver, and that gives my clients access to market intelligence and a
                network that makes a real difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/about/why-work-with-me" variant="primary">
                  Why Work With Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3b: January 2026 Market Snapshot */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-600 text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            January 2026
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-teal-950 italic leading-tight mb-16">
            Metro Vancouver Market
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">$1.1M</p>
              <p className="text-xs uppercase tracking-wider text-warm-600 leading-relaxed">
                Composite<br />Benchmark Price
              </p>
              <p className="text-[10px] text-warm-400 italic mt-1">Lowest since mid-2021</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">-12.2%</p>
              <p className="text-xs uppercase tracking-wider text-warm-600 leading-relaxed">
                Van West Detached<br />Year-Over-Year
              </p>
              <p className="text-[10px] text-warm-400 italic mt-1">~$410K off peak pricing</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">12,628</p>
              <p className="text-xs uppercase tracking-wider text-warm-600 leading-relaxed">
                Active<br />Listings
              </p>
              <p className="text-[10px] text-warm-400 italic mt-1">38% above 10-yr average</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">+25.5%</p>
              <p className="text-xs uppercase tracking-wider text-warm-600 leading-relaxed">
                10-Year Composite<br />Appreciation
              </p>
              <p className="text-[10px] text-warm-400 italic mt-1">Long-term holders winning</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">-7.3%</p>
              <p className="text-xs uppercase tracking-wider text-warm-600 leading-relaxed">
                New Listings vs.<br />January 2025
              </p>
              <p className="text-[10px] text-warm-400 italic mt-1">No flood of supply</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">-5.4%</p>
              <p className="text-xs uppercase tracking-wider text-warm-600 leading-relaxed">
                Townhouse<br />Benchmark YoY
              </p>
              <p className="text-[10px] text-warm-400 italic mt-1">Entry-level holding up</p>
            </div>
          </div>
          <p className="text-[10px] text-warm-400 uppercase tracking-wider mt-10">
            Source: Greater Vancouver REALTORS&reg; &bull; MLS&reg; HPI &bull; January 2026
          </p>
          <div className="mt-8">
            <Button href="/resources/market-reports" variant="outline">
              View Market Reports
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4: Featured Neighborhoods */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Neighbourhoods"
            title="I Know These Streets"
            description="I have walked every block of these neighbourhoods. Here is what you should know before buying or selling in each one."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((hood) => (
              <Link
                key={hood.slug}
                href={`/neighborhoods/${hood.slug}`}
                className="group relative rounded-2xl overflow-hidden h-72 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={hood.image}
                  alt={`${hood.name} Vancouver neighborhood`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl text-white mb-1 group-hover:text-teal-200 transition-colors">
                    {hood.name}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {hood.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/neighborhoods" variant="outline">
              View All Neighborhoods
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Oakridge Spotlight — Magazine Cover */}
      <Link
        href="/neighborhoods/oakridge"
        className="group relative block h-[85vh] overflow-hidden cursor-pointer"
      >
        <img
          src="https://images.pexels.com/photos/30294477/pexels-photo-30294477.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Aerial view of Stanley Park Seawall with lush greenery and calm waters"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/60 to-transparent" />
        <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-16">
          <p className="text-teal-300 text-xs uppercase tracking-[0.3em] font-semibold mb-4">
            Featured Neighbourhood
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-6">
            Oakridge
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
            Vancouver&apos;s most exciting transformation. The $6B Oakridge Park
            redevelopment is bringing world-class living to the heart of the city.
          </p>
          <div className="flex flex-wrap gap-6 sm:gap-10 mb-8">
            <div>
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">3,300+</span>
              <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">New Homes</p>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">9 Acres</span>
              <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">Public Park</p>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">15 min</span>
              <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">To Downtown</p>
            </div>
          </div>
          <span className="inline-flex items-center text-white text-sm font-medium uppercase tracking-wider group-hover:text-teal-300 transition-colors">
            Explore the Oakridge Guide
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>

      {/* SECTION 6: Resources Preview */}
      <section className="py-20 bg-teal-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Resources"
            title="Do Your Homework"
            description="I put these together so you can go into your first conversation with me already knowing the basics. The real strategy starts when we talk."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/resources/market-reports"
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-white mb-2">Market Reports</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Stay informed with monthly Vancouver real estate market analysis and trends.
              </p>
            </Link>
            <Link
              href="/buying/guide"
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-white mb-2">Buyer&apos;s Guide</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                A complete 6-step guide to buying a home in Vancouver, from pre-approval to moving day.
              </p>
            </Link>
            <Link
              href="/resources/mortgage-calculator"
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-white mb-2">Mortgage Calculator</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Estimate your monthly payments and understand what you can afford in Vancouver.
              </p>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Button href="/resources" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              View All Resources
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: Contact */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
                Get in Touch
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 leading-tight mb-6">
                Let&apos;s Talk
              </h2>
              <p className="text-warm-600 leading-relaxed mb-8">
                Thinking about buying or selling? Even if you are a year away, I am happy to
                have a conversation about what the market looks like in your neighbourhood.
                No pitch &mdash; just an honest assessment of where things stand.
              </p>
              <div className="space-y-4 mb-8">
                <a
                  href="tel:+16046127694"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-warm-800">Call or Text</p>
                    <p className="text-sm text-warm-500">604-612-7694</p>
                  </div>
                </a>
                <a
                  href="mailto:aparna@aparnakapur.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-warm-800">Email Me</p>
                    <p className="text-sm text-warm-500">aparna@aparnakapur.com</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-warm-100">
              <h3 className="font-serif text-xl text-teal-950 mb-6">
                Send Me a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
