import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/hero/PageBanner";
import ListingCard from "@/components/listings/ListingCard";
import ListingsMap from "@/components/listings/ListingsMap";
import { fetchFeaturedListings } from "@/lib/ddf";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Featured Listings | Opportunities on Vancouver's South Side",
  description:
    "Properties with the most negotiation potential across Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and Cambie Corridor. Curated by Aparna Kapur, Oakwyn Realty.",
};

export default async function FeaturedListingsPage() {
  const listings = await fetchFeaturedListings();

  return (
    <>
      <PageBanner
        eyebrow="Featured"
        title="Featured Listings"
        align="left"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight">
              Featured Listings
            </h1>
            <p className="text-warm-600 mt-2">
              Properties with the most time on market across my neighbourhoods.
              These sellers are motivated and there&apos;s room to negotiate.
            </p>
          </div>

          {listings.length > 0 && (
            <div className="mb-8">
              <ListingsMap listings={listings} />
            </div>
          )}

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-warm-500 text-lg mb-4">
                No featured listings available right now.
              </p>
              <p className="text-warm-400 text-sm">
                Check back soon or reach out to me directly for off-market
                opportunities.
              </p>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-6">
            <Link
              href="/buying/search"
              className="px-8 py-3 bg-teal-700 text-white rounded-xl font-medium hover:bg-teal-800 transition-colors"
            >
              Search All Listings
            </Link>
            <p className="text-[10px] text-warm-400 uppercase tracking-wider text-center max-w-lg">
              Listing data supplied by CREA&apos;s Data Distribution Facility
              (DDF&reg;). REALTOR&reg;, MLS&reg; and associated logos are
              trademarks of The Canadian Real Estate Association.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
