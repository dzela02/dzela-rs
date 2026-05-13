interface BuildItem {
  label: string;
  desc: string;
}

const BUILDING: BuildItem[] = [
  {
    label: 'robotic AI viz',
    desc: 'real-time robot simulation scenes in the browser — three.js, streaming state, frame discipline',
  },
  {
    label: 'agentic workflows',
    desc: 'automating complex engineering pipelines with Claude Code and agentic job orchestration',
  },
  {
    label: 'training clusters',
    desc: 'AI simulation job scheduling and GPU cluster ops for simulation workloads',
  },
  {
    label: 'EKS / k8s',
    desc: 'Kubernetes infrastructure maintenance, scaling, and operational reliability',
  },
  {
    label: 'go · python · react',
    desc: 'whatever the problem needs — no loyalty to a single stack',
  },
];

export function NowBlock() {
  return (
    <section className="block" data-animate>
      <header className="block-head">
        <h2 className="ds-h2">Now</h2>
        <span className="meta" style={{ cursor: 'default' }}>rivian · remote · 2025</span>
      </header>
      <div className="now-card">
        <div className="now-meta">
          <span className="now-pill">current</span>
          <span className="meta">senior software engineer</span>
        </div>
        <h3 className="now-title">
          Visualization &amp; Simulation — <span className="display-accent">building browser-native tooling for vehicle engineering</span>
        </h3>
      </div>
      <div className="build-list">
        {BUILDING.map((item) => (
          <div key={item.label} className="build-row">
            <span className="build-label">{item.label}</span>
            <span className="build-desc">{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
