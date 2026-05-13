# portfolio-v2

Marko's personal portfolio. Turborepo monorepo, TanStack Start + Vite frontend,
Strapi-shaped CMS contract, and an in-app AI content editor.

## Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: TanStack Start (Vite-powered SSR) with file-based routing
- **Styling**: hand-rolled CSS (Geist + OKLCH tokens), no Tailwind
- **CMS**: Strapi (deferred — `apps/cms` placeholder, frontend speaks the API contract)
- **AI editor**: `/admin` route, server-side Anthropic API call via TanStack `createServerFn`
- **Lint/format**: ESLint v9 flat config (typescript-eslint, react, jsx-a11y, import) + Prettier 3
- **Type system**: strict TypeScript, no `any`, no `@ts-ignore`

## Layout

```
.
├── apps/
│   ├── web/                  # TanStack Start frontend
│   │   ├── src/
│   │   │   ├── components/   # Icon, primitives (Button/Tag/...), Nav, Footer
│   │   │   │   └── sections/ # Hero, NowBlock, Systems, lists, Contact
│   │   │   ├── data/         # PROJECTS, POSTS, EXPERIENCE — TS-typed
│   │   │   ├── routes/       # File-based routes (TanStack Router)
│   │   │   ├── lib/          # strapi.ts client
│   │   │   ├── server/       # server-only modules (anthropic, drafts)
│   │   │   └── styles/       # tokens.css + app.css (hand-rolled)
│   │   └── public/           # avatar.png, cv/marko-dzelatovic.pdf
│   └── cms/                  # placeholder for Strapi (see apps/cms/.gitkeep)
├── packages/
│   ├── eslint-config/        # shared flat config (base + react)
│   ├── tsconfig/             # base / react / node tsconfig presets
│   └── ui/                   # cn helper (kept minimal; web has its own components)
├── design-source/            # original Claude-generated HTML/JSX/CSS for reference
├── package.json              # root scripts via turbo
├── pnpm-workspace.yaml
├── turbo.json
└── .prettierrc.json          # repo-wide prettier
```

## Getting started

```bash
pnpm install                  # installs the whole workspace
pnpm dev                      # turbo runs dev for every app (web on :3000)
pnpm build                    # production builds
pnpm lint                     # eslint across the workspace
pnpm typecheck                # tsc --noEmit across the workspace
pnpm format                   # prettier --write
```

## Routes

| Path           | What                                         |
|----------------|----------------------------------------------|
| `/`            | Home (Hero, Now, Systems, recent everything) |
| `/work`        | Full project list                            |
| `/work/$slug`  | Project detail (loader-based)                |
| `/writing`     | Writing, grouped by year                     |
| `/experience`  | Full experience timeline                     |
| `/about`       | About + CV download                          |
| `/admin`       | AI content editor (drafts via Claude API)    |

## Environment

Copy `apps/web/.env.example` → `apps/web/.env.local` and fill in:

- `STRAPI_URL` / `STRAPI_API_TOKEN` — once Strapi is added
- `ANTHROPIC_API_KEY` — server-side only, used by `/admin`'s draft endpoint
- `VITE_PUBLIC_SITE_URL` — exposed to the client for canonical URLs

## Adding Strapi later

```bash
cd apps
pnpm dlx create-strapi-app@latest cms --quickstart --no-run --typescript
# rename apps/cms/package.json's "name" to "@portfolio/cms"
# point STRAPI_URL at http://localhost:1337
```

The `apps/web/src/lib/strapi.ts` client and the `cms.listProjects` /
`cms.getProject` helpers are ready for v5's flattened response shape.

## Design source

The original Claude-generated design files live under `design-source/`
(`index.html`, `Components.jsx`, `Sections.jsx`, the three CSS files). They're
kept in-repo so anyone can compare the live build against the source of truth.
