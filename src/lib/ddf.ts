import { NEIGHBOURHOODS } from "./neighborhoods";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DDFProperty = {
  listingKey: string;
  listingId: string;
  listPrice: number;
  address: string;
  city: string;
  postalCode?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  sqftUnits?: string;
  propertyType?: string;
  propertySubType?: string;
  structureType?: string;
  status: string;
  latitude: number;
  longitude: number;
  description?: string;
  photos: string[];
  neighbourhood?: string;
  realtorUrl: string;
  yearBuilt?: number;
  parking?: number;
  modifiedAt: string;
};

type DDFMediaRaw = {
  MediaKey: string;
  MediaURL: string;
  Order?: number;
  PreferredPhotoYN?: boolean;
  MediaCategory?: string;
};

type BoundingBox = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export type ListingQueryOptions = {
  top?: number;
  skip?: number;
  minPrice?: number;
  maxPrice?: number;
  propertySubType?: string;
  neighbourhood?: string;
  orderby?: string;
};

// ---------------------------------------------------------------------------
// Token management (module-level cache, server-only)
// ---------------------------------------------------------------------------

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const clientId = process.env.DDF_CLIENT_ID;
  const clientSecret = process.env.DDF_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("DDF_CLIENT_ID and DDF_CLIENT_SECRET must be set");
  }

  const res = await fetch("https://identity.crea.ca/connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
      scope: "DDFApi_Read",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("DDF token error:", res.status, text);
    throw new Error(`DDF token request failed: ${res.status}`);
  }

  const data: { access_token: string; expires_in: number } = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;
  return cachedToken;
}

// ---------------------------------------------------------------------------
// Neighbourhood resolver
// ---------------------------------------------------------------------------

function resolveNeighbourhood(lat: number, lng: number): string | undefined {
  for (const hood of Object.values(NEIGHBOURHOODS)) {
    if (!hood.bounds) continue;
    if (
      lat >= hood.bounds.south &&
      lat <= hood.bounds.north &&
      lng >= hood.bounds.west &&
      lng <= hood.bounds.east
    ) {
      return hood.name;
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Property mapper
// ---------------------------------------------------------------------------

function mapDDFProperty(raw: Record<string, unknown>): DDFProperty {
  const media = (raw.Media as DDFMediaRaw[]) ?? [];
  const photos = media
    .filter((m) => m.MediaCategory === "Property Photo")
    .sort((a, b) => {
      if (a.PreferredPhotoYN && !b.PreferredPhotoYN) return -1;
      if (!a.PreferredPhotoYN && b.PreferredPhotoYN) return 1;
      return (a.Order ?? 999) - (b.Order ?? 999);
    })
    .map((m) => m.MediaURL)
    .filter(Boolean);

  const structureTypes = raw.StructureType as string[] | undefined;

  const listingUrl = raw.ListingURL as string | undefined;

  return {
    listingKey: raw.ListingKey as string,
    listingId: raw.ListingId as string,
    listPrice: raw.ListPrice as number,
    address: raw.UnparsedAddress as string,
    city: (raw.City as string) ?? "Vancouver",
    postalCode: raw.PostalCode as string | undefined,
    bedrooms: raw.BedroomsTotal as number | undefined,
    bathrooms: raw.BathroomsTotalInteger as number | undefined,
    sqft: raw.LivingArea as number | undefined,
    sqftUnits: raw.LivingAreaUnits as string | undefined,
    propertyType: raw.CommonInterest as string | undefined,
    propertySubType: raw.PropertySubType as string | undefined,
    structureType: structureTypes?.[0],
    status: raw.StandardStatus as string,
    latitude: raw.Latitude as number,
    longitude: raw.Longitude as number,
    description: raw.PublicRemarks as string | undefined,
    photos,
    neighbourhood: resolveNeighbourhood(
      raw.Latitude as number,
      raw.Longitude as number
    ),
    realtorUrl: listingUrl
      ? (listingUrl.startsWith("http") ? listingUrl : `https://${listingUrl}`)
      : `https://www.realtor.ca/real-estate/${raw.ListingKey as string}`,
    yearBuilt: raw.YearBuilt as number | undefined,
    parking: raw.ParkingTotal as number | undefined,
    modifiedAt: raw.ModificationTimestamp as string,
  };
}

// ---------------------------------------------------------------------------
// Combined bounding box for all 6 focus neighbourhoods
// ---------------------------------------------------------------------------

const ALL_NEIGHBOURHOODS_BOUNDS: BoundingBox = {
  north: 49.26,
  south: 49.20,
  east: -123.085,
  west: -123.172,
};

// ---------------------------------------------------------------------------
// Core fetch function
// ---------------------------------------------------------------------------

async function fetchPropertiesInBounds(
  bounds: BoundingBox,
  options?: ListingQueryOptions
): Promise<{ listings: DDFProperty[]; totalCount?: number }> {
  try {
    const token = await getAccessToken();

    const filters: string[] = [
      `Latitude ge ${bounds.south} and Latitude le ${bounds.north}`,
      `Longitude ge ${bounds.west} and Longitude le ${bounds.east}`,
      `StandardStatus eq 'Active'`,
      `ListPrice gt 0`,
    ];

    if (options?.minPrice) filters.push(`ListPrice ge ${options.minPrice}`);
    if (options?.maxPrice) filters.push(`ListPrice le ${options.maxPrice}`);
    if (options?.propertySubType) {
      filters.push(`PropertySubType eq '${options.propertySubType}'`);
    }

    const params = new URLSearchParams({
      $filter: filters.join(" and "),
      $top: String(options?.top ?? 12),
      $orderby: `PhotosCount desc,${options?.orderby ?? "ModificationTimestamp desc"}`,
      $count: "true",
    });

    if (options?.skip) params.set("$skip", String(options.skip));

    const url = `https://ddfapi.realtor.ca/odata/v1/Property?${params}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("DDF API error:", res.status, await res.text());
      return { listings: [] };
    }

    const data = await res.json();
    return {
      listings: (data.value ?? []).map(mapDDFProperty),
      totalCount: data["@odata.count"],
    };
  } catch (error) {
    console.error("DDF fetch error:", error);
    return { listings: [] };
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function fetchFeaturedListings(): Promise<DDFProperty[]> {
  const { listings } = await fetchPropertiesInBounds(ALL_NEIGHBOURHOODS_BOUNDS, {
    top: 12,
    orderby: "ListPrice desc",
  });
  return listings;
}

export async function fetchListings(
  options?: ListingQueryOptions
): Promise<{ listings: DDFProperty[]; totalCount?: number }> {
  let bounds = ALL_NEIGHBOURHOODS_BOUNDS;

  if (options?.neighbourhood) {
    const hood = NEIGHBOURHOODS[options.neighbourhood];
    if (hood?.bounds) {
      bounds = hood.bounds;
    }
  }

  return fetchPropertiesInBounds(bounds, options);
}
