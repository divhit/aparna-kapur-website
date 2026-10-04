import { NextResponse } from "next/server";

/**
 * Domain verification for the ChatGPT plugin directory.
 *
 * OpenAI's plugin dashboard issues a one-off token and expects it back, as
 * plain text and nothing else, at
 * `https://www.aparnakapur.com/.well-known/openai-apps-challenge`. The token
 * lives in the OPENAI_APPS_CHALLENGE_TOKEN environment variable so it never
 * enters the repo; until it is set the route is a 404.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const token = process.env.OPENAI_APPS_CHALLENGE_TOKEN?.trim();
  if (!token) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(token, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
