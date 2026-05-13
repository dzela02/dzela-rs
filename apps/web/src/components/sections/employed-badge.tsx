import { useState } from 'react';

export function EmployedBadge() {
  const [open, setOpen] = useState(false);

  return (
    <section className="block" data-animate>
      <button
        className="employed-badge"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="status-dot" />
        Currently employed at Rivian
        <span className="employed-chevron" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className={`employed-detail${open ? ' employed-detail--open' : ''}`} aria-hidden={!open}>
        <span className="meta">
          Senior Software Engineer · Visualization &amp; Simulation · Remote · 2025–present
        </span>
      </div>
    </section>
  );
}
