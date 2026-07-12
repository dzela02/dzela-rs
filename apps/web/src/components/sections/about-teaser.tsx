import { Link } from '@tanstack/react-router';

export function AboutTeaser() {
  return (
    <section className="block" data-animate>
      <header className="block-head">
        <h2 className="ds-h2">The person</h2>
        <Link to="/about" className="block-cta">
          Full story →
        </Link>
      </header>
      <div className="teaser-grid">
        <div className="teaser-cell">
          <span className="teaser-num">08</span>
          <p className="teaser-body">
            Years engineering systems. Started with web apps, ended up building distributed
            infrastructure and vehicle simulation tooling. Still enjoying the ride.
          </p>
        </div>
        <div className="teaser-cell">
          <span className="teaser-num">350+</span>
          <p className="teaser-body">
            Educational sessions delivered as a Red Cross volunteer on human trafficking prevention,
            schools and communities across Serbia. 8 years running.
          </p>
        </div>
        <div className="teaser-cell">
          <span className="teaser-num">BEG</span>
          <p className="teaser-body">
            Based in Belgrade. Remote-first, timezone-flexible. Open to interesting problems and the
            people who have them.
          </p>
        </div>
        <div className="teaser-cell">
          <span className="teaser-num">∞</span>
          <p className="teaser-body">
            Belief that the hardest problems aren&apos;t always in the code, and that getting
            humans to care about something is tougher than any architecture.
          </p>
        </div>
      </div>
    </section>
  );
}
