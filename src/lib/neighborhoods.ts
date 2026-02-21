export type PointOfInterest = {
  name: string;
  type: "transit" | "school" | "park" | "shopping" | "landmark" | "restaurant";
  lat: number;
  lng: number;
  description?: string;
};

export type NeighbourhoodData = {
  name: string;
  slug: string;
  center: { lat: number; lng: number };
  zoom: number;
  tagline: string;
  avgPrice: string;
  priceChange: string;
  walkScore: number;
  transitScore: number;
  highlights: string[];
  /** Minimal fallback POIs for chat map cards (full POIs fetched via Places API) */
  fallbackPOIs: PointOfInterest[];
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
};

export const NEIGHBOURHOODS: Record<string, NeighbourhoodData> = {
  oakridge: {
    name: "Oakridge",
    slug: "oakridge",
    center: { lat: 49.2275, lng: -123.1167 },
    zoom: 14,
    tagline: "Vancouver's Most Exciting Transformation",
    avgPrice: "$1.49M",
    priceChange: "-2.8% YoY",
    walkScore: 78,
    transitScore: 85,
    highlights: [
      "Oakridge Park redevelopment (3,300+ homes)",
      "Canada Line SkyTrain access",
      "Queen Elizabeth Park",
      "Top-rated schools (Churchill Secondary)",
    ],
    bounds: { north: 49.2375, south: 49.2175, east: -123.1000, west: -123.1350 },
    fallbackPOIs: [
      { name: "Oakridge-41st Avenue Station", type: "transit", lat: 49.2293, lng: -123.1167, description: "Canada Line SkyTrain — 15 min to Downtown" },
      { name: "Langara-49th Avenue Station", type: "transit", lat: 49.2262, lng: -123.1108, description: "Canada Line SkyTrain" },
      { name: "Oakridge Park Redevelopment", type: "landmark", lat: 49.2275, lng: -123.1167, description: "$6B mixed-use development — 3,300+ new homes, 9-acre park" },
    ],
  },
  marpole: {
    name: "Marpole",
    slug: "marpole",
    center: { lat: 49.2100, lng: -123.1300 },
    zoom: 14,
    tagline: "Historic Charm Meets Modern Living",
    avgPrice: "$1.14M",
    priceChange: "-6.3% YoY",
    walkScore: 72,
    transitScore: 78,
    highlights: [
      "Most affordable westside neighbourhood",
      "Fraser River waterfront",
      "Growing dining scene on Granville",
      "Direct YVR access via Canada Line",
    ],
    bounds: { north: 49.2200, south: 49.2000, east: -123.1100, west: -123.1500 },
    fallbackPOIs: [
      { name: "Marine Drive Station", type: "transit", lat: 49.2098, lng: -123.1200, description: "Canada Line SkyTrain — connects to YVR & Downtown" },
      { name: "Fraser River Park", type: "park", lat: 49.2020, lng: -123.1270, description: "Waterfront trails with river views" },
      { name: "Marpole Community Centre", type: "landmark", lat: 49.2098, lng: -123.1316, description: "Community programs, fitness, and events" },
    ],
  },
  "south-cambie": {
    name: "South Cambie",
    slug: "south-cambie",
    center: { lat: 49.2450, lng: -123.1150 },
    zoom: 14,
    tagline: "Where Families Put Down Roots",
    avgPrice: "$1.44M",
    priceChange: "-9.5% YoY",
    walkScore: 80,
    transitScore: 82,
    highlights: [
      "Cambie Village shopping district",
      "Canada Line stations",
      "Douglas Park community centre",
      "Heritage home character",
    ],
    bounds: { north: 49.2550, south: 49.2350, east: -123.1000, west: -123.1300 },
    fallbackPOIs: [
      { name: "King Edward Station", type: "transit", lat: 49.2490, lng: -123.1158, description: "Canada Line SkyTrain" },
      { name: "Douglas Park", type: "park", lat: 49.2476, lng: -123.1085, description: "Community park with playground, pool, and sports fields" },
      { name: "Cambie Village", type: "shopping", lat: 49.2510, lng: -123.1150, description: "Vibrant local shopping and dining district" },
    ],
  },
  "riley-park": {
    name: "Riley Park",
    slug: "riley-park",
    center: { lat: 49.2420, lng: -123.1000 },
    zoom: 14,
    tagline: "Creative Energy & Community Spirit",
    avgPrice: "$1.70M",
    priceChange: "-8.1% YoY",
    walkScore: 82,
    transitScore: 75,
    highlights: [
      "Nat Bailey Stadium neighbourhood",
      "Hillcrest Community Centre & pool",
      "Main Street proximity",
      "Strong community feel",
    ],
    bounds: { north: 49.2520, south: 49.2320, east: -123.0850, west: -123.1150 },
    fallbackPOIs: [
      { name: "Nat Bailey Stadium", type: "landmark", lat: 49.2425, lng: -123.1015, description: "Historic baseball stadium — Home of the Vancouver Canadians" },
      { name: "Hillcrest Community Centre", type: "landmark", lat: 49.2435, lng: -123.1050, description: "Aquatic centre, ice rink, and fitness facilities" },
      { name: "Riley Park", type: "park", lat: 49.2440, lng: -123.0960, description: "The neighbourhood's namesake park with sports fields" },
    ],
  },
  kerrisdale: {
    name: "Kerrisdale",
    slug: "kerrisdale",
    center: { lat: 49.2330, lng: -123.1570 },
    zoom: 14,
    tagline: "Upscale Village Living",
    avgPrice: "$1.90M",
    priceChange: "-19.2% YoY",
    walkScore: 85,
    transitScore: 72,
    highlights: [
      "Village shopping on 41st Avenue",
      "Tree-lined streets",
      "Top school catchments",
      "Arbutus Greenway access",
    ],
    bounds: { north: 49.2430, south: 49.2230, east: -123.1420, west: -123.1720 },
    fallbackPOIs: [
      { name: "Kerrisdale Village", type: "shopping", lat: 49.2340, lng: -123.1560, description: "Boutique shopping and dining on 41st Avenue" },
      { name: "Kerrisdale Arena", type: "landmark", lat: 49.2330, lng: -123.1600, description: "Community ice rink and recreation" },
      { name: "Arbutus Greenway", type: "park", lat: 49.2340, lng: -123.1540, description: "Multi-use trail for walking and cycling" },
    ],
  },
  "cambie-corridor": {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    center: { lat: 49.2380, lng: -123.1150 },
    zoom: 13,
    tagline: "Transit-Oriented Growth",
    avgPrice: "$1.46M",
    priceChange: "-6.1% YoY",
    walkScore: 81,
    transitScore: 88,
    highlights: [
      "Highest transit connectivity",
      "Rapid development corridor",
      "Multiple Canada Line stations",
      "New condo and townhome supply",
    ],
    bounds: { north: 49.2600, south: 49.2100, east: -123.1050, west: -123.1250 },
    fallbackPOIs: [
      { name: "Oakridge-41st Avenue Station", type: "transit", lat: 49.2293, lng: -123.1167, description: "Canada Line SkyTrain" },
      { name: "King Edward Station", type: "transit", lat: 49.2490, lng: -123.1158, description: "Canada Line SkyTrain" },
      { name: "Cambie Heritage Boulevard", type: "landmark", lat: 49.2400, lng: -123.1150, description: "Tree-lined boulevard with heritage character" },
    ],
  },
};

export function getNeighbourhood(slug: string): NeighbourhoodData | undefined {
  return NEIGHBOURHOODS[slug];
}

export function getAllNeighbourhoods(): NeighbourhoodData[] {
  return Object.values(NEIGHBOURHOODS);
}

export const POI_ICONS: Record<PointOfInterest["type"], string> = {
  transit: "🚇",
  school: "🏫",
  park: "🌳",
  shopping: "🛍️",
  landmark: "📍",
  restaurant: "🍽️",
};
