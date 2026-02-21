import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  tool,
  stepCountIs,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { pipeJsonRender } from "@json-render/core";
import { realestateCatalog } from "@/lib/render/catalog";

export const maxDuration = 30;

const NEIGHBOURHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  Oakridge: { lat: 49.2275, lng: -123.1167 },
  Marpole: { lat: 49.21, lng: -123.13 },
  "South Cambie": { lat: 49.245, lng: -123.115 },
  "Riley Park": { lat: 49.242, lng: -123.1 },
  Kerrisdale: { lat: 49.233, lng: -123.157 },
  "Cambie Corridor": { lat: 49.238, lng: -123.115 },
};

const SYSTEM_PROMPT = `You are Aparna Kapur's assistant on her real estate website. You are a LEAD GENERATION tool — your job is to quickly qualify visitors and get them talking to Aparna. Every response should soft-sell Aparna.

Aparna Kapur — Licensed realtor, Oakwyn Realty Ltd., Vancouver. 604-612-7694, aparna@aparnakapur.com

== GOLDEN RULES ==

1. NEVER REPEAT A WIDGET. If you already showed a neighbourhood overview, DO NOT show another card about the same neighbourhood. Move the conversation forward — don't redecorate. Once you've shown Oakridge metrics, never show Oakridge metrics again.

2. EVERY RESPONSE MUST MENTION APARNA. Not as a footnote — weave her in naturally: "Aparna actually has a client who just bought in Oakridge Park", "That's one of Aparna's favourite buildings", "Aparna can get you in to see a unit this week." Make the user WANT to talk to her.

3. KEEP TEXT SHORT. Max 2 sentences alongside a visual. Max 3 sentences if text-only. No essays.

4. VISUALS FIRST, THEN TEXT. The UI shows widgets above text. Always output your spec/tool BEFORE your text.

5. MAX ONE VISUAL PER RESPONSE. One spec OR one tool call. Never both. Never two specs.

6. CONVERT FAST. By the 3rd exchange, you should be pushing showContactCard or scheduleViewing. Don't keep asking questions forever.

== CONVERSATION FLOW ==

EXCHANGE 1 (Opener): Show ONE impressive visual about their topic. End with a qualifying question.
EXCHANGE 2 (Qualify): Ask about budget/timeline/property type — but frame it through Aparna: "Aparna has been tracking some great options at that price point. Are you looking at condos or townhouses?"
EXCHANGE 3 (Convert): Show showContactCard or scheduleViewing. Frame it as easy and low-pressure: "Aparna does free 15-minute calls — no pressure, just an honest take on what's out there."
EXCHANGE 4+ (Close): If they haven't booked yet, every response should include Aparna's value: "She's got access to listings before they hit MLS", "She saved her last Oakridge client $40K under asking." Keep it real, not salesy.

== WHAT NOT TO DO ==

- DON'T show the same neighbourhood data twice in different formats. Once is enough.
- DON'T ask more than one question per response.
- DON'T say "Let me know if you have any other questions" — this kills the conversation.
- DON'T give exhaustive market data. Tease the info, then say "Aparna can walk you through the full picture."
- DON'T be a Wikipedia article about Vancouver. Be a warm, sharp assistant who's clearly trying to connect them with Aparna.
- DON'T use text to describe what the widget already shows. Your text adds personality and pushes toward Aparna.

== APARNA SOFT-SELL PHRASES (use naturally, vary them) ==

- "Aparna actually just helped a client close on a place like that"
- "That's right in Aparna's wheelhouse — she knows every building in [area]"
- "Aparna can pull listings that aren't on the public sites yet"
- "She does a free 15-minute call — just to see if it's a good fit"
- "Want me to set up a quick chat with Aparna? No pressure at all"
- "Aparna's been watching this market for her clients — she'd have a sharp take on timing"
- "She can get you into viewings this weekend if you're ready"

== TONE ==
Warm, confident, fun. Like texting a really knowledgeable friend who happens to know Aparna. Canadian English (neighbourhood, colour). Keep it light and conversational — not formal, not corporate.

== TOOLS ==
- showContactCard → USE THIS LIBERALLY. By exchange 3, show it. If user says "sure", "yeah", "interested", "sounds good" — show it immediately.
- scheduleViewing → When they mention wanting to see places or tour an area.
- showMortgageCalculator → ONCE when budget comes up.
- showNeighbourhoodMap → ONCE per neighbourhood, and only if they ask about the area.
- showPropertyTaxEstimate → For first-time buyers asking about costs.
- searchNearbyPlaces → When they ask about cafes, restaurants, lifestyle.

== RESPONSE ORDER ==
1. First: output the spec code fence OR call a tool (if using a visual)
2. Then: your short text with Aparna soft-sell + one question OR a call-to-action

${realestateCatalog.prompt({
  mode: "chat",
  customRules: [
    "Chat widget — keep layouts SMALL. Max 2-3 components per spec.",
    "Prefer Cards with 2-3 Metrics + a Badge. That's the sweet spot.",
    "For neighbourhood: ONE Card with title, 2-3 Metrics, 1 Badge. That's it.",
    "For comparisons: Grid with 2 small Cards. Max 2 Metrics per card.",
    "NEVER show the same neighbourhood card twice.",
    "NEVER use viewport height classes.",
  ],
})}

== MARKET DATA (GVR MLS® HPI, January 2026) ==
Metro Vancouver composite: $1.1M (-5.7% YoY). Buyer-friendly market.
Van West: Detached $2.96M (-12.2%), Townhouse $1.40M (-5.2%), Condo $777K (-4.3%).
Van East: Detached $1.70M (-8.1%), Townhouse $1.04M (-7.9%), Condo $639K (-8.3%).

== NEIGHBOURHOOD DATA (GVR MLS® HPI, January 2026) ==
Oakridge: slug "oakridge", composite $1.49M (-2.8%), detached $3.36M, townhouse $1.64M, condo $998K (-8.0%), walk 78, transit 85. Oakridge Park redevelopment, Canada Line. Vibe: "Modern & High-Growth"
Marpole: slug "marpole", composite $1.14M (-6.3%), detached $2.13M, townhouse $1.58M, condo $684K (-9.1%), walk 72, transit 78. Most affordable westside. Vibe: "Affordable & Connected"
South Cambie: slug "south-cambie", composite $1.44M (-9.5%), detached $4.16M, townhouse $1.56M, condo $1.02M, walk 80, transit 82. Heritage homes, Cambie Village. Vibe: "Heritage & Transit"
Riley Park: slug "riley-park", detached $1.70M, townhouse $1.04M, condo $639K, walk 82, transit 75. Main Street, Nat Bailey. Vibe: "Arts & Community"
Kerrisdale: slug "kerrisdale", composite $1.90M (-19.2%), detached $2.98M, townhouse $1.66M, condo $974K, walk 85, transit 72. Village feel, top schools. Vibe: "Classic & Established"
Cambie Corridor: slug "cambie-corridor", composite $1.46M (-6.1%), detached $2.43M, townhouse $1.75M, condo $1.01M, walk 81, transit 88. Highest transit, new builds. Vibe: "Transit & New Build"

== EXAMPLE FLOW ==

User: "Tell me about Oakridge"
→ Spec: Card with Oakridge key metrics + Badge
→ "The Oakridge Park development is a game-changer — Aparna's been tracking it for her clients since day one. Are you thinking about buying here?"

User: "Yeah, looking at condos"
→ NO new Oakridge widget. Text only:
→ "Condos in Oakridge are actually down 8% from last year — Aparna thinks it's one of the best entry points she's seen. What's your budget range?"

User: "Around $900K"
→ showContactCard
→ "At $900K you're right in the sweet spot for Oakridge condos. Aparna can pull active listings and the new Oakridge Park pre-sales — want to set up a quick call?"

3 exchanges. Qualified. Converted.`;


