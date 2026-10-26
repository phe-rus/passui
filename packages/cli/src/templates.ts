import {
    solidSetupFiles,
    solidStarterFiles,
} from "./solid-templates"
export const versions = {
    passui: "^0.1.15",
    integration: "^0.2.1",
    react: "^19.3.0",
    tailwind: "^4.3.3",
}

export const providers = `"use client"

import type { PropsWithChildren } from "react"
import { ContextMenuHost, DialogHost, TooltipHost } from "@passui/react"
import { PlatformProvider, ThemeProvider } from "@passui/react/appearance"
import { Toaster } from "@passui/react/toaster"

export function PassuiProvider({ children }: PropsWithChildren) {
    return (
        <PlatformProvider>
            <ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem enableColorScheme>
                {children}
                <Toaster />
                <ContextMenuHost />
                <DialogHost />
                <TooltipHost />
            </ThemeProvider>
        </PlatformProvider>
    )
}
`

export function setupFiles(
    framework: string,
    integration: boolean,
    frameworkType: "react" | "solid" = "react"
) {
    if (frameworkType === "solid")
        return solidSetupFiles(integration)
    const pipeline =
        framework === "next"
            ? 'Add @tailwindcss/postcss to your PostCSS plugins. Add "@passui/react" to transpilePackages in next.config, and "@passui/tanstack" if using the integration.'
            : framework === "vite" || framework === "tanstack"
              ? 'Add tailwindcss() from "@tailwindcss/vite" to your Vite plugins.'
              : "Configure your bundler to process Passui TSX and this stylesheet through Tailwind CSS 4. Use @tailwindcss/postcss with PostCSS, or the Tailwind plugin supported by your bundler."
    return {
        "passui/providers.tsx": providers,
        "passui/styles.css": `@import "@passui/${integration ? "tanstack" : "react"}/styles.css";\n`,
        "passui/README.md": `# Passui setup\n\n${pipeline}\n\nImport passui/styles.css in your application entry or root stylesheet. Wrap your app content in PassuiProvider from passui/providers.tsx. Adjust relative import paths to your entry.\n\nFor an HTML document shell, render PlatformScript from @passui/react/appearance in the head before content paints, and add suppressHydrationWarning to html. Keep framework scripts as body children outside the provider. For TanStack Start, ComposeViewport.Window's after prop holds Scripts. For Next.js, keep the document in the server layout and PassuiProvider around its children.\n\nImport controls from their package entry points, for example Button from @passui/react/button.\n\nDocs: https://passui.pherus.org/docs/installation\n\nSetup preserves existing app source. If installation failed or was skipped, run your package manager's install command in the project root.\n`,
    }
}

