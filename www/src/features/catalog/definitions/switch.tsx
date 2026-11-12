import { SwitchControlled } from "../examples/switch/controlled";
import { SwitchUsage } from "../examples/switch/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Children are the label.",
			Demo: SwitchUsage,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "`onCheckedChange` receives a boolean.",
			Demo: SwitchControlled,
		},
	],
	accessibility: [
		'A hidden native checkbox with `role="switch"`, so it submits with forms and is announced as on or off.',
	],
};
