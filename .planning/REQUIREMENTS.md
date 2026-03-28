# Requirements: i18n 다국어 지원

**Defined:** 2026-02-18
**Core Value:** 영어 사용자가 사이트의 모든 기능을 영어로 완전하게 이용할 수 있어야 한다.

## v1 Requirements

### Infrastructure (인프라)

- [ ] **INFRA-01**: next-intl 설치 및 next.config.ts 플러그인 연동
- [ ] **INFRA-02**: i18n/routing.ts에 locales(ko, en)와 defaultLocale(ko) 정의
- [ ] **INFRA-03**: i18n/request.ts에 getRequestConfig로 locale별 메시지 로드
- [ ] **INFRA-04**: i18n/navigation.ts에 createNavigation으로 Link, redirect, usePathname 래퍼 생성
- [ ] **INFRA-05**: middleware.ts 생성 — locale 감지, 리다이렉트, 정적 파일 제외
- [ ] **INFRA-06**: app/[locale]/layout.tsx 생성 — lang 속성 동적 설정, NextIntlClientProvider 적용
- [ ] **INFRA-07**: 기존 app/layout.tsx를 최소 shell로 변환 (html/body만)
- [ ] **INFRA-08**: messages/ko.json, messages/en.json 기본 번역 파일 생성
- [ ] **INFRA-09**: 기존 URL(locale 없는)에서 /ko/* 로 자동 리다이렉트 동작 확인
- [ ] **INFRA-10**: 테스트 인프라 — NextIntlClientProvider wrapper 및 mock messages 준비

### Common UI (공통 UI)

- [ ] **UI-01**: 메뉴 라벨 전체 번역 (놀이터, 도서관, 가이드 카테고리 + 30개 하위 메뉴)
- [ ] **UI-02**: 햄버거 메뉴 라벨 번역
- [ ] **UI-03**: 언어 전환 UI 컴포넌트 (헤더 우측, 테마 토글 옆, KO/EN 토글)
- [ ] **UI-04**: 공통 버튼 텍스트 번역 (리셋, 확인, 취소, 닫기 등)
- [ ] **UI-05**: 로딩 상태 텍스트 번역 ("로딩 중...")
- [ ] **UI-06**: 에러 페이지 번역 (error.tsx, not-found.tsx)
- [ ] **UI-07**: 테마 토글 관련 텍스트 번역 (다크모드/라이트모드)
- [ ] **UI-08**: InstallPrompt (PWA 설치 안내) 텍스트 번역
- [ ] **UI-09**: NetworkStatusToast 텍스트 번역

### Pages (페이지 UI)

- [ ] **PAGE-01**: 홈페이지 UI 텍스트 번역
- [ ] **PAGE-02**: 가챠 시뮬레이터 전체 UI 번역 (통계, 배너 선택, 결과 표시 등)
- [ ] **PAGE-03**: 캐릭터 목록/상세 페이지 UI 번역 (필터, 레이블 등)
- [ ] **PAGE-04**: 캐릭터 퀴즈 페이지 UI 번역
- [ ] **PAGE-05**: 종합 퀴즈 페이지 UI 번역
- [ ] **PAGE-06**: 빙고 페이지 UI 번역
- [ ] **PAGE-07**: 최애 캐릭터 페이지 UI 번역
- [ ] **PAGE-08**: 추천 조합 페이지 UI 번역
- [ ] **PAGE-09**: 육성 계산기 페이지 UI 번역
- [ ] **PAGE-10**: 빗속의 공상 페이지 UI 번역
- [ ] **PAGE-11**: 청사진 모음 페이지 UI 번역
- [ ] **PAGE-12**: 광상 목록 페이지 UI 번역
- [ ] **PAGE-13**: 의지 육성 페이지 UI 번역
- [ ] **PAGE-14**: 오솔길 정답 페이지 UI 번역
- [ ] **PAGE-15**: 상점 효율 페이지 UI 번역
- [ ] **PAGE-16**: 재료 파밍 모달 번역
- [ ] **PAGE-17**: 스킨 갤러리 페이지 UI 번역
- [ ] **PAGE-18**: 미래시 정리 페이지 UI 번역
- [ ] **PAGE-19**: 현질 패키지 페이지 UI 번역
- [ ] **PAGE-20**: 캘린더 페이지 UI 번역
- [ ] **PAGE-21**: 현질 가이드 페이지 UI 번역
- [ ] **PAGE-22**: 가챠 가이드 페이지 UI 번역
- [ ] **PAGE-23**: 뉴비 가이드 페이지 UI 번역
- [ ] **PAGE-24**: 쿠폰 목록 페이지 UI 번역
- [ ] **PAGE-25**: 상시 컨텐츠 페이지 UI 번역

### Game Data (게임 데이터)

- [ ] **DATA-01**: 게임 사전 헬퍼 함수 구현 (lib/i18n/gameDictionary.ts)
- [ ] **DATA-02**: 캐릭터명 다국어 표시 (기존 사전 파일 활용)
- [ ] **DATA-03**: 배너 데이터 다국어 표시
- [ ] **DATA-04**: 퀴즈 질문/선택지 영어 버전
- [ ] **DATA-05**: 영감(inspiration) 타입명 영어 표시
- [ ] **DATA-06**: 공명(resonance) 타입명 영어 표시

### Guide Content (가이드 콘텐츠)

- [ ] **GUIDE-01**: 뉴비 가이드 본문 영어 버전
- [ ] **GUIDE-02**: 가챠 가이드 본문 영어 버전
- [ ] **GUIDE-03**: 현질 가이드 본문 영어 버전
- [ ] **GUIDE-04**: 상시 컨텐츠 가이드 본문 영어 버전
- [ ] **GUIDE-05**: 사이큐브/의지 가이드 본문 영어 버전
- [ ] **GUIDE-06**: 유포리아/광상 가이드 본문 영어 버전

### SEO & Integration (SEO 및 통합)

- [ ] **SEO-01**: 전체 페이지 generateMetadata로 locale별 title/description
- [ ] **SEO-02**: hreflang alternate 링크 추가
- [ ] **SEO-03**: next-sitemap locale별 URL 생성 설정
- [ ] **SEO-04**: PWA manifest.json locale 대응 (앱 이름/설명)
- [ ] **SEO-05**: Open Graph / Twitter Card locale별 설정

### Testing (테스트)

- [ ] **TEST-01**: i18n 유틸리티 유닛 테스트 (gameDictionary, routing 등)
- [ ] **TEST-02**: 컴포넌트 테스트 — NextIntlClientProvider wrapper로 기존 테스트 호환
- [ ] **TEST-03**: 언어 전환 컴포넌트 테스트
- [ ] **TEST-04**: E2E 테스트 — /ko 경로 기본 동작 확인
- [ ] **TEST-05**: E2E 테스트 — /en 경로 영어 표시 확인
- [ ] **TEST-06**: E2E 테스트 — 언어 전환 동작 확인
- [ ] **TEST-07**: E2E 테스트 — 기존 URL 리다이렉트 확인
- [ ] **TEST-08**: 기존 253개 테스트 통과 확인

### Link Migration (링크 마이그레이션)

- [ ] **LINK-01**: 전체 next/link import를 i18n/navigation의 Link로 교체
- [ ] **LINK-02**: 전체 next/navigation import를 i18n/navigation의 래퍼로 교체
- [ ] **LINK-03**: 하드코딩된 href에 locale 자동 적용 확인

## v2 Requirements

### 추가 언어
- **LANG-01**: 일본어(ja) 지원 추가
- **LANG-02**: 중국어 간체(zh-CN) 지원 추가

### 고급 기능
- **ADV-01**: 하이브리드 표기 옵션 (한/영 병기: "드루비스 (Druvis III)")
- **ADV-02**: 사용자 기여 번역 시스템

## Out of Scope

| Feature | Reason |
|---------|--------|
| 자동 번역 (Google Translate) | 게임 용어 오역 위험, 품질 저하 |
| 3개 이상 언어 동시 지원 | v1은 한/영 2개에 집중 |
| 서브도메인 방식 | /ko, /en 경로 분리로 결정 |
| 페이지별 언어 혼합 | 하나의 페이지는 하나의 언어로 표시 |
| URL에 locale 없는 기본 언어 | SEO 일관성 위해 모든 URL에 prefix |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 ~ INFRA-10 | Phase 1 | Pending |
| UI-01 ~ UI-09 | Phase 2 | Pending |
| PAGE-01 | Phase 3 | Pending |
| PAGE-02 | Phase 4 | Pending |
| PAGE-03, DATA-01 ~ DATA-06 | Phase 5 | Pending |
| PAGE-04 ~ PAGE-25 | Phase 6 | Pending |
| GUIDE-01 ~ GUIDE-06 | Phase 7 | Pending |
| SEO-01 ~ SEO-05, LINK-01 ~ LINK-03 | Phase 8 | Pending |
| TEST-01 ~ TEST-08 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 62 total
- Mapped to phases: 62
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-18*
*Last updated: 2026-02-18 after initial definition*
