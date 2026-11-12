---

title: useVisualViewport
summary: "Measure the visible area, including when the soft keyboard is open."
section: hooks
order: 12
---

`useVisualViewport` measures the part of the page the user can actually see. It updates once per frame, and handles Android resize and Safari viewport panning, so you can keep a field above the keyboard.

```tsx
import { useVisualViewport } from "@passui/react";
```

## Usage

```tsx
function Composer() {
	const viewport = useVisualViewport();
	const lift = viewport?.keyboardOpen ? viewport.top : 0;
	return <footer style={{ transform: `translateY(${lift}px)` }}>…</footer>;
}
```

## Return value

`null` until the first measurement, then:

| Field          | Type      | Meaning                              |
| -------------- | --------- | ------------------------------------ |
| `width`        | `number`  | Visible width in pixels              |
| `height`       | `number`  | Visible height in pixels             |
| `top`, `left`  | `number`  | Offset of the visible area           |
| `keyboardOpen` | `boolean` | A soft keyboard is covering the page |

## In Passui

`Dialog`, `Sheet` and `Drawer` write `--visual-viewport-height` from the same measurement, so a focused input stays above the keyboard without you wiring anything.
