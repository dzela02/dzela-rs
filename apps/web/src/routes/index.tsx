import { createFileRoute } from '@tanstack/react-router';

import { Contact } from '~/components/sections/contact';
import { EmployedBadge } from '~/components/sections/employed-badge';
import { Hero } from '~/components/sections/hero';
import { NowBlock } from '~/components/sections/now-block';
import { ProjectList } from '~/components/sections/project-list';
import { Systems } from '~/components/sections/systems';
import { PROJECTS } from '~/data/projects';
import { useAnimate } from '~/hooks/use-animate';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  useAnimate();
  return (
    <>
      <Hero />
      <NowBlock />
      <Systems />
      <ProjectList items={PROJECTS} limit={3} cta={{ label: 'All work', to: '/work' }} />
      <EmployedBadge />
      <Contact />
    </>
  );
}
