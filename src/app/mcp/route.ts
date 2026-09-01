import { NextRequest, NextResponse } from "next/server";
import {
  MCP_INSTRUCTIONS,
  MCP_SERVER_INFO,
  SITE_TOOLS,
  getTool,
  type SiteTool,
} from "@/lib/agent/tools";

/**
 * The site's MCP endpoint — the tools in `lib/agent/tools.ts` over JSON-RPC.
 *
 * Two kinds of caller reach this route:
 *
 *   - A remote MCP client (a Claude or ChatGPT connector pointed at
 *     https://www.aparnakapur.com/mcp) that wants the listings and market data
 *     without a browser.
 *   - The in-page WebMCP bridge (`components/agent/WebMcpTools.tsx`), which
 *     registers the same tools on `document.modelContext` and proxies each
 *     call back here same-origin. Cloudflare's WebMCP bridge, if its dashboard
 *     toggle is ever enabled, discovers a site's MCP server the same way.
 *
 * The server is *dual-era*, in the spec's terminology. Revision 2026-07-28
 * deleted the `initialize` handshake in favour of per-request `_meta` plus a
 * mandatory `server/discover`, but the connectors shipping today still open
 * with `initialize`. A modern request is served modern; an `initialize` (or a
 * request carrying no modern metadata) is served under the older semantics.
 * See https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning
 *
 * It is stateless: no `Mcp-Session-Id`, no SSE, no resumable streams. Every
 * tool is read-only over public data, so there is nothing to authenticate and
 * nothing a session would carry.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODERN_VERSION = "2026-07-28";

/** Newest first — the order a client sees in an UnsupportedProtocolVersionError. */
const SUPPORTED_VERSIONS = [
  MODERN_VERSION,
  "2025-11-25",
  "2025-06-18",
] as const;

/** The legacy revision we answer `initialize` with when the client asks for something we do not know. */
const FALLBACK_LEGACY_VERSION = "2025-06-18";

const META_VERSION_KEY = "io.modelcontextprotocol/protocolVersion";
const META_SERVER_INFO_KEY = "io.modelcontextprotocol/serverInfo";

// JSON-RPC and MCP error codes.
const METHOD_NOT_FOUND = -32601;
const INVALID_PARAMS = -32602;
const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const HEADER_MISMATCH = -32020;
const UNSUPPORTED_PROTOCOL_VERSION = -32022;
const RATE_LIMITED = -32000;

type JsonRpcId = string | number | null;

type JsonRpcMessage = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

// ---------------------------------------------------------------------------
// CORS
//
// Every tool here reads public data and the endpoint has no authentication, so
// there is no cross-origin secret to leak and no cookie for a hostile origin to
// ride. Browser-based MCP clients are allowed in deliberately. The spec's
// Origin check exists to stop DNS rebinding against *local* servers holding
// privileged state; this one holds none.
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id",
  "Access-Control-Max-Age": "86400",
};

function json(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
) {
  return NextResponse.json(body, {
    status,
    headers: { ...CORS_HEADERS, "Cache-Control": "no-store", ...extraHeaders },
  });
}

function rpcError(
  id: JsonRpcId,
  code: number,
  message: string,
  data?: unknown,
  status = 200,
) {
  return json(
    {
      jsonrpc: "2.0",
      id,
      error: data === undefined ? { code, message } : { code, message, data },
    },
    status,
  );
}

// ---------------------------------------------------------------------------
// Rate limiting
//
// Best-effort, per warm serverless instance. It is not a security boundary —
// it exists so a runaway agent loop cannot burn through the DDF® quota that
// the rest of the site depends on. Only tool calls are counted; listing tools
// is cheap and static.
// ---------------------------------------------------------------------------

