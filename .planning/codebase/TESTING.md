# Testing Patterns

**Analysis Date:** 2026-01-24

## Test Framework

**Runner:**
- Jest 29.7.0
- Configuration: `jest.config.js`
- Environment: jsdom (browser-like environment)
- TypeScript support through babel-jest

**Assertion Library:**
- Jest built-in expect() assertions
- @testing-library/jest-dom for extended matchers

**Run Commands:**
```bash
npm test                 # Run all tests (Jest in watch mode by default)
npm test -- --run       # Run tests once without watch
npm test -- --coverage  # Generate coverage reports
```

## Test File Organization

**Location:**
- Co-located pattern: Tests reside in `__tests__/` directory at project root
- Currently minimal test coverage with single test file present

**Naming:**
- Test files use `.test.tsx` or `.test.ts` extension
- Example: `gacha.test.tsx`

**Directory Structure:**
```
project/
├── __tests__/
│   └── gacha.test.tsx     # Gacha logic tests
└── [source files]
```

## Test Structure

**Suite Organization:**
```typescript
describe("Feature Name", () => {
  it("should do something specific", () => {
    // Test implementation
  });
});
```

Example from `__tests__/gacha.test.tsx`:
```typescript
describe("Gacha Logic Tests", () => {
  it("70연차 내에 최소 1번은 6성 캐릭터가 나와야 한다", () => {
    // Arrange: set up test data
    const banners = [{ ... }];

    // Act: perform the action
    const results = handleGacha(70, banners[0]);

    // Assert: verify the result
    const sixStarCount = results.filter((char) => char.rarity === 6).length;
    expect(sixStarCount).toBeGreaterThanOrEqual(1);
  });
});
```

**Patterns:**
- Arrange-Act-Assert (AAA) pattern used for test structure
- Test descriptions in Korean matching project language
- Single assertion per test preferred
- Setup of test data before calling functions under test

## Mocking

**Framework:** Jest built-in mocking capabilities

**Patterns:**
Current codebase shows minimal mocking. When needed:
```typescript
// Example pattern (not currently in use)
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((input) => input),
}));
```

**What to Mock:**
- External API calls
- Firebase operations
- localStorage (if testing store operations)
- Browser APIs (window, navigator)

**What NOT to Mock:**
- Core business logic (gacha calculations, filtering)
- Data structures and constants
- Pure utility functions like `cn()` for className merging
- React component rendering (use Testing Library instead)

## Fixtures and Factories

**Test Data:**
Current test uses inline test data objects. Example from `__tests__/gacha.test.tsx`:
```typescript
const banners = [
  {
    id: "flutter_page_pick_up",
    name: "플러터 페이지 픽업",
    pickup6: {
      name: "플러터 페이지",
      rarity: 6,
      inspiration: "star",
      engName: "flutter-page",
    },
    pickup5: [
      {
        name: "슬라우치 햇",
        rarity: 5,
        inspiration: "mineral",
        engName: "brimley",
      },
    ],
  },
];
```

**Location:**
- Test data defined inline within test files
- Could be extracted to shared fixtures directory as tests expand
- Recommendation: Create `__tests__/fixtures/` directory for shared test data

## Coverage

**Requirements:** None enforced (no coverage threshold configured)

**View Coverage:**
```bash
npm test -- --coverage
```

Output includes:
- Statements coverage
- Branch coverage
- Function coverage
- Line coverage

Current state: Minimal coverage (1 test file present)

## Test Types

**Unit Tests:**
- Scope: Individual functions and components in isolation
- Approach: Jest with inline test data
- Current example: `gacha.test.tsx` tests `handleGacha()` function
- Typical focus: Business logic, utilities, pure functions

**Integration Tests:**
- Scope: Multiple components working together
- Framework: Would use Testing Library for component integration
- Current state: Not implemented
- Recommendation: Add tests for component interactions and data flow

**E2E Tests:**
- Framework: Not currently configured
- Recommendation: Consider Playwright for browser automation tests
- Would test user flows like gacha simulation, quiz completion, navigation

## Common Patterns

**Async Testing:**
```typescript
// Pattern for async functions (not currently used)
it("should handle async operation", async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});

// Or with .then()
it("should handle promise", () => {
  return asyncFunction().then((result) => {
    expect(result).toBeDefined();
  });
});
```

**Error Testing:**
```typescript
// Pattern for testing error cases
it("should throw error for invalid input", () => {
  expect(() => {
    functionThatThrows(invalidInput);
  }).toThrow();
});

// Or for promise-based errors
it("should reject for invalid input", () => {
  return expect(asyncFunctionThatRejects()).rejects.toThrow();
});
```

## Testing Best Practices

**File Paths:**
- Always import from `@/` path aliases in tests
- Example: `import { handleGacha } from "@/components/gacha_simulator/GachaGame";`

**Module Setup:**
- `jest.setup.js` imports `@testing-library/jest-dom` for extended matchers
- Path mapping configured in `jest.config.js` maps `^@/(.*)$` to `<rootDir>/$1`

**Environment Configuration:**
```javascript
// jest.config.js
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
```

**Dependencies:**
- @testing-library/react 16.2.0 for React component testing
- @testing-library/jest-dom 6.6.3 for DOM matchers
- babel-jest 29.7.0 for TypeScript/JSX transpilation

## Testing Gaps

**Missing Coverage:**
- No component rendering tests (recommend Testing Library)
- No reducer logic tests (recommend testing action dispatches)
- No hook tests (recommend @testing-library/react hooks)
- No API route tests
- No E2E user flow tests
- No localStorage utility tests

**Priority Areas for Testing:**
1. Gacha simulator logic (probability calculations, state management)
2. Quiz logic and scoring
3. Data filtering and search (character list, banner selection)
4. State reducers (gachaReducer)
5. Utility functions (storage.ts, utils.ts)

---

*Testing analysis: 2026-01-24*
