export type CaseBlock =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; label?: string; lang?: string }
  | { type: 'error'; content: string; label?: string }
  | { type: 'diagram'; id: string };

export interface ProjectEntry {
  slug: string;
  name: string;
  kind: string;
  year: string;
  role: string;
  stack: string[];
  blurb: string;
  /** Rich sections: text paragraphs, code blocks, error excerpts. When present, replaces body/codeBlock. */
  sections?: CaseBlock[];
  /** Fallback plain body text for cases without rich sections */
  body: string;
  /** Zero-indexed paragraph after which to insert the code block inline */
  codePosition?: number;
  codeBlock?: string;
  highlights?: string[];
  highlightsTitle?: string;
  references?: { label: string; url: string; note?: string }[];
}

export const PROJECTS: ProjectEntry[] = [
  {
    slug: 'monorepo-vs-polyrepo',
    name: 'Monorepo unification: four repos into one',
    kind: 'architecture',
    year: '2024',
    role: 'Lead Engineer',
    stack: ['turborepo', 'typescript', 'github actions', 'pnpm'],
    blurb:
      'Four product frontends, three near-identical design systems, zero shared infrastructure. The question was whether consolidation would pay off before it caused enough friction to kill the project.',
    body: `The problem wasn't the code, it was the coordination tax. Four separate repos meant four separate CI runs, four places a dependency update needed to land, and a design system that had forked three ways because syncing it was harder than copying it.

The case for a monorepo was simple: shared packages, parallel typed builds, CI that runs only what changed. The case against it was also simple: one broken build blocks four teams.

The migration happened in two phases. First, the shared packages: a UI kit, a token set, and a set of typed API contracts extracted from the messiest of the four codebases. Getting those right before touching the apps meant the apps had somewhere clean to land. Second, the apps themselves, one at a time, with every CI and release workflow preserved or improved before moving to the next.

Build times dropped by roughly 60% on the hot path (only changed packages rebuild). The duplicate components quietly disappeared as teams found it easier to use the shared ones than maintain their own. The hard part wasn't the tooling, it was calibrating how opinionated the shared layer should be. Too rigid and teams work around it. Too flexible and you haven't actually unified anything.`,
    codePosition: 2,
    codeBlock: `// turbo.json: only rebuild what changed
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.ts", "test/**/*.ts"]
    },
    "lint": { "outputs": [] }
  }
}`,
    highlights: [
      'Shared UI kit and token set extracted before touching the apps: clean landing zone first, apps migrated one at a time',
      'Build times down ~60% on the hot path: Turborepo rebuilds only what changed on each PR',
      'Duplicate components disappeared as the shared layer became easier to use than maintaining local copies',
      'Calibrating shared layer opinion: too rigid and teams route around it, too loose and nothing is actually unified',
    ],
  },
  {
    slug: 'ci-optimisation',
    name: 'CI optimisation: from 40 minutes to under 8',
    kind: 'devex',
    year: '2023',
    role: 'Engineer',
    stack: ['github actions', 'turborepo', 'node.js', 'aws'],
    blurb:
      'A CI pipeline that had grown into a 40-minute monster. No caching, no parallelism, full rebuilds on every push. The fix was less about tools and more about treating CI as code.',
    body: '',
    sections: [
      {
        type: 'text',
        content: `The pipeline had been built the way most pipelines get built: a job added here, a step bolted on there, over two years of nobody being responsible for the whole thing. By the time anyone looked at it properly, a green build took 40 minutes and a failed one meant re-running the whole thing from scratch because nothing told you what had actually broken.

Every engineer on the team had learned to push and go do something else. The feedback loop was so slow it had stopped being a loop.`,
      },
      {
        type: 'code',
        label: '.github/workflows/ci.yml (before)',
        lang: 'yaml',
        content: `jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - run: npm install          # cold install every run, ~8 minutes

      - run: npm run build        # all packages, every time

      - run: npm run test:unit    # sequential
      - run: npm run test:integration
      - run: npm run test:e2e

      - run: npm run deploy       # runs even when tests fail`,
      },
      {
        type: 'text',
        content: `The audit found the same problems that always show up. node_modules installed fresh on every run with no caching. Every package rebuilt even when only one file had changed. Test suites running sequentially so a failure in unit tests still burned through integration and e2e before giving up. The deploy step had no dependency on the test steps, so it ran regardless.

The worst part was the failure output. When a run failed, you got the full log of everything that succeeded before it, with the actual error buried somewhere in the middle.`,
      },
      {
        type: 'error',
        label: 'GitHub Actions · ci run #1847 · failed',
        content: `✓ Checkout             3s
✓ npm install          7m 43s
✓ build                11m 12s
✓ test:unit            6m 08s
✗ test:integration     8m 31s   ← actual failure
✓ test:e2e             4m 02s   ← ran anyway
✓ deploy               1m 44s   ← also ran anyway

Total: 39m 23s to find out one integration test failed.
The error is on line 8,241 of the log.`,
      },
      {
        type: 'text',
        content: `The premise for the rebuild was simple: a CI pipeline is a directed graph, and the job is to make it an honest one. Every step should declare what it depends on. Steps with no dependency on each other should run in parallel. Steps that fail should stop the graph at that node, not let unrelated steps keep running.

Three changes did most of the work.`,
      },
      {
        type: 'diagram',
        id: 'ci-pipeline',
      },
      {
        type: 'code',
        label: '.github/workflows/ci.yml (after)',
        lang: 'yaml',
        content: `jobs:
  install:
    steps:
      - uses: actions/cache@v3
        with:
          path: ~/.pnpm-store
          key: pnpm-\${{ hashFiles('**/pnpm-lock.yaml') }}
      - run: pnpm install --frozen-lockfile

  build:
    needs: install
    steps:
      # only packages affected by this commit rebuild
      - run: pnpm turbo build --filter=[HEAD^1]
      - uses: actions/upload-artifact@v3
        with: { name: build-output, path: 'packages/*/dist' }

  test:
    needs: build
    strategy:
      fail-fast: true
      matrix:
        suite: [unit, integration, e2e]
    steps:
      - uses: actions/download-artifact@v3
        with: { name: build-output }
      - run: pnpm turbo test:\${{ matrix.suite }} --filter=[HEAD^1]

  deploy:
    needs: test   # only runs if all matrix jobs pass
    steps:
      - run: pnpm turbo deploy --filter=[HEAD^1]`,
      },
      {
        type: 'text',
        content: `The cache step alone took install from 7m 43s to under 30 seconds on warm runs. The lockfile hash as the cache key means the cache only invalidates when dependencies actually change, not on every commit.

Turborepo's task graph handles the second problem. It knows which packages depend on which, so --filter=[HEAD^1] runs only the packages affected by the diff against the previous commit. On a PR that touches one package, one package builds and tests. The full rebuild only happens when a shared dependency changes.

The matrix strategy runs all three test suites in parallel on separate runners. fail-fast: true means if unit tests fail, the integration and e2e runners are cancelled immediately. The deploy job depends on all matrix jobs succeeding, so a failed test genuinely stops the pipeline.

End result: 40 minutes to under 8 on the average PR. More importantly, a failed run now points directly at what failed, and the successful steps do not re-run when you fix the failing one.`,
      },
    ],
    highlights: [
      'Dependency cache keyed on lockfile hash: install goes from ~8 min to under 30 seconds on warm runs',
      'Turborepo task graph with --filter=[HEAD^1]: only affected packages build and test per PR',
      'Test suites as parallel matrix jobs with fail-fast: a failure cancels unrelated runners immediately',
      'Build artifacts uploaded and downloaded between jobs: deploy never rebuilds what the test job already verified',
    ],
    highlightsTitle: 'What changed',
    references: [
      {
        label: 'GitHub Actions: caching dependencies',
        url: 'https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows',
        note: 'The cache action docs. The lockfile key strategy is the right default for package managers.',
      },
      {
        label: 'Turborepo: filtering packages',
        url: 'https://turbo.build/repo/docs/reference/run#--filter-string',
        note: '--filter=[HEAD^1] is the key incantation for affected-only runs in CI.',
      },
      {
        label: 'GitHub Actions: matrix strategy',
        url: 'https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow',
        note: 'How to fan out test suites across parallel runners with a single job definition.',
      },
    ],
  },
  {
    slug: 'micro-frontends',
    name: 'Micro-frontends: when to use them and how',
    kind: 'architecture',
    year: '2022',
    role: 'Frontend Developer',
    stack: ['react', 'typescript', 'module federation', 'redux', 'webpack'],
    blurb:
      'My first real system design challenge. Webpack Module Federation across four surfaces, independent deployability, and eventually the hard call to go back to a traditional monolith frontend when the architecture had served its purpose.',
    body: '',
    sections: [
      {
        type: 'text',
        content: `This was my first real system design challenge: not just building a feature inside an existing architecture, but deciding what the architecture should be. That distinction matters more than it sounds. Up to that point, the hard problems were always scoped: implement this, optimise that, fix this bug. Being handed the question of how a product should be structured across teams, surfaces, and release cycles is a different kind of responsibility. There is no obvious right answer, and you are the one who has to live with the tradeoffs.

The product had four distinct surfaces owned by teams with genuinely different release cadences and performance profiles. One needed to load fast and stay stable. Another was latency-sensitive and updated constantly. A third had compliance constraints that made it cautious about deploys. The fourth was the slow one, rarely touched. Bundling all of that together would mean one team's release cycle blocking another's. The pitch for micro-frontends was straightforward: each team owns their surface end to end, deploys on their own schedule, and moves at whatever pace their work demands.`,
      },
      {
        type: 'diagram',
        id: 'mf-topology',
      },
      {
        type: 'text',
        content: `The implementation used Webpack's Module Federation plugin. Each surface exposes its bundle as a remote, and the host shell loads them at runtime rather than bundling them together at build time. A remote could deploy independently, push a new remoteEntry.js to its CDN, and the shell would pick it up on the next page load without a shell redeploy.`,
      },
      {
        type: 'code',
        label: 'webpack.config.js · shell',
        lang: 'javascript',
        content: `// shell declares what it loads and what it shares
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    surface_a: 'surface_a@https://cdn-a/remoteEntry.js',
    surface_b: 'surface_b@https://cdn-b/remoteEntry.js',
    surface_c: 'surface_c@https://cdn-c/remoteEntry.js',
  },
  shared: {
    react:         { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom':   { singleton: true, requiredVersion: '^18.0.0' },
    'react-redux': { singleton: true },
  },
})`,
      },
      {
        type: 'text',
        content: `The shared dependency config is where most of the pain lives. Every package that must be the same instance across the shell and all remotes has to be declared as a singleton. Miss react-redux and you get two store instances. Miss the design token package and surfaces render different colours. The errors you get when you miss one are not helpful.`,
      },
      {
        type: 'error',
        label: 'browser console',
        content: `Warning: Invalid hook call. Hooks can only be called inside of the body of
a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app

See https://reactjs.org/link/invalid-hook-call for tips about how to debug
and fix this problem.`,
      },
      {
        type: 'text',
        content: `That warning appears when a remote loads and React discovers it already has a React instance in the module scope, so it now has two. Hooks break. Context stops propagating. Things fail in ways that look like your component logic is wrong. The actual cause is one line missing from the shared config. You learn to recognise this class of error quickly because you hit it repeatedly.

Version mismatches are a separate category of pain. The singleton config includes a requiredVersion. If the shell expects react@^18 and a remote was built against react@17, you get this at runtime, not at build time.`,
      },
      {
        type: 'error',
        label: 'browser console · runtime version mismatch',
        content: `Uncaught Error: Shared module is not available for eager consumption:
  webpack/sharing/consume/default/react/react

  Provided: 17.0.2  (from surface_b@cdn)
  Required: ^18.0.0 (by shell)

  at consumeSharedModule (webpack/runtime/consume shared)
  at Object.<anonymous> (remoteEntry.js)`,
      },
      {
        type: 'text',
        content: `This fails at runtime, in the browser, when the user loads the page. The shell built fine. The remote built fine. They just disagree at the moment of composition. The fix is a staging environment that loads all remotes together before any surface deploys to production. It should have existed from day one.

The shell app itself was a harder design problem than the remotes. It was not just a loader. It was the application skeleton: top-level routing, global navigation, auth context, and the communication bus between surfaces. Every remote depended on what the shell provided. Teams could not ship without understanding the shell's contracts, which was an irony worth naming. The architecture was designed to reduce cross-team coordination, but the shell became the one thing every team had to coordinate around.

Cross-surface state was the hardest design decision. Each remote was isolated by design, but they needed to share data: the authenticated user, session flags, feature flags, transient UI state. The solution was a Redux store hosted in the shell, exposed to remotes as a singleton through the shared config, and persisted via redux-persist so state survived page refreshes and navigations between surfaces.`,
      },
      {
        type: 'code',
        label: 'shell/store.ts',
        lang: 'typescript',
        content: `// store lives in the shell, exposed as a singleton to all remotes
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware(),
});

// only shell-owned slices are persisted
// remotes must NOT declare their own persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'session'],
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
      },
      {
        type: 'text',
        content: `Auth was where everything got hardest. The surfaces shared an origin so localStorage looked like the right place to keep tokens accessible. It worked until token refresh. When a session expired, multiple surfaces would independently detect the expiry at the same moment, each read the same stale token from localStorage, and each fired its own refresh request.`,
      },
      {
        type: 'diagram',
        id: 'mf-token-race',
      },
      {
        type: 'code',
        label: 'shell/auth.ts · coordinator',
        lang: 'typescript',
        content: `// shell owns the refresh cycle: one in-flight request, not N
let refreshInFlight = false;

store.subscribe(() => {
  const { token, expiresAt } = store.getState().auth;
  if (isExpired(token, expiresAt) && !refreshInFlight) {
    refreshInFlight = true;
    refreshToken()
      .then((next: AuthPayload) => store.dispatch(setAuth(next)))
      .catch(() => store.dispatch(clearAuth()))
      .finally(() => { refreshInFlight = false; });
  }
});
// remotes subscribe to store.auth, never read localStorage directly`,
      },
      {
        type: 'text',
        content: `Simple in principle. The shell is the single owner of the auth lifecycle. Remotes observe state, they do not drive it. Getting every surface to stop reading localStorage directly took enforcement: the shared store's auth slice was the only sanctioned source, and any surface that bypassed it broke in staging before production.

For a couple of months, the full setup worked. Teams shipped independently. The coordination overhead lived at the integration seam rather than spreading across every PR. A deploy on one surface did not require a conversation with another team. The product scaled the way the architecture was meant to let it scale.

Then the context changed, and it changed hard. A company restructure collapsed the product teams into one. Surfaces that had genuinely needed independent release cycles were now owned by the same people, committing to the same sprint, deploying to the same schedule. The original justification did not weaken gradually; it disappeared overnight.

What remained were the costs. Module Federation cold builds that ran three times slower than a comparable Vite build. Bundle sizes bloated by the federation runtime overhead every surface had to carry. A singleton shared config that was load-bearing and opaque: every onboarding involved a two-hour session just to explain why react had to appear in shared and what breaks if it does not. A composition layer that failed silently in ways that were hard to reproduce because the failure depended on which remote version had loaded first.

The final push was a production incident. A version mismatch between the shell and a remote that had deployed independently, exactly the scenario the architecture was designed to make safe. It was safe in the sense that the affected surface failed in isolation. It was not safe in the sense that it took four hours to diagnose. The error surfaced in the shell with no pointer to the remote that caused it. Webpack shared module errors are some of the most opaque messages in the frontend ecosystem. Reading them requires knowing the internals cold.

We migrated back to a traditional monolith frontend. The migration took three weeks and immediately delivered a 60% reduction in CI build time, a meaningful drop in bundle size, and an onboarding story that fit in an afternoon. It was the right call. Making it required admitting that the previous architecture had done its job and was now past its useful life. That is its own kind of lesson: knowing when to retire something is as important as knowing when to build it.`,
      },
    ],
    highlights: [
      'Singleton shared config is load-bearing: miss react-redux and you get two store instances; miss the design tokens and surfaces render different colours',
      'Version mismatches fail at runtime in the browser, not at build time. A staging environment that composes all remotes is not optional',
      'Shell-owned Redux store with redux-persist: remotes read, never write outside their own slice, never touch localStorage directly',
      'Auth refresh coordinator in the shell: one in-flight request, all surfaces subscribing to store state rather than racing on token expiry',
      'The architecture was right for the team size and release cadence it was built for. When that context changed, the architecture had to change with it',
    ],
    highlightsTitle: 'What it taught',
    references: [
      {
        label: 'Webpack Module Federation docs',
        url: 'https://webpack.js.org/concepts/module-federation/',
        note: 'The official spec. Read the shared config section twice.',
      },
      {
        label: 'Martin Fowler: Micro Frontends',
        url: 'https://martinfowler.com/articles/micro-frontends.html',
        note: 'The canonical write-up. Covers the tradeoffs more honestly than most vendor content.',
      },
      {
        label: 'Zack Jackson: Practical Module Federation',
        url: 'https://module-federation.io/',
        note: "Written by the person who built it. Good on the singleton pattern and why it exists.",
      },
      {
        label: 'redux-persist',
        url: 'https://github.com/rt2zz/redux-persist',
        note: 'What we used to keep the shared Redux store alive across page loads.',
      },
    ],
  },
  {
    slug: 'prisma-data-layer',
    name: 'Prisma data layer: schema-first across microservices',
    kind: 'systems',
    year: '2023',
    role: 'Backend Engineer',
    stack: ['prisma', 'postgresql', 'typescript', 'nest.js', 'docker'],
    blurb:
      'Using Prisma as a schema-first contract across multiple services: the migrations, the tradeoffs, and what breaks when you scale it past the happy path.',
    body: '',
    sections: [
      {
        type: 'text',
        content: `The problem looks simple from far away: multiple backend services, one PostgreSQL database, no shared types. The naive solution is to give each service its own database credentials and let them write their own queries. That works until a table changes. Then you have four services with different assumptions about what columns exist and whether they can be null, and the only way to find out which ones are wrong is to run them.

Prisma makes schema-first development feel natural for a single service. The interesting work starts when you need to extend that to multiple services, and it forces a decision the framework does not make for you.`,
      },
      {
        type: 'text',
        content: `The solution was a shared package (schema, generated client, migration history) consumed by each service as a versioned dependency inside the monorepo. One schema definition, one set of generated types, one migration history. Every service queried the database with the same type-safe client against the same schema without duplicating a line of it.`,
      },
      {
        type: 'code',
        label: 'schema.prisma',
        content: `model User {
  id        String   @id @default(cuid())
  email     String   @unique
  orders    Order[]
  createdAt DateTime @default(now())

  @@map("users")
}

model Order {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  status    String?
  total     Int
  createdAt DateTime @default(now())

  @@map("orders")
}`,
      },
      {
        type: 'code',
        label: 'services/orders/src/db.ts',
        lang: 'typescript',
        content: `import { PrismaClient } from '@company/db';

// each service instantiates its own client, not shared at runtime
export const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  log: ['warn', 'error'],
});

// types re-exported from the shared package, no local schema needed
export type { Order, User } from '@company/db';`,
      },
      {
        type: 'diagram',
        id: 'prisma-topology',
      },
      {
        type: 'text',
        content: `The schema as a shared contract changes what running a migration means. In a single-service setup you deploy the migration and the service together. In a multi-service setup the migration has to be safe for every currently-deployed version of every service that touches those tables.

If Service A is on v1.3 of the shared package and you push a migration that drops a column Service A still queries, Service A breaks immediately. The deploy order matters. The migration cannot be run until you know every service that reads the affected table is already on a version that does not need the old shape.

The rule: every migration had to be backward-compatible for at least one full release cycle. Add the column nullable first. Backfill the data. Deploy the services that use it. Then tighten the constraint in a follow-up migration. Never remove a column while any deployed service still references it. Prisma does not enforce any of this. You write the protocol and you hold the team to it.`,
      },
      {
        type: 'code',
        label: 'migrations/0042_add_order_status.sql',
        lang: 'sql',
        content: `-- Step 1: add nullable, backward-compatible, old services unaffected
ALTER TABLE "orders" ADD COLUMN "status" TEXT;

-- Step 2: backfill before any constraint is added
UPDATE "orders" SET "status" = 'active' WHERE "status" IS NULL;

-- Step 3: separate migration, deployed only after all services are on v1.4+
-- ALTER TABLE "orders" ALTER COLUMN "status" SET NOT NULL;
-- ^^^^^ this is 0043, run after service cutover, not before`,
      },
      {
        type: 'error',
        label: 'psql · migration 0043 applied out of order',
        content: `ERROR:  column "status" of relation "orders" contains null values

  Migration 0043_enforce_order_status.sql failed to apply.

  ALTER TABLE "orders" ALTER COLUMN "status" SET NOT NULL;

  Rows exist where status IS NULL. The NOT NULL constraint cannot
  be enforced until those rows are backfilled. Run migration 0042
  and the UPDATE first.

  Note: on a large table this statement also takes an ACCESS EXCLUSIVE
  lock for the duration, blocking all reads and writes until it completes.`,
      },
      {
        type: 'text',
        content: `The subtler problem was connection pools. Prisma maintains a connection pool per PrismaClient instance. With three services, each running two replicas, each holding a pool of ten connections, you are at sixty open connections before any real traffic arrives. On a Postgres instance with max_connections of 100 that leaves forty for migrations, admin queries, backups, and anything else touching the database. Under any real load that headroom is gone.

PgBouncer ran in front of Postgres in transaction pooling mode. Services connected to PgBouncer on port 6432 instead of Postgres directly. PgBouncer multiplexed the sixty application connections down to a manageable number of actual Postgres connections, returning each connection to the pool the moment a transaction committed.

The failure mode without this is not a clear error. Postgres starts rejecting new connections, Prisma's pool blocks waiting for one to free up, requests time out, and the first instinct is to call it database unavailability.`,
      },
      {
        type: 'error',
        label: 'service-orders · production logs',
        content: `PrismaClientKnownRequestError: P2024
  Timed out fetching a new connection from the connection pool.

  Timeout: 10000ms
  Active connections: 10/10

  at Object.request (node_modules/@prisma/client/runtime/library.js)

  Caused by:
    db error: FATAL: sorry, too many clients already

  -- not a database crash, max_connections is exhausted
  -- 3 services × 2 replicas × pool of 10 = 60 connections
  -- fix: PgBouncer in transaction pooling mode`,
      },
      {
        type: 'text',
        content: `Prisma's actual value is that the generated types are correct. When you write a query the shape of what comes back is known at compile time, verified against the schema, consistent across every service that imports the package. In a codebase that might otherwise reach for raw SQL in some services and a different ORM in others, having one canonical query layer with accurate types was worth the migration discipline and the PgBouncer configuration.

What Prisma does not give you is any of the distributed systems thinking. The schema is shared. The connection pools are not. Migration safety is not. The deploy order is not. Those are your problems. Prisma makes the query layer honest while you solve them.`,
      },
    ],
    highlights: [
      'Shared schema package as versioned dependency: one migration history, one generated type set, type-safe queries across all services',
      'Migrations must be backward-compatible for a full release cycle; Prisma does not enforce this, the team does',
      'PgBouncer in transaction pooling mode: without it, connection pool pressure looks like database unavailability',
      'The failure modes are all distributed systems problems that Prisma makes easy to ignore until you cannot',
    ],
    highlightsTitle: 'What it taught',
    references: [
      {
        label: 'Prisma connection pooling docs',
        url: 'https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool',
        note: 'Covers connection_limit, pool_timeout, and when to use an external pooler.',
      },
      {
        label: 'PgBouncer documentation',
        url: 'https://www.pgbouncer.org/config.html',
        note: 'Transaction vs session pooling modes. Transaction mode is what you want with Prisma.',
      },
      {
        label: 'Expand and contract pattern · Martin Fowler',
        url: 'https://martinfowler.com/bliki/ParallelChange.html',
        note: 'The formal name for the staged migration protocol: expand (add nullable), migrate, contract (enforce constraint).',
      },
      {
        label: 'Prisma migrate in production',
        url: 'https://www.prisma.io/docs/orm/prisma-migrate/workflows/production-and-testing',
        note: 'Why prisma migrate deploy behaves differently from migrate dev and what that means for CI.',
      },
    ],
  },
];

// Always newest first, sort at definition so every consumer gets the right order
PROJECTS.sort((a, b) => Number(b.year) - Number(a.year));

export const getProject = (slug: string): ProjectEntry | undefined =>
  PROJECTS.find((p) => p.slug === slug);
