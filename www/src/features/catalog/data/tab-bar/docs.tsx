import { TabBar } from "@passui/react";
import { HomeIcon, LibraryIcon, PersonIcon } from "@passui/react/icons";
import {
	SearchList,
	SearchListEmpty,
	SearchListField,
	SearchListItem,
	SearchListResults,
} from "@passui/react/search-list";
import { Sheet } from "@passui/react/sheet";

import { useState } from "react";
import { defineDocs } from "../types";
import { TabBarFiveTabs } from "./examples/tab-bar-five-tabs";
import { TabBarMinimize } from "./examples/tab-bar-minimize";
import { TabBarShowcase } from "./examples/tab-bar-showcase";
import { TabBarUsage } from "./examples/tab-bar-usage";

// The tabs and the search button are objects, so the playground picks
// the active tab and switches search on; the snippet writes the rest.
type DemoProps = {
	label: string;
	active: "home" | "library" | "profile";
	search: boolean;
};

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
] as const;

function TabBarDemo({ label, active, search }: DemoProps) {
	const [current, setCurrent] = useState<DemoProps["active"]>(active);
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
									setCurrent(tab.id);
									setSearchOpen(false);
								}}
							>
								{tab.label}
							</SearchListItem>
						))}
					</SearchListResults>
				</SearchList>
			</Sheet>
			<div className="rounded-5xl bg-fill/40 relative h-40 w-full max-w-sm overflow-hidden">
				<TabBar
					label={label}
					tabs={tabs}
					active={current}
					search={
						search
							? {
									label: "Search",
									onPress: () => setSearchOpen(true),
								}
							: undefined
					}
					className="absolute inset-x-3 bottom-3"
					renderLink={(tab, props) => (
						<a
							key={tab.id}
							href={`#${tab.id}`}
							{...props}
							onClick={(event) => {
								event.preventDefault();
								setCurrent(tab.id);
							}}
						/>
					)}
				/>
			</div>
		</>
	);
}

export const tabBarDocs = defineDocs<DemoProps>()({
	slug: "tab-bar",
	name: "TabBar",
	importPath: "@passui/react",
	controls: {
		label: {
			kind: "text",
			default: "Main",
			required: true,
		},
		active: {
			kind: "select",
			options: {
				home: true,
				library: true,
				profile: true,
			},
			default: "home",
		},
		search: { kind: "boolean", default: true },
	},
	render: (values) => <TabBarDemo key={values.active} {...values} />,
	childrenSnippet: ({ search, active }) => ({
		imports: [
			'import { useState } from "react"',
			'import { HomeIcon, LibraryIcon, PersonIcon } from "@passui/react/icons"',
			...(search
				? [
						'import { Sheet } from "@passui/react/sheet"',
						'import { SearchList, SearchListField, SearchListResults, SearchListItem } from "@passui/react/search-list"',
					]
				: []),
		],
		setup: [
			"const tabs = [",
			'    { id: "home", label: "Home", icon: <HomeIcon size={22} /> },',
			'    { id: "library", label: "Library", icon: <LibraryIcon size={22} /> },',
			'    { id: "profile", label: "Profile", icon: <PersonIcon size={22} /> },',
			"]",
			`const [active, setActive] = useState(${JSON.stringify(active)})`,
			...(search
				? ["const [searchOpen, setSearchOpen] = useState(false)"]
				: []),
		],
		children: "",
		omit: ["active", "search"],
		...(search
			? {
					wrapper: {
						before:
							'<><Sheet open={searchOpen} onClose={() => setSearchOpen(false)} label="Search tabs"><SearchList className="p-4"><SearchListField autoFocus aria-label="Search tabs" /><SearchListResults>{tabs.map((tab) => <SearchListItem key={tab.id} value={tab.label} onSelect={() => { setActive(tab.id); setSearchOpen(false) }}>{tab.label}</SearchListItem>)}</SearchListResults></SearchList></Sheet>',
						after: "</>",
					},
				}
			: {}),
		expressionProps: {
			tabs: "tabs",
			active: "active",
			...(search
				? { search: '{ label: "Search", onPress: () => setSearchOpen(true) }' }
				: {}),
			renderLink:
				"(tab, props) => <a key={tab.id} href={'#' + tab.id} {...props} onClick={(event) => { event.preventDefault(); setActive(tab.id) }} />",
		},
	}),
	usage: TabBarUsage,
	showcase: TabBarShowcase,
	examples: [
		{ id: "minimize", component: TabBarMinimize },
		{ id: "five-tabs", component: TabBarFiveTabs },
	],
});
