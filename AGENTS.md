<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Repository Guidelines

Use this guide when contributing features or fixes to the Reverse 1999 gacha simulation.

## Project Structure & Module Organization

- `app/`: App Router entry points; nest related flows under scoped folders (e.g., `app/summon/`).
- `components/`: Reusable UI built with TypeScript, Tailwind, and shadcn presets (`components.json` tracks generated atoms).
- `lib/`: Client and server utilities (probability math, shared hooks); keep functions pure for testability.
- `data/`: Static datasets covering banner tables and character pools.
- `__tests__/`: Jest + Testing Library specs (`*.test.tsx`); mirror the route or component shape.
- `public/`: Static assets referenced by Next's Image optimizer.

## Build, Test, and Development Commands

- `npm run dev`: Start the Next.js dev server with hot reloading.
- `npm run build`: Create the production bundle; triggers `npm run postbuild` to regenerate `sitemap.xml`.
- `npm run start`: Serve the production build locally.
- `npm run analyze`: Build with bundle analyzer enabled (`ANALYZE=true`).
- `npm run lint` / `npm run lint:fix`: Check or auto-fix with ESLint (Next + TypeScript + unused-imports rules).
- `npm run format`: Apply Prettier (Tailwind plugin keeps utility classes sorted).
- `npx jest`: Run all tests.
- `npx jest --watch`: Run tests in watch mode during development.
- `npx jest <file-pattern>`: Run specific test file (e.g., `npx jest gacha.test.tsx`).
- `npx jest -t "<test-name>"`: Run specific test by name (e.g., `npx jest -t "70연차"`).

## Coding Style & Naming Conventions

- **TypeScript**: Enable strict mode; always define types for function parameters and return values.
- **Imports**: Use `@/` alias for absolute imports; group by: React → Next → third-party → local components → types → data.
- **Formatting**: 2-space indentation, double quotes, semicolons, 100-char line width (Prettier enforced).
- **Naming**: camelCase for functions/variables, PascalCase for components/types, kebab-case for route folders.
- **Components**: Export named functions by default; use `"use client"` directive only when needed (state, effects, browser APIs).
- **Tailwind**: Group utilities by layout → spacing → typography → colors; use `tailwind-merge` for conditional classes.
- **Error Handling**: Throw descriptive errors with Korean messages matching codebase style (e.g., `throw new Error(\`캐릭터 ID ${id}를 찾을 수 없습니다.\`)`).
- **Comments**: Use Korean for inline comments; keep English for JSDoc and exported APIs.

## Testing Guidelines

- Write UI tests with Jest + `@testing-library/react`; colocate in `__tests__/` and suffix files with `.test.tsx`.
- Mock heavy data files via `jest.setup.js` when tests touch banner datasets.
- Cover new logic with at least one success and failure path; include pity-ceiling edge cases (e.g., 70-pull guarantee).
- Use descriptive Korean test names matching project style (e.g., `"70연차 내에 최소 1번은 6성 캐릭터가 나와야 한다"`).
- Execute `npx jest --watch` during development; CI assumes a clean pass with `npx jest`.

## OpenSpec Workflow for Major Changes

For new features, breaking changes, or architectural updates, use OpenSpec:

- **Check context**: Run `openspec list` to see active changes and `openspec list --specs` to review existing capabilities.
- **Create proposal**: Use `/openspec:proposal <feature-name>` to scaffold a change with `proposal.md`, `tasks.md`, and spec deltas.
- **Validate**: Run `openspec validate <change-id> --strict` to ensure spec formatting is correct.
- **Implement**: Use `/openspec:apply <change-id>` to work through tasks systematically.
- **Archive**: After deployment, run `openspec archive <change-id> --yes` to merge specs and move to archive.
- **Skip proposals for**: Bug fixes, typos, config changes, non-breaking dependency updates.

See `openspec/AGENTS.md` for detailed workflow instructions and spec format requirements.

## Commit & Pull Request Guidelines

- Commit history favors concise, action-led subjects (often Korean verbs like "오류 수정"); mirror that style and keep scopes narrow.
- Reference impacted routes or data files in the subject to keep gameplay changes traceable.
- For PRs, include: purpose summary, testing evidence (`npm run lint`, `npx jest`), UI screenshots/gifs, and linked issues or Notion tasks.
- Mark breaking balance changes (banner odds, reward tables) explicitly so deployers can coordinate announcement updates.
