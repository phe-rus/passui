---

title: "@passui/icons"
summary: Redrawn mono and duo icons, one subpath each, so you bundle only the ones you use.
section: libraries
order: 11
---

```bash
bun add @passui/icons
```

## Use an icon

```tsx
import { HomeIcon } from "@passui/icons/home";

<HomeIcon size={20} tone="duo" />;
```

Every icon is its own file with `sideEffects: false`, so an unused icon never reaches your bundle.

## Tone

`tone="mono"` draws one colour through `currentColor`, so it follows the text colour around it. `tone="duo"` softens the detail through `--icon-secondary`.

## Animation

`animate="spin" | "pulse" | "draw"` plays an effect from the icons stylesheet, which is off under Reduce Motion.

```css
@import "@passui/icons/styles.css";
```

## Accessibility

Without a `title`, an icon is hidden from assistive technology. Give it a `title` when it stands alone, for example inside an icon only button.
