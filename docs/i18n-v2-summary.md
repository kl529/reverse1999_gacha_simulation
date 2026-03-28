# i18n v2 다국어 지원 — 작업 요약

## 배경

2026-02-18 기준으로 `feature/i18n-support` 브랜치에서 별도 작업. main 브랜치는 그 사이 게임 데이터 업데이트 19개 커밋이 쌓인 상태. 2026-03-28 `feature/i18n-v2`로 통합.

## 브랜치 구조

```
main (4fee6cb)
  └── feature/i18n-v2  ← PR 대상
        ├── feature/i18n-support 20커밋 (i18n 구현)
        └── main 19커밋 (게임 데이터 업데이트) merge
```

## 구현 범위

### Phase 1 — 인프라 설정
- `next-intl` 설치 (`^4.8.3`)
- `next.config.ts` — `withNextIntl` 플러그인 래핑
- `middleware.ts` — 로케일 감지, `/` → `/ko` 리다이렉트
- `i18n/routing.ts` — 지원 로케일 `['ko', 'en']`, 기본값 `ko`
- `i18n/navigation.ts` — locale-aware `Link`, `useRouter`, `usePathname`
- `i18n/request.ts` — 서버사이드 메시지 로딩

### Phase 2 — 공통 UI 번역
- `LanguageSwitcher` 컴포넌트 신규 추가 (우상단 고정)
- HamburgerMenu, Header 번역
- 에러 페이지 (`error.tsx`, `not-found.tsx`) 번역

### Phase 3 — SEO 메타데이터
- 32개 페이지 `generateMetadata` → `getTranslations()` 전환
- `generatePageMetadata` 유틸 함수 (`lib/metadata.ts`)
- hreflang 태그 (`<link rel="alternate" hreflang="ko|en">`)
- `next-sitemap` 로케일 alternate 설정 (593 URL)

### Phase 4~6 — 페이지별 UI 번역
| Phase | 대상 |
|-------|------|
| 4 | 가챠 시뮬레이터 전체 UI |
| 5 | 캐릭터, 스킨 페이지 |
| 6 | 퀴즈, 빙고, 캐릭터퀴즈, 최애캐릭터, 데미지계산기, 추천조합, 상점효율, 청사진, 육성계산기, 공명설정 |

### Phase 7 — 가이드 페이지 번역
- 가챠가이드, 콘텐츠가이드, 유포리아가이드, 사이큐브가이드
- 뉴비가이드, 쿠폰, 미래통찰, 캘린더

### Phase 8 — 라우팅 마이그레이션
- `app/` → `app/[locale]/` 전체 35개 페이지 이동
- 39개 파일 `Link`, `useRouter` → locale-aware 버전 교체
- 게임 데이터 `getLocalizedName()` 접근자 적용 (캐릭터, 재료, 사이큐브)

## 번역 파일 구조

```
messages/
  ko.json   ← 한국어 (기본)
  en.json   ← 영어
```

30개 네임스페이스: `common`, `menu`, `home`, `footer`, `language`, `metadata`, `gacha`, `character`, `skin`, `quiz`, `bingo`, `newbieGuide`, `coupon`, 등

## 알려진 Tech Debt

| 항목 | 위치 | 우선순위 |
|------|------|---------|
| 가이드 섹션 미번역 | `CashPackageShop` | 낮음 |
| 메타데이터 한국어 이름 | `skin/[id]`, `psycube_guide/[id]` | 낮음 |
| 산발적 한국어 문자열 | 하위 트래픽 페이지 ~6개 | 낮음 |
| `t` missing deps warning | 여러 컴포넌트 | 무해 (next-intl 특성) |

## 테스트 체크리스트

- [ ] `/ko` 한국어 전체 페이지 정상 렌더링
- [ ] `/en` 영어 전체 페이지 정상 렌더링
- [ ] 언어 전환 버튼 (KO↔EN) 동작
- [ ] 언어 전환 후 URL 변경 확인 (`/ko/gacha_simulator` ↔ `/en/gacha_simulator`)
- [ ] 모바일 반응형 (375px)
- [ ] 가챠 시뮬레이터 영어 동작
- [ ] 캐릭터 목록 영어 이름 표시
- [ ] SEO hreflang 태그 확인 (페이지 소스)

## PR

https://github.com/kl529/reverse1999_gacha_simulation/pull/5
