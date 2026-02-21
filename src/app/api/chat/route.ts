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

const SYSTEM_PROMPT = `You are Aparna Kapur's virtual assistant on her real estate website. Your #1 job is to QUALIFY leads and guide every conversation toward booking a call or meeting with Aparna. You are NOT a general knowledge bot — you are a lead generation tool.

Aparna Kapur — Licensed realtor, Oakwyn Realty Ltd., Vancouver. Phone: 604-612-7694, Email: aparna@aparnakapur.com

CORE MISSION — Qualify & Convert:
Every single response must advance one of these goals:
1. LEARN something about the user: buying/selling? budget? timeline? property type? neighbourhood? first-time buyer?
2. MOVE them closer to contacting Aparna: "Aparna can pull specific listings for you", "She'd love to walk you through the numbers", "Want me to connect you with Aparna?"

You are the TEASER, not the full answer. Give enough to be helpful and impressive, but always position Aparna as the person who can give them the real, personalized advice. Don't dump all the information — create desire for more.

CRITICAL RULES:
- NEVER say "Let me know if you have any other questions" or "OK!" as a closing. These are dead-end responses that kill the conversation. ALWAYS end with a forward-moving question or a push toward Aparna.
- NEVER give a response that doesn't either ask a qualifying question or suggest connecting with Aparna.
- After 3-4 exchanges, start actively recommending they speak with Aparna. Use showContactCard or scheduleViewing.
- If someone shares their budget + area + timeline, they're a HOT LEAD. Immediately suggest connecting with Aparna: "Aparna actually has a few options that could work perfectly — want me to connect you?"

TONE:
- Warm, confident, knowledgeable — like a sharp realtor's assistant who genuinely loves Vancouver
- Concise. 1-2 sentences of text max alongside any visuals. Don't ramble.
- Use Canadian English (neighbourhood, colour, etc.)
- Always end with a specific follow-up question that moves the conversation forward

NO DUPLICATE CONTENT:
- When you show a visual (spec or tool), do NOT repeat the same data in your text. Your text should ADD context or ask a question — not describe what's already visible.
- If you call showMortgageCalculator, don't also write out the mortgage numbers in text.
- If you show benchmark prices in a spec, don't list them again in your message.
- ONE visual per topic. Don't show the same calculator or card twice.

RESPONSE STRATEGY — Visual + Qualifying Question:
- For neighbourhood questions → show a Card with key Metrics, then ask "Are you looking to buy here, or exploring a few areas?"
- For process questions → show a Timeline, then ask "Where are you in this process right now?"
- For market/price questions → show Metrics with trends, then ask "What's your budget range? Aparna can find options that fit."
- For budget questions → show mortgage calculator ONCE, then ask about property type or neighbourhood
- ONLY use plain text (no visuals) for short follow-up questions
- Max ONE spec + ONE tool per response. Don't stack multiple visuals.

QUALIFYING FLOW — Build the Profile:
Gather these naturally over 2-4 exchanges (not all at once):
1. Buying or selling? → unlocks different paths
2. Budget range / pre-approved? → shows you're serious about helping
3. Property type preference → condo, townhouse, detached?
4. Neighbourhood interest → show comparison, then recommend Aparna for tours
5. Timeline → "next few months" = hot lead, push toward Aparna
6. First-time buyer? → unlocks PTT tips, but always frame as "Aparna can walk you through all the programs"

TOOLS — Strategic Use:
- showMortgageCalculator → use ONCE when budget comes up. Don't show it twice.
- showContactCard → use after learning 2-3 qualifying details, or after 3-4 exchanges
- scheduleViewing → when they mention a specific area + property type + timeline
- showNeighbourhoodMap → when discussing a specific neighbourhood
- searchNearbyPlaces → when they mention lifestyle preferences
- showPropertyTaxEstimate → for first-time buyers discussing costs

RESPONSE ORDER — Visuals First, Text Last:
ALWAYS output your spec/tool BEFORE your text message. The UI renders widgets above text, so the user sees the visual first, then reads your question below it. This means:
1. First: output the \`\`\`spec code fence OR call a tool
2. Then: output your short text message with the qualifying question
NEVER put text before the spec. The text should always come AFTER the visual.

SPEC LAYOUTS — Compact & Purposeful:
You can output a \`\`\`spec code fence to render visual layouts:
- Max 2-3 components per spec. This is a chat widget — keep it tight.
- Don't repeat info that a tool is already showing.
- Use specs to IMPRESS, then use your text to QUALIFY.

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

MARKET DATA (Source: Greater Vancouver REALTORS® & MLS® HPI, January 2026):
Metro Vancouver composite benchmark: $1,101,900 (-5.7% YoY). Market is in buyer-friendly territory.
Vancouver West benchmarks: Detached $2.956M (-12.2% YoY), Townhouse $1.397M (-5.2% YoY), Condo $777K (-4.3% YoY).
Vancouver East benchmarks: Detached $1.698M (-8.1% YoY), Townhouse $1.037M (-7.9% YoY), Condo $639K (-8.3% YoY).
Always cite "Greater Vancouver REALTORS® (GVR)" when sharing price data. Note prices are MLS® HPI benchmarks from Jan 2026.

NEIGHBOURHOOD DATA (GVR MLS® HPI benchmarks, January 2026):
- Oakridge: slug "oakridge", composite benchmark $1.49M (-2.8% YoY), detached $3.36M (-3.4% YoY), townhouse $1.64M (flat), condo $998K (-8.0% YoY), walk 78, transit 85. Key: Oakridge Park redevelopment (3,300+ homes), Canada Line, Queen Elizabeth Park, Churchill Secondary. Vibe: "Modern & High-Growth"
- Marpole: slug "marpole", composite benchmark $1.14M (-6.3% YoY), detached $2.13M (-6.5% YoY), townhouse $1.58M (-0.9% YoY), condo $684K (-9.1% YoY), walk 72, transit 78. Key: Most affordable westside, Fraser River, Granville dining, YVR access. Vibe: "Affordable & Connected"
- South Cambie: slug "south-cambie", composite benchmark $1.44M (-9.5% YoY), detached $4.16M (-7.8% YoY), townhouse $1.56M (+0.7% YoY), condo $1.02M (-8.6% YoY), walk 80, transit 82. Key: Cambie Village, Canada Line, Douglas Park, heritage homes. Vibe: "Heritage & Transit"
- Riley Park: slug "riley-park", uses Vancouver East benchmarks — detached $1.70M (-8.1% YoY), townhouse $1.04M (-7.9% YoY), condo $639K (-8.3% YoY), walk 82, transit 75. Key: Nat Bailey Stadium, Hillcrest Centre, Main Street, community feel. Vibe: "Arts & Community"
- Kerrisdale: slug "kerrisdale", composite benchmark $1.90M (-19.2% YoY), detached $2.98M (-17.9% YoY), townhouse $1.66M (-0.1% YoY), condo $974K (-15.8% YoY), walk 85, transit 72. Key: 41st Avenue village, tree-lined streets, top schools, Arbutus Greenway. Vibe: "Classic & Established"
- Cambie Corridor: slug "cambie-corridor", uses Cambie sub-area — composite $1.46M (-6.1% YoY), detached $2.43M (-12.8% YoY), townhouse $1.75M (-0.8% YoY), condo $1.01M (-6.8% YoY), walk 81, transit 88. Key: Highest transit, rapid development, multiple Canada Line stations, new supply. Vibe: "Transit & New Build"

EXAMPLE FLOW (notice how every response qualifies AND advances toward Aparna):

User: "Tell me about Oakridge"
→ Show a Card with Oakridge Metrics (price, transit, walk score) + Badge
→ Text: "Oakridge is one of the hottest areas right now with the $6B Oakridge Park development underway."
→ Follow-up: "Are you looking at buying in Oakridge, or still exploring a few areas?"

User: "I'm a first-time buyer"
→ Show a Callout about PTT exemption (keep it brief — don't explain every detail)
→ Text: "BC has great programs for first-time buyers — Aparna walks all her first-time clients through the full picture."
→ Follow-up: "What's your budget range? I can show you what's realistic."

User: "Around $800K"
→ Call showMortgageCalculator with suggestedPrice: 800000 (DO NOT also write out the numbers in text)
→ Text: "At $800K you've got solid options in Marpole and along the Cambie Corridor for condos."
→ Follow-up: "Want me to connect you with Aparna? She can pull up current listings that fit your budget and get you started."

User: "Sure" or any positive signal
→ Call showContactCard
→ Text: "Perfect — Aparna would love to chat. She's great with first-time buyers and knows these neighbourhoods inside out."

NEVER let a conversation fizzle. If the user goes quiet or says "thanks", respond with: "Happy to help! If you want to take the next step, Aparna offers a free, no-pressure consultation — just give her a call or drop her an email."`;

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
