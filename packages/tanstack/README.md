# @passui/tanstack

Optional TanStack Form, Query, Table and Router integrations for Passui.
One package supports native React and native SolidJS through separate
entry points. Shared helpers have no UI runtime dependency.

## SolidJS

```bash
bunx @passui/cli@latest init --framework solid --integration tanstack
# Manual alternative
bun add @passui/solid @passui/tanstack solid-js tailwindcss @tanstack/solid-form @tanstack/solid-query @tanstack/solid-router @tanstack/solid-table
```

```css
@import "@passui/tanstack/solid/styles.css";
```

```ts
import { createAppForm } from "@passui/tanstack/solid/forms"
import { createAppMutation } from "@passui/tanstack/solid/mutation"
import { DataTable, selectColumn } from "@passui/tanstack/solid/tables"
import { ComposeViewport } from "@passui/tanstack/solid/document"
import { AuthShell } from "@passui/tanstack/solid/auth-shell"
import { SettingList } from "@passui/tanstack/solid/settings"
import { DefaultBoundary, DefaultLoader, NotFound } from "@passui/tanstack/solid/route-boundary"
```

Solid form and mutation options are accessors: `createAppForm(() => ({
defaultValues, onSubmit }))` and `createAppMutation(() => ({ mutationFn }))`.
`useAppForm` and `useAppMutation` aliases are also exported. Field contexts
return an accessor; use `field().state.value`. Bound fields include input,
checkbox, textarea, switch, radioCard, multiselect, avatar and otp.
Mount Solid QueryClientProvider around mutation consumers.

Use SolidJS 1.9.17+ and compile this package's TSX through Solid. In Vite 8,
exclude `@passui/solid` and `@passui/tanstack` from `optimizeDeps`, include
`solid` in `resolve.conditions`, and put both packages plus
`/@tanstack\/solid-/` in `ssr.noExternal`. SSR conditions should include
`solid`, `module`, `node` and `development|production`. This compiles the
Solid framework source for the right server runtime. See the complete
config in `@passui/solid`'s README or use the generated starter.

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

Starting at 0.2.0, framework dependencies are optional peers rather than
mandatory React dependencies. The CLI installs the appropriate peers
while preserving existing versions. Manual React setups must install the
React TanStack adapters they use; `/document` also imports TanStack React
devtools and their Query and Router panels. See package.json for supported
peer ranges. Solid consumers do not need React packages.

## Shared core

`@passui/tanstack/core` exports framework independent table helpers and
`shouldRestoreOptimisticSnapshot`. Both mutation adapters preserve newer
concurrent cache writes when an older optimistic request fails.

The UI packages remain independent of this optional integration. Put
framework Scripts in ComposeViewport.Window's `after` slot, outside main.
Credentials stay outside this repository. Releases use the repository's
`publish.yml` workflow and the `npm-publish` environment with npm OIDC.

MIT.
