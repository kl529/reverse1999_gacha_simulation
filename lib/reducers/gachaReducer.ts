import { Character } from "@/data/characters";

/**
 * 가챠 시뮬레이터 상태 타입
 */
export interface GachaState {
  results: Character[];
  totalPulls: number;
  rarityStats: { [key: number]: number };
  pityCount: number;
  pickupGuarantee: boolean;
  sixStarHistory: SixStarHistoryEntry[];
  isLeftOpen: boolean;
  isRightOpen: boolean;
  isFirstPull: boolean;
  pickupShape: string | null;
  pickupRank: number | null;
}

export interface SixStarHistoryEntry {
  char: Character;
  pullNumber: number;
}

/**
 * 가챠 액션 타입
 */
export type GachaAction =
  | { type: "GACHA_PULL"; payload: { newResults: Character[]; times: number; newPity: number; newPickupGuarantee: boolean; newStats: { [key: number]: number } } }
  | { type: "ADD_SIX_STAR_HISTORY"; payload: SixStarHistoryEntry }
  | { type: "RESET_ALL" }
  | { type: "TOGGLE_LEFT_SIDEBAR" }
  | { type: "TOGGLE_RIGHT_SIDEBAR" }
  | { type: "SET_FIRST_PULL"; payload: boolean }
  | { type: "UPDATE_PICKUP_INFO"; payload: { shape: string | null; rank: number | null } };

/**
 * 초기 상태
 */
export const initialGachaState: GachaState = {
  results: [],
  totalPulls: 0,
  rarityStats: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  pityCount: 0,
  pickupGuarantee: false,
  sixStarHistory: [],
  isLeftOpen: false,
  isRightOpen: false,
  isFirstPull: true,
  pickupShape: null,
  pickupRank: null,
};

/**
 * 가챠 리듀서
 */
export function gachaReducer(state: GachaState, action: GachaAction): GachaState {
  switch (action.type) {
    case "GACHA_PULL":
      return {
        ...state,
        results: action.payload.newResults,
        totalPulls: state.totalPulls + action.payload.times,
        rarityStats: action.payload.newStats,
        pityCount: action.payload.newPity,
        pickupGuarantee: action.payload.newPickupGuarantee,
      };

    case "ADD_SIX_STAR_HISTORY":
      return {
        ...state,
        sixStarHistory: [action.payload, ...state.sixStarHistory],
      };

    case "RESET_ALL":
      return initialGachaState;

    case "TOGGLE_LEFT_SIDEBAR":
      return {
        ...state,
        isLeftOpen: !state.isLeftOpen,
      };

    case "TOGGLE_RIGHT_SIDEBAR":
      return {
        ...state,
        isRightOpen: !state.isRightOpen,
      };

    case "SET_FIRST_PULL":
      return {
        ...state,
        isFirstPull: action.payload,
      };

    case "UPDATE_PICKUP_INFO":
      return {
        ...state,
        pickupShape: action.payload.shape,
        pickupRank: action.payload.rank,
      };

    default:
      return state;
  }
}
