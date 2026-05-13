import { Icon } from '../icon';

export function Contact() {
  return (
    <section className="block contact" data-animate>
      <h2 className="ds-h2">Got a system that&apos;s outgrown itself?</h2>
      <p className="lede" style={{ marginTop: 8 }}>
        open to chats about visualization tooling, platform work, monorepo migrations, type-system
        rescues, and DX improvements that compound. always happy to compare notes.
      </p>
      <div className="hero-actions" style={{ marginTop: 20 }}>
        <a className="btn btn-primary btn-md" href="mailto:dzelanovi@gmail.com">
          <Icon name="mail" size={14} /> dzelanovi@gmail.com
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