export function starterFiles(
    name: string,
    template: "vite" | "tanstack",
    frameworkType: "react" | "solid" = "react"
) {
    if (frameworkType === "solid")
        return solidStarterFiles(name, template)
    const tanstack = template === "tanstack"
    const files: Record<string, string> = setupFiles(
        template,
        tanstack
    )
    files["package.json"] = `${JSON.stringify(
        {
            name,
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
                dev: "vite",
                build: "vite build",
                typecheck: "tsc --noEmit",
            },
            dependencies: {
                "@passui/react": versions.passui,
                react: versions.react,
                "react-dom": versions.react,
                tailwindcss: versions.tailwind,
                ...(tanstack
                    ? {
                          "@passui/tanstack":
                              versions.integration,
                          "@tanstack/react-start":
                              "^1.168.58",
                          "@tanstack/react-router":
                              "^1.170.39",
                          "@tanstack/react-query": "^5.104.0",
                          "@tanstack/react-form": "^1.33.5",
                          "@tanstack/react-table": "^9.2.4",
                          "@tanstack/react-devtools":
                              "^0.10.13",
                          "@tanstack/react-query-devtools":
                              "^5.104.0",
                          "@tanstack/react-router-devtools":
                              "^1.167.2",
                          "@hugeicons/react": "^1.1.10",
                          motion: "^13.4.4",
                      }
                    : {}),
            },
            devDependencies: {
                vite: "^8.3.1",
                "@vitejs/plugin-react": "^6.1.1",
                "@tailwindcss/vite": versions.tailwind,
                typescript: "^7.0.2",
                "@types/node": "^26.6.3",
                "@types/react": versions.react,
                "@types/react-dom": versions.react,
            },
        },
        null,
        4
    )}\n`
    files["tsconfig.json"] = `${JSON.stringify(
        {
            compilerOptions: {
                target: "ES2022",
                lib: ["ES2022", "DOM", "DOM.Iterable"],
                module: "ESNext",
                moduleResolution: "bundler",
                jsx: "react-jsx",
                strict: true,
                skipLibCheck: true,
                noEmit: true,
                allowImportingTsExtensions: true,
                types: ["vite/client", "node"],
            },
            include: ["src", "passui", "vite.config.ts"],
        },
        null,
        4
    )}\n`
    files[".gitignore"] =
        "node_modules/\ndist/\n.output/\n.tanstack/\n.env*\n!.env.example\nsrc/routeTree.gen.ts\n"
    files["vite.config.ts"] =
        `import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
${tanstack ? 'import { tanstackStart } from "@tanstack/react-start/plugin/vite"\n' : ""}
export default defineConfig({ plugins: [tailwindcss(), ${tanstack ? "tanstackStart(), " : ""}react()] })
`
    files["src/app.tsx"] =
        `import { Button } from "@passui/react/button"
import { toast } from "@passui/react/toast"

export function App() {
    return (
        <main className="min-h-screen bg-background text-foreground p-8">
            <h1 className="text-title font-semibold">Hello, Passui</h1>
            <Button variant="accent" onClick={() => toast.success("Passui is ready")}>Try Passui</Button>
        </main>
    )
}
`
    if (tanstack) {
        files["src/router.tsx"] =
            `import { createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
    return createRouter({ routeTree, scrollRestoration: true, scrollToTopSelectors: ["main"] })
}

declare module "@tanstack/react-router" {
    interface Register { router: ReturnType<typeof getRouter> }
}
`
        files["src/routes/__root.tsx"] =
            `import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router"
import { ComposeViewport } from "@passui/tanstack/document"
import { PlatformScript } from "@passui/react/appearance"
import { PassuiProvider } from "../../passui/providers"
import styles from "../../passui/styles.css?url"

export const Route = createRootRoute({
    head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "Passui" }], links: [{ rel: "stylesheet", href: styles }] }),
    shellComponent: RouteComponent,
})

function RouteComponent() {
    return (
        <ComposeViewport>
            <head><PlatformScript /><HeadContent /></head>
            <ComposeViewport.Window after={<Scripts />}>
                <PassuiProvider><Outlet /></PassuiProvider>
            </ComposeViewport.Window>
        </ComposeViewport>
    )
}
`
        files["src/routes/index.tsx"] =
            `import { createFileRoute } from "@tanstack/react-router"
import { App } from "../app"

export const Route = createFileRoute("/")({ component: RouteComponent })

function RouteComponent() { return <App /> }
`
    } else {
        files["index.html"] =
            '<!doctype html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Passui</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n'
        files["src/main.tsx"] =
            `import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { PassuiProvider } from "../passui/providers"
import "../passui/styles.css"
import { App } from "./app"

createRoot(document.getElementById("root")!).render(<StrictMode><PassuiProvider><App /></PassuiProvider></StrictMode>)
`
    }
    files["README.md"] =
        `# ${name}\n\nPassui is wired into this ${tanstack ? "TanStack Start" : "Vite React"} starter. Install dependencies, then run your package manager's dev script. Run the build script before typecheck in TanStack Start so route types are generated.\n\nSee passui/README.md and https://passui.pherus.org for component documentation.\n`
    return files
}
