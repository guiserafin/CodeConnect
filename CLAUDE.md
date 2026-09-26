# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a pnpm monorepo currently at initial-scaffold stage: `apps/api` is an unmodified NestJS starter and `apps/web` is an unmodified Vite + React + TypeScript starter. There is no custom business logic yet — expect to be building CodeConnect's actual features from here.

## Monorepo layout

- `apps/api` — NestJS backend (TypeScript, Jest)
- `apps/web` — React 19 frontend (Vite, TypeScript, Oxlint)
- Package manager is pnpm, workspace defined in `pnpm-workspace.yaml` (`apps/*`). Root `package.json` scripts proxy into each workspace via `pnpm --filter`.

## Commands

Run from the repo root unless noted.

```bash
pnpm install          # install all workspace dependencies

# api (apps/api)
pnpm api:dev           # start Nest in watch mode
pnpm api:start         # start Nest
pnpm api:build         # nest build
pnpm api:lint          # eslint --fix over src/apps/libs/test
pnpm api:test          # jest unit tests
pnpm --filter api test:watch          # watch mode
pnpm --filter api test:cov            # coverage
pnpm --filter api test:e2e            # e2e tests (test/jest-e2e.json)
pnpm --filter api test -- app.controller   # run a single test file/pattern

# web (apps/web)
pnpm web:dev           # vite dev server
pnpm web:build         # tsc -b && vite build
pnpm web:preview       # preview production build
pnpm web:lint          # oxlint

# whole repo
pnpm dev               # run dev/start:dev in parallel across all apps
pnpm build             # pnpm -r build
pnpm lint              # pnpm -r lint
pnpm test              # pnpm -r test
```

To scope a command to one workspace instead of using the root aliases, use `pnpm --filter <api|web> <script>`.

### Single test file (api)

Jest's `rootDir` is `apps/api/src`, and specs match `*.spec.ts` colocated with source files (e.g. `app.controller.spec.ts`). Pass a filename pattern as a positional arg: `pnpm --filter api test -- app.controller`.

## Architecture notes

- **api**: standard Nest module/controller/service structure rooted at `apps/api/src/main.ts` → `AppModule`. Listens on `process.env.PORT` (default 3000). ESLint config disables several strict TS rules (`no-explicit-any`, `explicit-function-return-type`, etc.) and `tsconfig.json` has `strictNullChecks`/`noImplicitAny` off — don't assume strict-mode guarantees when reading or writing api code.
- **web**: Vite + `@vitejs/plugin-react`, linted with Oxlint (`apps/web/.oxlintrc.json`) rather than ESLint. `tsconfig.json` is a references-only root pointing at `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite config), so type-check each separately if needed.
- The two apps have no wiring between them yet (no shared API client, no proxy config) — that integration doesn't exist yet and will need to be established when building real features.

## Frontend conventions (apps/web)

- **Atomic Design**: organize components by tier — `atoms/` (buttons, inputs, labels), `molecules/` (small combinations of atoms, e.g. a labeled input), `organisms/` (self-contained sections composed of molecules/atoms), `templates/` (page layouts/skeletons), and `pages/` (route-level components that wire templates to real data).
- **Styling**: use Tailwind CSS utility classes; avoid introducing plain CSS files for new components.
- **Component tests are mandatory**: every component (at every atomic tier) needs a test covering its essential usage — colocate as `ComponentName.test.tsx` next to `ComponentName.tsx` (Vitest + React Testing Library).

### Design tokens (colors & sizes)

- **Never hardcode hex colors in Tailwind classes** (no `bg-[#171d1f]`, `text-[#e1e1e1]`, etc.). The project's palette lives in `apps/web/src/index.css` under `@theme` as `--color-*` variables (`primary`, `graphite`, `dark`, `petrol`, `gray-medium`, `offwhite`). Reference colors by their token name (`bg-primary`, `text-petrol`, `border-gray-medium`). If a Figma design introduces a color not yet in the palette, add it to the `@theme` block first (name it after its role or the Figma style name), then consume it by name — don't inline the hex value in a component.
- **Never hardcode arbitrary font sizes** (no `text-[22px]`, `text-[15px]`, etc.). Map each Figma type size to the *nearest* Tailwind size token instead of introducing a custom value — e.g. a spec'd 18px maps to `text-lg` (exact), 22px maps to `text-xl`/`text-2xl` (nearest), 31px maps to `text-3xl` (nearest). The same applies to spacing/sizing utilities (`w-`, `h-`, `gap-`, `p-`, etc.) — prefer the closest step on Tailwind's default scale over an arbitrary `[Npx]` value. Only reach for an arbitrary value when no reasonably close token exists, and prefer that as a last resort.
- **Reuse existing assets over recreating them**: when a Figma node exports an image or icon (not a font glyph), download and use that asset (e.g. via the Figma MCP tools) rather than hand-drawing an approximation — keep downloaded assets in `apps/web/public/`.

## Backend conventions (apps/api)

Follow REST principles strictly for every endpoint:

- Model URLs around resources (plural nouns), not actions — `/users`, `/users/:id`, never `/getUser` or `/createUser`.
- Use HTTP methods for their intended semantics: `GET` (read, safe/idempotent), `POST` (create), `PUT`/`PATCH` (replace/update), `DELETE` (remove).
- Return correct status codes: `200`/`201`/`204` for success, `400`/`401`/`403`/`404`/`409`/`422` for client errors, `500` for server errors — don't default everything to `200`/`201`.
- Keep the API stateless — no server-side session state between requests; each request must carry what it needs (auth token, params).
- Validate input with DTOs + `class-validator`/`class-transformer` at the controller boundary rather than in services.
- Use a consistent error response shape across all endpoints.
- Support filtering, pagination, and sorting via query params on collection endpoints rather than bespoke routes.

## Git conventions (both apps)

Use [Conventional Commits](https://www.conventionalcommits.org/) for every commit in both `apps/api` and `apps/web`: `type(scope): description`, e.g. `feat(web): add Button atom`, `fix(api): return 404 for missing user`. Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`. Scope should name the affected app or module (`web`, `api`, or a more specific area within one).
