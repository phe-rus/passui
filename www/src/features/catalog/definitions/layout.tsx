import { LayoutAction } from "../examples/layout/action";
import { LayoutSettings } from "../examples/layout/settings";
import { LayoutShowcase } from "../examples/layout/showcase";
import { LayoutUsage } from "../examples/layout/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "action",
			title: "Heading with an action",
			description: "A button beside the title for the screen's main action.",
			Demo: LayoutAction,
		},
		{
			id: "settings",
			title: "A settings screen",
			description:
				"The default heading over grouped sections, the shape of most account screens.",
			Demo: LayoutSettings,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: LayoutShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: LayoutUsage },
	],
	accessibility: [
		"Use one per screen, so each screen has exactly one h1.",
		"Use the compact size for focused flows such as sign in or two-step verification.",
	],
};
