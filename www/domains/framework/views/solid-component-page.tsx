import { hasSolidComponent } from "@passui/solid/docs"
import { Link } from "@tanstack/react-router"
import { getEntry } from "@/domains/catalog/get-catalog"
import { CodeBlock } from "@/domains/guides/views/guide-parts"
import { getSolidExampleSource } from "../get-solid-example-source"
import { SolidPreview } from "./solid-preview"

export function SolidComponentPage({
    slug,
}: {
    slug: string
}) {
    const entry = getEntry(slug)
    if (!entry) return null
    return (
        <article className="flex flex-col gap-8">
            <header className="flex flex-col gap-3">
                <span className="font-mono text-caption text-label-tertiary">
                    SolidJS · @passui/solid
                </span>
                <h1 className="font-brand text-large-title font-extrabold tracking-tight text-label">
                    {entry.docs.name}
                </h1>
                <p className="max-w-2xl text-body text-label-secondary">
                    {entry.content.summary}
                </p>
            </header>
            {!hasSolidComponent(slug) && (
                <section className="flex flex-col gap-4 rounded-4xl bg-fill/60 p-6">
                    <h2 className="text-title3 font-semibold text-label">
                        Solid implementation planned
                    </h2>
                    <p className="max-w-2xl text-callout text-label-secondary">
                        This control is not available from
                        @passui/solid yet. Its native
                        implementation, examples and
                        interaction tests must pass before it
                        is included in the Solid release.
                    </p>
                    <Link
                        to="/components/$slug"
                        params={{ slug }}
                    >
                        View the React counterpart
                    </Link>
                </section>
            )}
            {hasSolidComponent(slug) && (
                <>
                    <section
                        className="overflow-hidden rounded-4xl ring-1 ring-separator/60"
                        aria-label="Native SolidJS example"
                    >
                        <SolidPreview
                            slug={`${slug}-usage`}
                        />
                        <CodeBlock
                            code={getSolidExampleSource(
                                slug,
                                "usage"
                            )}
                            label={`${slug}-usage.tsx`}
                        />
                    </section>
                    {slug === "button" && (
                        <section
                            className="flex flex-col gap-4"
                            aria-label="Pending example"
                        >
                            <h2 className="text-title3 font-semibold text-label">
                                Pending
                            </h2>
                            <SolidPreview slug="button-pending" />
                            <CodeBlock
                                code={getSolidExampleSource(
                                    slug,
                                    "pending"
                                )}
                                label="button-pending.tsx"
                            />
                        </section>
                    )}
                </>
            )}
        </article>
    )
}
