import { createFileRoute } from '@tanstack/react-router';

import { Icon } from '~/components/icon';
import { Tag } from '~/components/primitives';
import { useAnimate } from '~/hooks/use-animate';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

const STACK = [
  'typescript',
  'react',
  'next.js',
  'nest.js',
  'node.js',
  'three.js',
  'webgl',
  'turborepo',
  'redis',
  'kafka',
  'openapi',
  'orval',
  'aws',
  'azure',
  'firebase',
  'jest',
  'playwright',
  'github actions',
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
          Senior software engineer, 7+ years in the JavaScript ecosystem. I build platforms, not
          features — the kind of work that gives other engineers room to move faster. Visualization
          tooling, monorepo architectures, API-first systems, CI/CD that fades into the background.
          Based in Belgrade, currently at Rivian.
        </p>
      </header>

      <section className="block" data-animate>
        <header className="block-head">
          <h2 className="ds-h2">The work</h2>
        </header>
        <div className="prose">
          <p>
            Most of my best work has been quiet. A monorepo migration nobody noticed because nothing
            broke. A CI pipeline that gave back an afternoon every release. A type system tight
            enough that an entire class of bugs stopped being possible.
          </p>
          <p>
            I care about clean architecture, developer experience, and pushing the modern web stack
            forward without theatre. Frontend for visualization and simulation — interactive 3D,
            streaming data, frame-budget discipline. Lead TypeScript codebases, drive API-first
            migrations, automate CI/CD, mentor developers.
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
            trafficking prevention — 350+ educational sessions delivered to schools, communities,
            and institutions across Serbia. Complex topic, sometimes hostile audience, and the goal
            is to leave people knowing something they didn&apos;t before.
          </p>
          <p>
            Before engineering dominated my time, I served as General Secretary and Team Leader at
            the Youth Association of Ćuprija — organizing programs, coordinating volunteers, and
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
            Building robotic AI visualization tooling in the browser — Three.js scenes that make
            simulation state readable to humans in real time. Alongside that: automating agentic
            workflows with Claude Code, developing agentic job pipelines, and running AI simulation
            training clusters.
          </p>
          <p>
            Infrastructure side: EKS maintenance and Kubernetes operations. Stack right now is a mix
            of Go, Python, and React — whatever the problem needs.
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
        <a
          className="ext-link"
          href="/cv/marko-dzelatovic.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV (PDF) <Icon name="arrowUR" size={12} />
        </a>
      </section>
    </article>
  );
}