export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(3),
    tools: {
      showMortgageCalculator: tool({
        description:
          "Show an interactive mortgage calculator. Use when user asks about mortgage payments, affordability, or monthly costs.",
        inputSchema: z.object({
          suggestedPrice: z
            .number()
            .optional()
            .describe("Pre-fill with a suggested home price"),
          suggestedRate: z
            .number()
            .optional()
            .describe("Pre-fill with a suggested interest rate"),
        }),
        execute: async () => ({ shown: true }),
      }),
      showPropertyTaxEstimate: tool({
        description:
          "Show a BC Property Transfer Tax breakdown. Use when user asks about PTT, transfer tax, or closing costs.",
        inputSchema: z.object({
          purchasePrice: z.number().describe("The property purchase price"),
          isFirstTimeBuyer: z
            .boolean()
            .describe("Whether the buyer is a first-time buyer"),
          isNewlyBuilt: z
            .boolean()
            .optional()
            .describe("Whether the property is newly built"),
        }),
        execute: async (input) => ({
          shown: true,
          price: input.purchasePrice,
        }),
      }),
      showContactCard: tool({
        description:
          "Show Aparna's contact card with phone, email, and booking link. Use when user wants to reach Aparna.",
        inputSchema: z.object({}),
        execute: async () => ({ shown: true }),
      }),
      scheduleViewing: tool({
        description:
          "Show a booking/scheduling form. Use when user wants to see properties, book a tour, or meet Aparna.",
        inputSchema: z.object({
          neighbourhood: z
            .string()
            .optional()
            .describe("Pre-fill neighbourhood if known"),
          context: z
            .string()
            .optional()
            .describe("Context about what the user wants to see"),
        }),
        execute: async () => ({ shown: true }),
      }),
      showNeighbourhoodMap: tool({
        description:
          "Show an interactive Google Map of a neighbourhood with points of interest (transit, schools, parks, shopping). Use when user asks to see a neighbourhood on a map or asks about locations of things in a neighbourhood.",
        inputSchema: z.object({
          neighbourhood: z.string().describe("Neighbourhood name"),
          slug: z
            .string()
            .describe(
              "URL slug: oakridge, marpole, south-cambie, riley-park, kerrisdale, or cambie-corridor"
            ),
        }),
        execute: async (input) => ({
          shown: true,
          neighbourhood: input.neighbourhood,
        }),
      }),
      searchNearbyPlaces: tool({
        description:
          "Search for real nearby places (restaurants, cafes, gyms, parks, shops, etc.) using Google Maps data. Use when user asks about specific types of businesses or places near a neighbourhood.",
        inputSchema: z.object({
          query: z
            .string()
            .describe(
              "Search query, e.g. 'Italian restaurants', 'coffee shops', 'yoga studios'"
            ),
          neighbourhood: z
            .string()
            .describe("Neighbourhood name, e.g. 'Oakridge'"),
        }),
        execute: async ({ query, neighbourhood }) => {
          const coords = NEIGHBOURHOOD_COORDS[neighbourhood] || {
            lat: 49.2275,
            lng: -123.1167,
          };

          try {
            const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
            // Use Gemini 2.5 Flash with Maps grounding (Gemini 3 doesn't support Maps grounding)
            const res = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [
                        {
                          text: `Find the top 5 ${query} specifically in or very near the ${neighbourhood} neighbourhood of Vancouver, BC (near latitude ${coords.lat}, longitude ${coords.lng}). Only include places that are actually in or immediately adjacent to ${neighbourhood}. For each place provide: name, a one-sentence description, and rating (number 1-5 or null). Format as a JSON array: [{"name":"...","description":"...","rating":4.5,"type":"${query}"}]`,
                        },
                      ],
                    },
                  ],
                  tools: [{ googleMaps: {} }],
                  toolConfig: {
                    retrievalConfig: {
                      latLng: {
                        latitude: coords.lat,
                        longitude: coords.lng,
                      },
                    },
                  },
                }),
              }
            );

            const data = await res.json();
            const candidate = data?.candidates?.[0];
            const textContent =
              candidate?.content?.parts
                ?.map((p: { text?: string }) => p.text)
                .join("") || "";
            const groundingChunks =
              candidate?.groundingMetadata?.groundingChunks || [];

            // Extract place data from grounding chunks (real Google Maps data)
            const mapsPlaces = groundingChunks
              .filter((chunk: { maps?: unknown }) => chunk.maps)
              .slice(0, 6)
              .map(
                (chunk: {
                  maps: { title: string; uri: string; placeId?: string };
                }) => ({
                  name: chunk.maps.title,
                  mapsUrl: chunk.maps.uri,
                  placeId: chunk.maps.placeId || null,
                })
              );

            // Try to extract descriptions from the text response
            let enrichedPlaces = mapsPlaces;
            try {
              const jsonMatch = textContent.match(/\[[\s\S]*?\]/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                enrichedPlaces = mapsPlaces.map(
                  (
                    place: {
                      name: string;
                      mapsUrl: string;
                      placeId: string | null;
                    },
                    idx: number
                  ) => {
                    // Match by name similarity
                    const match =
                      parsed.find(
                        (p: { name: string }) =>
                          p.name
                            .toLowerCase()
                            .includes(
                              place.name.toLowerCase().split(" ")[0]
                            ) ||
                          place.name
                            .toLowerCase()
                            .includes(p.name.toLowerCase().split(" ")[0])
                      ) || parsed[idx];
                    return {
                      ...place,
                      description: match?.description || null,
                      rating: match?.rating || null,
                      type: match?.type || query,
                    };
                  }
                );
              }
            } catch {
              // Keep places without enrichment
            }

            return {
              shown: true,
              query,
              neighbourhood,
              lat: coords.lat,
              lng: coords.lng,
              places:
                enrichedPlaces.length > 0
                  ? enrichedPlaces
                  : [
                      {
                        name: `Search "${query}" in ${neighbourhood}`,
                        mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(query + " " + neighbourhood + " Vancouver BC")}`,
                        description: `View ${query} near ${neighbourhood} on Google Maps`,
                        type: query,
                      },
                    ],
            };
          } catch {
            return {
              shown: true,
              query,
              neighbourhood,
              lat: coords.lat,
              lng: coords.lng,
              places: [
                {
                  name: `Search "${query}" in ${neighbourhood}`,
                  mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(query + " " + neighbourhood + " Vancouver BC")}`,
                  description: `View ${query} near ${neighbourhood} on Google Maps`,
                  type: query,
                },
              ],
            };
          }
        },
      }),
    },
  });

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.merge(pipeJsonRender(result.toUIMessageStream()));
    },
  });

  return createUIMessageStreamResponse({ stream });
}
