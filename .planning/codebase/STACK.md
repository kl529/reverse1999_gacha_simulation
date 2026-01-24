# Technology Stack

**Analysis Date:** 2026-01-24

## Languages

**Primary:**
- TypeScript 5 - All source code and configuration
- React 19.0.0 - UI components and client-side rendering
- JavaScript - Build scripts and configuration files

**Secondary:**
- HTML/CSS - Page templates and styling
- SCSS/Sass 1.72.0 - Extended stylesheet support

## Runtime

**Environment:**
- Node.js (version specified in package.json through Next.js 15)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 15.5.4 - Full-stack React framework with App Router
- React 19.0.0 - UI library and component framework
- React DOM 19.0.0 - DOM rendering

**UI & Styling:**
- Radix UI (multiple components @radix-ui/*) - Headless UI component library
  - Accordion, Aspect Ratio, Checkbox, Collapsible, Dialog, Dropdown Menu, Label, Popover, Scroll Area, Select, Separator, Slider, Slot, Switch
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- Framer Motion 12.4.3 - Animation library
- next-themes 0.4.6 - Theme management (light/dark mode)
- class-variance-authority 0.7.1 - CSS variant management
- tailwind-merge 3.3.1 - Tailwind class merging utility
- tailwindcss-animate 1.0.7 - Animation utilities for Tailwind

**Calendar:**
- FullCalendar 6.1.18 suite - Interactive calendar component
  - @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/react, @fullcalendar/rrule, @fullcalendar/interaction

**Build & Dev:**
- ESLint 9.26.0 - Code linting
- Prettier 3.5.3 - Code formatting
- PostCSS 8 - CSS transformation
- Next.js Bundle Analyzer - Bundle size analysis

**Testing:**
- Jest 29.7.0 - Unit test runner
- Testing Library 6.6.3 - React component testing utilities
- jest-environment-jsdom 29.7.0 - DOM environment for Jest

**PWA & Deployment:**
- next-pwa 5.6.0 - Progressive Web App support
- next-sitemap 4.2.3 - Sitemap generation for SEO

## Key Dependencies

**Critical:**
- Firebase 12.4.0 - Real-time database, Firestore, Cloud Messaging client library
- firebase-admin 13.5.0 - Firebase Admin SDK for server-side operations
- posthog-js 1.298.1 - Product analytics and event tracking

**UI Components & Utilities:**
- lucide-react 0.510.0 - Icon library
- cmdk 1.1.1 - Command palette component
- react-hot-toast 2.5.2 - Toast notification component
- animate.css 4.1.1 - CSS animation library
- html-to-image 1.11.13 - Convert DOM to image (screenshot functionality)

**Utilities:**
- uuid 13.0.0 - UUID generation
- react-responsive 10.0.1 - Media query breakpoint detection
- sass 1.72.0 - SCSS compiler
- sass-loader 13.3.3 - SCSS webpack loader
- style-loader 4.0.0 - CSS loader
- css-loader 7.1.2 - CSS module loader

## Configuration

**Environment:**
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key (public)
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase Auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase Storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - FCM sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Google Analytics measurement ID
- `NEXT_PUBLIC_FIREBASE_VAPID_KEY` - FCM VAPID key for push notifications
- `NEXT_PUBLIC_CDN_URL` - Cloudflare R2 CDN URL for asset delivery
- `FIREBASE_PROJECT_ID` - Firebase project ID (server-side)
- `FIREBASE_CLIENT_EMAIL` - Firebase service account email
- `FIREBASE_PRIVATE_KEY` - Firebase service account private key

**Build:**
- `next.config.ts` - Next.js configuration with PWA and image optimization
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier formatting configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `jest.config.js` - Jest test configuration
- `tsconfig.json` - TypeScript configuration with path alias `@/*`

**CSS/Style Configuration:**
- Tailwind dark mode: class-based (`darkMode: ["class"]`)
- Prettier with tailwind plugin: sorts Tailwind classes
- ESLint with Prettier plugin integration
- PostCSS with Tailwind plugin

## Platform Requirements

**Development:**
- Node.js (ES2017+ compatible)
- npm package manager
- Supports all modern browsers with ES2017+ support

**Production:**
- Vercel (implied by Next.js defaults, but Cloudtype configured)
- Cloudtype deployment platform
- Cloudflare R2 CDN for asset delivery (reverse1999-r2-public.lyva.workers.dev)
- Firebase backend (Firestore database, Cloud Messaging, Analytics)
- Service Worker support (PWA functionality)

**Output Mode:**
- Standalone build configured (`output: "standalone"` in next.config.ts)
- Image optimization disabled for Cloudtype memory constraints
- WebP format for images

---

*Stack analysis: 2026-01-24*
