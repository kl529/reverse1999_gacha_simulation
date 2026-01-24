# Codebase Structure

**Analysis Date:** 2026-01-24

## Directory Layout

```
reverse1999_gacha_simulation/
├── app/                       # Next.js App Router pages and API routes
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout with global providers
│   ├── globals.css            # Global styles
│   ├── [feature]/             # Feature pages (gacha_simulator, character, quiz, etc.)
│   │   ├── page.tsx           # Feature page entry point
│   │   └── [id]/              # Dynamic pages for detail views
│   └── api/                   # Server-side API routes
│       ├── check-new-coupons/
│       ├── send-coupon-notification/
│       ├── subscribe-topic/
│       └── firebase-messaging-sw/
├── components/                # React UI components organized by feature
│   ├── ui/                    # Radix UI + Tailwind wrapped primitives
│   ├── etc/                   # Global infrastructure components
│   │   ├── ModalProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── PushNotificationManager.tsx
│   │   ├── GlobalLoadingManager.tsx
│   │   ├── HamburgerMenu.tsx
│   │   └── [other shared components]
│   ├── modals/                # Modal dialogs
│   ├── home/                  # Home page components
│   ├── [feature]/             # Feature-specific components (gacha_simulator, character, quiz, etc.)
│   └── [other feature dirs]
├── data/                      # Game content and static data
│   ├── characters.ts          # Character definitions by rarity
│   ├── banners.ts             # Gacha banner configurations
│   ├── quiz_questions.ts      # Quiz content
│   ├── character_quiz.ts      # Character-specific quiz
│   ├── [other game data]
│   └── [version].ts           # Version metadata for game updates
├── lib/                       # Utilities, types, state management
│   ├── types/                 # TypeScript type definitions
│   │   ├── quizTypes.ts       # Quiz-related types and guards
│   │   ├── menuTypes.ts       # Navigation menu types
│   │   └── growthCalculatorTypes.ts
│   ├── constants/             # Constants and configuration
│   │   └── menuItems.ts       # Navigation menu items configuration
│   ├── utils/                 # Utility functions
│   │   ├── checkNewCoupons.ts # Coupon checking logic
│   │   ├── growthCalculatorStorage.ts
│   │   ├── growthCalculatorCalculations.ts
│   │   └── farmingHelper.ts
│   ├── firebase/              # Firebase integration
│   │   ├── config.ts          # Firebase client config
│   │   ├── messaging.ts       # FCM messaging client
│   │   ├── firestore.ts       # Firestore client
│   │   └── admin.ts           # Firebase Admin SDK
│   ├── reducers/              # Redux-style reducers
│   │   └── gachaReducer.ts    # Gacha state reducer
│   ├── hooks/                 # Custom React hooks
│   │   └── useNetworkStatus.ts
│   ├── storage.ts             # LocalStorage abstraction
│   ├── cdn.ts                 # CDN URL generation
│   ├── posthog.ts             # Analytics event definitions
│   └── utils.ts               # General utilities
├── public/                    # Static assets
│   ├── infos/                 # Game info images
│   │   ├── menu/              # Menu icons
│   │   ├── link_img/          # Social share images
│   │   ├── modal_img/         # Modal content images
│   │   └── [other asset dirs]
│   ├── manifest.json          # PWA manifest
│   └── pwa_icon.webp          # PWA icon
├── __tests__/                 # Test files
├── docs/                      # Documentation
├── scripts/                   # Build and utility scripts
├── openspec/                  # OpenSpec specification (external tool)
├── .next/                     # Next.js build output
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
└── [config files]             # ESLint, Prettier, etc.
```

## Directory Purposes

