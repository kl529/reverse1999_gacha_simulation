# Milestone v1: 테스트 커버리지 확장

**Status:** ✅ SHIPPED 2026-01-25
**Phases:** 1-4
**Total Plans:** 7

## Overview

이 로드맵은 리버스 1999 가챠 시뮬레이터의 테스트 커버리지를 0%에서 핵심 비즈니스 로직 80% 이상으로 확장한다. 테스트 인프라 정비부터 시작하여 유닛 테스트, 컴포넌트 테스트, E2E 테스트 순으로 진행하며, 각 단계는 이전 단계의 기반 위에 구축된다.

## Phases

### Phase 1: Infrastructure

**Goal**: 모든 테스트 레벨을 실행할 수 있는 인프라를 구축한다
**Depends on**: Nothing (first phase)
**Plans**: 1 plan

Plans:
- [x] 01-01: 테스트 인프라 설정 (가챠 로직 추출, Playwright, fixtures, CI)

**Details:**
- Fixed broken gacha.test.tsx by extracting testable pure functions to lib/gacha/gachaLogic.ts
- Set up Playwright with chromium browser and dedicated port 3099 for E2E testing
- Created comprehensive test fixtures for mock banners and characters
- Configured CI script (npm run test:ci) for sequential Jest -> Playwright execution

### Phase 2: Unit Tests

**Goal**: 핵심 비즈니스 로직이 단위 테스트로 검증된다
**Depends on**: Phase 1
**Plans**: 2 plans

Plans:
- [x] 02-01: 가챠 관련 유닛 테스트 (gachaReducer, 확률 계산)
- [x] 02-02: 유틸리티 및 기타 유닛 테스트 (storage, cdn, quiz, farming, filter, version)

**Details:**
- gachaReducer tests covering all 7 action types
- doSinglePull tests for pity ceiling, pickup guarantee, and pity reset mechanics
- Quiz type guards, storage utilities, CDN URL generation tests
- Character filtering, version comparison, farming helper tests
- 137 unit tests total

### Phase 3: Component Tests

**Goal**: 주요 React 컴포넌트가 렌더링 및 상호작용 테스트로 검증된다
**Depends on**: Phase 2
**Plans**: 2 plans

Plans:
- [x] 03-01: 핵심 컴포넌트 테스트 (GachaGame, Quiz)
- [x] 03-02: 보조 컴포넌트 테스트 (CharacterDetail, RankingBoard, GrowthCalculator, Modal)

**Details:**
- GachaGame component tests (11 tests) - banner selection, pulls, stats, reset
- Quiz component tests (16 tests) - quiz selection, timer, answers, results
- CharacterDetail, RankingBoard, GrowthCalculator, Modal tests (48 tests)
- 75 component tests total

### Phase 4: E2E Tests

**Goal**: 주요 사용자 플로우가 Playwright E2E 테스트로 검증된다
**Depends on**: Phase 3
**Plans**: 2 plans

Plans:
- [x] 04-01: 핵심 게임플레이 E2E 테스트 (가챠 시뮬레이션, 퀴즈)
- [x] 04-02: 브라우징/유틸리티 E2E 테스트 (캐릭터 조회, 네비게이션, 테마)

**Details:**
- Gacha simulator E2E (8 tests) - load, pull, stats, reset, banner toggle
- Quiz E2E (10 tests) - selection, warning, play, answer, feedback
- Character browsing E2E (9 tests) - list, search, filter, detail
- Navigation E2E (12 tests) - links, theme toggle, persistence
- 41 E2E tests total (including 2 smoke tests)

---

## Milestone Summary

**Key Decisions:**
- 기존 Jest 설정 유지 (마이그레이션 비용 절감)
- E2E에 Playwright 사용 (Next.js 공식 권장)
- Pure function extraction: 가챠 로직을 lib/gacha/gachaLogic.ts로 추출
- Playwright 전용 포트 3099 사용 (충돌 방지)
- Firebase, localStorage 모킹 전략 (외부 의존성 격리)
- Desktop viewport (1280x800) for E2E tests
- Radix UI Switch uses role='switch' not 'checkbox'

**Issues Resolved:**
- Fixed broken gacha.test.tsx with handleGacha not exported
- Playwright connecting to wrong port - resolved with dedicated port
- Jest picking up fixture files - resolved with testPathIgnorePatterns
- Strict mode violations in E2E - resolved with locator-based selection

**Technical Debt:**
- lib/gacha/gachaLogic.ts extracted but GachaGame.tsx uses inline logic
- lib/utils/characterFilter.ts extracted but Character.tsx uses inline logic

---

*For current project status, see .planning/ROADMAP.md*
