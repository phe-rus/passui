import { DropdownMenuOptions } from "../examples/dropdown-menu-options";
import { DropdownMenuSubmenu } from "../examples/dropdown-menu-submenu";
import { DropdownMenuUsage } from "../examples/dropdown-menu-usage";
import type { UiDoc } from "../types";
import { openProps, renderProp } from "./_shared";

const itemProps = [
	{
		name: "disabled",
		type: "boolean",
		description: "Skips the item in navigation and selection.",
	},
	{
		name: "closeOnSelect",
		type: "boolean",
		default: "true",
		description: "Set false to keep the menu open after choosing.",
	},
];

export const doc: UiDoc = {
	slug: "dropdown-menu",
	name: "Dropdown Menu",
	group: "Presentation",
	icon: "menu",
	summary:
		"A list of actions from a button, on the Zag menu machine, with checkbox and radio items, groups, shortcuts and submenus.",
	entry: "@passui/react/dropdown-menu",
	sizeKb: 33,
	parts: [
		{
			name: "DropdownMenu",
			description: "Owns the open state, highlight and typeahead.",
			props: [
				...openProps,
				{
					name: "placement",
					type: "Placement",
					default: '"bottom-start"',
					description: "Where the list sits against its trigger.",
				},
				{
					name: "closeOnSelect",
					type: "boolean",
					default: "true",
					description: "Whether choosing an item closes the menu.",
				},
			],
		},
		{
			name: "DropdownMenuTrigger",
			description: "Opens the menu.",
			props: [renderProp],
		},
		{
			name: "DropdownMenuContent",
			description: "The floating list.",
			props: [renderProp],
		},
		{
			name: "DropdownMenuItem",
			description: "An action.",
			props: [
				...itemProps,
				{
					name: "onSelect",
					type: "() => void",
					description: "Runs when chosen by pointer or keyboard.",
				},
			],
		},
		{
			name: "DropdownMenuCheckboxItem",
			description: "A toggle with `checked` and `onCheckedChange`.",
			props: itemProps,
		},
		{
			name: "DropdownMenuRadioGroup",
			description: "Holds radio items with one `value`.",
		},
		{
			name: "DropdownMenuRadioItem",
			description: "One choice in a radio group.",
			props: itemProps,
		},
		{ name: "DropdownMenuGroup", description: "Groups items under a label." },
		{ name: "DropdownMenuLabel", description: "A heading inside the list." },
		{ name: "DropdownMenuSeparator", description: "A divider line." },
		{ name: "DropdownMenuShortcut", description: "A trailing key hint." },
		{
			name: "DropdownMenuSub",
			description: "A nested menu with its own state.",
		},
		{
			name: "DropdownMenuSubTrigger",
			description: "The item that opens a submenu.",
		},
		{ name: "DropdownMenuSubContent", description: "The nested list." },
	],
	examples: [
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
