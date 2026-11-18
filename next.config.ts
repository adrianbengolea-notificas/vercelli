import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.e-evhsa.com.ar" },
      { protocol: "http", hostname: "www.e-evhsa.com.ar" },
      { protocol: "https", hostname: "e-evhsa.com.ar" },
    ],
  },
  async redirects() {
    // En Windows el filesystem es case-insensitive: las redirecciones
    // /Empresa/Historia -> /empresa/historia generan un bucle 308.
    // Las URLs originales se normalizan en src/middleware.ts.
    return [];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "geolocation=(self), camera=(), microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
