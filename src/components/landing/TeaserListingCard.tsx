import type { DDFProperty } from "@/lib/ddf";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function TeaserListingCard({
  listing,
}: {
  listing: DDFProperty;
}) {
  const heroImage = listing.photos[0];
  const label = listing.structureType ?? listing.propertySubType;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-warm-100 shadow-sm">
      {/* Blurred image with lock overlay */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {heroImage ? (
          <img
            src={heroImage}
            alt="Property preview"
            className="w-full h-full object-cover blur-md scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-100 to-warm-100" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/60 via-teal-950/20 to-teal-950/10" />

        {/* Lock icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        {/* Badges */}
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
        <p className="text-sm text-warm-400 mb-3 tracking-wider">
          &#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;
          Vancouver, BC
        </p>
        <div className="flex items-center gap-4 text-xs text-warm-500">
          {listing.bedrooms != null && <span>{listing.bedrooms} Bed</span>}
          {listing.bathrooms != null && <span>{listing.bathrooms} Bath</span>}
          {listing.sqft != null && (
            <span>{listing.sqft.toLocaleString()} sqft</span>
          )}
        </div>
      </div>
    </div>
  );
}
