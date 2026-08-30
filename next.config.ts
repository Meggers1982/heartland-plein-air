import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // www served a full 200 copy of every page rather than redirecting, so the
  // site existed at two origins. Nothing was broken — every page already
  // canonicalises to the apex, and Search Console was correctly filing www
  // under "Alternate page with proper canonical tag" — but a canonical is a
  // hint, and a redirect is not. This collapses the duplicate origin at the
  // edge instead of asking Google to work it out per page.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.heartlandpleinair.org" }],
        destination: "https://heartlandpleinair.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
