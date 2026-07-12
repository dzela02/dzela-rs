# Safe Hooks & Patterns

Safe patterns to follow in this codebase. These cover React hooks, TanStack hooks, server functions, and async data patterns.

## React Hooks

### Rules (enforced by eslint-plugin-react-hooks)
- Only call hooks at the top level of a component or custom hook — never inside conditionals, loops, or nested functions
- Only call hooks from React function components or custom hooks (named `use*`)
- `useEffect` deps array must include every value the effect reads — the linter enforces this

### useEffect — safe usage
```ts
// ✅ Cleanup prevents memory leaks and stale closures
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal })
    .then(setData)
    .catch(() => {});         // swallow AbortError
  return () => controller.abort();
}, []);                        // empty = run once on mount

// ❌ No cleanup — causes state updates on unmounted component
useEffect(() => {
  fetch('/api/data').then(setData);
}, []);
```

### useState initialization
```ts
// ✅ Lazy initializer avoids re-computation on every render
const [data, setData] = useState<Project[]>(() => loadFromStorage());

// ❌ Runs on every render even though useState ignores subsequent calls
const [data, setData] = useState<Project[]>(loadFromStorage());
```

### useCallback / useMemo
Add these only when profiling identifies a performance problem. Premature memoization adds noise without benefit.

When you do memoize:
```ts
// ✅ Include every dep the callback reads
const handleSubmit = useCallback(() => {
  onSubmit(formValues);
}, [formValues, onSubmit]);
```

### Custom hooks — structure
```ts
// Name must start with `use`
function useProject(slug: string) {
  const [state, setState] = useState<LoadState>({ status: 'idle' });

  useEffect(() => {
    setState({ status: 'loading' });
    cms.getProject(slug)
      .then(data => setState({ status: 'success', data }))
      .catch(err => setState({ status: 'error', message: String(err) }));
  }, [slug]);

  return state;
}
```

Return discriminated union state (see `typescript.md`) so callers can switch exhaustively.

## TanStack Router Hooks

```ts
import { useParams, useSearch, useNavigate, useRouterState } from '@tanstack/react-router';

// Type-safe — no casting needed when used inside the matching route component
const { slug } = useParams({ from: '/work/$slug' });
const navigate = useNavigate();

// Programmatic navigation
navigate({ to: '/work', search: { page: 2 } });
```

**Never** `useNavigate` inside `useEffect` to redirect on load — use the route's `beforeLoad` guard instead:
```ts
export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    if (!isAuthenticated()) throw redirect({ to: '/' });
  },
});
```

## TanStack Router Loaders

Loaders run on the server (or during SSR). They must be pure data fetchers — no side effects, no event dispatching.

```ts
export const Route = createFileRoute('/work/$slug')({
  loader: async ({ params }): Promise<Project> => {
    const project = await cms.getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const project = Route.useLoaderData();  // fully typed
  ...
}
```

## Server Functions (`createServerFn`)

Server functions are the safe boundary between client and server. They:
- Run only on the server
- Accept a validated payload
- Must not expose internal errors to the client

```ts
// src/server/drafts.ts
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const DraftSchema = z.object({
  kind: z.string(),
  instructions: z.string(),
  existingContent: z.string().optional(),
});

export const getDraft = createServerFn({ method: 'POST' })
  .validator((data: unknown) => DraftSchema.parse(data))
  .handler(async ({ data }) => {
    // safe to use ANTHROPIC_API_KEY here
    return callAnthropic(data);
  });
```

Call from a component:
```ts
const result = await getDraft({ data: { kind, instructions } });
```

## Async State — Preferred Pattern

For simple async in components use the discriminated union pattern instead of separate `isLoading`/`error` booleans:

```ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function useAsync<T>(fn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });

  const run = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await fn();
      setState({ status: 'success', data });
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : String(err) });
    }
  }, [fn]);

  return { state, run };
}
```

## Event Handlers

```ts
// ✅ Stop propagation deliberately and explain why only when non-obvious
const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();  // prevent row-click from also firing
  onDelete(id);
};

// ❌ Swallowing events without reason
const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();  // why?
};
```

## Form Handling

This project does not use a form library yet. When adding forms:
1. Use controlled inputs with `useState` for small forms
2. Use `createServerFn` to submit — never expose API secrets in form actions
3. Validate input on both client (UX feedback) and server (security)

```tsx
const [value, setValue] = useState('');

<textarea
  value={value}
  onChange={e => setValue(e.target.value)}
  aria-label="Instructions"
/>
```

## Accessibility (JSX-a11y rules enforced)

- Interactive elements must have accessible names (`aria-label` or visible text)
- `<button>` for actions, `<a>` for navigation — never swap them
- Keyboard navigation must work: `onKeyDown` alongside `onClick` for custom interactive elements
- Images need `alt` — empty string `alt=""` for decorative images

## Patterns to Avoid

| Anti-pattern | Why | Alternative |
|---|---|---|
| `useEffect` for derived state | Causes extra render cycle | Compute inline or `useMemo` |
| Calling hooks conditionally | Breaks hook call order | Move condition inside hook |
| State updates after unmount | React warning + memory leak | `AbortController` + cleanup |
| `any` cast to silence TS in hooks | Hides real type errors | Fix the type |
| `useRef` as a mutable global | Not reactive; bypasses React model | `useState` or lift state up |
