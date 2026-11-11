import type { HTMLAttributes } from "react";
import { cn } from "../../lib/class-names";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	orientation?: DividerOrientation;
	/** Decorative separators are omitted from the accessibility tree. @default true */
	decorative?: boolean;
}

/** A semantic separator using the shared surface color. */
export function Divider({
	orientation = "horizontal",
	decorative = true,
	className,
	...props
}: DividerProps) {
	return (
		<hr
			{...props}
			role={decorative ? "none" : "separator"}
			aria-orientation={decorative ? undefined : orientation}
			className={cn(
				"bg-separator shrink-0 border-0",
				orientation === "horizontal"
					? "h-px w-full"
					: "h-full w-px self-stretch",
				className,
			)}
		/>
	);
}
