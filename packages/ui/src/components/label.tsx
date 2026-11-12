import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** A native label. Pair it with a control through `htmlFor`. */
export function Label({ className, ...props }: ComponentProps<"label">) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the consumer supplies htmlFor or a nested control
		<label
			data-slot="label"
			className={cx(
				"flex select-none items-center gap-2 text-footnote font-medium leading-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}
