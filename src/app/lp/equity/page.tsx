import type { Metadata } from "next";
import Image from "next/image";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import AgentTrustStrip from "@/components/landing/AgentTrustStrip";

export const metadata: Metadata = {
  title: "How Much Equity Have You Built? | Vancouver Home Equity Check",
  description:
    "Find out how much equity you've built in your Vancouver home. Free, personalized equity analysis based on current market data.",
};

const ALL_HOODS = Object.values(NEIGHBOURHOODS).filter(
  (h) => h.avgPrice && h.priceChange,
);

export default function EquityLandingPage() {
  const increasing = ALL_HOODS.filter((h) => !h.priceChange.startsWith("-"));
  const decreasing = ALL_HOODS.filter((h) => h.priceChange.startsWith("-"));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Free Equity Analysis
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            How Much Equity Have You Built?
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Vancouver&apos;s market is shifting. Some neighbourhoods are up,
            others are adjusting. Find out exactly where your home stands
            &mdash; and whether now is the right time to make a move.
          </p>
        </div>
      </section>

      {/* Market data grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-teal-950 text-center italic font-bold mb-3">
            Vancouver Neighbourhood Price Trends
          </h2>
          <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
            Average benchmark prices and year-over-year changes. Your specific
            property could be worth significantly more or less depending on its
            unique characteristics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_HOODS.sort((a, b) => {
              const aChange = parseFloat(a.priceChange);
              const bChange = parseFloat(b.priceChange);
              return bChange - aChange;
            }).map((hood) => {
              const isUp = !hood.priceChange.startsWith("-");
              return (
                <div
                  key={hood.slug}
                  className="flex items-center justify-between py-3 px-4 rounded-lg border border-warm-100 bg-white"
                >
                  <p className="font-serif text-teal-950 font-semibold text-sm">
                    {hood.name}
                  </p>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-serif text-sm text-teal-800 font-bold">
                      {hood.avgPrice}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isUp
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {hood.priceChange}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-warm-400 mt-4 text-center">
            Source: GVR MLS HPI Benchmark, April 2026
          </p>
        </div>
      </section>

      {/* Lead capture */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get Your Personalized Equity Report
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Benchmark prices are just the starting point. Aparna will analyze
              your specific property &mdash; size, condition, lot, improvements
              &mdash; and tell you exactly how much equity you&apos;ve built.
            </p>
            <LandingLeadForm
              variant="seller"
              source="LP: Equity Check"
              ctaText="Get My Equity Report"
              successMessage="Aparna will prepare a personalized equity analysis for your specific property and reach out within 24 hours."
            />
          </div>
        </div>
      </section>

      {/* Agent trust strip */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <AgentTrustStrip context="With 24 neighbourhoods of expertise across Vancouver, I'll tell you exactly how much equity you've built — and whether now is the right time to leverage it." />
        </div>
      </section>

      {/* Why now */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl text-teal-950 italic font-bold mb-8">
            Why Check Your Equity Now?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Is Shifting",
                desc: `${decreasing.length} of ${ALL_HOODS.length} neighbourhoods saw price adjustments. Knowing where you stand helps you plan.`,
              },
              {
                title: "Refinancing Opportunity",
                desc: "With rates fluctuating, knowing your equity helps you negotiate better refinancing terms.",
              },
              {
                title: "Strategic Timing",
                desc: "Whether you're thinking of selling, upgrading, or holding — the data should drive the decision.",
              },
            ].map((item) => (
              <div key={item.title} className="text-left md:text-center">
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
    </>
  );
}
