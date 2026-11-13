import { CommandGroups } from "../examples/command/groups";
import { CommandNoResults } from "../examples/command/no-results";
import { CommandPalette } from "../examples/command/palette";
import { CommandUsage } from "../examples/command/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Arrow keys move, Enter runs, typing filters.",
			Demo: CommandUsage,
		},
		{
			id: "palette",
			title: "Command palette",
			description: "Put Command inside a Dialog and open it with a shortcut.",
			Demo: CommandPalette,
		},
		{
			id: "groups",
			title: "Groups and shortcuts",
			description:
				"Headings split the list; shortcuts sit at the end of the row.",
			Demo: CommandGroups,
		},
		{
			id: "no-results",
			title: "An empty list",
			description:
				"`CommandEmpty` shows when there is nothing to list or nothing matches.",
			Demo: CommandNoResults,
		},
	],
	accessibility: [
		"The input is a combobox controlling a listbox; the active option is set through `aria-activedescendant`.",
		"Filtering keeps focus in the input, so typing never stops.",
	],
};
