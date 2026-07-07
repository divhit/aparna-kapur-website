import { blogPosts } from "@/lib/blog";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";

export const dynamic = "force-static";

const SITE = "https://www.aparnakapur.com";

export function GET() {
  const posts = [...blogPosts].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
  const neighbourhoods = Object.values(NEIGHBOURHOODS);

  const text = `# Aparna Kapur Real Estate — Vancouver, BC

> Aparna Kapur is a licensed real estate agent in Vancouver, British Columbia, with Oakwyn Realty Ltd. She specializes in Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor.

## About
- Name: Aparna Kapur
- Role: Real Estate Agent
- Brokerage: Oakwyn Realty Ltd. (900+ agents, $6.3B annual sales)
- Phone: 604-612-7694
- Email: ak@aparnakapur.com
- Website: ${SITE}
- Office: 3195 Oak Street, Vancouver, BC V6H 2L2

## Services
- Residential buying (houses, condos, townhomes)
- Residential selling (home valuation, staging, pricing strategy)
- Neighbourhood guidance and market analysis
- First-time buyer support

## Key Pages
- About: ${SITE}/about/why-work-with-me
- Buying Guide: ${SITE}/buying
- Selling Guide: ${SITE}/selling
- Search Listings: ${SITE}/buying/search
- All Neighbourhoods: ${SITE}/neighborhoods
- Blog: ${SITE}/resources/blog
- Contact: ${SITE}/contact
- Home Valuation: ${SITE}/selling/home-valuation

## Blog Posts
${posts
  .map(
    (p) =>
      `- ${p.title} (${p.datePublished}): ${SITE}/resources/blog/${p.slug}`,
  )
  .join("\n")}

## Neighbourhood Guides (${neighbourhoods.length} total)
Detailed real estate guides for Vancouver neighbourhoods with market data, schools, transit, parks, and lifestyle information.
${neighbourhoods
  .map((n) => `- ${n.name}: ${SITE}/neighborhoods/${n.slug}`)
  .join("\n")}

## Full Content
A complete, machine-readable version of this site's content is available at ${SITE}/llms-full.txt
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
