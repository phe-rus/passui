import { DocSection, type TocItem } from "@/domains/catalog"
import { Code, CodeBlock, Prose, Steps } from "./guide-parts"

export const installationSections: TocItem[] = [
    { id: "install", title: "Install" },
    { id: "styles", title: "Styles" },
    { id: "root", title: "Root setup" },
    { id: "first-component", title: "Your first component" },
]

export function InstallationGuide({
    framework = "react",
}: {
    framework?: "react" | "solid"
}) {
    const solid = framework === "solid"
    const packageName = solid
        ? "@passui/solid"
        : "@passui/react"
    const flag = solid ? " --framework solid" : ""
    return (
        <>
            <DocSection
                id="install"
                title="Install"
                description={`Install Passui for ${solid ? "SolidJS" : "React"} using Bun and Tailwind CSS 4.`}
            >
                <Prose>
                    For guided setup, run the Passui CLI in
                    your app. It generates a stylesheet,
                    providers and instructions for your
                    framework.
                </Prose>
                <CodeBlock
                    lang="shellscript"
                    code={`bunx @passui/cli@latest init${flag}

# Create a new project
bunx @passui/cli@latest create my-app${flag} --template vite
bunx @passui/cli@latest create my-app${flag} --template tanstack`}
                />
                <Prose>
                    Existing projects get passui/styles.css,
                    passui/providers.tsx and passui/README.md.
                    Follow that README to wire your app root
                    and Tailwind pipeline; init preserves your
                    routes and bundler configuration. Add
                    --integration tanstack for the optional
                    integration, --no-install to skip
                    installing, or --dry-run to inspect the
                    plan first.
                </Prose>
                <CodeBlock
                    lang="shellscript"
                    code={`# Optional TanStack integration
bunx @passui/cli@latest init${flag} --integration tanstack

# Preview changes before installing
bunx @passui/cli@latest init${flag} --dry-run`}
                />
                <Prose>
                    Prefer manual setup? Install the packages
                    below, configure Tailwind CSS 4 and follow
                    the styles and root setup sections.
                </Prose>
                <Steps
                    steps={[
                        {
                            title: "Add Passui.",
                            body: (
                                <Prose>
                                    Use Passui with any{" "}
                                    {solid
                                        ? "SolidJS"
                                        : "React"}
                                    framework. Its controls,
                                    themes and styles work
                                    independently of TanStack.
                                </Prose>
                            ),
                            lang: "shellscript",
                            code: `bun add ${packageName}`,
                        },
                        {
                            title: "Using TanStack Start or Router? Add the integrations too.",
                            body: (
                                <Prose>
                                    Forms, tables, route
                                    boundaries and the
                                    document shell, built on
                                    Passui's controls.
                                </Prose>
                            ),
                            lang: "shellscript",
                            code: solid
                                ? "bun add @passui/tanstack @tanstack/solid-query"
                                : "bun add @passui/tanstack @tanstack/react-query",
                        },
                    ]}
                />
                <Prose>
                    Both frameworks use the same design tokens
                    and Tailwind CSS 4 styles. Passui's
                    SolidJS package ships compiled client and
                    server code; no Passui-specific bundler
                    overrides are needed.
                </Prose>
            </DocSection>

            <DocSection
                id="styles"
                title="Styles"
                description="One import brings in Tailwind, the theme and everything Passui's controls need."
            >
                <Prose>
                    Add it to your root stylesheet. Tailwind
                    finds your own files by itself, and the
                    stylesheet registers Passui's, so there
                    are no paths to keep up to date.
                </Prose>
                <CodeBlock
                    label="app.css"
                    lang="css"
                    code={`@import "${packageName}/styles.css";`}
                />
                <Prose>
                    With <Code>@passui/tanstack</Code>, import
                    its stylesheet instead. It includes
                    Passui's.
                </Prose>
                <CodeBlock
                    label="app.css"
                    lang="css"
                    code={`@import "@passui/tanstack${solid ? "/solid" : ""}/styles.css";`}
                />
            </DocSection>

            <DocSection
                id="root"
                title="Root setup"
                description="Set the platform before the first paint, follow the system theme, and mount the hosts once."
            >
                <Prose>
                    <Code>PlatformScript</Code> sets{" "}
                    <Code>data-os</Code> before anything
                    paints, so there's no flash of another
                    platform's look. The hosts draw toasts,
                    menus, confirmations and tooltips for the
                    whole app.
                </Prose>
                <CodeBlock
                    label={
                        solid
                            ? "src/app.tsx"
                            : "src/routes/__root.tsx"
                    }
                    code={
                        solid
                            ? `import type { ParentProps } from "solid-js"
import { ContextMenuHost, DialogHost, TooltipHost, Toaster } from "@passui/solid"
import { PlatformProvider, ThemeProvider } from "@passui/solid/appearance"

export function AppProviders(props: ParentProps) {
    return (
        <PlatformProvider>
            <ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem>
                {props.children}
                <Toaster />
                <ContextMenuHost />
                <DialogHost />
                <TooltipHost />
            </ThemeProvider>
        </PlatformProvider>
    )
}`
                            : `import {
    ContextMenuHost,
    DialogHost,
    TooltipHost,
} from "@passui/react"
import {
    PlatformProvider,
    PlatformScript,
    ThemeProvider,
} from "@passui/react/appearance"
import { Toaster } from "@passui/react/toaster"

export function Root({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <PlatformScript />
            </head>
            <body>
                <PlatformProvider>
                    <ThemeProvider
                        attribute={["class", "data-theme"]}
                        defaultTheme="system"
                        enableColorScheme
                        enableSystem
                    >
                        {children}
                        <Toaster />
                        <ContextMenuHost />
                        <DialogHost />
                        <TooltipHost />
                    </ThemeProvider>
                </PlatformProvider>
            </body>
        </html>
    )
}`
                    }
                />
                {solid && (
                    <CodeBlock
                        label="document-head.tsx"
                        code={`import { PlatformScript } from "@passui/solid/appearance"

// Place in the document <head> before styles are painted.
<PlatformScript />`}
                    />
                )}
                <Prose>
                    With TanStack Start, use{" "}
                    <Code>ComposeViewport</Code> from{" "}
                    <Code>
                        {solid
                            ? "@passui/tanstack/solid/document"
                            : "@passui/tanstack/document"}
                    </Code>{" "}
                    as the document shell. Mount the providers
                    once at the application root.
                </Prose>
            </DocSection>

            <DocSection
                id="first-component"
                title="Your first component"
                description="Import each control from its own entry point."
            >
                <CodeBlock
                    code={
                        solid
                            ? `import { Button, toast } from "@passui/solid"

export function SaveButton() {
    return (
        <Button variant="accent" onClick={() => toast.success("Changes saved")}>
            Save
        </Button>
    )
}`
                            : `import { Button } from "@passui/react/button"
import { toast } from "@passui/react/toast"

export function SaveButton() {
    return (
        <Button
            variant="accent"
            onClick={() => toast.success("Changes saved")}
        >
            Save
        </Button>
    )
}`
                    }
                />
            </DocSection>
        </>
    )
}
