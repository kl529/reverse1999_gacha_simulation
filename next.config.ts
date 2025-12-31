import type { NextConfig } from "next";

// 번들 분석기 (개발 시에만 사용)
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Cloudtype standalone 배포 설정
  output: "standalone",

  // 이미지 최적화 설정 (메모리 절약을 위해 비활성화)
  images: {
    unoptimized: true, // Cloudtype 메모리 부족 방지
    formats: ["image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Cloudflare R2 CDN 도메인 허용
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reverse1999-r2-public.lyva.workers.dev",
        pathname: "/**",
      },
    ],
  },

  // 압축 설정
  compress: true,

  // 실험적 기능 - 정적 생성 최적화
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Cloudflare CDN 최적화를 위한 캐시 헤더 설정
  async headers() {
    return [
      {
        source: "/infos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/, /app-build-manifest.json$/],
  cacheOnFrontEndNav: false,
  // PWA 캐싱 최적화 (Cloudflare CDN과 함께 동작)
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1년
        },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24시간
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

module.exports = withBundleAnalyzer(
  withPWA({
    ...nextConfig,
    reactStrictMode: true,
  })
);

export default nextConfig;
