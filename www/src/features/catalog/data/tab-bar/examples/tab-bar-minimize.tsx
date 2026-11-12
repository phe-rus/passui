import { TabBar } from "@passui/react";
import { HomeIcon, LibraryIcon, PersonIcon } from "@passui/react/icons";
import { Sheet } from "@passui/react/legacy/sheet";
import {
	SearchList,
	SearchListEmpty,
	SearchListField,
	SearchListItem,
	SearchListResults,
} from "@passui/react/search-list";
import { useState } from "react";

const tabs = [
	{
		id: "home",
		label: "Home",
		icon: <HomeIcon size={22} />,
	},
	{
		id: "library",
		label: "Library",
		icon: <LibraryIcon size={22} />,
	},
	{
		id: "profile",
		label: "Profile",
		icon: <PersonIcon size={22} />,
	},
];

const books = Array.from({ length: 24 }, (_, index) => `Chapter ${index + 1}`);

export function TabBarMinimize() {
	const [active, setActive] = useState("library");

	const [searchOpen, setSearchOpen] = useState(false);
	return (
		<>
			<Sheet
				open={searchOpen}
				onClose={() => setSearchOpen(false)}
				label="Search tabs"
			>
				<SearchList className="p-4">
					<SearchListField
						autoFocus
						aria-label="Search tabs"
						placeholder="Search tabs…"
					/>
					<SearchListResults>
						<SearchListEmpty>No matching tabs.</SearchListEmpty>
						{tabs.map((tab) => (
							<SearchListItem
								key={tab.id}
								value={tab.label}
								onSelect={() => {
									setActive(tab.id);
									setSearchOpen(false);
								}}
							>
								{tab.label}
							</SearchListItem>
						))}
					</SearchListResults>
				</SearchList>
			</Sheet>
			<div className="rounded-5xl bg-background ring-separator/60 relative h-96 w-full max-w-xs overflow-hidden ring-1">
				<ul className="m-0 h-full list-none overflow-y-auto p-4 pb-24">
					{books.map((book) => (
						<li
							key={book}
							className="border-separator/60 text-subheadline text-label border-b py-3"
						>
							{book}
						</li>
					))}
				</ul>
				<TabBar
					label="Main"
					tabs={tabs}
					active={active}
					search={{
						label: "Search",
						onPress: () => setSearchOpen(true),
					}}
					className="absolute inset-x-3 bottom-3"
					renderLink={(tab, props) => (
						<a
							key={tab.id}
							href={`#${tab.id}`}
							{...props}
							onClick={(event) => {
								event.preventDefault();
								setActive(tab.id);
							}}
						/>
					)}
				/>
			</div>
		</>
	);
}
