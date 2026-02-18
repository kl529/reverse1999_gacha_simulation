# Features Research: i18n Game Guide Site

## Table Stakes (없으면 사용자 이탈)

### 1. 완전한 UI 언어 전환
- **설명**: 모든 메뉴, 버튼, 라벨, 에러 메시지가 선택 언어로 표시
- **복잡도**: MEDIUM — 145+ 파일에서 텍스트 추출 필요
- **Dependencies**: i18n 인프라 구축 후 가능

### 2. 게임 용어 번역 (캐릭터명, 아이템명)
- **설명**: 캐릭터명, 영감 타입 등 게임 고유 용어가 해당 언어로 표시
- **복잡도**: MEDIUM — 기존 사전 파일 활용하면 데이터는 있음, 매핑 로직 필요
- **Dependencies**: 기존 language dict 통합

### 3. SEO 다국어 지원
- **설명**: 각 언어별 독립 URL, hreflang 태그, 메타데이터 번역
- **복잡도**: MEDIUM — 30+ 페이지 메타데이터 번역
- **Dependencies**: URL 라우팅 구조

### 4. 언어 전환 UI
- **설명**: 명확하고 접근 가능한 언어 선택 버튼
- **복잡도**: LOW
- **Dependencies**: i18n 라우팅

### 5. 브라우저 언어 자동 감지
- **설명**: 첫 방문 시 브라우저 Accept-Language 헤더로 기본 언어 설정
- **복잡도**: LOW — next-intl 미들웨어에서 기본 제공
- **Dependencies**: 미들웨어 설정

### 6. 기존 URL 호환성
- **설명**: /gacha_simulator → /ko/gacha_simulator 자동 리다이렉트
- **복잡도**: LOW — 미들웨어에서 처리
- **Dependencies**: 미들웨어 설정

## Differentiators (경쟁 우위)

### 7. 하이브리드 표기 (한/영 병기)
- **설명**: 캐릭터명 등을 "드루비스 (Druvis III)" 형태로 병기 옵션
- **복잡도**: MEDIUM
- **Dependencies**: 게임 사전 통합

### 8. 언어 선호도 기억
- **설명**: 사용자의 언어 선택을 cookie/localStorage에 저장하여 재방문 시 유지
- **복잡도**: LOW — next-intl이 기본 제공 (cookie 기반)
- **Dependencies**: 미들웨어

### 9. 가이드 콘텐츠 영어 제공
- **설명**: 뉴비 가이드, 가챠 가이드 등 본문 콘텐츠를 영어로 제공
- **복잡도**: HIGH — 대량의 텍스트 번역 필요
- **Dependencies**: UI 번역 완료 후

### 10. locale별 sitemap
- **설명**: /ko/sitemap.xml, /en/sitemap.xml 또는 hreflang이 포함된 통합 sitemap
- **복잡도**: LOW-MEDIUM
- **Dependencies**: URL 구조 확정

## Anti-Features (만들지 말 것)

| Feature | 이유 |
|---------|------|
| 자동 번역 (Google Translate 연동) | 게임 용어 오역 위험, 품질 저하 |
| 사용자 기여 번역 시스템 | 관리 복잡도 높음, 스팸/잘못된 번역 리스크 |
| 3개 이상 언어 동시 지원 | v1 범위 초과, 한영 2개에 집중 |
| URL에 locale 없는 기본 언어 | SEO 일관성 위해 모든 URL에 locale prefix |
| 페이지별 언어 혼합 | 하나의 페이지는 하나의 언어로 완전히 표시 |

## Feature Dependencies

```
i18n 인프라 (미들웨어, 라우팅, 메시지 로딩)
  ├── UI 언어 전환 (메뉴, 버튼, 라벨)
  │   ├── 가챠 시뮬레이터 UI
  │   ├── 캐릭터 정보 UI
  │   └── 가이드 페이지 UI
  ├── SEO 다국어 (메타데이터, hreflang)
  ├── 언어 전환 UI (KO/EN 버튼)
  ├── 브라우저 감지 + URL 리다이렉트
  └── 게임 사전 통합 (캐릭터명, 아이템명)
      └── 가이드 콘텐츠 번역
```

---
*Researched: 2026-02-18*
