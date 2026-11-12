import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** Fuses neighbouring buttons into one segmented control, squaring the inner corners. */
export function ButtonGroup({
	orientation = "horizontal",
	className,
	...props
}: ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={cx(
				"flex w-fit items-stretch *:focus-visible:z-10 data-[orientation=horizontal]:*:not-first:rounded-l-none data-[orientation=horizontal]:*:not-last:rounded-r-none data-[orientation=vertical]:flex-col data-[orientation=vertical]:*:not-first:rounded-t-none data-[orientation=vertical]:*:not-last:rounded-b-none",
				className,
			)}
			{...props}
		/>
	);
}
