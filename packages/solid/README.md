# @passui/solid

Native SolidJS controls and appearance for Passui, sharing tokens and CSS
with `@passui/react`. This package does not import React or React DOM.
Requires SolidJS 1.9.17+ and Tailwind CSS 4.

## Setup

```bash
bunx @passui/cli@latest init --framework solid
# Optional integrations
bunx @passui/cli@latest init --framework solid --integration tanstack
# New Vite or TanStack Start applications
bunx @passui/cli@latest create my-app --framework solid --template vite
bunx @passui/cli@latest create my-app --framework solid --template tanstack
```

Manual installation:

```bash
bun add @passui/solid solid-js tailwindcss
bun add -D vite-plugin-solid @tailwindcss/vite
```

Import the stylesheet once:

```css
@import "@passui/solid/styles.css";
```

Use your framework's normal SolidJS and Tailwind CSS 4 configuration.
Passui ships compiled browser and SSR modules with TypeScript declarations.
It does not need special bundler resolution or dependency exclusions.
For a plain Vite application:

```ts
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({ plugins: [solid(), tailwindcss()] })
```

For TanStack Start, place `tanstackStart()` from
`@tanstack/solid-start/plugin/vite` before `solid({ ssr: true })`.
The CLI generates the standard framework configuration for new projects.
Existing Solid applications only need the package, stylesheet and provider.

```tsx
import { Button } from "@passui/solid/button"
import { createSignal } from "solid-js"

export function Example() {
    const [saved, setSaved] = createSignal(false)
    return <Button onClick={() => setSaved(true)}>{saved() ? "Saved" : "Save"}</Button>
}
```

## Spring motion

Passui uses a damped harmonic oscillator for interactive controls instead
of fixed-duration position tweens. Springs carry their current velocity
through interrupted or reversed movements. The switch thumb follows pointer
movement directly, adds resistance beyond its bounds, then settles with a
spring when released. Keyboard and click interactions retain native semantics.

A Solid component can use the same primitive for translations, scale or
another numeric value:

```tsx
import { useSpringValue } from "@passui/solid/motion"
import { springs } from "@passui/solid/tokens"

function SpringExample() {
    const x = useSpringValue(0, springs.snappy)

    return (
        <button
            type="button"
            onClick={() => x.to(x.value() > 0 ? 0 : 80)}
            style={{ transform: "translateX(" + x.value() + "px)" }}
        >
            Move
        </button>
    )
}
```

Use `jump(position)` while a pointer is held down and
`to(target, releaseVelocity)` on release. `rubberBand(overflow, dimension)`
models boundary resistance separately. Motion respects the browser's
reduced-motion preference and runs no animation frames during SSR.

## Components

The 35 documented families have native implementations: Button, IconButton,
Chip, TextField, SecureField, SearchField, Toggle, SegmentedControl, Picker,
SwatchPicker, Section, LabeledContent, StatusIndicator, StatTile, DatePicker,
CompactDatePicker, CompactTimePicker, TextEditor, SearchList, ProfileImage,
TabView, TabBar, SidebarSection, ViewController, Table, ContentView,
Conversation, Ambient, Dialog, Sheet, Popover, toast, useContextMenu,
TooltipHost and LocaleSwitcher. Import from their kebab case entry points,
or from `@passui/solid`. Hosts and actions also have dedicated entry points:
`/toaster`, `/toast`, `/dialog`, `/dialog-host`, `/context-menu`, `/tooltip`.
Mount each host once near the application root when using that feature.

Native DOM props follow Solid conventions, including `class`, `onInput`,
`inputmode` and `autocomplete`. Components also accept `className` where
styling is part of their API. Read signals and context getters inside JSX
or another reactive computation, rather than capturing a value once.

## Appearance and shared values

`@passui/solid/appearance` exports ThemeProvider, useTheme, PlatformProvider,
PlatformScript, usePlatform, detectPlatform and resolvePlatform.
ThemeProvider supports system appearance, persistence, forced themes,
class and data attributes and CSP nonces. Place PlatformScript in the
head before paint and wrap the app in PlatformProvider. The platform
starts at `unknown` for SSR and hydration, then resolves after mounting.
A valid root `data-os` override takes precedence over browser detection.
Read `usePlatform()` reactively, for example `createMemo(usePlatform)`.

Framework independent values remain available from `@passui/tokens`,
`@passui/solid/tokens`, `/cn` and the root date and shape helpers.

Optional TanStack integration uses `@passui/tanstack/solid/*` and the
matching `@tanstack/solid-*` adapters. See the installation guide at
https://passui.pherus.org/solid/docs/installation.

## Verification

From the repository root, run `bun run check`, `bun run typecheck`,
`bun run test`, `bun run solid:parity` and `bun run publish:check`.
The component coverage gate accompanies rendering, interaction and clean
consumer verification; it is not by itself a behavior test.

MIT. Shared visual contracts and platform helpers follow the Passui
source lineage recorded in `../ui/UPSTREAM.md`.
