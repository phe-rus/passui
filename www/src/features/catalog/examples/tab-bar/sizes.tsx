import { BellIcon } from "@passui/icons/bell";
import { HomeIcon } from "@passui/icons/home";
import { SettingsIcon } from "@passui/icons/settings";
import { TabBar, TabBarItem } from "@passui/react/tab-bar";
import { useState } from "react";

export function TabBarSizes() {
	const [tab, setTab] = useState("home");
	return (
		<div className="flex flex-col items-center gap-4">
			{(["sm", "md", "lg"] as const).map((size) => (
				<TabBar key={size} size={size} aria-label={`Sections, ${size}`}>
					<TabBarItem
						icon={<HomeIcon />}
						label="Home"
						active={tab === "home"}
						onClick={() => setTab("home")}
					/>
					<TabBarItem
						icon={<BellIcon />}
						label="Alerts"
						active={tab === "alerts"}
						onClick={() => setTab("alerts")}
					/>
					<TabBarItem
						icon={<SettingsIcon />}
						label="Settings"
						active={tab === "settings"}
						onClick={() => setTab("settings")}
					/>
				</TabBar>
			))}
		</div>
	);
}
