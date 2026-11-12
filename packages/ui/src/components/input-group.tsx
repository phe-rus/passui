import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import { Button, type ButtonProps } from "./button";

/** Wraps an input with leading or trailing addons. The group draws the surface and focus ring. */
export function InputGroup({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			role="group"
			data-slot="input-group"
			className={cx(
				"control-field flex h-8.5 w-full min-w-0 items-center gap-2 rounded-xl px-2.5 text-footnote has-[[data-align^=block]]:h-auto has-[[data-align^=block]]:flex-col has-[[data-align^=block]]:items-stretch has-[textarea]:h-auto has-[textarea]:flex-wrap has-[:disabled]:opacity-40 has-[[aria-invalid=true]]:shadow-[inset_0_0_0_1.5px_var(--color-danger)]",
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
	/** `block-start` and `block-end` span the full width above or below the field. @default "start" */
	align?: "start" | "end" | "block-start" | "block-end";
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
				"flex shrink-0 items-center gap-1 text-label-secondary data-[align=end]:order-last data-[align=block-start]:order-first data-[align=block-start]:w-full data-[align=block-start]:justify-between data-[align=block-start]:pt-2 data-[align=block-end]:order-last data-[align=block-end]:w-full data-[align=block-end]:justify-between data-[align=block-end]:pb-2 [&_svg:not([class*='size-'])]:size-3.5",
				className,
			)}
			{...props}
		/>
	);
}

/** Plain text beside the field, such as a protocol, a unit or a count. */
export function InputGroupText({
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span
			data-slot="input-group-text"
			className={cx(
				"text-footnote text-label-secondary whitespace-nowrap",
				className,
			)}
			{...props}
		/>
	);
}

/** A compact button inside the group, ghost by default. */
export function InputGroupButton({
	variant = "ghost",
	size = "xs",
	...props
}: ButtonProps) {
	return (
		<Button
			variant={variant}
			size={size}
			data-slot="input-group-button"
			{...props}
		/>
	);
}

/** A growing textarea inside the group, with no surface of its own. */
export function InputGroupTextarea({
	className,
	...props
}: ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="input-group-textarea"
			className={cx(
				"field-sizing-content min-h-16 w-full flex-1 resize-none bg-transparent py-2 text-label outline-none placeholder:text-label-tertiary",
				className,
			)}
			{...props}
		/>
	);
}
