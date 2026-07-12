# Architecture Overview

## Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | TanStack Start (SSR) | 1.167.x |
| Routing | TanStack Router | 1.167.x |
| UI library | React | 19.0.0 |
| Build tool | Vite | 7.x |
| CMS | Strapi | v5 (placeholder, `:1337`) |
| AI | Anthropic Claude API | `claude-sonnet-4-6` |
| Monorepo | Turborepo + pnpm workspaces | 2.3.0 / 9.12.0 |
| Language | TypeScript | 5.6.3 |

## Monorepo Layout

```
apps/web     — the live site (SSR React app)
apps/cms     — Strapi instance (bootstrap when ready)
packages/eslint-config  — shared ESLint v9 flat config
packages/tsconfig       — base / react / node presets
packages/ui             — cn() + minimal design tokens
```

All workspace deps use `workspace:*` protocol. Turbo caches tasks across packages intelligently — always run commands from the root unless targeting one specific app.

## Request Lifecycle (SSR)

```
Browser request
  → TanStack Start server (Node, .output/server/index.mjs)
  → Route matched via file-based router
  → loader() runs on server (data fetching, CMS calls, auth guards)
  → React component renders to HTML (SSR)
  → HTML streamed to browser
  → React hydrates on client
  → Client-side navigation takes over (SPA transitions)
```

Loaders run **server-only** — safe to call Strapi, use env secrets, throw `redirect()` or `notFound()`.

## Data Flow

```
Static data (src/data/)    ──→  Route loader  ──→  Component
Strapi API (src/lib/strapi.ts)  ↗
```

When Strapi is active, route loaders switch from importing static constants to calling `cms.listProjects()` / `cms.getProject(slug)`. The component receives the same shape either way.

## Server Boundary

```
src/server/anthropic.ts   ← Anthropic API client (never touches client bundle)
src/server/drafts.ts      ← createServerFn wrappers (exposed to /admin route)
```

`createServerFn` serializes to a POST endpoint at build time. The client calls a function; the runtime does an HTTP request under the hood. Secrets stay server-side.

## Styling Architecture

```
src/styles/tokens.css    ← CSS custom properties (colors, type scale, spacing)
src/styles/app.css       ← all component styles (19KB, hand-rolled, no Tailwind)
packages/ui/src/lib/cn.ts ← cn() = clsx + tailwind-merge (for conditional classes)
```

No CSS-in-JS, no CSS modules, no Tailwind utility classes on elements. Styles live in `app.css` keyed to semantic class names (`.nav`, `.hero`, `.block`, `.tag`, etc.).

## Route File Conventions

```
src/routes/__root.tsx         ← global layout (Nav + Outlet + Footer)
src/routes/index.tsx          ← /
src/routes/work.index.tsx     ← /work  (note: `.index` for index of a segment)
src/routes/work.$slug.tsx     ← /work/:slug  (dynamic param with $)
src/routes/about.tsx          ← /about
src/routes/admin.tsx          ← /admin (AI draft editor)
src/routeTree.gen.ts          ← AUTO-GENERATED, never edit
```

Route files export `Route = createFileRoute(path)({...})`. Components are co-located with their route.

## Environment Variables

| Var | Runtime | Purpose |
|---|---|---|
| `STRAPI_URL` | Server | Strapi base URL |
| `STRAPI_API_TOKEN` | Server | Strapi Bearer token |
| `ANTHROPIC_API_KEY` | Server | Claude API key |
| `VITE_*` | Client+Server | Any public config (prefix required) |

`VITE_*` vars are inlined into the client bundle at build time. Never put secrets in `VITE_*` vars.

## Turbo Task Graph

```
typecheck → (none, independent)
lint      → (none, independent)
build     → depends on build of dependencies
dev       → depends on dev of dependencies (persistent)
test      → depends on build
```

Running `pnpm build` from root builds packages first, then apps. The dependency graph is declared in `turbo.json`.

## Adding a New Page

1. Create `src/routes/your-page.tsx`
2. Export `Route = createFileRoute('/your-page')({ loader, component })`
3. Add `loader` if the page needs server data
4. The route tree is auto-regenerated on next `pnpm dev`
5. Add a nav link in `src/components/nav.tsx` if it should be globally accessible

## Adding a New Package

1. Create `packages/your-pkg/` with `package.json` (name: `@portfolio/your-pkg`)
2. Add `"@portfolio/your-pkg": "workspace:*"` to the consuming app's `package.json`
3. Extend the shared ESLint config and tsconfig
4. Run `pnpm install` from root to link

## Key Files to Know

| File | Purpose |
|---|---|
| `apps/web/src/lib/strapi.ts` | Strapi v5 fetch client |
| `apps/web/src/server/anthropic.ts` | Anthropic API wrapper |
| `apps/web/src/server/drafts.ts` | Server function for AI editor |
| `apps/web/src/components/primitives.tsx` | Button, Badge, Tag, IconBtn |
| `apps/web/src/components/icon.tsx` | SVG icon system |
| `apps/web/src/styles/tokens.css` | Design tokens |
| `apps/web/src/styles/app.css` | All component styles |
| `packages/tsconfig/base.json` | Strict TS compiler config |
| `packages/eslint-config/base.js` | Base ESLint rules |
