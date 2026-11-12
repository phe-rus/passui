import { HomeIcon } from "@passui/icons/home";
import { SearchIcon } from "@passui/icons/search";
import { SettingsIcon } from "@passui/icons/settings";
import { Button } from "@passui/react/button";
import { TabBar, TabBarItem } from "@passui/react/tab-bar";
import { useState } from "react";

export function TabBarMinimized() {
	const [minimized, setMinimized] = useState(true);
	return (
		<div className="flex flex-col items-center gap-4">
			<TabBar minimized={minimized}>
				<TabBarItem icon={<HomeIcon />} label="Home" active />
				<TabBarItem icon={<SearchIcon />} label="Search" />
				<TabBarItem icon={<SettingsIcon />} label="Settings" />
			</TabBar>
			<Button
				size="sm"
				variant="secondary"
				onClick={() => setMinimized((value) => !value)}
			>
				{minimized ? "Expand" : "Minimize"}
			</Button>
		</div>
	);
}
