# Plan 04: 나머지 페이지 [locale]로 이동 및 URL 리다이렉트 확인

---
wave: 2
depends_on: [01, 02]
files_modified:
  - app/[locale]/* (39 pages 이동)
  - app/robots.ts
autonomous: true
---

## Objective

기존 app/ 하위의 모든 페이지를 app/[locale]/ 하위로 이동한다. 이 단계에서는 번역을 적용하지 않고 구조만 변경한다.

## Tasks

<task id="04-01">
**Move all page directories to app/[locale]/**

모든 feature 디렉토리를 [locale] 하위로 이동:

```bash
cd /Users/lyvakim/repos/side_projects/reverse1999_gacha_simulation_i18n

# 모든 feature 디렉토리를 [locale] 하위로 이동
for dir in bingo blueprint_setting calendar cash_guide cash_package_shop character character_quiz character_setting content_guide coupon damage_calculation error-test euphoria_guide favorite_character future_insight gacha_guide gacha_simulator growth_calculator newbie_guide path_quiz psycube_guide quiz recommend_team reveries_in_the_rain shop_efficiency skin; do
  if [ -d "app/$dir" ]; then
    mv "app/$dir" "app/[locale]/$dir"
  fi
done
```

**동적 라우트도 포함**: character/[id], skin/[id], reveries_in_the_rain/[id], quiz/[quizSetId] 등은 디렉토리 전체가 이동되므로 자동 처리됨.
</task>

<task id="04-02">
**Handle app/robots.ts**

robots.ts는 [locale] 바깥에 유지 (locale과 무관한 파일).
globals.css도 루트에 유지.

```
app/
├── layout.tsx          # 최소 shell
├── globals.css         # 전역 스타일 (유지)
├── robots.ts           # 유지
├── not-found.tsx       # 루트 레벨 404 (유지)
└── [locale]/
    ├── layout.tsx      # 메인 레이아웃
    ├── page.tsx        # 홈
    ├── error.tsx
    ├── not-found.tsx
    ├── gacha_simulator/page.tsx
    ├── character/page.tsx
    ├── character/[id]/page.tsx
    └── ... (모든 feature 페이지)
```
</task>

<task id="04-03">
**Verify URL redirect for all pages**

미들웨어가 기존 URL을 locale URL로 리다이렉트하는지 확인:
- `/gacha_simulator` → `/ko/gacha_simulator`
- `/character` → `/ko/character`
- `/character/1` → `/ko/character/1`

모든 기존 페이지가 /ko/ prefix로 정상 접근 가능한지 확인.
</task>

## Verification

- [ ] app/[locale]/ 하위에 모든 페이지가 존재
- [ ] app/ 루트에는 layout.tsx, globals.css, robots.ts, not-found.tsx만 남음
- [ ] `/ko/gacha_simulator`, `/ko/character` 등 모든 페이지 접근 가능
- [ ] `/gacha_simulator` (기존 URL) 접속 시 `/ko/gacha_simulator`로 리다이렉트
- [ ] 동적 라우트 `/ko/character/1` 정상 동작

## must_haves

- 모든 39개 페이지가 app/[locale]/ 하위로 이동됨
- 기존 URL이 /ko/ prefix로 리다이렉트됨
- 동적 라우트([id], [quizSetId])가 정상 동작
