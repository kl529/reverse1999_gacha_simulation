/**
 * CharacterDetail 컴포넌트 테스트
 *
 * 캐릭터 상세 정보 렌더링을 테스트합니다.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterDetail from "@/components/character/CharacterDetail";
import { charactersByRarity } from "@/data/characters";
import { characterGuideList } from "@/data/character_guide";
import { recommendTeams } from "@/data/recommend_team";
import { resonanceMaterialList } from "@/data/resonance_material";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock @/lib/cdn
jest.mock("@/lib/cdn", () => ({
  getCdnUrl: (path: string) => `/mock-cdn/${path}`,
  getCharacterUrl: (rarity: string, filename: string) =>
    `/characters/${rarity}/${filename}`,
}));

// Suppress console errors from window.scrollIntoView
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("CharacterDetail 컴포넌트", () => {
  // 테스트용 캐릭터 가져오기
  const druvis = charactersByRarity[6].find((c) => c.id === 1)!;
  const lilya = charactersByRarity[6].find((c) => c.id === 2)!;

  describe("기본 렌더링", () => {
    it("가이드가 있는 캐릭터의 경고 문구가 표시되어야 한다", () => {
      render(<CharacterDetail character={druvis} />);

      expect(
        screen.getByText(/모든 정보는 정답이 아니며/)
      ).toBeInTheDocument();
    });

    it("가이드가 있는 캐릭터의 키워드 배지가 표시되어야 한다", () => {
      const guide = characterGuideList.find((g) => g.character_id === druvis.id);

      if (guide?.keywords && guide.keywords.length > 0) {
        render(<CharacterDetail character={druvis} />);

        // 간단 소개 섹션이 표시되어야 함
        expect(screen.getByText("간단 소개")).toBeInTheDocument();

        // 첫 번째 키워드가 표시되어야 함
        expect(screen.getByText(guide.keywords[0])).toBeInTheDocument();
      }
    });
  });

  describe("가이드 정보 표시", () => {
    it("형상 효율 정리 섹션이 표시되어야 한다", () => {
      const guide = characterGuideList.find((g) => g.character_id === druvis.id);

      if (guide?.portrait_info) {
        render(<CharacterDetail character={druvis} />);

        // 형상 효율 정리가 버튼과 제목 둘 다 존재
        const elements = screen.getAllByText("형상 효율 정리");
        expect(elements.length).toBeGreaterThanOrEqual(2);
        // 형상 버튼도 표시되어야 함
        expect(screen.getByRole("button", { name: "형상 효율 정리" })).toBeInTheDocument();
      }
    });

    it("가이드 영상 섹션이 있는 캐릭터에서 표시되어야 한다", () => {
      const guide = characterGuideList.find((g) => g.character_id === druvis.id);

      if (guide?.youtube_links && guide.youtube_links.length > 0) {
        render(<CharacterDetail character={druvis} />);

        // 가이드 영상이 버튼과 제목 둘 다 존재
        const elements = screen.getAllByText("가이드 영상");
        expect(elements.length).toBeGreaterThanOrEqual(2);
        expect(screen.getByRole("button", { name: "가이드 영상" })).toBeInTheDocument();
      }
    });

    it("형상 효율 테이블 헤더가 올바르게 표시되어야 한다", () => {
      const guide = characterGuideList.find((g) => g.character_id === druvis.id);

      if (guide?.portrait_info?.headers) {
        render(<CharacterDetail character={druvis} />);

        // 테이블 헤더 확인
        guide.portrait_info.headers.forEach((header) => {
          expect(screen.getByText(header)).toBeInTheDocument();
        });
      }
    });
  });

  describe("추천팀 표시", () => {
    it("추천팀이 있는 캐릭터에서 사용 조합 목록 섹션이 표시되어야 한다", () => {
      // 추천팀에 포함된 캐릭터 찾기
      const characterWithTeam = charactersByRarity[6].find((char) =>
        recommendTeams.some((team) =>
          team.characters.some(
            (c) =>
              c.id === char.id ||
              c.alternatives?.some((alt) => alt.id === char.id)
          )
        )
      );

      if (characterWithTeam) {
        render(<CharacterDetail character={characterWithTeam} />);

        // 사용 조합 목록이 버튼과 제목 둘 다 존재
        const elements = screen.getAllByText("사용 조합 목록");
        expect(elements.length).toBeGreaterThanOrEqual(2);
        expect(screen.getByRole("button", { name: "사용 조합 목록" })).toBeInTheDocument();
      }
    });

    it("전체 추천 조합 보기 링크가 표시되어야 한다", () => {
      // 추천팀에 포함된 캐릭터 찾기
      const characterWithTeam = charactersByRarity[6].find((char) =>
        recommendTeams.some((team) =>
          team.characters.some(
            (c) =>
              c.id === char.id ||
              c.alternatives?.some((alt) => alt.id === char.id)
          )
        )
      );

      if (characterWithTeam) {
        render(<CharacterDetail character={characterWithTeam} />);

        const link = screen.getByRole("link", { name: "전체 추천 조합 보기" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/recommend_team");
      }
    });
  });

  describe("육성 재료 표시", () => {
    it("육성 데이터가 있는 캐릭터에서 육성재화 계산기 버튼이 표시되어야 한다", () => {
      const characterWithGrowth = charactersByRarity[6].find((char) =>
        resonanceMaterialList.some((m) => m.character_id === char.id)
      );

      if (characterWithGrowth) {
        render(<CharacterDetail character={characterWithGrowth} />);

        expect(
          screen.getByRole("button", { name: "육성재화 계산기" })
        ).toBeInTheDocument();
      }
    });

    it("드루비스는 레조넌스 재료가 있어 육성 탭이 표시되어야 한다", () => {
      const hasResonance = resonanceMaterialList.some(
        (m) => m.character_id === druvis.id
      );

      render(<CharacterDetail character={druvis} />);

      if (hasResonance) {
        expect(
          screen.getByRole("button", { name: "육성재화 계산기" })
        ).toBeInTheDocument();
      }
    });
  });

  describe("버전 정보 표시", () => {
    it("추천팀 캐릭터 카드에 버전이 표시되어야 한다", () => {
      // 추천팀에 포함된 캐릭터 찾기
      const characterWithTeam = charactersByRarity[6].find((char) =>
        recommendTeams.some((team) =>
          team.characters.some((c) => c.id === char.id)
        )
      );

      if (characterWithTeam) {
        render(<CharacterDetail character={characterWithTeam} />);

        // 버전 번호가 어딘가에 표시되어야 함
        // getDisplayVersion은 "2.75" -> "콜라보"로 변환하지만, 다른 버전은 그대로 표시
        // 일반적인 버전 표시 확인
        const versionElements = screen.getAllByText(/^\d+\.\d+$/);
        expect(versionElements.length).toBeGreaterThan(0);
      }
    });
  });
});
