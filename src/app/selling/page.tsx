import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { sellingGuideSteps } from "@/lib/guide-data";

export const metadata: Metadata = {
  title: "Sell Your Vancouver Home | Seller's Guide & Valuation",
  description:
    "Sell your Vancouver home for top dollar. Expert pricing, staging advice, and negotiation from Aparna Kapur at Oakwyn Realty.",
};

export default function SellingPage() {
  return (
    <>
      <section className="relative py-24 bg-teal-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              For Sellers
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Sell Your Home With Confidence
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Get the best value for your home with strategic pricing, expert
              marketing, and skilled negotiation. I&apos;ll guide you from listing
              to closing with clarity and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/selling/home-valuation" size="lg" variant="secondary">
                What&apos;s My Home Worth?
              </Button>
              <Button href="/selling/guide" size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Read the Seller&apos;s Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
              Your Roadmap
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-teal-950">
              6 Steps to Selling Your Home
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellingGuideSteps.map((step) => (
              <Link
                key={step.slug}
                href={`/selling/guide/${step.slug}`}
                className="group bg-white rounded-2xl p-8 border border-warm-100 hover:shadow-lg hover:border-teal-200 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-serif text-lg font-semibold">
                    {step.step}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-warm-400 font-semibold">
                    Step {step.step} of 6
                  </span>
                </div>
                <h3 className="font-serif text-lg text-teal-950 mb-2 group-hover:text-teal-700 transition-colors">
                  {step.shortTitle}
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  {step.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/selling/home-valuation"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-teal-950">Home Valuation</h3>
                <p className="text-sm text-warm-500">Free market analysis</p>
              </div>
            </Link>
            <Link
              href="/selling/staging-tips"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-teal-950">Staging Tips</h3>
                <p className="text-sm text-warm-500">Maximize your home&apos;s appeal</p>
              </div>
            </Link>
            <Link
              href="/resources/market-reports"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-teal-950">Market Reports</h3>
                <p className="text-sm text-warm-500">Current market trends</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
