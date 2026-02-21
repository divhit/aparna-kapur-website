import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";
import GetInTouch from "@/components/sections/GetInTouch";

export const metadata: Metadata = {
  title: "Oakwyn Realty | About My Brokerage | Aparna Kapur",
  description:
    "Learn about Oakwyn Realty, one of Vancouver's fastest-growing and most innovative real estate brokerages. $6.3B in sales, 900+ agents, and a culture of excellence.",
};

export default function OakwynRealtyPage() {
  return (
    <>
      <PageBanner eyebrow="My Brokerage" title="Oakwyn Realty" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-warm-100">
                <img
                  src="/images/about/aparna-kapur.jpg"
                  alt="Aparna Kapur - Vancouver Realtor with Oakwyn Realty"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-teal-950 mb-6 italic font-bold">
                  Oakwyn Realty
                </h2>
                <div className="space-y-4 text-warm-600 leading-relaxed">
                  <p>
                    When I chose to build my real estate career, I was intentional
                    about the brokerage I joined. Oakwyn Realty isn&apos;t just a
                    brokerage — it&apos;s a community of top-performing agents backed
                    by industry-leading technology, training, and support. Here&apos;s
                    what that means for my clients.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl text-teal-900 mb-4">
                  What Oakwyn Means for You
                </h3>
                <div className="space-y-4">
                  {[
                    "Cutting-edge technology — from advanced market analytics to digital transaction management, giving you an edge in today\u2019s market",
                    "A collaborative network of 900+ experienced agents who may already have insights on a building, neighbourhood, or a buyer for your home",
                    "Comprehensive training and mentorship that keeps me sharp and ahead of market trends",
                    "Professional photography, videography, print design, and digital marketing to present your property at the highest level",
                    "Access to market data and analytics before they hit public platforms",
                    "Legal and compliance support to protect your interests at every step",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-sm text-warm-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
