# impeccable.style — Applied Rules

Source: https://impeccable.style/ (Apache 2.0)

These rules are applied specifically to this portfolio codebase (Brand register, OKLCH tokens, Geist typography).

## Design Register

**Brand** — marketing/portfolio where design is the product itself.
Every element is a signal about taste, craft, and attention. No placeholder patterns, no SaaS defaults.

## The 27 Deterministic Anti-Patterns

Flag these immediately during review:

### Typography violations
- **Italic-serif h1** as primary hero element — italic serifs are editorial context only, not primary headings
- **Uppercase eyebrow chip above italic serif h1** — double anti-pattern; cliché SaaS hero
- **Low-contrast labels** — decorative text that fails WCAG AA
- **Monoculture fonts** — Inter, Mona Sans, Fraunces as the *only* type choice (Geist is already in use; be intentional about adding weights or secondary faces)
- **Fixed type scale in marketing copy** — use fluid/responsive scale for content, not pixel-fixed values

### Color violations
- **Purple gradients** — the default "AI/tech" palette; signals no visual thinking
- **Gradient text** — `background-clip: text` on headings; overused and technically fragile
- **Overriding existing OKLCH tokens** with hex/hsl values — breaks the color system

### Layout violations
- **Cardocalypse** — card nested in card nested in card. Max one elevation jump per section
- **Symmetry for symmetry's sake** — forced centering without hierarchy reasoning
- **Misaligned grid gutters** — spacing that doesn't follow the 4px rhythm

### Motion violations
- **Looping background animations** — distract from content
- **Instant state transitions** — all interactive state changes need a `transition-duration`
- **Motion without `prefers-reduced-motion` guard** — accessibility violation

## Audience-First Checklist

Before designing a section or component, answer:
1. Who sees this? (hiring manager, potential client, collaborator)
2. What do they need to feel in 3 seconds?
3. What would make them distrust the work?

## Vocabulary for This Site

| Term | Definition |
|---|---|
| **Moss accent** | `oklch(0.58 0.12 155)` — the only color that pops; use sparingly |
| **Surface elevation** | page bg → card bg → inline highlight (3 levels max) |
| **Prose width** | 680px max — the content column width |
| **Eyebrow** | Small, muted label above a section heading (used for context, not decoration) |
| **Block** | A content section card (project, experience, post) |
| **Status dot** | The green dot in the hero indicating active availability |

## Specific Rules for This Portfolio

### Hero section
- The status line (`● Available for work`) uses the moss accent dot — do not add more colored dots elsewhere
- Display name uses the largest type size (`--text-5xl`) at tight leading
- CTA buttons: primary (solid) + secondary (outline) — no more than two

### Project blocks
- Show: name, role, year, stack tags, one-line blurb
- No thumbnails unless they are high quality and intentional
- Stack tags use the `Tag` component — consistent spacing, consistent color

### Writing list
- Group by year with a muted year label
- Show: title, read time, tags — no excerpts (encourage clicks, not summaries)

### Navigation
- Sticky, blurred (glassmorphic) — do not add dropdowns or mega menus
- Maximum 5 links: the existing set covers all pages

### Typography hierarchy per section
```
eyebrow (optional, --text-sm, muted)
heading (--text-2xl or --text-3xl, weight 600)
body (--text-base, --leading-prose, --fg-2)
```

### Do not add
- Testimonials or "social proof" sections — not the register for this portfolio
- Loading skeletons for static data
- Animations on first paint (they hide the content, not enhance it)
- Dark mode toggles in the main content area — keep it in the nav only

## Color Usage Rules

| Use case | Token |
|---|---|
| Body text | `--fg-1` |
| Secondary text | `--fg-2` |
| Tertiary / captions | `--fg-3` |
| Disabled | `--fg-4` |
| Page background | `--bg` |
| Elevated surface | `--bg-1` |
| Borders | `--bg-3` |
| Accent / interactive | `--accent` |
| Destructive | define as `oklch(0.55 0.2 25)` if needed |

Never use `--accent` for body text — it exists only for interactive elements and status indicators.

## Production Delivery Standard

- Every component ships as production TypeScript + CSS — no "placeholder" or "TODO" styling
- Responsive from 360px width minimum
- All interactive states explicitly styled (no browser-default-only focus rings)
- Passes Lighthouse accessibility audit (no critical issues)
- No unused CSS custom properties
