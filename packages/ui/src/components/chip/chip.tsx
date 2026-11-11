import type { HTMLAttributes } from "react";
import { cn } from "../../lib/class-names";

export type ChipTone = "neutral" | "accent" | "public" | "family" | "friends";
export type ChipSize = "xs" | "sm" | "md";

const tones: Record<ChipTone, string> = {
	neutral: "bg-fill text-label-secondary",
	accent: "bg-elevated text-accent-text",
	public: "bg-[#e8efff] text-[#2c55b8] dark:bg-[#1c2740] dark:text-[#a9c1ff]",
	family: "bg-[#e3f3eb] text-[#24704f] dark:bg-[#15302a] dark:text-[#8fd6b6]",
	friends: "bg-[#ede8ff] text-[#5a3fc0] dark:bg-[#26203f] dark:text-[#c3b5ff]",
};

const sizes: Record<ChipSize, string> = {
	xs: "px-1 py-0 text-caption2",
	sm: "px-1.5 py-0.5 text-caption2",
	md: "px-2 py-0.5 text-caption",
};

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
	/** `neutral`, `accent`, `public`, `family`, or `friends`. @default "neutral" */
	tone?: ChipTone;
	/** `xs`, `sm`, or `md`. @default "sm" */
	size?: ChipSize;
}

export function Chip({
	tone = "neutral",
	size = "sm",
	className,
	...props
}: ChipProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-full font-semibold",
				tones[tone],
				sizes[size],
				className,
			)}
			{...props}
		/>
	);
}
