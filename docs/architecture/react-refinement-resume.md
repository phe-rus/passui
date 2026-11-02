# React and website refinement checkpoint

Updated 2026-11-02. Work on `main` in this checkout. The latest owner instruction
authorizes committing, pushing and publishing package releases. It supersedes the
previous release hold. Website deployment and consumer upgrades remain separate.

## Current structure

The supported runtime is React. Native controls live in `packages/ui`; shared
styles and tokens in `packages/tokens`; optional integrations in
`packages/tanstack`; setup tooling in `packages/cli`. Website code lives in
`www/src/{domains,routes,styles}` and tests in `www/test`.

The docs rail and command search use a flat alphabetical component list. They
share generated metadata without importing executable examples. Component family
groups remain useful on the catalog page, not as extra navigation folders.
`bun run docs:api` refreshes both API contracts and navigation metadata.

Use existing components and public subpath imports. CodeBlock owns code display
and line gutter styles. The website supplies lazy highlighting and formatting.
Checkbox appearance is `Toggle style="checkbox"`; do not duplicate it. Picker
selects from a list; ComboBox is editable and shares SearchList's keyboard engine.

## Interaction and weight

Stepper keeps its value beside two action segments. Decimal places use independent
rolling springs with carry propagation and Reduce Motion support. Picker and
anchored Popover animate their material separately from content. Source triggers
are restored when dismissal finishes. Keep shared placement and dismissal helpers.

Declaration builds clean `dist/types` before compilation. Archive validation
rejects website documentation and examples. Icon factory calls are marked pure
so consumers retain only used glyphs. CSS remains side effectful. Run
`bun run size:check` for reproducible consumer JavaScript budgets.

## Validation and continuation

Run root check, build, typecheck, tests, package archive checks and size checks.
The catalog completeness tests render all registered usage, showcase and example
scenes and compile independently generated snippets. Record release availability
against the public npm registry, not only a successful pack or push.

Use ChromeOS Chrome via `/usr/bin/garcon-url-handler` for visual checks. It is not
currently exposed to computer automation in this session. HTTP, SSR and unit
checks do not establish animation quality, hydration, touch behavior or actual
focus restoration in ChromeOS. Do not label those visually verified.

See [website refinement](website-refinement.md),
[component coverage](component-coverage.md) and [release procedure](../passui-release.md).
