import {
	SearchList,
	SearchListEmpty,
	SearchListField,
	SearchListGroup,
	SearchListItem,
	SearchListResults,
} from "@passui/react/search-list";

const groups = [
	{
		heading: "Security",
		items: [
			{ value: "Password", keywords: ["sign in"] },
			{
				value: "Passkeys",
				keywords: ["face", "touch"],
			},
			{
				value: "Two-step verification",
				keywords: ["2fa", "code"],
			},
		],
	},
	{
		heading: "Preferences",
		items: [
			{ value: "Language", keywords: ["locale"] },
			{
				value: "Appearance",
				keywords: ["dark", "theme"],
			},
		],
	},
];

export function SearchListGroups() {
	return (
		<SearchList className="bg-elevated ring-separator/60 w-full max-w-xs rounded-3xl p-2 ring-1">
			<SearchListField placeholder="Try 2fa or dark" />
			<SearchListResults className="mt-2 max-h-72">
				{groups.map((group) => (
					<SearchListGroup key={group.heading} heading={group.heading}>
						{group.items.map((item) => (
							<SearchListItem
								key={item.value}
								value={item.value}
								keywords={item.keywords}
							>
								{item.value}
							</SearchListItem>
						))}
					</SearchListGroup>
				))}
				<SearchListEmpty className="text-footnote text-label-secondary px-3 py-6 text-center">
					Nothing matches that search
				</SearchListEmpty>
			</SearchListResults>
		</SearchList>
	);
}
