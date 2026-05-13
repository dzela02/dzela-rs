import { useEffect, useState } from 'react';

import { IconBtn } from './primitives';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('theme-dark'));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
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
