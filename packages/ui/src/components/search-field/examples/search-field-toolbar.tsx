import { SearchField } from "@passui/react"
import { Button } from "@passui/react/button"
import { useState } from "react"

export function SearchFieldToolbar() {
    const [query, setQuery] = useState("")

    return (
        <div className="flex w-full max-w-lg items-center gap-2 rounded-4xl bg-elevated p-2 shadow-sm ring-1 ring-separator/60">
            <SearchField
                aria-label="Search people"
                placeholder="Search people"
                className="flex-1"
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />
            <Button variant="secondary" size="sm">
                Filters
            </Button>
            <Button variant="accent" size="sm">
                Invite
            </Button>
        </div>
    )
}
