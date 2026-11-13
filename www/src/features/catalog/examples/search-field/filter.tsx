import { Card, CardContent } from "@passui/react/card";
import { LabeledContent } from "@passui/react/labeled-content";
import { SearchField } from "@passui/react/search-field";
import { Text } from "@passui/react/text";
import { useState } from "react";

const apps = [
	{ name: "Pass console", people: 12 },
	{ name: "Accounts", people: 1284 },
	{ name: "Notables", people: 431 },
	{ name: "Showcase", people: 58 },
];

export function SearchFieldFilter() {
	const [query, setQuery] = useState("");
	const matches = apps.filter((app) =>
		app.name.toLowerCase().includes(query.trim().toLowerCase()),
	);

	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<SearchField
				aria-label="Search applications"
				placeholder="Search applications"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<Card className="w-full overflow-hidden">
				<CardContent className="px-0">
					{matches.length ? (
						matches.map((app) => (
							<LabeledContent key={app.name} label={app.name}>
								<Text
									as="span"
									size="footnote"
									tone="secondary"
									className="tabular-nums"
								>
									{app.people} people
								</Text>
							</LabeledContent>
						))
					) : (
						<Text
							size="footnote"
							tone="secondary"
							className="px-4 py-6 text-center"
						>
							No applications match “{query}”
						</Text>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
