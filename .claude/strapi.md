# Strapi v5 CMS Knowledge

## Setup

Strapi lives at `apps/cms/`. To bootstrap it (run once):
```bash
pnpm dlx create-strapi-app@latest cms --quickstart
```

Runs on `http://localhost:1337` by default. Set `STRAPI_URL` and `STRAPI_API_TOKEN` in `apps/web/.env.local`.

## Strapi v5 Breaking Changes vs v4

The most important change: **flat response format**. In v4, data was nested under `.data.attributes`. In v5, fields are at the top level of each document.

```ts
// v4 (old) — NEVER write this
response.data.attributes.title

// v5 (current) — always flat
response.data.title
```

## The Project's Strapi Client

`apps/web/src/lib/strapi.ts` is pre-written. Use it — do not write raw `fetch` calls to Strapi.

```ts
import { cms } from '~/lib/strapi';

// List all published projects
const { data, meta } = await cms.listProjects();

// Get one by slug
const project = await cms.getProject('my-slug');
```

### `strapiFetch<T>` signature
```ts
strapiFetch<T>(
  path: string,           // e.g. '/api/projects'
  query?: StrapiQuery,    // populate, filters, sort, pagination, fields, locale
  init?: RequestInit      // passed straight to fetch
): Promise<StrapiResponse<T>>
```

### Query builder options
```ts
type StrapiQuery = {
  populate?: string | string[] | Record<string, unknown>;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: { page?: number; pageSize?: number; withCount?: boolean };
  fields?: string[];
  publicationState?: 'live' | 'preview';
  locale?: string;
};
```

## Content Type Conventions

### Naming
- Collection type API IDs: kebab-case plural (`projects`, `blog-posts`, `experience-entries`)
- Single type API IDs: kebab-case singular (`about-page`, `home-settings`)
- REST endpoints: `/api/{plural-api-id}` for collections, `/api/{singular-api-id}` for singles

### Canonical fields for all content types
| Field | Type | Notes |
|---|---|---|
| `title` | String | Required |
| `slug` | UID | Auto-generated from title; required for routing |
| `publishedAt` | DateTime | null = draft; non-null = published |
| `body` | RichText (Blocks) | Strapi v5 uses Blocks editor by default |

### ProjectEntry (already typed in `src/lib/strapi.ts`)
```ts
interface ProjectEntry {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  body: unknown;        // Strapi Blocks — use a Blocks renderer
  publishedAt: string;
}
```

When adding new fields to Strapi, extend this interface and add the field name to the `fields` query param.

## Authentication

All requests use a Bearer token:
```
Authorization: Bearer <STRAPI_API_TOKEN>
```

The token is set in `apps/web/src/lib/strapi.ts` from `process.env.STRAPI_API_TOKEN`. Never expose it in client code.

Generate tokens in Strapi Admin → Settings → API Tokens. Use **Read-only** tokens for the public site; **Full access** only for admin operations.

## Draft / Preview Mode

Strapi v5 supports `publicationState`:
- `'live'` (default) — only published entries
- `'preview'` — published + drafts (requires a token with draft access)

Wire preview mode to the `/admin` route only. Public routes always use `'live'`.

## Migrating Hardcoded Data to Strapi

Current data in `src/data/projects.ts`, `experience.ts`, `posts.ts` uses the same shape as what the Strapi client expects. The migration path:

1. Create the collection type in Strapi Admin with matching fields
2. Import the existing data (use Strapi's import plugin or seed scripts)
3. Replace the static import in the route loader with `cms.listProjects()` etc.
4. Delete the static data file once confirmed working

## Strapi Blocks (Rich Text v5)

Strapi v5 ships a blocks-based rich text editor. The `body` field returns an array of block nodes, not HTML. Use `@strapi/blocks-react-renderer` to render:

```tsx
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

<BlocksRenderer content={project.body} />
```

Or write a custom renderer for full control over element styles.

## Error Handling

Strapi returns standard HTTP codes. `strapiFetch` throws on non-2xx. Handle in loaders:
```ts
export const loader = createFileRoute('/work/$slug').loader(async ({ params }) => {
  try {
    return await cms.getProject(params.slug);
  } catch {
    throw notFound();
  }
});
```

## Local Dev Notes

- Strapi SQLite DB is at `apps/cms/.tmp/data.db` — do not commit it
- Media uploads go to `apps/cms/public/uploads/` — configure S3/Cloudinary for production
- Admin panel at `http://localhost:1337/admin`
- When running both apps: `pnpm dev` from root starts both via Turbo
