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
  structureType?: string;
  addressContains?: string;
  neighbourhood?: string;
  minBedrooms?: number;
  minBathrooms?: number;
  orderby?: string;
};

const NON_RESIDENTIAL_SUBTYPES = [
  "Business",
  "Industrial",
  "Retail",
  "Office",
  "Vacant Land",
  "Recreational",
];

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
      raw.Longitude as number,
    ),
    realtorUrl: listingUrl
      ? listingUrl.startsWith("http")
        ? listingUrl
        : `https://${listingUrl}`
      : `https://www.realtor.ca/real-estate/${raw.ListingKey as string}`,
    yearBuilt: raw.YearBuilt as number | undefined,
    parking: raw.ParkingTotal as number | undefined,
    daysOnMarket: raw.OriginalEntryTimestamp
      ? Math.floor(
          (Date.now() -
            new Date(raw.OriginalEntryTimestamp as string).getTime()) /
            (1000 * 60 * 60 * 24),
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
  south: 49.2,
  east: -123.085,
  west: -123.172,
};

// Wider bounds for landing page funnels (not used by main site)
export const VANCOUVER_WIDE_BOUNDS: BoundingBox = {
  north: 49.3,
  south: 49.2,
  east: -123.02,
  west: -123.22,
};

export const EAST_VANCOUVER_BOUNDS: BoundingBox = {
  north: 49.29,
  south: 49.24,
  east: -123.02,
  west: -123.1,
};

// ---------------------------------------------------------------------------
// Core fetch function
// ---------------------------------------------------------------------------

