import {
  callTool,
  CONNECTOR_INSTRUCTIONS,
  CONNECTOR_NAME,
  CONNECTOR_TITLE,
  CONNECTOR_TOOLS,
  CONNECTOR_VERSION,
  toolInputSchema,
  type ToolContext,
} from "./connector";

/**
 * A stateless Model Context Protocol server over Streamable HTTP.
 *
 * The transport is the spec's simplest legal form: every JSON-RPC message
 * arrives by POST and is answered in the same response as `application/json`.
 * No session id is issued and no SSE stream is opened, which is what lets the
 * endpoint run on a serverless host with nothing to remember between calls.
 * Clients that want a stream (GET) get 405, as the spec allows.
 *
 * Hand-rolled rather than pulled from the SDK: the surface is five tools and
 * four methods, and the whole thing fits in a file that can be unit-tested
 * without a transport.
 */

export const LATEST_PROTOCOL_VERSION = "2025-06-18";
export const SUPPORTED_PROTOCOL_VERSIONS = [
  "2025-06-18",
  "2025-03-26",
  "2024-11-05",
];

export type JsonRpcId = string | number | null;

export type JsonRpcError = {
  jsonrpc: "2.0";
  id: JsonRpcId;
  error: { code: number; message: string; data?: unknown };
};

export type JsonRpcResult = {
  jsonrpc: "2.0";
  id: JsonRpcId;
  result: Record<string, unknown>;
};

export type JsonRpcResponse = JsonRpcResult | JsonRpcError;

export const PARSE_ERROR = -32700;
export const INVALID_REQUEST = -32600;
export const METHOD_NOT_FOUND = -32601;
export const INVALID_PARAMS = -32602;
export const INTERNAL_ERROR = -32603;
/** Server-defined: the lead tools were called too often from one client. */
export const RATE_LIMITED = -32029;

function error(id: JsonRpcId, code: number, message: string, data?: unknown): JsonRpcError {
  return { jsonrpc: "2.0", id, error: data === undefined ? { code, message } : { code, message, data } };
}

function result(id: JsonRpcId, value: Record<string, unknown>): JsonRpcResult {
  return { jsonrpc: "2.0", id, result: value };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidId(value: unknown): value is string | number {
  return typeof value === "string" || (typeof value === "number" && Number.isFinite(value));
}

/** The tools/list payload: every catalogue entry with its JSON Schema and hints. */
export function listTools() {
  return CONNECTOR_TOOLS.map((tool) => ({
    name: tool.name,
    title: tool.title,
    description: tool.description,
    inputSchema: toolInputSchema(tool),
    annotations: {
      title: tool.title,
      readOnlyHint: !tool.mutates,
      destructiveHint: false,
      idempotentHint: !tool.mutates,
      openWorldHint: tool.mutates,
    },
  }));
}

export function serverInfo() {
  return { name: CONNECTOR_NAME, title: CONNECTOR_TITLE, version: CONNECTOR_VERSION };
}

async function handleRequest(
  id: JsonRpcId,
  method: string,
  params: unknown,
  ctx: ToolContext,
): Promise<JsonRpcResponse> {
  switch (method) {
    case "initialize": {
      const requested = isRecord(params) ? params.protocolVersion : undefined;
      const protocolVersion =
        typeof requested === "string" && SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
          ? requested
          : LATEST_PROTOCOL_VERSION;
      return result(id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: serverInfo(),
        instructions: CONNECTOR_INSTRUCTIONS,
      });
    }

    case "ping":
      return result(id, {});

    case "tools/list":
      return result(id, { tools: listTools() });

    case "tools/call": {
      if (!isRecord(params) || typeof params.name !== "string") {
        return error(id, INVALID_PARAMS, "tools/call needs params.name (string) and optional params.arguments (object).");
      }
      const meta = isRecord(params._meta) ? params._meta : {};
      const client = typeof meta.client === "string" && meta.client.trim() ? meta.client.trim() : ctx.client;
      const outcome = await callTool(params.name, params.arguments ?? {}, { ...ctx, client });
      if (!outcome.ok) {
        // Unknown tool is a protocol error; bad arguments are reported inside
        // the result so the model can read the message and retry.
        if (outcome.status === 404) return error(id, INVALID_PARAMS, outcome.error);
        if (outcome.status === 429) return error(id, RATE_LIMITED, outcome.error);
        return result(id, {
          content: [{ type: "text", text: outcome.error }],
          isError: true,
        });
      }
      const { text, data, isError } = outcome.result;
      return result(id, {
        content: [{ type: "text", text }],
        structuredContent: data,
        ...(isError ? { isError: true } : {}),
      });
    }

    default:
      return error(id, METHOD_NOT_FOUND, `Method not found: ${method}`);
  }
}

export type McpHttpResult = {
  status: number;
  body: JsonRpcResponse | JsonRpcResponse[] | null;
};

/**
 * Handle one HTTP POST body: a single message or a batch. Notifications and
 * client responses produce no output; if nothing produced output the caller
 * answers 202 with no body, per the Streamable HTTP transport.
 */
export async function handleMcpBody(body: unknown, ctx: ToolContext): Promise<McpHttpResult> {
  const messages = Array.isArray(body) ? body : [body];
  if (messages.length === 0) {
    return { status: 400, body: error(null, INVALID_REQUEST, "Empty batch.") };
  }

  const responses: JsonRpcResponse[] = [];
  for (const message of messages) {
    if (!isRecord(message) || message.jsonrpc !== "2.0") {
      responses.push(error(null, INVALID_REQUEST, "Expected a JSON-RPC 2.0 message."));
      continue;
    }
    const { id, method, params } = message;

    if (typeof method !== "string") {
      // A response from the client (to a server request). This server never
      // sends requests, so there is nothing to correlate; ignore it.
      if ("result" in message || "error" in message) continue;
      responses.push(error(isValidId(id) ? id : null, INVALID_REQUEST, "Missing method."));
      continue;
    }

    if (id === undefined) {
      // Notification. notifications/initialized and friends need no reply.
      continue;
    }
    if (!isValidId(id)) {
      responses.push(error(null, INVALID_REQUEST, "id must be a string or a number."));
      continue;
    }
    if (params !== undefined && !isRecord(params)) {
      responses.push(error(id, INVALID_PARAMS, "params must be an object."));
      continue;
    }

    try {
      responses.push(await handleRequest(id, method, params, ctx));
    } catch (cause) {
      console.error(`[mcp] ${method} failed:`, cause);
      responses.push(error(id, INTERNAL_ERROR, "Internal error."));
    }
  }

  if (responses.length === 0) return { status: 202, body: null };
  if (Array.isArray(body)) return { status: 200, body: responses };
  return { status: 200, body: responses[0] };
}

/** Best-effort name of the calling assistant, for the lead's source tag. */
export function clientFromHeaders(headers: Headers): string | undefined {
  const explicit = headers.get("x-client-name")?.trim();
  if (explicit) return explicit.slice(0, 60);
  const ua = headers.get("user-agent") ?? "";
  const lower = ua.toLowerCase();
  if (lower.includes("muse") || lower.includes("meta")) return "Meta Muse";
  if (lower.includes("chatgpt") || lower.includes("openai")) return "ChatGPT";
  if (lower.includes("claude") || lower.includes("anthropic")) return "Claude";
  if (lower.includes("gemini") || lower.includes("google")) return "Gemini";
  if (lower.includes("perplexity")) return "Perplexity";
  const token = ua.split(/[\s/]/)[0]?.trim();
  return token ? token.slice(0, 60) : undefined;
}
