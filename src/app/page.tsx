import Link from "next/link";
import Button from "@/components/ui/Button";
import HeroChat from "@/components/chat/HeroChat";
import GetInTouch from "@/components/sections/GetInTouch";
import HeroSlideshow from "@/components/hero/HeroSlideshow";

const neighborhoods = [
  {
    name: "South Cambie",
    slug: "south-cambie",
    description: "Tree-lined streets, top schools, and Queen Elizabeth Park at your doorstep",
    image: "https://images.pexels.com/photos/11758239/pexels-photo-11758239.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Riley Park",
    slug: "riley-park",
    description: "Vibrant arts scene, craft breweries, and strong community spirit",
    image: "https://images.pexels.com/photos/226424/pexels-photo-226424.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Kerrisdale",
    slug: "kerrisdale",
    description: "Upscale village living with boutique shopping and elegant heritage homes",
    image: "https://images.pexels.com/photos/5846801/pexels-photo-5846801.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    description: "Transit-oriented living along Vancouver's most dynamic growth corridor",
    image: "https://images.pexels.com/photos/11455843/pexels-photo-11455843.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    name: "Marpole",
    slug: "marpole",
    description: "A family-friendly community with historic charm and easy airport access",
    image: "https://images.pexels.com/photos/1417252/pexels-photo-1417252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
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
            I know Oakridge and Vancouver&apos;s south side inside out.
            <br />
            If you&apos;re buying or selling here, let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buying/guide/the-big-decision"
              className="px-8 py-4 bg-white text-teal-900 rounded-xl text-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg"
            >
              BUYING
            </Link>
            <Link
              href="/selling/guide/deciding-to-sell"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              SELLING
            </Link>
            <Link
              href="/selling/home-valuation"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              VALUATION
            </Link>
          </div>
        </div>
      </HeroSlideshow>

      {/* SECTION 2: AI Chat Assistant */}
      <section className="py-16 bg-teal-950">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl text-white/80 italic font-bold">
              My Comprehensive Guide.
            </h2>
            <p className="font-serif text-3xl md:text-4xl text-white/80 italic font-bold">
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
              <div className="absolute -bottom-6 -right-6 bg-teal-700 rounded-2xl p-6 shadow-xl hidden md:block">
                <img
                  src="/images/logos/oakwyn-realty-white.png"
                  alt="Oakwyn Realty"
                  className="h-20"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 leading-tight mb-6 italic font-bold">
                Hi, I&apos;m Aparna
              </h2>
              <p className="text-warm-600 leading-relaxed mb-4">
                I live and work on Vancouver&apos;s south side. Oakridge, Marpole, South Cambie, Kerrisdale.
                I walk these neighbourhoods every week. I know which streets flood with traffic at 5pm,
                which blocks are getting rezoned, and which buildings have the best strata management.
                That kind of knowledge only comes from being here.
              </p>
              <p className="text-warm-600 leading-relaxed mb-6">
                When you work with me, you get one person, not a team, not a junior associate.
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
          <h2 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight mb-16">
            January 2026, Vancouver
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
        </div>
      </section>

      {/* SECTION 4: Featured Neighborhoods */}
      <section className="bg-warm-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {/* Heading cell — image with teal gradient overlay */}
          <div className="relative h-72 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Vancouver greenery"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/70 to-teal-950/40" />
            <div className="relative h-full flex flex-col justify-end p-6">
              <h2 className="font-serif text-3xl md:text-4xl text-white italic font-bold leading-tight">
                Neighbourhoods
              </h2>
              <p className="font-serif text-xl md:text-2xl text-white/70 italic font-bold">
                I know these streets
              </p>
            </div>
          </div>
          {/* Neighbourhood image links */}
          {neighborhoods.map((hood) => (
            <Link
              key={hood.slug}
              href={`/neighborhoods/${hood.slug}`}
              className="group relative overflow-hidden h-72 hover:opacity-90 transition-all duration-300"
            >
              <img
                src={hood.image}
                alt={`${hood.name} Vancouver neighborhood`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-widest group-hover:text-teal-200 transition-colors">
                  {hood.name}
                </h3>
              </div>
            </Link>
          ))}
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
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/60 to-transparent" />
        <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-16">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-6">
            Oakridge
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
            Vancouver&apos;s most exciting transformation.
            <br />
            Bringing world-class living to the heart of the city.
          </p>
          <span className="inline-flex items-center text-white text-sm font-medium uppercase tracking-wider group-hover:text-teal-300 transition-colors">
            Explore the Oakridge Guide
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>

      {/* SECTION 6: Get In Touch */}
      <GetInTouch />
    </>
  );
}
