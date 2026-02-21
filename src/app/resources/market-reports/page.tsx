import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import PageBanner from "@/components/hero/PageBanner";

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
          {/* Current Market Snapshot */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-100 mb-12">
            <h2 className="font-serif text-2xl text-teal-950 mb-2">
              Vancouver Market Snapshot
            </h2>
            <p className="text-sm text-warm-500 mb-6">
              Key metrics for Vancouver&apos;s westside real estate market
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "Composite Benchmark", value: "$1.1M", change: "-0.5% MoM" },
                { label: "Active Listings", value: "12,628", change: "+25.5% YoY" },
                {
                  label: "New Listings",
                  value: "4,249",
                  change: "-7.3% YoY",
                },
                {
                  label: "Sales-to-Active Ratio",
                  value: "11.7%",
                  change: "Buyer's Market",
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl text-teal-700">
                    {stat.value}
                  </p>
                  <p className="text-xs text-warm-500 mb-1">{stat.label}</p>
                  <p className="text-xs font-medium text-teal-600">
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood Breakdown */}
          <h2 className="font-serif text-2xl text-teal-950 mb-6">
            Neighborhood Price Guide
          </h2>
          <div className="space-y-4 mb-12">
            {[
              {
                name: "Oakridge",
                detached: "$3.36M (benchmark)",
                townhome: "$1.64M (benchmark)",
                condo: "$998K (benchmark)",
                trend: "Stable",
                href: "/neighborhoods/oakridge",
              },
              {
                name: "Marpole",
                detached: "$2.13M (benchmark)",
                townhome: "$1.58M (benchmark)",
                condo: "$684K (benchmark)",
                trend: "Stable",
                href: "/neighborhoods/marpole",
              },
              {
                name: "South Cambie",
                detached: "$4.16M (benchmark)",
                townhome: "$1.56M (benchmark)",
                condo: "$1.02M (benchmark)",
                trend: "Stable",
                href: "/neighborhoods/south-cambie",
              },
              {
                name: "Riley Park",
                detached: "$1.70M (Van East)",
                townhome: "$1.04M (Van East)",
                condo: "$639K (Van East)",
                trend: "Stable",
                href: "/neighborhoods/riley-park",
              },
              {
                name: "Kerrisdale",
                detached: "$2.98M (benchmark)",
                townhome: "$1.66M (benchmark)",
                condo: "$974K (benchmark)",
                trend: "Stable",
                href: "/neighborhoods/kerrisdale",
              },
              {
                name: "Cambie Corridor",
                detached: "$2.43M (benchmark)",
                townhome: "$1.75M (benchmark)",
                condo: "$1.01M (benchmark)",
                trend: "Stable",
                href: "/neighborhoods/cambie-corridor",
              },
            ].map((area) => (
              <Link
                key={area.name}
                href={area.href}
                className="block bg-white rounded-xl p-6 border border-warm-100 hover:border-teal-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-lg text-teal-950">
                    {area.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      area.trend === "Rising"
                        ? "bg-green-50 text-green-700"
                        : "bg-warm-50 text-warm-600"
                    }`}
                  >
                    {area.trend}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-warm-500 mb-0.5">Detached</p>
                    <p className="text-sm font-medium text-warm-800">
                      {area.detached}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-warm-500 mb-0.5">Townhome</p>
                    <p className="text-sm font-medium text-warm-800">
                      {area.townhome}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-warm-500 mb-0.5">Condo</p>
                    <p className="text-sm font-medium text-warm-800">
                      {area.condo}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Market Context */}
          <div className="bg-warm-50 rounded-2xl p-8 mb-12">
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

          <div className="bg-warm-50 rounded-2xl p-8">
            <h3 className="font-serif text-xl text-teal-950 mb-2">
              Get Monthly Market Updates
            </h3>
            <p className="text-sm text-warm-500 mb-6">
              Stay informed about the neighborhoods you&apos;re interested in.
            </p>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
