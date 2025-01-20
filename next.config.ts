import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "sensible-basilisk-520.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
