import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { buyingGuideSteps } from "@/lib/guide-data";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Buy a Home in Vancouver | Buyer's Guide & Resources",
  description:
    "Your complete guide to buying a home in Vancouver. From pre-approval to closing day, Aparna Kapur walks you through every step with expert local guidance.",
};

export default function BuyingPage() {
  return (
    <>
      <PageBanner
        eyebrow="For Buyers"
        title="Your Home Buying Journey Starts Here"
        description="Buying a home in Vancouver doesn't have to be overwhelming. I'll guide you through every step with local expertise, market data, and genuine care for your goals."
        align="left"
      />

      {/* 6-Step Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
              Your Roadmap
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-teal-950">
              6 Steps to Buying Your Home
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyingGuideSteps.map((step) => (
              <Link
                key={step.slug}
                href={`/buying/guide/${step.slug}`}
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

      {/* Quick Links */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/buying/search"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-teal-950">Search Homes</h3>
                <p className="text-sm text-warm-500">Browse current listings</p>
              </div>
            </Link>
            <Link
              href="/neighborhoods/oakridge"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-teal-950">Explore Oakridge</h3>
                <p className="text-sm text-warm-500">Detailed neighborhood guide</p>
              </div>
            </Link>
            <Link
              href="/resources/mortgage-calculator"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-teal-950">Mortgage Calculator</h3>
                <p className="text-sm text-warm-500">Estimate your payments</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
