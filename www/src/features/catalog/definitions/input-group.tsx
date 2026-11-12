import { InputGroupAddons } from "../examples/input-group/addons";
import { InputGroupButtons } from "../examples/input-group/buttons";
import { InputGroupMessage } from "../examples/input-group/message";
import { InputGroupTrailing } from "../examples/input-group/trailing";
import { InputGroupUsage } from "../examples/input-group/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Addons share one surface and focus ring with the input.",
			Demo: InputGroupUsage,
		},
		{
			id: "trailing",
			title: "Trailing addon",
			description: 'Use `align="end"` for text or a button after the input.',
			Demo: InputGroupTrailing,
		},
		{
			id: "addons",
			title: "Text addons",
			description:
				"`InputGroupText` for a protocol, a unit or a currency, on either side.",
			Demo: InputGroupAddons,
		},
		{
			id: "buttons",
			title: "Buttons",
			description:
				"`InputGroupButton` is a compact ghost button, sized to sit inside the field.",
			Demo: InputGroupButtons,
		},
		{
			id: "message",
			title: "Textarea with block addons",
			description:
				'`InputGroupTextarea` grows with its content. `align="block-start"` and `"block-end"` span the full width above and below.',
			Demo: InputGroupMessage,
		},
	],
	accessibility: [
		'The group has `role="group"`. The input inside still needs its own label.',
	],
};
