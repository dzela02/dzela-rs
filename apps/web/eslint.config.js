import config from '@portfolio/eslint-config/react';

export default [
  ...config,
  {
    ignores: ['.output/**', '.vinxi/**', 'src/routeTree.gen.ts'],
  },
];
