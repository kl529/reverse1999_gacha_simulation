# Roadmap: Reverse 1999 테스트 커버리지 확장

## Overview

이 로드맵은 리버스 1999 가챠 시뮬레이터의 테스트 커버리지를 0%에서 핵심 비즈니스 로직 80% 이상으로 확장한다. 테스트 인프라 정비부터 시작하여 유닛 테스트, 컴포넌트 테스트, E2E 테스트 순으로 진행하며, 각 단계는 이전 단계의 기반 위에 구축된다.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Infrastructure** - 테스트 인프라 정비 및 기반 설정
- [x] **Phase 2: Unit Tests** - 비즈니스 로직 유닛 테스트 작성
- [ ] **Phase 3: Component Tests** - React 컴포넌트 테스트 작성
- [ ] **Phase 4: E2E Tests** - 사용자 플로우 E2E 테스트 작성

## Phase Details

### Phase 1: Infrastructure
**Goal**: 모든 테스트 레벨을 실행할 수 있는 인프라를 구축한다
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04
**Plans**: 1 plan
**Success Criteria** (what must be TRUE):
  1. 기존 gacha.test.tsx가 오류 없이 통과한다
  2. Playwright가 설정되어 `npm run test:e2e` 명령이 동작한다
  3. fixtures 디렉토리에 mock 데이터가 준비되어 테스트에서 import 가능하다
  4. CI 스크립트가 모든 테스트를 순차적으로 실행한다

Plans:
- [x] 01-01-PLAN.md — 테스트 인프라 설정 (가챠 로직 추출, Playwright, fixtures, CI)

### Phase 2: Unit Tests
**Goal**: 핵심 비즈니스 로직이 단위 테스트로 검증된다
**Depends on**: Phase 1
**Requirements**: UNIT-01, UNIT-02, UNIT-03, UNIT-04, UNIT-05, UNIT-06, UNIT-07, UNIT-08
**Plans**: 2 plans
**Success Criteria** (what must be TRUE):
  1. gachaReducer의 모든 액션(GACHA_PULL, RESET_ALL, UPDATE_PICKUP_INFO)이 테스트로 검증된다
  2. 가챠 확률 계산이 6성/5성 확률 및 천장 시스템을 정확히 구현함이 검증된다
  3. 퀴즈 점수 계산 및 타입 가드가 올바르게 동작함이 검증된다
  4. storage, cdn, farmingHelper 등 유틸리티 함수가 edge case 포함하여 테스트된다
  5. `npm run test:unit` 실행 시 모든 유닛 테스트가 통과한다

Plans:
- [x] 02-01-PLAN.md — 가챠 관련 유닛 테스트 (gachaReducer, 확률 계산)
- [x] 02-02-PLAN.md — 유틸리티 및 기타 유닛 테스트 (storage, cdn, quiz, farming, filter, version)

### Phase 3: Component Tests
**Goal**: 주요 React 컴포넌트가 렌더링 및 상호작용 테스트로 검증된다
**Depends on**: Phase 2
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06
**Plans**: 2 plans
**Success Criteria** (what must be TRUE):
  1. GachaGame 컴포넌트가 배너 선택, 뽑기 버튼 클릭에 올바르게 반응함이 검증된다
  2. Quiz 컴포넌트가 문제 표시, 답변 선택, 결과 표시를 정확히 처리함이 검증된다
  3. CharacterDetail, RankingBoard, GrowthCalculator 컴포넌트가 props에 따라 올바르게 렌더링됨이 검증된다
  4. Modal 컴포넌트들이 열기/닫기/확인 동작을 올바르게 처리함이 검증된다

Plans:
- [ ] 03-01-PLAN.md — 핵심 컴포넌트 테스트 (GachaGame, Quiz)
- [ ] 03-02-PLAN.md — 보조 컴포넌트 테스트 (CharacterDetail, RankingBoard, GrowthCalculator, Modal)

### Phase 4: E2E Tests
**Goal**: 주요 사용자 플로우가 Playwright E2E 테스트로 검증된다
**Depends on**: Phase 3
**Requirements**: E2E-01, E2E-02, E2E-03, E2E-04
**Plans**: TBD
**Success Criteria** (what must be TRUE):
  1. 가챠 시뮬레이션 전체 플로우(배너 선택 -> 뽑기 -> 결과 확인)가 브라우저에서 동작함이 검증된다
  2. 퀴즈 플로우(시작 -> 답변 -> 결과 -> 랭킹)가 end-to-end로 동작함이 검증된다
  3. 캐릭터 조회 플로우(목록 -> 상세 -> 스킨)가 동작함이 검증된다
  4. 네비게이션 및 테마 전환이 정상 동작함이 검증된다
  5. `npm run test:e2e` 실행 시 모든 E2E 테스트가 통과한다

Plans:
- [ ] 04-01: E2E 테스트 작성 (가챠, 퀴즈, 캐릭터, 네비게이션)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure | 1/1 | Complete | 2026-01-24 |
| 2. Unit Tests | 2/2 | Complete | 2026-01-24 |
| 3. Component Tests | 0/2 | Not started | - |
| 4. E2E Tests | 0/1 | Not started | - |

---
*Roadmap created: 2026-01-24*
*Last updated: 2026-01-25 — Phase 3 planned*
