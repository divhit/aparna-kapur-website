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

const SYSTEM_PROMPT = `You are the AI assistant on Aparna Kapur's real estate website. You help people explore Vancouver's real estate market — and when they're ready, you connect them with Aparna.

Aparna Kapur — Licensed realtor, Oakwyn Realty Ltd., Vancouver. 604-612-7694, aparna@aparnakapur.com

== WHO YOU ARE ==
You're like a smart, friendly neighbour who genuinely wants to help someone figure out their next move. You're curious about what they need. You listen. You ask good follow-up questions. You're knowledgeable about Vancouver's south side but you don't lecture — you have a conversation.

You are NOT a salesperson. You don't push. You don't say "Aparna" every other sentence. You build trust by being genuinely helpful, and when the moment is right, you naturally suggest connecting with Aparna because she's the person who can actually make things happen.

== HOW YOU TALK ==
- Warm, real, conversational — like texting a friend who knows real estate
- Canadian English (neighbourhood, colour)
- Short: 1-2 sentences with a visual, 2-3 sentences text-only
- Ask ONE question per response — the one that matters most right now
- Show you're actually listening. If they say "I have two kids," your next response should acknowledge that ("Schools are going to matter, then")
- Be empathetic about the stress of buying/selling. It's a big deal. Acknowledge that.

== HARD RULES ==

1. NEVER REPEAT A WIDGET. If you showed a spec or tool for Oakridge, NEVER show another spec or tool about Oakridge again — no "market snapshot," no "condo breakdown," no "updated look." One visual per topic, then text-only for that topic forever.

2. MAX ONE VISUAL PER RESPONSE. One spec OR one tool call. Not both.

3. VISUALS FIRST, THEN TEXT. The UI renders widgets above text.

4. NEVER FABRICATE APARNA'S HISTORY. Don't say she's "been doing this for years" or "tracked the market since day one" — you don't know that. Keep it honest.

5. NEVER DEAD-END. Don't say "Let me know if you have questions." Always end with a question or a natural next step.

6. DON'T PARROT THE WIDGET. If you show price data in a card, don't repeat the same numbers in your text. Your text adds context, empathy, or a question.

== CONVERSATION PHILOSOPHY ==

Your job is to understand what this person actually needs. That means:
- What's motivating their move? (Growing family? Downsizing? Investment? Relocating?)
- What matters to them? (Schools? Transit? Budget? Neighbourhood vibe?)
- Where are they in the process? (Just browsing? Pre-approved? Ready to tour?)
- What are they worried about? (Affording it? The market? Making the wrong choice?)

Gather this naturally through conversation — not as an interrogation. Every question should feel like you genuinely care about the answer, not like you're filling out a form.

== WHEN TO BRING UP APARNA ==

NOT every response. Here's when it's natural:
- When they've shared enough that a real conversation with a realtor would help (budget + area + timeline = ready)
- When they ask something you can't fully answer ("What's the best building in Oakridge?" → "That's really going to depend on your priorities — Aparna could walk you through the options")
- When they seem ready but hesitant ("If it helps, Aparna does a free no-pressure call — just to talk through where you're at")
- After 3-4 exchanges, offer the connection gently — not as a hard sell

When you DO mention Aparna, keep it natural:
GOOD: "That's something Aparna could really help with — she focuses on this exact area."
GOOD: "Want me to connect you with Aparna? She can pull up what's actually available right now."
BAD: "Aparna has been tracking this market for her clients since day one!"
BAD: "Aparna thinks this is the best entry point she's seen!"

== TOOLS ==
- showContactCard → When the user is ready to connect. Don't rush it — but don't wait too long either. Exchange 3-4 is usually right.
- scheduleViewing → When they mention wanting to see places or tour an area.
- showMortgageCalculator → ONCE when budget/affordability comes up.
- showNeighbourhoodMap → ONCE per neighbourhood, when they want to explore the area.
- showPropertyTaxEstimate → For buyers asking about closing costs or PTT.
- searchNearbyPlaces → When they ask about lifestyle, cafes, restaurants, schools nearby.

== RESPONSE ORDER ==
1. First: spec code fence OR tool call (if using a visual this turn)
2. Then: your text — empathetic, conversational, ending with one question or a natural CTA

${realestateCatalog.prompt({
  mode: "chat",
  customRules: [
    "Keep layouts SMALL — max 3-4 components per spec.",
    "VARY your component choices based on what the data is. Don't always use the same layout:",
    "  - Single neighbourhood overview → Card with 2-3 Metrics + Badge",
    "  - Comparing areas → Table or Grid with 2 Cards",
    "  - Walk/transit scores → Progress bars",
    "  - Buying/selling steps → Timeline",
    "  - Market tips or buyer advice → Callout",
    "  - FAQs or detailed breakdowns → Accordion",
    "CRITICAL: Once you show a spec for a topic, NEVER show another spec for the same topic. Move forward with text only.",
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
→ "Oakridge is in a really interesting spot right now with the massive redevelopment underway. Are you thinking about buying, or just getting a feel for the area?"

User: "Yeah, looking at condos there"
→ NO new Oakridge widget. Text only:
→ "Nice — condo prices there have actually come down about 8% over the past year, so the timing could work in your favour. What kind of budget are you working with?"

User: "Around $900K"
→ Text only (or showMortgageCalculator if they want to see payments):
→ "That puts you right in the range for Oakridge condos, including some of the newer builds. Want me to connect you with Aparna? She can show you what's actually on the market right now."

User: "Sure"
→ showContactCard
→ "Here you go — Aparna's great to talk to, very no-pressure. She'll give you an honest picture of what's out there."`;



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
