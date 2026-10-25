import {
    LabeledContent,
    SearchField,
    Section,
} from "@passui/react"
import { useState } from "react"

const apps = [
    { name: "Pass console", people: 12 },
    { name: "Accounts", people: 1284 },
    { name: "Notables", people: 431 },
    { name: "Showcase", people: 58 },
]

export function SearchFieldFilter() {
    const [query, setQuery] = useState("")
    const matches = apps.filter((app) =>
        app.name
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    )

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <SearchField
                aria-label="Search applications"
                placeholder="Search applications"
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />
            <Section>
                {matches.length ? (
                    matches.map((app) => (
                        <LabeledContent
                            key={app.name}
                            label={app.name}
                        >
                            <span className="text-footnote text-label-secondary tabular-nums">
                                {app.people} people
                            </span>
                        </LabeledContent>
                    ))
                ) : (
                    <p className="px-4 py-6 text-center text-footnote text-label-secondary">
                        No applications match “{query}”
                    </p>
                )}
            </Section>
        </div>
    )
}
