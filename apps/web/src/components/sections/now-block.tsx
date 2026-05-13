import { Tag } from '../primitives';

const NOW_TAGS = ['typescript', 'react', 'three.js', 'webgl', 'streaming data', 'simulation'];

export function NowBlock() {
  return (
    <section className="block" data-animate>
      <header className="block-head">
        <h2 className="ds-h2">Now</h2>
        <span className="block-cta" style={{ cursor: 'default' }}>
          since 2025
        </span>
      </header>
      <div className="now-card">
        <div className="now-meta">
          <span className="now-pill">current</span>
          <span className="meta">rivian · remote</span>
        </div>
        <h3 className="now-title">
          Senior Software Engineer,{' '}
          <span className="display-accent">Visualization &amp; Simulation apps</span>
        </h3>
        <p className="now-body">
          Building browser-based tooling for vehicle engineering — interactive 3D scenes, telemetry
          overlays, and simulation playback. The fun is in the seam between vehicle data and the
          engineers who reason about it: tight types up the stack, render layers that fail closed,
          and a frame budget that earns its keep.
        </p>
        <div className="tag-row">
          {NOW_TAGS.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </section>
  );
}
