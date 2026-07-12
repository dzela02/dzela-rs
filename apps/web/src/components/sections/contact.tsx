import { Icon } from '../icon';

export function Contact() {
  return (
    <section className="block contact" data-animate>
      <h2 className="ds-h2">Still firefighting?</h2>
      <p className="lede" style={{ marginTop: 8 }}>
        Backend falling over, frontend collapsing under its own weight, infra that nobody fully
        understands anymore. I offer technical consultations for teams that want to get ahead of it.
      </p>
      <div className="hero-actions" style={{ marginTop: 20 }}>
        <a className="btn btn-primary btn-md" href="mailto:contact@dzela.rs">
          <Icon name="mail" size={14} /> contact@dzela.rs
        </a>
        <a
          className="btn btn-ghost btn-md"
          href="https://github.com/dzela02"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="github" size={14} /> dzela02
        </a>
      </div>
    </section>
  );
}
