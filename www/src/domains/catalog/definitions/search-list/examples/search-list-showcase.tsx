import { toast } from "@passui/react";
import {
	SearchList,
	SearchListEmpty,
	SearchListField,
	SearchListGroup,
	SearchListItem,
	SearchListResults,
} from "@passui/react/search-list";

const people = [
	{ name: "Aiko Kamado", role: "Design" },
	{ name: "Kenji Mori", role: "Engineering" },
	{ name: "Mira Patel", role: "Support" },
];

const actions = [
	{ name: "New project", keywords: ["create"] },
	{ name: "Invite people", keywords: ["team", "share"] },
	{ name: "Open settings", keywords: ["preferences"] },
];

export function SearchListShowcase() {
	return (
		<SearchList className="bg-elevated ring-separator/60 w-full max-w-sm rounded-4xl p-3 shadow-sm ring-1">
			<SearchListField placeholder="Search people and actions" />
			<SearchListResults className="mt-2 max-h-80">
				<SearchListGroup heading="People">
					{people.map((person) => (
						<SearchListItem
							key={person.name}
							value={person.name}
							keywords={[person.role]}
							onSelect={(name) => toast(`Opened ${name}`)}
						>
							<span className="text-subheadline text-label flex-1">
								{person.name}
							</span>
							<span className="text-caption text-label-tertiary">
								{person.role}
							</span>
						</SearchListItem>
					))}
				</SearchListGroup>
				<SearchListGroup heading="Actions">
					{actions.map((action) => (
						<SearchListItem
							key={action.name}
							value={action.name}
							keywords={action.keywords}
							onSelect={(name) => toast(name)}
						>
							<span className="text-subheadline text-label">{action.name}</span>
						</SearchListItem>
					))}
				</SearchListGroup>
				<SearchListEmpty className="text-footnote text-label-secondary px-3 py-8 text-center">
					No people or actions match
				</SearchListEmpty>
			</SearchListResults>
		</SearchList>
	);
}
