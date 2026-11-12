import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export const inputStyles =
	"h-11 w-full min-w-0 rounded-2xl bg-fill/60 px-4 text-body text-label outline-none transition duration-(--duration-fast) ease-standard placeholder:text-label-tertiary focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 aria-invalid:ring-2 aria-invalid:ring-danger/70 file:border-0 file:bg-transparent file:text-subheadline file:font-medium motion-reduce:transition-none";

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
