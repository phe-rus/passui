# @passui/solid

Native SolidJS foundation for Passui. Stage 1 exposes shared tokens, styles,
class-name helpers, date helpers and shapes. It has no public component
exports yet. In particular, `@passui/solid/button` does not exist.

```ts
import { cn } from "@passui/solid/cn"
import { accents } from "@passui/solid/tokens"
```

```css
@import "@passui/solid/styles.css";
```

Requires SolidJS 1.9+ and Tailwind CSS 4. Shared tokens and styles come from
`@passui/tokens`; no React runtime is imported. The CLI currently supports
React starters only. Solid component development resumes after the migration release.
