import type { Metadata } from "next";
import GetInTouch from "@/components/sections/GetInTouch";
import PageBanner from "@/components/hero/PageBanner";
import MarketAccordion from "./MarketAccordion";

export const metadata: Metadata = {
  title: "Vancouver Real Estate Market Reports | Oakridge & Surrounding Areas",
  description:
    "Stay informed with the latest Vancouver real estate market data. Monthly updates on prices, inventory, and trends for Oakridge, Marpole, South Cambie, and more.",
};

export default function MarketReportsPage() {
  return (
    <>
      <PageBanner eyebrow="Market Intelligence" title="Vancouver Market Reports" description="Data-driven insights on the Vancouver real estate market, with a focus on Oakridge and surrounding neighborhoods." />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Monthly Market Snapshots */}
          <MarketAccordion />

          {/* Market Context */}
          <div className="bg-warm-50 rounded-2xl p-8 mt-12 mb-12">
            <h2 className="font-serif text-xl text-teal-950 mb-4">
              What&apos;s Driving the Market
            </h2>
            <div className="space-y-4">
              {[
                {
                  factor: "Interest Rates",
                  detail:
                    "The Bank of Canada has been adjusting rates in response to inflation trends. Current fixed rates hover around 5-5.5%, with variable rates slightly lower.",
                },
                {
                  factor: "New Supply",
                  detail:
                    "Major projects like Oakridge Park (3,300+ homes), Cambie Corridor developments, and Marine Gateway are adding significant inventory to the market.",
                },
                {
                  factor: "Population Growth",
                  detail:
                    "Vancouver continues to attract immigrants and interprovincial migrants, supporting housing demand across all property types.",
                },
                {
                  factor: "Policy Changes",
                  detail:
                    "BC and federal housing policies continue to evolve, affecting foreign buyers, short-term rentals, and development approvals.",
                },
              ].map((item) => (
                <div key={item.factor}>
                  <h3 className="text-sm font-semibold text-teal-950 mb-1">
                    {item.factor}
                  </h3>
                  <p className="text-sm text-warm-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white font-serif text-sm font-semibold">
                  AK
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-900 mb-2">
                  Want a Detailed Market Analysis?
                </p>
                <p className="text-sm text-teal-800/80 leading-relaxed italic">
                  &ldquo;These are general market trends. For specific
                  properties or streets, I can provide a detailed Comparative
                  Market Analysis tailored to your exact situation. Just reach
                  out — it&apos;s free and there&apos;s no obligation.&rdquo;
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
