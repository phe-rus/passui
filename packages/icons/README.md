# @passui/icons

Redrawn mono and duo SVG icons for Passui. One file per icon, `sideEffects: false`, React only.

```tsx
import { HomeIcon } from "@passui/icons/home";

<HomeIcon size={20} tone="duo" />;
```

- `tone="mono"` draws one colour (`currentColor`). `tone="duo"` softens the detail through `--icon-secondary`.
- `animate="spin" | "pulse" | "draw"` plays an effect from `@passui/icons/styles.css`, and is off under reduced motion.
- Without a `title`, an icon is hidden from assistive technology.

Icons are drawn in `scripts/icons.data.mjs`; `bun run generate` writes the files and `icons.manifest.json`.
