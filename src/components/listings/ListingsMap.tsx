"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import type { DDFProperty } from "@/lib/ddf";

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(1)}M`;
  }
  return `$${(price / 1_000).toFixed(0)}K`;
}

export default function ListingsMap({ listings }: { listings: DDFProperty[] }) {
  const [selected, setSelected] = useState<DDFProperty | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return null;

  const center = { lat: 49.233, lng: -123.128 };

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-warm-200">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={12.5}
          mapId="listings-map"
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
        >
          {listings.map((listing) => (
            <AdvancedMarker
              key={listing.listingKey}
              position={{ lat: listing.latitude, lng: listing.longitude }}
              onClick={() => setSelected(listing)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.latitude, lng: selected.longitude }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="max-w-[200px]">
                {selected.photos[0] && (
                  <img
                    src={selected.photos[0]}
                    alt={selected.address}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                )}
                <p className="font-semibold text-sm">
                  {formatPrice(selected.listPrice)}
                </p>
                <p className="text-xs text-gray-600 mb-1">{selected.address}</p>
                <div className="text-xs text-gray-500">
                  {selected.bedrooms != null && `${selected.bedrooms} Bed `}
                  {selected.bathrooms != null && `${selected.bathrooms} Bath `}
                  {selected.sqft != null &&
                    `${selected.sqft.toLocaleString()} sqft`}
                </div>
                <a
                  href={`/property/${selected.listingKey}`}
                  className="text-xs text-teal-600 hover:underline mt-1 inline-block"
                >
                  View details
                </a>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
