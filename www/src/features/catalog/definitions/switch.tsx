import { SwitchControlled } from "../examples/switch/controlled";
import { SwitchDisabled } from "../examples/switch/disabled";
import { SwitchLiquid } from "../examples/switch/liquid";
import { SwitchList } from "../examples/switch/list";
import { SwitchSizes } from "../examples/switch/sizes";
import { SwitchTones } from "../examples/switch/tones";
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
			id: "sizes",
			title: "Sizes",
			description:
				"`sm`, `md` and `lg` scale the track and the thumb together.",
			Demo: SwitchSizes,
		},
		{
			id: "tones",
			title: "Tones",
			description:
				'The on track follows the accent by default. `tone="success"` keeps the iOS green.',
			Demo: SwitchTones,
		},
		{
			id: "liquid",
			title: "Liquid",
			description:
				'`variant="liquid"` runs a second drop that chases the thumb through a goo filter. Slow flips stay one shape; quick ones neck out.',
			Demo: SwitchLiquid,
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
