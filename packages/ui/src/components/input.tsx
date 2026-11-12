import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export const inputStyles =
	"control-field h-11 w-full min-w-0 rounded-2xl px-4 text-body text-label placeholder:text-label-tertiary disabled:pointer-events-none disabled:opacity-40 aria-invalid:shadow-[inset_0_0_0_1.5px_var(--color-danger)] file:border-0 file:bg-transparent file:text-subheadline file:font-medium motion-reduce:transition-none";

/** A native text input. */
export function Input({
	className,
	type = "text",
	...props
}: ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cx(inputStyles, className)}
			{...props}
		/>
	);
}
