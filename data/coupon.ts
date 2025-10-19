export type Coupon = {
  id: string; // 고유 ID (푸시 알림 중복 방지용)
  code: string; // 쿠폰 코드
  description: string; // 쿠폰 설명
  expiresAt: string; // 만료일 (YYYY-MM-DD 형식)
  pushSent?: boolean; // 푸시 전송 여부 (true: 전송됨, false/생략: 전송 안 됨)
  isPermanent?: boolean; // 무제한 쿠폰 여부 (true: 만료일 없음, 푸시 전송 안 함)
};

/**
 * 현재 사용 가능한 쿠폰 목록
 *
 * 🔔 푸시 알림 전송 방법 (서버 메모리 캐싱):
 * 1. 새 쿠폰 추가 시 pushSent를 생략하거나 false로 설정
 * 2. 배포 후 첫 번째 사용자가 쿠폰 페이지 접속 → 자동으로 pushSent가 false인 쿠폰만 푸시 전송
 * 3. 푸시 전송 후 서버 메모리에 기록 → 재배포 전까지 중복 전송 방지
 * 4. 푸시 전송 확인 후 해당 쿠폰에 pushSent: true 추가
 * 5. 다시 커밋 & 배포 (새 배포 사이클에서도 중복 전송 방지)
 *
 * 💡 작동 원리:
 * - 서버 메모리에 전송 완료된 쿠폰 ID를 저장 (재배포 시 초기화)
 * - 한 배포 사이클 내에서는 여러 사용자가 접속해도 푸시는 1번만 전송됨
 * - pushSent: true로 설정하면 재배포 후에도 푸시 전송 안 함
 *
 * 🎁 무제한 쿠폰 (isPermanent: true):
 * - 만료일이 없는 영구 사용 가능 쿠폰
 * - 푸시 알림이 자동으로 전송되지 않음
 * - 쿠폰 페이지에서 "만료 없음" 표시
 *
 * ⚠️ 주의사항:
 * - 쿠폰 id는 반드시 고유해야 합니다
 * - pushSent: true인 쿠폰은 절대 푸시가 전송되지 않습니다
 * - isPermanent: true인 쿠폰은 푸시가 전송되지 않습니다
 * - 재전송이 필요하면 pushSent: false로 변경하세요
 */
export const coupons: Coupon[] = [
  // 기간 제한 쿠폰
  {
    id: "7",
    code: "신화를찾는젊은이",
    description: "2주년 기념 쿠폰",
    expiresAt: "2025-10-30",
    pushSent: false,
  },
  {
    id: "8",
    code: "길을잃은방황자",
    description: "2주년 기념 쿠폰",
    expiresAt: "2025-10-30",
    pushSent: true,
  },
  {
    id: "9",
    code: "리버스2주년축하합니다!",
    description: "2주년 기념 쿠폰",
    expiresAt: "2025-10-30",
    pushSent: true,
  },
  // 무제한 쿠폰 (영구 사용 가능)
  {
    id: "1",
    code: "리버스1999Youtube",
    description: "오픈 쿠폰",
    expiresAt: "", // 무제한 쿠폰은 만료일 표시 안 함
    isPermanent: true, // 무제한 쿠폰 (푸시 전송 안 함)
  },
  {
    id: "2",
    code: "reverseculture",
    description: "오픈 쿠폰",
    expiresAt: "",
    isPermanent: true,
  },
  {
    id: "3",
    code: "yyy1999ccc",
    description: "오픈 쿠폰",
    expiresAt: "",
    isPermanent: true,
  },
  {
    id: "4",
    code: "grandopen1999",
    description: "오픈 쿠폰",
    expiresAt: "",
    isPermanent: true,
  },
  {
    id: "5",
    code: "1999gift",
    description: "오픈 쿠폰",
    expiresAt: "",
    isPermanent: true,
  },
  {
    id: "6",
    code: "gift4u",
    description: "오픈 쿠폰",
    expiresAt: "",
    isPermanent: true,
  },
];
