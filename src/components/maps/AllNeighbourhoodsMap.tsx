"use client";

import { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { getAllNeighbourhoods } from "@/lib/neighborhoods";
import NeighbourhoodBoundaries from "./NeighbourhoodBoundaries";
import MapErrorBoundary from "./MapErrorBoundary";

const SNAPSHOT_SLUGS = new Set([
  "kitsilano",
  "ubc",
  "west-point-grey",
  "dunbar-southlands",
  "arbutus-ridge",
  "shaughnessy",
  "fairview",
  "mount-pleasant",
  "strathcona",
  "grandview-woodland",
  "kensington-cedar-cottage",
  "renfrew-collingwood",
  "sunset",
  "victoria-fraserview",
  "killarney",
  "downtown",
  "west-end",
  "hastings-sunrise",
]);

function NeighbourhoodMarkers({ hoveredName }: { hoveredName: string | null }) {
  const neighbourhoods = getAllNeighbourhoods().filter(
    (h) => !SNAPSHOT_SLUGS.has(h.slug),
  );

  return (
    <>
      {neighbourhoods.map((hood) => {
        const isHovered = hoveredName === hood.name;
        return (
          <AdvancedMarker
            key={hood.slug}
            position={hood.center}
            onClick={() => {
              window.location.href = `/neighborhoods/${hood.slug}`;
            }}
          >
            <div
              className={`text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border-2 border-white cursor-pointer transition-all whitespace-nowrap ${
                isHovered
                  ? "bg-teal-500 scale-110"
                  : "bg-teal-700 hover:bg-teal-800 hover:scale-105"
              }`}
            >
              {hood.name}
            </div>
          </AdvancedMarker>
        );
      })}
    </>
  );
}

/** Stands in when the map cannot be shown: no API key, or the SDK threw. */
function MapPlaceholder({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div
      className={`bg-warm-100 flex items-center justify-center ${fullWidth ? "h-[600px]" : "rounded-xl h-[400px]"}`}
    >
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
        <p className="text-sm text-warm-500">
          Interactive neighbourhood map coming soon
        </p>
      </div>
    </div>
  );
}

function AllNeighbourhoodsMapInner({
  fullWidth = false,
}: {
  fullWidth?: boolean;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  if (!apiKey) return <MapPlaceholder fullWidth={fullWidth} />;

  return (
    <APIProvider apiKey={apiKey}>
      <div
        className={
          fullWidth
            ? "overflow-hidden h-[600px]"
            : "rounded-xl overflow-hidden border border-warm-200 shadow-sm h-[500px]"
        }
      >
        <Map
          defaultCenter={{ lat: 49.24, lng: -123.09 }}
          defaultZoom={12.5}
          mapId="all-neighbourhoods-map"
          gestureHandling="cooperative"
          disableDefaultUI={false}
          zoomControl
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl
        >
          <NeighbourhoodBoundaries onHover={setHoveredName} />
          <NeighbourhoodMarkers hoveredName={hoveredName} />
        </Map>
      </div>
    </APIProvider>
  );
}

export default function AllNeighbourhoodsMap(props: { fullWidth?: boolean }) {
  return (
    <MapErrorBoundary fallback={<MapPlaceholder fullWidth={props.fullWidth} />}>
      <AllNeighbourhoodsMapInner {...props} />
    </MapErrorBoundary>
  );
}
