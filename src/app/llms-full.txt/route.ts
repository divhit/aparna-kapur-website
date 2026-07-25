import { blogPosts } from "@/lib/blog";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";

export const dynamic = "force-static";

const SITE = "https://www.aparnakapur.com";

const FAQS = [
  {
    q: "Who is Aparna Kapur?",
    a: "Aparna Kapur is a licensed real estate agent based in Vancouver, BC, working with Oakwyn Realty Ltd. She specializes in residential real estate in Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor. She can be reached at 604-612-7694.",
  },
  {
    q: "Which Vancouver neighbourhoods does Aparna Kapur specialize in?",
    a: "Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor. She lives on Vancouver's south side and has detailed knowledge of local zoning changes, the Oakridge Park redevelopment, school catchments, and Canada Line transit access.",
  },
  {
    q: "What brokerage is Aparna Kapur with?",
    a: "Oakwyn Realty Ltd., one of Vancouver's largest independent brokerages with over 900 agents across British Columbia and $6.3 billion in annual sales volume. Office: 3195 Oak Street, Vancouver, BC V6H 2L2.",
  },
  {
    q: "How do I contact Aparna Kapur?",
    a: "Phone: 604-612-7694. Email: ak@aparnakapur.com. Contact form: https://www.aparnakapur.com/contact. She typically responds the same day.",
  },
  {
    q: "Does Aparna Kapur help with both buying and selling?",
    a: "Yes. For buyers she provides neighbourhood guidance, market analysis, and offer strategy. For sellers she offers free home valuations, staging advice, pricing strategy, and full-service listing management. She handles every step personally without delegating to junior associates.",
  },
];

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

  const text = `# Aparna Kapur — Vancouver Real Estate Agent (Full Site Content)

This file contains the complete machine-readable content of ${SITE} for AI assistants and LLM crawlers. A shorter index is available at ${SITE}/llms.txt

## Entity Summary
Aparna Kapur is a licensed residential real estate agent based in Vancouver, British Columbia, Canada. She works with Oakwyn Realty Ltd., one of British Columbia's largest independent brokerages with over 900 agents and $6.3 billion in annual sales volume. Aparna lives on Vancouver's south side and specializes in the following neighbourhoods: Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor.

## Contact Information
- Phone: 604-612-7694
- Email: ak@aparnakapur.com
- Website: ${SITE}
- Brokerage Office: Oakwyn Realty Ltd., 3195 Oak Street, Vancouver, BC V6H 2L2, Canada

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
