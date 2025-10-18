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
    // ErrorBoundary가 활성화된 경우 보안 체크 건너뛰기
    if (hasError) {
      return;
    }
    // 1️⃣ 우클릭 방지
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
      alert("우클릭이 금지되어 있습니다.");
    };
    const rightClickExceptionPaths = ["/bingo", "/gacha_guide"];
    if (!rightClickExceptionPaths.includes(pathname)) {
      document.addEventListener("contextmenu", disableRightClick);
    }

    // 2️⃣ 개발자 도구(F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J) 방지
    const blockDevTools = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J"))
      ) {
        e.preventDefault();
        alert("개발자 도구 사용이 금지되었습니다.");
      }
    };
    // document.addEventListener("keydown", blockDevTools);

    // 3️⃣ 루트 주소("/") 이외 접근 제한
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
    ];

    const allowedPathPrefixes = [
      "/character_setting",
      "/skin",
      "/euphoria_guide",
      "/psycube_guide",
      "/character",
      "/reveries_in_the_rain",
    ];

    const isAllowedPath =
      allowedPaths.includes(pathname) ||
      allowedPathPrefixes.some((prefix) => pathname.startsWith(prefix));

    if (typeof window !== "undefined" && !isAllowedPath) {
      // alert 없이 조용히 리다이렉트 (UX 개선)
      router.replace("/"); // replace로 뒤로가기 방지
    }

    // 4️⃣ JavaScript 비활성화 감지 (setInterval로 체크)
    const checkJS = setInterval(() => {
      if (!navigator.onLine) {
        alert("JavaScript가 비활성화되었습니다. 다시 로드합니다.");
        window.location.reload();
      }
    }, 3000);

    // ✅ 이벤트 정리 (언마운트 시)
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", blockDevTools);
      clearInterval(checkJS);
    };
  }, [pathname, router, hasError]);

  return <>{children}</>;
}
