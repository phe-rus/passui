import { ToggleOutline } from "../examples/toggle/outline";
import { TogglePressed } from "../examples/toggle/pressed";
import { ToggleText } from "../examples/toggle/text";
import { ToggleUsage } from "../examples/toggle/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A button with `aria-pressed`.",
			Demo: ToggleUsage,
		},
		{
			id: "outline",
			title: "Outline",
			description: "The outline variant keeps a hairline when off.",
			Demo: ToggleOutline,
		},
		{
			id: "pressed",
			title: "Pressed",
			description: "Starts on.",
			Demo: TogglePressed,
		},
		{
			id: "text",
			title: "With text",
			description: "A label next to the icon.",
			Demo: ToggleText,
		},
	],
	accessibility: [
		"A native button with `aria-pressed`. An icon only toggle needs an `aria-label`.",
	],
};
