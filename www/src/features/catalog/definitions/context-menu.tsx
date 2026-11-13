import { ContextMenuUsage } from "../examples/context-menu/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"Opens at the pointer on right click, or on long press on touch. Every part is a Dropdown Menu part under its context name.",
			Demo: ContextMenuUsage,
		},
	],
	accessibility: [
		"Opens from the keyboard with Shift+F10 or the Menu key on the focused region. Arrow keys, typeahead and Escape work as in Dropdown Menu.",
	],
};
