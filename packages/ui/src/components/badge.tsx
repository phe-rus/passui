import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export type BadgeVariant =
	| "default"
	| "secondary"
	| "destructive"
	| "outline"
	| "success"
	| "warning";

const variants: Record<BadgeVariant, string> = {
	default: "bg-accent text-on-accent",
	secondary: "bg-fill text-label",
	destructive: "bg-danger/15 text-danger",
	outline: "text-label shadow-[inset_0_0_0_0.5px_var(--color-separator)]",
	success: "bg-success/15 text-success",
	warning: "bg-warning/15 text-warning",
};

export type BadgeProps = ComponentProps<"span"> & {
	/** Colour role. @default "default" */
	variant?: BadgeVariant;
};

/** A small status label. */
export function Badge({
	variant = "default",
	className,
	...props
}: BadgeProps) {
	return (
		<span
			data-slot="badge"
			data-variant={variant}
			className={cx(
				"inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-caption font-semibold [&_svg]:size-3 [&_svg]:pointer-events-none",
				variants[variant],
				className,
			)}
			{...props}
		/>
	);
}
