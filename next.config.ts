import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

const withPWA = require("next-pwa")({
  dest: "public", // 서비스 워커 파일을 빌드 후 public 폴더에 생성
  register: true, // window.onbeforeinstallprompt 등 자동 등록
  skipWaiting: true, // 새 SW가 준비되면 즉시 교체
  disable: process.env.NODE_ENV === "development", // 개발 중에는 비활성화
  buildExcludes: [/middleware-manifest.json$/], // 불필요한 파일 제외
  cacheOnFrontEndNav: false, // 프론트엔드 내비게이션 캐싱 방지
});

module.exports = withPWA({
  reactStrictMode: true,
});

export default nextConfig;
