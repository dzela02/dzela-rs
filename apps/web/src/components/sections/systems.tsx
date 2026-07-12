interface SystemItem {
  num: string;
  title: string;
  body: string;
}

const SYSTEMS: SystemItem[] = [
  {
    num: '01',
    title: 'Distributed systems that hold',
    body: 'High-throughput microservices built for enterprise loads. gRPC and REST contracts with strong guarantees. Concurrent, resilient, observable. Go, Python, and Rust for the parts that need to be fast.',
  },
  {
    num: '02',
    title: 'Kubernetes & worker orchestration',
    body: 'Container scheduling, EKS operations, and pipeline reliability. Worker orchestration designed for high availability: not just deployed, but recoverable.',
  },
  {
    num: '03',
    title: 'Data layers that perform',
    body: 'Relational and NoSQL across PostgreSQL and MongoDB. Schema design that prioritises integrity first, query performance second. No accidental N+1s in production.',
  },
  {
    num: '04',
    title: 'Backend meets front-end',
    body: "When the problem crosses the stack, I cross with it. Clean state-driven interfaces in React when cross-functional delivery requires it, not as identity but as capability.",
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
