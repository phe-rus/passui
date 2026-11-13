# Passui

Passui is Pherus's design system: native React controls, design tokens and
themes, with names drawn from SwiftUI. What Liquid Glass is to Apple and
Material 3 is to Google, built for any React app.

**Docs, live playgrounds and examples: [passui.pherus.org](https://passui.pherus.org)**

## What's inside

- **Controls**: buttons, fields, pickers, toggles, sheets, dialogs,
  popovers, toasts, menus, tables and more, written as plain React you
  can read.
- **Design tokens**: color roles for light and dark, seven accents, text
  styles named as SwiftUI names them, corners and springs.
- **Appearance**: theme and platform providers, so every control follows
  the system it runs on, with `ios:`, `android:`, `macos:`, `windows:`
  and `linux:` variants.
- **Typeset**: calm styles for long-form writing.

## Using it

Install the public npm package in a React 19 app with Tailwind CSS 4:

```bash
bun add @passui/react
```

Import the styles once and each control from its own entry point:

```css
@import "@passui/react/styles.css";
```

```tsx
import { Button } from "@passui/react/button";

export function SaveButton() {
	return <Button variant="accent">Save</Button>;
}
```

Names follow shadcn (`Dialog`, `DialogContent`, `Card`, `CardHeader`), and
SwiftUI only where shadcn has none (`Stepper`, `SegmentedControl`). Each
component has its own subpath, such as `@passui/react/dialog` or
`@passui/react/stepper`, so a bundler keeps only what you import.

### Controls with a value

`Stepper`, `SloshSlider` and `WakeSlider` take their value from
`value` and `onChange`. `Stepper` supports fractional steps, disables its actions at the
bounds and rolls its digits unless Reduce Motion is on.

```tsx
import { useState } from "react";
import { Stepper } from "@passui/react/stepper";
import { WakeSlider } from "@passui/react/wake-slider";

export function PrintSettings() {
	const [copies, setCopies] = useState(1);
	const [volume, setVolume] = useState(50);

	return (
		<section className="flex flex-col gap-4">
			<Stepper
				label="Copies"
				labels={{ decrement: "Fewer copies", increment: "More copies" }}
				value={copies}
				onChange={setCopies}
				min={1}
				max={10}
			/>
			<WakeSlider label="Volume" value={volume} onChange={setVolume} />
		</section>
	);
}
```

### Code, conversation and clipboard

`CodeBlock` takes plain source and, optionally, a highlighter's rendered
element, so no syntax engine enters Passui's dependency graph. `Conversation`
provides `Conversation.Messages` and `Conversation.Composer` for a message
thread. Every string, such as button names, comes from your app.

`copyText` from `@passui/react/clipboard` returns `true` only after a
successful write and `false` if unavailable or denied. Call it from a user
action and show success only when it returns `true`; offer manual copying
otherwise. It adds no sound or haptic feedback.

### Icons and prop types

Icons live in `@passui/icons`, one entry point per icon:

```tsx
import { Button } from "@passui/react/button";
import { SettingsIcon } from "@passui/icons/settings";

export function SettingsButton() {
	return (
		<Button variant="ghost" size="icon-sm" aria-label="Settings">
			<SettingsIcon />
		</Button>
	);
}
```

Props with fixed choices, such as `variant` and `size`, are string literal
unions exported beside their component, so editors suggest valid values.

See [Installation](https://passui.pherus.org/docs/installation) for the
root setup, and [Skills](https://passui.pherus.org/docs/skills) to give AI
agents Passui's rules.

Passui works independently of TanStack. If your app uses TanStack Form,
Table or Router, the optional `@passui/tanstack` package connects them to
Passui's controls.

## Development and publishing

```bash
bun install
bun run typecheck
bun run test
bun run publish:check
```

The package exports explicit declaration types for editors and TypeScript/TSX
source for bundlers. `bun run build` generates the declarations before packing.
Your app's bundler must
process those files and its stylesheet through Tailwind CSS 4.

The GitHub Actions `publish.yml` workflow publishes from `main` using
npm's trusted publisher connection and the `npm-publish` environment.
It installs and validates with Bun, packs with Bun, then publishes the
archive with npm's OIDC support. It needs no stored npm token.

For a manual release, login to npm with an account that can publish
under `@passui`, then run `bun publish`. The package configuration
selects the public npm registry and public access. Keep credentials in
your user npm configuration.

## Principles

- Ask what Apple would do, then add our own touch.
- Name things as SwiftUI does: `Toggle`, `Picker`, `Sheet`, `footnote`.
- Use named tokens, never one-off colors, sizes or shadows.
- Every string comes from the app, so every app can translate.
- Respect the system: light and dark, text size, Reduce Motion and each
  platform's look.

## License

[MIT](./LICENSE)
