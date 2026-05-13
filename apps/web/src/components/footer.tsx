import { Icon } from './icon';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <span className="meta">© 2026 — built with tanstack start</span>
        <div className="footer-links">
          <a
            className="footer-link"
            href="https://github.com/dzela02"
            target="_blank"
            rel="noopener noreferrer"
          >
            github <Icon name="arrowUR" size={11} />
          </a>
          <a
            className="footer-link"
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter <Icon name="arrowUR" size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
