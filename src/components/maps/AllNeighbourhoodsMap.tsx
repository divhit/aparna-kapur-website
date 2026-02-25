"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { getAllNeighbourhoods } from "@/lib/neighborhoods";
import NeighbourhoodBoundaries from "./NeighbourhoodBoundaries";

function NeighbourhoodMarkers() {
  const neighbourhoods = getAllNeighbourhoods();

  return (
    <>
      {neighbourhoods.map((hood) => (
        <AdvancedMarker
          key={hood.slug}
          position={hood.center}
          onClick={() => {
            window.location.href = `/neighborhoods/${hood.slug}`;
          }}
        >
          <div className="bg-teal-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border-2 border-white cursor-pointer hover:bg-teal-800 hover:scale-105 transition-all whitespace-nowrap">
            {hood.name}
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
}

export default function AllNeighbourhoodsMap({ fullWidth = false }: { fullWidth?: boolean }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className={`bg-warm-100 flex items-center justify-center ${fullWidth ? "h-[600px]" : "rounded-xl h-[400px]"}`}>
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
      <div className={fullWidth ? "overflow-hidden h-[600px]" : "rounded-xl overflow-hidden border border-warm-200 shadow-sm h-[500px]"}>
        <Map
          defaultCenter={{ lat: 49.2530, lng: -123.1200 }}
          defaultZoom={12}
          mapId="all-neighbourhoods-map"
          gestureHandling="cooperative"
          disableDefaultUI={false}
          zoomControl
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl
        >
          <NeighbourhoodBoundaries />
          <NeighbourhoodMarkers />
        </Map>
      </div>
    </APIProvider>
  );
}
