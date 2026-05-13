import { Outlet, createRootRoute } from '@tanstack/react-router';

import { Footer } from '~/components/footer';
import { Nav } from '~/components/nav';
import { PointCloud } from '~/components/point-cloud';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <PointCloud />
      <div className="app">
        <Nav />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
