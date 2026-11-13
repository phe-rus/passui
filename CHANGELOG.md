# Changelog

## @passui/react 0.2.0 and @passui/tanstack 0.3.0 (lean rebuild)

### Added since the last checkpoint

- `Text`: words in the type scale and the theme's roles, on any element.
- `Tabs` `tone` (`neutral`, `accent`, `primary`) and `Pagination` `size` and `tone`.
- `DateTimePicker` remade around month and year wheels, hour, minute and period wheels, and separate date and time chips. `Calendar` opens the wheels from its month title.
- `Sidebar` as `Sidebar`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem` and `SidebarMenuButton`; `Search Field` and `Table` are plain components, and `Search Field` no longer depends on `motion`.
- `Select` takes an `icon`, and lands the chosen option on the trigger's value where there is room; the water drop now works on all four sides and follows a flip.
- `Tab Bar` has an accent glass lens, `Labeled Content` an icon tile, `RadioGroup` an `aria-label` and `bare` items, and `Swatch Picker` is built on it.

### Changed

- `ContentUnavailableView` is `Empty`, `ViewController` is `Layout` (`Layout.Heading` keeps title and description together), and `LocaleSwitcher` is `Locales`, an in-flow language list on `Select`. `Locales` no longer takes `storageKey`.
- Docs: component pages are sections with Preview and Code tabs, every page has at least four examples, and the guides open each section with a hairline.

### Removed

- The whole `legacy/` tree is gone, including the old `Button`, `IconButton`, `Sheet`, `TextField`, `Code Block`, `Stepper`, `Wake Slider` and `Conversation` implementations. `Code Block`, `Stepper`, `Wake Slider` and `Conversation` are rebuilt in `components/` with the same props and subpaths; `IconButton` is now `Button` with an `icon` size and an `aria-label`. `@passui/react/legacy/*` no longer exists.
- `@passui/tanstack` 0.3.0 requires `@passui/react` `^0.2.0`.
- `@passui/icons` 0.1.1 is the first release published through CI trusted publishing; it has no code changes from 0.1.0.
- `@passui/icons` 0.1.0 is a new package with one entry point per icon, such as `@passui/icons/settings`.

- `CompactDatePicker`, `CompactTimePicker` and the legacy `Picker` and `Popover`: use `DateTimePicker`, `Popover` and `Select`.

- Add `Dialog` and `AlertDialog` at `@passui/react/dialog` and `@passui/react/alert-dialog`, built on Zag machines with CSS enter and exit transitions that reverse mid flight. Parts use shadcn names and triggers accept a `render` prop.
- Add `pageScale` (`topOffset` 26, `radius` 8, read from Vaul) to `@passui/tokens`.
- Add `Drawer` and `Sheet` at `@passui/react/drawer` and `@passui/react/sheet`, built on `@zag-js/drawer` with the Vaul curve over 500 ms, swipe to dismiss, snap points and nested drawers. `Sheet` takes a `side`. `Drawer` is a bottom sheet with a `DrawerHandle`.
- Page scaling behind a `Drawer` is opt in: put `data-passui-page` on your app root. Under reduced motion it is off.
- `Dialog`, `Sheet` and `Drawer` size themselves from `--visual-viewport-height`, so a focused input stays above the soft keyboard.
- Add `Popover`, `Tooltip` and `DropdownMenu` at `@passui/react/popover`, `@passui/react/tooltip` and `@passui/react/dropdown-menu`, built on `@zag-js/popover`, `@zag-js/tooltip` and `@zag-js/menu` with CSS enter and exit transitions. Tooltips open on hover and focus only. Dropdown menus have checkbox and radio items, groups, shortcuts, typeahead and submenus.
- Add the form set at `@passui/react/<name>`: `Field`, `Label`, `Input`, `InputGroup`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `Toggle`, `ToggleGroup`, `Slider`, `Select`, `Combobox`, `Command`, `InputOTP`, `SegmentedControl`.
- Add the display and navigation set: `Card`, `Badge`, `Avatar`, `Alert`, `Separator`, `Skeleton`, `Spinner`, `Kbd`, `Progress`, `Tabs`, `Accordion`, `Collapsible`, `Breadcrumb`, `Pagination`, `ButtonGroup` and `Toast` (`toast.success({ title })` with one `<Toaster />`).
- Add `@passui/icons`: 119 redrawn icons, one subpath each (`@passui/icons/home`), `tone="mono" | "duo"`, optional `animate` from `@passui/icons/styles.css`. `@passui/react` no longer depends on Hugeicons and `@passui/react/icons` is removed.
- **Removed, replaced components** (deleted outright, no deprecation period): see the table below. `@passui/react/legacy/*` entries no longer exist.
- `@passui/tanstack` uses the new components and takes `@passui/react` and `@passui/icons` as peers. `FieldInput` takes `label`, `description` and `icon`; `toast.success` now takes an options object.
- The docs site is rebuilt around Passui's own components. Guides stay at `/docs/<slug>`; components moved to `/docs/components/<slug>`. Props tables are read from the built `.d.ts`.
- The Biome and CI setup lists `@passui/icons`, and `publish.yml` publishes tokens, icons, react, then tanstack.

| Old                                           | New                                                                                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Dialog title=... open onOpenChange>`        | `<Dialog open onOpenChange><DialogContent><DialogHeader><DialogTitle>`                                                                                        |
| `<Sheet open onOpenChange title>`             | `<Sheet open onOpenChange side="bottom"><SheetContent><SheetHeader><SheetTitle>`. Use `Drawer` for a bottom sheet with a handle.                              |
| `confirmDialog({ title, destructive })`       | `<AlertDialog>` with `AlertDialogAction` and `AlertDialogCancel`. Hold the open state in your own component, since the new dialogs ship no imperative helper. |
| `Button`, `buttonStyle`, `IconButton`         | `Button` (`size="icon"`), `buttonVariants`                                                                                                                    |
| `Chip`                                        | `Badge`                                                                                                                                                       |
| `ProfileImage*`                               | `Avatar`, `AvatarImage`, `AvatarFallback`                                                                                                                     |
| `Section`                                     | `Card`, `CardHeader`, `CardContent`                                                                                                                           |
| `Divider`                                     | `Separator`                                                                                                                                                   |
| `Toggle style="checkbox"` / switch            | `Checkbox`, `Switch`, `Toggle`                                                                                                                                |
| `RadioGroup` (old props)                      | `RadioGroup`, `RadioGroupItem`                                                                                                                                |
| `TextField`, `SecureField`, `TextEditor`      | `Input`, `InputGroup`, `Textarea`                                                                                                                             |
| `OneTimeCode`                                 | `InputOTP`                                                                                                                                                    |
| `Picker`, `SearchList`, `ComboBox`            | `Select`, `Combobox`                                                                                                                                          |
| `Slider`, `SloshSlider`                       | `Slider`                                                                                                                                                      |
| `TabBar`, `TabView`                           | `Tabs`                                                                                                                                                        |
| `DisclosureGroup`, `InlineDisclosure`         | `Accordion`, `Collapsible`                                                                                                                                    |
| `Menu`                                        | `DropdownMenu`                                                                                                                                                |
| `Tooltip` host (`data-tooltip`)               | `Tooltip`, `TooltipTrigger`, `TooltipContent`                                                                                                                 |
| `Toaster` from `/toaster`, `toast("msg")`     | `Toaster` from `/toast`, `toast.success({ title })`                                                                                                           |
| `ProgressView`, `Skeleton`, `StatusIndicator` | `Progress`, `Skeleton`, `Badge` or `Spinner`                                                                                                                  |
| `KeyboardShortcut`                            | `Kbd`                                                                                                                                                         |
| `Breadcrumb` (old props)                      | `Breadcrumb` parts                                                                                                                                            |

## React 0.1.27, TanStack 0.2.7 and Tokens 0.1.3

- Add `size` prop to TextField: xs | sm | md (default) | lg. Each size controls height, padding, text token, and border radius. Uses `Omit<ComponentProps<"input">, "size">` to override the native HTML size attribute. SecureField inherits automatically.
- Add `className` passthrough to Toggle (both switch and checkbox styles), StatTile, SwatchPicker, and SegmentedControl — these components previously had no styling escape hatch.
- Add Button text truncation: `overflow-hidden` on button base + `min-w-0 truncate` on content span. Text can't break by default; truncates with ellipsis when width-constrained.
- Refine glass toward "sea glass" aesthetic: reduced brightness (1.05→1.0), reduced saturation (190%→150%), slightly more blur (12px→14px), softer specular, stronger grain texture (0.05→0.07 opacity). Less liquid, more frosted/satin.
- Fix anatomy table padding in www docs: px-3→px-4 (was eating text on sides), raw Tailwind sizes replaced with passui tokens.
- Add proper Content-Security-Policy to www server.ts (script-src, connect-src, style-src, img-src, font-src, frame-ancestors, base-uri, object-src).
- Clean up www vite config: removed redundant alias, added section comments.
- Add tokens package to CI auto-publish matrix (was only publishing ui and tanstack).

## React 0.1.24, TanStack 0.2.7 and Tokens 0.1.2

- Fix heading to paragraph spacing in ViewController: zero gap between a heading and the paragraph that follows it (was 8px), and reduced vertical air from 80px to 48px. Section separation now comes from the layout around the cluster, not the heading's own margin — Apple's pattern.
- Replace arbitrary Tailwind type sizes (text-sm, text-xs, text-base, text-3xl, text-4xl, text-xl, text-[10px], text-[11px], text-[13px]) with the matching passui Dynamic Type tokens across 10 files in packages/ui and packages/tanstack. The components no longer re-implement a type scale that passui's tokens already define.
- Wire the SF Pro Display optical-size family for the four large text utilities (text-large-title 34pt, text-title 28pt, text-title2 22pt, text-title3 20pt). The family was declared in typography.ts but never used because --font-heading aliased to --font-sans.
- Add a global base.css rule that kills browser default heading margins (h1..h6 { margin-block: 0 }) and adjacent sibling paragraph margins, making the zero-gap heading pattern the default across every app that imports @passui/react/styles.css.

## React 0.1.23

- Align floating field outlines with their backgrounds by giving the hidden legend and visible label explicit line heights. Prevent a raised background ledge in filled, focused and autofilled fields, including dark mode.

## React 0.1.22 and TanStack 0.2.6

- Refine LocaleSwitcher with a rounded globe trigger, native language names, selected checkmarks, keyboard navigation and an anchored popup whose text does not stretch during opening or closing. Preserve draggable corner positioning.
- Fade closing menu, popover and picker materials into their restored triggers instead of leaving an empty glass shape while the geometry spring settles. Preserve focus, dismissal and reduced motion behavior.
- Export LoadingIcon and update DefaultLoader with a centered spinning icon, reduced motion support and an optional translated accessible label without visible copy.

## React 0.1.21

- Add opt-in alphanumeric OneTimeCode entry for device authorization, with uppercase ASCII normalization, formatted paste, localized digit normalization and a native input ref. Numeric OTP behavior remains the default.
- Preserve caller autocomplete and accessibility descriptions alongside verification feedback. Document device-code usage with a source-backed example.
- Add Sheet `dismissOnOutsidePress` so authorization dialogs can ignore backdrop taps while retaining native Escape and focus management.

## React 0.1.20, TanStack 0.2.5 and CLI 0.2.2

- Align the React CLI templates and TanStack peer range with React 0.1.20. Shared tokens 0.1.1 precedes the dependent package releases.
- Simplify docs navigation and search into one compact alphabetical list, remove redundant category controls, and use the same order for adjacent pages.
- Add native ComboBox, RadioGroup, Breadcrumb, Skeleton, ContentUnavailableView, CodeBlock and KeyboardShortcut, with public types, usage and examples. The catalog now covers 55 families.
- Place Stepper's value beside two compact action segments; animate numeric places with interruptible carry springs and honor Reduce Motion.
- Correct Picker material bounds and Popover clipping and dismissal layers. Preserve placement, focus and shared source restoration.
- Separate navigation metadata and route validation from executable demos. Load copyable example source independently with loading and retry states.
- Move code gutters and presentation into Passui's imported styles. Mark icon factories pure, preserve CSS side effects, use Picker's React-only shared material spring and enforce consumer bundle budgets.
- Clean declaration output before builds and reject docs/example leakage from package archives. Remove stale unsupported runtime instructions and align React setup tooling.

- Add grouped Command and CommandDialog, including documentation search; compose searchable and creatable ComboBox from Picker.
- Share anchored surface geometry and exit lifetime across Picker and compact date/time controls, and remove inherited Breadcrumb padding.
- Add SloshSlider and WakeSlider with Bencho MIT attribution, OneTimeCode with one native input, and responsive AspectRatio crop examples.
- Refine ProgressView motion, liquid switches, rounded checkboxes, floating TextField labels and optionally expanding SearchField. Honor keyboard interaction and reduced motion.
- Generate validated numeric playground props and independently compile examples for every registered family.

## React 0.1.19 and tokens 0.1.1

- Publish explicit React declarations for every TypeScript entry point, preserving prop documentation, literal choices, and native refs for editor tooling. Runtime entries continue to expose source.
- Provide `@passui/react/icons` and migrate all public React examples and playground icon snippets to it. Add confirmed clipboard writes and a manual-copy fallback in the docs.
- Keep menu text unscaled while its material transforms from the trigger. Use damped, directional panel motion for popovers and pickers, and remove text scaling from sheets and confirmation dialogs. Honor Reduce Motion.
- Hide scrollbar chrome globally through shared base styles while preserving scrolling.
- Improve docs navigation with wider collapsible groups and header combobox search. Generate the actual React API reference, including callbacks, refs and compound parts, from source and check it for staleness. Document host setup separately from playground controls.

## Solid 0.1.0, TanStack 0.2.0, CLI 0.2.0 and React 0.1.15

- Add native Solid implementations and usage examples for all 35 documented component families, with shared tokens and native appearance providers.
- Add explicit React and Solid adapters to the single TanStack package, plus framework independent helpers under `/core`. Framework runtimes and adapters become optional peers in 0.2.0; existing unprefixed integration paths remain React defaults.
- Detect React or Solid in CLI init, support `--framework`, and generate Vite or TanStack Start starters for either framework. Generated Solid Vite configs compile source dependencies in development and SSR.
- Keep React as the default docs framework, with compact start aligned TabView navigation to native Solid examples and installation instructions.
- Add controlled selection and start alignment to TabView in both UI runtimes.

## UI 0.1.14

- Sheets render above animated page containers and navigation, retaining scoped appearance and focus isolation.
- Add ImportIcon for bringing existing files into an app.

## UI 0.1.13

- Keep menus visible during keyboard layout scroll adjustments; deliberate outside scrolling still dismisses them.
- Measure the current menu surface after its initial measurement element is replaced.

## UI 0.1.12

- Keep menus open and refit them when a keyboard resizes the visible viewport.
- Wide settings controls fill their row after moving below the label.

## UI 0.1.11

- Toolbar menus stretch across their action group before unfolding, then reverse on close.
- Settings rows wrap wide controls below readable labels.
- Neutral cards share a quiet inset edge in light and dark appearances.

## UI 0.1.10

- Menus: grow from the measured trigger and return to it, preserving source geometry and Reduce Motion.
- Materials: distinguish light surfaces with a quiet rim and soften dark specular edges.

## UI 0.1.9

- Scrolling: keep navigation expanded during programmatic positioning and calendar preparation.
- Minimize chrome only in response to scrolling gestures or navigation keys.

## UI 0.1.8

- TabBar: let apps opt into scroll minimization across platforms.
- Share the scroll minimization hook with app toolbars; ignore modal and popup scrolling.

## UI 0.1.7

- Materials: quieter rims and focus wells, neutral grounds with reflected accent.
- Scrolling: respect system scrollbars and provide a shared scroll surface utility.
- Viewports: share keyboard and visual viewport measurements across app shells and sheets.
- Sheets: focus the surface without opening a keyboard unless a child explicitly requests focus.

## UI 0.1.6

- UI: keep popovers and pickers within safe screen edges through one
  placement engine, with scrolling when space is limited.
- Appearance: tint the window ground with the selected accent and add
  a faint sea-salt grain to glass materials.
- Controls: slim focus rings while preserving keyboard focus visibility.

## UI 0.1.5

- UI: add `CompactTimePicker`, a time shown as a button that opens
  columns of hours and minutes, on the locale's 12 or 24 hour clock.
- UI: compact pickers share one anchored placement helper.

## UI 0.1.4

- UI: add `CompactDatePicker`, a date shown as a button that opens a
  month calendar, for dates picked from a calendar (events, invoices).
  Weeks start on the locale's first day; arrow keys, Page Up and Page
  Down move through days and months; optional dates can be removed.

## UI 0.1.3

- UI: guard keyboard navigation in `SearchList` and `TabView` against
  missing items, so apps compiling Hino's source with
  `noUncheckedIndexedAccess` typecheck cleanly.

## UI and TanStack integration 0.1.2

- UI: size TextField Show and Hide controls to their input, retaining
  a 44 pixel touch target on coarse pointers.
- Integration: use a row sized ghost copy button in `SettingList.Copy`
  and expose its size prop.
- Package tooling: use Vite+ lint, formatting and Vitest.

## Repository and website, 2026-10-15

- Develop Hino in its own checkout. Pherus consumes published packages.
- Generate a catalog driven sitemap and advertise it in robots.txt.
- Add page, website, breadcrumb and source project structured data.
- Normalize canonical URLs and keep previews and 404s out of indexing.
- Document standalone setup, architecture, validation, release and deployment.
