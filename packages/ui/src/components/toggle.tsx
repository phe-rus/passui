"use client";

import { type ComponentProps, useState } from "react";
import { cx } from "../lib/cx";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";

export const toggleVariants = {
	base: "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold outline-none transition duration-(--duration-fast) ease-standard hover:bg-fill/80 focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 aria-pressed:bg-fill aria-pressed:text-label data-[state=on]:bg-fill motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	variant: {
		default: "",
		outline: "shadow-[inset_0_0_0_0.5px_var(--color-separator)]",
	} satisfies Record<ToggleVariant, string>,
	size: {
		default: "h-11 min-w-11 px-4 text-subheadline",
		sm: "h-9 min-w-9 px-3 text-footnote",
		lg: "h-12 min-w-12 px-5 text-body",
	} satisfies Record<ToggleSize, string>,
};

export type ToggleProps = Omit<ComponentProps<"button">, "onChange"> & {
	pressed?: boolean;
	defaultPressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
	variant?: ToggleVariant;
	size?: ToggleSize;
};

/** A two state button with `aria-pressed`. */
export function Toggle({
	pressed: controlled,
	defaultPressed = false,
	onPressedChange,
	variant = "default",
	size = "default",
	className,
	onClick,
	...props
}: ToggleProps) {
	const [inner, setInner] = useState(defaultPressed);
	const pressed = controlled ?? inner;
	return (
		<button
			type="button"
			data-slot="toggle"
			data-state={pressed ? "on" : "off"}
			aria-pressed={pressed}
			className={cx(
				toggleVariants.base,
				toggleVariants.variant[variant],
				toggleVariants.size[size],
				className,
			)}
			onClick={(event) => {
				onClick?.(event);
				if (event.defaultPrevented) return;
				if (controlled === undefined) setInner(!pressed);
				onPressedChange?.(!pressed);
			}}
			{...props}
		/>
	);
}
