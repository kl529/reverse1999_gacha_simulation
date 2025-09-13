import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 최적화 설정
  output: 'standalone', // 정적 파일 최적화

  // 이미지 최적화 설정
  images: {
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 압축 설정
  compress: true,

  // 실험적 기능 - 정적 생성 최적화
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/],
  cacheOnFrontEndNav: false,
  // PWA 캐싱 최적화
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

module.exports = withPWA({
  ...nextConfig,
  reactStrictMode: true,
});

export default nextConfig;
