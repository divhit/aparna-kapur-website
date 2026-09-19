# Muse connector — plugging aparnakapur.com into AI assistants

Meta launched Muse (muse.ai), its personal agent, on September 8, 2026 and
opened it to developer connectors on September 18. This document explains what
that means for Aparna's lead generation, what was built, how to switch it on,
and what it does not do.

## What Muse is, in one paragraph

Muse is a personal agent that plans, browses the web, and runs code on its own
virtual machine in Meta's cloud. It ships with first-party connectors (Gmail,
Google Calendar, OpenTable, Spotify, ...) and supports **custom connectors**:
a user tells Muse about a service, hands it either an **MCP server URL** or
**API docs**, and Muse builds the integration itself, tests it, and saves it as
a skill. Meta does not review custom connectors. Muse launched in the US on
September 8 and in Canada on September 18, 2026, on iOS, Android, macOS, the
web, and inside WhatsApp, so a Vancouver buyer or seller can use it today.

## What "plugging the website in" actually means

There are two separate things, and only one of them is a connector.

1. **Being found.** When a Muse user asks "find me a realtor in North Van",
   Muse searches and browses the open web the way a person would. Nothing in
   the connector program puts a business at the top of that search. What
   decides it is the same thing that decides Google and ChatGPT search
   results: clear entity facts, clear service-area claims, crawlable pages,
   structured data, and machine-readable instructions. The site already had
   most of that (`/agents.md`, `/llms.txt`, markdown twins of every page,
   JSON-LD). This change extends the stated service area to the North Shore
   and tells every agent that reads those files that the site can act, not
   just inform.

2. **Being usable.** Once Muse (or ChatGPT, or Claude) lands on the site, it
   needs a way to *do* things for the user without scraping forms. That is the
   connector: a small set of tools an assistant can call — check service area,
   get contact details, get market data, search listings, and **book a call,
   a viewing, or a free valuation**. The booking tool creates a lead in the
   same CRM, sheet, and inbox as the website form, tagged with the assistant
   that sent it.

## What was built

One tool catalogue (`src/lib/agent/connector.ts`) drives three surfaces:

| Surface | URL | For |
| --- | --- | --- |
| MCP server | `https://www.aparnakapur.com/api/mcp` | Muse ("MCP URL" path), Claude, ChatGPT, any MCP client. Streamable HTTP, stateless, JSON-RPC 2.0 over POST, no auth. |
| REST + OpenAPI | `https://www.aparnakapur.com/api/connector/<tool>` and `/api/connector/openapi.json` | Muse ("API docs" path) and anything that prefers plain HTTP. |
| Human setup page | `https://www.aparnakapur.com/connect` | The page Aparna shares, with a ready-to-paste prompt for Muse. Has a markdown twin at `/connect.md`. |

Tools:

| Tool | Does | Personal data |
| --- | --- | --- |
| `get_agent_profile` | Licence, brokerage, service area, phone, email, hours, verified profiles | No |
| `check_service_area` | Whether a municipality or neighbourhood is covered (Vancouver, North Vancouver, West Vancouver, and all published neighbourhoods); says no honestly for Burnaby, Surrey, etc. | No |
| `get_market_snapshot` | Region and per-neighbourhood MLS HPI benchmarks from the current GVR release | No |
| `search_listings` | Live Vancouver MLS listings via the DDF feed, with filters | No |
| `book_consultation` | Creates a lead (CRM + sheet + Resend email) and returns a reference like `AK-XXXXXXXX` | Yes, with consent |

Discovery updates so agents learn the connector exists: `/agents.md` (new
section and coverage line), `/llms.txt` (endpoint index), `robots.txt`
comments, JSON-LD `areaServed` now includes North Vancouver and West
Vancouver, and a new "Find a REALTOR® in Vancouver, North Vancouver, or West
Vancouver" entry in the when-to-use guidance.

Safety: the booking tool validates name plus email or phone, is rate-limited
per client IP, and refuses without creating anything when validation fails.
Read tools never touch personal data. The MCP server exposes only `tools/*`,
`initialize`, and `ping`; there are no resources, prompts, or sampling.

## How to switch it on in Muse

There is no submission or approval step. Anyone with Muse (Aparna included)
does this once:

1. Open Muse and say: *"Add a custom connector for Aparna Kapur, a Vancouver
   and North Shore real estate agent. Her MCP server is
   https://www.aparnakapur.com/api/mcp (streamable HTTP, no login needed).
   Save it as a skill."* The same text is on `/connect` for copying.
2. Muse builds and tests the integration on its VM and saves it as a skill.
3. Ask: "Does Aparna cover North Vancouver?", "What are condos going for in
   Oakridge?", "Book a call with Aparna about selling my house in West Van."

The lead lands in the CRM tagged `Connector: Meta Muse`, in the Google Sheet
backup, and in ak@aparnakapur.com with the subject "New Lead via Meta Muse".

## What this does not do, and what would

- **It does not make Aparna "first" in Muse search.** No connector program
  can. Ranking comes from the open-web signals above, and this change
  strengthens them (North Shore coverage stated everywhere, action endpoints
  advertised in every agent-facing file). Keep the `rank:check` and
  `verify:agents` scripts in the loop.
- **Muse is live in Canada (September 18, 2026).** Local buyers and sellers
  can add the connector now. The same endpoints also work in Claude and
  ChatGPT custom connectors, so the setup page covers all three.
- **No public connector directory exists yet.** If Meta opens one, the MCP
  URL and the OpenAPI document are what a listing would need, and both are
  already stable. Watch muse.ai/platform for a submission form.
- **Listings are Vancouver-only** in the DDF bounding box the site uses.
  North Shore listing search would need a second bounding box in
  `src/lib/ddf.ts`; until then the tool says so and offers a consultation.

## Verifying a deploy

```bash
# Server card
curl -s https://www.aparnakapur.com/api/connector | jq .

# MCP handshake and tool list
curl -s https://www.aparnakapur.com/api/mcp -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}' | jq .
curl -s https://www.aparnakapur.com/api/mcp -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' | jq '.result.tools[].name'

# A read tool over REST
curl -s 'https://www.aparnakapur.com/api/connector/check_service_area?place=West%20Van' | jq .data.served

# A booking (creates a real lead — use your own details)
curl -s https://www.aparnakapur.com/api/connector/book_consultation -H 'Content-Type: application/json' \
  -H 'X-Client-Name: manual test' \
  -d '{"name":"Test Person","email":"you@example.com","intent":"call","message":"connector smoke test"}' | jq .
```

Unit tests: `npm test` covers the tool catalogue, place matching, every
tool's happy path and failure path, the JSON-RPC framing, batching, and
rate limiting.
