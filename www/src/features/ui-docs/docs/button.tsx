import { ButtonLink } from "../examples/button-link";
import { ButtonSizes } from "../examples/button-sizes";
import { ButtonUsage } from "../examples/button-usage";
import { ButtonVariants } from "../examples/button-variants";
import type { UiDoc } from "../types";

export const doc: UiDoc = {
	slug: "button",
	name: "Button",
	group: "Controls",
	icon: "tap",
	summary:
		"A native button with six variants and eight sizes. State is plain CSS, so it has no machine and costs about 1 KB.",
	entry: "@passui/react/button",
	sizeKb: 2,
	parts: [
		{
			name: "Button",
			description: "A native `<button>`. All native button props pass through.",
			props: [
				{
					name: "variant",
					type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
					default: '"default"',
					description: "Visual emphasis.",
				},
				{
					name: "size",
					type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
					default: '"default"',
					description: "Label sizes, and square sizes for icon-only buttons.",
				},
				{
					name: "type",
					type: '"button" | "submit" | "reset"',
					default: '"button"',
					description:
						"Defaults to `button` so it never submits a form by accident.",
				},
			],
		},
		{
			name: "buttonVariants",
			description:
				"Returns the button classes, so a link or any other element can look like a button.",
		},
	],
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
