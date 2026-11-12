import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import { inputStyles } from "./input";

/** A native multi line input. It grows with its content where the browser supports it. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cx(
				inputStyles,
				"field-sizing-content min-h-16 py-2",
				className,
			)}
			{...props}
		/>
	);
}
