import { blogPosts } from "@/lib/blog";
import { buyingGuideSteps, sellingGuideSteps } from "@/lib/guide-data";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { NEIGHBOURHOOD_COUNT } from "./site";
export {
  NON_NEGOTIABLE_PATHS,
  NON_NEGOTIABLE_PREFIXES,
} from "./negotiation";

/**
 * The catalogue of pages this site publishes for humans, crawlers, and agents.
 *
 * Derived from the same data that renders the pages, so a new neighbourhood,
 * blog post, or guide step shows up in the HTML sitemap, the markdown
 * representations, and the 404 recovery body without anyone remembering to
 * update a list. Ad landing pages (`/lp/*`), the open-house form, and
 * individual MLS listings are deliberately absent: they are `noindex`, or
 * their content is licensed listing data rather than site content.
 */

export type SitePage = {
  /** Canonical path, no trailing slash. */
  path: string;
  title: string;
  summary: string;
  /**
   * Set when the HTML page at `path` redirects instead of rendering. The
   * markdown representation follows the same redirect, so both representations
   * of a URL always resolve to the same content.
   */
  redirectsTo?: string;
};

export type SiteSection = {
  title: string;
  summary: string;
  pages: SitePage[];
};

/** Paths whose HTML redirects to a first child page. */
export function getRedirect(path: string): string | undefined {
  return findSitePage(path)?.redirectsTo;
}

const MAIN_PAGES: SitePage[] = [
  {
    path: "/",
    title: "Aparna Kapur — Vancouver Real Estate",
    summary:
      "Licensed Vancouver real estate agent with Oakwyn Realty, specializing in Oakridge and Vancouver's south side.",
  },
  {
    path: "/contact",
    title: "Contact Aparna Kapur",
    summary:
      "Phone, email, and message form. Direct line to a licensed BC agent, usually answered the same day.",
  },
  {
    path: "/sitemap-html",
    title: "Sitemap",
    summary: "Every page on aparnakapur.com, grouped by section.",
  },
];

const ABOUT_PAGES: SitePage[] = [
  {
    path: "/about",
    title: "About Aparna",
    summary: "Entry point for the about section.",
    redirectsTo: "/about/why-work-with-me",
  },
  {
    path: "/about/why-work-with-me",
    title: "Why Work With Me",
    summary:
      "How Aparna works: one agent on every file, no junior associates, and street-level knowledge of Vancouver's south side.",
  },
  {
    path: "/about/oakwyn-realty",
    title: "Oakwyn Realty",
    summary:
      "The brokerage behind the practice — 900+ agents across British Columbia and $6.3B in annual sales volume.",
  },
];

const BUYING_PAGES: SitePage[] = [
  {
    path: "/buying",
    title: "Buying a Home in Vancouver",
    summary:
      "Overview of the buying process, from pre-approval through completion, with links to every step.",
  },
  {
    path: "/buying/guide",
    title: "Buyer's Guide (6 steps)",
    summary:
      "The full six-step buyer's guide, written for the British Columbia purchase process.",
    redirectsTo: `/buying/guide/${buyingGuideSteps[0].slug}`,
  },
  {
    path: "/buying/search",
    title: "Search Vancouver MLS Listings",
    summary:
      "Live MLS listing search across every Vancouver neighbourhood, filterable by price, type, beds, baths, and address.",
  },
  {
    path: "/buying/featured-listings",
    title: "Featured Listings",
    summary:
      "Curated listings on Vancouver's south and west side with the most negotiation potential.",
  },
  {
    path: "/buying/opportunities",
    title: "Below-Market Opportunities",
    summary:
      "Court-ordered sales, estate sales, and motivated-seller listings priced below assessed value.",
  },
];

const SELLING_PAGES: SitePage[] = [
  {
    path: "/selling",
    title: "Selling a Home in Vancouver",
    summary:
      "Overview of the selling process — pricing, preparation, marketing, negotiation, and completion.",
  },
  {
    path: "/selling/guide",
    title: "Seller's Guide (6 steps)",
    summary: "The full six-step seller's guide for a British Columbia sale.",
    redirectsTo: `/selling/guide/${sellingGuideSteps[0].slug}`,
  },
  {
    path: "/selling/home-valuation",
    title: "Free Home Valuation",
    summary:
      "Request a free, no-obligation comparative market analysis of a Vancouver property.",
  },
  {
    path: "/selling/staging-tips",
    title: "Home Staging Tips",
    summary:
      "What actually moves the needle when preparing a Vancouver home for market.",
  },
];

