import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/crm", () => ({
  pushLeadToCrm: vi.fn(async () => true),
  splitName: (name: string) => {
    const [first_name, ...rest] = name.split(" ");
    return { first_name, last_name: rest.join(" ") };
  },
}));
vi.mock("@/lib/ddf", () => ({ fetchListings: vi.fn() }));

import {
  clientFromHeaders,
  handleMcpBody,
  INVALID_PARAMS,
  INVALID_REQUEST,
  LATEST_PROTOCOL_VERSION,
  METHOD_NOT_FOUND,
  RATE_LIMITED,
} from "./mcp";
import { CONNECTOR_TOOLS } from "./connector";
import { NAP } from "./site";

/** Narrow a single (non-batch) response to its result for assertions. */
function resultOf<T = Record<string, unknown>>(body: unknown): T {
  return (body as { result: T }).result;
}

function request(method: string, params?: unknown, id: string | number = 1) {
  return { jsonrpc: "2.0", id, method, ...(params === undefined ? {} : { params }) };
}

describe("MCP initialize", () => {
  it("echoes a supported protocol version and names the server", async () => {
    const { status, body } = await handleMcpBody(
      request("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "muse", version: "1" } }),
      {},
    );
    expect(status).toBe(200);
    expect(body).toMatchObject({
      jsonrpc: "2.0",
      id: 1,
      result: {
        protocolVersion: "2025-03-26",
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "aparna-kapur-real-estate" },
      },
    });
    expect(resultOf<{ instructions: string }>(body).instructions).toContain(NAP.telephone);
  });

  it("falls back to the latest version when the client asks for an unknown one", async () => {
    const { body } = await handleMcpBody(request("initialize", { protocolVersion: "1999-01-01" }), {});
    expect(resultOf<{ protocolVersion: string }>(body).protocolVersion).toBe(LATEST_PROTOCOL_VERSION);
  });

  it("answers a notification with 202 and no body", async () => {
    const { status, body } = await handleMcpBody({ jsonrpc: "2.0", method: "notifications/initialized" }, {});
    expect(status).toBe(202);
    expect(body).toBeNull();
  });

  it("answers ping", async () => {
    const { body } = await handleMcpBody(request("ping"), {});
    expect(body).toEqual({ jsonrpc: "2.0", id: 1, result: {} });
  });
});

describe("MCP tools", () => {
  it("lists every catalogue tool with a schema and read-only hints", async () => {
    const { body } = await handleMcpBody(request("tools/list"), {});
    const { tools } = resultOf<{ tools: { name: string; inputSchema: unknown; annotations: { readOnlyHint: boolean } }[] }>(body);
    expect(tools.map((tool) => tool.name)).toEqual(CONNECTOR_TOOLS.map((tool) => tool.name));
    for (const tool of tools) {
      expect(tool.inputSchema).toMatchObject({ type: "object" });
    }
    expect(tools.find((tool) => tool.name === "book_consultation")?.annotations.readOnlyHint).toBe(false);
    expect(tools.find((tool) => tool.name === "get_agent_profile")?.annotations.readOnlyHint).toBe(true);
  });

  it("calls a tool and returns text plus structured content", async () => {
    const { body } = await handleMcpBody(
      request("tools/call", { name: "check_service_area", arguments: { place: "North Van" } }),
      {},
    );
    expect(body).toMatchObject({
      id: 1,
      result: {
        content: [{ type: "text" }],
        structuredContent: { served: true, municipality: "North Vancouver" },
      },
    });
    expect(resultOf<{ isError?: boolean }>(body).isError).toBeUndefined();
  });

  it("reports bad arguments inside the result so the model can retry", async () => {
    const { body } = await handleMcpBody(
      request("tools/call", { name: "check_service_area", arguments: {} }),
      {},
    );
    const result = resultOf<{ isError: boolean; content: { text: string }[] }>(body);
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain("place");
  });

  it("treats an unknown tool as invalid params", async () => {
    const { body } = await handleMcpBody(request("tools/call", { name: "teleport" }), {});
    expect(body).toMatchObject({ error: { code: INVALID_PARAMS } });
  });

  it("surfaces the rate limiter as a JSON-RPC error", async () => {
    const { body } = await handleMcpBody(
      request("tools/call", { name: "book_consultation", arguments: { name: "Sam Lee", email: "sam@example.com", intent: "call" } }),
      { limit: () => ({ allowed: false, retryAfterSeconds: 30 }) },
    );
    expect(body).toMatchObject({ error: { code: RATE_LIMITED } });
  });

  it("lets a caller name its client in _meta", async () => {
    const { pushLeadToCrm } = await import("@/lib/crm");
    await handleMcpBody(
      request("tools/call", {
        name: "book_consultation",
        arguments: { name: "Sam Lee", email: "meta-client@example.com", intent: "call" },
        _meta: { client: "Meta Muse" },
      }),
      { client: "curl" },
    );
    const lead = vi.mocked(pushLeadToCrm).mock.calls.at(-1)![0];
    expect(lead.tags).toContain("Connector: Meta Muse");
  });
});

describe("MCP framing", () => {
  it("rejects non-JSON-RPC bodies", async () => {
    const { body } = await handleMcpBody({ hello: "world" }, {});
    expect(body).toMatchObject({ id: null, error: { code: INVALID_REQUEST } });
  });

  it("rejects unknown methods", async () => {
    const { body } = await handleMcpBody(request("resources/list"), {});
    expect(body).toMatchObject({ id: 1, error: { code: METHOD_NOT_FOUND } });
  });

  it("answers a batch with a batch, dropping notifications", async () => {
    const { status, body } = await handleMcpBody(
      [request("ping", undefined, "a"), { jsonrpc: "2.0", method: "notifications/initialized" }, request("tools/list", undefined, "b")],
      {},
    );
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect((body as { id: string }[]).map((message) => message.id)).toEqual(["a", "b"]);
  });

  it("ignores client responses", async () => {
    const { status } = await handleMcpBody({ jsonrpc: "2.0", id: 9, result: {} }, {});
    expect(status).toBe(202);
  });
});

describe("clientFromHeaders", () => {
  it("prefers an explicit client header, then recognises the big assistants", () => {
    expect(clientFromHeaders(new Headers({ "x-client-name": "My Bot" }))).toBe("My Bot");
    expect(clientFromHeaders(new Headers({ "user-agent": "Muse/1.0 (+https://muse.ai)" }))).toBe("Meta Muse");
    expect(clientFromHeaders(new Headers({ "user-agent": "ChatGPT-User/1.0" }))).toBe("ChatGPT");
    expect(clientFromHeaders(new Headers({ "user-agent": "Claude-User/1.0" }))).toBe("Claude");
    expect(clientFromHeaders(new Headers({ "user-agent": "curl/8.0" }))).toBe("curl");
    expect(clientFromHeaders(new Headers())).toBeUndefined();
  });
});
