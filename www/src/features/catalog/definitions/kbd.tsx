import { KbdChord } from "../examples/kbd/chord";
import { KbdKeys } from "../examples/kbd/keys";
import { KbdShortcut } from "../examples/kbd/shortcut";
import { KbdUsage } from "../examples/kbd/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A key cap in running text.",
			Demo: KbdUsage,
		},
		{
			id: "chord",
			title: "Group",
			description: "`KbdGroup` spaces a chord.",
			Demo: KbdChord,
		},
		{
			id: "shortcut",
			title: "A shortcut in a menu row",
			description: "Keys sit at the end of a row of text.",
			Demo: KbdShortcut,
		},
		{
			id: "keys",
			title: "Special keys",
			description: "Single caps for the keys people look for.",
			Demo: KbdKeys,
		},
	],
	accessibility: [
		"Renders a native `kbd` element, which assistive technology reads as keyboard input.",
	],
};