const RESOURCE_PAGES: SitePage[] = [
  {
    path: "/resources",
    title: "Resources",
    summary:
      "Index of free tools and guides for Vancouver buyers and sellers.",
  },
  {
    path: "/resources/market-reports",
    title: "Vancouver Market Reports",
    summary:
      "Monthly Greater Vancouver REALTORS MLS HPI benchmark prices, inventory, and sales-to-active ratios by area and property type.",
  },
  {
    path: "/resources/mortgage-calculator",
    title: "Mortgage Calculator",
    summary:
      "Estimate monthly payments from price, down payment, rate, and amortization.",
  },
  {
    path: "/resources/first-time-buyers-bc",
    title: "First-Time Buyer Programs in BC",
    summary:
      "FHSA, the Home Buyers' Plan, Property Transfer Tax exemptions, and the other programs a first purchase in BC can use.",
  },
  {
    path: "/resources/property-transfer-tax",
    title: "BC Property Transfer Tax Guide",
    summary:
      "How PTT is calculated, plus first-time buyer, newly built home, and additional (foreign buyer) tax rules.",
  },
  {
    path: "/resources/moving-to-vancouver",
    title: "Moving to Vancouver",
    summary:
      "Relocation guide covering neighbourhoods, cost of living, transit, schools, and weather.",
  },
  {
    path: "/resources/real-estate-plan",
    title: "Real Estate Plan",
    summary:
      "Connecting a purchase or sale to the long-term financial picture: portfolio health, senior transitions, and estate planning.",
  },
  {
    path: "/resources/blog",
    title: "Blog",
    summary: "Vancouver market analysis and neighbourhood reporting.",
  },
];

function neighbourhoodPages(): SitePage[] {
  return [
    {
      path: "/neighborhoods",
      title: "All Vancouver Neighbourhoods",
      summary: `Index of ${NEIGHBOURHOOD_COUNT} Vancouver neighbourhood guides with benchmark prices and transit scores.`,
    },
    ...Object.values(NEIGHBOURHOODS).map((hood) => ({
      path: `/neighborhoods/${hood.slug}`,
      title: hood.name,
      summary: `${hood.tagline}. Benchmark ${hood.avgPrice} (${hood.priceChange}), Walk Score ${hood.walkScore}, Transit Score ${hood.transitScore}.`,
    })),
  ];
}

function guidePages(): { buying: SitePage[]; selling: SitePage[] } {
  return {
    buying: buyingGuideSteps.map((step) => ({
      path: `/buying/guide/${step.slug}`,
      title: `Step ${step.step}: ${step.title}`,
      summary: step.description,
    })),
    selling: sellingGuideSteps.map((step) => ({
      path: `/selling/guide/${step.slug}`,
      title: `Step ${step.step}: ${step.title}`,
      summary: step.description,
    })),
  };
}

function blogPages(): SitePage[] {
  return [...blogPosts]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .map((post) => ({
      path: `/resources/blog/${post.slug}`,
      title: post.title,
      summary: post.excerpt,
    }));
}

export function getSiteSections(): SiteSection[] {
  const guides = guidePages();
  return [
    {
      title: "Main",
      summary: "Start here.",
      pages: MAIN_PAGES,
    },
    {
      title: "Neighbourhood Guides",
      summary:
        "Market data, schools, transit, parks, and development context for each Vancouver neighbourhood.",
      pages: neighbourhoodPages(),
    },
    {
      title: "Buying",
      summary: "The British Columbia purchase process, end to end.",
      pages: [...BUYING_PAGES, ...guides.buying],
    },
    {
      title: "Selling",
      summary: "Pricing, preparation, marketing, and closing a Vancouver sale.",
      pages: [...SELLING_PAGES, ...guides.selling],
    },
    {
      title: "Resources",
      summary: "Calculators, tax guides, and monthly market data.",
      pages: RESOURCE_PAGES,
    },
    {
      title: "Blog",
      summary: "Long-form Vancouver market and neighbourhood reporting.",
      pages: blogPages(),
    },
    {
      title: "About",
      summary: "The agent and the brokerage.",
      pages: ABOUT_PAGES,
    },
  ];
}

let flattened: Map<string, SitePage> | null = null;

function index(): Map<string, SitePage> {
  if (!flattened) {
    flattened = new Map();
    for (const section of getSiteSections()) {
      for (const page of section.pages) flattened.set(page.path, page);
    }
  }
  return flattened;
}

export function getSitePages(): SitePage[] {
  return [...index().values()];
}

export function findSitePage(path: string): SitePage | undefined {
  return index().get(path);
}
