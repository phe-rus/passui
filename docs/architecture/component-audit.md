# Component audit, 2026-11-13

Compared the pre-rebuild set (commit before `a2c1914`) with `packages/ui/src/components` and the since deleted `src/legacy`, then against the bencho.dev catalogue.

## Original components with no successor

| Original         | Status  | Action                                              |
| ---------------- | ------- | --------------------------------------------------- |
| secure-field     | missing | Add as `Input` password reveal (or `PasswordField`) |
| search-list      | missing | Rebuild on Command/Combobox                         |
| slosh-slider     | missing | Rebuild on Slider (bencho signature)                |
| status-indicator | missing | Add a dot variant of Badge                          |
| text-editor      | missing | Decide: keep out of Passui or port                  |
| view-controller  | missing | Decide: probably retire                             |

## Original components still in `legacy/`

None. `src/legacy/` was deleted once Code Block, Stepper, Wake Slider and Conversation were rebuilt in `src/components/`.

## Renamed, so covered

chip → Badge, combo-box → Combobox, divider → Separator, disclosure-group → Accordion, inline-disclosure → Collapsible, keyboard-shortcut → Kbd, menu → Dropdown Menu, one-time-code → Input OTP, picker → Select, profile-image → Avatar, progress-view → Progress and Spinner, section → List, tab-view → Tabs, text-field → Input and Textarea, toggle → Switch and Toggle, compact date/time pickers → Date Time Picker.

## Gaps against bencho.dev (worth having as components)

Hover Card, Carousel, Resizable Panels, Reorder List, Tree View, Copy Field, Avatar Group, Password Strength, Rolling Counter, Slide to Confirm, Pull to Refresh, Inline Confirm, Shimmer Text, Drag Stepper. Toast stack, Command bar, Jelly tabs (the glass lens in Tabs), Dropdown and One-time code already exist.

## Quality gaps

- Tests cover about 15 files for 52 components; most have no test.
- Reported `useMemoCache` null error and 200 MB+ memory: not reproduced in dev (see conversation); need component name, stack and build mode.
- Feel pass still to do: press scale and spring on every pressable, haptics, Reduce Motion, touch targets.
