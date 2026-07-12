---
description: Replace a static data file with a live Strapi CMS query
---

The user will specify which data to migrate: `projects`, `experience`, or `posts`.

## Process

1. **Verify Strapi is running** — check `STRAPI_URL` and `STRAPI_API_TOKEN` are set in `.env.local`

2. **Confirm the content type exists in Strapi** — the fields must match the TypeScript interface in `src/lib/strapi.ts`. If fields are missing, extend the interface and add them to the Strapi content type first.

3. **Update the route loader** — find every route that imports from the static data file and replace with a CMS call:

```ts
// projects
import { cms } from '~/lib/strapi';
const { data: projects } = await cms.listProjects();

// experience — add this method to src/lib/strapi.ts if not present
const { data: entries } = await strapiFetch<ExperienceEntry>('/api/experience-entries');

// posts — add this method to src/lib/strapi.ts if not present
const { data: posts } = await strapiFetch<PostEntry>('/api/posts', { sort: ['date:desc'] });
```

4. **Handle the not-found case** in dynamic routes:
```ts
const project = await cms.getProject(params.slug);
if (!project) throw notFound();
```

5. **Run typecheck** — `pnpm typecheck` must pass before proceeding.

6. **Test** — start `pnpm dev`, visit all affected routes and confirm data renders.

7. **Delete the static file** — only after routes are confirmed working.

## Adding new methods to the Strapi client

Edit `apps/web/src/lib/strapi.ts` and add:
```ts
listPosts: (query?: StrapiQuery) =>
  strapiFetch<PostEntry>('/api/posts', { sort: ['date:desc'], ...query }),
```

Keep the client thin — no business logic, just typed fetch wrappers.
