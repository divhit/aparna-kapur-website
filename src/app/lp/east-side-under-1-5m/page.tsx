import type { Metadata } from "next";
import { fetchLandingListings, EAST_VANCOUVER_BOUNDS } from "@/lib/ddf";
import TeaserListingCard from "@/components/landing/TeaserListingCard";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import AgentTrustStrip from "@/components/landing/AgentTrustStrip";

export const metadata: Metadata = {
  title: "Homes Under $1.5M on Vancouver's East Side | Current Listings",
  description:
    "Find detached homes and townhouses under $1.5 million on Vancouver's East Side. Family-friendly neighbourhoods with room to grow.",
};

export const dynamic = "force-dynamic";

export default async function EastSideUnder15mPage() {
  const { listings, totalCount } = await fetchLandingListings({
    maxPrice: 1500000,
    bounds: EAST_VANCOUVER_BOUNDS,
    top: 6,
    orderby: "ListPrice asc",
  });

  const teaserListings = listings.slice(0, 3);
  const count = totalCount ?? listings.length;

  const hoodCounts: Record<string, number> = {};
  listings.forEach((l) => {
    const hood = l.neighbourhood || "East Vancouver";
    hoodCounts[hood] = (hoodCounts[hood] || 0) + 1;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Family-Friendly Neighbourhoods
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            East Side Homes Under $1.5M
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Vancouver&apos;s East Side offers the best value for detached homes
            and townhouses. Great schools, growing communities, and room for
            your family to thrive.
          </p>
          {count > 0 && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                {count} properties available under $1.5M
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
              Preview: East Side Properties
            </h2>
            <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
              A sample of what&apos;s available. Get the complete list with full
              details and Aparna&apos;s neighbourhood insights.
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
              East Side Neighbourhoods
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

      {/* Why East Side */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 text-center italic font-bold mb-8">
            Why Vancouver&apos;s East Side?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best Value Per Sq Ft",
                desc: "Detached homes at a fraction of West Side prices. More space for your money.",
              },
              {
                title: "Growing Communities",
                desc: "Hastings-Sunrise, Renfrew-Collingwood, and Kensington-Cedar Cottage are thriving with new restaurants and shops.",
              },
              {
                title: "Family-Friendly",
                desc: "Excellent schools, parks, community centres, and safe, walkable neighbourhoods.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
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

      {/* Lead capture */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-6">
          <AgentTrustStrip context="I know Vancouver's East Side inside and out — every pocket of value, every up-and-coming block, every school catchment that matters." />
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get the Full East Side List
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Aparna knows every East Side neighbourhood inside and out.
              She&apos;ll send you a curated list with her top picks and insider
              knowledge.
            </p>
            <LandingLeadForm
              variant="buyer"
              source="LP: East Side Under 1.5M"
              ctaText="Send Me East Side Listings"
              successMessage="Aparna will send you a curated selection of the best East Side homes under $1.5M within 24 hours."
            />
          </div>
        </div>
      </section>
    </>
  );
}
