/**
 * 새 쿠폰 체크 유틸리티
 * 서버 측에서 시간 간격을 제어하므로 클라이언트에서는 조용하게 호출만 합니다.
 */

let isChecking = false;

export async function checkNewCouponsQuietly() {
  // 이미 체크 중이면 스킵
  if (isChecking) {
    return;
  }

  isChecking = true;

  try {
    const response = await fetch("/api/check-new-coupons", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("❌ 쿠폰 체크 실패:", response.statusText);
      return;
    }

    const data = await response.json();

    // 새 쿠폰이 실제로 전송된 경우에만 로그 출력
    if (data.sentCount > 0) {
      console.log(`🎁 새 쿠폰 ${data.sentCount}개가 등록되었습니다!`);
    }
  } catch {
    // 네트워크 오류 등은 무시 (조용히 실패)
  } finally {
    isChecking = false;
  }
}
