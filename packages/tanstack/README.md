# @passui/tanstack

Optional TanStack Form, Query, Table and Router integrations for Passui.
This package provides React adapters and runtime-independent shared helpers.

## React

```bash
bunx @passui/cli@latest init --framework react --integration tanstack
```

```css
@import "@passui/tanstack/react/styles.css";
```

React exports use `/react/forms`, `/react/form-fields`, `/react/mutation`,
`/react/tables`, `/react/document`, `/react/auth-shell`, `/react/settings`
and `/react/route-boundary`. Existing unprefixed paths, such as `/forms`,
remain React defaults. Existing `/styles.css` also remains available.

Framework dependencies are optional peers. The CLI installs the appropriate peers
while preserving existing versions. Manual React setups must install the
React TanStack adapters they use; `/document` also imports TanStack React
devtools and their Query and Router panels. See package.json for supported
peer ranges.

## Shared core

`@passui/tanstack/core` exports framework independent table helpers and
`shouldRestoreOptimisticSnapshot`. Both mutation adapters preserve newer
concurrent cache writes when an older optimistic request fails.

The UI packages remain independent of this optional integration. Put
framework Scripts in ComposeViewport.Window's `after` slot, outside main.
Credentials stay outside this repository. Releases use the repository's
`publish.yml` workflow and the `npm-publish` environment with npm OIDC.

MIT.
