import { Outlet, createRootRoute } from '@tanstack/react-router';

import { Footer } from '~/components/footer';
import { Nav } from '~/components/nav';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="app">
      <Nav />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
