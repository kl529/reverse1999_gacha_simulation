# Architecture

**Analysis Date:** 2026-01-24

## Pattern Overview

**Overall:** Next.js 15 server-driven app with client-side game simulation and feature-based modular design.

**Key Characteristics:**
- Feature-based directory organization (gacha_simulator, character, quiz, etc.)
- Server-side API routes for push notifications and coupon management
- Client-side state management via useReducer for complex features (gacha)
- Multi-platform support (web + PWA with offline capabilities)
- Dynamic component loading with Next.js dynamic imports for code splitting

## Layers

**Page Layer (App Router):**
- Purpose: Server-side rendered entry points for each feature
- Location: `app/[feature]/page.tsx` (e.g., `app/gacha_simulator/page.tsx`, `app/character/page.tsx`)
- Contains: Page components with metadata, layout structure, dynamic component imports
- Depends on: Component layer, data layer
- Used by: Browser routing, Next.js App Router

**Component Layer:**
- Purpose: React UI components organized by feature
- Location: `components/[feature]/` directories
- Contains: Feature-specific UI components (GachaGame, HomePage, CharacterGuide, etc.)
- Depends on: UI primitives (Radix UI), lib utilities, data layer
- Used by: Page layer, other components

**UI Primitive Layer:**
- Purpose: Reusable Radix UI components wrapped with Tailwind CSS
- Location: `components/ui/`
- Contains: Button, Dialog, Select, Accordion, etc. components
- Depends on: Radix UI, Tailwind CSS
- Used by: Feature components throughout the application

**Utility/Helper Layer:**
- Purpose: Shared logic, storage management, analytics, Firebase integration
- Location: `lib/` subdirectories
- Contains:
  - `lib/utils/`: Growth calculator, coupon checking, farming helpers
  - `lib/firebase/`: Firebase config, messaging, Firestore, admin SDK
  - `lib/posthog.ts`: Analytics event tracking
  - `lib/storage.ts`: LocalStorage abstraction
  - `lib/cdn.ts`: CDN URL generation
  - `lib/constants/`: Menu items, constants
  - `lib/hooks/`: Custom React hooks (useNetworkStatus)
  - `lib/types/`: TypeScript interfaces (Quiz, Growth Calculator, Menu)
  - `lib/reducers/`: State management (gachaReducer)

**Data Layer:**
- Purpose: Game content, character data, balance data
- Location: `data/[content].ts`
- Contains: Characters (charactersByRarity), Banners, Quiz questions, Materials, Guides
- Depends on: None
- Used by: Components, utilities, page layers

**API Layer (Server-side):**
- Purpose: Server-side logic for push notifications, webhooks
- Location: `app/api/[feature]/route.ts`
- Contains: Firebase push notification endpoints, coupon check logic
- Depends on: Firebase Admin SDK, data layer, utilities
- Used by: Client-side fetch requests

**Infrastructure Layer:**
- Purpose: Global providers, error handling, theme management
- Location: `app/layout.tsx`, `components/etc/`
- Contains:
  - `ThemeProvider`: Dark/light theme management
  - `ModalProvider`: Centralized modal state management
  - `ErrorBoundary`: Error handling
  - `PushNotificationManager`: FCM subscription
  - `PostHogProvider`: Analytics initialization
  - `SecurityWrapper`: Security headers
  - `GlobalLoadingManager`: Global loading state
  - `HamburgerMenu`: Navigation

## Data Flow

**Feature Page Load Flow:**

1. Browser requests `app/[feature]/page.tsx`
2. Next.js renders page metadata (SEO, OpenGraph)
3. Page imports feature component from `components/[feature]/`
4. Feature component mounts with client-side state
5. On user interaction, component dispatches actions or makes API calls
6. For server operations (push notifications), component calls `fetch(/api/[feature]/route)`
7. API route processes and returns response
8. Component updates state and re-renders UI

**Gacha Simulator State Management:**

1. `GachaGame` component initializes `useReducer(gachaReducer, initialGachaState)`
2. State structure: `{ results, totalPulls, rarityStats, pityCount, pickupGuarantee, sixStarHistory, pickupShape, pickupRank }`
3. Actions dispatched: `GACHA_PULL`, `ADD_SIX_STAR_HISTORY`, `RESET_ALL`, `UPDATE_PICKUP_INFO`
4. useEffect tracks `sixStarHistory` changes to calculate pickup rank percentage
5. `percentRankTable` from `data/percent_rank_table.ts` used to determine statistical rank

**Analytics Event Flow:**

1. Component calls `analytics.funnel.featureUsed()` or similar method
2. `lib/posthog.ts` exports analytics object with categorized methods
3. Each call captures event via `posthog.capture(eventName, eventData)`
4. PostHog backend aggregates events for funnel analysis

**Push Notification Flow:**

