import { SidebarGroups } from "../examples/sidebar/groups";
import { SidebarShowcase } from "../examples/sidebar/showcase";
import { SidebarSizes } from "../examples/sidebar/sizes";
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
			description: "A console layout: a glass sidebar beside the content.",
			Demo: SidebarShowcase,
		},
		{
			id: "unread",
			title: "Counts that change",
			description:
				"Counts show what needs attention and disappear once there's nothing left.",
			Demo: SidebarUnread,
		},
		{
			id: "sizes",
			title: "Sizes",
			description:
				"`sm`, `md` and `lg` follow the control scale; the group label takes the same size.",
			Demo: SidebarSizes,
		},
		{
			id: "usage",
			title: "Basic",
			description: "A group with a label and two rows.",
			Demo: SidebarUsage,
		},
	],
	accessibility: [
		'A `nav` landmark: name it with `aria-label`. The current row carries `aria-current="page"` through `isActive`, or through your router when you pass `render`.',
		"Show counts only when they need attention, like unread items.",
	],
};
