import { blogPosts } from "@/lib/blog";
import { buyingGuideSteps, sellingGuideSteps } from "@/lib/guide-data";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { findLegalDocument, legalDocumentToMarkdown } from "@/lib/legal";
import { formatPrice } from "@/lib/market-data";
import {
  getMarketPage,
  marketPagePath as marketPagePathOf,
  propertyTypeFromSlug,
} from "@/lib/market-pages";
import {
  AGENT_ENDPOINTS,
  BRAND,
  endSentence,
  FAQS,
  BENCHMARKS_BY_TYPE,
  MARKET_SNAPSHOT,
  NEIGHBOURHOOD_COUNT,
  NEIGHBOURHOOD_DATA_VINTAGE,
  NAP,
  NAP_ONE_LINE,
  SITE_URL,
  SPECIALTY_NEIGHBOURHOODS,
  SPECIALTY_SENTENCE,
  TOP_LEVEL_SECTIONS,
  WHEN_NOT_TO_USE,
  WHEN_TO_USE,
} from "./site";
import { markdownUrlFor, normalizePathname } from "./negotiation";
import {
  findSitePage,
  getRedirect,
  getSiteSections,
  NON_NEGOTIABLE_PATHS,
  NON_NEGOTIABLE_PREFIXES,
} from "./site-map";

/**
 * Markdown representations of the site's pages, served under the
 * acceptmarkdown.com convention (`Accept: text/markdown`, or the `.md` alias of
 * any page URL). Every document is generated from the same data the HTML page
 * renders, so the two representations cannot disagree.
 */

export type MarkdownDocument = {
  /** Canonical HTML path this document represents. */
  path: string;
  title: string;
  description: string;
  /** Markdown body, without the shared header and footer. */
  body: string;
};

const CONTACT_BLOCK = [
  "## Contact",
  "",
  `- Agent: ${BRAND.name}, ${BRAND.jobTitle} (licensed in British Columbia)`,
  `- Brokerage: ${NAP.brokerage}`,
  `- Phone: ${NAP.telephone}`,
  `- Email: ${NAP.email}`,
  `- Office: ${NAP_ONE_LINE}`,
  `- Contact form: ${SITE_URL}/contact`,
].join("\n");

