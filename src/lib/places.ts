import type { PointOfInterest } from "./neighborhoods";

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const PLACES_URL = "https://places.googleapis.com/v1/places:searchNearby";

const TYPE_MAP: Record<
  PointOfInterest["type"],
  string[]
> = {
  transit: ["transit_station", "subway_station", "train_station", "light_rail_station"],
  school: ["school", "primary_school", "secondary_school", "university"],
  park: ["park"],
  shopping: ["shopping_mall", "department_store", "supermarket"],
  restaurant: ["restaurant", "cafe"],
  landmark: ["tourist_attraction", "museum", "library", "community_center"],
};

const FIELD_MASK =
  "places.displayName,places.location,places.types,places.editorialSummary,places.id";

async function fetchCategory(
  center: { lat: number; lng: number },
  types: string[],
  poiType: PointOfInterest["type"],
  radius: number,
  maxResults: number
): Promise<PointOfInterest[]> {
  try {
    const res = await fetch(PLACES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY!,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify({
        includedTypes: types,
        maxResultCount: maxResults,
        locationRestriction: {
          circle: {
            center: { latitude: center.lat, longitude: center.lng },
            radius,
          },
        },
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error(`Places API error for ${poiType}: ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (!data.places) return [];

    return data.places.map(
      (p: {
        displayName?: { text?: string };
        location?: { latitude?: number; longitude?: number };
        editorialSummary?: { text?: string };
        id?: string;
      }) => ({
        name: p.displayName?.text ?? "Unknown",
        type: poiType,
        lat: p.location?.latitude ?? center.lat,
        lng: p.location?.longitude ?? center.lng,
        description: p.editorialSummary?.text,
      })
    );
  } catch (err) {
    console.error(`Places API fetch failed for ${poiType}:`, err);
    return [];
  }
}

export async function fetchNeighbourhoodPOIs(
  center: { lat: number; lng: number },
  radius = 1500
): Promise<PointOfInterest[]> {
  if (!API_KEY) {
    console.warn("No GOOGLE_GENERATIVE_AI_API_KEY — skipping Places API");
    return [];
  }

  const categories: { type: PointOfInterest["type"]; max: number }[] = [
    { type: "transit", max: 5 },
    { type: "school", max: 5 },
    { type: "park", max: 4 },
    { type: "shopping", max: 3 },
    { type: "restaurant", max: 4 },
    { type: "landmark", max: 3 },
  ];

  const results = await Promise.all(
    categories.map(({ type, max }) =>
      fetchCategory(center, TYPE_MAP[type], type, radius, max)
    )
  );

  return results.flat();
}
