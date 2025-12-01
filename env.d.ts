declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_APP_URL?: string
    readonly ANALYZE?: string

    // PostHog
    readonly NEXT_PUBLIC_POSTHOG_KEY?: string
    readonly NEXT_PUBLIC_POSTHOG_HOST?: string

    // Firebase Client
    readonly NEXT_PUBLIC_FIREBASE_API_KEY?: string
    readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string
    readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string
    readonly NEXT_PUBLIC_FIREBASE_APP_ID?: string
    readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?: string
    readonly NEXT_PUBLIC_FIREBASE_VAPID_KEY?: string

    // Firebase Admin
    readonly FIREBASE_PROJECT_ID?: string
    readonly FIREBASE_CLIENT_EMAIL?: string
    readonly FIREBASE_PRIVATE_KEY?: string
  }
}
