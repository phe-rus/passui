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

The owner explicitly requested the Codex in-app browser for this continuation,
overriding the normal ChromeOS browser convention. Browser checks cover the
compact playground, Accordion sizing/keyboard toggles, and Menu/Popover dismissal.
Do not extend that evidence to physical touch or every component. Stop the dev
server before website tests: temporary snippet tsconfigs trigger Vite reloads.

See [website refinement](website-refinement.md),
[component coverage](component-coverage.md) and [release procedure](../passui-release.md).

## Publication checkpoint

Source commits `86e3e92` and `9cf11a6` passed GitHub CI. Release versions are
committed in `1da2a82`: tokens 0.1.1, React 0.1.20, TanStack 0.2.5 and CLI 0.2.2.
Tokens 0.1.1 was published with Bun and verified against the public registry.
React, TanStack and CLI remain unpublished pending the current UI corrections.
The owner requires Bun for package operations, including publication. Bun browser
sign-in completed; credentials remain outside the repository.

The diagnostic tokens run [41432565370](https://github.com/phe-rus/passui/actions/runs/41432565370)
passed workspace validation and packing. GitHub issued an OIDC token (HTTP 200),
but npm rejected the package exchange (HTTP 404) with
`OIDC token exchange error - package not found`. The generic final error is
ENEEDAUTH. The owner has been asked to verify the package trusted publisher:
owner `phe-rus`, repository `passui`, workflow `publish.yml`, environment
`npm-publish`. Local Bun publication succeeded independently of that CI blocker.
Publish React, TanStack and CLI in order after verification, checking exact
registry versions. The existing CI workflow still uses npm for OIDC publication;
it has not yet been migrated to Bun-only publishing.

Final local evidence: 299 tests pass (104 UI, 160 website, 13 tokens, 7 TanStack,
15 CLI); checks, production build, typechecks, archive exports and size budgets
pass. All 323 dev HTTP checks passed, including every registered preview scene
and component page. Dev is running on 0.0.0.0:3004. ChromeOS was opened through
its URL handler, but no controlled ChromeOS browser surface is exposed. Browser
interaction and motion verification remains open; the website was not deployed.

## Compact playground and disclosure correction

The playground uses one toolbar: Preview/Code, viewport icons, options, reset and
share. Settings and props live in a native Sheet. Switching Code keeps the preview
mounted. Accordion composes DisclosureGroup with auto-height native Button rows,
full-width content and one clipped outer surface. Row hover has no independent
corner radius; examples cap their width without shrinking the native control.

Menu dismissal previously left its material mounted and its trigger invisible.
Its radius spring mixed a number with a CSS variable. Menu and anchored Popover
now animate resolved numeric geometry. The menu measurement container stays stable;
only the material mounts after measurement. The menu expands from the trigger's
bounds, and its panel suppresses the global accent focus outline while keeping
item focus feedback and the neutral glass rim. Browser checks confirmed Escape,
outside click, action selection, reopening, removed panels and restored triggers.

Batch validation: 109 UI and 161 website tests pass, with the unchanged token,
TanStack and CLI suites passing through root tasks. An unrestricted root run hit
two website test timeouts under concurrent builds; the website rerun with
`--maxWorkers=2` passed all 161 tests. Root check, production build, typecheck,
package archive/export validation and bundle budgets pass. Existing lazy grammar
chunk and CSS sourcemap build warnings remain. The website is not deployed.
