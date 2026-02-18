# Plan 05: 테스트 인프라 업데이트

---
wave: 3
depends_on: [03, 04]
files_modified:
  - __tests__/utils/renderWithIntl.tsx (신규)
  - __tests__/fixtures/messages.ts (신규)
  - jest.config.ts (수정)
  - playwright.config.ts (수정)
autonomous: true
---

## Objective

기존 253개 테스트가 i18n 적용 후에도 통과하도록 테스트 인프라를 업데이트한다. NextIntlClientProvider wrapper와 mock messages를 준비한다.

## Tasks

<task id="05-01">
**Create test utility: renderWithIntl**

```tsx
// __tests__/utils/renderWithIntl.tsx
import { render, RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactElement } from "react";
import koMessages from "@/messages/ko.json";

interface IntlRenderOptions extends RenderOptions {
  locale?: string;
  messages?: Record<string, unknown>;
}

export function renderWithIntl(
  ui: ReactElement,
  { locale = "ko", messages = koMessages, ...options }: IntlRenderOptions = {}
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    options
  );
}
```
</task>

<task id="05-02">
**Create test fixture: mock messages**

```ts
// __tests__/fixtures/messages.ts
export const mockKoMessages = {
  common: {
    loading: "로딩 중...",
    reset: "리셋",
    confirm: "확인",
    cancel: "취소",
    close: "닫기",
    back: "뒤로",
    search: "검색",
    noResults: "결과 없음",
  },
  metadata: {
    home: {
      title: "버틴의 여행가방",
      description: "리버스 1999의 모든 정보를 한눈에 찾아보세요.",
    },
  },
};

export const mockEnMessages = {
  common: {
    loading: "Loading...",
    reset: "Reset",
    confirm: "Confirm",
    cancel: "Cancel",
    close: "Close",
    back: "Back",
    search: "Search",
    noResults: "No results",
  },
  metadata: {
    home: {
      title: "Vertin's Suitcase",
      description: "Find all information about Reverse 1999 at a glance.",
    },
  },
};
```
</task>

<task id="05-03">
**Update jest.config.ts if needed**

next-intl의 서버 모듈 mock이 필요할 수 있음:

```ts
// jest.config.ts에 추가할 수 있는 설정
moduleNameMapper: {
  // 기존 설정 유지
  "next-intl/server": "<rootDir>/__tests__/mocks/next-intl-server.ts",
}
```

mock 파일 생성:
```ts
// __tests__/mocks/next-intl-server.ts
export const getTranslations = jest.fn().mockResolvedValue((key: string) => key);
export const getMessages = jest.fn().mockResolvedValue({});
```
</task>

<task id="05-04">
**Update Playwright config for locale URLs**

playwright.config.ts에서 baseURL에 locale 반영:

```ts
// 기존 baseURL이 http://localhost:3099인 경우
// 미들웨어가 / → /ko/ 리다이렉트하므로 기존 테스트는 자동으로 /ko/로 리다이렉트됨
// 명시적으로 /ko prefix를 사용하려면:
use: {
  baseURL: "http://localhost:3099",
  // 미들웨어 리다이렉트로 자동 처리됨
}
```
</task>

<task id="05-05">
**Run existing test suite**

```bash
npm run test:ci
```

기존 253개 테스트가 통과하는지 확인. 실패하는 테스트가 있으면 원인 분석 후 수정.
</task>

## Verification

- [ ] renderWithIntl 유틸리티가 정상 동작
- [ ] mock messages가 한국어/영어 모두 포함
- [ ] 기존 Jest 테스트 통과 (또는 i18n 관련 조정 후 통과)
- [ ] Playwright E2E 테스트 통과 (미들웨어 리다이렉트 고려)

## must_haves

- NextIntlClientProvider wrapper 테스트 유틸리티 준비됨
- mock messages 파일 준비됨
- 기존 테스트 스위트가 i18n 변경 후에도 동작 가능한 상태
