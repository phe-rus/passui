"use client";

import { type ComponentProps, type ReactNode, useId } from "react";
import { cx } from "../lib/cx";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "floating";

export const inputStyles =
	"control-field h-8.5 w-full min-w-0 rounded-xl px-3 text-footnote text-label placeholder:text-label-tertiary disabled:pointer-events-none disabled:opacity-40 aria-invalid:shadow-[inset_0_0_0_1.5px_var(--color-danger)] file:border-0 file:bg-transparent file:text-subheadline file:font-medium motion-reduce:transition-none";

/** Height and text from the shared control scale. */
export const inputSizes: Record<InputSize, string> = {
	sm: "h-7.5 px-2.5 text-footnote",
	md: "h-8.5 px-3 text-footnote",
	lg: "h-9.5 px-3.5 text-subheadline",
};

/** The outlined variant is taller, since the label has to float inside it. */
export const floatingSizes: Record<InputSize, string> = {
	sm: "h-9 px-3 text-footnote",
	md: "h-10 px-3 text-subheadline",
	lg: "h-11.5 px-3 text-body",
};

export type InputProps = Omit<ComponentProps<"input">, "size"> & {
	/** Height and text, from the shared control scale. @default "md" */
	size?: InputSize;
	/**
	 * `floating` draws the field as one whole outline whose top line parts
	 * under the label as it lifts, like Material's outlined field. It needs `label`.
	 * @default "default"
	 */
	variant?: InputVariant;
	/** The floating label. */
	label?: string;
	/** An icon before the value, for `floating`. The label sits after it until it lifts. */
	leading?: ReactNode;
};

/**
 * The shell of an outlined, floating label field. The outline is a fieldset
 * whose legend opens a real gap under the label, so nothing is painted over
 * the border and it fits any surface.
 */
export function FloatingField({
	id,
	label,
	size = "md",
	multiline,
	leading,
	className,
	children,
}: {
	id: string;
	label: string;
	size?: InputSize;
	multiline?: boolean;
	/** An icon or text that sits before the value, and before the label until it lifts. */
	leading?: ReactNode;
	className?: string;
	children: ReactNode;
}) {
	return (
		<div
			data-slot="floating-field"
			data-size={size}
			data-multiline={multiline || undefined}
			className={cx(
				"passui-floating-field relative w-full min-w-0 rounded-xl",
				className,
			)}
		>
			{leading ? (
				<span aria-hidden="true" className="passui-floating-leading">
					{leading}
				</span>
			) : null}
			{children}
			<fieldset aria-hidden="true" className="passui-field-outline">
				<legend>{label}</legend>
			</fieldset>
			<label
				htmlFor={id}
				className={cx(
					"passui-floating-label",
					leading ? "passui-floating-label-with-icon" : false,
				)}
			>
				{label}
			</label>
		</div>
	);
}

/** A native text input, in the shared control sizes, or an outlined field with a floating label. */
export function Input({
	className,
	type = "text",
	size = "md",
	variant = "default",
	label,
	leading,
	placeholder,
	id,
	...props
}: InputProps) {
	const own = useId();
	if (variant === "floating" && label) {
		const field = id ?? own;
		return (
			<FloatingField
				id={field}
				label={label}
				size={size}
				leading={leading}
				className={className}
			>
				<input
					id={field}
					type={type}
					data-slot="input"
					data-variant="floating"
					// A placeholder is what lets CSS know whether the field holds text.
					placeholder={placeholder ?? " "}
					className={cx(
						"text-label placeholder:text-label-tertiary w-full min-w-0 rounded-xl bg-transparent outline-none disabled:pointer-events-none disabled:opacity-40",
						floatingSizes[size],
						leading ? "ps-10" : false,
					)}
					{...props}
				/>
			</FloatingField>
		);
	}
	return (
		<input
			id={id}
			type={type}
			placeholder={placeholder}
			data-slot="input"
			className={cx(inputStyles, inputSizes[size], className)}
			{...props}
		/>
	);
}
