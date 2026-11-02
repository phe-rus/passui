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
import { Button } from "@passui/react/button"

export function SaveButton() {
    return <Button variant="accent">Save</Button>
}
```

### Numeric controls and separators

`Slider`, `Stepper`, `ProgressView`, and `Divider` provide native foundations
for settings, quantity adjustments, task progress, and layout separation.
They have individual subpath exports and named TypeScript props.

```tsx
import { useState } from "react"
import { Slider } from "@passui/react/slider"
import { Stepper } from "@passui/react/stepper"
import { ProgressView } from "@passui/react/progress-view"
import { Divider } from "@passui/react/divider"

export function DownloadSettings() {
    const [volume, setVolume] = useState(50)
    const [copies, setCopies] = useState(1)

    return (
        <section className="flex flex-col gap-4">
            <Slider label="Volume" value={volume} onChange={setVolume} />
            <Stepper
                label="Copies"
                labels={{ decrement: "Fewer copies", increment: "More copies" }}
                value={copies}
                onChange={setCopies}
                min={1}
                max={10}
            />
            <Divider />
            <ProgressView label="Downloading" value={42} max={100} />
        </section>
    )
}
```

Both numeric controls are controlled: the parent owns their value. Stepper
supports fractional steps and disables actions at its bounds. Slider keeps
native pointer and keyboard input. ProgressView omits `value` for indeterminate
progress and honors reduced motion. Divider is decorative by default; pass
`decorative={false}` to expose a semantic separator.

### Menus and disclosure groups

`Menu` turns the existing `ContextMenuHost` into a declarative button. Mount
the host once at the app root, then supply menu items wherever an action
button belongs. Its placement and keyboard behavior are shared with context
menus. `DisclosureGroup` provides a controlled, accessible expansion row on
top of `InlineDisclosure`.

```tsx
import { useState } from "react"
import { Menu } from "@passui/react/menu"
import { DisclosureGroup } from "@passui/react/disclosure-group"

export function Preferences() {
    const [advanced, setAdvanced] = useState(false)
    return (
        <section>
            <Menu label="More options" items={[{ label: "Refresh", onSelect: () => {} }]}>
                More
            </Menu>
            <DisclosureGroup label="Advanced" open={advanced} onOpenChange={setAdvanced}>
                <p>Additional preferences</p>
            </DisclosureGroup>
        </section>
    )
}
```

### Icons and prop types

On this development branch, React icons have a dedicated entry point:

```tsx
import { IconButton, type IconButtonProps } from "@passui/react/icon-button"
import { SettingsIcon } from "@passui/react/icons"

const settingsAction: IconButtonProps = {
    label: "Settings",
    variant: "ghost",
    size: "icon-sm",
}

export function SettingsButton() {
    return <IconButton {...settingsAction}><SettingsIcon /></IconButton>
}
```

Hover a prop for its choices and defaults. Named props types are exported
beside their controls. For a fixed set of picker values, keep your state
as that literal union (for example, `useState<"personal" | "team">("personal")`)
so selection callbacks retain the same choices. Existing root icon imports
continue to work. These additions have not been published yet.

Clipboard actions can use `copyText` from `@passui/react/clipboard`. It
returns `true` only after a successful write and `false` if unavailable or
denied. Call it from a user action and show success only when it returns
`true`; offer manual copying otherwise. It adds no sound or haptic feedback.

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
