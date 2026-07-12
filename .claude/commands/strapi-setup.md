---
description: Bootstrap Strapi v5 CMS and migrate static data to it
---

## Step 1 — Bootstrap Strapi

Run from the monorepo root:
```bash
pnpm dlx create-strapi-app@latest cms --quickstart
```

This creates `apps/cms/`. Strapi admin will be at `http://localhost:1337/admin`.

## Step 2 — Set environment variables

Add to `apps/web/.env.local`:
```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<token from Strapi Admin → Settings → API Tokens>
```

Use a **Read-only** token for the public site.

## Step 3 — Create content types in Strapi Admin

Create these collection types (Strapi Admin → Content-Type Builder):

**Project**
- `title` String (required)
- `slug` UID from title (required)
- `kind` String
- `year` Integer
- `role` String
- `stack` JSON (string array)
- `blurb` Text
- `body` Rich Text (Blocks)
- `publishedAt` DateTime (auto — enables draft/publish)

**ExperienceEntry**
- `years` String (e.g. "2023–2025")
- `role` String
- `company` String
- `team` String
- `location` String
- `bullets` JSON (string array)

**Post**
- `title` String
- `year` Integer
- `date` Date
- `readTime` Integer (minutes)
- `tags` JSON (string array)
- `body` Rich Text (Blocks)

## Step 4 — Import existing data

Copy entries from `apps/web/src/data/projects.ts`, `experience.ts`, and `posts.ts` into Strapi Admin manually, or write a seed script using the Strapi SDK.

## Step 5 — Update route loaders

Replace static imports in each route's `loader` with CMS calls:

```ts
// Before
import { PROJECTS } from '~/data/projects';

// After
import { cms } from '~/lib/strapi';
const { data } = await cms.listProjects();
```

The `strapiFetch` client at `src/lib/strapi.ts` is already written. The `ProjectEntry` type is already defined there — add fields as needed.

## Step 6 — Delete static data files

Once all routes are pulling from Strapi and verified working, delete:
- `src/data/projects.ts`
- `src/data/experience.ts`
- `src/data/posts.ts`

## Strapi v5 key difference

Responses are **flat** — no `.data.attributes` nesting:
```ts
// ✅ v5
response.data.title

// ❌ v4 (never write this)
response.data.attributes.title
```
