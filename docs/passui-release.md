# Passui package releases

The owner authorized the current React refinement release on 2026-11-02. Package
publication is separate from deploying the website or upgrading consumer apps.
The supported packages are tokens, React, optional TanStack integrations and CLI.

## Procedure

1. Validate `bun run check`, `bun run build`, `bun run typecheck`, `bun run test`,
   `bun run publish:check` and `bun run size:check` on `main`.
2. Record changes and bump only the packages being published. Keep dependency
   versions aligned and import consumer styles once through the public stylesheet.
3. Push coherent commits without force pushing. Publish tokens before React,
   then dependent TanStack integrations and CLI templates.
4. Use the existing `Publish Passui packages` workflow. Its manual inputs are
   `tokens`, `ui`, `tanstack` and `cli`. It packs with Bun and publishes through
   npm OIDC in the `npm-publish` GitHub environment. No npm token is required.
5. Check the workflow result and the exact version's registry metadata. Verify
   packed export files and dependency ranges before reporting availability.

A successful push is not a completed release. Existing npm versions cannot be
overwritten. The automatic workflow checks React and TanStack versions after
successful main CI; unchanged versions are skipped. Stage version commits when
ordering dependent releases so that React is available before TanStack.

Release evidence and exact versions are reported in the completion message.
See [Contributing](../CONTRIBUTING.md) for website deployment and
[the current checkpoint](architecture/react-refinement-resume.md) for validation
boundaries. Historical releases remain in [CHANGELOG.md](../CHANGELOG.md).

The OIDC job does not set setup-node registry-url, which can insert a placeholder
auth token. Package publishConfig and the publish command name npm explicitly.
If OIDC returns E404, verify each package trusted publisher matches repository
`phe-rus/passui`, workflow `publish.yml` and environment `npm-publish`.

## Current release state, 2026-11-03

Prepared versions: tokens 0.1.1, React 0.1.20, TanStack 0.2.5 and CLI 0.2.2.
Tokens 0.1.1 is public, verified against exact registry metadata. React 0.1.20 and TanStack 0.2.5 are public with exact registry metadata and
archive shasums verified. CLI 0.2.2 is also public; its registry shasum matches the Bun-packed archive. Refinement commit `c5f0f60` is pushed to main and
passes 326 tests, root checks, build, typecheck, archive/export and size checks.
Owner authenticator approval completed. All package publication commands used
Bun, preserving dependency order.

The [tokens diagnostic run](https://github.com/phe-rus/passui/actions/runs/41432565370)
passed validation and packing, obtained a GitHub OIDC token, and failed npm token
exchange with HTTP 404, `OIDC token exchange error - package not found`.
Local Bun publication succeeds independently of that CI blocker. The owner
requires Bun-only package operations; the existing CI OIDC publish workflow still
uses npm and has not been migrated. No website deployment ran.

## Production website deployment, 2026-11-03

Deployed source commit `d0d35b7` with `bun run --cwd www deploy` to the existing
`passui` Worker at https://passui.pherus.org. Cloudflare activated version
`a302d01b-2abc-4377-87e5-dbeeeb6b5d4f`. The production build passed.

Live HTTP checks covered 63 routes: all 55 registered component pages, home,
introduction, installation, catalog, sitemap, robots, Command preview and an
invalid route. Expected statuses, Command canonical/title/API/example markup,
sitemap inclusion/exclusion, preview embedding policy and preview/404 noindex
headers passed. Codex-browser command search filtered WakeSlider and navigated
to its live documentation using Enter. This does not establish physical touch
or every interaction across browsers. Existing build warnings remain unchanged.
