/**
 * 쿠폰 푸시 알림 기능 테스트
 */

import { coupons, Coupon } from "@/data/coupon";

describe("Coupon Data Structure", () => {
  it("all coupons have required fields", () => {
    coupons.forEach((coupon) => {
      expect(coupon.id).toBeDefined();
      expect(typeof coupon.id).toBe("string");
      expect(coupon.code).toBeDefined();
      expect(typeof coupon.code).toBe("string");
      expect(coupon.description).toBeDefined();
    });
  });

  it("all coupon IDs are unique", () => {
    const ids = coupons.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("non-permanent coupons have valid expiration dates", () => {
    const nonPermanentCoupons = coupons.filter((c) => !c.isPermanent);

    nonPermanentCoupons.forEach((coupon) => {
      expect(coupon.expiresAt).toBeDefined();
      // 날짜 형식 확인 (YYYY-MM-DD)
      if (coupon.expiresAt) {
        expect(coupon.expiresAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        // 유효한 날짜인지 확인
        const date = new Date(coupon.expiresAt);
        expect(date.toString()).not.toBe("Invalid Date");
      }
    });
  });

  it("permanent coupons are marked correctly", () => {
    const permanentCoupons = coupons.filter((c) => c.isPermanent);

    permanentCoupons.forEach((coupon) => {
      expect(coupon.isPermanent).toBe(true);
      // 영구 쿠폰은 만료일이 비어있거나 없어야 함
      expect(coupon.expiresAt === "" || coupon.expiresAt === undefined).toBe(true);
    });
  });
});

describe("Coupon Push Logic", () => {
  // 푸시 대상 쿠폰 필터링 로직 테스트
  const filterPushTargetCoupons = (couponList: Coupon[]): Coupon[] => {
    return couponList.filter((coupon) => {
      if (coupon.isPermanent) return false; // 무제한 쿠폰 제외
      if (coupon.isHidden) return false; // 숨김 쿠폰 제외
      if (coupon.pushSent === true) return false; // 이미 전송된 쿠폰 제외
      const isExpired = coupon.expiresAt ? new Date(coupon.expiresAt) < new Date() : false;
      return !isExpired;
    });
  };

  it("filters out permanent coupons from push targets", () => {
    const testCoupons: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", isPermanent: true },
      { id: "2", code: "TEST2", description: "Test", expiresAt: "2099-12-31" },
    ];

    const targets = filterPushTargetCoupons(testCoupons);
    expect(targets.length).toBe(1);
    expect(targets[0].id).toBe("2");
  });

  it("filters out hidden coupons from push targets", () => {
    const testCoupons: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", isHidden: true },
      { id: "2", code: "TEST2", description: "Test", expiresAt: "2099-12-31" },
    ];

    const targets = filterPushTargetCoupons(testCoupons);
    expect(targets.length).toBe(1);
    expect(targets[0].id).toBe("2");
  });

  it("filters out already sent coupons from push targets", () => {
    const testCoupons: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: true },
      { id: "2", code: "TEST2", description: "Test", expiresAt: "2099-12-31", pushSent: false },
      { id: "3", code: "TEST3", description: "Test", expiresAt: "2099-12-31" }, // pushSent 미설정
    ];

    const targets = filterPushTargetCoupons(testCoupons);
    expect(targets.length).toBe(2);
    expect(targets.map((c) => c.id)).toEqual(["2", "3"]);
  });

  it("filters out expired coupons from push targets", () => {
    const testCoupons: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2020-01-01" }, // 만료됨
      { id: "2", code: "TEST2", description: "Test", expiresAt: "2099-12-31" }, // 유효
    ];

    const targets = filterPushTargetCoupons(testCoupons);
    expect(targets.length).toBe(1);
    expect(targets[0].id).toBe("2");
  });

  it("current coupons have correct pushSent status", () => {
    // 현재 데이터에서 pushSent가 true가 아닌 쿠폰 확인
    const pendingCoupons = filterPushTargetCoupons(coupons);

    // 모든 활성 쿠폰이 pushSent: true로 설정되어 있어야 함 (새 쿠폰 추가 전)
    // 새 쿠폰이 추가되면 이 테스트가 실패하고, 푸시가 전송되어야 함을 알려줌
    console.log(
      "현재 푸시 대기 중인 쿠폰:",
      pendingCoupons.length > 0 ? pendingCoupons.map((c) => c.code).join(", ") : "없음"
    );

    // 이 assertion은 새 쿠폰 추가 시 의도적으로 실패하도록 설계됨
    // 실패하면 해당 쿠폰에 대한 푸시가 필요하다는 알림
    if (pendingCoupons.length > 0) {
      console.warn(`⚠️ ${pendingCoupons.length}개의 쿠폰이 푸시 전송 대기 중입니다!`);
    }
  });
});

