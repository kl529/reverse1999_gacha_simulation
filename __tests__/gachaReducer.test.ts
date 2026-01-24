import {
  gachaReducer,
  GachaState,
  GachaAction,
  initialGachaState,
  SixStarHistoryEntry,
} from "@/lib/reducers/gachaReducer";
import { mockCharacters } from "./fixtures";

describe("gachaReducer", () => {
  describe("GACHA_PULL 액션", () => {
    it("results, totalPulls, rarityStats, pityCount, pickupGuarantee가 올바르게 업데이트된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        totalPulls: 10,
        rarityStats: { 2: 1, 3: 3, 4: 4, 5: 1, 6: 1 },
      };

      const newResults = [mockCharacters.sixStar[0], mockCharacters.fiveStar[0]];
      const action: GachaAction = {
        type: "GACHA_PULL",
        payload: {
          newResults,
          times: 10,
          newPity: 5,
          newPickupGuarantee: true,
          newStats: { 2: 2, 3: 5, 4: 6, 5: 2, 6: 2 },
        },
      };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.results).toBe(newResults);
      expect(newState.pityCount).toBe(5);
      expect(newState.pickupGuarantee).toBe(true);
      expect(newState.rarityStats).toEqual({ 2: 2, 3: 5, 4: 6, 5: 2, 6: 2 });
    });

    it("totalPulls가 누적된다 (state.totalPulls + action.payload.times)", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        totalPulls: 50,
      };

      const action: GachaAction = {
        type: "GACHA_PULL",
        payload: {
          newResults: [],
          times: 10,
          newPity: 5,
          newPickupGuarantee: false,
          newStats: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        },
      };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.totalPulls).toBe(60); // 50 + 10
    });
  });

  describe("ADD_SIX_STAR_HISTORY 액션", () => {
    it("sixStarHistory 배열 앞에 새 항목이 추가된다", () => {
      // Arrange
      const existingEntry: SixStarHistoryEntry = {
        char: mockCharacters.sixStar[0],
        pullNumber: 30,
      };

      const initialState: GachaState = {
        ...initialGachaState,
        sixStarHistory: [existingEntry],
      };

      const newEntry: SixStarHistoryEntry = {
        char: mockCharacters.sixStar[1],
        pullNumber: 70,
      };

      const action: GachaAction = {
        type: "ADD_SIX_STAR_HISTORY",
        payload: newEntry,
      };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.sixStarHistory.length).toBe(2);
      expect(newState.sixStarHistory[0]).toBe(newEntry); // 새 항목이 첫 번째
      expect(newState.sixStarHistory[1]).toBe(existingEntry); // 기존 항목 유지
    });

    it("기존 항목들이 유지된다", () => {
      // Arrange
      const existingEntries: SixStarHistoryEntry[] = [
        { char: mockCharacters.sixStar[0], pullNumber: 30 },
        { char: mockCharacters.sixStar[1], pullNumber: 60 },
      ];

      const initialState: GachaState = {
        ...initialGachaState,
        sixStarHistory: existingEntries,
      };

      const newEntry: SixStarHistoryEntry = {
        char: mockCharacters.sixStar[2],
        pullNumber: 90,
      };

      const action: GachaAction = {
        type: "ADD_SIX_STAR_HISTORY",
        payload: newEntry,
      };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.sixStarHistory.length).toBe(3);
      expect(newState.sixStarHistory[0]).toBe(newEntry);
      expect(newState.sixStarHistory[1]).toBe(existingEntries[0]);
      expect(newState.sixStarHistory[2]).toBe(existingEntries[1]);
    });
  });

  describe("RESET_ALL 액션", () => {
    it("initialGachaState로 완전히 초기화된다", () => {
      // Arrange
      const modifiedState: GachaState = {
        results: [mockCharacters.sixStar[0]],
        totalPulls: 100,
        rarityStats: { 2: 10, 3: 30, 4: 40, 5: 15, 6: 5 },
        pityCount: 25,
        pickupGuarantee: true,
        sixStarHistory: [{ char: mockCharacters.sixStar[0], pullNumber: 50 }],
        isLeftOpen: true,
        isRightOpen: true,
        isFirstPull: false,
        pickupShape: "star",
        pickupRank: 6,
      };

      const action: GachaAction = { type: "RESET_ALL" };

      // Act
      const newState = gachaReducer(modifiedState, action);

      // Assert
      expect(newState).toEqual(initialGachaState);
      expect(newState.results).toEqual([]);
      expect(newState.totalPulls).toBe(0);
      expect(newState.pityCount).toBe(0);
      expect(newState.pickupGuarantee).toBe(false);
      expect(newState.sixStarHistory).toEqual([]);
      expect(newState.isLeftOpen).toBe(false);
      expect(newState.isRightOpen).toBe(false);
      expect(newState.isFirstPull).toBe(true);
      expect(newState.pickupShape).toBeNull();
      expect(newState.pickupRank).toBeNull();
    });
  });

  describe("TOGGLE_LEFT_SIDEBAR 액션", () => {
    it("isLeftOpen이 false에서 true로 토글된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        isLeftOpen: false,
      };

      const action: GachaAction = { type: "TOGGLE_LEFT_SIDEBAR" };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.isLeftOpen).toBe(true);
    });

    it("isLeftOpen이 true에서 false로 토글된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        isLeftOpen: true,
      };

      const action: GachaAction = { type: "TOGGLE_LEFT_SIDEBAR" };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.isLeftOpen).toBe(false);
    });
  });

  describe("TOGGLE_RIGHT_SIDEBAR 액션", () => {
    it("isRightOpen이 false에서 true로 토글된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        isRightOpen: false,
      };

      const action: GachaAction = { type: "TOGGLE_RIGHT_SIDEBAR" };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.isRightOpen).toBe(true);
    });

    it("isRightOpen이 true에서 false로 토글된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        isRightOpen: true,
      };

      const action: GachaAction = { type: "TOGGLE_RIGHT_SIDEBAR" };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.isRightOpen).toBe(false);
    });
  });

  describe("SET_FIRST_PULL 액션", () => {
    it("isFirstPull이 payload 값 true로 설정된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        isFirstPull: false,
      };

      const action: GachaAction = { type: "SET_FIRST_PULL", payload: true };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.isFirstPull).toBe(true);
    });

    it("isFirstPull이 payload 값 false로 설정된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        isFirstPull: true,
      };

      const action: GachaAction = { type: "SET_FIRST_PULL", payload: false };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.isFirstPull).toBe(false);
    });
  });

  describe("UPDATE_PICKUP_INFO 액션", () => {
    it("pickupShape와 pickupRank가 올바르게 업데이트된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        pickupShape: null,
        pickupRank: null,
      };

      const action: GachaAction = {
        type: "UPDATE_PICKUP_INFO",
        payload: { shape: "star", rank: 6 },
      };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.pickupShape).toBe("star");
      expect(newState.pickupRank).toBe(6);
    });

    it("null 값도 올바르게 처리된다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        pickupShape: "plant",
        pickupRank: 5,
      };

      const action: GachaAction = {
        type: "UPDATE_PICKUP_INFO",
        payload: { shape: null, rank: null },
      };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.pickupShape).toBeNull();
      expect(newState.pickupRank).toBeNull();
    });

    it("pickupRank만 업데이트되고 pickupShape는 null로 유지될 수 있다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        pickupShape: "mineral",
        pickupRank: 5,
      };

      const action: GachaAction = {
        type: "UPDATE_PICKUP_INFO",
        payload: { shape: null, rank: 6 },
      };

      // Act
      const newState = gachaReducer(initialState, action);

      // Assert
      expect(newState.pickupShape).toBeNull();
      expect(newState.pickupRank).toBe(6);
    });
  });

  describe("알 수 없는 액션", () => {
    it("기존 state를 그대로 반환한다", () => {
      // Arrange
      const initialState: GachaState = {
        ...initialGachaState,
        totalPulls: 42,
        pityCount: 15,
      };

      // TypeScript에서 알 수 없는 액션 타입을 테스트하기 위해 타입 캐스팅
      const unknownAction = { type: "UNKNOWN_ACTION" } as unknown as GachaAction;

      // Act
      const newState = gachaReducer(initialState, unknownAction);

      // Assert
      expect(newState).toBe(initialState); // 동일한 참조
      expect(newState.totalPulls).toBe(42);
      expect(newState.pityCount).toBe(15);
    });
  });
});
