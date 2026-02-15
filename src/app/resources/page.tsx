import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Vancouver Real Estate Resources | Guides, Tools & Market Reports",
  description:
    "Free real estate resources for Vancouver buyers and sellers. Mortgage calculator, market reports, first-time buyer guides, property transfer tax info, and more.",
};

const tools = [
  {
    title: "Mortgage Calculator",
    description:
      "Estimate your monthly payments based on home price, down payment, and interest rate. See what you can afford in Vancouver.",
    href: "/resources/mortgage-calculator",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Property Transfer Tax Guide",
    description:
      "Understand BC's Property Transfer Tax, exemptions for first-time buyers, and how to calculate what you'll owe at closing.",
    href: "/resources/property-transfer-tax",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    title: "Market Reports",
    description:
      "Stay informed with the latest Vancouver real estate market data, trends, and analysis for Oakridge and surrounding neighborhoods.",
    href: "/resources/market-reports",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const guides = [
  {
    title: "First-Time Buyers in BC",
    description:
      "A complete guide to programs, grants, and tax exemptions available to first-time home buyers in British Columbia.",
    href: "/resources/first-time-buyers-bc",
    tag: "Buyers",
  },
  {
    title: "Moving to Vancouver",
    description:
      "Everything you need to know about relocating to Vancouver — neighborhoods, cost of living, lifestyle, and practical tips.",
    href: "/resources/moving-to-vancouver",
    tag: "Relocation",
  },
  {
    title: "Buyer's Guide",
    description:
      "A comprehensive 6-step guide to buying a home in Vancouver, from deciding to buy to closing day.",
    href: "/buying/guide/deciding-to-buy",
    tag: "Buyers",
  },
  {
    title: "Seller's Guide",
    description:
      "Navigate the selling process with confidence. My 6-step guide covers everything from pricing to closing.",
    href: "/selling/guide/deciding-to-sell",
    tag: "Sellers",
  },
  {
    title: "Home Staging Tips",
    description:
      "Learn how to prepare your home for sale with proven staging strategies that help Vancouver homes sell faster and for more.",
    href: "/selling/staging-tips",
    tag: "Sellers",
  },
  {
    title: "Oakridge Neighborhood Guide",
    description:
      "The definitive guide to Oakridge — real estate, schools, transit, parks, the Oakridge Park redevelopment, and more.",
    href: "/neighborhoods/oakridge",
    tag: "Neighborhoods",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-teal-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Resources & Tools
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Your Vancouver Real Estate Toolkit
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Free guides, calculators, and market insights to help you make
            informed real estate decisions in Vancouver.
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Interactive Tools"
            title="Calculators & Data"
            description="Use these tools to plan your next real estate move with confidence."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-warm-100"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  {tool.icon}
                </div>
                <h3 className="font-serif text-lg text-teal-950 mb-2 group-hover:text-teal-700 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed mb-4">
                  {tool.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-teal-700">
                  Open Tool
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Guides & Education"
            title="Learn Before You Leap"
            description="In-depth guides written specifically for the Vancouver real estate market."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-warm-100"
              >
                <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full mb-4">
                  {guide.tag}
                </span>
                <h3 className="font-serif text-lg text-teal-950 mb-2 group-hover:text-teal-700 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed mb-4">
                  {guide.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-teal-700">
                  Read Guide
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-white/70 mb-8">
            I&apos;m always happy to answer questions about the Vancouver real
            estate market. Reach out anytime.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-gold-500 text-teal-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
