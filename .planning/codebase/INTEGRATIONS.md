# External Integrations

**Analysis Date:** 2026-01-24

## APIs & External Services

**Analytics:**
- PostHog - User behavior analytics and product intelligence
  - SDK/Client: `posthog-js` 1.298.1
  - Integration: `lib/posthog.ts` - Wraps PostHog with custom event categories
  - Events tracked: Feature usage, funnel analysis, content views, gacha mechanics, quizzes, errors

**Payment & Monetization:**
- Firebase In-App Messaging (via Firebase SDK) - Promotional content delivery
- Support for in-game package information and guides (no direct payment integration, informational only)

## Data Storage

**Databases:**
- Firestore (Firebase Cloud Firestore)
  - Connection: `FIREBASE_PROJECT_ID=vertin-suitcase`
  - Client: `firebase` 12.4.0
  - Server SDK: `firebase-admin` 13.5.0
  - Collections:
    - `quiz_rankings` - Stores user quiz rankings and scores
  - Implementation: `lib/firebase/firestore.ts`
  - Firestore operations: save rankings, fetch rankings with sorting, query by quiz set

**File Storage:**
- Cloudflare R2 (Object Storage)
  - URL pattern: `https://reverse1999-r2-public.lyva.workers.dev/`
  - Environment: `NEXT_PUBLIC_CDN_URL`
  - Purpose: Host character skins, banners, and game asset images
  - Configuration: Configured in `next.config.ts` as allowed remotePattern
  - Fallback: Local `public/` folder if CDN unavailable

**Caching:**
- Browser cache (via Service Worker/PWA)
  - Image cache: 1 year max age, max 500 entries
  - Network-first cache: 24 hour max age, max 200 entries
  - Configured in `next.config.ts` PWA settings

- Local Storage
  - For temporary game state and user preferences
  - Not explicitly detailed in integrations, but referenced in PWA context

## Authentication & Identity

**Auth Provider:**
- Firebase Authentication (via Supabase-style approach not directly used; pure Firebase)
  - Implementation: Configured in `lib/firebase/config.ts`
  - Client-side initialization with `initializeApp(firebaseConfig)`
  - No explicit OAuth/Social login observed in codebase

**User Sessions:**
- Firebase automatically manages session persistence via browser storage

## Monitoring & Observability

**Error Tracking:**
- PostHog (via posthog-js)
  - Custom error events: `error_occurred`, `network_error`
  - Tracked data: Error message, stack trace, page URL, status codes

**Logs:**
- Console-based logging
  - Firebase Messaging: Detailed logging in `lib/firebase/messaging.ts` (console.log, console.warn, console.error)
  - No centralized logging service (Sentry, LogRocket, etc.)

**Analytics:**
- PostHog product analytics
- Firebase Measurement (Google Analytics via `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`)

## Push Notifications & Messaging

**FCM (Firebase Cloud Messaging):**
- Service: Firebase Cloud Messaging
- Tokens: `NEXT_PUBLIC_FIREBASE_VAPID_KEY` for browser push
- Implementation: `lib/firebase/messaging.ts`
  - `requestNotificationPermission()` - Request browser notification permission and get FCM token
  - `onMessageListener()` - Listen for foreground messages
  - `subscribeToTopic(token, topic)` - Subscribe token to topic
- Server-side routing: `app/api/subscribe-topic/route.ts` - Handle topic subscriptions
- Service Worker integration: Dynamic registration of Firebase messaging service worker
- Message handling: `components/etc/PushNotificationManager.tsx`

## Webhooks & Callbacks

**Incoming Webhooks:**
- `app/api/firebase-messaging-sw/route.ts` - Service Worker registration endpoint for Firebase messaging
- `app/api/subscribe-topic/route.ts` - Handles FCM topic subscriptions
- `app/api/check-new-coupons/route.ts` - Check for coupon availability
- `app/api/send-coupon-notification/route.ts` - Send coupon notifications to users

**Outgoing:**
- PostHog event submissions (via posthog-js library)
- Firebase Firestore data writes (rankings submission)
- Firebase Cloud Messaging token management

## CI/CD & Deployment

**Hosting:**
- Primary: Cloudtype (configured, indicated by standalone build)
- Fallback: Vercel (default Next.js deployment target)

**Environment Configuration:**
- Development: `.env.local` file
- Production: Cloudtype environment variables dashboard
  - All Firebase configuration variables required
  - CDN URL configuration
  - Admin SDK credentials (private key handling required)

**Auto-deployment:**
- Git push to main branch triggers Cloudtype deployment
- Build script: `npm run build` with PWA sitemap generation
- Post-build: `npm run copy-standalone` for standalone mode

## Image Optimization & CDN

**CDN Helper Functions:** `lib/cdn.ts`
- `getCdnUrl(path)` - Generic CDN URL builder
- `getSkinIllustUrl(filename)` - Character skin illustration
- `getSkinListUrl(filename)` - Character skin list image
- `getBannerUrl(filename)` - Gacha banner image
- `getCharacterUrl(rarity, filename, isSmall?)` - Character portrait (always local)
- `getHomeUrl(filename)` - Home page imagery
- `getInfoUrl(category, filename)` - General info images

**Image Format:** WebP preferred (`formats: ["image/webp"]`)

## Security Considerations

**API Keys:**
- Public keys: Prefixed with `NEXT_PUBLIC_` (Firebase client config, CDN URL, VAPID key)
- Private keys: Server-side only (Firebase Admin SDK credentials)
- Private key handling: Escaped newlines in environment variable (`FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")`)

**CORS & Headers:**
- Security headers configured in `next.config.ts`:
  - `X-Frame-Options: SAMEORIGIN` - Prevent clickjacking
  - `X-Content-Type-Options: nosniff` - Prevent MIME type sniffing
  - `Referrer-Policy: origin-when-cross-origin` - Control referrer info
  - `X-DNS-Prefetch-Control: on` - Allow DNS prefetch

**Firestore Security:**
- Database uses default Firebase security rules (likely open to all for quiz rankings)
- No RLS (Row Level Security) explicitly configured

## Environment Validation

**Critical Environment Variables Required:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_FIREBASE_VAPID_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `NEXT_PUBLIC_CDN_URL` (optional - falls back to local `/public`)

---

*Integration audit: 2026-01-24*
