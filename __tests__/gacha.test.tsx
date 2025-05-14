import { handleGacha } from "@/components/gacha_simulator/GachaGame"; // 실제 함수 경로로 변경
import { Character } from "@/data/characters";
import { Banner } from "@/data/banners";
describe("Gacha Logic Tests", () => {
  it("70연차 내에 최소 1번은 6성 캐릭터가 나와야 한다", () => {
    const banners = [
      {
        id: "flutter_page_pick_up",
        name: "플러터 페이지 픽업",
        pickup6: {
          name: "플러터 페이지",
          rarity: 6,
          inspiration: "star",
          engName: "flutter-page",
        },
        pickup5: [
          {
            name: "슬라우치 햇",
            rarity: 5,
            inspiration: "mineral",
            engName: "brimley",
          },
        ],
      },
    ];

    // 1) 70회 뽑기 실행
    const results: Character[] = handleGacha(70, banners[0]);

    // 2) 6성이 하나 이상 존재하는지 확인
    const sixStarCount = results.filter((char) => char.rarity === 6).length;

    // 3) 기대 결과: 최소 1개의 6성 존재
    expect(sixStarCount).toBeGreaterThanOrEqual(1);
  });
});
