import { NextResponse } from "next/server";
import { coupons } from "@/data/coupon";
import { messaging } from "@/lib/firebase/admin";

// 배포 버전 - 쿠폰 데이터의 해시값으로 자동 생성
// 새 쿠폰이 추가되면 자동으로 버전이 변경됨
const DEPLOYMENT_VERSION = generateCouponHash();

// 쿠폰 데이터 기반 해시 생성 (새 쿠폰 추가 시 자동 변경)
function generateCouponHash(): string {
  const couponData = coupons
    .filter((c) => !c.isPermanent && !c.isHidden)
    .map((c) => `${c.id}:${c.code}:${c.pushSent}`)
    .join("|");
  // 간단한 해시 생성
  let hash = 0;
  for (let i = 0; i < couponData.length; i++) {
    const char = couponData.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32bit integer로 변환
  }
  return `v${Math.abs(hash).toString(36)}`;
}

// 서버 메모리에 전송 완료된 쿠폰 ID 저장 (재배포 시 초기화됨)
const sentCouponIds = new Set<string>();

// 마지막 체크 시간 (서버가 재시작되면 초기화됨)
let lastCheckTime: number | null = null;

// 최소 체크 간격 (5분 = 300000ms) - 너무 잦은 요청 방지
const MIN_CHECK_INTERVAL = 5 * 60 * 1000;

// 현재 배포 버전 추적 (새 배포 감지용)
let currentDeploymentVersion: string | null = null;

// 푸시 전송 진행 중 플래그 (동시 요청 방지)
let isSending = false;

/**
 * 새로운 쿠폰이 추가되었는지 확인하고 푸시 알림 전송
 * pushSent 플래그가 없거나 false인 쿠폰만 푸시 전송됩니다.
 * isHidden이 true인 쿠폰과 isPermanent가 true인 쿠폰은 푸시가 전송되지 않습니다.
 * 서버 메모리 캐싱으로 한 배포 사이클 내에서 중복 전송 방지.
 */
