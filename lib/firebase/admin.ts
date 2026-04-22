import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getMessaging, Messaging } from "firebase-admin/messaging";

// Firebase Admin 초기화 (서버 측에서만 사용)
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (getApps().length === 0 && privateKey && privateKey.startsWith("-----BEGIN")) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

export const messaging: Messaging = getApps().length > 0 ? getMessaging() : (null as unknown as Messaging);
