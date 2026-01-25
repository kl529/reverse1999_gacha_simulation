"use client";

import { useState, useEffect, useCallback } from "react";
import { coupons, Coupon } from "@/data/coupon";
import { Copy, Check, Calendar, CheckCircle2, Circle, Bell } from "lucide-react";
import toast from "react-hot-toast";

const USED_COUPONS_KEY = "reverse1999_used_coupons";

/**
 * 새 쿠폰 확인 및 푸시 알림 트리거
 * 백그라운드에서 조용히 실행되며, 새 쿠폰이 있으면 구독자에게 푸시 전송
 */
async function checkAndSendNewCouponNotifications(): Promise<void> {
  try {
    const response = await fetch("/api/check-new-coupons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.sentCount > 0) {
        console.log(`✅ ${data.sentCount}개의 새 쿠폰 알림이 전송되었습니다.`);
      }
    }
  } catch (error) {
    // 조용히 실패 (사용자 경험에 영향 없음)
    console.error("쿠폰 알림 체크 실패:", error);
  }
}

export default function CouponsPage() {
  const [usedCoupons, setUsedCoupons] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showNotificationButton, setShowNotificationButton] = useState(false);

  // 새 쿠폰 알림 체크 (컴포넌트 마운트 시 1회)
  const triggerNewCouponCheck = useCallback(() => {
    // 프로덕션 환경에서만 실행 (개발 환경에서는 API가 거부함)
    if (typeof window !== "undefined") {
      // 약간의 지연 후 실행 (페이지 로딩 우선)
      setTimeout(() => {
        checkAndSendNewCouponNotifications();
      }, 2000);
    }
  }, []);

  // 로컬 스토리지에서 사용한 쿠폰 목록 불러오기
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USED_COUPONS_KEY);
      if (stored) {
        setUsedCoupons(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse used coupons:", error);
    }

    try {
      // 알림 설정 버튼 표시 여부 확인
      const fcmToken = localStorage.getItem("fcm_token");
      const dismissed = localStorage.getItem("notification_dismissed");
      if (!fcmToken && dismissed === "true") {
        setShowNotificationButton(true);
      }
    } catch {
      // localStorage 접근 실패 시 무시
    }

    // Service Worker 메시지 리스너 (푸시 알림에서 복사 버튼 클릭 시)
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === "COPY_COUPON") {
        const couponCode = event.data.couponCode;
        navigator.clipboard
          .writeText(couponCode)
          .then(() => {
            toast.success(`쿠폰 코드 "${couponCode}"가 복사되었습니다!`);
          })
          .catch(() => {
            toast.error("복사에 실패했습니다.");
          });
      }
    };

    navigator.serviceWorker?.addEventListener("message", handleServiceWorkerMessage);

    // 새 쿠폰 알림 체크 트리거
    triggerNewCouponCheck();

    return () => {
      navigator.serviceWorker?.removeEventListener("message", handleServiceWorkerMessage);
    };
  }, [triggerNewCouponCheck]);

  // 쿠폰 복사 기능
  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`쿠폰 코드 "${code}"가 복사되었습니다!`);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      toast.error("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 쿠폰 사용 체크
  const handleToggleUsed = (couponId: string) => {
    const newUsedCoupons = usedCoupons.includes(couponId)
      ? usedCoupons.filter((id) => id !== couponId)
      : [...usedCoupons, couponId];

    setUsedCoupons(newUsedCoupons);
    localStorage.setItem(USED_COUPONS_KEY, JSON.stringify(newUsedCoupons));

    if (newUsedCoupons.includes(couponId)) {
      toast.success("사용 완료로 표시되었습니다");
    } else {
      toast("사용 완료 표시가 해제되었습니다");
    }
  };

  // 만료일 확인
  const isExpired = (coupon: Coupon): boolean => {
    if (coupon.isPermanent) return false; // 무제한 쿠폰은 만료되지 않음
    if (!coupon.expiresAt) return false; // 만료일이 없으면 만료되지 않음
    const expireDate = new Date(coupon.expiresAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return expireDate < today;
  };

  // 만료일까지 남은 일수
  const getDaysUntilExpire = (expiresAt: string): number => {
    const expireDate = new Date(expiresAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expireDate.setHours(0, 0, 0, 0);
    const diff = expireDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // 알림 재설정 핸들러
  const handleEnableNotifications = () => {
    localStorage.removeItem("notification_dismissed");
    setShowNotificationButton(false);
    toast.success("페이지를 새로고침하면 알림 설정 팝업이 다시 표시됩니다.");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // 만료되지 않고 숨겨지지 않은 쿠폰 필터링
  const allActiveCoupons = coupons.filter((coupon) => !isExpired(coupon) && !coupon.isHidden);

  // 일반 쿠폰과 영구 쿠폰 분리
  const regularCoupons = allActiveCoupons
    .filter((coupon) => !coupon.isPermanent)
    .sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());

  const permanentCoupons = allActiveCoupons.filter((coupon) => coupon.isPermanent);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-gray-900 dark:text-gray-100">
      {/* 헤더 - 다른 가이드 페이지와 통일 */}
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold">쿠폰 목록 🎁</h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        사용 가능한 리버스 1999 쿠폰 코드를 확인하고 복사하세요
        <br />
        💡 만료일자는 하루정도 차이가 날 수 있습니다.
      </p>

      {/* 알림 켜기 버튼 */}
      {showNotificationButton && (
        <div className="mb-4 flex justify-center">
          <button
            onClick={handleEnableNotifications}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            aria-label="알림 설정"
          >
            <Bell className="h-4 w-4" />
            <span>쿠폰 알림 받기</span>
          </button>
        </div>
      )}

      {/* 사용 현황 표시 */}
      {allActiveCoupons.length > 0 && (
        <div className="mb-6 rounded-lg border bg-card p-4 text-center">
          <p className="text-sm text-muted-foreground">
            사용 현황:{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {usedCoupons.filter((id) => allActiveCoupons.some((c) => c.id === id)).length}
            </span>{" "}
            / {allActiveCoupons.length}
          </p>
        </div>
      )}

      {/* 쿠폰 목록 */}
      {allActiveCoupons.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center shadow-sm sm:p-8">
          <p className="text-lg">현재 사용 가능한 쿠폰이 없습니다</p>
          <p className="mt-2 text-sm text-muted-foreground">
            새로운 쿠폰이 등록되면 알림을 보내드립니다!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* 일반 쿠폰 섹션 */}
          {regularCoupons.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">📅 기간 제한 쿠폰</h2>
              <div className="space-y-4">
                {regularCoupons.map((coupon) => {
                  const isUsed = usedCoupons.includes(coupon.id);
                  const daysLeft = getDaysUntilExpire(coupon.expiresAt);
                  const isExpiringSoon = daysLeft <= 7;

                  return (
                    <div
                      key={coupon.id}
                      className={`relative rounded-lg border shadow-sm transition-all ${
                        isUsed
                          ? "border-gray-300 bg-gray-100 opacity-60 dark:border-gray-600 dark:bg-gray-800"
                          : "border-purple-200 bg-card hover:shadow-md dark:border-purple-800"
                      }`}
                    >
                      {/* NEW 스티커 */}
                      {!coupon.pushSent && !isUsed && (
                        <div className="absolute -right-2 -top-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
                          <span className="text-xs font-bold text-white">NEW</span>
                        </div>
                      )}

                      <div className="p-4 sm:p-5">
                        {/* 쿠폰 코드, 복사 버튼, 체크박스 */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-1 items-center gap-3">
                            {/* 체크박스 */}
                            <button
                              onClick={() => handleToggleUsed(coupon.id)}
                              className="flex-shrink-0 transition-colors hover:scale-110"
                              aria-label={isUsed ? "사용 완료 취소" : "사용 완료 표시"}
                            >
                              {isUsed ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                              ) : (
                                <Circle className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                              )}
                            </button>

                            {/* 쿠폰 코드 */}
                            <code
                              className={`flex-1 rounded-md px-2 py-1.5 text-sm font-bold sm:px-3 sm:py-2 sm:text-base ${
                                isUsed
                                  ? "bg-gray-200 text-gray-500 line-through dark:bg-gray-700 dark:text-gray-500"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                              }`}
                            >
                              {coupon.code}
                            </code>
                          </div>

                          {/* 복사 버튼 */}
                          <button
                            onClick={() => handleCopy(coupon.code)}
                            disabled={isUsed}
                            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                              isUsed
                                ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                                : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                            }`}
                          >
                            {copiedCode === coupon.code ? (
                              <>
                                <Check className="h-4 w-4" />
                                <span className="hidden sm:inline">복사됨</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                <span className="hidden sm:inline">복사</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* 만료일 */}
                        <div className="mt-3 flex items-center gap-2 border-t pt-3 text-sm">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          {coupon.isPermanent ? (
                            <span className="font-semibold text-purple-600 dark:text-purple-400">
                              만료 없음 (영구 사용 가능)
                            </span>
                          ) : (
                            <span
                              className={`${
                                isExpiringSoon
                                  ? "font-semibold text-red-600 dark:text-red-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {coupon.expiresAt} 까지
                              {isExpiringSoon && ` (${daysLeft}일 남음)`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 영구 쿠폰 섹션 */}
          {permanentCoupons.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">♾️ 영구 사용 쿠폰</h2>
              <div className="space-y-4">
                {permanentCoupons.map((coupon) => {
                  const isUsed = usedCoupons.includes(coupon.id);

                  return (
                    <div
                      key={coupon.id}
                      className={`rounded-lg border shadow-sm transition-all ${
                        isUsed
                          ? "border-gray-300 bg-gray-100 opacity-60 dark:border-gray-600 dark:bg-gray-800"
                          : "border-purple-200 bg-card hover:shadow-md dark:border-purple-800"
                      }`}
                    >
                      <div className="p-4 sm:p-5">
                        {/* 쿠폰 코드, 복사 버튼, 체크박스 */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-1 items-center gap-3">
                            {/* 체크박스 */}
                            <button
                              onClick={() => handleToggleUsed(coupon.id)}
                              className="flex-shrink-0 transition-colors hover:scale-110"
                              aria-label={isUsed ? "사용 완료 취소" : "사용 완료 표시"}
                            >
                              {isUsed ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                              ) : (
                                <Circle className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                              )}
                            </button>

                            {/* 쿠폰 코드 */}
                            <code
                              className={`flex-1 rounded-md px-2 py-1.5 text-sm font-bold sm:px-3 sm:py-2 sm:text-base ${
                                isUsed
                                  ? "bg-gray-200 text-gray-500 line-through dark:bg-gray-700 dark:text-gray-500"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                              }`}
                            >
                              {coupon.code}
                            </code>
                          </div>

                          {/* 복사 버튼 */}
                          <button
                            onClick={() => handleCopy(coupon.code)}
                            disabled={isUsed}
                            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                              isUsed
                                ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                                : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                            }`}
                          >
                            {copiedCode === coupon.code ? (
                              <>
                                <Check className="h-4 w-4" />
                                <span className="hidden sm:inline">복사됨</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                <span className="hidden sm:inline">복사</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* 만료일 */}
                        <div className="mt-3 flex items-center gap-2 border-t pt-3 text-sm">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            만료 없음 (영구 사용 가능)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 하단 안내 (모바일 최적화) */}
      <div className="mt-6 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950/50 sm:mt-8">
        <h3 className="mb-2 font-semibold">📢 쿠폰 사용 방법</h3>
        <ol className="list-inside list-decimal space-y-1 text-sm">
          <li>게임 실행 후 좌측 하단 메뉴 아이콘 클릭</li>
          <li>&apos;설정&apos; 메뉴 진입</li>
          <li>&quot;교환 코드&quot; 메뉴 선택</li>
          <li>복사한 쿠폰 코드 입력 및 교환</li>
        </ol>
      </div>
    </div>
  );
}
