import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const maxDuration = 30;

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
- When a user asks about a neighbourhood → call showNeighbourhoodCard with relevant data, then add a brief text explanation
- When discussing affordability or mortgages → call showMortgageCalculator
- When discussing PTT or closing costs → call showPropertyTaxEstimate with the price
- When the user wants to contact Aparna or asks how to reach her → call showContactCard
- When discussing market conditions for a specific area → call showMarketSnapshot
- When asking about the buying or selling process → call showBuyerSellerGuide
- When wanting to book a viewing, tour, or meeting → call scheduleViewing
- When the user wants to see a neighbourhood on a map or asks "where is" a neighbourhood → call showNeighbourhoodMap

You can combine text with tool calls. For example, give a brief explanation then show a relevant interactive card.

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
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: {
      showNeighbourhoodCard: tool({
        description:
          "Show a rich neighbourhood info card. Use when user asks about a specific Vancouver neighbourhood.",
        inputSchema: z.object({
          name: z.string().describe("Neighbourhood name"),
          slug: z.string().describe("URL slug for the neighbourhood page"),
          avgPrice: z.string().describe("Average property price, e.g. '$1.6M'"),
          priceChange: z
            .string()
            .describe("Year-over-year price change, e.g. '+8.2% YoY'"),
          walkScore: z.number().describe("Walk score out of 100"),
          transitScore: z.number().describe("Transit score out of 100"),
          highlights: z
            .array(z.string())
            .describe("3-4 key neighbourhood highlights"),
        }),
        execute: async (input) => ({ shown: true, neighbourhood: input.name }),
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
        execute: async (input) => ({ shown: true, price: input.purchasePrice }),
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
        execute: async (input) => ({ shown: true, neighbourhood: input.neighbourhood }),
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
        execute: async (input) => ({ shown: true, neighbourhood: input.neighbourhood }),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
