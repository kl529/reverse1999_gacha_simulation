# i18n 구현 문서 (Internationalization Implementation)

## 개요

Reverse 1999 시뮬레이터 웹앱에 한국어/영어 다국어 지원을 추가하는 작업입니다.
`next-intl` 기반으로 `/ko`, `/en` URL 라우팅을 구현하고, 모든 UI 텍스트를 번역 키로 전환했습니다.

- **스택**: Next.js 15.1.7 + next-intl
- **지원 언어**: 한국어 (ko, 기본), 영어 (en)
- **브랜치**: `feature/i18n-support`

---

## 아키텍처

### 디렉토리 구조

```
app/
  [locale]/             # 로케일 동적 라우트
    layout.tsx          # NextIntlClientProvider 래핑
    page.tsx            # 홈페이지
    [feature]/          # 각 기능 페이지
      page.tsx
messages/
  ko.json               # 한국어 번역 (1,065 키, 38 네임스페이스)
  en.json               # 영어 번역 (1,065 키, 38 네임스페이스)
i18n/
  routing.ts            # defineRouting: locales, defaultLocale, pathnames
  navigation.ts         # createNavigation: Link, redirect, usePathname, useRouter, getPathname
  request.ts            # getRequestConfig: 서버 컴포넌트용 메시지 로딩
middleware.ts           # createMiddleware: 로케일 감지 및 리다이렉트
```

### 핵심 파일

| 파일 | 역할 |
|------|------|
| `i18n/routing.ts` | 지원 로케일, 기본 로케일 설정 |
| `i18n/navigation.ts` | 로케일 인식 Link, useRouter, usePathname 등 export |
| `i18n/request.ts` | 서버 사이드 메시지 로딩 |
| `middleware.ts` | URL 로케일 프리픽스 처리 |
| `messages/ko.json` | 한국어 번역 데이터 |
| `messages/en.json` | 영어 번역 데이터 |

---

## 작업 내역 (Phase별)

### Phase 1: next-intl 설치 및 기본 설정
- `next-intl` 패키지 설치
- `i18n/routing.ts`, `i18n/navigation.ts`, `i18n/request.ts` 생성
- `middleware.ts` 생성 (로케일 감지, `/ko` `/en` 프리픽스 처리)

### Phase 2: `[locale]` 동적 라우트 구조 전환
- `app/` 하위 모든 페이지를 `app/[locale]/` 하위로 이동
- `layout.tsx`에 `NextIntlClientProvider` 추가
- 기존 루트 `app/error.tsx`, `app/not-found.tsx`는 한국어 폴백으로 유지

### Phase 3: SEO 메타데이터 전환
- 모든 페이지의 `metadata` / `generateMetadata`를 `getTranslations`로 전환
- `metadata` 네임스페이스에 각 페이지별 title, description, ogDescription 추가
- `structuredData` 네임스페이스에 사이트 구조화 데이터 추가

### Phase 4: 가챠 시뮬레이터 완전 번역
- `GachaGame.tsx` 및 관련 컴포넌트의 모든 하드코딩 텍스트를 `useTranslations("gacha")` 전환
- `gacha` 네임스페이스: 배너, 뽑기 결과, 통계, UI 라벨 등

### Phase 5: 주요 페이지 번역 (6개)
- FutureInsight, Calendar, NewbieGuide, GachaGuide, CouponsPage, CashGuide
- 각 페이지별 네임스페이스 생성 및 하드코딩 텍스트 전환

### Phase 6: 나머지 페이지 번역 (6개)
- CashPackageShop, ShopEfficiency, BlueprintSetting, CharacterGrowthCalculator, DamageCalculation, ContentGuide
- 해당 네임스페이스 추가 및 전환

### Phase 7: 공통 컴포넌트 번역
- HamburgerMenu, HomePage, HomeFooter, LinkBox, ErrorBoundary 등
- `nav`, `home`, `footer`, `error`, `notFound`, `modal` 등 공통 네임스페이스

### Phase 8: Link/Router 마이그레이션 & PWA/Sitemap
- **34개 컴포넌트**에서 `import Link from "next/link"` → `import { Link } from "@/i18n/navigation"` 전환
- **8개 컴포넌트**에서 `useRouter`/`usePathname`를 `@/i18n/navigation`으로 전환
- `useSearchParams`는 `next/navigation`에 유지 (next-intl 미제공)
- `next-sitemap.config.js`에 `alternateRefs` 추가 (ko/en hreflang)

