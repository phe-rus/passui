import { ContextMenuOptions } from "../examples/context-menu/options";
import { ContextMenuUsage } from "../examples/context-menu/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"Opens at the pointer on right click, or on long press on touch. A bead of glass swells from the pointer into the menu and drops back on close. Every part is a Dropdown Menu part under its context name.",
			Demo: ContextMenuUsage,
		},
		{
			id: "options",
			title: "Options and submenu",
			description:
				"Checkbox and radio items with a nested menu. Press near a window edge to see the menu flip toward the room it has.",
			Demo: ContextMenuOptions,
		},
	],
	accessibility: [
		"Opens from the keyboard with Shift+F10 or the Menu key on the focused region. Arrow keys, typeahead and Escape work as in Dropdown Menu.",
		"Under reduced motion the glass drop is replaced by a short scale and fade.",
	],
};
