"use client";

import { useEffect, useState } from "react";
import { requestNotificationPermission, onMessageListener, subscribeToTopic } from "@/lib/firebase/messaging";

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 브라우저가 알림을 지원하는지 확인
    if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    // Firebase Service Worker 등록 (PWA와 별도)
    // 동적으로 생성된 Service Worker 사용 (환경 변수 포함)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/api/firebase-messaging-sw", { scope: "/firebase-cloud-messaging-push-scope" })
        .then((registration) => {
          console.log("Firebase Messaging Service Worker registered:", registration);
        })
        .catch((err) => {
          console.error("Firebase Messaging Service Worker registration failed:", err);
        });
    }

    // 포그라운드 메시지 리스너
    onMessageListener()
      .then((payload: any) => {
        console.log("Received foreground message:", payload);

        // 포그라운드에서도 알림 표시
        if (Notification.permission === "granted") {
          new Notification(payload.notification?.title || "리버스 1999", {
            body: payload.notification?.body || "새로운 알림이 있습니다.",
            icon: "/icons/icon-192x192.png",
            data: payload.data,
          });
        }
      })
      .catch((err) => console.log("Failed to receive foreground message:", err));
  }, [isSupported]);

  const handleEnableNotifications = async () => {
    console.log("🔔 알림 활성화 시작...");

    const fcmToken = await requestNotificationPermission();

    if (fcmToken) {
      console.log("✅ FCM 토큰 발급 성공:", fcmToken);
      setToken(fcmToken);
      setPermission("granted");

      // "coupons" 토픽 자동 구독
      try {
        console.log("📢 'coupons' 토픽 구독 시도 중...");
        const result = await subscribeToTopic(fcmToken, "coupons");
        console.log("✅ 토픽 구독 성공:", result);

        // 로컬 스토리지에 토큰 저장 (선택사항)
        localStorage.setItem("fcm_token", fcmToken);

        alert("알림 구독 완료! 이제 쿠폰 알림을 받을 수 있습니다.");
      } catch (error) {
        console.error("❌ 토픽 구독 실패:", error);
        alert("토픽 구독 실패. 콘솔을 확인해주세요.");
      }
    } else {
      console.error("❌ FCM 토큰 발급 실패");
      alert("알림 권한이 거부되었거나 토큰 발급에 실패했습니다.");
    }
  };

  if (!isSupported) {
    return null; // 지원하지 않는 브라우저에서는 표시 안 함
  }

  // 이미 권한이 허용된 경우 표시 안 함
  if (permission === "granted") {
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
              onClick={() => setPermission("denied")}
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
