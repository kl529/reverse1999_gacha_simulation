# Requirements Archive: v1 테스트 커버리지 확장

**Archived:** 2026-01-25
**Status:** ✅ SHIPPED

This is the archived requirements specification for v1.
For current requirements, see `.planning/REQUIREMENTS.md` (created for next milestone).

---

# Requirements: Reverse 1999 테스트 커버리지

**Defined:** 2026-01-24
**Core Value:** 핵심 비즈니스 로직이 정확하게 동작함을 자동화된 테스트로 보장한다

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Unit Tests (비즈니스 로직)

- [x] **UNIT-01**: gachaReducer 상태 관리 로직 테스트 (GACHA_PULL, RESET_ALL, UPDATE_PICKUP_INFO 액션) — ✓ SATISFIED
- [x] **UNIT-02**: 가챠 확률 계산 로직 테스트 (6성 확률, 5성 확률, 천장 시스템) — ✓ SATISFIED
- [x] **UNIT-03**: 퀴즈 점수 계산 및 타입 가드 테스트 (isMultipleChoiceQuestion 등) — ✓ SATISFIED
- [x] **UNIT-04**: storage.ts 유틸리티 테스트 (get, set, remove, clear) — ✓ SATISFIED
- [x] **UNIT-05**: farmingHelper.ts 재료 계산 로직 테스트 — ✓ SATISFIED
- [x] **UNIT-06**: CDN URL 생성 함수 테스트 (cdn.ts) — ✓ SATISFIED
- [x] **UNIT-07**: 캐릭터 필터링/검색 로직 테스트 — ✓ SATISFIED
- [x] **UNIT-08**: 버전 비교 로직 테스트 (버전 문자열 파싱) — ✓ SATISFIED

### Component Tests (React 컴포넌트)

- [x] **COMP-01**: GachaGame 컴포넌트 렌더링 및 상호작용 테스트 — ✓ SATISFIED
- [x] **COMP-02**: Quiz 컴포넌트 렌더링 및 답변 처리 테스트 — ✓ SATISFIED
- [x] **COMP-03**: CharacterDetail 컴포넌트 테스트 — ✓ SATISFIED
- [x] **COMP-04**: RankingBoard 컴포넌트 테스트 — ✓ SATISFIED
- [x] **COMP-05**: GrowthCalculator 컴포넌트 테스트 — ✓ SATISFIED
- [x] **COMP-06**: Modal 컴포넌트들 테스트 (ConfirmModal, ModalProvider) — ✓ SATISFIED

### E2E Tests (사용자 플로우)

- [x] **E2E-01**: 가챠 시뮬레이션 전체 플로우 테스트 (배너 선택 → 뽑기 → 결과 확인) — ✓ SATISFIED
- [x] **E2E-02**: 퀴즈 완료 플로우 테스트 (퀴즈 시작 → 답변 → 결과 → 랭킹) — ✓ SATISFIED
- [x] **E2E-03**: 캐릭터 조회 플로우 테스트 (목록 → 상세 → 스킨) — ✓ SATISFIED
- [x] **E2E-04**: 네비게이션 및 테마 전환 테스트 — ✓ SATISFIED

### Infrastructure (테스트 인프라)

- [x] **INFRA-01**: 깨진 gacha.test.tsx 수정 (handleGacha export) — ✓ SATISFIED
- [x] **INFRA-02**: Playwright 설정 및 초기 구성 — ✓ SATISFIED
- [x] **INFRA-03**: 테스트 fixtures 디렉토리 구조 설정 — ✓ SATISFIED
- [x] **INFRA-04**: CI 테스트 스크립트 설정 (npm run test:ci) — ✓ SATISFIED

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Advanced Testing

- **ADV-01**: API 라우트 통합 테스트 (push notification, coupon check)
- **ADV-02**: 성능 테스트 (번들 사이즈, 렌더링 성능)
- **ADV-03**: 접근성 테스트 (a11y)
- **ADV-04**: 시각적 회귀 테스트 (Percy, Chromatic)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Firebase Admin 실제 연동 테스트 | 실제 Firebase 프로젝트 필요, 모킹으로 대체 |
| 실제 푸시 알림 발송 테스트 | 외부 서비스 의존, 모킹으로 대체 |
| 부하/스트레스 테스트 | 별도 인프라 필요, 추후 프로젝트로 분리 |
| Mobile-specific E2E | 웹 브라우저 테스트에 집중 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| UNIT-01 | Phase 2 | Complete |
| UNIT-02 | Phase 2 | Complete |
| UNIT-03 | Phase 2 | Complete |
| UNIT-04 | Phase 2 | Complete |
| UNIT-05 | Phase 2 | Complete |
| UNIT-06 | Phase 2 | Complete |
| UNIT-07 | Phase 2 | Complete |
| UNIT-08 | Phase 2 | Complete |
| COMP-01 | Phase 3 | Complete |
| COMP-02 | Phase 3 | Complete |
| COMP-03 | Phase 3 | Complete |
| COMP-04 | Phase 3 | Complete |
| COMP-05 | Phase 3 | Complete |
| COMP-06 | Phase 3 | Complete |
| E2E-01 | Phase 4 | Complete |
| E2E-02 | Phase 4 | Complete |
| E2E-03 | Phase 4 | Complete |
| E2E-04 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 22 total
- Shipped: 22
- Adjusted: 0
- Dropped: 0

---

## Milestone Summary

**Shipped:** 22 of 22 v1 requirements
**Adjusted:** None — all requirements implemented as originally specified
**Dropped:** None — no requirements removed during implementation

---
*Archived: 2026-01-25 as part of v1 milestone completion*
