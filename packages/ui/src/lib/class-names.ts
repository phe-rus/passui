import { textStyles } from "@passui/tokens/typography";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const textStyleClasses = Object.keys(textStyles).map(
	(name) =>
		`text-${name.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)}`,
);

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": textStyleClasses,
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
