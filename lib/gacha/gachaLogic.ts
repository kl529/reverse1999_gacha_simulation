import { Character, charactersByRarity } from "@/data/characters";
import { Banner } from "@/data/banners";
import { isIncludedInGachaPool } from "@/data/version";

/**
 * 가챠 풀에 포함될 수 있는 캐릭터인지 확인
 */
export const isValidGachaCharacterForPool = (char: Character): boolean => {
  if (char.exclude_gacha) return false;
  return isIncludedInGachaPool(char.version, char.immediate_standard);
};

/**
 * 6성 확률 계산 (pity 기반)
 * pity < 60: 1.5%
 * pity >= 60: 4% + (pity - 60) * 2.5%, 최대 100%
 */
export const getSixStarRate = (pity: number): number => {
  if (pity < 60) return 1.5;
  return Math.min(4 + (pity - 60) * 2.5, 100);
};

/**
 * 배열에서 랜덤 요소 선택
 */
const getRandomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * 단일 가챠 결과 타입
 */
export interface SinglePullResult {
  character: Character;
  newPity: number;
  newPickupGuarantee: boolean;
  isSixStar: boolean;
}

/**
 * EnrichedBanner: 배너 정보에 캐릭터 객체가 포함된 타입
 */
export interface EnrichedBanner extends Banner {
  pickup6?: Character;
  pickup5?: Character[];
  twoPickup6?: Character[];
}

/**
 * 가챠 상태 인터페이스
 */
export interface GachaPullState {
  pityCount: number;
  pickupGuarantee: boolean;
  isFirstPull?: boolean;
}

/**
 * 단일 뽑기 로직 (일반 픽업 배너용)
 */
export const doSinglePull = (
  banner: EnrichedBanner,
  state: GachaPullState
): SinglePullResult => {
  let localPity = state.pityCount;
  let localPickup = state.pickupGuarantee;

  // 70뽑 초과 -> 즉시 6성 + 픽업 50%
  if (localPity + 1 >= 70) {
    let forcedSix: Character;
    if (localPickup && banner.pickup6) {
      forcedSix = banner.pickup6;
      localPickup = false;
    } else {
      const isPickup = Math.random() < 0.5;
      if (isPickup && banner.pickup6) {
        forcedSix = banner.pickup6;
      } else {
        forcedSix = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacterForPool));
        localPickup = true;
      }
    }
    return {
      character: forcedSix,
      newPity: 0,
      newPickupGuarantee: localPickup,
      isSixStar: true,
    };
  }

  // 확률 기반 뽑기
  const sixStarRate = getSixStarRate(localPity);
  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const rarity of [6, 5, 4, 3, 2]) {
    const prob: { [key: number]: number } = {
      6: sixStarRate,
      5: 8.5,
      4: 40,
      3: 45,
      2: 5,
    };

    cumulative += prob[rarity] ?? 0;
    if (rand < cumulative) {
      // 6성
      if (rarity === 6) {
        let picked: Character;
        if (localPickup && banner.pickup6) {
          picked = banner.pickup6;
          localPickup = false;
        } else {
          const isPickup = Math.random() < 0.5;
          if (isPickup && banner.pickup6) {
            picked = banner.pickup6;
          } else {
            picked = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacterForPool));
            localPickup = true;
          }
        }
        return {
          character: picked,
          newPity: 0,
          newPickupGuarantee: localPickup,
          isSixStar: true,
        };
      }

      // 5성
      if (rarity === 5) {
        let c: Character;
        if (banner.pickup5 && banner.pickup5.length > 0) {
          const isPickup = Math.random() < 0.5;
          c = isPickup
            ? getRandomFrom(banner.pickup5)
            : getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacterForPool));
        } else {
          c = getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacterForPool));
        }
        return {
          character: c,
          newPity: localPity + 1,
          newPickupGuarantee: localPickup,
          isSixStar: false,
        };
      }

      // 4성 이하
      const c = getRandomFrom(charactersByRarity[rarity].filter(isValidGachaCharacterForPool));
      return {
        character: c,
        newPity: localPity + 1,
        newPickupGuarantee: localPickup,
        isSixStar: false,
      };
    }
  }

  // 혹시 확률 못찾으면 2성
  return {
    character: charactersByRarity[2][0],
    newPity: localPity + 1,
    newPickupGuarantee: localPickup,
    isSixStar: false,
  };
};

