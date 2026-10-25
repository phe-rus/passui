# Passui source lineage

Current owner: `https://github.com/phe-rus/passui.git`. This is an
independent checkout. Pherus consumes published npm releases, not a
submodule. Shared component changes belong in this repository.

## Historical Hino checkpoint, October 10, 2026

The notes below preserve the original Notables snapshot and its adapters.
Package names, paths and consumer descriptions in this section refer to
that historical migration, not the current repository layout or an
instruction to refresh Passui from another checkout.

Source: Pherus Notables, packages/hino.
Revision: 512f730, 2026-10-10.

This is a versioned source snapshot for `@phe-rus/hino`, formerly `@ultrapeach/ui`. It does not depend on another local checkout at runtime or build time. The recorded revision identifies the starting source; local deltas below must be reconciled before refreshing it.

At that checkpoint, UI source and design tokens shared the `packages/hino/` workspace. TanStack integrations lived independently in `packages/tanstack/`.

The original refresh procedure compared a new Notables export with this
snapshot and reapplied the destination adapters below. It is preserved
as history; Passui now owns its source and does not follow that refresh
procedure.

Destination adapters: standalone package tsconfigs, Pherus React/TypeScript catalog versions, @types/bun version, explicit upstream motion version, focused button/toggle/cn exports, root workspace registration, and Pherus Biome formatting. App styling lives outside this snapshot. Never copy the Notables root catalog or downgrade Pherus dependencies.

At that checkpoint, Pass, Accounts and www imported native Hino controls directly. TanStack form/table/router integration lived separately in `../tanstack/`, not in a second UI library. www retained its existing presentation. The initial isolated Pass sign-in stage was superseded.

Historical local shared-component deltas included reduced-motion handling in Sheet, Picker and Popover, the smoother Picker spring and Popover transform-origin alignment. These were not included in revision 512f730. Further local deltas included native DatePicker, TextField/TextEditor/SecureField, ProfileImage, Table, SearchList, TabView, Button styling, mixed-state Toggle, shared presentation components, persisted appearance and conflict-aware cn. The old `packages/ui` compatibility workspace had been removed in that earlier consumer layout. These changes are not represented by the recorded Notables revision.

## Current repository layout

The public `phe-rus/passui` repository owns React controls under
`packages/ui`, shared tokens under `packages/tokens`, the private Solid
foundation under `packages/solid`, optional integrations under
`packages/tanstack`, setup tooling under `packages/cli`, and the official
website under `www`. The public packages use the `@passui` scope. The
older names and paths above record migration history only.
