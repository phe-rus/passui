# Passui UI

Pherus started from the recorded Notables snapshot in [UPSTREAM.md](UPSTREAM.md). This package contains native React controls and consumes shared design tokens from `@passui/tokens` in `../tokens/`. TanStack integrations are a separate package in `../tanstack/`. Pass and Accounts use the application stylesheet; www keeps its existing website stylesheet and visual arrangement.

Owner rule: Passui uses its own native React controls. Do not introduce @base-ui/react or shadcn primitives as runtime dependencies. Use their readable composition and accessibility conventions as inspiration, while preserving Passui's interaction contracts and visual identity.

Our design language: what Liquid Glass is to Apple and Material 3 is to
Google. Built for Notables first and for later apps, so nothing in here
knows about notes, books or any one product. Read this before changing a
token, a style or a component, here or in an app.

The guiding question: what would Apple do in 2026? Then add our own touch.
From shadcn we take one idea: components are our own readable code, not a
black box.

Design direction: "sea glass" — smooth, frosted, translucent, like gummy
sweets tumbled by the sea. Not liquid glass, not frosted glass — satin
privacy level 5 glass. The surface has a soft, diffused quality with
muted color depth. Animations follow Apple's liquid glass philosophy:
fluid, spring-based, with a sense of physical mass and surface tension.
Inspired by bencho.dev's micro-interactions (card stack, slosh slider,
glass bubble, liquid toggle) and SwiftUI's component patterns.

Typography: passui defines Apple's Dynamic Type scale (caption2 11pt →
large-title 34pt) as tokens. Always use `text-*` utilities from these
tokens — never raw Tailwind sizes (`text-sm`, `text-xs`, `text-base`,
`text-3xl`). SF Pro Display optical family is wired for ≥20pt utilities
via a base.css rule. Headings hug their paragraphs (zero gap by default
via a global `h1+p { margin-block-start: 0 }` rule).

## Packages

| Package            | Folder               | Holds                                                                       |
| ------------------ | -------------------- | --------------------------------------------------------------------------- |
| `@passui/react`    | `packages/ui/`       | Native controls, presentation, appearance, hooks, styles and design tokens. |
| `@passui/tanstack` | `packages/tanstack/` | Form, table and router integrations; imports native controls.               |

An app imports one stylesheet, `@passui/react/styles.css` (or
`@passui/tanstack/styles.css`, which includes it). It brings in Tailwind,
the theme, utilities, base and typeset, and registers Passui's own files
with `@source`, so apps add no paths; Tailwind finds the app's files by
itself. `theme.css`, `utilities.css`, `base.css` and `typeset.css` remain
exported for advanced integrations. www imports the full integration stylesheet.

## Rules

- **Tokens, never one-off values.** Feature code uses named roles, not hex
  colors, pixel font sizes or ad hoc shadows. If a value is missing, add a
  token here first. (Existing one-off values are being migrated; don't add
  new ones.)
- **Names come from shadcn** (`Dialog`, `DialogContent`, `Card`, `CardHeader`). SwiftUI names survive only where shadcn has none (`Stepper`, `SegmentedControl`). Our own concepts keep plain English names.
- **One component, one file:** `src/components/<kebab-name>.tsx`. Tests, helpers and fixtures live in `test/`, mirroring `src/`; token tests live in `../tokens/test/`. Export the component from `src/index.ts` and add its entry to `tsdown.config.ts`.
- **Typed choices.** Props with fixed options, such as `size`, `variant` or
  `tone`, use named string literal unions rather than `string`. Export those
  types with the component so editors can suggest valid values and TypeScript
  can reject unsupported ones.
- **Respect the system.** Light, dark, the app's text size, Reduce Motion
  (`MotionConfig reducedMotion="user"` in the app) and each platform's
  conventions through the platform variants below.
- **Every string comes from the app.** Components take labels as props;
  Passui has no copy of its own, so apps translate everything.
- **Artwork SVGs carry `data-brand`**, or the two-tone icon style dims them.

## Color

Semantic roles, light and dark, in `../tokens/src/color.ts`, as Tailwind
colors (`bg-paper`, `text-label-secondary`):

- Grounds: `background`, `sidebar`, `surface`, `paper`, `elevated`, `fill`, `separator`.
  The window ground carries a whisper of the accent: the generated theme
  mixes `accent-soft` into `background` (6% light, 4% dark), so each
  chosen accent tints the whole app the way iOS's does. Keep other grounds
  neutral; the tint belongs to the ground alone. `app-ground` adds quiet reflected
  accent at the edges. `scroll-surface` reserves real bottom room through
  `--scroll-clearance`; shared base CSS hides scrollbar chrome everywhere while preserving scrolling.
- Text: `label`, `label-secondary`, `label-tertiary`, `ink` (body text on paper).
- Accent: `accent`, `on-accent`, `accent-text`, `accent-soft`. Set by the
  chosen accent (`data-accent` on the root). **Blush**, the iPhone 15 pink,
  is the default.
- Status: `success`, `warning`, `danger`, `highlight`, `heart`, `inverse`, `on-inverse`.
- Materials: `glass-highlight`, `glass-rim`, `shadow-floating`, `shadow-menu`.

