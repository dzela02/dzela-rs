import { Link } from '@tanstack/react-router';

import { Icon } from '../icon';
import { Tag } from '../primitives';

import type { ProjectEntry } from '~/data/projects';

interface CTA {
  label: string;
  to: string;
}

interface ProjectListProps {
  items: ProjectEntry[];
  title?: string;
  description?: string;
  limit?: number;
  cta?: CTA;
}

export function ProjectList({ items, title = 'Interesting cases', description, limit, cta }: ProjectListProps) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <section className="block">
      <header className="block-head">
        <h2 className="ds-h2">{title}</h2>
        {cta ? (
          <Link to={cta.to} className="block-cta">
            {cta.label} →
          </Link>
        ) : null}
      </header>
      {description && <p className="block-description">{description}</p>}
      <div className="project-list" data-animate-stagger>
        {list.map((p) => (
          <Link
            key={p.slug}
            to="/cases/$slug"
            params={{ slug: p.slug }}
            className="card card-hover"
          >
            <div className="project-row">
              <div className="project-main">
                <div className="project-title">
                  <h3 className="ds-h3">{p.name}</h3>
                  <span className="meta">
                    {p.kind} · {p.year}
                  </span>
                </div>
                <p className="project-blurb">{p.blurb}</p>
                <div className="tag-row">
                  {p.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
              <div className="project-arrow">
                <Icon name="arrow" size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