export async function POST() {
  try {
    // 🚫 ngrok 환경에서는 푸시 알림 전송 차단 (개발/테스트 환경)
    const isProduction = process.env.NODE_ENV === "production";
    const host = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || "";
    const isNgrok = host.includes("ngrok") || host.includes("localhost");

    if (!isProduction || isNgrok) {
      console.log("⚠️ 개발/테스트 환경에서는 푸시 알림을 전송하지 않습니다.");
      console.log(`  환경: ${process.env.NODE_ENV}, 호스트: ${host}`);
      return NextResponse.json({
        success: true,
        message: "Push notifications disabled in development/ngrok environment",
        environment: process.env.NODE_ENV,
        host: host,
        sentCount: 0,
      });
    }

    // Firebase Admin 초기화 확인
    if (!messaging) {
      console.error("❌ Firebase Admin Messaging이 초기화되지 않았습니다");
      return NextResponse.json({ error: "Firebase Admin not initialized" }, { status: 500 });
    }

    // 새 배포 감지: DEPLOYMENT_VERSION이 변경되었으면 메모리 초기화
    if (currentDeploymentVersion !== DEPLOYMENT_VERSION) {
      console.log("🔄 새 배포 감지! 메모리 초기화 중...");
      console.log(`  이전 버전: ${currentDeploymentVersion}`);
      console.log(`  새 버전: ${DEPLOYMENT_VERSION}`);
      currentDeploymentVersion = DEPLOYMENT_VERSION;
      sentCouponIds.clear();
      lastCheckTime = null;
    }

    // 동시 요청 방지
    if (isSending) {
      return NextResponse.json({
        success: true,
        message: "Push notification is already being sent",
        sentCount: 0,
      });
    }

    // 최소 체크 간격 확인 (5분 이내면 스킵)
    const now = Date.now();
    if (lastCheckTime !== null && now - lastCheckTime < MIN_CHECK_INTERVAL) {
      const secondsRemaining = Math.ceil((MIN_CHECK_INTERVAL - (now - lastCheckTime)) / 1000);
      return NextResponse.json({
        success: true,
        message: "Too soon to check again",
        secondsUntilNextCheck: secondsRemaining,
        sentCount: 0,
      });
    }

    // 마지막 체크 시간 업데이트
    lastCheckTime = now;
    console.log("🔍 새 쿠폰 체크 시작...");
    console.log(`📋 현재 배포 버전: ${DEPLOYMENT_VERSION}`);

    // pushSent가 true가 아니고, 메모리에도 없는 활성 쿠폰만 찾기 (무제한 쿠폰 및 숨김 쿠폰 제외)
    const newCoupons = coupons.filter((coupon) => {
      if (coupon.isPermanent) return false; // 무제한 쿠폰은 푸시 전송 안 함
      if (coupon.isHidden) return false; // 숨김 쿠폰은 푸시 전송 안 함
      if (sentCouponIds.has(coupon.id)) return false; // 이미 전송한 쿠폰 제외
      const isExpired = new Date(coupon.expiresAt) < new Date();
      const notSent = coupon.pushSent !== true; // pushSent가 없거나 false인 경우
      return !isExpired && notSent;
    });

    if (newCoupons.length === 0) {
      console.log("✅ 새 쿠폰 없음");
      return NextResponse.json({
        success: true,
        message: "No new coupons to notify",
        sentCount: 0,
      });
    }

    console.log(`📤 ${newCoupons.length}개의 새 쿠폰 푸시 전송 중...`);
    console.log("새 쿠폰 목록:", newCoupons.map((c) => `${c.id}: ${c.code}`).join(", "));

    // 푸시 전송 시작
    isSending = true;

    // 각 새 쿠폰에 대해 푸시 전송
    const results = await Promise.allSettled(
      newCoupons.map(async (coupon) => {
        try {
          console.log(`  → 쿠폰 "${coupon.code}" (ID: ${coupon.id}) 푸시 전송 시도 중...`);

          const message = {
            notification: {
              title: "🎁 새로운 쿠폰이 등록되었습니다!",
              body: `쿠폰 코드: ${coupon.code}\n지금 바로 사용하세요!`,
            },
            data: {
              couponId: coupon.id,
              couponCode: coupon.code,
              url: "/coupon",
            },
            topic: "coupons",
          };

          const messageId = await messaging.send(message);
          console.log(`  ✓ 쿠폰 "${coupon.code}" 전송 성공 (메시지 ID: ${messageId})`);

          // 전송 성공 시 메모리에 기록
          sentCouponIds.add(coupon.id);

          return {
            couponId: coupon.id,
            couponCode: coupon.code,
            messageId,
          };
        } catch (error) {
          console.error(`  ✗ 쿠폰 "${coupon.code}" 전송 실패:`, error);
          throw error; // Promise.allSettled에서 rejected로 처리되도록
        }
      })
    );

    const successful = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter((r) => r.status === "rejected");

    // 실패한 푸시의 에러 메시지 로깅
    if (failed.length > 0) {
      console.error("❌ 푸시 전송 실패 상세:");
      failed.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`  [${index + 1}] 에러:`, result.reason);
        }
      });
    }

    // 푸시 전송 완료
    isSending = false;

    console.log(`✅ 푸시 전송 완료: 성공 ${successful.length}개, 실패 ${failed.length}개`);

    return NextResponse.json({
      success: true,
      message: `Sent ${successful.length} coupon notifications`,
      sentCount: successful.length,
      failedCount: failed.length,
      cachedCount: sentCouponIds.size, // 메모리에 캐시된 총 쿠폰 수
      deploymentVersion: DEPLOYMENT_VERSION,
      details: successful.map((r) => (r.status === "fulfilled" ? r.value : null)),
    });
  } catch (error) {
    // 에러 발생 시에도 플래그 초기화
    isSending = false;
    console.error("Error checking new coupons:", error);
    return NextResponse.json({ error: "Failed to check new coupons" }, { status: 500 });
  }
}

/**
 * GET 요청: 푸시 전송 상태 확인 (디버깅용)
 */
export async function GET() {
  const pendingCoupons = coupons.filter((coupon) => {
    if (coupon.isPermanent) return false; // 무제한 쿠폰은 푸시 전송 안 함
    if (coupon.isHidden) return false; // 숨김 쿠폰은 푸시 전송 안 함
    if (sentCouponIds.has(coupon.id)) return false; // 이미 전송한 쿠폰 제외
    const isExpired = new Date(coupon.expiresAt) < new Date();
    const notSent = coupon.pushSent !== true;
    return !isExpired && notSent;
  });

  // 전체 활성 쿠폰 목록 (디버깅용)
  const activeCoupons = coupons.filter((coupon) => {
    if (coupon.isPermanent) return false;
    if (coupon.isHidden) return false;
    const isExpired = new Date(coupon.expiresAt) < new Date();
    return !isExpired;
  });

  return NextResponse.json({
    status: {
      deploymentVersion: DEPLOYMENT_VERSION,
      isSending,
      lastCheckTime: lastCheckTime ? new Date(lastCheckTime).toISOString() : null,
      minCheckIntervalMs: MIN_CHECK_INTERVAL,
    },
    pendingCoupons: pendingCoupons.map((c) => ({
      id: c.id,
      code: c.code,
      description: c.description,
      expiresAt: c.expiresAt,
      pushSent: c.pushSent,
      inMemoryCache: sentCouponIds.has(c.id),
    })),
    totalPending: pendingCoupons.length,
    activeCoupons: activeCoupons.map((c) => ({
      id: c.id,
      code: c.code,
      pushSent: c.pushSent,
      inMemoryCache: sentCouponIds.has(c.id),
    })),
    totalActive: activeCoupons.length,
    cachedCouponIds: Array.from(sentCouponIds),
    totalCached: sentCouponIds.size,
  });
}
