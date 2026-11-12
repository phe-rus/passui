import { DropdownMenuNotes } from "../examples/dropdown-menu/notes";
import { DropdownMenuOptions } from "../examples/dropdown-menu/options";
import { DropdownMenuSubmenu } from "../examples/dropdown-menu/submenu";
import { DropdownMenuUsage } from "../examples/dropdown-menu/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "notes",
			title: "Water drop",
			description:
				"The round button swells into the menu and, on close, the menu drops back into it, as in the iOS Notes three dots menu.",
			Demo: DropdownMenuNotes,
		},
		{
			id: "usage",
			title: "Usage",
			description:
				"Items, a label, a shortcut, a separator and a disabled item.",
			Demo: DropdownMenuUsage,
		},
		{
			id: "options",
			title: "Checkbox and radio items",
			description: "Checkbox items can stay open with `closeOnSelect={false}`.",
			Demo: DropdownMenuOptions,
		},
		{
			id: "submenu",
			title: "Submenus",
			description: "Open with the right arrow, close with the left arrow.",
			Demo: DropdownMenuSubmenu,
		},
	],
	accessibility: [
		"Roles `menu`, `menuitem`, `menuitemcheckbox` and `menuitemradio` with correct checked states.",
		"Arrow keys move, Home and End jump, and typing a letter jumps to a matching item.",
		"Escape closes the top menu only, and focus returns to the trigger.",
		"Choosing an item closes the menu unless the item says otherwise.",
	],
};