Every pairing is checked for WCAG AA contrast in `../tokens/test`.

**Appearance for part of a screen.** Like SwiftUI's `colorScheme`
environment, `data-theme="dark"` or `"light"` works on any element, so a
surface can keep its own appearance whatever the app's: the recorder is
always dark (`features/recording/components/recorder-sheet.tsx`). Inside it,
use the same role names; never copy hex values from the dark palette.
`color-scheme` follows too, so native fields match.

## Text styles

Apple's Dynamic Type, named as SwiftUI names them. `text-<style>` sets the
size, `leading-<style>` the matching line height. All of them scale with
`--type-scale` (the app's text size setting), never below 11 px.

| Utility                                    | Size       | Use                                             |
| ------------------------------------------ | ---------- | ----------------------------------------------- |
| `text-large-title`                         | 34         | Screen titles at the top of a scroll            |
| `text-title`, `text-title2`, `text-title3` | 28, 22, 20 | Section and card titles                         |
| `text-headline`                            | 17         | Emphasized row text (pair with `font-semibold`) |
| `text-body`                                | 17         | Reading text in the interface                   |
| `text-callout`                             | 16         | Explanations beside controls                    |
| `text-subheadline`                         | 15         | Row text, buttons                               |
| `text-footnote`                            | 13         | Secondary details, section headers              |
| `text-caption`, `text-caption2`            | 12, 11     | Labels, timestamps, badges                      |

There is no 14 px style: interface text that once used it is `subheadline`.

Control sizes follow one compact scale, Mira's 32 px default plus 2 px: `xs`
26, `sm` 30, default 34, `lg` 38 (`h-6.5`, `h-7.5`, `h-8.5`, `h-9.5`), with
`footnote` text (`caption` for `xs`, `subheadline` for `lg`) and `rounded-xl`
fields. Every control, legacy ones included, takes its height from this scale.
List rows keep the 44 px iOS touch row.
A one-off size is only for content (artwork, printed paper) or a
deliberately dense surface such as a calendar month cell.

## Corner radii

`rounded-xs` 4, `sm` 6, `md` 8, `lg` 10, `xl` 12, `2xl` 14, `3xl` 16,
`4xl` 20, `5xl` 24, `sheet` 28, `full`. Steps of 2 px while small and 4 px
beyond. Keep nested shapes concentric: inner radius = outer radius minus
the padding between them.

## Materials

Glass in `src/styles/utilities.css`, reading the material colors above,
so they follow the theme the person chose rather than only the system's:

- `glass`: floating controls, such as the tab bar and toolbars.
- `glass-bar`: bars attached to an edge, with content scrolling beneath.
- `glass-pane`: large panes such as the sidebar.
- `glass-menu`: menus and popovers, nearly opaque so nested text stays legible.

All glass shares the sea-salt grain, one faint SVG noise tile
(`--grain-sea-salt` in `utilities.css`) that mattes the surface. The
material is weathered sea glass, not polished crystal: grain over gloss,
a hairline rim instead of a hard border. Tune the material there, not
per component.

## Placement

Floating panels (popovers, pickers, the compact date and time pickers)
share one placement engine: `placeInViewport` in
`src/lib/anchored-placement.ts` holds the pure math (clamp to the safe
edges, flip above when below is short, cap the height so the panel
scrolls instead of crossing the screen), `useAnchoredPlacement` in
`src/hooks/` adds live re-placement on scroll and resize. Use them; do
not measure the viewport by hand in a component.

## CSS layers

Tailwind's order: `theme`, `base`, `components`, `utilities`. Element
defaults go in `base` (`src/styles/base.css`); a feature's own
stylesheet (the editor, the book reader) goes in `components`, so utility
classes can still adjust it. Leave CSS unlayered only when it must beat
everything, and say why in a comment (printing in `www/src/styles/app.css`).

## Platform variants

`ios:`, `android:`, `macos:`, `windows:` and `linux:` apply where the root
has `data-os`. The app sets it before the first paint, so there is no flash
of another platform's look. Android keeps Material conventions people
expect (flush, solid bottom bar; solid top bars); Apple platforms get glass.

## Motion

Springs in `../tokens/src/motion.ts`, used through `spring` in
`src/motion/transitions.ts`: `smooth` for most transitions, `snappy` for
small feedback, `bouncy` for playful moments. Haptics go through `haptic()`.

## Materials and motion in components

Menus and popovers use `liquid-glass` or `liquid-glass-dense` plus `squircle`; Dialog, Alert Dialog, Sheet and Drawer share one surface, `glass-menu` plus `squircle`. Sheet and Drawer slide from their edge the iOS way (no water drop) and, like every modal surface, sit at z 60, above the sticky site header (z 55); menus and popovers sit at 70 and tooltips at 80. Floating surfaces use `liquid-glass` or `liquid-glass-dense` plus `squircle` (tokens `utilities.css`): 40px blur at 180% saturation, a lit top rim, a hairline and layered shadows. Transitions use `spring-smooth`, `spring-snappy` or `spring-bouncy` (CSS `linear()` springs from the motion tokens). Dropdown Menu, Popover, Select, Combobox, Dialog and Alert Dialog use the water drop (`useWaterDrop` in `src/lib/water-drop.ts`): the trigger's glass swells into the panel and, on close, drops back into the trigger, like the iOS Notes three dots menu. Only a separate ghost layer of glass changes size (Web Animations, no dependency), so panel content never stretches; the panel itself carries `morph-reset` so its scale and slide step aside while `data-morph` is set. Without a trigger, with Reduce Motion or without `Element.animate`, the panel keeps its scale and fade pop. Pass the hook's result to `usePresence(open, drop)`; presence calls `enter` and `exit` so exit animations keep the panel mounted. Pressable controls use `active:scale-[0.96]` with `spring-snappy`. Tabs and ToggleGroup slide a `glass-lens` under the selection. Kbd shows Apple symbols or words from `data-os`, with no hydration mismatch. `List`, `ListSection` and `ListItem` are the iOS inset grouped list.

## Layout

```
src/
  components/   one file per component, shadcn names, Zag or native: dialog.tsx, select.tsx ...
  legacy/       components not yet rebuilt (wave 2 and blocks) and the internals they need
  lib/          cx, render, presence, portal and other shared helpers
  hooks/        shared hooks
  appearance/   theme and platform providers
  motion/ styles/ tokens.ts index.ts
test/           mirrors src: components/, legacy/, lib/, helpers/
```

A component is one file in `src/components/<name>.tsx`, 150 lines or fewer when simple, and one entry in `tsdown.config.ts`. A component file imports only React, tokens, its own Zag machine, `cx` and the shared helpers `render`, `presence`, `portal` and `water-drop`. Its allow list lives in `allowlist.json` and its size budget in `../../size-budgets.json`; both are checked in CI. Names follow shadcn (`Dialog`, `DialogContent`); triggers take a `render` prop. State is styled through data attributes (`data-state`, `data-starting-style`, `data-ending-style`). Animation is CSS only. No `tailwind-merge`, so overrides use data attributes, not class order.

Icons come from `@passui/icons`. The Hugeicons dependency is gone.

Zag less native components: Button, Card, Badge, Alert, Separator, Skeleton, Spinner, Kbd, Label, Input, Textarea, Breadcrumb, Pagination, Button Group, Field, Input Group, Progress, Avatar, Toggle, Command.

Toast is the one rebuilt component that keeps its original implementation: the `motion` driven island with the SVG goo filter (`src/components/toast/toaster.tsx` and `toast-store.ts`, restored unchanged apart from the icon import). It costs about 63 KB gzip because it ships `motion`, so its budget is 64000 and it is the exception to CSS only animation. `toast("Title", options)` and `toast.success("Title")` are the native calls; `toast.success({ title })`, `toast.info` and `toast.warning` are kept as thin conveniences over them.

Zag 1.47.0 and `@zag-js/react` 1.47.0 are the verified pair (`useMachine`, `normalizeProps`). tsdown generates the package `exports` from `tsdown.config.ts`; add new subpaths there and rebuild. Build before typechecking or packing; `dist` stays out of git.

`copyText` from `@passui/react/clipboard` returns true only after a confirmed write; show success only then.

Docs for every component live in `www/src/features/components` (see `www/AGENTS.md`).

## Components

Rebuilt on Zag or native (`src/components/`, plus `Locales` and `Swatch Picker` on Select and Radio Group): Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Button Group, Card, Checkbox, Collapsible, Combobox, Command, Dialog, Drawer, Dropdown Menu, Field, Input, Input Group, Input OTP, Kbd, Label, Pagination, Popover, Progress, Radio Group, Segmented Control, Select, Separator, Sheet, Skeleton, Slider, Spinner, Search Field, Sidebar, Switch, Table, Tabs, Text, Textarea, Toast, Toggle, Toggle Group, Tooltip.

Still in `src/legacy/` with their old APIs (wave 2 and blocks): Aspect Ratio, Code Block, Date Picker, Stepper, and the blocks Ambient, Empty, Labeled Content, Stat Tile, Layout, Wake Slider, Conversation, Morph. `legacy/button`, `picker`, `popover`, `sheet` and `text-field` remain only as internals of these and are not public entries.

## Repository and public package

This repository owns Passui's UI source and is developed as its own checkout (`~/pherus/passui`). Pherus consumes published npm releases. `bun run publish:check` previews the public npm packages. Publishing uses `registry.npmjs.org` and public access, in the order tokens, icons, react, tanstack. Credentials stay outside the repository.

`.github/workflows/publish.yml` runs manually on `main`, using the `npm-publish` environment and job scoped `id-token: write`. Each package needs its own npm trusted publisher matching `phe-rus/passui`, `publish.yml` and `npm-publish`, including the new `@passui/icons`.

## Integration boundaries

Components do not import TanStack or application domains. `packages/tanstack/` adapts them to form state, tables and routing, with `@passui/react` and `@passui/icons` as peers.

Viewport aware shells and sheets use the visual viewport variables the overlays write (`--visual-viewport-height`). `TabBar`, `Picker` and the old store based hosts were removed.
