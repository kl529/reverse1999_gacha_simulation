# Codebase Concerns

**Analysis Date:** 2026-01-24

## Tech Debt

**Large Monolithic Components:**
- Issue: Multiple components exceed 650 lines, combining state management, calculations, and rendering logic
- Files: `components/gacha_simulator/GachaGame.tsx` (673 lines), `components/growth_calculator/GrowthPlanModal_Growth.tsx` (529 lines), `components/growth_calculator/GrowthCalculatorPage.tsx` (810 lines)
- Impact: Difficult to test, maintain, and reuse logic. Changes to one concern (e.g., state calculation) require touching rendering code
- Fix approach: Extract state management into custom hooks, separate business logic from UI components, create smaller composable units

**Massive Static Data Files:**
- Issue: Game data stored as large inline TypeScript objects (~41,000 lines total across data/ directory)
- Files: `data/percent_rank_table.ts` (6,734 lines), `data/resonance_material.ts` (6,620 lines), `data/reveries_in_the_rain.ts` (3,869 lines), `data/resonance_pattern_material.ts` (2,865 lines)
- Impact: Bundle size bloat, slow module imports during build, no optimization. Single file takes 10+ seconds to parse
- Fix approach: Move data to JSON files, implement lazy loading with dynamic imports, consider database for frequently-accessed data, compress/minify data format

**Mixed Concerns in Utility Functions:**
- Issue: `lib/utils/farmingHelper.ts` (726 lines) contains calculation, material expansion, stage recommendations, and efficiency logic all in one module
- Files: `lib/utils/farmingHelper.ts`
- Impact: Difficult to test individual concerns, high coupling between calculations, harder to modify farming recommendation logic
- Fix approach: Split into separate modules by responsibility (calculator, recommender, expander), create typed interfaces for each concern

**No Type Validation at Entry Points:**
- Issue: Data from external sources (Firebase, form inputs) enters components without validation
- Files: Components using Firebase data directly (`lib/firebase/admin.ts`, `lib/firebase/messaging.ts`)
- Impact: Runtime errors from malformed data, type-safety lost at boundaries, debugging difficult when shape assumptions break
- Fix approach: Add Zod/io-ts schemas at Firebase interaction points, validate form submissions server-side

## Known Bugs

**Quiz Attempt Tracking Uses LocalStorage Without Error Handling:**
- Symptoms: Quiz attempt counter persists across browser sessions; if localStorage is full or cleared, user state lost without notification
- Files: `components/quiz/Quiz.tsx` (lines 47-89)
- Trigger: LocalStorage quota exceeded, private browsing mode, browser extensions clearing storage
- Workaround: None. Users cannot complete quiz after reaching daily limit in private browsing
- Impact: Accessibility issue, affects users with storage constraints

**Test Suite Incomplete:**
- Symptoms: Only 1 test file exists (`__tests__/gacha.test.tsx`) with a broken import (`handleGacha` function not exported)
- Files: `__tests__/gacha.test.tsx` (line 1), `components/gacha_simulator/GachaGame.tsx` (no export of `handleGacha`)
- Trigger: Running `npm test`
- Workaround: None currently
- Impact: Core gacha logic has no test coverage, regressions can ship to production

**Character Lookup Can Throw Unhandled Errors:**
- Symptoms: Character detail pages crash if character ID doesn't exist
- Files: `components/gacha_simulator/GachaGame.tsx` (lines 30-36, `findCharacterById` throws Error)
- Trigger: Manual URL navigation to non-existent character ID (e.g., `/character/99999`)
- Workaround: None. Page shows error boundary instead of 404
- Impact: Poor UX, error tracking noise in Sentry/PostHog

## Performance Bottlenecks

**Bundle Includes Entire Data Graph:**
- Problem: All game data (`data/*.ts` files) imported directly in components, forcing bundle inclusion
- Files: `components/etc/CharacterGrowthCalculator.tsx` imports from `data/resonance_material.ts`, `data/euphoria_material.ts`, `data/resonance_pattern_material.ts`, etc.
- Cause: No dynamic/lazy loading, all imports are static
- Improvement path: Use `React.lazy` for components, split data with code-splitting, implement on-demand data fetching from API

**Math.random() Used for Core Gacha Mechanics:**
- Problem: Gacha draws use native `Math.random()` which has known PRNG quality issues and is predictable
- Files: `components/gacha_simulator/GachaGame.tsx` (lines 102, 186, 189 use `Math.random()`)
- Cause: No seeding or cryptographic randomness for simulation results
- Improvement path: Replace with seeded PRNG (e.g., seedrandom.js) for reproducible results, document seed if shareable

