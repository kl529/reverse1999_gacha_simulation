import { NextResponse } from "next/server";
import { coupons } from "@/data/coupon";
import { messaging } from "@/lib/firebase/admin";

// 서버 메모리에 전송 완료된 쿠폰 ID 저장 (재배포 시 초기화됨)
const sentCouponIds = new Set<string>();

// 마지막 체크 시간 (서버가 재시작되면 초기화됨)
let lastCheckTime: number | null = null;

// 최소 체크 간격 (12시간 = 43200000ms)
const MIN_CHECK_INTERVAL = 12 * 60 * 60 * 1000;

/**
 * 새로운 쿠폰이 추가되었는지 확인하고 푸시 알림 전송
 * pushSent 플래그가 없거나 false인 쿠폰만 푸시 전송됩니다.
 * 서버 메모리 캐싱으로 한 배포 사이클 내에서 중복 전송 방지.
 */
export async function POST() {
  try {
    // 최소 체크 간격 확인 (12시간 이내면 스킵)
    const now = Date.now();
    if (lastCheckTime !== null && now - lastCheckTime < MIN_CHECK_INTERVAL) {
      const minutesRemaining = Math.ceil((MIN_CHECK_INTERVAL - (now - lastCheckTime)) / 60000);
      console.log(`⏰ 쿠폰 체크 스킵: ${minutesRemaining}분 후 다시 시도 가능`);
      return NextResponse.json({
        success: true,
        message: "Too soon to check again",
        minutesUntilNextCheck: minutesRemaining,
        sentCount: 0,
      });
    }

    // 마지막 체크 시간 업데이트
    lastCheckTime = now;
    console.log("🔍 새 쿠폰 체크 시작...");

    // pushSent가 true가 아니고, 메모리에도 없는 활성 쿠폰만 찾기 (무제한 쿠폰 제외)
    const newCoupons = coupons.filter((coupon) => {
      if (coupon.isPermanent) return false; // 무제한 쿠폰은 푸시 전송 안 함
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

    // 각 새 쿠폰에 대해 푸시 전송
    const results = await Promise.allSettled(
      newCoupons.map(async (coupon) => {
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

        // 전송 성공 시 메모리에 기록
        sentCouponIds.add(coupon.id);

        return {
          couponId: coupon.id,
          couponCode: coupon.code,
          messageId,
        };
      })
    );

    const successful = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter((r) => r.status === "rejected");

    console.log(`✅ 푸시 전송 완료: 성공 ${successful.length}개, 실패 ${failed.length}개`);

    return NextResponse.json({
      success: true,
      message: `Sent ${successful.length} coupon notifications`,
      sentCount: successful.length,
      failedCount: failed.length,
      cachedCount: sentCouponIds.size, // 메모리에 캐시된 총 쿠폰 수
      details: successful.map((r) => (r.status === "fulfilled" ? r.value : null)),
    });
  } catch (error) {
    console.error("Error checking new coupons:", error);
    return NextResponse.json(
      { error: "Failed to check new coupons" },
      { status: 500 }
    );
  }
}

/**
 * GET 요청: 푸시 전송 대기 중인 쿠폰 목록 확인 (디버깅용)
 */
export async function GET() {
  const pendingCoupons = coupons.filter((coupon) => {
    if (coupon.isPermanent) return false; // 무제한 쿠폰은 푸시 전송 안 함
    if (sentCouponIds.has(coupon.id)) return false; // 이미 전송한 쿠폰 제외
    const isExpired = new Date(coupon.expiresAt) < new Date();
    const notSent = coupon.pushSent !== true;
    return !isExpired && notSent;
  });

  return NextResponse.json({
    pendingCoupons: pendingCoupons.map((c) => ({
      id: c.id,
      code: c.code,
      pushSent: c.pushSent,
      inMemoryCache: sentCouponIds.has(c.id),
    })),
    totalPending: pendingCoupons.length,
    cachedCouponIds: Array.from(sentCouponIds), // 메모리에 캐시된 쿠폰 ID 목록
    totalCached: sentCouponIds.size,
  });
}
