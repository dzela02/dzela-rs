# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Overview

pnpm workspaces + Turborepo. Node ≥20.11.0 (`20.18.0` pinned in `.nvmrc`). Package manager: `pnpm@9.12.0`.

```
apps/web   — TanStack Start (SSR) + React 19 + Vite 7  (the live site)
apps/cms   — Strapi v5 placeholder (run setup command when ready)
packages/eslint-config  — shared ESLint v9 flat config
packages/tsconfig       — shared TypeScript presets
packages/ui             — cn() utility + design tokens
```

## Commands

```bash
# Root (runs all workspaces via Turbo)
pnpm dev            # dev server on :3000
pnpm build          # SSR production build → .output/
pnpm lint           # ESLint v9
pnpm lint:fix       # ESLint --fix
pnpm typecheck      # tsc --noEmit (strict, no any)
pnpm format         # Prettier write
pnpm format:check   # Prettier check
pnpm clean          # wipe build artifacts + node_modules

# App-specific (from apps/web/)
pnpm start          # run built server: node .output/server/index.mjs
pnpm preview        # vite preview

# Strapi (run once when activating CMS)
pnpm dlx create-strapi-app@latest cms --quickstart
```

## Architecture

### Routing
File-based via TanStack Router. Routes live in `apps/web/src/routes/`. The route tree (`src/routeTree.gen.ts`) is auto-generated — never edit it manually. Loaders (`loader`) run on the server; mutations use `createServerFn` from `@tanstack/react-start`.

### Styling
**No Tailwind** — `tailwind.config.ts` is an intentional stub. All styling is hand-rolled CSS in `src/styles/`. Design tokens use OKLCH color space (`tokens.css`). Typography uses Geist. The single accent color is moss green `oklch(0.58 0.12 155)`. The `cn()` utility from `@portfolio/ui` is available for conditional class merging.

### Data
Content (projects, experience, posts) lives as typed TypeScript constants in `src/data/`. These are ready to swap for Strapi API calls once the CMS is active. The Strapi client is pre-written at `src/lib/strapi.ts`.

### Server-Only Code
Anything in `src/server/` is server-only. `ANTHROPIC_API_KEY` must never reach the client. Use `createServerFn` to expose server logic to routes.

### Environment Variables
See `apps/web/.env.example`. Required vars:
- `STRAPI_URL` / `STRAPI_API_TOKEN` — Strapi REST API
- `ANTHROPIC_API_KEY` — Claude API (server-only)
- `VITE_*` — any client-exposed vars must be prefixed

## TypeScript Rules
- Strict mode, `noUncheckedIndexedAccess: true`, no `any`, no `@ts-ignore`
- Use inline type imports: `import type { Foo } from '...'`
- Path alias `~/*` resolves to `apps/web/src/*`
- Shared configs: `@portfolio/tsconfig/base`, `/react`, `/node`

## ESLint Rules (enforced)
- Import order: builtin → external → internal (`~/*`) → sibling → type
- `no-console`: warn (allow `warn`, `error`, `info`)
- Consistent type imports (inline form)
- React hooks exhaustive-deps: warn
- JSX-a11y accessibility rules enabled

## Design System Principles (impeccable.style)
- Design must be **audience-first** and register-aware: this is a **Brand** register site (portfolio, design IS the product)
- Anti-patterns to avoid: nested card structures, low-contrast labels, gradient text, overused font monoculture
- Document component variants consistently: `primary | secondary | ghost | destructive`; size variants: `sm | md | lg`
- State variants must be designed: `hover`, `focus`, `active`, `disabled`
- Production code ships, not mockups — every component must be responsive

## CMS: Strapi v5
- API shape follows Strapi v5 flat response format (no `.data.attributes` nesting)
- Client at `src/lib/strapi.ts` — use `strapiFetch<T>()` for all CMS queries
- Content types to match: `ProjectEntry` (id, documentId, title, slug, summary, body, publishedAt)
- Authentication: Bearer token via `STRAPI_API_TOKEN`
- Strapi runs on `:1337` locally

## AI Editor (`/admin` route)
- Uses `claude-sonnet-4-6` via direct Anthropic API (not SDK)
- Server fn at `src/server/drafts.ts`, HTTP wrapper at `src/server/anthropic.ts`
- Max tokens: 2048; default system prompt tuned for portfolio content editing
- Never expose `ANTHROPIC_API_KEY` — it is server-only

## Custom Slash Commands (`.claude/commands/`)

| Command | Purpose |
|---|---|
| `/typecheck` | Run `pnpm typecheck` and report all type errors |
| `/lint` | Run ESLint and list violations by severity |
| `/build` | Build SSR bundle and report output |
| `/new-route` | Scaffold a TanStack Router route file |
| `/new-component` | Scaffold a React component + CSS |
| `/strapi-setup` | Bootstrap Strapi v5 and migrate static data |
| `/migrate-data` | Swap a static data file for a live Strapi query |
| `/design-check` | Audit files for design anti-patterns (impeccable.style) |

## Knowledge Files (`.claude/`)

- [architecture.md](.claude/architecture.md) — stack, request lifecycle, monorepo layout, key files
- [typescript.md](.claude/typescript.md) — strict config, branded types, discriminated unions, no-any checklist
- [hooks.md](.claude/hooks.md) — safe React hooks, `createServerFn`, async state, a11y patterns
- [strapi.md](.claude/strapi.md) — v5 flat response format, client usage, content types, migration path
- [design.md](.claude/design.md) — OKLCH tokens, Geist type scale, variant naming, responsive checklist
- [impeccable-style.md](.claude/impeccable-style.md) — 27 anti-patterns, audience-first, section-specific rules

## What NOT to do
- Do not edit `src/routeTree.gen.ts` — it is auto-generated
- Do not add Tailwind utility classes — use `src/styles/` and CSS custom properties
- Do not use `any` or bypass TypeScript strict checks
- Do not put secrets in VITE_* env vars (they ship to the client)
- Do not nest card containers (impeccable.style anti-pattern)
