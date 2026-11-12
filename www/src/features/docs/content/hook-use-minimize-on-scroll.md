---

title: useMinimizeOnScroll
summary: "True while the user scrolls down and false when they scroll back up."
section: hooks
order: 15
---

`useMinimizeOnScroll` reports whether chrome such as a tab bar should shrink, following iOS 26's `tabBarMinimizeBehavior(.onScrollDown)`. It is minimized while the user scrolls down through content, and restored when they scroll up or reach the top.

```tsx
import { useMinimizeOnScroll } from "@passui/react";
```

## Usage

```tsx
function Bar() {
	const minimized = useMinimizeOnScroll();
	return <nav data-minimized={minimized}>…</nav>;
}
```

## Return value

A `boolean`.

## How it decides

It listens to every scroll container, because each screen scrolls its own pane. A scroll only counts when it follows real user intent (a wheel, touch, drag or navigation key), so content that moves by itself, such as an anchor jump, does not minimize the bar. Reaching the top of a pane always restores it.

## Styling

Drive the visual change from the boolean with a data attribute and a transition, so the bar uses the same spring as the rest of the library.
