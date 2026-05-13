import { Outlet, createRootRoute } from '@tanstack/react-router';

import { Footer } from '~/components/footer';
import { Nav } from '~/components/nav';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="bg-blobs" aria-hidden="true">
        <div className="bg-blob bg-blob--1" />
        <div className="bg-blob bg-blob--2" />
      </div>
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
