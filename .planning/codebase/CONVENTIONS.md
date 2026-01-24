# Coding Conventions

**Analysis Date:** 2026-01-24

## Naming Patterns

**Files:**
- Page components: `page.tsx` in route directories (e.g., `app/gacha_simulator/page.tsx`)
- React components: PascalCase (e.g., `GachaGame.tsx`, `Character.tsx`, `ConfirmModal.tsx`)
- Utility/hook files: camelCase (e.g., `storage.ts`, `useNetworkStatus.ts`, `gachaReducer.ts`)
- Type definition files: camelCase with "Types" suffix (e.g., `quizTypes.ts`, `menuTypes.ts`, `growthCalculatorTypes.ts`)
- Directories: kebab-case (e.g., `gacha_simulator/`, `character_quiz/`, `growth_calculator/`)

**Functions:**
- camelCase for all functions and methods
- Exported functions may use descriptive names like `findCharacterById`, `enrichBanner`, `isValidGachaCharacterForPool`
- React hooks follow pattern `use[Name]` (e.g., `useNetworkStatus`)
- Event handlers use `handle` prefix (e.g., `handleGacha`, `handleOnline`, `handleOffline`)
- Reducer functions follow pattern `[name]Reducer` (e.g., `gachaReducer`)

**Variables:**
- Local state variables: camelCase (e.g., `selectedBanner`, `searchQuery`, `debouncedQuery`)
- Component props: camelCase (e.g., `isOpen`, `onClose`, `modalClassName`)
- Constants within components: camelCase (e.g., `attrMap`, `STORAGE_KEYS`)

**Types:**
- Interface names: PascalCase (e.g., `GachaState`, `EnrichedBanner`, `ModalProps`, `QuizSetInfo`)
- Type union names: PascalCase (e.g., `GachaAction`, `QuestionType`, `QuizPhase`)
- Type guard functions: `is[TypeName]` (e.g., `isMultipleChoiceQuestion`, `isImageTextInputQuestion`)

**Constants:**
- UPPER_SNAKE_CASE for true constants (e.g., `STORAGE_KEYS`, `PLAYGROUND_ITEMS`, `LIBRARY_ITEMS`)
- Constants defined within objects/records use camelCase (e.g., the properties inside objects)

## Code Style

**Formatting:**
- Prettier 3.5.3 with custom configuration
- Print width: 100 characters
- Tab width: 2 spaces
- Semicolons: enabled
- Single quotes: disabled (uses double quotes)
- Trailing commas: es5
- Plugin: prettier-plugin-tailwindcss for automatic class sorting

Configuration file: `.prettierrc`

**Linting:**
- ESLint 9.26.0 with TypeScript parser (@typescript-eslint/parser)
- Configuration: `.eslintrc.js` with plugins for React, JSX accessibility, import sorting, and Prettier integration
- Core rules:
  - `prettier/prettier`: error (enforces Prettier formatting)
  - `unused-imports/no-unused-imports`: warn (warns on unused imports)
  - `react/react-in-jsx-scope`: off (not needed in Next.js)
  - `@typescript-eslint/no-unused-vars`: off (handled by unused-imports plugin)

Extended configs:
- `next/core-web-vitals`
- `plugin:@typescript-eslint/recommended`
- `plugin:jsx-a11y/recommended`
- `plugin:import/errors` and `plugin:import/warnings`
- `eslint-config-prettier` (prevents conflicts with Prettier)

Run commands:
```bash
npm run lint              # Check for linting issues
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
```

## Import Organization

**Order:**
1. React and Next.js imports (e.g., `"use client"`, `import { useState }`, `import Link`)
2. Third-party library imports (e.g., `react-hot-toast`, `framer-motion`)
3. Internal component imports (e.g., `@/components/...`)
4. Internal utility imports (e.g., `@/lib/...`)
5. Data imports (e.g., `@/data/characters`)
6. Type imports (separated at top if using TypeScript)

**Path Aliases:**
- `@/` resolves to project root (configured in `tsconfig.json`)
- Used for all internal imports to avoid relative path confusion

