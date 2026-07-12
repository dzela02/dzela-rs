# Design System & Style Guide

Based on the project's hand-rolled CSS system and impeccable.style principles.

## Register

This is a **Brand** register project — a portfolio where design IS the product. Rules are stricter than a product/dashboard UI. Every visual decision is visible to hiring managers and clients.

## Design Tokens

Defined in `apps/web/src/styles/tokens.css`. Always use CSS custom properties — never hardcode color values or font sizes.

### Color (OKLCH)
```css
--bg:        oklch(1 0 0)            /* white background */
--fg:        oklch(0.145 0 0)        /* near-black foreground */
--accent:    oklch(0.58 0.12 155)    /* moss green — the only accent */

/* Neutral scale */
--bg-1:      /* lightest surface */
--bg-2:      /* card / elevated surface */
--bg-3:      /* heavy surface */
--fg-1:      /* primary text */
--fg-2:      /* secondary text */
--fg-3:      /* tertiary / placeholder */
--fg-4:      /* disabled */
```

OKLCH is the correct format for this project. Do not introduce hex, hsl, or rgb values. Use `color-mix(in oklch, ...)` for derived colors.

Dark mode uses `color-scheme: dark` — define dark overrides inside `[data-theme="dark"]` or `@media (prefers-color-scheme: dark)`.

### Typography (Geist)
```css
--font-sans:  'Geist', system-ui, sans-serif
--font-mono:  'Geist Mono', monospace

/* Scale */
--text-xs:    12px
--text-sm:    14px
--text-base:  16px
--text-lg:    18px
--text-xl:    20px
--text-2xl:   24px
--text-3xl:   30px
--text-4xl:   36px
--text-5xl:   48px

/* Line heights */
--leading-tight:   1.2
--leading-snug:    1.35
--leading-normal:  1.5
--leading-prose:   1.65
```

### Spacing
Use `--page-padding` for consistent horizontal padding. Use 4/8/12/16/24/32/48/64px rhythm (multiples of 4).

## Component Conventions

### Variant naming (must be consistent)
```
primary | secondary | outline | ghost | link | destructive
```

### Size naming
```
sm | md | lg
```

### State variants (must all be designed)
```
:hover | :focus-visible | :active | [disabled] / [aria-disabled="true"]
```

`focus-visible` not `focus` — keyboard users get the ring, mouse users don't.

## Anti-Patterns (impeccable.style rules)

Never introduce:
- **Gradient text** — `background-clip: text` on heading elements
- **Purple gradients** — generic AI palette, not this project's voice
- **Cardocalypse** — nested card-in-card-in-card structures. Max one elevation level per section
- **Uppercase eyebrow + italic serif h1** — the "SaaS hero" anti-pattern
- **Low-contrast labels** — all text must pass WCAG AA (4.5:1 for body, 3:1 for large text)
- **Excessive font weights** — use 400, 500, 600, 700 only
- **Overused fonts** — Geist is already in use; do not add Inter, Fraunces, or Mona Sans

## Layout

Max content width: 680px, centered. Controlled by `.page` container in `app.css`.

```css
.page {
  max-width: 680px;
  margin-inline: auto;
  padding-inline: var(--page-padding);
}
```

Use CSS Grid and Flexbox. Do not introduce a layout library.

## Adding New CSS

1. Add tokens to `tokens.css` if introducing a new value that will be reused
2. Add component styles to `app.css` in the relevant section (nav, hero, blocks, etc.)
3. Keep selectors flat — no more than 2 levels deep
4. Mobile-first breakpoints with `@media (min-width: ...)`
5. Use `gap` over `margin` between siblings

## Navigation

The nav is sticky with `backdrop-filter: blur()` (glassmorphic). Keep it at one level — no dropdowns. The theme toggle is the only interactive element in the nav besides links.

## Icons

Icons live in `src/components/icon.tsx` as inline SVG. Available: `arrow`, `chevL`, `arrowUR`, and others. Add new icons to this file as SVG components — do not import icon libraries.

## Accessibility

- Color is never the only indicator of state (add shape, text, or icon)
- Focus rings must be visible (use `outline` with `focus-visible`)
- Motion: wrap animations in `@media (prefers-reduced-motion: no-preference)` — default to no animation
- Semantic HTML first — `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`

## Responsive Breakpoints

```css
/* Mobile first */
/* base: 0–639px */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

The page max-width is 680px so most layout work needs only the base and `sm` breakpoints.

## Checklist Before Shipping a UI Change

- [ ] Renders correctly on mobile (360px wide)
- [ ] Dark mode looks intentional (not accidental inversion)
- [ ] All interactive states designed (hover, focus-visible, active, disabled)
- [ ] No hardcoded color values
- [ ] Contrast passes WCAG AA
- [ ] No motion if `prefers-reduced-motion: reduce`
- [ ] Semantic HTML elements used
