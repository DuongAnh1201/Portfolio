import type { NextConfig } from "next";

// The site is two static pages in /public: index.html (English) and vi.html (Vietnamese).
const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/index.html" },
        { source: "/vi", destination: "/vi.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Old bilingual routes
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },
      { source: "/vi/:path+", destination: "/vi", permanent: true },
    ];
  },
};

export default nextConfig;
