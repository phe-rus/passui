# 0003. Overlays on Zag: Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Dropdown Menu

**Date**: 2026-11-12
**Parent**: [0002 Lean rebuild](index.md), build plan step 4

## Summary

The seven overlay components of wave 1 are rebuilt on Zag.js state machines, one entry each, so a consumer pays only for the overlays they import. Sheet and Drawer use the new `@zag-js/drawer` machine for swiping, snap points and nesting, instead of the hand written Vaul port that spec 0002 assumed. Passui adds the look, the sheet curve, the page scale and a small presence hook so panels animate out with CSS transitions that can reverse mid flight. Triggers compose through a `render` prop.

## Context

Spec 0002 blocked its overlay thread on this child spec. Since 0002 was written, three facts changed the picture.

- `@zag-js/drawer` 1.47.0 exists. It carries swipe direction, snap points, a nested drawer stack, a swipe area and CSS variables for swipe progress and translate. Writing a second gesture engine would duplicate it.
- A Zag machine costs real weight. Measured with Bun, minified and gzipped, React external, one entry each: Dialog about 17.7 KB, Tooltip 19.3 KB, Drawer 27.1 KB, Popover 28.5 KB, Menu 30.9 KB. About 3.8 KB of every figure is the shared `@zag-js/react` adapter. Zag's shared chunks are counted in each figure, so a real app that imports several overlays pays much less than the sum.
- Zag's presence helper waits for CSS keyframe animations. Keyframes restart instead of reversing, which breaks the mid animation reversal that parent AC-5 requires.

The old library has a store based Dialog, Sheet, Popover, Menu and Tooltip that morph out of their triggers. They stay at `./legacy/*` until 0.3.0.

Web React 19, TanStack Start SSR. No persistence, no network, no personal data, so there is no data model or security model here.

## Requirements

**User stories**:
- As a Pherus app developer, I want to import only `Dialog` and pay for the Dialog machine, so that my app stays small.
- As a developer who knows shadcn, I want `Dialog`, `DialogTrigger`, `DialogContent` and the other familiar parts, so that I do not read a translation table.
- As a phone user, I want to drag a bottom Drawer down to dismiss it, with the page behind scaling back, and have the panel stay above the keyboard when I type.
- As a keyboard and screen reader user, I want correct roles, focus handling and Escape behavior in every overlay.

**Acceptance criteria**:
- **AC-1**: Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip and Dropdown Menu are separate entries. Each has a gzip budget in `size-budgets.json` equal to its measured size plus 10%, set when it is built, and `size:check` fails on growth. Each has an allow list in `allowlist.json` limited to `react`, `@zag-js/react`, its own Zag machine package, and the shared helpers `cx`, `render`, `presence` and `portal`.
- **AC-2**: Dialog and Alert Dialog use `@zag-js/dialog`. Sheet and Drawer use `@zag-js/drawer`. Popover uses `@zag-js/popover`, Tooltip `@zag-js/tooltip`, Dropdown Menu `@zag-js/menu`. Each works by keyboard, exposes correct roles, names and states, and has a `vitest-axe` test through the shared test helper.
- **AC-3**: Parts use shadcn names (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, and the matching parts of each family). Triggers and close parts accept a `render` prop to become the consumer's own element. Open state is controlled with `open` and `onOpenChange`, or uncontrolled with `defaultOpen`. Nothing depends on Base UI.
- **AC-4**: Alert Dialog has role `alertdialog`. An outside press does nothing, Escape triggers cancel, and initial focus lands on the cancel action.
- **AC-5**: Panels enter and leave with CSS transitions, styled through `data-starting-style` and `data-ending-style`. A small `presence` hook keeps a panel mounted until its transition ends. Reversing during a transition continues from the current position and does not jump. Under reduced motion, slides become fades and the page scale and spring are off.
- **AC-6**: Sheet and Drawer use the curve `cubic-bezier(0.32, 0.72, 0, 1)` over 500 ms and dismiss by swipe. Sheet slides from any side, right by default, and Drawer is a bottom sheet with a grab handle. A Drawer is as tall as its content, and a `snapPoints` prop adds resting positions. Playwright with touch emulation on Chromium and WebKit checks dismiss and reversal, and the panel position stays within 1 px on reversal. A real iOS and Android check gates each release.
- **AC-7**: Scaling the page behind a Drawer is opt in. When the app root carries `data-passui-page`, the Drawer writes its swipe progress to that element and CSS scales and rounds it. With no such element, nothing happens.
- **AC-8**: While a Dialog, Sheet or Drawer is open, a focused input stays visible above the soft keyboard, because the panel sets `--visual-viewport-height` from the visual viewport.
- **AC-9**: Any overlay can open inside any other, and a Drawer can open inside a Drawer with the parent scaling back. Escape and outside press close only the top layer. Focus returns to the trigger of the layer that closed. Scroll lock releases only when the last layer closes.
- **AC-10**: Tooltip opens on hover and keyboard focus only, never on touch. After one tooltip opens, neighbours open without the delay. Its trigger is described by `aria-describedby`.
- **AC-11**: Dropdown Menu has items, checkbox items, radio groups, groups, labels, separators, shortcuts and submenus, with arrow key navigation and typeahead. Choosing an item closes the menu unless the item says otherwise.
- **AC-12**: Page scale and swipe progress mapping are pure functions in `*.math.ts` files with unit tests. Their constants live in `@passui/tokens/motion` as data. These files import no React and no DOM, enforced by the Biome restriction from step 1.
- **AC-13**: Every overlay renders on the server without an id mismatch under TanStack Start. An SSR smoke test in `www` covers all seven (parent AC-15).
- **AC-14**: The new Dialog and Alert Dialog ship no imperative helper. The old store based Dialog stays at `./legacy/dialog` marked `@deprecated`, and the CHANGELOG mapping shows how to rebuild `confirm()` with Alert Dialog.
- **AC-15**: The old Dialog, Sheet, Popover, Menu and Tooltip move to `./legacy/*` marked `@deprecated`, and the CHANGELOG mapping lists each (parent AC-12).

