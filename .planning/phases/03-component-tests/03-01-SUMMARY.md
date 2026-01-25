---
phase: 03-component-tests
plan: 01
subsystem: testing
tags: [components, jest, testing-library, gacha, quiz]

dependency-graph:
  requires: [02-unit-tests]
  provides:
    - GachaGame component tests
    - Quiz component tests
  affects: [03-02, 04-e2e-tests]

tech-stack:
  patterns:
    - Component testing with React Testing Library
    - Mock strategies for Next.js Image, framer-motion, react-hot-toast
    - Radix UI component testing (Switch, Select)
    - Fake timers for async behavior testing

key-files:
  created:
    - __tests__/components/GachaGame.test.tsx
    - __tests__/components/Quiz.test.tsx
  modified: []

decisions:
  - id: radix-switch-role
    summary: "Radix UI Switch uses role='switch' not 'checkbox'"
    rationale: "Radix UI의 Switch 컴포넌트는 ARIA switch role을 사용"
    date: 2026-01-25
  - id: next-image-mock
    summary: "Next/image mock filters out priority/sizes props"
    rationale: "Non-standard HTML attributes cause React warnings"
    date: 2026-01-25
  - id: fake-timers-for-quiz
    summary: "jest.useFakeTimers() for quiz timer testing"
    rationale: "타이머 동작을 동기적으로 제어하여 deterministic tests 가능"
    date: 2026-01-25

metrics:
  duration: 5m 4s
  completed: 2026-01-25
---

# Phase 03 Plan 01: GachaGame and Quiz Component Tests Summary

GachaGame과 Quiz 컴포넌트의 렌더링 및 상호작용 테스트 구현 완료.

## What Was Done

### Task 1: GachaGame Component Tests (11 tests)

**File:** `__tests__/components/GachaGame.test.tsx` (284 lines)

**Tests:**
1. 기본 렌더링
   - 가챠 시뮬레이터 제목 렌더링
   - 1회 뽑기 버튼 렌더링
   - 10회 뽑기 버튼 렌더링
   - 리셋 버튼 렌더링
2. 1회 뽑기 - 버튼 클릭 시 결과 표시
3. 10회 뽑기 - 버튼 클릭 시 10개 결과 표시
4. 배너 타입 전환 - Switch 토글 상태 변경
5. 리셋 기능 - 통계 초기화
6. 배너 선택 - 드롭다운 트리거 렌더링
7. 연속 뽑기 - 통계 누적
8. 모바일 UI - 플로팅 버튼 렌더링

**Mock Strategy:**
- `next/image`: HTML img로 대체, priority/sizes 필터링
- `framer-motion`: div/p로 대체
- `react-hot-toast`: empty mock
- `Element.scrollIntoView`: jest.fn()

**Commit:** `8fff8b0`

### Task 2: Quiz Component Tests (16 tests)

**File:** `__tests__/components/Quiz.test.tsx` (455 lines)

**Tests:**
1. 기본 렌더링 (setup 페이즈)
   - 퀴즈 세트 선택 화면 표시
   - 첫 번째 퀴즈 세트 표시
   - 잠김 상태 퀴즈 세트 표시
   - 퀴즈 시작 버튼 렌더링
2. 퀴즈 세트 선택
   - 클릭 시 선택
   - 잠금된 세트 비활성화
3. 경고 화면 (warning 페이즈)
   - 시작 버튼 클릭 시 전환
   - 확인 버튼 표시
   - 남은 시도 횟수 표시
4. initialQuizSetId prop - warning 화면으로 직접 시작
5. 퀴즈 진행 (playing 페이즈)
   - 문제 표시 (LOCK, TIME, 해제 라벨)
   - 타이머 카운트다운 (10초 -> 9초)
   - 답변 후 다음 버튼 표시
6. 타이머 시간 초과 - 오답 처리
7. 결과 화면 - 3회 오답 후 표시
8. 다시 시작 버튼 렌더링

**Mock Strategy:**
- 위 GachaGame mocks +
- `@/lib/posthog`: analytics mock
- `next-themes`: useTheme mock
- `html-to-image`: toPng mock
- `localStorage`: custom mock implementation
- `jest.useFakeTimers()` for timer testing

**Commit:** `3a7f27f`

## Decisions Made

### 1. Radix UI Switch Role
Radix UI의 Switch 컴포넌트는 HTML checkbox가 아닌 ARIA `role="switch"`를 사용.
테스트에서 `getAllByRole("switch")`로 접근.

### 2. Next.js Image Mock
Next.js Image의 `priority`, `sizes` props는 HTML img에서 유효하지 않아 React warnings 발생.
Mock에서 destructuring으로 필터링하여 clean output 유지.

### 3. Fake Timers for Quiz
퀴즈의 10초 타이머를 테스트하기 위해 `jest.useFakeTimers()`와 `jest.advanceTimersByTime()` 사용.
이를 통해 타이머 동작을 동기적으로 제어 가능.

## Deviations from Plan

None - plan executed exactly as written.

## Test Results

```
GachaGame.test.tsx: 11 tests PASS
Quiz.test.tsx: 16 tests PASS
Total: 27 tests for this plan
```

All 212 unit tests in the project pass after these additions.

## Files Changed

| File | Lines | Change |
|------|-------|--------|
| `__tests__/components/GachaGame.test.tsx` | 284 | Created |
| `__tests__/components/Quiz.test.tsx` | 455 | Created |

## Next Phase Readiness

**Ready for:** 03-02-PLAN.md (Additional component tests)

**Dependencies satisfied:**
- GachaGame 컴포넌트 테스트 완료
- Quiz 컴포넌트 테스트 완료
- Mock 전략 확립

**Patterns established:**
- Radix UI component testing
- Fake timers for async behavior
- Complex mock strategies for Next.js components
