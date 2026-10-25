import { DocSection, type TocItem } from "@/domains/catalog"
import { Code, CodeBlock, Prose, Steps } from "./guide-parts"

export const installationSections: TocItem[] = [
    { id: "install", title: "Install" },
    { id: "styles", title: "Styles" },
    { id: "root", title: "Root setup" },
    { id: "first-component", title: "Your first component" },
]

export function InstallationGuide() {
    return (
        <>
            <DocSection
                id="install"
                title="Install"
                description="Install Passui from public npm in a React 19 app with Tailwind CSS 4."
            >
                <Prose>
                    For guided setup, run the Passui CLI in
                    your React app. It generates a stylesheet,
                    providers and instructions for your
                    framework.
                </Prose>
                <CodeBlock
                    lang="shellscript"
                    code={`bunx @passui/cli init

# Create a new project
bunx @passui/cli create my-app
bunx @passui/cli create my-app --template tanstack`}
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
                    code={`# Other package managers
npx @passui/cli init
pnpm dlx @passui/cli init

# Optional TanStack integration
bunx @passui/cli init --integration tanstack`}
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
                                    Use Passui with any React
                                    framework. Its controls,
                                    themes and styles work
                                    independently of TanStack.
                                </Prose>
                            ),
                            lang: "shellscript",
                            code: "bun add @passui/react",
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
                            code: "bun add @passui/tanstack @tanstack/react-query",
                        },
                    ]}
                />
                <Prose>
                    Both packages export TypeScript and TSX
                    source. Your framework's bundler must
                    process those files, and your app needs
                    Tailwind CSS 4 configured for its
                    stylesheet.
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
                    code={`@import "@passui/react/styles.css";`}
                />
                <Prose>
                    With <Code>@passui/tanstack</Code>, import
                    its stylesheet instead. It includes
                    Passui's.
                </Prose>
                <CodeBlock
                    label="app.css"
                    lang="css"
                    code={`@import "@passui/tanstack/styles.css";`}
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
                    label="src/routes/__root.tsx"
                    code={`import {
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
}`}
                />
                <Prose>
                    With TanStack Start, use{" "}
                    <Code>ComposeViewport</Code> from{" "}
                    <Code>@passui/tanstack/document</Code> as
                    the document shell.
                </Prose>
            </DocSection>

            <DocSection
                id="first-component"
                title="Your first component"
                description="Import each control from its own entry point."
            >
                <CodeBlock
                    code={`import { Button } from "@passui/react/button"
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
}`}
                />
            </DocSection>
        </>
    )
}
