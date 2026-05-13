/**
 * Seed script — run with: pnpm strapi ts:generate-types && node -r ts-node/register src/seeds/seed.ts
 * Or via: pnpm seed (see package.json scripts)
 *
 * Populates Projects, Experience Entries, and Posts from the static data
 * that previously lived in apps/web/src/data/*.ts.
 *
 * Safe to re-run: checks if entries already exist before inserting.
 */

import { createStrapi } from '@strapi/strapi';

const PROJECTS = [
  {
    name: 'Vehicle visualization & simulation suite',
    slug: 'visualization-sim',
    kind: 'visualization',
    year: '2025',
    role: 'Senior Software Engineer · Rivian',
    stack: ['typescript', 'react', 'three.js', 'webgl', 'streaming data'],
    blurb:
      'Browser-based tooling for vehicle engineering — 3D scenes, telemetry overlays, and simulation playback that stay smooth as the data firehose grows.',
    body: 'The work sits between the vehicle data layer and the engineers who need to reason about it. The interesting problems are throughput and discipline: how to keep a frame budget honest when the inputs are a moving target, how to model the data so views don\'t need to know about the wire format, and how to make an interaction model that feels like an engineering tool rather than a dashboard. Strict types up the stack, render layers that fail closed, and a pragmatic relationship with WebGL.',
  },
  {
    name: 'Monorepo platform',
    slug: 'monorepo-platform',
    kind: 'architecture',
    year: '2024',
    role: 'Lead JS Developer · 167Pluto',
    stack: ['typescript', 'turborepo', 'github actions'],
    blurb:
      'Unified four product frontends into a single TurboRepo. Shared packages, parallel typed builds, CI that only runs what changed — duplicate components quietly disappeared.',
    body: 'The product had grown into four separate frontends with three near-identical design systems. Migrating into a single monorepo gave us shared packages, parallel typed builds, and CI that only runs what changed. Build time dropped meaningfully, and the duplicate components quietly disappeared as teams adopted the shared ones. The hard part wasn\'t the tooling — it was making the shared layer just opinionated enough that teams reached for it without being told to.',
  },
  {
    name: 'Event-driven backend',
    slug: 'event-driven-backend',
    kind: 'systems',
    year: '2024',
    role: '167Pluto',
    stack: ['nest.js', 'kafka', 'redis', 'typescript', 'openapi'],
    blurb:
      'API-first backend with OpenAPI as the contract, Orval-generated typed clients, and Kafka carrying events between services. Integration meetings stopped being a thing.',
    body: 'API-first with OpenAPI as the contract, Orval generating typed clients, and Kafka carrying the events between services. The win was less in the throughput numbers and more in the integration work — the bottleneck of "frontend waits for backend, backend waits for frontend" disappears when both consume the same generated types. Discriminated unions on every event payload meant the compiler refused to build if a producer and consumer disagreed.',
  },
  {
    name: 'CI/CD pipelines',
    slug: 'ci-cd-pipelines',
    kind: 'devex',
    year: '2023',
    role: '167Pluto',
    stack: ['github actions', 'turborepo', 'aws'],
    blurb:
      'Release pipelines moved from "set aside an afternoon" to "merge and forget." Cached, parallelized, with type-checked artifacts and zero manual deployment steps.',
    body: 'I rewrote the release pipeline as a small, well-typed graph: detect what changed, run only the relevant tests and builds in parallel, ship typed artifacts, deploy. The whole loop went from hours to minutes. The unlock was treating CI as code that deserves the same care as the application — same review, same tests, same versioning.',
  },
  {
    name: 'SQL interpreter for Petrol China',
    slug: 'sql-interpreter',
    kind: 'frontend',
    year: '2023',
    role: 'JS Developer · Q Agency',
    stack: ['react', 'typescript', 'azure'],
    blurb:
      'Frontend for a query-and-explore tool used by analysts. React + TypeScript on Azure, with an editor experience tuned for long sessions.',
    body: 'A query interface used daily by analysts — long sessions, lots of state, copy-paste patterns that benefit from sharp interactions. We focused on the things that compound over a workday: keyboard ergonomics, predictable selection behavior, and a result panel that respected the user\'s context across reruns. Cloud deployment on Azure with the rest of the team\'s service surface.',
  },
  {
    name: 'iGaming micro-frontends',
    slug: 'igaming-microfrontends',
    kind: 'frontend',
    year: '2022',
    role: 'Frontend Developer · Neotech',
    stack: ['react', 'typescript', 'design tokens'],
    blurb:
      'React-based micro-frontends for tournament surfaces, with shared Node packages unifying UI and theming across product lines.',
    body: 'Each surface owned its own bundle but shared a common shell. Pulling theming and core UI primitives into versioned packages gave us a consistent visual language without forcing teams to coordinate every change. The interesting design problem was making the system flexible enough to absorb edge cases without becoming a buffet of escape hatches.',
  },
];

