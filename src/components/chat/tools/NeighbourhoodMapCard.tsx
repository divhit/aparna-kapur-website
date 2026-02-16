"use client";

import { useState } from "react";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import NeighbourhoodMap from "@/components/maps/NeighbourhoodMap";

type Props = {
  neighbourhood: string;
  slug: string;
};

export default function NeighbourhoodMapCard({ neighbourhood, slug }: Props) {
  const data = NEIGHBOURHOODS[slug];

  if (!data) {
    return (
      <div className="bg-warm-50 rounded-xl p-3 my-2 text-xs text-warm-500 italic">
        Map data not available for {neighbourhood}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-2.5">
        <h4 className="text-white text-sm font-semibold">
          {neighbourhood} Map
        </h4>
      </div>
      <div className="p-2">
        <NeighbourhoodMap
          center={data.center}
          zoom={data.zoom}
          pois={[]}
          boundaryName={data.name}
          height="220px"
          showLegend={false}
        />
      </div>
      <div className="px-4 pb-3">
        <a
          href={`/neighborhoods/${slug}`}
          className="block text-center text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg py-2 transition-colors"
        >
          View Full {neighbourhood} Guide &rarr;
        </a>
      </div>
    </div>
  );
}
