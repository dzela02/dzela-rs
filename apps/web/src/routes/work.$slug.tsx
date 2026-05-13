import { Link, createFileRoute, notFound } from '@tanstack/react-router';

import { Icon } from '~/components/icon';
import { Tag } from '~/components/primitives';
import { getProject } from '~/data/projects';

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetailPage,
  notFoundComponent: () => (
    <div className="block">
      <h2 className="ds-h2">Project not found</h2>
      <Link to="/work" className="block-cta">
        ← Back to work
      </Link>
    </div>
  ),
});

const SAMPLE_CODE = `// strict, exhaustive, boring — exactly the way we like it
type Frame =
  | { kind: 'idle' }
  | { kind: 'streaming'; t: number; samples: ReadonlyArray<Sample> }
  | { kind: 'paused'; at: number };

const tick = (f: Frame): Frame => {
  switch (f.kind) {
    case 'idle':      return { kind: 'streaming', t: 0, samples: [] };
    case 'streaming': return { ...f, t: f.t + 1 };
    case 'paused':    return f;
    default: {
      const _exhaustive: never = f;
      return _exhaustive;
    }
  }
};`;

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  return (
    <article className="block">
      <Link to="/work" className="back-link">
        <Icon name="chevL" size={13} /> Back
      </Link>
      <header className="detail-head">
        <p className="meta">
          {project.kind} · {project.year}
          {project.role ? ` · ${project.role}` : ''}
        </p>
        <h1 className="display">{project.name}</h1>
        <p className="lede">{project.blurb}</p>
        <div className="tag-row">
          {project.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>
      <div className="detail-image" aria-hidden="true">
        <pre className="code-preview">{SAMPLE_CODE}</pre>
      </div>
      <div className="prose">
        <p>{project.body}</p>
        <h2 className="ds-h2">What it took</h2>
        <ul className="list">
          <li>Strict TypeScript end-to-end — branded types for domain values, exhaustive switches.</li>
          <li>API-first contracts where they applied — OpenAPI and Orval-generated clients across services.</li>
          <li>CI/CD on GitHub Actions — release time from hours to minutes, not the other way around.</li>
          <li>
            No <span className="ds-code">any</span>. No <span className="ds-code">@ts-ignore</span>. The
            compiler is the test that runs on every keystroke.
          </li>
        </ul>
      </div>
      <div className="detail-cta">
        <a className="ext-link" href="https://dzela.rs" target="_blank" rel="noopener noreferrer">
          dzela.rs <Icon name="arrowUR" size={12} />
        </a>
        <a className="ext-link" href="mailto:dzelanovi@gmail.com">
          dzelanovi@gmail.com <Icon name="arrowUR" size={12} />
        </a>
      </div>
    </article>
  );
}
