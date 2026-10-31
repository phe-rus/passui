import { buttonStyle } from "@passui/react/button"
import { InfoIcon, LinkIcon } from "@passui/react/icons"
import { Link } from "@tanstack/react-router"
import { CopyForAi } from "@/domains/ai-context"
import { CodeView, Playground } from "@/domains/playground"
import type { DocsSettings } from "@/domains/settings"
import { getEntry } from "../get-catalog"
import { getSetup } from "../get-setup"
import { componentTitle } from "../navigation"
import { getExampleSource } from "../get-example-source"
import { AnatomyTable } from "./anatomy-table"
import { ComponentFrameworkTabs } from "./component-framework-tabs"
import { DocSection } from "./doc-section"
import { ExampleCard } from "./example-card"
import { InstallSteps } from "./install-steps"
import { OnThisPage, type TocItem } from "./on-this-page"
import { PracticesList } from "./practices-list"
import { PropsTable } from "./props-table"

type ComponentPageProps = {
    slug: string
    settings: DocsSettings
    rawProps: Record<string, unknown>
}

/**
 * One component, arranged like the best docs sites: the live playground
 * first, then setup, usage, anatomy, examples, practices, accessibility
 * and the full prop reference, with a map of the page beside it.
 */
export function ComponentPage({
    slug,
    settings,
    rawProps,
}: ComponentPageProps) {
    const entry = getEntry(slug)
    if (!entry) return null
    const { docs, content } = entry
    const setup = getSetup(docs.slug)
    const Showcase = docs.showcase
    const Usage = docs.usage
    const examples = docs.examples.map((example) => ({
        example,
        words: content.examples[example.id],
    }))
    const toc: TocItem[] = [
        { id: "playground", title: "Playground" },
        { id: "installation", title: "Installation" },
        { id: "usage", title: "Usage" },
        ...(setup ? [{ id: "setup", title: "Setup" }] : []),
        { id: "anatomy", title: "Anatomy" },
        ...(examples.length > 0
            ? [
                  {
                      id: "examples",
                      title: "Examples",
                      children: examples.map(
                          ({ example, words }) => ({
                              id: `example-${example.id}`,
                              title: words.title,
                          })
                      ),
                  },
              ]
            : []),
        { id: "best-practices", title: "Best practices" },
        { id: "accessibility", title: "Accessibility" },
        { id: "api-reference", title: "API reference" },
    ]
    const importLine = `import { ${docs.name} } from "${docs.importPath}"`

    return (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_13rem]">
            <article className="flex min-w-0 flex-col gap-5">
                <header className="flex flex-col gap-2">
                    <span className="font-mono">
                        @passui/react · {docs.name}
                    </span>
                    <h1 className="font-brand text-large-title font-extrabold tracking-tight">
                        {componentTitle(entry)}
                    </h1>
                    <p className="max-w-2xl">
                        {content.summary}
                    </p>
                    <ComponentFrameworkTabs
                        slug={slug}
                        framework="react"
                    />
                    <div className="flex flex-wrap gap-2">
                        <Link
                            to="/preview/$slug"
                            params={{ slug: docs.slug }}
                            search={{
                                theme: settings.theme,
                                accent: settings.accent,
                                os: settings.os,
                                scene: "showcase",
                            }}
                            target="_blank"
                            className={buttonStyle({
                                variant: "secondary",
                                size: "sm",
                            })}
                        >
                            <LinkIcon size={16} />
                            Open preview
                        </Link>
                        <CopyForAi slug={docs.slug} />
                    </div>
                </header>

                <section
                    aria-label="Showcase"
                    className="flex min-h-60 items-center justify-center rounded-5xl bg-accent-soft/50 p-5 ring-1 ring-separator/60"
                >
                    <Showcase />
                </section>

                <DocSection
                    id="playground"
                    title="Playground"
                    description="Change any option and the preview, the code and the address all follow. Share the address to share exactly this state."
                >
                    <Playground
                        docs={docs}
                        settings={settings}
                        rawProps={rawProps}
                    />
                </DocSection>

                <DocSection
                    id="installation"
                    title="Installation"
                    collapsible
                >
                    <InstallSteps />
                </DocSection>

                {setup && (
                    <DocSection
                        id="setup"
                        title="Setup"
                        description={setup.description}
                    >
                        <CodeView
                            code={setup.code}
                            label="tsx"
                        />
                    </DocSection>
                )}
                <DocSection
                    id="usage"
                    title="Usage"
                    description={content.usage}
                >
                    <div className="overflow-hidden rounded-3xl ring-1 ring-separator/60">
                        <CodeView
                            code={importLine}
                            label="tsx"
                        />
                    </div>
                    <div className="overflow-hidden rounded-4xl ring-1 ring-separator/60">
                        <div className="flex min-h-40 items-center justify-center bg-background p-5">
                            <Usage />
                        </div>
                        <div className="border-separator/60 border-t">
                            <CodeView
                                code={getExampleSource(
                                    docs.slug,
                                    "usage"
                                )}
                                label={`${docs.slug}-usage.tsx`}
                            />
                        </div>
                    </div>
                </DocSection>

                <DocSection
                    id="anatomy"
                    title="Anatomy"
                    collapsible
                >
                    <AnatomyTable parts={content.anatomy} />
                </DocSection>

                {examples.length > 0 && (
                    <DocSection
                        id="examples"
                        title="Examples"
                        description="Common setups, variations and states."
                    >
                        <div className="flex flex-col gap-5">
                            {examples.map(
                                ({ example, words }) => (
                                    <ExampleCard
                                        key={example.id}
                                        docs={docs}
                                        example={example}
                                        content={words}
                                    />
                                )
                            )}
                        </div>
                    </DocSection>
                )}

                <DocSection
                    id="best-practices"
                    title="Best practices"
                    collapsible
                >
                    <PracticesList
                        practices={content.practices}
                    />
                </DocSection>

                <DocSection
                    id="accessibility"
                    title="Accessibility"
                    collapsible
                >
                    <ul className="m-0 flex list-none flex-col gap-5 p-0">
                        {content.accessibility.map((line) => (
                            <li
                                key={line}
                                className="flex items-start gap-2"
                            >
                                <InfoIcon size={18} />
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </DocSection>

                <DocSection
                    id="api-reference"
                    title="API reference"
                >
                    <PropsTable
                        docs={docs}
                        descriptions={
                            content.propDescriptions
                        }
                    />
                </DocSection>
            </article>

            <aside className="hidden xl:block">
                <div className="sticky top-24">
                    <OnThisPage items={toc} />
                </div>
            </aside>
        </div>
    )
}