**app/**
- Purpose: Next.js App Router pages and server-side API routes
- Contains: Page components (page.tsx), layout files (layout.tsx), API handlers (route.ts)
- Key files: `app/page.tsx` (home), `app/layout.tsx` (root layout), `app/api/**` (server endpoints)

**components/**
- Purpose: React UI components organized by feature domain
- Contains: Feature components, UI primitives, infrastructure providers
- Key files: `components/home/HomePage.tsx`, `components/gacha_simulator/GachaGame.tsx`, `components/etc/ModalProvider.tsx`

**components/ui/**
- Purpose: Reusable UI primitive components
- Contains: Radix UI wrapped with Tailwind CSS (Button, Dialog, Select, etc.)
- Used by: All feature components throughout the app

**components/etc/**
- Purpose: Global infrastructure and provider components
- Contains: Theme management, modal provider, error boundary, loading manager, analytics provider, PWA prompts
- Key files: `ModalProvider.tsx`, `ThemeProvider.tsx`, `ErrorBoundary.tsx`, `PushNotificationManager.tsx`

**data/**
- Purpose: Centralized game content and static data
- Contains: Character definitions, gacha banner configs, quiz questions, material lists, guides, settings
- Key files:
  - `characters.ts`: CharactersByRarity record with all 6-star, 5-star, etc. definitions
  - `banners.ts`: Banner configurations with pickup characters
  - `quiz_questions.ts`: General quiz content
  - `character_quiz.ts`: Character identification quiz
  - `version.ts`: Current game version and gacha pool inclusion rules

**lib/types/**
- Purpose: TypeScript type definitions and discriminated unions
- Contains: Quiz types with type guards, menu types, growth calculator types
- Key files:
  - `quizTypes.ts`: Question discriminated union with isMultipleChoiceQuestion, isTrueFalseQuestion, etc.
  - `menuTypes.ts`: CardItem, ModalCardItem, HamburgerMenuItem types
  - `growthCalculatorTypes.ts`: GrowthState, CharacterPlan, MaterialRequirement

**lib/constants/**
- Purpose: Application constants and configuration data
- Contains: Menu item definitions, navigation structure
- Key files: `menuItems.ts` with PLAYGROUND_ITEMS, LIBRARY_ITEMS, GUIDE_ITEMS arrays

**lib/utils/**
- Purpose: Utility functions and helpers
- Contains: Storage abstractions, calculation helpers, API client functions
- Key files:
  - `checkNewCoupons.ts`: Coupon checking and push notification logic
  - `growthCalculatorCalculations.ts`: Material requirement calculations
  - `growthCalculatorStorage.ts`: LocalStorage for growth plans

**lib/firebase/**
- Purpose: Firebase integration and configuration
- Contains: Client config, messaging, Firestore, Admin SDK
- Key files:
  - `config.ts`: Firebase app initialization with env vars
  - `messaging.ts`: FCM client for web push
  - `admin.ts`: Firebase Admin SDK for server-side operations
  - `firestore.ts`: Firestore client for data persistence

**lib/reducers/**
- Purpose: Redux-style state reducers
- Contains: Complex state management with useReducer
- Key files: `gachaReducer.ts` with GachaState, GachaAction, and reducer function

**lib/hooks/**
- Purpose: Custom React hooks
- Contains: Network status detection, other reusable hooks
- Key files: `useNetworkStatus.ts` for connection status

**public/**
- Purpose: Static assets served via CDN
- Contains: Images for menus, modals, characters, social sharing
- Structure:
  - `infos/menu/`: Menu button icons (.webp)
  - `infos/link_img/`: OpenGraph social share images
  - `infos/modal_img/`: Modal content images
  - `manifest.json`: PWA manifest file
  - `pwa_icon.webp`: App installation icon

## Key File Locations

**Entry Points:**
- `app/page.tsx`: Root/home page entry point
- `app/layout.tsx`: Root layout with providers, global styles, analytics initialization
- `app/[feature]/page.tsx`: Feature-specific entry points (gacha_simulator, character, quiz, etc.)

**Global Configuration:**
- `app/globals.css`: Global Tailwind CSS and custom styles
- `app/layout.tsx`: Global providers (ThemeProvider, ModalProvider, PostHogProvider, ErrorBoundary)
- `lib/storage.ts`: LocalStorage management with type safety
- `lib/posthog.ts`: Analytics event definitions

**Core Game Logic:**
- `components/gacha_simulator/GachaGame.tsx`: Main gacha simulation component with useReducer state
- `lib/reducers/gachaReducer.ts`: Gacha state machine
- `data/characters.ts`: Character pool and rarity definitions
- `data/banners.ts`: Banner pickup configurations
- `data/percent_rank_table.ts`: Statistical ranking data

**Quiz System:**
- `data/quiz_questions.ts`: Quiz content (multiple choice, text input, true/false, image+text)
- `lib/types/quizTypes.ts`: Quiz type definitions with type guards
- `data/character_quiz.ts`: Character identification quiz data
- `app/quiz/page.tsx`: Quiz feature entry point
- `components/quiz/`: Quiz-related UI components

**Navigation & Menus:**
- `lib/constants/menuItems.ts`: Menu configuration (PLAYGROUND_ITEMS, LIBRARY_ITEMS, GUIDE_ITEMS)
- `components/etc/HamburgerMenu.tsx`: Mobile navigation menu
- `components/home/HomePage.tsx`: Home page with feature links
- `lib/types/menuTypes.ts`: Menu type definitions

**API & Server:**
- `app/api/check-new-coupons/route.ts`: Coupon check and push notification endpoint
- `app/api/send-coupon-notification/route.ts`: Server-side push notification sender
- `app/api/subscribe-topic/route.ts`: FCM topic subscription
- `app/api/firebase-messaging-sw/route.ts`: Service worker messaging

**Infrastructure:**
- `components/etc/ModalProvider.tsx`: Centralized modal state management
- `components/etc/ThemeProvider.tsx`: Dark/light theme toggle
- `components/etc/ErrorBoundary.tsx`: Error boundary for React errors
- `components/etc/PushNotificationManager.tsx`: FCM subscription and notification handling
- `components/etc/PostHogProvider.tsx`: Analytics provider initialization
- `lib/firebase/config.ts`: Firebase app initialization

**Testing:**
- `__tests__/`: Test directory (location of Vitest/Jest tests)

## Naming Conventions

**Files:**
- Page components: `page.tsx` (App Router convention)
- Feature components: `PascalCase.tsx` (e.g., `GachaGame.tsx`, `CharacterGuide.tsx`)
- Utility files: `camelCase.ts` (e.g., `checkNewCoupons.ts`, `gachaReducer.ts`)
- Type definitions: `camelCaseTypes.ts` or `Types.ts` (e.g., `quizTypes.ts`)
- Data files: `camelCase.ts` (e.g., `characters.ts`, `banners.ts`)
- Configuration: `camelCase.ts` (e.g., `tailwind.config.js`, `next.config.js`)

**Directories:**
- Feature directories: `snake_case` (e.g., `gacha_simulator/`, `growth_calculator/`, `character_quiz/`)
- Type organization: `types/` subdirectory with descriptive names
- Utilities: `utils/` subdirectory
- Firebase: `firebase/` subdirectory
- Constants: `constants/` subdirectory
- Hooks: `hooks/` subdirectory
- Reducers: `reducers/` subdirectory

**Components:**
- React components: `PascalCase` (e.g., `HomePage`, `GachaGame`, `CharacterGuide`)
- Custom hooks: `use` prefix + `PascalCase` (e.g., `useNetworkStatus`)
- Providers: `[Name]Provider` (e.g., `ModalProvider`, `ThemeProvider`)

**Variables & Functions:**
- Constants: `UPPER_SNAKE_CASE` (e.g., `STORAGE_KEYS`, `PLAYGROUND_ITEMS`, `MIN_CHECK_INTERVAL`)
- Variables: `camelCase` (e.g., `selectedBanner`, `showDoublePick`, `isFirstPull`)
- Functions: `camelCase` (e.g., `enrichBanner`, `checkNewCouponsQuietly`, `findCharacterById`)
- Boolean flags: `is/has/can` prefix (e.g., `isProduction`, `hasSeenHelpModal`, `canInstall`)

## Where to Add New Code

**New Feature (Page + Component):**
1. Create feature directory in `app/[feature_name]/` with `page.tsx`
2. Add feature components in `components/[feature_name]/`
3. Add feature-specific types in `lib/types/[feature_name]Types.ts` (optional)
4. Add feature data in `data/[feature_name].ts` if needed
5. Add menu item to `lib/constants/menuItems.ts` and appropriate category (PLAYGROUND_ITEMS, LIBRARY_ITEMS, GUIDE_ITEMS)
6. If server-side logic needed, create `app/api/[feature_name]/route.ts`

**New Component:**
- Simple UI primitive: `components/ui/ComponentName.tsx`
- Feature-specific: `components/[feature_name]/ComponentName.tsx`
- Infrastructure/global: `components/etc/ComponentName.tsx`

**New Utility Function:**
- Domain-specific calculation: `lib/utils/[domain]Calculations.ts`
- Domain-specific storage: `lib/utils/[domain]Storage.ts`
- General utility: `lib/utils.ts` or new `lib/utils/[category].ts`

**New Type Definition:**
- Feature-specific types: `lib/types/[feature_name]Types.ts`
- Shared types: `lib/types/menuTypes.ts` or dedicated file

**New Game Data:**
- Character data: Extend `data/characters.ts` charactersByRarity
- Quest/guide data: New file `data/[content_name].ts`
- Configuration: `data/[config_name].ts`

**New API Endpoint:**
- Server-side handler: `app/api/[endpoint_name]/route.ts`
- Follow pattern: Export `POST` and/or `GET` functions returning `NextResponse`

## Special Directories

**node_modules/:**
- Purpose: NPM dependencies
- Generated: Yes
- Committed: No

**.next/:**
- Purpose: Next.js build output and cached build artifacts
- Generated: Yes (on `npm run build`)
- Committed: No

**.vercel/:**
- Purpose: Vercel deployment configuration and build cache
- Generated: Yes
- Committed: No

**.git/:**
- Purpose: Git version control metadata
- Generated: Yes
- Committed: N/A (system directory)

**public/:**
- Purpose: Static assets served by CDN and Next.js
- Generated: No (manually managed)
- Committed: Yes (versioned assets like images, icons)

**__tests__/:**
- Purpose: Test files (Jest/Vitest)
- Generated: No (manually written)
- Committed: Yes

**docs/:**
- Purpose: Project documentation
- Generated: No
- Committed: Yes

**.planning/codebase/:**
- Purpose: GSD codebase analysis documents (ARCHITECTURE.md, STRUCTURE.md, etc.)
- Generated: Yes (by GSD mapping tool)
- Committed: Yes

---

*Structure analysis: 2026-01-24*
