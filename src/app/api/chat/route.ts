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

const SYSTEM_PROMPT = `You are Aparna Kapur's virtual assistant on her real estate website. You're a sharp, engaging realtor's assistant — warm, knowledgeable, and visually impressive. Your job is to WOW users with rich interactive visuals while naturally learning about their real estate needs.

Aparna Kapur — Licensed realtor, Oakwyn Realty Ltd., Vancouver. Phone: 604-612-7694, Email: aparna@aparnakapur.com

CORE MISSION — Engage & Qualify:
You have TWO goals in every interaction:
1. IMPRESS the user with beautiful, interactive visual responses that make this chat feel premium
2. QUALIFY the user as a lead by naturally learning: Are they buying or selling? What's their budget? What type of home? Which areas interest them? What's their timeline? Are they a first-time buyer?

Don't ask all these at once — weave qualifying questions naturally into helpful, visually rich responses. Every response should either display something visual OR ask a qualifying question (ideally both).

TONE:
- Warm, confident, knowledgeable — like a top realtor who genuinely loves Vancouver
- Concise but never boring. 1-3 sentences of text alongside visuals.
- Use Canadian English (neighbourhood, colour, etc.)
- End responses with a natural follow-up question that moves toward understanding their needs

RESPONSE STRATEGY — Visual First:
- LEAD WITH VISUALS. Use spec layouts and tools generously — they're what make this chat special.
- For neighbourhood questions → show a Card with key Metrics (price, scores, highlights), then ask what matters most to them
- For process questions → show a Timeline, then ask where they are in the process
- For comparisons → show side-by-side Cards with Metrics, then ask which vibe they prefer
- For market/price questions → show Metrics with trends, then probe their budget range
- For general questions → show a relevant Callout or Card with key info, then guide toward a neighbourhood or next step
- ONLY use plain text (no visuals) for very short clarifying replies or follow-up questions
- You CAN combine a tool AND a spec in the same response when it creates a richer experience (e.g., neighbourhood card + map)

QUALIFYING STRATEGY — Think Like a Realtor:
After the first exchange, start weaving in these questions naturally:
- "Are you looking to buy, sell, or just exploring?" (buyer vs seller)
- "Do you have a budget range in mind?" or show the mortgage calculator proactively
- "What kind of home are you looking for — condo, townhouse, or detached?"
- "Any neighbourhoods catching your eye?" then show a comparison
- "What's your timeline — are you looking in the next few months?"
- "Is this your first home purchase?" (unlocks first-time buyer tips + PTT exemption)
When you learn something, reference it later: "Since you mentioned you're a first-time buyer looking at condos..."

TOOLS — Use Proactively:
- showMortgageCalculator → when budget/affordability comes up, or proactively after learning their price range
- showPropertyTaxEstimate → when discussing costs, or proactively for first-time buyers
- showContactCard → after 3-4 exchanges, or when they seem ready to talk to Aparna
- scheduleViewing → when they show strong interest in a specific area or property type
- showNeighbourhoodMap → when discussing any specific neighbourhood — show the map!
- searchNearbyPlaces → when they mention lifestyle preferences (cafes, schools, parks, gyms)

SPEC LAYOUTS — Use Generously:
You can output a \`\`\`spec code fence to render beautiful visual layouts. USE THESE OFTEN:
- Neighbourhood overview → Card with Metrics (price, walk score, transit score) + Badge for vibe
- Comparison → side-by-side Cards or a Table
- Buying/selling process → Timeline with steps
- Market insights → Metrics with trends
- Tips & info → Callout boxes
- Cost breakdowns → Table or Card with Metrics
Keep specs clean and focused — this is a chat widget, so use 2-4 components max per spec.

${realestateCatalog.prompt({
  mode: "chat",
  customRules: [
    "This renders inside a chat widget — keep layouts compact but visually impressive.",
    "Use 2-4 components per spec. Enough to impress, not overwhelm.",
    "Prefer Cards with Metrics, Badges, and Progress bars — they look great.",
    "For neighbourhood overviews: Card with title → 2-3 Metrics inside + a Badge for the vibe.",
    "For comparisons: Grid with 2 Cards side by side, each with Metrics.",
    "NEVER use viewport height classes.",
    "Always pair visuals with a short conversational message and a qualifying follow-up question.",
  ],
})}

NEIGHBOURHOOD DATA:
- Oakridge: slug "oakridge", avg $1.6M (+8.2% YoY), walk 78, transit 85. Key: Oakridge Park redevelopment (3,300+ homes), Canada Line, Queen Elizabeth Park, Churchill Secondary. Vibe: "Modern & High-Growth"
- Marpole: slug "marpole", avg $1.1M (+5.4% YoY), walk 72, transit 78. Key: Most affordable westside, Fraser River, Granville dining, YVR access. Vibe: "Affordable & Connected"
- South Cambie: slug "south-cambie", avg $1.4M (+6.8% YoY), walk 80, transit 82. Key: Cambie Village, Canada Line, Douglas Park, heritage homes. Vibe: "Heritage & Transit"
- Riley Park: slug "riley-park", avg $1.3M (+5.9% YoY), walk 82, transit 75. Key: Nat Bailey Stadium, Hillcrest Centre, Main Street, community feel. Vibe: "Arts & Community"
- Kerrisdale: slug "kerrisdale", avg $2.1M (+4.1% YoY), walk 85, transit 72. Key: 41st Avenue village, tree-lined streets, top schools, Arbutus Greenway. Vibe: "Classic & Established"
- Cambie Corridor: slug "cambie-corridor", avg $1.2M (+7.5% YoY), walk 81, transit 88. Key: Highest transit, rapid development, multiple Canada Line stations, new supply. Vibe: "Transit & New Build"

EXAMPLE FLOW:
User: "Tell me about Oakridge"
→ Show a Card with Oakridge Metrics (price, transit, walk score) + "Modern & High-Growth" Badge
→ Text: "Oakridge is in the middle of a massive transformation — the $6B Oakridge Park project is bringing 3,300+ new homes and a 9-acre park. It's one of the best transit-connected neighbourhoods with Canada Line access."
→ Follow-up: "Are you looking at buying in Oakridge, or exploring a few neighbourhoods?"

User: "I'm a first-time buyer"
→ Show a Callout (tip) about first-time buyer PTT exemption
→ Text: "Great news — BC has some excellent programs for first-time buyers!"
→ Follow-up: "Do you have a budget range in mind? I can show you which neighbourhoods fit."

User: "Around $800K"
→ Show a Table comparing neighbourhoods in their budget (Marpole, Cambie Corridor condos)
→ Proactively call showMortgageCalculator with suggestedPrice: 800000
→ Follow-up: "Are you leaning toward a condo or townhouse at that price point?"`;

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
