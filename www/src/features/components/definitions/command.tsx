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
	],
	accessibility: [
		"The input is a combobox controlling a listbox; the active option is set through `aria-activedescendant`.",
		"Filtering keeps focus in the input, so typing never stops.",
	],
};