### Phase 9: 빌드 검증 및 최종 확인
- 프로덕션 빌드 통과
- 사이트맵 생성 확인
- 전체 TypeScript 타입 체크 통과 (기존 테스트 파일 제외)

### Phase 10: 게임 용어 감사 및 수정
- 공식 영어 게임 용어 기반 전수조사 실시
- 수정 목록:
  - Portrait → **Portray** (형상/듀프 시스템)
  - Incantation Power → **Incantation Might** (주문 위력)
  - Ritual Power → **Ritual Might** (술식 위력)
  - Psycube → **Psychube** (의지, 철자 통일)
  - Inspiration → **Afflatus** (영감/속성)
  - Attribute → **Afflatus** (속성)
  - Element Advantage → **Afflatus Advantage** (상성)
  - Howling Moon → **Roaring Month** (포효의 달)
  - Jukebox Pass → **Roar Jukebox** (주크박스)
  - Raindrop → **Crystal Drop** / **Clear Drop** (빗방울/유료·무료 재화)
  - Shape → **Portray** (형/형상 → P0~P5 표기)

---

## 번역 키 구조

### 네임스페이스 목록 (38개)

| 네임스페이스 | 용도 |
|-------------|------|
| `common` | 공통 라벨 (로딩, 확인, 취소 등) |
| `metadata` | SEO 메타데이터 (각 페이지별 title/description) |
| `nav` | 네비게이션 메뉴 |
| `theme` | 테마 전환 |
| `language` | 언어 전환 |
| `pwa` | PWA 설치 프롬프트 |
| `network` | 네트워크 상태 |
| `error` | 에러 페이지 |
| `notFound` | 404 페이지 |
| `modal` | 모달 |
| `home` | 홈페이지 |
| `footer` | 푸터 |
| `coupon` | 쿠폰 위젯 |
| `pickup` | 픽업 배너 |
| `gacha` | 가챠 시뮬레이터 |
| `character` | 캐릭터 가이드 |
| `structuredData` | 구조화 데이터 |
| `skin` | 스킨 갤러리 |
| `quiz` | 종합 퀴즈 |
| `bingo` | 빙고 |
| `characterQuiz` | 캐릭터 퀴즈 |
| `favoriteCharacter` | 최애 캐릭터 |
| `damageCalc` | 데미지 계산기 |
| `recommendTeam` | 추천 조합 |
| `shopEfficiency` | 상점 효율 |
| `blueprint` | 청사진 |
| `growthCalc` | 육성 계산기 |
| `characterSetting` | 공명/의지 세팅 |
| `futureInsight` | 미래시 |
| `calendar` | 캘린더 |
| `newbieGuide` | 뉴비 가이드 |
| `gachaGuide` | 가챠 가이드 |
| `couponPage` | 쿠폰 페이지 |
| `cashGuide` | 현질 가이드 |
| `cashPackage` | 현질 패키지 |
| `contentGuide` | 상시 컨텐츠 |
| `euphoriaGuide` | 광상 가이드 |
| `psycubeGuide` | 의지(Psychube) 가이드 |

### 키 수

- 한국어 (ko.json): **1,065 키**
- 영어 (en.json): **1,065 키**
- 키 일치율: **100%** (완벽 동기화)

---

## 공식 게임 용어 매핑 (한국어 → 영어)

| 한국어 | 영어 (공식) | 비고 |
|--------|------------|------|
| 속성/영감 | Afflatus | Beast, Plant, Star, Mineral, Spirit, Intellect |
| 야수 | Beast | |
| 천체 | Star | |
| 암석 | Mineral | |
| 나무 | Plant | |
| 영혼 | Spirit | |
| 지능 | Intellect | NOT Intelligence |
| 형상 | Portray | P0~P5, NOT Portrait |
| 명함 | Card (P0) | |
| 의지 | Psychube | NOT Psycube |
| 공명 | Resonance | |
| 통찰 | Insight | I/II/III |
| 광상 | Euphoria | |
| 증폭 | Amplification | |
| 주문 위력 | Incantation Might | NOT Power |
| 술식 위력 | Ritual Might | NOT Power |
| 궁극기 위력 | Ultimate Might | |
| 상성 | Afflatus Advantage | NOT Element |
| 포효의 달 | Roaring Month | NOT Howling Moon |
| 주크박스 | Roar Jukebox | |
| 빗방울 (유료) | Crystal Drop | |
| 빗방울 (무료) | Clear Drop | |
| 모노로그 | Unilog | 가챠 화폐 |
| 빗속의 공상 | Reveries in the Rain | |
| 청사진 | Blueprint | |
| 오솔길 | Path Quiz | |

