import { NextResponse } from "next/server";
import { fetchListings } from "@/lib/ddf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const { listings } = await fetchListings({
    addressContains: q,
    top: 8,
    orderby: "ListPrice asc",
  });

  const results = listings.map((l) => ({
    listingKey: l.listingKey,
    address: l.address,
    listPrice: l.listPrice,
    photo: l.photos[0],
    bedrooms: l.bedrooms,
    bathrooms: l.bathrooms,
    realtorUrl: l.realtorUrl,
    neighbourhood: l.neighbourhood,
  }));

  return NextResponse.json({ results });
}
