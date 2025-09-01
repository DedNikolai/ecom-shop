import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/_api/:path*", destination: `${process.env.BACKEND_API_URL}/:path*` },
    ];
  },
};

export default nextConfig;
