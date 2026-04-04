import type { Metadata } from "next";
import { fetchLandingListings } from "@/lib/ddf";
import TeaserListingCard from "@/components/landing/TeaserListingCard";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import AgentTrustStrip from "@/components/landing/AgentTrustStrip";

export const metadata: Metadata = {
  title: "Condos Under $750K in Vancouver | Current Listings",
  description:
    "Browse Vancouver condos listed under $750,000. First-time buyer friendly. Get early access to the best value units.",
};

export const dynamic = "force-dynamic";

export default async function CondosUnder750kPage() {
  const { listings } = await fetchLandingListings({
    maxPrice: 750000,
    propertySubType: "Apartment/Condo",
    top: 6,
    orderby: "ListPrice asc",
  });

  const teaserListings = listings.slice(0, 3);

  // Build neighbourhood distribution
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
            First-Time Buyer Friendly
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Condos Under $750K in Vancouver
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Affordable entry points into Vancouver&apos;s real estate market.
            These units move fast &mdash; get the full list before they&apos;re
            gone.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Updated Daily</span>
          </div>
        </div>
      </section>

      {/* Teaser listings */}
      {teaserListings.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-2xl text-teal-950 text-center italic font-bold mb-3">
              Preview: Best Value Condos
            </h2>
            <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
              A sample of what&apos;s available. Get the complete list with full
              addresses, photos, and Aparna&apos;s recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserListings.map((listing) => (
                <TeaserListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
            {listings.length > 3 && (
              <p className="text-center text-warm-400 text-sm mt-6">
                + more available &mdash; get the full list below
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
              Where to Find Them
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
          <AgentTrustStrip context="First-time buyer? I specialize in finding the best-value condos in Vancouver — the ones with solid strata, good layouts, and real upside potential." />
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get the Full List
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Aparna will send you the complete list with her top picks for
              value, including units with the best layouts, views, and building
              amenities.
            </p>
            <LandingLeadForm
              variant="buyer"
              source="LP: Condos Under 750K"
              ctaText="Send Me the Full List"
              successMessage="Aparna will send you a curated list of the best condos under $750K within 24 hours."
            />
          </div>
        </div>
      </section>
    </>
  );
}
