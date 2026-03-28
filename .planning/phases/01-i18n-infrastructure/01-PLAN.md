# Plan 01: next-intl 설치 및 i18n 설정 파일 생성

---
wave: 1
depends_on: []
files_modified:
  - package.json
  - i18n/routing.ts
  - i18n/request.ts
  - i18n/navigation.ts
  - messages/ko.json
  - messages/en.json
autonomous: true
---

## Objective

next-intl 패키지를 설치하고 i18n 핵심 설정 파일(routing, request, navigation)과 기본 번역 메시지 파일을 생성한다.

## Tasks

<task id="01-01">
**Install next-intl**

```bash
cd /Users/lyvakim/repos/side_projects/reverse1999_gacha_simulation_i18n
npm install next-intl
```
</task>

<task id="01-02">
**Create i18n/routing.ts**

```ts
// i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
});
```
</task>

<task id="01-03">
**Create i18n/request.ts**

```ts
// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```
</task>

<task id="01-04">
**Create i18n/navigation.ts**

```ts
// i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```
</task>

<task id="01-05">
**Create messages/ko.json**

홈페이지 기본 텍스트만 포함하는 초기 번역 파일:

```json
{
  "common": {
    "loading": "로딩 중...",
    "reset": "리셋",
    "confirm": "확인",
    "cancel": "취소",
    "close": "닫기",
    "back": "뒤로",
    "search": "검색",
    "noResults": "결과 없음"
  },
  "metadata": {
    "home": {
      "title": "버틴의 여행가방",
      "description": "리버스 1999의 모든 정보를 한눈에 찾아보세요."
    }
  }
}
```
</task>

<task id="01-06">
**Create messages/en.json**

```json
{
  "common": {
    "loading": "Loading...",
    "reset": "Reset",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "close": "Close",
    "back": "Back",
    "search": "Search",
    "noResults": "No results"
  },
  "metadata": {
    "home": {
      "title": "Vertin's Suitcase",
      "description": "Find all information about Reverse 1999 at a glance."
    }
  }
}
```
</task>

## Verification

- [ ] `npm ls next-intl` shows installed version
- [ ] i18n/routing.ts, i18n/request.ts, i18n/navigation.ts exist with correct exports
- [ ] messages/ko.json, messages/en.json are valid JSON
- [ ] No TypeScript errors in i18n/ files

## must_haves

- next-intl 설치됨
- i18n 설정 파일 3개 (routing, request, navigation) 생성됨
- 한국어/영어 기본 메시지 파일 생성됨
