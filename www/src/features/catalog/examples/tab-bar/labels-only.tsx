import { BellIcon } from "@passui/icons/bell";
import { HomeIcon } from "@passui/icons/home";
import { TabBar, TabBarItem } from "@passui/react/tab-bar";

export function TabBarLabelsOnly() {
	return (
		<TabBar minimized>
			<TabBarItem icon={<HomeIcon />} label="Home" active />
			<TabBarItem icon={<BellIcon />} label="Alerts" />
		</TabBar>
	);
}
