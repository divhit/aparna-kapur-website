import type { Metadata } from "next";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import LandingLeadForm from "@/components/landing/LandingLeadForm";

export const metadata: Metadata = {
  title: "What's Your Vancouver Home Worth? | Free Valuation",
  description:
    "Get a free, no-obligation market analysis of your Vancouver home. Find out what your property is worth in today's market.",
};

const FEATURED_HOODS = [
  "oakridge",
  "marpole",
  "kerrisdale",
  "south-cambie",
  "riley-park",
  "cambie-corridor",
];

export default function HomeValueLandingPage() {
  const hoods = FEATURED_HOODS.map((slug) => NEIGHBOURHOODS[slug]).filter(
    Boolean,
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Free &bull; No Obligation &bull; Confidential
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6">
            What&apos;s Your Vancouver Home Worth?
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get a personalized Comparative Market Analysis based on recent
            sales, current listings, and your home&apos;s unique features
            &mdash; delivered by a local expert who knows your neighbourhood.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-teal-950 text-center italic font-bold mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Me About Your Home",
                desc: "Share your property type, neighbourhood, and key features. Takes less than 2 minutes.",
              },
              {
                step: "2",
                title: "I Research Your Market",
                desc: "I analyze recent comparable sales, active listings, and neighbourhood trends specific to your property.",
              },
              {
                step: "3",
                title: "Receive Your CMA Report",
                desc: "Within 24 hours, you'll get a detailed valuation with pricing strategy and market insights.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg text-teal-950 font-bold italic mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market snapshot + Form */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Market data as proof */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-teal-950 italic font-bold mb-3">
                Current Market Snapshot
              </h2>
              <p className="text-warm-600 text-sm mb-8">
                Average benchmark prices across Vancouver&apos;s most
                sought-after neighbourhoods. Your home could be worth more
                &mdash; or less &mdash; depending on its unique characteristics.
              </p>
              <div className="space-y-3">
                {hoods.map((hood) => (
                  <div
                    key={hood.slug}
                    className="flex items-center justify-between py-3 px-4 rounded-lg border border-warm-100 bg-warm-50"
                  >
                    <div>
                      <p className="font-serif text-teal-950 font-semibold">
                        {hood.name}
                      </p>
                      <p className="text-xs text-warm-500">{hood.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg text-teal-800 font-bold">
                        {hood.avgPrice}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          hood.priceChange.startsWith("-")
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {hood.priceChange}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-warm-400 mt-4">
                Source: GVR MLS HPI Benchmark, March 2026. Individual property
                values vary based on size, condition, and specific location.
              </p>
            </div>

            {/* Right: Lead capture form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 sticky top-24">
              <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2">
                Get Your Free Valuation
              </h3>
              <p className="text-sm text-warm-500 mb-6">
                Tell me about your property and I&apos;ll prepare a personalized
                market analysis within 24 hours.
              </p>
              <LandingLeadForm
                variant="seller"
                source="LP: Home Value"
                ctaText="Get My Free Valuation"
                successMessage="Your personalized CMA is being prepared. Aparna will reach out within 24 hours to walk you through your home's current market position."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-warm-500 text-sm uppercase tracking-widest mb-4">
            Trusted by Vancouver homeowners
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-800 font-bold">
                200+
              </p>
              <p className="text-xs text-warm-500 mt-1">Valuations Completed</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-800 font-bold">
                24
              </p>
              <p className="text-xs text-warm-500 mt-1">
                Neighbourhoods Served
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-teal-800 font-bold">
                24hr
              </p>
              <p className="text-xs text-warm-500 mt-1">
                Average Response Time
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
