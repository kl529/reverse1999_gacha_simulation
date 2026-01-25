# Phase 3: Component Tests - Context

**Gathered:** 2026-01-24
**Status:** Ready for planning

<domain>
## Phase Boundary

주요 React 컴포넌트(GachaGame, Quiz, CharacterDetail, RankingBoard, GrowthCalculator, Modal)가 렌더링 및 상호작용 테스트로 검증된다. 사용자 플로우 전체를 검증하는 E2E 테스트는 Phase 4에서 다룬다.

</domain>

<decisions>
## Implementation Decisions

### 테스트 깊이
- 렌더링 + 상호작용 모두 검증 (배너 선택, 버튼 클릭, 결과 표시 등 사용자 시나리오 포함)
- 스냅샷 테스트는 제한적 사용 — 복잡한 UI 컴포넌트(GachaResult 등)에만 적용
- Quiz 컴포넌트는 전체 플로우 테스트 (문제 표시 → 답변 선택 → 결과/점수 확인)
- 보조 컴포넌트(CharacterDetail, RankingBoard, GrowthCalculator)는 다양한 props 조합에 따른 올바른 렌더링 검증

### 컴포넌트 분할
- 현재 구조 유지하되 테스트 작성 중 필요시에만 하위 컴포넌트 추출
- Quiz 컴포넌트는 코드 분석 후 Claude가 분리 필요 여부 결정
- GachaGame(673줄)은 테스트 불가능한 부분이 있을 때만 최소한으로 분리

### 비동기 처리
- Firebase는 필요한 함수만 부분 모킹 (완전 모킹 X, 미사용 컴포넌트만 테스트 X)
- Phase 1에서 정의된 Firebase 모킹 전략 활용

### Claude's Discretion
- Framer Motion 애니메이션 처리 방식 (모킹 vs waitFor)
- setTimeout/setInterval 처리 방식 (fake timers vs 실제 대기)
- 컴포넌트 추출 범위 (테스트 품질과 유지보수성 균형 고려)

</decisions>

<specifics>
## Specific Ideas

- GachaGame 테스트: 배너 선택 → 뽑기 버튼 클릭 → 결과 표시 시나리오 포함
- Modal 컴포넌트: 열기/닫기/확인 동작이 올바르게 처리되는지 검증
- 기존 프로젝트의 한국어 테스트 설명 패턴 유지

</specifics>

<deferred>
## Deferred Ideas

None — 논의가 Phase 3 범위 내에서 유지됨

</deferred>

---

*Phase: 03-component-tests*
*Context gathered: 2026-01-24*
