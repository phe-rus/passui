---

title: useDismiss
summary: "Close a floating layer on Escape or an outside press."
section: hooks
order: 13
---

`useDismiss` calls your callback when the user presses Escape or presses outside an element, while the layer is active. Use it for menus, popovers and sheets you build yourself.

```tsx
import { useDismiss } from "@passui/react";
```

## Usage

```tsx
function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
	const ref = useRef<HTMLDivElement>(null);
	useDismiss(ref, open, onClose);
	return open ? <div ref={ref}>…</div> : null;
}
```

## Parameters

| Parameter   | Type                             | Meaning                                 |
| ----------- | -------------------------------- | --------------------------------------- |
| `ref`       | `RefObject<HTMLElement \| null>` | The layer. Presses inside it do nothing |
| `active`    | `boolean`                        | Listeners attach only while `true`      |
| `onDismiss` | `() => void`                     | Called on Escape or an outside press    |

## Nested layers

A press inside a floating layer opened from within `ref`, such as a select list inside a popover, does not count as outside. Mark your own nested layer with the exported `FLOATING_LAYER`.

Escape is ignored when it has already been handled (`defaultPrevented`), or when focus is inside a nested layer, so only the top layer closes.

## When to use something else

`Dialog`, `Popover`, `Sheet` and `DropdownMenu` already dismiss themselves. Reach for the hook when you build a surface they do not cover.
