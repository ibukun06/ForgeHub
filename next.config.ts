import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
        "*.github.dev",
        "crispy-sniffle-555gv4rw46pfv6-3000.app.github.dev"
      ],
    },
  },
};

export default nextConfig;
