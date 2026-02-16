"use client";

type Place = {
  name: string;
  mapsUrl?: string;
  placeId?: string | null;
  description?: string | null;
  rating?: number | null;
  type?: string;
};

type Props = {
  query: string;
  neighbourhood: string;
  places: Place[];
  error?: string;
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: full }, (_, i) => (
        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {half && (
        <svg className="w-3 h-3" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      <span className="text-[10px] text-warm-500 ml-0.5">{rating}</span>
    </span>
  );
}

export default function PlacesResultCard({
  query,
  neighbourhood,
  places,
  error,
}: Props) {
  if (error || !places || places.length === 0) {
    return (
      <div className="bg-warm-50 rounded-xl p-3 my-2 text-xs text-warm-500 italic">
        Couldn&apos;t find places for &quot;{query}&quot; near {neighbourhood}.
        Try asking Aparna directly for local recommendations!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-2.5 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-teal-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h4 className="text-white text-sm font-semibold">
          {query} near {neighbourhood}
        </h4>
      </div>
      <div className="divide-y divide-warm-100">
        {places.map((place, i) => (
          <div key={i} className="px-4 py-2.5 hover:bg-warm-50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-warm-900 truncate">
                    {place.name}
                  </p>
                  {place.rating && <StarRating rating={place.rating} />}
                </div>
                {place.description && (
                  <p className="text-xs text-warm-500 mt-0.5 line-clamp-2">
                    {place.description}
                  </p>
                )}
                {place.type && (
                  <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-700">
                    {place.type}
                  </span>
                )}
              </div>
              {place.mapsUrl && (
                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-teal-600 hover:text-teal-800 transition-colors p-1"
                  title="Open in Google Maps"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 bg-warm-50 border-t border-warm-100">
        <p className="text-[10px] text-warm-400 text-center">
          Powered by Google Maps
        </p>
      </div>
    </div>
  );
}
