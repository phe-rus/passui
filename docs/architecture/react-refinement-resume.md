# React refinement checkpoint

Approved in conversation on 2026-10-31. Work in this checkout, not Pass.
Initial base: 3ed13e1. Resumed from clean 704741f after intervening icon,
Popover fit, compact docs, and workspace commits. Owner now authorizes completing
the refinement, pushing releases, waiting for registry availability, and then
upgrading Pass. This supersedes the earlier no-release/[skip ci] instruction.
Package targets: @passui/tokens 0.1.1, then @passui/react 0.1.19. Website and
Pass deployments remain separate from package publication.

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

Completed in this continuation: all React examples and icon snippets now use
public Passui icons. All 36 React API families are extracted from source, with
literal choices, callbacks, refs, native contracts, and compound parts. Host
setup is documented separately. Root check rejects stale generated API metadata.
React now packs explicit declaration exports. The external archive consumer at
/tmp/passui-consumer.ibLSY5 passed TypeScript 5.9.3 checks and SSR; its language
service verified variant/size completions, prop hover docs, and icon imports.
Popovers and pickers share damped directional motion; sheets and confirmation
dialogs keep text unscaled. Confirmation dialogs explicitly honor Reduce Motion.

Release checks observed: all workspace builds/typechecks/checks passed, 252
tests passed, Solid coverage 36/36, and all five package archives/exports passed.
API literal-choice coverage was then checked separately. Run checks for any new
changes before release. Registry publication and the Pass upgrade are pending.
Preserve the existing visual/editor evidence boundaries above; language-service
verification is not a screenshot or a physical-device motion review.

## Component gaps, preliminary assessment

React has no dedicated Slider, Stepper, ProgressView or Divider component in its
current component tree. These are candidates to specify next, not implemented
or promised as a complete SwiftUI inventory. A declarative Menu could wrap the
existing openMenu/ContextMenuHost behavior rather than introduce another engine.
Assess DisclosureGroup against InlineDisclosure before adding overlapping APIs.
