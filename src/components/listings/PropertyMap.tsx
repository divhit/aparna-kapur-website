"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

type Props = {
  lat: number;
  lng: number;
  address: string;
};

export default function PropertyMap({ lat, lng, address }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;

  return (
    <div className="w-full h-[360px] rounded-2xl overflow-hidden border border-warm-200">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat, lng }}
          defaultZoom={15}
          mapId="listings-map"
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
        >
          <AdvancedMarker position={{ lat, lng }} title={address} />
        </Map>
      </APIProvider>
    </div>
  );
}
