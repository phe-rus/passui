import { SearchField } from "@passui/react/search-field";
import { useState } from "react";
export function SearchFieldExpanding() {
	const [value, setValue] = useState("");
	return (
		<SearchField
			collapsible
			aria-label="Search notes"
			placeholder="Search notes…"
			value={value}
			onChange={(event) => setValue(event.target.value)}
		/>
	);
}
