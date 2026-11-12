import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** A keyboard key cap. */
export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cx(
				"pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded-md bg-fill px-1 font-sans text-caption2 font-medium text-label-secondary",
				className,
			)}
			{...props}
		/>
	);
}

export function KbdGroup({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			data-slot="kbd-group"
			className={cx("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}
