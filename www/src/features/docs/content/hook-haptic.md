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

Apple's three generators, by name:

| Generator    | Kinds                                                 |
| ------------ | ----------------------------------------------------- |
| Impact       | `"light"`, `"medium"`, `"heavy"`, `"soft"`, `"rigid"` |
| Selection    | `"selection"`                                         |
| Notification | `"success"`, `"warning"`, `"error"`                   |

Passui's own controls ask for `selection` when a switch flips, a stepper steps, a wheel row passes or a tab changes, and `light` for a tab bar action.

## Choose how it plays

Without any setup Passui plays what the device allows: a vibration pattern per kind on Android, a tick on iOS Safari 18 (the only haptic the web can reach there, so notifications play as two or three ticks), and nothing elsewhere. It stays silent under Reduce Motion.

Let people turn it off, and check whether it can play at all:

```tsx
import { hapticsSupported, setHapticsEnabled } from "@passui/react";

if (hapticsSupported()) setHapticsEnabled(settings.haptics);
```

On a native shell, register your own player once, at startup. It replaces the built in one:

```tsx
setHapticPlayer((kind) => {
	if (!settings.haptics) return;
	nativeBridge.impact(kind);
});
```
