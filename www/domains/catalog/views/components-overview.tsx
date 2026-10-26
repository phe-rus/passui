import { HugeiconsIcon } from "@hugeicons/react"
import { hasSolidComponent } from "@passui/solid/docs"
import { Link } from "@tanstack/react-router"
import { catalogGroups, getCatalog } from "../get-catalog"

/** Every component, by group: its icon, name and what it's for. */
export function ComponentsOverview() {
    const catalog = getCatalog()

    return (
        <article className="flex flex-col gap-12">
            <header className="flex flex-col gap-3">
                <span className="font-mono text-caption text-label-tertiary">
                    Getting started
                </span>
                <h1 className="font-brand text-large-title font-extrabold tracking-tight text-label">
                    Components
                </h1>
                <p className="max-w-2xl text-body text-label-secondary">
                    {catalog.length} component families with
                    native React and SolidJS examples,
                    interactive previews and copyable code.
                </p>
            </header>
            {catalogGroups.map((group) => {
                const entries = catalog.filter(
                    (entry) => entry.group === group
                )
                if (!entries.length) return null
                return (
                    <section
                        key={group}
                        aria-labelledby={`group-${group}`}
                        className="flex flex-col gap-4"
                    >
                        <h2
                            id={`group-${group}`}
                            className="font-brand text-title2 font-extrabold tracking-tight text-label"
                        >
                            {group}
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {entries.map(
                                ({ docs, content, icon }) => (
                                    <div
                                        key={docs.slug}
                                        className="group flex flex-col gap-2 rounded-4xl bg-elevated p-5 text-label shadow-sm ring-1 ring-separator/60 transition-shadow hover:shadow-md"
                                    >
                                        <span className="flex size-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-text">
                                            <HugeiconsIcon
                                                icon={icon}
                                                size={20}
                                            />
                                        </span>
                                        <span className="text-headline font-semibold">
                                            {docs.name}
                                        </span>
                                        <span className="text-footnote text-label-secondary">
                                            {content.summary}
                                        </span>
                                        <div className="mt-auto flex flex-wrap gap-2 pt-3">
                                            <Link
                                                to="/components/$slug"
                                                params={{
                                                    slug: docs.slug,
                                                }}
                                                className="rounded-full bg-fill px-3 py-1.5 text-footnote font-semibold text-label no-underline hover:bg-separator/60"
                                            >
                                                React
                                            </Link>
                                            {hasSolidComponent(
                                                docs.slug
                                            ) && (
                                                <Link
                                                    to="/solid/components/$slug"
                                                    params={{
                                                        slug: docs.slug,
                                                    }}
                                                    className="rounded-full bg-fill px-3 py-1.5 text-footnote font-semibold text-label no-underline hover:bg-separator/60"
                                                >
                                                    SolidJS
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                )
            })}
        </article>
    )
}
