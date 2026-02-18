"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { coupons, Coupon } from "@/data/coupon";
import { Copy, Check, Calendar, CheckCircle2, Circle, Bell } from "lucide-react";
import toast from "react-hot-toast";

const USED_COUPONS_KEY = "reverse1999_used_coupons";

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
    console.error("쿠폰 알림 체크 실패:", error);
  }
}

export default function CouponsPage() {
  const t = useTranslations("couponPage");
  const [usedCoupons, setUsedCoupons] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showNotificationButton, setShowNotificationButton] = useState(false);

  const triggerNewCouponCheck = useCallback(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        checkAndSendNewCouponNotifications();
      }, 2000);
    }
  }, []);

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
      const fcmToken = localStorage.getItem("fcm_token");
      const dismissed = localStorage.getItem("notification_dismissed");
      if (!fcmToken && dismissed === "true") {
        setShowNotificationButton(true);
      }
    } catch {
      // localStorage 접근 실패 시 무시
    }

    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === "COPY_COUPON") {
        const couponCode = event.data.couponCode;
        navigator.clipboard
          .writeText(couponCode)
          .then(() => {
            toast.success(t("codeCopied", { code: couponCode }));
          })
          .catch(() => {
            toast.error(t("copyFailed"));
          });
      }
    };

    navigator.serviceWorker?.addEventListener("message", handleServiceWorkerMessage);

    triggerNewCouponCheck();

    return () => {
      navigator.serviceWorker?.removeEventListener("message", handleServiceWorkerMessage);
    };
  }, [triggerNewCouponCheck, t]);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(t("codeCopied", { code }));
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      toast.error(t("copyFailed"));
    }
  };

  const handleToggleUsed = (couponId: string) => {
    const newUsedCoupons = usedCoupons.includes(couponId)
      ? usedCoupons.filter((id) => id !== couponId)
      : [...usedCoupons, couponId];

    setUsedCoupons(newUsedCoupons);
    localStorage.setItem(USED_COUPONS_KEY, JSON.stringify(newUsedCoupons));

    if (newUsedCoupons.includes(couponId)) {
      toast.success(t("markedDone"));
    } else {
      toast(t("unmarkedDone"));
    }
  };

  const isExpired = (coupon: Coupon): boolean => {
    if (coupon.isPermanent) return false;
    if (!coupon.expiresAt) return false;
    const expireDate = new Date(coupon.expiresAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return expireDate < today;
  };

  const getDaysUntilExpire = (expiresAt: string): number => {
    const expireDate = new Date(expiresAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expireDate.setHours(0, 0, 0, 0);
    const diff = expireDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleEnableNotifications = () => {
    localStorage.removeItem("notification_dismissed");
    setShowNotificationButton(false);
    toast.success(t("notifRefresh"));
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const allActiveCoupons = coupons.filter((coupon) => !isExpired(coupon) && !coupon.isHidden);

  const regularCoupons = allActiveCoupons
    .filter((coupon) => !coupon.isPermanent)
    .sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());

  const permanentCoupons = allActiveCoupons.filter((coupon) => coupon.isPermanent);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold">{t("title")}</h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        {t("subtitle")}
        <br />
        {t("subtitleNote")}
      </p>

      {showNotificationButton && (
        <div className="mb-4 flex justify-center">
          <button
            onClick={handleEnableNotifications}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            aria-label={t("notifLabel")}
          >
            <Bell className="h-4 w-4" />
            <span>{t("enableNotif")}</span>
          </button>
        </div>
      )}

      {allActiveCoupons.length > 0 && (
        <div className="mb-6 rounded-lg border bg-card p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {t("usageStatus")}{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {usedCoupons.filter((id) => allActiveCoupons.some((c) => c.id === id)).length}
            </span>{" "}
            / {allActiveCoupons.length}
          </p>
        </div>
      )}

      {allActiveCoupons.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center shadow-sm sm:p-8">
          <p className="text-lg">{t("noCoupons")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("noCouponsSub")}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {regularCoupons.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">{t("timedCoupons")}</h2>
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
                      {!coupon.pushSent && !isUsed && (
                        <div className="absolute -right-2 -top-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
                          <span className="text-xs font-bold text-white">NEW</span>
                        </div>
                      )}

                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-1 items-center gap-3">
                            <button
                              onClick={() => handleToggleUsed(coupon.id)}
                              className="flex-shrink-0 transition-colors hover:scale-110"
                              aria-label={isUsed ? t("unmarkUsed") : t("markUsed")}
                            >
                              {isUsed ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                              ) : (
                                <Circle className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                              )}
                            </button>

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
                                <span className="hidden sm:inline">{t("copied")}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                <span className="hidden sm:inline">{t("copy")}</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-2 border-t pt-3 text-sm">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          {coupon.isPermanent ? (
                            <span className="font-semibold text-purple-600 dark:text-purple-400">
                              {t("noExpiry")}
                            </span>
                          ) : (
                            <span
                              className={`${
                                isExpiringSoon
                                  ? "font-semibold text-red-600 dark:text-red-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {t("expiresAt", { date: coupon.expiresAt })}
                              {isExpiringSoon && ` ${t("daysLeft", { days: daysLeft })}`}
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

          {permanentCoupons.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold">{t("permanentCoupons")}</h2>
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
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-1 items-center gap-3">
                            <button
                              onClick={() => handleToggleUsed(coupon.id)}
                              className="flex-shrink-0 transition-colors hover:scale-110"
                              aria-label={isUsed ? t("unmarkUsed") : t("markUsed")}
                            >
                              {isUsed ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                              ) : (
                                <Circle className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                              )}
                            </button>

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
                                <span className="hidden sm:inline">{t("copied")}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                <span className="hidden sm:inline">{t("copy")}</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-2 border-t pt-3 text-sm">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            {t("noExpiry")}
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

      <div className="mt-6 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950/50 sm:mt-8">
        <h3 className="mb-2 font-semibold">{t("howToUse")}</h3>
        <ol className="list-inside list-decimal space-y-1 text-sm">
          <li>{t("step1")}</li>
          <li>{t("step2")}</li>
          <li>{t("step3")}</li>
          <li>{t("step4")}</li>
        </ol>
      </div>
    </div>
  );
}
