import type { ReactNode, ComponentProps } from "react";
import { cn } from "../../lib/class-names";

export type ContentUnavailableViewSize = "sm" | "md" | "lg";

const titleSizes: Record<ContentUnavailableViewSize, string> = {
	sm: "text-subheadline",
	md: "text-headline",
	lg: "text-title3",
};

const descriptionSizes: Record<ContentUnavailableViewSize, string> = {
	sm: "text-caption",
	md: "text-footnote",
	lg: "text-subheadline",
};

const spacings: Record<ContentUnavailableViewSize, string> = {
	sm: "gap-2 px-6 py-6",
	md: "gap-3 px-6 py-10",
	lg: "gap-4 px-6 py-14",
};

export interface ContentUnavailableViewProps
	extends Omit<ComponentProps<"div">, "title"> {
	title: string;
	description?: string;
	icon?: ReactNode;
	actions?: ReactNode;
	/** Title, description and vertical rhythm. @default "md" */
	size?: ContentUnavailableViewSize;
}

/** A focused empty or unavailable state with an optional next action. */
export function ContentUnavailableView({
	title,
	description,
	icon,
	actions,
	size = "md",
	className,
	...props
}: ContentUnavailableViewProps) {
	return (
		<div
			{...props}
			className={cn(
				"flex flex-col items-center text-center",
				spacings[size],
				className,
			)}
		>
			{icon && (
				<span aria-hidden="true" className="text-label-tertiary">
					{icon}
				</span>
			)}
			<p className={cn(titleSizes[size], "text-label font-semibold")}>
				{title}
			</p>
			{description && (
				<p
					className={cn(
						descriptionSizes[size],
						"text-label-secondary max-w-sm",
					)}
				>
					{description}
				</p>
			)}
			{actions && (
				<div className="mt-1 flex flex-wrap justify-center gap-2">
					{actions}
				</div>
			)}
		</div>
	);
}
