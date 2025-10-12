"use client";

import { useEffect, useState } from "react";

/**
 * 네트워크 연결 상태를 감지하는 커스텀 훅
 * @returns isOnline - 현재 온라인 상태 여부
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // 초기 상태 설정
    setIsOnline(navigator.onLine);

    // 온라인 상태 변경 핸들러
    const handleOnline = () => {
      setIsOnline(true);
      console.log("네트워크 연결됨");
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("네트워크 연결 끊김");
    };

    // 이벤트 리스너 등록
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 클린업
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
