import type { NextConfig } from "next";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const nextConfig: NextConfig = {
  // дозволяємо картинки з localhost:3001/uploads/...
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },

  async rewrites() {
    return [
      { source: "/_api/:path*", destination: `${BACKEND_API_URL}/:path*` },
    ];
  },
};

export default nextConfig;
