import { hasSolidComponent } from "@passui/solid/docs"
import { CopyForAi } from "@/domains/ai-context"
import { Link } from "@tanstack/react-router"
import { getEntry } from "@/domains/catalog/get-catalog"
import { AnatomyTable } from "@/domains/catalog/views/anatomy-table"
import { DocSection } from "@/domains/catalog/views/doc-section"
import {
    OnThisPage,
    type TocItem,
} from "@/domains/catalog/views/on-this-page"
import { PracticesList } from "@/domains/catalog/views/practices-list"
import { InstallSteps } from "@/domains/catalog/views/install-steps"
import { CodeView } from "@/domains/playground"
import { getSolidExampleSource } from "../get-solid-example-source"
import api from "../solid-api.json"
import { SolidPlayground } from "./solid-playground"
import { SolidPreview } from "./solid-preview"
import { SolidPropsTable } from "./solid-props-table"

export function SolidComponentPage({
    slug,
}: {
    slug: string
}) {
    const entry = getEntry(slug)
    if (!entry) return null

    const { docs, content } = entry
    const hasApi =
        (api[slug as keyof typeof api]?.length ?? 0) > 0
    const available = hasSolidComponent(slug)
    const usage = available
        ? getSolidExampleSource(slug, "usage")
        : ""
    const showcase = available
        ? getSolidExampleSource(slug, "showcase")
        : ""
    const examples = Object.entries(content.examples)
        .map(([id, words]) => ({
            id,
            words,
            source: getSolidExampleSource(slug, id),
        }))
        .filter((example) => example.source.length > 0)

    const toc: TocItem[] = available
        ? [
              { id: "playground", title: "Playground" },
              { id: "installation", title: "Installation" },
              { id: "usage", title: "Usage" },
              { id: "anatomy", title: "Anatomy" },
              ...(examples.length
                  ? [
                        {
                            id: "examples",
                            title: "Examples",
                            children: examples.map(
                                ({ id, words }) => ({
                                    id: `example-${id}`,
                                    title: words.title,
                                })
                            ),
                        },
                    ]
                  : []),
              {
                  id: "best-practices",
                  title: "Best practices",
              },
              { id: "accessibility", title: "Accessibility" },
              ...(hasApi
                  ? [
                        {
                            id: "api-reference",
                            title: "API reference",
                        },
                    ]
                  : []),
          ]
        : []

    return (
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
            <article className="flex min-w-0 flex-col gap-14">
                <header className="flex flex-col gap-3">
                    <span className="font-mono text-caption text-label-tertiary">
                        @passui/solid · {docs.name}
                    </span>
                    <h1 className="font-brand text-large-title font-extrabold tracking-tight text-label">
                        {docs.name}
                    </h1>
                    <p className="max-w-2xl text-body text-label-secondary">
                        {content.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Link
                            to="/components/$slug"
                            params={{ slug }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-fill/70 px-3 py-1.5 text-footnote font-semibold text-label no-underline transition-colors hover:bg-fill"
                        >
                            Compare React version
                        </Link>
                        <CopyForAi
                            slug={slug}
                            framework="solid"
                        />
                    </div>
                </header>

                {!available ? (
                    <section className="rounded-4xl bg-fill/60 p-6">
                        <h2 className="text-title3 font-semibold text-label">
                            Solid implementation planned
                        </h2>
                        <p className="mt-2 text-callout text-label-secondary">
                            This control needs a native Solid
                            implementation and interaction
                            tests before it is published.
                        </p>
                    </section>
                ) : (
                    <>
                        <section
                            aria-label="Native SolidJS showcase"
                            className="flex min-h-80 items-center justify-center overflow-hidden rounded-5xl bg-accent-soft/50 p-6 ring-1 ring-separator/60 md:p-10"
                        >
                            <SolidPreview
                                slug={`${slug}-${showcase ? "showcase" : "usage"}`}
                            />
                        </section>

                        <DocSection
                            id="playground"
                            title="Playground"
                            description="Explore native SolidJS states. Each preview and its copyable source stay together."
                        >
                            <SolidPlayground
                                slug={slug}
                                scenes={[
                                    {
                                        id: "usage",
                                        title: "Default",
                                        description:
                                            content.usage,
                                        source: usage,
                                    },
                                    ...examples.map(
                                        ({
                                            id,
                                            words,
                                            source,
                                        }) => ({
                                            id,
                                            title: words.title,
                                            description:
                                                words.description,
                                            source,
                                        })
                                    ),
                                ]}
                            />
                        </DocSection>

                        <DocSection
                            id="installation"
                            title="Installation"
                        >
                            <InstallSteps framework="solid" />
                        </DocSection>

                        <DocSection
                            id="usage"
                            title="Usage"
                            description={content.usage}
                        >
                            <CodeView
                                code={`import { ${docs.name} } from "@passui/solid/${slug}"`}
                                label="tsx"
                            />
                            <div className="overflow-hidden rounded-4xl ring-1 ring-separator/60">
                                <div className="bg-background">
                                    <SolidPreview
                                        slug={`${slug}-usage`}
                                    />
                                </div>
                                <div className="border-separator/60 border-t">
                                    <CodeView
                                        code={usage}
                                        label={`${slug}-usage.tsx`}
                                    />
                                </div>
                            </div>
                        </DocSection>

                        <DocSection
                            id="anatomy"
                            title="Anatomy"
                        >
                            <AnatomyTable
                                parts={content.anatomy}
                            />
                        </DocSection>

                        {examples.length > 0 && (
                            <DocSection
                                id="examples"
                                title="Examples"
                                description="Real SolidJS variations, with code you can copy into your app."
                            >
                                <div className="flex flex-col gap-12">
                                    {examples.map(
                                        ({
                                            id,
                                            words,
                                            source,
                                        }) => (
                                            <section
                                                key={id}
                                                id={`example-${id}`}
                                                aria-labelledby={`example-${id}-title`}
                                                className="flex scroll-mt-24 flex-col gap-4"
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <h3
                                                        id={`example-${id}-title`}
                                                        className="text-title3 font-semibold text-label"
                                                    >
                                                        {
                                                            words.title
                                                        }
                                                    </h3>
                                                    <p className="text-callout text-label-secondary">
                                                        {
                                                            words.description
                                                        }
                                                    </p>
                                                </div>
                                                <div className="overflow-hidden rounded-4xl ring-1 ring-separator/60">
                                                    <div className="bg-background">
                                                        <SolidPreview
                                                            slug={`${slug}-${id}`}
                                                        />
                                                    </div>
                                                    <div className="border-separator/60 border-t">
                                                        <CodeView
                                                            code={
                                                                source
                                                            }
                                                            label={`${slug}-${id}.tsx`}
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    )}
                                </div>
                            </DocSection>
                        )}

                        <DocSection
                            id="best-practices"
                            title="Best practices"
                        >
                            <PracticesList
                                practices={content.practices}
                            />
                        </DocSection>

                        <DocSection
                            id="accessibility"
                            title="Accessibility"
                        >
                            <ul className="m-0 flex list-disc flex-col gap-2 ps-5 text-callout text-label">
                                {content.accessibility.map(
                                    (line) => (
                                        <li key={line}>
                                            {line}
                                        </li>
                                    )
                                )}
                            </ul>
                        </DocSection>
                        {hasApi && (
                            <DocSection
                                id="api-reference"
                                title="API reference"
                                description="Public properties from the native SolidJS TypeScript declarations. Standard HTML attributes may also apply."
                            >
                                <SolidPropsTable
                                    slug={slug}
                                    descriptions={
                                        content.propDescriptions
                                    }
                                />
                            </DocSection>
                        )}
                    </>
                )}
            </article>
            {available && (
                <aside className="hidden xl:block">
                    <div className="sticky top-24">
                        <OnThisPage items={toc} />
                    </div>
                </aside>
            )}
        </div>
    )
}
