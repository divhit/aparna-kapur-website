import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PageBanner from "@/components/hero/PageBanner";
import ListingCard from "@/components/listings/ListingCard";
import SearchFilters from "@/components/listings/SearchFilters";
import ListingsMap from "@/components/listings/ListingsMap";
import { fetchListings } from "@/lib/ddf";

export const metadata: Metadata = {
  title: "Search Homes | Vancouver MLS Listings",
  description:
    "Search active MLS listings across every Vancouver neighbourhood — from Kitsilano and Downtown to Oakridge, Kerrisdale, and East Van. Filter by price, type, beds, baths, or address.",
};

const PER_PAGE = 12;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    neighbourhood?: string;
    price?: string;
    type?: string;
    beds?: string;
    baths?: string;
    sort?: string;
    page?: string;
    address?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  if (params.price) {
    const [min, max] = params.price.split("-");
    if (min) minPrice = parseInt(min, 10);
    if (max) maxPrice = parseInt(max, 10);
  }

  const sharedFilters = {
    neighbourhood: params.neighbourhood || undefined,
    minPrice,
    maxPrice,
    structureType: params.type || undefined,
    addressContains: params.address?.trim() || undefined,
    minBedrooms: params.beds ? parseInt(params.beds, 10) : undefined,
    minBathrooms: params.baths ? parseInt(params.baths, 10) : undefined,
  };

  // Fetch paginated results and all map pins in parallel
  const [{ listings, totalCount }, { listings: mapListings }] =
    await Promise.all([
      fetchListings({
        ...sharedFilters,
        orderby: params.sort || "ModificationTimestamp desc",
        top: PER_PAGE,
        skip: (page - 1) * PER_PAGE,
      }),
      fetchListings({
        ...sharedFilters,
        top: 250,
      }),
    ]);

  const totalPages = totalCount ? Math.ceil(totalCount / PER_PAGE) : 1;

  function buildPageUrl(p: number) {
    const sp = new URLSearchParams();
    if (params.neighbourhood) sp.set("neighbourhood", params.neighbourhood);
    if (params.price) sp.set("price", params.price);
    if (params.type) sp.set("type", params.type);
    if (params.address) sp.set("address", params.address);
    if (params.beds) sp.set("beds", params.beds);
    if (params.baths) sp.set("baths", params.baths);
    if (params.sort) sp.set("sort", params.sort);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return `/buying/search${qs ? `?${qs}` : ""}`;
  }

  return (
    <>
      <PageBanner eyebrow="Search" title="Search Homes" align="left" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight">
              Search Homes
            </h1>
            <p className="text-warm-600 mt-2">
              Browse active listings across every Vancouver neighbourhood
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Suspense>
              <SearchFilters />
            </Suspense>
          </div>

          {/* Map — shows all matching listings, not just current page */}
          {mapListings.length > 0 && (
            <div className="mb-8">
              <ListingsMap listings={mapListings} />
            </div>
          )}

          {/* Results count */}
          {totalCount != null && (
            <p className="text-sm text-warm-500 mb-6">
              {totalCount} active {totalCount === 1 ? "listing" : "listings"}
              {params.neighbourhood
                ? ` in ${params.neighbourhood.replace(/-/g, " ")}`
                : ""}
            </p>
          )}

          {/* Results grid */}
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-warm-500 text-lg mb-4">
                No listings match your search.
              </p>
              <p className="text-warm-400 text-sm">
                Try adjusting your filters or reach out to me for off-market
                opportunities.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              {page > 1 ? (
                <Link
                  href={buildPageUrl(page - 1)}
                  className="px-5 py-2.5 bg-white border border-warm-200 rounded-xl text-sm text-teal-700 hover:bg-teal-50 transition-colors"
                >
                  Previous
                </Link>
              ) : (
                <span className="px-5 py-2.5 border border-warm-100 rounded-xl text-sm text-warm-300 cursor-not-allowed">
                  Previous
                </span>
              )}

              <span className="text-sm text-warm-500">
                Page {page} of {totalPages}
              </span>

              {page < totalPages ? (
                <Link
                  href={buildPageUrl(page + 1)}
                  className="px-5 py-2.5 bg-white border border-warm-200 rounded-xl text-sm text-teal-700 hover:bg-teal-50 transition-colors"
                >
                  Next
                </Link>
              ) : (
                <span className="px-5 py-2.5 border border-warm-100 rounded-xl text-sm text-warm-300 cursor-not-allowed">
                  Next
                </span>
              )}
            </div>
          )}

          {/* Attribution */}
          <div className="mt-12 text-center">
            <p className="text-[10px] text-warm-400 uppercase tracking-wider max-w-lg mx-auto">
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
