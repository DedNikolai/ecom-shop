import type { NextConfig } from "next";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/_api/:path*', destination: `${BACKEND_API_URL}/:path*` },
    ];
  },
};

export default nextConfig;
