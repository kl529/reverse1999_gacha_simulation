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

  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");

      // FCM 토큰 발급
      const token = await getToken(messaging, { vapidKey });
      console.log("FCM Token:", token);

      return token;
    } else {
      console.log("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
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
