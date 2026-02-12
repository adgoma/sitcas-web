import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sitcascgr.com",
      },
    ],
  },
};

export default nextConfig;
