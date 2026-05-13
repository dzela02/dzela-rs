import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import { type ReactNode } from 'react';

import { Footer } from '~/components/footer';
import { Nav } from '~/components/nav';
import appCss from '~/styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Marko Dželatović — Senior Software Engineer · Visualization & Simulation',
      },
      {
        name: 'description',
        content:
          'Marko Dželatović — senior software engineer at Rivian. Visualization, simulation, monorepo platforms, API-first systems.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <div className="app">
        <Nav />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
