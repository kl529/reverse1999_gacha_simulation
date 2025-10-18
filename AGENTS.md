# Repository Guidelines
Use this guide when contributing features or fixes to the Reverse 1999 gacha simulation.

## Project Structure & Module Organization
- `app/`: App Router entry points; nest related flows under scoped folders (e.g., `app/summon/`).
- `components/`: Reusable UI built with TypeScript, Tailwind, and shadcn presets (`components.json` tracks generated atoms).
- `lib/`: Client and server utilities (probability math, shared hooks); keep functions pure for testability.
- `data/`: Static datasets covering banner tables and character pools.
- `__tests__/`: Jest + Testing Library specs (`*.test.tsx`); mirror the route or component shape.
- `public/`: Static assets referenced by Next’s Image optimizer.

## Build, Test, and Development Commands
- `npm run dev`: Start the Next.js dev server with hot reloading.
- `npm run build`: Create the production bundle; triggers `npm run postbuild` to regenerate `sitemap.xml`.
- `npm run start`: Serve the production build locally.
- `npm run analyze`: Build with bundle analyzer enabled (`ANALYZE=true`).
- `npm run lint` / `npm run lint:fix`: Check or auto-fix with ESLint (Next + TypeScript + unused-imports rules).
- `npm run format`: Apply Prettier (Tailwind plugin keeps utility classes sorted).

## Coding Style & Naming Conventions
- Follow TypeScript with strict imports; prefer named exports for composable UI.
- Use 2-space indentation, camelCase for utilities, PascalCase for components, and kebab-case for route folders.
- Keep Tailwind classes grouped by layout → spacing → color; rely on `tailwind-merge` when composing variants.
- Run ESLint and Prettier before opening a PR to maintain the enforced formatting baselines.

## Testing Guidelines
- Write UI tests with Jest + `@testing-library/react`; colocate in `__tests__/` and suffix files with `.test.tsx`.
- Mock heavy data files via `jest.setup.js` when tests touch banner datasets.
- Cover new logic with at least one success and failure path; include pity-ceiling edge cases.
- Execute `npx jest --watch` during development; CI assumes a clean pass with `npx jest`.

## Commit & Pull Request Guidelines
- Commit history favors concise, action-led subjects (often Korean verbs like “오류 수정”); mirror that style and keep scopes narrow.
- Reference impacted routes or data files in the subject to keep gameplay changes traceable.
- For PRs, include: purpose summary, testing evidence (`npm run lint`, `npx jest`), UI screenshots/gifs, and linked issues or Notion tasks.
- Mark breaking balance changes (banner odds, reward tables) explicitly so deployers can coordinate announcement updates.