**Recursive Material Expansion Has No Cycle Detection:**
- Problem: `expandCraftingRequirements` recursively expands materials; if circular dependencies exist in crafting recipes, infinite loop possible
- Files: `lib/utils/farmingHelper.ts` (lines 53-250)
- Cause: No visited set to track processed materials
- Improvement path: Add `Set<number>` to track visited materials, throw error if cycle detected

**Quiz Result Sorting Without Memoization:**
- Problem: RankingBoard sorts 100+ quiz results on every render
- Files: `components/quiz/RankingBoard.tsx` (likely in sort operation)
- Cause: No useMemo around sorted result array
- Improvement path: Wrap sort logic in useMemo with dependency on result data

## Fragile Areas

**Firebase Configuration Hardcoded in Client:**
- Files: `lib/firebase/config.ts`, `.env.local`
- Why fragile: Firebase API keys are public (NEXT_PUBLIC_ prefix), project ID exposed. Migration to new Firebase project requires code changes and redeployment
- Safe modification: Create wrapper functions that abstract Firebase client, add feature flags for switching configurations
- Test coverage: No tests for Firebase initialization or error states

**Gacha Banner Version Logic Uses String Comparison:**
- Files: `components/gacha_simulator/GachaGame.tsx` (lines 38-68, `parseFloat(version)` parsing)
- Why fragile: Version strings like "1.0", "1.5", "2.0" compared with `parseFloat()`. Versions like "1.10" incorrectly sort as less than "1.9"
- Safe modification: Switch to semantic version parsing (use semver package), validate version format on data load
- Test coverage: No tests for version comparison edge cases

**Character Data Enrichment on Every Render:**
- Files: `components/gacha_simulator/GachaGame.tsx` (lines 38-68, `enrichBanner()` called in useState initial value)
- Why fragile: `enrichBanner()` relies on character lookup which throws. If character data changes, banner enrichment breaks silently
- Safe modification: Move enrichment to useEffect with error boundary, add console warning if character not found
- Test coverage: No unit tests for enrichment logic

**Quiz Questions Data Type Inconsistency:**
- Files: `data/quiz_questions.ts` (line 16, only reference in codebase mentions "WARNING")
- Why fragile: Questions loaded via `getRandomQuestionsByQuizSet()` but no validation of question structure. Malformed data crashes quiz mid-session
- Safe modification: Add runtime validation with Zod, fallback questions if validation fails
- Test coverage: No schema validation tests

## Scaling Limits

**LocalStorage for Quiz Persistence:**
- Current capacity: ~5MB per domain (varies by browser)
- Limit: After ~10,000 quiz attempts with detailed results, storage quota exceeded
- Scaling path: Migrate to Firebase Firestore for cloud persistence, keep LocalStorage as cache, implement cleanup of old results (>30 days)

**All Character Data in Memory:**
- Current capacity: ~200 characters × ~50KB per character (with skins/metadata) = ~10MB
- Limit: Mobile devices with <50MB free memory will experience lag during character selection
- Scaling path: Implement pagination on character lists, lazy-load character details API, reduce metadata in memory

**Static Image Assets (94MB public/ directory):**
- Current capacity: CDN serving from Cloudflare R2
- Limit: Build time grows with asset size; users on slow networks experience slow initial load
- Scaling path: Implement automatic image optimization (convert to WebP, resize), implement service worker image caching, consider image hosting API instead of static files

## Dependencies at Risk

**Firebase SDK Version Mismatch:**
- Risk: `firebase@^12.4.0` and `firebase-admin@^13.5.0` are major versions apart; some APIs may diverge
- Impact: Cloud function deploy failures, authentication issues between client and admin
- Migration plan: Pin to compatible versions (firebase@12.x, firebase-admin@12.x), add version compatibility tests

**Outdated Testing Setup:**
- Risk: Jest 29.7.0 is 18+ months old (current is 30+); missing modern features and security patches
- Impact: Slow test execution, missing TypeScript improvements in newer versions
- Migration plan: Upgrade to Jest 30+ or migrate to Vitest for better ESM/TypeScript support

**Next.js Image Optimization Disabled:**
- Risk: `unoptimized: true` in `next.config.ts` (line 14) disables image optimization to save Cloudtype memory
- Impact: Users download unoptimized images (2-3x larger), poor mobile experience, waste bandwidth
- Migration plan: Implement external image optimization service (Vercel Image, imgproxy), use smaller WebP format by default

## Missing Critical Features