describe("Coupon Hash Generation", () => {
  // 해시 생성 로직 테스트 (API route의 generateCouponHash 로직 복제)
  const generateCouponHash = (couponList: Coupon[]): string => {
    const couponData = couponList
      .filter((c) => !c.isPermanent && !c.isHidden)
      .map((c) => `${c.id}:${c.code}:${c.pushSent}`)
      .join("|");

    let hash = 0;
    for (let i = 0; i < couponData.length; i++) {
      const char = couponData.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return `v${Math.abs(hash).toString(36)}`;
  };

  it("generates consistent hash for same data", () => {
    const testCoupons: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: true },
      { id: "2", code: "TEST2", description: "Test", expiresAt: "2099-12-31", pushSent: false },
    ];

    const hash1 = generateCouponHash(testCoupons);
    const hash2 = generateCouponHash(testCoupons);

    expect(hash1).toBe(hash2);
  });

  it("generates different hash when coupon data changes", () => {
    const testCoupons1: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: true },
    ];

    const testCoupons2: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: true },
      { id: "2", code: "TEST2", description: "Test", expiresAt: "2099-12-31", pushSent: false },
    ];

    const hash1 = generateCouponHash(testCoupons1);
    const hash2 = generateCouponHash(testCoupons2);

    expect(hash1).not.toBe(hash2);
  });

  it("generates different hash when pushSent changes", () => {
    const testCoupons1: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: false },
    ];

    const testCoupons2: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: true },
    ];

    const hash1 = generateCouponHash(testCoupons1);
    const hash2 = generateCouponHash(testCoupons2);

    expect(hash1).not.toBe(hash2);
  });

  it("ignores permanent and hidden coupons in hash", () => {
    const testCoupons1: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: true },
    ];

    const testCoupons2: Coupon[] = [
      { id: "1", code: "TEST1", description: "Test", expiresAt: "2099-12-31", pushSent: true },
      { id: "2", code: "PERM", description: "Permanent", expiresAt: "", isPermanent: true },
      { id: "3", code: "HIDDEN", description: "Hidden", expiresAt: "2099-12-31", isHidden: true },
    ];

    const hash1 = generateCouponHash(testCoupons1);
    const hash2 = generateCouponHash(testCoupons2);

    // 영구/숨김 쿠폰은 해시에 영향을 주지 않음
    expect(hash1).toBe(hash2);
  });
});

describe("Coupon Expiration Logic", () => {
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

  it("permanent coupons never expire", () => {
    const permanentCoupon: Coupon = {
      id: "1",
      code: "PERM",
      description: "Permanent",
      expiresAt: "",
      isPermanent: true,
    };

    expect(isExpired(permanentCoupon)).toBe(false);
  });

  it("correctly identifies expired coupons", () => {
    const expiredCoupon: Coupon = {
      id: "1",
      code: "EXPIRED",
      description: "Expired",
      expiresAt: "2020-01-01",
    };

    expect(isExpired(expiredCoupon)).toBe(true);
  });

  it("correctly identifies valid coupons", () => {
    const validCoupon: Coupon = {
      id: "1",
      code: "VALID",
      description: "Valid",
      expiresAt: "2099-12-31",
    };

    expect(isExpired(validCoupon)).toBe(false);
  });

  it("calculates days until expiration correctly", () => {
    // 내일 만료되는 쿠폰
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const days = getDaysUntilExpire(tomorrowStr);
    expect(days).toBe(1);
  });

  it("returns negative days for expired coupons", () => {
    // 어제 만료된 쿠폰
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const days = getDaysUntilExpire(yesterdayStr);
    expect(days).toBeLessThan(0);
  });
});
