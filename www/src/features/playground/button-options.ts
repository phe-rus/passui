import type { ButtonSize, ButtonVariant } from "@passui/react/button";

export const variants: ButtonVariant[] = [
	"default",
	"secondary",
	"outline",
	"accent",
	"ghost",
	"destructive",
	"link",
];

export const sizes: ButtonSize[] = ["xs", "sm", "default", "lg"];

export function buttonCode(options: {
	variant: ButtonVariant;
	size: ButtonSize;
	pending: boolean;
	disabled: boolean;
	label: string;
}) {
	const props = [
		options.variant !== "default" && `variant="${options.variant}"`,
		options.size !== "default" && `size="${options.size}"`,
		options.pending && "isPending",
		options.disabled && "disabled",
	]
		.filter(Boolean)
		.join(" ");
	return `import { Button } from "@passui/react/button";\n\n<Button${props ? ` ${props}` : ""}>${options.label}</Button>`;
}
