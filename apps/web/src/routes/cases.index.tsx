import { createFileRoute } from '@tanstack/react-router';

import { ProjectList } from '~/components/sections/project-list';
import { PROJECTS } from '~/data/projects';

export const Route = createFileRoute('/cases/')({
  component: CasesPage,
});

function CasesPage() {
  return (
    <ProjectList
      items={PROJECTS}
      title="Interesting cases"
      description="Not polished case studies. Just me writing honestly about problems I found interesting, decisions I made, and a few I would make differently now."
    />
  );
}