async function fetchPropertiesInBounds(
  bounds: BoundingBox,
  options?: ListingQueryOptions,
): Promise<{ listings: DDFProperty[]; totalCount?: number }> {
  try {
    const token = await getAccessToken();

    const filters: string[] = [
      `Latitude ge ${bounds.south} and Latitude le ${bounds.north}`,
      `Longitude ge ${bounds.west} and Longitude le ${bounds.east}`,
      // CREA stopped accepting StandardStatus in $filter — the query now 400s
      // if it is included. The feed only distributes active listings, so the
      // clause was redundant; `status` is still read off each record.
      `ListPrice gt 0`,
      `PhotosCount gt 0`,
    ];

    if (options?.minPrice) filters.push(`ListPrice ge ${options.minPrice}`);
    if (options?.maxPrice) filters.push(`ListPrice le ${options.maxPrice}`);
    if (options?.propertySubType) {
      filters.push(`PropertySubType eq '${options.propertySubType}'`);
    }
    if (options?.structureType) {
      filters.push(
        `StructureType/any(s: s eq '${options.structureType.replace(/'/g, "''")}')`,
      );
    }
    if (options?.addressContains) {
      const escaped = options.addressContains.replace(/'/g, "''");
      filters.push(`contains(UnparsedAddress,'${escaped}')`);
    }
    if (options?.minBedrooms) {
      filters.push(`BedroomsTotal ge ${options.minBedrooms}`);
    }
    if (options?.minBathrooms) {
      filters.push(`BathroomsTotalInteger ge ${options.minBathrooms}`);
    }

    // Residential only — exclude business/retail/industrial/office/land/recreational
    const excludeClauses = NON_RESIDENTIAL_SUBTYPES.map(
      (s) => `PropertySubType ne '${s}'`,
    ).join(" and ");
    filters.push(`(${excludeClauses})`);

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

export async function fetchListingByKey(
  listingKey: string,
): Promise<DDFProperty | null> {
  if (!listingKey) return null;
  try {
    const token = await getAccessToken();
    const escaped = listingKey.replace(/'/g, "''");
    const params = new URLSearchParams({
      $filter: `ListingKey eq '${escaped}'`,
      $top: "1",
    });
    const url = `https://ddfapi.realtor.ca/odata/v1/Property?${params}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("DDF byKey error:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const first = data.value?.[0];
    return first ? mapDDFProperty(first) : null;
  } catch (error) {
    console.error("DDF byKey fetch error:", error);
    return null;
  }
}

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
    const bounds = VANCOUVER_WIDE_BOUNDS;

    const keywordFilter = OPPORTUNITY_KEYWORDS.map(
      (kw) => `contains(PublicRemarks,'${kw}')`,
    ).join(" or ");

    const filters: string[] = [
      `Latitude ge ${bounds.south} and Latitude le ${bounds.north}`,
      `Longitude ge ${bounds.west} and Longitude le ${bounds.east}`,
      // CREA stopped accepting StandardStatus in $filter — the query now 400s
      // if it is included. The feed only distributes active listings, so the
      // clause was redundant; `status` is still read off each record.
      `ListPrice ge 100000`,
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

    // Post-filter: residential only
    listings = filterResidentialOnly(listings);

    // If keyword search returns too few (or failed), backfill with longest-on-market
    if (listings.length < 6) {
      const { listings: fallback } = await fetchPropertiesInBounds(bounds, {
        top: 24,
        minPrice: 100000,
        orderby: "OriginalEntryTimestamp asc",
      });
      const existingKeys = new Set(listings.map((l) => l.listingKey));
      for (const l of filterResidentialOnly(fallback)) {
        if (!existingKeys.has(l.listingKey)) {
          listings.push(l);
          if (listings.length >= 24) break;
        }
      }
    }

    return listings;
  } catch (error) {
    console.error("DDF opportunity fetch error:", error);
    const { listings } = await fetchPropertiesInBounds(VANCOUVER_WIDE_BOUNDS, {
      top: 24,
      minPrice: 100000,
      orderby: "OriginalEntryTimestamp asc",
    });
    return filterResidentialOnly(listings);
  }
}

/** Remove parking, storage, commercial, and other non-residential listings */
function filterResidentialOnly(listings: DDFProperty[]): DDFProperty[] {
  return listings.filter((l) => {
    const sub = l.propertySubType?.toLowerCase() ?? "";
    const struct = l.structureType?.toLowerCase() ?? "";
    if (
      sub.includes("parking") ||
      sub.includes("locker") ||
      sub.includes("storage")
    )
      return false;
    if (
      sub.includes("commercial") ||
      sub.includes("industrial") ||
      sub.includes("retail") ||
      sub.includes("business") ||
      sub.includes("office") ||
      sub.includes("vacant land") ||
      sub.includes("recreational")
    )
      return false;
    if (struct.includes("commercial") || struct.includes("industrial"))
      return false;
    return true;
  });
}

export async function fetchFeaturedListings(): Promise<DDFProperty[]> {
  // Show longest-on-market listings first — these are the most motivated
  // sellers and most likely to have reduced prices or accept offers below asking
  const { listings } = await fetchPropertiesInBounds(
    ALL_NEIGHBOURHOODS_BOUNDS,
    {
      top: 12,
      orderby: "OriginalEntryTimestamp asc",
    },
  );
  return listings;
}

export async function fetchListings(
  options?: ListingQueryOptions,
): Promise<{ listings: DDFProperty[]; totalCount?: number }> {
  let bounds = VANCOUVER_WIDE_BOUNDS;

  if (options?.neighbourhood) {
    const hood = NEIGHBOURHOODS[options.neighbourhood];
    if (hood?.bounds) {
      bounds = hood.bounds;
    }
  }

  const result = await fetchPropertiesInBounds(bounds, options);
  result.listings = filterResidentialOnly(result.listings);
  return result;
}

/**
 * Pull up to `targetCount` listings for the map by paginating in parallel.
 * DDF rejects $top > ~100 on wide bounding boxes, so we issue several pages
 * of 100 concurrently and merge.
 */
export async function fetchListingsForMap(
  options: Omit<ListingQueryOptions, "top" | "skip"> & { targetCount?: number },
): Promise<DDFProperty[]> {
  const target = Math.min(options.targetCount ?? 300, 500);
  const pageSize = 100;
  const pages = Math.ceil(target / pageSize);

  const requests = Array.from({ length: pages }, (_, i) =>
    fetchListings({
      ...options,
      top: pageSize,
      skip: i * pageSize,
    }),
  );

  const results = await Promise.all(requests);
  const merged: DDFProperty[] = [];
  const seen = new Set<string>();
  for (const r of results) {
    for (const l of r.listings) {
      if (!seen.has(l.listingKey)) {
        seen.add(l.listingKey);
        merged.push(l);
        if (merged.length >= target) return merged;
      }
    }
  }
  return merged;
}

// ---------------------------------------------------------------------------
// Landing page fetcher — uses wider bounds, supports custom bounds override
// ---------------------------------------------------------------------------

export type LandingListingOptions = ListingQueryOptions & {
  bounds?: BoundingBox;
};

export async function fetchLandingListings(
  options?: LandingListingOptions,
): Promise<{ listings: DDFProperty[]; totalCount?: number }> {
  let bounds = options?.bounds ?? VANCOUVER_WIDE_BOUNDS;

  if (options?.neighbourhood) {
    const hood = NEIGHBOURHOODS[options.neighbourhood];
    if (hood?.bounds) {
      bounds = hood.bounds;
    }
  }

  const residentialOptions = {
    ...options,
    minPrice: Math.max(options?.minPrice ?? 0, 100000),
  };

  const result = await fetchPropertiesInBounds(bounds, residentialOptions);
  result.listings = filterResidentialOnly(result.listings);

  return result;
}