Example from `components/gacha_simulator/GachaGame.tsx`:
```typescript
import { useState, useMemo, useEffect, useRef, useReducer } from "react";
import { gachaReducer, initialGachaState } from "@/lib/reducers/gachaReducer";
import Image from "next/image";
import { charactersByRarity, Character } from "@/data/characters";
import { banners, Banner } from "@/data/banners";
import GachaResults from "@/components/gacha_simulator/GachaResults";
```

## Error Handling

**Patterns:**
- Try-catch blocks for localStorage operations (server check with `typeof window === "undefined"`)
- Error logging to console for debugging
- Graceful fallbacks (e.g., `return null` for failed JSON parsing in storage)
- Error boundary component at `app/error.tsx` catches unhandled errors
- Development mode shows detailed error messages; production shows user-friendly message
- useEffect dependencies cleanup for event listeners and timers

Example from `lib/storage.ts`:
```typescript
try {
  const item = localStorage.getItem(key);
  if (item === null) return null;
  try {
    return JSON.parse(item) as T;
  } catch {
    return item as T; // Fallback for non-JSON strings
  }
} catch (error) {
  console.error(`Error getting item from localStorage (${key}):`, error);
  return null;
}
```

## Logging

**Framework:** `console` object (native browser/Node.js)

**Patterns:**
- Development use: `console.log()`, `console.error()`, `console.warn()`
- Error context includes operation details and error object
- Network status changes logged (from `useNetworkStatus.ts`: "네트워크 연결됨", "네트워크 연결 끊김")
- Toast notifications from `react-hot-toast` for user-facing messages

Example from `components/etc/GlobalLoadingManager.tsx`:
```typescript
console.error(`Error getting item from localStorage (${key}):`, error);
console.log("네트워크 연결됨");
```

## Comments

**When to Comment:**
- Function/file level: JSDoc-style comments explaining purpose and parameters
- Complex logic: inline comments explaining "why" not "what"
- Korean language for comments matching codebase language
- Type definitions documented with `/** ... */` blocks

Example from `lib/storage.ts`:
```typescript
/**
 * LocalStorage 관리 유틸리티
 * 타입 안전하고 일관된 방식으로 localStorage를 사용하기 위한 헬퍼
 */

/**
 * 값 가져오기
 * @param key - 저장소 키
 * @returns 저장된 값 또는 null
 */
get<T = string>(key: StorageKey): T | null {
```

Example from `lib/hooks/useNetworkStatus.ts`:
```typescript
/**
 * 네트워크 연결 상태를 감지하는 커스텀 훅
 * @returns isOnline - 현재 온라인 상태 여부
 */
export function useNetworkStatus() {
```

## Function Design

**Size:** Functions kept relatively small and focused
- Components typically 100-150 lines
- Helper functions 20-50 lines
- Reducers and state handlers kept compact with switch statements

**Parameters:**
- Destructured props in component function signatures
- Generic type parameters for reusable utilities (e.g., `get<T = string>()`, `set<T>()`)
- Object parameters for multiple related values

Example from `components/modals/ConfirmModal.tsx`:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClassName?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  children,
  modalClassName
}: ModalProps) {
```

**Return Values:**
- Explicit return types (JSX.Element, void, etc.)
- Null/undefined for optional returns
- Type-safe returns from reducers using discriminated unions

Example reducer action types from `lib/reducers/gachaReducer.ts`:
```typescript
export type GachaAction =
  | { type: "GACHA_PULL"; payload: { ... } }
  | { type: "RESET_ALL" }
  | { type: "UPDATE_PICKUP_INFO"; payload: { ... } };
```

## Module Design

**Exports:**
- Default exports for page components and main component files
- Named exports for utilities, hooks, types, and helpers
- Barrel pattern NOT used (each import specifies exact path)

Example from `lib/storage.ts`:
```typescript
export const STORAGE_KEYS = { ... };
export type StorageKey = ...;
export const storage = { ... };
```

**File Organization:**
- Type definitions at top of files
- Utility/helper functions in separate files in `lib/` directory
- Component logic in component files with helper functions defined above component
- Reducer logic in separate reducer files with initial state and action types

**TypeScript:**
- Strict mode enabled in `tsconfig.json`
- Full type coverage expected
- No implicit `any`
- Generic types used for reusable functions

---

*Convention analysis: 2026-01-24*
