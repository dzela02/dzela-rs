import { Link } from '@tanstack/react-router';

import { ThemeToggle } from './theme-toggle';

const ITEMS: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
];

export function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <span className="brand-mark">M</span>
        <span>
          dzela<span className="brand-suffix">.rs</span>
        </span>
      </Link>
      <div className="nav-links">
        {ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
            activeOptions={{ exact: item.to === '/' }}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="nav-actions">
        <ThemeToggle />
      </div>
    </nav>
  );
}
