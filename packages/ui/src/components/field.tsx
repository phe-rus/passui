import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import { Label } from "./label";

/** Groups several fields, such as a form section. */
export function FieldGroup({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="field-group"
			className={cx("flex w-full flex-col gap-5", className)}
			{...props}
		/>
	);
}

export type FieldProps = ComponentProps<"div"> & {
	/** Lay the label and control out in a row, as for a switch. @default "vertical" */
	orientation?: "vertical" | "horizontal";
	/** Mark the field invalid so its text turns to the danger colour. */
	invalid?: boolean;
};

/** One labelled control with optional description and error. */
export function Field({
	orientation = "vertical",
	invalid,
	className,
	...props
}: FieldProps) {
	return (
		<div
			role="group"
			data-slot="field"
			data-orientation={orientation}
			data-invalid={invalid ? "" : undefined}
			className={cx(
				"group flex w-full gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=vertical]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

export function FieldLabel({
	className,
	...props
}: ComponentProps<typeof Label>) {
	return (
		<Label
			data-slot="field-label"
			className={cx("group-data-[invalid]:text-danger", className)}
			{...props}
		/>
	);
}

export function FieldDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="field-description"
			className={cx("text-footnote text-label-secondary", className)}
			{...props}
		/>
	);
}

/** An error message. Render it only when there is an error. */
export function FieldError({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			role="alert"
			data-slot="field-error"
			className={cx("text-footnote font-medium text-danger", className)}
			{...props}
		/>
	);
}
