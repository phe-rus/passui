import { SwitchControlled } from "../examples/switch/controlled";
import { SwitchDisabled } from "../examples/switch/disabled";
import { SwitchList } from "../examples/switch/list";
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
		{
			id: "disabled",
			title: "Disabled",
			description: "Dimmed in both states.",
			Demo: SwitchDisabled,
		},
		{
			id: "list",
			title: "In a settings list",
			description: "Switches line up as rows.",
			Demo: SwitchList,
		},
	],
	accessibility: [
		'A hidden native checkbox with `role="switch"`, so it submits with forms and is announced as on or off.',
	],
};
