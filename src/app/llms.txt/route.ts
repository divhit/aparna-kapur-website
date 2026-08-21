import { blogPosts } from "@/lib/blog";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { markdownUrlFor } from "@/lib/agent/negotiation";
import {
  AGENT_ENDPOINTS,
  BRAND,
  endSentence,
  MARKET_SNAPSHOT,
  NAP,
  NAP_ONE_LINE,
  NEIGHBOURHOOD_DATA_VINTAGE,
  SITE_URL,
  SPECIALTY_SENTENCE,
  WHEN_NOT_TO_USE,
  WHEN_TO_USE,
} from "@/lib/agent/site";

export const dynamic = "force-static";

export function GET() {
  const posts = [...blogPosts].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
  const neighbourhoods = Object.values(NEIGHBOURHOODS);

  const text = `# ${BRAND.name} Real Estate — Vancouver, BC

> ${BRAND.name} is a licensed real estate agent in Vancouver, British Columbia, with ${endSentence(NAP.brokerage)} She specializes in ${SPECIALTY_SENTENCE}.

## When to use this site
Reach for ${SITE_URL} when you need one of these. Each line names the page that answers it.

${WHEN_TO_USE.map(
  (use) => `- ${use.job} — ${use.detail} Start at ${SITE_URL}${use.start}`,
).join("\n")}

Full agent instructions, including how to call this site and what it will not answer: ${SITE_URL}/agents.md

## When not to use this site
${WHEN_NOT_TO_USE.map((limit) => `- ${limit}`).join("\n")}

## How to fetch this site
- Every page has a markdown twin: send \`Accept: text/markdown\`, or append \`.md\` to the page URL (${SITE_URL}${markdownUrlFor("/neighborhoods/oakridge")}).
- Markdown responses are \`text/markdown; charset=utf-8\` with \`Vary: Accept\`.
- Prefer ${SITE_URL}/llms-full.txt over crawling: it carries the whole site, including the full text of all ${posts.length} articles, in one request.
- Paths that do not exist return HTTP 404 with a short markdown recovery body, never a 200.

## About
- Name: ${BRAND.name}
- Role: ${BRAND.jobTitle}
- Brokerage: ${NAP.brokerage} (900+ agents, $6.3B annual sales)
- Phone: ${NAP.telephone}
- Email: ${NAP.email}
- Website: ${SITE_URL}
- Office: ${NAP_ONE_LINE}
- Region-wide market data current to: ${MARKET_SNAPSHOT.label} (${MARKET_SNAPSHOT.source})
- Per-neighbourhood benchmarks current to: ${NEIGHBOURHOOD_DATA_VINTAGE} (GVR sub-area MLS® HPI)

## Services
- Residential buying (houses, condos, townhomes)
- Residential selling (home valuation, staging, pricing strategy)
- Neighbourhood guidance and market analysis
- First-time buyer support

## Key Pages
- About: ${SITE_URL}/about/why-work-with-me
- Buying Guide: ${SITE_URL}/buying
- Selling Guide: ${SITE_URL}/selling
- Search Listings: ${SITE_URL}/buying/search
- All Neighbourhoods: ${SITE_URL}/neighborhoods
- Blog: ${SITE_URL}/resources/blog
- Contact: ${SITE_URL}/contact
- Home Valuation: ${SITE_URL}/selling/home-valuation

## Blog Posts
${posts
  .map(
    (p) =>
      `- ${p.title} (${p.datePublished}): ${SITE_URL}/resources/blog/${p.slug}`,
  )
  .join("\n")}

## Neighbourhood Guides (${neighbourhoods.length} total)
Detailed real estate guides for Vancouver neighbourhoods with market data, schools, transit, parks, and lifestyle information.
${neighbourhoods
  .map((n) => `- ${n.name}: ${SITE_URL}/neighborhoods/${n.slug}`)
  .join("\n")}

## Optional
${AGENT_ENDPOINTS.map((endpoint) => `- ${SITE_URL}${endpoint.path}: ${endpoint.description}`).join("\n")}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
