---

title: useMediaQuery
summary: "Subscribe a component to a media query, by breakpoint, range or raw string."
section: hooks
order: 11
---

`useMediaQuery` returns whether a media query currently matches, and re-renders when that changes. It uses `useSyncExternalStore`, and returns `false` on the server.

```tsx
import { useIsMobile, useMediaQuery } from "@passui/react";
```

## Usage

```tsx
const desktop = useMediaQuery("lg");
const narrow = useMediaQuery("max-md");
const touch = useMediaQuery({ pointer: "coarse" });
const tablet = useMediaQuery({ min: "sm", max: "lg" });
```

## Accepted queries

| Form                   | Example                      | Matches                                 |
| ---------------------- | ---------------------------- | --------------------------------------- |
| A breakpoint           | `"lg"`                       | At least that wide                      |
| `max-` breakpoint      | `"max-md"`                   | Narrower than that breakpoint           |
| A range                | `"sm:max-lg"`                | From one breakpoint to another          |
| An object              | `{ min: "sm", max: 1200 }`   | Breakpoint names or pixel numbers       |
| A pointer type         | `{ pointer: "coarse" }`      | Finger (`"coarse"`) or mouse (`"fine"`) |
| Any media query string | `"(prefers-reduced-motion)"` | As written                              |

## Breakpoints

`sm` 640, `md` 800, `lg` 1024, `xl` 1280, `2xl` 1536, `3xl` 1600 and `4xl` 2000 pixels.

## useIsMobile

`useIsMobile()` is shorthand for `useMediaQuery("(max-width: 768px)")`.

## Server rendering

The server cannot know the viewport, so the first render is `false`. If a wrong first paint would flash, prefer CSS variants such as `md:hidden`, and use the hook for behaviour rather than layout.
