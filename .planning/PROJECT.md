# Reverse 1999 Gacha Simulator - 테스트 커버리지 확장

## What This Is

리버스 1999 가챠 시뮬레이터의 포괄적인 테스트 스위트. 253개의 테스트(유닛 137 + 컴포넌트 75 + E2E 41)를 통해 비즈니스 로직의 신뢰성을 보장하고 회귀 버그를 방지한다.

## Core Value

**핵심 비즈니스 로직(가챠 확률, 퀴즈 점수, 육성 계산)이 정확하게 동작함을 자동화된 테스트로 보장한다.**

## Current State (v1 Shipped)

**테스트 현황:**
- 유닛 테스트: 137개 (gachaReducer, 확률 계산, 퀴즈 타입, storage, cdn, version, farming, filter)
- 컴포넌트 테스트: 75개 (GachaGame, Quiz, CharacterDetail, RankingBoard, GrowthCalculator, Modal)
- E2E 테스트: 41개 (가챠 플로우, 퀴즈 플로우, 캐릭터 조회, 네비게이션, 테마)
- CI 파이프라인: `npm run test:ci`로 전체 테스트 실행

**기술 스택:**
- Jest 29.7.0 + @testing-library/react 16.2.0 (유닛/컴포넌트)
- Playwright 1.49.1 (E2E)
- TypeScript 5

## Requirements

### Validated

v1 테스트 커버리지 확장에서 검증된 기능:

- ✓ gachaReducer 상태 관리 (7 액션 타입) — v1
- ✓ 가챠 확률 계산 (6성/5성, 천장, 픽업 보장) — v1
- ✓ 퀴즈 타입 가드 및 점수 계산 — v1
- ✓ storage.ts 유틸리티 (get, set, remove, clear) — v1
- ✓ farmingHelper.ts 재료 계산 — v1
- ✓ CDN URL 생성 함수 — v1
- ✓ 캐릭터 필터링/검색 로직 — v1
- ✓ 버전 비교 로직 — v1
- ✓ GachaGame 컴포넌트 상호작용 — v1
- ✓ Quiz 컴포넌트 플로우 — v1
- ✓ CharacterDetail 컴포넌트 — v1
- ✓ RankingBoard 컴포넌트 — v1
- ✓ GrowthCalculator 컴포넌트 — v1
- ✓ Modal 컴포넌트들 — v1
- ✓ 가챠 시뮬레이션 E2E 플로우 — v1
- ✓ 퀴즈 완료 E2E 플로우 — v1
- ✓ 캐릭터 조회 E2E 플로우 — v1
- ✓ 네비게이션 및 테마 전환 — v1

### Active

(다음 마일스톤에서 정의)

### Out of Scope

- Firebase Admin SDK 서버 사이드 테스트 — 실제 Firebase 연동 필요, 모킹으로 대체
- 실제 푸시 알림 발송 테스트 — 모킹으로 대체
- 성능/부하 테스트 — 별도 프로젝트로 분리
- 시각적 회귀 테스트 (스크린샷 비교) — 추후 고려
- Mobile-specific E2E — 웹 브라우저 테스트에 집중

## Context

**v1 완료 후 상태:**
- 4,567줄 테스트 코드 (TypeScript)
- 94개 파일 생성/수정
- 테스트 인프라 완전 구축 (Jest + Playwright)
- CI 스크립트 통합 완료

**아키텍처 노트:**
- 가챠 로직이 lib/gacha/gachaLogic.ts로 추출됨 (테스트 가능한 순수 함수)
- 캐릭터 필터 로직이 lib/utils/characterFilter.ts로 추출됨
- 테스트 픽스처가 __tests__/fixtures/에 중앙화됨

## Constraints

- **Framework**: Jest 29.7.0 + @testing-library/react 16.2.0
- **E2E**: Playwright 1.49.1 (전용 포트 3099)
- **Pattern**: AAA (Arrange-Act-Assert) 패턴 사용
- **Language**: 테스트 설명은 한국어로 작성

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 기존 Jest 설정 유지 | 이미 설정된 인프라 활용, 마이그레이션 비용 절감 | ✓ Good |
| E2E에 Playwright 사용 | Next.js 공식 권장, 모던 브라우저 자동화 | ✓ Good |
| Pure function extraction | 테스트 가능성을 위해 가챠 로직을 순수 함수로 추출 | ✓ Good |
| Playwright 전용 포트 3099 | 다른 개발 서버와의 충돌 방지 | ✓ Good |
| 모킹 전략: Firebase, localStorage | 외부 의존성 격리하여 단위 테스트 순수성 확보 | ✓ Good |
| Desktop viewport-first E2E | 모바일/데스크톱 그리드 충돌 방지 | ✓ Good |
| Radix UI role='switch' | ARIA 표준 준수 | ✓ Good |
| 한국어 테스트 설명 | 프로젝트 컨벤션 일관성 | ✓ Good |

---
*Last updated: 2026-01-25 after v1 milestone*
