import { BellIcon } from "@passui/icons/bell";
import { HomeIcon } from "@passui/icons/home";
import { SettingsIcon } from "@passui/icons/settings";
import { TabBar, TabBarItem } from "@passui/react/tab-bar";
import { Text } from "@passui/react/text";
import { useState } from "react";

/** Scroll the list down and the bar folds to icons; scroll up, reach the top, or tap it and the labels return. */
export function TabBarScrollAware() {
	const [tab, setTab] = useState("home");
	return (
		<div className="bg-background border-separator relative h-80 w-full max-w-xs overflow-hidden rounded-4xl border">
			<div className="h-full overflow-y-auto px-5 pt-6 pb-28">
				{Array.from({ length: 24 }, (_, row) => (
					<Text
						key={row}
						size="subheadline"
						className="border-separator block border-b py-3"
					>
						Row {row + 1}
					</Text>
				))}
			</div>
			<div className="absolute inset-x-0 bottom-3">
				<TabBar autoMinimize aria-label="Sections">
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
			</div>
		</div>
	);
}