/** True when a path is served as HTML only (ad landing pages, MLS listings). */
export function isMarkdownExcluded(path: string): boolean {
  const normalized = normalizePathname(path);
  if (NON_NEGOTIABLE_PATHS.has(normalized)) return true;
  return NON_NEGOTIABLE_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

function link(path: string, label?: string): string {
  return `[${label ?? path}](${SITE_URL}${path})`;
}

function homeDocument(): MarkdownDocument {
  const body = [
    `${BRAND.name} is a licensed real estate agent in Vancouver, British Columbia, working with ${endSentence(NAP.brokerage)} She specializes in ${SPECIALTY_SENTENCE} — Vancouver's south side — and handles every transaction personally, from the first consultation to completion day.`,
    "",
    "## What this site can answer",
    "",
    ...WHEN_TO_USE.map(
      (use) => `- **${use.job}** — ${use.detail} Start at ${link(use.start)}.`,
    ),
    "",
    "## What this site will not do",
    "",
    ...WHEN_NOT_TO_USE.map((limit) => `- ${limit}`),
    "",
    `## ${MARKET_SNAPSHOT.label} Vancouver market snapshot`,
    "",
    "| Measure | Value | Context |",
    "| --- | --- | --- |",
    ...MARKET_SNAPSHOT.metrics.map(
      (metric) =>
        `| ${metric.label.replace(/\n/g, " ")} | ${metric.value} | ${metric.context} |`,
    ),
    "",
    `Source: ${MARKET_SNAPSHOT.source}.`,
    "",
    `### Benchmark price by property type (${MARKET_SNAPSHOT.label})`,
    "",
    "| Property type | Benchmark | Year over year | Month over month |",
    "| --- | --- | --- | --- |",
    ...BENCHMARKS_BY_TYPE.map(
      (row) => `| ${row.type} | ${row.price} | ${row.yoy} | ${row.mom} |`,
    ),
    "",
    "## Neighbourhood specialties",
    "",
    ...SPECIALTY_NEIGHBOURHOODS.map((name) => {
      const hood = Object.values(NEIGHBOURHOODS).find((n) => n.name === name);
      return hood
        ? `- ${link(`/neighborhoods/${hood.slug}`, hood.name)} — ${hood.tagline}. Benchmark ${hood.avgPrice} (${hood.priceChange}).`
        : `- ${name}`;
    }),
    "",
    `All ${NEIGHBOURHOOD_COUNT} guides: ${link("/neighborhoods")}`,
    "",
    "## Frequently asked questions",
    "",
    ...FAQS.flatMap((faq) => [`### ${faq.q}`, "", faq.a, ""]),
    CONTACT_BLOCK,
  ].join("\n");

  return {
    path: "/",
    title: `${BRAND.name} — Vancouver Real Estate Agent`,
    description: `${BRAND.jobTitle} with ${NAP.brokerage} in Vancouver, BC. Specializes in ${SPECIALTY_SENTENCE}.`,
    body,
  };
}

function neighbourhoodDocument(slug: string): MarkdownDocument | null {
  const hood = NEIGHBOURHOODS[slug];
  if (!hood) return null;

  const poiByType = new Map<string, string[]>();
  for (const poi of hood.fallbackPOIs) {
    const list = poiByType.get(poi.type) ?? [];
    list.push(poi.description ? `${poi.name} — ${poi.description}` : poi.name);
    poiByType.set(poi.type, list);
  }

  const body = [
    `${hood.tagline}. ${hood.name} is one of the ${NEIGHBOURHOOD_COUNT} Vancouver neighbourhoods covered on this site.`,
    "",
    "## Market data",
    "",
    "| Measure | Value |",
    "| --- | --- |",
    `| MLS HPI benchmark price | ${hood.avgPrice} |`,
    `| Year-over-year change | ${hood.priceChange} |`,
    `| Walk Score | ${hood.walkScore} |`,
    `| Transit Score | ${hood.transitScore} |`,
    "",
    `Benchmark prices are Greater Vancouver REALTORS MLS HPI composite figures for the neighbourhood, from the ${NEIGHBOURHOOD_DATA_VINTAGE} release. They are not an appraisal of any single property. For a valuation of a specific home, request a comparative market analysis at ${link("/selling/home-valuation")}.`,
    "",
    "## Highlights",
    "",
    ...hood.highlights.map((highlight) => `- ${highlight}`),
    "",
    ...(poiByType.size
      ? [
          "## Points of interest",
          "",
          ...[...poiByType.entries()].flatMap(([type, entries]) => [
            `### ${type.charAt(0).toUpperCase()}${type.slice(1)}`,
            "",
            ...entries.map((entry) => `- ${entry}`),
            "",
          ]),
        ]
      : []),
    "## Location",
    "",
    `- Centre: ${hood.center.lat}, ${hood.center.lng}`,
    ...(hood.bounds
      ? [
          `- Bounds: north ${hood.bounds.north}, south ${hood.bounds.south}, east ${hood.bounds.east}, west ${hood.bounds.west}`,
        ]
      : []),
    "",
    "## Related",
    "",
    `- All neighbourhood guides: ${link("/neighborhoods")}`,
    `- Vancouver market reports: ${link("/resources/market-reports")}`,
    `- Buyer's guide: ${link("/buying/guide")}`,
    "",
    CONTACT_BLOCK,
  ].join("\n");

  return {
    path: `/neighborhoods/${hood.slug}`,
    title: `${hood.name}, Vancouver — Real Estate Guide`,
    description: `${hood.tagline}. Benchmark ${hood.avgPrice} (${hood.priceChange}), Walk Score ${hood.walkScore}, Transit Score ${hood.transitScore}.`,
    body,
  };
}

function neighbourhoodIndexDocument(): MarkdownDocument {
  const hoods = Object.values(NEIGHBOURHOODS);
  const body = [
    `Detailed real estate guides for ${hoods.length} Vancouver neighbourhoods. Benchmark prices are Greater Vancouver REALTORS MLS HPI composite figures from the ${NEIGHBOURHOOD_DATA_VINTAGE} release; region-wide figures on the homepage are from ${MARKET_SNAPSHOT.label}.`,
    "",
    "| Neighbourhood | Benchmark | Year over year | Walk | Transit | Guide |",
    "| --- | --- | --- | --- | --- | --- |",
    ...hoods.map(
      (hood) =>
        `| ${hood.name} | ${hood.avgPrice} | ${hood.priceChange} | ${hood.walkScore} | ${hood.transitScore} | ${SITE_URL}/neighborhoods/${hood.slug} |`,
    ),
    "",
    CONTACT_BLOCK,
  ].join("\n");

  return {
    path: "/neighborhoods",
    title: "Vancouver Neighbourhood Guides",
    description: `Benchmark prices, Walk Scores, and Transit Scores for ${hoods.length} Vancouver neighbourhoods.`,
    body,
  };
}

function blogPostDocument(slug: string): MarkdownDocument | null {
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) return null;

  const body = [
    `- Published: ${post.datePublished}`,
    `- Last updated: ${post.dateModified}`,
    `- Category: ${post.category}`,
    `- Reading time: ${post.readTime}`,
    `- Author: ${BRAND.name}, ${BRAND.jobTitle}, ${NAP.brokerage}`,
    "",
    post.content.trim(),
    "",
    "---",
    "",
    CONTACT_BLOCK,
  ].join("\n");

  return {
    path: `/resources/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    body,
  };
}

function blogIndexDocument(): MarkdownDocument {
  const posts = [...blogPosts].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
  const body = [
    `${posts.length} articles on the Vancouver market, written by ${BRAND.name}. Full text of every article is also available in one file at ${SITE_URL}/llms-full.txt`,
    "",
    ...posts.flatMap((post) => [
      `## ${post.title}`,
      "",
      `- URL: ${SITE_URL}/resources/blog/${post.slug}`,
      `- Markdown: ${SITE_URL}${markdownUrlFor(`/resources/blog/${post.slug}`)}`,
      `- Published: ${post.datePublished} (updated ${post.dateModified})`,
      `- Category: ${post.category}`,
      "",
      post.excerpt,
      "",
    ]),
    CONTACT_BLOCK,
  ].join("\n");

  return {
    path: "/resources/blog",
    title: "Vancouver Real Estate Blog",
    description: "Market analysis and neighbourhood reporting for Vancouver.",
    body,
  };
}

