---
description: Scaffold a new TanStack Router route
---

The user will provide the route path (e.g. `/blog/$slug`). Create the route file in `apps/web/src/routes/` following TanStack Router file naming conventions:

- `/blog` → `blog.index.tsx`
- `/blog/$slug` → `blog.$slug.tsx`
- `/settings/profile` → `settings.profile.tsx`

Use this exact template, substituting the real path and component name:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/YOUR_PATH')({
  loader: async () => {
    // fetch data here — safe to use env secrets
    return {};
  },
  component: YourPageComponent,
});

function YourPageComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="page">
      {/* content */}
    </main>
  );
}
```

Rules:
- Never edit `src/routeTree.gen.ts` — it is auto-generated
- The loader must be typed; use `satisfies` or explicit return type
- Use `~/*` path alias for internal imports
- If the route needs a nav link, add it to `src/components/nav.tsx`
