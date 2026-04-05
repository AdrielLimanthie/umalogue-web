<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Umalogue — Implementation Guidelines

## Stack

- **Next.js 16** App Router. `params` and `searchParams` are **Promises** — always `await params` in server components; use `useSearchParams()` (wrapped in `<Suspense>`) in client components.
- **React 19** with React Compiler. No manual `useMemo`/`useCallback` unless performance profiling justifies it — except for expensive derived lists on the overview page.
- **TailwindCSS v4** — config is CSS-first via `@theme` blocks in `globals.css`. No `tailwind.config.js`. Dark mode uses `.dark` class via `@custom-variant dark (&:is(.dark *))`.
- **Shadcn UI over `@base-ui/react`** (NOT Radix UI). The `asChild` prop does **not** exist on `Button`, `PopoverTrigger`, etc. Style the trigger element directly with `className`.
- **Zustand v5 + immer** for state. All derived data (filtered/sorted lists) lives in `useMemo` on the page — never in the store.
- **Zod v4** for upload validation. `trained_chara_id` is a `number` in the JSON.
- **Biome 2.2.0** for lint/format. Run `pnpm biome check --write src/` after any batch of file writes. Import order rule: external packages **before** `@/` aliases.

## Key Conventions

- File naming: **kebab-case** for non-component files (`filter-veterans.ts`), **PascalCase** for React components (`VeteranCard.tsx`).
- **File ordering**: top-down — write the main exported function/component first, then the helpers and sub-components it depends on.
- Package manager: **pnpm only** (enforced via `packageManager` in `package.json`).
- Veteran unique ID: `String(trained_chara_id)`. Used in URLs and as map keys everywhere.
- `AptitudeSet` has a typo: `oikoiLabel` (not `oikomiLabel`). This is intentional and consistent throughout.

## Shared Code

Before adding a local constant, helper, or component, check if it already exists:

- **Utility functions** used in more than one feature area → `src/lib/common.ts` (e.g. `starString`)
- **Constants** used in more than one feature area → `src/constants/<domain>.ts`:
  - `aptitudes.ts` — `APTITUDE_COLOR`, `APTITUDE_SECTIONS`
  - `stats.ts` — `STAT_DEFS` (keys, labels, colorClasses; `MAX_STAT` stays local per component)
  - `sparks.ts` — `SPARK_COLORS`
  - `compare.ts` — compare-page-specific structures (`APTITUDE_ROWS`)
- **Components** shared across more than one feature area → `src/components/common/`:
  - `SparkPill` — single spark badge
  - `LegacySparkGroup` — sparks for one legacy filtered by color
  - `AptBadge` — aptitude grade badge; accepts `size` prop (`"sm"` | `"md"` | `"lg"`)
  - `StatBar` — stat progress bar; accepts `maxStat` prop (Detail uses 2500, Card uses 1200)

## Data Notes

- **Factor/spark parsing**: last 2 digits of the raw integer = star level; remaining digits = `factor_id` string.
- **Direct legacy** = the veteran's own factors (`isDirectLegacy: true`). Stored alongside sub-legacies.
- **Spark display**: all 4 colors (blue/pink/green/white) shown for all 3 legacies. Direct legacy sparks get a `ring` highlight to distinguish them visually.
- **Image paths**: `public/images/uma-{card_id}.png` and `public/images/skill-{iconid}.png`. Always use `onError={() => {}}` for graceful fallback on missing images.

## Dark Mode

Anti-FOUC: a synchronous `<script>` in `<head>` reads `umalogue-ui.state.isDarkMode` from localStorage and sets the `.dark` class on `<html>` before paint. The `biome-ignore lint/security/noDangerouslySetInnerHtml` suppression is intentional here.

## Zustand Persistence

- `umalogue-veterans`: veterans array + tags + compareSelection
- `umalogue-ui`: `isDarkMode`, `filters`, `sort` — **`isCompareMode` is excluded** via `partialize` (session-only state)

## Compare & Detail Pages

- Detail page: server component awaits `params`, renders a `'use client'` component that reads from the store.
- Compare page: server component wraps a `'use client'` component (which uses `useSearchParams`) in `<Suspense>`.
- Compare URL format: `/compare?veteranIds=id1,id2`
