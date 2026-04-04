import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { fetchLandingListings } from "@/lib/ddf";
import TeaserListingCard from "@/components/landing/TeaserListingCard";
import LandingLeadForm from "@/components/landing/LandingLeadForm";

type Props = {
  params: Promise<{ neighbourhood: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { neighbourhood } = await params;
  const hood = NEIGHBOURHOODS[neighbourhood];
  if (!hood) return {};

  return {
    title: `Homes for Sale in ${hood.name} | Vancouver Real Estate`,
    description: `Browse current listings in ${hood.name}, Vancouver. ${hood.tagline}. Average price: ${hood.avgPrice}. Get early access to the best properties.`,
  };
}

export default async function NeighbourhoodLandingPage({ params }: Props) {
  const { neighbourhood } = await params;
  const hood = NEIGHBOURHOODS[neighbourhood];
  if (!hood) notFound();

  const { listings, totalCount } = await fetchLandingListings({
    neighbourhood,
    top: 6,
    orderby: "ModificationTimestamp desc",
  });

  const teaserListings = listings.slice(0, 3);
  const count = totalCount ?? listings.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            {hood.tagline}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-bold leading-tight mb-6">
            Homes for Sale in {hood.name}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore what&apos;s available in one of Vancouver&apos;s most
            sought-after neighbourhoods. Aparna is the local expert who knows
            every street, every building, every opportunity.
          </p>
          {count > 0 && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                {count} active listings in {hood.name}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Neighbourhood stats */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl md:text-3xl text-teal-800 font-bold">
                {hood.avgPrice}
              </p>
              <p className="text-xs text-warm-500 mt-1">Avg Benchmark</p>
            </div>
            <div>
              <p
                className={`font-serif text-2xl md:text-3xl font-bold ${
                  hood.priceChange.startsWith("-")
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                {hood.priceChange}
              </p>
              <p className="text-xs text-warm-500 mt-1">Year over Year</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-teal-800 font-bold">
                {hood.walkScore}
              </p>
              <p className="text-xs text-warm-500 mt-1">Walk Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-teal-800 font-bold">
                {hood.transitScore}
              </p>
              <p className="text-xs text-warm-500 mt-1">Transit Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-teal-950 text-center italic font-bold mb-6">
            Why {hood.name}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hood.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 py-3 px-4 rounded-lg border border-warm-100 bg-white"
              >
                <svg
                  className="w-5 h-5 text-teal-600 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span className="text-sm text-warm-700">{highlight}</span>
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
              Preview: {hood.name} Listings
            </h2>
            <p className="text-warm-500 text-sm text-center mb-10 max-w-xl mx-auto">
              A sample of what&apos;s available. Get the complete list with full
              details and Aparna&apos;s insider knowledge of {hood.name}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserListings.map((listing) => (
                <TeaserListingCard key={listing.listingKey} listing={listing} />
              ))}
            </div>
            {count > 3 && (
              <p className="text-center text-warm-400 text-sm mt-6">
                + {count - 3} more listings in {hood.name}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Lead capture */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2 text-center">
              Get All {hood.name} Listings
            </h3>
            <p className="text-sm text-warm-500 mb-6 text-center">
              Aparna is the {hood.name} specialist. She&apos;ll send you a
              curated selection with insider insights you won&apos;t find
              online.
            </p>
            <LandingLeadForm
              variant="buyer"
              source={`LP: ${hood.name}`}
              neighbourhood={hood.name}
              ctaText={`Send Me ${hood.name} Listings`}
              successMessage={`Aparna will send you a curated selection of the best ${hood.name} properties within 24 hours.`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
