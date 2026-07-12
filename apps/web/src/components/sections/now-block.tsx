export function NowBlock() {
  return (
    <section className="block" data-animate>
      <header className="block-head">
        <h2 className="ds-h2">Now</h2>
        <span className="meta" style={{ cursor: 'default' }}>rivian · belgrade · 2025</span>
      </header>
      <div className="now-card">
        <div className="now-meta">
          <span className="now-pill">current</span>
          <span className="meta">senior software engineer</span>
        </div>
        <h3 className="now-title">
          Visualization &amp; Simulation, <span className="display-accent">building simulation tooling and distributed systems at Rivian</span>
        </h3>
      </div>
    </section>
  );
}
