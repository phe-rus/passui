import { versions } from "./templates"

export const solidVersions = {
    solid: "^1.9.17",
    passui: "^0.1.1",
    form: "^1.33.5",
    query: "^5.104.5",
    router: "^1.170.43",
    start: "^1.169.4",
    table: "^9.3.1",
    plugin: "2.11.14",
}
export function solidSetupFiles(integration: boolean) {
    return {
        "passui/styles.css": `@import "@passui/${integration ? "tanstack/solid" : "solid"}/styles.css";\n`,
        "passui/providers.tsx": `import type { ParentProps } from "solid-js"
import { ContextMenuHost, DialogHost, TooltipHost, Toaster } from "@passui/solid"
import { PlatformProvider, ThemeProvider } from "@passui/solid/appearance"

export function PassuiProvider(props: ParentProps) {
    return <PlatformProvider><ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem enableColorScheme>{props.children}<Toaster /><ContextMenuHost /><DialogHost /><TooltipHost /></ThemeProvider></PlatformProvider>
}
`,
        "passui/README.md": `# Passui Solid setup

Import passui/styles.css once and wrap your application in PassuiProvider from passui/providers.tsx.

Use a standard SolidJS project with Tailwind CSS 4. Passui ships compiled browser and server components, so no Passui-specific Vite resolve, optimizeDeps or SSR configuration is needed. For TanStack Start, use solid({ ssr: true }) after tanstackStart(). Render PlatformScript from @passui/solid/appearance in the document head before content paints. Keep framework Scripts after the main content.

Import controls from @passui/solid/button and other component entry points.${integration ? " Import integrations from @passui/tanstack/solid/forms, /solid/tables, /solid/mutation and /solid/document. Install the matching @tanstack/solid-form, @tanstack/solid-query, @tanstack/solid-router and @tanstack/solid-table packages. Wrap query consumers in QueryClientProvider from @tanstack/solid-query." : ""}

Docs: https://passui.pherus.org/solid/docs/installation

Setup preserves application source and existing versions. If installation was skipped, run your package manager's install command.
`,
    }
}
export function solidStarterFiles(
    name: string,
    template: "vite" | "tanstack"
) {
    const tanstack = template === "tanstack"
    const files: Record<string, string> =
        solidSetupFiles(tanstack)
    files["package.json"] =
        `${JSON.stringify({ name, private: true, version: "0.0.0", type: "module", scripts: { dev: "vite", build: "vite build", typecheck: "tsc --noEmit" }, dependencies: { "@passui/solid": solidVersions.passui, "solid-js": solidVersions.solid, tailwindcss: versions.tailwind, ...(tanstack ? { "@passui/tanstack": versions.integration, "@tanstack/solid-start": solidVersions.start, "@tanstack/solid-router": solidVersions.router, "@tanstack/solid-query": solidVersions.query, "@tanstack/solid-form": solidVersions.form, "@tanstack/solid-table": solidVersions.table } : {}) }, devDependencies: { vite: "^8.3.5", "vite-plugin-solid": solidVersions.plugin, "@tailwindcss/vite": versions.tailwind, typescript: "^7.0.2", "@types/node": "^26.6.3" } }, null, 4)}\n`
    files["tsconfig.json"] =
        `${JSON.stringify({ compilerOptions: { target: "ES2022", lib: ["ES2022", "DOM", "DOM.Iterable"], module: "ESNext", moduleResolution: "bundler", jsx: "preserve", jsxImportSource: "solid-js", strict: true, skipLibCheck: true, noEmit: true, allowImportingTsExtensions: true, types: ["vite/client", "node"] }, include: ["src", "passui", "vite.config.ts"] }, null, 4)}\n`
    files["vite.config.ts"] =
        `import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import tailwindcss from "@tailwindcss/vite"
${tanstack ? 'import { tanstackStart } from "@tanstack/solid-start/plugin/vite"\n' : ""}
export default defineConfig({ plugins: [tailwindcss(), ${tanstack ? "tanstackStart(), " : ""}solid(${tanstack ? "{ ssr: true }" : ""})] })
`
    files["src/app.tsx"] =
        `import { Button } from "@passui/solid/button"
import { toast } from "@passui/solid/toast"
export function App() { return <section class="min-h-screen bg-background p-8 text-label"><h1 class="text-title font-semibold">Hello, Passui</h1><Button variant="accent" onClick={() => toast.success("Passui is ready")}>Try Passui</Button></section> }
`
    if (tanstack) {
        files["src/router.tsx"] =
            `import { createRouter } from "@tanstack/solid-router"
import { routeTree } from "./routeTree.gen"
export function getRouter() { return createRouter({ routeTree, scrollRestoration: true, scrollToTopSelectors: ["main"] }) }
declare module "@tanstack/solid-router" { interface Register { router: ReturnType<typeof getRouter> } }
`
        files["src/routes/__root.tsx"] =
            `import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/solid-router"
import { Suspense } from "solid-js"
import { ComposeViewport } from "@passui/tanstack/solid/document"
import { PlatformScript } from "@passui/solid/appearance"
import { PassuiProvider } from "../../passui/providers"
import styles from "../../passui/styles.css?url"
export const Route = createRootRoute({ head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "Passui" }], links: [{ rel: "stylesheet", href: styles }] }), component: RouteComponent })
function RouteComponent() { return <ComposeViewport head={<PlatformScript />}><ComposeViewport.Window before={<HeadContent />} after={<Scripts />}><PassuiProvider><Suspense><Outlet /></Suspense></PassuiProvider></ComposeViewport.Window></ComposeViewport> }
`
        files["src/routes/index.tsx"] =
            `import { createFileRoute } from "@tanstack/solid-router"
import { App } from "../app"
export const Route = createFileRoute("/")({ component: RouteComponent })
function RouteComponent() { return <App /> }
`
    } else {
        files["index.html"] =
            '<!doctype html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Passui</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n'
        files["src/main.tsx"] =
            `import { render } from "solid-js/web"
import { PassuiProvider } from "../passui/providers"
import "../passui/styles.css"
import { App } from "./app"
render(() => <PassuiProvider><App /></PassuiProvider>, document.getElementById("root")!)
`
    }
    files[".gitignore"] =
        "node_modules/\ndist/\n.output/\n.tanstack/\n.env*\n!.env.example\nsrc/routeTree.gen.ts\n"
    files["README.md"] =
        `# ${name}\n\nPassui SolidJS ${tanstack ? "TanStack Start" : "Vite"} starter. Install dependencies, then run dev. For TanStack Start run build before typecheck to generate routes.\n\nSee passui/README.md and https://passui.pherus.org/solid/docs/installation.\n`
    return files
}
