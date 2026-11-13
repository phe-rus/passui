---
name: Passui
description: A sea glass design language for React on the web, in the spirit of SwiftUI, with warm paper neutrals and spring motion.
colors:
  blush-rose: "#d16988"
  blush-ink: "#9e3b4f"
  blush-mist: "#fbeff0"
  blush-pale: "#e8b4bb"
  blush-swatch: "#f2d4d7"
  on-blush: "#1c1c1e"
  window-white: "#ffffff"
  surface-cream: "#fdfcf9"
  paper-warm: "#fffdf8"
  sidebar-linen: "#f3efe6"
  fill-oat: "#efebe2"
  separator-sand: "#e3dccb"
  label-graphite: "#1c1c1e"
  label-secondary-umber: "#6b6458"
  label-tertiary-stone: "#8b8478"
  ink-body: "#24221f"
  inverse-graphite: "#1c1c1e"
  on-inverse: "#ffffff"
  highlight-butter: "#ffe58a"
  heart-pink: "#ff375f"
  success-green: "#248a3d"
  warning-ember: "#c93400"
  danger-red: "#d70015"
  night-window: "#121110"
  night-sidebar: "#1a1917"
  night-elevated: "#24221f"
  night-fill: "#2c2a26"
  night-separator: "#3a3732"
  night-label: "#f5f2ec"
  night-label-secondary: "#b5aea2"
typography:
  large-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: "41px"
    letterSpacing: "0.4px"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: "34px"
    letterSpacing: "0.38px"
  title-2:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: "28px"
    letterSpacing: "-0.26px"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: "22px"
    letterSpacing: "-0.43px"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "22px"
    letterSpacing: "-0.43px"
  subheadline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "-0.23px"
  footnote:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
    letterSpacing: "-0.08px"
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: "0px"
  caption-2:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: "13px"
    letterSpacing: "0.06px"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  2xl: "14px"
  3xl: "16px"
  4xl: "20px"
  5xl: "24px"
  sheet: "28px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
components:
  button-default:
    backgroundColor: "{colors.inverse-graphite}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.footnote}"
    rounded: "{rounded.full}"
    height: "34px"
    padding: "0 16px"
  button-accent:
    backgroundColor: "{colors.blush-rose}"
    textColor: "{colors.on-blush}"
    typography: "{typography.footnote}"
    rounded: "{rounded.full}"
    height: "34px"
    padding: "0 16px"
  button-secondary:
    backgroundColor: "{colors.window-white}"
    textColor: "{colors.label-graphite}"
    typography: "{typography.footnote}"
    rounded: "{rounded.full}"
    height: "34px"
    padding: "0 16px"
  button-destructive:
    backgroundColor: "{colors.danger-red}"
    textColor: "{colors.window-white}"
    typography: "{typography.footnote}"
    rounded: "{rounded.full}"
    height: "34px"
    padding: "0 16px"
  input:
    backgroundColor: "{colors.fill-oat}"
    textColor: "{colors.label-graphite}"
    typography: "{typography.footnote}"
    rounded: "{rounded.xl}"
    height: "34px"
    padding: "0 12px"
  input-focus:
    backgroundColor: "{colors.window-white}"
  card:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.label-graphite}"
    rounded: "{rounded.5xl}"
    padding: "20px 0"
  switch:
    backgroundColor: "{colors.fill-oat}"
    rounded: "{rounded.full}"
    height: "32px"
    width: "52px"
---

# Design System: Passui

## Overview

**Creative North Star: "The Tumbled Sea Glass"**

Passui is what Liquid Glass is to Apple and Material 3 is to Google: a design language for the web, tuned for React apps that should feel like first-party citizens of whatever platform they run on. Its material is sea glass, not polished crystal. Surfaces are smooth, frosted and translucent, with a satin matte quality, a faint salt grain instead of a gloss, and a hairline rim instead of a hard border. Color depth is muted: warm paper neutrals under calm, slightly desaturated accents.

