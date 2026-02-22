import type { Metadata } from "next";
import HomeValuationForm from "@/components/forms/HomeValuationForm";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import PageBanner from "@/components/hero/PageBanner";

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

      <PageBanner eyebrow="Free Service" title="What's Your Home Worth?" description="Get a free, no-obligation Comparative Market Analysis based on current Vancouver market data and recent comparable sales in your neighbourhood." />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 mb-6 italic font-bold">
                Home Valuation
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
