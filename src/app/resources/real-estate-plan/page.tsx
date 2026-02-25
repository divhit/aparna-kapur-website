import type { Metadata } from "next";
import Link from "next/link";
import GetInTouch from "@/components/sections/GetInTouch";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Your Real Estate Plan | Aparna Kapur, Vancouver Realtor",
  description:
    "A clear, personalized plan for your real estate goals. Whether you're buying your first home, selling, or building an investment portfolio, let's create a strategy that works for you.",
};

export default function RealEstatePlanPage() {
  return (
    <>
      <PageBanner
        eyebrow="Your Strategy"
        title="Your Real Estate Plan"
        description="A clear, personalized approach to your real estate goals, whether you're buying, selling, or investing in Vancouver."
      />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Intro */}
          <p className="text-warm-600 leading-relaxed mb-4">
            Real estate is one of the biggest financial decisions you will make. Yet most people go into it without a plan. They start browsing listings, get overwhelmed, and either rush into something or freeze entirely.
          </p>
          <p className="text-warm-600 leading-relaxed mb-12">
            I believe in starting with a plan. A simple, honest conversation about where you are, where you want to be, and how real estate fits into the picture. No jargon, no pressure, just clarity.
          </p>

          {/* What Can a Real Estate Plan Do */}
          <h2 className="font-serif text-2xl text-teal-950 mb-6">
            What Can a Real Estate Plan Do for You?
          </h2>
          <div className="space-y-3 mb-12">
            {[
              "Clarify whether now is the right time for you to buy, sell, or hold",
              "Identify the neighbourhoods and property types that match your lifestyle and budget",
              "Understand the true cost of ownership beyond just the purchase price",
              "Build a realistic timeline from first steps to keys in hand",
              "Maximize the programs and incentives available to you",
              "Align your real estate decisions with your broader financial goals",
              "Avoid the most common and costly mistakes buyers and sellers make",
              "Give you confidence that you are making an informed decision",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-warm-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* For Buyers */}
          <div className="border-t border-warm-100 pt-12 mb-12">
            <h2 className="font-serif text-2xl text-teal-950 mb-4">
              For Buyers
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              Buying a home in Vancouver is unlike buying anywhere else. The market moves fast, the prices are high, and the rules keep changing. A plan helps you stay grounded.
            </p>
            <p className="text-warm-600 leading-relaxed mb-4">
              Together, we will work through the essentials:
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Your budget: what you can comfortably afford, not just what you qualify for",
                "Your must-haves versus your nice-to-haves",
                "Which neighbourhoods make sense for your commute, schools, and lifestyle",
                "New construction vs. resale: the real trade-offs",
                "How to structure your offer to compete without overpaying",
                "The inspection, financing, and closing process, step by step",
              ].map((item) => (
                <li key={item} className="text-sm text-warm-600 leading-relaxed pl-4 border-l-2 border-teal-200">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-warm-600 leading-relaxed">
              If you are a first-time buyer, I will also walk you through every program and incentive available to you: the FHSA, HBP, PTT exemptions, and more. Most buyers leave money on the table simply because they do not know what is available.
            </p>
          </div>

          {/* For Sellers */}
          <div className="border-t border-warm-100 pt-12 mb-12">
            <h2 className="font-serif text-2xl text-teal-950 mb-4">
              For Sellers
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              Selling well is about more than putting a sign on the lawn. It is about timing, pricing, presentation, and strategy. A plan helps you extract the most value from your property.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Accurate pricing based on real comparables, not guesswork",
                "Pre-sale preparation: what to fix, what to leave, and what buyers actually care about",
                "Staging and photography that showcase your home at its best",
                "A marketing strategy that reaches serious, qualified buyers",
                "Offer management: how to evaluate multiple offers and negotiate from strength",
                "Closing coordination, including your next move if you're buying simultaneously",
              ].map((item) => (
                <li key={item} className="text-sm text-warm-600 leading-relaxed pl-4 border-l-2 border-teal-200">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-warm-600 leading-relaxed">
              I will give you a clear Comparative Market Analysis and an honest assessment of what your home is worth today. Not inflated to win your listing. Accurate, so we price it right and sell it well.
            </p>
          </div>

          {/* For Investors */}
          <div className="border-t border-warm-100 pt-12 mb-12">
            <h2 className="font-serif text-2xl text-teal-950 mb-4">
              For Investors
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              Vancouver real estate has been one of the strongest long-term investments in Canada. But not every property is a good investment, and the rules around rental properties, foreign ownership, and tax obligations continue to evolve.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Identify properties with strong rental yield and appreciation potential",
                "Understand the numbers: cap rates, cash flow, and realistic returns",
                "Navigate Vancouver's rental regulations and landlord obligations",
                "Pre-sale vs. resale investment: which strategy suits your timeline",
                "Tax implications, including the speculation tax and capital gains considerations",
                "Portfolio diversification: when to add, hold, or sell",
              ].map((item) => (
                <li key={item} className="text-sm text-warm-600 leading-relaxed pl-4 border-l-2 border-teal-200">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-warm-600 leading-relaxed">
              I work with a network of mortgage brokers, accountants, and property managers who specialize in investment properties. Together, we can build a plan that makes financial sense.
            </p>
          </div>

          {/* How It Works */}
          <div className="border-t border-warm-100 pt-12 mb-12">
            <h2 className="font-serif text-2xl text-teal-950 mb-6">
              How It Works
            </h2>
            <div className="space-y-6">
              {[
                { step: "1", title: "We Talk", desc: "A no-pressure conversation, in person, on the phone, or over coffee. I listen to your goals, your concerns, and your timeline." },
                { step: "2", title: "I Do the Research", desc: "I pull the data, analyze the market, and identify the options that make sense for your specific situation." },
                { step: "3", title: "You Get a Clear Plan", desc: "A straightforward recommendation with numbers, timelines, and next steps. No fluff, no sales pitch. Just honest guidance." },
                { step: "4", title: "We Execute Together", desc: "When you are ready to move, I handle the details from start to finish. One person, one point of contact, full accountability." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                    <span className="font-serif text-lg text-teal-700 font-semibold">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-medium text-teal-950 mb-1">{item.title}</p>
                    <p className="text-sm text-warm-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white font-serif text-sm font-semibold">
                  AK
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-900 mb-2">
                  Ready to Start?
                </p>
                <p className="text-sm text-teal-800/80 leading-relaxed italic">
                  &ldquo;Every good real estate decision starts with a conversation. Tell me what you are thinking about, whether buying, selling, investing, or just exploring, and I will give you an honest assessment of where you stand and what your options are. No cost, no commitment.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
