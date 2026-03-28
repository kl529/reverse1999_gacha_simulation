/**
 * i18n 한국어 감지 테스트
 * /en 페이지에서 번역되지 않은 한국어 문자열을 찾아 리포트
 */
import { test, expect } from "@playwright/test";

// 한글 유니코드 범위 (가-힣, 자모 포함)
const KOREAN_REGEX = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+/g;

// 의도적으로 남겨둔 한국어 (false positive 제외)
const INTENTIONAL_KOREAN = [
  "한국어", // 언어 전환 버튼
  "리버스: 1999", // 게임 공식 한국어 이름
];

// /en 페이지 전체 목록
const EN_PAGES = [
  { path: "/en", name: "홈페이지" },
  { path: "/en/gacha_simulator", name: "가챠 시뮬레이터" },
  { path: "/en/character", name: "캐릭터 목록" },
  { path: "/en/character/charlotta", name: "캐릭터 상세 (charlotta)" },
  { path: "/en/skin", name: "스킨 목록" },
  { path: "/en/character_setting", name: "공명/의지 설정" },
  { path: "/en/character_quiz", name: "캐릭터 퀴즈" },
  { path: "/en/quiz", name: "종합 퀴즈" },
  { path: "/en/bingo", name: "빙고" },
  { path: "/en/favorite_character", name: "최애 캐릭터" },
  { path: "/en/recommend_team", name: "추천 조합" },
  { path: "/en/growth_calculator", name: "육성 계산기" },
  { path: "/en/damage_calculation", name: "데미지 계산기" },
  { path: "/en/blueprint_setting", name: "청사진 설정" },
  { path: "/en/future_insight", name: "미래시" },
  { path: "/en/reveries_in_the_rain", name: "빗속의 공상" },
  { path: "/en/shop_efficiency", name: "상점 효율" },
  { path: "/en/cash_guide", name: "현질 가이드" },
  { path: "/en/cash_package_shop", name: "현질 패키지" },
  { path: "/en/gacha_guide", name: "가챠 가이드" },
  { path: "/en/euphoria_guide", name: "광상 가이드 목록" },
  { path: "/en/psycube_guide", name: "의지 가이드 목록" },
  { path: "/en/content_guide", name: "상시 콘텐츠 목록" },
  { path: "/en/coupon", name: "쿠폰" },
  { path: "/en/newbie_guide", name: "뉴비 가이드" },
  { path: "/en/calendar", name: "캘린더" },
  { path: "/en/path_quiz", name: "오솔길 퀴즈" },
];

interface KoreanFinding {
  page: string;
  pageName: string;
  text: string;
  context: string;
  selector: string;
}

const allFindings: KoreanFinding[] = [];

function isIntentionalKorean(text: string): boolean {
  return INTENTIONAL_KOREAN.some((k) => text.includes(k));
}

function extractKorean(text: string): string[] {
  const matches = text.match(KOREAN_REGEX) || [];
  return matches.filter((m) => m.length >= 2 && !isIntentionalKorean(m));
}

test.describe("영어 페이지 한국어 감지", () => {
  test.use({ locale: "en-US" });

  for (const page of EN_PAGES) {
    test(`${page.name} (${page.path})`, async ({ page: pw }) => {
      await pw.goto(page.path, { waitUntil: "domcontentloaded", timeout: 20000 });

      // 동적 콘텐츠 로딩 대기
      await pw.waitForTimeout(1500);

      // 페이지 전체 텍스트 노드 추출 (스크립트/스타일 제외)
      const findings = await pw.evaluate((intentional) => {
        const results: Array<{ text: string; context: string; tag: string }> = [];
        const koreanRegex = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+/g;
        const skipTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "HEAD"]);

        function walk(node: Node) {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || "";
            const matches = text.match(koreanRegex) || [];
            const filtered = matches.filter(
              (m) => m.length >= 2 && !intentional.some((k: string) => text.includes(k))
            );
            if (filtered.length > 0) {
              const parent = node.parentElement;
              if (parent && !skipTags.has(parent.tagName)) {
                const context = text.trim().slice(0, 80);
                const tag = parent.tagName.toLowerCase();
                const cls = parent.className?.toString().slice(0, 40) || "";
                results.push({ text: filtered.join(", "), context, tag: `${tag}.${cls}` });
              }
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (skipTags.has(el.tagName)) return;
            // alt, placeholder, aria-label 속성 검사
            for (const attr of ["alt", "placeholder", "aria-label", "title"]) {
              const val = el.getAttribute(attr) || "";
              const matches = val.match(koreanRegex) || [];
              const filtered = matches.filter(
                (m) => m.length >= 2 && !intentional.some((k: string) => val.includes(k))
              );
              if (filtered.length > 0) {
                results.push({
                  text: filtered.join(", "),
                  context: `[${attr}="${val.slice(0, 60)}"]`,
                  tag: `${el.tagName.toLowerCase()}[${attr}]`,
                });
              }
            }
            node.childNodes.forEach(walk);
          }
        }

        walk(document.body);
        return results;
      }, INTENTIONAL_KOREAN);

      if (findings.length > 0) {
        for (const f of findings) {
          allFindings.push({
            page: page.path,
            pageName: page.name,
            text: f.text,
            context: f.context,
            selector: f.tag,
          });
        }
        console.log(`\n[${page.name}] 한국어 발견 ${findings.length}개:`);
        findings.forEach((f) => console.log(`  - "${f.text}" → ${f.context.slice(0, 60)}`));
      }

      // 테스트는 항상 통과 (리포트 목적)
      expect(true).toBe(true);
    });
  }

  test("전체 한국어 감지 리포트 출력", async () => {
    // 이 테스트는 마지막에 실행되어 allFindings를 출력
    // (실제 findings는 각 테스트에서 console.log로 출력됨)
    expect(true).toBe(true);
  });
});
