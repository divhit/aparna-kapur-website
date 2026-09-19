import { NextResponse } from "next/server";
import { callTool, findTool } from "@/lib/agent/connector";
import { clientFromHeaders } from "@/lib/agent/mcp";
import { checkRateLimit } from "@/lib/agent/rate-limit";

/**
 * REST twin of each connector tool: `GET /api/connector/<tool>?arg=…` for the
 * read-only tools, `POST /api/connector/<tool>` with a JSON body for all of
 * them. Described by `/api/connector/openapi.json`.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, X-Client-Name",
};

type Params = { params: Promise<{ tool: string }> };

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

/** Query strings are all text; give numbers and booleans back their types. */
function coerceQuery(searchParams: URLSearchParams): Record<string, unknown> {
  const args: Record<string, unknown> = {};
  for (const [key, value] of searchParams) {
    if (value === "") continue;
    if (/^-?\d+(\.\d+)?$/.test(value)) args[key] = Number(value);
    else if (value === "true" || value === "false") args[key] = value === "true";
    else args[key] = value;
  }
  return args;
}

async function run(request: Request, name: string, args: unknown) {
  const tool = findTool(name);
  if (!tool) return json({ ok: false, error: `Unknown tool "${name}". See /api/connector for the list.` }, 404);

  const outcome = await callTool(name, args, {
    client: clientFromHeaders(request.headers),
    limit: (scope) => checkRateLimit(request.headers, scope),
  });
  if (!outcome.ok) return json({ ok: false, error: outcome.error }, outcome.status);

  const { text, data, isError } = outcome.result;
  return json({ ok: !isError, tool: name, text, data }, 200);
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: Request, { params }: Params) {
  const { tool: name } = await params;
  const tool = findTool(name);
  if (tool?.mutates) {
    return json({ ok: false, error: `${name} changes state; send it by POST with a JSON body.` }, 405);
  }
  return run(request, name, coerceQuery(new URL(request.url).searchParams));
}

export async function POST(request: Request, { params }: Params) {
  const { tool: name } = await params;
  let args: unknown = {};
  const raw = await request.text();
  if (raw.trim()) {
    try {
      args = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: "Body is not valid JSON." }, 400);
    }
  }
  return run(request, name, args);
}
