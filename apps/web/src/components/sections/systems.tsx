interface SystemItem {
  num: string;
  title: string;
  body: string;
}

const SYSTEMS: SystemItem[] = [
  {
    num: '01',
    title: 'Visualization that respects the frame',
    body: "Render layers that fail closed. Streaming data shaped at the edge, not the view. WebGL when it earns its keep, DOM when it doesn't.",
  },
  {
    num: '02',
    title: 'Monorepos that scale',
    body: 'Shared packages over duplication. Parallel typed builds. CI that only runs what changed. The system rewards reuse instead of asking nicely for it.',
  },
  {
    num: '03',
    title: 'API-first contracts',
    body: 'OpenAPI as the source of truth. Orval-generated clients. Frontend and backend speak the same generated types — integration meetings stop being a meeting.',
  },
  {
    num: '04',
    title: 'Type-driven design',
    body: 'Branded primitives for domain values. Discriminated unions on every state machine. Make impossible states unrepresentable, then let the compiler enforce it.',
  },
];

export function Systems() {
  return (
    <section className="block">
      <header className="block-head">
        <h2 className="ds-h2">Systems I care about</h2>
      </header>
      <div className="systems-grid" data-animate-stagger>
        {SYSTEMS.map((s) => (
          <div key={s.num} className="system-cell">
            <div className="system-num">{s.num}</div>
            <h3 className="ds-h3">{s.title}</h3>
            <p className="system-body">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
