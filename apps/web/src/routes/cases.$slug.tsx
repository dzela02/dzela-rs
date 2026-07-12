import hljs from 'highlight.js';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';

import { CaseDiagram } from '~/components/case-diagrams';
import { Icon } from '~/components/icon';
import { Tag } from '~/components/primitives';
import type { CaseBlock } from '~/data/projects';
import { getProject } from '~/data/projects';

export const Route = createFileRoute('/cases/$slug')({
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
      <Link to="/cases" className="block-cta">
        ← Back to cases
      </Link>
    </div>
  ),
});

function highlight(code: string, lang?: string): string {
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(code, { language: lang }).value;
  }
  return hljs.highlightAuto(code).value;
}

function TitleBar({ label, error = false }: { label?: string; error?: boolean }) {
  return (
    <div className={`code-titlebar${error ? ' code-titlebar--error' : ''}`}>
      <div className="code-dots">
        <span className="code-dot code-dot--red" />
        <span className="code-dot code-dot--yellow" />
        <span className="code-dot code-dot--green" />
      </div>
      {label && <span className="code-filename">{label}</span>}
    </div>
  );
}

function CodeBlock({ block }: { block: Extract<CaseBlock, { type: 'code' }> }) {
  const html = highlight(block.content, block.lang);
  return (
    <div className="detail-image">
      <TitleBar label={block.label} />
      <pre
        className="code-preview hljs"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function ErrorBlock({ block }: { block: Extract<CaseBlock, { type: 'error' }> }) {
  return (
    <div className="detail-image detail-image--error">
      <TitleBar label={block.label} error />
      <pre className="code-preview">{block.content}</pre>
    </div>
  );
}

function TextBlock({ block }: { block: Extract<CaseBlock, { type: 'text' }> }) {
  const paras = (block.content ?? '').split('\n\n').filter(Boolean);
  return (
    <>
      {paras.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  const body = project.sections ? (
    <div className="prose">
      {project.sections.map((block, i) => {
        if (block.type === 'code') return <CodeBlock key={i} block={block} />;
        if (block.type === 'error') return <ErrorBlock key={i} block={block} />;
        if (block.type === 'diagram') return <CaseDiagram key={i} id={block.id} />;
        return <TextBlock key={i} block={block} />;
      })}
    </div>
  ) : (
    <div className="prose">
      {project.body
        .split('\n\n')
        .filter(Boolean)
        .map((para, i) => {
          const insertAfter = project.codePosition ?? -1;
          return (
            <>
              <p key={i}>{para}</p>
              {project.codeBlock && i === insertAfter && (
                <div key={`code-${i}`} className="detail-image" aria-hidden="true">
                  <pre className="code-preview">{project.codeBlock}</pre>
                </div>
              )}
            </>
          );
        })}
    </div>
  );

  return (
    <article className="block">
      <Link to="/cases" className="back-link">
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

      {body}

      {project.highlights && project.highlights.length > 0 && (
        <div className="detail-highlights">
          <h2 className="ds-h2">{project.highlightsTitle ?? 'What it took'}</h2>
          <ul className="list">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {project.references && project.references.length > 0 && (
        <div className="detail-references">
          <h2 className="ds-h2">References</h2>
          <ul className="references-list">
            {project.references.map((ref, i) => (
              <li key={i} className="reference-item">
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="reference-link">
                  {ref.label} <Icon name="arrowUR" size={11} />
                </a>
                {ref.note && <span className="reference-note">{ref.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="detail-cta">
        <a className="ext-link" href="https://dzela.rs" target="_blank" rel="noopener noreferrer">
          dzela.rs <Icon name="arrowUR" size={12} />
        </a>
        <a className="ext-link" href="mailto:contact@dzela.rs">
          contact@dzela.rs <Icon name="arrowUR" size={12} />
        </a>
      </div>
    </article>
  );
}
