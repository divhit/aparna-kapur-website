import type { Metadata } from "next";
import { fetchLandingListings } from "@/lib/ddf";
import TeaserListingCard from "@/components/landing/TeaserListingCard";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import AgentTrustStrip from "@/components/landing/AgentTrustStrip";

export const metadata: Metadata = {
  title:
    "Investment Properties in Vancouver | Motivated Sellers & Estate Sales",
  description:
    "Find below-market investment opportunities in Vancouver. Court-ordered sales, estate sales, motivated sellers, and properties priced to move.",
};

export const dynamic = "force-dynamic";

export default async function InvestmentLandingPage() {
  // Longest-on-market = most motivated sellers, most negotiation room
  const { listings: allListings } = await fetchLandingListings({
    top: 12,
    orderby: "OriginalEntryTimestamp asc",
  });

  const teaserListings = allListings.slice(0, 3);

  // Count opportunity types from descriptions
  const hasEstateSale = allListings.some((l) =>
    l.description?.toLowerCase().includes("estate sale"),
  );
  const hasPriceReduced = allListings.some(
    (l) =>
      l.description?.toLowerCase().includes("price reduced") ||
      l.description?.toLowerCase().includes("motivated"),
  );
  const hasCourtOrder = allListings.some((l) =>
    l.description?.toLowerCase().includes("court order"),
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Below-Market Opportunities
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Vancouver Investment Properties
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Court-ordered sales, estate dispositions, and motivated sellers.
            These properties are priced to move &mdash; and smart investors know
            that&apos;s where the deals are.
          </p>
        </div>
      </section>

      {/* Opportunity types */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 text-center italic font-bold mb-10">
            Types of Opportunities Available
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Estate Sales",
                desc: "Executors need to close quickly. Often sold below market for a fast, clean transaction.",
                active: hasEstateSale,
              },
              {
                title: "Motivated Sellers",
                desc: "Relocations, divorces, financial pressure. Room to negotiate on price and terms.",
                active: hasPriceReduced,
              },
              {
                title: "Court-Ordered",
                desc: "Legally required to sell. Price is secondary to speed for these sellers.",
                active: hasCourtOrder,
              },
              {
                title: "Longest on Market",
                desc: "The longer it sits, the more flexible the seller. Prime negotiation territory.",
                active: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-warm-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-serif text-lg text-teal-950 font-bold italic">
                    {item.title}
                  </h3>
                  {item.active && (
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  )}
                </div>
                <p className="text-sm text-warm-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaser listings */}
      {teaserListings.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-2xl text-teal-950 text-center italic font-bold mb-3">
              Preview: Current Opportunities
            </h2>
            <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
              A sample of what&apos;s available. Get the full list with
              Aparna&apos;s analysis of each property&apos;s investment
              potential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserListings.map((listing) => (
                <TeaserListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
            {allListings.length > 3 && (
              <p className="text-center text-warm-400 text-sm mt-6">
                + more available &mdash; get the full list below
              </p>
            )}
          </div>
        </section>
      )}

      {/* Lead capture */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-6">
          <AgentTrustStrip context="I track every motivated seller, estate sale, and court-ordered listing in Vancouver. When opportunity knocks, my investors hear about it first." />
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get the Full Opportunity List
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Aparna will send you the complete list with her professional
              analysis &mdash; including estimated rental yields, development
              potential, and negotiation leverage for each property.
            </p>
            <LandingLeadForm
              variant="investor"
              source="LP: Investment"
              ctaText="Send Me Investment Opportunities"
              successMessage="Aparna will send you the full opportunity list with her investment analysis within 24 hours."
            />
          </div>
        </div>
      </section>
    </>
  );
}
