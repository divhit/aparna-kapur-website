import { NextResponse } from "next/server";
import {
  clientFromHeaders,
  handleMcpBody,
  PARSE_ERROR,
  serverInfo,
} from "@/lib/agent/mcp";
import { checkRateLimit } from "@/lib/agent/rate-limit";
import { SITE_URL } from "@/lib/agent/site";

/**
 * The MCP endpoint. See `src/lib/agent/mcp.ts` for the protocol handling;
 * this file is only the HTTP plumbing: CORS, method gating, JSON parsing.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  // Tool results can carry booking details; never cache them.
  "Cache-Control": "no-store",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, Mcp-Session-Id, MCP-Protocol-Version, X-Client-Name",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, MCP-Protocol-Version",
};

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

/**
 * One line per request so Vercel's runtime log shows who is calling and what
 * they got back. No arguments or personal data are logged, only the envelope.
 */
function logMcp(request: Request, status: number, detail: string) {
  const h = request.headers;
  console.log(
    `[mcp] ${request.method} ${status} ${detail} ua="${(h.get("user-agent") ?? "-").slice(0, 80)}" ip=${h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0] ?? "-"} accept="${h.get("accept") ?? "-"}" mcpv=${h.get("mcp-protocol-version") ?? "-"} session=${h.get("mcp-session-id") ? "yes" : "no"}`,
  );
}

export function OPTIONS(request: Request) {
  logMcp(request, 204, "preflight");
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/** No SSE stream is offered, so a GET is 405 with a pointer at the docs. */
export function GET(request: Request) {
  logMcp(request, 405, "get-stream-not-offered");
  return NextResponse.json(
    {
      error: "This MCP server is stateless: send JSON-RPC 2.0 messages by POST. No server-to-client stream is offered.",
      server: serverInfo(),
      docs: `${SITE_URL}/connect`,
      openapi: `${SITE_URL}/api/connector/openapi.json`,
    },
    { status: 405, headers: { ...CORS_HEADERS, Allow: "POST, OPTIONS" } },
  );
}

export function DELETE(request: Request) {
  logMcp(request, 405, "delete-no-session");
  // Nothing to terminate: no session was ever issued.
  return new NextResponse(null, { status: 405, headers: { ...CORS_HEADERS, Allow: "POST, OPTIONS" } });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logMcp(request, 400, "parse-error");
    return json(
      { jsonrpc: "2.0", id: null, error: { code: PARSE_ERROR, message: "Body is not valid JSON." } },
      400,
    );
  }
  const rpcMethod = Array.isArray(body)
    ? `batch[${body.length}]`
    : body && typeof body === "object" && "method" in body
      ? String((body as { method: unknown }).method)
      : "no-method";

  const outcome = await handleMcpBody(body, {
    client: clientFromHeaders(request.headers),
    limit: (scope) => checkRateLimit(request.headers, scope),
  });
  logMcp(request, outcome.status, rpcMethod);
  if (outcome.body === null) {
    return new NextResponse(null, { status: outcome.status, headers: CORS_HEADERS });
  }
  return json(outcome.body, outcome.status);
}
