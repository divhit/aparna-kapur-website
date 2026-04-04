import type { Metadata } from "next";
import { fetchLandingListings } from "@/lib/ddf";
import TeaserListingCard from "@/components/landing/TeaserListingCard";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import AgentTrustStrip from "@/components/landing/AgentTrustStrip";

export const metadata: Metadata = {
  title: "Duplexes Under $1.7M in Vancouver | Current Listings",
  description:
    "Find Vancouver duplexes listed under $1.7 million. Live in one unit, rent the other. Income properties with upside potential.",
};

export const dynamic = "force-dynamic";

export default async function DuplexesUnder17mPage() {
  const { listings, totalCount } = await fetchLandingListings({
    maxPrice: 1700000,
    propertySubType: "Duplex",
    top: 6,
    orderby: "ListPrice asc",
  });

  const teaserListings = listings.slice(0, 3);
  const count = totalCount ?? listings.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Income Property
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Vancouver Duplexes Under $1.7M
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Live in one unit, rent the other. Duplexes are one of
            Vancouver&apos;s smartest real estate plays &mdash; build equity
            while your tenant helps cover the mortgage.
          </p>
          {count > 0 && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                {count} duplexes available under $1.7M
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
              Preview: Available Duplexes
            </h2>
            <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
              Here&apos;s a taste of what&apos;s on the market. Get the full
              list with rental income estimates and Aparna&apos;s analysis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserListings.map((listing) => (
                <TeaserListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
            {count > 3 && (
              <p className="text-center text-warm-400 text-sm mt-6">
                + {count - 3} more duplexes available
              </p>
            )}
          </div>
        </section>
      )}

      {/* Why duplexes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 text-center italic font-bold mb-8">
            Why a Duplex Makes Sense
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mortgage Helper",
                desc: "Rental income from the second unit can cover 30-50% of your mortgage payment.",
              },
              {
                title: "Land Value",
                desc: "You own the land. Under Vancouver's R1-1 zoning, many lots have future development potential.",
              },
              {
                title: "Flexibility",
                desc: "Multi-generational living, home office space, or pure investment — a duplex adapts to your life.",
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
      <section className="py-16">
        <div className="max-w-xl mx-auto px-6">
          <AgentTrustStrip context="Duplexes are my specialty. I'll help you find the right one — with real rental income estimates and zoning potential analysis." />
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get the Full Duplex List
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Aparna will send you the complete list with rental income
              potential, zoning details, and her professional assessment of each
              property.
            </p>
            <LandingLeadForm
              variant="buyer"
              source="LP: Duplexes Under 1.7M"
              ctaText="Send Me Duplex Listings"
              successMessage="Aparna will send you a curated list of the best duplexes under $1.7M with rental income analysis within 24 hours."
            />
          </div>
        </div>
      </section>
    </>
  );
}
