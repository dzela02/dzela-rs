import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="notfound">
      <span className="notfound-code">404</span>
      <h1 className="notfound-title">Page not found.</h1>
      <p className="notfound-body">
        Whatever you were looking for isn&apos;t here. Might&apos;ve moved, might&apos;ve never
        existed.
      </p>
      <Link to="/" className="block-cta">
        ← Back home
      </Link>
    </div>
  );
}
