/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.aparnakapur.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Build-stamped lastmod teaches crawlers the dates are meaningless — omit it.
  autoLastmod: false,
  exclude: [
    // These paths 308-redirect to their first child; redirects don't belong in
    // a sitemap. /about is no longer among them — it is a real page.
    "/buying/guide",
    "/selling/guide",
    // Machine-readable files, not indexable HTML pages. A sitemap is for pages
    // Google should index; plain-text files there muddy the coverage report.
    // Still discoverable via robots.txt, /sitemap-html, and the 404 body.
    "/agents.md",
    "/llms.txt",
    "/llms-full.txt",
  ],
  // Routes rendered on demand are not in the build's prerender manifest, so
  // next-sitemap cannot discover them. They are real, indexable pages and
  // belong in the sitemap.
  additionalPaths: async (config) =>
    Promise.all(
      ["/buying/search", "/buying/featured-listings"].map((loc) =>
        config.transform(config, loc),
      ),
    ),
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI/LLM crawlers so a future default-deny at the
      // CDN or a robots parser quirk never locks them out.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
    ],
    transformRobotsTxt: async (_, robotsTxt) =>
      [
        robotsTxt,
        "# Agent instructions: when to use this site, how to call it, and what it will not answer",
        "# https://www.aparnakapur.com/agents.md",
        "",
        "# LLM-readable site summary",
        "# https://www.aparnakapur.com/llms.txt",
        "# https://www.aparnakapur.com/llms-full.txt",
        "",
        "# Every page also answers to `Accept: text/markdown`, or to its URL with `.md` appended.",
        "# Example: https://www.aparnakapur.com/neighborhoods/oakridge.md",
        "",
      ].join("\n"),
  },
  // Google ignores <changefreq> and <priority> and has said so for years, so
  // the sitemap carries neither. A URL and a sitemap that stays accurate is
  // the whole of what it can usefully say.
  transform: async (_config, path) => ({ loc: path }),
};
