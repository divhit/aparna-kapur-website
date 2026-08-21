import { blogPosts } from "@/lib/blog";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import {
  BRAND,
  FAQS,
  MARKET_SNAPSHOT,
  NAP,
  NAP_ONE_LINE,
  SITE_URL,
  SPECIALTY_SENTENCE,
  WHEN_NOT_TO_USE,
  WHEN_TO_USE,
} from "@/lib/agent/site";

export const dynamic = "force-static";

const SITE = SITE_URL;

export function GET() {
  const posts = [...blogPosts].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
  const neighbourhoods = Object.values(NEIGHBOURHOODS);

  const neighbourhoodSection = neighbourhoods
    .map((n) => {
      const lines = [
        `### ${n.name}`,
        `- Guide: ${SITE}/neighborhoods/${n.slug}`,
        `- Tagline: ${n.tagline}`,
        `- Benchmark price (MLS HPI composite): ${n.avgPrice} (${n.priceChange})`,
        `- Walk Score: ${n.walkScore} / Transit Score: ${n.transitScore}`,
        `- Highlights: ${n.highlights.join("; ")}`,
      ];
      return lines.join("\n");
    })
    .join("\n\n");

  const blogSection = posts
    .map((p) =>
      [
        `### ${p.title}`,
        `- URL: ${SITE}/resources/blog/${p.slug}`,
        `- Published: ${p.datePublished} (last updated ${p.dateModified})`,
        `- Category: ${p.category}`,
        "",
        p.content.trim(),
      ].join("\n"),
    )
    .join("\n\n---\n\n");

  const text = `# ${BRAND.name} — Vancouver Real Estate Agent (Full Site Content)

This file contains the complete machine-readable content of ${SITE} for AI assistants and LLM crawlers. A shorter index is available at ${SITE}/llms.txt, and agent instructions — when to use this site, how to call it, and what it will not answer — at ${SITE}/agents.md

Market data below is current to the ${MARKET_SNAPSHOT.label} release (${MARKET_SNAPSHOT.source}).

## When To Use This Site
${WHEN_TO_USE.map((use) => `- ${use.job} — ${use.detail} Start at ${SITE}${use.start}`).join("\n")}

## When Not To Use This Site
${WHEN_NOT_TO_USE.map((limit) => `- ${limit}`).join("\n")}

## How To Fetch This Site
- Every page has a markdown twin: send \`Accept: text/markdown\`, or append \`.md\` to the page URL.
- Markdown responses are \`text/markdown; charset=utf-8\` with \`Vary: Accept\`.
- Paths that do not exist return HTTP 404 with a short markdown recovery body, never a 200.
- This file is the bulk read; prefer it over crawling page by page.

## Entity Summary
${BRAND.name} is a licensed residential real estate agent based in Vancouver, British Columbia, Canada. She works with ${NAP.brokerage}, one of British Columbia's largest independent brokerages with over 900 agents and $6.3 billion in annual sales volume. Aparna lives on Vancouver's south side and specializes in the following neighbourhoods: ${SPECIALTY_SENTENCE}.

## Contact Information
- Phone: ${NAP.telephone}
- Email: ${NAP.email}
- Website: ${SITE}
- Brokerage Office: ${NAP_ONE_LINE}

## Specializations
- The Oakridge Park redevelopment (a $6 billion mixed-use development that opened May 28, 2026)
- Cambie Corridor rezoning and its impact on property values
- R1-1 zoning changes across Vancouver
- Canada Line transit corridor property trends
- School catchment boundaries and their effect on home values
- Local development timelines and rezoning applications

## Services
### For Buyers
Neighbourhood guidance, market analysis, offer strategy, and representation from first consultation through closing. Aparna works directly with every client without delegating to junior associates. The website includes a 6-step buyer's guide (${SITE}/buying/guide), active MLS listings search (${SITE}/buying/search), and a mortgage calculator (${SITE}/resources/mortgage-calculator).

### For Sellers
Free home valuations (Comparative Market Analysis), staging advice, pricing strategy based on comparable sales data, and full-service listing management. The website includes a 6-step seller's guide (${SITE}/selling/guide) and staging tips (${SITE}/selling/staging-tips).

## Frequently Asked Questions
${FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

## Vancouver Neighbourhood Guides (${neighbourhoods.length})
Market data below is drawn from Greater Vancouver REALTORS MLS HPI benchmarks and updated with the site.

${neighbourhoodSection}

## Blog Articles (${posts.length}, full text)

${blogSection}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
