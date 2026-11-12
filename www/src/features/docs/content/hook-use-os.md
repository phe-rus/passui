---

title: useOS
summary: "The platform, safe for server rendering, with Apple and touch flags."
section: hooks
order: 10
---

`useOS` tells you which platform the app is running on. It is safe to render on the server: it reports `"unknown"` on the server and on the first client render, then the real value, so markup never mismatches during hydration.

```tsx
import { useOS } from "@passui/react";
```

## Usage

```tsx
function ShortcutHint() {
	const { isApple } = useOS();
	return <kbd>{isApple ? "⌘" : "Ctrl"} K</kbd>;
}
```

## Return value

| Field     | Type                                                                 | Meaning                   |
| --------- | -------------------------------------------------------------------- | ------------------------- |
| `os`      | `"ios" \| "macos" \| "android" \| "windows" \| "linux" \| "unknown"` | The detected platform     |
| `isApple` | `boolean`                                                            | `true` on iOS and macOS   |
| `isTouch` | `boolean`                                                            | `true` on iOS and Android |

## Requirements

`useOS` reads the platform from `PlatformProvider`. Mount it once at the root, with `PlatformScript` in the document head so `data-os` is set before first paint. See [Installation](/docs/installation).

## When not to use it

For styling, prefer the `ios:`, `macos:`, `android:`, `windows:` and `linux:` variants. They read `data-os` before the first paint, so there is no flash. Use the hook only when the platform changes what you render, such as a shortcut label.
