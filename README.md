# dzela.rs — portfolio v2

Personal portfolio for [Marko Dželatović](https://dzela.rs). The goal was to build something that feels considered rather than generated: hand-rolled CSS, no UI frameworks, content as typed TypeScript constants, and case studies that read like engineering write-ups rather than marketing copy.

## What this is

A SPA with four routes. No server-side rendering, no database, no headless CMS in prod. Content lives in `src/data/` as typed constants — fast to iterate, easy to keep honest, and ready to swap for Strapi API calls when that becomes worth the overhead.

The case studies (`/cases`) are the main point. Each one documents a real system problem: the context, the approach, the tradeoffs, the result. Code blocks, error messages, SVG architecture diagrams — all rendered client-side from a discriminated union of block types.

---

## Stack

| Layer | Choice |
|---|---|
| Bundler | Vite 7 |
| Routing | TanStack Router (file-based, SPA) |
| UI | React 19 |
| Styling | Hand-rolled CSS, OKLCH color space, Geist typeface |
| Syntax highlighting | highlight.js |
| Monorepo | pnpm workspaces + Turborepo |
| Deployment | Vercel (SPA rewrites) |
| TypeScript | Strict, `noUncheckedIndexedAccess`, no `any` |

No Tailwind in this repo. All styling is in `src/styles/` via CSS custom properties. The single accent is moss green `oklch(0.58 0.12 155)`.

---

## Monorepo layout

```
apps/
  web/                      the live site
    src/
      components/           nav, footer, primitives (Button, Tag), theme toggle
        sections/           page-section components (Hero, NowBlock, etc.)
        case-diagrams.tsx   SVG architecture diagrams as React components
      data/
        projects.ts         case studies — typed CaseBlock[] content
        experience.ts       work history
      routes/               file-based routes (TanStack Router generates routeTree.gen.ts)
      styles/
        tokens.css          OKLCH design tokens, type scale, spacing
        app.css             layout, component styles
      lib/
        strapi.ts           pre-built Strapi v5 client (unused until CMS lands)
    public/
      favicon.svg
      og.svg                1200x630 Open Graph image
      avatar.png
  cms/                      Strapi placeholder (not active)
packages/
  ui/                       cn() utility
  tsconfig/                 shared TypeScript presets
  eslint-config/            shared ESLint v9 flat config
```

---

## Routes

| Route | Content |
|---|---|
| `/` | Home: hero, current role, systems worked on, case teaser |
| `/cases` | Case study index |
| `/cases/:slug` | Case study detail — rendered from `sections[]` block array |
| `/about` | Bio, stack, CV on request |

---

## Case study format

Case studies are defined in `src/data/projects.ts` as `ProjectEntry` objects. Each entry uses a `sections` array of typed `CaseBlock` items:

```ts
type CaseBlock =
  | { type: 'text';    body: string }
  | { type: 'code';    lang?: string; label?: string; body: string }
  | { type: 'error';   label?: string; body: string }
  | { type: 'diagram'; id: string }
```

SVG diagrams are React components in `src/components/case-diagrams.tsx`, keyed by `id`. They use CSS custom properties so they respond to light/dark mode automatically.

---

## Getting started

Requirements: Node >= 20.11.0, pnpm >= 9.0.0.

```bash
pnpm install
pnpm dev              # web on http://localhost:3000
```

Other commands (run across the workspace via Turborepo):

```bash
pnpm build            # production build → apps/web/dist/
pnpm typecheck        # tsc --noEmit (strict)
pnpm lint
pnpm lint:fix
pnpm format           # Prettier
```

---

## Environment

```bash
cp apps/web/.env.example apps/web/.env.local
```

Currently only one variable is needed locally:

```
VITE_PUBLIC_SITE_URL=http://localhost:3000
```

The following are wired up but unused until those features are active:

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
ANTHROPIC_API_KEY=       # server-only — never set as VITE_* prefix
```

---

## Deployment

Deployed on Vercel as a static SPA. `vercel.json` at the repo root:

```json
{
  "buildCommand": "pnpm --filter @portfolio/web build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install --frozen-lockfile",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

The `rewrites` rule makes client-side routing work under Vercel's CDN. In the Vercel project settings, set **Root Directory** to `apps/web`.

---

## Design tokens

Defined in `src/styles/tokens.css`. Core palette:

```css
--color-accent:   oklch(0.58 0.12 155);   /* moss green */
--color-bg:       oklch(0.98 0.005 100);  /* near-white */
--color-surface:  oklch(0.95 0.005 100);
--color-text:     oklch(0.18 0.01 100);
--color-muted:    oklch(0.55 0.01 100);
```

Dark mode is `.theme-dark` on `<html>`, toggled by the theme button and persisted in `localStorage`. An inline script in `index.html` applies the class before first paint to prevent flash.

---

## TypeScript rules

- Strict mode with `noUncheckedIndexedAccess: true`
- No `any`, no `@ts-ignore`
- Path alias `~/*` maps to `apps/web/src/*`
- Imports: `import type { Foo } from '...'` inline form only

---

## What is not active yet

- **CMS**: `apps/cms/` is a placeholder. Run `pnpm dlx create-strapi-app@latest cms --quickstart --typescript` inside `apps/` to bootstrap it. The Strapi v5 client at `src/lib/strapi.ts` and all content types are pre-typed and ready.
- **Writing section**: deferred until there is something worth publishing.
- **AI editor** (`/admin`): scaffolded at `src/server/anthropic.ts` but the route was removed pending the CMS being active.
- **CV download**: not hosted publicly. Available on request via [LinkedIn](https://www.linkedin.com/in/markodzela/) or [email](mailto:contact@dzela.rs).
