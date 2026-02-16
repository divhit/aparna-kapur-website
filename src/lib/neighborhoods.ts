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
  pointsOfInterest: PointOfInterest[];
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
    avgPrice: "$1.6M",
    priceChange: "+8.2% YoY",
    walkScore: 78,
    transitScore: 85,
    highlights: [
      "Oakridge Park redevelopment (3,300+ homes)",
      "Canada Line SkyTrain access",
      "Queen Elizabeth Park",
      "Top-rated schools (Churchill Secondary)",
    ],
    bounds: { north: 49.2375, south: 49.2175, east: -123.1000, west: -123.1350 },
    pointsOfInterest: [
      { name: "Oakridge-41st Avenue Station", type: "transit", lat: 49.2293, lng: -123.1167, description: "Canada Line SkyTrain — 15 min to Downtown" },
      { name: "Langara-49th Avenue Station", type: "transit", lat: 49.2262, lng: -123.1108, description: "Canada Line SkyTrain" },
      { name: "Queen Elizabeth Park", type: "park", lat: 49.2417, lng: -123.1116, description: "Vancouver's second-most visited park with city views" },
      { name: "Oakridge Park Redevelopment", type: "landmark", lat: 49.2275, lng: -123.1167, description: "$6B mixed-use development — 3,300+ new homes, 9-acre park" },
      { name: "Van Horne Elementary", type: "school", lat: 49.2310, lng: -123.1200, description: "K-7 Public School" },
      { name: "Churchill Secondary", type: "school", lat: 49.2350, lng: -123.1147, description: "Grades 8-12 Public School" },
      { name: "Langara College", type: "school", lat: 49.2245, lng: -123.1086, description: "Post-secondary — 23,000+ students" },
      { name: "Langara Golf Course", type: "park", lat: 49.2226, lng: -123.1095, description: "18-hole public course with walking trails" },
    ],
  },
  marpole: {
    name: "Marpole",
    slug: "marpole",
    center: { lat: 49.2100, lng: -123.1300 },
    zoom: 14,
    tagline: "Historic Charm Meets Modern Living",
    avgPrice: "$1.1M",
    priceChange: "+5.4% YoY",
    walkScore: 72,
    transitScore: 78,
    highlights: [
      "Most affordable westside neighbourhood",
      "Fraser River waterfront",
      "Growing dining scene on Granville",
      "Direct YVR access via Canada Line",
    ],
    bounds: { north: 49.2200, south: 49.2000, east: -123.1100, west: -123.1500 },
    pointsOfInterest: [
      { name: "Marine Drive Station", type: "transit", lat: 49.2098, lng: -123.1200, description: "Canada Line SkyTrain — connects to YVR & Downtown" },
      { name: "Fraser River Park", type: "park", lat: 49.2020, lng: -123.1270, description: "Waterfront trails with river views and off-leash dog area" },
      { name: "Marpole Community Centre", type: "landmark", lat: 49.2098, lng: -123.1316, description: "Community programs, fitness, and events" },
      { name: "Granville Street Shops", type: "shopping", lat: 49.2080, lng: -123.1390, description: "Growing dining and retail district" },
      { name: "Marpole-Oakridge Community Centre", type: "landmark", lat: 49.2130, lng: -123.1270, description: "Recreation programs and gathering space" },
      { name: "David Lloyd George Elementary", type: "school", lat: 49.2117, lng: -123.1290, description: "K-7 Public School" },
    ],
  },
  "south-cambie": {
    name: "South Cambie",
    slug: "south-cambie",
    center: { lat: 49.2450, lng: -123.1150 },
    zoom: 14,
    tagline: "Where Families Put Down Roots",
    avgPrice: "$1.4M",
    priceChange: "+6.8% YoY",
    walkScore: 80,
    transitScore: 82,
    highlights: [
      "Cambie Village shopping district",
      "Canada Line stations",
      "Douglas Park community centre",
      "Heritage home character",
    ],
    bounds: { north: 49.2550, south: 49.2350, east: -123.1000, west: -123.1300 },
    pointsOfInterest: [
      { name: "King Edward Station", type: "transit", lat: 49.2490, lng: -123.1158, description: "Canada Line SkyTrain" },
      { name: "Douglas Park", type: "park", lat: 49.2476, lng: -123.1085, description: "Large community park with playground, pool, and sports fields" },
      { name: "Cambie Village", type: "shopping", lat: 49.2510, lng: -123.1150, description: "Vibrant local shopping and dining district" },
      { name: "Queen Elizabeth Park", type: "park", lat: 49.2417, lng: -123.1116, description: "Iconic park with Bloedel Conservatory" },
      { name: "General Wolfe Elementary", type: "school", lat: 49.2460, lng: -123.1100, description: "K-7 Public School" },
      { name: "Emily Carr Elementary", type: "school", lat: 49.2440, lng: -123.1190, description: "K-7 Public School" },
    ],
  },
  "riley-park": {
    name: "Riley Park",
    slug: "riley-park",
    center: { lat: 49.2420, lng: -123.1000 },
    zoom: 14,
    tagline: "Creative Energy & Community Spirit",
    avgPrice: "$1.3M",
    priceChange: "+5.9% YoY",
    walkScore: 82,
    transitScore: 75,
    highlights: [
      "Nat Bailey Stadium neighbourhood",
      "Hillcrest Community Centre & pool",
      "Main Street proximity",
      "Strong community feel",
    ],
    bounds: { north: 49.2520, south: 49.2320, east: -123.0850, west: -123.1150 },
    pointsOfInterest: [
      { name: "Nat Bailey Stadium", type: "landmark", lat: 49.2425, lng: -123.1015, description: "Historic baseball stadium — Home of the Vancouver Canadians" },
      { name: "Hillcrest Community Centre", type: "landmark", lat: 49.2435, lng: -123.1050, description: "Aquatic centre, ice rink, and fitness facilities" },
      { name: "Riley Park", type: "park", lat: 49.2440, lng: -123.0960, description: "The neighbourhood's namesake park with sports fields" },
      { name: "Main Street Shops", type: "shopping", lat: 49.2450, lng: -123.1010, description: "Eclectic shops, craft breweries, and restaurants" },
      { name: "Sir William Van Horne Elementary", type: "school", lat: 49.2400, lng: -123.0970, description: "K-7 Public School" },
      { name: "Eric Hamber Secondary", type: "school", lat: 49.2470, lng: -123.0950, description: "Grades 8-12 Public School" },
    ],
  },
  kerrisdale: {
    name: "Kerrisdale",
    slug: "kerrisdale",
    center: { lat: 49.2330, lng: -123.1570 },
    zoom: 14,
    tagline: "Upscale Village Living",
    avgPrice: "$2.1M",
    priceChange: "+4.1% YoY",
    walkScore: 85,
    transitScore: 72,
    highlights: [
      "Village shopping on 41st Avenue",
      "Tree-lined streets",
      "Top school catchments",
      "Arbutus Greenway access",
    ],
    bounds: { north: 49.2430, south: 49.2230, east: -123.1420, west: -123.1720 },
    pointsOfInterest: [
      { name: "Kerrisdale Village", type: "shopping", lat: 49.2340, lng: -123.1560, description: "Boutique shopping and dining on 41st Avenue" },
      { name: "Kerrisdale Arena", type: "landmark", lat: 49.2330, lng: -123.1600, description: "Community ice rink and recreation" },
      { name: "Arbutus Greenway", type: "park", lat: 49.2340, lng: -123.1540, description: "Multi-use trail for walking and cycling" },
      { name: "Elm Park", type: "park", lat: 49.2310, lng: -123.1530, description: "Quiet neighbourhood park with playground" },
      { name: "Kerrisdale Elementary", type: "school", lat: 49.2350, lng: -123.1580, description: "K-7 Public School" },
      { name: "Point Grey Secondary", type: "school", lat: 49.2390, lng: -123.1640, description: "Grades 8-12 Public School" },
    ],
  },
  "cambie-corridor": {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    center: { lat: 49.2380, lng: -123.1150 },
    zoom: 13,
    tagline: "Transit-Oriented Growth",
    avgPrice: "$1.2M",
    priceChange: "+7.5% YoY",
    walkScore: 81,
    transitScore: 88,
    highlights: [
      "Highest transit connectivity",
      "Rapid development corridor",
      "Multiple Canada Line stations",
      "New condo and townhome supply",
    ],
    bounds: { north: 49.2600, south: 49.2100, east: -123.1050, west: -123.1250 },
    pointsOfInterest: [
      { name: "Oakridge-41st Avenue Station", type: "transit", lat: 49.2293, lng: -123.1167, description: "Canada Line SkyTrain" },
      { name: "King Edward Station", type: "transit", lat: 49.2490, lng: -123.1158, description: "Canada Line SkyTrain" },
      { name: "Marine Drive Station", type: "transit", lat: 49.2098, lng: -123.1200, description: "Canada Line SkyTrain" },
      { name: "Langara-49th Avenue Station", type: "transit", lat: 49.2262, lng: -123.1108, description: "Canada Line SkyTrain" },
      { name: "Cambie Heritage Boulevard", type: "landmark", lat: 49.2400, lng: -123.1150, description: "Tree-lined boulevard with heritage character" },
      { name: "Queen Elizabeth Park", type: "park", lat: 49.2417, lng: -123.1116, description: "Major park along the corridor" },
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
