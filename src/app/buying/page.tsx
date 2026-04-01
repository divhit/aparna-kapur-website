import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { buyingGuideSteps } from "@/lib/guide-data";
import PageBanner from "@/components/hero/PageBanner";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Buy a Home in Vancouver | Buyer's Guide",
  description:
    "Your complete guide to buying a home in Vancouver. From pre-approval to closing day, Aparna Kapur walks you through every step with expert local guidance.",
};

export default function BuyingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Buying", href: "/buying" },
        ]}
      />

      <PageBanner
        eyebrow="For Buyers"
        title="Buying a Home in Vancouver"
        description="I wrote this guide so you know exactly what to expect at every stage. Read it, then call me. Your situation is unique and the real strategy starts with a conversation."
        align="left"
      />

      {/* 6-Step Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="sr-only">Buy a Home in Vancouver with Aparna Kapur</h1>
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
            <Link
              href="/resources/first-time-buyers-bc"
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-teal-950">First-Time Buyers</h3>
                <p className="text-sm text-warm-500">BC programs &amp; grants</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Neighbourhoods for Buyers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
              Explore by Area
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-teal-950">
              Popular Neighbourhoods for Buyers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Oakridge", slug: "oakridge", price: "$1.49M", desc: "Oakridge Park redevelopment, Canada Line, top schools" },
              { name: "Marpole", slug: "marpole", price: "$1.14M", desc: "Affordable west-side entry point with river views" },
              { name: "South Cambie", slug: "south-cambie", price: "$1.44M", desc: "Queen Elizabeth Park, Cambie Corridor transit" },
              { name: "Riley Park", slug: "riley-park", price: "$639K condos", desc: "Nat Bailey Stadium, Main Street shops, great value" },
              { name: "Kerrisdale", slug: "kerrisdale", price: "$1.90M", desc: "Village charm, boutique shopping, established families" },
              { name: "Cambie Corridor", slug: "cambie-corridor", price: "$1.46M", desc: "Transit-oriented growth along the Canada Line" },
            ].map((hood) => (
              <Link
                key={hood.slug}
                href={`/neighborhoods/${hood.slug}`}
                className="group block bg-white rounded-xl p-6 border border-warm-100 hover:border-teal-200 hover:shadow-md transition-all"
              >
                <h3 className="font-serif text-lg text-teal-950 group-hover:text-teal-700 transition-colors">
                  {hood.name}
                </h3>
                <p className="text-sm font-medium text-teal-600 mt-1">{hood.price} benchmark</p>
                <p className="text-sm text-warm-500 mt-2">{hood.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/neighborhoods"
              className="text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors underline underline-offset-2"
            >
              View all 24 Vancouver neighbourhoods
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
