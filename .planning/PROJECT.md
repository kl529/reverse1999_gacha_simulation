# Reverse 1999 Gacha Simulator - 테스트 커버리지 확장

## What This Is

리버스 1999 가챠 시뮬레이터의 모든 서비스에 대해 포괄적인 테스트 커버리지를 추가하는 프로젝트. 유닛 테스트, 컴포넌트 테스트, E2E 테스트를 통해 비즈니스 로직의 신뢰성을 보장하고 회귀 버그를 방지한다.

## Core Value

**핵심 비즈니스 로직(가챠 확률, 퀴즈 점수, 육성 계산)이 정확하게 동작함을 자동화된 테스트로 보장한다.**

## Requirements

### Validated

기존에 동작하는 기능들 (테스트 대상):

- ✓ 가챠 시뮬레이션 (확률 계산, 천장 시스템, 픽업 보장) — existing
- ✓ 캐릭터 정보 조회 및 필터링 — existing
- ✓ 퀴즈 시스템 (문제 출제, 점수 계산, 랭킹) — existing
- ✓ 육성 계산기 (재료 계산, 파밍 추천) — existing
- ✓ 캘린더 기능 — existing
- ✓ 푸시 알림 (FCM 구독, 쿠폰 알림) — existing
- ✓ 로컬 스토리지 상태 관리 — existing
- ✓ 다크/라이트 테마 — existing

### Active

- [ ] **UNIT-01**: gachaReducer 상태 관리 로직 테스트 (GACHA_PULL, RESET_ALL, UPDATE_PICKUP_INFO 액션)
- [ ] **UNIT-02**: 가챠 확률 계산 로직 테스트 (6성 확률, 5성 확률, 천장 시스템)
- [ ] **UNIT-03**: 퀴즈 점수 계산 및 타입 가드 테스트 (isMultipleChoiceQuestion 등)
- [ ] **UNIT-04**: storage.ts 유틸리티 테스트 (get, set, remove, clear)
- [ ] **UNIT-05**: farmingHelper.ts 재료 계산 로직 테스트
- [ ] **UNIT-06**: CDN URL 생성 함수 테스트 (cdn.ts)
- [ ] **UNIT-07**: 캐릭터 필터링/검색 로직 테스트
- [ ] **UNIT-08**: 버전 비교 로직 테스트 (버전 문자열 파싱)
- [ ] **COMP-01**: GachaGame 컴포넌트 렌더링 및 상호작용 테스트
- [ ] **COMP-02**: Quiz 컴포넌트 렌더링 및 답변 처리 테스트
- [ ] **COMP-03**: CharacterDetail 컴포넌트 테스트
- [ ] **COMP-04**: RankingBoard 컴포넌트 테스트
- [ ] **COMP-05**: GrowthCalculator 컴포넌트 테스트
- [ ] **COMP-06**: Modal 컴포넌트들 테스트 (ConfirmModal, ModalProvider)
- [ ] **E2E-01**: 가챠 시뮬레이션 전체 플로우 테스트 (배너 선택 → 뽑기 → 결과 확인)
- [ ] **E2E-02**: 퀴즈 완료 플로우 테스트 (퀴즈 시작 → 답변 → 결과 → 랭킹)
- [ ] **E2E-03**: 캐릭터 조회 플로우 테스트 (목록 → 상세 → 스킨)
- [ ] **E2E-04**: 네비게이션 및 테마 전환 테스트

### Out of Scope

- Firebase Admin SDK 서버 사이드 테스트 — 실제 Firebase 연동 필요, 모킹으로 대체
- 실제 푸시 알림 발송 테스트 — 모킹으로 대체
- 성능/부하 테스트 — 별도 프로젝트로 분리
- 시각적 회귀 테스트 (스크린샷 비교) — 추후 고려

## Context

**현재 테스트 상태:**
- Jest 29.7.0 + Testing Library 설정 완료
- 테스트 파일 1개만 존재 (`__tests__/gacha.test.tsx`)
- 해당 테스트 파일의 import가 깨진 상태 (`handleGacha` 미export)
- 테스트 커버리지 거의 0%

**식별된 취약점 (CONCERNS.md에서):**
- 대형 모놀리식 컴포넌트로 테스트 어려움 (GachaGame 673줄)
- handleGacha 함수 미export로 테스트 불가
- localStorage 에러 핸들링 부재
- 버전 비교 로직 edge case

**기존 테스트 인프라:**
- `jest.config.js` 설정 완료
- `jest.setup.js`에 @testing-library/jest-dom 설정
- `@/` 경로 별칭 설정 완료
- jsdom 환경 설정 완료

## Constraints

- **Framework**: Jest 29.7.0 + @testing-library/react 16.2.0 (기존 설정 유지)
- **E2E**: Playwright 신규 설정 필요
- **Coverage**: 핵심 비즈니스 로직 80% 이상 목표
- **Pattern**: AAA (Arrange-Act-Assert) 패턴 사용
- **Language**: 테스트 설명은 한국어로 작성 (기존 패턴 유지)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 기존 Jest 설정 유지 | 이미 설정된 인프라 활용, 마이그레이션 비용 절감 | — Pending |
| E2E에 Playwright 사용 | Next.js 공식 권장, 모던 브라우저 자동화 | — Pending |
| handleGacha export 필요 | 핵심 로직 테스트를 위해 함수 노출 필요 | — Pending |
| 모킹 전략: Firebase, localStorage | 외부 의존성 격리하여 단위 테스트 순수성 확보 | — Pending |

---
*Last updated: 2026-01-24 after initialization*
