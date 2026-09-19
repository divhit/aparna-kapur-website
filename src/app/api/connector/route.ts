import { NextResponse } from "next/server";
import { listTools, serverInfo } from "@/lib/agent/mcp";
import { SITE_URL } from "@/lib/agent/site";

/** Index of the connector: what it is and where each surface lives. */
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      ...serverInfo(),
      docs: `${SITE_URL}/connect`,
      mcp: { url: `${SITE_URL}/api/mcp`, transport: "streamable-http", stateless: true },
      openapi: `${SITE_URL}/api/connector/openapi.json`,
      tools: listTools().map((tool) => ({
        name: tool.name,
        title: tool.title,
        description: tool.description,
        readOnly: tool.annotations.readOnlyHint,
        url: `${SITE_URL}/api/connector/${tool.name}`,
        methods: tool.annotations.readOnlyHint ? ["GET", "POST"] : ["POST"],
        inputSchema: tool.inputSchema,
      })),
    },
    { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" } },
  );
}
