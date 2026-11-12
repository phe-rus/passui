# 0002. Rationale

## Context

> ⚠️ Premise note: This is a full rewrite of a published library that Pherus apps depend on. A big bang rewrite of a live system usually ships late and breaks working code. The right framing is a strangler rebuild: new components ship next to the old ones in waves, old exports are deprecated for one release, then deleted. This spec also spans several decisions (foundation, icons, tooling, cast). It sets the architecture and wave 1, and splits icons, overlays and wave 2 into child specs (see Follow-up).

Passui is meant to be Pherus's design language library, in the way Liquid Glass is Apple's and Material 3 is Google's. Today it behaves like a library of blocks. Theming and tokens are in good shape. The components are not.

The audit found that:

- A `Button` is budgeted at 12 KB gzip and a `Picker` at 16 KB, because Motion and Hugeicons are hard dependencies of every package.
- There are 55 component folders and about 13k lines of TS. Many overlap: three sliders, three date and time pickers, four select style pieces, three tab pieces, four popover layers.
- Seven pieces are app level (`locale-switcher`, `conversation`, `stat-tile`, `wake-slider`, `swatch-picker`, `view-controller`, `content-view`).
- Names follow SwiftUI (`Section`, `ContentView`, `Chip`), which hides what shadcn users expect.
- There is one hand written state machine. Focus, dismissal, placement and typeahead are hand rolled in `hooks/` and `lib/`.
- `@passui/react` publishes raw `.tsx` with generated type files. Motion is `14.12.0`, `^13.4.4` and `13.5.0` across three packages. Vitest and Vite are pinned at different versions per package.
- Five scripts do generation, packing checks and size checks. `generate-react-api.mjs` alone is 420 lines and gates `check`.
- `biome.json` ignores many paths from other projects and has `organizeImports` off. `turbo.json` has per package overrides, and the root `lint` and `format` scripts bypass its tasks.

Not deciding means each new component adds more weight and the gap to shadcn and HeroUI grows.

## Options considered

### Option 1: Fix in place

Trim dependencies, merge duplicates, keep the current architecture and naming.

**Pros**:
- Lowest risk. No breaking changes.
- Fast first gains from removing duplicates.

**Cons**:
- Hand rolled logic and SwiftUI names remain.
- Raw source publishing and script heavy builds stay.
- Does not give shadcn simplicity.

### Option 2: Strangler rebuild on Zag, tsdown and an icons package

Build the new library alongside the old, wave by wave, using Zag for logic and native motion. Chosen.

**Pros**:
- Reaches the target weight and shape.
- Old code keeps working during the move.
- Machines and constants port cleanly to Rust.

**Cons**:
- Long, with two libraries shipping for a while.
- Breaking migration for Pherus apps.

### Option 3: Adopt Base UI plus Vaul directly

Wrap Base UI components and use Vaul for sheets.

**Pros**:
- Least new logic to write.
- Vaul already has the iOS sheet feel.

**Cons**:
- Conflicts with the owner rule against Base UI runtime.
- Vaul is React only and brings Radix Dialog, which adds weight and hurts portability.
- Passui would depend on upstream release timing.

### Option 4: Big bang rewrite

Replace everything in one release.

**Pros**:
- One clean cut and no legacy period.

**Cons**:
- Known failure pattern. Pherus apps break all at once and the release slips.

## Rationale

The main forces are weight, shadcn simplicity and a Rust friendly design. Option 1 cannot change the architecture, so the library stays heavy. Option 3 reduces writing but breaks the owner rule and adds Radix and Vaul weight. Option 4 puts Pherus apps at risk.

Zag fits because it is headless and its machines are state and event tables, which map to Rust enums. Copying Vaul's curve, drag momentum and background scale gives the same feel without the dependency. CSS `linear()` springs avoid shipping Motion for ordinary transitions, so Motion stays optional for shared element morphs only.

tsdown replaces raw source publishing and script based type builds with one config per package. It matches the Rolldown and Vite family without putting Vite in the libraries. Vite stays in `www` because TanStack Start requires it, and in Vitest.

Per component subpaths with `sideEffects: false` give shadcn like cost on npm, which is how Pherus consumes Passui. A copy in registry would own more maintenance for no gain today.

