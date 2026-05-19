import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchListingByKey } from "@/lib/ddf";
import ContactForm from "@/components/forms/ContactForm";
import PropertyGallery from "@/components/listings/PropertyGallery";
import PropertyMap from "@/components/listings/PropertyMap";
import CopyShareLink from "@/components/listings/CopyShareLink";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ listingKey: string }>;
}): Promise<Metadata> {
  const { listingKey } = await params;
  const listing = await fetchListingByKey(listingKey);
  if (!listing) {
    return { title: "Listing not found | Aparna Kapur" };
  }
  const title = `${listing.address} — ${formatPrice(listing.listPrice)}`;
  const description = [
    formatPrice(listing.listPrice),
    listing.bedrooms != null ? `${listing.bedrooms} bed` : null,
    listing.bathrooms != null ? `${listing.bathrooms} bath` : null,
    listing.sqft != null ? `${listing.sqft.toLocaleString()} sqft` : null,
    listing.neighbourhood,
  ]
    .filter(Boolean)
    .join(" · ");

  const photo = listing.photos[0];
  return {
    title,
    description,
    openGraph: {
      title: `${listing.address} — ${formatPrice(listing.listPrice)}`,
      description,
      url: `/property/${listingKey}`,
      images: photo ? [{ url: photo }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${listing.address} — ${formatPrice(listing.listPrice)}`,
      description,
      images: photo ? [photo] : undefined,
    },
    robots: { index: false, follow: false },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ listingKey: string }>;
}) {
  const { listingKey } = await params;
  const listing = await fetchListingByKey(listingKey);

  if (!listing) {
    notFound();
  }

  const facts: { label: string; value: string }[] = [];
  if (listing.bedrooms != null)
    facts.push({ label: "Bedrooms", value: String(listing.bedrooms) });
  if (listing.bathrooms != null)
    facts.push({ label: "Bathrooms", value: String(listing.bathrooms) });
  if (listing.sqft != null)
    facts.push({
      label: "Living area",
      value: `${listing.sqft.toLocaleString()} sqft`,
    });
  if (listing.yearBuilt != null)
    facts.push({ label: "Year built", value: String(listing.yearBuilt) });
  if (listing.parking != null && listing.parking > 0)
    facts.push({ label: "Parking", value: String(listing.parking) });
  if (listing.structureType)
    facts.push({ label: "Type", value: listing.structureType });
  if (listing.neighbourhood)
    facts.push({ label: "Neighbourhood", value: listing.neighbourhood });
  if (listing.daysOnMarket != null && listing.daysOnMarket > 0)
    facts.push({
      label: "Days on market",
      value: String(listing.daysOnMarket),
    });

  return (
    <article className="bg-warm-50">
      {/* Hero gallery */}
      <PropertyGallery photos={listing.photos} alt={listing.address} />

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <Link
              href="/buying/search"
              className="text-xs text-teal-700 hover:text-teal-900 uppercase tracking-wider"
            >
              ← Back to search
            </Link>
            <h1 className="font-serif text-3xl md:text-5xl text-teal-950 italic font-bold leading-tight mt-3">
              {listing.address}
            </h1>
            <p className="text-warm-600 mt-2">
              {[listing.city, listing.postalCode].filter(Boolean).join(", ")}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-serif text-3xl md:text-4xl text-teal-950">
              {formatPrice(listing.listPrice)}
            </p>
            <CopyShareLink listingKey={listing.listingKey} />
          </div>
        </div>

        {/* Key facts */}
        {facts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12 bg-white border border-warm-100 rounded-2xl p-6">
            {facts.map((f) => (
              <div key={f.label}>
                <p className="text-[10px] text-warm-500 uppercase tracking-wider">
                  {f.label}
                </p>
                <p className="text-sm text-teal-950 mt-1">{f.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Main two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {listing.description && (
              <div>
                <h2 className="font-serif text-2xl text-teal-950 mb-4">
                  About this property
                </h2>
                <p className="text-warm-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
            )}

            {listing.latitude && listing.longitude && (
              <div>
                <h2 className="font-serif text-2xl text-teal-950 mb-4">
                  Location
                </h2>
                <PropertyMap
                  lat={listing.latitude}
                  lng={listing.longitude}
                  address={listing.address}
                />
              </div>
            )}
          </div>

          {/* Sidebar: contact + meta */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-warm-100 rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif text-xl text-teal-950 mb-1">
                Interested in this home?
              </h3>
              <p className="text-sm text-warm-600 mb-5">
                I&apos;ll get back to you the same day with comps, building
                info, and a private showing time that works for you.
              </p>
              <ContactForm
                compact
                source={`Property page · ${listing.address}`}
              />
            </div>
          </aside>
        </div>

        {/* Attribution + REALTOR.ca link */}
        <div className="mt-16 pt-8 border-t border-warm-100 text-center space-y-3">
          <a
            href={listing.realtorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-teal-700 hover:text-teal-900 uppercase tracking-wider"
          >
            View this listing on REALTOR.ca →
          </a>
          <p className="text-[10px] text-warm-400 uppercase tracking-wider max-w-lg mx-auto">
            Listing data supplied by CREA&apos;s Data Distribution Facility
            (DDF&reg;). REALTOR&reg;, MLS&reg; and associated logos are
            trademarks of The Canadian Real Estate Association.
          </p>
        </div>
      </section>
    </article>
  );
}
