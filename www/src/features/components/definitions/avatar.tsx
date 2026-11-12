import { AvatarInitials } from "../examples/avatar/initials";
import { AvatarUsage } from "../examples/avatar/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"The fallback shows until the photo has loaded, and if it fails.",
			Demo: AvatarUsage,
		},
		{
			id: "initials",
			title: "Initials",
			description: "With no source, initials are all there is.",
			Demo: AvatarInitials,
		},
	],
	accessibility: [
		"Give `AvatarImage` meaningful `alt` text, or an empty one when a name sits beside it.",
	],
};