/**
 * 2중 픽업 배너용 단일 뽑기 로직
 */
export const doSinglePullDoublePick = (
  banner: EnrichedBanner,
  state: GachaPullState
): SinglePullResult => {
  let localPity = state.pityCount;
  let localPickup = state.pickupGuarantee;

  const getDoublePickSix = (): { char: Character; isPickup: boolean } => {
    if (!banner.twoPickup6 || banner.twoPickup6.length < 2) {
      const fallback = getRandomFrom(charactersByRarity[6].filter(isValidGachaCharacterForPool));
      return { char: fallback, isPickup: false };
    }

    const [pickupA, pickupB] = banner.twoPickup6;
    const other6stars = charactersByRarity[6].filter(
      (c) =>
        c.engName !== pickupA.engName &&
        c.engName !== pickupB.engName &&
        isValidGachaCharacterForPool(c)
    );

    // localPickup=true => 무조건 2명 중 1명
    if (localPickup) {
      const guar = getRandomFrom([pickupA, pickupB]);
      return { char: guar, isPickup: true };
    }

    // localPickup=false => 70% 확률로 (pickupA or pickupB), 30%로 other
    const chance = Math.random() * 100;
    if (chance < 70) {
      const pickUp = getRandomFrom([pickupA, pickupB]);
      return { char: pickUp, isPickup: true };
    } else {
      const out = getRandomFrom(other6stars);
      return { char: out, isPickup: false };
    }
  };

  // 70회 초과 -> 확정 6성
  if (localPity + 1 >= 70) {
    const { char, isPickup } = getDoublePickSix();
    return {
      character: char,
      newPity: 0,
      newPickupGuarantee: !isPickup,
      isSixStar: true,
    };
  }

  // 확률 기반 뽑기
  const sixRate = getSixStarRate(localPity);
  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const rarity of [6, 5, 4, 3, 2]) {
    const prob: { [key: number]: number } = {
      6: sixRate,
      5: 8.5,
      4: 40,
      3: 45,
      2: 5,
    };

    cumulative += prob[rarity] ?? 0;
    if (rand < cumulative) {
      // 6성
      if (rarity === 6) {
        const { char, isPickup } = getDoublePickSix();
        return {
          character: char,
          newPity: 0,
          newPickupGuarantee: !isPickup,
          isSixStar: true,
        };
      }

      // 5성
      if (rarity === 5) {
        const c = getRandomFrom(charactersByRarity[5].filter(isValidGachaCharacterForPool));
        return {
          character: c,
          newPity: localPity + 1,
          newPickupGuarantee: localPickup,
          isSixStar: false,
        };
      }

      // 4성 이하
      const c = getRandomFrom(charactersByRarity[rarity].filter(isValidGachaCharacterForPool));
      return {
        character: c,
        newPity: localPity + 1,
        newPickupGuarantee: localPickup,
        isSixStar: false,
      };
    }
  }

  // 혹시 확률 못찾으면 2성
  return {
    character: charactersByRarity[2][0],
    newPity: localPity + 1,
    newPickupGuarantee: localPickup,
    isSixStar: false,
  };
};

/**
 * n회 가챠 실행 (순수 함수 - React 상태 의존성 제거)
 * @param times 뽑기 횟수
 * @param banner 배너 정보
 * @param initialState 초기 상태
 * @returns 뽑힌 캐릭터 배열
 */
export const calculateGachaPull = (
  times: number,
  banner: EnrichedBanner,
  initialState: GachaPullState = { pityCount: 0, pickupGuarantee: false, isFirstPull: false }
): Character[] => {
  let localPity = initialState.pityCount;
  let localPickup = initialState.pickupGuarantee;

  const results: Character[] = [];

  for (let i = 0; i < times; i++) {
    let result: SinglePullResult;

    if (banner.bannerType === "doublePick") {
      result = doSinglePullDoublePick(banner, {
        pityCount: localPity,
        pickupGuarantee: localPickup,
      });
    } else {
      result = doSinglePull(banner, {
        pityCount: localPity,
        pickupGuarantee: localPickup,
      });
    }

    results.push(result.character);
    localPity = result.newPity;
    localPickup = result.newPickupGuarantee;
  }

  return results;
};
