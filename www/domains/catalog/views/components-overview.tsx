import { HugeiconsIcon } from "@hugeicons/react"
import { hasSolidComponent } from "@passui/solid/docs"
import { buttonStyle } from "@passui/react/button"
import { Link } from "@tanstack/react-router"
import { catalogGroups, getCatalog } from "../get-catalog"
import {
    componentTitle,
    matchesComponent,
} from "../navigation"
import { SearchField } from "@passui/react/search-field"
import { useState } from "react"

/** Every component, by group: its icon, name and what it's for. */
export function ComponentsOverview() {
    const catalog = getCatalog()
    const linkStyle = buttonStyle({
        variant: "secondary",
        size: "xs",
    })
    const [query, setQuery] = useState("")
    const matches = catalog.filter((entry) =>
        matchesComponent(entry, query)
    )

    return (
        <article className="flex flex-col gap-5">
            <header className="flex flex-col gap-2">
                <span className="font-mono">
                    Getting started
                </span>
                <h1 className="font-brand text-large-title font-extrabold tracking-tight">
                    Components
                </h1>
                <p className="max-w-2xl">
                    {catalog.length} component families with
                    native React and SolidJS examples,
                    interactive previews and copyable code.
                </p>
            </header>
            <div className="flex max-w-lg flex-col gap-2">
                <SearchField
                    aria-label="Search components"
                    placeholder="Search components…"
                    value={query}
                    onChange={(event) =>
                        setQuery(event.target.value)
                    }
                />
                <span role="status">
                    {matches.length} component families
                </span>
            </div>
            {catalogGroups.map((group) => {
                const entries = matches.filter(
                    (entry) => entry.group === group
                )
                if (!entries.length) return null
                const groupId = `group-${group.toLowerCase().replaceAll(" ", "-")}`
                return (
                    <section
                        key={group}
                        aria-labelledby={groupId}
                        className="flex flex-col gap-5"
                    >
                        <h2
                            id={groupId}
                            className="font-brand text-title2 font-extrabold tracking-tight"
                        >
                            {group}
                        </h2>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {entries.map(
                                ({ docs, content, icon }) => (
                                    <div
                                        key={docs.slug}
                                        className="group flex flex-col gap-2 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60 transition-shadow hover:shadow-md"
                                    >
                                        <span className="flex size-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-text">
                                            <HugeiconsIcon
                                                icon={icon}
                                                size={20}
                                            />
                                        </span>
                                        <strong>
                                            {componentTitle({
                                                docs,
                                            })}
                                        </strong>
                                        <span>
                                            {content.summary}
                                        </span>
                                        <div className="mt-auto flex flex-wrap gap-2 pt-3">
                                            <Link
                                                to="/components/react/$slug"
                                                params={{
                                                    slug: docs.slug,
                                                }}
                                                className={
                                                    linkStyle
                                                }
                                            >
                                                React
                                            </Link>
                                            {hasSolidComponent(
                                                docs.slug
                                            ) && (
                                                <Link
                                                    to="/components/solid/$slug"
                                                    params={{
                                                        slug: docs.slug,
                                                    }}
                                                    className={
                                                        linkStyle
                                                    }
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
