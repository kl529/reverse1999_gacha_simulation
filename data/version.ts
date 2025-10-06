export interface VersionInfo {
  version: string;
  displayName?: string;
  isCollab: boolean;
}

// 게임의 모든 버전 목록 (오름차순 정렬)
export const versionList = [
  "1.0",
  "1.1",
  "1.2",
  "1.3",
  "1.4",
  "1.5",
  "1.6",
  "1.7",
  "1.8",
  "1.9",
  "2.0",
  "2.1",
  "2.2",
  "2.3",
  "2.4",
  "2.5",
  "2.6",
  "2.7",
  "2.75",
  "2.8",
  "3.0",
  "3.1",
  "3.2",
];

// 현재 게임 버전
export const version: string = "2.8";

// 버전별 특별 정보
export const versionInfoMap: Record<string, VersionInfo> = {
  "2.75": {
    version: "2.75",
    displayName: "콜라보",
    isCollab: true,
  },
};

/**
 * 버전이 콜라보 버전인지 확인
 */
export const isCollabVersion = (ver: string): boolean => {
  return versionInfoMap[ver]?.isCollab || false;
};

/**
 * 버전의 표시 이름을 가져옴
 * - 콜라보 버전인 경우 "콜라보"로 표시
 * - 특별한 표시 이름이 있는 경우 해당 이름으로 표시
 * - 그 외의 경우 버전 번호 그대로 표시
 */
export const getDisplayVersion = (ver: string): string => {
  return versionInfoMap[ver]?.displayName || ver;
};

/**
 * 버전을 비교하여 정렬 순서를 반환
 * 메이저.마이너 버전 형식을 따름
 */
export const compareVersions = (a: string, b: string): number => {
  const [aMajor, aMinor] = a.split(".").map(Number);
  const [bMajor, bMinor] = b.split(".").map(Number);
  return aMajor !== bMajor ? aMajor - bMajor : aMinor - bMinor;
};

/**
 * 주어진 버전이 현재 버전보다 이전 버전인지 확인
 */
export const isOlderVersion = (ver: string): boolean => {
  return compareVersions(ver, version) < 0;
};

/**
 * 주어진 버전이 현재 버전보다 이후 버전인지 확인
 */
export const isNewerVersion = (ver: string): boolean => {
  return compareVersions(ver, version) > 0;
};

/**
 * 특정 버전이 가챠 풀에 포함될 수 있는지 확인
 * - 현재 버전으로부터 3개 이전 버전까지 포함
 * - 예: 현재 3.0 -> 2.7까지 포함
 *      현재 2.8 -> 2.6까지 포함
 *      현재 2.75 -> 2.5까지 포함
 */
export const isIncludedInGachaPool = (targetVersion: string): boolean => {
  const currentVer = version;
  const currentIdx = versionList.indexOf(currentVer);

  if (currentIdx === -1) {
    console.error(`현재 버전 ${currentVer}이 버전 목록에 없습니다.`);
    return false;
  }

  const targetIdx = versionList.indexOf(targetVersion);
  if (targetIdx === -1) {
    console.error(`대상 버전 ${targetVersion}이 버전 목록에 없습니다.`);
    return false;
  }

  // 현재 버전에 따른 cutoff 버전 결정
  let cutoffVersion: string;
  if (currentVer === "2.75") {
    cutoffVersion = "2.5";
  } else if (currentVer === "2.8") {
    cutoffVersion = "2.6";
  } else if (currentVer === "3.0") {
    cutoffVersion = "2.7";
  } else {
    // 기본적으로 3개 이전 버전까지
    const cutoffIdx = Math.max(0, currentIdx - 3);
    cutoffVersion = versionList[cutoffIdx];
  }

  // 대상 버전이 1.0과 cutoff 버전 사이에 있는지 확인
  return (
    compareVersions(targetVersion, "1.0") >= 0 && compareVersions(targetVersion, cutoffVersion) <= 0
  );
};