Motion carries the physical half of the idea. Springs give surfaces mass and surface tension: pressables compress, toggles stretch, menus swell out of their trigger like a drop and fall back into it. The system respects the person using it. Light and dark, the app's text size, Reduce Motion and each platform's conventions (glass on Apple platforms, flush solid bars on Android) all override decoration.

The rejection is confirmed: not liquid glass, not frosted glass. Satin privacy glass, level 5.

**Key Characteristics:**
- Warm paper neutrals; the accent whispers into the window ground and never floods it.
- Translucent layers with grain, a lit top rim and a hairline, never a hard border or a heavy shadow at rest.
- Apple's Dynamic Type scale, named as SwiftUI names it, scaling with the user's text size.
- A compact control scale (26 to 38px) with fully rounded buttons and 12px fields.
- Spring physics for every state change; CSS `linear()` springs, not canned ease curves.
- Platform aware: `data-os` switches glass for solid chrome where the platform expects it.

## Colors

A warm, notebook-like palette: cream and linen grounds, sand hairlines, graphite ink, and one chosen accent. Blush, the soft pink of the iPhone 15, is the default and Passui's own color. The values below are the light scheme unless marked night; roles are the same in dark.

### Primary
- **Blush Rose** (#d16988): The default accent fill: selected states, accent buttons, the on-state of the focus ring (at 70%). Deep enough to reach 3:1 against every light ground, the warm sidebar included.
- **Blush Ink** (#9e3b4f): Accent colored text and icons on neutral backgrounds (AA contrast). Links, accent labels.
- **Blush Mist** (#fbeff0): Subtle tint for selected rows. In dark mode the accent is **Blush Pale** (#e8b4bb).
- **Blush Swatch** (#f2d4d7): The brand and picker color, the soft pink itself. Used where the accent is shown rather than applied.

### Secondary
Six alternate accents the person can choose, each with four roles (fill, on-fill, text, soft tint) for both schemes: Honey (#efbd52), Sage (#a9c29b), Ocean (#9cc3e6), Lavender (#c3b8ea), Rose (#efb3bb) and Graphite. Calm and slightly muted, picked to sit on warm paper.

### Neutral
- **Window White** (#ffffff): The window ground, tinted by the accent: the generated theme mixes `accent-soft` into it (6% light, 4% dark).
- **Surface Cream** (#fdfcf9): Lists and secondary panes.
- **Paper Warm** (#fffdf8): The reading and writing surface, and the Card ground.
- **Sidebar Linen** (#f3efe6): Sidebar and toolbars; also the tint of clear glass.
- **Fill Oat** (#efebe2): Inputs, chips and pressed states.
- **Separator Sand** (#e3dccb): Hairlines and dividers.
- **Label Graphite** (#1c1c1e), **Label Secondary Umber** (#6b6458), **Label Tertiary Stone** (#8b8478), **Ink Body** (#24221f): The four text levels; ink is body copy on paper.
- **Night** ramp: Window (#121110), Sidebar (#1a1917), Elevated (#24221f), Fill (#2c2a26), Separator (#3a3732), Label (#f5f2ec), Label Secondary (#b5aea2). Dark stays warm, never blue-black.

### Status
- **Success Green** (#248a3d), **Warning Ember** (#c93400), **Danger Red** (#d70015), **Highlight Butter** (#ffe58a), **Heart Pink** (#ff375f). Status colors brighten in dark mode (success #30d158, warning #ff9f0a, danger #ff453a).

### Named Rules
**The Whisper Rule.** The accent tints the window ground and nothing else. Every other ground stays neutral; the tint belongs to the ground alone.

**The Role Name Rule.** Feature code uses named roles (`bg-paper`, `text-label-secondary`), never hex. If a value is missing, add a token first. Appearance can be set per element with `data-theme`; inside it, use the same role names, never copy hex from the other palette.

**The Contrast Floor Rule.** Every pairing passes WCAG AA, checked in the tokens' tests. Accent fills that fail as text get a separate `accent-text`.

## Typography

**Display Font:** SF Pro Display optical family (with Inter, Segoe UI, Roboto), wired for 20pt and above.
**Body Font:** SF Pro Text via the system stack (-apple-system, BlinkMacSystemFont, Inter, Segoe UI, Roboto).
**Label/Mono Font:** ui-monospace, SF Mono, JetBrains Mono for code. Newsreader serif is bundled for long reading; Caveat and Patrick Hand cover handwriting.

**Character:** The platform's own voice, not a brand face. Tight Apple tracking, almost entirely regular weight, with weight 600 reserved for emphasis.

### Hierarchy
Apple's Dynamic Type at its default size, named as SwiftUI names it. Each style is a `text-*` utility with a matching `leading-*`, and all scale with `--type-scale`, never below 11px.
- **Large Title** (400, 34px, 41px line): Screen titles at the top of a scroll.
- **Title / Title 2 / Title 3** (400, 28 / 22 / 20px): Section and card titles.
- **Headline** (600, 17px, 22px line): Emphasized row text.
- **Body** (400, 17px, 22px line): Reading text in the interface.
- **Callout** (400, 16px): Explanations beside controls.
- **Subheadline** (400, 15px, 20px line): Row text, large buttons. There is no 14px style.
- **Footnote** (400, 13px, 18px line): The default control text; section headers, secondary details.
- **Caption / Caption 2** (400, 12 / 11px): Labels, timestamps, badges.

### Named Rules
**The Dynamic Type Rule.** Use `text-*` tokens, never raw Tailwind sizes (`text-sm`, `text-xs`, `text-base`). Words on pages are the `Text` component, not a bare `span` or `p` carrying type classes.

**The Hug Rule.** Headings hug their paragraphs: zero gap by default.

## Layout

A 4px spacing grid (4, 8, 12, 16, 20, 24, 32, 40, 48, 64). Controls follow one compact scale, Mira's 32px default plus 2px: `xs` 26, `sm` 30, default 34, `lg` 38px, with footnote text (caption for `xs`, subheadline for `lg`). List rows keep the 44px iOS touch row. A one-off size is allowed only for content (artwork, printed paper) or a deliberately dense surface such as a calendar cell.

Lists are the iOS inset grouped list (`List`, `ListSection`, `ListItem`). Scroll surfaces reserve real bottom room through `--scroll-clearance`. Viewport aware shells use the visual viewport variables the overlays write. Layering: modal surfaces at z 60 above the sticky header (55), menus and popovers at 70, tooltips at 80.

Scrollbar chrome is forbidden everywhere; base styles hide it while scrolling still works.

## Elevation & Depth

Depth is hybrid: tonal layering at rest, glass when floating. Resting cards are flat paper with only an inset hairline and a top-edge highlight. Anything that floats is glass: translucent tint, backdrop blur with saturation boost, a lit top rim, a hairline, and layered soft shadows tinted warm (never gray-black in light mode).

### Shadow Vocabulary
- **Card edge** (`inset 0 0.5px 0 glass-highlight, inset 0 0 0 0.5px glass-rim`): Resting cards, no outer shadow.
- **Liquid glass** (blur 40px, saturate 180%, `inset 0 1px 0 glass-specular`, `0 8px 24px -8px shadow-menu`, `0 28px 64px -24px shadow-floating`): Floating controls, popovers, menus.
- **Dense glass** (same, tint `elevated` at 86%): Menus and lists where text must stay crisp.
- **Menu glass** (`glass-menu`: elevated at 97%, blur 24px, grain): Dialogs, alert dialogs, sheets, drawers. Nearly opaque, because nested backdrop filters cannot see through a parent.
- **Bar / pane glass** (`glass-bar`: paper 72%, blur 20px; `glass-pane`: sidebar 78%, blur 30px): Edge-attached headers and large panes.
- **Button lift** (`inset 0 1px 0 rgb(255 255 255 / 0.14), 0 1px 2px rgb(0 0 0 / 0.18), 0 6px 16px -6px rgb(0 0 0 / 0.35)`): Filled buttons.

### Named Rules
**The Grain Over Gloss Rule.** All glass shares one faint sea salt SVG noise tile that mattes the surface. Tune the material in the utilities, never per component. Polish is a defect.

**The Rim Not Border Rule.** Edges are a lit top highlight plus a 0.5px rim, never a 1px solid border on glass.

## Shapes

Continuous (squircle) corners wherever the browser supports them. Radii step by 2px while small and 4px beyond: 4, 6, 8, 10, 12, 14, 16, 20, 24, the sheet at 28, and full. Buttons and switches are fully round; fields are 12px; cards are 24px; sheets 28px. Nested shapes stay concentric: inner radius equals outer radius minus the padding between them.

## Components

All components are native React, written in-house, styled through data attributes (`data-state`, `data-starting-style`). Philosophy: **tactile and softly lit.** Things press in, wells lift on focus, and every raised surface carries an inset highlight along its top edge.

### Buttons
- **Shape:** Fully round pill (9999px). Heights 26 / 30 / 34 / 38px.
- **Default:** Inverse graphite fill with white text, inset top highlight and a layered lift shadow; hover brightens 12%.
- **Accent:** Blush Rose fill with dark text, a 25% accent-ink ring and a tinted glow shadow.
- **Secondary / Outline / Ghost / Link:** Elevated white with a half-point rim; a 1px separator inset ring; text-only with an oat wash on hover; accent-text with an underline on hover.
- **Press:** Scales to 0.96 on a snappy spring. Focus is a 2px accent ring at 70% with a 2px offset. Disabled drops to 40% opacity. Reduce Motion removes the scale.

### Inputs / Fields
- **Style:** A soft recessed well: Fill Oat with a 1px separator inset at 55%, 12px radius, 34px tall, footnote text.
- **Focus:** Lifts onto white with an accent-tinted 1px inset ring plus a 1px outer accent halo at 30%. Transitions at 160ms on the standard ease.
- **Error:** A 1.5px inset danger ring.

### Cards / Containers
- **Corner Style:** 24px, squircle.
- **Background:** Paper Warm with the card edge (inset highlight and rim). Internal padding 20px vertical, 16px gap between sections.

### Switch and Toggle
A 52 by 32px pill on Fill Oat that turns Success Green; the thumb is a white 28px disc that stretches wider while pressed, on a bouncy spring.

### Tabs and Segmented Controls
A tinted glass lens slides under the selection: the accent at 24%, lit at its rim, with a soft accent glow.

### Floating surfaces (Popover, Menu, Select, Dialog)
Liquid glass with squircle corners. Dropdown Menu, Popover, Select, Combobox, Dialog and Alert Dialog open with the water drop: the trigger's glass swells into the panel and drops back on close, like the iOS Notes menu. Sheet and Drawer slide from their edge the iOS way, with no water drop, and scale the page behind.

### Toast
The one component with its own animation runtime: a goo-filter island. It is the documented exception to CSS-only motion.

## Do's and Don'ts

### Do:
- **Do** use named roles for color, `text-*` Dynamic Type tokens for type, and the 2/4px radius ladder for shape.
- **Do** keep nested corners concentric: inner radius equals outer minus padding.
- **Do** express state with springs: `spring-snappy` for small feedback, `spring-smooth` for most transitions, `spring-bouncy` for playful moments.
- **Do** keep glass matte: grain, a hairline rim and a lit top edge.
- **Do** honor light and dark, the text size setting, Reduce Motion and `data-os` conventions.
- **Do** take every string from the app; components carry no copy.

### Don't:
- **Don't** use liquid glass gloss or crystal sparkle; Passui is satin, frosted sea glass.
- **Don't** draw scrollbar chrome. Scrolling stays, the bars go.
- **Don't** use raw hex, pixel font sizes, `text-sm`/`text-xs`/`text-base`, or ad hoc shadows in feature code.
- **Don't** introduce @base-ui/react or shadcn primitives as runtime dependencies.
- **Don't** tint grounds other than the window ground with the accent.
- **Don't** put a 1px solid border around glass, and don't nest dense text inside blurred glass over blurred glass.
- **Don't** use cold blue-black dark surfaces; dark mode stays warm.
