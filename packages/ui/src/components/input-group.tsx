import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** Wraps an input with leading or trailing addons. The group draws the surface and focus ring. */
export function InputGroup({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			role="group"
			data-slot="input-group"
			className={cx(
				"control-field flex h-11 w-full min-w-0 items-center gap-2 rounded-2xl px-3 text-body has-[:disabled]:opacity-40 has-[[aria-invalid=true]]:shadow-[inset_0_0_0_1.5px_var(--color-danger)]",
				className,
			)}
			{...props}
		/>
	);
}

/** The input inside a group: no surface of its own. */
export function InputGroupInput({
	className,
	...props
}: ComponentProps<"input">) {
	return (
		<input
			data-slot="input-group-input"
			className={cx(
				"h-full min-w-0 flex-1 bg-transparent text-label outline-none placeholder:text-label-tertiary",
				className,
			)}
			{...props}
		/>
	);
}

export type InputGroupAddonProps = ComponentProps<"div"> & {
	/** @default "start" */
	align?: "start" | "end";
};

export function InputGroupAddon({
	align = "start",
	className,
	...props
}: InputGroupAddonProps) {
	return (
		<div
			data-slot="input-group-addon"
			data-align={align}
			className={cx(
				"flex shrink-0 items-center gap-1 text-label-secondary data-[align=end]:order-last [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}
