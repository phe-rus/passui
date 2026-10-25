import { SearchField } from "@passui/react"
import { useState } from "react"

export function SearchFieldUsage() {
    const [query, setQuery] = useState("")
    return (
        <div className="w-full max-w-xs">
            <SearchField
                aria-label="Search notes"
                placeholder="Search notes"
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />
        </div>
    )
}
