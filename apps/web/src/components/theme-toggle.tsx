import { useEffect, useState } from 'react';

import { IconBtn } from './primitives';

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('theme-dark'),
  );

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <IconBtn
      icon={dark ? 'sun' : 'moon'}
      label="Toggle theme"
      onClick={() => {
        setDark((d) => !d);
      }}
    />
  );
}
