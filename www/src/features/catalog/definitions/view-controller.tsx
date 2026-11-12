import { ViewControllerAction } from "../examples/view-controller/action";
import { ViewControllerSettings } from "../examples/view-controller/settings";
import { ViewControllerShowcase } from "../examples/view-controller/showcase";
import { ViewControllerUsage } from "../examples/view-controller/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "action",
			title: "Heading with an action",
			description: "A button beside the title for the screen's main action.",
			Demo: ViewControllerAction,
		},
		{
			id: "settings",
			title: "A settings screen",
			description:
				"The default heading over grouped sections, the shape of most account screens.",
			Demo: ViewControllerSettings,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: ViewControllerShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: ViewControllerUsage },
	],
	accessibility: [
		"Use one per screen, so each screen has exactly one h1.",
		"Use the compact size for focused flows such as sign in or two-step verification.",
	],
};
