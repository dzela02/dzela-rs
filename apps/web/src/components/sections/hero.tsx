import { Link } from '@tanstack/react-router';

import { Icon } from '../icon';

export function Hero() {
  return (
    <section className="hero" data-animate>
      <div className="hero-status">
        <span className="status-dot" /> based in belgrade · senior swe at rivian · open to
        interesting problems
      </div>
      <div className="hero-row">
        <div className="hero-text">
          <h1 className="display">
            Marko Dželatović. <span className="display-accent">Senior Software Engineer</span> on
            Rivian&apos;s visualization &amp; simulation team — building browser-native tools for
            vehicle engineering.
          </h1>
        </div>
        <div className="avatar" aria-hidden="true">
          <img src="/avatar.png" alt="" />
        </div>
      </div>
      <p className="lede">
        7+ years in the JavaScript ecosystem. i ship platforms, not features — visualization apps,
        monorepo unifications, OpenAPI-first backends, CI/CD that fades into the background. React,
        Next.js, Nest.js, TypeScript.
      </p>
      <div className="hero-actions">
        <Link to="/work" className="btn btn-primary btn-md">
          Selected work <Icon name="arrow" size={14} />
        </Link>
        <Link to="/about" className="btn btn-ghost btn-md">
          About
        </Link>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <strong>7+ yrs</strong>
          <span>in the js ecosystem</span>
        </div>
        <div className="stat">
          <strong>any-free</strong>
          <span>strict ts since 2020</span>
        </div>
        <div className="stat">
          <strong>350+</strong>
          <span>red cross sessions delivered</span>
        </div>
      </div>
    </section>
  );
}
