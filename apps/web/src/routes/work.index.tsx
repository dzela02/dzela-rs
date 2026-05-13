import { createFileRoute } from '@tanstack/react-router';

import { ProjectList } from '~/components/sections/project-list';
import { PROJECTS } from '~/data/projects';

export const Route = createFileRoute('/work/')({
  component: WorkPage,
});

function WorkPage() {
  return <ProjectList items={PROJECTS} title="Work" />;
}
