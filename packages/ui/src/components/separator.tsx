import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export type SeparatorProps = ComponentProps<"div"> & {
	/** @default "horizontal" */
	orientation?: "horizontal" | "vertical";
	/** Purely visual separators are hidden from assistive technology. @default true */
	decorative?: boolean;
};

/** A hairline rule between groups. */
export function Separator({
	orientation = "horizontal",
	decorative = true,
	className,
	...props
}: SeparatorProps) {
	return (
		<div
			data-slot="separator"
			data-orientation={orientation}
			{...(decorative
				? { role: "none" }
				: { role: "separator", "aria-orientation": orientation })}
			className={cx(
				"shrink-0 bg-separator data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
				className,
			)}
			{...props}
		/>
	);
}