const EXPERIENCE = [
  {
    order: 0,
    years: '2025 — now',
    role: 'Senior Software Engineer',
    company: 'Rivian',
    team: 'Visualization & Simulation apps',
    location: 'Remote',
    bullets: [
      'Building visualization and simulation apps for vehicle engineering — interactive 3D and data-heavy tooling that runs in the browser.',
      'Owning the frontend architecture for high-throughput simulation views: typed state, streaming data, predictable rendering.',
      'Working alongside vehicle, controls, and platform teams to turn engineering data into tools engineers actually use.',
    ],
  },
  {
    order: 1,
    years: '2023 — 2025',
    role: 'Lead JavaScript Developer',
    company: '167Pluto',
    location: 'Belgrade, Serbia',
    bullets: [
      'Unified the codebase with TurboRepo, cutting build times and unlocking cross-team reuse.',
      'Shipped event-driven applications on React, TypeScript, Nest.js, Redis and Kafka.',
      'Introduced an API-first workflow with OpenAPI and Orval — type-safe end-to-end, integration meetings disappeared.',
      'Automated CI/CD on GitHub Actions; release time went from hours to minutes.',
      'Tuned AWS infrastructure and NGINX, improving load times and cutting infra cost.',
      'Championed Jest and Playwright; mentored teammates and standardized test automation.',
    ],
  },
  {
    order: 2,
    years: '2022 — 2023',
    role: 'JavaScript Developer',
    company: 'Q Agency',
    location: 'Belgrade, Serbia',
    bullets: [
      'Led delivery of an SQL Interpreter app for Petrol China — React frontend, Azure cloud deployment.',
      'Built reusable Node.js packages, cutting frontend dev time and reducing duplication.',
      'Coordinated team efforts and delegated tasks; kept the project on schedule with clear accountability.',
      'Collaborated with designers on an intuitive, visually cohesive interface that boosted usability.',
    ],
  },
  {
    order: 3,
    years: '2021 — 2022',
    role: 'Frontend Developer',
    company: 'Neotech Solutions',
    location: 'Belgrade, Serbia',
    bullets: [
      'Developed and maintained React micro-frontends for iGaming tournaments.',
      'Created shared Node packages to unify UI components and theming across surfaces.',
      'Optimized rendering and state management — smoother interactions, faster load times.',
    ],
  },
  {
    order: 4,
    years: '2021 — 2022',
    role: 'Freelance',
    company: 'UpWork',
    location: 'Remote',
    bullets: [
      'Delivered MVPs for startups in finance, HR, and medtech using React and Firebase.',
      'Translated startup requirements into tailored, scalable solutions, working closely with founders.',
    ],
  },
  {
    order: 5,
    years: '2020 — 2021',
    role: 'Web Developer',
    company: 'Liquidity Hunter FX',
    location: 'Düsseldorf, Germany',
    bullets: [
      'Managed the company website on Next.js — fast, SEO-friendly, user-friendly.',
      'Integrated Stripe payments; built a Forex PIP calculator with React and economic APIs.',
    ],
  },
  {
    order: 6,
    years: '2018 — 2020',
    role: 'Full-stack Developer',
    company: 'TRIBE Festival',
    location: 'Ćuprija, Serbia',
    bullets: [
      'Built and launched the festival website end-to-end on the MERN stack.',
      'Designed the ticketing flow in React; integrated PayPal for secure payments.',
    ],
  },
];

