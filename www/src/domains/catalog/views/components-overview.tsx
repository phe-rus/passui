import { Button } from "@passui/react/button"
import { Link } from "@tanstack/react-router"
import { catalogGroups, getCatalog } from "../get-catalog"
import { componentTitle, matchesComponent } from "../navigation"
import { SearchField } from "@passui/react/search-field"
import { useState } from "react"

/** Every component, by group: its icon, name and what it's for. */
export function ComponentsOverview() {
    const catalog = getCatalog()
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
                <div className="flex flex-col items-start gap-3 rounded-3xl border border-separator/60 bg-elevated p-6">
                    <h2 className="text-title3 font-semibold text-label">No matching components</h2>
                    <p className="text-callout text-label-secondary">
                        Try another name or description, or clear your search to browse the entire
                        catalog.
                    </p>
                    <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => setQuery("")}
                    >
                        Clear search
                    </Button>
                </div>
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
                            {entries.map(({ docs, content, icon: Icon }) => (
                                <Link
                                    key={docs.slug}
                                    to="/components/react/$slug"
                                    params={{ slug: docs.slug }}
                                    className="group flex min-h-40 flex-col items-start gap-2 rounded-3xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
                                >
                                    <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                                        <Icon size={18} />
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
                            ))}
                        </div>
                    </section>
                )
            })}
        </article>
    )
}