**No Error Boundary for Async Data:**
- Problem: Character detail pages, quiz results, farming recommendations don't handle loading/error states consistently
- Blocks: Users see blank screens during data load, unclear if request failed or still loading
- Impact: Poor UX, untracked abandoned sessions

**No Data Validation Schema:**
- Problem: Game data changes (character updates, banner changes) not validated against expected schema
- Blocks: Typos in data files silently propagate (e.g., missing character image path)
- Impact: Runtime errors discovered by users, not in QA

**No API Rate Limiting or Caching:**
- Problem: Quiz result uploads, ranking queries to Firebase have no caching or rate limiting
- Blocks: Firebase quota exhaustion possible with moderate traffic
- Impact: Service degradation or unexpected Firebase charges

## Test Coverage Gaps

**Gacha Probability Calculation Untested:**
- What's not tested: Banner pickup rates, 6-star pity system, 5-star logic, weapon banner rates
- Files: `components/gacha_simulator/GachaGame.tsx` (lines 152-250+)
- Risk: Probability math errors (off-by-one, wrong percentile) ship to production, players discover incorrect odds
- Priority: High - core business logic

**Farming Helper Algorithm Untested:**
- What's not tested: Material expansion recursion, crafting efficiency, stage recommendations
- Files: `lib/utils/farmingHelper.ts` (entire file)
- Risk: Players get incorrect farming strategies, waste stamina on inefficient stages
- Priority: High - impacts player progression

**Character Growth Calculator Edge Cases Untested:**
- What's not tested: Insight level transitions, resonance pattern changes, edge cases at max level
- Files: `components/etc/CharacterGrowthCalculator.tsx` (lines 1-810)
- Risk: Calculator shows wrong material requirements at boundary conditions
- Priority: Medium - affects accuracy

**Quiz Scoring Logic Untested:**
- What's not tested: Score calculation, ranking algorithm, tie-breaking rules
- Files: `components/quiz/QuizResult.tsx`, `components/quiz/RankingBoard.tsx`
- Risk: Leaderboard incorrect rankings, tie-break logic wrong
- Priority: Medium - affects competitive feature

**Responsive Design Not Tested:**
- What's not tested: Mobile/tablet layout, component behavior at different breakpoints
- Files: All components (no E2E tests)
- Risk: Mobile users experience broken layouts, overlapping elements
- Priority: Medium - 60% of traffic is mobile

## Security Considerations

**Firebase Keys Exposed in Client Code:**
- Risk: Firebase public API keys visible in `next.config.ts`, `.env.local`, page source
- Files: `lib/firebase/config.ts` (all env vars are NEXT_PUBLIC_)
- Current mitigation: Firebase security rules should restrict unauthorized access
- Recommendations: Implement App Check (reCAPTCHA), restrict Firebase API key to this domain only, monitor Firebase console for suspicious access

**No Content Security Policy:**
- Risk: Script injection possible if user input rendered without sanitization
- Files: Quiz components render user-submitted answers if quiz allows text input
- Current mitigation: React auto-escapes strings, but inline handlers not protected
- Recommendations: Add CSP headers in `next.config.ts`, audit all HTML renders for unsafe patterns

**Private Key in Committed `.env.local`:**
- Risk: Firebase Admin SDK private key visible in git history and `.env.local` file
- Files: `.env.local` (line 15, FIREBASE_PRIVATE_KEY)
- Current mitigation: `.env.local` in `.gitignore`, but key exposed in Cloudtype environment
- Recommendations: Rotate Firebase Admin key immediately, use Cloudtype secrets manager, never commit `.env.local`, audit git history for exposures

**No HTTPS Enforcement:**
- Risk: API calls to Firebase over HTTP possible if configured incorrectly
- Files: All Firebase client calls in `lib/firebase/`
- Current mitigation: Firebase SDK forces HTTPS, but downstream APIs might not
- Recommendations: Add HSTS headers, audit all API calls for protocol

## Data Management Issues

**Game Data Updates Require Code Deploy:**
- Problem: Character stats, item materials, gacha banners hardcoded in TypeScript files
- Impact: Any balance change requires code modification and production redeploy, downtime possible
- Improvement: Migrate game data to Firebase Realtime Database or Firestore with version control, implement client-side cache with stale-while-revalidate

**Image Path Changes Break Without Validation:**
- Problem: Image CDN URLs scattered across data files; changing domain requires grep-replace and manual testing
- Files: All data files with `path` or `image` fields
- Impact: Recent fix: "멜라니아 이미지 경로 대소문자 수정" suggests multiple similar issues
- Improvement: Centralize CDN URL in config, create image path helper that validates existence

---

*Concerns audit: 2026-01-24*
