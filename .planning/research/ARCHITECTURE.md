# Architecture Research: next-intl Migration

## 1. Migration Path: app/ → app/[locale]/

### Before (현재)
```
app/
├── layout.tsx          # lang="ko" 하드코딩
├── page.tsx
├── gacha_simulator/page.tsx
├── character/page.tsx
├── character/[id]/page.tsx
└── ... (39 pages)
```

### After (목표)
```
app/
├── [locale]/
│   ├── layout.tsx      # lang={locale} 동적, NextIntlClientProvider
│   ├── page.tsx
│   ├── gacha_simulator/page.tsx
│   ├── character/page.tsx
│   ├── character/[id]/page.tsx
│   └── ... (39 pages)
├── layout.tsx          # 최소한의 루트 레이아웃 (html, body만)
└── not-found.tsx       # 루트 레벨 404
```

### 마이그레이션 순서
1. `app/[locale]/` 디렉토리 생성
2. `app/layout.tsx` 내용을 `app/[locale]/layout.tsx`로 이동
3. `app/layout.tsx`는 최소 shell로 유지 (html, body)
4. 각 페이지를 `app/[locale]/` 하위로 이동
5. 미들웨어가 기존 URL을 locale URL로 리다이렉트

## 2. Translation Message File Structure

```
messages/
├── ko.json             # 전체 한국어 UI 번역
└── en.json             # 전체 영어 UI 번역
```

**네임스페이스 구조 (JSON 내부):**
```json
{
  "common": {
    "loading": "로딩 중...",
    "reset": "리셋",
    "confirm": "확인",
    "cancel": "취소"
  },
  "menu": {
    "playground": "놀이터",
    "library": "도서관",
    "guide": "가이드",
    "gachaSimulator": "가챠\n시뮬레이터"
  },
  "gacha": {
    "totalPulls": "총 뽑기 횟수",
    "pityCount": "천장 카운트",
    "pickupConfirmed": "픽업 확정"
  },
  "metadata": {
    "home": { "title": "버틴의 여행가방", "description": "..." },
    "gacha": { "title": "가챠 시뮬레이터", "description": "..." }
  }
}
```

## 3. Data Flow

```
[Request] → middleware.ts (locale 감지/리다이렉트)
         → app/[locale]/layout.tsx (locale params 수신)
         → i18n/request.ts (getRequestConfig → messages 로드)
         → NextIntlClientProvider (클라이언트 컴포넌트에 전달)

Server Component: getTranslations('namespace') → t('key')
Client Component: useTranslations('namespace') → t('key')

Game Dictionary (별도 경로):
  data/language/en_language_dict.json
  → lib/i18n/gameDictionary.ts (getGameTerm 헬퍼)
  → component에서 직접 호출
```

## 4. Game Dictionary Integration

기존 사전 파일은 100K+ 줄로 전체를 i18n 메시지에 넣으면 성능 문제 발생.

**전략: 별도 헬퍼 + 필요한 키만 조회**

```ts
// lib/i18n/gameDictionary.ts
import krDict from '@/data/language/kr_language_dict.json';
import enDict from '@/data/language/en_language_dict.json';

const dicts = { ko: krDict, en: enDict } as const;

export function getGameTerm(key: string, locale: 'ko' | 'en'): string {
  return dicts[locale]?.[key] ?? dicts['ko'][key] ?? key;
}
```

**캐릭터 데이터 연동:**
- characters.ts의 각 캐릭터에 `dictionaryKey` 필드 추가 (또는 기존 매핑 활용)
- 컴포넌트에서 locale에 따라 사전 조회

**성능 고려:**
- JSON import는 빌드 타임에 번들링됨 → 100K줄 파일은 클라이언트 번들에 포함되면 안 됨
- 서버 컴포넌트에서만 사전 조회하거나, 필요한 부분만 추출하여 클라이언트에 전달

## 5. Component Migration Strategy

### 서버 컴포넌트 (대부분의 페이지)
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('gacha');
  return <h1>{t('title')}</h1>;
}
```

### 클라이언트 컴포넌트 ('use client')
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function GachaStats() {
  const t = useTranslations('gacha');
  return <span>{t('totalPulls')}</span>;
}
```

### 네비게이션 (Link, redirect)
```tsx
import { Link } from '@/i18n/navigation';
// 자동으로 현재 locale prefix 추가
<Link href="/character">캐릭터</Link>
```

## 6. Suggested Build Order

| Phase | 작업 | 이유 |
|-------|------|------|
| 1 | i18n 인프라 + [locale] 레이아웃 | 모든 것의 기반 |
| 2 | 공통 UI + 메뉴 + 언어 전환 UI | 전체 사이트에 영향 |
| 3 | 홈페이지 + 메타데이터 | 진입점, SEO 기반 |
| 4 | 가챠 시뮬레이터 (가장 큰 기능) | 핵심 기능 |
| 5 | 캐릭터 정보 + 게임 사전 | 데이터 레이어 |
| 6 | 나머지 페이지들 | 패턴 반복 적용 |
| 7 | 가이드 콘텐츠 | 가장 많은 텍스트 |
| 8 | PWA + sitemap + 최종 통합 | 배포 준비 |

## 7. Test Migration Strategy

### Jest 테스트 호환
- 테스트 유틸리티에 `NextIntlClientProvider` wrapper 추가
- 기존 테스트의 텍스트 매칭이 깨질 수 있음 → 번역 키 또는 role/testid 기반으로 전환

### Playwright E2E 호환
- `baseURL`을 `/ko/` prefix로 업데이트
- 또는 미들웨어가 `/` → `/ko/`로 리다이렉트하므로 자동 처리
- 영어 전환 테스트 시나리오 추가

---
*Researched: 2026-02-18*
