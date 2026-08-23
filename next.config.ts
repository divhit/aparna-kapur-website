import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Apex to www, permanently.
   *
   * Vercel's project-level domain redirect answers `aparnakapur.com` with a
   * 307, and a temporary redirect does not consolidate ranking signals onto
   * the canonical host — one of the things holding back brand-name search.
   * Vercel's own redirect runs before this rule, so the status code there
   * still needs changing to 308 in the dashboard; this makes the app correct
   * on its own, and takes over if that domain redirect is ever removed.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "aparnakapur.com" }],
        destination: "https://www.aparnakapur.com/:path*",
        permanent: true,
      },
      // Short forms of neighbourhood slugs that Search Console reports as 404s.
      // Google knows these URLs, so a redirect recovers whatever equity they
      // carry instead of leaving a dead end.
      {
        source: "/neighborhoods/point-grey",
        destination: "/neighborhoods/west-point-grey",
        permanent: true,
      },
      {
        source: "/neighborhoods/dunbar",
        destination: "/neighborhoods/dunbar-southlands",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "ddfcdn.realtor.ca",
      },
    ],
  },
};

export default nextConfig;