---

## 마이그레이션된 컴포넌트 목록

### Link 마이그레이션 (next/link → @/i18n/navigation)

총 **34개 파일**:

- `components/home/LinkBox.tsx`
- `components/home/HomePage.tsx`
- `components/home/HomeFooter.tsx`
- `components/character/Character.tsx`
- `components/character/CharacterDetail.tsx`
- `components/character/CharacterList.tsx`
- `components/character/CharacterDetailTabs.tsx`
- `components/cash_guide/CashGuide.tsx`
- `components/gacha_guide/GachaGuide.tsx`
- `components/cash_package_shop/CashPackageShop.tsx`
- `components/newbie_guide/NewbieGuide.tsx`
- `components/reveries_in_the_rain/ReveriesInTheRain.tsx`
- `components/reveries_in_the_rain/ReveriesInTheRainDetail.tsx`
- `components/etc/CharacterGrowthCalculator.tsx`
- `components/etc/ErrorBoundary.tsx`
- `components/etc/Carousel.tsx`
- `components/quiz/QuizSetCard.tsx`
- `components/content_guide/ContentGuide.tsx`
- `components/content_guide/ContentGuideDetail.tsx`
- `components/euphoria_guide/EuphoriaGuide.tsx`
- `components/euphoria_guide/EuphoriaGuideDetail.tsx`
- `components/gacha_simulator/MainGachaStats.tsx`
- `components/psycube_guide/PsycubeGuide.tsx`
- `components/psycube_guide/PsycubeGuideDetail.tsx`
- `components/future_insight/FutureInsight.tsx`
- `components/recommend_team/RecommendTeam.tsx`
- `components/character_setting/CharacterSetting.tsx`
- `components/character_setting/CharacterSettingDetail.tsx`
- `components/skin/CharacterSkin.tsx`
- `components/skin/CharacterSkinDetail.tsx`

### useRouter/usePathname 마이그레이션

총 **8개 파일**:

- `components/recommend_team/RecommendTeam.tsx` — useRouter
- `components/character_setting/CharacterSettingDetail.tsx` — useRouter
- `components/reveries_in_the_rain/ReveriesInTheRainDetail.tsx` — useRouter
- `components/content_guide/ContentGuideDetail.tsx` — useRouter
- `components/etc/SecurityWrapper.tsx` — usePathname, useRouter
- `components/skin/CharacterSkin.tsx` — useRouter, usePathname
- `components/etc/GlobalLoadingManager.tsx` — usePathname
- `components/etc/HamburgerConditional.tsx` — usePathname

> `useSearchParams`는 next-intl에서 제공하지 않으므로 `next/navigation`에서 그대로 사용.

---

## 주의사항

### 의도적으로 한국어가 남아있는 en.json 항목

| 키 | 값 | 이유 |
|----|-----|------|
| `language.switchTo` | `한국어로 전환` | 언어 전환 버튼 (한국어 사용자용) |
| `home.source.futureInsight` | `...내이름은김융털` | 기여자 닉네임 (고유명사) |
| `home.contributors.content` | `...잠쿨` | 기여자 닉네임 (고유명사) |

### 컴포넌트 내 한국어 주석

HTML 주석 (`{/* 한국어 주석 */}`)은 사용자에게 노출되지 않으므로 그대로 유지.

### 루트 에러 페이지

`app/error.tsx`, `app/not-found.tsx`는 `[locale]` 컨텍스트 밖에 있으므로 한국어 폴백으로 유지.

---

## 향후 작업

- [ ] 데이터 파일 (characters, skins 등) 내 한국어 텍스트 다국어 지원
- [ ] 언어 전환 UI 개선 (현재 단순 버튼)
- [ ] 영어 사용자 테스트 및 피드백 반영
- [ ] 일본어/중국어 등 추가 언어 지원 검토
