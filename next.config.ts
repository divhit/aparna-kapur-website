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
