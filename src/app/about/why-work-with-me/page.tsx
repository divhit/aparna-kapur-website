import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Why Work With Aparna Kapur | Vancouver Realtor",
  description:
    "Discover why Aparna Kapur is the right choice for your Vancouver real estate journey. Backed by Oakwyn Realty, powered by local expertise.",
};

const differentiators = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "True Local Expertise",
    description:
      "I live and breathe Oakridge and Vancouver's south side. I know every street, every development timeline, every coffee shop. When you ask me about a neighborhood, you get real answers — not generic marketing.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Oakwyn Realty Backing",
    description:
      "You get the personal touch of a dedicated agent backed by Vancouver's fastest-growing brokerage. $6.3 billion in sales, 900+ agents, and the resources of a powerhouse behind every transaction.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Your Full, Undivided Attention",
    description:
      "No hand-offs to junior associates. No getting lost in a mega-team. When you work with me, you work directly with me — from first conversation to closing day and beyond.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Data-Driven Decisions",
    description:
      "I don't guess — I analyze. Every pricing recommendation, every offer strategy, and every market opinion is backed by current data, comparable sales, and strategic market analysis.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fresh Energy & Dedication",
    description:
      "I bring the hunger and dedication of someone building their reputation on every single client's success. My career is built on your satisfaction — and I never take that for granted.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Technology-Forward",
    description:
      "From professional photography and virtual tours to digital marketing and real-time market alerts, I use the latest tools to give you an edge in today's competitive market.",
  },
];

export default function WhyWorkWithMePage() {
  return (
    <>
      <PageBanner eyebrow="Your Advantage" title="Why Work With Me" description="Choosing a realtor is one of the most important decisions in your real estate journey. Here's why clients choose me." />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-warm-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg text-teal-950 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oakwyn Stats Band */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
              Powered By
            </p>
            <h2 className="font-serif text-3xl text-teal-950">
              The Strength of Oakwyn Realty
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-serif text-4xl text-teal-700">$6.3B</p>
              <p className="text-sm text-warm-600 mt-1">Sales Volume (2023)</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-teal-700">900+</p>
              <p className="text-sm text-warm-600 mt-1">Agents Across BC</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-teal-700">#1</p>
              <p className="text-sm text-warm-600 mt-1">Fastest Growing Brokerage</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-teal-700">10</p>
              <p className="text-sm text-warm-600 mt-1">Offices in BC</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-teal-950 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-warm-600 mb-8">
            Let&apos;s have a no-pressure conversation about your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Let&apos;s Talk
            </Button>
            <Button href="/buying/guide" variant="outline" size="lg">
              Read the Buyer&apos;s Guide
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
