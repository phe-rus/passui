"use client";

import { type ComponentProps, useId, useState } from "react";
import { cx } from "../lib/cx";
import { FloatingField, type InputSize, inputStyles } from "./input";

const paddings: Record<InputSize, string> = {
	sm: "min-h-16 px-2.5 py-1.5 text-footnote",
	md: "min-h-20 px-3 py-2 text-footnote",
	lg: "min-h-24 px-3.5 py-2.5 text-subheadline",
};

export type TextareaProps = Omit<ComponentProps<"textarea">, "size"> & {
	/** Minimum height and text, from the shared control scale. @default "md" */
	size?: InputSize;
	/** `floating` draws one whole outline whose top line parts under the label. Needs `label`. @default "default" */
	variant?: "default" | "floating";
	/** The floating label. */
	label?: string;
	/** Shows `count / maxLength` under the field. Needs `maxLength`. @default false */
	showCount?: boolean;
};

/**
 * A multi line field that grows with its content. It can float its label like
 * `Input` and count characters against `maxLength`. The resize grip is gone:
 * the field sizes itself.
 */
export function Textarea({
	className,
	size = "md",
	variant = "default",
	label,
	showCount = false,
	id,
	onChange,
	...props
}: TextareaProps) {
	const own = useId();
	const field = id ?? own;
	const [typed, setTyped] = useState(
		String(props.value ?? props.defaultValue ?? "").length,
	);
	const length = props.value !== undefined ? String(props.value).length : typed;
	const area =
		variant === "floating" && label ? (
			<FloatingField
				id={field}
				label={label}
				size={size}
				multiline
				className={className}
			>
				<textarea
					id={field}
					data-slot="textarea"
					data-variant="floating"
					placeholder={props.placeholder ?? " "}
					className={cx(
						"text-label placeholder:text-label-tertiary field-sizing-content block w-full min-w-0 resize-none rounded-xl bg-transparent pt-4 outline-none disabled:pointer-events-none disabled:opacity-40",
						paddings[size],
					)}
					onChange={(event) => {
						setTyped(event.target.value.length);
						onChange?.(event);
					}}
					{...props}
				/>
			</FloatingField>
		) : (
			<textarea
				id={field}
				data-slot="textarea"
				className={cx(
					inputStyles,
					"field-sizing-content h-auto resize-none leading-snug",
					paddings[size],
					!(showCount && props.maxLength) && className,
				)}
				onChange={(event) => {
					setTyped(event.target.value.length);
					onChange?.(event);
				}}
				{...props}
			/>
		);
	if (!(showCount && props.maxLength)) return area;
	return (
		<div className={cx("flex w-full flex-col gap-1", className)}>
			{area}
			<span
				aria-live="polite"
				className={cx(
					"text-caption tabular-nums self-end pe-1",
					length >= props.maxLength ? "text-danger" : "text-label-tertiary",
				)}
			>
				{length} / {props.maxLength}
			</span>
		</div>
	);
}
