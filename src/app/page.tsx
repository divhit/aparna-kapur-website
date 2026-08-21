import Link from "next/link";
import Button from "@/components/ui/Button";
import HeroChat from "@/components/chat/HeroChat";
import GetInTouch from "@/components/sections/GetInTouch";
import HeroSlideshow from "@/components/hero/HeroSlideshow";
import AllNeighbourhoodsMap from "@/components/maps/AllNeighbourhoodsMap";
import { FAQSchema } from "@/components/seo/JsonLd";
import {
  BRAND,
  FAQS,
  MARKET_SNAPSHOT,
  NAP,
  NAP_ONE_LINE,
  NEIGHBOURHOOD_COUNT,
  SPECIALTY_NEIGHBOURHOODS,
} from "@/lib/agent/site";

const neighborhoods = [
  {
    name: "South Cambie",
    slug: "south-cambie",
    description:
      "Tree-lined streets, top schools, and Queen Elizabeth Park at your doorstep",
    image: "/images/neighborhoods/south-cambie.jpg",
  },
  {
    name: "Riley Park",
    slug: "riley-park",
    description:
      "Vibrant arts scene, craft breweries, and strong community spirit",
    image: "/images/neighborhoods/riley-park.jpg",
  },
  {
    name: "Kerrisdale",
    slug: "kerrisdale",
    description:
      "Upscale village living with boutique shopping and elegant heritage homes",
    image: "/images/neighborhoods/kerrisdale.jpg",
  },
  {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    description:
      "Transit-oriented living along Vancouver's most dynamic growth corridor",
    image: "/images/neighborhoods/cambie-corridor.webp",
  },
  {
    name: "Marpole",
    slug: "marpole",
    description:
      "A family-friendly community with historic charm and easy airport access",
    image:
      "https://images.pexels.com/photos/1417252/pexels-photo-1417252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
];

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={FAQS} />

      {/* SECTION 1: Full-screen Hero with Slideshow */}
      <HeroSlideshow height="full">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
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
              <div className="absolute bottom-4 left-4">
                <img
                  src="/images/logos/oakwyn-realty.png"
                  alt="Oakwyn Realty"
                  className="h-12 md:h-16 drop-shadow-lg"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 leading-tight mb-6 italic font-bold">
                Hi, I&apos;m Aparna
              </h2>
              <p className="text-warm-600 leading-relaxed mb-4">
                I live and work on Vancouver&apos;s south side. Oakridge,
                Marpole, South Cambie, Kerrisdale. I walk these neighbourhoods
                every week. I know which streets flood with traffic at 5pm,
                which blocks are getting rezoned, and which buildings have the
                best strata management. That kind of knowledge only comes from
                being here.
              </p>
              <p className="text-warm-600 leading-relaxed mb-4">
                When you work with me, you get one person, not a team, not a
                junior associate. I pick up the phone, I show up to every
                inspection, and I will tell you straight if a property is not
                worth your money.
              </p>
              <p className="text-warm-600 leading-relaxed mb-6">
                I am with Oakwyn Realty because they are a top brokerage in
                Vancouver, and that gives my clients access to market
                intelligence and a network that makes a real difference.
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

      {/* SECTION 3b: Market Snapshot — driven by MARKET_SNAPSHOT so the
          homepage and the markdown/llms.txt representations cannot disagree */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight mb-16">
            {MARKET_SNAPSHOT.heading}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            {MARKET_SNAPSHOT.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-xs text-teal-600 italic font-medium mb-2">
                  {metric.context}
                </p>
                <p className="font-serif text-3xl md:text-4xl text-teal-600 mb-2">
                  {metric.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-warm-600 leading-relaxed">
                  {metric.labelLines[0]}
                  <br />
                  {metric.labelLines[1]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-warm-400 uppercase tracking-wider mt-10">
            Source: {MARKET_SNAPSHOT.source}
          </p>
        </div>
      </section>

      {/* SECTION 4: Featured Neighborhoods */}
      <section className="bg-warm-50">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight">
            Neighbourhoods I Know Street by Street
          </h2>
          <p className="text-warm-600 leading-relaxed mt-4 max-w-2xl mx-auto">
            Every guide below carries current MLS&reg; HPI benchmark pricing,
            school and transit context, and the development plans that will
            shape values over the next few years.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {/* UBC cell — links to UBC neighbourhood page */}
          <Link
            href="/neighborhoods/ubc"
            className="group relative h-80 sm:h-96 overflow-hidden transition-all duration-300"
          >
            <img
              src="https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="UBC Vancouver neighbourhood"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest group-hover:text-teal-200 transition-colors">
                UBC
              </h3>
            </div>
          </Link>
          {/* Neighbourhood image links */}
          {neighborhoods.map((hood) => (
            <Link
              key={hood.slug}
              href={`/neighborhoods/${hood.slug}`}
              className="group relative overflow-hidden h-80 sm:h-96 transition-all duration-300"
            >
              <img
                src={hood.image}
                alt={`${hood.name} Vancouver neighborhood`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
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
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Link>

      {/* SECTION 5b: Interactive Neighbourhood Map — full width */}
      <section>
        <AllNeighbourhoodsMap fullWidth />
      </section>

      {/* SECTION 5c: GEO-optimized entity summary — structured for LLM extraction */}
      <section className="py-16 bg-teal-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white/90 italic font-bold mb-6">
            Vancouver Real Estate Agent — Oakridge Specialist
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Aparna Kapur is a licensed real estate agent in Vancouver, BC, with
            Oakwyn Realty Ltd. She specializes in Oakridge, Marpole, South
            Cambie, Riley Park, Kerrisdale, and the Cambie Corridor. Aparna
            lives on Vancouver&apos;s south side and provides personalized
            service for buyers and sellers, handling every transaction
            personally from consultation to closing.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-10">
            Oakwyn Realty is one of British Columbia&apos;s largest independent
            brokerages with over 900 agents and $6.3 billion in annual sales.
            Aparna can be reached at {NAP.telephone}.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left mb-10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-3">
                What I help with
              </h3>
              <ul className="text-white/70 text-sm leading-relaxed space-y-1.5">
                <li>Buying a house, condo, or townhome in Vancouver</li>
                <li>Selling with pricing strategy and staging</li>
                <li>Free comparative market analysis for owners</li>
                <li>First-time buyer programs and BC closing costs</li>
                <li>Neighbourhood and school catchment guidance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-3">
                Where I work
              </h3>
              <ul className="text-white/70 text-sm leading-relaxed space-y-1.5">
                {SPECIALTY_NEIGHBOURHOODS.map((name) => (
                  <li key={name}>{name}</li>
                ))}
                <li className="text-white/50">
                  Plus {NEIGHBOURHOOD_COUNT - SPECIALTY_NEIGHBOURHOODS.length}{" "}
                  more Vancouver neighbourhood guides
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-3">
                How to reach me
              </h3>
              <ul className="text-white/70 text-sm leading-relaxed space-y-1.5">
                <li>Phone: {NAP.telephone}</li>
                <li>Email: {NAP.email}</li>
                <li>{NAP_ONE_LINE}</li>
                <li>
                  {BRAND.jobTitle} licensed in British Columbia (BCFSA)
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about/why-work-with-me"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
            >
              About Aparna
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5d: Homepage FAQ — the same answers served by /llms.txt,
          /agents.md, and the markdown twin, so every representation agrees */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight mb-10 text-center">
            Common Questions
          </h2>
          <dl className="space-y-8">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <dt>
                  <h3 className="font-serif text-xl text-teal-900 mb-2">
                    {faq.q}
                  </h3>
                </dt>
                <dd className="text-warm-600 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SECTION 6: Get In Touch */}
      <GetInTouch />
    </>
  );
}
