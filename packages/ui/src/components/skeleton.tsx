import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** A placeholder block while content loads. Size it with classes. */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			aria-hidden="true"
			className={cx(
				"animate-pulse rounded-xl bg-fill motion-reduce:animate-none",
				className,
			)}
			{...props}
		/>
	);
}
