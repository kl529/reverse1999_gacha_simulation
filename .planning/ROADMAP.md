# Roadmap: i18n 다국어 지원

## Overview
- **Total phases:** 9
- **Total requirements:** 62
- **Coverage:** 100% (모든 REQ-ID가 정확히 하나의 phase에 매핑)
- **Depth:** Comprehensive

---

## Phase 1: i18n 인프라 구축
**Goal:** next-intl 설치, [locale] 라우팅, 미들웨어, 테스트 인프라까지 기본 뼈대를 완성하여 /ko, /en URL이 동작하도록 한다.

**Requirements:** INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, INFRA-08, INFRA-09, INFRA-10

**Success Criteria:**
1. `/ko` 접속 시 홈페이지가 한국어로 정상 렌더링된다
2. `/en` 접속 시 홈페이지가 영어로 정상 렌더링된다
3. `/gacha_simulator` (locale 없는 URL) 접속 시 `/ko/gacha_simulator`로 자동 리다이렉트된다
4. 정적 파일(이미지, sw.js, manifest.json)이 미들웨어에 의해 차단되지 않는다
5. 기존 테스트가 NextIntlClientProvider wrapper로 감싸져 통과한다

---

## Phase 2: 공통 UI 및 언어 전환
**Goal:** 전체 사이트에서 공유되는 UI 요소(메뉴, 버튼, 에러, 로딩)를 번역하고, 사용자가 언어를 전환할 수 있는 UI를 제공한다.

**Requirements:** UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-07, UI-08, UI-09

**Success Criteria:**
1. 메뉴(놀이터/도서관/가이드)와 30개 하위 메뉴가 영어로 표시된다
2. 헤더 우측에 KO/EN 전환 버튼이 표시되고, 클릭 시 현재 페이지를 유지한 채 언어가 전환된다
3. 에러 페이지(404, error)가 해당 언어로 표시된다
4. 로딩 상태, 버튼 텍스트가 해당 언어로 표시된다

---

## Phase 3: 홈페이지 및 SEO 메타데이터 기반
**Goal:** 홈페이지 UI를 완전히 번역하고, 전체 페이지의 SEO 메타데이터 다국어 체계를 구축한다.

**Requirements:** PAGE-01, SEO-01, SEO-02, SEO-05

**Success Criteria:**
1. `/en` 홈페이지의 모든 텍스트가 영어로 표시된다
2. 각 페이지의 `<title>`, `<meta description>`이 locale에 따라 변경된다
3. HTML에 hreflang alternate 링크가 포함된다
4. Open Graph / Twitter Card가 locale별로 설정된다

---

## Phase 4: 가챠 시뮬레이터 번역
**Goal:** 사이트의 핵심 기능인 가챠 시뮬레이터의 전체 UI를 영어로 번역한다.

**Requirements:** PAGE-02

**Success Criteria:**
1. 가챠 시뮬레이터의 모든 UI 라벨(통계, 배너 선택, 결과)이 영어로 표시된다
2. 뽑기 결과, 천장 카운트, 확률 표시 등이 영어로 동작한다
3. 한국어 모드에서 기존과 동일하게 동작한다

---

## Phase 5: 캐릭터 정보 및 게임 데이터 연동
**Goal:** 캐릭터 목록/상세 페이지를 번역하고, 게임 사전 파일을 활용한 게임 용어 다국어 표시 시스템을 구축한다.

**Requirements:** PAGE-03, DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06

**Success Criteria:**
1. 캐릭터 목록에서 캐릭터명이 영어로 표시된다
2. 캐릭터 상세 페이지의 UI 라벨과 데이터가 영어로 표시된다
3. 영감/공명 타입명이 영어로 표시된다
4. gameDictionary 헬퍼가 100K줄 사전에서 키를 조회하여 반환한다

---

## Phase 6: 나머지 페이지 번역 (놀이터/도서관)
**Goal:** 퀴즈, 빙고, 육성 계산기 등 나머지 인터랙티브 페이지들의 UI를 번역한다.

**Requirements:** PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08, PAGE-09, PAGE-10, PAGE-11, PAGE-12, PAGE-13, PAGE-14, PAGE-15, PAGE-16

**Success Criteria:**
1. 캐릭터 퀴즈, 종합 퀴즈 페이지가 영어로 진행 가능하다
2. 빙고, 최애 캐릭터 페이지가 영어로 표시된다
3. 육성 계산기, 추천 조합 등 도서관 페이지가 영어로 동작한다
4. 재료 파밍 모달이 영어로 표시된다

---

## Phase 7: 가이드 페이지 및 콘텐츠 번역
**Goal:** 가이드 카테고리의 모든 페이지 UI와 가이드 본문 콘텐츠를 영어로 제공한다.

**Requirements:** PAGE-17, PAGE-18, PAGE-19, PAGE-20, PAGE-21, PAGE-22, PAGE-23, PAGE-24, PAGE-25, GUIDE-01, GUIDE-02, GUIDE-03, GUIDE-04, GUIDE-05, GUIDE-06

**Success Criteria:**
1. 스킨 갤러리, 미래시, 현질 패키지, 캘린더 등 가이드 페이지 UI가 영어로 표시된다
2. 뉴비 가이드, 가챠 가이드 등 본문 콘텐츠가 영어로 제공된다
3. 쿠폰 목록, 상시 컨텐츠 페이지가 영어로 표시된다

---

## Phase 8: 링크 마이그레이션 및 PWA/Sitemap 통합
**Goal:** 전체 사이트의 Link 컴포넌트를 i18n 대응으로 교체하고, PWA manifest, sitemap 등 인프라 수준 다국어를 완성한다.

**Requirements:** LINK-01, LINK-02, LINK-03, SEO-03, SEO-04

**Success Criteria:**
1. 모든 내부 링크가 i18n/navigation의 Link를 사용하며 locale prefix가 자동 적용된다
2. next/navigation의 usePathname, useRouter가 i18n 래퍼로 교체된다
3. sitemap에 /ko/*, /en/* URL이 모두 포함된다
4. PWA manifest가 locale에 맞는 앱 이름/설명을 제공한다

---

## Phase 9: 테스트 완성 및 최종 검증
**Goal:** i18n 전용 테스트를 추가하고, 기존 253개 테스트 포함 전체 테스트 스위트를 통과시킨다.

**Requirements:** TEST-01, TEST-02, TEST-03, TEST-04, TEST-05, TEST-06, TEST-07, TEST-08

**Success Criteria:**
1. gameDictionary, routing 등 i18n 유틸리티 유닛 테스트가 통과한다
2. 언어 전환 컴포넌트 테스트가 통과한다
3. E2E: /ko 경로에서 한국어, /en 경로에서 영어가 표시된다
4. E2E: 언어 전환 및 기존 URL 리다이렉트가 동작한다
5. 기존 253개 테스트가 모두 통과한다

---

## Requirement Coverage

| Phase | Requirements | Count |
|-------|-------------|-------|
| 1 | INFRA-01~10 | 10 |
| 2 | UI-01~09 | 9 |
| 3 | PAGE-01, SEO-01, SEO-02, SEO-05 | 4 |
| 4 | PAGE-02 | 1 |
| 5 | PAGE-03, DATA-01~06 | 7 |
| 6 | PAGE-04~16 | 13 |
| 7 | PAGE-17~25, GUIDE-01~06 | 15 |
| 8 | LINK-01~03, SEO-03, SEO-04 | 5 |
| 9 | TEST-01~08 | 8 |
| **Total** | | **62** |

**Coverage: 62/62 = 100%** ✓

---
*Roadmap created: 2026-02-18*
