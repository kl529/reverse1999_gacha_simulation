"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// 보안 설정 세팅
export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter(); // Next.js에서 클라이언트 사이드 내비게이션 관리

  useEffect(() => {
    // 1️⃣ 우클릭 방지
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
      alert("우클릭이 금지되어 있습니다.");
    };
    document.addEventListener("contextmenu", disableRightClick);

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
    if (typeof window !== "undefined" && pathname !== "/" && pathname !== "/character_quiz") {
      alert("잘못된 접근입니다. 홈으로 이동합니다.");
      router.push("/");
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
  }, [pathname, router]);

  return <>{children}</>;
}