## Options considered

### Option 1: Zag machines for every overlay, with Zag drawer for Sheet and Drawer

One adapter per family over a published Zag machine. Passui owns the look, the curve, the page scale and the presence hook.

**Pros**:
- One gesture engine, tested accessibility, and nesting that already works.
- Least code for Passui to maintain.

**Cons**:
- Heavy per entry (18 to 31 KB gzip) and Passui does not own the release thresholds.

### Option 2: Zag for most overlays, a native Vaul port for Sheet and Drawer

The plan in spec 0002 before `@zag-js/drawer` was found. Passui writes the velocity, snap and momentum math itself.

**Pros**:
- Full control of the feel and a pure math layer ready for a Rust port.

**Cons**:
- A second gesture engine to maintain, and real device bugs fall on Passui.

### Option 3: Small hand written machines for every overlay

Write lean machines for Dialog, Tooltip and the rest, with no Zag at all.

**Pros**:
- Smallest weight, perhaps 5 to 8 KB for a Dialog.

**Cons**:
- Focus trapping, dismissal layers, typeahead and positioning are the hard parts, and rewriting them gives up Zag's tested accessibility.

## Decision

**Chosen option**: Option 1: Zag machines for every overlay, with Zag drawer for Sheet and Drawer.

Each overlay is a thin Passui adapter over one Zag machine, styled with Tailwind utilities and data attributes, animated with CSS transitions and a shared presence hook, and composed through a `render` prop. The trigger morph from the old library becomes an opt in recipe, and the default is a plain CSS enter and exit.

**Implementation skills**: none installed for Zag or Playwright. See Follow-up.

**Changes to spec 0002**: parent AC-5 no longer asks for hand written velocity and momentum math, since Zag drawer owns release decisions. The parent invariant about allowed imports gains the shared helpers `render`, `presence` and `portal`. The index applies both edits.

## Rationale

Zag drawer already solves swipe, snap points and nesting, which are the hardest and most device sensitive parts. Maintaining a second engine would cost more than the machine weighs, and one gesture engine is easier to keep correct on real phones. The cost is that Passui no longer owns the release thresholds, so parent AC-5's unit tested momentum math shrinks to Passui's own mapping (AC-12 here).

CSS transitions were chosen over keyframes because only transitions reverse from the current position, which parent AC-5 requires. The price is a small presence hook of our own, because Zag's presence waits for keyframes.

The `render` prop was the engineer's pick over `asChild`. It composes the same way and needs the same small helper, and it makes the Motion `layoutId` morph a plain recipe: render both trigger and panel as `motion.div` with the same id. No Passui code imports Motion.

Runner up on the base: a native Vaul port, kept as a fallback behind the same component API if the real device check fails.

## Feature design

**Data model sketch**: none. These are stateless presentation components. All state lives in Zag machines.

**State transitions**: each overlay follows the Zag machine for its family (closed, open, and for the Drawer a swiping state with a resolved snap point). Passui adds one view state for presence: `mounted`, `entering` (`data-starting-style` present), `open`, `exiting` (`data-ending-style` present), then unmounted when the transition ends.

**API surface** (parts per family, all shadcn names; every family also takes `open`, `defaultOpen`, `onOpenChange`):

