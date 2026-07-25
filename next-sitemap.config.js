/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.aparnakapur.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  // Build-stamped lastmod teaches crawlers the dates are meaningless — omit it.
  autoLastmod: false,
  // These paths 307-redirect to their first child page; redirects don't belong in a sitemap.
  exclude: ["/about", "/buying/guide", "/selling/guide"],
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
      `${robotsTxt}\n# LLM-readable site summary\n# https://www.aparnakapur.com/llms.txt\n# https://www.aparnakapur.com/llms-full.txt\n`,
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
