import type { Metadata } from "next";
import HomeValuationForm from "@/components/forms/HomeValuationForm";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Free Home Valuation | What's Your Vancouver Home Worth?",
  description:
    "Get a free, no-obligation market analysis of your Vancouver home. Aparna Kapur provides expert valuations based on current market data and comparable sales.",
};

export default function HomeValuationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Selling", href: "/selling" },
          { name: "Home Valuation", href: "/selling/home-valuation" },
        ]}
      />

      <section className="bg-teal-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Free Service
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            What&apos;s Your Home Worth?
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Get a free, no-obligation Comparative Market Analysis based on current
            Vancouver market data and recent comparable sales in your neighbourhood.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-2xl text-teal-950 mb-6">
                How My Free Home Valuation Works
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Share Your Details",
                    desc: "Tell me about your property — type, size, features, and neighbourhood. The more details, the more accurate my analysis.",
                  },
                  {
                    step: "2",
                    title: "I Research Your Market",
                    desc: "I'll analyze recent sales of comparable properties, current listings, market trends, and your home's unique features.",
                  },
                  {
                    step: "3",
                    title: "Receive Your CMA Report",
                    desc: "Within 48 hours, you'll receive a detailed Comparative Market Analysis with a recommended price range for your home.",
                  },
                  {
                    step: "4",
                    title: "Let's Discuss (Optional)",
                    desc: "If you'd like, we can meet to walk through the report and discuss your options. No pressure, no obligation.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-serif text-lg font-semibold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-medium text-teal-950 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-warm-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-teal-50 rounded-xl">
                <h3 className="font-medium text-teal-900 mb-2">
                  Why Get a CMA?
                </h3>
                <ul className="space-y-2 text-sm text-teal-800">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Know your home&apos;s true market value before listing
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Price strategically to attract the right buyers
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Understand how your home compares to recent sales
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Track your home&apos;s equity growth over time
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 h-fit">
              <h3 className="font-serif text-xl text-teal-950 mb-2">
                Request Your Free Valuation
              </h3>
              <p className="text-sm text-warm-500 mb-6">
                No obligation. I&apos;ll respond within 48 hours.
              </p>
              <HomeValuationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
