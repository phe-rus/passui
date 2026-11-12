import { SidebarGroups } from "../examples/sidebar/groups";
import { SidebarShowcase } from "../examples/sidebar/showcase";
import { SidebarUnread } from "../examples/sidebar/unread";
import { SidebarUsage } from "../examples/sidebar/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "groups",
			title: "Several groups",
			description:
				"Groups for places, folders and housekeeping, on the sidebar background.",
			Demo: SidebarGroups,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: SidebarShowcase,
		},
		{
			id: "unread",
			title: "Counts that change",
			description:
				"Counts show what needs attention and disappear once there's nothing left.",
			Demo: SidebarUnread,
		},
		{ id: "usage", title: "Usage", description: "", Demo: SidebarUsage },
	],
	accessibility: [
		"Set aria-current on the active row's link. Routers like TanStack Router do this for you.",
		"Show counts only when they need attention, like unread items.",
	],
};
