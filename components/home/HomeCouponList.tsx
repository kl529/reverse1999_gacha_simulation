"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { coupons } from "@/data/coupon";
import { Card } from "@/components/ui/card";

// 사용 가능한 쿠폰 필터링 (만료되지 않고, 숨김이 아니고, 영구 쿠폰이 아닌 것)
function getActiveCoupons() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return coupons.filter((coupon) => {
    if (coupon.isHidden) return false;
    if (coupon.isPermanent) return false; // 영구 쿠폰 제외

    const expiresAt = new Date(coupon.expiresAt);
    return expiresAt >= today;
  });
}

export default function HomeCouponList() {
  const activeCoupons = getActiveCoupons();
  const t = useTranslations("coupon");
  const tCommon = useTranslations("common");

  if (activeCoupons.length === 0) {
    return null;
  }

  // 최대 3개까지만 표시
  const displayCoupons = activeCoupons.slice(0, 3);
  const hasMore = activeCoupons.length > 3;

  return (
    <Card className="flex h-full flex-col bg-gray-900/80 p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between sm:mb-3">
        <h3 className="text-base font-bold text-white sm:text-lg">{t("availableCoupons")}</h3>
        <Link
          href="/coupon"
          className="text-xs text-blue-400 hover:text-blue-300 hover:underline sm:text-sm"
        >
          {tCommon("viewAll")}
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
        {displayCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className="flex items-center justify-between rounded-lg bg-gray-800/60 px-2 py-1.5 sm:px-3 sm:py-2"
          >
            <div className="min-w-0 flex-1">
              <code className="block truncate text-xs font-semibold text-yellow-300 sm:text-sm">
                {coupon.code}
              </code>
              <span className="text-[10px] text-gray-400 sm:text-xs">{coupon.description}</span>
            </div>
            {coupon.expiresAt && (
              <span className="ml-2 shrink-0 text-[10px] text-gray-500 sm:text-xs">
                ~{coupon.expiresAt.slice(5).replace("-", "/")}
              </span>
            )}
          </div>
        ))}

        {hasMore && (
          <div className="mt-1 text-center text-[10px] text-gray-500 sm:text-xs">
            {tCommon("moreItems", { count: activeCoupons.length - 3 })}
          </div>
        )}
      </div>
    </Card>
  );
}
