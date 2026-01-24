"use client";

import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ErrorBoundaryContext } from "./ErrorBoundary";

// 보안 설정 세팅
export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter(); // Next.js에서 클라이언트 사이드 내비게이션 관리
  const hasError = useContext(ErrorBoundaryContext); // ErrorBoundary 활성화 상태 확인

  useEffect(() => {
    // ErrorBoundary가 활성화된 경우 체크 건너뛰기
    if (hasError) {
      return;
    }

    // 루트 주소("/") 이외 접근 제한
    // 에러 페이지와 테스트 페이지는 접근 제한 제외
    const allowedPaths = [
      "/",
      "/character_quiz",
      "/gacha_simulator",
      "/path_quiz",
      "/future_insight",
      "/blueprint_setting",
      "/recommend_team",
      "/cash_guide",
      "/bingo",
      "/calendar",
      "/gacha_guide",
      "/cash_package_shop",
      "/shop_efficiency",
      "/newbie_guide",
      "/error-test", // 에러 테스트 페이지
      "/coupon",
      "/damage_calculation",
      "/growth_calculator",
      "/favorite_character",
      "/quiz",
    ];

    const allowedPathPrefixes = [
      "/character_setting",
      "/skin",
      "/euphoria_guide",
      "/psycube_guide",
      "/character",
      "/reveries_in_the_rain",
      "/quiz",
    ];

    const isAllowedPath =
      allowedPaths.includes(pathname) ||
      allowedPathPrefixes.some((prefix) => pathname.startsWith(prefix));

    if (typeof window !== "undefined" && !isAllowedPath) {
      // alert 없이 조용히 리다이렉트 (UX 개선)
      router.replace("/"); // replace로 뒤로가기 방지
    }
  }, [pathname, router, hasError]);

  return <>{children}</>;
}
