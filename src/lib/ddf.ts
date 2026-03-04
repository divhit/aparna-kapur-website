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
  daysOnMarket?: number;
  listedAt?: string;
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
  minBedrooms?: number;
  minBathrooms?: number;
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
    daysOnMarket: raw.OriginalEntryTimestamp
      ? Math.floor(
          (Date.now() - new Date(raw.OriginalEntryTimestamp as string).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : undefined,
    listedAt: raw.OriginalEntryTimestamp as string | undefined,
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
      `PhotosCount gt 0`,
    ];

    if (options?.minPrice) filters.push(`ListPrice ge ${options.minPrice}`);
    if (options?.maxPrice) filters.push(`ListPrice le ${options.maxPrice}`);
    if (options?.propertySubType) {
      filters.push(`PropertySubType eq '${options.propertySubType}'`);
    }
    if (options?.minBedrooms) {
      filters.push(`BedroomsTotal ge ${options.minBedrooms}`);
    }
    if (options?.minBathrooms) {
      filters.push(`BathroomsTotalInteger ge ${options.minBathrooms}`);
    }

    const params = new URLSearchParams({
      $filter: filters.join(" and "),
      $top: String(options?.top ?? 12),
      $orderby: options?.orderby ?? "ModificationTimestamp desc",
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

const OPPORTUNITY_KEYWORDS = [
  "court order",
  "estate sale",
  "motivated",
  "below assess",
  "investor",
  "must sell",
  "price reduced",
];

export async function fetchOpportunityListings(): Promise<DDFProperty[]> {
  try {
    const token = await getAccessToken();
    const bounds = ALL_NEIGHBOURHOODS_BOUNDS;

    const keywordFilter = OPPORTUNITY_KEYWORDS
      .map((kw) => `contains(PublicRemarks,'${kw}')`)
      .join(" or ");

    const filters: string[] = [
      `Latitude ge ${bounds.south} and Latitude le ${bounds.north}`,
      `Longitude ge ${bounds.west} and Longitude le ${bounds.east}`,
      `StandardStatus eq 'Active'`,
      `ListPrice gt 0`,
      `PhotosCount gt 0`,
      `(${keywordFilter})`,
    ];

    const params = new URLSearchParams({
      $filter: filters.join(" and "),
      $top: "24",
      $orderby: "OriginalEntryTimestamp asc",
      $count: "true",
    });

    const url = `https://ddfapi.realtor.ca/odata/v1/Property?${params}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    let listings: DDFProperty[] = [];

    if (res.ok) {
      const data = await res.json();
      listings = (data.value ?? []).map(mapDDFProperty);
    } else {
      console.error("DDF opportunity API error:", res.status, await res.text());
    }

    // If keyword search returns too few (or failed), backfill with longest-on-market
    if (listings.length < 6) {
      const { listings: fallback } = await fetchPropertiesInBounds(bounds, {
        top: 24,
        orderby: "OriginalEntryTimestamp asc",
      });
      const existingKeys = new Set(listings.map((l) => l.listingKey));
      for (const l of fallback) {
        if (!existingKeys.has(l.listingKey)) {
          listings.push(l);
          if (listings.length >= 24) break;
        }
      }
    }

    return listings;
  } catch (error) {
    console.error("DDF opportunity fetch error:", error);
    // Fallback to longest-on-market
    const { listings } = await fetchPropertiesInBounds(ALL_NEIGHBOURHOODS_BOUNDS, {
      top: 24,
      orderby: "OriginalEntryTimestamp asc",
    });
    return listings;
  }
}

export async function fetchFeaturedListings(): Promise<DDFProperty[]> {
  // Show longest-on-market listings first — these are the most motivated
  // sellers and most likely to have reduced prices or accept offers below asking
  const { listings } = await fetchPropertiesInBounds(ALL_NEIGHBOURHOODS_BOUNDS, {
    top: 12,
    orderby: "OriginalEntryTimestamp asc",
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
