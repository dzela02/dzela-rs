# TypeScript Best Practices

## Compiler Configuration

This project uses `packages/tsconfig/base.json` with:
- `strict: true` — enables all strict checks
- `noUncheckedIndexedAccess: true` — array/object access returns `T | undefined`
- `exactOptionalPropertyTypes: true` — optional props may not be assigned `undefined` explicitly
- `moduleResolution: "Bundler"` — Vite-aware resolution
- `noEmit: true` for the React app (type-check only)

Never weaken these. Do not add `// @ts-ignore` or `// @ts-expect-error` without a comment explaining the specific upstream bug.

## Import Style

Always use inline type imports:
```ts
// ✅
import type { ReactNode } from 'react';
import { useState, type FC } from 'react';

// ❌
import { ReactNode } from 'react';
```

Path alias `~/*` maps to `apps/web/src/*`. Prefer it over relative imports that go up more than one level.

## Typing Patterns

### Discriminated Unions over boolean flags
```ts
// ✅
type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Project[] }
  | { status: 'error'; message: string };

// ❌
type LoadState = { loading: boolean; data?: Project[]; error?: string };
```

### Exhaustive switches
```ts
function renderState(state: LoadState): ReactNode {
  switch (state.status) {
    case 'idle': return null;
    case 'loading': return <Spinner />;
    case 'success': return <List data={state.data} />;
    case 'error': return <Error msg={state.message} />;
    default: {
      const _: never = state;  // compile error if a branch is added without handling it
      return null;
    }
  }
}
```

### Branded types for domain values
```ts
type ProjectSlug = string & { readonly __brand: 'ProjectSlug' };
function toSlug(raw: string): ProjectSlug { return raw as ProjectSlug; }
```

Use branded types for slugs, IDs, tokens, and any value whose raw type (`string`, `number`) is not self-documenting.

### Readonly data structures
```ts
const PROJECTS = [...] as const satisfies readonly Project[];
```

`satisfies` catches shape errors; `as const` narrows literals.

### Avoid `any` — use `unknown` at boundaries
```ts
// ✅ — parse at the boundary
async function fetchJson(url: string): Promise<unknown> { ... }

// Then narrow with a type guard or Zod schema
function isProject(v: unknown): v is Project { ... }
```

## React Component Typing

```ts
// ✅ Named function with explicit return type for complex components
function ProjectCard({ project }: { project: Project }): ReactElement { ... }

// ✅ Arrow + FC for simple leaf components
const Tag: FC<{ label: string }> = ({ label }) => <span>{label}</span>;
```

Do not use `React.FC` with children — declare `children: ReactNode` explicitly.

Never use `React.Component` class syntax.

## Server vs Client Code

Files under `src/server/` are server-only. They may import Node.js built-ins, secret env vars, and `createServerFn` from `@tanstack/react-start`. Client components must never import from `src/server/`.

Expose server logic only via `createServerFn`:
```ts
import { createServerFn } from '@tanstack/react-start';

export const getDraft = createServerFn({ method: 'POST' })
  .validator((data: unknown) => { /* validate */ return data as DraftRequest; })
  .handler(async ({ data }) => { /* call Anthropic etc. */ });
```

## No-Any Checklist

Before submitting, run `pnpm typecheck`. If the build only passes with `any`:
1. Check if a third-party type is missing → add `@types/…` or write a `.d.ts`
2. Use `unknown` + narrowing at boundaries
3. Use generics to propagate types instead of erasing them

## ESLint Rules That Enforce These

These are active in `packages/eslint-config/base.js`:
- `@typescript-eslint/no-explicit-any`
- `@typescript-eslint/consistent-type-imports`
- `@typescript-eslint/no-unused-vars` (underscore prefix exempted)
- `import/order` with `type` group at end
