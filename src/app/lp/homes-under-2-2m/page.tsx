import type { Metadata } from "next";
import { fetchLandingListings } from "@/lib/ddf";
import TeaserListingCard from "@/components/landing/TeaserListingCard";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import AgentTrustStrip from "@/components/landing/AgentTrustStrip";

export const metadata: Metadata = {
  title: "Homes Under $2.2M in Vancouver | Current Listings",
  description:
    "Find Vancouver detached homes and townhouses listed under $2.2 million. Full range of property types across all neighbourhoods.",
};

export const dynamic = "force-dynamic";

export default async function HomesUnder22mPage() {
  const { listings, totalCount } = await fetchLandingListings({
    maxPrice: 2200000,
    top: 6,
    orderby: "ListPrice asc",
  });

  const teaserListings = listings.slice(0, 3);
  const count = totalCount ?? listings.length;

  const hoodCounts: Record<string, number> = {};
  listings.forEach((l) => {
    const hood = l.neighbourhood || "Other";
    hoodCounts[hood] = (hoodCounts[hood] || 0) + 1;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            All Property Types
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Vancouver Homes Under $2.2M
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            From cozy condos to spacious detached homes &mdash; every property
            type across Vancouver&apos;s best neighbourhoods, all under $2.2
            million.
          </p>
          {count > 0 && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                {count} properties available under $2.2M
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Teaser listings */}
      {teaserListings.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-2xl text-teal-950 text-center italic font-bold mb-3">
              Preview: Available Properties
            </h2>
            <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
              A snapshot of what&apos;s on the market. Get the complete list
              with full photos, floor plans, and Aparna&apos;s insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserListings.map((listing) => (
                <TeaserListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
            {count > 3 && (
              <p className="text-center text-warm-400 text-sm mt-6">
                + {count - 3} more properties available
              </p>
            )}
          </div>
        </section>
      )}

      {/* Neighbourhood distribution */}
      {Object.keys(hoodCounts).length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="font-serif text-xl text-teal-950 text-center italic font-bold mb-6">
              Across Vancouver&apos;s Neighbourhoods
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(hoodCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([hood, c]) => (
                  <span
                    key={hood}
                    className="px-4 py-2 rounded-full border border-warm-200 text-sm text-warm-700 bg-warm-50"
                  >
                    {hood}{" "}
                    <span className="text-teal-700 font-semibold">({c})</span>
                  </span>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead capture */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-6">
          <AgentTrustStrip context="Whether it's your first home or your forever home, I'll find the right property at the right price across all of Vancouver." />
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get the Full List
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Aparna will send you the complete list filtered to your
              preferences &mdash; with her professional insights on the best
              opportunities.
            </p>
            <LandingLeadForm
              variant="buyer"
              source="LP: Homes Under 2.2M"
              ctaText="Send Me the Full List"
              successMessage="Aparna will send you a curated selection of the best properties under $2.2M within 24 hours."
            />
          </div>
        </div>
      </section>
    </>
  );
}
