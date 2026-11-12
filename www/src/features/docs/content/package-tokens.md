---

title: "@passui/tokens"
summary: Shared colours, type, spacing, radii, motion and base styles, with no React needed.
section: libraries
order: 10
---

`@passui/tokens` holds the values and the stylesheets every other Passui package is built from. It has no React runtime, so you can use it from a build script, a native app, or a plain stylesheet.

```bash
bun add @passui/tokens
```

## Use the values

```ts
import { space, radius, springs, duration } from "@passui/tokens";
import { accents } from "@passui/tokens/accent";
```

Subpaths: `/accent`, `/color`, `/layout`, `/motion`, `/typography` and `/theme-css`. See [Tokens](/docs/tokens) for what each group holds.

## Use the styles

```css
@import "@passui/tokens/theme.css";
```

| Import                         | What it adds                              |
| ------------------------------ | ----------------------------------------- |
| `@passui/tokens/theme.css`     | The tokens, registered with Tailwind      |
| `@passui/tokens/base.css`      | Base styles, with scrollbars hidden       |
| `@passui/tokens/utilities.css` | Glass, squircle and spring utilities      |
| `@passui/tokens/typeset.css`   | The `typeset` class for long form writing |
| `@passui/tokens/styles.css`    | All of the above in one import            |

Generated files change only through the package's `generate` script, never by hand.