1. On app load, `PushNotificationManager` subscribes to FCM topic "coupons"
2. Home page calls `checkNewCouponsQuietly()` from `lib/utils/checkNewCoupons.ts`
3. Function makes POST request to `/api/check-new-coupons`
4. API route uses `coupons` data from `data/coupon.ts`
5. Filters for new, unpushed, non-expired coupons
6. Uses Firebase Admin Messaging to send push notification
7. Stores sent coupon IDs in server memory cache (prevents duplicates in deployment cycle)

**Quiz State Flow:**

1. Quiz page loads with quiz set selection interface
2. On attempt, component reads attempt count from localStorage via `lib/storage.ts`
3. Quiz data loaded from `data/quiz_questions.ts` or `data/character_quiz.ts`
4. User answers stored in component state as `UserAnswer[]`
5. On completion, result calculated and optionally sent to Firebase Firestore (for ranking)
6. Attempt count persisted to localStorage

## Key Abstractions

**Character:**
- Purpose: Represents a game character with rarity, abilities, version metadata
- Examples: `data/characters.ts` exports `charactersByRarity` Record
- Pattern: Discriminated union by rarity (2-6 star), version tracking for gacha pool inclusion

**Banner:**
- Purpose: Represents gacha banner with pickup characters and drop rates
- Examples: `data/banners.ts` defines Banner with pickup6, pickup5, twoPickup6, bannerType
- Pattern: Enrichment pattern in `GachaGame.tsx` - raw banner data resolved to Character objects

**Quiz Question:**
- Purpose: Discriminated union for multiple question types (multiple_choice, image_text_input, text_input, true_false)
- Examples: `lib/types/quizTypes.ts` with type guards (`isMultipleChoiceQuestion`, etc.)
- Pattern: Polymorphic handling based on type guard in component render logic

**Menu Item:**
- Purpose: Navigation card representing a feature with icon, label, link
- Examples: `PLAYGROUND_ITEMS`, `LIBRARY_ITEMS`, `GUIDE_ITEMS` from `lib/constants/menuItems.ts`
- Pattern: Discriminated union (BaseCardItem vs ModalCardItem) for handling link navigation vs modal triggers

**GachaState:**
- Purpose: Complete gacha simulator state structure
- Examples: `lib/reducers/gachaReducer.ts` with `initialGachaState` constant
- Pattern: useReducer with strict action types for complex multi-part state transitions

**Storage:**
- Purpose: Type-safe localStorage abstraction
- Examples: `lib/storage.ts` exports `storage` object with get/set/remove/clear methods
- Pattern: Generic methods with SSR safety checks (typeof window)

## Entry Points

**Home Page:**
- Location: `app/page.tsx`
- Triggers: User visits root URL
- Responsibilities: Render HomePage component with metadata, initialize analytics funnel

**Feature Pages:**
- Location: `app/[feature]/page.tsx` (gacha_simulator, character, quiz, etc.)
- Triggers: User navigates to feature
- Responsibilities: Render feature-specific component with SEO metadata

**API Routes:**
- Location: `app/api/[feature]/route.ts`
- Triggers: Client-side fetch requests
- Responsibilities: Server-side operations (Firebase messaging, coupon checks)

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: All page requests
- Responsibilities: Initialize global providers (Theme, Modal, PostHog), attach analytics scripts (GA4, AdSense), render error boundary

## Error Handling

**Strategy:** Multi-layered approach with error boundary, try-catch blocks, and graceful degradation.

**Patterns:**
- `ErrorBoundary` component in root layout catches React rendering errors
- API routes wrap Firebase operations in try-catch, return `NextResponse.json({ error }, { status: 500 })`
- Utility functions (e.g., `checkNewCouponsQuietly`) silently fail with console.error
- Client-side storage operations check `typeof window` to prevent SSR errors
- Network-aware UI: `NetworkStatusToast` displays connection status to user

## Cross-Cutting Concerns

**Logging:**
- Development: Console logs with emoji prefixes (🔍, ✅, ❌, 📤) in API routes
- Production: PostHog event capture for analytics, structured logging in Firebase operations
- Pattern: Logical grouping by operation (coupon checking, push sending)

**Validation:**
- Type-safe with TypeScript discriminated unions and type guards
- Runtime validation in quiz type guards (`isTrueFalseQuestion`, etc.)
- Input validation in API routes (filter coupon data before processing)

**Authentication:**
- No explicit auth layer in observed code (appears to be read-only public app)
- Firebase Admin SDK initialized server-side for push notifications
- Client-side Firebase config for future auth extensions

**State Persistence:**
- Browser localStorage via `lib/storage.ts` for user progress (quiz attempts, guide progress)
- Server memory cache (Set) in `/api/check-new-coupons` for coupon deduplication within deployment cycle
- Firebase Firestore (implied by admin.ts, not observed in routes) for quiz rankings

**Analytics:**
- PostHog client initialized in root layout via `PostHogProvider`
- Funnel tracking: homeVisited → featureClicked → featureUsed
- Content tracking: characterViewed, guideViewed, skinViewed
- Event categorization: funnel, content, userBehavior, bingo, quiz, etc.

---

*Architecture analysis: 2026-01-24*
