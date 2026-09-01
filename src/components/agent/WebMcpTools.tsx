"use client";

import { useEffect } from "react";
import {
  LEAD_INTERESTS,
  storeLeadDraft,
  validateLeadDraft,
} from "@/lib/agent/lead-draft";

/**
 * WebMCP registration: publishes the site's tools on `document.modelContext`
 * so an agent operating inside the visitor's browser can call them instead of
 * reading the page and guessing.
 *
 * The tool list is not duplicated here. It is fetched from `/mcp` — the same
 * JSON-RPC endpoint a remote MCP client uses — and each registered tool proxies
 * its call straight back there. One registry in `lib/agent/tools.ts`, one wire
 * format, so the in-page tools and the remote server cannot describe the site
 * differently.
 *
 * Nothing happens in a browser without WebMCP: the feature check fails, the
 * component returns, and no request is made. That is nearly every visitor
 * today — `document.modelContext` is experimental, behind a flag in Chrome.
 *
 * Note for whoever enables Cloudflare's WebMCP toggle later: its bridge ships
 * an `mcp-server-client` pack that discovers a site's own `/mcp` and registers
 * those tools itself. Turning that pack on while this component is mounted
 * would register every tool twice. Take one or the other — this component
 * keeps the tool descriptions under version control, which is where the
 * wording an agent selects on belongs.
 */

const MCP_ENDPOINT = "/mcp";
const PROTOCOL_VERSION = "2026-07-28";

type McpToolDescriptor = {
  name: string;
  title?: string;
  description: string;
  inputSchema: Record<string, unknown>;
};

type McpContent = { type: string; text?: string };

type ToolExecuteResult = { content: McpContent[]; isError?: boolean };

type ModelContext = {
  registerTool: (
    tool: {
      name: string;
      description: string;
      inputSchema: Record<string, unknown>;
      execute: (args: Record<string, unknown>) => Promise<ToolExecuteResult>;
    },
    options?: { signal?: AbortSignal },
  ) => Promise<void>;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

/**
 * The spec settled on `document.modelContext`; earlier drafts and some
 * experimental builds expose it on `navigator`. Check both — a wrong guess
 * here silently costs the whole surface.
 */
function getModelContext(): ModelContext | undefined {
  if (typeof document !== "undefined" && document.modelContext)
    return document.modelContext;
  if (typeof navigator !== "undefined" && navigator.modelContext)
    return navigator.modelContext;
  return undefined;
}

let requestId = 0;

async function rpc(
  method: string,
  params: Record<string, unknown>,
  signal?: AbortSignal,
) {
  requestId += 1;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
    "MCP-Protocol-Version": PROTOCOL_VERSION,
    "Mcp-Method": method,
  };

  // 2026-07-28 mirrors the tool name into a header, and the server rejects the
  // call if the two disagree.
  if (method === "tools/call" && typeof params.name === "string") {
    headers["Mcp-Name"] = params.name;
  }

  const response = await fetch(MCP_ENDPOINT, {
    method: "POST",
    headers,
    // Same-origin so the visitor's own session is what runs the call, never a
    // bearer token handed to the agent.
    credentials: "same-origin",
    signal,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: requestId,
      method,
      params: {
        ...params,
        _meta: {
          "io.modelcontextprotocol/protocolVersion": PROTOCOL_VERSION,
          "io.modelcontextprotocol/clientInfo": {
            name: "aparnakapur.com webmcp bridge",
            version: "1.0.0",
          },
          "io.modelcontextprotocol/clientCapabilities": {},
        },
      },
    }),
  });

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error.message ?? "MCP request failed");
  }
  return payload.result;
}

/**
 * Report agent-driven activity to the site's existing analytics, so the
 * question "is anything actually reaching us through an agent, and what is it
 * asking for?" has an answer. Tool names and coarse intent only — never the
 * contents of a draft, which is the visitor's own contact information.
 */
function trackAgentEvent(event: string, params: Record<string, unknown> = {}) {
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
      .gtag;
    gtag?.("event", event, { ...params, surface: "webmcp" });
  } catch {
    // Analytics must never be able to break a tool call.
  }
}