const POSTS = [
  {
    year: '2026',
    date: '2026-03-02',
    title: 'Frame budgets are a contract, not a vibe',
    slug: 'frame-budgets-are-a-contract',
    read: '9 min',
    tags: ['visualization', 'webgl'],
  },
  {
    year: '2025',
    date: '2025-12-14',
    title: 'Streaming telemetry into a typed UI without leaking the wire format',
    slug: 'streaming-telemetry-typed-ui',
    read: '11 min',
    tags: ['typescript', 'visualization'],
  },
  {
    year: '2025',
    date: '2025-09-20',
    title: 'Branded types for money — a primer',
    slug: 'branded-types-for-money',
    read: '8 min',
    tags: ['typescript'],
  },
  {
    year: '2025',
    date: '2025-06-19',
    title: 'OpenAPI + Orval = no more integration meetings',
    slug: 'openapi-orval-no-integration-meetings',
    read: '10 min',
    tags: ['typescript', 'tooling'],
  },
  {
    year: '2025',
    date: '2025-04-06',
    title: 'Notes on a TurboRepo migration',
    slug: 'notes-on-a-turborepo-migration',
    read: '12 min',
    tags: ['monorepo', 'devex'],
  },
  {
    year: '2024',
    date: '2024-11-22',
    title: 'When discriminated unions replace microservices',
    slug: 'discriminated-unions-replace-microservices',
    read: '14 min',
    tags: ['architecture'],
  },
  {
    year: '2024',
    date: '2024-10-04',
    title: 'CI/CD as code — treating pipelines like the rest of the app',
    slug: 'cicd-as-code',
    read: '9 min',
    tags: ['devex'],
  },
  {
    year: '2024',
    date: '2024-09-09',
    title: 'satisfies, as const, and the art of saying nothing extra',
    slug: 'satisfies-as-const',
    read: '6 min',
    tags: ['typescript'],
  },
  {
    year: '2024',
    date: '2024-05-30',
    title: 'Mentorship, but make it asynchronous',
    slug: 'mentorship-asynchronous',
    read: '5 min',
    tags: ['team'],
  },
];

async function seed() {
  const app = await createStrapi({ appDir: process.cwd(), distDir: './dist' }).load();

  console.log('🌱 Seeding Projects...');
  for (const project of PROJECTS) {
    const existing = await app.db.query('api::project.project').findOne({
      where: { slug: project.slug },
    });
    if (!existing) {
      await app.db.query('api::project.project').create({
        data: { ...project, publishedAt: new Date() },
      });
      console.log(`  ✓ Project: ${project.name}`);
    } else {
      console.log(`  – Project already exists: ${project.name}`);
    }
  }

  console.log('🌱 Seeding Experience Entries...');
  for (const entry of EXPERIENCE) {
    const existing = await app.db.query('api::experience-entry.experience-entry').findOne({
      where: { company: entry.company, years: entry.years },
    });
    if (!existing) {
      await app.db.query('api::experience-entry.experience-entry').create({
        data: entry,
      });
      console.log(`  ✓ Experience: ${entry.role} @ ${entry.company}`);
    } else {
      console.log(`  – Experience already exists: ${entry.role} @ ${entry.company}`);
    }
  }

  console.log('🌱 Seeding Posts...');
  for (const post of POSTS) {
    const existing = await app.db.query('api::post.post').findOne({
      where: { slug: post.slug },
    });
    if (!existing) {
      await app.db.query('api::post.post').create({
        data: { ...post, publishedAt: new Date() },
      });
      console.log(`  ✓ Post: ${post.title}`);
    } else {
      console.log(`  – Post already exists: ${post.title}`);
    }
  }

  console.log('\n✅ Seed complete.');
  await app.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
