export interface ExperienceEntry {
  years: string;
  role: string;
  company: string;
  team?: string;
  location: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    years: '2025 - now',
    role: 'Senior Software Engineer',
    company: 'Rivian',
    team: 'Visualization & Simulation apps',
    location: 'Remote',
    bullets: [
      'Building visualization and simulation apps for vehicle engineering - interactive 3D and data-heavy tooling that runs in the browser.',
      'Owning the frontend architecture for high-throughput simulation views: typed state, streaming data, predictable rendering.',
      'Working alongside vehicle, controls, and platform teams to turn engineering data into tools engineers actually use.',
    ],
  },
  {
    years: '2023 - 2025',
    role: 'Lead JavaScript Developer',
    company: '167Pluto',
    location: 'Belgrade, Serbia',
    bullets: [
      'Unified the codebase with TurboRepo, cutting build times and unlocking cross-team reuse.',
      'Shipped event-driven applications on React, TypeScript, Nest.js, Redis and Kafka.',
      'Introduced an API-first workflow with OpenAPI and Orval - type-safe end-to-end, integration meetings disappeared.',
      'Automated CI/CD on GitHub Actions; release time went from hours to minutes.',
      'Tuned AWS infrastructure and NGINX, improving load times and cutting infra cost.',
      'Championed Jest and Playwright; mentored teammates and standardized test automation.',
    ],
  },
  {
    years: '2022 - 2023',
    role: 'JavaScript Developer',
    company: 'Q Agency',
    location: 'Belgrade, Serbia',
    bullets: [
      'Led delivery of an SQL Interpreter app for Petrol China - React frontend, Azure cloud deployment.',
      'Built reusable Node.js packages, cutting frontend dev time and reducing duplication.',
      'Coordinated team efforts and delegated tasks; kept the project on schedule with clear accountability.',
      'Collaborated with designers on an intuitive, visually cohesive interface that boosted usability.',
    ],
  },
  {
    years: '2021 - 2022',
    role: 'Frontend Developer',
    company: 'Neotech Solutions',
    location: 'Belgrade, Serbia',
    bullets: [
      'Developed and maintained React micro-frontends for iGaming tournaments.',
      'Created shared Node packages to unify UI components and theming across surfaces.',
      'Optimized rendering and state management - smoother interactions, faster load times.',
    ],
  },
  {
    years: '2021 - 2022',
    role: 'Freelance',
    company: 'UpWork',
    location: 'Remote',
    bullets: [
      'Delivered MVPs for startups in finance, HR, and medtech using React and Firebase.',
      'Translated startup requirements into tailored, scalable solutions, working closely with founders.',
    ],
  },
  {
    years: '2020 - 2021',
    role: 'Web Developer',
    company: 'Liquidity Hunter FX',
    location: 'Düsseldorf, Germany',
    bullets: [
      'Managed the company website on Next.js - fast, SEO-friendly, user-friendly.',
      'Integrated Stripe payments; built a Forex PIP calculator with React and economic APIs.',
    ],
  },
  {
    years: '2018 - 2020',
    role: 'Full-stack Developer',
    company: 'TRIBE Festival',
    location: 'Ćuprija, Serbia',
    bullets: [
      'Built and launched the festival website end-to-end on the MERN stack.',
      'Designed the ticketing flow in React; integrated PayPal for secure payments.',
    ],
  },
];
