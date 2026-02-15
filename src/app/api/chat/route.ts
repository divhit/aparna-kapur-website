import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Aparna Kapur's virtual assistant on her real estate website. You help visitors with questions about:

- Vancouver real estate (buying, selling, pricing, market trends)
- Neighborhoods: Oakridge (especially the Oakridge Park redevelopment with 3,300+ new homes), Marpole, South Cambie, Riley Park, Kerrisdale, Cambie Corridor
- The home buying and selling process in BC
- First-time buyer programs in BC (BC Home Owner Mortgage & Equity Partnership, First-Time Home Buyer Incentive, BC Home Flipping Tax exemptions)
- Property Transfer Tax in BC (1% on first $200K, 2% on $200K-$2M, 3% above $2M; first-time buyer exemption up to $835K)
- Mortgage pre-approval, inspections, strata documents, subject removal
- Oakwyn Realty (Aparna's brokerage - Vancouver's fastest-growing independent brokerage)

Key facts about Aparna:
- Licensed realtor with Oakwyn Realty Ltd. in Vancouver, BC
- Specializes in Oakridge and surrounding Vancouver neighborhoods
- Email: aparna@aparnakapur.com
- Website: aparnakapur.com

Guidelines:
- Be warm, helpful, and professional
- Keep answers concise (2-4 sentences) unless the user asks for detail
- When appropriate, suggest they contact Aparna directly for personalized advice
- For specific pricing or listing questions, recommend reaching out to Aparna since market data changes frequently
- Never make up specific prices, listings, or availability data
- If asked something outside real estate, politely redirect to how you can help with their real estate needs
- Use Canadian English spelling (e.g., neighbourhood, colour)`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "I'm currently offline for maintenance. Please contact Aparna directly at aparna@aparnakapur.com for assistance.",
      },
      { status: 200 }
    );
  }

  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "System instructions: " + SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Understood. I'm ready to assist visitors as Aparna Kapur's virtual real estate assistant.",
            },
          ],
        },
        ...(history || []).map(
          (msg: { role: string; content: string }) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })
        ),
      ],
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "I'm having trouble right now. Please try again, or contact Aparna directly at aparna@aparnakapur.com.",
      },
      { status: 200 }
    );
  }
}
