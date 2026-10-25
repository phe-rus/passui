import { SearchField } from "@passui/react"
import { useState } from "react"

const people = [
    "Aiko Kamado",
    "Ben Ito",
    "Chiara Rossi",
    "Dev Patel",
    "Emma Laurent",
    "Farah Haddad",
]

export function SearchFieldShowcase() {
    const [query, setQuery] = useState("")
    const results = people.filter((person) =>
        person
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    )

    return (
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <SearchField
                aria-label="Search people"
                placeholder="Search people"
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />
            <ul className="m-0 flex list-none flex-col p-0">
                {results.map((person) => (
                    <li
                        key={person}
                        className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-fill/60"
                    >
                        <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-caption font-bold text-accent-text">
                            {person
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                        </span>
                        <span className="text-subheadline text-label">
                            {person}
                        </span>
                    </li>
                ))}
                {results.length === 0 && (
                    <li className="px-2 py-6 text-center text-footnote text-label-secondary">
                        No one matches “{query}”.
                    </li>
                )}
            </ul>
        </div>
    )
}
