import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./config";

const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// 브라우저 환경에서만 messaging 초기화
let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

/**
 * 푸시 알림 권한 요청 및 토큰 발급
 */
export async function requestNotificationPermission(): Promise<string | null> {
  if (!messaging) {
    console.warn("Messaging is not supported in this environment");
    return null;
  }

  // VAPID 키 확인
  if (!vapidKey) {
    console.error("❌ VAPID 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
    return null;
  }

  // Service Worker 지원 확인
  if (!("serviceWorker" in navigator)) {
    console.error("❌ 이 브라우저는 Service Worker를 지원하지 않습니다.");
    return null;
  }

  try {
    console.log("🔔 알림 권한 요청 중...");

    // 알림 권한 요청 (Service Worker 등록 전에 먼저)
    const permission = await Notification.requestPermission();
    console.log("📋 권한 상태:", permission);

    if (permission !== "granted") {
      console.warn("⚠️ 알림 권한이 거부되었습니다:", permission);
      return null;
    }

    console.log("✅ 알림 권한 승인됨");

    // Firebase messaging Service Worker 등록 (동적으로 생성)
    console.log("📝 Firebase Messaging Service Worker 등록 중...");
    const swRegistration = await navigator.serviceWorker.register("/api/firebase-messaging-sw", {
      scope: "/firebase-cloud-messaging-push-scope",
    });

    console.log("✅ Firebase Messaging Service Worker 등록 완료");

    // Service Worker가 활성화될 때까지 대기 (중요!)
    console.log("⏳ Service Worker 활성화 대기 중...");

    // installing 상태면 activated될 때까지 기다림
    if (swRegistration.installing) {
      console.log("📦 Service Worker가 installing 상태입니다. activated 대기 중...");
      try {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Service Worker 활성화 타임아웃 (10초)"));
          }, 10000);

          swRegistration.installing!.addEventListener('statechange', function() {
            console.log("🔄 Service Worker 상태 변경:", this.state);
            if (this.state === 'activated') {
              clearTimeout(timeout);
              resolve();
            } else if (this.state === 'redundant') {
              clearTimeout(timeout);
              reject(new Error("Service Worker가 redundant 상태가 되었습니다."));
            }
          });
        });
        console.log("✅ Service Worker activated 완료");
      } catch (error) {
        console.warn("⚠️ Service Worker 활성화 대기 중 오류:", error);
        // 타임아웃 발생 시에도 계속 진행 시도
      }
    }

    // waiting 상태라면 skipWaiting 호출
    if (swRegistration.waiting) {
      console.log("⏸️ Service Worker가 waiting 상태입니다. skipWaiting 호출...");
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }

    // 전체 Service Worker 준비 상태 확인 (최대 30초 대기)
    console.log("⏳ navigator.serviceWorker.ready 대기 중...");
    const readyPromise = navigator.serviceWorker.ready;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Service Worker ready 타임아웃")), 30000)
    );

    try {
      await Promise.race([readyPromise, timeoutPromise]);
      console.log("✅ Service Worker 준비 완료");
    } catch {
      console.warn("⚠️ Service Worker 준비 타임아웃 (무시하고 계속 진행)");
      // 타임아웃이어도 계속 진행 - PWA Service Worker가 우선 등록되었을 수 있음
    }

    console.log("🔑 FCM 토큰 발급 시도 중... (VAPID Key 사용)");

    // FCM 토큰 발급 (등록된 Service Worker 사용)
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swRegistration,
    });

    if (token) {
      console.log("✅ FCM 토큰 발급 성공");
      return token;
    } else {
      console.error("❌ 토큰이 발급되지 않았습니다. (토큰 값이 비어있음)");
      return null;
    }
  } catch (error) {
    console.error("❌ 토큰 발급 중 오류 발생:");
    console.error("Error details:", error);

    // 더 구체적인 에러 정보 출력
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return null;
  }
}

/**
 * 포그라운드 메시지 수신 리스너
 */
export function onMessageListener() {
  if (!messaging) {
    return Promise.reject("Messaging is not supported");
  }

  return new Promise((resolve) => {
    onMessage(messaging!, (payload) => {
      console.log("Message received. ", payload);
      resolve(payload);
    });
  });
}

/**
 * 특정 토픽 구독 (서버 측에서 처리)
 */
export async function subscribeToTopic(token: string, topic: string) {
  try {
    const response = await fetch("/api/subscribe-topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, topic }),
    });

    const data = await response.json();
    console.log("Topic subscription result:", data);
    return data;
  } catch (error) {
    console.error("Error subscribing to topic:", error);
    throw error;
  }
}
