import { type ReactNode } from 'react';

export type IconName =
  | 'arrow'
  | 'arrowUR'
  | 'external'
  | 'search'
  | 'sun'
  | 'moon'
  | 'mail'
  | 'chevR'
  | 'chevL'
  | 'close'
  | 'menu'
  | 'check'
  | 'github';

const PATHS: Record<Exclude<IconName, 'github'>, ReactNode> = {
  arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
  arrowUR: <path d="M7 17 17 7M7 7h10v10" />,
  external: (
    <g>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v7H3V3h7" />
    </g>
  ),
  search: (
    <g>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </g>
  ),
  sun: (
    <g>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </g>
  ),
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />,
  mail: (
    <g>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </g>
  ),
  chevR: <path d="m9 6 6 6-6 6" />,
  chevL: <path d="m15 6-6 6 6 6" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  check: <path d="M20 6 9 17l-5-5" />,
};

const GITHUB_PATH =
  'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3';

export interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
}

export function Icon({ name, size = 16, stroke = 1.75 }: IconProps) {
  const isGithub = name === 'github';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isGithub ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {isGithub ? <path d={GITHUB_PATH} /> : PATHS[name]}
    </svg>
  );
}
