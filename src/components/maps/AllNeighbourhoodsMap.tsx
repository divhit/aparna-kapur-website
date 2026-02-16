"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { getAllNeighbourhoods, type NeighbourhoodData } from "@/lib/neighborhoods";

function NeighbourhoodMarkers() {
  const neighbourhoods = getAllNeighbourhoods();
  const [selected, setSelected] = useState<NeighbourhoodData | null>(null);

  return (
    <>
      {neighbourhoods.map((hood) => (
        <AdvancedMarker
          key={hood.slug}
          position={hood.center}
          onClick={() => setSelected(hood)}
        >
          <div className="bg-teal-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border-2 border-white cursor-pointer hover:bg-teal-800 hover:scale-105 transition-all whitespace-nowrap">
            {hood.name}
          </div>
        </AdvancedMarker>
      ))}
      {selected && (
        <InfoWindow
          position={selected.center}
          onCloseClick={() => setSelected(null)}
        >
          <div className="p-1 max-w-[220px]">
            <p className="font-bold text-sm text-gray-900 mb-1">
              {selected.name}
            </p>
            <p className="text-xs text-gray-600 mb-2">{selected.tagline}</p>
            <div className="flex gap-3 text-xs mb-2">
              <div>
                <span className="font-semibold text-teal-700">{selected.avgPrice}</span>
                <span className="text-gray-500 ml-1">avg</span>
              </div>
              <div>
                <span className="font-semibold text-green-600">{selected.priceChange}</span>
              </div>
            </div>
            <a
              href={`/neighborhoods/${selected.slug}`}
              className="block text-center text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded py-1.5 transition-colors"
            >
              View Full Guide
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function AllNeighbourhoodsMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="bg-warm-100 rounded-xl flex items-center justify-center h-[400px]">
        <div className="text-center p-6">
          <svg
            className="w-12 h-12 text-warm-400 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="text-sm text-warm-500">Interactive neighbourhood map coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="rounded-xl overflow-hidden border border-warm-200 shadow-sm h-[400px]">
        <Map
          defaultCenter={{ lat: 49.2330, lng: -123.1200 }}
          defaultZoom={13}
          mapId="all-neighbourhoods-map"
          gestureHandling="cooperative"
          disableDefaultUI={false}
          zoomControl
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl
        >
          <NeighbourhoodMarkers />
        </Map>
      </div>
    </APIProvider>
  );
}