| Family        | Parts                                                                                                                                                                                                                                                                                                 | Notable props                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Dialog        | Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose                                                                                                                                                                                         | `render` on Trigger and Close, `modal`                 |
| Alert Dialog  | AlertDialog and the same part names, plus AlertDialogAction, AlertDialogCancel                                                                                                                                                                                                                        | Cancel gets initial focus                              |
| Sheet         | Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose                                                                                                                                                                                                 | `side`: `top` `right` `bottom` `left`, default `right` |
| Drawer        | Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose, DrawerHandle                                                                                                                                                                           | `snapPoints`, `activeSnapPoint`, `onSnapPointChange`   |
| Popover       | Popover, PopoverTrigger, PopoverContent, PopoverAnchor                                                                                                                                                                                                                                                | `placement`, `offset`, optional arrow                  |
| Tooltip       | Tooltip, TooltipTrigger, TooltipContent                                                                                                                                                                                                                                                               | `openDelay`, `closeDelay`, `placement`                 |
| Dropdown Menu | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent | `onSelect` per item                                    |

**Value sourcing**:

| Action                         | Value produced or displayed            | Source                                                                                                                                                                                      |
| ------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sheet and Drawer open or close | Curve and duration                     | `easing.sheet` and `duration.sheet` in `@passui/tokens/motion` (step 2)                                                                                                                     |
| Drawer swipe                   | Swipe progress, translate, snap offset | Zag drawer CSS variables on the content element                                                                                                                                             |
| Drawer release                 | Whether the swipe dismisses or snaps   | Zag drawer machine thresholds                                                                                                                                                               |
| Page scale                     | Scale factor and corner radius         | `pageScale` in `@passui/tokens/motion`: top offset 26 px and radius 8 px, taken from Vaul, applied as (viewport width minus top offset) divided by viewport width, scaled by swipe progress |
| Page scale                     | The page element                       | The element carrying `data-passui-page`                                                                                                                                                     |
| Soft keyboard                  | Available panel height                 | `visualViewport.height`, written to `--visual-viewport-height`                                                                                                                              |
| Tooltip                        | Open and close delay                   | `openDelay` and `closeDelay` props, defaults from Zag tooltip                                                                                                                               |
| Menu typeahead                 | Matched item                           | Item text content, through Zag menu                                                                                                                                                         |
| Popover and menu               | Position                               | Zag popper from the trigger rect and `placement`                                                                                                                                            |
| Focus return                   | The element to focus on close          | The trigger that opened that layer, tracked by Zag                                                                                                                                          |

**Key invariants**:
- An overlay file imports only React, `@zag-js/react`, its own machine package, `cx` and the shared helpers `render`, `presence` and `portal`.
- Exactly one Zag machine package per family. A shared helper never imports a machine.
- Animation is CSS only. No overlay imports Motion.
- `*.math.ts` files and the motion constants hold data and pure functions only.
- No scrollbar chrome in any panel. Base styles hide it while scrolling still works.
- Scale and spring are off under `prefers-reduced-motion`.

**Security model**: not applicable. No data leaves the browser.

**Configuration required**: none.

**Critical test scenarios**:
- Happy path: open a Dialog by click and keyboard, focus moves in, Escape closes, focus returns to the trigger, verifies AC-2, AC-9.
- Happy path: swipe a bottom Drawer down past the threshold and it dismisses, and the page scale follows the finger, verifies AC-6, AC-7.
- Failure case: reverse a Drawer swipe mid transition and the panel stays within 1 px of where it was, verifies AC-5, AC-6.
- Failure case: a Dropdown Menu inside a Sheet inside a Dialog, Escape closes only the menu, verifies AC-9.
- Failure case: focus an input in a bottom Drawer with the soft keyboard open and it stays visible, verifies AC-8.
- Alert Dialog: outside press is ignored, Escape cancels, Cancel has focus on open, verifies AC-4.
- Tooltip: no open on touch, warm up delay between neighbours, verifies AC-10.
- SSR: server render of all seven then hydrate with no id warning, verifies AC-13.

## Build plan

Order follows Tracer Bullet, the default for production work, since no approach is recorded in `AGENTS.md`. The Dialog thread proves the shared helpers, and the Drawer thread comes next because physics on real devices is the biggest risk.

