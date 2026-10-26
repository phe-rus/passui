import { Link } from "@tanstack/react-router"
import { DocSection } from "@/domains/catalog"
import {
    CodeBlock,
    Prose,
    Code,
} from "@/domains/guides/views/guide-parts"
import { getGuide } from "@/domains/guides/get-guides"
import { solidGuideSummaries } from "../solid-guides"

export function SolidGuidePage({ slug }: { slug: string }) {
    const guide = getGuide(slug)
    if (!guide) return null
    return (
        <article className="flex min-w-0 flex-col gap-12">
            <header className="flex flex-col gap-3">
                <span className="font-mono text-caption text-label-tertiary">
                    SolidJS · @passui/solid
                </span>
                <h1 className="font-brand text-large-title font-extrabold tracking-tight text-label">
                    {guide.title}
                </h1>
                <p className="max-w-2xl text-body text-label-secondary">
                    {solidGuideSummaries[guide.slug]}
                </p>
            </header>
            {guide.slug === "introduction" && (
                <>
                    <DocSection
                        id="native-solid"
                        title="Native SolidJS"
                    >
                        <Prose>
                            Passui has native React and
                            SolidJS components with shared
                            tokens and styles. Solid
                            components use signals, contexts
                            and lifecycle primitives. They do
                            not wrap React controls.
                        </Prose>
                        <Link to="/solid/components">
                            Explore all 35 component families
                        </Link>
                    </DocSection>
                    <DocSection
                        id="packages"
                        title="Packages"
                    >
                        <Prose>
                            <Code>@passui/tokens</Code> owns
                            framework independent colors,
                            typography, layout and motion.{" "}
                            <Code>@passui/react</Code> and{" "}
                            <Code>@passui/solid</Code> own
                            native controls. One CLI supports
                            both. The optional{" "}
                            <Code>@passui/tanstack</Code>{" "}
                            package provides explicit React
                            and Solid adapters.
                        </Prose>
                    </DocSection>
                </>
            )}
            {guide.slug === "installation" && (
                <>
                    <DocSection
                        id="requirements"
                        title="Requirements"
                    >
                        <Prose>
                            Use SolidJS 1.9.17 or newer and
                            Tailwind CSS 4. Passui exports
                            TypeScript source. Your bundler
                            must compile its TSX with Solid.
                        </Prose>
                    </DocSection>
                    <DocSection id="cli" title="CLI setup">
                        <Prose>
                            The CLI detects the installed UI
                            framework. Use the framework flag
                            when both React and Solid are
                            installed. Existing project setup
                            preserves your application source
                            and dependency versions.
                        </Prose>
                        <CodeBlock
                            code={
                                "bunx @passui/cli@latest init --framework solid\n# Optional TanStack integration\nbunx @passui/cli@latest init --framework solid --integration tanstack\n\n# New applications\nbunx @passui/cli@latest create my-app --framework solid --template vite\nbunx @passui/cli@latest create my-app --framework solid --template tanstack"
                            }
                            lang="shellscript"
                            label="Terminal"
                        />
                    </DocSection>
                    <DocSection
                        id="manual"
                        title="Manual setup"
                    >
                        <CodeBlock
                            code={
                                "bun add @passui/solid solid-js tailwindcss\nbun add -D vite-plugin-solid @tailwindcss/vite"
                            }
                            lang="shellscript"
                            label="Terminal"
                        />
                        <CodeBlock
                            code={
                                '@import "@passui/solid/styles.css";'
                            }
                            lang="css"
                            label="app.css"
                        />
                        <CodeBlock
                            code={
                                '{\n  "compilerOptions": {\n    "jsx": "preserve",\n    "jsxImportSource": "solid-js"\n  }\n}'
                            }
                            lang="json"
                            label="tsconfig.json"
                        />
                        <Prose>
                            This TypeScript setting selects
                            Solid JSX types across your app,
                            so individual files do not need a
                            JSX source comment. With Vite,
                            register <Code>solid()</Code> from{" "}
                            <Code>vite-plugin-solid</Code> and{" "}
                            <Code>tailwindcss()</Code> from{" "}
                            <Code>@tailwindcss/vite</Code>.
                            For TanStack Start use{" "}
                            <Code>
                                solid({`{ ssr: true }`})
                            </Code>{" "}
                            after its Start plugin.
                        </Prose>
                        <CodeBlock
                            code={
                                'import { defineConfig } from "vite"\nimport solid from "vite-plugin-solid"\nimport tailwindcss from "@tailwindcss/vite"\n\nexport default defineConfig({\n  optimizeDeps: { exclude: ["@passui/solid", "@passui/tanstack"] },\n  resolve: { conditions: ["solid", "module", "browser", "development|production"] },\n  ssr: {\n    noExternal: ["@passui/solid", "@passui/tanstack", /@tanstack\\/solid-/],\n    resolve: { conditions: ["solid", "module", "node", "development|production"] },\n  },\n  plugins: [tailwindcss(), solid({ ssr: true })],\n})'
                            }
                            label="vite.config.ts"
                        />
                        <Prose>
                            Exclude the source packages from
                            dependency prebundling so Vite
                            compiles their JSX in development.
                            For SSR, the Solid export
                            condition selects the framework
                            source for server compilation.
                        </Prose>
                        <CodeBlock
                            code={
                                'import { Button } from "@passui/solid/button"\n\nexport function App() {\n  return <Button variant="accent">Continue</Button>\n}'
                            }
                            label="app.tsx"
                        />
                    </DocSection>
                    <DocSection
                        id="providers"
                        title="Appearance and overlay hosts"
                    >
                        <Prose>
                            The CLI generates this provider.
                            Place <Code>PlatformScript</Code>{" "}
                            from the appearance entry point in
                            your document head before paint.
                            It accepts a CSP nonce.
                        </Prose>
                        <CodeBlock
                            code={
                                'import type { ParentProps } from "solid-js"\nimport { PlatformProvider, ThemeProvider } from "@passui/solid/appearance"\nimport { Toaster, DialogHost, ContextMenuHost, TooltipHost } from "@passui/solid"\n\nexport function PassuiProvider(props: ParentProps) {\n  return (\n    <PlatformProvider>\n      <ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem>\n        {props.children}\n        <Toaster /><DialogHost /><ContextMenuHost /><TooltipHost />\n      </ThemeProvider>\n    </PlatformProvider>\n  )\n}'
                            }
                            label="providers.tsx"
                        />
                    </DocSection>
                    <DocSection
                        id="tanstack"
                        title="Optional TanStack adapters"
                    >
                        <CodeBlock
                            code={
                                "bun add @passui/tanstack @tanstack/solid-form @tanstack/solid-query @tanstack/solid-router @tanstack/solid-table"
                            }
                            lang="shellscript"
                            label="Terminal"
                        />
                        <CodeBlock
                            code={
                                '@import "@passui/tanstack/solid/styles.css";'
                            }
                            lang="css"
                            label="app.css"
                        />
                        <CodeBlock
                            code={
                                'import { createAppForm } from "@passui/tanstack/solid/forms"\nimport { createAppMutation } from "@passui/tanstack/solid/mutation"\nimport { DataTable } from "@passui/tanstack/solid/tables"\nimport { ComposeViewport } from "@passui/tanstack/solid/document"'
                            }
                            label="tsx"
                        />
                        <Prose>
                            Use Solid accessors for form and
                            mutation options. Wrap query
                            consumers in the Solid
                            QueryClientProvider. Settings,
                            auth shells and route boundaries
                            have matching{" "}
                            <Code>/solid/settings</Code>,{" "}
                            <Code>/solid/auth-shell</Code> and{" "}
                            <Code>/solid/route-boundary</Code>{" "}
                            entry points. Framework
                            independent helpers are available
                            from{" "}
                            <Code>@passui/tanstack/core</Code>
                            . Existing unprefixed integration
                            imports remain React defaults.
                        </Prose>
                    </DocSection>
                </>
            )}
            {guide.slug === "theming" && (
                <>
                    <DocSection
                        id="shared-theme"
                        title="Shared appearance"
                    >
                        <Prose>
                            Both frameworks use the same
                            semantic roles and seven accents.
                            ThemeProvider follows the system,
                            persists the selected theme and
                            supports scoped appearance.
                        </Prose>
                        <CodeBlock
                            code={
                                'import { ThemeProvider, useTheme } from "@passui/solid/appearance"\n\nfunction ThemeButton() {\n  const theme = useTheme()\n  return <button onClick={() => theme.setTheme(theme.resolvedTheme === "dark" ? "light" : "dark")}>Change appearance</button>\n}'
                            }
                            label="tsx"
                        />
                        <CodeBlock
                            code={
                                '<section data-theme="dark" data-accent="ocean">\n  <p class="text-label">A scoped surface</p>\n</section>'
                            }
                            label="tsx"
                        />
                    </DocSection>
                    <DocSection
                        id="platform"
                        title="Platform detection and SSR"
                    >
                        <Prose>
                            PlatformProvider starts with
                            unknown on the server and during
                            hydration, then resolves the
                            browser platform after mounting. A
                            valid root data-os override wins.
                            Read <Code>usePlatform()</Code>{" "}
                            inside a reactive expression or{" "}
                            <Code>
                                createMemo(usePlatform)
                            </Code>{" "}
                            to track changes. Keep framework
                            Scripts after the main content in
                            ComposeViewport.Window’s after
                            slot.
                        </Prose>
                    </DocSection>
                </>
            )}
            {guide.slug === "typeset" && (
                <DocSection
                    id="typography"
                    title="Shared typography"
                >
                    <Prose>
                        Both frameworks use the same scalable
                        Dynamic Type roles:{" "}
                        <Code>text-large-title</Code>,{" "}
                        <Code>text-headline</Code>,{" "}
                        <Code>text-body</Code> and{" "}
                        <Code>text-footnote</Code>.
                    </Prose>
                    <CodeBlock
                        code={
                            '<article class="typeset">\n  <h1>Readable by default</h1>\n  <p>Long-form content uses shared Passui styles.</p>\n</article>'
                        }
                        label="tsx"
                    />
                    <Prose>
                        The complete stylesheet includes
                        typography. Import{" "}
                        <Code>@passui/solid/typeset.css</Code>{" "}
                        separately only when composing your
                        own stylesheet.
                    </Prose>
                </DocSection>
            )}
            {guide.slug === "skills" && (
                <DocSection
                    id="solid-context"
                    title="Use the selected framework"
                >
                    <Prose>
                        Use these Solid pages when generating
                        Solid code. React examples use
                        different state and event conventions;
                        changing their package name alone does
                        not convert them. Use{" "}
                        <Code>class</Code>, Solid signals, and
                        the{" "}
                        <Code>@passui/tanstack/solid/*</Code>{" "}
                        adapters. Shared values come from{" "}
                        <Code>@passui/tokens</Code> or{" "}
                        <Code>@passui/solid/tokens</Code>.
                    </Prose>
                    <CodeBlock
                        code={
                            "bunx @passui/cli@latest init --framework solid"
                        }
                        lang="shellscript"
                        label="Terminal"
                    />
                    <Link to="/solid/components">
                        View native Solid components
                    </Link>
                </DocSection>
            )}
        </article>
    )
}
