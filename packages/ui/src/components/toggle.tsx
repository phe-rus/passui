"use client";

import { type ComponentProps, useState } from "react";
import { cx } from "../lib/cx";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";

export const toggleVariants = {
	base: "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold outline-none transition spring-snappy active:scale-[0.96] hover:bg-fill/80 focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 aria-pressed:bg-fill aria-pressed:text-label data-[state=on]:bg-fill motion-reduce:transition-none motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
	variant: {
		default: "",
		outline: "shadow-[inset_0_0_0_0.5px_var(--color-separator)]",
	} satisfies Record<ToggleVariant, string>,
	size: {
		default: "h-8.5 min-w-8.5 px-3 text-footnote",
		sm: "h-7.5 min-w-7.5 px-2.5 text-caption",
		lg: "h-9.5 min-w-9.5 px-4 text-subheadline",
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
