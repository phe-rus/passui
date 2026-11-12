---

title: Tokens
summary: Colours, type, spacing, radii and motion as plain values, shared by every Passui package.
section: sections
order: 4
---

Tokens are the values the whole library is drawn from. They live in `@passui/tokens` as TypeScript and as CSS custom properties, so a component, a script and a stylesheet all read the same number.

## Where they come from

```ts
import { space, radius, springs, duration } from "@passui/tokens";
```

Each group also has its own subpath (`@passui/tokens/motion`, `/layout`, `/color`, `/typography`, `/accent`) when you want only one.

## Spacing

A 4 point grid: `space[1]` is 4, `space[2]` is 8, up to `space[16]` at 64. Use Tailwind's own scale in markup (`p-4` is 16); the numbers are there for code.

## Radius

Corner radii go in 2 px steps while small and 4 px steps beyond. Keep nested shapes concentric: an inner radius is the outer radius minus the padding between them.

## Motion

Springs, durations and easings are tokens too, and every spring is also available as a CSS `linear()` curve through the `spring-smooth`, `spring-snappy` and `spring-bouncy` utilities. Reduce Motion switches them off.

## Colour

Colours are roles, never hex values: `bg-background`, `bg-elevated`, `text-label`, `text-label-secondary`, `bg-accent`, `text-danger`. Light and dark are two sets behind the same names. See [Theming](/docs/theming) and [Accents](/docs/accents).

## Stylesheets

```css
@import "@passui/tokens/theme.css";
```

`theme.css` registers the tokens with Tailwind. `base.css`, `utilities.css` and `typeset.css` add the base styles, the glass and spring utilities, and long form typography. The React package's `globals.css` already includes all of them.
