/**
 * CDN 이미지 URL 헬퍼
 *
 * Cloudflare R2 또는 로컬 public 폴더에서 이미지 로드
 * 환경 변수 NEXT_PUBLIC_CDN_URL로 제어
 */

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

/**
 * CDN 또는 로컬 이미지 URL 반환
 * @param path - public/ 기준 상대 경로 (예: "infos/character_skin/illust/xxx.webp")
 * @returns 전체 이미지 URL
 *
 * @example
 * getCdnUrl('infos/character_skin/illust/test.webp')
 * // CDN 있음: https://reverse1999-assets.r2.dev/infos/character_skin/illust/test.webp
 * // CDN 없음: /infos/character_skin/illust/test.webp
 */
export function getCdnUrl(path: string): string {
  // 앞의 슬래시 제거
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  if (CDN_URL) {
    // CDN URL이 설정되어 있으면 CDN 사용
    const baseUrl = CDN_URL.endsWith("/") ? CDN_URL.slice(0, -1) : CDN_URL;
    return `${baseUrl}/${cleanPath}`;
  }

  // CDN이 없으면 로컬 public 폴더 사용
  return `/${cleanPath}`;
}

/**
 * 캐릭터 스킨 일러스트 URL
 * @param filename - 파일명 (예: "xxx.webp")
 */
export function getSkinIllustUrl(filename: string): string {
  return getCdnUrl(`infos/character_skin/illust/${filename}`);
}

/**
 * 캐릭터 스킨 리스트 이미지 URL
 * @param filename - 파일명 (예: "xxx.webp")
 */
export function getSkinListUrl(filename: string): string {
  return getCdnUrl(`infos/character_skin/list/${filename}`);
}

/**
 * 배너 이미지 URL
 * @param filename - 파일명
 */
export function getBannerUrl(filename: string): string {
  return getCdnUrl(`infos/banner_img/${filename}`);
}

/**
 * 캐릭터 이미지 URL
 * @param rarity - 레어도 (2stars, 3stars, 4stars, 5stars, 6stars)
 * @param filename - 파일명
 * @param isSmall - 작은 이미지 여부 (선택)
 */
export function getCharacterUrl(rarity: string, filename: string, isSmall?: boolean): string {
  const rarityPath = isSmall ? `${rarity}_small` : rarity;
  return getCdnUrl(`characters/${rarityPath}/${filename}`);
}

/**
 * 홈 화면 이미지 URL
 * @param filename - 파일명
 */
export function getHomeUrl(filename: string): string {
  return getCdnUrl(`infos/home/${filename}`);
}

/**
 * 일반 인포 이미지 URL
 * @param category - 카테고리 (예: "materials", "psycube_img" 등)
 * @param filename - 파일명
 */
export function getInfoUrl(category: string, filename: string): string {
  return getCdnUrl(`infos/${category}/${filename}`);
}
