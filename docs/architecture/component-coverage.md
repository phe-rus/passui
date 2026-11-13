# Component coverage and naming

The documentation uses shadcn's direct alphabetical navigation as a reference,
while retaining Passui's native implementation and SwiftUI names where a matching
concept exists. References: [shadcn components](https://ui.shadcn.com/docs/components),
[Apple menus](https://developer.apple.com/design/human-interface-guidelines/menus),
[Apple motion](https://developer.apple.com/design/human-interface-guidelines/motion),
[Apple steppers](https://developer.apple.com/design/human-interface-guidelines/steppers).

## Equivalent concepts

| Common documentation name | Passui API                                                              |
| ------------------------- | ----------------------------------------------------------------------- |
| Alert dialog              | confirmDialog and DialogHost                                            |
| Avatar                    | ProfileImage                                                            |
| Badge                     | Chip                                                                    |
| Calendar                  | DateTimePicker (date, time, range); DatePicker for segmented date entry |
| Card and settings group   | Section and ContentView                                                 |
| Checkbox and switch       | Toggle with checkbox or switch style                                    |
| Collapsible               | DisclosureGroup and InlineDisclosure                                    |
| Command                   | Command and CommandDialog, composed from SearchList and Sheet           |
| Combobox                  | ComboBox                                                                |
| Context menu              | useContextMenu and ContextMenuHost                                      |
| Dialog and drawer         | Sheet, plus confirmDialog for focused decisions                         |
| Dropdown and select       | Menu and Picker                                                         |
| Empty                     | Empty                                                                   |
| Input and textarea        | TextField, SecureField and TextEditor                                   |
| Input group               | LabeledContent with native controls                                     |
| Kbd                       | KeyboardShortcut                                                        |
| Menubar                   | App toolbar composed from Menu and Button                               |
| Popover                   | Popover                                                                 |
| Progress                  | ProgressView                                                            |
| Radio group               | RadioGroup                                                              |
| Scroll area               | Native overflow layout, with shared hidden scrollbar chrome             |
| Separator                 | Divider                                                                 |
| Sidebar                   | Sidebar primitives                                                      |
| Slider and seeker         | Slider, SloshSlider and WakeSlider                                      |
| Input OTP                 | OneTimeCode                                                             |
| Aspect ratio              | AspectRatio                                                             |
| Sonner                    | toast and Toaster                                                       |
| Spinner                   | ProgressView or Button pending state                                    |
| Table and data table      | Table and optional TanStack integration                                 |
| Tabs                      | TabView and TabBar                                                      |
| Toggle group              | SegmentedControl                                                        |
| Typography                | Shared text roles and typeset stylesheet                                |

Accordion, Breadcrumb, Skeleton and Tooltip have their own native APIs. CodeBlock
provides numbered source presentation without bundling a syntax highlighter.

## Deliberate boundaries

The catalog is not a claim of one to one parity with shadcn. Charting, carousels,
resizable workspaces, command editors, AI chat tools, specialized file browsers,
application specific dashboards are not implemented as standalone
Passui components. Compose app navigation and pagination with native Button links;
there is no standalone Pagination component. These are visible coverage gaps,
not APIs silently substituted with documentation aliases.

The current registry has 55 documented families, each with usage, showcase and at
least two examples. `www/test/catalog-completeness.test.tsx`, registry tests and
snippet compilation enforce coverage. This inventory does not establish browser,
screen reader or physical device verification.