function guideStepDocument(
  kind: "buying" | "selling",
  slug: string,
): MarkdownDocument | null {
  const steps = kind === "buying" ? buyingGuideSteps : sellingGuideSteps;
  const step = steps.find((entry) => entry.slug === slug);
  if (!step) return null;

  const position = steps.indexOf(step);
  const previous = steps[position - 1];
  const next = steps[position + 1];

  const body = [
    `Step ${step.step} of ${steps.length} in the ${kind === "buying" ? "buyer's" : "seller's"} guide. ${step.description}`,
    "",
    ...step.content.map((block) => `${block.trim()}\n`),
    `## From Aparna`,
    "",
    step.insight,
    "",
    "## Guide navigation",
    "",
    ...(previous
      ? [`- Previous: ${link(`/${kind}/guide/${previous.slug}`, `Step ${previous.step}: ${previous.title}`)}`]
      : []),
    ...(next
      ? [`- Next: ${link(`/${kind}/guide/${next.slug}`, `Step ${next.step}: ${next.title}`)}`]
      : []),
    `- All steps: ${link(`/${kind}/guide`)}`,
    "",
    CONTACT_BLOCK,
  ].join("\n");

  return {
    path: `/${kind}/guide/${step.slug}`,
    title: `${step.title} — ${kind === "buying" ? "Buyer's" : "Seller's"} Guide Step ${step.step}`,
    description: step.description,
    body,
  };
}

