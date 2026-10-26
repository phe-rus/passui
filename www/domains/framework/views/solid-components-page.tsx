import { hasSolidComponent } from "@passui/solid/docs"
import { Link } from "@tanstack/react-router"
import { getCatalog } from "@/domains/catalog/get-catalog"

export function SolidComponentsPage() {
    const catalog = getCatalog()
    const implemented = catalog.filter(({ docs }) =>
        hasSolidComponent(docs.slug)
    ).length
    return (
        <article className="flex flex-col gap-8">
            <header className="flex flex-col gap-3">
                <span className="font-mono text-caption text-label-tertiary">
                    SolidJS · @passui/solid
                </span>
                <h1 className="font-brand text-large-title font-extrabold tracking-tight text-label">
                    Components
                </h1>
                <p className="max-w-2xl text-body text-label-secondary">
                    {implemented} of {catalog.length}{" "}
                    component families implemented in native
                    SolidJS, sharing Passui tokens and styles.
                </p>
            </header>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catalog.map(({ docs, content }) => (
                    <Link
                        key={docs.slug}
                        to="/solid/components/$slug"
                        params={{ slug: docs.slug }}
                        className="flex flex-col gap-2 rounded-4xl bg-elevated p-5 text-label no-underline shadow-sm ring-1 ring-separator/60 hover:shadow-md"
                    >
                        <span className="text-headline font-semibold">
                            {docs.name}
                        </span>
                        <span className="text-caption text-accent-text">
                            {hasSolidComponent(docs.slug)
                                ? "Implemented"
                                : "Planned"}
                        </span>
                        <span className="text-footnote text-label-secondary">
                            {content.summary}
                        </span>
                    </Link>
                ))}
            </div>
        </article>
    )
}
