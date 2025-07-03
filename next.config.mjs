import withPWAInit from "next-pwa";

const isDev = process.env.NODE_ENV !== "production";

const withPWA = withPWAInit({
  dest: "public",
  disable: isDev,
  runtimeCaching: [
    // 이미지: CacheFirst 전략 사용
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-image-assets",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
        },
      },
    },
    // Google Fonts 스타일시트
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-stylesheets",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1년
        },
      },
    },
    // Google Fonts 웹폰트 파일
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1년
        },
      },
    },
    // JS, CSS 파일: StaleWhileRevalidate 전략 사용
    {
      urlPattern: /\.(?:js|css)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24시간
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
