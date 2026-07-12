---
description: Scaffold a new React component for the web app
---

The user will describe the component. Create it in `apps/web/src/components/` (or `src/components/sections/` for page sections).

Use this template:

```tsx
import type { FC } from 'react';

interface YourComponentProps {
  // props here
}

const YourComponent: FC<YourComponentProps> = ({ ...props }) => {
  return (
    <div className="your-component">
      {/* content */}
    </div>
  );
};

export { YourComponent };
```

Then add styles to `apps/web/src/styles/app.css` using a flat class selector:

```css
.your-component {
  /* use CSS custom properties from tokens.css */
}
```

Rules:
- No Tailwind utility classes on elements
- No inline styles unless purely dynamic (e.g. `style={{ width: value }}`)
- All interactive states must be styled: `:hover`, `:focus-visible`, `:active`, `[disabled]`
- Use `cn()` from `@portfolio/ui` for conditional class merging
- Respect the variant naming convention: `primary | secondary | ghost | destructive` and size: `sm | md | lg`
- Check `src/components/icon.tsx` before adding any SVG — icon may already exist
