import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/class-names";

export type LabeledContentSize = "sm" | "md" | "lg";

const padding: Record<LabeledContentSize, string> = {
	sm: "px-3 py-1.5",
	md: "px-4 py-2",
	lg: "px-5 py-3",
};

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
	/** Places a wide control below its label on phones. @default false */
	wide?: boolean;
	/** Row padding density. @default "md" */
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
	wide,
	size = "md",
	className,
	...props
}: LabeledContentProps) {
	return (
		<div
			className={cn(
				"flex min-h-11 flex-wrap gap-x-4 gap-y-2",
				padding[size],
				stacked
					? "flex-col items-stretch"
					: cn(
							"items-center justify-between",
							wide && "max-sm:flex-col max-sm:items-stretch max-sm:gap-2",
						),
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					"flex min-w-0 flex-1 items-center gap-3 break-normal",
					!stacked && "basis-36",
					wide && "max-sm:basis-auto",
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
					<span className="text-subheadline text-label leading-tight">
						{label}
					</span>
					{description ? (
						<span className="text-footnote text-label-secondary leading-snug">
							{description}
						</span>
					) : null}
				</div>
			</div>
			{/* Controls give way before the label does; a segmented control that
          no longer fits turns into a pop-up button by itself. */}
			<div
				className={cn(
					"ms-auto flex max-w-full min-w-0 shrink-0 justify-end [&>*]:max-w-full",
					stacked && "w-full",
					wide && "max-sm:w-full",
				)}
			>
				{children}
			</div>
		</div>
	);
}
