---

title: Accents
summary: Seven accent colours, each tuned for light and dark, and how to switch between them.
section: sections
order: 5
---

## The seven accents

`blush`, `honey`, `sage`, `ocean`, `lavender`, `rose` and `graphite`. Blush is the default. Each sets four roles for light and for dark: the accent itself, the text colour that sits on it, an accent safe for text, and a soft tint for backgrounds.

## Choosing one

Set `data-accent` on the root, or on any element to give just that part of the screen its own accent:

```html
<html data-accent="ocean">
```

The accent also tints the window ground by a few percent, the way iOS does.

## Using the roles

Reach for roles, never the hex values:

```tsx
<div className="bg-accent-soft text-accent-text">Selected</div>
<button className="bg-accent text-on-accent">Continue</button>
```

`text-accent-text` is the one to use for accent coloured words and icons: it is darkened or lightened until it passes WCAG AA contrast on the page behind it, which the raw accent does not always do.

## In code

```ts
import { accents } from "@passui/tokens/accent";

accents.ocean.light.accent;
```
