import { SearchField } from "@passui/react/search-field";
import { Text } from "@passui/react/text";
import { useState } from "react";

const people = [
	"Aiko Kamado",
	"Ben Ito",
	"Chiara Rossi",
	"Dev Patel",
	"Emma Laurent",
	"Farah Haddad",
];

export function SearchFieldShowcase() {
	const [query, setQuery] = useState("");
	const results = people.filter((person) =>
		person.toLowerCase().includes(query.trim().toLowerCase()),
	);

	return (
		<div className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col gap-3 rounded-4xl p-4 shadow-sm ring-1">
			<SearchField
				aria-label="Search people"
				placeholder="Search people"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<ul className="m-0 flex list-none flex-col p-0">
				{results.map((person) => (
					<li
						key={person}
						className="hover:bg-fill/60 flex items-center gap-3 rounded-2xl px-2 py-2"
					>
						<span className="bg-accent-soft text-caption text-accent-text flex size-8 items-center justify-center rounded-full font-bold">
							{person
								.split(" ")
								.map((part) => part[0])
								.join("")}
						</span>
						<Text as="span" size="subheadline">
							{person}
						</Text>
					</li>
				))}
				{results.length === 0 && (
					<li className="text-footnote text-label-secondary px-2 py-6 text-center">
						No one matches “{query}”.
					</li>
				)}
			</ul>
		</div>
	);
}
