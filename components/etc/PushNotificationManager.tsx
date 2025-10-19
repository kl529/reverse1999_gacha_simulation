"use client";

import { useEffect, useState } from "react";
import { requestNotificationPermission, onMessageListener, subscribeToTopic } from "@/lib/firebase/messaging";

// Firebase 메시지 페이로드 타입 정의
interface FirebaseMessagePayload {
  notification?: {
    title?: string;
    body?: string;
  };
  data?: Record<string, string>;
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [hasToken, setHasToken] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 브라우저가 알림을 지원하는지 확인
    if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);

      // 로컬 스토리지에 토큰이 이미 있는지 확인
      const savedToken = localStorage.getItem("fcm_token");
      if (savedToken) {
        setHasToken(true);
        console.log("✅ 저장된 FCM 토큰 발견");
      }

      // 사용자가 이전에 "나중에" 버튼을 눌렀는지 확인
      const dismissed = localStorage.getItem("notification_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    // 포그라운드 메시지 리스너
    onMessageListener()
      .then((payload) => {
        const message = payload as FirebaseMessagePayload;
        console.log("Received foreground message:", message);

        // 포그라운드에서도 알림 표시
        if (Notification.permission === "granted") {
          new Notification(message.notification?.title || "리버스 1999", {
            body: message.notification?.body || "새로운 알림이 있습니다.",
            icon: "/icons/icon-192x192.png",
            data: message.data,
          });
        }
      })
      .catch((err) => console.log("Failed to receive foreground message:", err));
  }, [isSupported]);

  const handleEnableNotifications = async () => {
    console.log("🔔 알림 활성화 시작...");

    // 팝업을 즉시 숨김 (사용자 경험 개선)
    setHasToken(true);

    try {
      const fcmToken = await requestNotificationPermission();

      if (fcmToken) {
        console.log("✅ FCM 토큰 발급 성공");
        setToken(fcmToken);

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("fcm_token", fcmToken);

        // 상태 업데이트
        setPermission("granted");

        // "coupons" 토픽 자동 구독
        try {
          console.log("📢 'coupons' 토픽 구독 시도 중...");
          const result = await subscribeToTopic(fcmToken, "coupons");
          console.log("✅ 토픽 구독 성공:", result);

          alert("알림 구독 완료! 이제 쿠폰 알림을 받을 수 있습니다.");
        } catch (error) {
          console.error("❌ 토픽 구독 실패:", error);
          alert("알림은 활성화되었으나 토픽 구독에 실패했습니다.\n브라우저를 새로고침해주세요.");
        }
      } else {
        console.error("❌ FCM 토큰 발급 실패");

        // 토큰 발급 실패 시 팝업 다시 표시
        setHasToken(false);

        // 사용자가 권한을 거부한 경우
        if (Notification.permission === "denied") {
          setPermission("denied");
          alert("알림 권한이 차단되었습니다.\n브라우저 설정에서 알림 권한을 허용해주세요.");
        } else {
          alert("토큰 발급에 실패했습니다.\n콘솔에서 오류를 확인해주세요.");
        }
      }
    } catch (error) {
      console.error("❌ 알림 활성화 중 오류:", error);

      // 오류 발생 시 팝업 다시 표시
      setHasToken(false);

      alert("알림 활성화 중 오류가 발생했습니다.\n콘솔을 확인해주세요.");
    }
  };

  if (!isSupported) {
    return null; // 지원하지 않는 브라우저에서는 표시 안 함
  }

  // 이미 권한이 허용되었거나 토큰이 발급된 경우 표시 안 함
  if (permission === "granted" || hasToken) {
    return null;
  }

  // 사용자가 '나중에' 버튼을 눌렀을 경우 표시 안 함
  if (isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="rounded-lg border bg-card p-4 shadow-lg">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-semibold">🔔 알림 받기</h3>
            <p className="text-sm text-muted-foreground mt-1">
              새로운 쿠폰 정보를 푸시 알림으로 받아보세요!
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEnableNotifications}
              className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              알림 받기
            </button>
            <button
              onClick={() => {
                setIsDismissed(true);
                localStorage.setItem("notification_dismissed", "true");
              }}
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              나중에
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
