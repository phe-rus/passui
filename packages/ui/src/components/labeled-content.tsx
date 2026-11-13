import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";

export type LabeledContentSize = "sm" | "md" | "lg";

/** One row metric for every size, so rows never differ in height or inset. */
const ROW = "h-14 px-5";

export interface LabeledContentProps extends HTMLAttributes<HTMLDivElement> {
	/** The visible name of the row. */
	label: ReactNode;
	/** Supporting text directly below the label. */
	description?: ReactNode;
	/** A glyph in a soft tile before the label, like a Settings row. */
	icon?: ReactNode;
	/** The row's control or value. */
	children: ReactNode;
	/** Places the control below the label at every width. @default false */
	stacked?: boolean;
	/** Kept for compatibility. Rows keep one height, so a wide control truncates instead of stacking. */
	wide?: boolean;
	/** Kept for compatibility. Every row uses the same height and inset. */
	size?: LabeledContentSize;
}

/**
 * A row: a label, an optional description, and its control at the trailing
 * end, as SwiftUI's `LabeledContent`. Wide controls move under the label
 * when there is no room beside it, rather than squeezing.
 */
export function LabeledContent({
	label,
	description,
	icon,
	children,
	stacked,
	wide: _wide,
	size: _size,
	className,
	...props
}: LabeledContentProps) {
	return (
		<div
			data-slot="labeled-content"
			className={cx(
				"flex gap-x-4",
				ROW,
				stacked
					? "h-auto flex-col items-stretch gap-y-2 py-3"
					: cx("items-center justify-between"),
				className,
			)}
			{...props}
		>
			<div
				className={cx(
					"flex min-w-0 flex-1 items-center gap-3 break-normal",
					!stacked && "basis-36",
				)}
			>
				{icon ? (
					<span
						aria-hidden="true"
						className="bg-fill text-label-secondary flex size-8 shrink-0 items-center justify-center rounded-lg [&_svg]:size-4"
					>
						{icon}
					</span>
				) : null}
				<div className="flex min-w-0 flex-col gap-0">
					<span className="text-subheadline text-label truncate leading-tight">
						{label}
					</span>
					{description ? (
						<span className="text-footnote text-label-secondary truncate leading-snug">
							{description}
						</span>
					) : null}
				</div>
			</div>
			{/* Controls give way before the label does; a segmented control that
          no longer fits turns into a pop-up button by itself. */}
			<div
				className={cx(
					"ms-auto flex max-w-full min-w-0 shrink-0 justify-end [&>*]:max-w-full",
					stacked && "w-full",
				)}
			>
				{children}
			</div>
		</div>
	);
}
