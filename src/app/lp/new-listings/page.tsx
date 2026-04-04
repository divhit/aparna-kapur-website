import type { Metadata } from "next";
import { fetchLandingListings } from "@/lib/ddf";
import TeaserListingCard from "@/components/landing/TeaserListingCard";
import LandingLeadForm from "@/components/landing/LandingLeadForm";

export const metadata: Metadata = {
  title: "New Listings in Vancouver | See Them Before Everyone Else",
  description:
    "Get early access to the newest Vancouver real estate listings before they go viral. Don't miss out on the best properties.",
};

export const dynamic = "force-dynamic";

export default async function NewListingsLandingPage() {
  const { listings, totalCount } = await fetchLandingListings({
    top: 6,
    orderby: "OriginalEntryTimestamp desc",
  });

  const teaserListings = listings.slice(0, 3);
  const count = totalCount ?? listings.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Updated Hourly
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6">
            See New Listings Before Everyone Else
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            In Vancouver&apos;s fast-moving market, the best properties sell
            within days. Get early access to new listings matched to your
            criteria &mdash; before they go viral on Realtor.ca.
          </p>
          {count > 0 && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                {count} active listings right now
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Teaser listings */}
      {teaserListings.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-2xl md:text-3xl text-teal-950 text-center italic font-bold mb-3">
              Just Listed This Week
            </h2>
            <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
              Here&apos;s a preview of the newest properties. Submit your
              details below to get the full list with complete photos,
              addresses, and Aparna&apos;s insider notes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserListings.map((listing) => (
                <TeaserListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
            <p className="text-center text-warm-400 text-sm mt-6">
              + {Math.max(count - 3, 0)} more listings available
            </p>
          </div>
        </section>
      )}

      {/* Lead capture */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get the Full List
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Tell Aparna what you&apos;re looking for and she&apos;ll send you
              a curated selection of the best new listings &mdash; with full
              details, photos, and her professional insights.
            </p>
            <LandingLeadForm
              variant="buyer"
              source="LP: New Listings"
              ctaText="Send Me New Listings"
              successMessage="You're on the list! Aparna will send you a curated selection of the best new listings within 24 hours."
            />
          </div>
        </div>
      </section>

      {/* Urgency section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl text-teal-950 italic font-bold mb-8">
            Why Speed Matters in Vancouver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "7 days",
                label: "Average time to sell for well-priced homes",
              },
              { stat: "63%", label: "Of homes sell at or above asking price" },
              {
                stat: "3x",
                label: "More competition on properties listed 48+ hours",
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-3xl text-teal-800 font-bold">
                  {item.stat}
                </p>
                <p className="text-xs text-warm-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
