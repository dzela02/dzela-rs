import { createFileRoute } from '@tanstack/react-router';

import { Tag } from '~/components/primitives';
import { useAnimate } from '~/hooks/use-animate';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

const STACK = [
  'go',
  'python',
  'rust',
  'typescript',
  'javascript',
  'kubernetes',
  'eks',
  'microservices',
  'grpc',
  'rest',
  'nest.js',
  'react',
  'node.js',
  'postgresql',
  'mongodb',
  'prisma',
  'redis',
  'openapi',
  'aws',
  'azure',
  'github actions',
  'docker',
];

function AboutPage() {
  useAnimate();

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <header className="detail-head">
        <p className="meta">about · belgrade, serbia</p>
        <div className="about-head">
          <div className="avatar avatar-lg" aria-hidden="true">
            <img src="/avatar.png" alt="" />
          </div>
          <h1 className="display" style={{ margin: 0 }}>
            Marko Dželatović.
          </h1>
        </div>
        <p className="lede">
          Senior software engineer with 8+ years specialising in distributed systems, scalable backend
          architectures, and cloud-native infrastructure. I build the systems that give other
          engineers room to move faster. Language-agnostic, backend-first, full-stack when the
          problem demands it. Based in Belgrade, currently at Rivian.
        </p>
      </header>

      <section className="block" data-animate>
        <header className="block-head">
          <h2 className="ds-h2">The work</h2>
        </header>
        <div className="prose">
          <p>
            Most of my best work has been quiet. A service migration nobody noticed because nothing
            broke. A CI pipeline that gave back an afternoon every release. An API contract tight
            enough that an entire class of integration bugs stopped being possible.
          </p>
          <p>
            I design and build high-throughput microservices, optimise complex data layers, and
            orchestrate containerised workloads at scale. Go, Python, and Rust for the systems that need
            to hold under load. React and TypeScript when the problem crosses into the front-end.
            Clean architecture, strong contracts, operational reliability: not as checkboxes, but
            as defaults.
          </p>
        </div>
      </section>

      <section className="block" data-animate>
        <header className="block-head">
          <h2 className="ds-h2">Beyond the keyboard</h2>
        </header>
        <div className="prose">
          <p>
            Since 2017 I&apos;ve volunteered with the Red Cross as a public presenter on human
            trafficking prevention, with 350+ educational sessions delivered to schools, communities,
            and institutions across Serbia. Complex topic, sometimes hostile audience, and the goal
            is to leave people knowing something they didn&apos;t before.
          </p>
          <p>
            Before engineering dominated my time, I served as General Secretary and Team Leader at
            the Youth Association of Ćuprija, organizing programs, coordinating volunteers, and
            learning that getting people to care about something is a harder problem than any
            codebase.
          </p>
        </div>
      </section>

      <section className="block" data-animate>
        <header className="block-head">
          <h2 className="ds-h2">Currently</h2>
          <span className="meta">2025</span>
        </header>
        <div className="prose">
          <p>
            Building robotic AI visualization tooling in the browser, scenes that make simulation
            state readable to humans in real time. Alongside that: automating engineering workflows
            with agentic tooling, developing agentic job pipelines, and supporting simulation
            workloads at scale.
          </p>
          <p>
            Infrastructure side: EKS maintenance and Kubernetes operations. Stack right now is a mix
            of Go, Python, Rust, and React, whatever the problem needs.
          </p>
        </div>
      </section>

      <section className="block" data-animate>
        <header className="block-head">
          <h2 className="ds-h2">Stack</h2>
        </header>
        <div className="tag-row">
          {STACK.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </section>

      <section className="block" data-animate>
        <header className="block-head">
          <h2 className="ds-h2">CV</h2>
        </header>
        <p className="lede" style={{ fontSize: '14px' }}>
          Available on request. Reach out via{' '}
          <a className="ext-link" href="https://www.linkedin.com/in/markodzela/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          {' '}or{' '}
          <a className="ext-link" href="mailto:contact@dzela.rs">
            email
          </a>
          {' '}and I will send it over.
        </p>
      </section>
    </article>
  );
}
