import { NextResponse } from "next/server";
import { buildOpenApiDocument } from "@/lib/agent/openapi";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(buildOpenApiDocument(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
