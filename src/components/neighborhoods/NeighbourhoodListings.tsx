import Link from "next/link";
import ListingCard from "@/components/listings/ListingCard";
import Button from "@/components/ui/Button";
import { fetchListings } from "@/lib/ddf";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { AREA_BENCHMARKS, formatPrice, HPI_RELEASE } from "@/lib/market-data";

/**
 * Live listings at the top of a neighbourhood guide.
 *
 * Search Console shows these pages taking real impressions on "homes for sale"
 * queries — "riley park vancouver homes for sale", 169 impressions, zero
 * clicks — and answering them with an essay about the neighbourhood's history.
 * The guide content is why the page ranks at all; it is just not what the
 * person typing that query came for. This puts the answer first and leaves the
 * guide directly beneath it.
 *
 * Server-rendered on purpose. A client-fetched grid is invisible to the
 * crawler that has to decide whether this page answers the query.
 *
 * When there is nothing to show it says so and offers the valuation instead.
 * An empty block, or a fabricated count, is how a page earns a soft 404.
 */

const SHOWN = 6;

export default async function NeighbourhoodListings({
  slug,
}: {
  slug: string;
}) {
  const hood = NEIGHBOURHOODS[slug];
  if (!hood) return null;

  let listings: Awaited<ReturnType<typeof fetchListings>>["listings"] = [];
  let totalCount: number | undefined;

  try {
    // Cacheable so the page prerenders; the route's own `revalidate` keeps it
    // fresh. Without this the fetch is uncacheable, the route turns dynamic,
    // and the build renders the empty state into every guide.
    const result = await fetchListings({
      neighbourhood: slug,
      top: SHOWN,
      revalidate: 3600,
    });
    listings = result.listings;
    totalCount = result.totalCount;
  } catch (error) {
    // The feed being down must not take the guide down with it.
    console.error(`[listings] ${slug}:`, error);
  }

  const benchmark = AREA_BENCHMARKS[slug]?.composite;
  const count = totalCount ?? listings.length;

  return (
    <section
      aria-labelledby="homes-for-sale"
      className="py-14 bg-warm-50 border-b border-warm-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
          <h2
            id="homes-for-sale"
            className="font-serif text-2xl md:text-3xl text-teal-950"
          >
            Homes for sale in {hood.name}
          </h2>
          {count > 0 && (
            <p className="text-sm text-warm-500">
              {count} active {count === 1 ? "listing" : "listings"} on the MLS®
            </p>
          )}
        </div>

        {benchmark && (
          <p className="text-warm-600 leading-relaxed mb-8 max-w-3xl">
            The {hood.name} benchmark — what a typical property here is worth —
            is{" "}
            <strong className="text-teal-900">
              {formatPrice(benchmark.price)}
            </strong>{" "}
            as of {HPI_RELEASE}, {benchmark.yoy.toFixed(1)}% year over year.
            Asking prices below are what sellers are hoping for; the benchmark
            is what the market has actually been paying.{" "}
            <Link
              href="/market"
              className="text-teal-700 hover:text-teal-900 underline underline-offset-2"
            >
              Benchmarks by property type
            </Link>
            .
          </p>
        )}

        {listings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href={`/buying/search?neighbourhood=${slug}`}
                variant="primary"
              >
                {count > SHOWN
                  ? `See all ${count} ${hood.name} listings`
                  : `Search ${hood.name} listings`}
              </Button>
              <Link
                href="/contact"
                className="text-sm text-teal-700 hover:text-teal-900"
              >
                Ask about something you cannot see here
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-white border border-warm-200 p-7">
            <p className="text-warm-600 leading-relaxed mb-5">
              Nothing is on the market in {hood.name} right now — which happens
              in the smaller neighbourhoods more often than people expect, and
              says more about supply than about demand. Not everything trades
              publicly either; if you have your eye on {hood.name}, it is worth
              telling me before a listing appears.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                Tell me what you are looking for
              </Button>
              <Button href="/selling/home-valuation" variant="outline">
                Find out what yours is worth
              </Button>
            </div>
          </div>
        )}

        <p className="text-[11px] text-warm-400 mt-6 leading-relaxed">
          Listing data is provided through the CREA Data Distribution Facility
          (DDF®) and comes from participating boards and brokerages. It is
          deemed reliable but not guaranteed accurate. MLS®, REALTOR®, and
          associated logos are trademarks owned by the Canadian Real Estate
          Association.
        </p>
      </div>
    </section>
  );
}
