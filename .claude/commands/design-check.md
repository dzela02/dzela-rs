---
description: Audit staged or recently edited files for design anti-patterns
---

Review all recently modified CSS and TSX files in `apps/web/src/` for violations of the project's design system and impeccable.style rules. Report each finding with file path, line number, and a fix.

## Anti-patterns to flag

**CSS violations:**
- Hardcoded color values (hex, hsl, rgb) instead of CSS custom properties from `tokens.css`
- `font-size` in px instead of `--text-*` tokens
- `background-clip: text` (gradient text)
- Background gradients, especially purple/blue
- More than 2 nested elevation levels (card-in-card)
- Selector depth > 2 levels
- Missing `:focus-visible` on interactive elements
- Missing `@media (prefers-reduced-motion)` guard on animations
- `color` or `background` that may fail WCAG AA contrast against its background

**TSX/component violations:**
- Inline style objects with color, font-size, or spacing values (should use CSS custom properties)
- `className` with Tailwind utility class names (this project does not use Tailwind)
- Missing `aria-label` on icon-only buttons
- `onClick` without keyboard equivalent on non-button/anchor elements
- `<div>` used as interactive element instead of `<button>` or `<a>`

**Design conventions:**
- Variant or size prop values outside `primary|secondary|outline|ghost|link|destructive` and `sm|md|lg`
- New SVG icons defined inline in a component instead of added to `src/components/icon.tsx`

## Scoring

Report findings as:
- **Error** — must fix before shipping (hardcoded colors, missing a11y, no focus ring)
- **Warning** — strong recommendation (missing hover state, shallow contrast, motion without guard)

End with a summary: `N errors, M warnings` and a prioritized fix list.
