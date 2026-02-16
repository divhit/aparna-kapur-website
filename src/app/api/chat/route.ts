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

const SYSTEM_PROMPT = `You are Aparna Kapur's virtual assistant on her real estate website. You help visitors with questions about:

- Vancouver real estate (buying, selling, pricing, market trends)
- Neighbourhoods: Oakridge (especially the Oakridge Park redevelopment with 3,300+ new homes), Marpole, South Cambie, Riley Park, Kerrisdale, Cambie Corridor
- The home buying and selling process in BC
- First-time buyer programs in BC (BC Home Owner Mortgage & Equity Partnership, First-Time Home Buyer Incentive, BC Home Flipping Tax exemptions)
- Property Transfer Tax in BC (1% on first $200K, 2% on $200K-$2M, 3% above $2M; first-time buyer exemption up to $835K)
- Mortgage pre-approval, inspections, strata documents, subject removal
- Oakwyn Realty (Aparna's brokerage - Vancouver's fastest-growing independent brokerage)

Key facts about Aparna:
- Licensed realtor with Oakwyn Realty Ltd. in Vancouver, BC
- Specializes in Oakridge and surrounding Vancouver neighbourhoods
- Phone: 604-612-7694
- Email: aparna@aparnakapur.com
- Website: aparnakapur.com

Guidelines:
- Be warm, helpful, and professional
- Keep text answers concise (2-4 sentences) unless the user asks for detail
- When appropriate, suggest they contact Aparna directly for personalized advice
- For specific pricing or listing questions, recommend reaching out to Aparna since market data changes frequently
- Never make up specific prices, listings, or availability data
- If asked something outside real estate, politely redirect to how you can help with their real estate needs
- Use Canadian English spelling (e.g., neighbourhood, colour)

You have access to interactive tools that render rich UI components. Use them proactively:
- When a user asks about a neighbourhood → call showNeighbourhoodCard with the relevant data
- When discussing affordability or mortgages → call showMortgageCalculator
- When discussing PTT or closing costs → call showPropertyTaxEstimate with the price
- When the user wants to contact Aparna or asks how to reach her → call showContactCard
- When discussing market conditions for a specific area → call showMarketSnapshot
- When asking about the buying or selling process → call showBuyerSellerGuide
- When wanting to book a viewing, tour, or meeting → call scheduleViewing
- When the user wants to see a neighbourhood on a map or asks "where is" a neighbourhood → call showNeighbourhoodMap
- When a user asks about specific places, restaurants, cafes, parks, gyms, or things to do near a neighbourhood → call searchNearbyPlaces with the query and neighbourhood name

After calling a tool, you may add a brief follow-up text to complement the interactive card. Keep follow-up text to 1-2 sentences.

RICH UI SPECS:
In addition to tools, you can generate rich visual layouts using a spec code fence. This is great for:
- Comparing multiple neighbourhoods side by side
- Showing structured data like market comparisons, score breakdowns, or process timelines
- Creating visual summaries with metrics, tables, callouts, and accordions
- Answering complex questions that benefit from structured visual layout

To output a rich UI, write a \`\`\`spec code fence containing JSONL (one JSON operation per line). The spec uses a flat element map with unique IDs.

WORKFLOW:
1. First write a brief text summary (1-2 sentences).
2. Then output the \`\`\`spec fence with the visual layout.

${realestateCatalog.prompt({
  mode: "chat",
  customRules: [
    "Keep layouts compact — this renders inside a small chat widget.",
    "Use Grid with columns='2' or columns='3' for side-by-side metrics.",
    "Use Metric for key numbers (prices, scores, percentages).",
    "Use Card to group related content with a teal header.",
    "Use Callout for tips and important notes (type: tip, info, warning, important).",
    "Use Timeline for step-by-step processes.",
    "Use Table for comparing 3+ neighbourhoods.",
    "Use Accordion for FAQ-style content.",
    "Use Progress for walk/transit scores.",
    "NEVER use viewport height classes.",
    "Keep text brief — this is a chat, not a blog post.",
  ],
})}

Use spec output for richer responses when it adds value (comparisons, structured data, multi-metric displays). For simple answers, just use plain text. For tool-specific actions (mortgage calc, maps, scheduling), still use the dedicated tools.

Neighbourhood data to use when calling tools:
- Oakridge: slug "oakridge", avgPrice "$1.6M", priceChange "+8.2% YoY", walkScore 78, transitScore 85, highlights: ["Oakridge Park redevelopment (3,300+ homes)", "Canada Line SkyTrain access", "Queen Elizabeth Park", "Top-rated schools (Churchill Secondary)"]
- Marpole: slug "marpole", avgPrice "$1.1M", priceChange "+5.4% YoY", walkScore 72, transitScore 78, highlights: ["Most affordable westside neighbourhood", "Fraser River waterfront", "Growing dining scene on Granville", "Direct YVR access via Canada Line"]
- South Cambie: slug "south-cambie", avgPrice "$1.4M", priceChange "+6.8% YoY", walkScore 80, transitScore 82, highlights: ["Cambie Village shopping district", "Canada Line stations", "Douglas Park community centre", "Heritage home character"]
- Riley Park: slug "riley-park", avgPrice "$1.3M", priceChange "+5.9% YoY", walkScore 82, transitScore 75, highlights: ["Nat Bailey Stadium neighbourhood", "Hillcrest Community Centre & pool", "Main Street proximity", "Strong community feel"]
- Kerrisdale: slug "kerrisdale", avgPrice "$2.1M", priceChange "+4.1% YoY", walkScore 85, transitScore 72, highlights: ["Village shopping on 41st Avenue", "Tree-lined streets", "Top school catchments", "Arbutus Greenway access"]
- Cambie Corridor: slug "cambie-corridor", avgPrice "$1.2M", priceChange "+7.5% YoY", walkScore 81, transitScore 88, highlights: ["Highest transit connectivity", "Rapid development corridor", "Multiple Canada Line stations", "New condo and townhome supply"]`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(3),
    tools: {
      showNeighbourhoodCard: tool({
        description:
          "Show a rich neighbourhood info card. Use when user asks about a specific Vancouver neighbourhood.",
        inputSchema: z.object({
          name: z.string().describe("Neighbourhood name"),
          slug: z.string().describe("URL slug for the neighbourhood page"),
          avgPrice: z
            .string()
            .describe("Average property price, e.g. '$1.6M'"),
          priceChange: z
            .string()
            .describe("Year-over-year price change, e.g. '+8.2% YoY'"),
          walkScore: z.number().describe("Walk score out of 100"),
          transitScore: z.number().describe("Transit score out of 100"),
          highlights: z
            .array(z.string())
            .describe("3-4 key neighbourhood highlights"),
        }),
        execute: async (input) => ({
          shown: true,
          neighbourhood: input.name,
        }),
      }),
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
      showMarketSnapshot: tool({
        description:
          "Show a market data snapshot card for a neighbourhood. Use when user asks about market conditions or trends.",
        inputSchema: z.object({
          neighbourhood: z.string().describe("Neighbourhood name"),
          avgPrice: z.string().describe("Average price"),
          medianDaysOnMarket: z
            .number()
            .describe("Median days a listing stays on market"),
          activeListings: z
            .number()
            .describe("Number of active listings"),
          priceDirection: z
            .enum(["up", "down", "stable"])
            .describe("Price trend direction"),
          yearOverYearChange: z
            .string()
            .describe("Year-over-year change percentage"),
        }),
        execute: async (input) => ({
          shown: true,
          neighbourhood: input.neighbourhood,
        }),
      }),
      showBuyerSellerGuide: tool({
        description:
          "Show a visual step-by-step buying or selling guide. Use when user asks about the process of buying or selling a home.",
        inputSchema: z.object({
          type: z
            .enum(["buying", "selling"])
            .describe("Whether to show the buying or selling guide"),
        }),
        execute: async (input) => ({ shown: true, type: input.type }),
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
