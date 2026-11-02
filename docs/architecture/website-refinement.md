# Website refinement audit

Audited on 2026-11-02 against the clean `main` checkout. Scope: all website
routes, domain views, 42 registered React families, example sources, settings,
preview messaging, generated API contracts, guides, AI endpoints and SEO.

## Verified defects and batches

1. **Structure and navigation:** application domains/styles lived beside `src`,
   while routes lived inside it. Catalog insertion order disagreed with the
   grouped sidebar; component previous/next navigation was absent. Sidebar
   links forced content-sized targets and most groups defaulted closed.
   Move code under `src`, align tooling/instructions, extract navigation, use
   a stable grouped order and expose component pagination.
2. **Documentation and examples:** compact date/time pickers had no additional
   examples. Dialog, Sheet and Popover snippets held `open=false` without a
   trigger. Stepper's generated snippet omitted its demonstrated bounds.
   Native HTML tables/fields duplicated existing Passui controls. Strengthen
   catalog coverage and executable snippet checks, add examples and use the
   public components throughout website views.
3. **Playground reliability:** the highlighter could display old code after
   props changed and had no rejected-import fallback. Size reporting assumed
   border-box observations always exist; showcase content was not observed.
   Unknown select values could match inherited object properties. Add bounded
   message validation, current-code fallback and resilient measurements.
4. **Landing and shell:** several visible demo buttons had no actions; the
   teaser lacked a link to the full playground and copyable highlighted code.
   The component count was stale. Continuous motion had no explicit pause,
   keyboard focus did not pause the marquee, and the accent timer did not react
   to preference changes. Add native controls and working local demo behavior,
   clear navigation, skip navigation and reduced-motion handling.

## Existing behavior retained

TanStack Start route structure and query-setting retention; canonical React
URLs and legacy component aliases; native SearchList command search in a Sheet;
clipboard manual-copy fallback; origin/source validation on preview messages;
lazy Prettier/Shiki; source-derived API references; sitemap/robots generation;
preview/404 noindex headers and same-origin preview embedding.

## Evidence boundary

Use the test/build results recorded at completion. Connected computer inventory
returned no apps or browsers, so desktop/mobile touch, focus, animation and visual
quality have no browser evidence in this environment. HTTP and server rendering
are complementary checks, not substitutes for those interactions.

## Refinement completed

- Moved application domains and styles into `www/src`, updated aliases, source
  scanning, API generation, fixture paths and contributor instructions.
- Sidebar hierarchy is Getting started → guides and Components → Overview →
  native DisclosureGroup categories → native Sidebar rows. Human-title ordering
  is shared with the overview, search and component previous/next links. Mobile
  and desktop share the same navigation and active-row scroller handling.
- Added four compact-picker examples; every family now has usage, showcase and
  at least two additional examples with prose. Generated snippets include
  required boolean/select defaults, usable overlay triggers, anchors, bounds,
  public imports and native stateful tab search. Snippets compile independently
  against public package exports across control choices.
- Documentation tables, clipboard fallback, landing fields, playback progress
  and profile initials now use existing native Passui components. An AST check
  rejects raw JSX replacements where those public components exist.
- Corrected stale highlighting and failure fallback, explicit code appearance,
  malformed select values, bounded preview measurements, platform remount sizing,
  iframe readiness after reload and full reset of local playground state.
- Isolated full-screen/floating demos so their headings and positioning stay in
  the iframe. Added typed usage/example scenes and missing-example validation.
- Legacy component links preserve settings, props and anchors; unknown slugs
  remain 404. Copy for AI includes actual API contracts and required host setup;
  both generated indexes link to all component pages.
- Added a skip link and removed the nested main landmark. Landing CTAs open the
  intended guide/catalog; the teaser links to the full playground and offers
  copyable code. Previously inert landing actions now update local demo state.
- Added pause/resume for continuous landing animations, focus pause for the
  marquee, responsive reduced-motion preference handling and background-tab
  suspension for accent cycling. Fixed search dropdown dismissal by focus scope.

## Release boundary

Owner explicitly requested commit and push to `main`, with **no release yet**.
No npm publication or website deployment belongs to this continuation. The
pre-existing server on port 3004 was preserved; production HTTP checks use the
separate local preview on 3014. Connected browser inventory remains empty, so
visual quality, client hydration, keyboard focus and mobile touch remain a
browser verification boundary even when SSR, unit tests and builds pass.

## Final observed validation

- Website: 143 tests across 18 files passed. Includes all 42 families, usage,
  showcase, additional examples, every control choice, independent snippet
  typechecks, native JSX control enforcement, sidebar hierarchy, redirect
  retention, preview protocol, generated API coverage and SEO.
- Repository `bun run test`: all 8 tasks passed (some package results cached).
  Repository `bun run typecheck`: all 9 tasks passed. Repository `bun run build`:
  all 5 tasks passed, including the production website and declaration builds.
- Repository `bun run check`: passed; two existing unused-parameter warnings in
  CLI templates remain. The production build retains its existing CSS plugin
  sourcemap warning. No dependency versions were changed.
- Fresh production preview: 279 HTTP checks passed. Covers 49 public HTML pages,
  all component/usage/showcase/example preview scenes, explicit preview appearance,
  sitemap/robots, both AI endpoints and invalid page/example routes. Checked
  canonical coverage, document landmarks, component sections and preview headers.
- ChromeOS Chrome inventory was checked twice and remained empty. No browser
  hydration, mobile touch, focus-restoration or visual-animation claim is made.
- Generated route trees and Worker types remain untracked. The original local
  server was left intact. Package publication and website deployment were not run.

The final 143-test website run was repeated outside the sandbox so the snippet
consumer test could actually spawn TypeScript; it passed. Compiler spawn failures
now fail that test explicitly. The publishing workflow currently follows a
successful Passui CI run on `main`; the final push uses `[skip ci]` to honor the
owner's no-release instruction without changing release automation. Local checks
are the evidence for this push, not a new CI run.

`bun run publish:check` also passed: all four package archives and export targets
were verified locally. This packs/checks files; it does not publish anything.

## 2026-11-02 follow-up

- Added the native React Accordion with a public package subpath, accessible
  single-open sections, reduced-motion reveals, two examples and catalog prose.
- The docs sidebar now uses Accordion for its component categories and removes
  the redundant Overview row. The `/components` catalog page remains available
  from the main navigation, and search no longer duplicates it as a guide.
- Theme, Platform and Viewport use compact Pickers; Accent remains a swatch row.
  Picker and Popover surfaces use the shared menu geometry reveal and restore
  their triggers after dismissal. Popover callers opt in with `anchorRef`.
- Confirmation dialogs resolve once and wait for the outgoing card to finish
  exiting before showing the next queued request. Stepper digits animate by
  place, preserve localized spoken output and honor reduced motion.
- The example source loader uses a recursive glob so nested component families
  such as IconButton and Accordion show their source correctly.
- Repository tests passed: 95 UI tests and 146 website tests. Root typecheck,
  production build and `bun run check` passed. The existing CLI parameter
  warnings and CSS sourcemap warning remain.
- Local routes for `/components` and the Accordion, Stepper and Popover docs
  returned HTTP 200. ChromeOS Chrome was unavailable, so browser animation,
  keyboard and touch behavior remain unverified. No package release or website
  deployment was run.
