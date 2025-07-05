import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 봇과 크롤러 요청 차단 (필요시)
  const userAgent = request.headers.get("user-agent") || "";
  const botPatterns: string[] = [
    // 필요시 특정 봇만 차단
    // 'bot',
    // 'crawler',
    // 'spider'
  ];

  if (botPatterns.some((pattern) => userAgent.toLowerCase().includes(pattern))) {
    // 봇 요청에 대해 간단한 응답 반환
    return new NextResponse("Blocked", { status: 403 });
  }

  // 불필요한 파일 요청 차단
  const blockedPaths = [
    "/wp-admin",
    "/wp-content",
    "/.env",
    "/admin",
    "/phpMyAdmin",
    "/.well-known/security.txt",
    "/debug",
    "/config",
  ];

  if (blockedPaths.some((path) => pathname.startsWith(path))) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // 잘못된 확장자 요청 차단
  const blockedExtensions = [".php", ".asp", ".jsp", ".cgi"];
  if (blockedExtensions.some((ext) => pathname.endsWith(ext))) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - infos (static assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|infos).*)",
  ],
};
