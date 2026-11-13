import { ArchiveIcon } from "@passui/icons/archive";
import { CalendarIcon } from "@passui/icons/calendar";
import type { IconProps } from "@passui/icons/create-icon";
import { FolderIcon } from "@passui/icons/folder";
import { InboxIcon } from "@passui/icons/inbox";
import { NoteIcon } from "@passui/icons/note";
import { TrashIcon } from "@passui/icons/trash";
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@passui/react/sidebar";
import type { ComponentType } from "react";
import { useState } from "react";

type Row = {
	id: string;
	label: string;
	icon: ComponentType<IconProps>;
	count?: number;
};

const sections: { title: string; items: Row[] }[] = [
	{
		title: "Library",
		items: [
			{
				id: "notes",
				label: "All notes",
				icon: NoteIcon,
				count: 248,
			},
			{
				id: "today",
				label: "Today",
				icon: CalendarIcon,
				count: 4,
			},
			{
				id: "inbox",
				label: "Inbox",
				icon: InboxIcon,
				count: 9,
			},
		],
	},
	{
		title: "Folders",
		items: [
			{
				id: "work",
				label: "Work",
				icon: FolderIcon,
				count: 61,
			},
			{
				id: "travel",
				label: "Travel",
				icon: FolderIcon,
				count: 17,
			},
		],
	},
	{
		title: "More",
		items: [
			{
				id: "archive",
				label: "Archive",
				icon: ArchiveIcon,
			},
			{
				id: "trash",
				label: "Recently deleted",
				icon: TrashIcon,
			},
		],
	},
];

export function SidebarGroups() {
	const [active, setActive] = useState("today");

	return (
		<Sidebar aria-label="Notes" className="bg-sidebar w-60 rounded-4xl p-3">
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
	);
}
