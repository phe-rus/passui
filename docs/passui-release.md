# Passui release manifest, approved and in progress

The owner approved the complete release manifest on October 25, 2026.
Phase A is complete locally and Phase B prepared the targets below. Phase C
is now in progress, with authentication and CI verification required before
publication or deployment. Actual release results will be recorded below.
Solid development and broader documentation work resume after the release
is verified, one tested stage at a time.

## Release targets

| Target | Version or action |
| --- | --- |
| GitHub | `phe-rus/passui`, already renamed and accessible |
| `@passui/tokens` | `0.1.0`, publish first |
| `@passui/react` | `0.1.14`, publish after tokens |
| `@passui/tanstack` | `0.1.2`, publish after React |
| `@passui/cli` | `0.1.1`, templates match these package versions |
| `@passui/solid` | Unpublished; marked private and excluded from the publishing workflow |
| New website | Worker `passui`, custom domain `passui.pherus.org` |
| Old website | Existing Worker `hino`, custom domain `hino.pherus.org`, convert to redirects only after the new site is verified |

The workflow input `ui` maps to `@passui/react` in `packages/ui`.
The other production inputs are `tokens`, `tanstack` and `cli`.
Package archives contain explicit source exports. The CLI archive includes
only `dist/passui.js`, excluding any stale generated Hino executable.

## Local validation on October 25, 2026

All 117 tests pass: React 59, shared tokens 13, Solid foundation 3,
TanStack 2, CLI 15 and website 25. The five added checks cover the actual
rendered animated wordmark and the proposed legacy redirect behavior.
The wordmark check failed with visible `hino` before the correction and
passes with visible `passui`, including its decorative dotless i.

Workspace typechecks, Biome lint and formatting, frozen Bun installation,
Turbo builds, the documentation production build, and all five package
archive checks pass. Main website and legacy redirect deployment dry runs
are performed locally; neither command deploys anything. The website build
retains nonblocking large-chunk and CSS sourcemap warnings.

The Codex browser was used at desktop 1440 × 1000, tablet 768 × 1024 and
mobile 390 × 844. Screenshots and direct interaction checks covered the
hero, navigation, installation, component documentation, iframe preview,
light and dark preview themes, pending states, mobile menus and docs
drawers, footer, missing-component page and general 404 page. A standalone
preview save completed and displayed the `Project saved` toast after the
page finished loading. No console or hydration errors were observed in
these browser checks. This is a browser smoke check, not exhaustive testing
of every component or device.

The rendered metadata audit verified Passui titles, descriptions, Open
Graph and Twitter values, structured data, GitHub URLs and canonical URLs.
A missing root title on general 404 pages was fixed with branded fallback
metadata. Normal pages still have exactly one description and canonical;
unknown pages have no invented canonical. Favicons retain the original
sun artwork, preserving the visual identity. Historical Hino references
remain explicitly identified in dated milestones and migration guidance.

Run `bun run --cwd www dev` and inspect `http://localhost:3004`.
Local evidence, screenshots and a working-tree backup are stored under
`/tmp/passui-review/`; this temporary folder is not a long-term backup.

## GitHub preflight

The repository already resolves to `phe-rus/passui` with the same ID
`1418294672`; admin permissions were verified. Its branches are `main`
and `viteplus`. The tags endpoint returned no tags. No branch, tag or
history was changed. The local remote now points to
`git@github.com:phe-rus/passui.git`. A source snapshot and binary Git diff
were saved before that local configuration update.

The latest existing remote CI run failed at typecheck on the DOM versus
Cloudflare `Element.append` conflict in `sheet-portal.tsx`. The local
migration fixes that call with `appendChild`; local typechecks pass.
The new workflow cannot be verified on GitHub until the local changes
are committed and pushed after approval.

## npm preflight blocker

The owner has confirmed npm account `laniina`, organization `passui`,
role owner. This machine's authentication is unavailable: both the npm
whoami and organization-membership probes returned HTTP 401. No token was
printed. npm publishing is stopped until valid authentication is restored.
The target package names returned registry HTTP 404 during preparation;
verify availability and versions again immediately before publication.

Each production package needs a trusted publisher matching
`phe-rus/passui`, `publish.yml`, environment `npm-publish`. Those registry
settings remain unverified without npm authentication. The prepared
workflow uses job-scoped OIDC, Bun archives and no stored npm token.
Never overwrite existing versions or unpublish the old Hino packages.

## Cloudflare preflight

OAuth authentication is available for the Pherus account. The API confirms
Worker `hino` and custom domain `hino.pherus.org`, domain ID
`3187135f8b9cbc8185154347f969663d60f725bf`, in zone
`e4aa30cae6b0e72cdd142d133a5454c3`. The only binding is the existing
`NODE_ENV` text variable. There are no matching ordinary Worker routes.
No `passui` Worker or `passui.pherus.org` Worker custom domain exists yet.

DNS record reads for both exact hostnames returned HTTP 403. DNS contents
and possible record conflicts must therefore be verified before deploying.
No DNS deletion is included in this manifest. No unrelated Worker, route,
binding, record or storage resource may be changed.

`www/wrangler.jsonc` prepares the new Passui website. The separate
`www/wrangler.legacy.jsonc` prepares a later update of the existing `hino`
Worker, using `legacy-redirect.ts`. It issues permanent 308 redirects to
`https://passui.pherus.org`, preserves paths and queries, and maps the old
`/skills/hino/SKILL.md` endpoint to `/skills/passui/SKILL.md`. It does not
create another legacy Worker or delete the old hostname. Both configs
retain the existing compatibility date, runtime flags and `NODE_ENV`.

## Approved execution sequence

After approval and resolution of the authentication and DNS inspection
blockers, preserve the current source, commit and normally push the local
migration, and require green GitHub CI. Configure and verify trusted
publishing, then publish the four production packages in the order above.
Verify each released package can be installed and its exports resolved.

Deploy the new Passui Worker. Use the browser to verify production routes,
assets, interactive behavior, hydration, metadata, installation commands,
sitemap, robots and llms. Only then deploy the prepared redirect to the
existing `hino` Worker and verify old links. Keep a rollback reference to
the existing Hino deployment before changing it. Do not delete DNS records
or any Worker as part of this cutover.

Record actual release versions, CI URLs and deployment IDs here. After
production verification, begin the native Solid appearance foundation as
one reviewable stage. Keep Solid private until its native components are
ready, and document only APIs that exist.
