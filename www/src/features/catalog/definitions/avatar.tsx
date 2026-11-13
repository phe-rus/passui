import { AvatarBrokenImage } from "../examples/avatar/broken-image";
import { AvatarGroup } from "../examples/avatar/group";
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
		{
			id: "group",
			title: "A stack of people",
			description: "Overlap avatars with a ring in the ground color.",
			Demo: AvatarGroup,
		},
		{
			id: "broken-image",
			title: "Fallback when the image fails",
			description: "The fallback shows while the image loads or if it cannot.",
			Demo: AvatarBrokenImage,
		},
	],
	accessibility: [
		"Give `AvatarImage` meaningful `alt` text, or an empty one when a name sits beside it.",
	],
};
