import { HomeIcon } from "@passui/icons/home";
import { SearchIcon } from "@passui/icons/search";
import { SettingsIcon } from "@passui/icons/settings";
import { TabBar, TabBarItem } from "@passui/react/tab-bar";
import { useState } from "react";

export function TabBarTwoTabs() {
	const [tab, setTab] = useState("home");
	return (
		<TabBar>
			<TabBarItem
				icon={<HomeIcon />}
				label="Home"
				active={tab === "home"}
				onClick={() => setTab("home")}
			/>
			<TabBarItem
				icon={<SearchIcon />}
				label="Search"
				active={tab === "search"}
				onClick={() => setTab("search")}
			/>
			<TabBarItem
				icon={<SettingsIcon />}
				label="Settings"
				active={tab === "settings"}
				onClick={() => setTab("settings")}
			/>
		</TabBar>
	);
}
