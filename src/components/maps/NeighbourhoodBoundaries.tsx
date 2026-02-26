"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";

const SLUG_MAP: Record<string, string> = {
  "Oakridge": "oakridge",
  "Marpole": "marpole",
  "South Cambie": "south-cambie",
  "Riley Park": "riley-park",
  "Kerrisdale": "kerrisdale",
  "Kitsilano": "kitsilano",
  "UBC": "ubc",
  "Arbutus Ridge": "arbutus-ridge",
  "Dunbar-Southlands": "dunbar-southlands",
  "Shaughnessy": "shaughnessy",
  "West Point Grey": "west-point-grey",
  "Downtown": "downtown",
  "Fairview": "fairview",
  "West End": "west-end",
  "Mount Pleasant": "mount-pleasant",
  "Grandview-Woodland": "grandview-woodland",
  "Hastings-Sunrise": "hastings-sunrise",
  "Kensington-Cedar Cottage": "kensington-cedar-cottage",
  "Strathcona": "strathcona",
  "Killarney": "killarney",
  "Renfrew-Collingwood": "renfrew-collingwood",
  "Sunset": "sunset",
  "Victoria-Fraserview": "victoria-fraserview",
};

const FOCUS_NAMES = new Set(Object.keys(SLUG_MAP));

const SNAPSHOT_NAMES = new Set([
  "Kitsilano",
  "UBC",
  "West Point Grey",
  "Dunbar-Southlands",
  "Arbutus Ridge",
  "Shaughnessy",
  "Fairview",
  "Mount Pleasant",
  "Strathcona",
  "Grandview-Woodland",
  "Kensington-Cedar Cottage",
  "Renfrew-Collingwood",
  "Sunset",
  "Victoria-Fraserview",
  "Killarney",
  "Downtown",
  "West End",
  "Hastings-Sunrise",
]);

type Props = {
  geojsonUrl?: string;
  filterTo?: string; // Only show this single neighbourhood's boundary
};

export default function NeighbourhoodBoundaries({
  geojsonUrl = "/data/vancouver-neighbourhoods.geojson",
  filterTo,
}: Props) {
  const map = useMap();
  const hoveredRef = useRef<string | null>(null);
  const loadedRef = useRef(false);
  const [hoverLabel, setHoverLabel] = useState<{
    name: string;
    position: { lat: number; lng: number };
  } | null>(null);

  const applyStyles = useCallback(() => {
    if (!map) return;
    map.data.setStyle((feature) => {
      const name = feature.getProperty("name") as string;
      const isFocus = FOCUS_NAMES.has(name);
      const isHovered = name === hoveredRef.current;

      if (filterTo) {
        // Single-neighbourhood mode: show only the target boundary
        const isTarget = name === filterTo;
        return {
          fillColor: isTarget ? "#0d9488" : "transparent",
          fillOpacity: isTarget ? 0.08 : 0,
          strokeColor: isTarget ? "#0d9488" : "transparent",
          strokeWeight: isTarget ? 2 : 0,
          strokeOpacity: isTarget ? 0.6 : 0,
          clickable: false,
          visible: isTarget,
        };
      }

      return {
        fillColor: isFocus ? "#0d9488" : "#64748b",
        fillOpacity: isHovered ? 0.35 : isFocus ? 0.12 : 0.04,
        strokeColor: isFocus ? "#0d9488" : "#94a3b8",
        strokeWeight: isHovered ? 3 : isFocus ? 2 : 1,
        strokeOpacity: isHovered ? 1 : isFocus ? 0.7 : 0.3,
        cursor: "pointer",
      };
    });
  }, [map, filterTo]);

  useEffect(() => {
    if (!map || loadedRef.current) return;
    loadedRef.current = true;

    map.data.loadGeoJson(geojsonUrl, undefined, () => {
      applyStyles();
    });

    // Skip hover/click for single-neighbourhood mode
    if (filterTo) return;

    const mouseoverListener = map.data.addListener(
      "mouseover",
      (e: google.maps.Data.MouseEvent) => {
        const name = e.feature.getProperty("name") as string;
        hoveredRef.current = name;
        applyStyles();

        if (e.latLng) {
          setHoverLabel({
            name,
            position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          });
        }
      }
    );

    const mouseoutListener = map.data.addListener("mouseout", () => {
      hoveredRef.current = null;
      applyStyles();
      setHoverLabel(null);
    });

    const clickListener = map.data.addListener(
      "click",
      (e: google.maps.Data.MouseEvent) => {
        const name = e.feature.getProperty("name") as string;
        const slug = SLUG_MAP[name];
        if (slug) {
          window.location.href = `/neighborhoods/${slug}`;
        }
      }
    );

    return () => {
      google.maps.event.removeListener(mouseoverListener);
      google.maps.event.removeListener(mouseoutListener);
      google.maps.event.removeListener(clickListener);
      map.data.forEach((feature) => map.data.remove(feature));
      loadedRef.current = false;
    };
  }, [map, geojsonUrl, filterTo, applyStyles]);

  const isSnapshot = hoverLabel ? SNAPSHOT_NAMES.has(hoverLabel.name) : false;

  // Only show hover pill for snapshot neighbourhoods (detailed ones already have permanent labels)
  if (!hoverLabel || filterTo || !isSnapshot) return null;

  const label = `Snapshot \u00B7 ${hoverLabel.name}`;

  return (
    <AdvancedMarker position={hoverLabel.position}>
      <div
        className="bg-teal-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border-2 border-white cursor-pointer whitespace-nowrap"
        onClick={() => {
          const slug = SLUG_MAP[hoverLabel.name];
          if (slug) window.location.href = `/neighborhoods/${slug}`;
        }}
      >
        {label}
      </div>
    </AdvancedMarker>
  );
}
