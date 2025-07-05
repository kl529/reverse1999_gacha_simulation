import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    // 이미지 캐싱 시간 증가
    minimumCacheTTL: 31536000, // 1년
    // 이미지 크기 제한 - 실제 사용되는 크기에 맞춤
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 이미지 포맷 설정
    formats: ["image/webp"],
    // 이미지 로더 최적화
    loader: "default",
    // 정적 이미지 import 최적화
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 정적 생성 최적화
  output: "standalone", // 독립 실행형 모드
  // 실험적 기능
  experimental: {
    // 패키지 임포트 최적화
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // 웹 성능 최적화
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/, /\.map$/],
  // 프론트엔드 내비게이션 캐싱 활성화
  cacheOnFrontEndNav: true,
  // 오프라인 지원 강화
  fallbacks: {
    document: "/offline",
    image: "/infos/effects/no-image.webp",
  },
  // 캐시 전략 최적화
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1년
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-images",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-js",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24시간
        },
      },
    },
    {
      urlPattern: /\.(?:css)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-css",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24시간
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\/_next\/data\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-data",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
});

export default withPWA(nextConfig);
