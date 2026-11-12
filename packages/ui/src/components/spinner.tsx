import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** An indeterminate activity indicator. Colour follows the text colour. */
export function Spinner({ className, ...props }: ComponentProps<"svg">) {
	return (
		<svg
			role="status"
			aria-label="Loading"
			data-slot="spinner"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			className={cx(
				"size-4 animate-spin motion-reduce:animate-[spin_2s_linear_infinite]",
				className,
			)}
			{...props}
		>
			<path d="M12 3a9 9 0 1 0 9 9" />
		</svg>
	);
}
