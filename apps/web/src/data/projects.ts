export interface ProjectEntry {
  slug: string;
  name: string;
  kind: string;
  year: string;
  role: string;
  stack: string[];
  blurb: string;
  body: string;
}

export const PROJECTS: ProjectEntry[] = [
  {
    slug: 'visualization-sim',
    name: 'Vehicle visualization & simulation suite',
    kind: 'visualization',
    year: '2025',
    role: 'Senior Software Engineer · Rivian',
    stack: ['typescript', 'react', 'three.js', 'webgl', 'streaming data'],
    blurb:
      'Browser-based tooling for vehicle engineering — 3D scenes, telemetry overlays, and simulation playback that stay smooth as the data firehose grows.',
    body: 'The work sits between the vehicle data layer and the engineers who need to reason about it. The interesting problems are throughput and discipline: how to keep a frame budget honest when the inputs are a moving target, how to model the data so views don’t need to know about the wire format, and how to make an interaction model that feels like an engineering tool rather than a dashboard. Strict types up the stack, render layers that fail closed, and a pragmatic relationship with WebGL.',
  },
  {
    slug: 'monorepo-platform',
    name: 'Monorepo platform',
    kind: 'architecture',
    year: '2024',
    role: 'Lead JS Developer · 167Pluto',
    stack: ['typescript', 'turborepo', 'github actions'],
    blurb:
      'Unified four product frontends into a single TurboRepo. Shared packages, parallel typed builds, CI that only runs what changed — duplicate components quietly disappeared.',
    body: 'The product had grown into four separate frontends with three near-identical design systems. Migrating into a single monorepo gave us shared packages, parallel typed builds, and CI that only runs what changed. Build time dropped meaningfully, and the duplicate components quietly disappeared as teams adopted the shared ones. The hard part wasn’t the tooling — it was making the shared layer just opinionated enough that teams reached for it without being told to.',
  },
  {
    slug: 'event-driven-backend',
    name: 'Event-driven backend',
    kind: 'systems',
    year: '2024',
    role: '167Pluto',
    stack: ['nest.js', 'kafka', 'redis', 'typescript', 'openapi'],
    blurb:
      'API-first backend with OpenAPI as the contract, Orval-generated typed clients, and Kafka carrying events between services. Integration meetings stopped being a thing.',
    body: 'API-first with OpenAPI as the contract, Orval generating typed clients, and Kafka carrying the events between services. The win was less in the throughput numbers and more in the integration work — the bottleneck of "frontend waits for backend, backend waits for frontend" disappears when both consume the same generated types. Discriminated unions on every event payload meant the compiler refused to build if a producer and consumer disagreed.',
  },
  {
    slug: 'ci-cd-pipelines',
    name: 'CI/CD pipelines',
    kind: 'devex',
    year: '2023',
    role: '167Pluto',
    stack: ['github actions', 'turborepo', 'aws'],
    blurb:
      'Release pipelines moved from "set aside an afternoon" to "merge and forget." Cached, parallelized, with type-checked artifacts and zero manual deployment steps.',
    body: 'I rewrote the release pipeline as a small, well-typed graph: detect what changed, run only the relevant tests and builds in parallel, ship typed artifacts, deploy. The whole loop went from hours to minutes. The unlock was treating CI as code that deserves the same care as the application — same review, same tests, same versioning.',
  },
  {
    slug: 'sql-interpreter',
    name: 'SQL interpreter for Petrol China',
    kind: 'frontend',
    year: '2023',
    role: 'JS Developer · Q Agency',
    stack: ['react', 'typescript', 'azure'],
    blurb:
      'Frontend for a query-and-explore tool used by analysts. React + TypeScript on Azure, with an editor experience tuned for long sessions.',
    body: 'A query interface used daily by analysts — long sessions, lots of state, copy-paste patterns that benefit from sharp interactions. We focused on the things that compound over a workday: keyboard ergonomics, predictable selection behavior, and a result panel that respected the user’s context across reruns. Cloud deployment on Azure with the rest of the team’s service surface.',
  },
  {
    slug: 'igaming-microfrontends',
    name: 'iGaming micro-frontends',
    kind: 'frontend',
    year: '2022',
    role: 'Frontend Developer · Neotech',
    stack: ['react', 'typescript', 'design tokens'],
    blurb:
      'React-based micro-frontends for tournament surfaces, with shared Node packages unifying UI and theming across product lines.',
    body: 'Each surface owned its own bundle but shared a common shell. Pulling theming and core UI primitives into versioned packages gave us a consistent visual language without forcing teams to coordinate every change. The interesting design problem was making the system flexible enough to absorb edge cases without becoming a buffet of escape hatches.',
  },
];

export const getProject = (slug: string): ProjectEntry | undefined =>
  PROJECTS.find((p) => p.slug === slug);
