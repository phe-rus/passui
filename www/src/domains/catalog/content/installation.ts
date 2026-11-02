import type { InstallStep } from "../types"

/** The same for every component: add the package, then its styles. */
export const installSteps: InstallStep[] = [
    {
        title: "Use the CLI, or install Passui manually.",
        code: "bunx @passui/cli init\n\n# Manual alternative\nbun add @passui/react",
        lang: "shellscript",
    },
    {
        title: "Import its styles once, in your root stylesheet.",
        code: `@import "@passui/react/styles.css";`,
        lang: "css",
    },
    {
        title: "Import components from their own entry point.",
        code: `import { Button } from "@passui/react/button"`,
    },
]
