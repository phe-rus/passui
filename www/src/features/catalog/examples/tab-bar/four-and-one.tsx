import { BellIcon } from "@passui/icons/bell";
import { HomeIcon } from "@passui/icons/home";
import { SearchIcon } from "@passui/icons/search";
import { SettingsIcon } from "@passui/icons/settings";
import { TabBar, TabBarAction, TabBarItem } from "@passui/react/tab-bar";
import { useState } from "react";

export function TabBarFourAndOne() {
	const [tab, setTab] = useState("home");
	const tabs = [
		{ id: "home", label: "Home", icon: <HomeIcon /> },
		{ id: "alerts", label: "Alerts", icon: <BellIcon /> },
		{ id: "settings", label: "Settings", icon: <SettingsIcon /> },
	];
	return (
		<TabBar
			aria-label="Sections"
			action={<TabBarAction icon={<SearchIcon />} label="Search" />}
		>
			{tabs.map((item) => (
				<TabBarItem
					key={item.id}
					icon={item.icon}
					label={item.label}
					active={tab === item.id}
					onClick={() => setTab(item.id)}
				/>
			))}
		</TabBar>
	);
}
