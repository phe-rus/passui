#!/usr/bin/env node
import { version } from "../package.json"
import { parseArgs } from "node:util"
import { resolve } from "node:path"
import {
    installProject,
    planProject,
    writePlan,
    type Options,
    type PackageManager,
} from "./project"

const help = `Passui project setup

  bunx @passui/cli init [--dir .] [--integration tanstack]
  bunx @passui/cli create my-app [--template vite|tanstack]

Options:
  --framework react|solid  UI framework (detected for init, React for create)
  --pm bun|npm|pnpm|yarn  Package manager (detected, otherwise Bun)
  --no-install           Generate files without installing
  --dry-run              Show planned files without changing the project
  --help                 Show help
  --version              Show CLI version

Existing projects get passui/styles.css, passui/providers.tsx and wiring
instructions. Application roots and bundler configs stay yours to edit.
`

async function main() {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: {
            help: { type: "boolean", short: "h" },
            version: { type: "boolean", short: "v" },
            dir: { type: "string" },
            template: { type: "string" },
            integration: { type: "string" },
            framework: { type: "string" },
            pm: { type: "string" },
            "no-install": { type: "boolean" },
            "dry-run": { type: "boolean" },
        },
    })
    if (
        values.help ||
        (!positionals.length && !values.version)
    ) {
        console.log(help)
        return
    }
    if (values.version) {
        console.log(version)
        return
    }
    const [command, destination, ...extra] = positionals
    if (command !== "init" && command !== "create")
        throw new Error(
            "Choose init or create. Use --help for examples."
        )
    if (
        extra.length ||
        (command === "init" && destination) ||
        (command === "create" &&
            (!destination ||
                values.dir ||
                values.integration)) ||
        (command === "init" && values.template)
    )
        throw new Error(
            "Invalid command arguments. Use --help for examples."
        )
    const template = values.template ?? "vite"
    if (template !== "vite" && template !== "tanstack")
        throw new Error("Template must be vite or tanstack.")
    if (
        values.integration &&
        values.integration !== "none" &&
        values.integration !== "tanstack"
    )
        throw new Error(
            "Integration must be none or tanstack."
        )
    if (
        values.pm &&
        !["bun", "npm", "pnpm", "yarn"].includes(values.pm)
    )
        throw new Error(
            "Package manager must be bun, npm, pnpm or yarn."
        )
    if (
        values.framework &&
        values.framework !== "react" &&
        values.framework !== "solid"
    )
        throw new Error("Framework must be react or solid.")
    const options: Options = {
        framework: values.framework as
            | "react"
            | "solid"
            | undefined,
        command,
        directory: resolve(
            command === "create"
                ? destination!
                : (values.dir ?? ".")
        ),
        template,
        integration: values.integration === "tanstack",
        manager: values.pm as PackageManager | undefined,
        install: !values["no-install"],
        dryRun: !!values["dry-run"],
    }
    const plan = await planProject(options)
    console.log(
        `${options.dryRun ? "Plan for" : "Setting up"} ${plan.root} (${plan.framework}, ${plan.manager})`
    )
    for (const path of Object.keys(plan.files))
        console.log(`  ${path}`)
    if (options.dryRun) return
    await writePlan(plan)
    if (options.install)
        await installProject(plan.root, plan.manager)
    console.log(
        command === "create"
            ? `Ready. Run ${plan.manager} run dev in ${plan.root}.`
            : "Setup files are ready. Follow passui/README.md to wire your app root and Tailwind pipeline."
    )
}

main().catch((error: Error) => {
    console.error(`Passui: ${error.message}`)
    process.exitCode = 1
})
