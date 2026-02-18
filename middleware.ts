import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // locale 리다이렉트가 필요한 경로만 매칭
  // 정적 파일, API, Next.js 내부 경로 제외
  matcher: [
    "/((?!api|_next|_vercel|infos|sw\\.js|workbox-.*\\.js|manifest\\.json|pwa_icon\\.webp|favicon\\.ico|robots\\.txt|sitemap.*\\.xml|.*\\..*).*)",
  ],
};