const CALL_LIMIT = 40;
const CALL_WINDOW_MS = 60_000;
const callCounts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(request: NextRequest): boolean {
  const key =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = callCounts.get(key);

  if (!entry || now > entry.resetAt) {
    callCounts.set(key, { count: 1, resetAt: now + CALL_WINDOW_MS });
    if (callCounts.size > 5_000) {
      for (const [k, v] of callCounts)
        if (now > v.resetAt) callCounts.delete(k);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > CALL_LIMIT;
}

// ---------------------------------------------------------------------------
// Tool shapes
// ---------------------------------------------------------------------------

function describeTool(tool: SiteTool) {
  return {
    name: tool.name,
    title: tool.title,
    description: tool.description,
    inputSchema: tool.inputSchema,
    annotations: {
      title: tool.title,
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  };
}

async function callTool(name: string, args: Record<string, unknown>) {
  const tool = getTool(name);
  if (!tool) return null;

  try {
    const result = await tool.execute(args);
    return {
      content: [{ type: "text", text: result.text }],
      ...(result.data ? { structuredContent: result.data } : {}),
      isError: false,
    };
  } catch (error) {
    // A thrown tool is a tool execution error, not a protocol error: hand the
    // model something it can act on rather than a stack trace.
    console.error(`MCP tool ${name} threw:`, error);
    return {
      content: [
        {
          type: "text",
          text: `The ${name} tool failed. This is usually a temporary upstream data issue — try again shortly, or use https://www.aparnakapur.com directly.`,
        },
      ],
      isError: true,
    };
  }
}

// ---------------------------------------------------------------------------
// Method dispatch
//
// `modern` decides two things: whether results carry the `resultType`
// discriminator introduced in 2026-07-28, and whether `initialize` is a valid
// method at all.
// ---------------------------------------------------------------------------

async function dispatch(
  method: string,
  params: Record<string, unknown>,
  modern: boolean,
): Promise<{
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}> {
  const complete = modern ? { resultType: "complete" as const } : {};

  switch (method) {
    case "server/discover":
      return {
        result: {
          ...complete,
          supportedVersions: [...SUPPORTED_VERSIONS],
          capabilities: { tools: {} },
          instructions: MCP_INSTRUCTIONS,
          _meta: {
            [META_SERVER_INFO_KEY]: {
              name: MCP_SERVER_INFO.name,
              title: MCP_SERVER_INFO.title,
              version: MCP_SERVER_INFO.version,
            },
          },
          ttlMs: 3_600_000,
          cacheScope: "public",
        },
      };

    case "initialize": {
      // Legacy only. A modern client has server/discover and must not be here.
      if (modern) {
        return {
          error: {
            code: METHOD_NOT_FOUND,
            message: `Method not found: initialize. This server speaks ${SUPPORTED_VERSIONS.join(", ")}; use server/discover.`,
          },
        };
      }
      const requested =
        typeof params.protocolVersion === "string"
          ? params.protocolVersion
          : undefined;
      const negotiated =
        requested &&
        (SUPPORTED_VERSIONS as readonly string[]).includes(requested)
          ? requested
          : FALLBACK_LEGACY_VERSION;

      return {
        result: {
          protocolVersion: negotiated,
          capabilities: { tools: { listChanged: false } },
          serverInfo: MCP_SERVER_INFO,
          instructions: MCP_INSTRUCTIONS,
        },
      };
    }

    case "tools/list":
      return {
        result: {
          ...complete,
          // Deterministic order: clients cache the list and models cache the prompt.
          tools: SITE_TOOLS.map(describeTool),
        },
      };

    case "tools/call": {
      const name = typeof params.name === "string" ? params.name : undefined;
      if (!name) {
        return {
          error: { code: INVALID_PARAMS, message: "A tool name is required." },
        };
      }

      const args =
        params.arguments && typeof params.arguments === "object"
          ? (params.arguments as Record<string, unknown>)
          : {};

      const result = await callTool(name, args);
      if (!result) {
        return {
          error: {
            code: INVALID_PARAMS,
            message: `Unknown tool: ${name}. Available: ${SITE_TOOLS.map((t) => t.name).join(", ")}`,
          },
        };
      }
      return { result: { ...complete, ...result } };
    }

    case "ping":
      return { result: { ...complete } };

    default:
      return {
        error: {
          code: METHOD_NOT_FOUND,
          message: `Method not found: ${method}`,
        },
      };
  }
}

// ---------------------------------------------------------------------------
// Modern header validation
//
// 2026-07-28 mirrors `method` and `params.name` into headers so proxies can
// route without parsing the body, and requires the server to reject any
// disagreement between the two — otherwise a proxy and the server can be made
// to act on different values.
// ---------------------------------------------------------------------------

function decodeHeaderValue(value: string): string {
  const match = /^=\?base64\?(.*)\?=$/.exec(value);
  if (!match) return value;
  try {
    return Buffer.from(match[1], "base64").toString("utf8");
  } catch {
    return value;
  }
}

function validateModernHeaders(
  request: NextRequest,
  message: JsonRpcMessage,
  headerVersion: string | null,
  metaVersion: string | undefined,
): string | null {
  if (!headerVersion) return "Missing required MCP-Protocol-Version header.";
  if (metaVersion && metaVersion !== headerVersion) {
    return `Header mismatch: MCP-Protocol-Version '${headerVersion}' does not match _meta protocolVersion '${metaVersion}'.`;
  }

  const headerMethod = request.headers.get("mcp-method");
  if (!headerMethod) return "Missing required Mcp-Method header.";
  if (headerMethod !== message.method) {
    return `Header mismatch: Mcp-Method header value '${headerMethod}' does not match body value '${message.method}'.`;
  }

  if (message.method === "tools/call") {
    const headerName = request.headers.get("mcp-name");
    const bodyName = (message.params?.name as string | undefined) ?? "";
    if (!headerName) return "Missing required Mcp-Name header.";
    if (decodeHeaderValue(headerName) !== bodyName) {
      return `Header mismatch: Mcp-Name header value '${headerName}' does not match body value '${bodyName}'.`;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return rpcError(
      null,
      INVALID_REQUEST,
      "Content-Type must be application/json.",
      undefined,
      400,
    );
  }

  let message: JsonRpcMessage;
  try {
    message = await request.json();
  } catch {
    return rpcError(
      null,
      PARSE_ERROR,
      "Request body is not valid JSON.",
      undefined,
      400,
    );
  }

  if (Array.isArray(message)) {
    return rpcError(
      null,
      INVALID_REQUEST,
      "JSON-RPC batching is not supported.",
      undefined,
      400,
    );
  }

  const method = message.method;
  if (typeof method !== "string") {
    return rpcError(
      message?.id ?? null,
      INVALID_REQUEST,
      "A JSON-RPC method is required.",
      undefined,
      400,
    );
  }

  // A notification carries no id and expects no body back.
  const isNotification = message.id === undefined || message.id === null;
  if (isNotification) {
    return new NextResponse(null, { status: 202, headers: CORS_HEADERS });
  }

  const id = message.id as JsonRpcId;
  const params = (message.params ?? {}) as Record<string, unknown>;

  // Era detection. A request is modern when it declares a protocol version —
  // in `_meta`, or in the header — that is not a legacy revision. `initialize`
  // is always legacy by definition.
  const meta = (params._meta ?? {}) as Record<string, unknown>;
  const metaVersion =
    typeof meta[META_VERSION_KEY] === "string"
      ? (meta[META_VERSION_KEY] as string)
      : undefined;
  const headerVersion = request.headers.get("mcp-protocol-version");
  const declaredVersion = metaVersion ?? headerVersion ?? undefined;

  const modern = method !== "initialize" && declaredVersion === MODERN_VERSION;

  if (
    declaredVersion &&
    !(SUPPORTED_VERSIONS as readonly string[]).includes(declaredVersion)
  ) {
    return rpcError(
      id,
      UNSUPPORTED_PROTOCOL_VERSION,
      "Unsupported protocol version",
      { supported: [...SUPPORTED_VERSIONS], requested: declaredVersion },
      400,
    );
  }

  if (modern) {
    const headerProblem = validateModernHeaders(
      request,
      message,
      headerVersion,
      metaVersion,
    );
    if (headerProblem) {
      return rpcError(id, HEADER_MISMATCH, headerProblem, undefined, 400);
    }
  }

  if (method === "tools/call" && rateLimited(request)) {
    return rpcError(
      id,
      RATE_LIMITED,
      `Rate limit exceeded: at most ${CALL_LIMIT} tool calls per minute. Retry shortly.`,
      undefined,
      429,
    );
  }

  const { result, error } = await dispatch(method, params, modern);

  if (error) {
    // Modern transport wants an unknown method surfaced as 404 so a client can
    // tell it apart from a legacy server that does not host this endpoint.
    const status = modern && error.code === METHOD_NOT_FOUND ? 404 : 200;
    return rpcError(id, error.code, error.message, error.data, status);
  }

  return json({ jsonrpc: "2.0", id, result });
}

/**
 * The GET stream was removed in 2026-07-28, and this server never offered one.
 * The body names the endpoint so a person who curls it is not left guessing.
 */
export function GET() {
  return json(
    {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: METHOD_NOT_FOUND,
        message:
          "This is the MCP endpoint for aparnakapur.com. Send a JSON-RPC POST — server/discover or tools/list. See https://www.aparnakapur.com/agents.md",
      },
    },
    405,
    { Allow: "POST, OPTIONS" },
  );
}

export function DELETE() {
  return json(
    {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: METHOD_NOT_FOUND,
        message: "This server is stateless; there is no session to delete.",
      },
    },
    405,
    { Allow: "POST, OPTIONS" },
  );
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
