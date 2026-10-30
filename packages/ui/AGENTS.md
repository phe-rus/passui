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

## Packages

| Package | Folder | Holds |
|---|---|---|
| `@passui/react` | `packages/ui/` | Native controls, presentation, appearance, hooks, styles and design tokens. |
| `@passui/tanstack` | `packages/tanstack/` | Form, table and router integrations; imports native controls. |

An app imports one stylesheet, `@passui/react/styles.css` (or
`@passui/tanstack/styles.css`, which includes it). It brings in Tailwind,
the theme, utilities, base and typeset, and registers Passui's own files
with `@source`, so apps add no paths; Tailwind finds the app's files by
itself. `theme.css`, `utilities.css`, `base.css` and `typeset.css` stay
exported for `www`, which composes its own website stylesheet from them.

## Rules

- **Tokens, never one-off values.** Feature code uses named roles, not hex
  colors, pixel font sizes or ad hoc shadows. If a value is missing, add a
  token here first. (Existing one-off values are being migrated; don't add
  new ones.)
- **Names come from SwiftUI** where SwiftUI has one: `Toggle`, `Picker`,
  `SegmentedControl`, `Sheet`, `Popover`, `TabBar`, text styles like
  `footnote`. Our own concepts keep plain English names.
- **One component, one folder:** `src/components/<kebab-name>/<kebab-name>.tsx`,
  with its store and hooks beside it. Tests, helpers and fixtures live
  in `test/`, mirroring `src/`; token tests live in `../tokens/test/`.
  Export the component from `src/index.ts`.
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

| Utility | Size | Use |
|---|---|---|
| `text-large-title` | 34 | Screen titles at the top of a scroll |
| `text-title`, `text-title2`, `text-title3` | 28, 22, 20 | Section and card titles |
| `text-headline` | 17 | Emphasized row text (pair with `font-semibold`) |
| `text-body` | 17 | Reading text in the interface |
| `text-callout` | 16 | Explanations beside controls |
| `text-subheadline` | 15 | Row text, buttons |
| `text-footnote` | 13 | Secondary details, section headers |
| `text-caption`, `text-caption2` | 12, 11 | Labels, timestamps, badges |

There is no 14 px style: interface text that once used it is `subheadline`.
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

## Docs

Public examples import React icons from `@passui/react/icons`. Export named
props types beside controls and document fixed choices and defaults on props.
`copyText` from `@passui/react/clipboard` returns true only after a confirmed
write; show success only then and provide manual copying when access fails.

Every component has docs for the site in `www`, split so code
breaks loudly and prose stays out of Passui:

- `src/components/<name>/<slug>.docs.tsx`: `defineDocs<Props>()` with the
  playground's controls, a `render`, an optional `childrenSnippet`, and
  its examples. Register it in `src/docs/registry.ts`.
- `src/components/<name>/examples/<slug>-<id>.tsx`: one real example per
  file, exporting exactly one function named `<Slug><Id>` (for example
  `table-empty.tsx` exports `TableEmpty`). The site shows the file's own
  source, so it imports from `@passui/react/...` as an app would.
  Every page needs `usage`, `showcase` and at least two examples.
- The words (summary, prop descriptions, example titles, practices) live
  in `www/domains/catalog/content/<slug>.ts`, typed against the
  docs, so a new control without a description fails the typecheck.
- `test/docs/registry.test.ts` enforces unique slugs, real `exports`
  entries, valid defaults and the example file names.

## Components

| Component | Folder | Notes |
|---|---|---|
| `Button`, `IconButton` | `button/` | |
| `Chip` | `chip/` | |
| `LabeledContent` | `labeled-content/` | A row: label, description, trailing control; wide controls move under the label |
| Context menu | `context-menu/` | `useContextMenu`, `openContextMenu` |
| `confirmDialog` | `dialog/` | Host mounted once by the app |
| `Picker` | `picker/` | The pop-up button; never a native select |
| `Popover` | `popover/` | Keeps to `screenEdges()` |
| `SearchField` | `search-field/` | |
| `Section` | `section/` | A titled, inset group of rows with a footer, as in iOS Settings |
| `SegmentedControl` | `segmented-control/` | Turns into a `Picker` when its labels don't fit |
| `Sheet` | `sheet/` | Focus, floating ownership and background isolation are included in the upstream checkpoint. See UPSTREAM.md and the owning Notables review for remaining boundaries. |
| `Sidebar` | `sidebar/` | |
| `StatusIndicator` | `status-indicator/` | |
| `SwatchPicker` | `swatch-picker/` | |
| `TabBar` | `tab-bar/` | iOS 26 floating capsule, minimizes on scroll; flush on Android |
| `toast` | `toast/` | Host mounted once by the app |
| `Toggle` | `toggle/` | |
| Tooltip | `tooltip/` | `data-tooltip` on any element |

## Repository and public package

This repository owns Passui's UI source and is developed as its own
checkout (`~/pherus/passui`). Pherus consumes published npm releases, not
a submodule or sibling files; the docs website lives in `www` and the
optional TanStack integration in `packages/tanstack`, both in this
repository. Dependency versions here are explicit so this repo
can install independently of Pherus's catalogs.

`bun run publish:check` previews the public npm package. Publishing uses
`registry.npmjs.org` and public access. The package exports TS/TSX
source and CSS; consumers need a bundler that processes that source,
React 19 and Tailwind CSS 4. Keep npm credentials in user configuration,
outside the repository. Validate typecheck and tests before publishing.

`.github/workflows/publish.yml` runs manually on `main`, using the
`npm-publish` GitHub environment and job scoped `id-token: write`.
Bun installs, tests and packs; npm publishes the tarball with OIDC.
The npm trusted publisher must match `phe-rus/passui`, `publish.yml`
and `npm-publish`. No npm token secret is needed.

## Integration boundaries

Native controls in `src/` do not import TanStack or application domains. `packages/tanstack/` adapts them to form state, tables and routing. Domain-specific layouts and actions stay in apps. The former `@pherus/ui` package is removed; add missing controls to their native component folder rather than recreating compatibility wrappers.

All three app theme providers set both `class` and `data-theme`. www imports native token and utility styles while retaining its public stylesheet and layout. Keep document scripts outside `<main>` via the document shell's `after` slot.

Viewport-aware shells and sheets use `useVisualViewport()`. It accounts for
Safari visual viewport changes and Android WebView resizing without subtracting
the keyboard twice. Sheets focus the panel unless a child requests focus.

`TabBar` accepts `minimizeBehavior`: platform defaults, scroll on every platform,
or never. App search toolbars can share `useMinimizeOnScroll`; modal and floating
panel scrolling does not minimize the navigation behind them.

UI 0.1.10: anchored menus measure before revealing, preserve the trigger's
rectangle through the opening/closing spring, and restore its opacity on cleanup.
Point menus retain a compact reveal. Material rim roles differ by appearance;
regenerate ../tokens/theme.css after changing ../tokens/src/color.ts. Geometry tests
cover a menu flipped above its trigger and an empty/detached anchor.
