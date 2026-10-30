# React refinement checkpoint

Approved in conversation on 2026-10-31. Work in this checkout, not Pass.
Base: main at 3ed13e1. Owner authorized committing and pushing this checkpoint
and current changes. No release or deployment. Publishing follows successful CI
on main; this checkpoint commit uses [skip ci] to avoid that automatic path.

## Read budget

Start with git status and this checkpoint. Read only the current slice's source
and nearest instructions. Reuse this decision record and existing registry.
Do not repeat the migration audit, dump whole folders, or rerun passing checks
without a change or unresolved failure. Format changed TSX with Biome.
Owner feedback: keep tool output and updates very short. No scrollbar chrome
anywhere in Passui; shared base CSS enforces this while preserving scrolling.
No sidebar search. Header search now uses native SearchList as a command-style
combobox dialog with keyboard navigation and Ctrl/Cmd K. Sidebar is 256px on
medium screens and 288px on large screens, with quieter rows, leading chevrons,
subtle group rails, and no counts. Category groups retain gap-1.

## Agreed direction

Preserve Passui's native controls, appearance and SwiftUI naming conventions.
Improve React type discovery and icon imports, then establish one menu motion
reference before applying its language to other surfaces. Material should grow
from its source, have weight and settle smoothly, without distorting text.
Bencho is a behavioral reference, not a source to copy. Haptics remain selective,
app controlled and separate from sound. Respect Reduce Motion.

## Present in the working tree

* Public React icons entry, named props and hover guidance for common controls.
  Picker and segmented callbacks preserve their value generic. Broader string
  state remains supported; explicit literal unions retain bounded choices.
* Button and menu toolbar examples use public Passui icon imports.
* Docs categories now separate controls, layout/disclosure, navigation,
  presentation, feedback, content and compositions. Search finds API and human
  names. Sidebar groups collapse, persist preferences, and reveal the active page.
* Installation, anatomy, practices and accessibility fold independently.
* Menu material animates its own position, bounds and radius with spring.smooth;
  menu text remains unscaled. Opening/dismissal share the source rectangle.
  Existing placement, source concealment and keyboard handling remain in place.
* copyText confirms actual writes. Code/AI copy actions offer manual selection
  in a Sheet on failure. Previously fake link-copy demos now write real links.

## Validation boundary and next work

Record final observed checks below before handing off. Local dev runs on 3004.
Observed: React typecheck passed; React tests 64/64 and website tests 37/37
passed. Website production build passed with a CSS sourcemap warning. Biome
checked the initial 49 changed/new TypeScript and manifest files without diagnostics.
Final website tsc check passed after the navigation edits; local docs returned
HTTP 200. After the header search/sidebar correction, website tsc and focused
Biome checks passed; shared token tests passed 13/13. Dev remains on port 3004.
ChromeOS Chrome is not available through current computer automation (empty
browser inventory). HTTP success, tests and builds do not prove hydration,
editor completions, animation quality, touch behavior or cross-app clipboard.

Review /components/react/context-menu#examples (toolbar More), the sidebar,
and code/AI copy into another app. Visual feedback has been requested in chat.
Do not propagate the menu motion until its visual direction has been reviewed.
Then refine Popover/pickers/sheets/dialogs through their own placement and focus
contracts. Shared base CSS now hides scrollbar chrome for both runtimes at the
owner's explicit request. Other runtime changes in this slice are React only.

Remaining: complete icon example migration beyond buttons; improve full API
reference beyond playground controls; dedicated hook/host setup guidance; verify
editor completions in an actual consuming app and a packed package.

## Component gaps, preliminary assessment

React has no dedicated Slider, Stepper, ProgressView or Divider component in its
current component tree. These are candidates to specify next, not implemented
or promised as a complete SwiftUI inventory. A declarative Menu could wrap the
existing openMenu/ContextMenuHost behavior rather than introduce another engine.
Assess DisclosureGroup against InlineDisclosure before adding overlapping APIs.
