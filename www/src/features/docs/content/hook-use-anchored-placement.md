---

title: useAnchoredPlacement
summary: "Position a panel under an anchor and keep it on screen."
section: hooks
order: 14
---

`useAnchoredPlacement` places a panel of a known size beneath an anchor element. It places again while the viewport resizes or anything scrolls, so the panel never hangs off the screen.

```tsx
import { useAnchoredPlacement } from "@passui/react";
```

## Usage

```tsx
function Panel({ anchor }: { anchor: HTMLElement }) {
	const { above, ...position } = useAnchoredPlacement(anchor, 240, 180);
	return (
		<div
			data-side={above ? "top" : "bottom"}
			style={{ position: "fixed", ...position }}
		>
			…
		</div>
	);
}
```

## Parameters

| Parameter | Type          | Meaning                                                       |
| --------- | ------------- | ------------------------------------------------------------- |
| `anchor`  | `HTMLElement` | The element the panel hangs from                              |
| `width`   | `number`      | Panel width in pixels                                         |
| `needed`  | `number`      | The height the panel wants, so it can flip above if short     |
| `overlap` | `boolean`     | Cover the anchor instead of sitting below it. Default `false` |

## Return value

`left` and `width` (clamped to the safe edges), `top` or `bottom` (whichever side it opened on), `above` (true when it opened upward, so motion can grow from the bottom edge), and `maxHeight` when the chosen side has less room than `needed`, so the panel can scroll inside instead of crossing the edge.

## Behaviour

- Keeps a 6 px gap from the anchor.
- Flips above the anchor when there is no room below.
- Listens to window and visual viewport resize and scroll, and cleans up on unmount.

## Note

It needs the anchor element, not a ref, so render the panel after the anchor exists, for example from state set by a ref callback. Menus and popovers in Passui do this for you.
