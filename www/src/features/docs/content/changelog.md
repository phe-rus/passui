---

title: Changelog
summary: What changed in each release of Passui.
section: sections
order: 8
---

The full history lives in [`CHANGELOG.md`](https://github.com/phe-rus/passui/blob/main/CHANGELOG.md) in the repository. This is the short version of the current rebuild.

## 0.3.1

- `DateTimePicker` and `Calendar` polished to the iOS look: shared wheel bands, exact row centring, no table lines, aligned weekdays.

## 0.3.0

- `Progress` has `wake` and `slosh` variants and sizes, replacing the separate Wake and Slosh sliders.
- New `Switch` sizes, tones and a `liquid` variant; `Tab Bar` with a gliding lens, `autoMinimize` and a four and one layout; floating label `Input` and `Textarea`; an expanding `Search Field` with a glass variant; `AccentPicker`; built in haptics.

## 0.2.0, the lean rebuild

- Every component is rebuilt on Zag.js state machines where behaviour is hard, and on native elements where it is not. One subpath per component, so you pay only for what you import.
- New overlays: `Dialog`, `AlertDialog`, `Drawer`, `Sheet`, `Popover`, `Tooltip` and `DropdownMenu`, with CSS enter and exit transitions that reverse mid flight.
- New form set: `Field`, `Input`, `InputGroup`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `Toggle`, `ToggleGroup`, `Slider`, `Select`, `Combobox`, `Command`, `InputOTP` and `SegmentedControl`.
- `@passui/icons`: 119 redrawn icons, one subpath each, in `mono` and `duo` tones.
- Controls follow one compact size scale: 26, 30, 34 and 38 px.
- `@passui/tanstack` uses the new components and takes `@passui/react` and `@passui/icons` as peers.
- The docs moved to `/docs/components/<slug>`, with props read from the built type declarations.

Old components were removed outright with no deprecation period. The repository changelog has the old to new table.
