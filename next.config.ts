import type { NextConfig } from "next";

// Required for Aiven PostgreSQL self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