The engineer chose each of Zag, native Vaul physics, compiled npm with one subpath per component, shadcn names primary, tsdown, cutting blocks from core, CSS only icon animation and a 39 component first wave. The remaining items in Runtime decisions are my calls with a runner up listed.

## Inventory: current components to new

| Current                                                                                                                                               | Becomes                                    | Note                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `button`                                                                                                                                              | `Button`                                   | Rebuild first                                                                                 |
| `chip`                                                                                                                                                | `Badge`                                    |                                                                                               |
| `profile-image`                                                                                                                                       | `Avatar`                                   |                                                                                               |
| `section`, `content-view`                                                                                                                             | `Card`, `Item`                             | `content-view` leaves core                                                                    |
| `divider`                                                                                                                                             | `Separator`                                |                                                                                               |
| `toggle` (checkbox, switch styles)                                                                                                                    | `Checkbox`, `Switch`, `Toggle`             | 320 lines splits into three small files                                                       |
| `radio-group`                                                                                                                                         | `Radio Group`                              |                                                                                               |
| `text-field`, `secure-field`, `text-editor`                                                                                                           | `Input`, `Input Group`, `Textarea`         |                                                                                               |
| `one-time-code`                                                                                                                                       | `Input OTP`                                |                                                                                               |
| `picker`, `search-list`, `combo-box`                                                                                                                  | `Select`, `Combobox`                       | Four pieces become two                                                                        |
| `command`                                                                                                                                             | `Command`                                  |                                                                                               |
| `slider`, `slosh-slider`, `wake-slider`                                                                                                               | `Slider`                                   | One slider. `wake-slider` leaves core                                                         |
| `stepper`                                                                                                                                             | `Stepper`                                  | Stays, no shadcn name                                                                         |
| `segmented-control`                                                                                                                                   | `Toggle Group`, `SegmentedControl`         |                                                                                               |
| `tab-bar`, `tab-view`                                                                                                                                 | `Tabs`                                     |                                                                                               |
| `accordion`, `disclosure-group`, `inline-disclosure`                                                                                                  | `Accordion`, `Collapsible`                 |                                                                                               |
| `dialog`                                                                                                                                              | `Dialog`, `Alert Dialog`                   |                                                                                               |
| `sheet`                                                                                                                                               | `Sheet`, `Drawer`                          | Vaul physics                                                                                  |
| `popover`, `menu`, `context-menu`                                                                                                                     | `Popover`, `Dropdown Menu`, `Context Menu` | Four layers become one machine per feature                                                    |
| `tooltip`                                                                                                                                             | `Tooltip`                                  |                                                                                               |
| `toast`                                                                                                                                               | `Toast`                                    |                                                                                               |
| `progress-view`, `skeleton`, `status-indicator`                                                                                                       | `Progress`, `Skeleton`, `Spinner`          |                                                                                               |
| `keyboard-shortcut`                                                                                                                                   | `Kbd`                                      |                                                                                               |
| `breadcrumb`                                                                                                                                          | `Breadcrumb`                               |                                                                                               |
| `table`                                                                                                                                               | `Table`                                    | Wave 2                                                                                        |
| `date-picker`, `compact-date-picker`, `compact-time-picker`                                                                                           | `Calendar`, `Date Picker`                  | Wave 2. Three pieces become two                                                               |
| `sidebar`                                                                                                                                             | `Sidebar`                                  | Wave 2                                                                                        |
| `code-block`                                                                                                                                          | `Code Block`                               | Wave 3                                                                                        |
| `aspect-ratio`                                                                                                                                        | `Aspect Ratio`                             | Wave 2                                                                                        |
| `locale-switcher`, `conversation`, `stat-tile`, `swatch-picker`, `view-controller`, `morph`, `ambient`, `content-unavailable-view`, `labeled-content` | Leave core                                 | Keep what Pherus uses for a later `@passui/blocks`. `morph` becomes an optional Motion helper |

## Reference notes

HeroUI's useful ideas to borrow: slot based styling per part, and data attribute states. shadcn's: small readable files, named parts, and an obvious default. Konsta's: the exact iOS translucent blur, hairline border and active highlight classes. None of these are fetched or linked here.
