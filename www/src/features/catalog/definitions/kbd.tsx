import { KbdChord } from "../examples/kbd/chord";
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
	],
	accessibility: [
		"Renders a native `kbd` element, which assistive technology reads as keyboard input.",
	],
};
