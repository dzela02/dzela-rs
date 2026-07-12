import { Link } from '@tanstack/react-router';

import { Icon } from '../icon';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-status">
        <span className="status-dot" /> based in belgrade · senior swe at rivian · open to
        interesting problems
      </div>
      <div className="hero-row">
        <div className="hero-text">
          <h1 className="display">
            Marko Dželatović. <span className="display-accent">Senior Software Engineer</span>{' '}
            building distributed systems and cloud-native infrastructure, currently at Rivian.
          </h1>
        </div>
        <div className="avatar" aria-hidden="true">
          <img src="/avatar.png" alt="" />
        </div>
      </div>
      <p className="lede">
        Backend-first, language-agnostic. I design distributed systems, scalable microservices, and
        cloud-native infrastructure, and wire in the front-end when the problem calls for it. Go
        Python, and Rust for the heavy lifting, React when it crosses the stack.
      </p>
      <div className="hero-actions">
        <Link to="/cases" className="btn btn-primary btn-md">
          Case studies <Icon name="arrow" size={14} />
        </Link>
        <Link to="/about" className="btn btn-ghost btn-md">
          About
        </Link>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <strong>8+ yrs</strong>
          <span>engineering systems</span>
        </div>
        <div className="stat">
          <strong>go · py · rs · ts</strong>
          <span>core languages</span>
        </div>
        <div className="stat">
          <strong>350+</strong>
          <span>red cross sessions</span>
        </div>
      </div>
    </section>
  );
}