function marketDocument(path: string): MarkdownDocument | null {
  const match = path.match(/^\/market\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  const type = propertyTypeFromSlug(match[2]);
  const page = type ? getMarketPage(match[1], type) : null;
  if (!page) return null;

  const body = [
    page.summary,
    "",
    "## Benchmark",
    "",
    "| Benchmark | Price | 1 year | 1 month |",
    "| --- | --- | --- | --- |",
    `| ${page.areaName} ${page.typeMeta.plural.toLowerCase()} | ${formatPrice(page.benchmark.price)} | ${page.benchmark.yoy}% | ${page.benchmark.mom}% |`,
    `| Metro Vancouver ${page.typeMeta.proseLabel} | ${formatPrice(page.region.price)} | ${page.region.yoy}% | ${page.region.mom}% |`,
    "",
    `Source: ${page.source}. GVR sub-area "${page.subArea}".`,
    `Rank: ${page.rank} of ${page.rankOf} Vancouver neighbourhoods with a published ${page.typeMeta.proseLabel} benchmark.`,
    "",
    ...(page.comparables.length
      ? [
          "## Neighbourhoods at a similar price",
          "",
          ...page.comparables.map(
            (c) =>
              `- ${link(marketPagePathOf(c.slug, page.type), `${c.name} ${page.typeMeta.plural.toLowerCase()}`)} — ${formatPrice(c.price)} (${c.vs > 0 ? "+" : ""}${c.vs}% vs ${page.areaName})`,
          ),
          "",
        ]
      : []),
    ...(page.siblings.length
      ? [
          `## Other property types in ${page.areaName}`,
          "",
          ...page.siblings.map(
            (s) => `- ${link(s.slug, `${page.areaName} ${s.plural.toLowerCase()}`)} — ${formatPrice(s.price)}`,
          ),
          "",
        ]
      : []),
    "## Questions people ask",
    "",
    ...page.faqs.flatMap((faq) => [`### ${faq.q}`, "", faq.a, ""]),
    `Full neighbourhood guide: ${link(`/neighborhoods/${page.areaSlug}`)}`,
    "",
    CONTACT_BLOCK,
  ].join("\n");

  return { path: page.path, title: page.title, description: page.description, body };
}

function legalDocument(path: string): MarkdownDocument | null {
  const doc = findLegalDocument(path);
  if (!doc) return null;
  return {
    path: doc.path,
    title: doc.title,
    description: doc.summary,
    body: [legalDocumentToMarkdown(doc), "", "---", "", CONTACT_BLOCK].join("\n"),
  };
}

/** Fallback for catalogued pages that have no richer generated representation. */
function summaryDocument(path: string): MarkdownDocument | null {
  const page = findSitePage(path);
  if (!page) return null;

  const section = getSiteSections().find((candidate) =>
    candidate.pages.some((candidatePage) => candidatePage.path === path),
  );
  const siblings = (section?.pages ?? [])
    .filter((sibling) => sibling.path !== path)
    .slice(0, 12);

  const body = [
    page.summary,
    "",
    `The full content of this page is rendered as HTML at ${SITE_URL}${path}. This markdown representation carries the summary, the section index, and contact details; for the complete text of every page in one file see ${SITE_URL}/llms-full.txt`,
    "",
    ...(siblings.length
      ? [
          `## More in ${section?.title}`,
          "",
          ...siblings.map((sibling) => `- ${link(sibling.path, sibling.title)} — ${sibling.summary}`),
          "",
        ]
      : []),
    CONTACT_BLOCK,
  ].join("\n");

  return { path, title: page.title, description: page.summary, body };
}

/** The markdown document for a canonical page path, or null when there is none. */
export function getMarkdownDocument(pathname: string): MarkdownDocument | null {
  const path = normalizePathname(pathname);
  if (isMarkdownExcluded(path)) return null;
  // A path whose HTML redirects has no document of its own; the markdown route
  // issues the matching redirect instead.
  if (getRedirect(path)) return null;

  if (path === "/") return homeDocument();
  if (path === "/neighborhoods") return neighbourhoodIndexDocument();
  if (path === "/resources/blog") return blogIndexDocument();

  const neighbourhood = path.match(/^\/neighborhoods\/([^/]+)$/);
  if (neighbourhood) return neighbourhoodDocument(neighbourhood[1]);

  const post = path.match(/^\/resources\/blog\/([^/]+)$/);
  if (post) return blogPostDocument(post[1]);

  const market = marketDocument(path);
  if (market) return market;

  const legal = legalDocument(path);
  if (legal) return legal;

  const guideStep = path.match(/^\/(buying|selling)\/guide\/([^/]+)$/);
  if (guideStep) {
    return guideStepDocument(guideStep[1] as "buying" | "selling", guideStep[2]);
  }

  return summaryDocument(path);
}

/** Wrap a document in the shared header and footer and render it to text. */
export function renderMarkdownDocument(doc: MarkdownDocument): string {
  return [
    `# ${doc.title}`,
    "",
    `> ${doc.description}`,
    "",
    `Canonical HTML: ${SITE_URL}${doc.path === "/" ? "/" : doc.path}  `,
    `Markdown: ${SITE_URL}${markdownUrlFor(doc.path)}  `,
    `Publisher: ${BRAND.name}, ${NAP.brokerage}, Vancouver, BC · ${NAP.telephone}`,
    "",
    "---",
    "",
    doc.body.trim(),
    "",
    "---",
    "",
    "## Machine-readable index",
    "",
    ...AGENT_ENDPOINTS.map((endpoint) => `- ${SITE_URL}${endpoint.path} — ${endpoint.description}`),
    "",
  ].join("\n");
}

/** The body served with a 404, in markdown, so an agent can recover in one hop. */
export function renderNotFoundMarkdown(requestedPath: string): string {
  const path = normalizePathname(requestedPath);
  return [
    "# 404 — Page not found",
    "",
    `> \`${path}\` does not exist on ${SITE_URL}. Nothing was moved; this path has never been published.`,
    "",
    "## Where to look next",
    "",
    ...TOP_LEVEL_SECTIONS.map(
      (section) => `- ${link(section.path, section.name)} — ${section.description}`,
    ),
    "",
    "## Machine-readable index",
    "",
    ...AGENT_ENDPOINTS.map((endpoint) => `- ${SITE_URL}${endpoint.path} — ${endpoint.description}`),
    "",
    "## Ask a person",
    "",
    `- ${BRAND.name}, ${BRAND.jobTitle}, ${NAP.brokerage}`,
    `- Phone: ${NAP.telephone}`,
    `- Email: ${NAP.email}`,
    `- Contact form: ${SITE_URL}/contact`,
    "",
  ].join("\n");
}