1. **Shared helpers and measurement.** Add `render`, `presence` and `portal` under `src/lib`. Add the page scale constants to `@passui/tokens/motion`. Measure each machine through its adapter and record the entry budgets. Satisfies **AC-1**, **AC-3**, **AC-5**.
2. **Dialog thread.** Dialog end to end: parts, presence transitions, `render` trigger, allow list, axe test, `www` page, budget entry, SSR smoke test, legacy move. Satisfies **AC-1**, **AC-2**, **AC-3**, **AC-5**, **AC-13**, **AC-15**.
3. **Alert Dialog.** On the dialog machine with role, focus and dismissal rules. Satisfies **AC-4**, **AC-14**.
4. **Drawer thread.** Drawer then Sheet on `@zag-js/drawer`: curve, handle, snap points, sides. Then the page scale math and tests, the soft keyboard variable, Playwright touch tests on Chromium and WebKit in CI, and the real device checklist. Satisfies **AC-6**, **AC-7**, **AC-8**, **AC-12**.
5. **Stacking.** Tests and fixes for any overlay in any other, nested Drawers, top layer dismissal, focus return and scroll lock. Satisfies **AC-9**.
   _Status_: `packages/ui/e2e/stacking.e2e.ts` and the `?ui=stack&layers=` fixture cover Dialog, Sheet and Drawer in each other (seven stacks): Escape and outside press close the top layer only, focus returns to each closed layer's trigger, scroll lock holds until the last layer closes, a parent Drawer scales back and the page scale clears after the last. They pass Biome and `typecheck:e2e`, but have not yet been run in a browser. Zag supplies the layering (shared dismissable and focus trap stacks, a ref counted `preventBodyScroll`), so no component change was needed unless a run fails. The Dropdown Menu in Sheet in Dialog case waits for step 8.
6. **Popover.** Satisfies **AC-2**, **AC-3**, **AC-5**.
   _Status_: `@passui/react/popover` on `@zag-js/popover` with `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverTitle`, `PopoverDescription` and `PopoverClose`, a `placement` and `offset`, CSS presence and a jsdom and axe test. The old Popover moved to `@passui/react/legacy/popover`. Budget 32.7 KB gzip (measured 29.7 KB).
7. **Tooltip.** Satisfies **AC-10**.
   _Status_: `@passui/react/tooltip` on `@zag-js/tooltip` with `Tooltip`, `TooltipTrigger` and `TooltipContent`. Hover and focus only, with Zag's shared warm up between neighbours. The old `data-tooltip` host stays in the root export and is not renamed. Budget 22.4 KB gzip (measured 20.3 KB).
8. **Dropdown Menu.** Parts first, submenus last. Satisfies **AC-11**.
   _Status_: `@passui/react/dropdown-menu` on `@zag-js/menu` with every part in the API table, submenus through a second machine per `DropdownMenuSub` linked with `setParent` and `setChild`, and a per item `onSelect`. The old `Menu` keeps its `@passui/react/menu` entry because no name collides, and moves to legacy in step 9. Budget 36.4 KB gzip (measured 33.1 KB). The Dropdown Menu in Sheet in Dialog stacking case still needs an e2e run.
9. **Close.** (Website pages for Button and the seven overlays are done, as lean routes with no iframe. SSR hydration, the CHANGELOG mapping and the Menu and Tooltip legacy moves remain.) `www` pages and SSR coverage for all seven, CHANGELOG mapping, legacy moves for Sheet, Popover, Menu and Tooltip. Satisfies **AC-13**, **AC-14**, **AC-15**.

## Consequences

**Positive**:
- One gesture engine and one set of accessibility rules, from Zag, instead of hand written hooks.
- Each overlay is its own entry, so apps pay only for what they import.
- Reversible transitions give the interruptible feel the parent asked for.
- A consumer can opt into the trigger morph without Passui importing Motion.

**Negative / tradeoffs**:
- Zag is heavy for the simplest overlays. Dialog costs about 17.7 KB gzip against Button's 2 KB.
- Passui does not own the Drawer's release thresholds, so a feel problem on a real device means a fix upstream or the native fallback.
- A `className` override cannot rely on order, because `tailwind-merge` is gone. Consumers use data attributes and variants.
- The presence hook is our own code to maintain next to Zag's.
- Playwright with WebKit adds browser downloads and CI time.

**Neutral**:
- `@zag-js/drawer` is young (first published February 2026), so track its minor releases.
- The old trigger morph disappears from the default, and returns only as a documented recipe.

## Follow-up

- [ ] Verify the page scale constants (top offset 26 px, radius 8 px) against the Vaul source before step 4 sets them in tokens. They were recalled, not read.
- [ ] Zag, Playwright and the other new tools have no installed Agent Skills or MCP servers. Discovery was deferred. Run it before step 2 if you want it, then list the skills in this spec's Decision.
- [ ] Create the Playwright setup (Chromium and WebKit, touch emulation) and a real device checklist file before step 4 ships.
- [ ] Record the shared helper allow list and the `render` prop rule in `packages/ui/AGENTS.md` through `/sync` once step 1 of this build plan lands.
- [ ] Wave 2 still needs its own spec (Hover Card, Context Menu, Menubar and the rest). The icons child spec is also still owed.
