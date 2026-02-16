"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMap } from "@vis.gl/react-google-maps";

const SLUG_MAP: Record<string, string> = {
  "Oakridge": "oakridge",
  "Marpole": "marpole",
  "South Cambie": "south-cambie",
  "Riley Park": "riley-park",
  "Kerrisdale": "kerrisdale",
};

const FOCUS_NAMES = new Set(Object.keys(SLUG_MAP));

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
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const loadedRef = useRef(false);

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

    const infoWindow = new google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;

    const mouseoverListener = map.data.addListener(
      "mouseover",
      (e: google.maps.Data.MouseEvent) => {
        const name = e.feature.getProperty("name") as string;
        hoveredRef.current = name;
        applyStyles();

        // Show name tooltip
        if (e.latLng) {
          const slug = SLUG_MAP[name];
          infoWindow.setContent(
            `<div style="padding:4px 8px;font-size:13px;font-weight:600;color:#0f172a;">${name}${slug ? '<div style="font-size:11px;font-weight:400;color:#0d9488;margin-top:2px;">Click to explore →</div>' : ""}</div>`
          );
          infoWindow.setPosition(e.latLng);
          infoWindow.open(map);
        }
      }
    );

    const mouseoutListener = map.data.addListener("mouseout", () => {
      hoveredRef.current = null;
      applyStyles();
      infoWindow.close();
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
      infoWindow.close();
      map.data.forEach((feature) => map.data.remove(feature));
      loadedRef.current = false;
    };
  }, [map, geojsonUrl, filterTo, applyStyles]);

  return null;
}