/**
 * The one tool that is registered here rather than fetched from `/mcp`, and
 * the only one that touches the visitor's own details.
 *
 * It writes a draft to `sessionStorage` and stops. No network call, no CRM
 * write, no mail. The contact form prefills from that draft behind a banner
 * saying an assistant filled it in, and a person presses Send. That keeps the
 * submit path — and the consent that comes with it — attached to a human, so
 * an agent working from injected instructions can produce a draft and never a
 * lead. See `lib/agent/lead-draft.ts` for the full reasoning.
 *
 * It is absent from `/mcp` on purpose: a headless MCP client has no one at the
 * keyboard to do the confirming, so it is not offered the tool.
 */
async function registerContactDraftTool(
  modelContext: ModelContext,
  signal: AbortSignal,
) {
  await modelContext.registerTool(
    {
      name: "prepare_contact_request",
      description:
        "Prepare a message to Aparna Kapur, pre-filled with the person's own contact details, for them to review and send themselves. This does NOT send anything and does not reach Aparna: it fills in the contact form on the page, and the person must read it and press Send. Only call this when the person has asked to get in touch and has given you their real name and email address. Never invent, guess, or reuse details from elsewhere — a draft with wrong details wastes the person's time and is visible to them.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The person's name, as they gave it. Do not guess.",
          },
          email: {
            type: "string",
            description:
              "The person's own email address, as they gave it. Do not guess.",
          },
          phone: {
            type: "string",
            description:
              "Optional phone number, only if the person offered one.",
          },
          interest: {
            type: "string",
            description: "What they want to talk about.",
            enum: [...LEAD_INTERESTS],
          },
          message: {
            type: "string",
            description:
              "A short summary, in the person's own terms, of what they are looking for — budget, neighbourhoods, timing.",
          },
        },
        required: ["name", "email"],
        additionalProperties: false,
      },
      async execute(args) {
        const result = validateLeadDraft(args ?? {});

        if (!result.ok) {
          return {
            content: [
              {
                type: "text",
                text: `The draft was not prepared:\n${result.problems
                  .map((problem) => `- ${problem}`)
                  .join("\n")}`,
              },
            ],
            isError: true,
          };
        }

        storeLeadDraft(result.draft);
        trackAgentEvent("webmcp_contact_draft_prepared", {
          interest: result.draft.interest || "unspecified",
          has_phone: Boolean(result.draft.phone),
        });

        return {
          content: [
            {
              type: "text",
              text: [
                "Draft prepared — nothing has been sent yet.",
                "",
                `Tell the person their details are filled in on the contact form at ${window.location.origin}/contact, and that they need to check them and press Send themselves. If they are already on a page with the form, it has been filled in for them.`,
                "",
                "You cannot send this on their behalf, and asking again will not change that. The draft expires in 30 minutes.",
              ].join("\n"),
            },
          ],
          isError: false,
        };
      },
    },
    { signal },
  );
}

export default function WebMcpTools() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const controller = new AbortController();

    (async () => {
      try {
        const listed = await rpc("tools/list", {}, controller.signal);
        const tools: McpToolDescriptor[] = listed?.tools ?? [];

        for (const tool of tools) {
          if (controller.signal.aborted) return;

          await modelContext.registerTool(
            {
              name: tool.name,
              description: tool.description,
              inputSchema: tool.inputSchema,
              async execute(args) {
                try {
                  const result = await rpc("tools/call", {
                    name: tool.name,
                    arguments: args ?? {},
                  });
                  trackAgentEvent("webmcp_tool_call", { tool: tool.name });
                  return {
                    content: result?.content ?? [
                      { type: "text", text: "No result." },
                    ],
                    isError: result?.isError ?? false,
                  };
                } catch (error) {
                  // Hand the agent something it can act on. A thrown execute
                  // reads as a broken tool and it stops choosing this site.
                  return {
                    content: [
                      {
                        type: "text",
                        text: `${tool.name} could not complete: ${
                          error instanceof Error
                            ? error.message
                            : "unknown error"
                        }. The same information is on the page.`,
                      },
                    ],
                    isError: true,
                  };
                }
              },
            },
            { signal: controller.signal },
          );
        }

        if (controller.signal.aborted) return;
        await registerContactDraftTool(modelContext, controller.signal);
      } catch (error) {
        // A page that cannot register tools is still a working page. Never let
        // this break rendering for a human visitor.
        if (!controller.signal.aborted) {
          console.warn("WebMCP tool registration skipped:", error);
        }
      }
    })();

    // Aborting the signal unregisters every tool registered with it.
    return () => controller.abort();
  }, []);

  return null;
}
