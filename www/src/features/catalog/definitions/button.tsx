import { ButtonLink } from "../examples/button/link";
import { ButtonSizes } from "../examples/button/sizes";
import { ButtonUsage } from "../examples/button/usage";
import { ButtonVariants } from "../examples/button/variants";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "The default button.",
			Demo: ButtonUsage,
		},
		{
			id: "variants",
			title: "Variants",
			description: "Six levels of emphasis. Use one default button per view.",
			Demo: ButtonVariants,
		},
		{
			id: "sizes",
			title: "Sizes and disabled",
			description: "Disabled buttons drop out of the tab order and fade.",
			Demo: ButtonSizes,
		},
		{
			id: "link",
			title: "As a link",
			description:
				"Use `buttonVariants` when navigation should look like a button.",
			Demo: ButtonLink,
		},
	],
	accessibility: [
		"A real `<button>`, so Enter and Space activate it and screen readers announce it as a button.",
		"Focus shows a visible ring from `:focus-visible`, never on mouse clicks.",
		"The press scale is off under reduced motion.",
		"Icon-only buttons need an `aria-label`.",
	],
};
