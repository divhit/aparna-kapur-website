import {
  CONNECTOR_INSTRUCTIONS,
  CONNECTOR_TITLE,
  CONNECTOR_TOOLS,
  CONNECTOR_VERSION,
  toolInputSchema,
} from "./connector";
import { BRAND, NAP, SITE_URL } from "./site";

/**
 * OpenAPI 3.1 for the REST twins of the connector tools, generated from the
 * same catalogue as the MCP tools/list. An assistant that takes "API docs"
 * rather than an MCP URL (Meta Muse accepts either) reads this file.
 */

const RESULT_SCHEMA = {
  type: "object",
  required: ["ok", "tool", "text", "data"],
  properties: {
    ok: { type: "boolean", description: "False when the tool could not do what was asked; `text` then explains why." },
    tool: { type: "string" },
    text: { type: "string", description: "Markdown rendering of the answer, for assistants that read text." },
    data: { type: "object", additionalProperties: true, description: "The same answer as structured data." },
  },
};

const ERROR_SCHEMA = {
  type: "object",
  required: ["ok", "error"],
  properties: {
    ok: { type: "boolean", const: false },
    error: { type: "string" },
  },
};

type SchemaProperty = Record<string, unknown> & { description?: string; type?: string };

function queryParameters(schema: Record<string, unknown>) {
  const properties = (schema.properties ?? {}) as Record<string, SchemaProperty>;
  const required = new Set((schema.required as string[] | undefined) ?? []);
  return Object.entries(properties).map(([name, property]) => ({
    name,
    in: "query",
    required: required.has(name),
    description: property.description,
    schema: Object.fromEntries(Object.entries(property).filter(([key]) => key !== "description")),
  }));
}

export function buildOpenApiDocument() {
  const paths: Record<string, unknown> = {};

  for (const tool of CONNECTOR_TOOLS) {
    const inputSchema = toolInputSchema(tool);
    const hasInput = Object.keys((inputSchema.properties as object | undefined) ?? {}).length > 0;
    const responses = {
      "200": { description: "The tool's answer.", content: { "application/json": { schema: RESULT_SCHEMA } } },
      "400": { description: "Invalid arguments.", content: { "application/json": { schema: ERROR_SCHEMA } } },
      "429": { description: "Too many requests from this client.", content: { "application/json": { schema: ERROR_SCHEMA } } },
    };

    const post = {
      operationId: tool.name,
      summary: tool.title,
      description: tool.description,
      tags: [tool.mutates ? "Booking" : "Information"],
      ...(hasInput
        ? { requestBody: { required: tool.mutates, content: { "application/json": { schema: inputSchema } } } }
        : {}),
      responses,
    };

    paths[`/api/connector/${tool.name}`] = tool.mutates
      ? { post }
      : {
          get: {
            operationId: `${tool.name}_get`,
            summary: tool.title,
            description: tool.description,
            tags: ["Information"],
            parameters: queryParameters(inputSchema),
            responses,
          },
          post,
        };
  }

  return {
    openapi: "3.1.0",
    info: {
      title: CONNECTOR_TITLE,
      version: CONNECTOR_VERSION,
      description: `${CONNECTOR_INSTRUCTIONS}\n\nThe same tools are available over the Model Context Protocol at ${SITE_URL}/api/mcp (Streamable HTTP, stateless). Setup guide: ${SITE_URL}/connect`,
      contact: { name: BRAND.name, email: NAP.email, url: `${SITE_URL}/contact` },
      termsOfService: `${SITE_URL}/terms`,
    },
    servers: [{ url: SITE_URL }],
    tags: [
      { name: "Information", description: "Read-only. No personal data needed." },
      { name: "Booking", description: "Creates a real lead that a human follows up. Needs the user's consent and contact details." },
    ],
    paths,
    "x-mcp": { url: `${SITE_URL}/api/mcp`, transport: "streamable-http", stateless: true },
  };
}
