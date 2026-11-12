import type { ComponentProps, ReactNode } from "react";
import { cx } from "../lib/cx";

/** `status` is an inline dot and label, `note` a centred system line, `row` a bordered row, `divider` a labelled rule. */
export type MarkerVariant = "status" | "note" | "row" | "divider";

export type MarkerProps = ComponentProps<"div"> & {
	/** How the marker reads in the flow. @default "note" */
	variant?: MarkerVariant;
	/** Leading icon or dot. */
	icon?: ReactNode;
	/** Trailing action, such as a Button, shown by `row`. */
	action?: ReactNode;
};

const styles: Record<MarkerVariant, string> = {
	status: "inline-flex items-center gap-1.5 text-caption text-label-secondary",
	note: "flex items-center justify-center gap-1.5 text-caption text-label-tertiary",
	row: "flex items-center gap-2 rounded-xl border border-separator/60 px-3 py-2 text-footnote text-label-secondary",
	divider:
		"flex items-center gap-3 text-caption text-label-tertiary before:h-px before:flex-1 before:bg-separator/60 after:h-px after:flex-1 after:bg-separator/60",
};

/** A small non-message line in a conversation or a feed: a status, a system note, a row or a labelled separator. */
export function Marker({
	variant = "note",
	icon,
	action,
	className,
	children,
	...props
}: MarkerProps) {
	return (
		<div
			data-slot="marker"
			data-variant={variant}
			className={cx(styles[variant], className)}
			{...props}
		>
			{icon ? <span className="shrink-0 [&_svg]:size-3.5">{icon}</span> : null}
			{variant === "row" ? (
				<span className="min-w-0 flex-1 truncate">{children}</span>
			) : (
				children
			)}
			{variant === "row" && action ? (
				<span className="shrink-0">{action}</span>
			) : null}
		</div>
	);
}
