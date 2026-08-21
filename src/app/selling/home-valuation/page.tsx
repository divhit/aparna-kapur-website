import type { Metadata } from "next";
import HomeValuationForm from "@/components/forms/HomeValuationForm";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Free Home Valuation | Vancouver",
  description:
    "Get a free, no-obligation market analysis of your Vancouver home. Aparna Kapur provides expert valuations based on current market data and comparable sales.",
};

/** What a seller actually wants to know before asking for a valuation. */
const VALUATION_FAQS = [
  {
    q: "What is a comparative market analysis, and how is it different from the benchmark price?",
    a: "A benchmark tracks a typical property for an area and property type — useful for reading a market, useless for pricing a specific home. A comparative market analysis looks at your actual property: its size, layout, condition, outlook, exposure, strata history if it has one, and what genuinely comparable homes nearby have sold for recently. Two homes on the same block can be a few hundred thousand apart, and only the second method sees that.",
  },
  {
    q: "Does it cost anything, and am I committing to list?",
    a: "No, and no. The analysis is free and carries no obligation. Plenty of people ask a year or more before they sell, or purely to understand what they are sitting on — that is a completely normal reason to ask.",
  },
  {
    q: "How long does it take?",
    a: "Usually two to three business days from the time Aparna has seen the property. She will walk through it in person where possible, because condition and layout are exactly what the numbers cannot tell her from a desk.",
  },
  {
    q: "What do you need from me?",
    a: "The address to begin with. Beyond that, anything you know about renovations, the age of the roof and mechanicals, and — for a strata — recent minutes, the depreciation report, and any upcoming special levies. Those change the number more than most sellers expect.",
  },
  {
    q: "Will you tell me my home is worth more to win the listing?",
    a: "No. Overpricing is the most expensive mistake a seller can make: the listing sits, the market reads the days-on-market, and the eventual sale price comes in below where an honest price would have landed. Aparna will show you the comparable sales the number is built on, so you can judge the reasoning rather than take a figure on faith.",
  },
];

export default function HomeValuationPage() {
  return (
    <>
      <FAQSchema faqs={VALUATION_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Selling", href: "/selling" },
          { name: "Home Valuation", href: "/selling/home-valuation" },
        ]}
      />

      <PageBanner heading={false} eyebrow="Free Service" title="What's Your Home Worth?" description="Get a free, no-obligation Comparative Market Analysis based on current Vancouver market data and recent comparable sales in your neighbourhood." />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="sr-only">Free Vancouver Home Valuation by Aparna Kapur</h1>
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
                    desc: "Tell me about your property: type, size, features, and neighbourhood. The more details, the more accurate my analysis.",
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
                      <h3 className="font-serif font-bold italic text-xl text-teal-950 mb-1">
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

      <section
        id="valuation-questions"
        aria-labelledby="valuation-questions-heading"
        className="pb-20"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2
            id="valuation-questions-heading"
            className="font-serif text-2xl md:text-3xl text-teal-950 mb-8"
          >
            What sellers ask first
          </h2>
          <div className="space-y-7">
            {VALUATION_FAQS.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-serif text-lg text-teal-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-warm-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
