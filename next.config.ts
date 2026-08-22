import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
        "*.github.dev",
        "*.run.app",
        "*.googleusercontent.com",
        "*.aistudio.google.com",
        "crispy-sniffle-555gv4rw46pfv6-3000.app.github.dev"
      ],
    },
  },
  async rewrites() {
    return [
      {
        source: '/@:username',
        destination: '/u/:username',
      },
    ];
  },
};

export default nextConfig;
