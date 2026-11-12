---

title: haptic
summary: "Ask for feedback; your app decides how it plays."
section: hooks
order: 16
---

`haptic` is not a hook, but it is the same family of small helpers. Components only ask for feedback. The app decides how it plays on this device, and whether it plays at all.

```tsx
import { haptic, setHapticPlayer } from "@passui/react";
```

## Usage

```tsx
haptic("success");
```

## Kinds

`"selection"`, `"light"`, `"medium"`, `"heavy"`, `"success"`, `"warning"` and `"error"`.

## Choose how it plays

By default nothing plays. Register a player once, at startup:

```tsx
setHapticPlayer((kind) => {
	if (kind === "selection" || kind === "light") navigator.vibrate?.(8);
	else navigator.vibrate?.(20);
});
```

Pass your own system haptics on native shells, or do nothing to silence it. Respect the user's setting inside the player.
