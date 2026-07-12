import { createFileRoute } from '@tanstack/react-router';

import { AboutTeaser } from '~/components/sections/about-teaser';
import { Contact } from '~/components/sections/contact';
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
      <ProjectList items={PROJECTS} limit={3} cta={{ label: 'All cases', to: '/cases' }} />
      <Systems />
      <AboutTeaser />
      <Contact />
    </>
  );
}
