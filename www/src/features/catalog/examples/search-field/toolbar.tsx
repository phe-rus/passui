import { Button } from "@passui/react/button";
import { SearchField } from "@passui/react/search-field";
import { useState } from "react";

export function SearchFieldToolbar() {
	const [query, setQuery] = useState("");

	return (
		<div className="bg-elevated ring-separator/60 flex w-full max-w-lg items-center gap-2 rounded-4xl p-2 shadow-sm ring-1">
			<SearchField
				aria-label="Search people"
				placeholder="Search people"
				className="flex-1"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<Button variant="secondary" size="sm">
				Filters
			</Button>
			<Button size="sm">Invite</Button>
		</div>
	);
}
