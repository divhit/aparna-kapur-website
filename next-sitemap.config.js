/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://aparnakapur.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
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
    } else if (path.startsWith("/resources/")) {
      priority = 0.6;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
