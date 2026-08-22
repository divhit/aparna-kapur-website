/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.aparnakapur.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  // Build-stamped lastmod teaches crawlers the dates are meaningless — omit it.
  autoLastmod: false,
  exclude: [
    // These paths 307-redirect to their first child page; redirects don't belong in a sitemap.
    "/about",
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
  transform: async (config, path) => {
    // Higher priority for key pages
    const highPriority = [
      "/",
      "/neighborhoods/oakridge",
      "/buying",
      "/selling",
      "/contact",
    ];
    const mediumPriority = [
      "/neighborhoods",
      "/about",
      "/resources",
      "/selling/home-valuation",
    ];

    let priority = config.priority;
    let changefreq = config.changefreq;

    if (highPriority.includes(path)) {
      priority = 1.0;
      changefreq = "weekly";
    } else if (mediumPriority.includes(path)) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.startsWith("/neighborhoods/")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/resources/blog/")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.startsWith("/resources/")) {
      priority = 0.6;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
    };
  },
};
