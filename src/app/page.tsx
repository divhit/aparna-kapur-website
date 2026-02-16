import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import HeroChat from "@/components/chat/HeroChat";

const neighborhoods = [
  {
    name: "Oakridge",
    slug: "oakridge",
    description: "Vancouver's most exciting transformation - 3,300+ new homes, world-class amenities",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  },
  {
    name: "Marpole",
    slug: "marpole",
    description: "A family-friendly community with historic charm and easy airport access",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
  },
  {
    name: "South Cambie",
    slug: "south-cambie",
    description: "Tree-lined streets, top schools, and Queen Elizabeth Park at your doorstep",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&h=400&fit=crop",
  },
  {
    name: "Riley Park",
    slug: "riley-park",
    description: "Vibrant arts scene, craft breweries, and strong community spirit",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  },
  {
    name: "Kerrisdale",
    slug: "kerrisdale",
    description: "Upscale village living with boutique shopping and elegant heritage homes",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
  },
  {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    description: "Transit-oriented living along Vancouver's most dynamic growth corridor",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
  },
];

const stats = [
  { value: "$6.3B", label: "Oakwyn Sales Volume", sublabel: "2023" },
  { value: "900+", label: "Oakwyn Agents", sublabel: "Across BC" },
  { value: "#1", label: "Fastest Growing", sublabel: "Vancouver Brokerage" },
  { value: "100%", label: "Client Focused", sublabel: "Your Goals First" },
];

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: Full-screen Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-teal-950/40 to-teal-950/80" />
        </div>
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Vancouver Real Estate
            <span className="block text-teal-300 mt-2">With Aparna Kapur</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto">
            Oakridge &amp; Greater Vancouver specialist. Local expertise, genuine care, every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buying"
              className="px-8 py-4 bg-white text-teal-900 rounded-xl text-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg"
            >
              Find Your Home
            </Link>
            <Link
              href="/selling"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Sell Your Home
            </Link>
            <Link
              href="/selling/home-valuation"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Home Valuation
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: AI Chat Assistant */}
      <section className="py-16 bg-teal-950">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              AI-Powered Assistant
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
              Ask Me Anything
            </h2>
            <p className="text-white/60 text-lg">
              Neighbourhoods, mortgages, buying, selling &mdash; get instant answers.
            </p>
          </div>
          <HeroChat />
        </div>
      </section>

      {/* SECTION 3: Oakridge Spotlight */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
                Neighborhood Spotlight
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 leading-tight mb-6">
                Oakridge is Transforming Into Vancouver&apos;s Most Exciting Neighborhood
              </h2>
              <p className="text-warm-600 leading-relaxed mb-6">
                With the $6 billion Oakridge Park redevelopment bringing 3,300+ new homes,
                a 9-acre public park, and world-class retail to the heart of Vancouver, Oakridge
                is the most exciting real estate opportunity in the city. Two SkyTrain stations,
                top-rated schools, and Queen Elizabeth Park make this neighborhood unmatched.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="font-serif text-2xl text-teal-700">3,300+</p>
                  <p className="text-xs text-warm-500 mt-1">New Homes Coming</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">9 Acres</p>
                  <p className="text-xs text-warm-500 mt-1">New Public Park</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-teal-700">15 min</p>
                  <p className="text-xs text-warm-500 mt-1">To Downtown</p>
                </div>
              </div>
              <Button href="/neighborhoods/oakridge" variant="primary">
                Explore the Oakridge Guide
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=500&fit=crop"
                  alt="Queen Elizabeth Park Vancouver"
                  className="rounded-2xl w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop"
                  alt="Vancouver SkyTrain transit"
                  className="rounded-2xl w-full h-48 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
                  alt="Oakridge Vancouver homes"
                  className="rounded-2xl w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=500&fit=crop"
                  alt="Vancouver parks and nature"
                  className="rounded-2xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Buyer/Seller/Valuation Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="How Can I Help?"
            title="Whether You're Buying or Selling, I'm Here to Guide You"
            description="Real estate doesn't have to be overwhelming. Let me simplify the process and help you make the best decision for your future."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Buying Card */}
            <Link
              href="/buying"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-warm-100"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
                  alt="Buying a home in Vancouver"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-teal-950 mb-2">Buying a Home</h3>
                <p className="text-sm text-warm-600 leading-relaxed mb-4">
                  From first-time buyers to seasoned investors, I&apos;ll help you find the
                  perfect property in Vancouver&apos;s best neighborhoods.
                </p>
                <span className="inline-flex items-center text-sm font-medium text-teal-700 group-hover:text-teal-800">
                  Start Your Buyer Journey
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Selling Card */}
            <Link
              href="/selling"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-warm-100"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop"
                  alt="Selling your home in Vancouver"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-teal-950 mb-2">Selling Your Home</h3>
                <p className="text-sm text-warm-600 leading-relaxed mb-4">
                  Get the best value for your home with strategic pricing, professional
                  staging advice, and expert negotiation.
                </p>
                <span className="inline-flex items-center text-sm font-medium text-teal-700 group-hover:text-teal-800">
                  Start Your Seller Journey
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Home Valuation Card */}
            <Link
              href="/selling/home-valuation"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-warm-100"
            >
              <div className="h-56 overflow-hidden bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium opacity-80">Free Estimate</p>
                </div>
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-teal-950 mb-2">What&apos;s My Home Worth?</h3>
                <p className="text-sm text-warm-600 leading-relaxed mb-4">
                  Get a free, no-obligation market analysis of your property based on
                  current Vancouver market data and comparable sales.
                </p>
                <span className="inline-flex items-center text-sm font-medium text-teal-700 group-hover:text-teal-800">
                  Get Your Free Valuation
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: Featured Neighborhoods */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Explore Neighborhoods"
            title="Find Your Perfect Vancouver Neighborhood"
            description="Every neighborhood has its own personality. Explore detailed guides to find the one that fits your lifestyle."
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

      {/* SECTION 5: About Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-warm-100">
                <img
                  src="/images/about/aparna-kapur.jpg"
                  alt="Aparna Kapur - Vancouver Realtor"
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
                Hi, I&apos;m Aparna Kapur
              </h2>
              <p className="text-warm-600 leading-relaxed mb-4">
                I believe in real estate that puts you first. Whether you&apos;re a first-time
                buyer navigating Vancouver&apos;s market or a seller looking to maximize your
                home&apos;s value, I bring fresh energy, deep local knowledge, and the full
                backing of Oakwyn Realty &mdash; Vancouver&apos;s fastest-growing brokerage.
              </p>
              <p className="text-warm-600 leading-relaxed mb-6">
                I specialize in Oakridge and the surrounding neighborhoods because I know them
                inside out &mdash; every street, every development, every coffee shop. When you work
                with me, you get my full, undivided attention and a data-driven approach to
                help you make the most confident decision of your life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/about" variant="primary">
                  Learn More About Me
                </Button>
                <Button href="/about/why-work-with-me" variant="ghost">
                  Why Work With Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Resources Preview */}
      <section className="py-20 bg-teal-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Resources"
            title="Tools & Guides to Help You Succeed"
            description="Knowledge is power in real estate. Access free guides, market data, and tools to make informed decisions."
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

      {/* SECTION 7: Social Proof / Credentials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Backed by the Best"
            title="The Strength of Oakwyn Realty Behind Every Transaction"
            description="As a member of Vancouver's top-performing brokerage, you get the resources of a powerhouse team with the personal attention of a dedicated agent."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl md:text-5xl text-teal-700 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-warm-800">{stat.label}</p>
                <p className="text-xs text-warm-500 mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Contact */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
                Get in Touch
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 leading-tight mb-6">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-warm-600 leading-relaxed mb-8">
                Whether you have questions about the market, want to explore neighborhoods,
                or are ready to take the next step &mdash; I&apos;m here to help. No pressure, no
                sales pitch, just honest guidance.
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
