import { ContentUnavailableView } from "@passui/react/content-unavailable-view"
import { Button } from "@passui/react/button"
import { Link } from "@tanstack/react-router"
import { catalogGroups } from "../catalog-groups"
import { getNavigationCatalog } from "../get-navigation"
import { catalogIcons } from "@passui/react/icons"
import { componentTitle, matchesComponent } from "../navigation"
import { SearchField } from "@passui/react/search-field"
import { useState } from "react"

/** Every component, by group: its icon, name and what it's for. */
export function ComponentsOverview() {
    const catalog = getNavigationCatalog()
    const [query, setQuery] = useState("")
    const matches = catalog.filter((entry) => matchesComponent(entry, query))

    return (
        <article className="flex flex-col gap-8">
            <header className="flex flex-col gap-2">
                <span className="text-footnote font-medium text-label-tertiary">Catalog</span>
                <h1 className="font-brand text-large-title font-extrabold tracking-tight">
                    Components
                </h1>
                <p className="max-w-2xl text-callout text-label-secondary">
                    {catalog.length} components, with interactive previews and practical React
                    examples.
                </p>
            </header>
            <div className="flex max-w-lg flex-col gap-2">
                <SearchField
                    aria-label="Search components"
                    placeholder="Search components…"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <span role="status" className="text-footnote text-label-secondary">
                    {matches.length}{" "}
                    {matches.length === 1 ? "component family" : "component families"}
                </span>
            </div>
            {matches.length === 0 && (
                <ContentUnavailableView
                    title="No matching components"
                    description="Try another name or description."
                    actions={
                        <Button size="sm" variant="secondary" onClick={() => setQuery("")}>
                            Clear search
                        </Button>
                    }
                />
            )}
            {catalogGroups.map((group) => {
                const entries = matches.filter((entry) => entry.group === group)
                if (!entries.length) return null
                const groupId = `group-${group.toLowerCase().replaceAll(" ", "-")}`
                return (
                    <section key={group} aria-labelledby={groupId} className="flex flex-col gap-5">
                        <h2
                            id={groupId}
                            className="font-brand text-title2 font-extrabold tracking-tight"
                        >
                            {group}
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {entries.map(({ docs, content, icon }) => {
                                const Icon = catalogIcons[icon as keyof typeof catalogIcons]
                                return (
                                    <Link
                                        key={docs.slug}
                                        to="/components/react/$slug"
                                        params={{ slug: docs.slug }}
                                        className="group flex flex-col items-start gap-2 rounded-xl bg-elevated p-3 ring-1 ring-separator/60 transition-colors duration-150 hover:bg-fill/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
                                    >
                                        <span className="flex size-7 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
                                            <Icon size={16} />
                                        </span>
                                        <strong className="text-subheadline font-semibold text-label">
                                            {componentTitle({
                                                docs,
                                            })}
                                        </strong>
                                        <span className="text-footnote leading-footnote text-label-secondary">
                                            {content.summary}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </article>
    )
}
