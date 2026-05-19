import type { DDFProperty } from "@/lib/ddf";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ListingCard({ listing }: { listing: DDFProperty }) {
  const heroImage = listing.photos[0];
  const label = listing.structureType ?? listing.propertySubType;

  return (
    <a
      href={`/property/${listing.listingKey}`}
      className="group bg-white rounded-xl overflow-hidden border border-warm-100 hover:shadow-lg hover:border-teal-200 transition-all"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {heroImage ? (
          <img
            src={heroImage}
            alt={listing.address}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-100 to-warm-100 flex items-center justify-center">
            <span className="text-warm-400 text-sm">{label ?? "Property"}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {label && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-teal-700/90 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full backdrop-blur-sm">
            {label}
          </span>
        )}
        {listing.neighbourhood && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 text-teal-900 text-[10px] font-semibold uppercase tracking-wider rounded-full backdrop-blur-sm">
            {listing.neighbourhood}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-serif text-2xl text-teal-950 mb-1">
          {formatPrice(listing.listPrice)}
        </p>
        <p className="text-sm text-warm-600 mb-3 truncate">{listing.address}</p>
        <div className="flex items-center gap-4 text-xs text-warm-500">
          {listing.bedrooms != null && <span>{listing.bedrooms} Bed</span>}
          {listing.bathrooms != null && <span>{listing.bathrooms} Bath</span>}
          {listing.sqft != null && (
            <span>{listing.sqft.toLocaleString()} sqft</span>
          )}
          {listing.parking != null && listing.parking > 0 && (
            <span>{listing.parking} Parking</span>
          )}
        </div>
        {listing.daysOnMarket != null && listing.daysOnMarket > 0 && (
          <p className="text-[10px] text-warm-400 mt-2">
            {listing.daysOnMarket} days on market
          </p>
        )}
      </div>

      {/* View details */}
      <div className="px-5 pb-4">
        <span className="text-[10px] text-teal-600 uppercase tracking-wider group-hover:text-teal-700 transition-colors flex items-center gap-1">
          View details
          <svg
            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}
