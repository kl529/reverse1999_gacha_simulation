"use client";

import { useEffect, useState, useRef } from "react";
import { useNetworkStatus } from "@/lib/hooks/useNetworkStatus";

/**
 * 네트워크 상태 알림 컴포넌트
 * 오프라인/온라인 상태 변경 시 토스트 메시지를 표시합니다.
 */
export function NetworkStatusToast() {
  const isOnline = useNetworkStatus();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const prevOnlineStatus = useRef<boolean | null>(null);

  useEffect(() => {
    // 첫 로드 시에는 이전 상태를 저장만 하고 토스트를 표시하지 않음
    if (prevOnlineStatus.current === null) {
      prevOnlineStatus.current = isOnline;
      return;
    }

    // 이전 상태와 현재 상태가 다를 때만 토스트 표시
    if (prevOnlineStatus.current !== isOnline) {
      if (!isOnline) {
        setToastMessage("⚠️ 인터넷 연결을 확인해주세요");
        setShowToast(true);
      } else {
        // 오프라인에서 온라인으로 복구된 경우만 토스트 표시
        setToastMessage("✅ 인터넷이 다시 연결되었습니다");
        setShowToast(true);
      }

      // 이전 상태 업데이트
      prevOnlineStatus.current = isOnline;

      // 3초 후 토스트 숨김
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showToast) return null;

  return (
    <div
      className={`fixed left-1/2 top-4 z-[9999] -translate-x-1/2 transform rounded-lg px-6 py-3 text-white shadow-lg transition-all ${
        isOnline
          ? "bg-green-600 dark:bg-green-700"
          : "bg-red-600 dark:bg-red-700"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
}
