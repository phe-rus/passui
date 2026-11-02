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
