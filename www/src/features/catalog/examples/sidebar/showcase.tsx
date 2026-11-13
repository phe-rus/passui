import { ChartIcon } from "@passui/icons/chart";
import { FolderIcon } from "@passui/icons/folder";
import { HomeIcon } from "@passui/icons/home";
import { PersonIcon } from "@passui/icons/person";
import { SettingsIcon } from "@passui/icons/settings";
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@passui/react/sidebar";
import { Text } from "@passui/react/text";
import { useState } from "react";

const sections = [
	{
		title: "Console",
		items: [
			{
				id: "overview",
				label: "Overview",
				icon: HomeIcon,
			},
			{
				id: "apps",
				label: "Applications",
				icon: FolderIcon,
				count: 6,
			},
			{
				id: "users",
				label: "Users",
				icon: PersonIcon,
				count: 1284,
			},
			{
				id: "activity",
				label: "Activity",
				icon: ChartIcon,
			},
		],
	},
	{
		title: "Project",
		items: [
			{
				id: "settings",
				label: "Settings",
				icon: SettingsIcon,
			},
		],
	},
];

const titles: Record<string, string> = {
	overview: "Overview",
	apps: "Applications",
	users: "Users",
	activity: "Activity",
	settings: "Settings",
};

export function SidebarShowcase() {
	const [active, setActive] = useState("users");

	return (
		<div className="rounded-5xl bg-background ring-separator/60 flex h-80 w-full max-w-2xl overflow-hidden shadow-sm ring-1">
			<Sidebar
				aria-label="Console"
				className="glass-pane w-56 shrink-0 p-3 max-sm:hidden"
			>
				{sections.map((section) => (
					<SidebarGroup key={section.title}>
						<SidebarGroupLabel>{section.title}</SidebarGroupLabel>
						<SidebarMenu>
							{section.items.map((item) => (
								<SidebarMenuItem key={item.id}>
									<SidebarMenuButton
										href={`#${item.id}`}
										isActive={item.id === active}
										icon={<item.icon size={18} />}
										badge={item.count}
										onClick={(event) => {
											event.preventDefault();
											setActive(item.id);
										}}
									>
										{item.label}
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				))}
			</Sidebar>
			<div className="flex flex-1 flex-col gap-3 p-6">
				<Text as="h2" size="title3" weight="bold">
					{titles[active]}
				</Text>
				<div className="bg-fill/60 h-16 rounded-3xl" />
				<div className="bg-fill/60 h-16 rounded-3xl" />
			</div>
		</div>
	);
}
